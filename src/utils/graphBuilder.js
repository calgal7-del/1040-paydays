/**
 * Converts projection data into graph-ready data.
 * The graph never performs calculations—it only renders these points.
 */

export function buildGraphData(projection) {
  if (!projection || !projection.points) {
    return []
  }

  return projection.points.map((point) => ({
    payday: point.payday,
    age: Number(point.year.toFixed(1)),
    balance: Math.round(point.balance),
    contributions: Math.round(point.contributions),
    growth: Math.round(point.growth),
  }))
}

/**
 * Returns milestone markers shown on the graph.
 */

export function buildMilestones(projection) {
  if (!projection || !projection.points) {
    return []
  }

  const points = projection.points
  const last = points[points.length - 1]

  const targets = [
    10000,
    50000,
    100000,
    250000,
    500000,
    1000000,
  ]

  const milestones = []

  targets.forEach((target) => {
    const found = points.find((p) => p.balance >= target)

    if (found) {
      milestones.push({
        type: "balance",
        label: `$${target.toLocaleString()}`,
        payday: found.payday,
        age: Number(found.year.toFixed(1)),
        value: Math.round(found.balance),
      })
    }
  })

  milestones.push({
    type: "retirement",
    label: "Retirement",
    payday: last.payday,
    age: Number(last.year.toFixed(1)),
    value: Math.round(last.balance),
  })

  return milestones
}

/**
 * Returns graph annotations.
 */

export function buildGraphCallouts(projection) {
  if (!projection || !projection.points) {
    return []
  }

  const points = projection.points

  const consistency = points[Math.floor(points.length * 0.25)]
  const compounding = points[Math.floor(points.length * 0.75)]

  return [
    {
      id: "consistency",
      title: "Consistency",
      description:
        "Most early growth comes from your regular contributions.",
      x: consistency.payday,
      y: consistency.balance,
    },
    {
      id: "compounding",
      title: "Compounding",
      description:
        "Investment growth begins to outpace your contributions.",
      x: compounding.payday,
      y: compounding.balance,
    },
  ]
}
