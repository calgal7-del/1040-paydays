
import React, { useEffect, useMemo, useRef, useState } from "react";

const PAY_FREQUENCIES = [
  { key: "daily", label: "Daily (365)", periods: 365 },
  { key: "weekly", label: "Weekly (52)", periods: 52 },
  { key: "biweekly", label: "Biweekly (26)", periods: 26 },
  { key: "monthly", label: "Monthly (12)", periods: 12 },
];

function clamp(n, min, max) {
  return Math.min(max, Math.max(min, n));
}

// Reuse Intl formatters (much faster than instantiating per call)
const MONEY_FMT_0 = new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 });
const NUMBER_FMT_0 = new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 });

function formatCurrency(value) {
  // Display money values with a leading $ (no currency code).
  if (!Number.isFinite(value)) return "$0";
  const sign = value < 0 ? "-" : "";
  const abs = Math.abs(value);
  return `${sign}$${MONEY_FMT_0.format(abs)}`;
}

function formatPlainNumber(value, digits = 0) {
  if (!Number.isFinite(value)) return "0";
  if (digits === 0) return NUMBER_FMT_0.format(value);
  // Rare path: create a formatter only when digits are needed.
  return new Intl.NumberFormat("en-US", {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  }).format(value);
}

function parseNum(v) {
  const n = Number(String(v).replace(/[^0-9.-]/g, ""));
  return Number.isFinite(n) ? n : 0;
}

function computeProjection({
  currentAge,
  retirementAge,
  startingAmount,
  contributionPerPayday,
  annualRatePct,
  payPeriodsPerYear,
  windfallAmount = 0,
  windfallAtPeriod = null, // integer period index (1..totalPeriods)
  maxPoints = 240, // perf: keep charts responsive (0/undefined = keep all)
}) {
  const years = Math.max(0, retirementAge - currentAge);
  const totalPeriods = Math.max(0, Math.round(years * payPeriodsPerYear));

  const rAnnual = annualRatePct / 100;
  const rPerPeriod =
    payPeriodsPerYear > 0 ? Math.pow(1 + rAnnual, 1 / payPeriodsPerYear) - 1 : 0;

  let balance = startingAmount;
  let totalContrib = 0;

  // PERF: keep only a sampled set of points for charting.
  // Daily for 40 years = 14,600 points; compare = 3x that.
  // Sampling keeps the UI snappy without changing final totals.
  const keepAll = !Number.isFinite(maxPoints) || maxPoints <= 0;
  const sampleStep = keepAll ? 1 : Math.max(1, Math.ceil(totalPeriods / maxPoints));

  const points = [];
  points.push({
    periodIndex: 0,
    yearIndex: 0,
    balance,
    totalContrib,
    interestEarned: balance - startingAmount - totalContrib,
  });

  for (let i = 1; i <= totalPeriods; i++) {
    // optional one-time windfall (tax refund / bonus) at the chosen payday
    if (Number.isFinite(windfallAmount) && windfallAmount > 0 && windfallAtPeriod === i) {
      balance += windfallAmount;
      totalContrib += windfallAmount;
    }

    balance += contributionPerPayday;
    totalContrib += contributionPerPayday;

    const beforeInterest = balance;
    balance = balance * (1 + rPerPeriod);
    const interestThisPeriod = balance - beforeInterest;

    const yearIndex = i / payPeriodsPerYear;

    // Only store sampled points (always keep last)
    if (keepAll || i % sampleStep === 0 || i === totalPeriods) {
      points.push({
        periodIndex: i,
        yearIndex,
        balance,
        totalContrib,
        interestEarned: balance - startingAmount - totalContrib,
        interestThisPeriod,
      });
    }
  }

  return {
    years,
    totalPeriods,
    finalBalance: balance,
    finalContrib: totalContrib,
    finalInterest: balance - startingAmount - totalContrib,
    points,
  };
}

function niceStep(span, targetTicks) {
  if (!Number.isFinite(span) || span <= 0) return 1;
  const raw = span / Math.max(1, targetTicks);
  const pow = Math.pow(10, Math.floor(Math.log10(raw)));
  const scaled = raw / pow;
  const nice = scaled <= 1 ? 1 : scaled <= 2 ? 2 : scaled <= 5 ? 5 : 10;
  return nice * pow;
}

function niceCeil(n) {
  if (!Number.isFinite(n) || n <= 0) return 1;
  const pow = Math.pow(10, Math.floor(Math.log10(n)));
  const scaled = n / pow;
  const nice = scaled <= 1 ? 1 : scaled <= 2 ? 2 : scaled <= 5 ? 5 : 10;
  return nice * pow;
}

function pickTicks(min, max, targetTicks = 4) {
  if (!Number.isFinite(min) || !Number.isFinite(max) || max <= min) return [];
  const span = max - min;
  const step = niceStep(span, targetTicks);
  const niceMax = Math.max(step, niceCeil(max));
  const ticks = [];
  for (let v = 0; v <= niceMax + step / 2; v += step) ticks.push(v);
  return ticks;
}

function makeLogTicks(max) {
  // Returns “nice” money ticks for a log-scale axis while keeping labels in real dollars.
  // Uses 1/2/5 * 10^k plus 0.
  const m = Math.max(1, Number(max) || 1);
  const ticks = [0];
  const maxPow = Math.floor(Math.log10(m));
  const bases = [1, 2, 5];
  for (let p = 0; p <= maxPow; p++) {
    const pow = Math.pow(10, p);
    for (const b of bases) {
      const v = b * pow;
      if (v <= m) ticks.push(v);
    }
  }
  // Ensure the top tick is close to max (helps big values feel anchored).
  if (ticks[ticks.length - 1] !== m) ticks.push(m);

  // De-dupe & thin for readability
  const uniq = Array.from(new Set(ticks)).sort((a, b) => a - b);
  // Aim for ~5–7 ticks max
  if (uniq.length <= 7) return uniq;

  const kept = [0];
  // Keep roughly every other tick, always keep the last.
  for (let i = 1; i < uniq.length - 1; i++) {
    if (i % 2 === 1) kept.push(uniq[i]);
  }
  kept.push(uniq[uniq.length - 1]);
  return kept;
}

function logT(y) {
  // Stable log transform for charting: log10(y+1) handles zero cleanly.
  const v = Math.max(0, Number(y) || 0);
  return Math.log10(v + 1);
}

function formatAxisMoney(v) {
  if (!Number.isFinite(v)) return "$0";
  const abs = Math.abs(v);
  const sign = v < 0 ? "-" : "";
  if (abs >= 1_000_000_000) {
    const t = (abs / 1_000_000_000).toFixed(1).replace(/\.0$/, "");
    return `${sign}$${t}B`;
  }
  if (abs >= 1_000_000) {
    const t = (abs / 1_000_000).toFixed(1).replace(/\.0$/, "");
    return `${sign}$${t}M`;
  }
  if (abs >= 1_000) {
    const t = Math.round(abs / 1_000);
    return `${sign}$${t}K`;
  }
  return formatCurrency(v);
}

// ---- Stability: show a readable error instead of a blank preview ----
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }
  static getDerivedStateFromError(error) {
    return { error };
  }
  componentDidCatch(error, info) {
    // Keep console output for debugging in preview
    // eslint-disable-next-line no-console
    console.error("1040 Paydays preview error:", error, info);
  }
  render() {
    if (this.state.error) {
      const msg = String(this.state.error?.message || this.state.error);
      return (
        <div style={{ padding: 18, fontFamily: "var(--font-sans)" }}>
          <div style={{ fontWeight: 950, fontSize: 16, marginBottom: 8 }}>
            This preview hit an error
          </div>
          <div style={{ color: "#526171", fontWeight: 800, fontSize: 13, marginBottom: 10 }}>
            Copy/paste the message below to me and I’ll fix it instantly.
          </div>
          <pre
            style={{
              whiteSpace: "pre-wrap",
              background: "#ffffff",
              border: "1px solid rgba(15,23,42,0.14)",
              borderRadius: 12,
              padding: 12,
              fontSize: 12,
              lineHeight: 1.35,
            }}
          >
            {msg}
          </pre>
        </div>
      );
    }
    return this.props.children;
  }
}

