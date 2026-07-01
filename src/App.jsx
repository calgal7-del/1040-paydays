import { useMemo, useState } from 'react'
import './App.css'

const AGE_MIN = 16
const AGE_MAX = 99
const MAX_START = 25000000
const FREQ = { Daily:365, Weekly:52, Biweekly:26, 'Semi-monthly':24, Monthly:12, Yearly:1 }
const CURRENCIES = {
  CAD:{symbol:'$', label:'CAD', flag:'🇨🇦'}, USD:{symbol:'$', label:'USD', flag:'🇺🇸'}, GBP:{symbol:'£', label:'GBP', flag:'🇬🇧'}, EUR:{symbol:'€', label:'EUR', flag:'🇪🇺'}, AUD:{symbol:'$', label:'AUD', flag:'🇦🇺'}
}
const STORAGE_KEY = 'paydays-history-v1'

function clamp(n,min,max){ return Math.min(max, Math.max(min, Number.isFinite(n)?n:min)) }
function money(n, currency='CAD', compact=false){
  const c=CURRENCIES[currency] || CURRENCIES.CAD
  if(compact && Math.abs(n)>=1000000) return c.symbol+(n/1000000).toFixed(n>=10000000?0:2).replace(/\.00$/,'')+'M'
  if(compact && Math.abs(n)>=1000) return c.symbol+Math.round(n/1000)+'k'
  return c.symbol + Math.round(n).toLocaleString()
}
function parseMoney(value){ return Number(String(value).replace(/[^0-9.]/g,'')) || 0 }
function yearsToPaydays(age, retire, frequency){ return Math.max(0, Math.round((retire-age) * FREQ[frequency])) }
function calcProjection(form){
  const starting = clamp(parseMoney(form.starting),0,MAX_START)
  const contribution = Math.max(0, parseMoney(form.contribution))
  const age = clamp(Number(form.age),AGE_MIN,AGE_MAX)
  const retire = clamp(Number(form.retire),age,AGE_MAX)
  const periods = yearsToPaydays(age, retire, form.frequency)
  const annual = clamp(Number(form.returnRate),0,20) / 100
  const rate = Math.pow(1+annual,1/FREQ[form.frequency])-1
  let balance = starting, futureContrib = 0
  const points=[]
  const step = Math.max(1, Math.round(periods/80))
  for(let i=0;i<=periods;i++){
    if(i>0){ balance = balance*(1+rate) + contribution; futureContrib += contribution }
    if(i%step===0 || i===periods) points.push({payday:i,balance,growth:Math.max(0,balance-starting-futureContrib),contributions:starting+futureContrib})
  }
  const totalContrib = starting + futureContrib
  return {starting, contribution, age, retire, periods, annual, balance, futureContrib, totalContrib, growth:Math.max(0,balance-totalContrib), points}
}
function Icon({type}){
  const common={width:22,height:22,viewBox:'0 0 24 24',fill:'none',stroke:'currentColor',strokeWidth:2,strokeLinecap:'round',strokeLinejoin:'round'}
  const paths={
    calendar:<><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></>,
    chart:<><path d="M3 17l6-6 4 4 8-10"/><path d="M14 5h7v7"/></>,
    target:<><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1"/></>,
    wallet:<><path d="M20 7H5a2 2 0 0 0 0 4h15v8H5a3 3 0 0 1-3-3V6a3 3 0 0 1 3-3h13v4"/><path d="M16 14h.01"/></>,
    pie:<><path d="M12 2v10h10"/><path d="M20.49 15A9 9 0 1 1 9 3.51"/></>,
    lock:<><rect x="4" y="11" width="16" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/></>,
    shield:<><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/></>,
    mail:<><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/></>,
    menu:<><path d="M4 6h16M4 12h16M4 18h16"/></>,
    info:<><circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/></>,
    close:<><path d="M18 6L6 18M6 6l12 12"/></>,
    check:<><path d="M20 6L9 17l-5-5"/></>,
    trash:<><path d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6"/></>,
    download:<><path d="M12 3v12"/><path d="M7 10l5 5 5-5"/><path d="M5 21h14"/></>,
    zoom:<><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3M11 8v6M8 11h6"/></>
  }
  return <svg {...common}>{paths[type]}</svg>
}

