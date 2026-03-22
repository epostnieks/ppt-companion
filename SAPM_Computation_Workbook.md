# SAPM Retrospective Calibration Workbook
## Three Cases — All Parameters From Primary Sources
### Postnieks (2026a), Appendix D.8

---

## METHODOLOGY

β_W is computed from the quadratic PSF (Proposition 15):
  β_W = 2(W_C − W) / (Π − Π_C)

T* is computed from the generalized crossover formula (Proposition 18):
  T* = δ / (ηλ)

Both require the same λ. The relationship is:
  β_W = 2λT_horizon / δ    (where T_horizon is the duration of the Hollow Win phase)

---

## CASE 1: VW DIESELGATE (2009–2015)

### Parameters

| Symbol | Value | Source |
|--------|-------|--------|
| δ | $3.7B | $335/vehicle × 11M vehicles (ICCT 2015) |
| η | 0.3 | Regulatory + brand channels ≈ 30% of total damage |
| T_horizon | 6 years | 2009 (program start) to Sept 2015 (EPA NOV) |

### λ — Annual System Welfare Loss Rate

| Channel | Rate ($/yr) | Source |
|---------|-------------|--------|
| Health (NOx → PM2.5, ozone) | $1.0B | Barrett et al. 2015 (Env. Res. Letters); Oldenkamp et al. 2016 (Env. Pollution); EPA BenMAP $7,300/ton; 81 ktonnes/yr excess NOx globally |
| Regulatory integrity | $500M | RDE reform costs; ICCT monitoring programs; EU type-approval overhaul |
| Competitive distortion | $300M | $335/vehicle disadvantage to honest manufacturers (BMW, Mercedes SCR systems) |
| Environmental beyond health | $300M | Ozone crop damage; ecosystem NOx deposition |
| **Total λ** | **$2.1B/yr** | High end of independently derived range ($0.9B–$2.1B/yr) |

Note: $2.1B/yr is the high-end estimate. Observed T* ≈ 6 years pins λ at the high end.

### Results

| Metric | Formula | Value |
|--------|---------|-------|
| β_W | 2λ × 6yr / δ = 2 × $12.6B / $3.7B | **6.8** |
| T* | δ/(ηλ) = $3.7B/(0.3 × $2.1B) | **5.9 years** |
| Observed crossover | EPA NOV Sept 2015, program began 2009 | **~6 years** |
| S_W (static) | δ / (W_C − W) = $3.7B / $12.6B | **0.29** |
| Π^SA at μ* | δ − (1/β_W)(W_C − W) = $3.7B − $1.85B | **$1.85B** → strongly negative once remediation costs included |

### Sensitivity

| η | T* (years) | β_W (unchanged) |
|---|------------|-----------------|
| 0.20 | 8.8 | 6.8 |
| 0.25 | 7.0 | 6.8 |
| 0.30 | 5.9 | 6.8 |
| 0.35 | 5.0 | 6.8 |
| 0.50 | 3.5 | 6.8 |

Classification: **Slow Hollow Win → Misery** (T* ≈ 6 years; collapse was discontinuous)

---

## CASE 2: LIBOR MANIPULATION (2005–2012)

### Parameters

| Symbol | Value | Source |
|--------|-------|--------|
| δ | $9B | Total regulatory fines as proxy (DOJ, CFTC, FCA, EU) |
| δ_annual | $1.3B/yr | $9B / 7 years of manipulation |
| η | 0.5 | Higher than VW: banks bore enforcement + litigation + reputational costs |
| T_horizon | 7 years | 2005 (manipulation start) to 2012 (Barclays settlement) |

### λ — Annual System Welfare Loss Rate

| Channel | Rate ($/yr) | Source |
|---------|-------------|--------|
| Benchmark distortion (mispricing) | $3B–$10B+ | Even 0.01% on $350T notional = $35B gross; net welfare loss conservatively $3B+ |
| Institutional trust damage | unquantified | Edelman Trust Barometer: financial services trust dropped to 46% |
| Transition/reform costs | $0.6B–$1.1B | ~$5B–$10B total SOFR transition over 9 years |
| **Total λ** | **$3B–$10B+/yr** | Conservative: uses net, not gross benchmark distortion |

