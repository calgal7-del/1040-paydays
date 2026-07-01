import { useEffect, useMemo, useState } from 'react'
import './App.css'

const AGE_MIN = 16
const AGE_MAX = 99
const MAX_STARTING_BALANCE = 25000000
const STORAGE_KEY = 'paydays-state-v3-user-history-only'
const FREQ = {
  Daily: 365,
  Weekly: 52,
  Biweekly: 26,
  'Semi-monthly': 24,
  Monthly: 12,
  Yearly: 1,
}
const CURRENCIES = {
  CAD: { symbol: '$', label: 'Canadian dollar', flag: '🇨🇦' },
  USD: { symbol: '$', label: 'US dollar', flag: '🇺🇸' },
  GBP: { symbol: '£', label: 'British pound', flag: '🇬🇧' },
  EUR: { symbol: '€', label: 'Euro', flag: '🇪🇺' },
  AUD: { symbol: '$', label: 'Australian dollar', flag: '🇦🇺' },
}

function n(value) {
  const parsed = Number(String(value).replace(/,/g, ''))
  return Number.isFinite(parsed) ? parsed : 0
}
function clamp(value, min, max) { return Math.min(max, Math.max(min, value)) }
function money(value, currency='CAD') {
  const symbol = CURRENCIES[currency]?.symbol || '$'
  return `${symbol}${Math.round(value).toLocaleString()}`
}
function moneyInput(value, currency='CAD') {
  const symbol = CURRENCIES[currency]?.symbol || '$'
  return `${symbol}${Number(value || 0).toLocaleString(undefined, { maximumFractionDigits: 2 })}`
}
function buildSeries({ starting, contribution, currentAge, retireAge, frequency, rate }) {
  const years = Math.max(0, retireAge - currentAge)
  const periods = Math.max(1, Math.round(years * FREQ[frequency]))
  const periodicRate = Math.pow(1 + rate / 100, 1 / FREQ[frequency]) - 1
  let balance = starting
  let contributions = starting
  const points = []
  for (let i = 0; i <= periods; i++) {
    if (i > 0) {
      balance = balance * (1 + periodicRate) + contribution
      contributions += contribution
    }
    if (i === 0 || i === periods || i % Math.max(1, Math.round(periods / 7)) === 0) {
      points.push({ payday: i, balance, contributions, growth: Math.max(0, balance - contributions) })
    }
  }
  return { points, periods, balance, contributions, growth: Math.max(0, balance - contributions), years }
}
function pathFor(points, key, width, height, pad=20) {
  const maxY = Math.max(...points.map(p => p.balance), 1)
  const maxX = Math.max(...points.map(p => p.payday), 1)
  return points.map((p, idx) => {
    const x = pad + (p.payday / maxX) * (width - pad * 2)
    const y = height - pad - (p[key] / maxY) * (height - pad * 2)
    return `${idx === 0 ? 'M' : 'L'} ${x.toFixed(1)} ${y.toFixed(1)}`
  }).join(' ')
}
function Area({ points }) {
  const w = 900, h = 330, pad = 24
  const bal = pathFor(points, 'balance', w, h, pad)
  const grow = pathFor(points, 'growth', w, h, pad)
  const contrib = pathFor(points, 'contributions', w, h, pad)
  const maxX = Math.max(...points.map(p => p.payday), 1)
  const maxY = Math.max(...points.map(p => p.balance), 1)
  const last = points[points.length - 1]
  const lastX = pad + (last.payday / maxX) * (w - pad*2)
  const lastY = h - pad - (last.balance / maxY) * (h - pad*2)
  const fill = `${bal} L ${lastX.toFixed(1)} ${h-pad} L ${pad} ${h-pad} Z`
  return <svg className="chartSvg" viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none" role="img" aria-label="Projection chart">
    <defs><linearGradient id="g" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stopColor="#1e5f9d" stopOpacity=".22"/><stop offset="1" stopColor="#1e5f9d" stopOpacity="0"/></linearGradient></defs>
    {[0.2,0.4,0.6,0.8].map(t => <line key={t} x1="24" x2="876" y1={h-pad-t*(h-pad*2)} y2={h-pad-t*(h-pad*2)} stroke="#e7eef5" strokeWidth="1"/>)}
    <path d={fill} fill="url(#g)"/>
    <path d={contrib} fill="none" stroke="#9ab2c6" strokeWidth="3" strokeDasharray="8 8"/>
    <path d={grow} fill="none" stroke="#7da9ca" strokeWidth="3"/>
    <path d={bal} fill="none" stroke="#0f3557" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round"/>
    {points.slice(1, -1).map((p, i) => {
      const x = pad + (p.payday / maxX) * (w - pad*2)
      const y = h - pad - (p.balance / maxY) * (h - pad*2)
      return <circle key={i} cx={x} cy={y} r="5" fill="#fff" stroke="#0f3557" strokeWidth="3"/>
    })}
  </svg>
}
function Drawer({ title, children, onClose }) {
  return <div className="drawerOverlay" onClick={onClose}><aside className="drawer" onClick={e=>e.stopPropagation()}><div className="drawerTop"><h2>{title}</h2><button className="xBtn" onClick={onClose}>×</button></div>{children}</aside></div>
}
function Modal({ title, children, onClose }) {
  return <div className="modalOverlay" onClick={onClose}><section className="modal" onClick={e=>e.stopPropagation()}><div className="modalTop"><h2>{title}</h2><button className="xBtn" onClick={onClose}>×</button></div>{children}</section></div>
}

