import fs from 'node:fs/promises';
import path from 'node:path';
import matter from 'gray-matter';

const REPO_ROOT = process.cwd();
const DOCS_DIR = path.join(REPO_ROOT, 'docs');
const FRONTMATTER_FILE = path.join(REPO_ROOT, 'frontmatter.json');

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

function deriveId(frontmatter, filePath) {
  if (frontmatter && frontmatter.id) return String(frontmatter.id);
  return path.basename(filePath, path.extname(filePath));
}

function uniqSorted(values) {
  return Array.from(new Set(values.filter(Boolean).map(String))).sort((a, b) => a.localeCompare(b));
}

function findField(fields, name) {
  if (!Array.isArray(fields)) return null;
  return fields.find((f) => f && typeof f === 'object' && f.name === name) ?? null;
}

async function collectIdsByKind() {
  const roots = {
    question: path.join(DOCS_DIR, 'questions'),
    template: path.join(DOCS_DIR, 'templates'),
    case: path.join(DOCS_DIR, 'cases'),
    conclusion: path.join(DOCS_DIR, 'conclusions')
  };

  const idsByKind = { question: [], template: [], case: [], conclusion: [] };

  for (const root of Object.values(roots)) {
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

        idsByKind[kind].push(id);
      }
    } catch {
      // Folder may not exist yet; ignore.
    }
  }

  return {
    questions: uniqSorted(idsByKind.question),
    templates: uniqSorted(idsByKind.template),
    cases: uniqSorted(idsByKind.case),
    conclusions: uniqSorted(idsByKind.conclusion)
  };
}

async function main() {
  const [frontmatterRaw, ids] = await Promise.all([
    fs.readFile(FRONTMATTER_FILE, 'utf8'),
    collectIdsByKind()
  ]);

  const config = JSON.parse(frontmatterRaw);
  const contentTypes = config?.['frontMatter.taxonomy.contentTypes'];
  if (!Array.isArray(contentTypes) || contentTypes.length === 0) {
    throw new Error('frontmatter.json: missing frontMatter.taxonomy.contentTypes');
  }

  // We only maintain the first content type (currently "default").
  const defaultType = contentTypes[0];
  const linksField = findField(defaultType?.fields, 'links');
  if (!linksField) throw new Error('frontmatter.json: missing fields.links');

  const linkSubfields = linksField.fields;
  const questionsField = findField(linkSubfields, 'questions');
  const templatesField = findField(linkSubfields, 'templates');
  const casesField = findField(linkSubfields, 'cases');
  const conclusionsField = findField(linkSubfields, 'conclusions');

  if (!questionsField || !templatesField || !casesField || !conclusionsField) {
    throw new Error(
      'frontmatter.json: missing one of links.questions|links.templates|links.cases|links.conclusions'
    );
  }

  questionsField.choices = ids.questions;
  templatesField.choices = ids.templates;
  casesField.choices = ids.cases;
  conclusionsField.choices = ids.conclusions;

  const nextRaw = `${JSON.stringify(config, null, 2)}\n`;
  if (nextRaw === frontmatterRaw || nextRaw === `${frontmatterRaw}\n`) {
    return;
  }

  await fs.writeFile(FRONTMATTER_FILE, nextRaw, 'utf8');
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
