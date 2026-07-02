import { useMemo, useState } from 'react'
import './App.css'

const currencies = [
  { code: 'CAD', label: '🇨🇦 CAD $' },
  { code: 'USD', label: '🇺🇸 USD $' },
  { code: 'EUR', label: '🇪🇺 EUR €' },
  { code: 'GBP', label: '🇬🇧 GBP £' },
  { code: 'AUD', label: '🇦🇺 AUD $' },
  { code: 'BRL', label: '🇧🇷 BRL R$' },
  { code: 'INR', label: '🇮🇳 INR ₹' },
  { code: 'CNY', label: '🇨🇳 CNY ¥' },
  { code: 'JPY', label: '🇯🇵 JPY ¥' },
]

function money(value, currency = 'CAD') {
  return new Intl.NumberFormat('en-CA', {
    style: 'currency',
    currency,
    maximumFractionDigits: 0,
  }).format(value)
}

function project({ balance, contribution, age, retireAge, returnRate, frequency }) {
  const perYear = frequency === 'Weekly' ? 52 : frequency === 'Monthly' ? 12 : frequency === 'Yearly' ? 1 : 26
  const years = Math.max(retireAge - age, 1)
  const periods = Math.max(Math.round(years * perYear), 1)
  const periodRate = Math.pow(1 + returnRate / 100, 1 / perYear) - 1

  let total = Number(balance) || 0
  let invested = Number(balance) || 0
  const points = []

  for (let i = 0; i <= periods; i++) {
    if (i > 0) {
      total = total * (1 + periodRate) + Number(contribution || 0)
      invested += Number(contribution || 0)
    }

    const progress = i / periods
    if (i % Math.max(1, Math.floor(periods / 26)) === 0 || i === periods) {
      points.push({
        payday: i,
        age: age + years * progress,
        balance: total,
        invested,
        growth: Math.max(total - invested, 0),
      })
    }
  }

  const finalBalance = total
  return {
    periods,
    finalBalance,
    invested,
    growth: Math.max(finalBalance - invested, 0),
    monthlyIncome: finalBalance * 0.035 / 12,
    remaining: periods,
    points,
  }
}

function Hero({ remaining }) {
  return (
    <section className="heroCard">
      <div className="tinyLine" />
      <p className="kicker">Your financial life in paydays</p>

      <h1>
        You only get
        <br />
        about
        <span>1,040</span>
        paydays.
      </h1>

      <p className="heroLead">
        Every payday buys
        <br />
        a little more <em>freedom.</em>
      </p>

      <div className="insights">
        <Insight icon="●●" tone="blue" title="You’ve already experienced 0 paydays." text="Time invested wisely today creates tomorrow’s freedom." />
        <Insight icon="▣" tone="green" title={`You still have roughly ${remaining.toLocaleString()} opportunities to build your future.`} text="Make the most of them." />
        <Insight icon="↗" tone="gold" title="Starting five years earlier could nearly double your projected nest egg." text="Time is your greatest asset." />
        <Insight icon="◇" tone="purple" title="Small, consistent choices beat big, perfect ones." text="One payday at a time." />
      </div>

      <div className="paydayCallout">
        <div className="heart">♡</div>
        <div>
          <strong>Your future is decided <span>every payday.</span></strong>
          <small>Not someday.</small>
          <em>This payday.</em>
        </div>
      </div>
    </section>
  )
}

function Insight({ icon, tone, title, text }) {
  return (
    <div className="insight">
      <div className={`insightIcon ${tone}`}>{icon}</div>
      <div>
        <strong>{title}</strong>
        <small>{text}</small>
      </div>
    </div>
  )
}

function Calculator({ form, setForm, reveal }) {
  const update = (key, value) => setForm((old) => ({ ...old, [key]: value }))

  return (
    <section className="card calculatorCard">
      <div className="cardTop">
        <div className="spark">✧</div>
        <div>
          <h2>Let’s map your <span>1,040</span> paydays</h2>
        </div>
        <div className="toggleWrap">
          <span>Simple</span>
          <button className="toggle" aria-label="advanced toggle" />
          <span>Advanced</span>
        </div>
      </div>

      <div className="formGrid">
        <Field label="Starting balance" value={form.balance} onChange={(v) => update('balance', v)} prefix="$" />
        <Field label="Contribution each payday" value={form.contribution} onChange={(v) => update('contribution', v)} prefix="$" />
        <label className="field">
          <span>Pay frequency <i>ⓘ</i></span>
          <select value={form.frequency} onChange={(e) => update('frequency', e.target.value)}>
            <option>Biweekly</option>
            <option>Weekly</option>
            <option>Monthly</option>
            <option>Yearly</option>
          </select>
        </label>
        <Field label="Current age" value={form.age} onChange={(v) => update('age', v)} />
        <Field label="Retire at age" value={form.retireAge} onChange={(v) => update('retireAge', v)} />
        <Field label="Expected annual return" value={form.returnRate} onChange={(v) => update('returnRate', v)} suffix="%" />
      </div>

      <button className="advanced">Advanced assumptions (optional)⌄</button>
      <button className="reveal" onClick={reveal}>✧ Reveal my future</button>

      <div className="trustRow">
        <span>▣ No account needed</span>
        <span>•</span>
        <span>Saved on your device</span>
        <span>•</span>
        <span>Privacy settings</span>
      </div>
    </section>
  )
}

