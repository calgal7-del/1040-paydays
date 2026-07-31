/**
 * Priority-to-principle mapping.
 *
 * Add or edit rows here to change which principle is automatically selected
 * for an exact priority name. Matching ignores capitalization and surrounding
 * whitespace, but intentionally does not use partial or fuzzy matching.
 */
export const PRIORITY_PRINCIPLE_MAP = [
  { priority: "Rent", principle: "live" },
  { priority: "Mortgage", principle: "live" },
  { priority: "Property Tax", principle: "protect" },
  { priority: "Condo Fees", principle: "live" },
  { priority: "HOA Fees", principle: "live" },
  { priority: "Strata Fees", principle: "live" },
  { priority: "Lot Rent", principle: "live" },
  { priority: "Home Insurance", principle: "protect" },
  { priority: "Tenant Insurance", principle: "protect" },
  { priority: "Mortgage Insurance", principle: "protect" },
  { priority: "Flood Insurance", principle: "protect" },
  { priority: "Earthquake Insurance", principle: "protect" },
  { priority: "Car Insurance", principle: "protect" },
  { priority: "Insurance", principle: "protect" },
  { priority: "Electricity", principle: "live" },
  { priority: "Groceries", principle: "live" },
  { priority: "Food", principle: "live" },
  { priority: "Vacation", principle: "matters" },
  { priority: "Summer Vacation Fund", principle: "matters" },
  { priority: "Date Night", principle: "matters" },
  { priority: "Savings", principle: "future" },
];

export function normalizePriorityName(value) {
  return String(value ?? "").trim().toLowerCase();
}

const normalizedPriorityMap = new Map(
  PRIORITY_PRINCIPLE_MAP.map(({ priority, principle }) => [
    normalizePriorityName(priority),
    principle,
  ]),
);

export const PRIORITY_NAMES = PRIORITY_PRINCIPLE_MAP.map(({ priority }) => priority);

export function getPrincipleForExpense(priorityName) {
  return normalizedPriorityMap.get(normalizePriorityName(priorityName)) ?? "";
}

export function getPriorityNameSuggestion(value) {
  const normalizedValue = normalizePriorityName(value);
  if (!normalizedValue) return "";

  return PRIORITY_NAMES.find((priority) =>
    normalizePriorityName(priority).startsWith(normalizedValue)
  ) ?? "";
}

export function principleForPriority(priorityName, fallback = "protect") {
  return getPrincipleForExpense(priorityName) || fallback;
}
