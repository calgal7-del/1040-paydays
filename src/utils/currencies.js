export const CURRENCIES = [
  {
    code: "CAD",
    name: "Canadian Dollar",
    symbol: "$",
    flag: "🇨🇦",
    locale: "en-CA",
    country: "Canada",
  },
  {
    code: "USD",
    name: "US Dollar",
    symbol: "$",
    flag: "🇺🇸",
    locale: "en-US",
    country: "United States",
  },
  {
    code: "EUR",
    name: "Euro",
    symbol: "€",
    flag: "🇪🇺",
    locale: "de-DE",
    country: "European Union",
  },
  {
    code: "GBP",
    name: "British Pound",
    symbol: "£",
    flag: "🇬🇧",
    locale: "en-GB",
    country: "United Kingdom",
  },
  {
    code: "AUD",
    name: "Australian Dollar",
    symbol: "$",
    flag: "🇦🇺",
    locale: "en-AU",
    country: "Australia",
  },
  {
    code: "BRL",
    name: "Brazilian Real",
    symbol: "R$",
    flag: "🇧🇷",
    locale: "pt-BR",
    country: "Brazil",
  },
  {
    code: "INR",
    name: "Indian Rupee",
    symbol: "₹",
    flag: "🇮🇳",
    locale: "en-IN",
    country: "India",
  },
  {
    code: "CNY",
    name: "Chinese Yuan",
    symbol: "¥",
    flag: "🇨🇳",
    locale: "zh-CN",
    country: "China",
  },
  {
    code: "JPY",
    name: "Japanese Yen",
    symbol: "¥",
    flag: "🇯🇵",
    locale: "ja-JP",
    country: "Japan",
  },
  {
    code: "MXN",
    name: "Mexican Peso",
    symbol: "$",
    flag: "🇲🇽",
    locale: "es-MX",
    country: "Mexico",
  },
  {
    code: "SGD",
    name: "Singapore Dollar",
    symbol: "$",
    flag: "🇸🇬",
    locale: "en-SG",
    country: "Singapore",
  },
  {
    code: "NZD",
    name: "New Zealand Dollar",
    symbol: "$",
    flag: "🇳🇿",
    locale: "en-NZ",
    country: "New Zealand",
  },
  {
    code: "ZAR",
    name: "South African Rand",
    symbol: "R",
    flag: "🇿🇦",
    locale: "en-ZA",
    country: "South Africa",
  },
]

export function getCurrency(code) {
  return (
    CURRENCIES.find((currency) => currency.code === code) ||
    CURRENCIES[0]
  )
}
