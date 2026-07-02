import { useState } from 'react'
import './App.css'

import Navbar from './components/Navbar'
import Hero from './components/Hero'
import CalculatorCard from './components/CalculatorCard'
import ProjectionCard from './components/ProjectionCard'
import ProjectionGraph from './components/ProjectionGraph'
import PaydayJournal from './components/PaydayJournal'
import NewsletterCard from './components/NewsletterCard'
import Footer from './components/Footer'
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
        <section className="topGrid">
          <Hero paydaysRemaining={projection.paydaysRemaining} />

          <CalculatorCard
            form={form}
            onChange={updateForm}
            onReveal={revealProjection}
            hasRevealed={hasRevealed}
          />

          <ProjectionCard
            projection={projection}
            currency={form.currency}
            hasRevealed={hasRevealed}
            onOpenBreakdown={() => setDrawerOpen(true)}
          />
        </section>

        <section className="bottomGrid">
          <ProjectionGraph
            graphData={graphData}
            callouts={callouts}
            currency={form.currency}
            hasRevealed={hasRevealed}
          />

          <aside className="rightRail">
            <PaydayJournal
              currency={form.currency}
              projection={projection}
              journal={journal}
            />

            <NewsletterCard />
          </aside>
        </section>
      </main>

      <Footer />

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
