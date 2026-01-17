import fs from 'node:fs/promises';
import path from 'node:path';
import matter from 'gray-matter';

const REPO_ROOT = process.cwd();
const DOCS_DIR = path.join(REPO_ROOT, 'docs');
const OUT_FILE = path.join(DOCS_DIR, '.vitepress', 'data', 'catalog.generated.ts');

function toPosixPath(filePath) {
  return filePath.split(path.sep).join('/');
}

function isMarkdownFile(filePath) {
  return filePath.toLowerCase().endsWith('.md');
}

function shouldIgnoreBasename(basename) {
  return basename.startsWith('.') || basename === '.gitkeep';
}

async function* walk(dirPath) {
  const dirents = await fs.readdir(dirPath, { withFileTypes: true });
  for (const dirent of dirents) {
    if (shouldIgnoreBasename(dirent.name)) continue;
    const fullPath = path.join(dirPath, dirent.name);
    if (dirent.isDirectory()) {
      yield* walk(fullPath);
      continue;
    }
    if (dirent.isFile()) yield fullPath;
  }
}

function classifyKind(docsRelativePath) {
  const rel = toPosixPath(docsRelativePath);
  if (rel.startsWith('questions/templates/')) return 'template';
  if (rel.startsWith('questions/')) return 'question';
  if (rel.startsWith('templates/')) return 'template';
  if (rel.startsWith('cases/')) return 'case';
  if (rel.startsWith('conclusions/')) return 'conclusion';
  return null;
}

function normalizeLinks(input) {
  const links = input && typeof input === 'object' ? input : {};
  const normalizeArray = (value) => (Array.isArray(value) ? value.filter(Boolean).map(String) : []);
  return {
    questions: normalizeArray(links.questions),
    templates: normalizeArray(links.templates),
    cases: normalizeArray(links.cases),
    conclusions: normalizeArray(links.conclusions)
  };
}

function normalizeThread(value) {
  if (!value || typeof value !== 'object') return null;
  const previous = value.previous ? String(value.previous) : null;
  const next = value.next ? String(value.next) : null;
  if (!previous && !next) return null;
  return { previous, next };
}

function normalizeTags(value) {
  if (!value) return [];
  if (Array.isArray(value)) return value.filter(Boolean).map(String);
  return [String(value)];
}

function normalizeCaseStatus(value) {
  if (!value) return null;
  const raw = String(value).trim().toLowerCase();

  // Canonical HU labels
  if (raw === 'nyitott') return 'nyitott';
  if (raw === 'megválaszolt' || raw === 'megvalaszolt') return 'megválaszolt';
  if (raw === 'további kérdéseket felvető' || raw === 'tovabbi kerdeseket felveto') {
    return 'további kérdéseket felvető';
  }

  // Backward-compatible aliases (older drafts)
  if (raw === 'open') return 'nyitott';
  if (raw === 'answered') return 'megválaszolt';
  if (raw === 'followup' || raw === 'follow_up') return 'további kérdéseket felvető';
  if (raw === 'reply_only') return 'megválaszolt';

  return String(value);
}

function normalizeQuestionStatus(value) {
  if (!value) return null;
  const raw = String(value).trim().toLowerCase();

  // Canonical short codes
  if (raw === 'validation') return 'validation';
  if (raw === 'operations') return 'operations';
  if (raw === 'interpretation') return 'interpretation';
  if (raw === 'certainty') return 'certainty';

  // Canonical HU labels (severity)
  if (raw === 'validálással kapcsolatos gyakorlati kérdés' || raw === 'validalassal kapcsolatos gyakorlati kerdes') {
    return 'validation';
  }
  if (
    raw === 'szolgáltató működési gyakorlatát érintő kérdés' ||
    raw === 'szolgaltato mukodesi gyakorlatat erinto kerdes'
  ) {
    return 'operations';
  }
  if (raw === 'jogértelmezési kérdés' || raw === 'jogertelmezesi kerdes') {
    return 'interpretation';
  }
  if (raw === 'jogbiztonságot érintő kérdés' || raw === 'jogbiztonsagot erinto kerdes') {
    return 'certainty';
  }

  // Tolerant aliases (short keys)
  if (raw === 'validation' || raw === 'practical' || raw === 'gyakorlati') {
    return 'validation';
  }
  if (raw === 'operations' || raw === 'operational' || raw === 'mukodesi') {
    return 'operations';
  }
  if (raw === 'interpretation' || raw === 'legal_interpretation' || raw === 'jogertelmezes') {
    return 'interpretation';
  }
  if (raw === 'certainty' || raw === 'legal_certainty' || raw === 'jogbiztonsag') {
    return 'certainty';
  }

  return String(value);
}

