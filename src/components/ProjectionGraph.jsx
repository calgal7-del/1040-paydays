import { formatCompactCurrency, formatCurrency } from '../utils/formatters'

export default function ProjectionGraph({
  graphData,
  callouts,
  currency,
  hasRevealed,
}) {
  const maxBalance = Math.max(
    ...graphData.map((point) => point.balance),
    1
  )

  const width = 900
  const height = 360
  const padding = 42

  const points = graphData.map((point, index) => {
    const x =
      padding +
      (index / Math.max(graphData.length - 1, 1)) *
        (width - padding * 2)

    const y =
      height -
      padding -
      (point.balance / maxBalance) *
        (height - padding * 2)

    const contributionY =
      height -
      padding -
      (point.contributions / maxBalance) *
        (height - padding * 2)

    return {
      ...point,
      x,
      y,
      contributionY,
    }
  })

  const balancePath = points
    .map((point, index) =>
      `${index === 0 ? 'M' : 'L'} ${point.x} ${point.y}`
    )
    .join(' ')

  const contributionPath = points
    .map((point, index) =>
      `${index === 0 ? 'M' : 'L'} ${point.x} ${point.contributionY}`
    )
    .join(' ')

  const lastPoint = points[points.length - 1]

  return (
    <section className="graphCard" id="graph">
      <div className="graphHeader">
        <div>
          <p>Your projection</p>
          <h2>Every contribution changes the curve.</h2>
        </div>

        <div className="graphLegend">
          <span className="legendBalance">Balance</span>
          <span className="legendContribution">Contributions</span>
        </div>
      </div>

      <div className="graphCanvas">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          role="img"
          aria-label="Projection graph"
        >
          {[0, 0.25, 0.5, 0.75, 1].map((tick) => {
            const y =
              height -
              padding -
              tick * (height - padding * 2)

            return (
              <g key={tick}>
                <line
                  x1={padding}
                  x2={width - padding}
                  y1={y}
                  y2={y}
                  className="gridLine"
                />
                <text
                  x="4"
                  y={y + 4}
                  className="axisLabel"
                >
                  {formatCompactCurrency(maxBalance * tick, currency)}
                </text>
              </g>
            )
          })}

          <path
            d={contributionPath}
            className="contributionLine"
          />

          <path
            d={balancePath}
            className={`balanceLine ${hasRevealed ? 'drawLine' : ''}`}
          />

          {callouts.map((callout) => {
            const nearest =
              points.find((point) => point.payday >= callout.x) ||
              lastPoint

            return (
              <g
                key={callout.id}
                transform={`translate(${nearest.x}, ${nearest.y})`}
                className="graphCallout"
              >
                <circle r="6" />
                <foreignObject
                  x={callout.id === 'consistency' ? 12 : -190}
                  y={callout.id === 'consistency' ? -62 : -76}
                  width="180"
                  height="72"
                >
                  <div className="calloutBox">
                    <strong>{callout.title}</strong>
                    <span>{callout.description}</span>
                  </div>
                </foreignObject>
              </g>
            )
          })}

          {lastPoint && (
            <g transform={`translate(${lastPoint.x}, ${lastPoint.y})`}>
              <circle className="endDot" r="8" />
              <text
                x="-122"
                y="-18"
                className="finalLabel"
              >
                {formatCurrency(lastPoint.balance, currency)}
              </text>
            </g>
          )}
        </svg>
      </div>
    </section>
  )
}
