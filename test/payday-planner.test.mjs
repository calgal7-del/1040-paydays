import test from "node:test";
import assert from "node:assert/strict";
import "fake-indexeddb/auto";
import {
  generatePaydayDates,
  getPaydayAllocated,
  getPaydayAvailable,
  getPaydayRemaining,
  getPrinciplePercentages,
  getPrincipleTotals,
  splitMinorUnitsEvenly,
  validateAllocations,
} from "../src/utils/plannerCalculations.mjs";
import { createPlanner, createPriority } from "../src/utils/plannerDefaults.mjs";
import {
  isValidMoneyDraft,
  minorToMoneyDraft,
  moneyDraftToMinor,
  syncMoneyDraft,
} from "../src/utils/moneyInput.mjs";
import {
  deleteAllPlannerData,
  loadCurrentPlanner,
  migratePlanner,
  savePlanner,
} from "../src/utils/plannerStorage.mjs";
import { createServer } from "vite";

const vite = await createServer({
  appType: "custom",
  logLevel: "silent",
  server: { middlewareMode: true },
});
const { plannerReducer } = await vite.ssrLoadModule(
  "/src/pages/PaydayPlanner/PaydayPlanner.jsx",
);
await vite.close();

test("calculates payday available, allocated, and remaining in integer cents", () => {
  const payday = {
    id: "payday-1",
    sources: [
      { amountMinor: 200000 },
      { amountMinor: 27550 },
    ],
  };
  const priorities = [
    {
      principle: "live-today",
      archived: false,
      allocations: [{ paydayId: "payday-1", amountMinor: 70000 }],
    },
    {
      principle: "protect-tomorrow",
      archived: false,
      allocations: [{ paydayId: "payday-1", amountMinor: 30500 }],
    },
  ];

  assert.equal(getPaydayAvailable(payday), 227550);
  assert.equal(getPaydayAllocated(payday.id, priorities), 100500);
  assert.equal(getPaydayRemaining(payday.id, [payday], priorities), 127050);
});

test("money drafts accept normal currency entry without early formatting", () => {
  for (const value of ["", "7", "7.5", "7.50", "1000", "1000.25", ".50"]) {
    assert.equal(isValidMoneyDraft(value), true, `${value} should be editable`);
  }
  for (const value of ["-1", "7.500", "1.2.3", "CAD 7", "$7"]) {
    assert.equal(isValidMoneyDraft(value), false, `${value} should be rejected`);
  }
});

test("money drafts commit exact integer cents on blur", () => {
  assert.equal(moneyDraftToMinor("7"), 700);
  assert.equal(moneyDraftToMinor("7.5"), 750);
  assert.equal(moneyDraftToMinor("7.50"), 750);
  assert.equal(moneyDraftToMinor("1000.25"), 100025);
  assert.equal(moneyDraftToMinor(".50"), 50);
  assert.equal(moneyDraftToMinor(""), 0);
  assert.equal(minorToMoneyDraft(100025), "1000.25");
});

test("active money drafts are not overwritten by autosave state updates", () => {
  assert.equal(syncMoneyDraft("7.", 0, true), "7.");
  assert.equal(syncMoneyDraft("", 0, true), "");
  assert.equal(syncMoneyDraft("7.", 750, false), "7.50");
});

test("calculates principle totals and percentages from allocations", () => {
  const priorities = [
    {
      principle: "live-today",
      archived: false,
      allocations: [{ paydayId: "one", amountMinor: 2500 }],
    },
    {
      principle: "protect-tomorrow",
      archived: false,
      allocations: [{ paydayId: "one", amountMinor: 7500 }],
    },
  ];

  assert.deepEqual(getPrincipleTotals(priorities), {
    "live-today": 2500,
    "protect-tomorrow": 7500,
    "plan-your-future": 0,
    "choose-what-matters": 0,
  });
  assert.deepEqual(getPrinciplePercentages(priorities), {
    "live-today": 25,
    "protect-tomorrow": 75,
    "plan-your-future": 0,
    "choose-what-matters": 0,
  });
});

test("splits integer cents evenly and places rounding remainder last", () => {
  assert.deepEqual(splitMinorUnitsEvenly(10000, 3), [3333, 3333, 3334]);
  assert.deepEqual(splitMinorUnitsEvenly(1, 2), [0, 1]);
  assert.deepEqual(splitMinorUnitsEvenly(100, 0), []);
});

test("generates weekly, biweekly, monthly, and semi-monthly dates", () => {
  assert.deepEqual(generatePaydayDates("weekly", "2026-01-02", 3), [
    "2026-01-02",
    "2026-01-09",
    "2026-01-16",
  ]);
  assert.deepEqual(generatePaydayDates("biweekly", "2026-01-02", 3), [
    "2026-01-02",
    "2026-01-16",
    "2026-01-30",
  ]);
  assert.deepEqual(generatePaydayDates("monthly", "2026-01-02", 3), [
    "2026-01-02",
    "2026-02-02",
    "2026-03-02",
  ]);
  assert.deepEqual(generatePaydayDates("semimonthly", "2026-01-01", 4), [
    "2026-01-01",
    "2026-01-15",
    "2026-02-01",
    "2026-02-15",
  ]);
});

