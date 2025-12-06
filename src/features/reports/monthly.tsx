import { useState } from 'react'
import {
  Download, TrendingUp,
  ArrowUpRight, ArrowDownRight, Target, BarChart3,
  CheckCircle2, RefreshCw, CalendarRange, PieChart
} from 'lucide-react'
import { useLanguage } from '@/lib/i18n'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue
} from '@/components/ui/select'
import {
  ProfessionalBarChart,
  ProfessionalLineChart,
  ProfessionalPieChart,
} from '@/components/ui/professional-charts'

// Aylık tüketim verisi
const monthlyData = [
  { hafta: 'Hafta 1', tuketim: 52000, uretim: 28500, maliyet: 14200 },
  { hafta: 'Hafta 2', tuketim: 54500, uretim: 29100, maliyet: 15300 },
  { hafta: 'Hafta 3', tuketim: 51200, uretim: 31200, maliyet: 12000 },
  { hafta: 'Hafta 4', tuketim: 53800, uretim: 30400, maliyet: 14100 },
]

// Aylık kategori dağılımı
const categoryDistribution = [
  { name: 'Üretim', value: 45, color: '#3b82f6' },
  { name: 'HVAC', value: 28, color: '#10b981' },
  { name: 'Aydınlatma', value: 15, color: '#f59e0b' },
  { name: 'Diğer', value: 12, color: '#8b5cf6' },
]

// Aylık karşılaştırma
const monthComparison = [
  { metrik: 'Toplam Tüketim', buAy: '211,500 kWh', gecenAy: '224,800 kWh', degisim: -5.9 },
  { metrik: 'Toplam Üretim', buAy: '119,200 kWh', gecenAy: '108,500 kWh', degisim: 9.9 },
  { metrik: 'Özüketim Oranı', buAy: '%56.4', gecenAy: '%48.3', degisim: 16.8 },
  { metrik: 'Toplam Maliyet', buAy: '₺55,600', gecenAy: '₺68,200', degisim: -18.5 },
  { metrik: 'Karbon Emisyonu', buAy: '89.2 ton', gecenAy: '102.4 ton', degisim: -12.9 },
]

// Günlük ortalamalar
const dailyAverages = [
  { gun: '1', ort: 7150 },
  { gun: '5', ort: 7280 },
  { gun: '10', ort: 6920 },
  { gun: '15', ort: 7450 },
  { gun: '20', ort: 6850 },
  { gun: '25', ort: 7120 },
  { gun: '30', ort: 7050 },
]

// Performans göstergeleri
const performanceKPIs = [
  { baslik: 'Enerji Verimliliği', deger: 87, hedef: 85, birim: '%' },
  { baslik: 'Yenilenebilir Oranı', deger: 56, hedef: 50, birim: '%' },
  { baslik: 'Pik Yönetimi', deger: 78, hedef: 80, birim: '%' },
  { baslik: 'Maliyet Optimizasyonu', deger: 92, hedef: 85, birim: '%' },
]

