import { useEffect, useMemo, useState } from 'react';
import './App.css';

const PAYDAYS_IN_CAREER = 1040;
const STORAGE_KEY = 'paydays1040.v1';
const HISTORY_KEY = 'paydays1040.history.v1';

const currencySymbols = {
  USD: '$', CAD: '$', AUD: '$', NZD: '$', GBP: '£', EUR: '€', JPY: '¥'
};

const defaultState = {
  currency: 'CAD',
  startingBalance: 39000,
  contribution: 250,
  frequency: 'Biweekly',
  currentAge: 35,
  retirementAge: 65,
  annualReturn: 7,
  remember: false,
};

function clampNumber(value, fallback = 0) {
  const parsed = Number(String(value).replace(/[^0-9.-]/g, ''));
  return Number.isFinite(parsed) ? parsed : fallback;
}

function paydaysPerYear(frequency) {
  if (frequency === 'Weekly') return 52;
  if (frequency === 'Monthly') return 12;
  if (frequency === 'Semi-monthly') return 24;
  return 26;
}

function money(value, currency = 'CAD', compact = false) {
  const symbol = currencySymbols[currency] || '$';
  if (compact && Math.abs(value) >= 1000000) return `${symbol}${(value / 1000000).toFixed(value >= 10000000 ? 0 : 2)}M`;
  if (compact && Math.abs(value) >= 1000) return `${symbol}${Math.round(value / 1000)}k`;
  return `${symbol}${Math.round(value).toLocaleString()}`;
}

function detectCurrency() {
  try {
    const locale = Intl.DateTimeFormat().resolvedOptions().locale || '';
    if (locale.includes('GB')) return 'GBP';
    if (locale.includes('AU')) return 'AUD';
    if (locale.includes('NZ')) return 'NZD';
    if (locale.includes('US')) return 'USD';
    if (locale.includes('CA')) return 'CAD';
    const euroLocales = ['DE','FR','ES','IT','NL','IE','PT','BE','AT','FI'];
    if (euroLocales.some((code) => locale.includes(code))) return 'EUR';
  } catch (_) {}
  return 'CAD';
}

function buildProjection(settings) {
  const years = Math.max(0, settings.retirementAge - settings.currentAge);
  const ppy = paydaysPerYear(settings.frequency);
  const remainingPaydays = Math.max(0, Math.round(years * ppy));
  const ratePerPayday = settings.annualReturn / 100 / ppy;
  let balance = settings.startingBalance;
  const points = [];
  for (let i = 0; i <= remainingPaydays; i += 1) {
    if (i > 0) {
      balance = balance * (1 + ratePerPayday) + settings.contribution;
    }
    const futureContrib = settings.contribution * i;
    const contributions = settings.startingBalance + futureContrib;
    const growth = Math.max(0, balance - contributions);
    if (i === 0 || i === remainingPaydays || i % Math.max(1, Math.round(remainingPaydays / 80)) === 0) {
      points.push({ payday: i, balance, contributions, growth });
    }
  }
  const futureContributions = settings.contribution * remainingPaydays;
  const totalContributions = settings.startingBalance + futureContributions;
  const finalBalance = balance;
  const investmentGrowth = Math.max(0, finalBalance - totalContributions);
  const completedPaydays = Math.max(0, PAYDAYS_IN_CAREER - remainingPaydays);
  return { years, ppy, remainingPaydays, completedPaydays, finalBalance, futureContributions, totalContributions, investmentGrowth, points };
}

function sampleAt(projection, payday) {
  const p = Math.max(0, Math.min(projection.remainingPaydays, payday));
  const exact = projection.points.reduce((prev, cur) => Math.abs(cur.payday - p) < Math.abs(prev.payday - p) ? cur : prev, projection.points[0]);
  return exact;
}

