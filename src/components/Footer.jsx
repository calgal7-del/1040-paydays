import {
  Calendar,
  TrendingUp,
  Target,
} from "lucide-react";

import logo from "../assets/logo.svg";

export default function Footer() {
  return (
    <footer className="siteFooter">

      <div className="footerLogo">

        <img src={logo} alt="1040 Paydays" />

      </div>

      <div className="footerDivider" />

      <div className="footerItem">

        <Calendar size={28} strokeWidth={1.8} />

        <span>
          One payday
          <br />
          at a time.
        </span>

      </div>

      <div className="footerDivider" />

      <div className="footerItem">

        <TrendingUp size={28} strokeWidth={1.8} />

        <span>
          See the power
          <br />
          of consistency.
        </span>

      </div>

      <div className="footerDivider" />

      <div className="footerItem">

        <Target size={28} strokeWidth={1.8} />

        <span>
          Build the future
          <br />
          you deserve.
        </span>

      </div>

      <div className="footerDivider" />

      <div className="footerLinks">

        <div className="copyright">
          © 2026 1040 Paydays
        </div>

        <div className="linkRow">

          <a href="/privacy">Privacy</a>

          <a href="/terms">Terms</a>

          <a href="/contact">Contact</a>

        </div>

      </div>

    </footer>
  );
}
