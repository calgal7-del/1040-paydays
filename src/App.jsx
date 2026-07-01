import { useEffect, useMemo, useState } from 'react'
import { CalendarDays, ChevronRight, Download, Info, Lock, Mail, Menu, ShieldCheck, Trash2, X, ZoomIn } from 'lucide-react'
import './App.css'

const AGE_MIN = 16
const AGE_MAX = 99
const MAX_STARTING_BALANCE = 25_000_000
const FREQUENCIES = {
  Daily: 365,
  Weekly: 52,
  Biweekly: 26,
  'Semi-monthly': 24,
  Monthly: 12,
  Yearly: 1,
}
const CURRENCIES = {
  CAD: { symbol: '$', flag: '🇨🇦', label: 'Canadian dollar' },
  USD: { symbol: '$', flag: '🇺🇸', label: 'US dollar' },
  GBP: { symbol: '£', flag: '🇬🇧', label: 'British pound' },
  EUR: { symbol: '€', flag: '🇪🇺', label: 'Euro' },
  AUD: { symbol: '$', flag: '🇦🇺', label: 'Australian dollar' },
}
const STORAGE_KEY = 'paydays-history-v1'
const SETTINGS_KEY = 'paydays-settings-v1'

const initialForm = {
  start: 25000,
  contribution: 250,
  frequency: 'Biweekly',
  age: 35,
  retireAge: 65,
  returnRate: 7,
}

function clampNumber(value, min, max) {
  const n = Number(value)
  if (Number.isNaN(n)) return min
  return Math.min(max, Math.max(min, n))
}

function formatMoney(value, currency) {
  const { symbol } = CURRENCIES[currency] || CURRENCIES.CAD
  return `${symbol}${Math.round(value).toLocaleString()}`
}

