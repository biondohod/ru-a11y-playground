import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

function formatList(values) {
  return Array.isArray(values) && values.length > 0 ? values.join(', ') : '-';
}

/**
 * Builds a readable markdown report from ru-a11y JSON report payload.
 */
export function renderMarkdownReport(report, title = 'ru-a11y CLI report') {
  const lines = [];

  lines.push(`# ${title}`);
  lines.push('');
  lines.push(`- Generated at: ${report.generatedAt ?? '-'}`);
  lines.push(`- Scanned pages: ${report.scannedPages ?? 0}`);
  lines.push(`- Total issues: ${report.totalIssues ?? 0}`);
  lines.push('');

  for (const page of report.pages ?? []) {
    lines.push(`## ${page.url}`);

    if (page.error) {
      lines.push('');
      lines.push(`- Audit error: ${page.error}`);
      lines.push('');
      continue;
    }

    lines.push('');
    lines.push(`- Duration: ${page.durationMs ?? 0} ms`);
    lines.push(`- Issues: ${page.issues?.length ?? 0}`);

    if (!page.issues || page.issues.length === 0) {
      lines.push('');
      lines.push('- No issues found.');
      lines.push('');
      continue;
    }

    lines.push('');
    page.issues.forEach((issue, index) => {
      lines.push(`### ${index + 1}. ${issue.title}`);
      lines.push('');
      lines.push(`- Severity: ${issue.severity}`);
      lines.push(`- Principle: ${issue.principle}`);
      lines.push(`- Selector: \`${issue.selector}\``);
      lines.push(`- Rule: ${issue.ruRuleCode} / axe: ${issue.axeRuleId}`);
      lines.push(`- Description: ${issue.description}`);
      lines.push(`- Recommendation: ${issue.recommendation}`);
      lines.push(`- GOST refs: ${formatList(issue.gostRefs)}`);
      lines.push(`- Post-102 refs: ${formatList(issue.post102Refs)}`);
      lines.push(`- WCAG refs: ${formatList(issue.wcagRefs)}`);
      lines.push('');
    });
  }

  return `${lines.join('\n').trim()}\n`;
}

async function main() {
  const [inputPath, outputPath, customTitle] = process.argv.slice(2);

  if (!inputPath || !outputPath) {
    process.stderr.write(
      'Usage: node scripts/cli-json-to-md.mjs <input-json> <output-md> [title]\n',
    );
    process.exit(1);
  }

  const jsonPath = resolve(inputPath);
  const markdownPath = resolve(outputPath);

  const payload = await readFile(jsonPath, 'utf-8');
  const report = JSON.parse(payload);
  const markdown = renderMarkdownReport(report, customTitle);

  await mkdir(dirname(markdownPath), { recursive: true });
  await writeFile(markdownPath, markdown, 'utf-8');

  process.stdout.write(`Markdown report saved: ${markdownPath}\n`);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  void main();
}


