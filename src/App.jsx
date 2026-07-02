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
    setTimeout(() => setHasRevealed(true), 50)
  }

  return (
    <div className="appShell">
      <Navbar
        currency={form.currency}
        onCurrencyChange={(value) => updateForm('currency', value)}
      />

      <main className="mainLayout">
        <section className="dashboardGrid">
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

          <aside className="rightStack">
            <ProjectionCard
              projection={projection}
              currency={form.currency}
              hasRevealed={hasRevealed}
              onOpenBreakdown={() => setDrawerOpen(true)}
            />

            <PaydayJournal
              currency={form.currency}
              projection={projection}
              journal={journal}
            />

            <NewsletterCard />
          </aside>
        </section>

        <footer className="dashboardFooter">
          <div className="footerBrandBlock">
            <strong>1040</strong>
            <span>PAYDAYS</span>
          </div>

          <p>A simple way to see the power of consistency and build the future you deserve.</p>

          <div className="footerFeature">
            <span>▣</span>
            <p>One payday at a time.</p>
          </div>

          <div className="footerFeature">
            <span>↗</span>
            <p>See the power of consistency.</p>
          </div>

          <div className="footerFeature">
            <span>◎</span>
            <p>Build the future you deserve.</p>
          </div>

          <small>© 2026 1040 Paydays. All rights reserved.</small>
        </footer>
      </main>

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
