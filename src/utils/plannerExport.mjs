import {
  getPaydayAllocated,
  getPaydayAvailable,
  getPaydayRemaining,
  getPrincipleTotals,
  getPriorityFunded,
  getPriorityRemaining,
} from "./plannerCalculations.mjs";
import { PRINCIPLE_DETAILS } from "./plannerDefaults.mjs";

export async function exportPlannerWorkbook(planner) {
  const XLSX = await import("xlsx");
  const formatMinor = (value) => (Number(value) || 0) / 100;
  const summaryRows = [
    ["Planner", planner.name],
    ["Currency", planner.currency],
    ["Pay frequency", planner.frequency],
    ...Object.entries(getPrincipleTotals(planner.priorities)).map(
      ([principle, amount]) => [PRINCIPLE_DETAILS[principle].name, formatMinor(amount)],
    ),
    ["Available", formatMinor(planner.paydays.reduce((sum, payday) => sum + getPaydayAvailable(payday), 0))],
    ["Allocated", formatMinor(planner.paydays.reduce((sum, payday) => sum + getPaydayAllocated(payday.id, planner.priorities), 0))],
    ["Remaining", formatMinor(planner.paydays.reduce((sum, payday) => sum + getPaydayRemaining(payday.id, planner.paydays, planner.priorities), 0))],
  ];
  const paydayRows = planner.paydays.flatMap((payday) =>
    payday.sources.map((source) => ({
      Payday: payday.label,
      "Payday date": payday.date,
      Source: source.label,
      "Source received": source.receivedDate,
      Amount: formatMinor(source.amountMinor),
      Available: formatMinor(getPaydayAvailable(payday)),
      Allocated: formatMinor(getPaydayAllocated(payday.id, planner.priorities)),
      Remaining: formatMinor(getPaydayRemaining(payday.id, planner.paydays, planner.priorities)),
    })),
  );
  const priorityRows = planner.priorities.map((priority) => ({
    Priority: priority.name,
    Principle: PRINCIPLE_DETAILS[priority.principle].name,
    "Due type": priority.dueType,
    "Due date": priority.dueDate || "",
    "Total needed": formatMinor(priority.totalNeededMinor),
    Funded: formatMinor(getPriorityFunded(priority)),
    Remaining: formatMinor(getPriorityRemaining(priority)),
  }));
  const allocationRows = planner.priorities.flatMap((priority) =>
    priority.allocations.map((allocation) => {
      const payday = planner.paydays.find((entry) => entry.id === allocation.paydayId);
      return {
        Priority: priority.name,
        Payday: payday?.label || "",
        "Payday date": payday?.date || "",
        "Amount allocated": formatMinor(allocation.amountMinor),
      };
    }),
  );

  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, XLSX.utils.aoa_to_sheet(summaryRows), "Summary");
  XLSX.utils.book_append_sheet(workbook, XLSX.utils.json_to_sheet(paydayRows), "Paydays");
  XLSX.utils.book_append_sheet(workbook, XLSX.utils.json_to_sheet(priorityRows), "Priorities");
  XLSX.utils.book_append_sheet(workbook, XLSX.utils.json_to_sheet(allocationRows), "Allocations");
  XLSX.writeFile(workbook, `1040-Payday-Planner-${new Date().toISOString().slice(0, 10)}.xlsx`);
}
