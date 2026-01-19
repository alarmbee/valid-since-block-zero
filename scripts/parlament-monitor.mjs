import fs from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';
import { XMLParser } from 'fast-xml-parser';
import matter from 'gray-matter';
import * as cheerio from 'cheerio';
import * as pdfjsLib from 'pdfjs-dist/legacy/build/pdf.mjs';

const REPO_ROOT = process.cwd();

const TOKEN = process.env.PARLAMENT_ACCESS_TOKEN;
const BASE_URL = process.env.PARLAMENT_API_BASE || 'https://www.parlament.hu/cgi-bin/web-api-pub';
const LIST_URL = `${BASE_URL}/iromanyok.cgi?access_token=${encodeURIComponent(TOKEN ?? '')}`;

const STATE_PATH = path.join(REPO_ROOT, '.cache', 'parlament-monitor', 'state.json');
const PENDING_SEEN_PATH = path.join(REPO_ROOT, '.cache', 'parlament-monitor', 'seen-to-add.json');

const DOCS_DIR = path.join(REPO_ROOT, 'docs');
const CASES_DIR = path.join(DOCS_DIR, 'cases');

// AI config (prefer GitHub Models; keep everything configurable via vars/secrets)
const AI_API_BASE_URL = process.env.AI_API_BASE_URL || process.env.GITHUB_MODELS_BASE_URL || '';
const AI_CHAT_COMPLETIONS_PATH = process.env.AI_CHAT_COMPLETIONS_PATH || '/v1/chat/completions';
const AI_MODEL = process.env.AI_MODEL || '';
const AI_API_KEY =
  process.env.AI_API_KEY ||
  (String(process.env.AI_USE_GITHUB_TOKEN || '').toLowerCase() === 'true' ? process.env.GITHUB_TOKEN : '') ||
  '';
const AI_TEMPERATURE = Number.isFinite(Number(process.env.AI_TEMPERATURE)) ? Number(process.env.AI_TEMPERATURE) : 0.2;
const AI_MAX_TOKENS = Number.isFinite(Number(process.env.AI_MAX_TOKENS)) ? Number(process.env.AI_MAX_TOKENS) : 900;
const AI_MAX_INPUT_CHARS = Number.isFinite(Number(process.env.AI_MAX_INPUT_CHARS))
  ? Number(process.env.AI_MAX_INPUT_CHARS)
  : 25_000;
const AI_PDF_MAX_PAGES = Number.isFinite(Number(process.env.AI_PDF_MAX_PAGES)) ? Number(process.env.AI_PDF_MAX_PAGES) : 10;
const AI_MAX_NEW_HITS = Number.isFinite(Number(process.env.AI_MAX_NEW_HITS)) ? Number(process.env.AI_MAX_NEW_HITS) : 1;
const AI_PROMPT_PATH =
  process.env.AI_PROMPT_PATH || path.join(REPO_ROOT, 'scripts', 'prompts', 'parlament-case.md');

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

async function fetchBuffer(url, opts = {}) {
  const res = await fetch(url, { redirect: 'follow', ...opts });
  if (!res.ok) {
    const body = await res.text().catch(() => '');
    throw new Error(`HTTP ${res.status} ${res.statusText} for ${url}${body ? `: ${body.slice(0, 500)}` : ''}`);
  }
  const arrayBuffer = await res.arrayBuffer();
  return {
    url: res.url || url,
    contentType: res.headers.get('content-type') || '',
    buffer: Buffer.from(arrayBuffer)
  };
}

