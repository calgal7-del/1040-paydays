import logo from "../assets/logo.svg";

export default function Footer() {
  return (
    <footer className="siteFooter">
      <div className="footerLogo">
        <img src={logo} alt="1040 Paydays" />
      </div>

      <div className="footerPill">○ One payday at a time</div>
      <div className="footerPill">↗ Build consistency</div>
      <div className="footerPill">◎ Future-focused planning</div>

      <div className="footerBottom">
        © {new Date().getFullYear()} 1040 Paydays.
      </div>
    </footer>
  );
}
