import { useState, useEffect } from "react"
import { useLanguage } from "@/lib/i18n"
import {
  Battery,
  BatteryCharging,
  TrendingDown,
  Thermometer,
  Activity,
  BarChart3,
  Zap,
  ArrowDown,
  RefreshCw,
  Power,
  Cpu,
  Download,
  ArrowUp,
} from "lucide-react"
import {
  RadialBarChart,
  RadialBar,
  PolarGrid,
  Label,
} from "recharts"
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
import {
  ChartConfig,
  ChartContainer,
} from "@/components/ui/chart"
import { Header } from "@/components/layout/header"
import { Main } from "@/components/layout/main"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  ProfessionalAreaChart,
  ProfessionalPieChart,
} from "@/components/ui/professional-charts"

// Şarj/Deşarj verileri - Son 24 saat
const chargeDischargeData = [
  { saat: "00:00", sarj: 0, desarj: 2 },
  { saat: "02:00", sarj: 0, desarj: 1.5 },
  { saat: "04:00", sarj: 0, desarj: 1 },
  { saat: "06:00", sarj: 0, desarj: 2 },
  { saat: "08:00", sarj: 5, desarj: 0 },
  { saat: "10:00", sarj: 12, desarj: 0 },
  { saat: "12:00", sarj: 15, desarj: 0 },
  { saat: "14:00", sarj: 8, desarj: 0 },
  { saat: "16:00", sarj: 2, desarj: 5 },
  { saat: "18:00", sarj: 0, desarj: 10 },
  { saat: "20:00", sarj: 0, desarj: 8 },
  { saat: "22:00", sarj: 0, desarj: 5 },
]

// Radial gauge için şarj seviyesi
const batteryLevelData = [
  { name: "Şarj", value: 78, fill: "#22c55e" },
]

// Modül verileri
const moduller = [
  { id: "MOD-A1", voltaj: 52.4, akim: 28.5, sicaklik: 32, saglik: 98, durum: "aktif" },
  { id: "MOD-A2", voltaj: 52.2, akim: 27.8, sicaklik: 31, saglik: 97, durum: "aktif" },
  { id: "MOD-B1", voltaj: 52.1, akim: 26.2, sicaklik: 33, saglik: 95, durum: "aktif" },
  { id: "MOD-B2", voltaj: 51.8, akim: 25.5, sicaklik: 35, saglik: 92, durum: "uyari" },
  { id: "MOD-C1", voltaj: 52.3, akim: 28.0, sicaklik: 30, saglik: 99, durum: "aktif" },
  { id: "MOD-C2", voltaj: 52.0, akim: 27.2, sicaklik: 32, saglik: 96, durum: "aktif" },
]

// Enerji kaynakları dağılımı
const energySourceDistribution = [
  { name: "Güneş Enerjisi", value: 65, color: "#f59e0b" },
  { name: "Şebeke", value: 25, color: "#3b82f6" },
  { name: "Rüzgar", value: 10, color: "#22c55e" },
]

const chartConfig = {
  sarj: {
    label: "Şarj (kW)",
    color: "#22c55e",
  },
  desarj: {
    label: "Deşarj (kW)",
    color: "#ef4444",
  },
} satisfies ChartConfig

