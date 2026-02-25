import * as fs from 'node:fs';
import * as path from 'node:path';

const ENTRY_FILE = 'GEMINI.md';
const OUTPUT_FILE = '.gemini/styleguide.md';

function demoteHeadings(content: string): string {
  return content.replace(/^(#+ )/gm, '#$1');
}

function getFileContent(filePath: string): string {
  if (!fs.existsSync(filePath)) {
    console.warn(`⚠️ File not found: ${filePath}`);
    return ``;
  }

  const rawContent = fs.readFileSync(filePath, 'utf8').trim();
  return demoteHeadings(rawContent);
}

try {
  console.log('🚀 Bundling Gemini Styleguide with Heading Demotion...');

  if (!fs.existsSync(ENTRY_FILE)) {
    throw new Error(`${ENTRY_FILE} が見つかりません。`);
  }

  const entryContent = fs.readFileSync(ENTRY_FILE, 'utf8');
  const dir = path.dirname(ENTRY_FILE);
  const h1Match = entryContent.match(/^# .+/m);
  const h1Title = h1Match ? h1Match[0] : '# Style Guide';
  const combinedRegex = /\[[^\]]+\]\(([^)]+\.md)\)|`([^`]+\.md)`/g;
  const matches = [...entryContent.matchAll(combinedRegex)];
  const bundledSections = matches.map((match) => {
    const targetPath = match[1] || match[2];
    if (targetPath.startsWith('http')) return '';

    const fullPath = path.resolve(dir, targetPath);
    console.log(`📦 Including & Demoting: ${targetPath}`);

    return getFileContent(fullPath);
  });

  const finalContent = [h1Title, ...bundledSections].filter(Boolean).join('\n\n');

  if (!fs.existsSync('.gemini')) {
    fs.mkdirSync('.gemini', { recursive: true });
  }

  fs.writeFileSync(OUTPUT_FILE, finalContent, 'utf8');
  console.log(`✅ Success! Generated ${OUTPUT_FILE} (Structured version)`);
} catch (err) {
  console.error('❌ Error:', err);
  process.exit(1);
}
