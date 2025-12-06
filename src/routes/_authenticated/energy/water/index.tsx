import { createFileRoute } from '@tanstack/react-router'
import Water from '@/features/energy/water'

export const Route = createFileRoute('/_authenticated/energy/water/')({
  component: Water,
})