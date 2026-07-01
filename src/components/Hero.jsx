export default function Hero({ paydaysRemaining }) {
  return (
    <section className="hero" id="top">
      <div className="heroKicker">Your financial life in paydays</div>

      <h1>
        You only get about
        <span>1,040</span>
        paydays.
      </h1>

      <p className="heroLead">
        Every payday buys a little more freedom.
      </p>

      <div className="heroInsights">
        <div className="heroInsight">
          <span>✓</span>
          <p>
            You have roughly <strong>{paydaysRemaining.toLocaleString()}</strong>{' '}
            opportunities left to invest.
          </p>
        </div>

        <div className="heroInsight">
          <span>✓</span>
          <p>
            Small contributions can become meaningful over hundreds of paydays.
          </p>
        </div>

        <div className="heroInsight">
          <span>✓</span>
          <p>
            Starting earlier gives compounding more time to work.
          </p>
        </div>
      </div>

      <div className="thisPaydayCard">
        <p>Your future is decided every payday.</p>
        <strong>This payday.</strong>
      </div>
    </section>
  )
}
