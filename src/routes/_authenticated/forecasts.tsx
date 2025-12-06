// Forecasts Page - Manual Component Pattern
// Last updated: 2025-12-03 - DO NOT AUTO-GENERATE
import { createFileRoute } from '@tanstack/react-router'
import { Forecasts } from '@/features/forecasts'

export const Route = createFileRoute('/_authenticated/forecasts')({
  component: Forecasts,
})
