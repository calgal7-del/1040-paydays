import assert from "node:assert/strict";
import test from "node:test";

import {
  assignUniquePriorityName,
  getPrincipleForExpense,
  getPriorityNameSuggestion,
  normalizePriorityName,
  principleForPriority,
} from "../src/config/priorityPrincipleMap.mjs";

test("priority principle mapping ignores capitalization and surrounding spaces", () => {
  assert.equal(getPrincipleForExpense("  MORTGAGE  "), "live");
  assert.equal(getPrincipleForExpense("gRoCeRiEs"), "live");
  assert.equal(getPrincipleForExpense(" DAYCARE "), "live");
  assert.equal(getPrincipleForExpense("childcare"), "live");
  assert.equal(getPrincipleForExpense("DATE NIGHT"), "matters");
  assert.equal(getPrincipleForExpense("Savings"), "future");
  assert.equal(getPrincipleForExpense(" property tax "), "protect");
});

test("priority principle mapping uses exact matching only", () => {
  assert.equal(getPrincipleForExpense("Car Insurance"), "protect");
  assert.equal(getPrincipleForExpense("Insurance"), "protect");
  assert.equal(getPrincipleForExpense("Car Insurance Payment"), "");
  assert.equal(getPrincipleForExpense("Vacation Fund"), "");
});

test("unknown priority names preserve the supplied principle", () => {
  assert.equal(principleForPriority("New Priority", "future"), "future");
  assert.equal(principleForPriority("Custom Expense", "matters"), "matters");
});

test("inline suggestions prefer predefined names that begin with typed text", () => {
  assert.equal(getPriorityNameSuggestion("mort"), "Mortgage");
  assert.equal(getPriorityNameSuggestion("RENT"), "Rent");
  assert.equal(getPriorityNameSuggestion("  prop"), "Property Tax");
  assert.equal(getPriorityNameSuggestion("car ins"), "Car Insurance");
  assert.equal(getPriorityNameSuggestion("day"), "Daycare");
  assert.equal(getPriorityNameSuggestion("child"), "Childcare");
  assert.equal(getPriorityNameSuggestion("custom"), "");
});

test("priority normalization does not alter the displayed input value", () => {
  const displayedValue = "  rEnT ";
  assert.equal(normalizePriorityName(displayedValue), "rent");
  assert.equal(displayedValue, "  rEnT ");
});

test("duplicate priority names are numbered without losing existing data", () => {
  const mortgage = { id: "one", name: "Mortgage", bucket: "live", totalNeededMinor: 120000 };
  const firstDuplicate = assignUniquePriorityName([mortgage], "mortgage");

  assert.equal(firstDuplicate.priorities[0].name, "Mortgage 1");
  assert.equal(firstDuplicate.priorities[0].totalNeededMinor, 120000);
  assert.equal(firstDuplicate.name, "Mortgage 2");

  const secondDuplicate = assignUniquePriorityName(
    [...firstDuplicate.priorities, { id: "two", name: firstDuplicate.name }],
    "Mortgage",
  );
  assert.equal(secondDuplicate.name, "Mortgage 3");
});

test("a priority keeps its name when it is the only matching edit target", () => {
  const priorities = [{ id: "one", name: "Mortgage", bucket: "live" }];
  const result = assignUniquePriorityName(priorities, "Mortgage", "one");

  assert.equal(result.name, "Mortgage");
  assert.deepEqual(result.priorities, priorities);
});
