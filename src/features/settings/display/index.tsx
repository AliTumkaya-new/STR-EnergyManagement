import { useLanguage } from '@/lib/i18n'
import { ContentSection } from '../components/content-section'
import { DisplayForm } from './display-form'

export function SettingsDisplay() {
  const { t } = useLanguage()
  return (
    <ContentSection
      title={t('display')}
      desc={t('displayDescription')}
    >
      <DisplayForm />
    </ContentSection>
  )
}
