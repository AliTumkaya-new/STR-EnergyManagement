import { useState, useEffect } from "react"
import { useLanguage } from "@/lib/i18n"
import {
  Droplets,
  TrendingUp,
  TrendingDown,
  Clock,
  CircleDollarSign,
  Activity,
  AlertTriangle,
  ThermometerSun,
  Pipette,
  Download,
} from "lucide-react"
import {
  Card,
  CardContent,
  CardDescription,
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

// Aylık tüketim verileri - Endüstriyel fabrika
const getMonthlyWaterData = (t: any) => [
  { ay: t('january'), proses: 1850, sogutma: 2200, kazan: 420 },
  { ay: t('february'), proses: 1820, sogutma: 2100, kazan: 410 },
  { ay: t('march'), proses: 1880, sogutma: 2400, kazan: 380 },
  { ay: t('april'), proses: 1920, sogutma: 2800, kazan: 340 },
  { ay: t('may'), proses: 1980, sogutma: 3200, kazan: 280 },
  { ay: t('june'), proses: 2050, sogutma: 3800, kazan: 220 },
  { ay: t('july'), proses: 2100, sogutma: 4200, kazan: 180 },
  { ay: t('august'), proses: 2080, sogutma: 4100, kazan: 190 },
  { ay: t('september'), proses: 1950, sogutma: 3400, kazan: 260 },
  { ay: t('october'), proses: 1890, sogutma: 2600, kazan: 350 },
  { ay: t('november'), proses: 1860, sogutma: 2200, kazan: 400 },
  { ay: t('december'), proses: 1840, sogutma: 2100, kazan: 430 },
]

// Saatlik tüketim
const hourlyData = [
  { saat: "00:00", tuketim: 12 },
  { saat: "02:00", tuketim: 10 },
  { saat: "04:00", tuketim: 8 },
  { saat: "06:00", tuketim: 15 },
  { saat: "08:00", tuketim: 42 },
  { saat: "10:00", tuketim: 58 },
  { saat: "12:00", tuketim: 52 },
  { saat: "14:00", tuketim: 55 },
  { saat: "16:00", tuketim: 48 },
  { saat: "18:00", tuketim: 35 },
  { saat: "20:00", tuketim: 22 },
  { saat: "22:00", tuketim: 15 },
]

// Tank seviyeleri - Endüstriyel
const getTanklar = (t: any) => [
  { id: "TANK-01", ad: t('mainProcessTank'), kapasite: 100000, doluluk: 78, sicaklik: 18 },
  { id: "TANK-02", ad: t('coolingWaterTank'), kapasite: 50000, doluluk: 92, sicaklik: 22 },
  { id: "TANK-03", ad: t('fireExtinguishing'), kapasite: 80000, doluluk: 100, sicaklik: 16 },
  { id: "TANK-04", ad: t('treatedWaterTank'), kapasite: 30000, doluluk: 65, sicaklik: 20 },
]

// Su kalitesi metrikleri
const getSuKalitesi = (t: any) => [
  { metrik: t('phLevel'), deger: 7.2, birim: "", min: 6.5, max: 8.5, durum: t('good') },
  { metrik: t('conductivity'), deger: 450, birim: "µS/cm", min: 0, max: 1000, durum: t('good') },
  { metrik: t('turbidity'), deger: 0.8, birim: "NTU", min: 0, max: 4, durum: t('good') },
  { metrik: t('hardness'), deger: 180, birim: "mg/L", min: 0, max: 300, durum: t('good') },
]

// Kullanım alanlarına göre dağılım
const getWaterDistribution = (t: any) => [
  { name: t('process'), value: 45, color: "#06b6d4" },
  { name: t('cooling'), value: 35, color: "#3b82f6" },
  { name: t('boiler'), value: 12, color: "#8b5cf6" },
  { name: t('other'), value: 8, color: "#22c55e" },
]

// Sızıntı algılama - Endüstriyel hatlar
const getSizintiAlanlari = (t: any) => [
  { alan: t('mainSupplyLine'), durum: "normal", sonKontrol: t('minutesAgo').replace('{minutes}', '2') },
  { alan: t('productionBlockA'), durum: "normal", sonKontrol: t('minutesAgo').replace('{minutes}', '5') },
  { alan: t('coolingSystem'), durum: "uyari", sonKontrol: t('minutesAgo').replace('{minutes}', '1') },
  { alan: t('boilerRoom'), durum: "normal", sonKontrol: t('minutesAgo').replace('{minutes}', '3') },
]

export default function WaterPage() {
  const { t, language } = useLanguage()
  const [currentTime, setCurrentTime] = useState(new Date())
  
  const monthlyWaterData = getMonthlyWaterData(t)
  const tanklar = getTanklar(t)
  const suKalitesi = getSuKalitesi(t)
  const waterDistribution = getWaterDistribution(t)
  const sizintiAlanlari = getSizintiAlanlari(t)

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  return (
    <>
      <Header>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Droplets className="h-6 w-6 text-cyan-500" />
            <h1 className="text-xl font-semibold">{t('waterTitle')}</h1>
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
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">{t('overview')}</TabsTrigger>
            <TabsTrigger value="tanks">{t('tankStatus')}</TabsTrigger>
            <TabsTrigger value="quality">{t('waterQuality')}</TabsTrigger>
            <TabsTrigger value="alerts">{t('alerts')}</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            {/* Ana Metrikler */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">{t('instantConsumption')}</CardTitle>
                  <Activity className="h-4 w-4 text-cyan-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">48 m³/sa</div>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <TrendingDown className="h-3 w-3 text-green-500" />
                    <span>-5% {t('comparedToAverage')}</span>
                  </div>
                  <Progress value={65} className="mt-2 h-1.5" />
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">{t('dailyConsumption')}</CardTitle>
                  <Clock className="h-4 w-4 text-blue-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">1,245 m³</div>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <TrendingUp className="h-3 w-3 text-amber-500" />
                    <span>+2.3% {t('comparedToYesterday')}</span>
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
                  <div className="text-3xl font-bold">₺28,450</div>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <TrendingDown className="h-3 w-3 text-green-500" />
                    <span>{t('underBudget')}</span>
                  </div>
                  <Progress value={68} className="mt-2 h-1.5" />
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">{t('waterRecovery')}</CardTitle>
                  <Droplets className="h-4 w-4 text-emerald-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">%32</div>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <TrendingUp className="h-3 w-3 text-green-500" />
                    <span>+5% {t('comparedToLastMonth')}</span>
                  </div>
                  <Progress value={32} className="mt-2 h-1.5" />
                </CardContent>
              </Card>
            </div>

            {/* Grafikler */}
            <div className="grid gap-4 lg:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="h-5 w-5 text-cyan-500" />
                    {t('hourlyConsumption')}
                  </CardTitle>
                  <CardDescription>{t('todayWaterHourlyDistribution')}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ProfessionalAreaChart
                    data={hourlyData}
                    xAxisKey="saat"
                    height={280}
                    areas={[
                      { dataKey: "tuketim", name: `${t('consumption')} (m³)`, color: "#06b6d4", gradientId: "cyanGradient" },
                    ]}
                    tooltipType="energy"
                  />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Droplets className="h-5 w-5 text-cyan-500" />
                    {t('monthlyConsumptionDistribution')}
                  </CardTitle>
                  <CardDescription>{t('waterUsageByArea')}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ProfessionalBarChart
                    data={monthlyWaterData}
                    xAxisKey="ay"
                    height={280}
                    bars={[
                      { dataKey: "proses", name: `${t('processWater')} (m³)`, color: "#06b6d4", radius: 4 },
                      { dataKey: "sogutma", name: `${t('coolingWater')} (m³)`, color: "#3b82f6", radius: 4 },
                      { dataKey: "kazan", name: `${t('boilerWater')} (m³)`, color: "#8b5cf6", radius: 4 },
                    ]}
                    tooltipType="energy"
                  />
                </CardContent>
              </Card>
            </div>

            {/* Su Kullanım Dağılımı */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Droplets className="h-5 w-5 text-cyan-500" />
                  {t('waterUsageDistribution')}
                </CardTitle>
                <CardDescription>{t('dailyUsagePercentageByArea')}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6 lg:grid-cols-2">
                  <ProfessionalPieChart
                    data={waterDistribution}
                    height={300}
                    innerRadius={70}
                    outerRadius={110}
                    tooltipType="percentage"
                    centerContent={
                      <div className="text-center">
                        <div className="text-3xl font-bold">1,245</div>
                        <div className="text-sm text-muted-foreground">m³</div>
                      </div>
                    }
                  />
                  <div className="flex flex-col justify-center space-y-4">
                    {waterDistribution.map((item) => (
                      <div key={item.name} className="flex items-center justify-between p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors">
                        <div className="flex items-center gap-3">
                          <div className="h-4 w-4 rounded-full shadow-sm" style={{ backgroundColor: item.color }} />
                          <span className="font-medium">{item.name}</span>
                        </div>
                        <div className="text-right">
                          <span className="text-lg font-bold">{item.value}%</span>
                          <span className="text-sm text-muted-foreground ml-2">
                            ({Math.round(1245 * item.value / 100)} m³)
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="tanks" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              {tanklar.map((tank) => (
                <Card key={tank.id}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-base">{tank.ad}</CardTitle>
                      <Badge variant="outline">{tank.id}</Badge>
                    </div>
                    <CardDescription>Kapasite: {tank.kapasite.toLocaleString()} L</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <div className="flex items-center justify-between text-sm mb-2">
                        <span>{t('fillRate')}</span>
                        <span className="font-bold">{tank.doluluk}%</span>
                      </div>
                      <Progress value={tank.doluluk} className="h-3" />
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="flex items-center gap-1 text-muted-foreground">
                        <ThermometerSun className="h-4 w-4" /> {t('temperatureLabel')}
                      </span>
                      <span className="font-medium">{tank.sicaklik}°C</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="quality" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Pipette className="h-5 w-5 text-cyan-500" />
                  {t('waterQualityParameters')}
                </CardTitle>
                <CardDescription>{t('instantWaterQualityMeasurements')}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2">
                  {suKalitesi.map((item) => (
                    <div key={item.metrik} className="flex items-center justify-between rounded-lg border p-4">
                      <div>
                        <span className="font-medium">{item.metrik}</span>
                        <p className="text-xs text-muted-foreground">
                          {t('range')}: {item.min} - {item.max} {item.birim}
                        </p>
                      </div>
                      <div className="text-right">
                        <span className="text-2xl font-bold">{item.deger}</span>
                        <span className="text-sm text-muted-foreground ml-1">{item.birim}</span>
                        <Badge variant="default" className="ml-2 bg-green-500">
                          {item.durum}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="alerts" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-amber-500" />
                  {t('leakDetectionSystem')}
                </CardTitle>
                <CardDescription>{t('lineBasedLeakMonitoring')}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {sizintiAlanlari.map((alan) => (
                    <div
                      key={alan.alan}
                      className={`flex items-center justify-between rounded-lg border p-4 ${
                        alan.durum === "normal"
                          ? "border-green-200 bg-green-50/50 dark:border-green-800 dark:bg-green-950/20"
                          : "border-amber-200 bg-amber-50/50 dark:border-amber-800 dark:bg-amber-950/20"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`h-3 w-3 rounded-full ${alan.durum === "normal" ? "bg-green-500" : "bg-amber-500 animate-pulse"}`} />
                        <div>
                          <span className="font-medium">{alan.alan}</span>
                          <p className="text-xs text-muted-foreground">{t('lastCheck')}: {alan.sonKontrol}</p>
                        </div>
                      </div>
                      <Badge variant={alan.durum === "normal" ? "default" : "secondary"}>
                        {alan.durum === "normal" ? t('normal') : t('attention')}
                      </Badge>
                    </div>
                  ))}
                </div>

                {sizintiAlanlari.some(a => a.durum === "uyari") && (
                  <div className="mt-4 rounded-lg bg-amber-50 dark:bg-amber-950/20 p-3 border border-amber-200 dark:border-amber-800">
                    <div className="flex items-start gap-2">
                      <AlertTriangle className="h-4 w-4 text-amber-600 mt-0.5" />
                      <div className="text-sm">
                        <span className="font-medium text-amber-800 dark:text-amber-200">
                          {t('pressureDropDetected')}
                        </span>
                        <p className="text-amber-700 dark:text-amber-300 text-xs mt-1">
                          {t('maintenanceNotificationSent')}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </Main>
    </>
  )
}
