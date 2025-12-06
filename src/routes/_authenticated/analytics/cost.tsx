import { createFileRoute } from '@tanstack/react-router'
import { AnalyticsCost } from '@/features/analytics/cost'

export const Route = createFileRoute('/_authenticated/analytics/cost')({
  component: AnalyticsCost,
})
