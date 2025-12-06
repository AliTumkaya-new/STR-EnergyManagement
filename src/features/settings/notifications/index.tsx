import { useLanguage } from '@/lib/i18n'
import { ContentSection } from '../components/content-section'
import { NotificationsForm } from './notifications-form'

export function SettingsNotifications() {
  const { t } = useLanguage()
  return (
    <ContentSection
      title={t('notifications')}
      desc={t('notificationsDescription')}
    >
      <NotificationsForm />
    </ContentSection>
  )
}
