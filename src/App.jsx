import { useMemo, useState, useEffect } from 'react'
import './App.css'

const currencies = {
  CAD: { flag: '🇨🇦', symbol: '$', name: 'Canadian dollars' },
  USD: { flag: '🇺🇸', symbol: '$', name: 'US dollars' },
  GBP: { flag: '🇬🇧', symbol: '£', name: 'pounds' },
  EUR: { flag: '🇪🇺', symbol: '€', name: 'euros' },
  AUD: { flag: '🇦🇺', symbol: '$', name: 'Australian dollars' },
}

const freqMap = {
  Daily: 365,
  Weekly: 52,
  Biweekly: 26,
  'Semi-monthly': 24,
  Monthly: 12,
  Yearly: 1,
}

const clamp = (n, min, max) => Math.min(Math.max(Number(n) || 0, min), max)
const parseMoney = (v) => Number(String(v).replace(/[^0-9.]/g, '')) || 0

function money(value, currency = 'CAD', decimals = 0) {
  const symbol = currencies[currency]?.symbol || '$'
  const amount = Number(value || 0)
  return `${symbol}${amount.toLocaleString(undefined, { maximumFractionDigits: decimals, minimumFractionDigits: decimals })}`
}

function buildProjection({ start, contribution, frequency, age, retireAge, rate }) {
  const periodsPerYear = freqMap[frequency] || 26
  const years = Math.max(0, retireAge - age)
  const periods = Math.round(years * periodsPerYear)
  const periodicRate = Math.pow(1 + rate / 100, 1 / periodsPerYear) - 1
  let balance = start
  const points = []
  const interval = Math.max(1, Math.round(periods / 60))

  for (let i = 0; i <= periods; i += 1) {
    if (i > 0) balance = balance * (1 + periodicRate) + contribution
    if (i % interval === 0 || i === periods) {
      const totalContrib = start + contribution * i
      points.push({
        payday: i,
        balance,
        growth: Math.max(0, balance - totalContrib),
        contributions: totalContrib,
      })
    }
  }
  const totalContributions = start + contribution * periods
  const finalBalance = balance
  const growth = Math.max(0, finalBalance - totalContributions)
  return { years, periods, totalContributions, finalBalance, growth, points }
}

function Sparkline() {
  return <svg className="spark" viewBox="0 0 280 150" aria-hidden="true">
    <defs><linearGradient id="sparkFill" x1="0" y1="0" x2="0" y2="1"><stop stopColor="#1b66ff" stopOpacity=".55"/><stop offset="1" stopColor="#1b66ff" stopOpacity="0"/></linearGradient></defs>
    <path d="M14 130 C45 118 62 116 80 106 C102 94 118 97 139 78 C164 53 181 58 203 42 C232 22 247 12 268 10 L268 144 L14 144 Z" fill="url(#sparkFill)"/>
    <path d="M14 130 C45 118 62 116 80 106 C102 94 118 97 139 78 C164 53 181 58 203 42 C232 22 247 12 268 10" fill="none" stroke="#2e78ff" strokeWidth="5" strokeLinecap="round"/>
    <circle cx="268" cy="10" r="8" fill="#0b2a4a" stroke="#fff" strokeWidth="5"/>
  </svg>
}

