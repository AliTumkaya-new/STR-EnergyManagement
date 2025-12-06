import { useState } from 'react'
import {
  Download, Zap, TrendingUp,
  ArrowUpRight, ArrowDownRight, Sun, Target, BarChart3,
  CheckCircle2, RefreshCw, CalendarDays
} from 'lucide-react'
import { useLanguage } from '@/lib/i18n'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue
} from '@/components/ui/select'
import { ProfessionalBarChart } from '@/components/ui/professional-charts'

// Haftalık tüketim verisi
const weeklyData = [
  { gun: 'Pazartesi', tuketim: 8500, uretim: 3800, maliyet: 2850 },
  { gun: 'Salı', tuketim: 8750, uretim: 4200, maliyet: 2720 },
  { gun: 'Çarşamba', tuketim: 9200, uretim: 4100, maliyet: 3050 },
  { gun: 'Perşembe', tuketim: 8900, uretim: 3950, maliyet: 2950 },
  { gun: 'Cuma', tuketim: 8650, uretim: 4350, maliyet: 2580 },
  { gun: 'Cumartesi', tuketim: 5200, uretim: 4500, maliyet: 420 },
  { gun: 'Pazar', tuketim: 4800, uretim: 4200, maliyet: 360 },
]

// Haftalık karşılaştırma
const weekComparison = [
  { metrik: 'Toplam Tüketim', buHafta: '54,000 kWh', gecenHafta: '56,200 kWh', degisim: -3.9 },
  { metrik: 'Toplam Üretim', buHafta: '29,100 kWh', gecenHafta: '27,500 kWh', degisim: 5.8 },
  { metrik: 'Şebeke Çekişi', buHafta: '24,900 kWh', gecenHafta: '28,700 kWh', degisim: -13.2 },
  { metrik: 'Toplam Maliyet', buHafta: '₺14,930', gecenHafta: '₺16,850', degisim: -11.4 },
]

// Günlük pik değerler
const peakValues = [
  { gun: 'Pzt', saat: '14:30', deger: 612 },
  { gun: 'Sal', saat: '15:00', deger: 628 },
  { gun: 'Çar', saat: '14:45', deger: 645 },
  { gun: 'Per', saat: '14:15', deger: 618 },
  { gun: 'Cum', saat: '11:30', deger: 595 },
  { gun: 'Cmt', saat: '12:00', deger: 385 },
  { gun: 'Paz', saat: '13:30', deger: 342 },
]

