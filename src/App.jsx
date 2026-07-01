import { useMemo, useState, useEffect } from 'react'
import './App.css'

const CURRENCIES = {
  CAD: { symbol: '$', flag: '🇨🇦', name: 'Canadian dollar' },
  USD: { symbol: '$', flag: '🇺🇸', name: 'US dollar' },
  GBP: { symbol: '£', flag: '🇬🇧', name: 'British pound' },
  EUR: { symbol: '€', flag: '🇪🇺', name: 'Euro' },
  AUD: { symbol: '$', flag: '🇦🇺', name: 'Australian dollar' },
}
const FREQUENCIES = { Daily:365, Weekly:52, Biweekly:26, 'Semi-monthly':24, Monthly:12, Yearly:1 }
const STORAGE_KEY = 'paydays_1040_user_history_v9'
const SETTINGS_KEY = 'paydays_1040_settings_v9'
const MAX_START = 25000000
const AGE_MIN = 16
const AGE_MAX = 99

function cleanNumber(value){
  if(value === '' || value == null) return 0
  const parsed = Number(String(value).replace(/[^0-9.-]/g,''))
  return Number.isFinite(parsed) ? parsed : 0
}
function clamp(n,min,max){ return Math.min(max, Math.max(min,n)) }
function fmt(amount, currency='CAD', decimals=0){
  const { symbol } = CURRENCIES[currency] || CURRENCIES.CAD
  const value = Number.isFinite(amount) ? amount : 0
  return `${symbol}${value.toLocaleString(undefined,{minimumFractionDigits:decimals,maximumFractionDigits:decimals})}`
}
function compact(amount, currency='CAD'){
  const { symbol } = CURRENCIES[currency] || CURRENCIES.CAD
  if(!Number.isFinite(amount)) return `${symbol}0`
  if(Math.abs(amount) >= 1000000) return `${symbol}${(amount/1000000).toFixed(amount>=10000000?0:2)}M`
  if(Math.abs(amount) >= 1000) return `${symbol}${Math.round(amount/1000)}k`
  return fmt(amount,currency)
}
function buildProjection({start, contribution, frequency, age, retirementAge, returnRate}){
  const periodsPerYear = FREQUENCIES[frequency] || 26
  const years = Math.max(0, retirementAge - age)
  const periods = Math.round(years * periodsPerYear)
  const ratePerPeriod = Math.pow(1 + returnRate/100, 1/periodsPerYear) - 1
  let balance = start
  const points = [{ period:0, balance:start, contributions:start, growth:0 }]
  const steps = Math.min(1040, Math.max(periods, 1))
  const stride = Math.max(1, Math.floor(periods / 104))
  for(let p=1;p<=periods;p++){
    balance = balance * (1 + ratePerPeriod) + contribution
    if(p % stride === 0 || p === periods){
      const contributions = start + contribution*p
      points.push({ period:p, balance, contributions, growth:Math.max(0,balance-contributions) })
    }
  }
  const contributions = start + contribution * periods
  const growth = Math.max(0, balance - contributions)
  return { periods, years, balance, contributions, growth, points, periodsPerYear }
}
function useLocalStorageHistory(){
  const [history, setHistory] = useState([])
  const [remember, setRemember] = useState(true)
  useEffect(()=>{
    try{
      const settings = JSON.parse(localStorage.getItem(SETTINGS_KEY) || '{}')
      if(typeof settings.remember === 'boolean') setRemember(settings.remember)
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
      if(Array.isArray(saved)) setHistory(saved)
    }catch{ /* ignore */ }
  },[])
  useEffect(()=>{
    try{ localStorage.setItem(SETTINGS_KEY, JSON.stringify({ remember })) }catch{}
  },[remember])
  const add = (entry)=>{
    if(!remember) return
    const next = [{ id:crypto?.randomUUID?.() || String(Date.now()), ...entry }, ...history].slice(0,25)
    setHistory(next)
    try{ localStorage.setItem(STORAGE_KEY, JSON.stringify(next)) }catch{}
  }
  const clear = ()=>{
    setHistory([])
    try{ localStorage.removeItem(STORAGE_KEY) }catch{}
  }
  return { history, add, clear, remember, setRemember }
}
function Icon({type}){
  const map = { calendar:'▣', chart:'↗', target:'◎', wallet:'▰', growth:'▥', clock:'◷', lock:'♙', calc:'▦', check:'✓', trash:'⌫', info:'ⓘ' }
  return <span className="icon" aria-hidden="true">{map[type] || '•'}</span>
}