export default function App() {
  const [form, setForm] = useState({ starting: 39000, contribution: 250, frequency:'Biweekly', currentAge:35, retireAge:65, rate:7 })
  const [balanceDraft, setBalanceDraft] = useState('39000')
  const [currency, setCurrency] = useState('CAD')
  const [remember, setRemember] = useState(false)
  const [history, setHistory] = useState([])
  const [drawer, setDrawer] = useState(null)
  const [modal, setModal] = useState(null)
  const [chartMode, setChartMode] = useState('Graph')
  const [timeMode, setTimeMode] = useState('By paydays')
  useEffect(() => {
    try { const raw = localStorage.getItem(STORAGE_KEY); if (raw) { const s=JSON.parse(raw); setCurrency(s.currency||'CAD'); setRemember(!!s.remember); setHistory(s.history||[]); if (s.form) { setForm(f=>({...f,...s.form})); setBalanceDraft(String(s.form.starting ?? '39000')) } } } catch {}
  }, [])
  useEffect(() => { if (remember) localStorage.setItem(STORAGE_KEY, JSON.stringify({ form, currency, remember, history })) }, [form,currency,remember,history])
  const validation = useMemo(() => {
    const errs=[]
    if (n(form.starting) > MAX_STARTING_BALANCE) errs.push('Starting investment is above the allowed maximum.')
    if (n(form.starting) < 0 || n(form.contribution) < 0) errs.push('Amounts cannot be negative.')
    if (n(form.currentAge) < AGE_MIN || n(form.currentAge) > AGE_MAX) errs.push('Current age must be between 16 and 99.')
    if (n(form.retireAge) < AGE_MIN || n(form.retireAge) > AGE_MAX) errs.push('Retirement age must be between 16 and 99.')
    if (n(form.retireAge) < n(form.currentAge)) errs.push('Retirement age cannot be below current age.')
    if (n(form.rate) < 0 || n(form.rate) > 20) errs.push('Return rate should be between 0% and 20%.')
    return errs
  }, [form])
  const calc = useMemo(() => buildSeries({ starting: n(form.starting), contribution:n(form.contribution), currentAge:n(form.currentAge), retireAge:n(form.retireAge), frequency:form.frequency, rate:n(form.rate) }), [form])
  const lower = buildSeries({ starting:n(form.starting), contribution:n(form.contribution), currentAge:n(form.currentAge), retireAge:n(form.retireAge), frequency:form.frequency, rate:Math.max(0,n(form.rate)-2) }).balance
  const higher = buildSeries({ starting:n(form.starting), contribution:n(form.contribution), currentAge:n(form.currentAge), retireAge:n(form.retireAge), frequency:form.frequency, rate:n(form.rate)+2 }).balance
  const update = (k,v) => {
    setForm(f=>({...f,[k]:v}))
    if (k === 'starting') setBalanceDraft(String(v))
  }
  const saveBalance = () => {
    const cleanBalance = clamp(n(balanceDraft), 0, MAX_STARTING_BALANCE)
    setForm(f => ({ ...f, starting: cleanBalance }))
    const item = {
      date:new Date().toLocaleDateString(undefined,{month:'short',day:'numeric'}),
      value:cleanBalance,
      delta: history.length ? cleanBalance-history[0].value : 0
    }
    setHistory(h=>[item,...h].slice(0,12))
    setRemember(true)
  }
  const clearData = () => { localStorage.removeItem(STORAGE_KEY); setHistory([]); setRemember(false); setModal(null); }
  return <div className="appShell">
    <header className="topbar"><button className="logo textButton" onClick={()=>scrollTo(0,0)}>1040<span>PAYDAYS</span></button><nav className="nav"><button onClick={()=>setDrawer('how')}>How it works</button><button onClick={()=>setDrawer('compare')}>Compare</button><button onClick={()=>setDrawer('learn')}>Learn</button><button className="currencyBtn" onClick={()=>setModal('currency')}>{CURRENCIES[currency].flag} {CURRENCIES[currency].symbol}</button></nav></header>
    <main className="hero">
      <section className="leftPanel">
        <div className="brandHero"><h1>1040<span>Paydays</span></h1><p>You only get about 1040 paydays.</p><small>Your future grows one payday at a time.</small></div>
        <div className="calcCard"><div className="calcHeader"><div><h2>Calculate your payday engine</h2><p>Enter your starting point and see what consistency can become.</p></div><button className="linkBtn" onClick={()=>setDrawer('privacy')}>Privacy</button></div>
          <div className="gridInputs">
            <div className="field"><label>Already invested</label><input type="number" value={form.starting} onChange={e=>update('starting', e.target.value)} /></div>
            <div className="field"><label>I add</label><input type="number" value={form.contribution} onChange={e=>update('contribution', e.target.value)} /></div>
            <div className="field"><label>Every</label><select value={form.frequency} onChange={e=>update('frequency',e.target.value)}>{Object.keys(FREQ).map(f=><option key={f}>{f}</option>)}</select></div>
            <div className="field"><label>Return</label><input type="number" step="0.1" value={form.rate} onChange={e=>update('rate', e.target.value)} /></div>
            <div className="field"><label>I'm</label><input type="number" value={form.currentAge} onChange={e=>update('currentAge', e.target.value)} /></div>
            <div className="field"><label>Retiring at</label><input type="number" value={form.retireAge} onChange={e=>update('retireAge', e.target.value)} /></div>
            <button className="primaryBtn full" disabled={validation.length>0} onClick={()=>setDrawer('breakdown')}>Calculate projection</button>
          </div>
          {validation.length>0 && <div className="errorBox">{validation[0]}</div>}
          <div className="trustLine"><span>No account needed</span><span>Saved only on this device if you choose</span></div>
        </div>
      </section>
      <section className="mainArea">
        <div className="projectionCard"><div className="projectionCopy"><div><div className="eyebrow">Your payday #{calc.periods.toLocaleString()}</div><div className="bigMoney">{money(calc.balance,currency)}</div><div className="subtle">{calc.periods.toLocaleString()} paydays remaining · {calc.years} years</div></div><div className="compareStrip"><div className="compareCard"><span>Lower return {Math.max(0,n(form.rate)-2)}%</span><b>{money(lower,currency)}</b></div><div className="compareCard"><span>Current plan {n(form.rate)}%</span><b>{money(calc.balance,currency)}</b></div><div className="compareCard"><span>Higher return {n(form.rate)+2}%</span><b>{money(higher,currency)}</b></div></div><button className="secondaryBtn" onClick={()=>setDrawer('breakdown')}>View breakdown →</button></div>
          <div className="chartPanel"><div className="chartHeader"><div><h3>Projection path</h3><p>Balance = contributions + investment growth.</p></div><div className="tabPills">{['Graph','Breakdown','Compare'].map(t=><button key={t} className={`pill ${chartMode===t?'active':''}`} onClick={()=>setChartMode(t)}>{t}</button>)}</div></div><div className="tabPills" style={{marginBottom:10}}>{['By paydays','By years'].map(t=><button key={t} className={`pill ${timeMode===t?'active':''}`} onClick={()=>setTimeMode(t)}>{t}</button>)}</div><div className="chartWrap"><Area points={calc.points}/></div></div>
        </div>
        <div className="metricRow"><div className="metric"><strong>{money(calc.contributions,currency)}</strong><span>Total contributions</span></div><div className="metric"><strong>{money(calc.growth,currency)}</strong><span>Investment growth</span></div><div className="metric"><strong>{money(calc.balance,currency)}</strong><span>Final balance</span></div><div className="metric"><strong>{calc.periods.toLocaleString()}</strong><span>Paydays left</span></div></div>
        <div className="lowerGrid"><div className="updateCard"><h2>It's payday. Make it count.</h2><p>Update your current investment balance and watch your projection refresh.</p><div className="updateControls"><div className="field balanceField"><label>Current investment balance</label><div className="moneyInputWrap"><span>{CURRENCIES[currency].symbol}</span><input value={Number(balanceDraft || 0).toLocaleString()} inputMode="decimal" onChange={e=>setBalanceDraft(e.target.value.replace(/[^0-9.]/g,''))} /></div></div><button className="primaryBtn" onClick={saveBalance}>Update today's balance</button></div><p className="subtle" style={{color:'#607080'}}>Showing values as {CURRENCIES[currency].symbol}. Example: {moneyInput(form.starting,currency)}</p></div>
          <div className="historyCard"><h2>Payday progress</h2><p>Your recent saved balances, only if you choose to remember them.</p><div className="progressList">{history.slice(0,3).map((h,i)=><div className="progressItem" key={i}><span className="dot">✓</span><div><b>{h.date}</b><span>Balance updated</span></div><strong>{money(h.value,currency)}</strong></div>)}{history.length===0 && <div className="progressItem"><span className="dot">+</span><div><b>No saved history yet</b><span>Use update today’s balance to start.</span></div></div>}</div><button className="linkBtn" onClick={()=>setModal('history')} style={{marginTop:16}}>View all history</button></div>
        </div>
      </section>
    </main>
    <footer className="footer"><span>Private by design. No account required.</span><span><button className="textButton" onClick={()=>setDrawer('terms')}>Terms</button> · <button className="textButton" onClick={()=>setDrawer('disclaimer')}>Disclaimer</button> · <button className="textButton" onClick={()=>setDrawer('contact')}>Contact</button></span></footer>
    {drawer==='breakdown' && <Drawer title="Projection breakdown" onClose={()=>setDrawer(null)}><div className="breakdownRows"><div><span>Starting balance</span><strong>{money(n(form.starting),currency)}</strong></div><div><span>Future contributions</span><strong>{money(calc.contributions-n(form.starting),currency)}</strong></div><div><span>Total contributions</span><strong>{money(calc.contributions,currency)}</strong></div><div><span>Investment growth</span><strong>{money(calc.growth,currency)}</strong></div><div><span>Final balance</span><strong>{money(calc.balance,currency)}</strong></div><div><span>Annual return used</span><strong>{n(form.rate)}%</strong></div></div></Drawer>}
    {drawer==='privacy' && <Drawer title="Privacy settings" onClose={()=>setDrawer(null)}><div className="privacyBox">Your balances and history are stored only in this browser on this device when you turn on remembering. They are not uploaded by this calculator.</div><label style={{display:'flex',gap:10,alignItems:'center'}}><input type="checkbox" checked={remember} onChange={e=>setRemember(e.target.checked)} /> Remember my progress on this device</label><br/><button className="dangerBtn" onClick={()=>setModal('clear')}>Clear saved data</button></Drawer>}
    {['how','compare','learn','terms','disclaimer','contact'].includes(drawer) && <Drawer title={{how:'How it works',compare:'Compare scenarios',learn:'Learn',terms:'Terms',disclaimer:'Disclaimer',contact:'Contact'}[drawer]} onClose={()=>setDrawer(null)}><p className="privacyBox">This section is connected and ready for your content. For launch, keep it simple: explain the assumptions, show examples, and link users back to the calculator.</p></Drawer>}
    {modal==='currency' && <Modal title="Choose currency" onClose={()=>setModal(null)}><div className="currencyMenu">{Object.entries(CURRENCIES).map(([code,c])=><button key={code} className={`currencyOption ${currency===code?'active':''}`} onClick={()=>{setCurrency(code);setModal(null)}}><span>{c.flag} {c.symbol} {c.label}</span><strong>{code}</strong></button>)}</div></Modal>}
    {modal==='history' && <Modal title="Payday progress" onClose={()=>setModal(null)}><div className="progressList">{history.map((h,i)=><div className="progressItem" key={i}><span className="dot">✓</span><div><b>{h.date}</b><span>{h.delta ? `${h.delta>0?'+':''}${money(h.delta,currency)} since last update` : 'First saved balance'}</span></div><strong>{money(h.value,currency)}</strong></div>)}</div></Modal>}
    {modal==='clear' && <Modal title="Clear saved data?" onClose={()=>setModal(null)}><p>This removes saved balances, history, and preferences from this device.</p><button className="dangerBtn" onClick={clearData}>Clear saved data</button></Modal>}
  </div>
}
