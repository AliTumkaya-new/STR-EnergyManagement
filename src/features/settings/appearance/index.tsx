import { useLanguage } from '@/lib/i18n'
import { ContentSection } from '../components/content-section'
import { AppearanceForm } from './appearance-form'

export function SettingsAppearance() {
  const { t } = useLanguage()
  return (
    <ContentSection
      title={t('appearance')}
      desc={t('appearanceDescription')}
    >
      <AppearanceForm />
    </ContentSection>
  )
}
