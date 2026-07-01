import { useEffect, useMemo, useState } from 'react'
import './App.css'

const AGE_MIN = 16
const AGE_MAX = 99
const MAX_STARTING_BALANCE = 25000000
const MAX_CONTRIBUTION = 1000000
const MAX_RETURN = 25

const FREQUENCIES = [
  { label: 'Daily', value: 'daily', periods: 365 },
  { label: 'Weekly', value: 'weekly', periods: 52 },
  { label: 'Biweekly', value: 'biweekly', periods: 26 },
  { label: 'Semi-monthly', value: 'semimonthly', periods: 24 },
  { label: 'Monthly', value: 'monthly', periods: 12 },
  { label: 'Yearly', value: 'yearly', periods: 1 },
]

const CURRENCIES = [
  { code: 'CAD', symbol: '$', flag: '🇨🇦', label: 'Canadian dollar' },
  { code: 'USD', symbol: '$', flag: '🇺🇸', label: 'US dollar' },
  { code: 'GBP', symbol: '£', flag: '🇬🇧', label: 'British pound' },
  { code: 'EUR', symbol: '€', flag: '🇪🇺', label: 'Euro' },
  { code: 'AUD', symbol: '$', flag: '🇦🇺', label: 'Australian dollar' },
]

const defaultForm = {
  starting: '25000',
  contribution: '250',
  frequency: 'biweekly',
  currentAge: '35',
  retireAge: '65',
  annualReturn: '7.0',
}

const storageKey = 'paydays1040_v1'
const historyKey = 'paydays1040_history_v1'
const privacyKey = 'paydays1040_privacy_v1'

function clampNumber(value, fallback = 0) {
  const parsed = Number(String(value).replace(/[^0-9.-]/g, ''))
  return Number.isFinite(parsed) ? parsed : fallback
}

function currencyForLocale() {
  const country = (navigator.language || 'en-CA').split('-')[1]
  if (country === 'US') return 'USD'
  if (country === 'GB') return 'GBP'
  if (['IE', 'FR', 'DE', 'ES', 'IT', 'NL', 'PT'].includes(country)) return 'EUR'
  if (country === 'AU') return 'AUD'
  return 'CAD'
}

function safeLoad(key, fallback) {
  try {
    const raw = localStorage.getItem(key)
    return raw ? JSON.parse(raw) : fallback
  } catch {
    return fallback
  }
}

function safeSave(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch {
    // ignore private-mode storage failures
  }
}

function formatMoney(value, currency) {
  const { code, symbol } = currency
  const absolute = Math.abs(value || 0)
  const rounded = absolute >= 1000000 ? 0 : 0
  return `${value < 0 ? '-' : ''}${symbol}${absolute.toLocaleString(undefined, {
    maximumFractionDigits: rounded,
    minimumFractionDigits: 0,
  })}`
}

function formatCompact(value, currency) {
  const { symbol } = currency
  const absolute = Math.abs(value || 0)
  if (absolute >= 1000000) return `${symbol}${(absolute / 1000000).toFixed(2)}M`
  if (absolute >= 1000) return `${symbol}${Math.round(absolute / 1000)}k`
  return `${symbol}${Math.round(absolute).toLocaleString()}`
}

function validate(form) {
  const starting = clampNumber(form.starting)
  const contribution = clampNumber(form.contribution)
  const currentAge = clampNumber(form.currentAge)
  const retireAge = clampNumber(form.retireAge)
  const annualReturn = clampNumber(form.annualReturn)
  const errors = {}
  if (starting < 0 || starting > MAX_STARTING_BALANCE) errors.starting = 'Starting investment must be between $0 and $25,000,000.'
  if (contribution < 0 || contribution > MAX_CONTRIBUTION) errors.contribution = 'Contribution must be between $0 and $1,000,000.'
  if (currentAge < AGE_MIN || currentAge > AGE_MAX) errors.currentAge = 'Age must be between 16 and 99.'
  if (retireAge < AGE_MIN || retireAge > AGE_MAX) errors.retireAge = 'Retiring age must be between 16 and 99.'
  if (retireAge < currentAge) errors.retireAge = 'Retiring age cannot be lower than your current age.'
  if (annualReturn < 0 || annualReturn > MAX_RETURN) errors.annualReturn = 'Expected return must be between 0% and 25%.'
  return errors
}

