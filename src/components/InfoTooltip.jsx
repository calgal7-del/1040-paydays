export default function InfoTooltip({ label, children }) {
  return (
    <span className="tooltipWrap">
      <button
        className="infoTooltip"
        type="button"
        aria-label={label}
      >
        ⓘ
      </button>

      <span className="tooltipBubble" role="tooltip">
        {children}
      </span>
    </span>
  )
}
