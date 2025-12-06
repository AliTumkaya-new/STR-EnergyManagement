import { useSearch } from '@tanstack/react-router'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { AuthLayout } from '../auth-layout'
import { UserAuthForm } from './components/user-auth-form'
import { useLanguage } from '@/lib/i18n'

export function SignIn() {
  const { redirect } = useSearch({ from: '/(auth)/sign-in' })
  const { t, language } = useLanguage()

  return (
    <AuthLayout>
      <Card className="border-0 shadow-none bg-transparent">
        <CardHeader className="space-y-1 pb-6 text-center">
          <CardTitle className="text-2xl font-bold tracking-tight">
            {t('login')}
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            {language === 'tr' ? 'Enerji yönetim panelinize erişin' : 'Access your energy management panel'}
          </p>
        </CardHeader>
        <CardContent>
          <UserAuthForm redirectTo={redirect} />
        </CardContent>
      </Card>
    </AuthLayout>
  )
}