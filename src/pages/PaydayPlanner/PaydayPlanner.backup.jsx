import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  BriefcaseBusiness,
  CalendarDays,
  Check,
  ChevronDown,
  ChevronUp,
  CircleDollarSign,
  GripVertical,
  HardDrive,
  Heart,
  Plus,
  RefreshCw,
  Save,
  ShieldCheck,
  Sparkles,
  Sun,
  Target,
  Trash2,
  TrendingUp,
  X,
} from "lucide-react";
import { splitMinorUnitsEvenly } from "../../utils/plannerCalculations.mjs";
import { createId, createPriority } from "../../utils/plannerDefaults.mjs";
import "./PaydayPlanner.css";

const STORAGE_KEY = "1040-paydays-payday-planner-v4";
const SESSION_KEY = "1040-paydays-payday-planner-session-v4";

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
  currency: "CAD",
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
      bucket: "protect",
      due: "Aug 10",
      frequency: "Monthly",
      totalNeededMinor: 120000,
      allocations: { p1: 60000, p2: 60000, p3: 0, p4: 0 },
    },
    {
      id: "groceries",
      name: "Groceries",
      bucket: "live",
      due: "Every Payday",
      frequency: "Ongoing",
      totalNeededMinor: 25000,
      allocations: { p1: 700, p2: 700, p3: 700, p4: 700 },
    },
    {
      id: "emergency",
      name: "Emergency Fund",
      bucket: "protect",
      due: "Goal",
      frequency: "Flexible",
      totalNeededMinor: 100000,
      allocations: { p1: 0, p2: 0, p3: 0, p4: 0 },
    },
    {
      id: "vacation",
      name: "Vacation",
      bucket: "future",
      due: "Goal",
      frequency: "Flexible",
      totalNeededMinor: 150000,
      allocations: { p1: 0, p2: 0, p3: 0, p4: 0 },
    },
    {
      id: "date-night",
      name: "Date Night",
      bucket: "matters",
      due: "Every Payday",
      frequency: "Ongoing",
      totalNeededMinor: 10000,
      allocations: { p1: 2500, p2: 2500, p3: 2500, p4: 2500 },
    },
  ],
};

const money = (minor) =>
  new Intl.NumberFormat("en-CA", {
    style: "currency",
    currency: "CAD",
    minimumFractionDigits: 2,
  }).format((minor || 0) / 100);

const shortMoney = (minor) =>
  new Intl.NumberFormat("en-CA", {
    style: "currency",
    currency: "CAD",
    maximumFractionDigits: 0,
  }).format((minor || 0) / 100);

const readableDate = (iso) =>
  new Intl.DateTimeFormat("en-CA", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(`${iso}T12:00:00`));

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
  const date = new Date(`${baseIso}T12:00:00`);
  if (frequency === "monthly") {
    date.setMonth(date.getMonth() + index);
  } else {
    date.setDate(date.getDate() + index * (frequency === "weekly" ? 7 : 14));
  }
  return date.toISOString().slice(0, 10);
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

function MoneyField({ valueMinor, onChangeMinor, ariaLabel, className = "" }) {
  const [draft, setDraft] = useState((valueMinor / 100).toFixed(2));
  const focused = useRef(false);

  useEffect(() => {
    if (!focused.current) setDraft((valueMinor / 100).toFixed(2));
  }, [valueMinor]);

  return (
    <div className={`pp-money-input ${className}`}>
      <span aria-hidden="true">$</span>
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

function MetricStrip({ totals }) {
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
                <strong>{shortMoney(amount)}</strong>
              </div>
            </article>
          );
        })}
      </div>
      <article className="pp-cycle-card">
        <div>
          <span>This Pay Cycle</span>
          <strong>{money(totals.totalRemaining)}</strong>
          <small>Total unassigned cash</small>
        </div>
        <CircleDollarSign aria-hidden="true" />
      </article>
      <p className="pp-metric-tip">
        <Sparkles size={16} aria-hidden="true" />
        Principle totals update automatically as you assign priorities.
      </p>
    </section>
  );
}

