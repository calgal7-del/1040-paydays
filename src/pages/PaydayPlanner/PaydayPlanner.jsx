import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowLeft,
  BookOpen,
  BriefcaseBusiness,
  Calculator,
  CalendarDays,
  CalendarRange,
  Check,
  ChevronDown,
  ChevronUp,
  Download,
  Heart,
  Home,
  Info,
  Mail,
  Menu,
  MoreHorizontal,
  Plus,
  RefreshCw,
  RotateCcw,
  ShieldCheck,
  Sparkles,
  Sun,
  Target,
  Trash2,
  TrendingUp,
  Trophy,
  WalletCards,
  X,
} from "lucide-react";
import { splitMinorUnitsEvenly } from "../../utils/plannerCalculations.mjs";
import { createId, createPriority } from "../../utils/plannerDefaults.mjs";
import {
  assignUniquePriorityName,
  getPrincipleForExpense,
  getPriorityNameSuggestion,
  normalizePriorityName,
} from "../../config/priorityPrincipleMap.mjs";
import "./PaydayPlanner.css";
import MobilePriorityCard from "../../components/MobilePriorityCard";

const STORAGE_KEY = "1040-paydays-payday-planner-v4";

const CURRENCIES = {
  USD: { symbol: "$", locale: "en-US" },
  GBP: { symbol: "£", locale: "en-GB" },
  EUR: { symbol: "€", locale: "en-IE" },
};

const BUCKETS = {
  live: {
    name: "Live Today",
    short: "Live Today",
    icon: Sun,
    className: "is-live",
  },
  protect: {
    name: "Protect Tomorrow",
    short: "Protect",
    icon: ShieldCheck,
    className: "is-protect",
  },
  future: {
    name: "Plan Your Future",
    short: "Future",
    icon: TrendingUp,
    className: "is-future",
  },
  matters: {
    name: "Choose What Matters",
    short: "What Matters",
    icon: Heart,
    className: "is-matters",
  },
};

const INITIAL_DATA = {
  currency: "USD",
  frequency: "biweekly",
  paydays: [
    {
      id: "p1",
      label: "Payday 1",
      date: "2026-07-27",
      status: "Ready",
      incomes: [
        { id: "i1", name: "Main Job", receivedDate: "2026-07-27", amountMinor: 150000 },
        { id: "i2", name: "Freelance", receivedDate: "2026-07-27", amountMinor: 701 },
      ],
    },
    {
      id: "p2",
      label: "Payday 2",
      date: "2026-08-10",
      status: "In Progress",
      incomes: [{ id: "i3", name: "Main Job", receivedDate: "2026-08-10", amountMinor: 150000 }],
    },
    {
      id: "p3",
      label: "Payday 3",
      date: "2026-08-24",
      status: "In Progress",
      incomes: [{ id: "i4", name: "Main Job", receivedDate: "2026-08-24", amountMinor: 148000 }],
    },
    {
      id: "p4",
      label: "Payday 4",
      date: "2026-09-07",
      status: "Needs Review",
      incomes: [{ id: "i5", name: "Main Job", receivedDate: "2026-09-07", amountMinor: 150000 }],
    },
  ],
  priorities: [
    {
      id: "mortgage",
      name: "Mortgage",
      bucket: "live",
      due: "2026-08-10",
      frequency: "Monthly",
      totalNeededMinor: 120000,
      autoPaydays: { p1: false, p2: false, p3: false, p4: false },
      allocations: { p1: 60000, p2: 60000, p3: 0, p4: 0 },
    },
    {
      id: "groceries",
      name: "Groceries",
      bucket: "live",
      due: "",
      frequency: "Ongoing",
      totalNeededMinor: 25000,
      autoPaydays: { p1: false, p2: false, p3: false, p4: false },
      allocations: { p1: 700, p2: 700, p3: 700, p4: 700 },
    },
    {
      id: "emergency",
      name: "Emergency Fund",
      bucket: "protect",
      due: "",
      frequency: "Flexible",
      totalNeededMinor: 100000,
      autoPaydays: { p1: false, p2: false, p3: false, p4: false },
      allocations: { p1: 0, p2: 0, p3: 0, p4: 0 },
    },
    {
      id: "vacation",
      name: "Vacation",
      bucket: "matters",
      due: "",
      frequency: "Flexible",
      totalNeededMinor: 150000,
      autoPaydays: { p1: false, p2: false, p3: false, p4: false },
      allocations: { p1: 0, p2: 0, p3: 0, p4: 0 },
    },
    {
      id: "date-night",
      name: "Date Night",
      bucket: "matters",
      due: "",
      frequency: "Ongoing",
      totalNeededMinor: 10000,
      autoPaydays: { p1: false, p2: false, p3: false, p4: false },
      allocations: { p1: 2500, p2: 2500, p3: 2500, p4: 2500 },
    },
  ],
};

function createEmptyPlannerData(current = INITIAL_DATA) {
  return {
    ...INITIAL_DATA,
    currency: current.currency || INITIAL_DATA.currency,
    frequency: current.frequency || INITIAL_DATA.frequency,
    paydays: INITIAL_DATA.paydays.map((payday) => ({
      ...payday,
      date: "",
      status: "Ready",
      incomes: [],
    })),
    priorities: [],
  };
}

const money = (minor, currency = "USD") =>
  new Intl.NumberFormat(CURRENCIES[currency]?.locale || "en-US", {
    style: "currency",
    currency: CURRENCIES[currency] ? currency : "USD",
    minimumFractionDigits: 2,
  }).format((minor || 0) / 100);

const shortMoney = (minor, currency = "USD") =>
  new Intl.NumberFormat(CURRENCIES[currency]?.locale || "en-US", {
    style: "currency",
    currency: CURRENCIES[currency] ? currency : "USD",
    maximumFractionDigits: 0,
  }).format((minor || 0) / 100);

export const formatPaydayDate = (iso) => {
  if (!iso) return "Date not set";
  return new Intl.DateTimeFormat("en-CA", {
    month: "short",
    day: "numeric",
  }).format(new Date(`${iso}T12:00:00`));
};

function FormattedDateField({
  value,
  onChange,
  ariaLabel,
  className = "",
  emptyLabel = "Set date",
}) {
  return (
    <label className={`pp-formatted-date ${className}`}>
      <CalendarDays size={14} aria-hidden="true" />
      <span>{value ? formatPaydayDate(value) : emptyLabel}</span>
      <input
        aria-label={ariaLabel}
        type="date"
        value={value || ""}
        onChange={onChange}
        onClick={(event) => {
          try {
            event.currentTarget.showPicker?.();
          } catch {
            // The native date control still opens normally where showPicker is unavailable.
          }
        }}
      />
    </label>
  );
}

const id = (prefix) =>
  `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`;

const FREQUENCIES = {
  weekly: { label: "Weekly", count: 4 },
  biweekly: { label: "Biweekly (Every 2 Weeks)", count: 2 },
  monthly: { label: "Monthly", count: 1 },
};

function visiblePaydaysFor(data) {
  return data.paydays.slice(0, FREQUENCIES[data.frequency]?.count || 2);
}

function dateForFrequency(baseIso, frequency, index) {
  if (!baseIso) return "";
  const date = new Date(`${baseIso}T12:00:00`);
  if (frequency === "monthly") {
    date.setMonth(date.getMonth() + index);
  } else {
    date.setDate(date.getDate() + index * (frequency === "weekly" ? 7 : 14));
  }
  return date.toISOString().slice(0, 10);
}

function shiftDateWithPayday(dateIso, previousPaydayDate, nextPaydayDate) {
  if (!dateIso || !previousPaydayDate || !nextPaydayDate) return dateIso;
  const previous = new Date(`${previousPaydayDate}T12:00:00`);
  const next = new Date(`${nextPaydayDate}T12:00:00`);
  const date = new Date(`${dateIso}T12:00:00`);
  date.setTime(date.getTime() + (next.getTime() - previous.getTime()));
  return date.toISOString().slice(0, 10);
}

