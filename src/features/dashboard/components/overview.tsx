import { ProfessionalBarChart } from '@/components/ui/professional-charts'
import { useLanguage } from '@/lib/i18n'

export function Overview() {
  const { t } = useLanguage()
  
  const data = [
    { name: t('monday'), solar: 320, elektrik: 480 },
    { name: t('tuesday'), solar: 285, elektrik: 510 },
    { name: t('wednesday'), solar: 340, elektrik: 470 },
    { name: t('thursday'), solar: 310, elektrik: 520 },
    { name: t('friday'), solar: 295, elektrik: 540 },
    { name: t('saturday'), solar: 265, elektrik: 380 },
    { name: t('sunday'), solar: 245, elektrik: 350 },
  ]
  
  return (
    <ProfessionalBarChart
      data={data}
      xAxisKey="name"
      height={350}
      bars={[
        { dataKey: 'solar', name: `${t('solarEnergy')} (kWh)`, color: '#f59e0b', radius: 6 },
        { dataKey: 'elektrik', name: `${t('electricityConsumption')} (kWh)`, color: '#3b82f6', radius: 6 },
      ]}
    />
  )
}