function IncomeRows({ payday, updateIncome, openAddSource }) {
  return (
    <div className="pp-income-block">
      <div className="pp-subheading">
        <h4>Income Sources</h4>
        <button type="button" onClick={() => openAddSource(payday.id)}>
          <Plus size={15} aria-hidden="true" /> Add Source
        </button>
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
            <label className="pp-income-date">
              <span className="sr-only">{income.name} received date</span>
              <CalendarDays size={14} aria-hidden="true" />
              <input
                aria-label={`${income.name} received date for ${payday.label}`}
                type="date"
                value={income.receivedDate || payday.date}
                onChange={(event) =>
                  updateIncome(payday.id, income.id, {
                    receivedDate: event.target.value,
                  })
                }
              />
            </label>
            <MoneyField
              ariaLabel={`${income.name} amount for ${payday.label}`}
              valueMinor={income.amountMinor}
              onChangeMinor={(amountMinor) =>
                updateIncome(payday.id, income.id, { amountMinor })
              }
            />
          </div>
        ))}
      </div>
    </div>
  );
}

function PaydaySummary({ data, payday }) {
  const income = paydayIncome(payday);
  const assigned = paydayAssigned(data, payday.id);
  const remaining = income - assigned;
  return (
    <div className="pp-payday-totals">
      <div><span>Income</span><strong>{money(income)}</strong></div>
      <div><span>Assigned</span><strong>{money(assigned)}</strong></div>
      <div className={remaining < 0 ? "is-negative" : ""}>
        <span>Remaining</span><strong>{money(remaining)}</strong>
      </div>
    </div>
  );
}

function AllocationField({
  priority,
  payday,
  updateAllocation,
  compact = false,
}) {
  const amountMinor = priority.allocations[payday.id] || 0;
  const selected = amountMinor > 0;
  return (
    <div className={`pp-allocation-field ${selected ? "is-selected" : ""}`}>
      <button
        type="button"
        className="pp-allocation-check"
        aria-label={`${selected ? "Remove" : "Add"} ${priority.name} from ${payday.label}`}
        aria-pressed={selected}
        title={selected ? "Included in this payday" : "Include in this payday"}
        onClick={() =>
          updateAllocation(
            priority.id,
            payday.id,
            selected ? 0 : Math.min(1000, priority.totalNeededMinor),
          )
        }
      >
        {selected ? <Check size={14} aria-hidden="true" /> : null}
      </button>
      <MoneyField
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
  updateAllocation,
  openAddSource,
  openPriority,
  desktop = false,
}) {
  const income = paydayIncome(payday);
  const assigned = paydayAssigned(data, payday.id);
  const remaining = income - assigned;
  const open = desktop || expanded === payday.id;
  return (
    <article className={`pp-payday-card ${open ? "is-open" : ""} ${desktop ? "is-desktop" : ""}`}>
      <button
        className="pp-payday-card-head"
        type="button"
        aria-expanded={open}
        onClick={() => {
          if (!desktop) setExpanded(open ? "" : payday.id);
        }}
      >
        <span className="pp-payday-number">{index + 1}</span>
        <span className="pp-payday-title">
          <strong>{payday.label}</strong>
          <small>{readableDate(payday.date)}</small>
        </span>
        <span className={`pp-status is-${payday.status.toLowerCase().replaceAll(" ", "-")}`}>
          {payday.status}
        </span>
        {open ? <ChevronUp aria-hidden="true" /> : <ChevronDown aria-hidden="true" />}
      </button>

      {!open && (
        <div className="pp-collapsed-summary">
          <span>Income <strong>{money(income)}</strong></span>
          <span className={remaining < 0 ? "is-negative" : ""}>
            Remaining <strong>{money(remaining)}</strong>
          </span>
        </div>
      )}

      {open && (
        <div className="pp-payday-card-body">
          <PaydaySummary data={data} payday={payday} />
          {remaining < 0 && (
            <div className="pp-over-alert" role="alert">
              Over allocated by {money(Math.abs(remaining))}
            </div>
          )}
          <IncomeRows
            payday={payday}
            updateIncome={updateIncome}
            openAddSource={openAddSource}
          />
          {!desktop && (
            <AssignedPriorities
              data={data}
              payday={payday}
              updateAllocation={updateAllocation}
              openPriority={openPriority}
            />
          )}
        </div>
      )}
    </article>
  );
}

