import { useState, useEffect } from "react"
import { useLanguage } from "@/lib/i18n"
import {
  Flame,
  TrendingDown,
  Calendar,
  Thermometer,
  Clock,
  CircleDollarSign,
  Activity,
  BarChart3,
  Gauge,
  Wind,
  Snowflake,
  CloudSun,
  Download,
} from "lucide-react"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Header } from "@/components/layout/header"
import { Main } from "@/components/layout/main"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  ProfessionalAreaChart,
  ProfessionalBarChart,
  ProfessionalPieChart,
} from "@/components/ui/professional-charts"

// Tuketim ve sicaklik korelasyonu
const consumptionTemperatureData = [
  { ay: "Oca", tuketim: 3200, oncekiYil: 3400 },
  { ay: "Şub", tuketim: 2900, oncekiYil: 3100 },
  { ay: "Mar", tuketim: 2400, oncekiYil: 2600 },
  { ay: "Nis", tuketim: 1800, oncekiYil: 2000 },
  { ay: "May", tuketim: 1200, oncekiYil: 1400 },
  { ay: "Haz", tuketim: 800, oncekiYil: 900 },
  { ay: "Tem", tuketim: 600, oncekiYil: 700 },
  { ay: "Ağu", tuketim: 650, oncekiYil: 750 },
  { ay: "Eyl", tuketim: 1100, oncekiYil: 1200 },
  { ay: "Eki", tuketim: 1800, oncekiYil: 1900 },
  { ay: "Kas", tuketim: 2600, oncekiYil: 2800 },
  { ay: "Ara", tuketim: 3400, oncekiYil: 3600 },
]

// Gunluk tuketim
const dailyConsumption = [
  { gun: "Pzt", sabah: 12, ogle: 8, aksam: 18, gece: 10 },
  { gun: "Sal", sabah: 14, ogle: 9, aksam: 20, gece: 11 },
  { gun: "Çar", sabah: 11, ogle: 7, aksam: 17, gece: 9 },
  { gun: "Per", sabah: 13, ogle: 8, aksam: 19, gece: 10 },
  { gun: "Cum", sabah: 15, ogle: 10, aksam: 22, gece: 12 },
  { gun: "Cmt", sabah: 18, ogle: 12, aksam: 25, gece: 14 },
  { gun: "Paz", sabah: 20, ogle: 14, aksam: 28, gece: 16 },
]

// Sezonluk analiz
const seasonalData = [
  { sezon: "Kış", tuketim: 9500, maliyet: 47500, tasarruf: 8, icon: Snowflake },
  { sezon: "İlkbahar", tuketim: 5400, maliyet: 27000, tasarruf: 12, icon: Wind },
  { sezon: "Yaz", tuketim: 2050, maliyet: 10250, tasarruf: 15, icon: CloudSun },
  { sezon: "Sonbahar", tuketim: 5500, maliyet: 27500, tasarruf: 10, icon: Wind },
]

// Cihaz verileri
const cihazlar = [
  { ad: "Ana Kazan", durum: "calisyor", sicaklik: 72, verimlilik: 94, yakitTuketimi: 4.2 },
  { ad: "Yedek Kazan", durum: "beklemede", sicaklik: 22, verimlilik: 0, yakitTuketimi: 0 },
  { ad: "Kombi 1", durum: "calisyor", sicaklik: 65, verimlilik: 91, yakitTuketimi: 1.8 },
  { ad: "Kombi 2", durum: "calisyor", sicaklik: 68, verimlilik: 89, yakitTuketimi: 2.1 },
]

// Kullanım alanları
const usageDistribution = [
  { name: "Isıtma", value: 65, color: "#f97316" },
  { name: "Sıcak Su", value: 20, color: "#3b82f6" },
  { name: "Üretim", value: 10, color: "#22c55e" },
  { name: "Diğer", value: 5, color: "#8b5cf6" },
]