function reschedulePaydays(paydays, frequency, startIndex, baseDate) {
  return paydays.map((payday, index) => {
    if (index < startIndex) return payday;
    const nextDate = dateForFrequency(baseDate, frequency, index - startIndex);
    return {
      ...payday,
      date: nextDate,
      incomes: payday.incomes.map((income, incomeIndex) =>
        incomeIndex === 0
          ? { ...income, receivedDate: nextDate }
          : {
              ...income,
              receivedDate: shiftDateWithPayday(
                income.receivedDate,
                payday.date,
                nextDate,
              ),
            },
      ),
    };
  });
}

function stampPlanner(planner) {
  return { ...planner, updatedAt: new Date().toISOString() };
}

function normalizePriorityOrder(priorities) {
  return priorities.map((priority, order) => ({ ...priority, order }));
}

// Retained as a pure export for the planner's legacy data-model tests and
// migrations. The redesigned interface below uses a smaller view model.
export function plannerReducer(state, action) {
  const update = (changes) => stampPlanner({ ...state, ...changes });
  switch (action.type) {
    case "add-source":
      return update({
        paydays: state.paydays.map((payday) =>
          payday.id === action.paydayId
            ? {
                ...payday,
                sources: [
                  ...payday.sources,
                  {
                    id: createId("source"),
                    label: "Other",
                    receivedDate: payday.date,
                    amountMinor: 0,
                  },
                ],
              }
            : payday,
        ),
      });
    case "update-source":
      return update({
        paydays: state.paydays.map((payday) =>
          payday.id === action.paydayId
            ? {
                ...payday,
                sources: payday.sources.map((source) =>
                  source.id === action.sourceId
                    ? { ...source, ...action.changes }
                    : source,
                ),
              }
            : payday,
        ),
      });
    case "add-priority": {
      const priority = createPriority(
        action.name,
        action.principle,
        action.dueType,
      );
      return update({
        priorities: [
          ...state.priorities,
          { ...priority, order: state.priorities.length },
        ],
      });
    }
    case "update-priority":
      return update({
        priorities: state.priorities.map((priority) =>
          priority.id === action.id
            ? {
                ...priority,
                ...action.changes,
                updatedAt: new Date().toISOString(),
              }
            : priority,
        ),
      });
    case "toggle-allocation":
      return update({
        priorities: state.priorities.map((priority) => {
          if (priority.id !== action.priorityId) return priority;
          const exists = priority.allocations.some(
            (allocation) => allocation.paydayId === action.paydayId,
          );
          return {
            ...priority,
            allocations: exists
              ? priority.allocations.filter(
                  (allocation) => allocation.paydayId !== action.paydayId,
                )
              : [
                  ...priority.allocations,
                  { paydayId: action.paydayId, amountMinor: 0 },
                ],
          };
        }),
      });
    case "allocation":
      return update({
        priorities: state.priorities.map((priority) =>
          priority.id !== action.priorityId
            ? priority
            : {
                ...priority,
                allocations: priority.allocations.map((allocation) =>
                  allocation.paydayId === action.paydayId
                    ? { ...allocation, amountMinor: action.amountMinor }
                    : allocation,
                ),
              },
        ),
      });
    case "split-allocation":
      return update({
        priorities: state.priorities.map((priority) => {
          if (priority.id !== action.priorityId) return priority;
          const values = splitMinorUnitsEvenly(
            priority.totalNeededMinor,
            priority.allocations.length,
          );
          return {
            ...priority,
            allocations: priority.allocations.map((allocation, index) => ({
              ...allocation,
              amountMinor: values[index],
            })),
          };
        }),
      });
    case "reorder-priorities":
      return update({
        priorities: normalizePriorityOrder(action.priorities),
      });
    case "delete-priority":
      return update({
        priorities: normalizePriorityOrder(
          state.priorities.filter((priority) => priority.id !== action.id),
        ),
      });
    default:
      return state;
  }
}

function sum(values) {
  return values.reduce((total, value) => total + (Number(value) || 0), 0);
}

function paydayIncome(payday) {
  return sum(payday.incomes.map((income) => income.amountMinor));
}

function paydayAssigned(data, paydayId) {
  return sum(data.priorities.map((priority) => priority.allocations[paydayId] || 0));
}

function priorityFunded(priority) {
  return sum(Object.values(priority.allocations));
}

function priorityPercent(priority) {
  if (!priority.totalNeededMinor) return 0;
  return (priorityFunded(priority) / priority.totalNeededMinor) * 100;
}

function MoneyField({
  valueMinor,
  onChangeMinor,
  ariaLabel,
  currency = "USD",
  className = "",
}) {
  const [draft, setDraft] = useState((valueMinor / 100).toFixed(2));
  const focused = useRef(false);

  useEffect(() => {
    if (!focused.current) setDraft((valueMinor / 100).toFixed(2));
  }, [valueMinor]);

  return (
    <div className={`pp-money-input ${className}`}>
      <span aria-hidden="true">{CURRENCIES[currency]?.symbol || "$"}</span>
      <input
        aria-label={ariaLabel}
        inputMode="decimal"
        min="0"
        step="0.01"
        type="number"
        value={draft}
        onFocus={() => {
          focused.current = true;
        }}
        onChange={(event) => {
          const next = event.target.value;
          setDraft(next);
          if (next === "") {
            onChangeMinor(0);
            return;
          }
          const parsed = Number(next);
          if (Number.isFinite(parsed) && parsed >= 0) {
            onChangeMinor(Math.round(parsed * 100));
          }
        }}
        onBlur={() => {
          focused.current = false;
          const parsed = Number(draft);
          const committed = Number.isFinite(parsed) && parsed >= 0 ? Math.round(parsed * 100) : 0;
          onChangeMinor(committed);
          setDraft((committed / 100).toFixed(2));
        }}
      />
    </div>
  );
}

function PriorityNameField({ value, onChange }) {
  const inputRef = useRef(null);
  const [dismissedValue, setDismissedValue] = useState("");
  const suggestion = getPriorityNameSuggestion(value);
  const normalizedValue = normalizePriorityName(value);
  const suggestionIsDismissed = dismissedValue === value;
  const canAccept = Boolean(
    suggestion &&
    !suggestionIsDismissed &&
    value.trim() !== suggestion
  );
  const suffix = canAccept ? suggestion.slice(normalizedValue.length) : "";

  const acceptSuggestion = () => {
    if (!canAccept) return false;
    onChange(suggestion);
    setDismissedValue("");
    return true;
  };

  return (
    <div className="pp-priority-name-autocomplete">
      {suffix ? (
        <div className="pp-priority-name-completion" aria-hidden="true">
          <span>{value}</span><em>{suffix}</em>
        </div>
      ) : null}
      <input
        ref={inputRef}
        aria-autocomplete="inline"
        aria-required="true"
        autoComplete="off"
        placeholder="Enter a priority name"
        required
        spellCheck="false"
        value={value}
        onChange={(event) => {
          setDismissedValue("");
          onChange(event.target.value);
        }}
        onKeyDown={(event) => {
          if (event.key === "Escape" && canAccept) {
            event.preventDefault();
            setDismissedValue(value);
            return;
          }

          const cursorIsAtEnd =
            inputRef.current?.selectionStart === value.length &&
            inputRef.current?.selectionEnd === value.length;
          const acceptsSuggestion =
            event.key === "Tab" ||
            event.key === "Enter" ||
            (event.key === "ArrowRight" && cursorIsAtEnd);

          if (!acceptsSuggestion || !canAccept) return;
          if (event.key !== "Tab") event.preventDefault();
          acceptSuggestion();
        }}
      />
    </div>
  );
}