const LineChart = React.memo(function LineChart({ series, contribSeries, scaleMode = "linear", xLabelMode = "years", currentAge, yMaxOverride }) {
  const [hover, setHover] = useState(null);
  const safeSeries = Array.isArray(series) ? series.filter((p) => Number.isFinite(p?.x) && Number.isFinite(p?.y)) : [];
  if (safeSeries.length === 0) {
    return (
      <div className="chartCard">
        <div className="chartHeader">
          <div className="chartLegend">
            <span className="legendDot" />
            <span className="legendText">Projected balance</span>
          </div>
        </div>
        <div className="chartWrap" style={{ padding: 18 }}>
          <div style={{ color: "var(--muted)", fontWeight: 900, fontSize: 13 }}>Enter values to see the chart.</div>
        </div>
      </div>
    );
  }
  const W = 920;
  const H = 360;
  const padL = 56;
  const padR = 20;
  const padT = 18;
  const padB = 42;

  const xs = safeSeries.map((p) => p.x);
    const ys = safeSeries.map((p) => p.y);
  const contribSafe = Array.isArray(contribSeries)
    ? contribSeries.filter((p) => Number.isFinite(p?.x) && Number.isFinite(p?.y))
    : [];
  const contribYs = contribSafe.map((p) => p.y);

  const xMin = Math.min(...xs);
  const xMax = Math.max(...xs);
    const yMin = 0;
  const computedMax = Math.max(1, ...ys, ...contribYs);
  const yMaxMoney = Number.isFinite(yMaxOverride) ? Math.max(1, yMaxOverride) : computedMax;

  const useLog = scaleMode === "log";
  const yTicks = useLog ? makeLogTicks(yMaxMoney) : pickTicks(yMin, yMaxMoney, 3);

  const xToPx = (x) => {
    const t = xMax === xMin ? 0 : (x - xMin) / (xMax - xMin);
    return padL + t * (W - padL - padR);
  };
    const yToPx = (y) => {
    if (useLog) {
      const denom = logT(yMaxMoney) || 1;
      const t = denom === 0 ? 0 : logT(y) / denom;
      return H - padB - t * (H - padT - padB);
    }
    const t = yMaxMoney === yMin ? 0 : (y - yMin) / (yMaxMoney - yMin);
    return H - padB - t * (H - padT - padB);
  };

  const d = safeSeries
    .map(
      (p, i) =>
        `${i === 0 ? "M" : "L"} ${xToPx(p.x).toFixed(2)} ${yToPx(p.y).toFixed(2)}`
    )
    .join(" ");

  const xLabelLeft = xLabelMode === "age" ? `${currentAge}` : "0";
  const xLabelRight =
    xLabelMode === "age" ? `${Math.round(currentAge + xMax)}` : `${Math.round(xMax)}`;

  const xMid = (xMin + xMax) / 2;
  const xTicks = [xMin, xMid, xMax];

  return (
    <div className="chartCard">
      <div className="chartHeader">
        <div className="chartLegend">
          <span className="legendDot" />
          <span className="legendText">Projected balance</span>
        </div>
      </div>

      <div className="chartWrap">
      <svg
        className="chartSvg"
        viewBox={`0 0 ${W} ${H}`}
        role="img"
        aria-label="Projected balance chart"
        onMouseLeave={() => setHover(null)}
                onMouseMove={(e) => {
          const svg = e.currentTarget;
          // PERF: avoid layout thrash; read rect once per frame
          const rect = svg.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const innerX = Math.max(56, Math.min(920 - 20, (x / rect.width) * 920));
          const t = (innerX - 56) / (920 - 56 - 20);
          const idx = Math.round(t * (safeSeries.length - 1));
          const idxClamped = Math.max(0, Math.min(safeSeries.length - 1, idx));
          const p = safeSeries[idxClamped];
          const px = innerX;
          const py = yToPx(p.y);
          const label =
            xLabelMode === "age"
              ? `Age ${Math.round(currentAge + p.x)}`
              : `Year ${Math.round(p.x)}`;
          // Clamp tooltip inside the SVG area so it never goes off-screen
          const clampedPx = Math.max(padL, Math.min(W - padR, px));
          const clampedPy = Math.max(padT, Math.min(H - padB, py));

          const c = contribSafe[idxClamped]?.y;
          setHover({ px: clampedPx, py: clampedPy, label, value: p.y, contrib: Number.isFinite(c) ? c : null });
        }}
      >
        {yTicks.map((t, idx) => {
          const y = yToPx(t);
          return (
            <g key={idx}>
              <line x1={padL} x2={W - padR} y1={y} y2={y} className="gridLine" />
              <text
                x={padL - 10}
                y={y + 4}
                textAnchor="end"
                className="axisText"
              >
                {formatAxisMoney(t)}
              </text>
            </g>
          );
        })}

        {xTicks.map((t, idx) => {
          const x = xToPx(t);
          return <line key={idx} x1={x} x2={x} y1={padT} y2={H - padB} className="gridLineX" />;
        })}

        <line x1={padL} x2={W - padR} y1={H - padB} y2={H - padB} className="axisLine" />

        <text x={padL} y={H - 16} textAnchor="start" className="axisText">
          {xLabelLeft}
        </text>
        <text x={(padL + (W - padR)) / 2} y={H - 16} textAnchor="middle" className="axisText">
          {xLabelMode === "age" ? `${Math.round(currentAge + xMid)}` : `${Math.round(xMid)}`}
        </text>
        <text x={W - padR} y={H - 16} textAnchor="end" className="axisText">
          {xLabelRight}
        </text>

        <path
          d={`${d} L ${xToPx(xMax)} ${yToPx(0)} L ${xToPx(xMin)} ${yToPx(0)} Z`}
          className="areaFill"
        />

                {contribSafe.length > 1 && (
          <path
            d={contribSafe
              .map((p, i) => `${i === 0 ? "M" : "L"} ${xToPx(p.x).toFixed(2)} ${yToPx(p.y).toFixed(2)}`)
              .join(" ")}
            className="contribPath"
          />
        )}

        <path d={d} className="linePath" />

        {safeSeries.length > 0 && (
          <circle
            cx={xToPx(safeSeries[safeSeries.length - 1].x)}
            cy={yToPx(safeSeries[safeSeries.length - 1].y)}
            r="5.5"
            className="endDot"
          />
        )}
      </svg>

      {hover && (
        <>
          <svg className="hoverOverlay" viewBox={`0 0 ${W} ${H}`} aria-hidden>
            <line x1={hover.px} x2={hover.px} y1={padT} y2={H - padB} className="crosshairV" />
            <line x1={padL} x2={W - padR} y1={hover.py} y2={hover.py} className="crosshairH" />
            <circle cx={hover.px} cy={hover.py} r="4.25" className="hoverDot" />
          </svg>

          <div
            className="tooltip"
            style={{
              left: hover.px,
              top: hover.py,
              transform:
                hover.px > W - 220
                  ? hover.py < padT + 60
                    ? "translate(-184px, 14px)"
                    : "translate(-184px, -14px)"
                  : hover.py < padT + 60
                    ? "translate(12px, 14px)"
                    : "translate(12px, -14px)",
            }}
            role="status"
            aria-label="Chart tooltip"
          >
            <div className="ttTitle">{hover.label}</div>
            <div className="ttValue">{formatCurrency(hover.value)}</div>
            {Number.isFinite(hover.contrib) && (
              <div className="ttSub" style={{ marginTop: 6 }}>
                Contributions: <span className="ttSubEm">{formatCurrency(hover.contrib)}</span>
              </div>
            )}
          </div>
        </>
      )}
      </div>
    </div>
  );
});

