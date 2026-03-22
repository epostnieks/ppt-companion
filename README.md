# Private Pareto Theorem — Companion Dashboard

Interactive computation workbook, SAPM calibration, and errata tracker for:

**Postnieks, E. (2026a). "The Private Pareto Trap: Why Privately Efficient Outcomes Destroy Shared Systems." Working Paper, March 2026.**

## What This Contains

### T* Computation Workbook
Full derivation of VW Dieselgate crossover time from primary sources. Every parameter sourced independently — no reverse engineering.

| Parameter | Value | Source |
|-----------|-------|--------|
| δ (private surplus) | $3.7B | $335/vehicle × 11M vehicles (ICCT 2015) |
| η (feedback coupling) | 0.3 | Channel decomposition: regulatory + brand = ~30% of total system damage |
| λ (annual system loss) | $0.9B–$2.1B/yr | 4 channels: health (Barrett et al. 2015; Oldenkamp et al. 2016), regulatory integrity, competitive distortion, environmental |

**Result:** T* = δ/(ηλ) = $3.7B / (0.3 × $2.1B) = **5.9 years** (high-λ scenario; observed: ~6 years)

### Errata (identified March 22, 2026)
- LIBOR Act citation: Pub. L. 117-103, div. U is the Inflation Reduction Act. Correct: Pub. L. 117-103, div. U
- Table 5 λ ≈ "$5B/yr" does not produce T* = 5.9; correct annual rate is ~$2B/yr
- Table C.5 entries 9/10 out of chronological order (1982 before 1980)
- Version number: header v3.2, should be v3.3
- Prop 2 proof: I_(B) subscript formatting dropped

### SAPM Calibration
System beta (β_W) across 6 calibrated domains with interactive chart.

### 8-Outcome Taxonomy
Complete (c, a, b) classification with structural descriptions.

### 18 Impossibility Theorems
Chronological catalog (1785–2026), 7 Nobel laureates.

## Primary Sources for T* Calculation

- Barrett, S.R.H., et al. (2015). "Impact of the Volkswagen Emissions Control Defeat Device on US Public Health." *Environmental Research Letters*, 10(11), 114005.
- Oldenkamp, R., et al. (2016). "Valuing the human health damage caused by the fraud of Volkswagen." *Environmental Pollution*, 212, 121–127.
- ICCT (2015). "Taking stock of the Volkswagen settlement." International Council on Clean Transportation.
- EPA (2015). Notice of Violation of the Clean Air Act. September 18, 2015.
- EPA (2016). Volkswagen Clean Air Act Civil Settlement. $14.7B.
- Dallas Fed (2021). "Cost of Texas' 2021 deep freeze justifies weatherization."
- FERC/NERC (2021). Final Report on February 2021 Freeze.

## Companion Papers

- Postnieks (2026a) — **The Private Pareto Trap** (this paper's companion)
- Postnieks (2026, HW) — **The Hollow Win** (PON submission)
- Postnieks (2026b) — Bitcoin SAPM Calibration
- Postnieks (2026c) — PoS SAPM Cross-Chain Comparison

## Setup

```bash
npm install
npm run dev
```

Deploy: connect to Vercel, framework = Vite.

## Citation

```
Postnieks, E. (2026). "The Private Pareto Trap: Why Privately Efficient 
Outcomes Destroy Shared Systems." Working Paper, March 2026.
Correspondence: erik@woosterllc.com
```

## License

© 2026 Erik Postnieks. All rights reserved.
