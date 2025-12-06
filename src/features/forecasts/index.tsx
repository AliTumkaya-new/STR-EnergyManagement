import { useState } from 'react'
import {
  TrendingUp, Brain, Download, RefreshCcw, Play,
  Cpu, Clock, ArrowUpRight, ArrowDownRight, Calendar,
  Target, Activity, BarChart3, Settings2, ChevronRight
} from 'lucide-react'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Progress } from '@/components/ui/progress'
import { Slider } from '@/components/ui/slider'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue
} from '@/components/ui/select'
import {
  ComposedChart, Bar, Line, Area, AreaChart, BarChart,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts'
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow
} from '@/components/ui/table'
import { EnergyTooltip } from '@/components/ui/chart-tooltip'
import { useLanguage } from '@/lib/i18n'

// =====================================================
// MOCK DATA - Gerçek API entegrasyonu için değiştirilecek
// =====================================================

// Enerji tüketim tahminleri (7 günlük)
const energyForecast = [
  { gun: 'Bugün', gercek: 3650, tahmin: 3680, alt: 3520, ust: 3840 },
  { gun: 'Yarın', gercek: null, tahmin: 3720, alt: 3550, ust: 3890 },
  { gun: 'Çar', gercek: null, tahmin: 3580, alt: 3400, ust: 3760 },
  { gun: 'Per', gercek: null, tahmin: 3850, alt: 3680, ust: 4020 },
  { gun: 'Cum', gercek: null, tahmin: 3690, alt: 3520, ust: 3860 },
  { gun: 'Cmt', gercek: null, tahmin: 2450, alt: 2280, ust: 2620 },
  { gun: 'Paz', gercek: null, tahmin: 2280, alt: 2110, ust: 2450 },
]

// Saatlik tahmin verisi (bugün için)
const hourlyForecast = Array.from({ length: 24 }, (_, i) => {
  const baseConsumption = i >= 8 && i <= 18 ? 180 + Math.sin((i - 8) * 0.5) * 80 : 80 + Math.random() * 40
  return {
    saat: `${i.toString().padStart(2, '0')}:00`,
    tahmin: Math.round(baseConsumption + Math.random() * 20),
    gercek: i <= new Date().getHours() ? Math.round(baseConsumption + Math.random() * 30 - 15) : null,
    alt: Math.round(baseConsumption * 0.9),
    ust: Math.round(baseConsumption * 1.1),
  }
})

// Aylık tahminler
const monthlyForecast = [
  { ay: 'Ara', tuketim: 98500, uretim: 12500, maliyet: 125000 },
  { ay: 'Oca', tuketim: 105000, uretim: 8500, maliyet: 138000 },
  { ay: 'Şub', tuketim: 95000, uretim: 14000, maliyet: 118000 },
  { ay: 'Mar', tuketim: 88000, uretim: 22000, maliyet: 98000 },
  { ay: 'Nis', tuketim: 78000, uretim: 32000, maliyet: 72000 },
  { ay: 'May', tuketim: 72000, uretim: 38000, maliyet: 58000 },
]

// Model performans metrikleri
const modelMetrics = {
  xgboost: { accuracy: 94.2, mae: 125, rmse: 168, r2: 0.92, lastTrained: '2 saat önce' },
  randomForest: { accuracy: 92.8, mae: 142, rmse: 185, r2: 0.89, lastTrained: '2 saat önce' },
  lstm: { accuracy: 91.5, mae: 158, rmse: 198, r2: 0.87, lastTrained: '4 saat önce' },
  ensemble: { accuracy: 95.8, mae: 112, rmse: 145, r2: 0.94, lastTrained: '2 saat önce' },
}

// Tahmin doğruluk geçmişi
const accuracyHistory = [
  { tarih: '25 Kas', dogruluk: 94.2, sapma: 145 },
  { tarih: '26 Kas', dogruluk: 95.1, sapma: 128 },
  { tarih: '27 Kas', dogruluk: 93.8, sapma: 162 },
  { tarih: '28 Kas', dogruluk: 96.2, sapma: 98 },
  { tarih: '29 Kas', dogruluk: 95.5, sapma: 118 },
  { tarih: '30 Kas', dogruluk: 94.8, sapma: 135 },
  { tarih: '1 Ara', dogruluk: 95.8, sapma: 112 },
]