function MainChart({ points, currency }) {
  const max = Math.max(...points.map(p => p.balance), 1)
  const coords = points.map((p, idx) => {
    const x = 30 + (idx / Math.max(points.length - 1, 1)) * 720
    const yB = 330 - (p.balance / max) * 300
    const yG = 330 - (p.growth / max) * 300
    const yC = 330 - (p.contributions / max) * 300
    return { ...p, x, yB, yG, yC }
  })
  const line = key => coords.map((p, i) => `${i ? 'L' : 'M'} ${p.x.toFixed(1)} ${p[key].toFixed(1)}`).join(' ')
  const area = `${line('yB')} L 750 330 L 30 330 Z`
  const last = coords[coords.length - 1] || coords[0]
  const mid = coords[Math.floor(coords.length * .65)] || last
  return <div className="chartFrame">
    <svg viewBox="0 0 790 370" role="img" aria-label="Projection chart">
      <defs><linearGradient id="balFill" x1="0" y1="0" x2="0" y2="1"><stop stopColor="#1f6cff" stopOpacity=".24"/><stop offset="1" stopColor="#1f6cff" stopOpacity="0"/></linearGradient></defs>
      {[0, .25, .5, .75, 1].map((t, i) => <g key={i}><line x1="30" x2="750" y1={330 - t*300} y2={330 - t*300} stroke="#d9e5f3"/><text x="8" y={335 - t*300} fontSize="14" fill="#24405f">{t === 0 ? '$0' : money(max*t, currency).replace(/\.0+$/,'')}</text></g>)}
      <path d={area} fill="url(#balFill)"/>
      <path d={line('yB')} fill="none" stroke="#071936" strokeWidth="4" strokeLinecap="round"/>
      <path d={line('yG')} fill="none" stroke="#1768ff" strokeWidth="4" strokeLinecap="round"/>
      <path d={line('yC')} fill="none" stroke="#0b91a3" strokeWidth="3" strokeDasharray="5 5" strokeLinecap="round"/>
      <circle cx={last.x} cy={last.yB} r="7" fill="#071936"/>
      <circle cx={last.x} cy={last.yG} r="7" fill="#1768ff"/>
      <circle cx={last.x} cy={last.yC} r="7" fill="#0b91a3"/>
      <text x="30" y="360" fontSize="14" fill="#24405f">Now</text>
      <text x="220" y="360" fontSize="14" fill="#24405f">#260</text>
      <text x="400" y="360" fontSize="14" fill="#24405f">#520</text>
      <text x="580" y="360" fontSize="14" fill="#24405f">#780</text>
      <text x="718" y="360" fontSize="14" fill="#24405f">#1040</text>
      <g className="tooltip" transform={`translate(${Math.min(mid.x - 80, 560)} ${Math.max(mid.yB - 95, 35)})`}>
        <rect width="180" height="94" rx="14" fill="#fff" stroke="#d9e5f3" filter="drop-shadow(0 10px 20px rgba(7,25,54,.12))"/>
        <text x="16" y="25" fontWeight="800" fontSize="14" fill="#071936">PAYDAY #{Math.round(mid.payday)}</text>
        <text x="16" y="48" fontSize="13" fill="#071936">Balance</text><text x="105" y="48" fontWeight="800" fontSize="13" fill="#071936">{money(mid.balance, currency)}</text>
        <text x="16" y="68" fontSize="13" fill="#071936">Growth</text><text x="105" y="68" fontWeight="800" fontSize="13" fill="#071936">{money(mid.growth, currency)}</text>
        <text x="16" y="88" fontSize="13" fill="#071936">Contributions</text><text x="105" y="88" fontWeight="800" fontSize="13" fill="#071936">{money(mid.contributions, currency)}</text>
      </g>
    </svg>
  </div>
}

function Drawer({ title, open, onClose, children }) {
  if (!open) return null
  return <div className="drawerBackdrop" onClick={onClose}>
    <aside className="drawer" onClick={e => e.stopPropagation()}>
      <button className="close" onClick={onClose}>×</button>
      <h2>{title}</h2>
      {children}
    </aside>
  </div>
}

