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
    <section className={`projectionCard compactProjection ${hasRevealed ? 'revealed' : ''}`}>
      <div className="projectionTop">
        <p>Your future ✧</p>
        <span>Built one payday at a time.</span>
      </div>

      <strong className="futureValue">
        {formatCurrency(projection.finalBalance, currency)}
      </strong>

      <div className="projectionStats compactStats">
        <div>
          <span>You invested</span>
          <strong>{formatCurrency(projection.totalContributions, currency)}</strong>
        </div>

        <div>
          <span>Growth</span>
          <strong>{formatCurrency(projection.growth, currency)}</strong>
        </div>

        <div>
          <span>Income</span>
          <strong>{formatMonthlyIncome(projection.estimatedMonthlyIncome, currency)}</strong>
        </div>

        <div>
          <span>Paydays left</span>
          <strong>{formatNumber(projection.paydaysRemaining)}</strong>
        </div>
      </div>

      <button className="breakdownButton" type="button" onClick={onOpenBreakdown}>
        View full breakdown →
      </button>

      <p className="projectionDisclaimer">
        Projection only. Not financial advice.
      </p>
    </section>
  )
}