function BucketIcon({ bucket, size = 20 }) {
  const detail = BUCKETS[bucket] || BUCKETS.live;
  const Icon = detail.icon;
  return (
    <span
      className={`pp-bucket-icon ${detail.className}`}
      title={detail.name}
      aria-label={detail.name}
    >
      <Icon size={size} aria-hidden="true" />
    </span>
  );
}

function PlannerSiteHeader({
  navigateTo,
  mobileMenuOpen,
  setMobileMenuOpen,
}) {
  const goTo = (event, path) => {
    if (!navigateTo) return;
    event.preventDefault();
    navigateTo(path);
  };

  const navItems = [
    ["Home", "/"],
    ["Learn", "/learn"],
    ["Calculator", "/calculator"],
    ["Payday Planner", "/payday-planner"],
    ["About", "/about"],
  ];

  return (
    <header className="learn-index-header">
      <div className="learn-index-container learn-index-header-inner">
        <a
          className="learn-index-brand"
          href="/"
          aria-label="1040 Paydays home"
          onClick={(event) => goTo(event, "/")}
        >
          <strong>1040</strong>
          <span>PAYDAYS</span>
        </a>

        <nav className="learn-index-nav" aria-label="Primary navigation">
          {navItems.map(([label, path]) => (
            <button
              className={path === "/payday-planner" ? "active" : ""}
              type="button"
              key={path}
              onClick={() => navigateTo?.(path)}
            >
              {label}
            </button>
          ))}
        </nav>

        <div className="learn-index-actions">
          <a className="learn-index-subscribe" href="/#home-newsletter">
            <Mail size={16} aria-hidden="true" />
            Subscribe
          </a>
          <button
            className="learn-index-menu-button"
            type="button"
            aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={mobileMenuOpen}
            aria-controls="payday-planner-mobile-navigation"
            onClick={() => setMobileMenuOpen?.((open) => !open)}
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            <span>Menu</span>
          </button>
          {mobileMenuOpen && (
            <nav
              className="learn-index-mobile-nav"
              id="payday-planner-mobile-navigation"
              aria-label="Mobile navigation"
            >
              {navItems.map(([label, path]) => (
                <button type="button" key={path} onClick={() => navigateTo?.(path)}>
                  {label}
                </button>
              ))}
            </nav>
          )}
        </div>
      </div>
    </header>
  );
}