export default function BatteryPage() {
  const { t, language } = useLanguage()
  const [currentTime, setCurrentTime] = useState(new Date())
  const currentCharge = 78

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  return (
    <>
      <Header>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <BatteryCharging className="h-6 w-6 text-green-500" />
            <h1 className="text-xl font-semibold">{t('batteryTitle')}</h1>
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
            <TabsTrigger value="analysis">{t('analysis')}</TabsTrigger>
            <TabsTrigger value="modules">{t('modules')}</TabsTrigger>
            <TabsTrigger value="flow">{t('energyFlow')}</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Ana Metrikler */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">{t('chargeLevel')}</CardTitle>
                  <BatteryCharging className="h-4 w-4 text-green-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">{currentCharge}%</div>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <ArrowUp className="h-3 w-3 text-green-500" />
                    <span>{t('charging')} - 8.2 kW</span>
                  </div>
                  <Progress value={currentCharge} className="mt-2 h-2" />
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">{t('storedEnergy')}</CardTitle>
                  <Zap className="h-4 w-4 text-blue-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">156 kWh</div>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <span>{t('capacity')}: 200 kWh</span>
                  </div>
                  <Progress value={78} className="mt-2 h-1.5" />
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">{t('systemTemperature')}</CardTitle>
                  <Thermometer className="h-4 w-4 text-amber-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">32°C</div>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <TrendingDown className="h-3 w-3 text-green-500" />
                    <span>{t('optimalRange')}</span>
                  </div>
                  <Progress value={45} className="mt-2 h-1.5" />
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">{t('totalCycles')}</CardTitle>
                  <RefreshCw className="h-4 w-4 text-purple-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">1,247</div>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <span>{t('lifespan')}: 5000 {t('cycles')}</span>
                  </div>
                  <Progress value={25} className="mt-2 h-1.5" />
                </CardContent>
              </Card>
            </div>

            {/* Radial Battery Gauge */}
            <div className="grid gap-6 lg:grid-cols-3">
              <Card>
                <CardHeader className="pb-0">
                  <CardTitle className="flex items-center gap-2">
                    <Battery className="h-5 w-5 text-green-500" />
                    {t('batteryStatus')}
                  </CardTitle>
                  <CardDescription>{t('instantChargeLevel')}</CardDescription>
                </CardHeader>
                <CardContent className="flex-1 pb-0">
                  <ChartContainer config={chartConfig} className="mx-auto aspect-square max-h-[280px]">
                    <RadialBarChart
                      data={batteryLevelData}
                      startAngle={180}
                      endAngle={0}
                      innerRadius={80}
                      outerRadius={140}
                    >
                      <PolarGrid
                        gridType="circle"
                        radialLines={false}
                        stroke="none"
                        className="first:fill-muted last:fill-background"
                        polarRadius={[86, 74]}
                      />
                      <RadialBar
                        dataKey="value"
                        background
                        cornerRadius={10}
                        fill={currentCharge > 60 ? "#22c55e" : currentCharge > 30 ? "#f59e0b" : "#ef4444"}
                      />
                      <Label
                        content={({ viewBox }) => {
                          if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                            return (
                              <text
                                x={viewBox.cx}
                                y={viewBox.cy}
                                textAnchor="middle"
                                dominantBaseline="middle"
                              >
                                <tspan
                                  x={viewBox.cx}
                                  y={(viewBox.cy || 0) - 10}
                                  className="fill-foreground text-5xl font-bold"
                                >
                                  {currentCharge}%
                                </tspan>
                                <tspan
                                  x={viewBox.cx}
                                  y={(viewBox.cy || 0) + 24}
                                  className="fill-muted-foreground text-sm"
                                >
                                  156 / 200 kWh
                                </tspan>
                              </text>
                            )
                          }
                        }}
                      />
                    </RadialBarChart>
                  </ChartContainer>
                </CardContent>
                <CardFooter className="flex-col gap-2 text-sm pt-0">
                  <div className="flex items-center gap-2 font-medium text-green-600">
                    <BatteryCharging className="h-4 w-4" />
                    {t('charging')} - {t('estimatedFull')}: 14:30
                  </div>
                </CardFooter>
              </Card>

              {/* Özet Bilgiler */}
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="h-5 w-5 text-green-500" />
                    {t('dailySummary')}
                  </CardTitle>
                  <CardDescription>{t('todayEnergyTransfer')}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="text-center p-4 rounded-xl border bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 transition-all hover:shadow-lg hover:scale-105">
                      <ArrowDown className="h-8 w-8 text-green-500 mx-auto mb-2" />
                      <span className="text-sm text-muted-foreground">{t('todayCharge')}</span>
                      <div className="text-2xl font-bold text-green-600">85 kWh</div>
                    </div>
                    <div className="text-center p-4 rounded-xl border bg-gradient-to-br from-red-50 to-rose-50 dark:from-red-950/20 dark:to-rose-950/20 transition-all hover:shadow-lg hover:scale-105">
                      <ArrowUp className="h-8 w-8 text-red-500 mx-auto mb-2" />
                      <span className="text-sm text-muted-foreground">{t('todayDischarge')}</span>
                      <div className="text-2xl font-bold text-red-500">62 kWh</div>
                    </div>
                    <div className="text-center p-4 rounded-xl border bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 transition-all hover:shadow-lg hover:scale-105">
                      <Zap className="h-8 w-8 text-blue-500 mx-auto mb-2" />
                      <span className="text-sm text-muted-foreground">{t('netEnergy')}</span>
                      <div className="text-2xl font-bold text-blue-600">+23 kWh</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="analysis" className="space-y-6">
            {/* Şarj/Deşarj Grafiği */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5 text-green-500" />
                  {t('chargeDischargeAnalysis')}
                </CardTitle>
                <CardDescription>
                  {t('last24HoursPowerChange')}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ProfessionalAreaChart
                  data={chargeDischargeData}
                  xAxisKey="saat"
                  height={350}
                  areas={[
                    { dataKey: "sarj", name: `${t('charge')} (kW)`, color: "#22c55e", gradientId: "greenGradient" },
                    { dataKey: "desarj", name: `${t('discharge')} (kW)`, color: "#ef4444", gradientId: "redGradient" },
                  ]}
                  tooltipType="energy"
                />
              </CardContent>
            </Card>

            {/* Enerji Kaynakları Dağılımı */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="h-5 w-5 text-amber-500" />
                  {t('chargeSourcesDistribution')}
                </CardTitle>
                <CardDescription>{t('energySourcesChargingBattery')}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6 lg:grid-cols-2">
                  <ProfessionalPieChart
                    data={energySourceDistribution}
                    height={300}
                    innerRadius={70}
                    outerRadius={110}
                    tooltipType="percentage"
                    centerContent={
                      <div className="text-center">
                        <div className="text-3xl font-bold">85</div>
                        <div className="text-sm text-muted-foreground">kWh</div>
                      </div>
                    }
                  />
                  <div className="flex flex-col justify-center space-y-4">
                    {energySourceDistribution.map((item) => (
                      <div key={item.name} className="flex items-center justify-between p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors">
                        <div className="flex items-center gap-3">
                          <div className="h-4 w-4 rounded-full shadow-sm" style={{ backgroundColor: item.color }} />
                          <span className="font-medium">{item.name}</span>
                        </div>
                        <div className="text-right">
                          <span className="text-lg font-bold">{item.value}%</span>
                          <span className="text-sm text-muted-foreground ml-2">
                            ({Math.round(85 * item.value / 100)} kWh)
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="modules" className="space-y-6">
            {/* Modül Durumu */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Cpu className="h-5 w-5 text-green-500" />
                  {t('batteryModules')}
                </CardTitle>
                <CardDescription>
                  {t('allBatteryModulesStatus')}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {moduller.map((modul) => (
                    <div
                      key={modul.id}
                      className={`rounded-xl border p-4 transition-all hover:shadow-lg hover:scale-105 ${
                        modul.durum === "aktif"
                          ? "border-green-200 bg-gradient-to-br from-green-50 to-emerald-50 dark:border-green-800 dark:from-green-950/20 dark:to-emerald-950/20"
                          : "border-amber-200 bg-gradient-to-br from-amber-50 to-yellow-50 dark:border-amber-800 dark:from-amber-950/20 dark:to-yellow-950/20"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-3">
                        <span className="font-semibold">{modul.id}</span>
                        <Badge variant={modul.durum === "aktif" ? "default" : "secondary"}>
                          {modul.durum === "aktif" ? t('active') : t('warningStatus')}
                        </Badge>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">{t('voltage')}</span>
                          <span className="font-medium">{modul.voltaj} V</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">{t('current')}</span>
                          <span className="font-medium">{modul.akim} A</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">{t('temperatureLabel')}</span>
                          <span className={`font-medium ${modul.sicaklik > 34 ? "text-amber-600" : ""}`}>
                            {modul.sicaklik}°C
                          </span>
                        </div>
                        <div className="pt-2">
                          <div className="flex items-center justify-between text-sm mb-1">
                            <span className="text-muted-foreground">{t('health')}</span>
                            <span className="font-medium">{modul.saglik}%</span>
                          </div>
                          <Progress value={modul.saglik} className="h-1.5" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="flow" className="space-y-6">
            {/* Enerji Akış Diyagramı */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5 text-green-500" />
                  {t('energyFlowDiagram')}
                </CardTitle>
                <CardDescription>
                  {t('instantEnergyInputOutput')}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-center gap-8 py-8">
                  {/* Solar Input */}
                  <div className="text-center transition-all hover:scale-110">
                    <div className="h-20 w-20 rounded-full bg-gradient-to-br from-amber-100 to-orange-100 dark:from-amber-900/30 dark:to-orange-900/30 flex items-center justify-center mb-2 shadow-lg">
                      <Zap className="h-10 w-10 text-amber-600" />
                    </div>
                    <span className="text-sm font-medium">{t('solarLabel')}</span>
                    <div className="text-lg font-bold text-amber-600">12.5 kW</div>
                  </div>

                  {/* Arrow */}
                  <div className="flex flex-col items-center">
                    <ArrowDown className="h-8 w-8 text-green-500 animate-bounce" />
                    <span className="text-xs text-muted-foreground">{t('charge')}</span>
                  </div>

                  {/* Battery */}
                  <div className="text-center transition-all hover:scale-110">
                    <div className="h-24 w-24 rounded-2xl bg-gradient-to-br from-green-100 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30 flex items-center justify-center mb-2 relative shadow-xl">
                      <BatteryCharging className="h-12 w-12 text-green-600" />
                      <Badge className="absolute -top-2 -right-2 bg-green-500 shadow-lg">{currentCharge}%</Badge>
                    </div>
                    <span className="text-sm font-medium">{t('battery')}</span>
                    <div className="text-lg font-bold text-green-600">156 kWh</div>
                  </div>

                  {/* Arrow */}
                  <div className="flex flex-col items-center">
                    <ArrowDown className="h-8 w-8 text-blue-500 animate-pulse" />
                    <span className="text-xs text-muted-foreground">{t('feedLabel')}</span>
                  </div>

                  {/* Consumption */}
                  <div className="text-center transition-all hover:scale-110">
                    <div className="h-20 w-20 rounded-full bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-blue-900/30 dark:to-indigo-900/30 flex items-center justify-center mb-2 shadow-lg">
                      <Power className="h-10 w-10 text-blue-600" />
                    </div>
                    <span className="text-sm font-medium">{t('consumption')}</span>
                    <div className="text-lg font-bold text-blue-600">4.3 kW</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </Main>
    </>
  )
}
