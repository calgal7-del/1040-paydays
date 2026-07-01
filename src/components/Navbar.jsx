import CurrencyDropdown from './CurrencyDropdown'

export default function Navbar({ currency, onCurrencyChange }) {
  return (
    <header className="navbar">
      <a className="brand" href="#top" aria-label="1040 Paydays home">
        <span className="brandNumber">1040</span>
        <span className="brandText">PAYDAYS</span>
      </a>

      <nav className="navLinks" aria-label="Main navigation">
        <a href="#calculator">Calculator</a>
        <a href="#how-it-works">How it works</a>
        <a href="#graph">Compare</a>
        <a href="#learn">Learn</a>
      </nav>

      <div className="navActions">
        <CurrencyDropdown
          value={currency}
          onChange={onCurrencyChange}
        />

        <button className="mobileMenu" type="button" aria-label="Open menu">
          ☰
        </button>
      </div>
    </header>
  )
}