function Field({ label, value, onChange, prefix, suffix }) {
  return (
    <label className="field">
      <span>{label} <i>ⓘ</i></span>
      <div className="inputWrap">
        {prefix && <b>{prefix}</b>}
        <input value={value} onChange={(e) => onChange(e.target.value)} />
        {suffix && <b>{suffix}</b>}
      </div>
    </label>
  )
}

function ProjectionCard({ projection, currency, onOpen }) {
  return (
    <section className="projectionCard">
      <p className="goldKicker">Your future ✧</p>
      <h3>Built one payday at a time.</h3>
      <strong className="bigMoney">{money(projection.finalBalance, currency)}</strong>

      <div className="goldCurve" aria-hidden="true">
        <svg viewBox="0 0 360 160">
          <path d="M10 132 C70 126 100 104 145 98 C195 90 200 65 245 52 C285 40 318 28 350 12" />
          <circle cx="350" cy="12" r="8" />
        </svg>
      </div>

      <div className="metricLine">
        <div><span>You invested</span><strong>{money(projection.invested, currency)}</strong></div>
        <div><span>Growth</span><strong>{money(projection.growth, currency)}</strong></div>
        <div><span>Est. monthly income</span><strong>{money(projection.monthlyIncome, currency)} <small>/mo</small></strong></div>
      </div>

      <p className="remaining">{projection.remaining.toLocaleString()} paydays remaining</p>
      <small>Every payday changes this number.</small>
      <button className="outlineButton" onClick={onOpen}>View full breakdown →</button>
    </section>
  )
}

function GraphCard({ projection, currency }) {
  const max = Math.max(...projection.points.map((p) => p.balance), 1)
  const points = projection.points.map((p, i) => {
    const x = 40 + (i / (projection.points.length - 1)) * 860
    const y = 270 - (p.balance / max) * 230
    const cy = 270 - (p.invested / max) * 230
    return { ...p, x, y, cy }
  })

  const balancePath = points.map((p, i) => `${i ? 'L' : 'M'} ${p.x} ${p.y}`).join(' ')
  const contributionPath = points.map((p, i) => `${i ? 'L' : 'M'} ${p.x} ${p.cy}`).join(' ')
  const last = points[points.length - 1]
  const p25 = points[Math.floor(points.length * .22)]
  const p58 = points[Math.floor(points.length * .58)]
  const p82 = points[Math.floor(points.length * .82)]

  return (
    <section className="card graphCard">
      <div className="graphToolbar">
        <div>
          <button className="tab active">Graph</button>
          <button className="tab">Breakdown</button>
          <button className="tab">Compare</button>
          <button className="tab">Milestones</button>
        </div>
        <div>
          <button className="tab active">By Paydays</button>
          <button className="tab">By Years</button>
        </div>
      </div>

      <div className="legend"><span className="navyLine">Balance</span><span className="blueLine">Growth</span><span className="greenLine">Contributions</span></div>

      <svg className="chart" viewBox="0 0 940 330" role="img">
        {[0, .25, .5, .75, 1].map((t) => (
          <g key={t}>
            <line x1="40" x2="900" y1={270 - t * 230} y2={270 - t * 230} />
            <text x="0" y={275 - t * 230}>{t === 0 ? '$0' : money(max * t, currency).replace(/\.00|,000/g, 'k')}</text>
          </g>
        ))}
        <path className="area" d={`${balancePath} L ${last.x} 270 L 40 270 Z`} />
        <path className="contrib" d={contributionPath} />
        <path className="balance" d={balancePath} />
        <Callout point={p25} label="Consistency" text="Your contributions build the foundation." tone="blue" />
        <Callout point={p58} label="Compounding" text="Growth starts to accelerate." tone="gold" />
        <Callout point={p82} label="Freedom" text="Your future is within reach." tone="green" />
        <circle cx={last.x} cy={last.y} r="7" className="endDot" />
        <text x={last.x - 80} y={last.y - 18} className="finalValue">{money(last.balance, currency)}</text>
      </svg>

      <div className="timeline">
        <strong>Timeline:</strong>
        <span>Drag to see your progress</span>
        <b>Payday #347 · Age 48</b>
      </div>
      <div className="range"><span /></div>

      <div className="graphStats">
        <div><span>Total balance</span><strong>$182,645</strong></div>
        <div><span>You invested</span><strong>$86,750</strong></div>
        <div><span>Growth</span><strong>$95,895</strong></div>
        <div><span>Paydays completed</span><strong>347</strong></div>
        <div><span>Paydays remaining</span><strong>693</strong></div>
      </div>

      <p className="note">ⓘ Projections are estimates and not guarantees.</p>
    </section>
  )
}

