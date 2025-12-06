import { createFileRoute } from '@tanstack/react-router'
import Gas from '@/features/energy/gas'

export const Route = createFileRoute('/_authenticated/energy/gas/')({
  component: Gas,
})