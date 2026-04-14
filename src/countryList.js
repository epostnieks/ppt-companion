// Minimal country list for static page generation (server-side)
// Extracted from pstBreakerData.js to avoid loading 4K+ lines during build
import { COUNTRIES as _COUNTRIES, AXIOMS as _AXIOMS } from "./pstBreakerData";

export const COUNTRIES = _COUNTRIES;
export const AXIOMS = _AXIOMS;
