import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/reports/weekly')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_authenticated/reports/weekly"!</div>
}
