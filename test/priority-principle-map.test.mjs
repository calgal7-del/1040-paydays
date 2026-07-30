import assert from "node:assert/strict";
import test from "node:test";

import { principleForPriority } from "../src/config/priorityPrincipleMap.mjs";

test("priority principle mapping ignores capitalization", () => {
  assert.equal(principleForPriority("MORTGAGE"), "live");
  assert.equal(principleForPriority("gRoCeRiEs"), "live");
  assert.equal(principleForPriority("DATE NIGHT"), "matters");
  assert.equal(principleForPriority("Savings"), "future");
});

test("priority principle mapping recognizes mapped words inside longer names", () => {
  assert.equal(principleForPriority("Car Insurance"), "protect");
  assert.equal(principleForPriority("Summer Vacation Fund"), "matters");
});

test("unknown priority names preserve their selected principle", () => {
  assert.equal(principleForPriority("New Priority", "future"), "future");
});
