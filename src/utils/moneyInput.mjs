const MONEY_DRAFT_PATTERN = /^\d*(?:\.\d{0,2})?$/;

export function isValidMoneyDraft(value) {
  return MONEY_DRAFT_PATTERN.test(String(value));
}

export function minorToMoneyDraft(valueMinor) {
  return (Math.max(0, Number(valueMinor) || 0) / 100).toFixed(2);
}

export function moneyDraftToMinor(value) {
  const draft = String(value).trim();
  if (!draft || draft === ".") return 0;
  if (!isValidMoneyDraft(draft)) return null;

  const [whole = "0", fraction = ""] = draft.split(".");
  const wholeMinor = Number.parseInt(whole || "0", 10) * 100;
  const fractionMinor = Number.parseInt(fraction.padEnd(2, "0") || "0", 10);
  return wholeMinor + fractionMinor;
}

export function syncMoneyDraft(currentDraft, valueMinor, isFocused) {
  return isFocused ? currentDraft : minorToMoneyDraft(valueMinor);
}
