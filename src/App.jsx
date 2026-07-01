@import url('https://fonts.googleapis.com/css2?family=Inter:wght@500;600;700;800;900&family=Playfair+Display:wght@700;800;900&display=swap');

:root {
  --navy: #071936;
  --navy-2: #08213f;
  --blue: #1768ff;
  --teal: #0b91a3;
  --gold: #e59a08;
  --gold-2: #ffbf3f;
  --ink: #071936;
  --muted: #60748e;
  --line: #d8e3f1;
  --soft: #f4f8fd;
  --card: rgba(255,255,255,.92);
  --shadow: 0 18px 45px rgba(7, 25, 54, .10);
}

* { box-sizing: border-box; }
body { margin: 0; font-family: Inter, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; color: var(--ink); background: radial-gradient(circle at 20% 0%, #fff 0, #f2f7fd 38%, #edf4fb 100%); }
button, input, select { font: inherit; }
button { cursor: pointer; }
.site { min-height: 100vh; }
.topbar { height: 72px; padding: 0 34px; display: flex; align-items: center; justify-content: space-between; color: #fff; background: linear-gradient(90deg, #041428, #082743); box-shadow: 0 12px 26px rgba(4, 20, 40, .18); position: sticky; top: 0; z-index: 10; }
.logo { font-family: Playfair Display, serif; font-size: 26px; font-weight: 900; letter-spacing: 3px; line-height: .8; }
.logo span { display: block; font-family: Inter, sans-serif; font-size: 12px; letter-spacing: 7px; color: #82b2ff; margin-top: 10px; }
.topbar nav { display: flex; gap: 32px; height: 100%; align-items: center; }
.topbar nav button, .navRight button { background: none; border: 0; color: #fff; font-weight: 800; }
.topbar nav button.active { color: #fff; border-bottom: 3px solid var(--blue); height: 100%; }
.navRight { display: flex; gap: 14px; align-items: center; }
.navRight select { background: rgba(255,255,255,.08); color: #fff; border: 1px solid rgba(255,255,255,.28); border-radius: 9px; padding: 12px 18px; font-weight: 800; }
.navRight option { color: var(--ink); }
.menu { font-size: 24px; }

.layout { max-width: 1500px; margin: 0 auto; padding: 24px 34px 32px; display: grid; grid-template-columns: 285px minmax(560px, 1fr) 455px; gap: 24px; align-items: start; }
.card { background: var(--card); border: 1px solid rgba(183, 199, 221, .72); border-radius: 18px; box-shadow: var(--shadow); backdrop-filter: blur(16px); }
.accent { width: 42px; height: 4px; background: var(--blue); border-radius: 10px; margin-bottom: 20px; }
.story { padding: 8px 0 0; }
.story h1 { font-family: Playfair Display, serif; margin: 0; font-size: clamp(52px, 4.6vw, 78px); line-height: .9; letter-spacing: -2px; }
.story h1 strong { display: block; color: var(--blue); font-size: 1.28em; line-height: .82; }
.tagline { margin: 20px 0 24px; font-size: 21px; line-height: 1.25; color: var(--ink); }
.tagline span { color: var(--blue); font-weight: 900; }
.insights { display: grid; gap: 18px; margin-top: 28px; }
.insight { display: grid; grid-template-columns: 54px 1fr; gap: 16px; align-items: start; }
.insightIcon { width: 52px; height: 52px; border-radius: 999px; display: grid; place-items: center; font-size: 20px; font-weight: 900; }
.insightIcon.blue { color: var(--blue); background: #eaf2ff; }
.insightIcon.teal, .insightIcon.green { color: var(--teal); background: #e8f7f5; }
.insightIcon.gold { color: var(--gold); background: #fff3d8; }
.insight p { margin: 0; line-height: 1.28; font-size: 14.5px; font-weight: 800; }
.insight b { color: var(--blue); }
.insight small { display: block; margin-top: 6px; color: var(--muted); font-weight: 600; }
.futureNote { margin-top: 28px; padding: 22px; display: grid; grid-template-columns: 52px 1fr; gap: 16px; border: 1px solid #cbdaf0; border-radius: 16px; background: rgba(255,255,255,.62); }
.futureNote > span { width: 52px; height: 52px; border: 2px solid var(--blue); color: var(--blue); display: grid; place-items: center; border-radius: 999px; font-size: 31px; }
.futureNote h2 { font-family: Playfair Display, serif; margin: 0 0 12px; font-size: 24px; line-height: 1.05; }
.futureNote h2 span { color: var(--blue); }
.futureNote p { margin: 0 0 8px; }
.futureNote strong { color: var(--blue); font-size: 28px; font-style: italic; font-family: Playfair Display, serif; }

.mainStack { display: grid; gap: 16px; }
.calculator { padding: 26px; }
.calculator h2 { font-family: Playfair Display, serif; font-size: 28px; margin: 0 0 22px; display: flex; gap: 12px; align-items: center; }
.calculator h2 > span { color: var(--blue); }
.calculator h2 span:first-child { color: var(--gold); font-family: Inter, sans-serif; }
.fieldGrid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 18px 24px; }
label > span { display: flex; gap: 8px; align-items: center; font-size: 13px; font-weight: 900; margin-bottom: 8px; }
label small { color: #8aa0be; }
input, select { width: 100%; border: 1px solid #cbd8e8; border-radius: 8px; background: #fff; color: var(--ink); padding: 13px 15px; outline: none; font-weight: 800; min-height: 48px; }
input:focus, select:focus { border-color: var(--blue); box-shadow: 0 0 0 4px rgba(23,104,255,.10); }
.inputWrap { display: flex; align-items: center; gap: 10px; border: 1px solid #cbd8e8; border-radius: 8px; background: #fff; min-height: 48px; padding: 0 14px; }
.inputWrap input { border: 0; box-shadow: none; padding-left: 0; min-height: auto; }
.inputWrap b { font-size: 18px; }
.advanced { margin: 18px 0 14px; background: none; border: 0; padding: 0; color: var(--blue); font-weight: 900; }
.ctaRow { display: flex; gap: 12px; }
.primary { flex: 1; border: 0; min-height: 54px; border-radius: 8px; color: #fff; font-size: 19px; font-weight: 900; background: linear-gradient(180deg, #f0b531, #d18300); box-shadow: 0 16px 25px rgba(216, 131, 0, .26); }
.reset { border: 1px solid #cbd8e8; border-radius: 8px; padding: 0 18px; background: #fff; color: var(--ink); font-weight: 900; }
.privacyLine { display: flex; justify-content: space-between; align-items: center; color: var(--muted); margin-top: 16px; font-size: 13px; font-weight: 700; }
.privacyLine button, .sectionHead button { border: 0; background: none; color: var(--blue); font-weight: 900; }

.darkCard { min-height: 420px; position: relative; overflow: hidden; padding: 28px; background: radial-gradient(circle at 90% 34%, rgba(255,191,63,.22), transparent 30%), linear-gradient(145deg, #061328, #08213f); color: #fff; box-shadow: 0 24px 55px rgba(4, 20, 40, .25); }
.darkCopy { position: relative; z-index: 2; max-width: 330px; }
.darkCard h3 { margin: 0 0 10px; font-family: Playfair Display, serif; font-size: 23px; }
.bigNumber { display: block; margin: 0 0 12px; font-family: Playfair Display, serif; font-size: clamp(56px, 5.2vw, 78px); line-height: .95; color: var(--gold-2); text-shadow: 0 10px 24px rgba(255, 191, 63, .18); }
.darkCard p { margin: 0 0 16px; font-weight: 700; color: rgba(255,255,255,.92); }
.darkMetrics { border-top: 1px solid rgba(255,255,255,.20); border-bottom: 1px solid rgba(255,255,255,.20); padding: 16px 0; display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; margin: 18px 0; }
.darkMetrics div + div { border-left: 1px solid rgba(255,255,255,.18); padding-left: 12px; }
.darkMetrics span, .darkMetrics small { display: block; color: rgba(255,255,255,.82); font-size: 12px; font-weight: 800; }
.darkMetrics b { display: block; margin-top: 8px; font-size: 20px; }
.darkCard h4 { margin: 20px 0 10px; color: var(--blue); font-size: 21px; }
.darkCard button { border: 1px solid rgba(255,255,255,.35); background: rgba(255,255,255,.04); color: #fff; border-radius: 8px; padding: 12px 22px; font-weight: 900; }
.goldCurve { position: absolute; right: 18px; bottom: 18px; width: 52%; max-width: 330px; fill: #fff; color: var(--gold-2); opacity: .98; }

.chart { padding: 22px; position: relative; }
.tabs { display: flex; justify-content: space-between; align-items: center; margin-bottom: 18px; }
.tabs div { display: flex; gap: 8px; }
.tabs button { border: 1px solid #d5e0ef; background: #fff; padding: 10px 16px; border-radius: 8px; font-weight: 900; }
.tabs button.active { background: var(--blue); border-color: var(--blue); color: #fff; box-shadow: 0 8px 16px rgba(23,104,255,.16); }
.legend { display: flex; justify-content: center; gap: 42px; font-weight: 900; font-size: 13px; margin-bottom: 10px; }
.legend span::before { content: ''; display: inline-block; width: 22px; height: 3px; margin-right: 8px; vertical-align: middle; border-radius: 5px; background: currentColor; }
.balance { color: var(--ink); } .growth { color: var(--blue); } .contrib { color: var(--teal); }
.chartFrame { min-height: 330px; }
.chartFrame svg { width: 100%; height: auto; display: block; overflow: visible; }
.drawLine { stroke-dasharray: 1500; stroke-dashoffset: 1500; animation: draw 1.55s ease forwards; }
.growthLine { animation-delay: .12s; } .contribLine { animation-delay: .24s; }
.chartArea { opacity: 0; animation: fadeIn .9s ease .8s forwards; }
.callout { opacity: 0; animation: rise .6s ease 1.1s forwards; }
.callout.gold { animation-delay: 1.35s; }
.exploreMilestones { position: absolute; right: 22px; bottom: 20px; border: 0; background: none; color: var(--blue); font-weight: 900; }
.chartFoot { color: var(--muted); font-size: 13px; font-weight: 700; margin-top: 8px; }

.side { display: grid; gap: 16px; }
.journal, .mailing { padding: 20px; }
.sectionHead { display: flex; align-items: center; justify-content: space-between; margin-bottom: 14px; }
.sectionHead h3, .mailing h3 { margin: 0; font-family: Playfair Display, serif; font-size: 21px; }
.latest { display: grid; grid-template-columns: 1.2fr 1fr .8fr; gap: 10px; align-items: center; padding: 14px; border: 1px solid #dbe5f2; border-radius: 10px; }
.latest span { font-weight: 900; font-size: 13px; }
.latest small { color: var(--muted); font-weight: 700; }
.latest strong { font-size: 20px; justify-self: end; }
.latest b { justify-self: end; color: #0a9b73; }
.latest b.down { color: #d74343; }
.latest b small { display: block; color: var(--muted); font-size: 11px; }
.historyList { margin: 12px 0; }
.historyList p { display: flex; justify-content: space-between; margin: 0; padding: 9px 4px; border-bottom: 1px solid #eef2f7; color: #465d7a; font-size: 13px; }
.journalActions { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 10px; }
.journalActions button { border: 1px solid #d5e0ef; background: #fff; border-radius: 8px; padding: 10px 8px; font-weight: 900; font-size: 12px; }
button.danger, .danger { color: #df3838; border-color: #f1b6b6 !important; background: #fffafa !important; }
.mailing { position: relative; overflow: hidden; }
.mailing h3 span { color: var(--blue); }
.mailing p { color: var(--muted); margin: 6px 0 14px; }
.mailing form { display: grid; grid-template-columns: 1fr 122px; gap: 12px; }
.mailing button { background: var(--blue); color: #fff; border: 0; border-radius: 8px; font-weight: 900; }
.mailing small { display: block; margin-top: 10px; color: var(--muted); }
.joined { padding: 14px; color: #0a9b73; background: #e9fbf5; border-radius: 10px; font-weight: 900; }

.drawerBackdrop { position: fixed; inset: 0; background: rgba(4, 18, 38, .42); z-index: 30; display: flex; justify-content: flex-end; }
.drawer { width: min(440px, 92vw); background: #fff; height: 100%; padding: 28px; box-shadow: -18px 0 40px rgba(0,0,0,.18); overflow: auto; animation: slideIn .22s ease; }
.close { float: right; border: 0; background: #eef4fb; width: 36px; height: 36px; border-radius: 999px; font-size: 22px; }
.drawer h2 { font-family: Playfair Display, serif; font-size: 30px; }
.breakdown p, .milestones p { display: flex; justify-content: space-between; gap: 18px; border-bottom: 1px solid #eef2f7; padding: 12px 0; }

@keyframes draw { to { stroke-dashoffset: 0; } }
@keyframes fadeIn { to { opacity: 1; } }
@keyframes rise { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
@keyframes slideIn { from { transform: translateX(24px); opacity: .8; } to { transform: translateX(0); opacity: 1; } }

@media (max-width: 1180px) {
  .layout { grid-template-columns: 1fr; }
  .story { max-width: 650px; }
  .side { grid-template-columns: 1fr; }
}
@media (max-width: 760px) {
  .topbar nav { display: none; }
  .layout { padding: 18px; }
  .fieldGrid { grid-template-columns: 1fr; }
  .darkMetrics, .latest, .journalActions, .mailing form { grid-template-columns: 1fr; }
  .bigNumber { font-size: 54px; }
  .tabs, .privacyLine { align-items: flex-start; gap: 12px; flex-direction: column; }
}
