import strLogo from '@/assets/str-enerji.png'
import { ThemeSwitch } from '@/components/theme-switch'
import { LanguageSwitch } from '@/components/language-switch'
import { useLanguage } from '@/lib/i18n'

type AuthLayoutProps = {
  children: React.ReactNode
}

export function AuthLayout({ children }: AuthLayoutProps) {
  const { t } = useLanguage()

  return (
    <div className="h-svh w-full bg-zinc-50 dark:bg-zinc-950 overflow-hidden">
      {/* Header - Dil ve Tema */}
      <div className="absolute top-4 right-4 z-50 flex items-center gap-2">
        <div className="rounded-md border border-zinc-300 dark:border-zinc-700 p-1 bg-white dark:bg-zinc-800">
          <LanguageSwitch />
        </div>
        <div className="rounded-md border border-zinc-300 dark:border-zinc-700 p-1 bg-white dark:bg-zinc-800">
          <ThemeSwitch />
        </div>
      </div>

      <div className="grid h-full lg:grid-cols-2">
        {/* Sol Taraf - Logo ve Form */}
        <div className="flex flex-col items-center justify-center p-4 lg:p-8">
          <div className="w-full max-w-sm space-y-6">
            {/* Logo */}
            <div className="flex justify-center">
              <img src={strLogo} alt="STR Enerji" className="h-44 w-auto scale-125 origin-center" />
            </div>

            {/* Form */}
            {children}

            {/* Demo Bilgileri */}
            <div className="p-3 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-900">
              <p className="text-xs font-medium text-zinc-500 dark:text-zinc-400 mb-1">{t('demoCredentials')}:</p>
              <div className="flex gap-4 text-sm">
                <p className="text-zinc-700 dark:text-zinc-300"><span className="font-medium">{t('email')}:</span> demo@strenerji.com</p>
                <p className="text-zinc-700 dark:text-zinc-300"><span className="font-medium">{t('password')}:</span> demo1234</p>
              </div>
            </div>
          </div>
        </div>

        {/* Sag Taraf - Gorsel */}
        <div className="hidden lg:flex flex-col justify-center items-center bg-zinc-100 dark:bg-zinc-900 relative overflow-hidden">
          {/* Arka Plan Pattern */}
          <div className="absolute inset-0">
            <svg className="w-full h-full opacity-[0.05] dark:opacity-[0.03]" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1"/>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>
          </div>

          {/* Merkez Icerik */}
          <div className="relative z-10 text-center px-12 max-w-xl">
            <div className="mb-6">
              <h1 className="text-4xl font-bold text-zinc-900 dark:text-white mb-3">
                {t('authTitle')}
              </h1>
              <h2 className="text-2xl font-semibold text-yellow-500 dark:text-yellow-400 mb-4">
                {t('authTitleLine2')}
              </h2>
              <p className="text-zinc-600 dark:text-zinc-400 text-base leading-relaxed">
                {t('authDescription')}
              </p>
            </div>

            {/* Ozellik Listesi */}
            <div className="grid grid-cols-2 gap-3 text-left mb-6">
              <div className="flex items-center gap-2 text-zinc-700 dark:text-zinc-300 text-sm">
                <div className="w-1.5 h-1.5 rounded-full bg-yellow-500 dark:bg-yellow-400"></div>
                <span>{t('feature1')}</span>
              </div>
              <div className="flex items-center gap-2 text-zinc-700 dark:text-zinc-300 text-sm">
                <div className="w-1.5 h-1.5 rounded-full bg-yellow-500 dark:bg-yellow-400"></div>
                <span>{t('feature2')}</span>
              </div>
              <div className="flex items-center gap-2 text-zinc-700 dark:text-zinc-300 text-sm">
                <div className="w-1.5 h-1.5 rounded-full bg-yellow-500 dark:bg-yellow-400"></div>
                <span>{t('feature3')}</span>
              </div>
              <div className="flex items-center gap-2 text-zinc-700 dark:text-zinc-300 text-sm">
                <div className="w-1.5 h-1.5 rounded-full bg-yellow-500 dark:bg-yellow-400"></div>
                <span>{t('feature4')}</span>
              </div>
            </div>

            {/* Kurumsal Vurgu */}
            <div className="pt-6 border-t border-zinc-300 dark:border-zinc-800">
              <p className="text-zinc-600 dark:text-zinc-400 text-sm text-center leading-relaxed">
                {t('companyDescription')}
              </p>
            </div>
          </div>

          {/* Alt Bilgi */}
          <div className="absolute bottom-8 text-zinc-500 text-sm">
            {t('copyright')}
          </div>
        </div>
      </div>
    </div>
  )
}