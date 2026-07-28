export const PRINCIPLES = [
  "live-today",
  "protect-tomorrow",
  "plan-your-future",
  "choose-what-matters",
];

export function getPaydayAvailable(payday) {
  return (payday?.sources || []).reduce(
    (total, source) => total + Math.max(0, Number(source.amountMinor) || 0),
    0,
  );
}

export function getPaydayAllocated(paydayId, priorities) {
  return (priorities || []).reduce(
    (total, priority) =>
      priority.archived
        ? total
        : total +
          (priority.allocations || [])
            .filter((allocation) => allocation.paydayId === paydayId)
            .reduce(
              (subtotal, allocation) =>
                subtotal + Math.max(0, Number(allocation.amountMinor) || 0),
              0,
            ),
    0,
  );
}

export function getPaydayRemaining(paydayId, paydays, priorities) {
  const payday = (paydays || []).find((entry) => entry.id === paydayId);
  return getPaydayAvailable(payday) - getPaydayAllocated(paydayId, priorities);
}

export function getPriorityFunded(priority) {
  return (priority?.allocations || []).reduce(
    (total, allocation) =>
      total + Math.max(0, Number(allocation.amountMinor) || 0),
    0,
  );
}

export function getPriorityRemaining(priority) {
  return Math.max(
    0,
    (Number(priority?.totalNeededMinor) || 0) - getPriorityFunded(priority),
  );
}

export function getPrincipleTotals(priorities) {
  const totals = Object.fromEntries(PRINCIPLES.map((principle) => [principle, 0]));
  for (const priority of priorities || []) {
    if (!priority.archived && Object.hasOwn(totals, priority.principle)) {
      totals[priority.principle] += getPriorityFunded(priority);
    }
  }
  return totals;
}

export function getPrinciplePercentages(priorities) {
  const totals = getPrincipleTotals(priorities);
  const allocated = Object.values(totals).reduce((sum, amount) => sum + amount, 0);
  return Object.fromEntries(
    PRINCIPLES.map((principle) => [
      principle,
      allocated === 0 ? 0 : Math.round((totals[principle] / allocated) * 100),
    ]),
  );
}

export function splitMinorUnitsEvenly(totalMinor, count) {
  const safeTotal = Math.max(0, Math.round(Number(totalMinor) || 0));
  const safeCount = Math.max(0, Math.floor(Number(count) || 0));
  if (!safeCount) return [];
  const base = Math.floor(safeTotal / safeCount);
  const values = Array.from({ length: safeCount }, () => base);
  values[safeCount - 1] += safeTotal - base * safeCount;
  return values;
}

function toISODate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function safeDate(value) {
  const [year, month, day] = String(value || "").split("-").map(Number);
  return new Date(year || 2026, Math.max(0, (month || 1) - 1), day || 1, 12);
}

export function generatePaydayDates(frequency, firstDate, count = 4) {
  const start = safeDate(firstDate);
  const total = Math.max(1, Math.floor(Number(count) || 1));
  const dates = [];

  for (let index = 0; index < total; index += 1) {
    const date = new Date(start);
    if (frequency === "weekly") date.setDate(start.getDate() + index * 7);
    if (frequency === "biweekly") date.setDate(start.getDate() + index * 14);
    if (frequency === "monthly") date.setMonth(start.getMonth() + index);
    if (frequency === "semimonthly") {
      const firstDay = start.getDate();
      const firstHalf = firstDay <= 15;
      const monthOffset = Math.floor((index + (firstHalf ? 0 : 1)) / 2);
      date.setMonth(start.getMonth() + monthOffset);
      date.setDate((index + (firstHalf ? 0 : 1)) % 2 === 0 ? firstDay : 15);
    }
    if (frequency === "irregular" && index > 0) {
      date.setDate(start.getDate() + index * 14);
    }
    dates.push(toISODate(date));
  }
  return dates;
}

export function validateAllocations(planner) {
  const paydayIds = new Set((planner?.paydays || []).map((payday) => payday.id));
  return (planner?.priorities || []).flatMap((priority) =>
    (priority.allocations || [])
      .filter(
        (allocation) =>
          !paydayIds.has(allocation.paydayId) ||
          !Number.isInteger(allocation.amountMinor) ||
          allocation.amountMinor < 0,
      )
      .map((allocation) => ({
        priorityId: priority.id,
        paydayId: allocation.paydayId,
        message: "Allocation must use an existing payday and zero or more cents.",
      })),
  );
}

