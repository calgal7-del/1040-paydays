import { deleteDB, openDB } from "idb";
import { z } from "zod";

const DB_NAME = "1040-payday-planner";
const DB_VERSION = 1;
const PLANNER_STORE = "planners";
const TEMPLATE_STORE = "templates";
const PREFERENCE_STORE = "preferences";
const CURRENT_PLANNER_KEY = "current";
const LAST_PLANNER_KEY = "last";
let dbPromise;

const allocationSchema = z.object({
  paydayId: z.string(),
  amountMinor: z.number().int().nonnegative(),
});

const sourceSchema = z.object({
  id: z.string(),
  label: z.string(),
  receivedDate: z.string(),
  amountMinor: z.number().int().nonnegative(),
});

const paydaySchema = z.object({
  id: z.string(),
  label: z.string(),
  date: z.string(),
  accentIndex: z.number().int(),
  sources: z.array(sourceSchema),
});

const prioritySchema = z.object({
  id: z.string(),
  name: z.string(),
  principle: z.enum([
    "live-today",
    "protect-tomorrow",
    "plan-your-future",
    "choose-what-matters",
  ]),
  dueType: z.string(),
  dueDate: z.string().optional(),
  recurrence: z.string().optional(),
  totalNeededMinor: z.number().int().nonnegative(),
  allocations: z.array(allocationSchema),
  notes: z.string().optional(),
  order: z.number(),
  archived: z.boolean(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export const plannerSchema = z.object({
  schemaVersion: z.number().int(),
  id: z.string(),
  name: z.string(),
  currency: z.enum(["CAD", "USD", "GBP", "EUR", "AUD", "NZD"]),
  frequency: z.enum(["weekly", "biweekly", "semimonthly", "monthly", "irregular"]),
  selectedPaydayId: z.string().optional(),
  paydays: z.array(paydaySchema),
  priorities: z.array(prioritySchema),
  createdAt: z.string(),
  updatedAt: z.string(),
});

function migratePlanner(value) {
  if (!value || typeof value !== "object") return null;
  const migrated = { ...value, schemaVersion: 1 };
  const parsed = plannerSchema.safeParse(migrated);
  return parsed.success ? parsed.data : null;
}

async function database() {
  if (!dbPromise) {
    dbPromise = openDB(DB_NAME, DB_VERSION, {
      upgrade(db) {
        if (!db.objectStoreNames.contains(PLANNER_STORE)) db.createObjectStore(PLANNER_STORE);
        if (!db.objectStoreNames.contains(TEMPLATE_STORE)) db.createObjectStore(TEMPLATE_STORE);
        if (!db.objectStoreNames.contains(PREFERENCE_STORE)) db.createObjectStore(PREFERENCE_STORE);
      },
    });
  }
  return dbPromise;
}

export async function loadCurrentPlanner() {
  try {
    return migratePlanner(
      await (await database()).get(PLANNER_STORE, CURRENT_PLANNER_KEY),
    );
  } catch {
    return null;
  }
}

export async function loadLastPlanner() {
  try {
    return migratePlanner(
      await (await database()).get(PLANNER_STORE, LAST_PLANNER_KEY),
    );
  } catch {
    return null;
  }
}

export async function savePlanner(planner) {
  const parsed = plannerSchema.safeParse(planner);
  if (!parsed.success) throw new Error("Planner data could not be saved safely.");
  const db = await database();
  await db.put(PLANNER_STORE, parsed.data, CURRENT_PLANNER_KEY);
  await db.put(PLANNER_STORE, parsed.data, LAST_PLANNER_KEY);
  return parsed.data;
}

export async function deleteCurrentPlanner() {
  const db = await database();
  await db.delete(PLANNER_STORE, CURRENT_PLANNER_KEY);
}

export async function loadTemplates() {
  try {
    return (await database()).getAll(TEMPLATE_STORE);
  } catch {
    return [];
  }
}

export async function saveTemplate(template) {
  await (await database()).put(TEMPLATE_STORE, template, template.id);
}

export async function deleteTemplate(id) {
  await (await database()).delete(TEMPLATE_STORE, id);
}

export async function hasShownFirstSaveNotice() {
  try {
    return Boolean(
      await (await database()).get(PREFERENCE_STORE, "first-save-notice"),
    );
  } catch {
    return false;
  }
}

export async function markFirstSaveNoticeShown() {
  await (await database()).put(PREFERENCE_STORE, true, "first-save-notice");
}

export async function deleteAllPlannerData() {
  try {
    if (dbPromise) (await dbPromise).close();
    dbPromise = undefined;
    await deleteDB(DB_NAME);
  } catch {
    // The screen still resets even if storage is blocked.
  }
}

export { migratePlanner };
