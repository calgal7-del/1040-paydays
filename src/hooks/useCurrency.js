import { useMemo } from 'react'
import { CURRENCIES, getCurrency } from '../utils/currencies'

export function useCurrency(currencyCode) {
  const currency = useMemo(
    () => getCurrency(currencyCode),
    [currencyCode]
  )

  return {
    currency,
    currencies: CURRENCIES,
    symbol: currency.symbol,
    code: currency.code,
    flag: currency.flag,
    locale: currency.locale,
    country: currency.country,
  }
}