function formatDecimalMoney(value, currency) {
  const { symbol } = CURRENCIES[currency] || CURRENCIES.CAD
  return `${symbol}${Number(value).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
}

function calculateProjection(form) {
  const start = clampNumber(form.start, 0, MAX_STARTING_BALANCE)
  const contribution = Math.max(0, Number(form.contribution) || 0)
  const age = clampNumber(form.age, AGE_MIN, AGE_MAX)
  const retireAge = clampNumber(form.retireAge, age, AGE_MAX)
  const years = Math.max(0, retireAge - age)
  const frequency = FREQUENCIES[form.frequency] ? form.frequency : 'Biweekly'
  const periodsPerYear = FREQUENCIES[frequency]
  const totalPeriods = Math.round(years * periodsPerYear)
  const rate = Math.max(0, Math.min(20, Number(form.returnRate) || 0)) / 100
  const periodRate = periodsPerYear ? Math.pow(1 + rate, 1 / periodsPerYear) - 1 : 0
  let balance = start
  const points = [{ period: 0, payday: 0, balance, contributions: start, growth: 0, year: age }]

  for (let period = 1; period <= totalPeriods; period += 1) {
    balance = balance * (1 + periodRate) + contribution
    const markerEvery = Math.max(1, Math.floor(totalPeriods / 90))
    if (period === totalPeriods || period % markerEvery === 0) {
      const contributions = start + contribution * period
      points.push({
        period,
        payday: period,
        balance,
        contributions,
        growth: balance - contributions,
        year: age + period / periodsPerYear,
      })
    }
  }

  const totalContributions = start + contribution * totalPeriods
  return {
    start,
    contribution,
    age,
    retireAge,
    years,
    frequency,
    periodsPerYear,
    totalPeriods,
    finalBalance: balance,
    totalContributions,
    growth: balance - totalContributions,
    points,
    rate: rate * 100,
  }
}

function miniPath(points, width = 420, height = 125) {
  if (!points.length) return ''
  const maxY = Math.max(...points.map((p) => p.balance), 1)
  return points
    .map((p, i) => {
      const x = (p.period / Math.max(points.at(-1).period, 1)) * width
      const y = height - (p.balance / maxY) * height
      return `${i === 0 ? 'M' : 'L'} ${x.toFixed(1)} ${y.toFixed(1)}`
    })
    .join(' ')
}

function areaPath(points, key, width = 860, height = 330) {
  if (!points.length) return ''
  const maxY = Math.max(...points.map((p) => p.balance), 1)
  return points
    .map((p, i) => {
      const x = (p.period / Math.max(points.at(-1).period, 1)) * width
      const y = height - (p[key] / maxY) * height
      return `${i === 0 ? 'M' : 'L'} ${x.toFixed(1)} ${y.toFixed(1)}`
    })
    .join(' ')
}

function App() {
  const [form, setForm] = useState(initialForm)
  const [currency, setCurrency] = useState('CAD')
  const [tab, setTab] = useState('Graph')
  const [mode, setMode] = useState('Paydays')
  const [drawer, setDrawer] = useState(null)
  const [remember, setRemember] = useState(true)
  const [history, setHistory] = useState([])
  const [updateBalance, setUpdateBalance] = useState('123456.78')
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    try {
      const savedSettings = JSON.parse(localStorage.getItem(SETTINGS_KEY) || '{}')
      if (savedSettings.currency) setCurrency(savedSettings.currency)
      if (typeof savedSettings.remember === 'boolean') setRemember(savedSettings.remember)
      const savedHistory = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
      if (Array.isArray(savedHistory)) setHistory(savedHistory)
    } catch {}
  }, [])

  useEffect(() => {
    try { localStorage.setItem(SETTINGS_KEY, JSON.stringify({ currency, remember })) } catch {}
  }, [currency, remember])

  const projection = useMemo(() => calculateProjection(form), [form])
  const errors = useMemo(() => {
    const list = []
    if (Number(form.start) > MAX_STARTING_BALANCE) list.push('Starting investment cannot be more than 25,000,000.')
    if (Number(form.age) < AGE_MIN || Number(form.age) > AGE_MAX) list.push('Current age must be between 16 and 99.')
    if (Number(form.retireAge) < AGE_MIN || Number(form.retireAge) > AGE_MAX) list.push('Retiring age must be between 16 and 99.')
    if (Number(form.retireAge) < Number(form.age)) list.push('Retiring age cannot be lower than current age.')
    if (Number(form.contribution) < 0) list.push('Contribution cannot be negative.')
    if (Number(form.returnRate) < 0 || Number(form.returnRate) > 20) list.push('Expected annual return should be between 0% and 20%.')
    return list
  }, [form])

  function updateField(name, value) {
    const numericFields = ['start', 'contribution', 'age', 'retireAge', 'returnRate']
    setForm((prev) => ({ ...prev, [name]: numericFields.includes(name) ? Number(value) : value }))
  }

  function calculateClick() {
    if (errors.length) return
    document.getElementById('graph')?.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }

  function saveBalance() {
    const amount = Number(updateBalance)
    if (!Number.isFinite(amount) || amount < 0) return
    const entry = {
      id: Date.now(),
      date: new Date().toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' }),
      payday: Math.max(1, 1040 - projection.totalPeriods),
      age: projection.age,
      balance: amount,
    }
    const next = [entry, ...history].slice(0, 12)
    setHistory(next)
    if (remember) localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
  }

  function clearSavedData() {
    setHistory([])
    localStorage.removeItem(STORAGE_KEY)
    localStorage.removeItem(SETTINGS_KEY)
    setRemember(false)
    setDrawer(null)
  }

  const pathBalance = areaPath(projection.points, 'balance')
  const pathGrowth = areaPath(projection.points, 'growth')
  const pathContrib = areaPath(projection.points, 'contributions')
  const finalPayday = mode === 'Paydays' ? '#1040' : `Age ${projection.retireAge}`

  return (
    <div className="app">
      <header className="topbar">
        <a className="brand" href="#top" aria-label="1040 Paydays home"><span>1040</span><small>PAYDAYS</small></a>
        <nav className={menuOpen ? 'nav open' : 'nav'}>
          {['Calculator', 'How it works', 'Compare', 'Learn'].map((item) => (
            <button key={item} onClick={() => { setMenuOpen(false); item === 'Calculator' ? window.scrollTo({ top: 0, behavior: 'smooth' }) : setDrawer(item.toLowerCase().replaceAll(' ', '-')) }}>{item}</button>
          ))}
        </nav>
        <div className="top-actions">
          <select aria-label="Currency" value={currency} onChange={(e) => setCurrency(e.target.value)}>
            {Object.entries(CURRENCIES).map(([code, c]) => <option key={code} value={code}>{c.flag} {c.symbol} {code}</option>)}
          </select>
          <button className="icon-button" onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu"><Menu size={20} /></button>
        </div>
      </header>

      <main id="top" className="page-shell">
        <aside className="story-panel">
          <h1>You only get about <strong>1,040</strong> paydays.</h1>
          <p className="lead">Make every one count.</p>
          <div className="story-line" />
          <div className="story-points">
            <p><CalendarDays size={22} /> One payday at a time.</p>
            <p><Info size={22} /> See the power of consistency.</p>
            <p><ShieldCheck size={22} /> Your data stays private.</p>
          </div>
          <div className="hourglass" aria-hidden="true"><div /></div>
        </aside>

        <section className="hero-grid">
          <section className="calculator card" id="calculator">
            <div className="field"><label>Starting investment <Info size={13} /></label><input type="number" min="0" max={MAX_STARTING_BALANCE} value={form.start} onChange={(e) => updateField('start', e.target.value)} /><small>Max {formatMoney(MAX_STARTING_BALANCE, currency)}</small></div>
            <div className="field"><label>I add every payday <Info size={13} /></label><input type="number" min="0" value={form.contribution} onChange={(e) => updateField('contribution', e.target.value)} /></div>
            <div className="field"><label>Pay frequency <Info size={13} /></label><select value={form.frequency} onChange={(e) => updateField('frequency', e.target.value)}>{Object.keys(FREQUENCIES).map((f) => <option key={f}>{f}</option>)}</select></div>
            <div className="field"><label>Current age <Info size={13} /></label><input type="number" min={AGE_MIN} max={AGE_MAX} value={form.age} onChange={(e) => updateField('age', e.target.value)} /><small>16 – 99</small></div>
            <div className="field"><label>Expected annual return <Info size={13} /></label><input type="number" min="0" max="20" step="0.1" value={form.returnRate} onChange={(e) => updateField('returnRate', e.target.value)} /><small>After fees & inflation</small></div>
            <div className="field"><label>Retiring at age <Info size={13} /></label><input type="number" min={AGE_MIN} max={AGE_MAX} value={form.retireAge} onChange={(e) => updateField('retireAge', e.target.value)} /><small>16 – 99</small></div>
            <button className="advanced" onClick={() => setDrawer('assumptions')}>▸ Advanced assumptions (optional)</button>
            <button className="primary full" disabled={errors.length > 0} onClick={calculateClick}>Calculate projection <ChevronRight /></button>
            {errors.length > 0 && <div className="errors">{errors.map((e) => <p key={e}>{e}</p>)}</div>}
            <p className="privacy-line"><Lock size={14} /> No account needed · Saved on your device <button onClick={() => setDrawer('privacy')}>Privacy settings</button></p>
          </section>

          <section className="projection-card">
            <div>
              <p>YOUR PAYDAY #1040</p>
              <h2>{formatMoney(projection.finalBalance, currency)}</h2>
              <h3>{projection.totalPeriods.toLocaleString()} paydays to go</h3>
              <span>Until age {projection.retireAge}</span>
              <button onClick={() => setDrawer('breakdown')}>View breakdown <ChevronRight size={18} /></button>
            </div>
            <svg viewBox="0 0 420 125" role="img" aria-label="Projection preview line"><path d={miniPath(projection.points)} fill="none" stroke="rgba(79,139,255,.95)" strokeWidth="8" strokeLinecap="round" /></svg>
          </section>
        </section>

        <section className="metrics card">
          <Metric title="Total contributions" value={formatMoney(projection.totalContributions, currency)} detail="Starting balance + future contributions" />
          <Metric title="Investment growth" value={formatMoney(projection.growth, currency)} detail={`From compounding over ${projection.years}`} />
          <Metric title="Projected balance" value={formatMoney(projection.finalBalance, currency)} detail="At payday #1040" />
          <Metric title="Paydays remaining" value={projection.totalPeriods.toLocaleString()} detail={`Until age ${projection.retireAge}`} />
        </section>

        <section className="main-grid">
          <section className="chart-card card" id="graph">
            <div className="tabs"><div>{['Graph', 'Breakdown', 'Compare'].map((t) => <button key={t} className={tab === t ? 'active' : ''} onClick={() => setTab(t)}>{t}</button>)}</div><div><button className={mode === 'Paydays' ? 'active filled' : ''} onClick={() => setMode('Paydays')}>By Paydays</button><button className={mode === 'Years' ? 'active filled' : ''} onClick={() => setMode('Years')}>By Years</button></div></div>
            {tab === 'Graph' && <Chart projection={projection} currency={currency} pathBalance={pathBalance} pathGrowth={pathGrowth} pathContrib={pathContrib} finalPayday={finalPayday} />}
            {tab === 'Breakdown' && <Breakdown projection={projection} currency={currency} />}
            {tab === 'Compare' && <Compare projection={projection} currency={currency} />}
          </section>

          <aside className="side-stack">
            <section className="update-card card">
              <h3>Update today's balance</h3>
              <p>Enter your latest account balance to keep your projection accurate.</p>
              <div className="update-row"><input value={updateBalance} onChange={(e) => setUpdateBalance(e.target.value)} /><button onClick={saveBalance}>Update balance</button></div>
              <small><Lock size={13} /> Saved locally · Private to you</small>
            </section>
            <section className="history-card card">
              <div className="section-head"><h3>Recent history</h3><button onClick={() => setDrawer('history')}>View all history <ChevronRight size={16} /></button></div>
              <Timeline history={history} currency={currency} onDelete={(id) => { const next = history.filter(h => h.id !== id); setHistory(next); if (remember) localStorage.setItem(STORAGE_KEY, JSON.stringify(next)); }} />
            </section>
          </aside>
        </section>
      </main>

      <footer><span><ShieldCheck size={18} /> Your data stays private. Always.</span><span>© 2025 1040 Paydays</span><button onClick={() => setDrawer('privacy')}>Privacy</button><button onClick={() => setDrawer('terms')}>Terms</button><button onClick={() => setDrawer('disclaimer')}>Disclaimer</button><button onClick={() => setDrawer('contact')}><Mail size={18} /></button></footer>

      {drawer && <Drawer title={drawerTitle(drawer)} onClose={() => setDrawer(null)}>{drawerContent(drawer, { projection, currency, history, remember, setRemember, clearSavedData, setDrawer })}</Drawer>}
    </div>
  )
}

function Metric({ title, value, detail }) { return <article className="metric"><h3>{value}</h3><strong>{title}</strong><p>{detail}</p></article> }

function Chart({ projection, currency, pathBalance, pathGrowth, pathContrib, finalPayday }) {
  return <div className="chart-wrap"><div className="legend"><span className="l balance">Balance</span><span className="l growth">Growth</span><span className="l contrib">Contributions</span></div><svg viewBox="0 0 940 380" className="chart" role="img" aria-label="Projection chart"><defs><linearGradient id="fill" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stopColor="#4f8bff" stopOpacity=".35"/><stop offset="1" stopColor="#4f8bff" stopOpacity=".04"/></linearGradient></defs>{[80,160,240,320].map(y=><line key={y} x1="42" x2="905" y1={y} y2={y} className="grid"/>)}<path d={`${pathBalance} L 860 330 L 0 330 Z`} transform="translate(42 18)" fill="url(#fill)"/><path d={pathContrib} transform="translate(42 18)" className="line contrib"/><path d={pathGrowth} transform="translate(42 18)" className="line growth"/><path d={pathBalance} transform="translate(42 18)" className="line balance"/><circle cx="902" cy="48" r="8" className="dot"/><text x="42" y="364">Now</text><text x="255" y="364">#260</text><text x="470" y="364">#520</text><text x="685" y="364">#780</text><text x="875" y="364">{finalPayday}</text></svg><div className="tooltip"><strong>PAYDAY #1040</strong><p>Balance <b>{formatMoney(projection.finalBalance, currency)}</b></p><p>Growth <b>{formatMoney(projection.growth, currency)}</b></p><p>Contributions <b>{formatMoney(projection.totalContributions, currency)}</b></p></div><div className="chart-tools"><button><ZoomIn size={16}/></button><button><ZoomIn size={16}/></button><button onClick={() => alert('Chart download will be available after launch.')}><Download size={16}/></button></div><p className="chart-note">Values in today’s dollars · After fees & inflation</p></div>
}
function Breakdown({ projection, currency }) { return <div className="panel-grid"><Metric title="Starting investment" value={formatMoney(projection.start, currency)} detail="Entered by the user"/><Metric title="Future contributions" value={formatMoney(projection.totalContributions - projection.start, currency)} detail="All future payday additions"/><Metric title="Investment growth" value={formatMoney(projection.growth, currency)} detail="Compounding effect"/><Metric title="Projected balance" value={formatMoney(projection.finalBalance, currency)} detail="At payday #1040"/></div> }
function Compare({ projection, currency }) { const more = calculateProjection({ ...initialForm, ...projection, start: projection.start, contribution: projection.contribution + 10, age: projection.age, retireAge: projection.retireAge, frequency: projection.frequency, returnRate: projection.rate }); return <div className="compare"><h3>What if you added {formatMoney(10, currency)} more every payday?</h3><p>Your projection would increase by about <b>{formatMoney(more.finalBalance - projection.finalBalance, currency)}</b>.</p><button>Save comparison</button></div> }
function Timeline({ history, currency, onDelete }) { const sample = history.length ? history : [{ id: 1, date: 'May 24, 2025', payday: 198, balance: 123456.78 },{ id: 2, date: 'May 10, 2025', payday: 196, balance: 120342.21 },{ id: 3, date: 'Apr 26, 2025', payday: 194, balance: 118220.11 }]; return <div className="timeline">{sample.slice(0,4).map((h)=><div key={h.id} className="timeline-item"><span/><p>{h.date}</p><p>Payday #{h.payday}</p><strong>{formatDecimalMoney(h.balance, currency)}</strong>{history.length > 0 && <button onClick={()=>onDelete(h.id)}><Trash2 size={14}/></button>}</div>)}</div> }
function Drawer({ title, children, onClose }) { return <div className="overlay" onMouseDown={onClose}><aside className="drawer" onMouseDown={(e)=>e.stopPropagation()}><button className="close" onClick={onClose}><X/></button><h2>{title}</h2>{children}</aside></div> }
function drawerTitle(d) { return ({breakdown:'Projection breakdown', privacy:'Privacy settings', history:'All history', assumptions:'Advanced assumptions', 'how-it-works':'How it works', compare:'Compare scenarios', learn:'Learn', terms:'Terms', disclaimer:'Disclaimer', contact:'Contact'}[d] || d) }
function drawerContent(d, ctx) { if (d==='breakdown') return <Breakdown projection={ctx.projection} currency={ctx.currency}/>; if (d==='history') return <Timeline history={ctx.history} currency={ctx.currency} onDelete={()=>{}}/>; if (d==='privacy') return <div className="drawer-stack"><label><input type="checkbox" checked={ctx.remember} onChange={(e)=>ctx.setRemember(e.target.checked)}/> Remember my progress on this device</label><p>Your data is stored locally in this browser only.</p><button className="danger" onClick={ctx.clearSavedData}>Clear saved data</button></div>; if (d==='assumptions') return <p>Future version: contribution increases, fees, inflation, and employer match.</p>; return <p>This section is connected and ready for your future content.</p> }
export default App
