import { createFileRoute } from '@tanstack/react-router'
import { AnalyticsCarbonFootprint } from '@/features/analytics/carbon-footprint'

export const Route = createFileRoute('/_authenticated/analytics/carbon-footprint')({
  component: AnalyticsCarbonFootprint,
})
