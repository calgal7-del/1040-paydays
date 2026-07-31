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
  { priority: "Daycare", principle: "live" },
  { priority: "Childcare", principle: "live" },
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

export function assignUniquePriorityName(priorities, requestedName, excludeId = "") {
  const cleanName = String(requestedName ?? "").trim();
  const normalizedName = normalizePriorityName(cleanName);
  if (!normalizedName) return { priorities, name: "" };

  let nextNumber = 1;
  let hasMatchingFamily = false;
  let displayBaseName = cleanName;

  const numberedPriorities = priorities.map((priority) => {
    if (priority.id === excludeId) return priority;

    const existingName = String(priority.name ?? "").trim();
    const normalizedExisting = normalizePriorityName(existingName);

    if (normalizedExisting === normalizedName) {
      hasMatchingFamily = true;
      displayBaseName = existingName;
      nextNumber = Math.max(nextNumber, 2);
      return { ...priority, name: `${existingName} 1` };
    }

    const familyPrefix = `${normalizedName} `;
    if (!normalizedExisting.startsWith(familyPrefix)) return priority;

    const suffix = normalizedExisting.slice(familyPrefix.length);
    if (!/^\d+$/.test(suffix)) return priority;

    hasMatchingFamily = true;
    displayBaseName = existingName.slice(0, -(suffix.length + 1));
    nextNumber = Math.max(nextNumber, Number(suffix) + 1);
    return priority;
  });

  return {
    priorities: numberedPriorities,
    name: hasMatchingFamily ? `${displayBaseName} ${nextNumber}` : cleanName,
  };
}