export default function GasPage() {
  const { t, language } = useLanguage()
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  return (
    <>
      <Header>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Flame className="h-6 w-6 text-orange-500" />
            <h1 className="text-xl font-semibold">{t('gasTitle')}</h1>
          </div>
          <Badge variant="outline" className="gap-1 border-green-500 text-green-600">
            <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
            {t('live')}
          </Badge>
        </div>
        <div className="ml-auto flex items-center gap-4">
          <span className="text-sm text-muted-foreground">
            {currentTime.toLocaleTimeString(language === 'tr' ? "tr-TR" : "en-US")}
          </span>
          <Button variant="outline" size="sm" className="gap-2">
            <Download className="h-4 w-4" />
            {t('download')}
          </Button>
        </div>
      </Header>

      <Main>
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList>
            <TabsTrigger value="overview">{t('overview')}</TabsTrigger>
            <TabsTrigger value="consumption">{t('consumption')}</TabsTrigger>
            <TabsTrigger value="devices">{t('devices')}</TabsTrigger>
            <TabsTrigger value="seasonal">{t('seasonal')}</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Ana Metrikler */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">{t('instant')}</CardTitle>
                  <Activity className="h-4 w-4 text-orange-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">8.2 m³/sa</div>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <TrendingDown className="h-3 w-3 text-green-500" />
                    <span>-12% {t('average')}</span>
                  </div>
                  <Progress value={65} className="mt-2 h-1.5" />
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">{t('monthlyConsumption')}</CardTitle>
                  <BarChart3 className="h-4 w-4 text-amber-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">2,450 m³</div>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <TrendingDown className="h-3 w-3 text-green-500" />
                    <span>-8.3% {t('comparedToLastMonth')}</span>
                  </div>
                  <Progress value={72} className="mt-2 h-1.5" />
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">{t('monthlyCost')}</CardTitle>
                  <CircleDollarSign className="h-4 w-4 text-green-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">₺12,250</div>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <TrendingDown className="h-3 w-3 text-green-500" />
                    <span>{t('underBudget')}</span>
                  </div>
                  <Progress value={68} className="mt-2 h-1.5" />
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">{t('outdoorTemperature')}</CardTitle>
                  <Thermometer className="h-4 w-4 text-blue-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">12°C</div>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <span>{t('heatingModeActive')}</span>
                  </div>
                  <Progress value={45} className="mt-2 h-1.5" />
                </CardContent>
              </Card>
            </div>

            {/* Ana Grafik - Tuketim Karşılaştırması */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5 text-orange-500" />
                  {t('yearlyConsumptionComparison')}
                </CardTitle>
                <CardDescription>
                  {t('monthlyVsPreviousYear')}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ProfessionalAreaChart
                  data={consumptionTemperatureData}
                  xAxisKey="ay"
                  height={350}
                  areas={[
                    { dataKey: "tuketim", name: `${t('thisYear')} (m³)`, color: "#f97316", gradientId: "orangeGradient" },
                    { dataKey: "oncekiYil", name: `${t('previousYear')} (m³)`, color: "#94a3b8", gradientId: "blueGradient" },
                  ]}
                  tooltipType="energy"
                />
              </CardContent>
              <CardFooter className="flex-col items-start gap-2 text-sm">
                <div className="flex gap-2 font-medium leading-none">
                  <TrendingDown className="h-4 w-4 text-green-500" />
                  {t('lessConsumptionThanLastYear')}
                </div>
                <div className="text-muted-foreground">
                  {t('temperatureConsumptionRelation')}
                </div>
              </CardFooter>
            </Card>

            {/* Kullanım Dağılımı */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Flame className="h-5 w-5 text-orange-500" />
                  {t('gasUsageDistribution')}
                </CardTitle>
                <CardDescription>{t('monthlyUsagePercentage')}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6 lg:grid-cols-2">
                  <ProfessionalPieChart
                    data={usageDistribution}
                    height={300}
                    innerRadius={70}
                    outerRadius={110}
                    tooltipType="percentage"
                    centerContent={
                      <div className="text-center">
                        <div className="text-3xl font-bold">2,450</div>
                        <div className="text-sm text-muted-foreground">m³</div>
                      </div>
                    }
                  />
                  <div className="flex flex-col justify-center space-y-4">
                    {usageDistribution.map((item) => (
                      <div key={item.name} className="flex items-center justify-between p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors">
                        <div className="flex items-center gap-3">
                          <div className="h-4 w-4 rounded-full shadow-sm" style={{ backgroundColor: item.color }} />
                          <span className="font-medium">{item.name}</span>
                        </div>
                        <div className="text-right">
                          <span className="text-lg font-bold">{item.value}%</span>
                          <span className="text-sm text-muted-foreground ml-2">
                            ({Math.round(2450 * item.value / 100)} m³)
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="consumption" className="space-y-6">
            {/* Haftalık Tüketim Dağılımı */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-orange-500" />
                  {t('weeklyConsumptionDistribution')}
                </CardTitle>
                <CardDescription>
                  {t('dailyConsumptionZones')}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ProfessionalBarChart
                  data={dailyConsumption}
                  xAxisKey="gun"
                  height={350}
                  bars={[
                    { dataKey: "sabah", name: `${t('morning')} (06-12)`, color: "#f97316", radius: 4 },
                    { dataKey: "ogle", name: `${t('noon')} (12-17)`, color: "#fbbf24", radius: 4 },
                    { dataKey: "aksam", name: `${t('evening')} (17-22)`, color: "#ef4444", radius: 4 },
                    { dataKey: "gece", name: `${t('night')} (22-06)`, color: "#3b82f6", radius: 4 },
                  ]}
                  tooltipType="energy"
                />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="devices" className="space-y-6">
            {/* Cihaz Durumu */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Flame className="h-5 w-5 text-orange-500" />
                  {t('heatingSystemsStatus')}
                </CardTitle>
                <CardDescription>
                  {t('boilerAndCombiStatus')}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  {cihazlar.map((cihaz) => (
                    <div
                      key={cihaz.ad}
                      className={`rounded-xl border p-4 transition-all hover:shadow-lg hover:scale-105 ${
                        cihaz.durum === "calisyor"
                          ? "border-green-200 bg-gradient-to-br from-green-50 to-emerald-50 dark:border-green-800 dark:from-green-950/20 dark:to-emerald-950/20"
                          : "border-gray-200 bg-gradient-to-br from-gray-50 to-slate-50 dark:border-gray-800 dark:from-gray-950/20 dark:to-slate-950/20"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-3">
                        <span className="font-semibold">{cihaz.ad}</span>
                        <Badge variant={cihaz.durum === "calisyor" ? "default" : "secondary"}>
                          {cihaz.durum === "calisyor" ? t('running') : t('standbyMode')}
                        </Badge>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="flex items-center gap-1 text-muted-foreground">
                            <Thermometer className="h-3 w-3" /> {t('temperatureLabel')}
                          </span>
                          <span className="font-medium">{cihaz.sicaklik}°C</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="flex items-center gap-1 text-muted-foreground">
                            <Gauge className="h-3 w-3" /> {t('efficiency')}
                          </span>
                          <span className="font-medium">{cihaz.verimlilik}%</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="flex items-center gap-1 text-muted-foreground">
                            <Flame className="h-3 w-3" /> {t('consumptionLabel')}
                          </span>
                          <span className="font-medium">{cihaz.yakitTuketimi} m³/sa</span>
                        </div>
                      </div>
                      <Progress value={cihaz.verimlilik} className="mt-3 h-1.5" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="seasonal" className="space-y-6">
            {/* Sezonluk Analiz */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-orange-500" />
                  {t('seasonalAnalysis')}
                </CardTitle>
                <CardDescription>{t('seasonalConsumptionAnalysis')}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  {seasonalData.map((sezon) => {
                    const Icon = sezon.icon
                    return (
                      <div key={sezon.sezon} className="flex items-center gap-4 rounded-xl border p-4 transition-all hover:shadow-lg hover:scale-105">
                        <div className={`flex h-12 w-12 items-center justify-center rounded-lg ${
                          sezon.sezon === "Kış" ? "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400" :
                          sezon.sezon === "Yaz" ? "bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400" :
                          "bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400"
                        }`}>
                          <Icon className="h-6 w-6" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <span className="font-medium">{sezon.sezon}</span>
                            <Badge variant="outline" className="text-green-600">
                              -{sezon.tasarruf}%
                            </Badge>
                          </div>
                          <div className="flex items-center justify-between text-sm text-muted-foreground mt-1">
                            <span>{sezon.tuketim.toLocaleString()} m³</span>
                            <span>₺{sezon.maliyet.toLocaleString()}</span>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </Main>
    </>
  )
}