export function ReportsWeekly() {
  const { t, language } = useLanguage()
  const [selectedWeek, setSelectedWeek] = useState('current')

  const getWeekRange = () => {
    const now = new Date()
    const start = new Date(now)
    start.setDate(now.getDate() - now.getDay() + 1)
    const end = new Date(start)
    end.setDate(start.getDate() + 6)
    
    const locale = language === 'tr' ? 'tr-TR' : 'en-US'
    return `${start.toLocaleDateString(locale, { day: 'numeric', month: 'short' })} - ${end.toLocaleDateString(locale, { day: 'numeric', month: 'short', year: 'numeric' })}`
  }

  return (
    <>
      <Header fixed>
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center size-10 rounded-xl bg-muted/50 border border-border">
            <CalendarDays className="size-5 text-muted-foreground" />
          </div>
          <div>
            <h1 className="text-lg font-semibold tracking-tight">{t('weeklyReport')}</h1>
            <p className="text-xs text-muted-foreground">{getWeekRange()}</p>
          </div>
        </div>
        <div className="ml-auto flex items-center gap-2">
          <Select value={selectedWeek} onValueChange={setSelectedWeek}>
            <SelectTrigger className="w-[160px] h-9">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="current">{t('thisWeek')}</SelectItem>
              <SelectItem value="last">{t('lastWeek')}</SelectItem>
              <SelectItem value="lastlast">{t('twoWeeksAgo')}</SelectItem>
            </SelectContent>
          </Select>
          <Button size="sm" variant="outline" className="gap-2">
            <RefreshCw className="size-4" />
          </Button>
          <Button size="sm" className="gap-2">
            <Download className="size-4" />
            <span className="hidden sm:inline">{t('downloadPdf')}</span>
          </Button>
        </div>
      </Header>

      <Main>
        <div className="space-y-6">
          {/* Weekly Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="border bg-card hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">{t('weeklyConsumption')}</p>
                    <p className="text-3xl font-bold text-foreground">54,000</p>
                    <p className="text-xs text-muted-foreground">kWh</p>
                  </div>
                  <div className="size-10 rounded-xl bg-muted/50 flex items-center justify-center">
                    <Zap className="size-5 text-muted-foreground" />
                  </div>
                </div>
                <div className="flex items-center gap-1 mt-2">
                  <ArrowDownRight className="size-3 text-green-600" />
                  <span className="text-xs text-green-600 font-medium">-3.9%</span>
                  <span className="text-xs text-muted-foreground">{t('vsLastWeek')}</span>
                </div>
              </CardContent>
            </Card>

            <Card className="border bg-card hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">{t('weeklyProduction')}</p>
                    <p className="text-3xl font-bold text-foreground">29,100</p>
                    <p className="text-xs text-muted-foreground">kWh</p>
                  </div>
                  <div className="size-10 rounded-xl bg-muted/50 flex items-center justify-center">
                    <Sun className="size-5 text-muted-foreground" />
                  </div>
                </div>
                <div className="flex items-center gap-1 mt-2">
                  <ArrowUpRight className="size-3 text-green-600" />
                  <span className="text-xs text-green-600 font-medium">+5.8%</span>
                </div>
              </CardContent>
            </Card>

            <Card className="border bg-card hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">{t('averagePeak')}</p>
                    <p className="text-3xl font-bold text-foreground">546</p>
                    <p className="text-xs text-muted-foreground">kW</p>
                  </div>
                  <div className="size-10 rounded-xl bg-muted/50 flex items-center justify-center">
                    <TrendingUp className="size-5 text-muted-foreground" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border bg-card hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">{t('totalCost')}</p>
                    <p className="text-3xl font-bold text-foreground">₺14,930</p>
                    <p className="text-xs text-muted-foreground">{t('savings')}: ₺1,920</p>
                  </div>
                  <div className="size-10 rounded-xl bg-muted/50 flex items-center justify-center">
                    <CheckCircle2 className="size-5 text-muted-foreground" />
                  </div>
                </div>
                <div className="flex items-center gap-1 mt-2">
                  <ArrowDownRight className="size-3 text-green-600" />
                  <span className="text-xs text-green-600 font-medium">-11.4%</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Weekly Chart */}
          <Card className="border shadow-sm">
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <BarChart3 className="size-4" />
                {t('dailyConsumptionProduction')}
              </CardTitle>
              <CardDescription>{t('weeklyEnergyProfile')}</CardDescription>
            </CardHeader>
            <CardContent>
              <ProfessionalBarChart
                data={weeklyData}
                xAxisKey="gun"
                height={350}
                bars={[
                  { dataKey: 'tuketim', name: t('consumptionKwh'), color: '#3b82f6', radius: 6 },
                  { dataKey: 'uretim', name: t('productionKwh'), color: '#10b981', radius: 6 },
                ]}
              />
            </CardContent>
          </Card>

          {/* Comparison & Peak */}
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Week Comparison */}
            <Card className="border shadow-sm">
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <Target className="size-4" />
                  {t('weeklyComparison')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {weekComparison.map((item, idx) => (
                    <div key={idx} className="p-3 rounded-lg border bg-muted/30">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium">{item.metrik}</span>
                        <Badge variant={item.degisim < 0 ? 'default' : 'secondary'} className="text-xs">
                          {item.degisim > 0 ? '+' : ''}{item.degisim}%
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between text-xs">
                        <div>
                          <span className="text-muted-foreground">{t('thisWeek')}: </span>
                          <span className="font-medium">{item.buHafta}</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">{t('lastWeek')}: </span>
                          <span>{item.gecenHafta}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Peak Values */}
            <Card className="border shadow-sm">
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <TrendingUp className="size-4" />
                  {t('dailyPeakValues')}
                </CardTitle>
                <CardDescription>{t('maxInstantConsumption')}</CardDescription>
              </CardHeader>
              <CardContent>
                <ProfessionalBarChart
                  data={peakValues}
                  xAxisKey="gun"
                  height={250}
                  showLegend={false}
                  bars={[
                    { dataKey: 'deger', name: t('peakValue') + ' (kW)', color: '#f59e0b', radius: 6 },
                  ]}
                />
              </CardContent>
            </Card>
          </div>
        </div>
      </Main>
    </>
  )
}