export default function App() {
  const [currency, setCurrency] = useState(() => localStorage.getItem('paydays.currency') || 'CAD')
  const [tab, setTab] = useState('Graph')
  const [mode, setMode] = useState('By Paydays')
  const [drawer, setDrawer] = useState(null)
  const [history, setHistory] = useState(() => JSON.parse(localStorage.getItem('paydays.history.v1') || '[]'))
  const [form, setForm] = useState({ start: '25000', contribution: '250', frequency: 'Biweekly', rate: '7.0', age: '35', retireAge: '65', updateBalance: '' })
  const start = clamp(parseMoney(form.start), 0, 25000000)
  const contribution = Math.max(0, parseMoney(form.contribution))
  const age = clamp(form.age, 16, 99)
  const retireAge = Math.max(age, clamp(form.retireAge, 16, 99))
  const rate = clamp(form.rate, 0, 20)
  const projection = useMemo(() => buildProjection({ start, contribution, frequency: form.frequency, age, retireAge, rate }), [start, contribution, form.frequency, age, retireAge, rate])
  const lower = buildProjection({ start, contribution, frequency: form.frequency, age, retireAge, rate: Math.max(0, rate - 2) })
  const higher = buildProjection({ start, contribution, frequency: form.frequency, age, retireAge, rate: rate + 2 })

  useEffect(() => localStorage.setItem('paydays.currency', currency), [currency])
  useEffect(() => localStorage.setItem('paydays.history.v1', JSON.stringify(history)), [history])

  const update = (key, value) => setForm(f => ({ ...f, [key]: value }))
  const saveBalance = () => {
    const value = parseMoney(form.updateBalance)
    if (!value) return
    setHistory(h => [{ date: new Date().toLocaleDateString(undefined, { month:'short', day:'numeric', year:'numeric' }), payday: Math.min(1040, Math.max(0, 1040 - projection.periods)), balance: value }, ...h].slice(0, 20))
  }
  const clearData = () => { localStorage.removeItem('paydays.history.v1'); setHistory([]) }

  return <div className="site">
    <header className="topbar">
      <div className="logo">1040<span>PAYDAYS</span></div>
      <nav><button>Calculator</button><button onClick={()=>setDrawer('How it works')}>How it works</button><button onClick={()=>setTab('Compare')}>Compare</button><button onClick={()=>setDrawer('Learn')}>Learn⌄</button></nav>
      <div className="navRight"><select value={currency} onChange={e=>setCurrency(e.target.value)}>{Object.keys(currencies).map(k=><option key={k} value={k}>{currencies[k].flag} {k} {currencies[k].symbol}</option>)}</select><button className="menu">☰</button></div>
    </header>

    <main className="layout">
      <section className="story">
        <div className="accent" />
        <h1>You only get about <strong>1,040</strong> paydays.</h1>
        <p className="tagline">Make every one count.</p>
        <ul className="promises"><li>📅 <span>One payday<br/>at a time.</span></li><li>↗ <span>See the power of<br/>consistency.</span></li><li>◎ <span>Build the future<br/>you deserve.</span></li></ul>
        <div className="hourglass" aria-hidden="true"><div className="hgTop"></div><div className="hgMid"></div><div className="hgBottom"></div></div>
      </section>

      <section className="calculator card">
        {[
          ['Starting investment','start','$'], ['I add every payday','contribution','$'], ['Pay frequency','frequency','select'], ['Current age','age',''], ['Expected annual return','rate','%'], ['Retiring at age','retireAge','']
        ].map(([label,key,type]) => <label key={key}><span>{label} <small>ⓘ</small></span>{type==='select'?<select value={form.frequency} onChange={e=>update('frequency',e.target.value)}>{Object.keys(freqMap).map(f=><option key={f}>{f}</option>)}</select>:<div className="inputWrap"><b>{type==='$'?'$':''}</b><input value={form[key]} onChange={e=>update(key,e.target.value)} />{type==='%'?<b>%</b>:null}</div>}</label>)}
        <button className="advanced">› Advanced assumptions (optional)</button>
        <button className="primary" onClick={()=>setTab('Graph')}>▣ Calculate projection →</button>
        <div className="privacyLine">🔒 No account needed · Saved on your device <button onClick={()=>setDrawer('Privacy')}>Privacy settings</button></div>
      </section>

      <section className="projection card darkCard">
        <div><h3>YOUR PAYDAY #1040</h3><strong>{money(projection.finalBalance, currency)}</strong><p>{projection.periods.toLocaleString()} paydays to go</p><span>Until age {retireAge}</span><button onClick={()=>setDrawer('Breakdown')}>View breakdown →</button></div><Sparkline />
      </section>

      <section className="metrics card">
        <div><i>▣</i><strong>{money(projection.totalContributions, currency)}</strong><b>Total contributions</b><span>Starting balance + future contributions</span></div>
        <div><i>↗</i><strong>{money(projection.growth, currency)}</strong><b>Investment growth</b><span>From compounding over time</span></div>
        <div><i>◷</i><strong>{projection.periods.toLocaleString()}</strong><b>Paydays remaining</b><span>Until age {retireAge}</span></div>
      </section>

      <section className="chart card">
        <div className="tabs"><div>{['Graph','Breakdown','Compare'].map(t=><button key={t} className={tab===t?'active':''} onClick={()=>setTab(t)}>{t}</button>)}</div><div>{['By Paydays','By Years'].map(t=><button key={t} className={mode===t?'active':''} onClick={()=>setMode(t)}>{t}</button>)}</div></div>
        <div className="legend"><span className="balance">Balance</span><span className="growth">Growth</span><span className="contrib">Contributions</span></div>
        {tab==='Compare' ? <div className="compareCards"><div><span>Lower return · {Math.max(0,rate-2)}%</span><strong>{money(lower.finalBalance,currency)}</strong><p>{projection.periods.toLocaleString()} paydays</p></div><div><span>Current plan · {rate}%</span><strong>{money(projection.finalBalance,currency)}</strong><p>{projection.periods.toLocaleString()} paydays</p></div><div><span>Higher return · {rate+2}%</span><strong>{money(higher.finalBalance,currency)}</strong><p>{projection.periods.toLocaleString()} paydays</p></div></div> : <MainChart points={projection.points} currency={currency}/>}        
        <div className="chartFoot">Values in today’s dollars · After fees & inflation</div>
      </section>

      <aside className="side">
        <section className="update card"><h3>It’s payday. Make it count.</h3><p>Enter your latest account balance to keep your projection accurate.</p><div className="updateRow"><div className="inputWrap"><b>{currencies[currency].symbol}</b><input placeholder="123,456.78" value={form.updateBalance} onChange={e=>update('updateBalance', e.target.value.replace(/[^0-9.]/g,''))}/></div><button onClick={saveBalance}>Update balance</button></div><span>🔒 Stored locally · Private to you</span></section>
        <section className="history card"><div className="historyHead"><h3>Recent history</h3><button onClick={()=>setDrawer('History')}>View all history →</button></div>{history.length===0?<div className="empty">▤<strong>No history yet</strong><p>Your balance updates will appear here.</p></div>:history.slice(0,4).map((h,i)=><div className="historyItem" key={i}><span className="dot"/><span>{h.date}</span><span>Payday #{h.payday}</span><strong>{money(h.balance,currency)}</strong></div>)}</section>
      </aside>
    </main>

    <footer><span>🛡 Your data stays private. Always.</span><span>© 2025 1040 Paydays</span><nav><button onClick={()=>setDrawer('Privacy')}>Privacy</button><button onClick={()=>setDrawer('Terms')}>Terms</button><button onClick={()=>setDrawer('Disclaimer')}>Disclaimer</button><button onClick={()=>setDrawer('Contact')}>Contact</button></nav></footer>

    <Drawer title={drawer} open={!!drawer} onClose={()=>setDrawer(null)}>
      {drawer==='Breakdown' && <div className="breakdown"><p>Starting investment <b>{money(start,currency)}</b></p><p>Future contributions <b>{money(projection.totalContributions-start,currency)}</b></p><p>Investment growth <b>{money(projection.growth,currency)}</b></p><hr/><p>Projected balance <b>{money(projection.finalBalance,currency)}</b></p></div>}
      {drawer==='Privacy' && <div><p>Your saved data stays on this device. 1040 Paydays does not require an account and does not upload your saved balances.</p><button className="danger" onClick={clearData}>Clear saved data</button></div>}
      {drawer==='History' && <div>{history.length===0?<p>No saved paydays yet.</p>:history.map((h,i)=><p key={i}>{h.date} — Payday #{h.payday} — <b>{money(h.balance,currency)}</b></p>)}</div>}
      {!['Breakdown','Privacy','History'].includes(drawer) && <p>This section is ready for your guide content, articles, and plain-language explanations.</p>}
    </Drawer>
  </div>
}
