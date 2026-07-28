import { generatePaydayDates } from "./plannerCalculations.mjs";

/**
 * @typedef {"CAD"|"USD"|"GBP"|"EUR"|"AUD"|"NZD"} CurrencyCode
 * @typedef {"weekly"|"biweekly"|"semimonthly"|"monthly"|"irregular"} PayFrequency
 * @typedef {"live-today"|"protect-tomorrow"|"plan-your-future"|"choose-what-matters"} Principle
 * @typedef {"specific-date"|"every-payday"|"weekly"|"biweekly"|"semimonthly"|"monthly"|"flexible"|"goal"} DueType
 * @typedef {{id:string,label:string,receivedDate:string,amountMinor:number}} MoneySource
 * @typedef {{id:string,label:string,date:string,accentIndex:number,sources:MoneySource[]}} Payday
 * @typedef {{paydayId:string,amountMinor:number}} PaydayAllocation
 * @typedef {{id:string,name:string,principle:Principle,dueType:DueType,dueDate?:string,recurrence?:string,totalNeededMinor:number,allocations:PaydayAllocation[],notes?:string,order:number,archived:boolean,createdAt:string,updatedAt:string}} Priority
 * @typedef {{schemaVersion:number,id:string,name:string,currency:CurrencyCode,frequency:PayFrequency,selectedPaydayId?:string,paydays:Payday[],priorities:Priority[],createdAt:string,updatedAt:string}} Planner
 */

export const CURRENCIES = ["CAD", "USD", "GBP", "EUR", "AUD", "NZD"];
export const FREQUENCIES = [
  ["weekly", "Weekly"],
  ["biweekly", "Biweekly"],
  ["semimonthly", "Semi-monthly"],
  ["monthly", "Monthly"],
  ["irregular", "Irregular / Custom"],
];

export const DUE_TYPES = [
  ["specific-date", "Specific Date"],
  ["every-payday", "Every Payday"],
  ["weekly", "Weekly"],
  ["biweekly", "Biweekly"],
  ["semimonthly", "Semi-monthly"],
  ["monthly", "Monthly"],
  ["flexible", "Flexible"],
  ["goal", "Goal"],
];

export const PRINCIPLE_DETAILS = {
  "live-today": { name: "Live Today", icon: "sun" },
  "protect-tomorrow": { name: "Protect Tomorrow", icon: "shield" },
  "plan-your-future": { name: "Plan Your Future", icon: "chart" },
  "choose-what-matters": { name: "Choose What Matters", icon: "heart" },
};

export const PRIORITY_SUGGESTIONS = [
  ["Mortgage", "protect-tomorrow", "monthly"],
  ["Rent", "protect-tomorrow", "monthly"],
  ["Utilities", "protect-tomorrow", "monthly"],
  ["Groceries", "live-today", "every-payday"],
  ["Fuel", "live-today", "every-payday"],
  ["Childcare", "protect-tomorrow", "monthly"],
  ["Emergency Fund", "protect-tomorrow", "goal"],
  ["Debt Repayment", "protect-tomorrow", "monthly"],
  ["Retirement", "plan-your-future", "goal"],
  ["Investments", "plan-your-future", "goal"],
  ["Vacation", "choose-what-matters", "flexible"],
  ["Dining Out", "choose-what-matters", "flexible"],
  ["Other / Catch All", "live-today", "flexible"],
];

export function createId(prefix = "planner") {
  if (globalThis.crypto?.randomUUID) return globalThis.crypto.randomUUID();
  return `${prefix}-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

export function todayISO() {
  return new Date().toISOString().slice(0, 10);
}

function createPayday(date, index, sourceLabel = "Main Job") {
  return {
    id: createId("payday"),
    label: `Payday ${index + 1}`,
    date,
    accentIndex: index % 4,
    sources: [
      {
        id: createId("source"),
        label: sourceLabel,
        receivedDate: date,
        amountMinor: 0,
      },
    ],
  };
}

export function createPlanner({
  name = "My Payday Plan",
  currency = "CAD",
  frequency = "biweekly",
  paydayCount = 4,
} = {}) {
  const dates = generatePaydayDates(
    frequency,
    todayISO(),
    frequency === "irregular" ? 1 : paydayCount,
  );
  const timestamp = new Date().toISOString();
  const paydays = dates.map((date, index) => createPayday(date, index));
  return {
    schemaVersion: 1,
    id: createId(),
    name,
    currency,
    frequency,
    selectedPaydayId: paydays[0]?.id,
    paydays,
    priorities: [],
    createdAt: timestamp,
    updatedAt: timestamp,
  };
}

export function createPriority(name, principle, dueType) {
  const timestamp = new Date().toISOString();
  return {
    id: createId("priority"),
    name,
    principle,
    dueType,
    dueDate: "",
    recurrence: dueType,
    totalNeededMinor: 0,
    allocations: [],
    notes: "",
    order: 0,
    archived: false,
    createdAt: timestamp,
    updatedAt: timestamp,
  };
}

export const STARTER_TEMPLATES = [
  {
    id: "starter-simple",
    name: "Simple Starter",
    builtIn: true,
    frequency: "biweekly",
    sourceLabels: ["Main Job"],
    priorities: [
      ["Housing", "protect-tomorrow", "monthly"],
      ["Groceries", "live-today", "every-payday"],
      ["Emergency Fund", "protect-tomorrow", "goal"],
      ["Other / Catch All", "choose-what-matters", "flexible"],
    ],
  },
  {
    id: "starter-two-income",
    name: "Two Income Household",
    builtIn: true,
    frequency: "biweekly",
    sourceLabels: ["Main Job", "Partner Income"],
    priorities: [
      ["Housing", "protect-tomorrow", "monthly"],
      ["Groceries", "live-today", "every-payday"],
      ["Retirement", "plan-your-future", "goal"],
      ["Family Plans", "choose-what-matters", "flexible"],
    ],
  },
  ...[
    ["Single Income", "biweekly"],
    ["Weekly Pay", "weekly"],
    ["Biweekly Pay", "biweekly"],
    ["Monthly Pay", "monthly"],
    ["Irregular Income", "irregular"],
  ].map(([name, frequency]) => ({
    id: `starter-${frequency}-${name.toLowerCase().replaceAll(" ", "-")}`,
    name,
    builtIn: true,
    frequency,
    sourceLabels: ["Main Job"],
    priorities: [],
  })),
];
