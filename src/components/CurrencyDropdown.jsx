import { CURRENCIES } from '../utils/currencies'

export default function CurrencyDropdown({
  value,
  onChange,
}) {
  return (
    <select
      className="currencyDropdown"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      aria-label="Currency"
    >
      {CURRENCIES.map((currency) => (
        <option
          key={currency.code}
          value={currency.code}
        >
          {currency.flag} {currency.code}
        </option>
      ))}
    </select>
  )
}
