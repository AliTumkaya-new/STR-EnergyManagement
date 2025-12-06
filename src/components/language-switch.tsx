import { Globe } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useLanguage } from '@/lib/i18n'
import { cn } from '@/lib/utils'

const languages = [
  { code: 'tr' as const, label: 'Turkce', flag: 'TR' },
  { code: 'en' as const, label: 'English', flag: 'EN' },
]

export function LanguageSwitch() {
  const { language, setLanguage, t } = useLanguage()
  
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="h-9 w-9">
          <Globe className="h-4 w-4" />
          <span className="sr-only">{t('selectLanguage')}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {languages.map((l) => (
          <DropdownMenuItem
            key={l.code}
            onClick={() => setLanguage(l.code)}
            className={cn(
              'flex items-center gap-2',
              language === l.code && 'bg-accent'
            )}
          >
            <span className="font-medium">{l.flag}</span>
            <span>{l.label}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}