function escapeHtml(s) {
  return String(s)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

function truncateMiddle(s, maxLen) {
  const str = String(s ?? '');
  if (str.length <= maxLen) return str;
  const head = Math.max(0, Math.floor((maxLen - 3) / 2));
  const tail = Math.max(0, maxLen - 3 - head);
  return str.slice(0, head) + '...' + str.slice(str.length - tail);
}

function detectDocType(contentType, url, buffer) {
  const ct = String(contentType || '').toLowerCase();
  const u = String(url || '').toLowerCase();
  if (ct.includes('application/pdf')) return 'pdf';
  if (ct.includes('text/html')) return 'html';
  if (u.endsWith('.pdf')) return 'pdf';
  if (u.endsWith('.htm') || u.endsWith('.html')) return 'html';
  if (buffer && buffer.length >= 5 && buffer.subarray(0, 5).toString('utf8') === '%PDF-') return 'pdf';
  return 'unknown';
}

function normalizeTextBlock(text) {
  return String(text || '')
    .replace(/\u00a0/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function splitIntoExcerpts(text, opts = {}) {
  const maxExcerptLen = opts.maxExcerptLen ?? 700;
  const maxExcerpts = opts.maxExcerpts ?? 5;
  const normalized = normalizeTextBlock(text);
  if (!normalized) return [];

  const step = Math.max(1, Math.floor(normalized.length / Math.max(1, maxExcerpts)));
  const excerpts = [];
  for (let i = 0; i < maxExcerpts; i++) {
    const start = i * step;
    if (start >= normalized.length) break;
    const slice = normalized.slice(start, start + maxExcerptLen);
    if (slice.length < 120) continue;
    excerpts.push(slice);
  }
  return excerpts;
}

async function extractTextFromPdf(buffer) {
  const loadingTask = pdfjsLib.getDocument({ data: buffer, disableWorker: true });
  const pdf = await loadingTask.promise;
  const pageCount = pdf.numPages || 0;
  const pagesToRead = Math.max(1, Math.min(pageCount, AI_PDF_MAX_PAGES));
  const pageTexts = [];

  for (let pageNumber = 1; pageNumber <= pagesToRead; pageNumber++) {
    // eslint-disable-next-line no-await-in-loop
    const page = await pdf.getPage(pageNumber);
    // eslint-disable-next-line no-await-in-loop
    const content = await page.getTextContent();
    const text = normalizeTextBlock((content.items || []).map((it) => it?.str || '').join(' '));
    pageTexts.push({ page: pageNumber, text });
  }

  const fullText = normalizeTextBlock(pageTexts.map((p) => p.text).join('\n\n'));

  const excerptSources = [];
  const pickPages = new Set([1, Math.max(1, Math.floor(pagesToRead / 2)), pagesToRead]);
  for (const p of pageTexts) {
    if (!pickPages.has(p.page)) continue;
    const ex = splitIntoExcerpts(p.text, { maxExcerpts: 1, maxExcerptLen: 700 })[0];
    if (!ex) continue;
    excerptSources.push({ excerpt_id: `P${p.page}`, page: p.page, text: ex });
  }

  return { text: fullText, excerpts: excerptSources };
}

async function extractTextFromHtml(html) {
  const $ = cheerio.load(String(html || ''));
  $('script,style,noscript,svg,nav,header,footer,form,aside').remove();
  const main = $('main').text() || $('article').text() || $('body').text() || $.root().text();
  const text = normalizeTextBlock(main);
  const excerptSources = splitIntoExcerpts(text, { maxExcerpts: 4, maxExcerptLen: 700 }).map((t, idx) => ({
    excerpt_id: `H${idx + 1}`,
    page: null,
    text: t
  }));
  return { text, excerpts: excerptSources };
}

function isProbablyScannedOrEmpty(extractedText) {
  const t = normalizeTextBlock(extractedText);
  if (t.length < 1500) return true;
  const letters = (t.match(/[\p{L}]/gu) || []).length;
  return letters < 600;
}

async function resolveCanonicalSourceUrl(hit) {
  const initial = hit?.url ? String(hit.url) : '';
  if (initial && initial.toLowerCase().endsWith('.pdf')) return initial;

  if (initial) {
    try {
      const html = await fetchText(initial);
      const $ = cheerio.load(html);
      const pdfCandidates = [];
      $('a[href]').each((_, el) => {
        const href = String($(el).attr('href') || '').trim();
        if (!href) return;
        if (!href.toLowerCase().endsWith('.pdf')) return;
        pdfCandidates.push(absolutizeParlamentUrl(href));
      });
      const firstPdf = pdfCandidates.find(Boolean);
      if (firstPdf) return firstPdf;
    } catch {
      // Ignore; fall back to heuristics.
    }
  }

  const id = hit?.izon ? String(hit.izon) : '';
  const digits = id.match(/(\d{3,})/g)?.join('') || '';
  if (digits) {
    const heuristicPdf = `https://www.parlament.hu/irom42/${digits}/${digits}.pdf`;
    try {
      const res = await fetch(heuristicPdf, { method: 'HEAD', redirect: 'follow' });
      if (res.ok) return heuristicPdf;
    } catch {
      // ignore
    }
  }

  return initial || 'https://www.parlament.hu/iromanyok';
}

async function loadPromptTemplate() {
  try {
    return await fs.readFile(AI_PROMPT_PATH, 'utf8');
  } catch {
    return '';
  }
}

function fillTemplate(template, vars) {
  let out = String(template || '');
  for (const [k, v] of Object.entries(vars || {})) {
    out = out.replaceAll(`{{${k}}}`, String(v));
  }
  return out;
}

function joinUrl(base, pathPart) {
  const b = String(base || '').replace(/\/+$/, '');
  const p = String(pathPart || '').startsWith('/') ? String(pathPart || '') : `/${pathPart}`;
  return `${b}${p}`;
}

async function callChatCompletions({ system, user }) {
  if (!AI_API_BASE_URL || !AI_MODEL || !AI_API_KEY) {
    throw new Error(
      'Missing AI config: AI_API_BASE_URL, AI_MODEL, and AI_API_KEY (or AI_USE_GITHUB_TOKEN=true with GITHUB_TOKEN).'
    );
  }

  const url = joinUrl(AI_API_BASE_URL, AI_CHAT_COMPLETIONS_PATH);
  const payload = {
    model: AI_MODEL,
    temperature: AI_TEMPERATURE,
    max_tokens: AI_MAX_TOKENS,
    messages: [
      { role: 'system', content: system },
      { role: 'user', content: user }
    ]
  };

  const resp = await fetch(url, {
    method: 'POST',
    headers: {
      authorization: `Bearer ${AI_API_KEY}`,
      'content-type': 'application/json'
    },
    body: JSON.stringify(payload)
  });

  const json = await resp.json().catch(() => null);
  if (!resp.ok) {
    const msg = json ? JSON.stringify(json).slice(0, 500) : '';
    throw new Error(`AI chat completion failed (${resp.status} ${resp.statusText})${msg ? `: ${msg}` : ''}`);
  }

  const content = json?.choices?.[0]?.message?.content;
  if (!content || typeof content !== 'string') {
    throw new Error('AI chat completion returned no content.');
  }

  return content;
}

function stripOuterCodeFence(s) {
  const text = String(s || '').trim();
  const m = text.match(/^```[a-zA-Z0-9_-]*\n([\s\S]*?)\n```\s*$/);
  return m ? m[1].trim() : text;
}

function validateCaseMarkdown(md) {
  const raw = String(md || '');
  const parsed = matter(raw);
  const data = parsed?.data || {};
  const required = ['status', 'links', 'thread', 'date', 'subject', 'mailto', 'source_url', 'doc_id', 'fetched_at'];
  for (const k of required) {
    if (data[k] == null || data[k] === '') {
      throw new Error(`Generated case missing required frontmatter field: ${k}`);
    }
  }
  if (!parsed.content || parsed.content.trim().length < 200) {
    throw new Error('Generated case body is too short.');
  }
  if (!/^#\s+/.test(parsed.content.trim())) {
    throw new Error('Generated case body must start with a level-1 title (# ...).');
  }
}

async function getNextCaseId(year) {
  const yy = String(year);
  await fs.mkdir(CASES_DIR, { recursive: true });
  const entries = await fs.readdir(CASES_DIR);
  const re = new RegExp(`^C-${yy}-(\\d{3})\\.md$`, 'i');
  let max = 0;
  for (const name of entries) {
    const m = name.match(re);
    if (!m) continue;
    max = Math.max(max, Number(m[1]));
  }
  const next = String(max + 1).padStart(3, '0');
  return `C-${yy}-${next}`;
}

async function appendPendingSeen(izon) {
  const current = await loadJson(PENDING_SEEN_PATH, { izon: [] });
  const seen = new Set(Array.isArray(current.izon) ? current.izon.map(String) : []);
  if (izon) seen.add(String(izon));
  await writeJson(PENDING_SEEN_PATH, { updated: nowIsoUtc(), izon: Array.from(seen).sort() });
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

async function sendTelegramMessage(text, opts = {}) {
  if (!TELEGRAM_TOKEN || !TELEGRAM_CHAT_ID) {
    throw new Error('Missing TELEGRAM_BOT_TOKEN and/or TELEGRAM_CHAT_ID environment variables.');
  }

  const payload = {
    chat_id: TELEGRAM_CHAT_ID,
    text,
    disable_web_page_preview: Boolean(opts.disable_web_page_preview)
  };

  if (opts.parse_mode) {
    payload.parse_mode = opts.parse_mode;
  }

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
