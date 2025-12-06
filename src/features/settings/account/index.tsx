import { useLanguage } from '@/lib/i18n'
import { ContentSection } from '../components/content-section'
import { AccountForm } from './account-form'

export function SettingsAccount() {
  const { t } = useLanguage()
  return (
    <ContentSection
      title={t('account')}
      desc={t('accountDescription')}
    >
      <AccountForm />
    </ContentSection>
  )
}