function Callout({ point, label, text, tone }) {
  if (!point) return null
  return (
    <g>
      <line x1={point.x} x2={point.x} y1={point.y - 2} y2={point.y - 50} className={tone} />
      <circle cx={point.x} cy={point.y} r="6" className={tone} />
      <foreignObject x={point.x - 70} y={point.y - 110} width="150" height="70">
        <div className={`chartCallout ${tone}`}>
          <strong>{label}</strong>
          <small>{text}</small>
        </div>
      </foreignObject>
    </g>
  )
}

function Journal() {
  return (
    <section className="card journalCard">
      <div className="sideHeader"><h3>▣ Payday Journal</h3><a>View all</a></div>
      <div className="emptyState">
        <div className="emptyIcon">▤</div>
        <strong>No snapshots saved yet.</strong>
        <p>Saving snapshots lets you compare how your investments grow over time.</p>
        <button>▣ Save first snapshot</button>
      </div>
    </section>
  )
}

function Signup() {
  return (
    <section className="card signupCard">
      <h3>▱ Get your personal <span>1,040 Payday Plan</span></h3>
      <p>Join the mailing list for tips, tools, and early access.</p>
      <div className="signupForm"><input placeholder="Enter your email address" /><button>Join the list</button></div>
      <small>▣ No spam. Unsubscribe anytime.</small>
      <div className="paperPlane">⌁</div>
    </section>
  )
}

function Drawer({ open, onClose, projection, currency, form }) {
  if (!open) return null
  return (
    <div className="drawerOverlay" onClick={onClose}>
      <aside className="drawer" onClick={(e) => e.stopPropagation()}>
        <button className="close" onClick={onClose}>×</button>
        <p className="kicker">Full breakdown</p>
        <h2>Your 1,040 Payday Plan</h2>
        <div className="drawerHero">
          <span>Future value</span>
          <strong>{money(projection.finalBalance, currency)}</strong>
          <p>Built one payday at a time.</p>
        </div>
        <div className="drawerGrid">
          <div><span>Monthly income</span><strong>{money(projection.monthlyIncome, currency)}</strong></div>
          <div><span>Paydays remaining</span><strong>{projection.remaining.toLocaleString()}</strong></div>
          <div><span>You invested</span><strong>{money(projection.invested, currency)}</strong></div>
          <div><span>Growth</span><strong>{money(projection.growth, currency)}</strong></div>
        </div>
        <section><h3>Assumptions</h3><p>Age {form.age}, retire at {form.retireAge}, {form.frequency.toLowerCase()} contributions, {form.returnRate}% annual return.</p></section>
        <section className="insightBox"><h3>Today’s insight</h3><p>Every payday you invest gives compounding another chance to work.</p></section>
      </aside>
    </div>
  )
}

export default function App() {
  const [currency, setCurrency] = useState('CAD')
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [form, setForm] = useState({
    balance: '25000',
    contribution: '250',
    frequency: 'Biweekly',
    age: '35',
    retireAge: '65',
    returnRate: '7.0',
  })

  const projection = useMemo(() => project({
    balance: Number(form.balance),
    contribution: Number(form.contribution),
    age: Number(form.age),
    retireAge: Number(form.retireAge),
    returnRate: Number(form.returnRate),
    frequency: form.frequency,
  }), [form])

  return (
    <div className="app">
      <header className="nav">
        <div className="brand"><strong>1040</strong><span>PAYDAYS</span></div>
        <nav><a className="active">Calculator</a><a>How it works</a><a>Compare</a><a>Learn⌄</a></nav>
        <div className="navActions">
          <select value={currency} onChange={(e) => setCurrency(e.target.value)}>
            {currencies.map((c) => <option key={c.code} value={c.code}>{c.label}</option>)}
          </select>
          <button>☼</button>
          <button>☰</button>
        </div>
      </header>

      <main className="dashboard">
        <aside className="leftCol"><Hero remaining={projection.remaining} /></aside>
        <section className="centerCol"><Calculator form={form} setForm={setForm} reveal={() => {}} /><GraphCard projection={projection} currency={currency} /></section>
        <aside className="rightCol">
          <ProjectionCard projection={projection} currency={currency} onOpen={() => setDrawerOpen(true)} />
          <section className="disclaimer">ⓘ <strong>Projection only. Not financial advice.</strong><span>Actual returns, taxes, fees, and government benefits may vary.</span></section>
          <Journal />
          <Signup />
        </aside>
      </main>

      <footer className="footer">
        <div className="brand"><strong>1040</strong><span>PAYDAYS</span></div>
        <p>A simple way to see the power of consistency and build the future you deserve.</p>
        <div>▣ <span>One payday at a time.</span></div>
        <div>↗ <span>See the power of consistency.</span></div>
        <div>◎ <span>Build the future you deserve.</span></div>
        <small>© 2026 1040 Paydays. All rights reserved.</small>
      </footer>

      <Drawer open={drawerOpen} onClose={() => setDrawerOpen(false)} projection={projection} currency={currency} form={form} />
    </div>
  )
}
