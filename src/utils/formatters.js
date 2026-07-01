import { getCurrency } from "./currencies";

/**
 * Formats money using the selected currency.
 */
export function formatCurrency(
  value,
  currencyCode = "CAD",
  decimals = 0
) {
  const currency = getCurrency(currencyCode);

  const number = Number(value) || 0;

  return new Intl.NumberFormat(currency.locale, {
    style: "currency",
    currency: currency.code,
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(number);
}

/**
 * Formats a whole number.
 */
export function formatNumber(value) {
  return new Intl.NumberFormat().format(Number(value) || 0);
}

/**
 * Formats percentages.
 */
export function formatPercent(value, decimals = 1) {
  return `${Number(value || 0).toFixed(decimals)}%`;
}

/**
 * Formats monthly income.
 */
export function formatMonthlyIncome(
  value,
  currencyCode = "CAD"
) {
  return `${formatCurrency(value, currencyCode)}/mo`;
}

/**
 * Formats payday number.
 */
export function formatPayday(number) {
  return `#${formatNumber(number)}`;
}

/**
 * Formats age.
 */
export function formatAge(age) {
  return `${Math.round(Number(age) || 0)} years`;
}

/**
 * Formats years remaining.
 */
export function formatYears(years) {
  return years === 1
    ? "1 year"
    : `${Math.round(Number(years))} years`;
}

/**
 * Formats contribution frequency.
 */
export function formatFrequency(frequency) {
  switch (frequency) {
    case "Daily":
      return "365 contributions/year";

    case "Weekly":
      return "52 contributions/year";

    case "Biweekly":
      return "26 contributions/year";

    case "Semi-monthly":
      return "24 contributions/year";

    case "Monthly":
      return "12 contributions/year";

    case "Quarterly":
      return "4 contributions/year";

    case "Yearly":
      return "1 contribution/year";

    default:
      return frequency;
  }
}

/**
 * Formats graph axis labels.
 */
export function formatCompactCurrency(
  value,
  currencyCode = "CAD"
) {
  const currency = getCurrency(currencyCode);

  const number = Number(value);

  if (number >= 1000000)
    return `${currency.symbol}${(number / 1000000).toFixed(1)}M`;

  if (number >= 1000)
    return `${currency.symbol}${Math.round(number / 1000)}k`;

  return `${currency.symbol}${Math.round(number)}`;
}

/**
 * Formats dates for the Payday Journal.
 */
export function formatJournalDate(date) {
  return new Intl.DateTimeFormat(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(new Date(date));
}