function MobilePlannerHeader({ navigateTo, mobileMenuOpen, setMobileMenuOpen }) {
  const goHome = () => navigateTo?.("/");
  const navItems = [
    ["Home", "/"],
    ["Learn", "/learn"],
    ["Calculator", "/calculator"],
    ["Payday Planner", "/payday-planner"],
    ["About", "/about"],
  ];

  const goTo = (path) => {
    setMobileMenuOpen?.(false);
    navigateTo?.(path);
  };

  return (
    <header className="pp-mobile-shell-header">
      <button type="button" aria-label="Back to home" onClick={goHome}>
        <ArrowLeft aria-hidden="true" />
      </button>
      <div className="pp-mobile-shell-title">
        <div className="pp-mobile-shell-heading">1040 Payday Planner</div>
        <p>Every payday is a decision. Choose yours.</p>
      </div>
      <button
        type="button"
        aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
        aria-expanded={mobileMenuOpen}
        aria-controls="planner-mobile-shell-navigation"
        onClick={() => setMobileMenuOpen?.((open) => !open)}
      >
        {mobileMenuOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
      </button>
      {mobileMenuOpen && (
        <nav
          className="pp-mobile-shell-nav"
          id="planner-mobile-shell-navigation"
          aria-label="Mobile navigation"
        >
          {navItems.map(([label, path]) => (
            <button
              type="button"
              key={path}
              aria-current={path === "/payday-planner" ? "page" : undefined}
              onClick={() => goTo(path)}
            >
              {label}
            </button>
          ))}
        </nav>
      )}
    </header>
  );
}

function MobilePlannerNavigation({ navigateTo }) {
  const items = [
    { label: "Home", path: "/", Icon: Home },
    { label: "Learn", path: "/learn", Icon: BookOpen },
    { label: "Calculator", path: "/calculator", Icon: Calculator },
    { label: "Planner", path: "/payday-planner", Icon: CalendarRange },
    { label: "About", path: "/about", Icon: Info },
  ];

  return (
    <nav className="pp-mobile-bottom-nav" aria-label="Planner navigation">
      {items.map(({ label, path, Icon }) => (
        <a
          className={path === "/payday-planner" ? "is-active" : ""}
          href={path}
          key={path}
          aria-current={path === "/payday-planner" ? "page" : undefined}
          onClick={(event) => {
            if (!navigateTo) return;
            event.preventDefault();
            navigateTo(path);
          }}
        >
          <Icon aria-hidden="true" />
          <span>{label}</span>
        </a>
      ))}
    </nav>
  );
}

function MetricStrip({ totals, currency }) {
  return (
    <section className="pp-metric-strip" aria-label="Payday intention summary">
      <div className="pp-bucket-carousel">
        {Object.entries(BUCKETS).map(([key, detail]) => {
          const Icon = detail.icon;
          const amount = totals.bucketTotals[key] || 0;
          return (
            <article className={`pp-metric-card ${detail.className}`} key={key}>
              <span className="pp-metric-icon"><Icon aria-hidden="true" /></span>
              <div>
                <h2>{detail.name}</h2>
                <strong>{shortMoney(amount, currency)}</strong>
              </div>
            </article>
          );
        })}
      </div>
      <article className="pp-cycle-card">
        <div>
          <span>This Pay Cycle</span>
          <strong>{money(totals.totalRemaining, currency)}</strong>
          <small>Total unassigned cash</small>
        </div>
      </article>
      <p className="pp-metric-tip">
        <Sparkles size={16} aria-hidden="true" />
        Principle totals update automatically as you assign priorities.
      </p>
    </section>
  );
}

function MobileCycleGlance({ totals, currency }) {
  const assignedPercent = totals.totalIncome > 0
    ? Math.round((totals.totalAssigned / totals.totalIncome) * 100)
    : 0;
  const remainingPercent = totals.totalIncome > 0
    ? Math.round((totals.totalRemaining / totals.totalIncome) * 100)
    : 0;

  const metrics = [
    {
      label: "Income",
      value: money(totals.totalIncome, currency),
      Icon: WalletCards,
      className: "is-income",
    },
    {
      label: "Assigned",
      value: money(totals.totalAssigned, currency),
      detail: `${assignedPercent}%`,
      Icon: Check,
      className: "is-assigned",
    },
    {
      label: "Left to Plan",
      value: money(totals.totalRemaining, currency),
      detail: `${remainingPercent}%`,
      Icon: Target,
      className: "is-remaining",
    },
    {
      label: "Priorities Funded",
      value: String(totals.fundedPriorities),
      detail: "This Cycle",
      Icon: Trophy,
      className: "is-funded",
    },
  ];

  return (
    <section className="pp-mobile-cycle-glance" aria-labelledby="cycle-glance-title">
      <h2 id="cycle-glance-title">
        <Sparkles aria-hidden="true" />
        This Pay Cycle at a Glance
      </h2>

      <div className="pp-mobile-cycle-glance-grid">
        {metrics.map(({ label, value, detail, Icon, className }) => (
          <article className={className} key={label}>
            <span className="pp-mobile-cycle-glance-icon">
              <Icon aria-hidden="true" />
            </span>
            <strong>{value}</strong>
            <span>{label}</span>
            {detail ? <small>{detail}</small> : null}
          </article>
        ))}
      </div>
    </section>
  );
}

function IncomeRows({
  payday,
  currency,
  updateIncome,
  deleteIncome,
  openAddSource,
}) {
  return (
    <div className="pp-income-block">
      <div className="pp-subheading">
        <h4>Income Sources</h4>
      </div>
      <div className="pp-income-list">
        {payday.incomes.map((income) => (
          <div className="pp-income-row" key={income.id}>
            <BriefcaseBusiness size={16} aria-hidden="true" />
            <input
              className="pp-income-name"
              aria-label={`Income source name for ${payday.label}`}
              value={income.name}
              onChange={(event) =>
                updateIncome(payday.id, income.id, { name: event.target.value })
              }
            />
            <FormattedDateField
              className="pp-income-date"
              ariaLabel={`${income.name} received date for ${payday.label}`}
              value={income.receivedDate || payday.date}
              onChange={(event) =>
                updateIncome(payday.id, income.id, {
                  receivedDate: event.target.value,
                })
              }
            />
            <MoneyField
              currency={currency}
              ariaLabel={`${income.name} amount for ${payday.label}`}
              valueMinor={income.amountMinor}
              onChangeMinor={(amountMinor) =>
                updateIncome(payday.id, income.id, { amountMinor })
              }
            />
            <button
              className="pp-income-delete"
              type="button"
              aria-label={`Delete ${income.name} from ${payday.label}`}
              title="Delete income source"
              onClick={() => deleteIncome(payday.id, income.id)}
            >
              <Trash2 size={14} aria-hidden="true" />
            </button>
          </div>
        ))}
      </div>
      <button
        className="pp-add-source-bottom"
        type="button"
        onClick={() => openAddSource(payday.id)}
      >
        <Plus size={15} aria-hidden="true" /> Add Source
      </button>
    </div>
  );
}

function PaydaySummary({ data, payday }) {
  const income = paydayIncome(payday);
  const assigned = paydayAssigned(data, payday.id);
  const remaining = income - assigned;
  return (
    <div className="pp-payday-totals">
      <div><span>Income</span><strong>{money(income, data.currency)}</strong></div>
      <div><span>Assigned</span><strong>{money(assigned, data.currency)}</strong></div>
      <div className={remaining < 0 ? "is-negative" : ""}>
        <span>Remaining</span><strong>{money(remaining, data.currency)}</strong>
      </div>
    </div>
  );
}

function AllocationField({
  priority,
  payday,
  updateAllocation,
  currency = "USD",
  compact = false,
  selected,
  onToggle,
}) {
  const amountMinor = priority.allocations[payday.id] || 0;
  const isSelected = selected ?? amountMinor > 0;

  return (
    <div className={`pp-allocation-field ${isSelected ? "is-selected" : ""}`}>
      <button
        type="button"
        className="pp-allocation-check"
        aria-label={`${isSelected ? "Remove" : "Add"} ${payday.label} as an Auto Distribute source for ${priority.name}`}
        aria-pressed={isSelected}
        title={isSelected ? "Use this payday for Auto Distribute" : "Select this payday for Auto Distribute"}
        onClick={() => {
          if (onToggle) {
            onToggle();
          } else {
            updateAllocation(
              priority.id,
              payday.id,
              isSelected ? 0 : Math.min(1000, priority.totalNeededMinor),
            );
          }
        }}
      >
        {isSelected ? <Check size={14} aria-hidden="true" /> : null}
      </button>
      <MoneyField
        currency={currency}
        className={compact ? "is-compact" : ""}
        ariaLabel={`${priority.name} allocation for ${payday.label}`}
        valueMinor={amountMinor}
        onChangeMinor={(nextMinor) =>
          updateAllocation(priority.id, payday.id, nextMinor)
        }
      />
    </div>
  );
}

function AssignedPriorities({
  data,
  payday,
  updateAllocation,
  openPriority,
}) {
  const assigned = data.priorities.filter(
    (priority) => (priority.allocations[payday.id] || 0) > 0,
  );
  return (
    <div className="pp-assigned-block">
      <h4>Assigned to this payday</h4>
      {assigned.length ? (
        assigned.map((priority) => (
          <div className="pp-mobile-allocation" key={priority.id}>
            <button
              type="button"
              className="pp-priority-identity"
              onClick={() => openPriority(priority.id)}
            >
              <BucketIcon bucket={priority.bucket} size={17} />
              <span>
                <strong>{priority.name}</strong>
                <small>{priority.due} · {BUCKETS[priority.bucket].short}</small>
              </span>
            </button>
            <AllocationField
              compact
              priority={priority}
              payday={payday}
              currency={data.currency}
              updateAllocation={updateAllocation}
            />
          </div>
        ))
      ) : (
        <p className="pp-empty-copy">Nothing is assigned to this payday yet.</p>
      )}
    </div>
  );
}

function PaydayCard({
  data,
  payday,
  index,
  expanded,
  setExpanded,
  updateIncome,
  deleteIncome,
  updateAllocation,
  openAddSource,
  openPriority,
  openEditPayday,
  desktop = false,
}) {
  const income = paydayIncome(payday);
  const assigned = paydayAssigned(data, payday.id);
  const remaining = income - assigned;
  const open = desktop || expanded === payday.id;
  const planStatus =
    income === 0
      ? { label: "Add income", className: "is-needs-review" }
      : remaining < 0
        ? { label: "Over allocated", className: "is-needs-review" }
        : assigned === 0
          ? { label: "Not planned", className: "is-in-progress" }
          : remaining === 0
            ? { label: "Planned", className: "is-ready" }
            : { label: "In progress", className: "is-in-progress" };
  return (
    <article className={`pp-payday-card ${open ? "is-open" : ""} ${desktop ? "is-desktop" : ""}`}>
      <button
        className="pp-payday-card-head"
        type="button"
        aria-expanded={open}
        onClick={() => {
          if (desktop) openEditPayday(payday.id);
          else setExpanded(open ? "" : payday.id);
        }}
      >
        <span className="pp-payday-number">{index + 1}</span>
        <span className="pp-payday-title">
          <strong>{payday.label}</strong>
          <small>{formatPaydayDate(payday.date)}</small>
        </span>
        <span className={`pp-status ${planStatus.className}`}>
          {planStatus.label}
        </span>
        {open ? <ChevronUp aria-hidden="true" /> : <ChevronDown aria-hidden="true" />}
      </button>

      {!open && (
        <div className="pp-collapsed-summary">
          <span>Income <strong>{money(income, data.currency)}</strong></span>
          <span>Assigned <strong>{money(assigned, data.currency)}</strong></span>
          <span className={remaining < 0 ? "is-negative" : ""}>
            Remaining <strong>{money(remaining, data.currency)}</strong>
          </span>
        </div>
      )}

      {open && (
        <div className="pp-payday-card-body">
          <PaydaySummary data={data} payday={payday} />
          {remaining < 0 && (
            <div className="pp-over-alert" role="alert">
              Over allocated by {money(Math.abs(remaining), data.currency)}
            </div>
          )}
          <IncomeRows
            payday={payday}
            currency={data.currency}
            updateIncome={updateIncome}
            deleteIncome={deleteIncome}
            openAddSource={openAddSource}
          />
        </div>
      )}
    </article>
  );
}

function Progress({ priority, currency = "USD" }) {
  const funded = priorityFunded(priority);
  const percent = priorityPercent(priority);
  const displayPercent = Math.round(percent * 10) / 10;
  return (
    <div className="pp-progress">
      <div>
        <strong>{displayPercent >= 100 ? "Fully Funded" : `${displayPercent}% Funded`}</strong>
        {displayPercent >= 100 && <Check size={14} aria-hidden="true" />}
      </div>
      <div className="pp-progress-track" aria-label={`${displayPercent}% funded`}>
        <span style={{ width: `${Math.min(100, percent)}%` }} />
      </div>
      <small>{money(funded, currency)} / {money(priority.totalNeededMinor, currency)}</small>
    </div>
  );
}

function PriorityMatrix({
  data,
  visiblePaydays,
  updateAllocation,
  toggleAutoPayday,
  updatePriorityInline,
  autoDistribute,
  openPriority,
  openAddPriority,
}) {
  const [expandedPriorityId, setExpandedPriorityId] = useState("");

  useEffect(() => {
    if (
      expandedPriorityId &&
      !data.priorities.some((priority) => priority.id === expandedPriorityId)
    ) {
      setExpandedPriorityId("");
    }
  }, [data.priorities, expandedPriorityId]);

  return (
    <section className="pp-priority-section" aria-labelledby="priorities-title">
      <div className="pp-section-head">
        <div>
          <span className="pp-eyebrow">Your plan</span>
          <h2 id="priorities-title">Priorities</h2>
          <span className="pp-mobile-priorities-title">
            <Target aria-hidden="true" />
            Plan This Payday
          </span>
        </div>

        <div className="pp-priority-header-actions">
          <button className="pp-outline-button" type="button" onClick={openAddPriority}>
            <Plus size={17} aria-hidden="true" /> Add Priority
          </button>

          <button
            className="pp-auto-distribute-button"
            type="button"
            onClick={autoDistribute}
          >
            <Sparkles size={17} aria-hidden="true" /> Auto Distribute
          </button>
        </div>
      </div>

      <div className="pp-mobile-priority-list">
        {data.priorities.length ? (
          data.priorities.map((priority) => {
            const isOpen = expandedPriorityId === priority.id;
            const funded = priorityFunded(priority);
            const remaining = Math.max(
              0,
              priority.totalNeededMinor - funded,
            );
            const percent = Math.min(
              100,
              Math.max(0, Math.round(priorityPercent(priority))),
            );
            const dueDate = /^\d{4}-\d{2}-\d{2}$/.test(priority.due || "")
              ? priority.due
              : "";

            return (
             <MobilePriorityCard
  key={priority.id}
  priority={priority}
  data={data}
  visiblePaydays={visiblePaydays}
  isOpen={isOpen}
  setExpandedPriorityId={setExpandedPriorityId}
  updateAllocation={updateAllocation}
  toggleAutoPayday={toggleAutoPayday}
  updatePriorityInline={updatePriorityInline}
  openPriority={openPriority}
/>
            );
          })
        ) : (
          <p className="pp-mobile-priority-empty">
            No priorities yet. Add one when you are ready.
          </p>
        )}
      </div>

      <button
        className="pp-mobile-auto-distribute"
        type="button"
        onClick={autoDistribute}
      >
        <Sparkles size={18} aria-hidden="true" /> Auto Distribute
      </button>

      <div className="pp-table-shell">
        <table className={`pp-priority-table has-${visiblePaydays.length}-paydays`}>
          <caption className="sr-only">Priority allocations by payday</caption>
          <colgroup>
            <col className="pp-col-priority" />
            <col className="pp-col-due" />
            <col className="pp-col-total" />
            {visiblePaydays.map((payday) => (
              <col className="pp-col-allocation" key={payday.id} />
            ))}
            <col className="pp-col-funded" />
            <col className="pp-col-actions" />
          </colgroup>

          <thead>
            <tr>
              <th>Priority</th>
              <th>
                Due Date <small>(Optional)</small>
              </th>
              <th>Total Needed</th>
              {visiblePaydays.map((payday, index) => (
                <th className={`is-p${index + 1}`} key={payday.id}>
                  <span>P{index + 1}</span>
                  <small>{formatPaydayDate(payday.date)}</small>
                </th>
              ))}
              <th>Funded</th>
              <th>
                <span className="sr-only">Actions</span>
              </th>
            </tr>
          </thead>

          <tbody>
            {data.priorities.map((priority) => (
              <tr key={priority.id}>
                <td>
                  <button
                    type="button"
                    className="pp-priority-identity"
                    onClick={() => openPriority(priority.id)}
                  >
                    <BucketIcon bucket={priority.bucket} size={22} />
                    <span>
                      <strong>{priority.name}</strong>
                    </span>
                  </button>
                </td>

                <td>
                  <div className="pp-priority-due-wrap">
                    <FormattedDateField
                      className="pp-priority-due-control"
                      ariaLabel={`${priority.name} due date, optional`}
                      value={
                        /^\d{4}-\d{2}-\d{2}$/.test(priority.due || "")
                          ? priority.due
                          : ""
                      }
                      onChange={(event) =>
                        updatePriorityInline(priority.id, {
                          due: event.target.value,
                        })
                      }
                    />
                  </div>
                </td>

                <td>
                  <MoneyField
                    currency={data.currency}
                    className="pp-priority-total-input"
                    ariaLabel={`${priority.name} total needed`}
                    valueMinor={priority.totalNeededMinor}
                    onChangeMinor={(totalNeededMinor) =>
                      updatePriorityInline(priority.id, { totalNeededMinor })
                    }
                  />
                </td>

                {visiblePaydays.map((payday) => (
                  <td key={payday.id}>
                    <AllocationField
                      priority={priority}
                      payday={payday}
                      currency={data.currency}
                      updateAllocation={updateAllocation}
                      selected={Boolean(priority.autoPaydays?.[payday.id])}
                      onToggle={() =>
                        toggleAutoPayday(priority.id, payday.id)
                      }
                    />
                  </td>
                ))}

                <td>
                  <Progress priority={priority} currency={data.currency} />
                </td>

                <td>
                  <button
                    className="pp-priority-menu-button"
                    type="button"
                    aria-label={`Edit, change principle, or delete ${priority.name}`}
                    title="Edit, change principle, or delete"
                    onClick={() => openPriority(priority.id)}
                  >
                    <MoreHorizontal size={19} aria-hidden="true" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

function Dialog({ title, onClose, children, wide = false }) {
  return (
    <div className="pp-dialog-backdrop" role="presentation" onMouseDown={(event) => {
      if (event.target === event.currentTarget) onClose();
    }}>
      <section
        className={`pp-dialog ${wide ? "is-wide" : ""}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="pp-dialog-title"
      >
        <header>
          <h2 id="pp-dialog-title">{title}</h2>
          <button type="button" aria-label="Close dialog" onClick={onClose}>
            <X aria-hidden="true" />
          </button>
        </header>
        {children}
      </section>
    </div>
  );
}

function PriorityDetail({
  priority,
  onClose,
  updatePriority,
  deletePriority,
}) {
  const [draft, setDraft] = useState({
    name: priority.name,
    bucket: priority.bucket,
    due: priority.due,
  });
  return (
    <Dialog title={`Edit ${priority.name}`} onClose={onClose}>
      <div className="pp-priority-detail">
        <div className="pp-edit-grid">
          <label>
            <span>Priority name</span>
            <PriorityNameField
              value={draft.name}
              onChange={(name) => {
                const mappedBucket = getPrincipleForExpense(name);
                setDraft((current) => ({
                  ...current,
                  name,
                  ...(mappedBucket ? { bucket: mappedBucket } : {}),
                }));
              }}
            />
          </label>
          <label>
            <span>Payday principle</span>
            <select
              value={draft.bucket}
              onChange={(event) =>
                setDraft((current) => ({ ...current, bucket: event.target.value }))
              }
            >
              {Object.entries(BUCKETS).map(([value, detail]) => (
                <option key={value} value={value}>{detail.name}</option>
              ))}
            </select>
          </label>
          <div className="pp-edit-date-control">
            <span>Due date</span>
            <FormattedDateField
              className="pp-edit-due-date"
              ariaLabel={`${priority.name} due date`}
              value={draft.due}
              onChange={(event) =>
                setDraft((current) => ({ ...current, due: event.target.value }))
              }
            />
          </div>
        </div>
        <div className="pp-dialog-actions">
          <button
            className="pp-danger-button"
            type="button"
            onClick={() => deletePriority(priority.id)}
          >
            <Trash2 size={16} aria-hidden="true" /> Delete priority
          </button>
          <button
            className="pp-primary-button"
            type="button"
            disabled={!draft.name.trim()}
            onClick={() => {
              if (!draft.name.trim()) return;
              updatePriority(priority.id, {
                ...draft,
                name: draft.name.trim(),
              });
            }}
          >
            Save changes
          </button>
        </div>
      </div>
    </Dialog>
  );
}

export default function PaydayPlanner({
  navigateTo,
  mobileMenuOpen = false,
  setMobileMenuOpen,
  desktopTitle = null,
}) {
  const [data, setData] = useState(INITIAL_DATA);
  const [loaded, setLoaded] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState("");
  const [dialog, setDialog] = useState(null);

  useEffect(() => {
    try {
      const deviceStored = window.localStorage.getItem(STORAGE_KEY);
      if (deviceStored) {
        const parsed = JSON.parse(deviceStored);
        setData({
          ...parsed,
          currency: CURRENCIES[parsed.currency] ? parsed.currency : "USD",
          priorities: (parsed.priorities || INITIAL_DATA.priorities).map((priority) => ({
            ...priority,
            bucket: priority.bucket || getPrincipleForExpense(priority.name) || "protect",
            due: /^\d{4}-\d{2}-\d{2}$/.test(priority.due || "") ? priority.due : "",
            autoPaydays: priority.autoPaydays || Object.fromEntries(
              (parsed.paydays || INITIAL_DATA.paydays).map((payday) => [payday.id, false]),
            ),
          })),
        });
      }
    } catch {
      window.localStorage.removeItem(STORAGE_KEY);
    } finally {
      setLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (!loaded) return;
    const timer = window.setTimeout(() => {
      try {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      } catch {}
    }, 300);
    return () => window.clearTimeout(timer);
  }, [data, loaded]);

  const visiblePaydays = useMemo(() => visiblePaydaysFor(data), [data]);

  const totals = useMemo(() => {
    const totalIncome = sum(visiblePaydays.map(paydayIncome));
    const totalAssigned = sum(
      visiblePaydays.map((payday) => paydayAssigned(data, payday.id)),
    );
    const bucketTotals = Object.keys(BUCKETS).reduce((acc, bucket) => {
      acc[bucket] = sum(
        data.priorities
          .filter((priority) => priority.bucket === bucket)
          .map((priority) =>
            sum(
              visiblePaydays.map(
                (payday) => priority.allocations[payday.id] || 0,
              ),
            ),
          ),
      );
      return acc;
    }, {});
    return {
      totalIncome,
      totalAssigned,
      totalRemaining: totalIncome - totalAssigned,
      bucketTotals,
      fundedPriorities: data.priorities.filter((priority) =>
        sum(
          visiblePaydays.map(
            (payday) => priority.allocations[payday.id] || 0,
          ),
        ) > 0,
      ).length,
    };
  }, [data, visiblePaydays]);

  const updateAllocation = (priorityId, paydayId, amountMinor) => {
    setData((current) => ({
      ...current,
      priorities: current.priorities.map((priority) =>
        priority.id === priorityId
          ? {
              ...priority,
              allocations: { ...priority.allocations, [paydayId]: amountMinor },
            }
          : priority,
      ),
    }));
  };

  const updatePriorityInline = (priorityId, changes) => {
    setData((current) => ({
      ...current,
      priorities: current.priorities.map((priority) =>
        priority.id === priorityId ? { ...priority, ...changes } : priority,
      ),
    }));
  };

  const toggleAutoPayday = (priorityId, paydayId) => {
    setData((current) => ({
      ...current,
      priorities: current.priorities.map((priority) =>
        priority.id === priorityId
          ? { ...priority, autoPaydays: { ...priority.autoPaydays, [paydayId]: !priority.autoPaydays?.[paydayId] } }
          : priority,
      ),
    }));
  };

  const updateIncome = (paydayId, incomeId, changes) => {
    setData((current) => {
      const paydayIndex = current.paydays.findIndex((payday) => payday.id === paydayId);
      const payday = current.paydays[paydayIndex];
      const changesDriverDate =
        payday?.incomes[0]?.id === incomeId &&
        Object.prototype.hasOwnProperty.call(changes, "receivedDate");
      const updatedPaydays = current.paydays.map((currentPayday) =>
        currentPayday.id === paydayId
          ? {
              ...currentPayday,
              incomes: currentPayday.incomes.map((income) =>
                income.id === incomeId ? { ...income, ...changes } : income,
              ),
            }
          : currentPayday,
      );

      return {
        ...current,
        paydays: changesDriverDate
          ? reschedulePaydays(
              updatedPaydays,
              current.frequency,
              paydayIndex,
              changes.receivedDate,
            )
          : updatedPaydays,
      };
    });
  };

  const deleteIncome = (paydayId, incomeId) => {
    setData((current) => ({
      ...current,
      paydays: current.paydays.map((payday) =>
        payday.id === paydayId
          ? {
              ...payday,
              incomes: payday.incomes.filter((income) => income.id !== incomeId),
            }
          : payday,
      ),
    }));
  };

  const updatePayday = (paydayId, changes) => {
    setData((current) => {
      const paydayIndex = current.paydays.findIndex((payday) => payday.id === paydayId);
      const changesDate = Object.prototype.hasOwnProperty.call(changes, "date");
      const scheduledPaydays = changesDate
        ? reschedulePaydays(
            current.paydays,
            current.frequency,
            paydayIndex,
            changes.date,
          )
        : current.paydays;
      return {
        ...current,
        paydays: scheduledPaydays.map((payday) =>
          payday.id === paydayId
            ? { ...payday, ...changes }
            : payday,
        ),
      };
    });
    setDialog(null);
  };

  const clearPayday = (paydayId) => {
    if (!window.confirm("Clear all income and allocations from this payday?")) return;
    setData((current) => ({
      ...current,
      paydays: current.paydays.map((payday) =>
        payday.id === paydayId ? { ...payday, incomes: [] } : payday,
      ),
      priorities: current.priorities.map((priority) => ({
        ...priority,
        allocations: { ...priority.allocations, [paydayId]: 0 },
      })),
    }));
    setDialog(null);
  };

  const autoDistribute = () => {
    setData((current) => {
      const visible = visiblePaydaysFor(current);
      let working = current.priorities.map((priority) => ({
        ...priority,
        allocations: { ...priority.allocations },
      }));

      working = working.map((priority) => {
        const selected = visible.filter((payday) => priority.autoPaydays?.[payday.id]);
        if (!selected.length || priority.totalNeededMinor <= 0) return priority;

        const allocations = { ...priority.allocations };
        selected.forEach((payday) => { allocations[payday.id] = 0; });
        let needed = Math.max(0, priority.totalNeededMinor - sum(Object.values(allocations)));

        selected.forEach((payday) => {
          if (!needed) return;
          const assignedWithoutTarget = sum(
            working
              .filter((other) => other.id !== priority.id)
              .map((other) => other.allocations[payday.id] || 0),
          );
          const available = Math.max(0, paydayIncome(payday) - assignedWithoutTarget);
          const amount = Math.min(needed, available);
          allocations[payday.id] = amount;
          needed -= amount;
        });

        return { ...priority, allocations };
      });

      return { ...current, priorities: working };
    });
  };

  const addSource = (paydayId, name, receivedDate, amountMinor) => {
    setData((current) => {
      const paydayIndex = current.paydays.findIndex((payday) => payday.id === paydayId);
      const isFirstSource = current.paydays[paydayIndex]?.incomes.length === 0;
      const sourceDate = receivedDate || current.paydays[paydayIndex]?.date || "";
      const updatedPaydays = current.paydays.map((payday) =>
        payday.id === paydayId
          ? {
              ...payday,
              incomes: [
                ...payday.incomes,
                {
                  id: id("income"),
                  name,
                  receivedDate: sourceDate,
                  amountMinor,
                },
              ],
            }
          : payday,
      );
      return {
        ...current,
        paydays: isFirstSource
          ? reschedulePaydays(updatedPaydays, current.frequency, paydayIndex, sourceDate)
          : updatedPaydays,
      };
    });
    setDialog(null);
  };

  const addPriority = (name, bucket, totalNeededMinor, due) => {
    setData((current) => {
      const namedPriority = assignUniquePriorityName(current.priorities, name);
      return {
        ...current,
        priorities: [
          ...namedPriority.priorities,
          {
            id: id("priority"),
            name: namedPriority.name,
            bucket,
            due,
            frequency: "Flexible",
            totalNeededMinor,
            autoPaydays: Object.fromEntries(current.paydays.map((payday) => [payday.id, false])),
            allocations: Object.fromEntries(current.paydays.map((payday) => [payday.id, 0])),
          },
        ],
      };
    });
    setDialog(null);
  };

  const updatePriority = (priorityId, changes) => {
    setData((current) => {
      const namedPriority = assignUniquePriorityName(
        current.priorities,
        changes.name,
        priorityId,
      );
      return {
        ...current,
        priorities: namedPriority.priorities.map((priority) =>
          priority.id === priorityId
            ? {
                ...priority,
                ...changes,
                name: namedPriority.name,
              }
            : priority,
        ),
      };
    });
    setDialog(null);
  };

  const deletePriority = (priorityId) => {
    if (!window.confirm("Delete this priority and all of its payday allocations?")) return;
    setData((current) => ({
      ...current,
      priorities: current.priorities.filter((priority) => priority.id !== priorityId),
    }));
    setDialog(null);
  };

  const populateFromLast = () => {
    setData((current) => {
      const visible = visiblePaydaysFor(current);
      if (visible.length < 2) return current;
      const first = visible[0];
      const visibleIds = new Set(visible.slice(1).map((payday) => payday.id));
      return {
        ...current,
        paydays: current.paydays.map((payday) =>
          visibleIds.has(payday.id)
            ? {
                ...payday,
                incomes: first.incomes.map((income) => ({
                  ...income,
                  id: id("income"),
                  receivedDate: payday.date,
                })),
              }
            : payday,
        ),
      };
    });
  };

  const eraseAllData = () => {
    if (
      !window.confirm(
        "Erase all planner data? Payday income and every priority will be removed.",
      )
    ) {
      return;
    }

    window.localStorage.removeItem(STORAGE_KEY);
    setData((current) => createEmptyPlannerData(current));
    setMobileExpanded("");
    setDialog(null);
  };

  const resetCycle = () => {
    if (!window.confirm("Reset the visible pay cycle?")) return;

    setData((current) => {
      const visibleIds = new Set(visiblePaydaysFor(current).map((payday) => payday.id));
      return {
        ...current,
        paydays: current.paydays.map((payday) =>
          visibleIds.has(payday.id)
            ? { ...payday, incomes: [] }
            : payday,
        ),
        priorities: current.priorities.map((priority) => ({
          ...priority,
          allocations: Object.fromEntries(
            Object.entries(priority.allocations).map(([paydayId, amount]) => [
              paydayId,
              visibleIds.has(paydayId) ? 0 : amount,
            ]),
          ),
        })),
      };
    });
  };

  const downloadPdf = () => {
    window.print();
  };

  const changeFrequency = (frequency) => {
    setData((current) => {
      const baseDate = current.paydays[0]?.date || INITIAL_DATA.paydays[0].date;
      return {
        ...current,
        frequency,
        paydays: reschedulePaydays(current.paydays, frequency, 0, baseDate),
      };
    });
    setMobileExpanded("");
  };

  if (!loaded) {
    return (
      <main className="pp-loading">
        {desktopTitle}
        <p>Loading your plan…</p>
      </main>
    );
  }

  const selectedPriority =
    dialog?.type === "priority"
      ? data.priorities.find((priority) => priority.id === dialog.id)
      : null;
  const selectedPayday =
    dialog?.type === "edit-payday"
      ? data.paydays.find((payday) => payday.id === dialog.id)
      : null;

  return (
    <div className="pp-site-page">
      <PlannerSiteHeader
        navigateTo={navigateTo}
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
      />
      <MobilePlannerHeader
        navigateTo={navigateTo}
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
      />
      {desktopTitle}
      <div className="pp-page">
      <header className="pp-app-header pp-app-header-controls-only">
        <div className="pp-header-controls" aria-label="Planner controls">
          <select
            className="pp-toolbar-select pp-frequency-select"
            aria-label="Pay frequency"
            title="Pay frequency"
            value={data.frequency}
            onChange={(event) => changeFrequency(event.target.value)}
          >
            <option value="weekly">Weekly</option>
            <option value="biweekly">Biweekly</option>
            <option value="monthly">Monthly</option>
          </select>

          <span className="pp-toolbar-divider" aria-hidden="true" />

          <select
            className="pp-toolbar-select pp-currency-select"
            aria-label="Currency"
            title="Currency"
            value={data.currency}
            onChange={(event) =>
              setData((current) => ({ ...current, currency: event.target.value }))
            }
          >
            <option value="USD">$</option>
            <option value="GBP">£</option>
            <option value="EUR">€</option>
          </select>

          <span className="pp-toolbar-divider" aria-hidden="true" />

          <button
            className="pp-toolbar-icon"
            type="button"
            onClick={resetCycle}
            aria-label="Reset cycle"
            title="Reset cycle"
          >
            <RotateCcw size={20} aria-hidden="true" />
          </button>

          <button
            className="pp-toolbar-icon"
            type="button"
            onClick={populateFromLast}
            aria-label="Populate from last"
            title="Populate from last"
          >
            <RefreshCw size={20} aria-hidden="true" />
          </button>

          <button
            className="pp-toolbar-icon"
            type="button"
            onClick={downloadPdf}
            aria-label="Download PDF"
            title="Download PDF"
          >
            <Download size={20} aria-hidden="true" />
          </button>

          <button
            className="pp-toolbar-icon is-danger"
            type="button"
            onClick={eraseAllData}
            aria-label="Erase all data"
            title="Erase all data"
          >
            <Trash2 size={20} aria-hidden="true" />
          </button>
        </div>
      </header>

      <div className="pp-mobile-bar" aria-label="Mobile planner controls">
        <select
          className="pp-mobile-toolbar-select pp-mobile-frequency-select"
          aria-label="Pay frequency"
          title="Pay frequency"
          value={data.frequency}
          onChange={(event) => changeFrequency(event.target.value)}
        >
          <option value="weekly">Weekly</option>
          <option value="biweekly">Biweekly</option>
          <option value="monthly">Monthly</option>
        </select>

        <select
          className="pp-mobile-toolbar-select pp-mobile-currency-select"
          aria-label="Currency"
          title="Currency"
          value={data.currency}
          onChange={(event) =>
            setData((current) => ({ ...current, currency: event.target.value }))
          }
        >
          <option value="USD">$</option>
          <option value="GBP">£</option>
          <option value="EUR">€</option>
        </select>

        <button
          className="pp-mobile-toolbar-icon"
          type="button"
          onClick={downloadPdf}
          aria-label="Download PDF"
          title="Download PDF"
        >
          <Download size={18} aria-hidden="true" />
        </button>

        <button
          className="pp-mobile-toolbar-icon"
          type="button"
          onClick={resetCycle}
          aria-label="Reset cycle"
          title="Reset cycle"
        >
          <RotateCcw size={18} aria-hidden="true" />
        </button>

        <button
          className="pp-mobile-toolbar-icon is-danger"
          type="button"
          onClick={eraseAllData}
          aria-label="Erase all data"
          title="Erase all data"
        >
          <Trash2 size={18} aria-hidden="true" />
        </button>
      </div>

      <MobileCycleGlance totals={totals} currency={data.currency} />

      <main className="pp-main learn-index-container">
        <MetricStrip totals={totals} currency={data.currency} />

        <section className="pp-payday-section" aria-labelledby="paydays-title">
          <div className="pp-section-head">
            <div>
              <span className="pp-eyebrow">
                {visiblePaydays.length} {visiblePaydays.length === 1 ? "payday" : "paydays"} in this cycle
              </span>
              <h2 id="paydays-title">Plan Your Paydays</h2>
              <span className="pp-mobile-cycle-title">
                <CalendarDays aria-hidden="true" />
                {visiblePaydays.length} {visiblePaydays.length === 1 ? "Payday" : "Paydays"} in This Cycle
              </span>
            </div>
            
          </div>

          <div
            className="pp-desktop-paydays"
            style={{ "--payday-count": visiblePaydays.length }}
          >
            {visiblePaydays.map((payday, index) => (
              <PaydayCard
                desktop
                key={payday.id}
                data={data}
                payday={payday}
                index={index}
                expanded=""
                setExpanded={() => {}}
                updateIncome={updateIncome}
                deleteIncome={deleteIncome}
                updateAllocation={updateAllocation}
                openAddSource={(paydayId) => setDialog({ type: "source", paydayId })}
                openPriority={(priorityId) => setDialog({ type: "priority", id: priorityId })}
                openEditPayday={(paydayId) => setDialog({ type: "edit-payday", id: paydayId })}
              />
            ))}
          </div>

          <div className="pp-mobile-paydays">
            {visiblePaydays.map((payday, index) => (
              <PaydayCard
                key={payday.id}
                data={data}
                payday={payday}
                index={index}
                expanded={mobileExpanded}
                setExpanded={setMobileExpanded}
                updateIncome={updateIncome}
                deleteIncome={deleteIncome}
                updateAllocation={updateAllocation}
                openAddSource={(paydayId) => setDialog({ type: "source", paydayId })}
                openPriority={(priorityId) => setDialog({ type: "priority", id: priorityId })}
                openEditPayday={(paydayId) => setDialog({ type: "edit-payday", id: paydayId })}
              />
            ))}
          </div>
        </section>

        <PriorityMatrix
          data={data}
          visiblePaydays={visiblePaydays}
          updateAllocation={updateAllocation}
          toggleAutoPayday={toggleAutoPayday}
          updatePriorityInline={updatePriorityInline}
          autoDistribute={autoDistribute}
          openPriority={(priorityId) => setDialog({ type: "priority", id: priorityId })}
          openAddPriority={() => setDialog({ type: "add-priority" })}
        />

        <MobilePlannerNavigation navigateTo={navigateTo} />
      </main>

      {dialog?.type === "source" && (
        <AddSourceDialog
          payday={data.paydays.find((payday) => payday.id === dialog.paydayId)}
          currency={data.currency}
          onClose={() => setDialog(null)}
          onAdd={addSource}
        />
      )}
      {dialog?.type === "add-priority" && (
        <AddPriorityDialog
          currency={data.currency}
          onClose={() => setDialog(null)}
          onAdd={addPriority}
        />
      )}
      {selectedPriority && (
        <PriorityDetail
          priority={selectedPriority}
          onClose={() => setDialog(null)}
          updatePriority={updatePriority}
          deletePriority={deletePriority}
        />
      )}
      {selectedPayday && (
        <EditPaydayDialog
          payday={selectedPayday}
          onClose={() => setDialog(null)}
          onSave={updatePayday}
          onClear={clearPayday}
        />
      )}
      </div>
    </div>
  );
}

function EditPaydayDialog({ payday, onClose, onSave, onClear }) {
  const [draft, setDraft] = useState({
    label: payday.label,
    date: payday.date,
  });
  return (
    <Dialog title={`Edit ${payday.label}`} onClose={onClose}>
      <form
        className="pp-dialog-form"
        onSubmit={(event) => {
          event.preventDefault();
          if (!draft.label.trim() || !draft.date) return;
          onSave(payday.id, { ...draft, label: draft.label.trim() });
        }}
      >
        <label>
          <span>Payday name</span>
          <input
            value={draft.label}
            onChange={(event) =>
              setDraft((current) => ({ ...current, label: event.target.value }))
            }
          />
        </label>
        <label>
          <span>Payday date</span>
          <input
            type="date"
            value={draft.date}
            onChange={(event) =>
              setDraft((current) => ({ ...current, date: event.target.value }))
            }
          />
        </label>
        <div className="pp-dialog-actions">
          <button
            className="pp-danger-button"
            type="button"
            onClick={() => onClear(payday.id)}
          >
            <Trash2 size={16} aria-hidden="true" /> Clear payday data
          </button>
          <button className="pp-primary-button" type="submit">
            Save changes
          </button>
        </div>
      </form>
    </Dialog>
  );
}

function AddSourceDialog({ payday, currency, onClose, onAdd }) {
  const [name, setName] = useState("Side Income");
  const [receivedDate, setReceivedDate] = useState(payday?.date || "");
  const [amountMinor, setAmountMinor] = useState(0);
  return (
    <Dialog title={`Add income to ${payday?.label || "payday"}`} onClose={onClose}>
      <form className="pp-dialog-form" onSubmit={(event) => {
        event.preventDefault();
        if (!name.trim()) return;
        onAdd(payday.id, name.trim(), receivedDate, amountMinor);
      }}>
        <label>
          <span>Income source</span>
          <input value={name} onChange={(event) => setName(event.target.value)} />
        </label>
        <label>
          <span>Date received</span>
          <input
            type="date"
            value={receivedDate}
            onChange={(event) => setReceivedDate(event.target.value)}
          />
        </label>
        <label>
          <span>Amount</span>
          <MoneyField
            currency={currency}
            ariaLabel="New income amount"
            valueMinor={amountMinor}
            onChangeMinor={setAmountMinor}
          />
        </label>
        <button className="pp-primary-button" type="submit">
          <Plus size={17} aria-hidden="true" /> Add Source
        </button>
      </form>
    </Dialog>
  );
}

function AddPriorityDialog({ currency, onClose, onAdd }) {
  const [name, setName] = useState("");
  const [bucket, setBucket] = useState("protect");
  const [totalNeededMinor, setTotalNeededMinor] = useState(0);
  const [due, setDue] = useState("");
  return (
    <Dialog title="Add Priority" onClose={onClose}>
      <form className="pp-dialog-form" onSubmit={(event) => {
        event.preventDefault();
        if (!name.trim()) return;
        onAdd(name.trim(), bucket, totalNeededMinor, due);
      }}>
        <label>
          <span>Priority name</span>
          <PriorityNameField
            value={name}
            onChange={(nextName) => {
              setName(nextName);
              const mappedBucket = getPrincipleForExpense(nextName);
              if (mappedBucket) setBucket(mappedBucket);
            }}
          />
        </label>
        <label>
          <span>Payday principle</span>
          <select value={bucket} onChange={(event) => setBucket(event.target.value)}>
            {Object.entries(BUCKETS).map(([value, detail]) => (
              <option key={value} value={value}>{detail.name}</option>
            ))}
          </select>
        </label>
        <label>
          <span>Total needed</span>
          <MoneyField
            currency={currency}
            ariaLabel="New priority total needed"
            valueMinor={totalNeededMinor}
            onChangeMinor={setTotalNeededMinor}
          />
        </label>
        <label>
          <span>Due date</span>
          <input
            type="date"
            value={due}
            onChange={(event) => setDue(event.target.value)}
          />
        </label>
        <button className="pp-primary-button" type="submit">
          <Target size={17} aria-hidden="true" /> Add Priority
        </button>
      </form>
    </Dialog>
  );
}
