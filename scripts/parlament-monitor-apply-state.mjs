import fs from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';

const REPO_ROOT = process.cwd();
const STATE_PATH = path.join(REPO_ROOT, '.cache', 'parlament-monitor', 'state.json');
const PENDING_SEEN_PATH = path.join(REPO_ROOT, '.cache', 'parlament-monitor', 'seen-to-add.json');

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

function nowIsoUtc() {
  return new Date().toISOString();
}

async function main() {
  const pending = await loadJson(PENDING_SEEN_PATH, { izon: [] });
  const pendingIds = Array.isArray(pending.izon) ? pending.izon.map(String) : [];
  if (pendingIds.length === 0) {
    return;
  }

  const state = await loadJson(STATE_PATH, { seen_izon: [] });
  const seen = new Set(Array.isArray(state.seen_izon) ? state.seen_izon.map(String) : []);
  for (const id of pendingIds) seen.add(id);

  await writeJson(STATE_PATH, {
    updated: nowIsoUtc(),
    seen_izon: Array.from(seen).sort()
  });

  // Clear pending ids after successful merge.
  await writeJson(PENDING_SEEN_PATH, { updated: nowIsoUtc(), izon: [] });
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
