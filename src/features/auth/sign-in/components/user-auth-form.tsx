import { useState } from 'react'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate } from '@tanstack/react-router'
import { Loader2, LogIn } from 'lucide-react'
import { toast } from 'sonner'
import { useAuthStore } from '@/stores/auth-store'
import { sleep, cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { PasswordInput } from '@/components/password-input'
import { useLanguage } from '@/lib/i18n'

interface UserAuthFormProps extends React.HTMLAttributes<HTMLFormElement> {
  redirectTo?: string
}

export function UserAuthForm({
  className,
  redirectTo,
  ...props
}: UserAuthFormProps) {
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()
  const { auth } = useAuthStore()
  const { t, language } = useLanguage()

  const formSchema = z.object({
    email: z.email({
      error: (iss) => (iss.input === '' ? (language === 'tr' ? 'Lutfen e-posta adresinizi girin' : 'Please enter your email') : undefined),
    }),
    password: z
      .string()
      .min(1, language === 'tr' ? 'Lutfen sifrenizi girin' : 'Please enter your password')
      .min(7, language === 'tr' ? 'Sifre en az 7 karakter olmalidir' : 'Password must be at least 7 characters'),
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  function onSubmit(data: z.infer<typeof formSchema>) {
    setIsLoading(true)

    toast.promise(sleep(2000), {
      loading: language === 'tr' ? 'Giris yapiliyor...' : 'Signing in...',
      success: () => {
        setIsLoading(false)

        const mockUser = {
          accountNo: 'ACC001',
          email: data.email,
          role: ['user'],
          exp: Date.now() + 24 * 60 * 60 * 1000,
        }

        auth.setUser(mockUser)
        auth.setAccessToken('mock-access-token')

        const targetPath = redirectTo || '/'
        navigate({ to: targetPath, replace: true })

        return language === 'tr' ? `Hos geldiniz, ${data.email}!` : `Welcome, ${data.email}!`
      },
      error: language === 'tr' ? 'Hata' : 'Error',
    })
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn('grid gap-3', className)}
        {...props}
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('email')}</FormLabel>
              <FormControl>
                <Input placeholder="ornek@sirket.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('password')}</FormLabel>
              <FormControl>
                <PasswordInput placeholder="********" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className="mt-2 h-11" disabled={isLoading}>
          {isLoading ? <Loader2 className="animate-spin" /> : <LogIn />}
          {t('loginButton')}
        </Button>
      </form>
    </Form>
  )
}