function SparkChart({ projection, currency }) {
  const width = 980;
  const height = 300;
  const pad = { top: 22, right: 28, bottom: 44, left: 54 };
  const maxY = Math.max(1, projection.finalBalance * 1.08);
  const maxX = Math.max(1, projection.remainingPaydays);
  const x = (p) => pad.left + (p / maxX) * (width - pad.left - pad.right);
  const y = (v) => pad.top + (1 - v / maxY) * (height - pad.top - pad.bottom);
  const linePath = (key) => projection.points.map((pt, i) => `${i === 0 ? 'M' : 'L'} ${x(pt.payday).toFixed(1)} ${y(pt[key]).toFixed(1)}`).join(' ');
  const growthPath = `${linePath('growth')} L ${x(maxX)} ${y(0)} L ${x(0)} ${y(0)} Z`;
  const contribPath = `${linePath('contributions')} L ${x(maxX)} ${y(0)} L ${x(0)} ${y(0)} Z`;
  const hoverPoint = sampleAt(projection, Math.round(maxX * 0.72));

  return (
    <div className="chart-card">
      <div className="chart-toolbar">
        <div className="tabs"><button className="active">Graph</button><button>Breakdown</button><button>Compare</button></div>
        <div className="view-toggle"><button className="active">By Paydays</button><button>By Years</button></div>
      </div>
      <div className="legend"><span className="balance-line"/>Balance <span className="growth-line"/>Growth <span className="contrib-line"/>Contributions</div>
      <svg className="chart" viewBox={`0 0 ${width} ${height}`} role="img" aria-label="Projected investment balance chart">
        <defs>
          <linearGradient id="growthFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#2f6f95" stopOpacity="0.34" />
            <stop offset="100%" stopColor="#2f6f95" stopOpacity="0.08" />
          </linearGradient>
          <linearGradient id="contribFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#aebdca" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#aebdca" stopOpacity="0.05" />
          </linearGradient>
        </defs>
        {[0, .25, .5, .75, 1].map((tick) => <g key={tick}><line x1={pad.left} x2={width-pad.right} y1={y(maxY*tick)} y2={y(maxY*tick)} className="grid"/><text x="10" y={y(maxY*tick)+4} className="axis">{money(maxY*tick, currency, true)}</text></g>)}
        <path d={contribPath} fill="url(#contribFill)" />
        <path d={growthPath} fill="url(#growthFill)" />
        <path d={linePath('balance')} className="path balance" />
        <path d={linePath('growth')} className="path growth" />
        <path d={linePath('contributions')} className="path contributions" />
        {[0, .25, .5, .72, 1].map((tick, index) => {
          const pd = Math.round(maxX*tick);
          return <g key={tick}><text x={x(pd)} y={height-12} className="xaxis" textAnchor={index === 0 ? 'start' : index === 4 ? 'end' : 'middle'}>{index === 0 ? 'Payday #1' : `#${pd}`}</text></g>
        })}
        <line x1={x(hoverPoint.payday)} x2={x(hoverPoint.payday)} y1={y(0)} y2={y(hoverPoint.balance)} className="guide" />
        <circle cx={x(hoverPoint.payday)} cy={y(hoverPoint.balance)} r="7" className="dot" />
        <foreignObject x={Math.max(pad.left, x(hoverPoint.payday)-175)} y={Math.max(10, y(hoverPoint.balance)-105)} width="260" height="120">
          <div className="tooltip">
            <strong>PAYDAY #{hoverPoint.payday}</strong>
            <dl><dt>Balance</dt><dd>{money(hoverPoint.balance, currency)}</dd><dt>Growth</dt><dd>{money(hoverPoint.growth, currency)}</dd><dt>Contributions</dt><dd>{money(hoverPoint.contributions, currency)}</dd></dl>
          </div>
        </foreignObject>
      </svg>
      <p className="chart-caption">Every payday compounds.</p>
    </div>
  )
}

