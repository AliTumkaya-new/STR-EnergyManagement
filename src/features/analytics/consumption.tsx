import { useState } from 'react'
import {
  TrendingUp, Zap, Download,
  BarChart3, PieChart, Activity, Clock, ArrowUpRight,
  ArrowDownRight, Target, AlertTriangle, CheckCircle2,
  Droplets, Flame, Building2, Factory
} from 'lucide-react'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue
} from '@/components/ui/select'
import {
  ProfessionalAreaChart,
  ProfessionalLineChart,
  ProfessionalPieChart,
} from '@/components/ui/professional-charts'
import { useLanguage } from '@/lib/i18n'

export function AnalyticsConsumption() {
  const { t, language } = useLanguage()
  const [timeRange, setTimeRange] = useState('7d')

  // Günlük tüketim trendi
  const dailyConsumption = [
    { date: language === 'tr' ? '25 Kas' : 'Nov 25', elektrik: 3650, dogalgaz: 520, su: 42, total: 4212 },
    { date: language === 'tr' ? '26 Kas' : 'Nov 26', elektrik: 3820, dogalgaz: 580, su: 45, total: 4445 },
    { date: language === 'tr' ? '27 Kas' : 'Nov 27', elektrik: 3590, dogalgaz: 490, su: 38, total: 4118 },
    { date: language === 'tr' ? '28 Kas' : 'Nov 28', elektrik: 3750, dogalgaz: 540, su: 41, total: 4331 },
    { date: language === 'tr' ? '29 Kas' : 'Nov 29', elektrik: 3680, dogalgaz: 510, su: 40, total: 4230 },
    { date: language === 'tr' ? '30 Kas' : 'Nov 30', elektrik: 3450, dogalgaz: 465, su: 36, total: 3951 },
    { date: language === 'tr' ? '1 Ara' : 'Dec 1', elektrik: 3520, dogalgaz: 485, su: 39, total: 4044 },
  ]

  // Saatlik tüketim (bugün)
  const hourlyConsumption = Array.from({ length: 24 }, (_, i) => ({
    saat: `${i.toString().padStart(2, '0')}:00`,
    elektrik: 120 + Math.random() * 180,
    dogalgaz: 15 + Math.random() * 30,
    su: 1.2 + Math.random() * 2.5,
  }))

  // Alan bazlı tüketim dağılımı
  const consumptionByArea = [
    { name: t('productionArea'), value: 45, color: '#3b82f6' },
    { name: t('offices'), value: 20, color: '#22c55e' },
    { name: t('lighting'), value: 15, color: '#f59e0b' },
    { name: t('hvac'), value: 12, color: '#06b6d4' },
    { name: t('other'), value: 8, color: '#8b5cf6' },
  ]

  // Kaynak bazlı tüketim
  const consumptionBySource = [
    { kaynak: t('electricity'), tuketim: 3750, maliyet: 4125, birim: 'kWh' },
    { kaynak: t('naturalGas'), tuketim: 561, maliyet: 2805, birim: 'm³' },
    { kaynak: t('water'), tuketim: 315, maliyet: 945, birim: 'm³' },
  ]

  // Zirve tüketim saatleri
  const peakHours = [
    { saat: '08:00-09:00', tuketim: 285, oran: 95 },
    { saat: '17:00-18:00', tuketim: 278, oran: 93 },
    { saat: '12:00-13:00', tuketim: 262, oran: 87 },
    { saat: '14:00-15:00', tuketim: 245, oran: 82 },
    { saat: '10:00-11:00', tuketim: 238, oran: 79 },
  ]

  // Verimlilik metrikleri
  const efficiencyMetrics = [
    { metric: language === 'tr' ? 'Enerji Yoğunluğu' : 'Energy Intensity', deger: '2.45 kWh/m²', hedef: '2.20 kWh/m²', durum: 'warning' },
    { metric: language === 'tr' ? 'Güç Faktörü' : 'Power Factor', deger: '0.94', hedef: '0.95', durum: 'good' },
    { metric: language === 'tr' ? 'Yük Faktörü' : 'Load Factor', deger: '0.68', hedef: '0.75', durum: 'warning' },
    { metric: language === 'tr' ? 'Operasyonel Verim' : 'Operational Efficiency', deger: '%87.2', hedef: '%90', durum: 'good' },
  ]

  return (
    <>
      <Header fixed>
        <div className="ml-auto flex items-center gap-2">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[140px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="24h">{t('last24Hours')}</SelectItem>
              <SelectItem value="7d">{t('last7Days')}</SelectItem>
              <SelectItem value="30d">{t('last30Days')}</SelectItem>
              <SelectItem value="90d">{language === 'tr' ? 'Son 3 Ay' : 'Last 3 Months'}</SelectItem>
            </SelectContent>
          </Select>
          <Button size="sm" className="gap-2">
            <Download className="h-4 w-4" />
            <span className="hidden sm:inline">{t('downloadReport')}</span>
          </Button>
        </div>
      </Header>

      <Main className="pt-0">
        <div className="space-y-6 pt-6">
          {/* Page Header */}
          <div className="flex items-center gap-4">
            <div className="flex items-center justify-center size-12 rounded-xl bg-muted/50 border border-border">
              <BarChart3 className="size-6 text-foreground" />
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight">{t('consumptionAnalysisTitle')}</h1>
              <p className="text-sm text-muted-foreground">{t('detailedConsumptionMetrics')}</p>
            </div>
          </div>
          {/* Overview Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="border shadow-sm bg-card hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">{t('totalConsumption')}</p>
                  <p className="text-3xl font-bold text-foreground mt-1">28,386</p>
                  <p className="text-xs text-muted-foreground mt-1">{language === 'tr' ? 'kWh eşdeğer' : 'kWh equivalent'}</p>
                </div>
                <div className="p-2 rounded-lg bg-muted/50">
                  <Activity className="h-5 w-5 text-muted-foreground" />
                </div>
              </div>
              <div className="flex items-center gap-1 mt-3">
                <ArrowDownRight className="h-3 w-3 text-green-600" />
                <span className="text-xs text-green-600 font-medium">-8.2%</span>
                <span className="text-xs text-muted-foreground">{t('vsLastWeek')}</span>
              </div>
            </CardContent>
          </Card>

          <Card className="border shadow-sm bg-card hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">{t('totalCost')}</p>
                  <p className="text-3xl font-bold text-foreground mt-1">₺7,875</p>
                  <p className="text-xs text-muted-foreground mt-1">{t('thisWeek')}</p>
                </div>
                <div className="p-2 rounded-lg bg-muted/50">
                  <Target className="h-5 w-5 text-muted-foreground" />
                </div>
              </div>
              <div className="flex items-center gap-1 mt-3">
                <ArrowDownRight className="h-3 w-3 text-green-600" />
                <span className="text-xs text-green-600 font-medium">-5.4%</span>
                <span className="text-xs text-muted-foreground">{t('savings')}</span>
              </div>
            </CardContent>
          </Card>

          <Card className="border shadow-sm bg-card hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">{t('peakConsumptionLabel')}</p>
                  <p className="text-3xl font-bold text-foreground mt-1">285</p>
                  <p className="text-xs text-muted-foreground mt-1">{language === 'tr' ? 'kW/saat' : 'kW/h'}</p>
                </div>
                <div className="p-2 rounded-lg bg-muted/50">
                  <TrendingUp className="h-5 w-5 text-muted-foreground" />
                </div>
              </div>
              <div className="flex items-center gap-1 mt-3">
                <Clock className="h-3 w-3 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">08:00-09:00</span>
              </div>
            </CardContent>
          </Card>

          <Card className="border shadow-sm bg-card hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">{t('efficiency')}</p>
                  <p className="text-3xl font-bold text-foreground mt-1">%87.2</p>
                  <p className="text-xs text-muted-foreground mt-1">{language === 'tr' ? 'Operasyonel' : 'Operational'}</p>
                </div>
                <div className="p-2 rounded-lg bg-muted/50">
                  <CheckCircle2 className="h-5 w-5 text-muted-foreground" />
                </div>
              </div>
              <div className="flex items-center gap-1 mt-3">
                <ArrowUpRight className="h-3 w-3 text-green-600" />
                <span className="text-xs text-green-600 font-medium">+2.1%</span>
                <span className="text-xs text-muted-foreground">{language === 'tr' ? 'iyileşme' : 'improvement'}</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="trends" className="space-y-4">
          <TabsList className="bg-muted/50">
            <TabsTrigger value="trends" className="gap-2">
              <TrendingUp className="h-4 w-4" />
              {language === 'tr' ? 'Trendler' : 'Trends'}
            </TabsTrigger>
            <TabsTrigger value="breakdown" className="gap-2">
              <PieChart className="h-4 w-4" />
              {t('distribution')}
            </TabsTrigger>
            <TabsTrigger value="efficiency" className="gap-2">
              <Target className="h-4 w-4" />
              {t('efficiency')}
            </TabsTrigger>
            <TabsTrigger value="peaks" className="gap-2">
              <Activity className="h-4 w-4" />
              {language === 'tr' ? 'Zirve Saatler' : 'Peak Hours'}
            </TabsTrigger>
          </TabsList>

          {/* Trends Tab */}
          <TabsContent value="trends" className="space-y-4">
            <div className="grid lg:grid-cols-2 gap-4">
              {/* Daily Consumption Trend */}
              <Card className="border shadow-sm lg:col-span-2">
                <CardHeader>
                  <CardTitle className="text-base flex items-center gap-2">
                    <BarChart3 className="h-4 w-4" />
                    {t('dailyTrendTitle')}
                  </CardTitle>
                  <CardDescription>{t('last7DaysComparison')}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ProfessionalAreaChart
                    data={dailyConsumption}
                    xAxisKey="date"
                    height={320}
                    areas={[
                      { dataKey: 'elektrik', name: t('electricityKwh'), color: '#3b82f6', gradientId: 'blueGradient' },
                      { dataKey: 'dogalgaz', name: t('naturalGasM3'), color: '#f97316', gradientId: 'orangeGradient' },
                      { dataKey: 'su', name: language === 'tr' ? 'Su (m³)' : 'Water (m³)', color: '#06b6d4', gradientId: 'cyanGradient' },
                    ]}
                  />
                </CardContent>
              </Card>

              {/* Hourly Pattern */}
              <Card className="border shadow-sm lg:col-span-2">
                <CardHeader>
                  <CardTitle className="text-base flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    {t('hourlyPattern')}
                  </CardTitle>
                  <CardDescription>{t('todayHourlyDistribution')}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ProfessionalLineChart
                    data={hourlyConsumption}
                    xAxisKey="saat"
                    height={280}
                    lines={[
                      { dataKey: 'elektrik', name: t('electricityKw'), color: '#3b82f6' },
                      { dataKey: 'dogalgaz', name: t('naturalGasM3h'), color: '#f97316' },
                    ]}
                    referenceLine={{ y: 200, label: t('average'), color: '#ef4444' }}
                  />
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Breakdown Tab */}
          <TabsContent value="breakdown" className="space-y-4">
            <div className="grid lg:grid-cols-2 gap-4">
              {/* By Area */}
              <Card className="border shadow-sm">
                <CardHeader>
                  <CardTitle className="text-base flex items-center gap-2">
                    <Building2 className="h-4 w-4" />
                    {t('areaDistribution')}
                  </CardTitle>
                  <CardDescription>{t('consumptionByAreaTitle')}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ProfessionalPieChart
                    data={consumptionByArea}
                    height={280}
                    innerRadius={55}
                    outerRadius={95}
                    centerContent={
                      <div className="text-center">
                        <p className="text-2xl font-bold">100%</p>
                        <p className="text-xs text-muted-foreground">{t('total')}</p>
                      </div>
                    }
                  />
                </CardContent>
              </Card>

              {/* By Source */}
              <Card className="border shadow-sm">
                <CardHeader>
                  <CardTitle className="text-base flex items-center gap-2">
                    <Factory className="h-4 w-4" />
                    {t('resourceConsumption')}
                  </CardTitle>
                  <CardDescription>{t('consumptionByResource')}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {consumptionBySource.map((item, i) => {
                      const Icon = item.kaynak === t('electricity') ? Zap : item.kaynak === t('naturalGas') ? Flame : Droplets
                      const color = item.kaynak === t('electricity') ? 'text-blue-500' : item.kaynak === t('naturalGas') ? 'text-orange-500' : 'text-cyan-500'
                      const bgColor = item.kaynak === t('electricity') ? 'bg-blue-50 dark:bg-blue-950/30' : item.kaynak === t('naturalGas') ? 'bg-orange-50 dark:bg-orange-950/30' : 'bg-cyan-50 dark:bg-cyan-950/30'
                      
                      return (
                        <div key={i} className={`p-4 rounded-lg ${bgColor} border border-${color.split('-')[1]}-200/50 dark:border-${color.split('-')[1]}-800/50`}>
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                              <Icon className={`h-5 w-5 ${color}`} />
                              <span className="font-medium">{item.kaynak}</span>
                            </div>
                            <Badge variant="secondary" className="text-xs">
                              ₺{item.maliyet.toLocaleString()}
                            </Badge>
                          </div>
                          <div className="flex items-baseline gap-2">
                            <span className={`text-2xl font-bold ${color}`}>
                              {item.tuketim.toLocaleString()}
                            </span>
                            <span className="text-xs text-muted-foreground">{item.birim}</span>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Efficiency Tab */}
          <TabsContent value="efficiency" className="space-y-4">
            <Card className="border shadow-sm">
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <Target className="h-4 w-4" />
                  {t('efficiencyMetrics')}
                </CardTitle>
                <CardDescription>{language === 'tr' ? 'Hedef değerlerle karşılaştırma' : 'Comparison with target values'}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {efficiencyMetrics.map((metric, i) => {
                    const isGood = metric.durum === 'good'
                    const Icon = isGood ? CheckCircle2 : AlertTriangle
                    const color = isGood ? 'text-green-600' : 'text-amber-600'
                    const bgColor = isGood ? 'bg-green-50 dark:bg-green-950/30' : 'bg-amber-50 dark:bg-amber-950/30'
                    
                    return (
                      <div key={i} className={`p-4 rounded-lg ${bgColor} border`}>
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <Icon className={`h-4 w-4 ${color}`} />
                              <span className="font-medium">{metric.metric}</span>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <p className="text-xs text-muted-foreground">{language === 'tr' ? 'Mevcut' : 'Current'}</p>
                                <p className="text-xl font-bold">{metric.deger}</p>
                              </div>
                              <div>
                                <p className="text-xs text-muted-foreground">{t('target')}</p>
                                <p className="text-xl font-bold text-muted-foreground">{metric.hedef}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Peak Hours Tab */}
          <TabsContent value="peaks" className="space-y-4">
            <Card className="border shadow-sm">
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <Activity className="h-4 w-4" />
                  {t('peakConsumptionHours')}
                </CardTitle>
                <CardDescription>{t('highestConsumptionHours')}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {peakHours.map((hour, i) => (
                    <div key={i} className="flex items-center gap-4 p-3 rounded-lg bg-muted/50">
                      <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary/10 text-primary font-bold text-sm">
                        {i + 1}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-medium">{hour.saat}</span>
                          <div className="flex items-center gap-2">
                            <span className="text-lg font-bold">{hour.tuketim} kW</span>
                            <Badge variant={i < 2 ? 'destructive' : 'secondary'} className="text-xs">
                              %{hour.oran}
                            </Badge>
                          </div>
                        </div>
                        <div className="h-2 bg-muted rounded-full overflow-hidden">
                          <div
                            className={`h-full ${i < 2 ? 'bg-red-500' : i < 4 ? 'bg-amber-500' : 'bg-green-500'}`}
                            style={{ width: `${hour.oran}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
        </div>
      </Main>
    </>
  )
}
