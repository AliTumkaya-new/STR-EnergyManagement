import { createFileRoute } from '@tanstack/react-router'
import { AnalyticsProduction } from '@/features/analytics/production'

export const Route = createFileRoute('/_authenticated/analytics/production')({
  component: AnalyticsProduction,
})
