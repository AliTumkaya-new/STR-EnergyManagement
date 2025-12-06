import { useState, useMemo } from 'react'
import {
  TrendingDown, Download, DollarSign,
  ArrowUpRight, ArrowDownRight, Target, PieChart, BarChart3,
  Zap, Flame, Clock, CheckCircle2
} from 'lucide-react'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { CurrencyTooltip, PercentageTooltip } from '@/components/ui/chart-tooltip'
import { Progress } from '@/components/ui/progress'
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue
} from '@/components/ui/select'
import {
  AreaChart, Area, Line,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  PieChart as RePieChart, Pie, Cell
} from 'recharts'
import { useLanguage } from '@/lib/i18n'

export function AnalyticsCost() {
  const { t, language } = useLanguage()
  const [timeRange, setTimeRange] = useState('year')

  // Aylık maliyet trendi
  const monthlyCosts = useMemo(() => [
    { ay: t('jan'), elektrik: 42500, dogalgaz: 28000, su: 4500, toplam: 75000 },
    { ay: t('feb'), elektrik: 38000, dogalgaz: 32000, su: 4200, toplam: 74200 },
    { ay: t('mar'), elektrik: 35000, dogalgaz: 24000, su: 4800, toplam: 63800 },
    { ay: t('apr'), elektrik: 32000, dogalgaz: 18000, su: 5200, toplam: 55200 },
    { ay: t('may'), elektrik: 34000, dogalgaz: 12000, su: 5800, toplam: 51800 },
    { ay: t('jun'), elektrik: 38000, dogalgaz: 8000, su: 6200, toplam: 52200 },
    { ay: t('jul'), elektrik: 45000, dogalgaz: 6000, su: 7000, toplam: 58000 },
    { ay: t('aug'), elektrik: 48000, dogalgaz: 5500, su: 7200, toplam: 60700 },
    { ay: t('sep'), elektrik: 42000, dogalgaz: 8000, su: 6000, toplam: 56000 },
    { ay: t('oct'), elektrik: 38000, dogalgaz: 15000, su: 5200, toplam: 58200 },
    { ay: t('nov'), elektrik: 40000, dogalgaz: 22000, su: 4800, toplam: 66800 },
    { ay: t('dec'), elektrik: 42000, dogalgaz: 28000, su: 4500, toplam: 74500 },
  ], [t])

  // Maliyet dağılımı
  const costDistribution = useMemo(() => [
    { name: t('electricity'), value: 55, color: '#3b82f6' },
    { name: t('naturalGas'), value: 35, color: '#f97316' },
    { name: t('water'), value: 10, color: '#06b6d4' },
  ], [t])

  // Tarife analizi
  const tarifAnalysis = useMemo(() => [
    { tarife: t('dayTariff') + ' (06-17)', oran: 45, birimFiyat: '₺2.85', tuketim: '1,680 kWh', maliyet: '₺4,788' },
    { tarife: t('peakTariff') + ' (17-22)', oran: 35, birimFiyat: '₺4.25', tuketim: '1,310 kWh', maliyet: '₺5,567' },
    { tarife: t('nightTariff') + ' (22-06)', oran: 20, birimFiyat: '₺1.45', tuketim: '748 kWh', maliyet: '₺1,085' },
  ], [t])

  // Tasarruf fırsatları
  const savingsOpportunities = useMemo(() => [
    { baslik: t('peakLoadShifting'), potansiyel: language === 'tr' ? '₺1,250/ay' : '₺1,250/mo', zorluk: t('easy'), oncelik: t('high') },
    { baslik: t('solarCapacityIncrease'), potansiyel: language === 'tr' ? '₺2,800/ay' : '₺2,800/mo', zorluk: t('medium'), oncelik: t('high') },
    { baslik: t('hvacOptimization'), potansiyel: language === 'tr' ? '₺850/ay' : '₺850/mo', zorluk: t('easy'), oncelik: t('medium') },
    { baslik: t('lightingSensors'), potansiyel: language === 'tr' ? '₺420/ay' : '₺420/mo', zorluk: t('easy'), oncelik: t('low') },
  ], [t, language])

  return (
    <>
      <Header fixed>
        <div className="ml-auto flex items-center gap-2">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[140px] h-9">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="month">{t('thisMonth')}</SelectItem>
              <SelectItem value="quarter">{t('thisQuarter')}</SelectItem>
              <SelectItem value="year">{t('thisYear')}</SelectItem>
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
              <DollarSign className="size-6 text-muted-foreground" />
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight">{t('costAnalysis')}</h1>
              <p className="text-sm text-muted-foreground">{t('costAnalysisDesc')}</p>
            </div>
          </div>
          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="border bg-card hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">{t('totalCost')}</p>
                    <p className="text-3xl font-bold text-foreground">₺66,800</p>
                    <p className="text-xs text-muted-foreground">{t('thisMonth')}</p>
                  </div>
                  <div className="size-10 rounded-xl bg-muted/50 flex items-center justify-center">
                    <DollarSign className="size-5 text-muted-foreground" />
                  </div>
                </div>
                <div className="flex items-center gap-1 mt-2">
                  <ArrowDownRight className="size-3 text-green-600" />
                  <span className="text-xs text-green-600 font-medium">-8.5%</span>
                  <span className="text-xs text-muted-foreground">{t('vsLastMonth')}</span>
                </div>
              </CardContent>
            </Card>

            <Card className="border bg-card hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">{t('electricity')}</p>
                    <p className="text-3xl font-bold text-foreground">₺40,000</p>
                    <p className="text-xs text-muted-foreground">{language === 'tr' ? '%60 pay' : '60% share'}</p>
                  </div>
                  <div className="size-10 rounded-xl bg-muted/50 flex items-center justify-center">
                    <Zap className="size-5 text-muted-foreground" />
                  </div>
                </div>
                <div className="flex items-center gap-1 mt-2">
                  <ArrowDownRight className="size-3 text-green-600" />
                  <span className="text-xs text-green-600 font-medium">-5.2%</span>
                </div>
              </CardContent>
            </Card>

            <Card className="border bg-card hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">{t('naturalGas')}</p>
                    <p className="text-3xl font-bold text-foreground">₺22,000</p>
                    <p className="text-xs text-muted-foreground">{language === 'tr' ? '%33 pay' : '33% share'}</p>
                  </div>
                  <div className="size-10 rounded-xl bg-muted/50 flex items-center justify-center">
                    <Flame className="size-5 text-muted-foreground" />
                  </div>
                </div>
                <div className="flex items-center gap-1 mt-2">
                  <ArrowUpRight className="size-3 text-red-600" />
                  <span className="text-xs text-red-600 font-medium">+12.8%</span>
                </div>
              </CardContent>
            </Card>

            <Card className="border bg-card hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">{t('savings')}</p>
                    <p className="text-3xl font-bold text-foreground">₺5,320</p>
                    <p className="text-xs text-muted-foreground">{t('thisMonth')}</p>
                  </div>
                  <div className="size-10 rounded-xl bg-muted/50 flex items-center justify-center">
                    <TrendingDown className="size-5 text-muted-foreground" />
                  </div>
                </div>
                <div className="flex items-center gap-1 mt-2">
                  <CheckCircle2 className="size-3 text-green-600" />
                  <span className="text-xs text-green-600 font-medium">{t('targetExceeded')}</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Charts */}
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Cost Trend */}
            <Card className="lg:col-span-2 border shadow-sm">
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <BarChart3 className="size-4" />
                  {t('yearlyCostTrend')}
                </CardTitle>
                <CardDescription>{t('monthlyCostDistribution')}</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={monthlyCosts}>
                    <defs>
                      <linearGradient id="elektrikGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                      </linearGradient>
                      <linearGradient id="gazGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#f97316" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#f97316" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                    <XAxis dataKey="ay" className="text-xs" />
                    <YAxis className="text-xs" tickFormatter={(v) => `₺${v/1000}K`} />
                    <Tooltip content={<CurrencyTooltip />} />
                    <Legend />
                    <Area type="monotone" dataKey="elektrik" stroke="#3b82f6" fill="url(#elektrikGrad)" name={t('electricity')} />
                    <Area type="monotone" dataKey="dogalgaz" stroke="#f97316" fill="url(#gazGrad)" name={t('naturalGas')} />
                    <Line type="monotone" dataKey="toplam" stroke="#10b981" strokeWidth={2} dot={false} name={t('total')} />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Distribution Pie */}
            <Card className="border shadow-sm">
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <PieChart className="size-4" />
                  {t('costDistribution')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={200}>
                  <RePieChart>
                    <Pie
                      data={costDistribution}
                      cx="50%"
                      cy="50%"
                      innerRadius={50}
                      outerRadius={80}
                      dataKey="value"
                      label={({ name, value }) => `${name} %${value}`}
                    >
                      {costDistribution.map((entry, index) => (
                        <Cell key={index} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip content={<PercentageTooltip />} />
                  </RePieChart>
                </ResponsiveContainer>
                <div className="space-y-2 mt-4">
                  {costDistribution.map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2">
                        <div className="size-3 rounded-full" style={{ backgroundColor: item.color }} />
                        <span>{item.name}</span>
                      </div>
                      <span className="font-medium">%{item.value}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Tariff & Savings */}
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Tariff Analysis */}
            <Card className="border shadow-sm">
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <Clock className="size-4" />
                  {t('tariffAnalysis')}
                </CardTitle>
                <CardDescription>{t('tariffAnalysisDesc')}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {tarifAnalysis.map((tarife, idx) => (
                  <div key={idx} className="p-3 rounded-lg bg-muted/50 border">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">{tarife.tarife}</span>
                      <Badge variant="outline">{tarife.birimFiyat}/kWh</Badge>
                    </div>
                    <Progress value={tarife.oran} className="h-2 mb-2" />
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>{tarife.tuketim}</span>
                      <span className="font-medium text-foreground">{tarife.maliyet}</span>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Savings Opportunities */}
            <Card className="border shadow-sm">
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <Target className="size-4" />
                  {t('savingsOpportunities')}
                </CardTitle>
                <CardDescription>{t('savingsOpportunitiesDesc')}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {savingsOpportunities.map((item, idx) => (
                  <div key={idx} className="p-3 rounded-lg border hover:border-primary/50 transition-colors cursor-pointer">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-sm font-medium">{item.baslik}</p>
                        <p className="text-xs text-muted-foreground mt-0.5">{t('difficulty')}: {item.zorluk}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-bold text-green-600">{item.potansiyel}</p>
                        <Badge 
                          variant={item.oncelik === t('high') ? 'destructive' : item.oncelik === t('medium') ? 'default' : 'secondary'}
                          className="text-[10px] mt-1"
                        >
                          {item.oncelik}
                        </Badge>
                      </div>
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
