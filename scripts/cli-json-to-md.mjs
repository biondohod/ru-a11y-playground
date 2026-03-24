import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, extname, resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

function formatList(values) {
  return Array.isArray(values) && values.length > 0 ? values.join(', ') : '-';
}

function escapeHtml(value) {
  return String(value ?? '')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

function getSeverityClass(severity) {
  const normalized = String(severity ?? '').toLowerCase();
  if (normalized.includes('крит')) {
    return 'sev-critical';
  }
  if (normalized.includes('суще')) {
    return 'sev-major';
  }
  return 'sev-minor';
}

function normalizeReport(report) {
  const pages = Array.isArray(report?.pages)
    ? report.pages.map((page) => {
        const issues = Array.isArray(page.issues) ? page.issues : [];
        return {
          ...page,
          issues,
          issueCount: issues.length,
          hasError: Boolean(page.error),
          isClean: !page.error && issues.length === 0,
        };
      })
    : [];

  const totalIssues = pages.reduce((acc, page) => acc + page.issueCount, 0);

  return {
    generatedAt: report?.generatedAt ?? '-',
    scannedPages: report?.scannedPages ?? pages.length,
    totalIssues,
    pages,
    pagesWithIssues: pages.filter((page) => page.issueCount > 0).length,
    pagesWithoutIssues: pages.filter((page) => page.isClean).length,
    pagesWithErrors: pages.filter((page) => page.hasError).length,
  };
}

/**
 * Builds a readable markdown report from ru-a11y JSON report payload.
 */
export function renderMarkdownReport(report, title = 'ru-a11y CLI report') {
  const data = normalizeReport(report);
  const lines = [];

  lines.push(`# ${title}`);
  lines.push('');
  lines.push(`- Generated at: ${data.generatedAt}`);
  lines.push(`- Scanned pages: ${data.scannedPages}`);
  lines.push(`- Total issues: ${data.totalIssues}`);
  lines.push('');

  for (const page of data.pages) {
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

/**
 * Builds a styled HTML report for easy demo presentation.
 */
export function renderHtmlReport(report, title = 'ru-a11y CLI report') {
  const data = normalizeReport(report);

  const pageToc = data.pages
    .map((page, index) => {
      const badgeClass = page.hasError
        ? 'status-error'
        : page.issueCount > 0
          ? 'status-bad'
          : 'status-good';
      const badgeLabel = page.hasError
        ? 'Ошибка аудита'
        : page.issueCount > 0
          ? `${page.issueCount} нарушений`
          : 'Без нарушений';
      return `<a class="toc-item" href="#page-${index + 1}"><span class="toc-url">${escapeHtml(
        page.url,
      )}</span><span class="status-badge ${badgeClass}">${escapeHtml(badgeLabel)}</span></a>`;
    })
    .join('');

  const pageSections = data.pages
    .map((page, pageIndex) => {
      const statusClass = page.hasError
        ? 'status-error'
        : page.issueCount > 0
          ? 'status-bad'
          : 'status-good';
      const statusLabel = page.hasError
        ? 'Ошибка аудита'
        : page.issueCount > 0
          ? `${page.issueCount} нарушений`
          : 'Без нарушений';

      const issuesHtml = page.hasError
        ? `<div class="panel panel-error">${escapeHtml(page.error)}</div>`
        : page.issueCount === 0
          ? '<div class="panel panel-ok">Для страницы нарушения не найдены.</div>'
          : page.issues
              .map((issue, issueIndex) => {
                const severityClass = getSeverityClass(issue.severity);
                return `
                <article class="issue-card">
                  <div class="issue-head">
                    <h4>${issueIndex + 1}. ${escapeHtml(issue.title)}</h4>
                    <span class="severity ${severityClass}">${escapeHtml(issue.severity)}</span>
                  </div>
                  <div class="issue-meta">
                    <span><strong>Принцип:</strong> ${escapeHtml(issue.principle)}</span>
                    <span><strong>Правило:</strong> ${escapeHtml(issue.ruRuleCode)} / axe: ${escapeHtml(issue.axeRuleId)}</span>
                    <span><strong>Селектор:</strong> <code>${escapeHtml(issue.selector)}</code></span>
                  </div>
                  <p><strong>Описание:</strong> ${escapeHtml(issue.description)}</p>
                  <p><strong>Рекомендация:</strong> ${escapeHtml(issue.recommendation)}</p>
                  <p><strong>ГОСТ:</strong> ${escapeHtml(formatList(issue.gostRefs))}</p>
                  <p><strong>ПП №102:</strong> ${escapeHtml(formatList(issue.post102Refs))}</p>
                  <p><strong>WCAG:</strong> ${escapeHtml(formatList(issue.wcagRefs))}</p>
                </article>`;
              })
              .join('');

      return `
      <section class="page-card" id="page-${pageIndex + 1}">
        <div class="page-head">
          <h3>${pageIndex + 1}. ${escapeHtml(page.url)}</h3>
          <span class="status-badge ${statusClass}">${escapeHtml(statusLabel)}</span>
        </div>
        <div class="page-meta">
          <span><strong>Время проверки:</strong> ${Number(page.durationMs ?? 0)} ms</span>
          <span><strong>Количество нарушений:</strong> ${page.issueCount}</span>
        </div>
        ${issuesHtml}
      </section>`;
    })
    .join('');

  return `<!doctype html>
<html lang="ru">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${escapeHtml(title)}</title>
  <style>
    :root {
      --bg: #0b1220;
      --panel: #111a2e;
      --panel-2: #16233d;
      --text: #ecf2ff;
      --muted: #b4c0db;
      --border: #283a63;
      --ok: #0ea765;
      --bad: #ea3d52;
      --warn: #f59e0b;
      --err: #7c3aed;
    }
    * { box-sizing: border-box; }
    body {
      margin: 0;
      font-family: Inter, Segoe UI, Arial, sans-serif;
      background: radial-gradient(circle at top, #142241, var(--bg) 60%);
      color: var(--text);
      line-height: 1.5;
    }
    main { max-width: 1200px; margin: 0 auto; padding: 32px 20px 56px; }
    h1 { margin: 0 0 8px; font-size: 32px; }
    h2 { margin: 0 0 12px; font-size: 20px; }
    h3 { margin: 0; font-size: 18px; }
    p, code { color: var(--muted); }
    a { color: #a9d2ff; text-decoration: none; }
    a:hover { text-decoration: underline; }
    .hero, .toc, .page-card {
      background: linear-gradient(180deg, rgba(255,255,255,0.03), rgba(255,255,255,0.01));
      border: 1px solid var(--border);
      border-radius: 16px;
      padding: 18px;
      margin-bottom: 18px;
      backdrop-filter: blur(2px);
    }
    .stats {
      display: grid;
      gap: 12px;
      grid-template-columns: repeat(auto-fit, minmax(190px, 1fr));
      margin-top: 16px;
    }
    .stat {
      background: var(--panel);
      border: 1px solid var(--border);
      border-radius: 12px;
      padding: 12px;
    }
    .stat b { display: block; font-size: 24px; color: var(--text); }
    .toc-list { display: grid; gap: 10px; }
    .toc-item {
      display: flex;
      justify-content: space-between;
      gap: 10px;
      align-items: center;
      background: var(--panel);
      border: 1px solid var(--border);
      border-radius: 10px;
      padding: 10px 12px;
    }
    .toc-url { white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
    .page-head {
      display: flex;
      justify-content: space-between;
      gap: 12px;
      align-items: center;
      margin-bottom: 8px;
    }
    .page-meta { display: flex; flex-wrap: wrap; gap: 14px; color: var(--muted); margin-bottom: 14px; }
    .status-badge {
      display: inline-flex;
      border-radius: 999px;
      padding: 5px 10px;
      font-size: 12px;
      font-weight: 700;
      letter-spacing: .02em;
      white-space: nowrap;
      border: 1px solid transparent;
    }
    .status-good { background: rgba(14,167,101,.2); border-color: rgba(14,167,101,.55); color: #86efc0; }
    .status-bad { background: rgba(234,61,82,.2); border-color: rgba(234,61,82,.55); color: #ffb7bf; }
    .status-error { background: rgba(124,58,237,.2); border-color: rgba(124,58,237,.55); color: #d7c2ff; }
    .panel { border-radius: 10px; border: 1px solid var(--border); padding: 12px; }
    .panel-ok { background: rgba(14,167,101,.12); color: #a7f3d0; border-color: rgba(14,167,101,.5); }
    .panel-error { background: rgba(124,58,237,.2); color: #e6dbff; border-color: rgba(124,58,237,.45); }
    .issue-card {
      background: var(--panel-2);
      border: 1px solid var(--border);
      border-radius: 12px;
      padding: 14px;
      margin-bottom: 12px;
    }
    .issue-head {
      display: flex;
      gap: 10px;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 8px;
    }
    .issue-head h4 { margin: 0; font-size: 16px; }
    .issue-meta {
      display: grid;
      gap: 6px;
      color: var(--muted);
      margin-bottom: 8px;
      font-size: 14px;
    }
    .severity {
      border-radius: 8px;
      padding: 4px 8px;
      font-size: 12px;
      font-weight: 700;
      border: 1px solid transparent;
    }
    .sev-critical { color: #ffd6db; background: rgba(234,61,82,.22); border-color: rgba(234,61,82,.5); }
    .sev-major { color: #ffe7bd; background: rgba(245,158,11,.2); border-color: rgba(245,158,11,.5); }
    .sev-minor { color: #d4f5df; background: rgba(14,167,101,.2); border-color: rgba(14,167,101,.5); }
    @media (max-width: 860px) {
      .page-head, .issue-head { flex-direction: column; align-items: flex-start; }
      .toc-item { flex-direction: column; align-items: flex-start; }
    }
  </style>
</head>
<body>
  <main>
    <section class="hero">
      <h1>${escapeHtml(title)}</h1>
      <p>Сгенерировано: ${escapeHtml(data.generatedAt)}</p>
      <div class="stats">
        <div class="stat"><span>Проверено страниц</span><b>${data.scannedPages}</b></div>
        <div class="stat"><span>Всего нарушений</span><b>${data.totalIssues}</b></div>
        <div class="stat"><span>Страниц без нарушений</span><b>${data.pagesWithoutIssues}</b></div>
        <div class="stat"><span>Страниц с нарушениями</span><b>${data.pagesWithIssues}</b></div>
        <div class="stat"><span>Страниц с ошибкой аудита</span><b>${data.pagesWithErrors}</b></div>
      </div>
    </section>

    <section class="toc">
      <h2>Навигация по страницам</h2>
      <div class="toc-list">${pageToc}</div>
    </section>

    ${pageSections}
  </main>
</body>
</html>`;
}

async function main() {
  const [inputPath, outputPath, customTitle, formatArg] = process.argv.slice(2);

  if (!inputPath || !outputPath) {
    process.stderr.write(
      'Usage: node scripts/cli-json-to-md.mjs <input-json> <output-md> [title]\n',
    );
    process.exit(1);
  }

  const jsonPath = resolve(inputPath);
  const reportPath = resolve(outputPath);
  const inferredFormat = extname(reportPath).toLowerCase() === '.html' ? 'html' : 'markdown';
  const outputFormat = formatArg === 'html' || formatArg === 'markdown' ? formatArg : inferredFormat;

  const payload = await readFile(jsonPath, 'utf-8');
  const report = JSON.parse(payload);
  const content =
    outputFormat === 'html'
      ? renderHtmlReport(report, customTitle)
      : renderMarkdownReport(report, customTitle);

  await mkdir(dirname(reportPath), { recursive: true });
  await writeFile(reportPath, content, 'utf-8');

  process.stdout.write(`${outputFormat.toUpperCase()} report saved: ${reportPath}\n`);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  void main();
}