export function Forecasts() {
  const { t, language } = useLanguage()
  const [selectedModel, setSelectedModel] = useState('ensemble')
  const [forecastPeriod, setForecastPeriod] = useState('7d')
  const [isTraining, setIsTraining] = useState(false)
  const [confidenceLevel, setConfidenceLevel] = useState([95])

  const startTraining = () => {
    setIsTraining(true)
    setTimeout(() => setIsTraining(false), 3000)
  }

  const currentModel = modelMetrics[selectedModel as keyof typeof modelMetrics]

  // Localized model metrics
  const getLocalizedLastTrained = (lastTrained: string) => {
    if (language === 'en') {
      return lastTrained.replace('saat önce', 'hours ago')
    }
    return lastTrained
  }

  return (
    <>
      <Header fixed>
        <div className="ml-auto flex items-center gap-2">
          <Select value={forecastPeriod} onValueChange={setForecastPeriod}>
            <SelectTrigger className="w-[140px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="24h">{t('hours24')}</SelectItem>
              <SelectItem value="7d">{t('days7')}</SelectItem>
              <SelectItem value="30d">{t('days30')}</SelectItem>
              <SelectItem value="90d">{t('months3')}</SelectItem>
            </SelectContent>
          </Select>
          <Button size="sm" variant="outline" className="gap-2">
            <Download className="h-4 w-4" />
            <span className="hidden sm:inline">{t('exportData')}</span>
          </Button>
        </div>
      </Header>

      <Main className="pt-0">
        <div className="space-y-6 pt-6">
          {/* Page Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center justify-center size-12 rounded-xl bg-muted/50 border border-border">
                <Brain className="size-6 text-foreground" />
              </div>
              <div>
                <h1 className="text-2xl font-bold tracking-tight">{t('forecastsSubtitle')}</h1>
                <p className="text-sm text-muted-foreground">{t('forecastsDescription')}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="gap-1.5">
                <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                {t('modelActive')}
              </Badge>
              <Badge variant="secondary">{currentModel.accuracy}% {t('accuracy')}</Badge>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="border shadow-sm bg-card hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">{t('tomorrowForecast')}</p>
                    <p className="text-3xl font-bold text-foreground mt-1">3,720</p>
                    <p className="text-xs text-muted-foreground mt-1">{t('kwhConsumption')}</p>
                  </div>
                  <div className="p-2 rounded-lg bg-muted/50">
                    <TrendingUp className="h-5 w-5 text-muted-foreground" />
                  </div>
                </div>
                <div className="flex items-center gap-1 mt-3">
                  <ArrowUpRight className="h-3 w-3 text-amber-600" />
                  <span className="text-xs text-amber-600 font-medium">+1.9%</span>
                  <span className="text-xs text-muted-foreground">{t('comparedToToday')}</span>
                </div>
              </CardContent>
            </Card>

            <Card className="border shadow-sm bg-card hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">{t('weeklyAverage')}</p>
                    <p className="text-3xl font-bold text-foreground mt-1">3,284</p>
                    <p className="text-xs text-muted-foreground mt-1">kWh{t('perDay')}</p>
                  </div>
                  <div className="p-2 rounded-lg bg-muted/50">
                    <BarChart3 className="h-5 w-5 text-muted-foreground" />
                  </div>
                </div>
                <div className="flex items-center gap-1 mt-3">
                  <ArrowDownRight className="h-3 w-3 text-green-600" />
                  <span className="text-xs text-green-600 font-medium">-5.2%</span>
                  <span className="text-xs text-muted-foreground">{t('comparedToLastWeek')}</span>
                </div>
              </CardContent>
            </Card>

            <Card className="border shadow-sm bg-card hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">{t('estimatedCost')}</p>
                    <p className="text-3xl font-bold text-foreground mt-1">₺125K</p>
                    <p className="text-xs text-muted-foreground mt-1">{t('thisMonth')}</p>
                  </div>
                  <div className="p-2 rounded-lg bg-muted/50">
                    <Target className="h-5 w-5 text-muted-foreground" />
                  </div>
                </div>
                <div className="flex items-center gap-1 mt-3">
                  <Activity className="h-3 w-3 text-muted-foreground" />
                  <span className="text-xs text-muted-foreground">{t('withinBudget')}</span>
                </div>
              </CardContent>
            </Card>

            <Card className="border shadow-sm bg-card hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">{t('modelAccuracy')}</p>
                    <p className="text-3xl font-bold text-foreground mt-1">{currentModel.accuracy}%</p>
                    <p className="text-xs text-muted-foreground mt-1">{selectedModel === 'ensemble' ? 'Ensemble' : selectedModel.toUpperCase()}</p>
                  </div>
                  <div className="p-2 rounded-lg bg-muted/50">
                    <Cpu className="h-5 w-5 text-muted-foreground" />
                  </div>
                </div>
                <div className="flex items-center gap-1 mt-3">
                  <Clock className="h-3 w-3 text-muted-foreground" />
                  <span className="text-xs text-muted-foreground">{t('lastUpdate')}: {getLocalizedLastTrained(currentModel.lastTrained)}</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Tabs */}
          <Tabs defaultValue="forecast" className="space-y-4">
            <TabsList className="bg-muted/50">
              <TabsTrigger value="forecast" className="gap-2">
                <TrendingUp className="h-4 w-4" />
                {t('forecasts')}
              </TabsTrigger>
              <TabsTrigger value="models" className="gap-2">
                <Cpu className="h-4 w-4" />
                {t('models')}
              </TabsTrigger>
              <TabsTrigger value="accuracy" className="gap-2">
                <Target className="h-4 w-4" />
                {t('performance')}
              </TabsTrigger>
            </TabsList>

            {/* TAB 1: Tahminler */}
            <TabsContent value="forecast" className="space-y-4">
              <div className="grid lg:grid-cols-3 gap-4">
                {/* Ana tahmin grafiği */}
                <Card className="lg:col-span-2 border">
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-lg">{t('dayConsumptionForecast')}</CardTitle>
                        <CardDescription>{t('realVsForecast')}</CardDescription>
                      </div>
                      <Select value={selectedModel} onValueChange={setSelectedModel}>
                        <SelectTrigger className="w-[140px]">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="ensemble">Ensemble</SelectItem>
                          <SelectItem value="xgboost">XGBoost</SelectItem>
                          <SelectItem value="randomForest">Random Forest</SelectItem>
                          <SelectItem value="lstm">LSTM</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <ComposedChart data={energyForecast}>
                        <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                        <XAxis dataKey="gun" className="text-xs" tick={{ fill: 'hsl(var(--muted-foreground))' }} />
                        <YAxis className="text-xs" tick={{ fill: 'hsl(var(--muted-foreground))' }} />
                        <Tooltip content={<EnergyTooltip />} />
                        <Legend />
                        <Area
                          type="monotone"
                          dataKey="ust"
                          stackId="1"
                          stroke="none"
                          fill="hsl(var(--muted))"
                          fillOpacity={0.4}
                          name="Üst Sınır"
                        />
                        <Area
                          type="monotone"
                          dataKey="alt"
                          stackId="2"
                          stroke="none"
                          fill="hsl(var(--background))"
                          name="Alt Sınır"
                        />
                        <Bar dataKey="gercek" fill="hsl(var(--primary))" name="Gerçek" radius={[4, 4, 0, 0]} />
                        <Line
                          type="monotone"
                          dataKey="tahmin"
                          stroke="hsl(var(--muted-foreground))"
                          strokeWidth={2}
                          strokeDasharray="5 5"
                          name="Tahmin"
                          dot={{ fill: 'hsl(var(--muted-foreground))', strokeWidth: 2 }}
                        />
                      </ComposedChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                {/* Saatlik tahmin */}
                <Card className="border">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">{t('todayHourlyForecast')}</CardTitle>
                    <CardDescription>{t('liveUpdate')}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <AreaChart data={hourlyForecast}>
                        <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                        <XAxis dataKey="saat" tick={{ fontSize: 10, fill: 'hsl(var(--muted-foreground))' }} interval={3} />
                        <YAxis tick={{ fontSize: 10, fill: 'hsl(var(--muted-foreground))' }} />
                        <Tooltip content={<EnergyTooltip />} />
                        <Area
                          type="monotone"
                          dataKey="ust"
                          stackId="1"
                          stroke="none"
                          fill="hsl(var(--muted))"
                          fillOpacity={0.3}
                        />
                        <Area
                          type="monotone"
                          dataKey="alt"
                          stackId="2"
                          stroke="none"
                          fill="hsl(var(--background))"
                        />
                        <Line
                          type="monotone"
                          dataKey="tahmin"
                          stroke="hsl(var(--muted-foreground))"
                          strokeWidth={2}
                          dot={false}
                          name="Tahmin"
                        />
                        <Line
                          type="monotone"
                          dataKey="gercek"
                          stroke="hsl(var(--primary))"
                          strokeWidth={2}
                          dot={false}
                          name="Gerçek"
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </div>

              {/* Aylık tahminler */}
              <Card className="border">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-lg">{t('monthlyProjection')}</CardTitle>
                      <CardDescription>{t('consumptionProductionCostForecast')}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={280}>
                    <ComposedChart data={monthlyForecast}>
                      <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                      <XAxis dataKey="ay" tick={{ fill: 'hsl(var(--muted-foreground))' }} />
                      <YAxis yAxisId="left" tick={{ fill: 'hsl(var(--muted-foreground))' }} />
                      <YAxis yAxisId="right" orientation="right" tick={{ fill: 'hsl(var(--muted-foreground))' }} />
                      <Tooltip content={<EnergyTooltip />} />
                      <Legend />
                      <Bar yAxisId="left" dataKey="tuketim" fill="hsl(var(--primary))" name="Tüketim (kWh)" radius={[4, 4, 0, 0]} />
                      <Bar yAxisId="left" dataKey="uretim" fill="hsl(var(--muted-foreground))" name="Üretim (kWh)" radius={[4, 4, 0, 0]} fillOpacity={0.5} />
                      <Line yAxisId="right" type="monotone" dataKey="maliyet" stroke="hsl(var(--foreground))" strokeWidth={2} name="Maliyet (₺)" />
                    </ComposedChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Tahmin detay tablosu */}
              <Card className="border">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-lg">{t('weeklyForecastDetails')}</CardTitle>
                      <CardDescription>{t('dailyForecastsWithConfidence')}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>{t('day')}</TableHead>
                        <TableHead className="text-right">{t('forecastKwh')}</TableHead>
                        <TableHead className="text-right">{t('lowerLimit')}</TableHead>
                        <TableHead className="text-right">{t('upperLimit')}</TableHead>
                        <TableHead className="text-right">{t('actual')}</TableHead>
                        <TableHead className="text-right">{t('difference')}</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {energyForecast.map((row) => (
                        <TableRow key={row.gun}>
                          <TableCell className="font-medium">{row.gun}</TableCell>
                          <TableCell className="text-right">{row.tahmin.toLocaleString()}</TableCell>
                          <TableCell className="text-right text-muted-foreground">{row.alt.toLocaleString()}</TableCell>
                          <TableCell className="text-right text-muted-foreground">{row.ust.toLocaleString()}</TableCell>
                          <TableCell className="text-right">
                            {row.gercek ? row.gercek.toLocaleString() : '-'}
                          </TableCell>
                          <TableCell className="text-right">
                            {row.gercek ? (
                              <span className={row.gercek > row.tahmin ? 'text-amber-600' : 'text-green-600'}>
                                {row.gercek > row.tahmin ? '+' : ''}{(row.gercek - row.tahmin).toLocaleString()}
                              </span>
                            ) : '-'}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            {/* TAB 2: Modeller */}
            <TabsContent value="models" className="space-y-4">
              <div className="grid lg:grid-cols-2 gap-4">
                {/* Model seçimi ve performans */}
                <Card className="border">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">{t('predictionModels')}</CardTitle>
                    <CardDescription>{t('activeModelComparison')}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {Object.entries(modelMetrics).map(([key, value]) => (
                      <div
                        key={key}
                        className={`p-4 rounded-lg border cursor-pointer transition-all ${
                          selectedModel === key ? 'border-primary bg-muted/30' : 'hover:bg-muted/20'
                        }`}
                        onClick={() => setSelectedModel(key)}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <Cpu className={`h-4 w-4 ${selectedModel === key ? 'text-primary' : 'text-muted-foreground'}`} />
                            <span className="font-medium">{key === 'randomForest' ? 'Random Forest' : key === 'ensemble' ? 'Ensemble' : key.toUpperCase()}</span>
                          </div>
                          <Badge variant={value.accuracy >= 95 ? 'default' : 'secondary'}>
                            {value.accuracy}%
                          </Badge>
                        </div>
                        <div className="grid grid-cols-3 gap-2 text-xs">
                          <div>
                            <span className="text-muted-foreground">MAE</span>
                            <p className="font-medium">{value.mae} kWh</p>
                          </div>
                          <div>
                            <span className="text-muted-foreground">RMSE</span>
                            <p className="font-medium">{value.rmse}</p>
                          </div>
                          <div>
                            <span className="text-muted-foreground">R²</span>
                            <p className="font-medium">{value.r2}</p>
                          </div>
                        </div>
                        <p className="text-xs text-muted-foreground mt-2">{t('lastTraining')}: {getLocalizedLastTrained(value.lastTrained)}</p>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                {/* Model ayarları */}
                <Card className="border">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">{t('modelSettings')}</CardTitle>
                    <CardDescription>{t('customizePredictionParams')}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-3">
                      <Label>{t('confidenceInterval')}: {confidenceLevel}%</Label>
                      <Slider
                        value={confidenceLevel}
                        onValueChange={setConfidenceLevel}
                        max={99}
                        min={80}
                        step={1}
                      />
                      <p className="text-xs text-muted-foreground">{t('higherConfidenceWiderRange')}</p>
                    </div>

                    <div className="space-y-3">
                      <Label>{t('autoTraining')}</Label>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">{t('updateModelOnNewData')}</span>
                        <Switch defaultChecked />
                      </div>
                    </div>

                    <div className="space-y-3">
                      <Label>{t('weatherIntegration')}</Label>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">{t('useWeatherInForecasts')}</span>
                        <Switch defaultChecked />
                      </div>
                    </div>

                    <div className="space-y-3">
                      <Label>{t('holidaySettings')}</Label>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">{t('considerHolidays')}</span>
                        <Switch defaultChecked />
                      </div>
                    </div>

                    <div className="pt-4 space-y-2">
                      <Button className="w-full gap-2" onClick={startTraining} disabled={isTraining}>
                        {isTraining ? (
                          <>
                            <RefreshCcw className="h-4 w-4 animate-spin" />
                            {t('trainingModel')}
                          </>
                        ) : (
                          <>
                            <Play className="h-4 w-4" />
                            {t('trainModelNow')}
                          </>
                        )}
                      </Button>
                      <p className="text-xs text-center text-muted-foreground">
                        {t('trainingDataInfo')}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Model özellikleri */}
              <Card className="border">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">{t('modelInputFeatures')}</CardTitle>
                  <CardDescription>{t('dataSourcesForPredictions')}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-4 gap-4">
                    <div className="p-4 rounded-lg bg-muted/30 border">
                      <div className="flex items-center gap-2 mb-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span className="font-medium text-sm">{t('timeSeries')}</span>
                      </div>
                      <p className="text-xs text-muted-foreground">{t('historicalConsumption')}</p>
                    </div>
                    <div className="p-4 rounded-lg bg-muted/30 border">
                      <div className="flex items-center gap-2 mb-2">
                        <Activity className="h-4 w-4 text-muted-foreground" />
                        <span className="font-medium text-sm">{t('productionPlan')}</span>
                      </div>
                      <p className="text-xs text-muted-foreground">{t('shiftPlansCapacity')}</p>
                    </div>
                    <div className="p-4 rounded-lg bg-muted/30 border">
                      <div className="flex items-center gap-2 mb-2">
                        <Target className="h-4 w-4 text-muted-foreground" />
                        <span className="font-medium text-sm">{t('weatherData')}</span>
                      </div>
                      <p className="text-xs text-muted-foreground">{t('temperatureHumiditySun')}</p>
                    </div>
                    <div className="p-4 rounded-lg bg-muted/30 border">
                      <div className="flex items-center gap-2 mb-2">
                        <Settings2 className="h-4 w-4 text-muted-foreground" />
                        <span className="font-medium text-sm">{t('equipmentStatus')}</span>
                      </div>
                      <p className="text-xs text-muted-foreground">{t('maintenancePlansEfficiency')}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* TAB 3: Performans */}
            <TabsContent value="accuracy" className="space-y-4">
              <div className="grid lg:grid-cols-2 gap-4">
                {/* Doğruluk grafiği */}
                <Card className="border">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">{t('accuracyTrend')}</CardTitle>
                    <CardDescription>{t('last7DaysPerformance')}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={280}>
                      <AreaChart data={accuracyHistory}>
                        <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                        <XAxis dataKey="tarih" tick={{ fill: 'hsl(var(--muted-foreground))' }} />
                        <YAxis domain={[90, 100]} tick={{ fill: 'hsl(var(--muted-foreground))' }} />
                        <Tooltip content={<EnergyTooltip />} />
                        <Area
                          type="monotone"
                          dataKey="dogruluk"
                          stroke="hsl(var(--primary))"
                          fill="hsl(var(--primary))"
                          fillOpacity={0.2}
                          name={`${t('accuracy')} (%)`}
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                {/* Sapma grafiği */}
                <Card className="border">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">{t('predictionDeviation')}</CardTitle>
                    <CardDescription>{t('averageAbsoluteError')}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={280}>
                      <BarChart data={accuracyHistory}>
                        <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                        <XAxis dataKey="tarih" tick={{ fill: 'hsl(var(--muted-foreground))' }} />
                        <YAxis tick={{ fill: 'hsl(var(--muted-foreground))' }} />
                        <Tooltip content={<EnergyTooltip />} />
                        <Bar dataKey="sapma" fill="hsl(var(--muted-foreground))" name={t('deviationKwh')} radius={[4, 4, 0, 0]} fillOpacity={0.7} />
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </div>

              {/* Performans metrikleri */}
              <Card className="border">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">{t('detailedPerformanceMetrics')}</CardTitle>
                  <CardDescription>{t('modelComparison')}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>{t('model')}</TableHead>
                        <TableHead className="text-right">{t('accuracy')}</TableHead>
                        <TableHead className="text-right">MAE (kWh)</TableHead>
                        <TableHead className="text-right">RMSE</TableHead>
                        <TableHead className="text-right">R²</TableHead>
                        <TableHead className="text-right">{t('lastTraining')}</TableHead>
                        <TableHead></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {Object.entries(modelMetrics).map(([key, value]) => (
                        <TableRow key={key} className={selectedModel === key ? 'bg-muted/30' : ''}>
                          <TableCell className="font-medium">
                            {key === 'randomForest' ? 'Random Forest' : key === 'ensemble' ? 'Ensemble' : key.toUpperCase()}
                          </TableCell>
                          <TableCell className="text-right">
                            <Badge variant={value.accuracy >= 95 ? 'default' : 'secondary'}>
                              {value.accuracy}%
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right">{value.mae}</TableCell>
                          <TableCell className="text-right">{value.rmse}</TableCell>
                          <TableCell className="text-right">{value.r2}</TableCell>
                          <TableCell className="text-right text-muted-foreground">{getLocalizedLastTrained(value.lastTrained)}</TableCell>
                          <TableCell>
                            <Button variant="ghost" size="sm" onClick={() => setSelectedModel(key)}>
                              <ChevronRight className="h-4 w-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>

              {/* Performans özeti */}
              <div className="grid md:grid-cols-3 gap-4">
                <Card className="border">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">{t('dayAverage7')}</span>
                      <span className="text-2xl font-bold">95.1%</span>
                    </div>
                    <Progress value={95.1} className="h-2" />
                    <p className="text-xs text-muted-foreground mt-2">{t('target')}: %95</p>
                  </CardContent>
                </Card>

                <Card className="border">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">{t('dayAverage30')}</span>
                      <span className="text-2xl font-bold">94.3%</span>
                    </div>
                    <Progress value={94.3} className="h-2" />
                    <p className="text-xs text-muted-foreground mt-2">{t('target')}: %94</p>
                  </CardContent>
                </Card>

                <Card className="border">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">{t('avgPredictionError')}</span>
                      <span className="text-2xl font-bold">128 kWh</span>
                    </div>
                    <Progress value={85} className="h-2" />
                    <p className="text-xs text-muted-foreground mt-2">{t('target')}: &lt;150 kWh</p>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </Main>
    </>
  )
}