// --- Compare overlay chart (±2%) ---
function CompareOverlayChart({
  projections,
  rates,
  contribSeries,
  scaleMode = "linear",
  xAxisMode = "age",
  currentAge,
  yMaxOverride,
}) {
  const [hover, setHover] = useState(null);

  const safeProjs = Array.isArray(projections) ? projections.filter(Boolean) : [];
  if (safeProjs.length === 0) {
    return (
      <div className="chartCard">
        <div className="chartHeader">
          <div className="chartLegend compareLegend">
            <span className="legendText">Compare</span>
          </div>
        </div>
        <div className="chartWrap" style={{ padding: 18 }}>
          <div style={{ color: "var(--muted)", fontWeight: 900, fontSize: 13 }}>
            Turn on Compare to see multiple lines.
          </div>
        </div>
      </div>
    );
  }

  const W = 920;
  const H = 360;
  const padL = 56;
  const padR = 20;
  const padT = 18;
  const padB = 42;

  const useLog = scaleMode === "log";

  // Build series from sampled points
  const seriesList = safeProjs.map((p) => {
    const pts = Array.isArray(p.points) ? p.points : [];
    return pts
      .map((pt) => ({ x: pt.yearIndex, y: pt.balance }))
      .filter((pt) => Number.isFinite(pt.x) && Number.isFinite(pt.y));
  });

  const contribSafe = Array.isArray(contribSeries)
    ? contribSeries.filter((p) => Number.isFinite(p?.x) && Number.isFinite(p?.y))
    : [];

  const xsAll = seriesList.flat().map((p) => p.x);
  const xMin = xsAll.length ? Math.min(...xsAll) : 0;
  const xMax = xsAll.length ? Math.max(...xsAll) : 1;

  const ysAll = seriesList.flat().map((p) => p.y);
  const contribYs = contribSafe.map((p) => p.y);
  const computedMax = Math.max(1, ...(ysAll.length ? ysAll : [1]), ...(contribYs.length ? contribYs : [1]));
  const yMaxMoney = Number.isFinite(yMaxOverride) ? Math.max(1, yMaxOverride) : computedMax;
  const yMin = 0;

  const yTicks = useLog ? makeLogTicks(yMaxMoney) : pickTicks(yMin, yMaxMoney, 3);

  const xToPx = (x) => {
    const t = xMax === xMin ? 0 : (x - xMin) / (xMax - xMin);
    return padL + t * (W - padL - padR);
  };
  const yToPx = (y) => {
    if (useLog) {
      const denom = logT(yMaxMoney) || 1;
      const t = denom === 0 ? 0 : logT(y) / denom;
      return H - padB - t * (H - padT - padB);
    }
    const t = yMaxMoney === yMin ? 0 : (y - yMin) / (yMaxMoney - yMin);
    return H - padB - t * (H - padT - padB);
  };

  const xMid = (xMin + xMax) / 2;
  const xTicks = [xMin, xMid, xMax];

  const xLabel = (x) => {
    if (xAxisMode === "age") return `${Math.round((Number(currentAge) || 0) + x)}`;
    return `${Math.round(x)}`;
  };

  const lineClassByIdx = (i) => (i === 0 ? "line5" : i === 1 ? "line7" : "line9");

  const buildPath = (s) =>
    s
      .map((p, i) => `${i === 0 ? "M" : "L"} ${xToPx(p.x).toFixed(2)} ${yToPx(p.y).toFixed(2)}`)
      .join(" ");

  // Hover uses the base (middle) series as the cursor anchor
  const baseIdx = Math.min(1, seriesList.length - 1);
  const baseSeries = seriesList[baseIdx] || [];

  return (
    <div className="chartCard">
      <div className="chartHeader">
        <div className="chartLegend compareLegend">
          <span className="legendDot" />
          <span className="legendText">Projected balance (compare)</span>
          <div className="legendSmall" aria-label="Comparison legend">
            <div className="lgItem">
              <span className="lgSwatch s5" />
              {Number.isFinite(rates?.[0]) ? `${Number(rates[0]).toFixed(1).replace(/\.0$/, "")}%` : "Low"}
            </div>
            <div className="lgItem">
              <span className="lgSwatch s7" />
              {Number.isFinite(rates?.[1]) ? `${Number(rates[1]).toFixed(1).replace(/\.0$/, "")}%` : "Base"}
            </div>
            <div className="lgItem">
              <span className="lgSwatch s9" />
              {Number.isFinite(rates?.[2]) ? `${Number(rates[2]).toFixed(1).replace(/\.0$/, "")}%` : "High"}
            </div>
          </div>
        </div>
      </div>

      <div className="chartWrap">
        <svg
          className="chartSvg"
          viewBox={`0 0 ${W} ${H}`}
          role="img"
          aria-label="Comparison projected balance chart"
          onMouseLeave={() => setHover(null)}
          onMouseMove={(e) => {
            if (!baseSeries.length) return;
            const svg = e.currentTarget;
            const rect = svg.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const innerX = Math.max(padL, Math.min(W - padR, (x / rect.width) * W));
            const t = (innerX - padL) / (W - padL - padR);
            const idx = Math.round(t * (baseSeries.length - 1));
            const idxClamped = Math.max(0, Math.min(baseSeries.length - 1, idx));
            const anchor = baseSeries[idxClamped];

            const values = seriesList.map((s, i) => {
              const p = s[Math.min(idxClamped, s.length - 1)] || s[s.length - 1];
              return { rate: rates?.[i] ?? i, y: p?.y ?? 0 };
            });

            const px = innerX;
            const py = yToPx(anchor.y);
            const label = xAxisMode === "age" ? `Age ${xLabel(anchor.x)}` : `Year ${xLabel(anchor.x)}`;
            const c = contribSafe[Math.min(idxClamped, contribSafe.length - 1)]?.y;

            setHover({
              px,
              py,
              label,
              values,
              contrib: Number.isFinite(c) ? c : null,
            });
          }}
        >
          {yTicks.map((t, idx) => {
            const y = yToPx(t);
            return (
              <g key={idx}>
                <line x1={padL} x2={W - padR} y1={y} y2={y} className="gridLine" />
                <text x={padL - 10} y={y + 4} textAnchor="end" className="axisText">
                  {formatAxisMoney(t)}
                </text>
              </g>
            );
          })}

          {xTicks.map((t, idx) => {
            const x = xToPx(t);
            return <line key={idx} x1={x} x2={x} y1={padT} y2={H - padB} className="gridLineX" />;
          })}

          <line x1={padL} x2={W - padR} y1={H - padB} y2={H - padB} className="axisLine" />

          <text x={padL} y={H - 16} textAnchor="start" className="axisText">
            {xLabel(xMin)}
          </text>
          <text x={(padL + (W - padR)) / 2} y={H - 16} textAnchor="middle" className="axisText">
            {xLabel(xMid)}
          </text>
          <text x={W - padR} y={H - 16} textAnchor="end" className="axisText">
            {xLabel(xMax)}
          </text>

          {/* Contributions (same across scenarios) */}
          {contribSafe.length > 1 && (
            <path
              d={contribSafe
                .map((p, i) => `${i === 0 ? "M" : "L"} ${xToPx(p.x).toFixed(2)} ${yToPx(p.y).toFixed(2)}`)
                .join(" ")}
              className="contribPath"
            />
          )}

          {/* Lines */}
          {seriesList.map((s, i) => (
            <path key={i} d={buildPath(s)} className={lineClassByIdx(i)} fill="none" />
          ))}
        </svg>

        {hover && (
          <>
            <svg className="hoverOverlay" viewBox={`0 0 ${W} ${H}`} aria-hidden>
              <line x1={hover.px} x2={hover.px} y1={padT} y2={H - padB} className="crosshairV" />
              <line x1={padL} x2={W - padR} y1={hover.py} y2={hover.py} className="crosshairH" />
              <circle cx={hover.px} cy={hover.py} r="4.25" className="hoverDot" />
            </svg>

            <div
              className="tooltip"
              style={{
                left: hover.px,
                top: hover.py,
                transform:
                  hover.px > W - 220
                    ? hover.py < padT + 60
                      ? "translate(-184px, 14px)"
                      : "translate(-184px, -14px)"
                    : hover.py < padT + 60
                      ? "translate(12px, 14px)"
                      : "translate(12px, -14px)",
              }}
              role="status"
              aria-label="Comparison chart tooltip"
            >
              <div className="ttTitle">{hover.label}</div>
              <div style={{ marginTop: 6, display: "grid", gap: 6 }}>
                {hover.values.map((v, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <span
                      style={{
                        width: 14,
                        height: 4,
                        borderRadius: 999,
                        background: i === 1 ? "var(--accent)" : i === 0 ? "rgba(82,97,113,0.55)" : "rgba(15,79,149,0.55)",
                        flex: "0 0 auto",
                      }}
                    />
                    <span style={{ fontSize: 12, fontWeight: 950, color: "#2b3b52", minWidth: 46 }}>
                      {Number.isFinite(v.rate) ? Number(v.rate).toFixed(1).replace(/\.0$/, "") + "%" : ""}
                    </span>
                    <span style={{ marginLeft: "auto", fontSize: 12, fontWeight: 950, color: "var(--ink)" }}>
                      {formatCurrency(v.y)}
                    </span>
                  </div>
                ))}
              </div>
              {Number.isFinite(hover.contrib) && (
                <div className="ttSub" style={{ marginTop: 6 }}>
                  Contributions: <span className="ttSubEm">{formatCurrency(hover.contrib)}</span>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

function Breakdown({ finalContrib, finalInterest }) {
  const total = Math.max(0, (Number(finalContrib) || 0) + (Number(finalInterest) || 0));
  const contribPct = total ? (finalContrib / total) * 100 : 0;
  const growthPct = total ? (finalInterest / total) * 100 : 0;
  return (
    <div className="breakdownCard">
      <div className="breakdownRow">
        <div className="breakdownLabel">Contributions</div>
        <div className="breakdownValue">{formatCurrency(finalContrib)}</div>
      </div>
      <div className="barWrap" aria-hidden>
        <div className="bar barContrib" style={{ width: `${Math.max(0, Math.min(100, contribPct))}%` }} />
      </div>

      <div style={{ height: 10 }} />

      <div className="breakdownRow">
        <div className="breakdownLabel">Estimated growth</div>
        <div className="breakdownValue">{formatCurrency(finalInterest)}</div>
      </div>
      <div className="barWrap" aria-hidden>
        <div className="bar barGrowth" style={{ width: `${Math.max(0, Math.min(100, growthPct))}%` }} />
      </div>

      <div className="breakdownNote">A simple split of deposits vs. compounded growth.</div>
    </div>
  );
}

function CompareBreakdown({ projections, rates }) {
  const safe = Array.isArray(projections) ? projections : [];
  return (
    <div className="breakdownCompare">
      {safe.map((p, i) => (
        <div key={i} className="breakdownMini">
          <div className="breakdownMiniTop">
            <div className="breakdownMiniRate">
              {Number.isFinite(rates?.[i]) ? `${Number(rates[i]).toFixed(1).replace(/\.0$/, "")}%` : ""}
            </div>
            <div className="breakdownMiniTotal">{formatCurrency(p.finalBalance)}</div>
          </div>
          <div className="descLine2">
            Contributions: <span className="descEm">{formatCurrency(p.finalContrib)}</span>
          </div>
          <div className="descLine2">
            Growth: <span className="descEm">{formatCurrency(p.finalInterest)}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

function niceRoundUp(n) {
  if (!Number.isFinite(n) || n <= 0) return 1;
  const pow = Math.pow(10, Math.floor(Math.log10(n)));
  const scaled = n / pow;
  const nice = scaled <= 1 ? 1 : scaled <= 2 ? 2 : scaled <= 5 ? 5 : 10;
  return nice * pow;
}

function clampInt(n, min, max) {
  const v = Math.round(Number(n));
  if (!Number.isFinite(v)) return min;
  return Math.min(max, Math.max(min, v));
}

function windfallPeriodFromChoice({
  when,
  atYear,
  atAge,
  atPayday,
  currentAge,
  payPeriodsPerYear,
  totalPeriods,
}) {
  if (!when) return null;
  if (when === "none") return null;
  if (when === "now") return 1;
  if (when === "year") {
    const y = clampInt(atYear, 1, 80);
    return clampInt(y * payPeriodsPerYear, 1, totalPeriods);
  }
  if (when === "age") {
    const targetAge = clampInt(atAge, currentAge, currentAge + 80);
    const yearsFromNow = Math.max(0, targetAge - currentAge);
    return clampInt(yearsFromNow * payPeriodsPerYear, 1, totalPeriods);
  }
  if (when === "payday") {
    return clampInt(atPayday, 1, totalPeriods);
  }
  return null;
}

// ---- No-account retention: Save plans + shareable URL ----
const SAVED_PLANS_KEY = "paydays_saved_plans_v1";

function safeB64Encode(str) {
  // URL-safe base64 (UTF-8 safe) with broad fallbacks for embedded previews.
  try {
    const s = String(str);

    // Prefer TextEncoder when available
    if (typeof TextEncoder !== "undefined" && typeof btoa !== "undefined") {
      const bytes = new TextEncoder().encode(s);
      let binary = "";
      for (let i = 0; i < bytes.length; i++) binary += String.fromCharCode(bytes[i]);
      return btoa(binary)
        .replace(/\+/g, "-")
        .replace(/\//g, "_")
        .replace(/=+$/g, "");
    }

    // Fallback: encodeURIComponent -> binary
    if (typeof btoa !== "undefined") {
      const binary = unescape(encodeURIComponent(s));
      return btoa(binary)
        .replace(/\+/g, "-")
        .replace(/\//g, "_")
        .replace(/=+$/g, "");
    }

    return "";
  } catch {
    return "";
  }
}

function safeB64Decode(b64) {
  try {
    if (!b64) return null;
    const s = String(b64).replace(/-/g, "+").replace(/_/g, "/");
    const padded = s + "===".slice((s.length + 3) % 4);

    if (typeof atob === "undefined") return null;
    const binary = atob(padded);

    // Prefer TextDecoder when available
    if (typeof TextDecoder !== "undefined") {
      const bytes = new Uint8Array(binary.length);
      for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
      return new TextDecoder().decode(bytes);
    }

    // Fallback: binary -> decodeURIComponent
    return decodeURIComponent(escape(binary));
  } catch {
    return null;
  }
}

function encodePlanToQuery(planObj) {
  try {
    return safeB64Encode(JSON.stringify(planObj));
  } catch {
    return "";
  }
}

function decodePlanFromQuery(token) {
  const json = safeB64Decode(token);
  if (!json) return null;
  try {
    const obj = JSON.parse(json);
    return obj && typeof obj === "object" ? obj : null;
  } catch {
    return null;
  }
}

function readSavedPlans() {
  try {
    const raw = localStorage.getItem(SAVED_PLANS_KEY);
    if (!raw) return [];
    const arr = JSON.parse(raw);
    return Array.isArray(arr) ? arr : [];
  } catch {
    return [];
  }
}

function writeSavedPlans(plans) {
  try {
    localStorage.setItem(SAVED_PLANS_KEY, JSON.stringify(plans));
  } catch {
    // ignore
  }
}

export default function App() {
  const [savedPlans, setSavedPlans] = useState([]); // {id,name,ts,data}
  const [planName, setPlanName] = useState("");

  // Mobile stability: on short screens, auto-collapse lower sections so everything fits without zoom.
  const [isShortMobile, setIsShortMobile] = useState(false);
  const [showSavedList, setShowSavedList] = useState(true);
  // Tracks the currently loaded/saved plan name for printing (optional).
  const [activePlanName, setActivePlanName] = useState("");

  const applyPlanData = (data) => {
    // Plan loaded from a share link doesn't have a trusted local "plan name".
    // Keep the last local plan name only when the user explicitly loads/saves one.

    if (!data || typeof data !== "object") return;
    if (data.currentAge != null) setCurrentAge(String(data.currentAge));
    if (data.retirementAge != null) {
      setRetirementAge(String(data.retirementAge));
      setTargetAgeManual(true);
    }
    if (data.startingAmount != null) setStartingAmount(String(data.startingAmount));
    if (data.contributionPerPayday != null) setContributionPerPayday(String(data.contributionPerPayday));
    if (data.annualRatePct != null) setAnnualRatePct(String(data.annualRatePct));
    if (data.frequencyKey != null) setFrequencyKey(String(data.frequencyKey));

    if (data.windfallAmount != null) setWindfallAmount(String(data.windfallAmount));
    if (data.windfallWhen != null) setWindfallWhen(String(data.windfallWhen));
    if (data.windfallAtYear != null) setWindfallAtYear(String(data.windfallAtYear));
    if (data.windfallAtAge != null) setWindfallAtAge(String(data.windfallAtAge));
    if (data.windfallAtPayday != null) setWindfallAtPayday(String(data.windfallAtPayday));

    if (data.xAxisMode != null) setXAxisMode(String(data.xAxisMode));

    // Don’t force advanced open; keep it simple unless the plan uses windfalls.
    const wfAmt = parseNum(data.windfallAmount ?? 0);
    const wfWhen = String(data.windfallWhen ?? "none");
    if (wfAmt > 0 || wfWhen !== "none") {
            setWindfallOpen(true);
    }

    // Refit chart scale to the loaded plan
    setYMaxDisplay(0);
    setScaleResetToken((t) => t + 1);
  };

  const getPlanSnapshot = () => {
    return {
      v: 1,
      currentAge: clampInt(parseNum(currentAge), 0, 120),
      retirementAge: clampInt(parseNum(retirementAge), 0, 120),
      startingAmount: parseNum(startingAmount),
      contributionPerPayday: parseNum(contributionPerPayday),
      annualRatePct: clamp(parseNum(annualRatePct), 1, 15),
      frequencyKey,
      windfallAmount: parseNum(windfallAmount),
      windfallWhen,
      windfallAtYear: clampInt(parseNum(windfallAtYear), 1, 80),
      windfallAtAge: clampInt(parseNum(windfallAtAge), 0, 120),
      windfallAtPayday: clampInt(parseNum(windfallAtPayday), 1, 50000),
      xAxisMode,
    };
  };

  const buildShareUrl = () => {
    try {
      const token = encodePlanToQuery(getPlanSnapshot());
      const url = new URL(window.location.href);
      url.searchParams.set("p", token);
      return url.toString();
    } catch {
      return "";
    }
  };

  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch {
      try {
        // Fallback for older browsers
        window.prompt("Copy this link:", text);
        return true;
      } catch {
        return false;
      }
    }
  };

  const saveCurrentPlan = () => {
    const data = getPlanSnapshot();
    const name = (planName || "My plan").trim().slice(0, 40);
    const entry = {
      id: `${Date.now()}_${Math.random().toString(16).slice(2)}`,
      name,
      ts: Date.now(),
      data,
    };
    setSavedPlans((prev) => {
      const next = [entry, ...prev].slice(0, 5);
      writeSavedPlans(next);
      return next;
    });
    setActivePlanName(name);
    setPlanName("");
  };

  const loadSavedPlan = (entry) => {
    if (!entry?.data) return;
    setActivePlanName(String(entry?.name || ""));
    applyPlanData(entry.data);
  };

  const deleteSavedPlan = (id) => {
    setSavedPlans((prev) => {
      const next = prev.filter((p) => p.id !== id);
      writeSavedPlans(next);
      return next;
    });
  };

  // Load saved plans from localStorage once
  useEffect(() => {
    setSavedPlans(readSavedPlans());
  }, []);

  // Detect small-height mobile screens and auto-collapse non-critical UI.
  useEffect(() => {
    const compute = () => {
      const w = typeof window !== "undefined" ? window.innerWidth : 1200;
      const h = typeof window !== "undefined" ? window.innerHeight : 900;
      const short = w <= 1100 && h <= 760;
      setIsShortMobile(short);
      setShowSavedList(!short);
    };
    compute();
    if (typeof window === "undefined") return;
    window.addEventListener("resize", compute, { passive: true });
    return () => window.removeEventListener("resize", compute);
  }, []);

  // Load plan from share URL once (no account)
  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const token = params.get("p");
      if (!token) return;
      const decoded = decodePlanFromQuery(token);
      if (decoded) applyPlanData(decoded);
    } catch {
      // ignore
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handlePrint = () => {
    // Some embedded previews block window.print(); provide a safe fallback.
    try {
      if (typeof window === "undefined") return;
      // Close any open modals so the printout isn't obstructed
      setLeadOpen(false);
      setBookOpen(false);
      window.focus?.();
      // Let layout settle (charts/fonts) before printing
      requestAnimationFrame(() => {
        setTimeout(() => {
          try {
            window.print();
          } catch (e) {
            // Fallback: instruct the user to use the browser print dialog
            // eslint-disable-next-line no-alert
            alert("Printing is blocked in this preview. Use your browser menu: File → Print (or Ctrl/Cmd+P). ");
          }
        }, 50);
      });
    } catch (e) {
      // eslint-disable-next-line no-alert
      alert("Printing is blocked in this preview. Use your browser menu: File → Print (or Ctrl/Cmd+P). ");
    }
  };

  // Header CTAs (wired, not decorative)
  const [leadOpen, setLeadOpen] = useState(false);
  const [bookOpen, setBookOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [leadStatus, setLeadStatus] = useState("idle"); // idle | sent
  const [bookStatus, setBookStatus] = useState("idle"); // idle | sent
  const [emailTouched, setEmailTouched] = useState(false);
  const emailOk = /^\S+@\S+\.\S+$/.test(email.trim());

  const [currentAge, setCurrentAge] = useState("35");
  const [retirementAge, setRetirementAge] = useState("65");
  // If true, user has manually edited Target age (so we won't overwrite it when Current age ≤ 65).
  const [targetAgeManual, setTargetAgeManual] = useState(false);

  // Target age behavior (always overrideable):
  // - Default target age is 65 when Current age ≤ 65.
  // - Default target age is Current age when Current age > 65.
  // - If the user manually edits Target age, we never overwrite it.
  useEffect(() => {
    const ca = clampInt(parseNum(currentAge), 0, 120);

    if (targetAgeManual) return;

    if (ca > 65) {
      setRetirementAge(String(ca));
    } else {
      setRetirementAge("65");
    }
  }, [currentAge, targetAgeManual]);
  const [startingAmount, setStartingAmount] = useState("0");
  const [windfallAmount, setWindfallAmount] = useState("0");
  const [windfallOpen, setWindfallOpen] = useState(false);
  const [windfallWhen, setWindfallWhen] = useState("none"); // none | now | year | age | payday
  const [windfallAtYear, setWindfallAtYear] = useState("1");
  const [windfallAtAge, setWindfallAtAge] = useState("45");
  const [windfallAtPayday, setWindfallAtPayday] = useState("1");
  const [contributionPerPayday, setContributionPerPayday] = useState("50");
    const [annualRatePct, setAnnualRatePct] = useState("7");
  const [yScaleMode, setYScaleMode] = useState("linear"); // linear | log
  const [frequencyKey, setFrequencyKey] = useState("biweekly");

  const [vizMode, setVizMode] = useState("line");
  const [scenarioMode, setScenarioMode] = useState("single");
  const [xAxisMode, setXAxisMode] = useState("age");

  const payPeriodsPerYear = useMemo(() => {
    return PAY_FREQUENCIES.find((f) => f.key === frequencyKey)?.periods ?? 12;
  }, [frequencyKey]);

  const projectionSingle = useMemo(() => {
    // compute a temporary totalPeriods for clamping the windfall timing
    const years = Math.max(0, parseNum(retirementAge) - parseNum(currentAge));
    const totalPeriods = Math.max(0, Math.round(years * payPeriodsPerYear));
    const windfallAtPeriod = windfallPeriodFromChoice({
      when: windfallWhen,
      atYear: windfallAtYear,
      atAge: windfallAtAge,
      atPayday: windfallAtPayday,
      currentAge: clampInt(parseNum(currentAge), 0, 120),
      payPeriodsPerYear,
      totalPeriods,
    });

    return computeProjection({
      currentAge: parseNum(currentAge),
      retirementAge: parseNum(retirementAge),
      startingAmount: parseNum(startingAmount),
      contributionPerPayday: parseNum(contributionPerPayday),
      annualRatePct: clamp(parseNum(annualRatePct), 1, 15),
      payPeriodsPerYear,
      windfallAmount: parseNum(windfallAmount),
      windfallAtPeriod,
      maxPoints: 240,
    });
  }, [currentAge, retirementAge, startingAmount, contributionPerPayday, annualRatePct, payPeriodsPerYear, windfallAmount, windfallWhen, windfallAtYear, windfallAtAge, windfallAtPayday]);

  const projectionCompare = useMemo(() => {
    const years = Math.max(0, parseNum(retirementAge) - parseNum(currentAge));
    const totalPeriods = Math.max(0, Math.round(years * payPeriodsPerYear));
    const windfallAtPeriod = windfallPeriodFromChoice({
      when: windfallWhen,
      atYear: windfallAtYear,
      atAge: windfallAtAge,
      atPayday: windfallAtPayday,
      currentAge: clampInt(parseNum(currentAge), 0, 120),
      payPeriodsPerYear,
      totalPeriods,
    });

    const base = clamp(parseNum(annualRatePct), 1, 15);

    const rates = [clamp(base - 2, 1, 15), base, clamp(base + 2, 1, 15)];
    return rates.map((r) =>
      computeProjection({
        currentAge: parseNum(currentAge),
        retirementAge: parseNum(retirementAge),
        startingAmount: parseNum(startingAmount),
        contributionPerPayday: parseNum(contributionPerPayday),
        annualRatePct: r,
        payPeriodsPerYear,
        windfallAmount: parseNum(windfallAmount),
        windfallAtPeriod,
        maxPoints: 240,
      })
    );
  }, [currentAge, retirementAge, startingAmount, contributionPerPayday, annualRatePct, payPeriodsPerYear, windfallAmount, windfallWhen, windfallAtYear, windfallAtAge, windfallAtPayday]);

  const yearsLeft = projectionSingle.years;
  const paydaysLeft = projectionSingle.totalPeriods;

  // Auto-open windfall when user starts using it
  useEffect(() => {
    const amt = parseNum(windfallAmount);
    if (amt > 0 || windfallWhen !== "none") setWindfallOpen(true);
  }, [windfallAmount, windfallWhen]);

  const subtitle = useMemo(() => {
    const c = formatCurrency(parseNum(contributionPerPayday));
    const r = Number(clamp(parseNum(annualRatePct), 1, 15)).toFixed(1);
    const freqWord =
      frequencyKey === "daily"
        ? "day"
        : frequencyKey === "weekly"
          ? "weekly paycheck"
          : frequencyKey === "biweekly"
            ? "biweekly paycheck"
            : frequencyKey === "monthly"
              ? "monthly paycheck"
              : "paycheck";
    return `Save ${c} each ${freqWord} • ${r}% average • ${yearsLeft} years (${paydaysLeft} paydays)`;
  }, [contributionPerPayday, annualRatePct, yearsLeft, paydaysLeft, frequencyKey]);

    const seriesSingle = useMemo(() => {
    // points are already sampled in computeProjection (maxPoints)
    const pts = projectionSingle.points;
    return pts.map((p) => ({ x: p.yearIndex, y: p.balance }));
  }, [projectionSingle]);

  const seriesSingleContrib = useMemo(() => {
    const pts = projectionSingle.points;
    return pts.map((p) => ({ x: p.yearIndex, y: p.totalContrib }));
  }, [projectionSingle]);

  const computedYMax = useMemo(() => {
    const singleMax = Math.max(1, ...seriesSingle.map((p) => p.y));
    const compareMax = Math.max(
      1,
      ...projectionCompare.map((p) => p.finalBalance)
    );
    return niceRoundUp(Math.max(singleMax, compareMax));
  }, [seriesSingle, projectionCompare]);

  const [yMaxDisplay, setYMaxDisplay] = useState(0);
  const [scaleResetToken, setScaleResetToken] = useState(0);
  const lastScaleResetToken = useRef(0);
  // Pro chart scale behavior:
  // - Expand immediately when needed
  // - Relax downward slowly (prevents jumpy axis while typing)
  // - User can force a refit with the button
  useEffect(() => {
    setYMaxDisplay((prev) => {
      // If the user hit a reset, refit immediately (no slow easing).
      if (lastScaleResetToken.current !== scaleResetToken) {
        lastScaleResetToken.current = scaleResetToken;
        return computedYMax;
      }
      if (!prev) return computedYMax;
      if (computedYMax >= prev) return computedYMax;
      if (computedYMax < prev * 0.75) return Math.max(computedYMax, prev * 0.96);
      if (computedYMax < prev) return Math.max(computedYMax, prev * 0.985);
      return prev;
    });
  }, [computedYMax, scaleResetToken]);

  const containerClass = "page";

  return (
    <ErrorBoundary>
      <div className={containerClass}>
      <style>{getCss()}</style>

      {/* Print-only header */}
      <div className="printOnly printHeader" aria-hidden>
        <div className="printBrandRow">
          <div className="printBrand">1040 Paydays</div>
          <div className="printUrl">1040paydays.com</div>
        </div>
        <div className="printPlanTitle">{activePlanName ? activePlanName : "My Plan"}</div>
        <div className="printSub">{subtitle}</div>
      </div>

      {leadOpen && (
        <div className="modalBackdrop" role="dialog" aria-modal="true" aria-label="Get the free starter kit">
          <div className="modalCard">
            <div className="modalTop">
              <div>
                <div className="modalKicker">FREE STARTER KIT</div>
                <div className="modalTitle">Get 3 sample payday plans</div>
                <div className="modalText">Join the list for a free starter kit, sample plans, and updates.</div>
              </div>
              <button className="modalClose" type="button" onClick={() => {
                setLeadOpen(false);
                setLeadStatus("idle");
              }} aria-label="Close">✕</button>
            </div>

            <div className="modalRow">
              <input
                className={emailTouched && !emailOk ? "input inputError" : "input"}
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onBlur={() => setEmailTouched(true)}
              />
              <button
                className="btnPrimary"
                type="button"
                onClick={() => {
                  setEmailTouched(true);
                  if (!emailOk) return;
                  setLeadStatus("sent");
                }}
              >
                Send My Free Kit
              </button>
            </div>

            {emailTouched && !emailOk && <div className="modalError">Please enter a valid email.</div>}
            {leadStatus === "sent" ? (
              <div className="modalSuccess">You’re in — check your email shortly.</div>
            ) : (
              <div className="modalFine">No spam. Unsubscribe anytime.</div>
            )}
          </div>
        </div>
      )}

      {bookOpen && (
        <div className="modalBackdrop" role="dialog" aria-modal="true" aria-label="Starter guide coming soon">
          <div className="modalCard">
            <div className="modalTop">
              <div>
                <div className="modalKicker">COMING SOON</div>
                <div className="modalTitle">1040 Paydays Starter Guide</div>
                <div className="modalText">Book + workbook + quick-start page. Want first access?</div>
              </div>
              <button className="modalClose" type="button" onClick={() => {
                setBookOpen(false);
                setBookStatus("idle");
              }} aria-label="Close">✕</button>
            </div>

            <div className="modalRow">
              <input
                className={emailTouched && !emailOk ? "input inputError" : "input"}
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onBlur={() => setEmailTouched(true)}
              />
              <button
                className="btnPrimary"
                type="button"
                onClick={() => {
                  setEmailTouched(true);
                  if (!emailOk) return;
                  setBookStatus("sent");
                }}
              >
                Notify me
              </button>
            </div>

            {emailTouched && !emailOk && <div className="modalError">Please enter a valid email.</div>}
            {bookStatus === "sent" ? (
              <div className="modalSuccess">You’re on the list — we’ll email you first.</div>
            ) : (
              <div className="modalFine">No spam. Unsubscribe anytime.</div>
            )}
          </div>
        </div>
      )}

      <div className="headerRow">
        <div className="brand">
          <div className="brandTitle">1040 Paydays</div>
          <div className="brandTag">Plan your savings one payday at a time.</div>
          <div className="brandDesc">There are roughly 1,040 biweekly paydays in a 40-year career. Plan your savings one payday at a time. Turn any savings goal into a payday plan you can stick to.</div>
          <div className="trustLine">NO ACCOUNT • CLEAR ESTIMATES • BUILT FOR CLARITY</div>
        </div>

        <div className="headerRight">
          <div className="headerActions">
            <button className="headerPill" type="button" onClick={() => setLeadOpen(true)}>
              <span className="hpText">Get starter kit</span>
            </button>
            <button className="headerLink" type="button" onClick={() => setBookOpen(true)}>
              Starter guide (coming soon)
            </button>
            <a className="headerLink" href="mailto:Hello@1040paydays.com" target="_blank" rel="noreferrer">
              Contact
            </a>
          </div>
        </div>
      </div>

      {/* Mobile sticky summary (calculator first, results always visible) */}
      <div className="mobileSticky" aria-label="Quick summary">
        <div className="msLeft">
          <div className="msKicker">PROJECTED NEST EGG</div>
          <div className="msValue">{formatCurrency(projectionSingle.finalBalance)}</div>
        </div>
        <div className="msRight">
          <div className="msMetric">
            <div className="msLabel">Paydays left</div>
            <div className="msNum">{formatPlainNumber(paydaysLeft, 0)}</div>
          </div>
          <div className="msMetric">
            <div className="msLabel">Years left</div>
            <div className="msNum">{formatPlainNumber(yearsLeft, 0)}</div>
          </div>
        </div>
      </div>

      <div className="mainGrid">
        {/* LEFT: Calculator */}
        <div className="panel">
          <div className="panelHeader">
            <div>
              <div className="panelTitle">Calculator</div>
              <div className="panelSub">Use round numbers, then refine.</div>
            </div>
          </div>

          <div className="miniGrid">
            <div className="miniCard">
              <div className="miniLabel">Current age</div>
              <input
                className="miniValueInput"
                value={currentAge}
                onChange={(e) => setCurrentAge(e.target.value)}
                onBlur={() => {
                  const ca = clampInt(parseNum(currentAge), 0, 120);
                  setCurrentAge(String(ca));
                }}
                inputMode="numeric"
              />
            </div>
            <div className="miniCard accent">
              <div className="miniLabel">Target age</div>
              <input
                className="miniValueInput"
                value={retirementAge}
                onChange={(e) => {
                  setTargetAgeManual(true);
                  setRetirementAge(e.target.value);
                }}
                onBlur={() => setRetirementAge(String(clampInt(parseNum(retirementAge), 0, 120)))}
                inputMode="numeric"
              />
              {parseNum(retirementAge) < parseNum(currentAge) && (
                <div className="miniWarn">Target age is earlier than current age — projection will show 0 years.</div>
              )}
            </div>
          </div>

          <div className="miniGrid miniGridMetrics" aria-label="Paydays remaining summary">
            <div className="miniCard metric">
              <div className="miniLabel">Paydays remaining</div>
              <div className="miniValue">{formatPlainNumber(paydaysLeft, 0)}</div>
            </div>
            <div className="miniCard metric">
              <div className="miniLabel">Years remaining</div>
              <div className="miniValue">{formatPlainNumber(yearsLeft, 0)}</div>
            </div>
          </div>

          <div className="fieldBlock">
            <div className="fieldLabel">How often you’ll save</div>
            <div className="freqRow">
              {PAY_FREQUENCIES.map((f) => (
                <button
                  key={f.key}
                  type="button"
                  className={frequencyKey === f.key ? "freqBtn active" : "freqBtn"}
                  onClick={() => setFrequencyKey(f.key)}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>

          <div className="fieldBlock">
            <div className="fieldLabel">Starting balance</div>
            <div className="moneyInput">
              <span className="moneyPrefix" aria-hidden>$</span>
              <input
              className="fieldInput moneyPad"
              value={startingAmount}
              onChange={(e) => setStartingAmount(e.target.value)}
              inputMode="decimal"
              placeholder="$0"
              aria-label="Starting balance"
            />
            </div>
          </div>

          <div className="fieldBlock">
            <div className="fieldLabel">Save each payday</div>
            <div className="moneyInput">
              <span className="moneyPrefix" aria-hidden>$</span>
              <input
              className="fieldInput moneyPad"
              value={contributionPerPayday}
              onChange={(e) => setContributionPerPayday(e.target.value)}
              inputMode="decimal"
              placeholder="$50"
              aria-label="Contribution per payday"
            />
            </div>
          </div>

          {windfallOpen && (
            <div className="fieldBlock">
              <div className="fieldLabel">Windfall amount (one-time)</div>
              <input
                className="fieldInput"
                value={windfallAmount}
                onChange={(e) => setWindfallAmount(e.target.value)}
                inputMode="decimal"
                placeholder="$0"
                aria-label="Windfall amount"
              />
              <div className="fieldHint">Choose when to add it:</div>
              <div className="freqRow" style={{ gridTemplateColumns: "1fr 1fr" }}>
                <button
                  type="button"
                  className={windfallWhen === "now" ? "freqBtn active" : "freqBtn"}
                  onClick={() => setWindfallWhen("now")}
                >
                  Next payday
                </button>
                <button
                  type="button"
                  className={windfallWhen === "year" ? "freqBtn active" : "freqBtn"}
                  onClick={() => setWindfallWhen("year")}
                >
                  In year…
                </button>
              </div>
              {windfallWhen === "year" && (
                <div style={{ marginTop: 10 }}>
                  <input
                    className="fieldInput"
                    value={windfallAtYear}
                    onChange={(e) => setWindfallAtYear(e.target.value)}
                    inputMode="numeric"
                    placeholder="1"
                    aria-label="Windfall year"
                  />
                </div>
              )}
            </div>
          )}

          <div className="panelActions">
            <button
              className="btnGhostWide"
              type="button"
              onClick={() => {
                setCurrentAge("35");
                setRetirementAge("65");
                setTargetAgeManual(false);
                setStartingAmount("0");
                setContributionPerPayday("50");
                                setAnnualRatePct("7");
                setYScaleMode("linear");
                setFrequencyKey("biweekly");
                setWindfallAmount("0");
                setWindfallWhen("none");
                setWindfallAtYear("1");
                setWindfallAtAge("45");
                setWindfallAtPayday("1");
                setWindfallOpen(false);
                setScenarioMode("single");
                setVizMode("line");
                setXAxisMode("age");
                setYMaxDisplay(0);
                setScaleResetToken((t) => t + 1);
                setActivePlanName("");
              }}
            >
              Reset
            </button>
            <button
              className="btnPrimaryWide"
              type="button"
              onClick={() => {
                const url = buildShareUrl();
                if (!url) return;
                copyToClipboard(url);
              }}
            >
              Copy share link
            </button>

            <button className="btnGhostWide" type="button" onClick={handlePrint}>
              Print my plan
            </button>

            <div className="saveBlock">
              <div className="saveTitle">Save this plan (no account)</div>
              <div className="saveRow">
                <input
                  className="saveInput"
                  placeholder="Name this plan"
                  value={planName}
                  onChange={(e) => setPlanName(e.target.value)}
                />
                <button className="saveBtn" type="button" onClick={saveCurrentPlan}>
                  Save
                </button>
              </div>

              {savedPlans.length > 0 && (
                <div className="savedList">
                  <div className="savedTopRow">
                    <div className="savedKicker">Saved plans</div>
                    <button
                      type="button"
                      className={showSavedList ? "savedToggle active" : "savedToggle"}
                      onClick={() => setShowSavedList((v) => !v)}
                      aria-label={showSavedList ? "Collapse saved plans" : "Expand saved plans"}
                    >
                      {showSavedList ? "Hide" : "Show"}
                    </button>
                  </div>

                  {showSavedList && (
                    <div className="savedItems">
                      {savedPlans.map((p) => (
                        <div key={p.id} className="savedItem">
                          <button className="savedLoad" type="button" onClick={() => loadSavedPlan(p)}>
                            {p.name}
                          </button>
                          <button
                            className="savedIcon"
                            type="button"
                            onClick={() => deleteSavedPlan(p.id)}
                            aria-label="Delete saved plan"
                          >
                            ✕
                          </button>
                        </div>
                      ))}
                      <div className="saveFine">Saved to this browser only.</div>
                    </div>
                  )}

                  {!showSavedList && (
                    <div className="saveFine">Tap “Show” to view saved plans.</div>
                  )}
                </div>
              )}

              {isShortMobile && (
                <div className="saveFine" style={{ marginTop: 10 }}>
                  Tip: On short screens we auto-collapse saved plans to keep the calculator + chart fully visible.
                </div>
              )}
            </div>
          </div>
        </div>

        {/* RIGHT: Results */}
        <div className="content">
          <div className="contentTop">
            <div>
              <div className="kicker">PROJECTED NEST EGG</div>
              <div className="bigNumber">{formatCurrency(projectionSingle.finalBalance)}</div>
              <div className="descLine">{subtitle}</div>
              <div className="descLine2">
                Contributions: <span className="descEm">{formatCurrency(projectionSingle.finalContrib)}</span> • Estimated growth:{" "}
                <span className="descEm">{formatCurrency(projectionSingle.finalInterest)}</span>
              </div>
            </div>

            <div className="axisToggle" aria-label="Chart axis toggle">
              <button className={xAxisMode === "years" ? "axisBtn" : "axisBtn ghost"} type="button" onClick={() => setXAxisMode("years")}>
                By Years
              </button>
              <button className={xAxisMode === "age" ? "axisBtn" : "axisBtn ghost"} type="button" onClick={() => setXAxisMode("age")}>
                By Age
              </button>
            </div>
          </div>

          <div className="rateRow">
            <div className="rateLabel">INTEREST RATE</div>
            <div className="rateSlider">
              <span className="rateMin">1%</span>
              <input
                type="range"
                min={1}
                max={15}
                step={0.1}
                value={clamp(parseNum(annualRatePct), 1, 15)}
                onChange={(e) => setAnnualRatePct(String(clamp(parseNum(e.target.value), 1, 15)))}
              />
              <span className="rateMax">{Number(annualRatePct).toFixed(1)}%</span>
            </div>
          </div>

          <div className="quickRow">
            <button
              type="button"
              className={scenarioMode === "compare" ? "quickBtn active" : "quickBtn"}
              onClick={() => {
                                setVizMode("line");
                setScenarioMode((m) => (m === "compare" ? "single" : "compare"));
              }}
              aria-pressed={scenarioMode === "compare"}
            >
              {scenarioMode === "compare" ? "Hide ±2%" : "Compare ±2%"}
            </button>

            <button
              type="button"
              className={windfallOpen ? "quickBtn active" : "quickBtn"}
              onClick={() => {
                // Toggle windfall UI from the right-side quick option.
                if (windfallOpen) {
                  // HIDE: clear all windfall data and collapse the windfall box.
                  setWindfallAmount("0");
                  setWindfallWhen("none");
                  setWindfallAtYear("1");
                  setWindfallAtAge("45");
                  setWindfallAtPayday("1");
                  setWindfallOpen(false);
                } else {
                  // SHOW: open options + reveal windfall box
                                    setWindfallOpen(true);
                  if (windfallWhen === "none") setWindfallWhen("now");
                }
              }}
              aria-pressed={windfallOpen}
            >
              {windfallOpen ? "Hide windfall" : "Add windfall"}
            </button>

            <div className="quickHint">Quick options: compare returns or add a one-time deposit.</div>
          </div>

          <div className="vizHeader">
            <div className="vizTitle">VIEW</div>
            <div className="vizControls">
              <div className="segGroup" role="group" aria-label="Chart or breakdown">
                <button type="button" className={vizMode === "line" ? "segSmall active" : "segSmall"} onClick={() => setVizMode("line")}>
                  Chart
                </button>
                <button type="button" className={vizMode === "breakdown" ? "segSmall active" : "segSmall"} onClick={() => setVizMode("breakdown")}>
                  Breakdown
                </button>
              </div>

              <div className="segGroup" role="group" aria-label="Single or compare">
                <button type="button" className={scenarioMode === "single" ? "segSmall active" : "segSmall"} onClick={() => setScenarioMode("single")}>
                  Single
                </button>
                <button type="button" className={scenarioMode === "compare" ? "segSmall active" : "segSmall"} onClick={() => setScenarioMode("compare")}>
                  Compare
                </button>
              </div>

              <div className="muted">Not guaranteed. Estimates only.</div>

                            <div className="scaleTools">
                <div className="scaleSeg" role="group" aria-label="Scale mode">
                  <button
                    className={yScaleMode === "linear" ? "scaleSegBtn active" : "scaleSegBtn"}
                    type="button"
                    onClick={() => setYScaleMode("linear")}
                    aria-pressed={yScaleMode === "linear"}
                  >
                    Linear
                  </button>
                  <button
                    className={yScaleMode === "log" ? "scaleSegBtn active" : "scaleSegBtn"}
                    type="button"
                    onClick={() => setYScaleMode("log")}
                    aria-pressed={yScaleMode === "log"}
                  >
                    Log
                  </button>
                </div>
                <button className="scaleBtn" type="button" onClick={() => setScaleResetToken((t) => t + 1)}>
                  Refit scale
                </button>
              </div>
            </div>
          </div>

          {vizMode === "line" && scenarioMode === "single" && (
                        <LineChart
              series={seriesSingle}
              contribSeries={seriesSingleContrib}
              scaleMode={yScaleMode}
              xLabelMode={xAxisMode}
              currentAge={parseNum(currentAge)}
              yMaxOverride={yMaxDisplay}
            />
          )}

          {vizMode === "line" && scenarioMode === "compare" && (
                        <CompareOverlayChart
              projections={projectionCompare}
              rates={[clamp(parseNum(annualRatePct) - 2, 1, 15), clamp(parseNum(annualRatePct), 1, 15), clamp(parseNum(annualRatePct) + 2, 1, 15)]}
              contribSeries={seriesSingleContrib}
              scaleMode={yScaleMode}
              currentAge={parseNum(currentAge)}
              xAxisMode={xAxisMode}
              yMaxOverride={yMaxDisplay}
            />
          )}

          {vizMode === "breakdown" && scenarioMode === "single" && (
            <Breakdown finalContrib={projectionSingle.finalContrib} finalInterest={projectionSingle.finalInterest} />
          )}

          {vizMode === "breakdown" && scenarioMode === "compare" && (
            <CompareBreakdown
              projections={projectionCompare}
              rates={[clamp(parseNum(annualRatePct) - 2, 1, 15), clamp(parseNum(annualRatePct), 1, 15), clamp(parseNum(annualRatePct) + 2, 1, 15)]}
            />
          )}
        </div>
      </div>
    </div>
    </ErrorBoundary>
  );
}

function getCss() {
  return `
:root{
  /* Typography */
  --font-sans: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, "Apple Color Emoji","Segoe UI Emoji";
  --font-serif: ui-serif, Georgia, Cambria, "Times New Roman", Times, serif; /* optional */

  /* Trustworthy, finance-grade palette */
  --bg: #ffffff;
  --card: #ffffff;
  --ink: #0b1220;        /* near-black navy */
  --muted: #526171;      /* slate */
  --line: #d9e2ec;       /* cool grey border */
  --soft: #f5f7fb;       /* subtle surface */

  /* Primary brand blue (calm, confident) */
  --accent: #0f4f95;     /* deep blue */
  --accent2: #1f5ea8;    /* mid blue */
  --accent3: #0b2d5b;    /* darkest blue */

  /* Third accent (sparingly, for windfall/bonus moments) */
  --accentAlt: #b45309;  /* amber */
  --accentAlt2: #f59e0b; /* bright amber */
  --accentAlt3: #92400e; /* deep amber */

  --shadow: 0 14px 30px rgba(11, 18, 32, 0.08);
  --shadow2: 0 10px 22px rgba(11, 18, 32, 0.06);
  --radius: 18px;
}


*{ box-sizing:border-box; }
html,body{
  margin:0;
  font-family: var(--font-sans);
  color: var(--ink);
  background: #ffffff;
  width: 100%;
  overflow-x: hidden; /* never require sideways zoom */
}

.page{
  /* Full-screen, no “letterbox” max-width */
  width: 100%;
  max-width: 100%;
  min-height: 100vh;
  margin: 0;
  padding: 16px clamp(12px, 2.2vw, 28px) 28px;
  display: flex;
  flex-direction: column;
}

/* A+ polish: consistent motion + crisp rendering */
button, input, select{ font-family: var(--font-sans); }
button{ transition: transform .08s ease, filter .12s ease, background .12s ease, border-color .12s ease; }
button:active{ transform: translateY(1px); }


.pageCompact .brandDesc{ display:none; }

/* Header right */
.headerRight{ display:flex; flex-direction:column; gap: 10px; }

.headerActions{
  display:flex;
  justify-content:flex-end;
  gap: 10px;
  flex-wrap:wrap;
  padding-top: 8px;
}
.headerPill{
  display:inline-flex;
  align-items:center;
  gap: 10px;
  height: 44px;
  padding: 0 14px;
  border-radius: 999px;
  border: 1px solid rgba(15, 79, 149, 0.22);
  background: var(--accent);
  color: #fff;
  font-weight: 950;
  cursor: pointer;
  box-shadow: 0 8px 18px rgba(11,18,32,0.10);
}
.headerPill:hover{ filter: brightness(1.03); }
.headerLink{
  height: 44px;
  padding: 0 10px;
  border: 0;
  background: transparent;
  color: var(--accent2);
  font-weight: 950;
  cursor: pointer;
  text-decoration: underline;
  text-underline-offset: 4px;
  display: inline-flex;
  align-items: center;
}
.headerLink:visited{ color: var(--accent2); }

.headerLink:hover{ color: var(--accent3); }
.headerPill.ghost{
  background: rgba(255,255,255,0.96);
  color: #2b3b52;
  box-shadow: none;
}
.hpText{ font-size: 13px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }


/* Header row */
.headerRow{
  display:grid;
  grid-template-columns: 1.2fr 1fr;
  gap: 16px;
  align-items:start;
  margin-bottom: 14px;
}

.brandDesc{ color: var(--muted); font-size: 14px; line-height: 1.45; max-width: 640px; margin-bottom: 6px; }
.trustLine{ color: var(--muted); font-size: 12px; font-weight: 900; letter-spacing: .10em; }


/* CTA cards (match screenshot layout) */
.ctaCards{
  display:none;
}

.ctaCard{
  background: #ffffff;
  border: 1px solid rgba(15, 23, 42, 0.10);
  border-left: 4px solid rgba(15, 79, 149, 0.55);
  border-radius: 16px;
  box-shadow: none;
  padding: 14px;
}
.bookCard{ position: relative; overflow: hidden; }
.ribbon{
  position: absolute;
  top: 14px;
  right: 14px;
  transform: none;
  background: rgba(15,23,42,0.04);
  color: var(--accent3);
  border: 1px solid rgba(15,23,42,0.10);
  font-weight: 950;
  letter-spacing: .10em;
  font-size: 10px;
  padding: 6px 10px;
  border-radius: 999px;
}

.ctaKicker{ font-size: 11px; font-weight: 900; letter-spacing: .10em; color: #5a6c83; margin-bottom: 8px; }
.ctaTitle{ font-weight: 950; font-size: 14px; margin-bottom: 8px; }
.ctaText{ color: var(--muted); font-size: 12.5px; line-height: 1.45; margin-bottom: 10px; }
.ctaInputRow{ display:flex; gap: 10px; align-items:center; margin-bottom: 8px; }
.ctaButtons{ display:flex; gap:10px; }
.ctaFine{ font-size: 11px; color: #6a7d95; }
.link{ color: var(--accent2); font-weight: 900; cursor:pointer; }

.input{
  flex:1;
  height: 40px;
  border-radius: 12px;
  border: 1px solid rgba(15, 23, 42, 0.14);
  background: white;
  padding: 0 12px;
  outline:none;
}
.input:focus{
  border-color: rgba(15, 79, 149, 0.60);
  box-shadow: 0 0 0 3px rgba(15, 79, 149, 0.18);
}

/* Buttons */
.btnPrimary{
  height: 40px;
  border: 0;
  border-radius: 12px;
  padding: 0 14px;
  color: white;
  font-weight: 950;
  cursor: pointer;
  background: linear-gradient(180deg, var(--accent2), var(--accent));
  box-shadow: 0 10px 22px rgba(15, 79, 149, 0.22);
}
.btnPrimary:hover{ filter: brightness(1.03); }
.btnGhost{
  height: 40px;
  border-radius: 12px;
  border: 1px solid rgba(15, 23, 42, 0.14);
  background: rgba(255,255,255,0.96);
  padding: 0 14px;
  font-weight: 900;
  cursor: pointer;
  color: #2b3b52;
}

/* Main grid */
.mainGrid{
  display:grid;
  grid-template-columns: minmax(320px, 380px) minmax(0, 1fr);
  gap: 16px;
  align-items: stretch;
  /* Fill remaining viewport height under the header */
  flex: 1;
  min-height: 0;
}

/* Allow panels to stretch and scroll internally when needed */
.panel,
.content{
  min-height: 0;
}

@media (min-width: 1101px){
  .panel,
  .content{
    max-height: calc(100vh - 210px);
    overflow: auto;
  }
}


/* Left panel */
.panel{
  background: #ffffff;
  border: 1px solid rgba(15, 23, 42, 0.10);
  border-radius: var(--radius);
  box-shadow: var(--shadow2);
  padding: 15px;
  position: relative;
  height: 100%;
  display: flex;
  flex-direction: column;
}
.panelHeader{ display:flex; align-items:flex-start; justify-content:space-between; gap: 12px; margin-bottom: 14px; }
.panelTitle{ font-family: var(--font-sans); font-size: 28px; margin: 0 0 4px; }
.panelSub{ color: var(--muted); font-size: 13px; margin-top: 2px; line-height: 1.45; max-width: 300px; }

.stepKicker{
  margin-top: 10px;
  font-size: 12px;
  letter-spacing: .14em;
  font-weight: 950;
  color: #6a7d95;
}
.stepTitle{
  font-family: var(--font-sans);
  font-size: 18px;
  font-weight: 900;
  margin-top: 4px;
}
.stepDivider{
  height: 1px;
  background: rgba(15, 23, 42, 0.10);
  margin: 14px 0 10px;
}
.pillButton{
  border: 1px solid rgba(15, 79, 149, 0.30);
  background: rgba(15, 79, 149, 0.10);
  color: var(--accent3);
  font-weight: 950;
  letter-spacing: .08em;
  font-size: 11px;
  border-radius: 999px;
  padding: 8px 10px;
}

.miniGrid{ display:grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 14px; }
.miniCard{ border: 1px solid rgba(15, 23, 42, 0.10); background: white; border-radius: 14px; padding: 10px; }
.miniCard.accent{
  border-color: var(--accent);
  background: var(--accent);
}
.miniCard.accent .miniLabel{ color: rgba(255,255,255,0.82); }
.miniCard.accent .miniValue{ color: #ffffff; }
.miniCard.accent .miniValueInput{ color: #ffffff; }
.miniLabel{ font-size: 12px; letter-spacing: .02em; font-weight: 900; color: #3f536b; margin-bottom: 6px; text-transform: none; }
.miniValue{ font-size: 22px; font-weight: 950; color: #0d1b2a; }
.miniValueInput{ width: 100%; border: 0; outline: none; font-size: 22px; font-weight: 950; padding: 2px 0; background: transparent; color: #0d1b2a; }
.miniWarn{ margin-top: 6px; font-size: 11px; font-weight: 850; color: rgba(255,255,255,0.86); line-height: 1.25; }

.fieldBlock{ margin-top: 12px; }
.fieldLabel{ font-size: 12px; letter-spacing: .02em; font-weight: 900; color: #3f536b; margin-bottom: 8px; text-transform: none; }
.moneyInput{ position: relative; }
.moneyPrefix{
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  font-weight: 950;
  color: #3f536b;
  font-size: 16px;
  pointer-events: none;
}
.moneyPad{ padding-left: 28px !important; }

.fieldInput{
  width: 100%;
  height: 44px;
  border-radius: 14px;
  border: 1px solid rgba(15, 23, 42, 0.12);
  padding: 0 12px;
  font-size: 16px;
  font-weight: 900;
  outline:none;
  background: white;
}
.fieldInput:focus{
  border-color: rgba(15, 79, 149, 0.60);
  box-shadow: 0 0 0 3px rgba(15, 79, 149, 0.18);
}
.fieldHint{ color: #6a7d95; font-size: 12px; margin-top: 7px; }

/* Metrics (Paydays remaining / Years remaining) styled like the age cards */
.miniGridMetrics{ margin-top: 2px; margin-bottom: 10px; }
.miniCard.metric{
  background: linear-gradient(180deg, rgba(15, 79, 149, 0.05), rgba(15, 79, 149, 0.02));
  border-color: rgba(15, 79, 149, 0.18);
}
.miniCard.metric .miniLabel{ color: #2b3b52; }
.miniCard.metric .miniValue{ color: var(--accent3); }

/* Remove the old advancedNote styles (no longer used) */

.freqRow{ display:grid; grid-template-columns: 1fr 1fr; gap: 10px; }
.freqBtn{
  min-height: 44px;
  height: auto;
  padding: 10px 10px;
  border-radius: 14px;
  border: 1px solid rgba(15, 23, 42, 0.12);
  background: white;
  font-weight: 950;
  color: #2b3b52;
  cursor:pointer;
  white-space: normal;
  line-height: 1.15;
  text-align: center;
}
.freqBtn.active{
  background: var(--accent);
  border-color: var(--accent);
  color: #ffffff;
}
.freqBtn.active:hover{ filter: brightness(1.03); }

.panelActions{ display:grid; grid-template-columns: 1fr; gap: 10px; margin-top: 14px; padding-top: 14px; }
.btnGhostWide{
  border-radius: 14px;
  border: 1px solid rgba(15, 23, 42, 0.14);
  background: rgba(255,255,255,0.96);
  font-weight: 950;
  cursor: pointer;
  white-space: normal;
  line-height: 1.15;
  padding: 10px 14px;
}
.btnPrimaryWide{
  height: 46px;
  border-radius: 14px;
  border: 0;
  background: linear-gradient(180deg, var(--accent2), var(--accent));
  color:white;
  font-weight: 950;
  cursor:pointer;
  box-shadow: 0 12px 24px rgba(15, 79, 149, 0.22);
}

/* Save block */
.saveBlock{
  border: 1px solid rgba(15, 23, 42, 0.10);
  background: rgba(15, 79, 149, 0.04);
  border-radius: 14px;
  padding: 12px;
}
.saveTitle{ font-weight: 950; font-size: 13px; color:#2b3b52; margin-bottom: 8px; }
.saveRow{ display:flex; gap: 10px; align-items:center; }
.saveInput{
  flex: 1;
  height: 40px;
  border-radius: 12px;
  border: 1px solid rgba(15, 23, 42, 0.14);
  background: #ffffff;
  padding: 0 12px;
  font-weight: 900;
  outline: none;
}
.saveInput:focus{
  border-color: rgba(15, 79, 149, 0.60);
  box-shadow: 0 0 0 3px rgba(15, 79, 149, 0.18);
}
.saveBtn{
  height: 40px;
  border-radius: 12px;
  border: 0;
  padding: 0 12px;
  font-weight: 950;
  cursor: pointer;
  background: var(--accent3);
  color: #ffffff;
  white-space: nowrap;
}
.saveBtn.ghost{
  background: rgba(255,255,255,0.96);
  color: #2b3b52;
  border: 1px solid rgba(15, 23, 42, 0.14);
}
.saveBtn:hover{ filter: brightness(1.03); }
.savedList{ margin-top: 10px; }
.savedKicker{ font-size: 11px; letter-spacing: .12em; font-weight: 950; color:#6a7d95; margin-bottom: 6px; text-transform: uppercase; }
.savedItem{ display:flex; align-items:center; gap: 8px; margin-top: 6px; }
.savedLoad{
  flex: 1;
  text-align: left;
  border: 1px solid rgba(15, 23, 42, 0.10);
  background: #ffffff;
  border-radius: 12px;
  padding: 8px 10px;
  font-weight: 950;
  cursor: pointer;
  color: #0b1220;
}
.savedIcon{
  width: 34px;
  height: 34px;
  border-radius: 10px;
  border: 1px solid rgba(15, 23, 42, 0.10);
  background: rgba(255,255,255,0.96);
  cursor: pointer;
  font-weight: 950;
  color: #2b3b52;
}
.saveFine{ margin-top: 8px; font-size: 12px; color:#6a7d95; font-weight: 850; }

/* Right content */
.content{
  background: #ffffff;
  border: 1px solid rgba(15, 23, 42, 0.10);
  border-radius: var(--radius);
  box-shadow: var(--shadow2);
  padding: 16px;
}

.contentTop{ display:flex; justify-content:space-between; gap: 14px; align-items:flex-start; }
.kicker{ font-size: 12px; letter-spacing: .14em; font-weight: 950; color: #6a7d95; }
.bigNumber{ font-family: var(--font-sans); font-size: clamp(40px, 5vw, 66px); line-height: 1.0; margin: 6px 0 10px; }

/* Brand title (make 1040 Paydays the strongest headline) */
.brandTitle{
  font-family: var(--font-sans);
  font-size: clamp(46px, 5.8vw, 78px);
  line-height: 1.0;
  font-weight: 950;
  letter-spacing: -0.02em;
  margin: 0 0 6px;
}

.pillInfo{
  display:inline-flex;
  align-items:center;
  gap:10px;
  padding: 8px 12px;
  border-radius: 999px;
  background: rgba(15, 79, 149, 0.10);
  border: 1px solid rgba(15, 79, 149, 0.18);
  color: var(--accent3);
  font-weight: 900;
  font-size: 12px;
  margin-bottom: 10px;
}

.descLine{ color: #2d3f57; font-size: 14px; line-height: 1.45; margin-bottom: 6px; }
.descLine2{ color: var(--muted); font-size: 13px; line-height: 1.35; }
.descEm{ color: var(--ink); font-weight: 950; }

.axisToggle{ display:flex; gap:10px; align-items:center; }
.axisBtn{ height: 36px; padding: 0 12px; border-radius: 12px; border: 0; background: var(--accent); color:white; font-weight: 950; cursor:pointer; }
.axisBtn.ghost{ background: rgba(255,255,255,0.96); color: #2b3b52; border: 1px solid rgba(15, 23, 42, 0.14); }

.rateRow{ display:flex; align-items:center; justify-content:space-between; gap: 14px; padding-top: 12px; }

/* Quick options (discoverability) */
.quickRow{
  margin-top: 10px;
  display:flex;
  align-items:center;
  gap: 10px;
  flex-wrap:wrap;
}
.quickBtn{
  height: 38px;
  padding: 0 12px;
  border-radius: 999px;
  border: 1px solid rgba(15, 23, 42, 0.14);
  background: rgba(255,255,255,0.96);
  color: #2b3b52;
  font-weight: 950;
  cursor:pointer;
}
.quickBtn:hover{ filter: brightness(1.02); }
.quickBtn.active{
  background: rgba(15, 79, 149, 0.10);
  border-color: rgba(15, 79, 149, 0.35);
  color: var(--accent3);
}

.quickHint{
  color: #6a7d95;
  font-size: 12px;
  font-weight: 850;
  margin-left: auto;
  line-height: 1.25;
}
@media (max-width: 900px){
  .quickHint{ width: 100%; margin-left: 0; }
}
.rateLabel{ font-size: 12px; letter-spacing: .14em; font-weight: 950; color: #6a7d95; }
.rateSlider{ display:flex; align-items:center; gap: 10px; width: 520px; max-width: 100%; }
.rateSlider input[type="range"]{ width: 100%; }
.rateMin, .rateMax{ font-weight: 950; color:#3b516d; font-size: 13px; min-width: 40px; text-align:center; }

.vizHeader{ margin-top: 12px; border-top: 1px solid rgba(15, 23, 42, 0.10); padding-top: 12px; display:flex; align-items:center; justify-content:space-between; gap: 12px; }
.vizTitle{ font-size: 12px; letter-spacing: .14em; font-weight: 950; color: #6a7d95; }
.vizControls{ display:flex; align-items:center; gap: 12px; flex-wrap:wrap; }
.segGroup{ display:flex; gap: 0; background: rgba(15, 79, 149, 0.08); border: 1px solid rgba(15, 23, 42, 0.08); border-radius: 999px; padding: 3px; }
.segSmall{ border:0; background: transparent; padding: 7px 10px; border-radius: 999px; font-weight: 950; color: #42566f; cursor:pointer; font-size: 12px; }
.segSmall.active{ background: var(--accent3); color: #ffffff; }
.muted{ color:#6a7d95; font-size: 12px; font-weight: 900; }

.scaleTools{ margin-left: auto; display:flex; align-items:center; gap: 10px; }
.scaleSeg{
  display:flex;
  gap: 0;
  background: rgba(15, 79, 149, 0.08);
  border: 1px solid rgba(15, 23, 42, 0.08);
  border-radius: 999px;
  padding: 3px;
}
.scaleSegBtn{
  border:0;
  background: transparent;
  padding: 7px 10px;
  border-radius: 999px;
  font-weight: 950;
  color: #42566f;
  cursor:pointer;
  font-size: 12px;
}
.scaleSegBtn.active{ background: var(--accent3); color: #ffffff; }

.scaleBtn{
  border: 1px solid rgba(15, 23, 42, 0.10);
  background: rgba(255,255,255,0.96);
  color: var(--muted);
  font-weight: 900;
  font-size: 12px;
  cursor: pointer;
  padding: 7px 10px;
  border-radius: 999px;
}
.scaleBtn:hover{ background: rgba(15,23,42,0.03); }

/* Chart */
.chartCard{ margin-top: 10px; background: rgba(255,255,255,0.98); border: 1px solid rgba(15, 23, 42, 0.10); border-radius: 16px; box-shadow: var(--shadow2); overflow:hidden; }
.chartHeader{ padding: 10px 14px; border-bottom: 1px solid rgba(15, 23, 42, 0.08); background: rgba(15, 79, 149, 0.03); }
.chartLegend{ display:flex; align-items:center; gap: 10px; width:100%; }
.legendDot{ width: 14px; height: 4px; border-radius: 999px; background: var(--accent); }
.legendText{ font-weight: 950; color:#2b3b52; font-size: 13px; }
.chartWrap{ position: relative; overflow: hidden; }
.chartSvg{
  width: 100%;
  height: auto;
  display:block;
  background: #ffffff;
  aspect-ratio: 920 / 360; /* keeps chart readable on mobile */
}

.gridLine{ stroke: rgba(15, 23, 42, 0.10); stroke-dasharray: 4 6; }
.gridLineX{ stroke: rgba(15, 23, 42, 0.06); stroke-dasharray: 2 10; }
.axisLine{ stroke: rgba(15, 23, 42, 0.18); }
.axisText{ fill: #6a7d95; font-size: 13px; font-weight: 850; }
.areaFill{ fill: rgba(15, 79, 149, 0.08); }
.areaFillCompare{ fill: rgba(15, 79, 149, 0.07); }
.linePath{ fill: none; stroke: var(--accent); stroke-width: 3.25; stroke-linecap: round; stroke-linejoin: round; }
.contribPath{ fill: none; stroke: rgba(82, 97, 113, 0.70); stroke-width: 2.5; stroke-linecap: round; stroke-linejoin: round; stroke-dasharray: 6 6; }
.endDot{ fill: white; stroke: var(--accent); stroke-width: 3; }

.hoverOverlay{
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  display: block;
  pointer-events: none;
}
.crosshairV{ stroke: rgba(15, 79, 149, 0.25); stroke-width: 1; stroke-dasharray: 3 6; }
.crosshairH{ stroke: rgba(15, 79, 149, 0.18); stroke-width: 1; stroke-dasharray: 3 6; }
.hoverDot{ fill: #ffffff; stroke: rgba(15, 79, 149, 0.85); stroke-width: 2; }

.tooltip{
  position: absolute;
  pointer-events: none;
  background: #ffffff;
  border: 1px solid rgba(15,23,42,0.14);
  border-radius: 12px;
  padding: 10px 10px;
  box-shadow: 0 10px 22px rgba(15,23,42,0.10);
  min-width: 170px;
  will-change: transform;
}
.ttTitle{ font-size: 12px; color: var(--muted); font-weight: 850; margin-bottom: 2px; }
.ttValue{ font-size: 14px; font-weight: 950; color: var(--ink); }
.ttSub{ margin-top: 4px; font-size: 12px; font-weight: 850; color: #526171; }
.ttSubEm{ color: var(--ink); font-weight: 950; }


.compareLegend{ justify-content: space-between; }
.legendSmall{ display:flex; gap: 10px; margin-left: auto; }
.lgItem{ display:flex; align-items:center; gap: 6px; color:#2b3b52; font-weight: 950; font-size: 12px; }
.lgSwatch{ width: 18px; height: 4px; border-radius: 999px; background: var(--accent); display:inline-block; }
.lgSwatch.s5{ background: rgba(82, 97, 113, 0.55); }
.lgSwatch.s7{ background: var(--accent); }
.lgSwatch.s9{ background: rgba(15, 79, 149, 0.55); }

.line5{ stroke: rgba(82, 97, 113, 0.60); stroke-width: 3.0; stroke-dasharray: 7 7; }
.line7{ stroke: var(--accent); stroke-width: 3.5; }
.line9{ stroke: rgba(15, 79, 149, 0.60); stroke-width: 3.0; stroke-dasharray: 2 6; }

/* Breakdown */
.breakdownCard{ margin-top: 12px; background: rgba(255,255,255,0.98); border: 1px solid rgba(15, 23, 42, 0.10); border-radius: 16px; box-shadow: var(--shadow2); padding: 16px; }
.breakdownRow{ display:flex; align-items:center; justify-content:space-between; gap: 12px; }
.breakdownLabel{ font-weight: 950; color:#2b3b52; }
.breakdownValue{ font-weight: 950; }
.barWrap{ height: 10px; border-radius: 999px; background: rgba(15, 23, 42, 0.07); overflow:hidden; margin-top: 8px; }
.bar{ height: 100%; border-radius: 999px; }
.barContrib{ background: rgba(15, 79, 149, 0.88); }
.barGrowth{ background: rgba(15, 79, 149, 0.35); }
.breakdownNote{ margin-top: 12px; color:#6a7d95; font-size: 12px; font-weight: 900; }

.breakdownCompare{
  margin-top: 12px;
  display:grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
}
.breakdownMini{
  background: rgba(255,255,255,0.98);
  border: 1px solid rgba(15, 23, 42, 0.10);
  border-radius: 16px;
  box-shadow: var(--shadow2);
  padding: 14px;
}
.breakdownMiniTop{ display:flex; align-items:baseline; justify-content:space-between; gap: 10px; margin-bottom: 10px; }
.breakdownMiniRate{ font-weight: 950; color:#2b3b52; }
.breakdownMiniTotal{ font-weight: 950; color: var(--accent3); }

/* Mobile sticky summary */
.mobileSticky{
  display:none;
  margin: 10px 0 14px;
}
.mobileSticky .msKicker{
  font-size: 10px;
  letter-spacing: .14em;
  font-weight: 950;
  color: #6a7d95;
}
.mobileSticky .msValue{
  font-weight: 950;
  font-size: 22px;
  line-height: 1.05;
  color: var(--ink);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 55vw;
}
.mobileSticky .msRight{
  display:flex;
  gap: 10px;
}
.mobileSticky .msMetric{
  border: 1px solid rgba(15, 23, 42, 0.10);
  background: rgba(15, 79, 149, 0.05);
  border-radius: 14px;
  padding: 8px 10px;
  min-width: 106px;
  text-align: center;
}
.mobileSticky .msLabel{
  font-size: 11px;
  font-weight: 900;
  color: #3f536b;
  margin-bottom: 2px;
}
.mobileSticky .msNum{
  font-size: 16px;
  font-weight: 950;
  color: var(--accent3);
}

@media (max-width: 1100px){
  .mobileSticky{
    display:flex;
    position: sticky;
    top: 0;
    z-index: 30;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    padding: 10px 12px;
    border-radius: 16px;
    border: 1px solid rgba(15, 23, 42, 0.10);
    background: rgba(255,255,255,0.96);
    backdrop-filter: saturate(160%) blur(10px);
    box-shadow: 0 10px 22px rgba(11,18,32,0.08);
  }

  .headerRow{ grid-template-columns: 1fr; }

  /* Stack calculator above chart and keep calculator accessible */
  .mainGrid{ grid-template-columns: 1fr; }

  .panel{
    position: sticky;
    top: 62px; /* sits below the sticky summary */
    z-index: 20;
  }

  .rateSlider{ width: 100%; }

  /* Make the big number + header area tighter on phones */
  .contentTop{ flex-direction: column; align-items: flex-start; }
  .axisToggle{ width: 100%; justify-content: flex-start; }
  .quickRow{ gap: 8px; }
  .quickBtn{ width: fit-content; }

  /* Reduce heavy shadows on small screens for a cleaner, newspaper feel */
  .panel, .content, .chartCard, .breakdownCard, .breakdownMini{ box-shadow: 0 8px 18px rgba(11,18,32,0.06); }
}


@media (max-width: 420px){
  .page{ padding: 0 12px; }
  .brandTitle{ font-size: 46px; }
  .brandDesc{ font-size: 13px; }
  .panelTitle{ font-size: 24px; }
  .miniValue, .miniValueInput{ font-size: 20px; }
  .fieldInput{ font-size: 15px; }
  .freqRow{ grid-template-columns: 1fr; }
  .legendSmall{ flex-wrap: wrap; justify-content: flex-end; }
  .tooltip{ max-width: 220px; }


  .mobileSticky .msRight{ gap: 8px; }
  .mobileSticky .msMetric{ min-width: 96px; padding: 8px 8px; }
  .mobileSticky .msValue{ max-width: 52vw; }
}

@media (prefers-reduced-motion: reduce){
  button{ transition: none; }
}

@media print{
  .headerRow{ grid-template-columns: 1fr; }
  .ctaCards{ grid-template-columns: 1fr; }
  .mainGrid{ grid-template-columns: 1fr; }
  .panel{ position: relative; top:auto; }
  .rateSlider{ width: 100%; }
}

/* Print-only header */
.printOnly{ display:none; }
.printHeader{ margin: 0 0 8mm; }
.printBrandRow{ display:flex; align-items:baseline; justify-content:space-between; gap: 12px; }
.printBrand{
  font-family: var(--font-sans);
  font-size: clamp(46px, 5.8vw, 78px);
  line-height: 1.0;
  font-weight: 950;
  margin: 0;
}
.printUrl{
  font-size: 12px;
  letter-spacing: .12em;
  font-weight: 950;
  color: #6a7d95;
  white-space: nowrap;
}
.printPlanTitle{
  margin-top: 10px;
  font-family: var(--font-sans);
  font-size: 22px;
  line-height: 1.15;
  font-weight: 950;
  color: var(--ink);
}
.printSub{ color: #2d3f57; font-size: 14px; font-weight: 850; margin-top: 6px; }

/* Print: make it look like a clean report */
@media print{
  html, body{ background:#ffffff !important; }
  .page{ max-width: 100% !important; margin: 0 !important; padding: 0 10mm !important; }
  .printOnly{ display:block !important; }
  .headerRow{ display:none !important; }
  .headerActions, .axisToggle, .pillInfo, .scaleTools{ display:none !important; }
  .mainGrid{ grid-template-columns: 1fr !important; gap: 10mm !important; }
  .panel, .content, .chartCard, .breakdownCard, .breakdownMini{ box-shadow: none !important; }
  .panel, .content{ border-color: rgba(15,23,42,0.18) !important; }
  .btnPrimaryWide, .btnGhostWide{ display:none !important; }
  .chartSvg{ break-inside: avoid; }
}

`;
}
