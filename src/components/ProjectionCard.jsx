import {
  formatCurrency,
  formatMonthlyIncome,
  formatNumber,
} from '../utils/formatters'

export default function ProjectionCard({
  projection,
  currency,
  hasRevealed,
  onOpenBreakdown,
}) {
  return (
    <section className={`projectionCard ${hasRevealed ? 'revealed' : ''}`}>
      <div className="projectionTop">
        <p>Your future ✧</p>
        <span>Built one payday at a time.</span>
      </div>

      <strong className="futureValue">
        {formatCurrency(projection.finalBalance, currency)}
      </strong>

      <div className="projectionStats">
        <div>
          <span>You invested</span>
          <strong>{formatCurrency(projection.totalContributions, currency)}</strong>
        </div>

        <div>
          <span>Growth</span>
          <strong>{formatCurrency(projection.growth, currency)}</strong>
        </div>

        <div>
          <span>Est. monthly income</span>
          <strong>{formatMonthlyIncome(projection.estimatedMonthlyIncome, currency)}</strong>
        </div>

        <div>
          <span>Paydays remaining</span>
          <strong>{formatNumber(projection.paydaysRemaining)}</strong>
        </div>
      </div>

      <button className="breakdownButton" type="button" onClick={onOpenBreakdown}>
        View full breakdown →
      </button>
    </section>
  )
}