export function ReportsMonthly() {
  const { t, language } = useLanguage()
  const [selectedMonth, setSelectedMonth] = useState('current')
  const [activeTab, setActiveTab] = useState('overview')

  const getMonthName = () => {
    const now = new Date()
    return now.toLocaleDateString(language === 'tr' ? 'tr-TR' : 'en-US', { month: 'long', year: 'numeric' })
  }

  return (
    <>
      <Header fixed>
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center size-10 rounded-xl bg-muted/50 border border-border">
            <CalendarRange className="size-5 text-muted-foreground" />
          </div>
          <div>
            <h1 className="text-lg font-semibold tracking-tight">{t('monthlyReport')}</h1>
            <p className="text-xs text-muted-foreground">{getMonthName()}</p>
          </div>
        </div>
        <div className="ml-auto flex items-center gap-2">
          <Select value={selectedMonth} onValueChange={setSelectedMonth}>
            <SelectTrigger className="w-[160px] h-9">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="current">{t('thisMonth')}</SelectItem>
              <SelectItem value="last">{t('lastMonth')}</SelectItem>
              <SelectItem value="lastlast">{t('twoMonthsAgo')}</SelectItem>
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
          {/* Monthly Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
            <Card className="border bg-card hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="space-y-1">
                  <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">{t('consumption')}</p>
                  <p className="text-2xl font-bold text-foreground">211.5</p>
                  <p className="text-xs text-muted-foreground">MWh</p>
                </div>
                <div className="flex items-center gap-1 mt-2">
                  <ArrowDownRight className="size-3 text-green-600" />
                  <span className="text-xs text-green-600 font-medium">-5.9%</span>
                </div>
              </CardContent>
            </Card>

            <Card className="border bg-card hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="space-y-1">
                  <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">{t('production')}</p>
                  <p className="text-2xl font-bold text-foreground">119.2</p>
                  <p className="text-xs text-muted-foreground">MWh</p>
                </div>
                <div className="flex items-center gap-1 mt-2">
                  <ArrowUpRight className="size-3 text-green-600" />
                  <span className="text-xs text-green-600 font-medium">+9.9%</span>
                </div>
              </CardContent>
            </Card>

            <Card className="border bg-card hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="space-y-1">
                  <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">{t('cost')}</p>
                  <p className="text-2xl font-bold text-foreground">₺55.6K</p>
                  <p className="text-xs text-muted-foreground">{t('total')}</p>
                </div>
                <div className="flex items-center gap-1 mt-2">
                  <ArrowDownRight className="size-3 text-green-600" />
                  <span className="text-xs text-green-600 font-medium">-18.5%</span>
                </div>
              </CardContent>
            </Card>

            <Card className="border bg-card hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="space-y-1">
                  <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">{t('selfConsumption')}</p>
                  <p className="text-2xl font-bold text-foreground">56.4%</p>
                  <p className="text-xs text-muted-foreground">{t('rate')}</p>
                </div>
                <div className="flex items-center gap-1 mt-2">
                  <ArrowUpRight className="size-3 text-green-600" />
                  <span className="text-xs text-green-600 font-medium">+16.8%</span>
                </div>
              </CardContent>
            </Card>

            <Card className="border bg-card hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="space-y-1">
                  <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">{t('emission')}</p>
                  <p className="text-2xl font-bold text-foreground">89.2</p>
                  <p className="text-xs text-muted-foreground">ton CO₂</p>
                </div>
                <div className="flex items-center gap-1 mt-2">
                  <ArrowDownRight className="size-3 text-green-600" />
                  <span className="text-xs text-green-600 font-medium">-12.9%</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList>
              <TabsTrigger value="overview">{t('overview')}</TabsTrigger>
              <TabsTrigger value="comparison">{t('comparison')}</TabsTrigger>
              <TabsTrigger value="performance">{t('performance')}</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6 mt-4">
              {/* Weekly Chart */}
              <Card className="border shadow-sm">
                <CardHeader>
                  <CardTitle className="text-base flex items-center gap-2">
                    <BarChart3 className="size-4" />
                    {t('weeklyDistribution')}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ProfessionalBarChart
                    data={monthlyData}
                    xAxisKey="hafta"
                    height={300}
                    bars={[
                      { dataKey: 'tuketim', name: 'Tüketim (kWh)', color: '#3b82f6', radius: 6 },
                      { dataKey: 'uretim', name: 'Üretim (kWh)', color: '#10b981', radius: 6 },
                    ]}
                  />
                </CardContent>
              </Card>

              {/* Category Distribution */}
              <div className="grid lg:grid-cols-2 gap-6">
                <Card className="border shadow-sm">
                  <CardHeader>
                    <CardTitle className="text-base flex items-center gap-2">
                      <PieChart className="size-4" />
                      {t('consumptionDistribution')}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ProfessionalPieChart
                      data={categoryDistribution}
                      height={280}
                      innerRadius={55}
                      outerRadius={90}
                      centerContent={
                        <div className="text-center">
                          <p className="text-xl font-bold">100%</p>
                          <p className="text-xs text-muted-foreground">{t('distribution')}</p>
                        </div>
                      }
                    />
                  </CardContent>
                </Card>

                <Card className="border shadow-sm">
                  <CardHeader>
                    <CardTitle className="text-base flex items-center gap-2">
                      <TrendingUp className="size-4" />
                      {t('dailyAverageTrend')}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ProfessionalLineChart
                      data={dailyAverages}
                      xAxisKey="gun"
                      height={280}
                      showLegend={false}
                      lines={[
                        { dataKey: 'ort', name: 'Günlük Ortalama (kWh)', color: '#8b5cf6' },
                      ]}
                      showDots
                    />
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="comparison" className="mt-4">
              <Card className="border shadow-sm">
                <CardHeader>
                  <CardTitle className="text-base flex items-center gap-2">
                    <Target className="size-4" />
                    {t('comparisonWithLastMonth')}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {monthComparison.map((item, idx) => (
                    <div key={idx} className="p-4 rounded-lg border bg-muted/30">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium">{item.metrik}</span>
                        <Badge 
                          variant={item.degisim < 0 ? 'default' : item.degisim > 10 ? 'default' : 'secondary'} 
                          className={item.degisim < 0 ? 'bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300' : item.degisim > 10 ? 'bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300' : ''}
                        >
                          {item.degisim > 0 ? '+' : ''}{item.degisim}%
                        </Badge>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="p-2 rounded bg-background">
                          <p className="text-xs text-muted-foreground mb-1">{t('thisMonth')}</p>
                          <p className="text-lg font-bold">{item.buAy}</p>
                        </div>
                        <div className="p-2 rounded bg-background">
                          <p className="text-xs text-muted-foreground mb-1">{t('lastMonth')}</p>
                          <p className="text-lg font-medium text-muted-foreground">{item.gecenAy}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="performance" className="mt-4">
              <div className="grid sm:grid-cols-2 gap-6">
                {performanceKPIs.map((kpi, idx) => (
                  <Card key={idx} className="border shadow-sm">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="font-medium">{kpi.baslik}</h3>
                        {kpi.deger >= kpi.hedef ? (
                          <Badge className="bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300">
                            <CheckCircle2 className="size-3 mr-1" />
                            {t('targetExceeded')}
                          </Badge>
                        ) : (
                          <Badge variant="secondary">
                            {t('inProgress')}
                          </Badge>
                        )}
                      </div>
                      <div className="space-y-3">
                        <div className="flex items-baseline gap-2">
                          <span className="text-4xl font-bold">{kpi.deger}</span>
                          <span className="text-xl text-muted-foreground">{kpi.birim}</span>
                        </div>
                        <Progress value={(kpi.deger / 100) * 100} className="h-2" />
                        <p className="text-xs text-muted-foreground">
                          {t('target')}: {kpi.hedef}{kpi.birim}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </Main>
    </>
  )
}
