import { useState, useEffect, useMemo } from "react"
import { useLanguage } from "@/lib/i18n"
import {
  Sun,
  Zap,
  TrendingUp,
  TrendingDown,
  Gauge,
  CloudSun,
  Battery,
  Activity,
  BarChart3,
  PanelTop,
  Download,
  Settings,
  Compass,
  DollarSign,
  Leaf,
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
import { Switch } from "@/components/ui/switch"
import { Header } from "@/components/layout/header"
import { Main } from "@/components/layout/main"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  ProfessionalAreaChart, 
  ProfessionalBarChart, 
  ProfessionalPieChart 
} from "@/components/ui/professional-charts"

const hourlyProductionData = [
  { hour: "06:00", uretim: 2, tahmin: 3 },
  { hour: "07:00", uretim: 8, tahmin: 10 },
  { hour: "08:00", uretim: 18, tahmin: 20 },
  { hour: "09:00", uretim: 28, tahmin: 30 },
  { hour: "10:00", uretim: 38, tahmin: 38 },
  { hour: "11:00", uretim: 45, tahmin: 44 },
  { hour: "12:00", uretim: 48, tahmin: 46 },
  { hour: "13:00", uretim: 46, tahmin: 45 },
  { hour: "14:00", uretim: 42, tahmin: 42 },
  { hour: "15:00", uretim: 35, tahmin: 36 },
  { hour: "16:00", uretim: 25, tahmin: 28 },
  { hour: "17:00", uretim: 15, tahmin: 18 },
  { hour: "18:00", uretim: 5, tahmin: 8 },
  { hour: "19:00", uretim: 0, tahmin: 2 },
]

const weeklyData = [
  { day: "Pzt", uretim: 320, tuketim: 280 },
  { day: "Sal", uretim: 285, tuketim: 310 },
  { day: "�ar", uretim: 340, tuketim: 295 },
  { day: "Per", uretim: 310, tuketim: 320 },
  { day: "Cum", uretim: 295, tuketim: 340 },
  { day: "Cmt", uretim: 265, tuketim: 180 },
  { day: "Paz", uretim: 245, tuketim: 150 },
]

const panelData = [
  { id: "A1", verimlilik: 94, sicaklik: 42, durum: "optimal" },
  { id: "A2", verimlilik: 92, sicaklik: 44, durum: "optimal" },
  { id: "A3", verimlilik: 88, sicaklik: 48, durum: "uyari" },
  { id: "A4", verimlilik: 95, sicaklik: 41, durum: "optimal" },
  { id: "B1", verimlilik: 91, sicaklik: 45, durum: "optimal" },
  { id: "B2", verimlilik: 78, sicaklik: 52, durum: "kritik" },
  { id: "B3", verimlilik: 93, sicaklik: 43, durum: "optimal" },
  { id: "B4", verimlilik: 90, sicaklik: 46, durum: "optimal" },
]

// Finansal ve Karbon Tasarruf (OpenRemote optimization)
const savingsData = {
  financialSaving: 1248.50, // TL
  carbonSaving: 142.5, // kg CO2
  gridExportRevenue: 856.20, // TL
  selfConsumptionRate: 72, // %
}

// OpenRemote EMS - Sistem Konfigürasyonu
const systemConfig = {
  panelAzimuth: 180, // Güney yönü = 180°
  panelPitch: 35, // Panel eğimi
  panelOrientation: "SOUTH", // SOUTH veya EAST_WEST
  powerExportMax: 50, // kW peak kapasite
  location: { lat: 41.0082, lng: 28.9784 }, // İstanbul
}

