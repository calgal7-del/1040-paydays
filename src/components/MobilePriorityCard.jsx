import React, { useEffect, useRef, useState } from "react";
import {
  Check,
  ChevronDown,
  ChevronUp,
  Heart,
  MoreHorizontal,
  ShieldCheck,
  Sun,
  TrendingUp,
} from "lucide-react";

const CURRENCIES = {
  USD: { symbol: "$", locale: "en-US" },
  GBP: { symbol: "£", locale: "en-GB" },
  EUR: { symbol: "€", locale: "en-IE" },
};

const BUCKETS = {
  live: {
    name: "Live Today",
    icon: Sun,
    className: "is-live",
  },
  protect: {
    name: "Protect Tomorrow",
    icon: ShieldCheck,
    className: "is-protect",
  },
  future: {
    name: "Plan Your Future",
    icon: TrendingUp,
    className: "is-future",
  },
  matters: {
    name: "Choose What Matters",
    icon: Heart,
    className: "is-matters",
  },
};

function money(minor, currency = "USD") {
  return new Intl.NumberFormat(
    CURRENCIES[currency]?.locale || "en-US",
    {
      style: "currency",
      currency: CURRENCIES[currency] ? currency : "USD",
      minimumFractionDigits: 2,
    },
  ).format((minor || 0) / 100);
}

function formatPaydayDate(iso) {
  if (!iso) return "No date";

  return new Intl.DateTimeFormat("en-CA", {
    month: "short",
    day: "numeric",
  }).format(new Date(`${iso}T12:00:00`));
}

function BucketIcon({ bucket, size = 18 }) {
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

function MoneyField({
  valueMinor,
  onChangeMinor,
  ariaLabel,
  currency = "USD",
  className = "",
}) {
  const [draft, setDraft] = useState(
    ((valueMinor || 0) / 100).toFixed(2),
  );

  const focused = useRef(false);

  useEffect(() => {
    if (!focused.current) {
      setDraft(((valueMinor || 0) / 100).toFixed(2));
    }
  }, [valueMinor]);

  return (
    <div className={`pp-money-input ${className}`}>
      <span aria-hidden="true">
        {CURRENCIES[currency]?.symbol || "$"}
      </span>

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
          const committed =
            Number.isFinite(parsed) && parsed >= 0
              ? Math.round(parsed * 100)
              : 0;

          onChangeMinor(committed);
          setDraft((committed / 100).toFixed(2));
        }}
      />
    </div>
  );
}

function AllocationField({
  priority,
  payday,
  updateAllocation,
  toggleAutoPayday,
  currency,
}) {
  const amountMinor = priority.allocations?.[payday.id] || 0;
  const isSelected = Boolean(priority.autoPaydays?.[payday.id]);

  return (
    <div
      className={`pp-allocation-field ${
        isSelected ? "is-selected" : ""
      }`}
    >
      <button
        type="button"
        className="pp-allocation-check"
        aria-label={`${
          isSelected ? "Remove" : "Add"
        } ${payday.label} as an Auto Distribute source for ${
          priority.name
        }`}
        aria-pressed={isSelected}
        onClick={() => toggleAutoPayday(priority.id, payday.id)}
      >
        {isSelected ? <Check size={14} aria-hidden="true" /> : null}
      </button>

      <MoneyField
        currency={currency}
        className="is-compact"
        ariaLabel={`${priority.name} allocation for ${payday.label}`}
        valueMinor={amountMinor}
        onChangeMinor={(nextMinor) =>
          updateAllocation(priority.id, payday.id, nextMinor)
        }
      />
    </div>
  );
}

export default function MobilePriorityCard({
  priority,
  data,
  visiblePaydays,
  isOpen,
  setExpandedPriorityId,
  updateAllocation,
  toggleAutoPayday,
  updatePriorityInline,
  openPriority,
}) {
  const funded = Object.values(priority.allocations || {}).reduce(
    (total, amount) => total + (Number(amount) || 0),
    0,
  );

  const remaining = Math.max(
    0,
    (priority.totalNeededMinor || 0) - funded,
  );

  const dueDate = /^\d{4}-\d{2}-\d{2}$/.test(priority.due || "")
    ? priority.due
    : "";

  return (
    <article
      className={`pp-mobile-priority-card ${
        isOpen ? "is-open" : "is-closed"
      }`}
    >
      <div className="pp-mobile-priority-card-head">
        <button
          className="pp-mobile-priority-summary"
          type="button"
          aria-expanded={isOpen}
          aria-controls={`priority-card-body-${priority.id}`}
          aria-label={`${isOpen ? "Collapse" : "Expand"} ${priority.name}`}
          onClick={() =>
            setExpandedPriorityId((current) =>
              current === priority.id ? "" : priority.id,
            )
          }
        >
          <BucketIcon bucket={priority.bucket} size={20} />

          <span className="pp-mobile-priority-copy">
            <strong>{priority.name}</strong>
            <small>
              {dueDate ? formatPaydayDate(dueDate) : priority.frequency || "No date"}
            </small>
          </span>

          <span className="pp-mobile-priority-values">
            <span>
              <small>Funded</small>
              <strong>{money(funded, data.currency)}</strong>
            </span>
            <span>
              <small>Remaining</small>
              <strong>{money(remaining, data.currency)}</strong>
            </span>
          </span>

          {isOpen ? (
            <ChevronUp className="pp-mobile-priority-chevron" size={20} aria-hidden="true" />
          ) : (
            <ChevronDown className="pp-mobile-priority-chevron" size={20} aria-hidden="true" />
          )}
        </button>

        <button
          className="pp-mobile-priority-menu"
          type="button"
          aria-label={`Edit ${priority.name}`}
          title={`Edit ${priority.name}`}
          onClick={() => openPriority(priority.id)}
        >
          <MoreHorizontal size={20} aria-hidden="true" />
        </button>
      </div>

      {isOpen && (
        <div
          className="pp-mobile-priority-card-body"
          id={`priority-card-body-${priority.id}`}
        >
          <label className="pp-mobile-priority-total">
            <span>Total needed</span>
            <MoneyField
              currency={data.currency}
              ariaLabel={`${priority.name} total needed`}
              valueMinor={priority.totalNeededMinor}
              onChangeMinor={(totalNeededMinor) =>
                updatePriorityInline(priority.id, { totalNeededMinor })
              }
            />
          </label>

          <div className="pp-mobile-priority-paydays">
            {visiblePaydays.map((payday, index) => (
              <div
                className="pp-mobile-priority-payday"
                key={payday.id}
              >
                <span className="pp-mobile-priority-payday-label">
                  <strong>P{index + 1}</strong>
                  <small>{formatPaydayDate(payday.date)}</small>
                </span>

                <AllocationField
                  priority={priority}
                  payday={payday}
                  currency={data.currency}
                  updateAllocation={updateAllocation}
                  toggleAutoPayday={toggleAutoPayday}
                />
              </div>
            ))}
          </div>

          <label className="pp-mobile-priority-notes">
            <span>Notes</span>

            <textarea
              aria-label={`Notes for ${priority.name}`}
              placeholder="Add notes..."
              value={priority.notes || ""}
              onChange={(event) =>
                updatePriorityInline(priority.id, {
                  notes: event.target.value,
                })
              }
            />
          </label>
        </div>
      )}
    </article>
  );
}
