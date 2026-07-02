export default function Hero({ paydaysRemaining }) {
  return (
    <section className="hero" id="top">
      <div className="heroAccent" />

      <p className="heroKicker">Your financial life in paydays</p>

      <h1>
        You only get
        <br />
        about
        <span>1,040</span>
        paydays.
      </h1>

      <p className="heroLead">
        Every payday buys
        <br />
        a little more <em>freedom.</em>
      </p>

      <div className="heroInsights">
        <div className="heroInsight blue">
          <span>👥</span>
          <p>
            <strong>You’ve already experienced 0 paydays.</strong>
            <small>Time invested wisely today creates tomorrow’s freedom.</small>
          </p>
        </div>

        <div className="heroInsight green">
          <span>▣</span>
          <p>
            <strong>You still have roughly {paydaysRemaining.toLocaleString()} opportunities to build your future.</strong>
            <small>Make the most of them.</small>
          </p>
        </div>

        <div className="heroInsight gold">
          <span>↗</span>
          <p>
            <strong>Starting five years earlier could nearly double your projected nest egg.</strong>
            <small>Time is your greatest asset.</small>
          </p>
        </div>

        <div className="heroInsight purple">
          <span>♢</span>
          <p>
            <strong>Small, consistent choices beat big, perfect ones.</strong>
            <small>One payday at a time.</small>
          </p>
        </div>
      </div>

      <div className="thisPaydayCard">
        <span>♡</span>
        <div>
          <p>Your future is decided <strong>every payday.</strong></p>
          <small>Not someday.</small>
          <em>This payday.</em>
        </div>
      </div>
    </section>
  )
}
