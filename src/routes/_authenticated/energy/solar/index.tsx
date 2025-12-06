import { createFileRoute } from '@tanstack/react-router'
import SolarEnergy from '@/features/energy/solar'

export const Route = createFileRoute('/_authenticated/energy/solar/')({
  component: SolarEnergy,
})