function Progress({ priority }) {
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
      <small>{money(funded)} / {money(priority.totalNeededMinor)}</small>
    </div>
  );
}

function PriorityMatrix({
  data,
  visiblePaydays,
  updateAllocation,
  autoAssign,
  openPriority,
  openAddPriority,
}) {
  return (
    <section className="pp-priority-section" aria-labelledby="priorities-title">
      <div className="pp-section-head">
        <div>
          <span className="pp-eyebrow">Your plan</span>
          <h2 id="priorities-title">Priorities</h2>
        </div>
        <button className="pp-outline-button" type="button" onClick={openAddPriority}>
          <Plus size={17} aria-hidden="true" /> Add Priority
        </button>
      </div>

      <div className="pp-table-shell">
        <table>
          <caption className="sr-only">Priority allocations by payday</caption>
          <thead>
            <tr>
              <th><span className="sr-only">Reorder</span></th>
              <th>Priority</th>
              <th>Due / Frequency</th>
              <th>Total Needed</th>
              {visiblePaydays.map((payday, index) => (
                <th className={`is-p${index + 1}`} key={payday.id}>
                  <span>P{index + 1}</span>
                  <small>{readableDate(payday.date).replace(", 2026", "")}</small>
                </th>
              ))}
              <th>Funded</th>
              <th><span className="sr-only">Actions</span></th>
            </tr>
          </thead>
          <tbody>
            {data.priorities.map((priority) => (
              <tr key={priority.id}>
                <td><GripVertical className="pp-grip" aria-hidden="true" /></td>
                <td>
                  <button
                    type="button"
                    className="pp-priority-identity"
                    onClick={() => openPriority(priority.id)}
                  >
                    <BucketIcon bucket={priority.bucket} size={18} />
                    <span>
                      <strong>{priority.name}</strong>
                      <small>{BUCKETS[priority.bucket].name}</small>
                    </span>
                  </button>
                </td>
                <td><strong>{priority.due}</strong><small>{priority.frequency}</small></td>
                <td><strong>{money(priority.totalNeededMinor)}</strong></td>
                {visiblePaydays.map((payday) => (
                  <td key={payday.id}>
                    <AllocationField
                      priority={priority}
                      payday={payday}
                      updateAllocation={updateAllocation}
                    />
                  </td>
                ))}
                <td><Progress priority={priority} /></td>
                <td>
                  <button
                    className="pp-auto-button"
                    type="button"
                    onClick={() => autoAssign(priority.id)}
                    title={`Auto assign ${priority.name}`}
                  >
                    <Sparkles size={15} aria-hidden="true" />
                    <span>Auto</span>
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

function PriorityDetail({ priority, data, onClose, updateAllocation }) {
  return (
    <Dialog title={priority.name} onClose={onClose} wide>
      <div className="pp-priority-detail">
        <div className="pp-detail-summary">
          <BucketIcon bucket={priority.bucket} size={24} />
          <div>
            <span>{BUCKETS[priority.bucket].name}</span>
            <strong>{money(priorityFunded(priority))} funded</strong>
          </div>
        </div>
        <Progress priority={priority} />
        <dl>
          <div><dt>Total needed</dt><dd>{money(priority.totalNeededMinor)}</dd></div>
          <div><dt>Total funded</dt><dd>{money(priorityFunded(priority))}</dd></div>
          <div><dt>Still needed</dt><dd>{money(Math.max(0, priority.totalNeededMinor - priorityFunded(priority)))}</dd></div>
        </dl>
        <h3>Payday breakdown</h3>
        {data.paydays.map((payday) => (
          <div className="pp-detail-payday" key={payday.id}>
            <span><strong>{payday.label}</strong><small>{readableDate(payday.date)}</small></span>
            <AllocationField
              priority={priority}
              payday={payday}
              updateAllocation={updateAllocation}
            />
          </div>
        ))}
      </div>
    </Dialog>
  );
}

export default function PaydayPlanner() {
  const [data, setData] = useState(INITIAL_DATA);
  const [loaded, setLoaded] = useState(false);
  const [saved, setSaved] = useState("Not saved yet");
  const [rememberOnDevice, setRememberOnDevice] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState("p1");
  const [dialog, setDialog] = useState(null);

  useEffect(() => {
    try {
      const sessionStored = window.sessionStorage.getItem(SESSION_KEY);
      const deviceStored = window.localStorage.getItem(STORAGE_KEY);
      if (sessionStored) {
        setData(JSON.parse(sessionStored));
      } else if (deviceStored) {
        setData(JSON.parse(deviceStored));
        setSaved("Loaded saved planner from this device");
      }
    } catch {
      setSaved("Session data could not be loaded");
    } finally {
      setLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (!loaded) return;
    const timer = window.setTimeout(() => {
      try {
        window.sessionStorage.setItem(SESSION_KEY, JSON.stringify(data));
        if (rememberOnDevice) {
          window.localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
          setSaved("Saved on this device");
        } else {
          setSaved("Saved for this browser session");
        }
      } catch {
        setSaved("Save failed");
      }
    }, 300);
    return () => window.clearTimeout(timer);
  }, [data, loaded, rememberOnDevice]);

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

  const updateIncome = (paydayId, incomeId, changes) => {
    setData((current) => ({
      ...current,
      paydays: current.paydays.map((payday) =>
        payday.id === paydayId
          ? {
              ...payday,
              incomes: payday.incomes.map((income) =>
                income.id === incomeId ? { ...income, ...changes } : income,
              ),
            }
          : payday,
      ),
    }));
  };

  const autoAssign = (priorityId) => {
    setData((current) => {
      const target = current.priorities.find((priority) => priority.id === priorityId);
      if (!target) return current;
      let needed = Math.max(0, target.totalNeededMinor - priorityFunded(target));
      const allocations = { ...target.allocations };
      visiblePaydaysFor(current).forEach((payday) => {
        if (!needed) return;
        const assignedWithoutTarget = sum(
          current.priorities
            .filter((priority) => priority.id !== target.id)
            .map((priority) => priority.allocations[payday.id] || 0),
        );
        const targetExisting = allocations[payday.id] || 0;
        const available = Math.max(
          0,
          paydayIncome(payday) - assignedWithoutTarget - targetExisting,
        );
        const add = Math.min(needed, available);
        allocations[payday.id] = targetExisting + add;
        needed -= add;
      });
      return {
        ...current,
        priorities: current.priorities.map((priority) =>
          priority.id === priorityId ? { ...priority, allocations } : priority,
        ),
      };
    });
  };

  const addSource = (paydayId, name, receivedDate, amountMinor) => {
    setData((current) => ({
      ...current,
      paydays: current.paydays.map((payday) =>
        payday.id === paydayId
          ? {
              ...payday,
              incomes: [
                ...payday.incomes,
                {
                  id: id("income"),
                  name,
                  receivedDate: receivedDate || payday.date,
                  amountMinor,
                },
              ],
            }
          : payday,
      ),
    }));
    setDialog(null);
  };

  const addPriority = (name, bucket, totalNeededMinor) => {
    setData((current) => ({
      ...current,
      priorities: [
        ...current.priorities,
        {
          id: id("priority"),
          name,
          bucket,
          due: "Goal",
          frequency: "Flexible",
          totalNeededMinor,
          allocations: Object.fromEntries(current.paydays.map((payday) => [payday.id, 0])),
        },
      ],
    }));
    setDialog(null);
  };

  const savePlanner = () => {
    try {
      const serialized = JSON.stringify(data);
      window.sessionStorage.setItem(SESSION_KEY, serialized);
      if (rememberOnDevice) {
        window.localStorage.setItem(STORAGE_KEY, serialized);
        setSaved("Saved on this device");
      } else {
        setSaved("Saved for this browser session");
      }
    } catch {
      setSaved("Save failed");
    }
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
    setSaved("Copied income into this pay cycle");
  };

  const eraseAllData = () => {
    if (
      !window.confirm(
        "Erase all planner data from this browser and start again?",
      )
    ) {
      return;
    }
    window.sessionStorage.removeItem(SESSION_KEY);
    window.localStorage.removeItem(STORAGE_KEY);
    setRememberOnDevice(false);
    setData(INITIAL_DATA);
    setSaved("All saved data erased");
  };

  const changeFrequency = (frequency) => {
    setData((current) => {
      const baseDate = current.paydays[0]?.date || INITIAL_DATA.paydays[0].date;
      return {
        ...current,
        frequency,
        paydays: current.paydays.map((payday, index) => {
          const nextDate = dateForFrequency(baseDate, frequency, index);
          return {
            ...payday,
            date: nextDate,
            incomes: payday.incomes.map((income) => ({
              ...income,
              receivedDate: nextDate,
            })),
          };
        }),
      };
    });
    setMobileExpanded("p1");
  };

  if (!loaded) {
    return (
      <main className="pp-loading">
        <h1>Payday Planner</h1>
        <p>Loading your plan…</p>
      </main>
    );
  }

  const selectedPriority =
    dialog?.type === "priority"
      ? data.priorities.find((priority) => priority.id === dialog.id)
      : null;

  return (
    <div className="pp-page">
      <header className="pp-app-header">
        <a className="pp-brand" href="/" aria-label="1040 Paydays home">
          <strong>1040</strong>
          <span>PAYDAYS</span>
        </a>
        <div className="pp-title">
          <h1>Payday Planner</h1>
          <p>Plan every payday. Build your future.</p>
        </div>
        <div className="pp-header-controls" aria-label="Planner controls">
          <label className="pp-header-field is-currency">
            <span>Currency</span>
            <select aria-label="Currency" value={data.currency} onChange={(event) =>
              setData((current) => ({ ...current, currency: event.target.value }))
            }>
              <option value="CAD">$ CAD</option>
            </select>
          </label>
          <label className="pp-header-field is-frequency">
            <span>Pay Frequency</span>
            <select
              aria-label="Pay Frequency"
              value={data.frequency}
              onChange={(event) => changeFrequency(event.target.value)}
            >
              {Object.entries(FREQUENCIES).map(([value, detail]) => (
                <option key={value} value={value}>{detail.label}</option>
              ))}
            </select>
          </label>
          <button className="pp-populate-button" type="button" onClick={populateFromLast}>
            <RefreshCw size={18} aria-hidden="true" /> Populate from Last
          </button>
          <button className="pp-save-button" type="button" onClick={savePlanner}>
            <Save size={18} aria-hidden="true" /> Save Planner
          </button>
          <label className="pp-device-save">
            <input
              type="checkbox"
              checked={rememberOnDevice}
              onChange={(event) => {
                if (event.target.checked) {
                  setDialog({ type: "remember-warning" });
                } else {
                  setRememberOnDevice(false);
                  window.localStorage.removeItem(STORAGE_KEY);
                  setSaved("Saved for this browser session");
                }
              }}
            />
            <span>
              <HardDrive size={18} aria-hidden="true" />
              Save to this device
            </span>
          </label>
          <button className="pp-erase-button" type="button" onClick={eraseAllData}>
            <Trash2 size={17} aria-hidden="true" /> Erase all data
          </button>
          <span className="pp-save-state" aria-live="polite">{saved}</span>
        </div>
      </header>

      <div className="pp-mobile-bar">
        <span>Total Unassigned Cash <strong>{money(totals.totalRemaining)}</strong></span>
        <button type="button" onClick={savePlanner}>
          <Save size={16} aria-hidden="true" /> Save
        </button>
      </div>
      <div className="pp-mobile-storage-controls">
        <label>
          <input
            aria-label="Save planner to this device on mobile"
            type="checkbox"
            checked={rememberOnDevice}
            onChange={(event) => {
              if (event.target.checked) {
                setDialog({ type: "remember-warning" });
              } else {
                setRememberOnDevice(false);
                window.localStorage.removeItem(STORAGE_KEY);
                setSaved("Saved for this browser session");
              }
            }}
          />
          <HardDrive size={15} aria-hidden="true" />
          Save to this device
        </label>
        <button type="button" onClick={eraseAllData}>
          <Trash2 size={15} aria-hidden="true" /> Erase all data
        </button>
      </div>

      <main className="pp-main">
        <MetricStrip totals={totals} />

        <section className="pp-payday-section" aria-labelledby="paydays-title">
          <div className="pp-section-head">
            <div>
              <span className="pp-eyebrow">
                {visiblePaydays.length} {visiblePaydays.length === 1 ? "payday" : "paydays"} in this cycle
              </span>
              <h2 id="paydays-title">Paydays</h2>
            </div>
            <button
              className="pp-outline-button"
              type="button"
              onClick={() =>
                setDialog({
                  type: "source",
                  paydayId: visiblePaydays.at(-1)?.id || data.paydays[0].id,
                })
              }
            >
              <Plus size={17} aria-hidden="true" /> Add Source
            </button>
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
                updateAllocation={updateAllocation}
                openAddSource={(paydayId) => setDialog({ type: "source", paydayId })}
                openPriority={(priorityId) => setDialog({ type: "priority", id: priorityId })}
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
                updateAllocation={updateAllocation}
                openAddSource={(paydayId) => setDialog({ type: "source", paydayId })}
                openPriority={(priorityId) => setDialog({ type: "priority", id: priorityId })}
              />
            ))}
          </div>
        </section>

        <PriorityMatrix
          data={data}
          visiblePaydays={visiblePaydays}
          updateAllocation={updateAllocation}
          autoAssign={autoAssign}
          openPriority={(priorityId) => setDialog({ type: "priority", id: priorityId })}
          openAddPriority={() => setDialog({ type: "add-priority" })}
        />

        <footer className="pp-privacy-note">
          <ShieldCheck aria-hidden="true" />
          <span>
            {rememberOnDevice
              ? "Your planner is saved locally on this device. We do not store or track your financial data."
              : "This planner is available only for this browser session. Your data will be lost when the browser closes."}
          </span>
        </footer>
      </main>

      {dialog?.type === "source" && (
        <AddSourceDialog
          payday={data.paydays.find((payday) => payday.id === dialog.paydayId)}
          onClose={() => setDialog(null)}
          onAdd={addSource}
        />
      )}
      {dialog?.type === "add-priority" && (
        <AddPriorityDialog onClose={() => setDialog(null)} onAdd={addPriority} />
      )}
      {selectedPriority && (
        <PriorityDetail
          priority={selectedPriority}
          data={{ ...data, paydays: visiblePaydays }}
          onClose={() => setDialog(null)}
          updateAllocation={updateAllocation}
        />
      )}
      {dialog?.type === "remember-warning" && (
        <Dialog title="Save planner to this device?" onClose={() => setDialog(null)}>
          <div className="pp-warning-dialog">
            <HardDrive size={30} aria-hidden="true" />
            <p><strong>Do not select if this is a shared computer.</strong></p>
            <p>
              When selected, your planner remains on this device after the browser
              closes. It is stored only in this browser.
            </p>
            <div className="pp-dialog-actions">
              <button className="pp-outline-button" type="button" onClick={() => setDialog(null)}>
                Cancel
              </button>
              <button
                className="pp-primary-button"
                type="button"
                onClick={() => {
                  try {
                    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
                    setRememberOnDevice(true);
                    setSaved("Saved on this device");
                  } catch {
                    setSaved("Save failed");
                  }
                  setDialog(null);
                }}
              >
                Save to this device
              </button>
            </div>
          </div>
        </Dialog>
      )}
    </div>
  );
}

function AddSourceDialog({ payday, onClose, onAdd }) {
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

function AddPriorityDialog({ onClose, onAdd }) {
  const [name, setName] = useState("New Priority");
  const [bucket, setBucket] = useState("protect");
  const [totalNeededMinor, setTotalNeededMinor] = useState(0);
  return (
    <Dialog title="Add Priority" onClose={onClose}>
      <form className="pp-dialog-form" onSubmit={(event) => {
        event.preventDefault();
        if (!name.trim()) return;
        onAdd(name.trim(), bucket, totalNeededMinor);
      }}>
        <label>
          <span>Priority name</span>
          <input value={name} onChange={(event) => setName(event.target.value)} />
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
            ariaLabel="New priority total needed"
            valueMinor={totalNeededMinor}
            onChangeMinor={setTotalNeededMinor}
          />
        </label>
        <button className="pp-primary-button" type="submit">
          <Target size={17} aria-hidden="true" /> Add Priority
        </button>
      </form>
    </Dialog>
  );
}
