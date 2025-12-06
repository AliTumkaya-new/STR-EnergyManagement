import { useState } from 'react'
import {
  Download, Zap, Sun, Wind,
  Battery, ArrowUpRight, ArrowDownRight, Activity,
  Target, BarChart3, LineChart as LineChartIcon
} from 'lucide-react'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue
} from '@/components/ui/select'
import {
  ProfessionalAreaChart,
  ProfessionalBarChart,
} from '@/components/ui/professional-charts'
import { useLanguage } from '@/lib/i18n'

export function AnalyticsProduction() {
  const { t, language } = useLanguage()
  const [timeRange, setTimeRange] = useState('today')

  // Üretim verileri - günlük
  const dailyProduction = [
    { saat: '06:00', solar: 0, ruzgar: 12, batarya: -5 },
    { saat: '07:00', solar: 8, ruzgar: 15, batarya: -8 },
    { saat: '08:00', solar: 45, ruzgar: 18, batarya: -15 },
    { saat: '09:00', solar: 120, ruzgar: 22, batarya: -20 },
    { saat: '10:00', solar: 185, ruzgar: 25, batarya: 10 },
    { saat: '11:00', solar: 220, ruzgar: 20, batarya: 25 },
    { saat: '12:00', solar: 245, ruzgar: 18, batarya: 35 },
    { saat: '13:00', solar: 238, ruzgar: 22, batarya: 30 },
    { saat: '14:00', solar: 210, ruzgar: 28, batarya: 20 },
    { saat: '15:00', solar: 165, ruzgar: 32, batarya: 15 },
    { saat: '16:00', solar: 95, ruzgar: 28, batarya: -10 },
    { saat: '17:00', solar: 35, ruzgar: 22, batarya: -25 },
    { saat: '18:00', solar: 5, ruzgar: 18, batarya: -30 },
  ]

  // Haftalık üretim
  const weeklyProduction = [
    { gun: t('mon'), solar: 1850, ruzgar: 420, toplam: 2270 },
    { gun: t('tue'), solar: 2100, ruzgar: 380, toplam: 2480 },
    { gun: t('wed'), solar: 1650, ruzgar: 520, toplam: 2170 },
    { gun: t('thu'), solar: 2250, ruzgar: 450, toplam: 2700 },
    { gun: t('fri'), solar: 1920, ruzgar: 580, toplam: 2500 },
    { gun: t('sat'), solar: 2080, ruzgar: 320, toplam: 2400 },
    { gun: t('sun'), solar: 1780, ruzgar: 410, toplam: 2190 },
  ]

  // Kaynak bazlı üretim dağılımı
  const productionSources = [
    { kaynak: t('solarPanel'), kapasite: 500, uretim: 245, verimlilik: 92, durum: 'optimal' },
    { kaynak: t('windTurbine'), kapasite: 100, uretim: 28, verimlilik: 78, durum: 'normal' },
    { kaynak: t('batteryDischarge'), kapasite: 200, uretim: 35, verimlilik: 95, durum: 'optimal' },
  ]

  // Performans metrikleri
  const performanceMetrics = [
    { metric: language === 'tr' ? 'Kapasite Faktörü' : 'Capacity Factor', deger: '%24.5', hedef: '%25', durum: 'warning' },
    { metric: language === 'tr' ? 'Performans Oranı' : 'Performance Ratio', deger: '%87.2', hedef: '%85', durum: 'good' },
    { metric: language === 'tr' ? 'Kullanılabilirlik' : 'Availability', deger: '%98.5', hedef: '%95', durum: 'good' },
    { metric: 'Grid Feed-in', deger: '156 kWh', hedef: '150 kWh', durum: 'good' },
  ]

  return (
    <>
      <Header fixed>
        <div className="ml-auto flex items-center gap-2">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[140px] h-9">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="today">{t('today')}</SelectItem>
              <SelectItem value="week">{t('thisWeek')}</SelectItem>
              <SelectItem value="month">{t('thisMonth')}</SelectItem>
              <SelectItem value="year">{language === 'tr' ? 'Bu Yıl' : 'This Year'}</SelectItem>
            </SelectContent>
          </Select>
          <Button size="sm" variant="outline" className="gap-2">
            <Download className="size-4" />
            <span className="hidden sm:inline">{t('export')}</span>
          </Button>
        </div>
      </Header>

      <Main className="pt-0">
        <div className="space-y-6 pt-6">
          {/* Page Header */}
          <div className="flex items-center gap-4">
            <div className="flex items-center justify-center size-12 rounded-xl bg-muted/50 border border-border">
              <Sun className="size-6 text-muted-foreground" />
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight">{t('productionAnalysisTitle')}</h1>
              <p className="text-sm text-muted-foreground">{t('productionPerformance')}</p>
            </div>
          </div>
          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="bg-card hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">{t('solarProductionLabel')}</p>
                    <p className="text-3xl font-bold text-foreground">245</p>
                    <p className="text-xs text-muted-foreground">{language === 'tr' ? 'kW anlık' : 'kW instant'}</p>
                  </div>
                  <div className="size-10 rounded-xl bg-muted/50 flex items-center justify-center">
                    <Sun className="size-5 text-muted-foreground" />
                  </div>
                </div>
                <div className="flex items-center gap-1 mt-2">
                  <ArrowUpRight className="size-3 text-green-600" />
                  <span className="text-xs text-green-600 font-medium">+12.5%</span>
                  <span className="text-xs text-muted-foreground">{t('vsYesterday')}</span>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">{t('windProduction')}</p>
                    <p className="text-3xl font-bold text-foreground">28</p>
                    <p className="text-xs text-muted-foreground">{language === 'tr' ? 'kW anlık' : 'kW instant'}</p>
                  </div>
                  <div className="size-10 rounded-xl bg-muted/50 flex items-center justify-center">
                    <Wind className="size-5 text-muted-foreground" />
                  </div>
                </div>
                <div className="flex items-center gap-1 mt-2">
                  <ArrowDownRight className="size-3 text-red-600" />
                  <span className="text-xs text-red-600 font-medium">-5.2%</span>
                  <span className="text-xs text-muted-foreground">{t('vsYesterday')}</span>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">{t('totalProductionLabel')}</p>
                    <p className="text-3xl font-bold text-foreground">12,450</p>
                    <p className="text-xs text-muted-foreground">{language === 'tr' ? 'kWh bugün' : 'kWh today'}</p>
                  </div>
                  <div className="size-10 rounded-xl bg-muted/50 flex items-center justify-center">
                    <Zap className="size-5 text-muted-foreground" />
                  </div>
                </div>
                <div className="flex items-center gap-1 mt-2">
                  <ArrowUpRight className="size-3 text-green-600" />
                  <span className="text-xs text-green-600 font-medium">+8.4%</span>
                  <span className="text-xs text-muted-foreground">{t('vsYesterday')}</span>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">{t('batteryStatusLabel')}</p>
                    <p className="text-3xl font-bold text-foreground">78%</p>
                    <p className="text-xs text-muted-foreground">{language === 'tr' ? 'şarj seviyesi' : 'charge level'}</p>
                  </div>
                  <div className="size-10 rounded-xl bg-muted/50 flex items-center justify-center">
                    <Battery className="size-5 text-muted-foreground" />
                  </div>
                </div>
                <div className="flex items-center gap-1 mt-2">
                  <span className="text-xs text-muted-foreground">{t('charging')}</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Charts */}
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Main Chart */}
            <Card className="lg:col-span-2 border shadow-sm">
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <LineChartIcon className="size-4" />
                  {t('dailyProductionProfile')}
                </CardTitle>
                <CardDescription>{t('hourlyProductionDistribution')}</CardDescription>
              </CardHeader>
              <CardContent>
                <ProfessionalAreaChart
                  data={dailyProduction}
                  xAxisKey="saat"
                  height={320}
                  areas={[
                    { dataKey: 'solar', name: t('solarProductionKw'), color: '#eab308', gradientId: 'yellowGradient' },
                    { dataKey: 'ruzgar', name: language === 'tr' ? 'Rüzgar (kW)' : 'Wind (kW)', color: '#06b6d4', gradientId: 'cyanGradient' },
                  ]}
                />
              </CardContent>
            </Card>

            {/* Source Performance */}
            <Card className="border shadow-sm">
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <Activity className="size-4" />
                  {language === 'tr' ? 'Kaynak Performansı' : 'Source Performance'}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {productionSources.map((source, idx) => (
                  <div key={idx} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">{source.kaynak}</span>
                      <Badge variant={source.durum === 'optimal' ? 'default' : 'secondary'} className="text-xs">
                        {source.durum === 'optimal' ? t('optimal') : t('normal')}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>{source.uretim} / {source.kapasite} kW</span>
                      <span>%{source.verimlilik} {language === 'tr' ? 'verim' : 'efficiency'}</span>
                    </div>
                    <Progress value={(source.uretim / source.kapasite) * 100} className="h-2" />
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Weekly & Metrics */}
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Weekly Chart */}
            <Card className="border shadow-sm">
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <BarChart3 className="size-4" />
                  {t('weeklyProductionLabel')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ProfessionalBarChart
                  data={weeklyProduction}
                  xAxisKey="gun"
                  height={280}
                  bars={[
                    { dataKey: 'solar', name: 'Solar (kWh)', color: '#eab308', radius: 6 },
                    { dataKey: 'ruzgar', name: language === 'tr' ? 'Rüzgar (kWh)' : 'Wind (kWh)', color: '#06b6d4', radius: 6 },
                  ]}
                />
              </CardContent>
            </Card>

            {/* Performance Metrics */}
            <Card className="border shadow-sm">
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <Target className="size-4" />
                  {language === 'tr' ? 'Performans Metrikleri' : 'Performance Metrics'}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {performanceMetrics.map((item, idx) => (
                  <div key={idx} className={`p-3 rounded-lg border ${
                    item.durum === 'good' 
                      ? 'bg-green-50 dark:bg-green-950/30 border-green-200 dark:border-green-800' 
                      : 'bg-amber-50 dark:bg-amber-950/30 border-amber-200 dark:border-amber-800'
                  }`}>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">{item.metric}</span>
                      <Badge variant={item.durum === 'good' ? 'default' : 'secondary'} className="text-xs">
                        {item.durum === 'good' ? (language === 'tr' ? 'Başarılı' : 'Success') : (language === 'tr' ? 'Dikkat' : 'Attention')}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-xl font-bold">{item.deger}</span>
                      <span className="text-xs text-muted-foreground">{t('target')}: {item.hedef}</span>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </Main>
    </>
  )
}
