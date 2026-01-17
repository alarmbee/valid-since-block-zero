import fs from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';
import { XMLParser } from 'fast-xml-parser';

const REPO_ROOT = process.cwd();

const TOKEN = process.env.PARLAMENT_ACCESS_TOKEN;
const BASE_URL = process.env.PARLAMENT_API_BASE || 'https://www.parlament.hu/cgi-bin/web-api-pub';
const LIST_URL = `${BASE_URL}/iromanyok.cgi?access_token=${encodeURIComponent(TOKEN ?? '')}`;

const STATE_PATH = path.join(REPO_ROOT, '.cache', 'parlament-monitor', 'state.json');

const TELEGRAM_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;
const TELEGRAM_MESSAGE_THREAD_ID = process.env.TELEGRAM_MESSAGE_THREAD_ID;

const KEYWORDS = [
  '\\bkripto',
  '\\bmica\\b',
  'crypto-asset',
  'cryptoasset',
  '\\bvalid',
  '\\bvalid\\w*',
  '\\bátvált',
  '\\batvalt',
  '\\bpénzmos',
  '\\bpenzmos',
  '\\baml\\b',
  '\\bcas\\b',
  '\\bcasp\\b',
  'virtual asset',
  'vagyonvisszaszerz',
  'piacfelügyelet',
  'piacfelugyelet'
];

const KW_RE = new RegExp(KEYWORDS.join('|'), 'i');

function nowIsoUtc() {
  return new Date().toISOString();
}

async function fetchText(url) {
  const res = await fetch(url, { redirect: 'follow' });
  if (!res.ok) {
    const body = await res.text().catch(() => '');
    throw new Error(`HTTP ${res.status} ${res.statusText} for ${url}${body ? `: ${body.slice(0, 500)}` : ''}`);
  }
  return await res.text();
}

async function loadJson(filePath, fallback) {
  try {
    const raw = await fs.readFile(filePath, 'utf8');
    return JSON.parse(raw);
  } catch {
    return fallback;
  }
}

async function writeJson(filePath, obj) {
  await fs.mkdir(path.dirname(filePath), { recursive: true });
  await fs.writeFile(filePath, JSON.stringify(obj, null, 2) + '\n', 'utf8');
}

async function fileExists(filePath) {
  try {
    await fs.stat(filePath);
    return true;
  } catch {
    return false;
  }
}

function normalizeString(value) {
  const s = typeof value === 'string' ? value : value == null ? '' : String(value);
  return s.replace(/\s+/g, ' ').trim();
}

function getAttr(node, name) {
  if (!node || typeof node !== 'object') return '';
  const direct = node[`@_${name}`];
  if (direct != null) return normalizeString(direct);
  const alt = node[name];
  if (alt != null && typeof alt !== 'object') return normalizeString(alt);
  return '';
}

function getTitle(node) {
  if (!node || typeof node !== 'object') return '';
  const candidates = [
    node.cim,
    node.megnevezes,
    node.targy,
    node.title,
    node.nev,
    node['#text']
  ];
  for (const c of candidates) {
    const t = normalizeString(c);
    if (t) return t;
  }
  return '';
}

function collectNodesByKey(obj, keyName, out = []) {
  if (!obj || typeof obj !== 'object') return out;

  if (Array.isArray(obj)) {
    for (const item of obj) collectNodesByKey(item, keyName, out);
    return out;
  }

  for (const [key, value] of Object.entries(obj)) {
    if (key === keyName) {
      if (Array.isArray(value)) out.push(...value);
      else if (value && typeof value === 'object') out.push(value);
    }
    collectNodesByKey(value, keyName, out);
  }

  return out;
}

