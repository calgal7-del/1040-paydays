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

      <div className="miniSparkline" aria-hidden="true">
        <svg viewBox="0 0 320 120">
          <defs>
            <linearGradient id="sparkGold" x1="0" x2="1" y1="0" y2="0">
              <stop offset="0%" stopColor="#72d0ff" />
              <stop offset="100%" stopColor="#f5b84b" />
            </linearGradient>
          </defs>

          <path
            d="M10 92 C54 88 86 76 115 69 C151 60 173 65 203 44 C234 21 264 30 310 10"
            fill="none"
            stroke="url(#sparkGold)"
            strokeWidth="6"
            strokeLinecap="round"
          />
        </svg>
      </div>

      <div className="projectionStats">
        <div>
          <span>You invested</span>
          <strong>
            {formatCurrency(projection.totalContributions, currency)}
          </strong>
        </div>

        <div>
          <span>Growth</span>
          <strong>{formatCurrency(projection.growth, currency)}</strong>
        </div>

        <div>
          <span>Estimated income</span>
          <strong>
            {formatMonthlyIncome(projection.estimatedMonthlyIncome, currency)}
          </strong>
        </div>

        <div>
          <span>Paydays remaining</span>
          <strong>{formatNumber(projection.paydaysRemaining)}</strong>
        </div>
      </div>

      <button
        className="breakdownButton"
        type="button"
        onClick={onOpenBreakdown}
      >
        View full breakdown →
      </button>

      <p className="projectionDisclaimer">
        Projection only. Not financial advice. Actual returns, taxes, fees,
        inflation and government benefits may vary.
      </p>
    </section>
  )
}
