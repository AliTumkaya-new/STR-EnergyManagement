import { useState, useMemo } from 'react'
import {
  Leaf, Factory, TreeDeciduous,
  ArrowDownRight, Target, TrendingDown, Download,
  CheckCircle2, Car, Building2, Zap, BarChart3
} from 'lucide-react'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { EnergyTooltip, PercentageTooltip } from '@/components/ui/chart-tooltip'
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue
} from '@/components/ui/select'
import {
  AreaChart, Area, BarChart, Bar,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  PieChart, Pie, Cell
} from 'recharts'
import { useLanguage } from '@/lib/i18n'

export function AnalyticsCarbonFootprint() {
  const { t, language } = useLanguage()
  const [timeRange, setTimeRange] = useState('year')

  // Aylık karbon emisyonu
  const monthlyEmissions = useMemo(() => [
    { ay: t('jan'), elektrik: 28.5, dogalgaz: 18.2, ulasim: 5.8, toplam: 52.5 },
    { ay: t('feb'), elektrik: 25.2, dogalgaz: 20.4, ulasim: 5.2, toplam: 50.8 },
    { ay: t('mar'), elektrik: 22.8, dogalgaz: 15.6, ulasim: 6.1, toplam: 44.5 },
    { ay: t('apr'), elektrik: 20.5, dogalgaz: 11.7, ulasim: 6.5, toplam: 38.7 },
    { ay: t('may'), elektrik: 21.8, dogalgaz: 7.8, ulasim: 7.0, toplam: 36.6 },
    { ay: t('jun'), elektrik: 24.2, dogalgaz: 5.2, ulasim: 7.2, toplam: 36.6 },
    { ay: t('jul'), elektrik: 28.8, dogalgaz: 3.9, ulasim: 6.8, toplam: 39.5 },
    { ay: t('aug'), elektrik: 30.7, dogalgaz: 3.6, ulasim: 5.5, toplam: 39.8 },
    { ay: t('sep'), elektrik: 26.9, dogalgaz: 5.2, ulasim: 6.2, toplam: 38.3 },
    { ay: t('oct'), elektrik: 24.3, dogalgaz: 9.8, ulasim: 6.0, toplam: 40.1 },
    { ay: t('nov'), elektrik: 25.6, dogalgaz: 14.3, ulasim: 5.5, toplam: 45.4 },
    { ay: t('dec'), elektrik: 26.9, dogalgaz: 18.2, ulasim: 5.2, toplam: 50.3 },
  ], [t])

  // Emisyon kaynakları
  const emissionSources = useMemo(() => [
    { name: t('electricity'), value: 55, color: '#3b82f6', icon: Zap },
    { name: t('naturalGas'), value: 32, color: '#f97316', icon: Factory },
    { name: t('transportation'), value: 13, color: '#8b5cf6', icon: Car },
  ], [t])

  // Karbon dengeleme
  const carbonOffsets = useMemo(() => [
    { kaynak: t('solarEnergy'), deger: -8.5, birim: 'ton CO₂' },
    { kaynak: t('windEnergy'), deger: -4.2, birim: 'ton CO₂' },
    { kaynak: t('treePlantingProject'), deger: -2.0, birim: 'ton CO₂' },
    { kaynak: t('carbonCredit'), deger: -3.5, birim: 'ton CO₂' },
  ], [t])

  // Sektör karşılaştırması
  const sectorComparison = useMemo(() => [
    { sektor: t('yourFacility'), emisyon: 45.4, ortalama: 62 },
    { sektor: t('sectorAverage'), emisyon: 62, ortalama: 62 },
    { sektor: t('bestPerformance'), emisyon: 38, ortalama: 62 },
  ], [t])

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
              <Leaf className="size-6 text-muted-foreground" />
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight">{t('carbonFootprint')}</h1>
              <p className="text-sm text-muted-foreground">{t('carbonFootprintDesc')}</p>
            </div>
          </div>
          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="bg-card hover:shadow-md transition-shadow border">
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">{t('totalEmission')}</p>
                    <p className="text-3xl font-bold text-foreground">45.4</p>
                    <p className="text-xs text-muted-foreground">{language === 'tr' ? 'ton CO₂ / ay' : 'ton CO₂ / mo'}</p>
                  </div>
                  <div className="size-10 rounded-xl bg-muted/50 flex items-center justify-center">
                    <Factory className="size-5 text-muted-foreground" />
                  </div>
                </div>
                <div className="flex items-center gap-1 mt-2">
                  <ArrowDownRight className="size-3 text-green-600" />
                  <span className="text-xs text-green-600 font-medium">-12.8%</span>
                  <span className="text-xs text-muted-foreground">{t('vsLastYear')}</span>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card hover:shadow-md transition-shadow border">
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">{t('carbonOffset')}</p>
                    <p className="text-3xl font-bold text-foreground">-18.2</p>
                    <p className="text-xs text-muted-foreground">ton CO₂</p>
                  </div>
                  <div className="size-10 rounded-xl bg-muted/50 flex items-center justify-center">
                    <TreeDeciduous className="size-5 text-muted-foreground" />
                  </div>
                </div>
                <div className="flex items-center gap-1 mt-2">
                  <CheckCircle2 className="size-3 text-green-600" />
                  <span className="text-xs text-green-600 font-medium">{t('renewableEnergy')}</span>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card hover:shadow-md transition-shadow border">
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">{t('netEmission')}</p>
                    <p className="text-3xl font-bold text-foreground">27.2</p>
                    <p className="text-xs text-muted-foreground">ton CO₂</p>
                  </div>
                  <div className="size-10 rounded-xl bg-muted/50 flex items-center justify-center">
                    <Leaf className="size-5 text-muted-foreground" />
                  </div>
                </div>
                <div className="flex items-center gap-1 mt-2">
                  <TrendingDown className="size-3 text-green-600" />
                  <span className="text-xs text-green-600 font-medium">{language === 'tr' ? '%40 dengelendi' : '40% offset'}</span>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card hover:shadow-md transition-shadow border">
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">{t('yearlyTarget')}</p>
                    <p className="text-3xl font-bold text-foreground">78%</p>
                    <p className="text-xs text-muted-foreground">{t('completed')}</p>
                  </div>
                  <div className="size-10 rounded-xl bg-muted/50 flex items-center justify-center">
                    <Target className="size-5 text-muted-foreground" />
                  </div>
                </div>
                <Progress value={78} className="h-1.5 mt-3" />
              </CardContent>
            </Card>
          </div>

          {/* Charts */}
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Emission Trend */}
            <Card className="lg:col-span-2 border shadow-sm">
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <BarChart3 className="size-4" />
                  {t('yearlyEmissionTrend')}
                </CardTitle>
                <CardDescription>{t('emissionBySource')}</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={monthlyEmissions}>
                    <defs>
                      <linearGradient id="elektrikEmis" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.4} />
                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                      </linearGradient>
                      <linearGradient id="gazEmis" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#f97316" stopOpacity={0.4} />
                        <stop offset="95%" stopColor="#f97316" stopOpacity={0} />
                      </linearGradient>
                      <linearGradient id="ulasimEmis" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.4} />
                        <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                    <XAxis dataKey="ay" className="text-xs" />
                    <YAxis className="text-xs" />
                    <Tooltip content={<EnergyTooltip unit="ton CO₂" />} />
                    <Legend />
                    <Area type="monotone" dataKey="elektrik" stackId="1" stroke="#3b82f6" fill="url(#elektrikEmis)" name={t('electricity')} />
                    <Area type="monotone" dataKey="dogalgaz" stackId="1" stroke="#f97316" fill="url(#gazEmis)" name={t('naturalGas')} />
                    <Area type="monotone" dataKey="ulasim" stackId="1" stroke="#8b5cf6" fill="url(#ulasimEmis)" name={t('transportation')} />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Source Distribution */}
            <Card className="border shadow-sm">
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <Factory className="size-4" />
                  {t('emissionSources')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={180}>
                  <PieChart>
                    <Pie
                      data={emissionSources}
                      cx="50%"
                      cy="50%"
                      innerRadius={45}
                      outerRadius={70}
                      dataKey="value"
                    >
                      {emissionSources.map((entry, index) => (
                        <Cell key={index} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip content={<PercentageTooltip />} />
                  </PieChart>
                </ResponsiveContainer>
                <div className="space-y-3 mt-4">
                  {emissionSources.map((source, idx) => (
                    <div key={idx} className="flex items-center gap-3 p-2 rounded-lg bg-muted/50">
                      <div className="p-1.5 rounded-md" style={{ backgroundColor: `${source.color}20` }}>
                        <source.icon className="size-4" style={{ color: source.color }} />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">{source.name}</p>
                      </div>
                      <span className="text-sm font-bold">%{source.value}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Offsets & Comparison */}
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Carbon Offsets */}
            <Card className="border shadow-sm">
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <TreeDeciduous className="size-4" />
                  {t('carbonOffsetSources')}
                </CardTitle>
                <CardDescription>{t('emissionReductionActivities')}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {carbonOffsets.map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 rounded-lg bg-muted/30 border">
                    <div className="flex items-center gap-3">
                      <div className="size-8 rounded-full bg-muted/50 flex items-center justify-center">
                        <CheckCircle2 className="size-4 text-muted-foreground" />
                      </div>
                      <span className="text-sm font-medium">{item.kaynak}</span>
                    </div>
                    <span className="text-sm font-bold text-green-600">{item.deger} {item.birim}</span>
                  </div>
                ))}
                <div className="flex items-center justify-between pt-3 mt-3 border-t">
                  <span className="text-sm font-medium">{t('totalOffset')}</span>
                  <span className="text-lg font-bold text-green-600">-18.2 ton CO₂</span>
                </div>
              </CardContent>
            </Card>

            {/* Sector Comparison */}
            <Card className="border shadow-sm">
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <Building2 className="size-4" />
                  {t('sectorComparison')}
                </CardTitle>
                <CardDescription>{t('monthlyEmissionTonCo2')}</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={200}>
                  <BarChart data={sectorComparison} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                    <XAxis type="number" className="text-xs" />
                    <YAxis type="category" dataKey="sektor" className="text-xs" width={120} />
                    <Tooltip content={<EnergyTooltip unit="ton CO₂" />} />
                    <Bar dataKey="emisyon" fill="#3b82f6" radius={[0, 4, 4, 0]} />
                  </BarChart>
                </ResponsiveContainer>
                <div className="mt-4 p-3 rounded-lg bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800">
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="size-4 text-green-600 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-green-800 dark:text-green-200">
                        {t('belowSectorAverage')}
                      </p>
                      <p className="text-xs text-green-600 mt-1">
                        {t('facilityTopRanking')}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </Main>
    </>
  )
}
