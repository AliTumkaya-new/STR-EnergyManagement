import { createFileRoute } from '@tanstack/react-router'
import BatterySystem from '@/features/energy/battery'

export const Route = createFileRoute('/_authenticated/energy/battery/')({
  component: BatterySystem,
})