test("reports malformed or orphaned allocations without blocking incomplete plans", () => {
  const planner = {
    paydays: [{ id: "known" }],
    priorities: [
      {
        id: "priority",
        allocations: [
          { paydayId: "known", amountMinor: 0 },
          { paydayId: "missing", amountMinor: 100 },
        ],
      },
    ],
  };
  assert.equal(validateAllocations(planner).length, 1);
});

test("validates, saves, and reloads a planner from IndexedDB", async () => {
  await deleteAllPlannerData();
  const planner = createPlanner();
  const priority = {
    ...createPriority("Emergency Fund", "protect-tomorrow", "goal"),
    totalNeededMinor: 100025,
    order: 0,
  };
  planner.priorities = [priority];
  planner.paydays[0].sources[0].amountMinor = 750;
  await savePlanner(planner);
  const saved = await loadCurrentPlanner();
  assert.equal(saved.id, planner.id);
  assert.equal(saved.priorities[0].name, "Emergency Fund");
  assert.equal(saved.priorities[0].totalNeededMinor, 100025);
  assert.equal(saved.paydays[0].sources[0].amountMinor, 750);
  await deleteAllPlannerData();
});

test("schema migration accepts valid older data and rejects malformed data", () => {
  const planner = createPlanner();
  planner.schemaVersion = 0;
  assert.equal(migratePlanner(planner)?.schemaVersion, 1);
  assert.equal(migratePlanner({ id: "broken" }), null);
});

test("planner actions add sources and priorities, assign two paydays, and split evenly", () => {
  let planner = createPlanner();
  const firstPayday = planner.paydays[0];
  const secondPayday = planner.paydays[1];

  planner = plannerReducer(planner, {
    type: "add-source",
    paydayId: firstPayday.id,
  });
  assert.equal(planner.paydays[0].sources.length, 2);

  planner = plannerReducer(planner, {
    type: "add-priority",
    name: "Mortgage",
    principle: "protect-tomorrow",
    dueType: "monthly",
  });
  const priorityId = planner.priorities[0].id;
  planner = plannerReducer(planner, {
    type: "update-priority",
    id: priorityId,
    changes: { totalNeededMinor: 10000 },
  });
  planner = plannerReducer(planner, {
    type: "toggle-allocation",
    priorityId,
    paydayId: firstPayday.id,
  });
  planner = plannerReducer(planner, {
    type: "toggle-allocation",
    priorityId,
    paydayId: secondPayday.id,
  });
  planner = plannerReducer(planner, {
    type: "split-allocation",
    priorityId,
  });

  assert.deepEqual(
    planner.priorities[0].allocations.map(({ amountMinor }) => amountMinor),
    [5000, 5000],
  );
});

test("money updates target the correct source, priority, and payday allocation", () => {
  let planner = createPlanner();
  const [firstPayday, secondPayday] = planner.paydays;
  const firstSource = firstPayday.sources[0];
  const untouchedSource = secondPayday.sources[0];

  planner = plannerReducer(planner, {
    type: "update-source",
    paydayId: firstPayday.id,
    sourceId: firstSource.id,
    changes: { amountMinor: 100025 },
  });
  assert.equal(planner.paydays[0].sources[0].amountMinor, 100025);
  assert.equal(planner.paydays[1].sources[0].amountMinor, untouchedSource.amountMinor);

  planner = plannerReducer(planner, {
    type: "add-priority",
    name: "Emergency Fund",
    principle: "protect-tomorrow",
    dueType: "goal",
  });
  const priorityId = planner.priorities[0].id;
  planner = plannerReducer(planner, {
    type: "update-priority",
    id: priorityId,
    changes: { totalNeededMinor: 250050 },
  });
  planner = plannerReducer(planner, {
    type: "toggle-allocation",
    priorityId,
    paydayId: firstPayday.id,
  });
  planner = plannerReducer(planner, {
    type: "allocation",
    priorityId,
    paydayId: firstPayday.id,
    amountMinor: 5000,
  });
  assert.equal(planner.priorities[0].totalNeededMinor, 250050);
  assert.deepEqual(planner.priorities[0].allocations, [
    { paydayId: firstPayday.id, amountMinor: 5000 },
  ]);
});

test("planner actions reorder, archive, and delete priorities without mutating prior state", () => {
  const initial = createPlanner();
  const withFirst = plannerReducer(initial, {
    type: "add-priority",
    name: "First",
    principle: "live-today",
    dueType: "flexible",
  });
  const withSecond = plannerReducer(withFirst, {
    type: "add-priority",
    name: "Second",
    principle: "plan-your-future",
    dueType: "goal",
  });
  const reordered = plannerReducer(withSecond, {
    type: "reorder-priorities",
    priorities: [withSecond.priorities[1], withSecond.priorities[0]],
  });
  assert.deepEqual(reordered.priorities.map(({ name }) => name), ["Second", "First"]);
  assert.deepEqual(withSecond.priorities.map(({ name }) => name), ["First", "Second"]);

  const archived = plannerReducer(reordered, {
    type: "update-priority",
    id: reordered.priorities[0].id,
    changes: { archived: true },
  });
  assert.equal(archived.priorities[0].archived, true);

  const deleted = plannerReducer(archived, {
    type: "delete-priority",
    id: archived.priorities[0].id,
  });
  assert.equal(deleted.priorities.length, 1);
  assert.equal(deleted.priorities[0].order, 0);
});
