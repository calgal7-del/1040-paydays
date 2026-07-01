import {
  formatCurrency,
  formatMonthlyIncome,
  formatNumber,
  formatPercent,
} from '../utils/formatters'

export default function ProjectionDrawer({
  open,
  onClose,
  projection,
  currency,
  form,
  milestones = [],
}) {
  if (!open) return null

  return (
    <div className="drawerOverlay" onClick={onClose}>
      <aside className="projectionDrawer" onClick={(e) => e.stopPropagation()}>
        <button className="drawerClose" onClick={onClose}>×</button>

        <p className="drawerKicker">Full breakdown</p>
        <h2>Your 1,040 Payday Plan</h2>

        <div className="drawerHero">
          <span>Future value</span>
          <strong>{formatCurrency(projection.finalBalance, currency)}</strong>
          <p>Built one payday at a time.</p>
        </div>

        <div className="drawerGrid">
          <div>
            <span>Monthly income</span>
            <strong>{formatMonthlyIncome(projection.estimatedMonthlyIncome, currency)}</strong>
          </div>
          <div>
            <span>Paydays remaining</span>
            <strong>{formatNumber(projection.paydaysRemaining)}</strong>
          </div>
          <div>
            <span>You invested</span>
            <strong>{formatCurrency(projection.totalContributions, currency)}</strong>
          </div>
          <div>
            <span>Growth</span>
            <strong>{formatCurrency(projection.growth, currency)}</strong>
          </div>
        </div>

        <section className="drawerSection">
          <h3>Investment summary</h3>
          <p>
            Your contributions become {formatCurrency(projection.finalBalance, currency)} by age{' '}
            {projection.retireAge}. Growth represents approximately{' '}
            {formatPercent((projection.growth / projection.finalBalance) * 100)} of the final value.
          </p>
        </section>

        <section className="drawerSection">
          <h3>Milestones</h3>
          <div className="drawerMilestones">
            {milestones.slice(0, 5).map((item) => (
              <div key={`${item.type}-${item.payday}`}>
                <span>Payday #{formatNumber(item.payday)}</span>
                <strong>{formatCurrency(item.value, currency)}</strong>
                <em>Age {Math.round(item.age)}</em>
              </div>
            ))}
          </div>
        </section>

        <section className="drawerSection">
          <h3>Assumptions</h3>
          <ul className="assumptionList">
            <li>Current age: {form.currentAge}</li>
            <li>Retire at age: {form.retireAge}</li>
            <li>Pay frequency: {form.frequency}</li>
            <li>Expected return: {form.expectedReturn}%</li>
            <li>Withdrawal years: {form.withdrawalYears}</li>
            <li>Government/private benefits included: {formatCurrency(projection.monthlyBenefits || 0, currency)}/mo</li>
          </ul>
        </section>

        <section className="drawerSection insightBox">
          <h3>Today’s insight</h3>
          <p>
            Your most powerful advantage is consistency. Every payday you invest gives compounding
            another chance to work.
          </p>
        </section>

        <div className="drawerActions">
          <button type="button">Download PDF</button>
          <button type="button">Export CSV</button>
        </div>
      </aside>
    </div>
  )
}
