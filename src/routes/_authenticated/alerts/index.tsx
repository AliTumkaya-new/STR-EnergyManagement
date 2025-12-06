import { createFileRoute } from '@tanstack/react-router'
import { Alerts } from '@/features/alerts/index'

export const Route = createFileRoute('/_authenticated/alerts/')({
  component: Alerts,
})
