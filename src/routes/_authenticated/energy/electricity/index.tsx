import { createFileRoute } from '@tanstack/react-router'
import Electricity from '@/features/energy/electricity'

export const Route = createFileRoute('/_authenticated/energy/electricity/')({
  component: Electricity,
})