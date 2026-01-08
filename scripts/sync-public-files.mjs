import fs from "node:fs/promises";
import path from "node:path";

async function pathExists(p) {
  try {
    await fs.access(p);
    return true;
  } catch {
    return false;
  }
}

async function main() {
  const repoRoot = process.cwd();
  const srcDir = path.join(repoRoot, "docs", "files");
  const destDir = path.join(repoRoot, "docs", "public", "files");

  if (!(await pathExists(srcDir))) {
    return;
  }

  await fs.rm(destDir, { recursive: true, force: true });
  await fs.mkdir(destDir, { recursive: true });
  await fs.cp(srcDir, destDir, { recursive: true });
}

await main();
