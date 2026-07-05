    import React, { useMemo, useState } from "react";
    import {
      CalendarDays,
      CircleDotDashed,
      UserRound,
      Sun,
      Heart,
      Lock,
      Mail,
      Camera,
      Facebook,
      Instagram,
      Youtube,
      ShieldAlert,
      SlidersHorizontal,
      X,
      Calculator,
      BookOpen,
      GraduationCap,
    } from "lucide-react";
    import "./App.css";

    const PAYDAYS_TOTAL = 1040;

    const currencies = [
      ["USD", "🇺🇸 USD"], ["CAD", "🇨🇦 CAD"], ["EUR", "🇪🇺 EUR"], ["GBP", "🇬🇧 GBP"],
      ["JPY", "🇯🇵 JPY"], ["CNY", "🇨🇳 CNY"], ["AUD", "🇦🇺 AUD"], ["CHF", "🇨🇭 CHF"],
      ["HKD", "🇭🇰 HKD"], ["SGD", "🇸🇬 SGD"], ["SEK", "🇸🇪 SEK"], ["KRW", "🇰🇷 KRW"],
      ["NOK", "🇳🇴 NOK"], ["NZD", "🇳🇿 NZD"], ["MXN", "🇲🇽 MXN"],
    ];

    function projectFuture(starting, contribution, years, periodsPerYear, returnRate, contributionGrowth = 0) {
      const periods = Math.max(years * periodsPerYear, 0);
      const rate = Math.max(returnRate, 0) / 100 / periodsPerYear;
      const growRate = contributionGrowth / 100 / periodsPerYear;
      let balance = Number(starting) || 0;
      let pay = Number(contribution) || 0;

      for (let i = 0; i < periods; i++) {
        balance = balance * (1 + rate) + pay;
        pay = pay * (1 + growRate);
      }

      return Math.max(balance, 0);
    }

    export default function App() {
      const [currency, setCurrency] = useState("USD");
      const [starting, setStarting] = useState(1000);
      const [contribution, setContribution] = useState(100);
      const [frequency, setFrequency] = useState("Biweekly");
      const [age, setAge] = useState(35);
      const [retireAge, setRetireAge] = useState(65);
      const [returnRate, setReturnRate] = useState(7);

      const [withdrawalRate, setWithdrawalRate] = useState(4);
      const [lifespan, setLifespan] = useState(100);
      const [inflation, setInflation] = useState(2.5);
      const [feeRate, setFeeRate] = useState(0.5);
      const [contributionGrowth, setContributionGrowth] = useState(0);

      const [panel, setPanel] = useState(null);
      const [email, setEmail] = useState("");
      const [snapshots, setSnapshots] = useState([]);

      const [compareExtraSavings, setCompareExtraSavings] = useState(50);
      const [compareReturn, setCompareReturn] = useState(8);
      const [compareRetireAge, setCompareRetireAge] = useState(70);
      const [compareWaitYears, setCompareWaitYears] = useState(5);

      const paydaysPerYear = frequency === "Weekly" ? 52 : frequency === "Monthly" ? 12 : 26;
      const yearsRemaining = Math.max(retireAge - age, 0);
      const retirementYears = Math.max(lifespan - retireAge, 0);
      const paydaysRemaining = Math.round(yearsRemaining * paydaysPerYear);
      const paydaysUsed = Math.max(PAYDAYS_TOTAL - paydaysRemaining, 0);

      const projection = useMemo(() => {
        const balance = projectFuture(starting, contribution, yearsRemaining, paydaysPerYear, returnRate - feeRate, contributionGrowth);
        const periods = yearsRemaining * paydaysPerYear;
        let invested = Number(starting) || 0;
        let pay = Number(contribution) || 0;
        const growRate = contributionGrowth / 100 / paydaysPerYear;

        for (let i = 0; i < periods; i++) {
          invested += pay;
          pay = pay * (1 + growRate);
        }

        return {
          balance: Math.round(balance),
          invested: Math.round(invested),
          growth: Math.round(balance - invested),
          monthly: Math.round((balance * (withdrawalRate / 100)) / 12),
        };
      }, [starting, contribution, yearsRemaining, paydaysPerYear, returnRate, withdrawalRate, feeRate, contributionGrowth]);

      const compare = useMemo(() => {
        const current = projection.balance;
        const monthly = (value) => Math.round((value * (withdrawalRate / 100)) / 12);
        const scenario = (label, value, tone = "up") => ({
          label,
          value: Math.round(value),
          monthly: monthly(value),
          diff: Math.round(value - current),
          monthlyDiff: Math.round(monthly(value) - projection.monthly),
          tone,
        });

        const netReturn = returnRate - feeRate;
        const extra = projectFuture(starting, contribution + compareExtraSavings, yearsRemaining, paydaysPerYear, netReturn, contributionGrowth);
        const customReturn = projectFuture(starting, contribution, yearsRemaining, paydaysPerYear, compareReturn - feeRate, contributionGrowth);
        const customRetireYears = Math.max(compareRetireAge - age, 0);
        const customRetire = projectFuture(starting, contribution, customRetireYears, paydaysPerYear, netReturn, contributionGrowth);

        const waitYears = Math.min(compareWaitYears, yearsRemaining);
        const waitValue = projectFuture(starting, contribution, Math.max(yearsRemaining - waitYears, 0), paydaysPerYear, netReturn, contributionGrowth);

        return [
          scenario("Current plan", current, "base"),
          scenario(`Save +$${compareExtraSavings}/payday`, extra, "up"),
          scenario(`${compareReturn}% expected return`, customReturn, compareReturn >= returnRate ? "up" : "down"),
          scenario(`Retire at ${compareRetireAge}`, customRetire, compareRetireAge >= retireAge ? "up" : "down"),
          scenario(`Wait ${compareWaitYears} years`, waitValue, "down"),
        ];
      }, [
        projection,
        withdrawalRate,
        starting,
        contribution,
        yearsRemaining,
        paydaysPerYear,
        returnRate,
        feeRate,
        contributionGrowth,
        compareExtraSavings,
        compareReturn,
        compareRetireAge,
        compareWaitYears,
        age,
        retireAge,
      ]);

      const money = (n) =>
        Number(n).toLocaleString("en-US", {
          style: "currency",
          currency,
          maximumFractionDigits: 0,
        });

      return (
        <div className="app-shell">
          {panel && (
            <SlidePanel
              panel={panel}
              close={() => setPanel(null)}
              money={money}
              projection={projection}
              compare={compare}
              snapshots={snapshots}
              setSnapshots={setSnapshots}
              compareControls={{
                compareExtraSavings,
                setCompareExtraSavings,
                compareReturn,
                setCompareReturn,
                compareRetireAge,
                setCompareRetireAge,
                compareWaitYears,
                setCompareWaitYears,
              }}
              values={{ age, retireAge, returnRate, withdrawalRate, lifespan, inflation, feeRate, contributionGrowth, retirementYears }}
              setters={{ setAge, setRetireAge, setWithdrawalRate, setLifespan, setInflation, setFeeRate, setContributionGrowth }}
            />
          )}

          <header className="topbar">
            <a className="brand" href="#calculator">
              <strong>1040</strong><span>PAYDAYS</span>
            </a>

            <nav className="topnav">
              <button className="active" onClick={() => setPanel("calculator")}>Calculator</button>
              <button onClick={() => setPanel("how")}>How it works</button>
              <button onClick={() => setPanel("compare")}>Compare</button>
              <button onClick={() => setPanel("learn")}>Learn</button>
            </nav>

            <div className="top-actions">
              <select value={currency} onChange={(e) => setCurrency(e.target.value)} className="currency-select">
                {currencies.map(([code, label]) => <option key={code} value={code}>{label}</option>)}
              </select>
            </div>
          </header>

          <main className={`dashboard ${panel ? "blurred" : ""}`} id="calculator">
            <aside className="story-panel card">
              <div className="short-line" />
              <p className="eyebrow">YOUR FINANCIAL LIFE IN PAYDAYS</p>

              <h1>You only get about <span>1,040</span> paydays.</h1>
              <h2>Every payday buys a little more <span>freedom.</span></h2>

              <div className="story-stack">
                <StoryItem tone="blue" icon="●●" title={`You've already experienced ${paydaysUsed} paydays.`} text="Time invested wisely today creates tomorrow's freedom." />
                <StoryItem tone="teal" icon="□" title={`You still have ${paydaysRemaining} opportunities to build your future.`} text="Make the most of them." />
                <StoryItem tone="gold" icon="↗" title="Starting five years earlier could nearly double your projected nest egg." text="Time is your greatest asset." />
                <StoryItem tone="purple" icon="◇" title="Small, consistent choices beat big, perfect ones." text="One payday at a time." />
              </div>

              <div className="promise-box">
                <Heart />
                <div>
                  <strong>Your future is decided <span>every payday.</span></strong>
                  <p>Not someday.</p>
                  <em>This payday.</em>
                </div>
              </div>
            </aside>

            <section className="middle-column">
              <section className="journey-card card">
                <p className="eyebrow">YOUR 1,040 PAYDAY JOURNEY</p>
                <h2>You’ve already used <span>{paydaysUsed}</span> paydays. <strong>{paydaysRemaining}</strong> remain.</h2>
                <p className="subtext">Every remaining payday is another opportunity to build your future.</p>

                <div className="journey-stats">
                  <Stat icon={<CalendarDays />} label="Paydays used" value={paydaysUsed} sub={`${Math.round((paydaysUsed / PAYDAYS_TOTAL) * 100)}%`} />
                  <Stat icon={<CircleDotDashed />} label="Paydays remaining" value={paydaysRemaining} sub={`${Math.round((paydaysRemaining / PAYDAYS_TOTAL) * 100)}%`} teal />
                  <Stat icon={<UserRound />} label="Current age" value={age} sub={`Retire at ${retireAge}`} />
                  <Stat icon={<Sun />} label="Years remaining" value={yearsRemaining} sub="Until retirement" gold />
                </div>
              </section>

              <section className="assumptions-card card">
                <button className="assumption-title" onClick={() => setPanel("advanced")} type="button">
                  EDIT YOUR ASSUMPTIONS <SlidersHorizontal size={14} />
                </button>

                <div className="input-grid">
                  <Input label="Starting balance" value={starting} setValue={setStarting} />
                  <Input label="Contribution each payday" value={contribution} setValue={setContribution} />
                  <label className="field">
                    <span>Pay frequency</span>
                    <select value={frequency} onChange={(e) => setFrequency(e.target.value)}>
                      <option>Biweekly</option>
                      <option>Weekly</option>
                      <option>Monthly</option>
                    </select>
                  </label>
                  <Input label="Current age" value={age} setValue={setAge} />
                  <Input label="Retire at age" value={retireAge} setValue={setRetireAge} />
                  <Input label="Expected return" value={returnRate} setValue={setReturnRate} step="0.1" />
                </div>

                <div className="privacy-row">
                  <span><Lock size={12} /> No account needed</span>
                  <span>•</span>
                  <span>Saved on your device</span>
                  <span>•</span>
                  <button onClick={() => setPanel("privacy")}>Privacy settings</button>
                </div>
              </section>

              <section className="projection-card card">
                <div className="chart-top">
                  <div>
                    <h2>Your projected future value</h2>
                    <div className="legend">
                      <span className="sample balance" /> Balance
                      <span className="sample contrib" /> Contributions
                    </div>
                  </div>

                  <div className="chart-total">
                    <small>Future value at age {retireAge}</small>
                    <strong>{money(projection.balance)}</strong>
                  </div>
                </div>

                <ProjectionChart age={age} retireAge={retireAge} money={money} balance={projection.balance} />

                <div className="fineprint">
                  Results are hypothetical and for illustrative purposes only.
                </div>
              </section>
            </section>

            <aside className="right-column">
              <section className="future-card">
                <p className="eyebrow gold">YOUR FUTURE ✧</p>
                <h3>Built one payday at a time.</h3>
                <div className="money-number">{money(projection.balance)}</div>

                <div className="future-grid">
                  <MiniStat label="You invested" value={money(projection.invested)} />
                  <MiniStat label="Growth" value={money(projection.growth)} />
                  <MiniStat label="Est. monthly income" value={`${money(projection.monthly)}/mo`} />
                  <MiniStat label="Paydays remaining" value={paydaysRemaining} />
                </div>
              </section>

              <section className="warning-box">
                <ShieldAlert size={20} />
                <p><strong>Projection only. Not financial advice.</strong><br />Actual returns, taxes, fees, and government benefits may vary.</p>
              </section>

              <section className="side-card card">
                <div className="side-title">
                  <p className="eyebrow muted">PAYDAY JOURNAL</p>
                  <button type="button" onClick={() => setPanel("journal")}>View all</button>
                </div>

                <h3>Track your real progress.</h3>

                <div className="empty-state">
                  <Camera size={22} />
                  {snapshots.length ? (
                    <>
                      <strong>{snapshots.length} projection saved.</strong>
                      <p>Latest: {money(snapshots[0].balance)} saved today.</p>
                    </>
                  ) : (
                    <>
                      <strong>No snapshots saved yet.</strong>
                      <p>Compare how your investments grow over time.</p>
                    </>
                  )}
                  <button type="button" onClick={() => setSnapshots([{ id: Date.now(), balance: projection.balance, monthly: projection.monthly, date: new Date().toLocaleDateString() }, ...snapshots])}>
                    Save your projection
                  </button>
                </div>
              </section>

              <section className="side-card signup-card card">
                <div className="mail-icon"><Mail size={18} /></div>
                <div>
                  <p className="eyebrow muted">STAY ON TRACK</p>
                  <h3>Get your 1,040 Payday Plan.</h3>

                  <div className="email-row">
                    <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email" />
                    <button type="button" onClick={() => email && alert(`Joined: ${email}`)}>Join</button>
                  </div>
                </div>
              </section>
            </aside>
          </main>

          <footer className={`footer ${panel ? "blurred" : ""}`}>
            <div>
              <strong>1040 Paydays</strong>
              <p>One payday at a time.<br />Build consistency.</p>
            </div>

            <nav>
              <button onClick={() => setPanel("about")}>About</button>
              <button onClick={() => setPanel("privacy")}>Privacy</button>
              <button onClick={() => setPanel("terms")}>Terms</button>
              <button onClick={() => setPanel("contact")}>Contact</button>
            </nav>

            <div className="socials">
              <a href="#facebook"><Facebook size={22} /></a>
              <a href="#instagram"><Instagram size={22} /></a>
              <a href="#youtube"><Youtube size={22} /></a>
              <a href="#contact"><Mail size={22} /></a>
            </div>
          </footer>
        </div>
      );
    }

    function SlidePanel({ panel, close, money, projection, compare, snapshots, setSnapshots, compareControls, values, setters }) {
      const isAdvanced = panel === "advanced";
      const isCompare = panel === "compare";

      return (
        <div className="overlay">
          <aside className={`slide-panel ${isAdvanced || isCompare ? "wide-panel" : ""}`}>
            <button className="close-panel" onClick={close}><X size={18} /></button>

            {isAdvanced && (
              <>
                <p className="eyebrow">ADVANCED ASSUMPTIONS</p>
                <h2>Fine-tune your payday plan.</h2>
                <Slider label="Current age" value={values.age} setValue={setters.setAge} min={18} max={75} />
                <Slider label="Retire at age" value={values.retireAge} setValue={setters.setRetireAge} min={45} max={90} />
                <Slider label="Withdrawal rate" value={values.withdrawalRate} setValue={setters.setWithdrawalRate} min={2} max={8} step={0.1} suffix="%" />
                <Slider label="Lifespan" value={values.lifespan} setValue={setters.setLifespan} min={75} max={110} />
                <Slider label="Inflation" value={values.inflation} setValue={setters.setInflation} min={0} max={8} step={0.1} suffix="%" />
                <Slider label="Investment fees" value={values.feeRate} setValue={setters.setFeeRate} min={0} max={3} step={0.1} suffix="%" />
                <Slider label="Contribution growth" value={values.contributionGrowth} setValue={setters.setContributionGrowth} min={0} max={10} step={0.1} suffix="%" />
                <div className="panel-note">Monthly income uses your withdrawal rate. Retirement age can now go up to 90.</div>
                <button className="ok-button" onClick={close}>OK</button>
              </>
            )}

            {isCompare && (
              <ComparePanel
                money={money}
                projection={projection}
                compare={compare}
                controls={compareControls}
              />
            )}

            {panel === "calculator" && (
              <PanelContent icon={<Calculator />} title="Calculator" text="This calculator turns retirement planning into payday decisions. Enter what you have now, what you can add each payday, your age, retirement age, and expected return." />
            )}

            {panel === "how" && (
              <PanelContent icon={<BookOpen />} title="How 1,040 Paydays Works" text="A person working from about age 25 to 65 and paid biweekly receives roughly 1,040 paydays. The point is simple: every payday is a decision point." />
            )}

            {panel === "learn" && (
              <PanelContent icon={<GraduationCap />} title="Learn" text="This section will hold your future articles, videos, guides, payday challenges, and retirement explainers." />
            )}

            {panel === "journal" && (
              <>
                <p className="eyebrow">SAVED PROJECTIONS</p>
                <h2>Your saved projections.</h2>
                {snapshots?.length ? (
                  <div className="saved-list">
                    {snapshots.map((item) => (
                      <div className="saved-row" key={item.id}>
                        <span>{item.date}</span>
                        <strong>{money(item.balance)}</strong>
                        <em>{money(item.monthly)}/mo</em>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="panel-text">No projections have been saved yet. Save one from the Payday Journal card to compare your progress later.</p>
                )}
                <button className="danger-button" onClick={() => setSnapshots([])}>Erase past projections</button>
                <button className="ok-button" onClick={close}>OK</button>
              </>
            )}

            {panel === "about" && (
              <PanelContent icon={<BookOpen />} title="About 1040 Paydays" text="Placeholder: 1040 Paydays helps people think about money one payday at a time. Replace this with your founder story, mission, and why the 1,040-payday idea matters." />
            )}

            {panel === "privacy" && (
              <PanelContent icon={<BookOpen />} title="Privacy" text="Placeholder: Explain what information is stored, what stays on the user's device, what email data is collected, and how people can request deletion or unsubscribe." />
            )}

            {panel === "terms" && (
              <PanelContent icon={<BookOpen />} title="Terms" text="Placeholder: Add your terms of use here. Include educational-use language, no financial-advice wording, user responsibilities, and site limitations." />
            )}

            {panel === "contact" && (
              <PanelContent icon={<Mail />} title="Contact" text="Placeholder: Add your contact email, business inquiries, media requests, partnership notes, and expected response time." />
            )}

            {!["advanced", "calculator", "how", "learn", "compare", "journal", "about", "privacy", "terms", "contact"].includes(panel) && (
              <PanelContent icon={<BookOpen />} title="Coming soon" text="This section can be expanded with formulas, examples, articles, and more payday planning tools." />
            )}
          </aside>
        </div>
      );
    }

    function ComparePanel({ money, projection, compare, controls }) {
      const maxValue = Math.max(...compare.map((row) => row.value), 1);

      return (
        <>
          <p className="eyebrow gold">COMPARE YOUR FUTURE ✧</p>
          <h2>Small changes. Monthly impact.</h2>

          <div className="compare-hero">
            <span>Current plan</span>
            <strong>{money(projection.balance)}</strong>
            <em>{money(projection.monthly)}/mo</em>
          </div>

          <div className="compare-sliders">
            <Slider label="Extra savings per payday" value={controls.compareExtraSavings} setValue={controls.setCompareExtraSavings} min={0} max={500} step={10} prefix="$" />
            <Slider label="Expected return scenario" value={controls.compareReturn} setValue={controls.setCompareReturn} min={1} max={15} step={0.1} suffix="%" />
            <Slider label="Retire at age" value={controls.compareRetireAge} setValue={controls.setCompareRetireAge} min={45} max={90} />
            <Slider label="Wait before starting" value={controls.compareWaitYears} setValue={controls.setCompareWaitYears} min={0} max={20} />
          </div>

          <div className="compare-list premium">
            {compare.map((row) => (
              <div className={`compare-card ${row.tone}`} key={row.label}>
                <div className="compare-card-top">
                  <span>{row.label}</span>
                  <strong>{money(row.value)}</strong>
                </div>

                <div className="compare-bar">
                  <i style={{ width: `${Math.max((row.value / maxValue) * 100, 4)}%` }} />
                </div>

                <div className="compare-metrics">
                  <span>
                    Monthly income
                    <b>{money(row.monthly)}/mo</b>
                  </span>
                  <span>
                    Difference
                    <b>{row.diff >= 0 ? "+" : ""}{money(row.diff)}</b>
                  </span>
                  <span>
                    Monthly change
                    <b>{row.monthlyDiff >= 0 ? "+" : ""}{money(row.monthlyDiff)}/mo</b>
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="panel-note">Monthly income is estimated using your selected withdrawal rate.</div>
        </>
      );
    }

    function PanelContent({ icon, title, text }) {
      return (
        <>
          <div className="panel-icon">{icon}</div>
          <h2>{title}</h2>
          <p className="panel-text">{text}</p>
          <button className="ok-button" onClick={() => document.querySelector(".close-panel")?.click()}>OK</button>
        </>
      );
    }

    function Input({ label, value, setValue, step = "1" }) {
      return (
        <label className="field">
          <span>{label}</span>
          <input type="number" step={step} value={value} onChange={(e) => setValue(Number(e.target.value))} />
        </label>
      );
    }

    function Slider({ label, value, setValue, min, max, step = 1, suffix = "", prefix = "" }) {
      return (
        <label className="slider">
          <div><span>{label}</span><strong>{prefix}{value}{suffix}</strong></div>
          <input type="range" min={min} max={max} step={step} value={value} onChange={(e) => setValue(Number(e.target.value))} />
        </label>
      );
    }

    function StoryItem({ tone, icon, title, text }) {
      return (
        <div className="story-item static">
          <div className={`story-icon ${tone}`}>{icon}</div>
          <div><strong>{title}</strong><p>{text}</p></div>
        </div>
      );
    }

    function Stat({ icon, label, value, sub, teal, gold }) {
      return (
        <div className="stat static">
          <div className={`stat-icon ${teal ? "teal" : ""} ${gold ? "goldish" : ""}`}>{icon}</div>
          <div><small>{label}</small><strong>{value}</strong><span>{sub}</span></div>
        </div>
      );
    }

    function MiniStat({ label, value }) {
      return <div className="mini-stat static"><small>{label}</small><strong>{value}</strong></div>;
    }

    function ProjectionChart({ age, retireAge, money, balance }) {
      return (
        <div className="chart-box">
          <svg viewBox="0 0 900 300" preserveAspectRatio="none">
            <defs>
              <linearGradient id="areaFill" x1="0" x2="1" y1="0" y2="1">
                <stop offset="0%" stopColor="#176bff" stopOpacity="0.18" />
                <stop offset="55%" stopColor="#176bff" stopOpacity="0.10" />
                <stop offset="100%" stopColor="#f5a400" stopOpacity="0.34" />
              </linearGradient>
            </defs>

            <line x1="40" y1="245" x2="850" y2="245" stroke="#e7edf7" />
            <line x1="40" y1="190" x2="850" y2="190" stroke="#edf2f8" />
            <line x1="40" y1="135" x2="850" y2="135" stroke="#edf2f8" />
            <line x1="40" y1="80" x2="850" y2="80" stroke="#edf2f8" />

            <path d="M40 235 C150 225, 250 212, 360 185 C500 151, 650 96, 850 38 L850 255 L40 255 Z" fill="url(#areaFill)" />
            <path d="M40 235 C150 225, 250 212, 360 185 C500 151, 650 96, 850 38" fill="none" stroke="#061936" strokeWidth="4.5" strokeLinecap="round" />
            <path d="M40 252 C210 247, 390 238, 560 221 C700 207, 800 190, 850 178" fill="none" stroke="#00a6a6" strokeWidth="3" strokeDasharray="10 9" />

            {[[40,235],[145,225],[250,210],[360,185],[485,154],[610,115],[735,75]].map(([x,y]) => <circle key={x} cx={x} cy={y} r="4.5" fill="#061936" />)}

            <rect x="78" y="90" width="136" height="70" rx="11" fill="#061936" opacity=".96" />
            <text x="92" y="114" className="tooltip-title">Payday #417</text>
            <text x="92" y="134" className="tooltip-text">Age 43</text>
            <text x="92" y="154" className="tooltip-text">Keep compounding</text>

            <rect x="560" y="92" width="125" height="54" rx="11" fill="white" stroke="#d7e4f5" />
            <text x="578" y="116" className="callout-blue">{money(Math.round(balance * .5))}</text>
            <text x="578" y="134" className="callout-sub">Age 50 · Payday #390</text>

            <rect x="705" y="42" width="130" height="54" rx="11" fill="white" stroke="#d7e4f5" />
            <text x="723" y="66" className="callout-blue">{money(Math.round(balance * .75))}</text>
            <text x="723" y="84" className="callout-sub">Payday #585</text>

            <circle cx="850" cy="38" r="9" fill="#f5a400" stroke="#fff" strokeWidth="4" />
            <circle cx="850" cy="38" r="22" fill="#f5a400" opacity=".20" />

            <text x="40" y="282" className="axis-label">Today</text>
            <text x="800" y="282" className="axis-label">Retirement</text>
            <text x="40" y="266" className="axis-sub">Age {age}</text>
            <text x="812" y="266" className="axis-sub">Age {retireAge}</text>
          </svg>
        </div>
      );
    }
