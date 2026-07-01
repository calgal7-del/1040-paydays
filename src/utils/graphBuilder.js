export function buildGraphData(projection) {
  if (!projection?.points) return []

  return projection.points.map((point) => ({
    payday: point.payday,
    age: Number(point.year.toFixed(1)),
    balance: Math.round(point.balance),
    contributions: Math.round(point.contributions),
    growth: Math.round(point.growth),
  }))
}

export function buildMilestones(projection) {
  if (!projection?.points) return []

  const points = projection.points
  const last = points[points.length - 1]

  return [
    {
      type: 'retirement',
      label: 'Goal',
      payday: last.payday,
      age: Number(last.year.toFixed(1)),
      value: Math.round(last.balance),
    },
  ]
}

export function buildGraphCallouts(projection) {
  if (!projection?.points) return []

  const points = projection.points

  return [
    {
      id: 'consistency',
      title: 'Consistency',
      description: 'Your contributions build the foundation.',
      point: points[Math.floor(points.length * 0.25)],
    },
    {
      id: 'compounding',
      title: 'Compounding',
      description: 'Growth starts to accelerate.',
      point: points[Math.floor(points.length * 0.58)],
    },
    {
      id: 'freedom',
      title: 'Freedom',
      description: 'Your future is within reach.',
      point: points[Math.floor(points.length * 0.82)],
    },
  ]
}