### T* Computation

Annual agent-felt feedback: ηλ = 0.5 × $5B/yr = $2.5B/yr
Annual private gain: δ_annual = $1.3B/yr

**ηλ > δ_annual from year 1.**

T* = δ/(ηλ) = $9B/(0.5 × $5B) = **3.6 years**

But the annual comparison is more telling: the banks were losing $2.5B/yr in deferred system consequences while gaining $1.3B/yr in trading profits. **T* was past from inception.** The 7-year duration was sustained by concealment (η_perceived ≈ 0 during manipulation, η_actual ≈ 0.5 when enforcement arrived).

### Results

| Metric | Value |
|--------|-------|
| β_W | >>1 (effectively unbounded; system damage vastly exceeds private gain) |
| T* | ≤ 0 (annual feedback > annual gain from year 1) |
| S_W | ≈ 0 (transfer, not surplus creation) |
| Classification | **Fast Hollow Win (Concealed)** |

---

## CASE 3: ERCOT GRID FAILURE (Feb 2021)

### Parameters

| Symbol | Value | Source |
|--------|-------|--------|
| δ | $95M | Winterization cost for 162 gas plants (Dallas Fed 2021, citing FERC/NERC) |
| η | ≈ 0 | No feedback reached decision-makers for 22 years |
| λ_event | $80B–$195B | Dallas Fed: $80B–$130B; Perryman Group: $195B; concentrated in ~72 hours |

### β_W

β_W = total system damage / δ = $195B / $95M = **2,053**

(At Dallas Fed low end: $80B / $95M = 842)

### T*

**Structurally inapplicable.** The linear formula T* = δ/(ηλ) requires:
1. λ as an annual rate (ERCOT damage was a step function, not continuous)
2. η > 0 (feedback coupling was zero for 22 years)

With η ≈ 0: T* → ∞ (no feedback signal)

The grid was 4 minutes and 37 seconds from total cascading failure at 1:51 AM on Feb 15, 2021 (ERCOT CEO Bill Magness, emergency board meeting Feb 24, 2021; KUT, Houston Public Media).

### Results

| Metric | Value |
|--------|-------|
| β_W | 2,053 (Perryman) or 842 (Dallas Fed low) |
| T* | N/A — step function; linear formula inapplicable |
| Deaths | 246 (Texas DSHS final count, Jan 2, 2022) |
| S_W | 0.0005 (catastrophically wasteful) |
| Classification | **Slow Hollow Win → Acute Misery** (22 years accumulation, 72 hours collapse) |

---

## ERRATA LOG (v3.3 corrections applied)

| # | Issue | Old Value | Corrected | Affects |
|---|-------|-----------|-----------|---------|
| 1 | LIBOR Act public law | Pub. L. 117-169 | Pub. L. 117-103, div. U | Both papers |
| 2 | PPT version header | v 3.2 | v 3.3 | PPT |
| 3 | HW version header | v 3.3 | v 3.5 | HW |
| 4 | VW β_W | 5.5 | 6.8 | Both papers |
| 5 | VW T* | 6.1 years | 5.9 years | Both papers |
| 6 | PPT Table 5 λ | "$5B/yr" | "$2.1B/yr" | PPT |
| 7 | PPT D.8 Table λ | ">$30B" (total) | "≈$2.1B/yr" (annual) | PPT |
| 8 | Prop 2 proof IB | "I_A ∪ IB" | "I_A ∪ I_B" | PPT |
| 9 | "First since Condorcet" | ambiguous grammar | rephrased | PPT |
| 10 | HW T* variable definitions | δ = "system sensitivity", λ = "discount rate" | δ = "net private surplus", λ = "system welfare loss rate per period" | HW |
| 11 | HW β_W range attribution | "5.5 (LIBOR manipulation)" | "6.8 (VW Dieselgate)" | HW |
| 12 | Table C.5 entries 9/10 | 1982 before 1980 | Noted — chronological swap needed | PPT (manual fix) |

---

*All computations from primary sources. Workbook completed March 22, 2026.*
*Correspondence: erik@woosterllc.com*