function extractFirstUrl(value) {
  if (value == null) return '';

  if (typeof value === 'string') {
    const m = value.match(/https?:\/\/[^\s"'<>]+/i);
    return m ? m[0] : '';
  }

  if (Array.isArray(value)) {
    for (const item of value) {
      const found = extractFirstUrl(item);
      if (found) return found;
    }
    return '';
  }

  if (typeof value === 'object') {
    for (const v of Object.values(value)) {
      const found = extractFirstUrl(v);
      if (found) return found;
    }
  }

  return '';
}

function absolutizeParlamentUrl(u) {
  const url = normalizeString(u);
  if (!url) return '';
  if (/^https?:\/\//i.test(url)) return url;
  if (url.startsWith('//')) return `https:${url}`;
  if (url.startsWith('/')) return `https://www.parlament.hu${url}`;
  return url;
}

function getNodeUrl(node) {
  const candidates = [
    getAttr(node, 'url'),
    getAttr(node, 'href'),
    getAttr(node, 'link'),
    normalizeString(node?.url),
    normalizeString(node?.href),
    normalizeString(node?.link),
    normalizeString(node?.pdf),
    normalizeString(node?.pdf_url)
  ].filter(Boolean);

  for (const c of candidates) {
    const found = absolutizeParlamentUrl(c);
    if (found) return found;
  }

  const deep = extractFirstUrl(node);
  return absolutizeParlamentUrl(deep);
}

function toHitRecord(node, firstSeen) {
  const izon =
    getAttr(node, 'izon') ||
    getAttr(node, 'p_izon') ||
    getAttr(node, 'iromanyazon') ||
    getAttr(node, 'iromany_azon') ||
    getAttr(node, 'azon') ||
    '';

  const title = getTitle(node);
  const url = getNodeUrl(node);

  const blob = normalizeString(
    [
      title,
      JSON.stringify(node)
        .replace(/\\u00a0/g, ' ')
        .replace(/\s+/g, ' ')
        .slice(0, 4000)
    ].join(' ')
  );

  return {
    izon: izon || null,
    title: title || null,
    url: url || null,
    first_seen: firstSeen,
    blob
  };
}

async function sendTelegramMessage(text) {
  if (!TELEGRAM_TOKEN || !TELEGRAM_CHAT_ID) {
    throw new Error('Missing TELEGRAM_BOT_TOKEN and/or TELEGRAM_CHAT_ID environment variables.');
  }

  const payload = {
    chat_id: TELEGRAM_CHAT_ID,
    text,
    disable_web_page_preview: false
  };

  if (TELEGRAM_MESSAGE_THREAD_ID) {
    payload.message_thread_id = Number(TELEGRAM_MESSAGE_THREAD_ID);
  }

  const resp = await fetch(`https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(payload)
  });

  const json = await resp.json().catch(() => null);
  if (!resp.ok || !json?.ok) {
    throw new Error(
      `Telegram sendMessage failed (${resp.status} ${resp.statusText}): ${json ? JSON.stringify(json) : 'no json'}`
    );
  }
}

async function main() {
  if (!TOKEN) {
    console.error('Missing PARLAMENT_ACCESS_TOKEN environment variable.');
    process.exitCode = 2;
    return;
  }

  const xmlText = await fetchText(LIST_URL);

  const parser = new XMLParser({
    ignoreAttributes: false,
    attributeNamePrefix: '@_',
    trimValues: true,
    parseTagValue: true,
    parseAttributeValue: true
  });

  let parsed;
  try {
    parsed = parser.parse(xmlText);
  } catch (err) {
    throw new Error(`Failed to parse XML from Országgyűlés API: ${(err && err.message) || String(err)}`);
  }

  const rawNodes = collectNodesByKey(parsed, 'iromany');
  if (!rawNodes.length) {
    throw new Error('No <iromany> nodes found in API response. The API schema may have changed.');
  }

  const ts = nowIsoUtc();

  const hitsState = await loadJson(STATE_PATH, { seen_izon: [] });
  const seen = new Set(Array.isArray(hitsState.seen_izon) ? hitsState.seen_izon.map(String) : []);

  const allMatches = [];
  for (const node of rawNodes) {
    const hit = toHitRecord(node, ts);
    if (!hit.izon) continue;
    if (!KW_RE.test(hit.blob)) continue;
    allMatches.push(hit);
  }

  const newHits = allMatches.filter((h) => h.izon && !seen.has(String(h.izon)));

  // Ha nincs új találat, nincs teendő.
  if (!newHits.length) {
    return;
  }

  const newest = newHits[0];
  const url = newest?.url || 'https://www.parlament.hu/iromanyok';
  const message = `Új iromány\n${url}`;
  await sendTelegramMessage(message);

  const nextState = {
    updated: ts,
    seen_izon: Array.from(new Set([...seen, ...newHits.map((h) => String(h.izon))])).sort()
  };

  await writeJson(STATE_PATH, nextState);
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
