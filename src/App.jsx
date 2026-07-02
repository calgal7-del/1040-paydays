import { useState } from 'react'
import './App.css'

import Navbar from './components/Navbar'
import Hero from './components/Hero'
import CalculatorCard from './components/CalculatorCard'
import ProjectionCard from './components/ProjectionCard'
import ProjectionGraph from './components/ProjectionGraph'
import PaydayJournal from './components/PaydayJournal'
import NewsletterCard from './components/NewsletterCard'
import ProjectionDrawer from './components/ProjectionDrawer'

import { DEFAULT_FORM } from './utils/constants'
import { useProjection } from './hooks/useProjection'
import { usePaydayJournal } from './hooks/usePaydayJournal'

export default function App() {
  const [form, setForm] = useState(DEFAULT_FORM)
  const [hasRevealed, setHasRevealed] = useState(false)
  const [drawerOpen, setDrawerOpen] = useState(false)

  const { projection, graphData, callouts, milestones } = useProjection(form)
  const journal = usePaydayJournal()

  function updateForm(field, value) {
    setForm((previous) => ({
      ...previous,
      [field]: value,
    }))
  }

  function revealProjection() {
    setHasRevealed(false)
    window.setTimeout(() => setHasRevealed(true), 50)
  }

  return (
    <div className="appShell">
      <Navbar
        currency={form.currency}
        onCurrencyChange={(value) => updateForm('currency', value)}
      />

      <main className="mainLayout">
        <section className="topGrid">
          <aside className="leftStack">
            <Hero paydaysRemaining={projection.paydaysRemaining} />
          </aside>

          <section className="centerStack">
            <CalculatorCard
              form={form}
              onChange={updateForm}
              onReveal={revealProjection}
              hasRevealed={hasRevealed}
            />

            <ProjectionGraph
              graphData={graphData}
              callouts={callouts}
              currency={form.currency}
              hasRevealed={hasRevealed}
            />
          </section>

          <aside className="rightRail">
            <ProjectionCard
              projection={projection}
              currency={form.currency}
              hasRevealed={hasRevealed}
              onOpenBreakdown={() => setDrawerOpen(true)}
            />

            <div className="disclaimerCard">
              <span>ⓘ</span>
              <div>
                <strong>Projection only. Not financial advice.</strong>
                <p>Actual returns, taxes, fees, and government benefits may vary.</p>
              </div>
            </div>

            <PaydayJournal
              currency={form.currency}
              projection={projection}
              journal={journal}
            />

            <NewsletterCard />
          </aside>
        </section>
      </main>

      <footer className="siteFooter">
  <div className="footerLogo">1040 Paydays</div>
  <div className="footerPill">○ One payday at a time</div>
  <div className="footerPill">↗ Build consistency</div>
  <div className="footerPill">◎ Future-focused planning</div>
  <div className="footerBottom">
    © {new Date().getFullYear()} 1040 Paydays.
  </div>
</footer>

      <ProjectionDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        projection={projection}
        currency={form.currency}
        form={form}
        milestones={milestones}
      />
    </div>
  )
}
