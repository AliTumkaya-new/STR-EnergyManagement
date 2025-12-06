import { type QueryClient } from '@tanstack/react-query'
import { createRootRouteWithContext, Outlet } from '@tanstack/react-router'
import { Toaster } from '@/components/ui/sonner'
import { NavigationProgress } from '@/components/navigation-progress'
import { GeneralError } from '@/features/errors/general-error'
import { NotFoundError } from '@/features/errors/not-found-error'
import { LoadingScreen } from '@/components/loading-screen'
import { useLanguage } from '@/lib/i18n'

function RootComponent() {
  const { isChangingLanguage } = useLanguage()
  
  return (
    <>
      <NavigationProgress />
      <LoadingScreen isLoading={isChangingLanguage} duration={1200} />
      <Outlet />
      <Toaster duration={5000} />
    </>
  )
}

export const Route = createRootRouteWithContext<{
  queryClient: QueryClient
}>()({
  component: RootComponent,
  notFoundComponent: NotFoundError,
  errorComponent: GeneralError,
})