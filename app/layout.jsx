import '../src/responsive.css';
import '../src/design-system.css';
import SideNav, { SIDEBAR_WIDTH } from '../src/SideNav';
import ErrorBoundary from '../src/ErrorBoundary';
import I18nProvider from './i18n-provider';

export const metadata = {
  title: "System Asset Pricing Model Program — Private Pareto Theorem · 59 Market-Failure Domains + Controls",
  description: "The System Asset Pricing Model: a proposed theorem and measurement program for bilateral analysis, system welfare, domain calibration, and 190-country policy translation. Erik Postnieks.",
  openGraph: {
    type: "website",
    title: "System Asset Pricing Model Program — Private Pareto Theorem",
    description: "Theorem foundations, 59 market-failure SAPM calibrations, two control comparators, Decision Accounting, and 190-country policy translation.",
    url: "https://ppt-companion.vercel.app",
    siteName: "System Asset Pricing Model Program",
    images: [{ url: "https://ppt-companion.vercel.app/og-image.png" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "System Asset Pricing Model Program — Private Pareto Theorem",
    description: "Theorem foundations, domain calibration, Decision Accounting, and public-policy translation for system welfare.",
    images: ["https://ppt-companion.vercel.app/og-image.png"],
  },
  alternates: {
    canonical: "https://ppt-companion.vercel.app",
  },
  icons: {
    icon: [
      { url: "/favicon.ico", type: "image/x-icon" },
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "System Asset Pricing Model Program — Private Pareto Theorem",
              url: "https://ppt-companion.vercel.app",
              author: {
                "@type": "Person",
                name: "Erik Postnieks",
                affiliation: "Independent Researcher",
                sameAs: ["https://github.com/epostnieks"],
              },
              description: "Companion website for the System Asset Pricing Model program: theorem foundations, domain calibration, Decision Accounting, and global public-policy translation.",
              about: {
                "@type": "ScholarlyArticle",
                name: "The Private Pareto Theorem",
                author: { "@type": "Person", name: "Erik Postnieks" },
                datePublished: "2026",
                keywords: ["impossibility theorem", "welfare economics", "system welfare", "Capital Asset Pricing Model", "game theory", "externalities", "Monte Carlo"],
              },
            }),
          }}
        />
      </head>
      <body style={{ margin: 0 }}>
        <ErrorBoundary>
          <I18nProvider>
            <div style={{ display: "flex", minHeight: "100vh", background: "#0D0D0D" }}>
              <a className="skip-to-content" href="#main-content">Skip to content</a>
              <SideNav />
              <div id="main-content" className="sapm-main-content" style={{
                marginLeft: SIDEBAR_WIDTH,
                flex: 1,
                minWidth: 0,
              }}>
                {children}
              </div>
            </div>
            <style>{`
              @media (max-width: 768px) {
                .sapm-main-content {
                  margin-left: 0 !important;
                }
              }
            `}</style>
          </I18nProvider>
        </ErrorBoundary>
      </body>
    </html>
  );
}