function calculate(form) {
  const starting = clampNumber(form.starting)
  const contribution = clampNumber(form.contribution)
  const currentAge = clampNumber(form.currentAge)
  const retireAge = clampNumber(form.retireAge)
  const annualReturn = clampNumber(form.annualReturn) / 100
  const frequency = FREQUENCIES.find((f) => f.value === form.frequency) || FREQUENCIES[2]
  const years = Math.max(0, retireAge - currentAge)
  const totalPeriods = Math.round(years * frequency.periods)
  const periodRate = frequency.periods ? Math.pow(1 + annualReturn, 1 / frequency.periods) - 1 : 0

  let balance = starting
  const points = []
  const sampleEvery = Math.max(1, Math.floor(totalPeriods / 48))
  for (let p = 0; p <= totalPeriods; p += 1) {
    const paidIn = starting + contribution * p
    const growth = Math.max(0, balance - paidIn)
    if (p === 0 || p % sampleEvery === 0 || p === totalPeriods) {
      points.push({ payday: p, age: currentAge + p / frequency.periods, balance, contributions: paidIn, growth })
    }
    if (p < totalPeriods) balance = balance * (1 + periodRate) + contribution
  }

  const futureContributions = contribution * totalPeriods
  const totalContributions = starting + futureContributions
  const investmentGrowth = Math.max(0, balance - totalContributions)
  return { starting, contribution, currentAge, retireAge, annualReturn, frequency, years, totalPeriods, balance, futureContributions, totalContributions, investmentGrowth, points }
}

function getPath(points, key, width, height, maxY) {
  if (!points.length || maxY <= 0) return ''
  return points.map((point, i) => {
    const x = points.length === 1 ? 0 : (i / (points.length - 1)) * width
    const y = height - (point[key] / maxY) * height
    return `${i === 0 ? 'M' : 'L'} ${x.toFixed(2)} ${y.toFixed(2)}`
  }).join(' ')
}

function getArea(path, width, height) {
  if (!path) return ''
  return `${path} L ${width} ${height} L 0 ${height} Z`
}

function Drawer({ title, open, onClose, children }) {
  return (
    <div className={`drawerLayer ${open ? 'show' : ''}`} aria-hidden={!open}>
      <button className="scrim" onClick={onClose} aria-label="Close panel" />
      <aside className="drawer" role="dialog" aria-modal="true" aria-label={title}>
        <div className="drawerHead">
          <h2>{title}</h2>
          <button className="ghostIcon" onClick={onClose}>×</button>
        </div>
        {children}
      </aside>
    </div>
  )
}

