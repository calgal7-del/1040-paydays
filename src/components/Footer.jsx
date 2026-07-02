import { Calendar, TrendingUp, Target } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="siteFooter">
      <div className="footerLogoText">
        <strong>1040</strong>
        <span>PAYDAYS</span>
      </div>

      <div className="footerTagline">
        A simple way to see the power of consistency and build the future you deserve.
      </div>

      <div className="footerDivider" />

      <div className="footerFeature">
        <Calendar />
        <span>One payday<br />at a time.</span>
      </div>

      <div className="footerDivider" />

      <div className="footerFeature">
        <TrendingUp />
        <span>See the power of<br />consistency.</span>
      </div>

      <div className="footerDivider" />

      <div className="footerFeature">
        <Target />
        <span>Build the future<br />you deserve.</span>
      </div>

      <div className="footerDivider" />

      <div className="footerEnd">
        <p>© 2026 1040 Paydays. All rights reserved.</p>
        <nav>
          <a href="#privacy">Privacy policy</a>
          <a href="#terms">Terms of use</a>
          <a href="#contact">Contact us</a>
        </nav>
      </div>
    </footer>
  )
}
