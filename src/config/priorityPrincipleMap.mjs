/**
 * Priority-to-principle mapping.
 *
 * Add or edit rows here to change which principle is automatically selected
 * for a priority name. Matching ignores capitalization and punctuation.
 * A row also matches the phrase inside a longer name, so "Car Insurance"
 * uses the "insurance" row.
 */
export const PRIORITY_PRINCIPLE_MAP = [
  { priority: "mortgage", principle: "live" },
  { priority: "rent", principle: "live" },
  { priority: "insurance", principle: "protect" },
  { priority: "groceries", principle: "live" },
  { priority: "food", principle: "live" },
  { priority: "vacation", principle: "matters" },
  { priority: "date night", principle: "matters" },
  { priority: "savings", principle: "future" },
];

const normalizePriorityName = (value = "") =>
  value
    .toLocaleLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim();

export function principleForPriority(priorityName, fallback = "protect") {
  const normalizedName = normalizePriorityName(priorityName);

  const match = PRIORITY_PRINCIPLE_MAP.find(({ priority }) => {
    const normalizedPriority = normalizePriorityName(priority);
    return (
      normalizedName === normalizedPriority ||
      normalizedName.includes(`${normalizedPriority} `) ||
      normalizedName.includes(` ${normalizedPriority}`)
    );
  });

  return match?.principle || fallback;
}