export default function App() {
  const [form, setForm] = useState(() => safeLoad(storageKey, defaultForm))
  const [currencyCode, setCurrencyCode] = useState(() => safeLoad('paydays1040_currency', currencyForLocale()))
  const [activeTab, setActiveTab] = useState('graph')
  const [periodView, setPeriodView] = useState('paydays')
  const [drawer, setDrawer] = useState(null)
  const [remember, setRemember] = useState(() => safeLoad(privacyKey, { remember: true }).remember)
  const [history, setHistory] = useState(() => safeLoad(historyKey, [
    { date: 'May 24, 2025', payday: 198, balance: 123456.78 },
    { date: 'May 10, 2025', payday: 196, balance: 120342.21 },
    { date: 'Apr 26, 2025', payday: 194, balance: 118220.11 },
    { date: 'Apr 12, 2025', payday: 192, balance: 115119.62 },
  ]))
  const [updateBalance, setUpdateBalance] = useState('123456.78')

  const errors = useMemo(() => validate(form), [form])
  const isValid = Object.keys(errors).length === 0
  const result = useMemo(() => calculate(form), [form])
  const currency = CURRENCIES.find((c) => c.code === currencyCode) || CURRENCIES[0]

  useEffect(() => {
    if (remember) safeSave(storageKey, form)
  }, [form, remember])
  useEffect(() => safeSave('paydays1040_currency', currencyCode), [currencyCode])
  useEffect(() => safeSave(privacyKey, { remember }), [remember])
  useEffect(() => { if (remember) safeSave(historyKey, history) }, [history, remember])

  const updateField = (field, value) => setForm((prev) => ({ ...prev, [field]: value }))
  const submit = (event) => {
    event?.preventDefault()
    if (!isValid) return
    setDrawer('breakdown')
  }
  const saveBalance = () => {
    const value = clampNumber(updateBalance)
    if (!value) return
    const today = new Date().toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })
    const payday = Math.max(0, Math.round(result.totalPeriods - result.totalPeriods * 0.78))
    const newItem = { date: today, payday, balance: value }
    setHistory((prev) => [newItem, ...prev].slice(0, 12))
    setDrawer('saved')
  }
  const clearData = () => {
    localStorage.removeItem(storageKey)
    localStorage.removeItem(historyKey)
    localStorage.removeItem(privacyKey)
    setForm(defaultForm)
    setHistory([])
    setRemember(false)
    setDrawer(null)
  }

  const maxY = Math.max(result.balance, result.totalContributions, result.investmentGrowth) * 1.12 || 1
  const svgW = 900
  const svgH = 360
  const balancePath = getPath(result.points, 'balance', svgW, svgH, maxY)
  const growthPath = getPath(result.points, 'growth', svgW, svgH, maxY)
  const contributionsPath = getPath(result.points, 'contributions', svgW, svgH, maxY)
  const finalPoint = result.points[result.points.length - 1] || { balance: 0, growth: 0, contributions: 0, payday: 0 }
  const yTicks = [maxY * .25, maxY * .5, maxY * .75, maxY]

  return (
    <div className="siteShell">
      <header className="topbar">
        <a className="logo" href="#top" aria-label="1040 Paydays home"><span>1040</span><small>PAYDAYS</small></a>
        <nav className="nav">
          <button className="active" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>Calculator</button>
          <button onClick={() => setDrawer('how')}>How it works</button>
          <button onClick={() => setActiveTab('compare')}>Compare</button>
          <button onClick={() => setDrawer('learn')}>Learn</button>
        </nav>
        <div className="topActions">
          <select aria-label="Currency" value={currencyCode} onChange={(e) => setCurrencyCode(e.target.value)}>
            {CURRENCIES.map((c) => <option key={c.code} value={c.code}>{c.flag} {c.symbol} {c.code}</option>)}
          </select>
          <button className="menuBtn" onClick={() => setDrawer('menu')}>☰</button>
        </div>
      </header>

      <main id="top" className="mainGrid">
        <section className="heroPanel">
          <span className="accentLine" />
          <h1>You only get about <strong>1,040</strong> paydays.</h1>
          <p className="heroSub">Make every one count.</p>
          <div className="heroBullets">
            <div><span>▣</span> One payday at a time.</div>
            <div><span>⌁</span> See the power of consistency.</div>
            <div><span>◎</span> Build the future you deserve.</div>
          </div>
          <div className="hourglassWatermark" aria-hidden="true">
            <div className="hgTop" /><div className="hgMid" /><div className="hgBottom" />
          </div>
        </section>

        <section className="contentGrid">
          <form className="card calculator" onSubmit={submit}>
            <div className="field"><label>Starting investment <i>ⓘ</i></label><input value={form.starting} onChange={(e) => updateField('starting', e.target.value)} inputMode="decimal" /><small>{errors.starting || 'Max $25,000,000'}</small></div>
            <div className="field"><label>I add every payday <i>ⓘ</i></label><input value={form.contribution} onChange={(e) => updateField('contribution', e.target.value)} inputMode="decimal" /><small>{errors.contribution || ' '}</small></div>
            <div className="field"><label>Pay frequency <i>ⓘ</i></label><select value={form.frequency} onChange={(e) => updateField('frequency', e.target.value)}>{FREQUENCIES.map((f) => <option key={f.value} value={f.value}>{f.label}</option>)}</select></div>
            <div className="field"><label>Current age <i>ⓘ</i></label><input value={form.currentAge} onChange={(e) => updateField('currentAge', e.target.value)} inputMode="numeric" /><small>{errors.currentAge || '16 – 99'}</small></div>
            <div className="field"><label>Expected annual return <i>ⓘ</i></label><input value={form.annualReturn} onChange={(e) => updateField('annualReturn', e.target.value)} inputMode="decimal" /><small>{errors.annualReturn || 'After fees & inflation'}</small></div>
            <div className="field"><label>Retiring at age <i>ⓘ</i></label><input value={form.retireAge} onChange={(e) => updateField('retireAge', e.target.value)} inputMode="numeric" /><small>{errors.retireAge || '16 – 99'}</small></div>
            <button className="advanced" type="button" onClick={() => setDrawer('advanced')}>▸ Advanced assumptions (optional)</button>
            <button className="primary calcBtn" disabled={!isValid}>▦ Calculate projection <span>→</span></button>
            <div className="privacyLine"><span>♙</span> No account needed · Saved on your device <button type="button" onClick={() => setDrawer('privacy')}>Privacy settings</button></div>
          </form>

          <section className="projectionCard">
            <div>
              <p>YOUR PAYDAY #1040</p>
              <h2>{formatMoney(result.balance, currency)}</h2>
              <strong>{result.totalPeriods.toLocaleString()} paydays to go</strong>
              <span>Until age {result.retireAge}</span>
              <button onClick={() => setDrawer('breakdown')}>View breakdown →</button>
            </div>
            <svg viewBox="0 0 420 220" preserveAspectRatio="none" aria-hidden="true">
              <defs><linearGradient id="heroFill" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stopColor="#2470ff" stopOpacity=".45"/><stop offset="1" stopColor="#2470ff" stopOpacity="0"/></linearGradient></defs>
              <path d={getArea(balancePath, svgW, svgH).replaceAll(String(svgW), '420').replaceAll(String(svgH), '220')} fill="url(#heroFill)" opacity=".32" />
              <path d={balancePath.replaceAll(String(svgW), '420').replaceAll(String(svgH), '220')} fill="none" stroke="#4f8bff" strokeWidth="5" strokeLinecap="round" />
              <circle cx="406" cy="24" r="8" fill="#0b1f3f" stroke="#fff" strokeWidth="4" />
            </svg>
          </section>

          <section className="metricStrip">
            <article><span>▱</span><b>{formatMoney(result.totalContributions, currency)}</b><strong>Total contributions</strong><small>Starting balance + future contributions</small></article>
            <article><span>↗</span><b>{formatMoney(result.investmentGrowth, currency)}</b><strong>Investment growth</strong><small>From compounding over {result.retireAge}</small></article>
            <article><span>◔</span><b>{result.totalPeriods.toLocaleString()}</b><strong>Paydays remaining</strong><small>Until age {result.retireAge}</small></article>
          </section>

          <section className="chartCard card">
            <div className="tabs"><button className={activeTab === 'graph' ? 'active' : ''} onClick={() => setActiveTab('graph')}>Graph</button><button className={activeTab === 'breakdown' ? 'active' : ''} onClick={() => setActiveTab('breakdown')}>Breakdown</button><button className={activeTab === 'compare' ? 'active' : ''} onClick={() => setActiveTab('compare')}>Compare</button><div className="period"><button className={periodView === 'paydays' ? 'active' : ''} onClick={() => setPeriodView('paydays')}>By Paydays</button><button className={periodView === 'years' ? 'active' : ''} onClick={() => setPeriodView('years')}>By Years</button></div></div>
            {activeTab === 'compare' ? (
              <div className="compareGrid">
                {[.05, Number(form.annualReturn) / 100, .09].map((rate, i) => {
                  const scenario = calculate({ ...form, annualReturn: String((rate * 100).toFixed(1)) })
                  return <article key={i}><span>{i === 0 ? 'Lower return' : i === 1 ? 'Current plan' : 'Higher return'}</span><b>{formatMoney(scenario.balance, currency)}</b><small>{scenario.totalPeriods.toLocaleString()} paydays</small></article>
                })}
              </div>
            ) : activeTab === 'breakdown' ? (
              <div className="breakdownInline"><h3>Projection breakdown</h3><p>Starting investment <b>{formatMoney(result.starting, currency)}</b></p><p>Future contributions <b>{formatMoney(result.futureContributions, currency)}</b></p><p>Investment growth <b>{formatMoney(result.investmentGrowth, currency)}</b></p><p className="total">Projected balance <b>{formatMoney(result.balance, currency)}</b></p></div>
            ) : (
              <>
                <div className="legend"><span className="l1">Balance</span><span className="l2">Growth</span><span className="l3">Contributions</span></div>
                <div className="chartWrap">
                  <svg viewBox={`0 0 ${svgW} ${svgH}`} preserveAspectRatio="none" role="img" aria-label="Projection chart">
                    <defs><linearGradient id="mainFill" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stopColor="#2f78ff" stopOpacity=".28"/><stop offset="1" stopColor="#2f78ff" stopOpacity="0"/></linearGradient></defs>
                    {yTicks.map((tick) => <line key={tick} x1="0" x2={svgW} y1={svgH - (tick / maxY) * svgH} y2={svgH - (tick / maxY) * svgH} className="gridLine" />)}
                    <path d={getArea(balancePath, svgW, svgH)} fill="url(#mainFill)" />
                    <path d={balancePath} className="balanceLine" />
                    <path d={growthPath} className="growthLine" />
                    <path d={contributionsPath} className="contribLine" />
                    <circle cx={svgW} cy={svgH - (finalPoint.balance / maxY) * svgH} r="7" className="endDot" />
                  </svg>
                  <div className="yLabels"><span>{formatCompact(maxY, currency)}</span><span>{formatCompact(maxY * .75, currency)}</span><span>{formatCompact(maxY * .5, currency)}</span><span>{formatCompact(maxY * .25, currency)}</span><span>{formatMoney(0, currency)}</span></div>
                  <div className="xLabels"><span>Now</span><span>{periodView === 'paydays' ? '#260' : '25%'}</span><span>{periodView === 'paydays' ? '#520' : '50%'}</span><span>{periodView === 'paydays' ? '#780' : '75%'}</span><span>#1040</span></div>
                  <div className="tooltip"><b>PAYDAY #{Math.min(1040, result.totalPeriods)}</b><p>Balance <strong>{formatMoney(finalPoint.balance, currency)}</strong></p><p>Growth <strong>{formatMoney(finalPoint.growth, currency)}</strong></p><p>Contributions <strong>{formatMoney(finalPoint.contributions, currency)}</strong></p></div>
                </div>
                <div className="chartNote">Values in today’s dollars · After fees & inflation</div>
              </>
            )}
          </section>

          <aside className="sideStack">
            <section className="card updateCard">
              <h3>Update today's balance</h3>
              <p>Enter your latest account balance to keep your projection accurate.</p>
              <div className="inlineInput"><input value={updateBalance} onChange={(e) => setUpdateBalance(e.target.value)} /><button onClick={saveBalance}>Update balance</button></div>
              <small>♙ Saved locally · Private to you</small>
            </section>
            <section className="card historyCard">
              <div className="sectionHead"><h3>Recent history</h3><button onClick={() => setDrawer('history')}>View all history →</button></div>
              <ol>{history.slice(0, 4).map((item, i) => <li key={`${item.date}-${i}`}><span>{item.date}</span><em>Payday #{item.payday}</em><b>{formatMoney(item.balance, currency)}</b></li>)}</ol>
            </section>
          </aside>
        </section>
      </main>

      <footer className="footer"><span>♢ Your data stays private. Always.</span><span>© 2025 1040 Paydays</span><button onClick={() => setDrawer('privacy')}>Privacy</button><button onClick={() => setDrawer('terms')}>Terms</button><button onClick={() => setDrawer('disclaimer')}>Disclaimer</button><button onClick={() => setDrawer('contact')}>Contact</button></footer>

      <Drawer title="Projection breakdown" open={drawer === 'breakdown'} onClose={() => setDrawer(null)}>
        <div className="drawerRows"><p><span>Starting investment</span><b>{formatMoney(result.starting, currency)}</b></p><p><span>Future contributions</span><b>{formatMoney(result.futureContributions, currency)}</b></p><p><span>Total contributions</span><b>{formatMoney(result.totalContributions, currency)}</b></p><p><span>Investment growth</span><b>{formatMoney(result.investmentGrowth, currency)}</b></p><p className="total"><span>Projected balance</span><b>{formatMoney(result.balance, currency)}</b></p></div>
        <div className="assumptionBox"><b>This projection assumes:</b><ul><li>{form.annualReturn}% average annual return after fees and inflation</li><li>{result.frequency.label} contributions of {formatMoney(result.contribution, currency)}</li><li>Retirement at age {result.retireAge}</li><li>All values in today's dollars</li></ul></div>
      </Drawer>
      <Drawer title="Privacy settings" open={drawer === 'privacy'} onClose={() => setDrawer(null)}>
        <label className="check"><input type="checkbox" checked={remember} onChange={(e) => setRemember(e.target.checked)} /> Remember my inputs and history on this device</label>
        <p>Your information stays in this browser. There is no account required.</p>
        <button className="danger" onClick={clearData}>Clear saved data</button>
      </Drawer>
      <Drawer title="History" open={drawer === 'history'} onClose={() => setDrawer(null)}>
        <div className="historyFull">{history.map((item, i) => <p key={i}><span>{item.date}</span><span>Payday #{item.payday}</span><b>{formatMoney(item.balance, currency)}</b></p>)}</div>
      </Drawer>
      <Drawer title="Saved" open={drawer === 'saved'} onClose={() => setDrawer(null)}><p>Another payday invested. Your progress was saved on this device.</p></Drawer>
      <Drawer title="How it works" open={drawer === 'how'} onClose={() => setDrawer(null)}><p>Enter what you already have, what you add each payday, and your timeline. 1040 Paydays estimates your future balance using compound growth.</p></Drawer>
      <Drawer title="Learn" open={drawer === 'learn'} onClose={() => setDrawer(null)}><p>Guides are coming soon: payday investing, TFSA/RRSP basics, and how small contributions compound over time.</p></Drawer>
      <Drawer title="Advanced assumptions" open={drawer === 'advanced'} onClose={() => setDrawer(null)}><p>Advanced assumptions are simplified in this version. The annual return field should be entered after expected fees and inflation.</p></Drawer>
      <Drawer title="Menu" open={drawer === 'menu'} onClose={() => setDrawer(null)}><button onClick={() => setDrawer('how')}>How it works</button><button onClick={() => setActiveTab('compare') || setDrawer(null)}>Compare</button><button onClick={() => setDrawer('learn')}>Learn</button><button onClick={() => setDrawer('privacy')}>Privacy</button></Drawer>
      <Drawer title="Terms" open={drawer === 'terms'} onClose={() => setDrawer(null)}><p>Terms page placeholder. This calculator provides estimates only.</p></Drawer>
      <Drawer title="Disclaimer" open={drawer === 'disclaimer'} onClose={() => setDrawer(null)}><p>Not financial advice. Results are estimates and not guaranteed.</p></Drawer>
      <Drawer title="Contact" open={drawer === 'contact'} onClose={() => setDrawer(null)}><p>Contact form coming soon.</p></Drawer>
    </div>
  )
}
