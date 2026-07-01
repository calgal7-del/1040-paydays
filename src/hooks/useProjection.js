import { useMemo } from 'react'
import { buildProjection } from '../utils/projection'
import {
  buildGraphCallouts,
  buildGraphData,
  buildMilestones,
} from '../utils/graphBuilder'

export function useProjection(form) {
  const projection = useMemo(() => buildProjection(form), [form])

  const graphData = useMemo(
    () => buildGraphData(projection),
    [projection]
  )

  const milestones = useMemo(
    () => buildMilestones(projection),
    [projection]
  )

  const callouts = useMemo(
    () => buildGraphCallouts(projection),
    [projection]
  )

  return {
    projection,
    graphData,
    milestones,
    callouts,
  }
}
