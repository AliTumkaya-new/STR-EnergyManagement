import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/reports/daily')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_authenticated/reports/daily"!</div>
}
