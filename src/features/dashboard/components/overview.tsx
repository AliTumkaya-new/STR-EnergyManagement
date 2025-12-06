import { ProfessionalBarChart } from '@/components/ui/professional-charts'
import { useLanguage } from '@/lib/i18n'

const data = [
  { name: 'Pzt', solar: 320, elektrik: 480 },
  { name: 'Sal', solar: 285, elektrik: 510 },
  { name: 'Car', solar: 340, elektrik: 470 },
  { name: 'Per', solar: 310, elektrik: 520 },
  { name: 'Cum', solar: 295, elektrik: 540 },
  { name: 'Cmt', solar: 265, elektrik: 380 },
  { name: 'Paz', solar: 245, elektrik: 350 },
]

export function Overview() {
  const { t } = useLanguage()
  
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