export default function App(){
  const [currency,setCurrency] = useState('CAD')
  const [form,setForm] = useState({ start:'25000', contribution:'250', frequency:'Biweekly', age:'35', retirementAge:'65', returnRate:'7.0' })
  const [applied,setApplied] = useState(form)
  const [tab,setTab] = useState('Graph')
  const [basis,setBasis] = useState('By Paydays')
  const [drawer,setDrawer] = useState(null)
  const [updateBalance,setUpdateBalance] = useState('')
  const { history, add, clear, remember, setRemember } = useLocalStorageHistory()

  const parsed = useMemo(()=>({
    start: clamp(cleanNumber(applied.start),0,MAX_START),
    contribution: Math.max(0,cleanNumber(applied.contribution)),
    frequency: applied.frequency,
    age: clamp(cleanNumber(applied.age),AGE_MIN,AGE_MAX),
    retirementAge: clamp(cleanNumber(applied.retirementAge),AGE_MIN,AGE_MAX),
    returnRate: clamp(cleanNumber(applied.returnRate),0,20),
  }),[applied])
  if(parsed.retirementAge < parsed.age) parsed.retirementAge = parsed.age
  const projection = useMemo(()=>buildProjection(parsed),[parsed])
  const validity = validate(form)
  const lower = buildProjection({...parsed, returnRate:Math.max(0, parsed.returnRate-2)})
  const higher = buildProjection({...parsed, returnRate:parsed.returnRate+2})

  function validate(values){
    const errors = []
    const start = cleanNumber(values.start), age = cleanNumber(values.age), retire = cleanNumber(values.retirementAge), rate=cleanNumber(values.returnRate), cont=cleanNumber(values.contribution)
    if(start > MAX_START) errors.push('Starting investment must be below $25,000,000.')
    if(start < 0 || cont < 0) errors.push('Amounts cannot be negative.')
    if(age && (age < AGE_MIN || age > AGE_MAX)) errors.push('Current age must be between 16 and 99.')
    if(retire && (retire < AGE_MIN || retire > AGE_MAX)) errors.push('Retiring age must be between 16 and 99.')
    if(age && retire && retire < age) errors.push('Retiring age must be your current age or later.')
    if(rate < 0 || rate > 20) errors.push('Expected return must be between 0% and 20%.')
    return errors
  }
  function field(name,value){ setForm(prev=>({...prev,[name]:value})) }
  function calculate(){ if(!validity.length) setApplied(form) }
  function saveBalance(){
    const amount = cleanNumber(updateBalance)
    if(amount <= 0) return
    add({ date:new Date().toLocaleDateString(undefined,{month:'short',day:'numeric',year:'numeric'}), payday:projection.periods, age:parsed.age, balance:amount })
    setUpdateBalance(fmt(amount,currency,2))
  }
  function clearData(){ if(confirm('Clear saved history and settings from this device?')) { clear(); setUpdateBalance('') } }

  return <div className="app-shell">
    <Header currency={currency} setCurrency={setCurrency} open={setDrawer}/>
    <main className="layout">
      <section className="brand-rail">
        <div className="rail-mark"></div>
        <h1>You only get about <strong>1,040</strong> paydays.</h1>
        <p className="tag">Make every one count.</p>
        <div className="rail-list">
          <Callout icon="calendar" title="One payday" text="at a time." />
          <Callout icon="chart" title="See the power" text="of consistency." />
          <Callout icon="target" title="Build the future" text="you deserve." />
        </div>
        <div className="hourglass" aria-hidden="true"><div></div><span></span><div></div></div>
      </section>

      <section className="workspace">
        <div className="top-grid">
          <Calculator form={form} field={field} calculate={calculate} validity={validity} open={setDrawer}/>
          <ProjectionCard projection={projection} currency={currency} parsed={parsed} open={setDrawer}/>
        </div>
        <Metrics projection={projection} currency={currency} parsed={parsed}/>
        <div className="content-grid">
          <section className="chart-card card">
            <div className="tabs">
              {['Graph','Breakdown','Compare'].map(x=><button key={x} className={tab===x?'active':''} onClick={()=>setTab(x)}>{x}</button>)}
              <div className="basis">
                {['By Paydays','By Years'].map(x=><button key={x} className={basis===x?'active':''} onClick={()=>setBasis(x)}>{x}</button>)}
              </div>
            </div>
            {tab==='Graph' && <Chart projection={projection} currency={currency} basis={basis}/>} 
            {tab==='Breakdown' && <Breakdown projection={projection} parsed={parsed} currency={currency}/>} 
            {tab==='Compare' && <Compare lower={lower} current={projection} higher={higher} rate={parsed.returnRate} currency={currency}/>} 
          </section>
          <aside className="side-stack">
            <UpdateCard currency={currency} value={updateBalance} setValue={setUpdateBalance} save={saveBalance}/>
            <History history={history} currency={currency} open={setDrawer}/>
          </aside>
        </div>
      </section>
    </main>
    <Footer open={setDrawer}/>
    <Drawer name={drawer} close={()=>setDrawer(null)} projection={projection} parsed={parsed} currency={currency} history={history} clearData={clearData} remember={remember} setRemember={setRemember}/>
  </div>
}
function Header({currency,setCurrency,open}){ return <header className="site-header"><div className="logo">1040<span>PAYDAYS</span></div><nav><a href="#calculator">Calculator</a><button onClick={()=>open('how')}>How it works</button><button onClick={()=>open('compare')}>Compare</button><button onClick={()=>open('learn')}>Learn⌄</button></nav><div className="header-actions"><select value={currency} onChange={e=>setCurrency(e.target.value)}>{Object.entries(CURRENCIES).map(([code,c])=><option key={code} value={code}>{c.flag} {c.symbol} {code}</option>)}</select><button onClick={()=>open('menu')} className="menu">☰</button></div></header> }
function Callout({icon,title,text}){ return <div className="callout"><Icon type={icon}/><p><strong>{title}</strong><br/>{text}</p></div> }
function Calculator({form,field,calculate,validity,open}){ return <section id="calculator" className="calculator card"><div className="form-grid"><Label title="Starting investment"><MoneyInput value={form.start} onChange={v=>field('start',v)}/></Label><Label title="I add every payday"><MoneyInput value={form.contribution} onChange={v=>field('contribution',v)}/></Label><Label title="Pay frequency"><select value={form.frequency} onChange={e=>field('frequency',e.target.value)}>{Object.keys(FREQUENCIES).map(f=><option key={f}>{f}</option>)}</select></Label><Label title="Current age"><input inputMode="numeric" value={form.age} onChange={e=>field('age',e.target.value)}/></Label><Label title="Expected annual return"><PercentInput value={form.returnRate} onChange={v=>field('returnRate',v)}/><small>After fees & inflation</small></Label><Label title="Retiring at age"><input inputMode="numeric" value={form.retirementAge} onChange={e=>field('retirementAge',e.target.value)}/></Label></div><details><summary>Advanced assumptions (optional)</summary><p>Future versions can include inflation, fees, contribution increases, and employer match.</p></details>{validity.length>0 && <div className="errors">{validity.map(e=><p key={e}>{e}</p>)}</div>}<button disabled={!!validity.length} className="primary" onClick={calculate}><Icon type="calc"/> Calculate projection <span>→</span></button><div className="privacy-line"><Icon type="lock"/> No account needed · Saved on your device <button onClick={()=>open('privacy')}>Privacy settings</button></div></section> }
function Label({title,children}){ return <label><span>{title} <small className="tiny">ⓘ</small></span>{children}</label> }
function MoneyInput({value,onChange}){ return <div className="input-prefix"><span>$</span><input inputMode="decimal" value={value} onChange={e=>onChange(e.target.value.replace(/[$,]/g,''))}/></div> }
function PercentInput({value,onChange}){ return <div className="input-prefix percent"><input inputMode="decimal" value={value} onChange={e=>onChange(e.target.value.replace('%',''))}/><span>%</span></div> }
function ProjectionCard({projection,currency,parsed,open}){ return <section className="projection"><div><p className="eyebrow">Your Payday #{projection.periods || 1040}</p><h2>{fmt(projection.balance,currency)}</h2><h3>{projection.periods ? `${projection.periods.toLocaleString()} paydays to go` : '-- paydays to go'}</h3><p>Until age {parsed.retirementAge || '--'}</p><button onClick={()=>open('breakdown')}>View breakdown <span>→</span></button></div><MiniLine/></section> }
function MiniLine(){ return <svg className="mini-line" viewBox="0 0 360 190" preserveAspectRatio="none"><defs><linearGradient id="miniFill" x1="0" y1="0" x2="0" y2="1"><stop stopColor="#1262ff" stopOpacity=".45"/><stop offset="1" stopColor="#1262ff" stopOpacity="0"/></linearGradient></defs><path d="M15 160 C55 158 64 150 92 148 C120 144 128 130 155 124 C185 116 190 92 222 86 C250 82 260 58 290 44 C318 30 325 12 350 14 L350 190 L15 190 Z" fill="url(#miniFill)"/><path d="M15 160 C55 158 64 150 92 148 C120 144 128 130 155 124 C185 116 190 92 222 86 C250 82 260 58 290 44 C318 30 325 12 350 14" fill="none" stroke="#2c7cff" strokeWidth="6" strokeLinecap="round"/><circle cx="350" cy="14" r="9" fill="#0e62ff" stroke="#fff" strokeWidth="4"/></svg> }
function Metrics({projection,currency,parsed}){ const items=[['wallet','Total contributions',projection.contributions,'Starting balance + future contributions'],['growth','Investment growth',projection.growth,`From compounding over ${parsed.retirementAge||'--'}`],['clock','Projected balance',projection.balance,`At payday #${projection.periods||1040}`],['calendar','Paydays remaining',projection.periods,`Until age ${parsed.retirementAge||'--'}`]]; return <section className="metrics card">{items.map(([icon,title,value,sub],i)=><div key={title}><Icon type={icon}/><p className="metric-value">{title==='Paydays remaining' ? (value||'--').toLocaleString?.() || value : compact(value,currency)}</p><strong>{title}</strong><span>{sub}</span></div>)}</section> }
function Chart({projection,currency}){ const max = Math.max(1, projection.balance); const pts = projection.points.length>1 ? projection.points : buildProjection({start:25000, contribution:250, frequency:'Biweekly', age:35, retirementAge:65, returnRate:7}).points; const path = (key)=> pts.map((p,i)=>`${i?'L':'M'} ${20 + (i/(pts.length-1))*660} ${310 - (p[key]/max)*285}`).join(' '); return <div className="chart-wrap"><div className="legend"><span><i className="navy-line"></i>Balance</span><span><i className="blue-line"></i>Growth</span><span><i className="teal-line"></i>Contributions</span></div><svg viewBox="0 0 720 340" preserveAspectRatio="none"><g className="grid">{[0,1,2,3].map(i=><line key={i} x1="20" x2="700" y1={310-i*90} y2={310-i*90}/>)}</g><path d={`${path('balance')} L700 310 L20 310Z`} fill="rgba(14,98,255,.14)"/><path d={path('balance')} className="series balance"/><path d={path('growth')} className="series growth"/><path d={path('contributions')} className="series contrib"/><circle cx="700" cy={310 - ((pts.at(-1)?.balance||0)/max)*285} r="6" className="end-dot"/></svg><div className="axis"><span>Now</span><span>#260</span><span>#520</span><span>#780</span><span>#{projection.periods || 1040}</span></div><p className="chart-note">Values in today's dollars · After fees & inflation</p></div> }
function Breakdown({projection,parsed,currency}){ return <div className="panel-view"><h3>Projection breakdown</h3><Row k="Starting investment" v={fmt(parsed.start,currency)}/><Row k="Total contributions" v={fmt(projection.contributions,currency)}/><Row k="Investment growth" v={fmt(projection.growth,currency)}/><Row k="Projected balance" v={fmt(projection.balance,currency)}/></div> }
function Compare({lower,current,higher,rate,currency}){ return <div className="compare-grid">{[[`Lower return · ${Math.max(0,rate-2).toFixed(1)}%`,lower],[`Current plan · ${rate.toFixed(1)}%`,current],[`Higher return · ${(rate+2).toFixed(1)}%`,higher]].map(([title,p])=><div key={title}><span>{title}</span><strong>{fmt(p.balance,currency)}</strong><p>{p.periods.toLocaleString()} paydays</p></div>)}</div> }
function UpdateCard({currency,value,setValue,save}){ return <section className="update card"><div><h3>It's payday. Make it count.</h3><p>Enter your latest account balance to keep your projection accurate.</p><div className="update-row"><div className="input-prefix"><span>{CURRENCIES[currency].symbol}</span><input inputMode="decimal" value={value} placeholder="123,456.78" onChange={e=>setValue(e.target.value.replace(/[^
0-9.,]/g,''))} onBlur={()=>{const n=cleanNumber(value); if(n) setValue(n.toLocaleString(undefined,{minimumFractionDigits:2,maximumFractionDigits:2}))}}/></div><button onClick={save}>Update balance</button></div><small><Icon type="lock"/> Stored locally · Private to you</small></div><div className="phone-art"><span>✓</span></div></section> }
function History({history,currency,open}){ return <section className="history card"><header><h3>Recent history</h3><button onClick={()=>open('history')}>View all history →</button></header>{history.length===0?<div className="empty"><div>▱</div><strong>No history yet</strong><p>Your balance updates will appear here.</p></div>:<div className="timeline">{history.slice(0,4).map(h=><div className="history-row" key={h.id}><span className="dot"></span><span>{h.date}</span><span>Payday #{h.payday}</span><strong>{fmt(h.balance,currency)}</strong></div>)}</div>}</section> }
function Footer({open}){ return <footer><p><Icon type="lock"/> Your data stays private. Always.</p><nav><span>© 2025 1040 Paydays</span><button onClick={()=>open('privacy')}>Privacy</button><button onClick={()=>open('terms')}>Terms</button><button onClick={()=>open('disclaimer')}>Disclaimer</button><button onClick={()=>open('contact')}>Contact</button></nav><div><button>✉</button><button>𝕏</button></div></footer> }
function Drawer({name,close,projection,parsed,currency,history,clearData,remember,setRemember}){ if(!name) return null; const titles={breakdown:'Projection breakdown',privacy:'Privacy settings',history:'Payday history',how:'How it works',compare:'Compare plans',learn:'Learn',terms:'Terms',disclaimer:'Disclaimer',contact:'Contact',menu:'Menu'}; return <div className="drawer-backdrop" onClick={close}><aside className="drawer" onClick={e=>e.stopPropagation()}><button className="close" onClick={close}>×</button><h2>{titles[name] || '1040 Paydays'}</h2>{name==='breakdown' && <Breakdown projection={projection} parsed={parsed} currency={currency}/>} {name==='privacy' && <div><p>Your saved balances stay in this browser on this device. Nothing is uploaded by this calculator.</p><label className="switch"><input type="checkbox" checked={remember} onChange={e=>setRemember(e.target.checked)}/> Remember my progress on this device</label><button className="danger" onClick={clearData}>Clear saved data</button></div>} {name==='history' && <div>{history.length===0?<p>No saved paydays yet.</p>:history.map(h=><Row key={h.id} k={`${h.date} · Payday #${h.payday}`} v={fmt(h.balance,currency)}/>)}</div>} {!['breakdown','privacy','history'].includes(name) && <p>1040 Paydays helps you see how consistent saving can grow over your working life, one payday at a time.</p>}</aside></div> }
function Row({k,v}){ return <div className="row"><span>{k}</span><strong>{v}</strong></div> }
