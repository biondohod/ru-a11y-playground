import { access, mkdir, readFile, writeFile } from 'node:fs/promises';
import { spawnSync } from 'node:child_process';
import { dirname, resolve } from 'node:path';
import { renderHtmlReport, renderMarkdownReport } from './cli-json-to-md.mjs';

const SCENARIOS = {
  bad: {
    urlsFile: 'demo/cli/urls.bad.txt',
    reportDir: 'demo/cli/reports/bad',
    title: 'ru-a11y CLI demo (bad)',
  },
  good: {
    urlsFile: 'demo/cli/urls.good.txt',
    reportDir: 'demo/cli/reports/good',
    title: 'ru-a11y CLI demo (good)',
  },
  mixed: {
    urlsFile: 'demo/cli/urls.mixed.txt',
    reportDir: 'demo/cli/reports/mixed',
    title: 'ru-a11y CLI demo (mixed)',
  },
  'all-routes': {
    urlsFile: 'demo/cli/urls.all-routes.txt',
    reportDir: 'demo/cli/reports/all-routes',
    title: 'ru-a11y CLI demo (all routes)',
  },
  'all-routes-full': {
    urlsFile: 'demo/cli/urls.all-routes.txt',
    reportDir: 'demo/cli/reports/all-routes-full',
    title: 'ru-a11y CLI demo (all routes + eslint source)',
    withEslint: true,
    eslintTargets: 'src/**/*.{js,jsx}',
    eslintConfigFile: 'eslint.config.js',
  },
};

const projectRoot = resolve(dirname(process.argv[1]), '..');
const localCliPath = resolve(projectRoot, '../ru-a11y/packages/cli/dist/cli.js');
const DEFAULT_ALL_SCENARIOS = ['bad', 'good', 'mixed', 'all-routes'];

function runCliScenario(name) {
  const scenario = SCENARIOS[name];
  const urlsFile = resolve(projectRoot, scenario.urlsFile);
  const jsonDir = resolve(projectRoot, scenario.reportDir, 'json');
  const jsonReportPath = resolve(jsonDir, 'ru-a11y-report.json');
  const markdownReportPath = resolve(projectRoot, scenario.reportDir, 'ru-a11y-report.md');
  const htmlReportPath = resolve(projectRoot, scenario.reportDir, 'ru-a11y-report.html');

  process.stdout.write(`\n[cli-demo] Running scenario: ${name}\n`);

  const cliArgs = [
    localCliPath,
    '--urls-file',
    urlsFile,
    '--standard',
    'gost-aa',
    '--format',
    'json',
    '--output',
    jsonDir,
    '--concurrency',
    '1',
  ];

  if (scenario.withEslint) {
    cliArgs.push(
      '--with-eslint',
      '--project-root',
      projectRoot,
      '--eslint-targets',
      scenario.eslintTargets,
      '--eslint-config',
      resolve(projectRoot, scenario.eslintConfigFile),
    );
  }

  const result = spawnSync(
    process.execPath,
    cliArgs,
    {
      cwd: projectRoot,
      stdio: 'inherit',
    },
  );

  if (result.status !== 0) {
    throw new Error(`CLI finished with exit code ${result.status} for scenario "${name}".`);
  }

  return {
    jsonReportPath,
    markdownReportPath,
    htmlReportPath,
    title: scenario.title,
  };
}

async function buildTextReports(reportInfo) {
  const payload = await readFile(reportInfo.jsonReportPath, 'utf-8');
  const report = JSON.parse(payload);
  const markdown = renderMarkdownReport(report, reportInfo.title);
  const html = renderHtmlReport(report, reportInfo.title);

  await mkdir(dirname(reportInfo.markdownReportPath), { recursive: true });
  await writeFile(reportInfo.markdownReportPath, markdown, 'utf-8');
  await writeFile(reportInfo.htmlReportPath, html, 'utf-8');

  process.stdout.write(`[cli-demo] Markdown report: ${reportInfo.markdownReportPath}\n`);
  process.stdout.write(`[cli-demo] HTML report: ${reportInfo.htmlReportPath}\n`);
}

async function main() {
  const target = process.argv[2] ?? 'all';
  const scenarioNames =
    target === 'all'
      ? DEFAULT_ALL_SCENARIOS
      : target in SCENARIOS
        ? [target]
        : null;

  if (!scenarioNames) {
    process.stderr.write('Usage: node scripts/run-cli-demo.mjs [bad|good|mixed|all-routes|all-routes-full|all]\n');
    process.exit(1);
  }

  process.stdout.write(`[cli-demo] Using local CLI: ${localCliPath}\n`);
  process.stdout.write('[cli-demo] Make sure Vite app is running at http://localhost:5173\n');

  try {
    await access(localCliPath);
  } catch {
    process.stderr.write(
      '[cli-demo] Local CLI was not found. Run: npm run cli:build:local\n',
    );
    process.exit(1);
  }

  for (const name of scenarioNames) {
    const reportInfo = runCliScenario(name);
    await buildTextReports(reportInfo);
  }

  process.stdout.write('\n[cli-demo] Done. Reports are available in demo/cli/reports/*\n');
}

void main();


