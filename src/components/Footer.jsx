export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="footerBrand">
        <strong>1040 PAYDAYS</strong>
        <p>
          Helping you build wealth one payday at a time.
        </p>
      </div>

      <nav className="footerLinks" aria-label="Footer navigation">
        <a href="#calculator">Calculator</a>
        <a href="#how-it-works">How it works</a>
        <a href="#graph">Projection</a>
        <a href="#learn">Learning Centre</a>
        <a href="#privacy">Privacy</a>
        <a href="#terms">Terms</a>
        <a href="#contact">Contact</a>
      </nav>

      <div className="footerDisclaimer">
        <p>
          1040 Paydays provides educational projections only and is not
          financial, investment, tax, or legal advice. Investment returns,
          inflation, taxes, fees, and government benefits are estimates and
          actual results will vary.
        </p>
      </div>

      <div className="footerBottom">
        <span>© {year} 1040 Paydays. All rights reserved.</span>
        <span>Built one payday at a time.</span>
      </div>
    </footer>
  )
}