export default function SolarPage() {
  const { t, language } = useLanguage()
  const [currentTime, setCurrentTime] = useState(new Date())
  const [forecastEnabled, setForecastEnabled] = useState(true)

  // Dinamik çeviri gerektiren veriler
  const energyDistribution = useMemo(() => [
    { name: t("consumptionValue"), value: 65, color: "#3b82f6" },
    { name: t("toBattery"), value: 20, color: "#22c55e" },
    { name: t("toGrid"), value: 15, color: "#f59e0b" },
  ], [t])

  const forecastAccuracy = useMemo(() => [
    { period: t("today"), tahmin: 285, gercek: 278, sapma: 2.5 },
    { period: t("yesterday"), tahmin: 254, gercek: 268, sapma: -5.5 },
    { period: t("twoDaysAgo"), tahmin: 312, gercek: 305, sapma: 2.3 },
    { period: t("threeDaysAgo"), tahmin: 298, gercek: 292, sapma: 2.0 },
  ], [t])

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  return (
    <>
      <Header>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Sun className="h-6 w-6 text-amber-500" />
            <h1 className="text-xl font-semibold">{t('solarTitle')}</h1>
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
            <TabsTrigger value="production">{t('production')}</TabsTrigger>
            <TabsTrigger value="panels">{t('panels')}</TabsTrigger>
            <TabsTrigger value="forecast">{t('forecast')}</TabsTrigger>
            <TabsTrigger value="settings">{t('settings')}</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">{t('currentProduction')}</CardTitle>
                  <Zap className="h-4 w-4 text-amber-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">42.5 kW</div>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <TrendingUp className="h-3 w-3 text-green-500" />
                    <span>{t('optimalLevel')}</span>
                  </div>
                  <Progress value={85} className="mt-2 h-1.5" />
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">{t('dailyProduction')}</CardTitle>
                  <Sun className="h-4 w-4 text-amber-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">285 kWh</div>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <TrendingUp className="h-3 w-3 text-green-500" />
                    <span>+12% {t('comparedToYesterday')}</span>
                  </div>
                  <Progress value={72} className="mt-2 h-1.5" />
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">{t('systemEfficiency')}</CardTitle>
                  <Gauge className="h-4 w-4 text-green-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">87%</div>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <span>{t('target')}: 85%</span>
                  </div>
                  <Progress value={87} className="mt-2 h-1.5" />
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">{t('weather')}</CardTitle>
                  <CloudSun className="h-4 w-4 text-blue-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">28�C</div>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <span>{t('partlyCloudy')}</span>
                  </div>
                  <Progress value={75} className="mt-2 h-1.5" />
                </CardContent>
              </Card>
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="h-5 w-5 text-amber-500" />
                    {t('hourlyProductionTitle')}
                  </CardTitle>
                  <CardDescription>{t('todayProductionForecast')}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ProfessionalAreaChart
                    data={hourlyProductionData}
                    xAxisKey="hour"
                    height={280}
                    areas={[
                      { dataKey: "uretim", name: t('productionKw'), color: "#f59e0b", gradientId: "yellowGradient" },
                      { dataKey: "tahmin", name: t('forecastKw'), color: "#94a3b8", gradientId: "blueGradient" },
                    ]}
                    tooltipType="energy"
                  />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5 text-amber-500" />
                    {t('weeklyProductionConsumption')}
                  </CardTitle>
                  <CardDescription>{t('last7DaysComparison')}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ProfessionalBarChart
                    data={weeklyData}
                    xAxisKey="day"
                    height={280}
                    bars={[
                      { dataKey: "uretim", name: t('productionKwh'), color: "#f59e0b", radius: 6 },
                      { dataKey: "tuketim", name: t('consumptionKwh'), color: "#3b82f6", radius: 6 },
                    ]}
                    tooltipType="energy"
                  />
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="production" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Battery className="h-5 w-5 text-green-500" />
                  {t('energyDistributionTitle')}
                </CardTitle>
                <CardDescription>{t('producedEnergyUsage')}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6 lg:grid-cols-2">
                  <ProfessionalPieChart
                    data={energyDistribution}
                    height={300}
                    innerRadius={70}
                    outerRadius={110}
                    tooltipType="percentage"
                    centerContent={
                      <div className="text-center">
                        <div className="text-3xl font-bold">285</div>
                        <div className="text-sm text-muted-foreground">kWh</div>
                      </div>
                    }
                  />
                  <div className="flex flex-col justify-center space-y-4">
                    {energyDistribution.map((item) => (
                      <div key={item.name} className="flex items-center justify-between p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors">
                        <div className="flex items-center gap-3">
                          <div className="h-4 w-4 rounded-full shadow-sm" style={{ backgroundColor: item.color }} />
                          <span className="font-medium">{item.name}</span>
                        </div>
                        <div className="text-right">
                          <span className="text-lg font-bold">{item.value}%</span>
                          <span className="text-sm text-muted-foreground ml-2">
                            ({Math.round(285 * item.value / 100)} kWh)
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="panels" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <PanelTop className="h-5 w-5 text-amber-500" />
                  Panel Durumu
                </CardTitle>
                <CardDescription>T�m panellerin anl�k durum ve performans�</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-8">
                  {panelData.map((panel) => (
                    <div
                      key={panel.id}
                      className={`relative rounded-xl border p-3 transition-all hover:shadow-lg hover:scale-105 cursor-pointer ${
                        panel.durum === "optimal"
                          ? "border-green-200 bg-gradient-to-br from-green-50 to-emerald-50 dark:border-green-800 dark:from-green-950/20 dark:to-emerald-950/20"
                          : panel.durum === "uyari"
                          ? "border-amber-200 bg-gradient-to-br from-amber-50 to-yellow-50 dark:border-amber-800 dark:from-amber-950/20 dark:to-yellow-950/20"
                          : "border-red-200 bg-gradient-to-br from-red-50 to-rose-50 dark:border-red-800 dark:from-red-950/20 dark:to-rose-950/20"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-sm">{panel.id}</span>
                        <Badge
                          variant={panel.durum === "optimal" ? "default" : panel.durum === "uyari" ? "secondary" : "destructive"}
                          className="h-5 text-xs"
                        >
                          {panel.durum === "optimal" ? "OK" : panel.durum === "uyari" ? "!" : "X"}
                        </Badge>
                      </div>
                      <div className="mt-2 space-y-1">
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-muted-foreground">Verim:</span>
                          <span className="font-medium">{panel.verimlilik}%</span>
                        </div>
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-muted-foreground">S�cakl�k:</span>
                          <span className="font-medium">{panel.sicaklik}�C</span>
                        </div>
                      </div>
                      <Progress value={panel.verimlilik} className="mt-2 h-1" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="forecast" className="space-y-6">
            {/* Tasarruf Kartlar� */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card className="border-green-200 bg-gradient-to-br from-green-50 to-emerald-50 dark:border-green-800 dark:from-green-950/20 dark:to-emerald-950/20">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">Finansal Tasarruf</CardTitle>
                  <DollarSign className="h-4 w-4 text-green-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-green-600">?{savingsData.financialSaving.toLocaleString()}</div>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <TrendingUp className="h-3 w-3 text-green-500" />
                    <span>Bu ay optimizasyon tasarrufu</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-emerald-200 bg-gradient-to-br from-emerald-50 to-teal-50 dark:border-emerald-800 dark:from-emerald-950/20 dark:to-teal-950/20">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">Karbon Tasarrufu</CardTitle>
                  <Leaf className="h-4 w-4 text-emerald-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-emerald-600">{savingsData.carbonSaving} kg</div>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <TrendingDown className="h-3 w-3 text-emerald-500" />
                    <span>CO� emisyon azalt�m�</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">�ebeke Sat�� Geliri</CardTitle>
                  <Zap className="h-4 w-4 text-amber-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">?{savingsData.gridExportRevenue.toLocaleString()}</div>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <span>t('exportTariffRevenue')</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">�z T�ketim Oran�</CardTitle>
                  <Activity className="h-4 w-4 text-blue-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">{savingsData.selfConsumptionRate}%</div>
                  <Progress value={savingsData.selfConsumptionRate} className="mt-2 h-1.5" />
                </CardContent>
              </Card>
            </div>

            {/* Tahmin Do�rulu�u */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5 text-amber-500" />
                  Tahmin Servisi Performans�
                </CardTitle>
                <CardDescription>Forecast.Solar servisi tahmin do�rulu�u</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {forecastAccuracy.map((item) => (
                    <div key={item.period} className="flex items-center justify-between p-4 rounded-xl border hover:shadow-md transition-all">
                      <div>
                        <span className="font-medium">{item.period}</span>
                        <div className="text-sm text-muted-foreground mt-1">
                          Tahmin: {item.tahmin} kWh | Ger�ek: {item.gercek} kWh
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge variant={Math.abs(item.sapma) < 5 ? "default" : "secondary"}>
                          {item.sapma > 0 ? "+" : ""}{item.sapma}%
                        </Badge>
                        <div className="text-xs text-muted-foreground mt-1">Sapma</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <div className="grid gap-6 lg:grid-cols-2">
              {/* Panel Konfig�rasyonu */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Settings className="h-5 w-5 text-amber-500" />
                    Panel Konfig�rasyonu
                  </CardTitle>
                  <CardDescription>OpenRemote EMS sistem ayarlar�</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between p-4 rounded-xl border">
                    <div className="flex items-center gap-3">
                      <Compass className="h-5 w-5 text-blue-500" />
                      <div>
                        <span className="font-medium">Panel Azimuth</span>
                        <p className="text-xs text-muted-foreground">G�ney y�n� = 180�</p>
                      </div>
                    </div>
                    <Badge variant="outline" className="text-lg">{systemConfig.panelAzimuth}�</Badge>
                  </div>

                  <div className="flex items-center justify-between p-4 rounded-xl border">
                    <div>
                      <span className="font-medium">Panel E�imi (Pitch)</span>
                      <p className="text-xs text-muted-foreground">Yatay = 0�</p>
                    </div>
                    <Badge variant="outline" className="text-lg">{systemConfig.panelPitch}�</Badge>
                  </div>

                  <div className="flex items-center justify-between p-4 rounded-xl border">
                    <div>
                      <span className="font-medium">Panel Y�nelimi</span>
                      <p className="text-xs text-muted-foreground">Tek y�n veya Do�u-Bat�</p>
                    </div>
                    <Badge variant="outline">{systemConfig.panelOrientation}</Badge>
                  </div>

                  <div className="flex items-center justify-between p-4 rounded-xl border">
                    <div>
                      <span className="font-medium">Maksimum G�� (Peak)</span>
                      <p className="text-xs text-muted-foreground">Kurulu kapasite</p>
                    </div>
                    <Badge variant="outline" className="text-lg">{systemConfig.powerExportMax} kW</Badge>
                  </div>
                </CardContent>
              </Card>

              {/* Tahmin Servisi Ayarlar� */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CloudSun className="h-5 w-5 text-blue-500" />
                    Tahmin Servisi
                  </CardTitle>
                  <CardDescription>Forecast.Solar API entegrasyonu</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between p-4 rounded-xl border">
                    <div className="flex items-center gap-3">
                      <div>
                        <span className="font-medium">Tahmin Servisi</span>
                        <p className="text-xs text-muted-foreground">G�ne� enerjisi tahminlerini etkinle�tir</p>
                      </div>
                    </div>
                    <Switch 
                      checked={forecastEnabled} 
                      onCheckedChange={setForecastEnabled}
                    />
                  </div>

                  <div className="flex items-center justify-between p-4 rounded-xl border">
                    <div>
                      <span className="font-medium">Konum</span>
                      <p className="text-xs text-muted-foreground">
                        {systemConfig.location.lat.toFixed(4)}, {systemConfig.location.lng.toFixed(4)}
                      </p>
                    </div>
                    <Badge variant="outline">�stanbul</Badge>
                  </div>

                  <div className="flex items-center justify-between p-4 rounded-xl border">
                    <div>
                      <span className="font-medium">API Durumu</span>
                      <p className="text-xs text-muted-foreground">Forecast.Solar ba�lant�s�</p>
                    </div>
                    <Badge variant="default" className="bg-green-500">Aktif</Badge>
                  </div>

                  <div className="flex items-center justify-between p-4 rounded-xl border bg-muted/50">
                    <div>
                      <span className="font-medium">Son G�ncelleme</span>
                      <p className="text-xs text-muted-foreground">Tahmin verisi</p>
                    </div>
                    <span className="text-sm">{currentTime.toLocaleTimeString("tr-TR")}</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </Main>
    </>
  )
}
