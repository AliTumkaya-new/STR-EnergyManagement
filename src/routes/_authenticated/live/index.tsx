import { createFileRoute } from '@tanstack/react-router'
import { LiveMonitoring } from '@/features/live'

export const Route = createFileRoute('/_authenticated/live/')({
  component: LiveMonitoring,
})