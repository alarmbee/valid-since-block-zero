import fs from 'node:fs/promises';
import path from 'node:path';
import pdf from 'pdf-parse';

async function main() {
  const [, , inputPath] = process.argv;

  if (!inputPath) {
    console.error('Usage: node scripts/extract-pdf-text.mjs <path-to-pdf>');
    process.exit(2);
  }

  const resolved = path.resolve(process.cwd(), inputPath);
  const buf = await fs.readFile(resolved);
  const data = await pdf(buf);

  // Keep output simple and stable for piping.
  // pdf-parse already normalizes line endings; we just trim trailing spaces.
  const text = String(data.text ?? '')
    .replace(/\r\n/g, '\n')
    .replace(/\r/g, '\n')
    .split('\n')
    .map((l) => l.replace(/\s+$/g, ''))
    .join('\n')
    .trim();

  process.stdout.write(text + '\n');
}

await main();
