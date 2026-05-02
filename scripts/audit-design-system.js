import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const requiredFiles = [
  "src/design-system.css",
  "app/layout.jsx",
  "src/main.jsx",
  "DESIGN.md",
];

const failures = [];

function listSourceFiles(dir) {
  const files = [];
  if (!fs.existsSync(dir)) return files;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if ([".next", "node_modules", "out"].includes(entry.name)) continue;
      files.push(...listSourceFiles(fullPath));
    } else if (/\.(?:js|jsx|json|md)$/.test(entry.name)) {
      files.push(fullPath);
    }
  }
  return files;
}

for (const file of requiredFiles) {
  if (!fs.existsSync(path.join(root, file))) {
    failures.push(`Missing required design-system file: ${file}`);
  }
}

const cssPath = path.join(root, "src/design-system.css");
const css = fs.existsSync(cssPath) ? fs.readFileSync(cssPath, "utf8") : "";
for (const token of [
  "--ds-bg-0",
  "--ds-surface-0",
  "--ds-amber",
  ".sapm-main-content",
  ".sidenav-desktop",
  "@media (prefers-reduced-motion: reduce)",
]) {
  if (!css.includes(token)) {
    failures.push(`Design CSS missing required token/selector: ${token}`);
  }
}

const layout = fs.readFileSync(path.join(root, "app/layout.jsx"), "utf8");
if (!layout.includes("import '../src/design-system.css';")) {
  failures.push("app/layout.jsx must import src/design-system.css after responsive.css.");
}

const main = fs.readFileSync(path.join(root, "src/main.jsx"), "utf8");
if (!main.includes("import './design-system.css'")) {
  failures.push("src/main.jsx must import src/design-system.css for legacy entry compatibility.");
}

const scanFiles = [
  "src/ProgramDashboard.jsx",
  "src/Curriculum.jsx",
  "src/PaperSummaries.jsx",
  "src/SideNav.jsx",
  "src/PSTBreaker.jsx",
  "DESIGN.md",
  "index.html",
  "app/layout.jsx",
  "app/page.jsx",
  "app/policylab/page.jsx",
  "app/reform-pathfinder/page.jsx",
];

const stalePatterns = [
  { label: "public launch slate still says 72", pattern: /\b(publicLaunchSlate:\s*72|72\s+(?:papers|working papers|paper slate|launch slate))\b/i },
  { label: "PolicyLab/domain count still says 31", pattern: /\b31\s+domains\b/i },
  { label: "market-failure domains still set to 61", pattern: /\b(marketFailures:\s*61|policyLabDomains:\s*61|61\s+SAPM\s+domains|61\s+market-failure\s+domains)\b/i },
  { label: "stale welfare-loss aggregate still says $85.3T", pattern: /\$85\.3\s*(?:T|trillion)/i },
  { label: "Reform Pathfinder still labeled as country reform paths", pattern: /\bCountry Reform Paths\b/i },
  { label: "gig economy appears as a reform-pathway example", pattern: /\bSpain\s*\([^)]*\)\s*.*gig economy|\bgig economy\).*Tier|\bSimpler domains\s*\(gig economy\)/i },
  { label: "nuclear appears as a market-failure pathway row", pattern: /\[\s*"Nuclear Power"|\bNuclear Power\b.*Control\/comparator \(βW<1\.0\)/i },
  { label: "βW denominator described as payoff/profit/private gain instead of revenue", pattern: /\b(?:welfare[- ]to[- ]payoff ratio|welfare-cost-to-private-(?:payoff|gain) ratio|(?:system\s+)?welfare (?:cost|destruction) per dollar of private (?:payoff|gain|profit|rent|benefit|extraction)|marginal welfare cost per dollar of private (?:payoff|gain|profit|rent|benefit|extraction)|per dollar of private (?:payoff|gain|profit|rent|benefit|extraction)|for every (?:\$1|dollar|one dollar) of private (?:payoff|gain|profit|rent|benefit|extraction))\b/i },
];

for (const file of scanFiles) {
  const fullPath = path.join(root, file);
  if (!fs.existsSync(fullPath)) continue;
  const text = fs.readFileSync(fullPath, "utf8");
  for (const { label, pattern } of stalePatterns) {
    if (pattern.test(text)) {
      failures.push(`${file}: ${label}`);
    }
  }
}

const betaDenominatorPatterns = [
  /\bwelfare[- ]to[- ]payoff\b/i,
  /\bwelfare-cost-to-private-(?:payoff|gain)\b/i,
  /\b(?:system\s+)?welfare (?:cost|destruction) per dollar of private (?:payoff|gain|profit|rent|benefit|extraction)\b/i,
  /\bmarginal welfare cost per dollar of private (?:payoff|gain|profit|rent|benefit|extraction)\b/i,
  /\bper dollar of private (?:payoff|gain|profit|rent|benefit|extraction)\b/i,
  /\beach dollar of profit\b/i,
  /\beach dollar of (?:historical\s+)?private (?:payoff|gain|profit|rent|benefit|extraction)\b/i,
  /\beach dollar of [\w/-]+ private (?:payoff|gain|profit|rent|benefit|extraction)\b/i,
  /\bfor every (?:\$1|dollar|one dollar) of private (?:payoff|gain|profit|rent|benefit|extraction)\b/i,
  /\bevery dollar of private (?:payoff|gain|profit|rent|benefit|extraction)\b/i,
  /\bprivate-payoff dollar\b/i,
];

for (const file of [...listSourceFiles(path.join(root, "src")), ...listSourceFiles(path.join(root, "app"))]) {
  const rel = path.relative(root, file);
  if (rel.startsWith("src/locales/")) continue;
  const text = fs.readFileSync(file, "utf8");
  for (const pattern of betaDenominatorPatterns) {
    if (pattern.test(text)) {
      failures.push(`${rel}: βW denominator must be revenue, not payoff/private gain`);
      break;
    }
  }
}

if (failures.length) {
  console.error("Design-system audit failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Design-system audit passed.");
