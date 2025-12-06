import { useLanguage } from '@/lib/i18n'
import { ContentSection } from '../components/content-section'
import { ProfileForm } from './profile-form'

export function SettingsProfile() {
  const { t } = useLanguage()
  return (
    <ContentSection
      title={t('profile')}
      desc={t('profileDescription')}
    >
      <ProfileForm />
    </ContentSection>
  )
}
