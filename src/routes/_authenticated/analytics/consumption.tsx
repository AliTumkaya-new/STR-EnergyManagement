import { createFileRoute } from '@tanstack/react-router'
import { AnalyticsConsumption } from '@/features/analytics/consumption'

export const Route = createFileRoute('/_authenticated/analytics/consumption')({
  component: AnalyticsConsumption,
})