function deriveId(frontmatter, filePath) {
  if (frontmatter && frontmatter.id) return String(frontmatter.id);
  return path.basename(filePath, path.extname(filePath));
}

function deriveTitle(frontmatter, id) {
  if (frontmatter && frontmatter.title) return String(frontmatter.title);
  return id;
}

async function buildCatalog() {
  const roots = [
    path.join(DOCS_DIR, 'questions'),
    path.join(DOCS_DIR, 'templates'),
    path.join(DOCS_DIR, 'cases'),
    path.join(DOCS_DIR, 'conclusions')
  ];

  const items = [];
  const byId = {};

  for (const root of roots) {
    try {
      // eslint-disable-next-line no-await-in-loop
      for await (const filePath of walk(root)) {
        if (!isMarkdownFile(filePath)) continue;
        if (path.basename(filePath).toLowerCase() === 'index.md') continue;

        const docsRelativePath = path.relative(DOCS_DIR, filePath);
        const kind = classifyKind(docsRelativePath);
        if (!kind) continue;

        // eslint-disable-next-line no-await-in-loop
        const raw = await fs.readFile(filePath, 'utf8');
        const parsed = matter(raw);
        const id = deriveId(parsed.data, filePath);

        if (byId[id]) {
          // Keep the first occurrence; later ones are likely duplicates.
          continue;
        }

        const route = `/${toPosixPath(docsRelativePath).replace(/\.md$/i, '')}`;
        const title = deriveTitle(parsed.data, id);

        const item = {
          id,
          title,
          kind,
          route,
          tags: normalizeTags(parsed.data?.tags),
          links: normalizeLinks(parsed.data?.links),
          thread: kind === 'case' ? normalizeThread(parsed.data?.links?.thread ?? parsed.data?.thread) : null,
          status:
            kind === 'case'
              ? normalizeCaseStatus(parsed.data?.status)
              : kind === 'question'
                ? normalizeQuestionStatus(parsed.data?.status)
                : null
        };

        byId[id] = item;
        items.push(item);
      }
    } catch {
      // Folder may not exist yet; ignore.
    }
  }

  const backlinks = {};
  const ensureBacklinks = (targetId) => {
    if (!backlinks[targetId]) backlinks[targetId] = { questions: [], templates: [], cases: [], conclusions: [] };
    return backlinks[targetId];
  };

  const sourceGroupForKind = (kind) => {
    if (kind === 'question') return 'questions';
    if (kind === 'template') return 'templates';
    if (kind === 'case') return 'cases';
    if (kind === 'conclusion') return 'conclusions';
    return null;
  };

  for (const item of items) {
    const sourceGroup = sourceGroupForKind(item.kind);
    if (!sourceGroup) continue;

    // Backlinks are grouped by the *source* document kind, not by which
    // `links.*` field was used. This keeps the UI stable (cases never show up
    // under "Kapcsolódó kérdések", etc.).
    for (const targetId of item.links.questions) ensureBacklinks(targetId)[sourceGroup].push(item.id);
    for (const targetId of item.links.templates) ensureBacklinks(targetId)[sourceGroup].push(item.id);
    for (const targetId of item.links.cases) ensureBacklinks(targetId)[sourceGroup].push(item.id);
    for (const targetId of item.links.conclusions) ensureBacklinks(targetId)[sourceGroup].push(item.id);
  }

  // De-dup backlinks deterministically
  for (const key of Object.keys(backlinks)) {
    backlinks[key].questions = Array.from(new Set(backlinks[key].questions)).sort();
    backlinks[key].templates = Array.from(new Set(backlinks[key].templates)).sort();
    backlinks[key].cases = Array.from(new Set(backlinks[key].cases)).sort();
    backlinks[key].conclusions = Array.from(new Set(backlinks[key].conclusions)).sort();
  }

  items.sort((a, b) => a.id.localeCompare(b.id));

  return {
    generatedAt: new Date().toISOString(),
    items,
    byId,
    backlinks
  };
}

async function main() {
  const dataDir = path.dirname(OUT_FILE);
  await fs.mkdir(dataDir, { recursive: true });

  const catalog = await buildCatalog();

  const ts = [
    '// This file is auto-generated by scripts/build-catalog.mjs',
    '// Do not edit by hand.',
    '',
    `export const catalog = ${JSON.stringify(catalog, null, 2)} as const;`,
    '',
    'export type CatalogItem = (typeof catalog.items)[number];',
    'export type Catalog = typeof catalog;',
    ''
  ].join('\n');

  await fs.writeFile(OUT_FILE, ts, 'utf8');
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