export default function App(){
  const [currency,setCurrency] = useState(()=>localStorage.getItem('paydays-currency') || 'CAD')
  const [form,setForm] = useState({starting:'25000', contribution:'250', frequency:'Biweekly', age:'35', retire:'65', returnRate:'7.0'})
  const [applied,setApplied] = useState(form)
  const [tab,setTab] = useState('graph')
  const [view,setView] = useState('paydays')
  const [drawer,setDrawer] = useState(null)
  const [privacyOpen,setPrivacyOpen] = useState(false)
  const [mobileCalcOpen,setMobileCalcOpen] = useState(false)
  const [history,setHistory] = useState(()=>{ try{return JSON.parse(localStorage.getItem(STORAGE_KEY)) || []}catch{return []} })
  const [remember,setRemember] = useState(()=>localStorage.getItem('paydays-remember') !== 'false')
  const result = useMemo(()=>calcProjection(applied),[applied])
  const draft = useMemo(()=>calcProjection(form),[form])
  const maxY = Math.max(...result.points.map(p=>p.balance))*1.08 || 1
  const invalid = validate(form)
  const c = CURRENCIES[currency]
  const progress = Math.round(((1040-result.periods)/1040)*100)
  const currentPayday = Math.max(0,1040-result.periods)
  function setField(k,v){ setForm(f=>({...f,[k]:v})) }
  function calculate(){ if(!validate(form)){ setApplied({...form, starting:String(draft.starting), age:String(draft.age), retire:String(draft.retire)}) } }
  function saveBalance(){
    const balance=parseMoney(document.getElementById('balance-update')?.value || '0')
    const entry={id:Date.now(), date:new Date().toLocaleDateString(undefined,{month:'short',day:'numeric',year:'numeric'}), payday:currentPayday, age:result.age, balance}
    const next=[entry,...history].slice(0,12)
    setHistory(next); if(remember)localStorage.setItem(STORAGE_KEY,JSON.stringify(next)); setDrawer('history')
  }
  function clearData(){ localStorage.removeItem(STORAGE_KEY); localStorage.removeItem('paydays-currency'); localStorage.removeItem('paydays-remember'); setHistory([]); setRemember(false); setPrivacyOpen(false) }
  function changeCurrency(v){ setCurrency(v); localStorage.setItem('paydays-currency',v) }

  return <div className="app-shell">
    <header className="topbar">
      <div className="brand"><strong>1040</strong><span>PAYDAYS</span></div>
      <nav className="nav"><button className="active" onClick={()=>scrollToId('calculator')}>Calculator</button><button onClick={()=>setDrawer('how')}>How it works</button><button onClick={()=>setTab('compare')}>Compare</button><button onClick={()=>setDrawer('learn')}>Learn</button></nav>
      <div className="header-actions"><select aria-label="Currency" value={currency} onChange={e=>changeCurrency(e.target.value)}>{Object.entries(CURRENCIES).map(([k,v])=><option key={k} value={k}>{v.flag} {v.symbol} {v.label}</option>)}</select><button className="icon-button" onClick={()=>setDrawer('menu')}><Icon type="menu"/></button></div>
    </header>

    <main className="layout">
      <aside className="hero-copy">
        <div className="accent-line" />
        <h1>You only get about <span>1,040</span> paydays.</h1>
        <p className="hero-sub">Make every one count.</p>
        <ul className="promise-list">
          <li><span><Icon type="calendar"/></span>One payday<br/>at a time.</li>
          <li><span><Icon type="chart"/></span>See the power of<br/>consistency.</li>
          <li><span><Icon type="target"/></span>Build the future<br/>you deserve.</li>
        </ul>
        <div className="hourglass" aria-hidden="true"><div className="glass top"></div><div className="sand"></div><div className="glass bottom"></div></div>
      </aside>

      <section className="content-grid">
        <section className="calculator card" id="calculator">
          <Field label="Starting investment" help="Max $25,000,000"><MoneyInput value={form.starting} onChange={v=>setField('starting',v)} currency={c.symbol}/></Field>
          <Field label="I add every payday"><MoneyInput value={form.contribution} onChange={v=>setField('contribution',v)} currency={c.symbol}/></Field>
          <Field label="Pay frequency"><select value={form.frequency} onChange={e=>setField('frequency',e.target.value)}>{Object.keys(FREQ).map(x=><option key={x}>{x}</option>)}</select></Field>
          <Field label="Current age" help="16 – 99"><input type="number" min={AGE_MIN} max={AGE_MAX} value={form.age} onChange={e=>setField('age',e.target.value)}/></Field>
          <Field label="Expected annual return" help="After fees & inflation"><input value={form.returnRate} onChange={e=>setField('returnRate',e.target.value.replace('%',''))}/></Field>
          <Field label="Retiring at age" help="16 – 99"><input type="number" min={AGE_MIN} max={AGE_MAX} value={form.retire} onChange={e=>setField('retire',e.target.value)}/></Field>
          <button className="advanced" onClick={()=>setDrawer('advanced')}>▸ Advanced assumptions (optional)</button>
          {invalid && <div className="validation">{invalid}</div>}
          <button className="primary" disabled={!!invalid} onClick={calculate}><Icon type="calendar"/>Calculate projection <span>→</span></button>
          <footer><Icon type="lock"/> No account needed · Saved on your device <button onClick={()=>setPrivacyOpen(true)}>Privacy settings</button></footer>
        </section>

        <section className="projection-card">
          <div><p>Your Payday #1040</p><h2>{money(result.balance,currency)}</h2><strong>{result.periods.toLocaleString()} paydays to go</strong><span>Until age {result.retire}</span><button onClick={()=>setDrawer('breakdown')}>View breakdown →</button></div>
          <MiniLine points={result.points} maxY={maxY}/>
        </section>

        <section className="metrics card-row">
          <Metric icon="wallet" value={money(result.totalContrib,currency)} title="Total contributions" text="Starting balance + future contributions" />
          <Metric icon="chart" value={money(result.growth,currency)} title="Investment growth" text={`From compounding over ${result.retire}`} />
          <Metric icon="pie" value={result.periods.toLocaleString()} title="Paydays remaining" text={`Until age ${result.retire}`} />
        </section>

        <section className="graph-card card">
          <div className="tabs"><button className={tab==='graph'?'active':''} onClick={()=>setTab('graph')}>Graph</button><button className={tab==='breakdown'?'active':''} onClick={()=>setTab('breakdown')}>Breakdown</button><button className={tab==='compare'?'active':''} onClick={()=>setTab('compare')}>Compare</button><span></span><button className={view==='paydays'?'active pill':''} onClick={()=>setView('paydays')}>By Paydays</button><button className={view==='years'?'pill active':''} onClick={()=>setView('years')}>By Years</button></div>
          <div className="legend"><span className="balance">Balance</span><span className="growth">Growth</span><span className="contrib">Contributions</span></div>
          {tab==='graph' && <Chart points={result.points} maxY={maxY} currency={currency} view={view}/>} 
          {tab==='breakdown' && <Breakdown result={result} currency={currency}/>} 
          {tab==='compare' && <Compare base={form} currency={currency}/>} 
          <p className="graph-note">Values in today’s dollars · After fees & inflation</p>
        </section>

        <section className="update card">
          <div><h3>Update today's balance</h3><p>Enter your latest account balance to keep your projection accurate.</p></div>
          <div className="update-row"><MoneyInput id="balance-update" value="123456.78" currency={c.symbol}/><button onClick={saveBalance}>Update balance</button></div>
          <small><Icon type="lock"/> Saved locally · Private to you</small>
        </section>

        <section className="history card">
          <header><h3>Recent history</h3><button onClick={()=>setDrawer('history')}>View all history →</button></header>
          <div className="timeline">{(history.length?history:sampleHistory()).slice(0,4).map((h,i)=><div className="history-row" key={h.id||i}><span></span><p>{h.date}</p><p>Payday #{h.payday}</p><strong>{money(h.balance,currency)}</strong></div>)}</div>
        </section>
      </section>
    </main>

    <footer className="site-footer"><span><Icon type="shield"/> Your data stays private. Always.</span><span>© 2025 1040 Paydays</span><button onClick={()=>setPrivacyOpen(true)}>Privacy</button><button onClick={()=>setDrawer('terms')}>Terms</button><button onClick={()=>setDrawer('disclaimer')}>Disclaimer</button><button onClick={()=>setDrawer('contact')}>Contact</button></footer>

    {drawer && <Drawer type={drawer} close={()=>setDrawer(null)} result={result} currency={currency} history={history} clearData={clearData}/>} 
    {privacyOpen && <Modal title="Privacy settings" close={()=>setPrivacyOpen(false)}><label className="check"><input type="checkbox" checked={remember} onChange={e=>{setRemember(e.target.checked); localStorage.setItem('paydays-remember',String(e.target.checked))}}/> Remember my payday history on this device</label><button className="danger" onClick={clearData}>Clear saved data</button><p className="muted">Your information stays in your browser. No account is required.</p></Modal>}
  </div>
}

function Field({label,help,children}){return <label className="field"><span>{label} <i>ⓘ</i></span>{children}{help && <small>{help}</small>}</label>}
function MoneyInput({value,onChange,currency,id}){return <div className="money"><span>{currency}</span><input id={id} value={value} onChange={e=>onChange?.(e.target.value)} /></div>}
function Metric({icon,value,title,text}){return <article><div className="metric-icon"><Icon type={icon}/></div><div><h3>{value}</h3><b>{title}</b><p>{text}</p></div></article>}
function validate(f){const s=parseMoney(f.starting), a=Number(f.age), r=Number(f.retire), ret=Number(f.returnRate); if(s>MAX_START)return 'Starting investment cannot exceed $25,000,000.'; if(a<16||a>99)return 'Current age must be between 16 and 99.'; if(r<16||r>99)return 'Retiring age must be between 16 and 99.'; if(r<a)return 'Retiring age cannot be below current age.'; if(ret<0||ret>20)return 'Expected annual return must be between 0% and 20%.'; return ''}
function sampleHistory(){return[{date:'May 24, 2025',payday:198,balance:123456.78},{date:'May 10, 2025',payday:196,balance:120342.21},{date:'Apr 26, 2025',payday:194,balance:118220.11},{date:'Apr 12, 2025',payday:192,balance:115119.62}]}
function scrollToId(id){document.getElementById(id)?.scrollIntoView({behavior:'smooth',block:'start'})}
function MiniLine({points,maxY}){const d=path(points,maxY,260,130,'balance'); return <svg className="mini" viewBox="0 0 260 130"><path d={d} fill="none" stroke="#6da1ff" strokeWidth="4"/><circle cx="250" cy="14" r="7" fill="#0b63ff" stroke="#fff" strokeWidth="3"/></svg>}
function path(points,maxY,w,h,key){ if(!points.length)return ''; return points.map((p,i)=>`${i?'L':'M'} ${(i/(points.length-1))*w} ${h-(p[key]/maxY)*h}`).join(' ') }
function areaPath(points,maxY,w,h,key){return `${path(points,maxY,w,h,key)} L ${w} ${h} L 0 ${h} Z`}
function Chart({points,maxY,currency,view}){const w=900,h=330; const labels=[0,.25,.5,.75,1]; const last=points[points.length-1]; return <div className="chart-wrap"><svg viewBox={`0 0 ${w} ${h}`} className="chart" role="img"><defs><linearGradient id="fill" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#2f80ff" stopOpacity=".32"/><stop offset="1" stopColor="#2f80ff" stopOpacity=".03"/></linearGradient></defs>{[0,.25,.5,.75,1].map((v,i)=><line key={i} x1="50" x2={w-20} y1={20+(h-70)*v} y2={20+(h-70)*v} stroke="#dce7f4"/>)}<path d={areaPath(points,maxY,w-90,h-70,'balance')} transform="translate(50 20)" fill="url(#fill)"/><path d={path(points,maxY,w-90,h-70,'balance')} transform="translate(50 20)" fill="none" stroke="#071b3c" strokeWidth="5"/><path d={path(points,maxY,w-90,h-70,'growth')} transform="translate(50 20)" fill="none" stroke="#0b63ff" strokeWidth="4"/><path d={path(points,maxY,w-90,h-70,'contributions')} transform="translate(50 20)" fill="none" stroke="#0090a5" strokeWidth="3" strokeDasharray="6 6"/><circle cx={w-35} cy={20+(h-70)-(last.balance/maxY)*(h-70)} r="8" fill="#071b3c"/><foreignObject x="500" y="95" width="190" height="120"><div className="tooltip"><b>PAYDAY #{last.payday}</b><p>Balance <strong>{money(last.balance,currency)}</strong></p><p>Growth <strong>{money(last.growth,currency)}</strong></p><p>Contributions <strong>{money(last.contributions,currency)}</strong></p></div></foreignObject>{labels.map((v,i)=><text key={i} x={50+i*(w-90)/4} y={h-15} textAnchor="middle">{i===0?'Now':view==='paydays'?'#'+Math.round(last.payday*v):Math.round(30*v)+'y'}</text>)}{[0,.25,.5,.75,1].map((v,i)=><text key={'y'+i} x="10" y={25+(h-70)*(1-v)}>{money(maxY*v,currency,true)}</text>)}</svg><div className="chart-tools"><button><Icon type="zoom"/></button><button><Icon type="zoom"/></button><button><Icon type="download"/></button></div></div>}
function Breakdown({result,currency}){return <div className="breakdown-table"><h3>Projection breakdown</h3>{[['Starting investment',result.starting],['Future contributions',result.futureContrib],['Total contributions',result.totalContrib],['Investment growth',result.growth],['Projected balance',result.balance]].map(([k,v])=><p key={k}><span>{k}</span><strong>{money(v,currency)}</strong></p>)}</div>}
function Compare({base,currency}){const low=calcProjection({...base,returnRate:String(Math.max(0,Number(base.returnRate)-2))}); const mid=calcProjection(base); const high=calcProjection({...base,returnRate:String(Number(base.returnRate)+2)}); return <div className="compare-grid">{[['Lower return',low],['Current plan',mid],['Higher return',high]].map(([k,r])=><article key={k}><p>{k}</p><h3>{money(r.balance,currency)}</h3><small>{r.periods} paydays</small></article>)}</div>}
function Drawer({type,close,result,currency,history,clearData}){return <div className="drawer-backdrop" onClick={close}><aside className="drawer" onClick={e=>e.stopPropagation()}><button className="drawer-close" onClick={close}><Icon type="close"/></button>{type==='breakdown'&&<Breakdown result={result} currency={currency}/>} {type==='history'&&<><h2>Payday history</h2>{(history.length?history:sampleHistory()).map((h,i)=><div className="drawer-row" key={i}><span>{h.date}</span><b>Payday #{h.payday}</b><strong>{money(h.balance,currency)}</strong></div>)}</>} {type==='how'&&<Content title="How it works" text="Enter your starting balance, what you add each payday, your age, and your expected return. 1040 Paydays shows how contributions and compounding may grow over your working life."/>} {type==='learn'&&<Content title="Learn" text="Guides, savings strategies, and payday investing articles will live here."/>} {type==='advanced'&&<Content title="Advanced assumptions" text="Future version: contribution increases, inflation, fees, taxes, and employer match."/>} {['menu','terms','disclaimer','contact'].includes(type)&&<Content title={type[0].toUpperCase()+type.slice(1)} text="This section is ready for your content."/>}</aside></div>}
function Content({title,text}){return <><h2>{title}</h2><p className="drawer-text">{text}</p></>}
function Modal({title,close,children}){return <div className="drawer-backdrop" onClick={close}><div className="modal" onClick={e=>e.stopPropagation()}><button className="drawer-close" onClick={close}><Icon type="close"/></button><h2>{title}</h2>{children}</div></div>}
