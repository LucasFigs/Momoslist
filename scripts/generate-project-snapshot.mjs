import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const outputPath = path.join(projectRoot, "PROJECT_SNAPSHOT.md");
const excludedDirectories = new Set([".git", ".next", "node_modules"]);
const excludedFiles = new Set([".env", ".env.local", "PROJECT_SNAPSHOT.md", "tsconfig.tsbuildinfo"]);
const includedRootFiles = new Set([
  ".env.example",
  ".eslintrc.json",
  ".gitignore",
  "next-env.d.ts",
  "next.config.mjs",
  "package-lock.json",
  "package.json",
  "postcss.config.mjs",
  "README.md",
  "tailwind.config.ts",
  "tsconfig.json",
]);

async function collectFiles(directory, relativeDirectory = "") {
  const entries = await (await import("node:fs/promises")).readdir(directory, { withFileTypes: true });
  const files = [];

  for (const entry of entries.sort((left, right) => left.name.localeCompare(right.name))) {
    const relativePath = path.join(relativeDirectory, entry.name);

    if (entry.isDirectory()) {
      if (!excludedDirectories.has(entry.name)) {
        files.push(...(await collectFiles(path.join(directory, entry.name), relativePath)));
      }
      continue;
    }

    if (relativeDirectory === "" && !includedRootFiles.has(entry.name)) {
      continue;
    }

    if (excludedFiles.has(entry.name)) {
      continue;
    }

    files.push(relativePath);
  }

  return files;
}

function languageFor(filePath) {
  const extension = path.extname(filePath).toLowerCase();
  return {
    ".css": "css",
    ".json": "json",
    ".mjs": "javascript",
    ".prisma": "prisma",
    ".ts": "typescript",
    ".tsx": "tsx",
    ".md": "markdown",
    ".d.ts": "typescript",
  }[extension] ?? "";
}

function redactSecrets(content, filePath) {
  if (path.basename(filePath) !== ".env.example") {
    return content;
  }

  return content.replace(/^([A-Z0-9_]*(?:SECRET|KEY|TOKEN|PASSWORD|URL)[A-Z0-9_]*)=(.*)$/gm, "$1=\"[redacted in snapshot]\"");
}

function treeFor(files) {
  const root = {};

  for (const file of files) {
    let current = root;
    const parts = file.split(path.sep);

    for (const part of parts.slice(0, -1)) {
      current[part] ??= {};
      current = current[part];
    }

    current[parts.at(-1)] = null;
  }

  function render(node, prefix = "") {
    const entries = Object.entries(node);
    return entries
      .map(([name, child], index) => {
        const last = index === entries.length - 1;
        const branch = last ? "└── " : "├── ";
        const nextPrefix = prefix + (last ? "    " : "│   ");
        const lines = [`${prefix}${branch}${name}`];
        if (child) {
          lines.push(...render(child, nextPrefix));
        }
        return lines;
      })
      .flat();
  }

  return ["gift-list-platform/", ...render(root, "")].join("\n");
}

const files = await collectFiles(projectRoot);
const sections = [];

for (const file of files) {
  const absolutePath = path.join(projectRoot, file);
  const content = redactSecrets(await readFile(absolutePath, "utf8"), file);
  sections.push(`### \`${file.replaceAll("\\", "/")}\`\n\n\`\`\`${languageFor(file)}\n${content.trimEnd()}\n\`\`\``);
}

const snapshot = [
  "# Snapshot do projeto",
  "",
  `> Gerado em ${new Date().toISOString()} por \`npm run snapshot\`.`,
  ">",
  "> Este arquivo documenta a estrutura e o conteúdo dos arquivos-fonte/configuração do projeto.",
  "> Dependências instaladas, artefatos de build, caches e arquivos `.env` locais são omitidos.",
  "",
  "## Estrutura incluída",
  "",
  "```text",
  treeFor(files),
  "```",
  "",
  "## Conteúdo dos arquivos",
  "",
  sections.join("\n\n"),
  "",
].join("\n");

await writeFile(outputPath, snapshot, "utf8");
console.log(`Snapshot gerado: ${path.relative(projectRoot, outputPath)} (${files.length} arquivos)`);
