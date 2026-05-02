import ProgramDashboard from '../src/ProgramDashboard';

function ComingSoon() {
  return (
    <main
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#0f172a',
        fontFamily: 'Georgia, ui-serif, serif',
        padding: '2rem',
        textAlign: 'center',
      }}
    >
      <div style={{ marginBottom: '2.5rem' }}>
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="48" height="48" rx="10" fill="#1e40af" />
          <path d="M14 24L24 14L34 24L24 34L14 24Z" stroke="#93c5fd" strokeWidth="2" fill="none" />
          <circle cx="24" cy="24" r="3" fill="#93c5fd" />
        </svg>
      </div>
      <div style={{ fontSize: '0.75rem', fontFamily: 'ui-sans-serif, system-ui, sans-serif', fontWeight: 700, letterSpacing: '0.25em', textTransform: 'uppercase', color: '#64748b', marginBottom: '3rem' }}>
        SAPM Research Program
      </div>
      <h1 style={{ fontSize: 'clamp(1.75rem, 4vw, 3rem)', fontWeight: 700, color: '#f8fafc', lineHeight: 1.15, maxWidth: '680px', marginBottom: '1.5rem', letterSpacing: '-0.02em' }}>
        A ranked research corpus on the welfare cost<br />of unaccountable decisions.
      </h1>
      <p style={{ fontSize: '1.125rem', color: '#94a3b8', maxWidth: '520px', lineHeight: 1.7, marginBottom: '3rem', fontFamily: 'ui-sans-serif, system-ui, sans-serif' }}>
        Private Pareto Theorem · Monte Carlo welfare cost quantification · Decision Accounting framework.
        Coming soon.
      </p>
      <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1.25rem', borderRadius: '999px', border: '1px solid #1e40af', background: 'rgba(30, 64, 175, 0.12)', color: '#93c5fd', fontSize: '0.875rem', fontFamily: 'ui-sans-serif, system-ui, sans-serif', fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: '3rem' }}>
        <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#3b82f6', display: 'inline-block' }} />
        Coming Soon
      </div>
    </main>
  );
}

export default function DashboardPage() {
  return <ProgramDashboard />;
}