function App() {
  const [settings, setSettings] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try { return { ...defaultState, ...JSON.parse(saved) }; } catch (_) {}
    }
    return { ...defaultState, currency: detectCurrency() };
  });
  const [history, setHistory] = useState(() => {
    const saved = localStorage.getItem(HISTORY_KEY);
    if (!saved) return [];
    try { return JSON.parse(saved); } catch (_) { return []; }
  });
  const [showPrivacy, setShowPrivacy] = useState(false);
  const projection = useMemo(() => buildProjection(settings), [settings]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
  }, [settings]);
  useEffect(() => {
    localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
  }, [history]);

  const update = (field, value) => setSettings(prev => ({ ...prev, [field]: value }));
  const clearSavedData = () => {
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(HISTORY_KEY);
    setHistory([]);
    setSettings({ ...defaultState, currency: detectCurrency() });
    setShowPrivacy(false);
  };
  const saveToday = () => {
    const entry = { date: new Date().toLocaleDateString(undefined, { month: 'short', day: 'numeric' }), balance: settings.startingBalance };
    setHistory(prev => [entry, ...prev.filter((_, i) => i < 4)]);
  };

  return (
    <main className="app-shell">
      <nav className="topbar">
        <a className="brand" href="#"><span>1040</span><small>PAYDAYS</small></a>
        <div className="navlinks"><a className="active">Calculator</a><a>How it works</a><a>Compare</a><a>Learn</a></div>
        <div className="nav-actions"><select value={settings.currency} onChange={(e)=>update('currency', e.target.value)} aria-label="Currency"><option>CAD</option><option>USD</option><option>GBP</option><option>EUR</option><option>AUD</option><option>NZD</option></select><button className="icon-btn" aria-label="Menu">☰</button></div>
      </nav>

      <section className="hero-grid">
        <div className="hero-copy">
          <h1><span>1040</span>Paydays.</h1>
          <p>You only get about 1040 throughout your working life.</p>
          <p className="hero-blue">One payday at a time.</p>
        </div>

        <section className="calculator-card" aria-label="Calculator inputs">
          <label>Already invested<input value={money(settings.startingBalance, settings.currency)} onChange={(e)=>update('startingBalance', clampNumber(e.target.value))}/></label>
          <label>I add every payday<input value={money(settings.contribution, settings.currency)} onChange={(e)=>update('contribution', clampNumber(e.target.value))}/></label>
          <label>Pay frequency<select value={settings.frequency} onChange={(e)=>update('frequency', e.target.value)}><option>Weekly</option><option>Biweekly</option><option>Semi-monthly</option><option>Monthly</option></select></label>
          <label>I'm<input value={settings.currentAge} onChange={(e)=>update('currentAge', clampNumber(e.target.value, 35))}/></label>
          <label>Retiring at<input value={settings.retirementAge} onChange={(e)=>update('retirementAge', clampNumber(e.target.value, 65))}/></label>
          <button className="primary full">Calculate projection <span>→</span></button>
          <p className="privacy-note">No account needed · Saved on your device <button onClick={()=>setShowPrivacy(true)}>Privacy</button></p>
        </section>

        <section className="projection-card">
          <p className="eyebrow">Your Payday #1040</p>
          <h2>{money(projection.finalBalance, settings.currency)}</h2>
          <strong>{projection.remainingPaydays.toLocaleString()} paydays to go</strong>
          <span>Until age {settings.retirementAge}</span>
          <button className="link-btn">View breakdown →</button>
        </section>
      </section>

      <section className="metrics" aria-label="Projection summary">
        <article><strong>{money(projection.totalContributions, settings.currency)}</strong><span>Total contributions</span><small>Starting balance + future contributions</small></article>
        <article><strong>{money(projection.investmentGrowth, settings.currency)}</strong><span>Investment growth</span><small>From compounding over time</small></article>
        <article><strong>{money(projection.finalBalance, settings.currency)}</strong><span>Projected balance</span><small>At payday #1040</small></article>
        <article><strong>{projection.remainingPaydays.toLocaleString()}</strong><span>Paydays remaining</span><small>Until age {settings.retirementAge}</small></article>
      </section>

      <SparkChart projection={projection} currency={settings.currency} />

      <section className="payday-panel">
        <div className="payday-copy"><div className="calendar-icon">□</div><div><h3>It's payday.</h3><p>Update your investment balance to see your latest projection.</p></div></div>
        <label className="balance-input">Current investment balance<input value={money(settings.startingBalance, settings.currency)} onChange={(e)=>update('startingBalance', clampNumber(e.target.value))}/></label>
        <button className="primary" onClick={saveToday}>Update today's balance <span>→</span></button>
        <div className="ring-wrap"><div className="ring" style={{'--progress': Math.min(100, Math.max(0, (projection.completedPaydays / PAYDAYS_IN_CAREER) * 100)) + '%'}}><strong>{projection.completedPaydays}</strong><span>Paydays completed</span></div><p>You've completed {projection.completedPaydays.toLocaleString()} of your 1040 career paydays.</p></div>
        <div className="history-strip"><strong>History</strong>{history.length ? history.map((item, i)=><span key={i}>✓ {item.date} <b>{money(item.balance, settings.currency)}</b></span>) : <span>No saved updates yet.</span>}<button>View all history →</button></div>
      </section>

      <footer><button onClick={()=>setShowPrivacy(true)}>Private by design. No account required.</button></footer>

      {showPrivacy && <div className="modal-backdrop" role="dialog" aria-modal="true"><div className="modal"><h3>Privacy controls</h3><p>Your information is saved only on this device. You can clear it anytime.</p><div className="modal-actions"><button onClick={()=>setShowPrivacy(false)}>Cancel</button><button className="danger" onClick={clearSavedData}>Clear saved data</button></div></div></div>}
    </main>
  );
}

export default App;
