import { useState, useEffect } from "react"
import { useLanguage } from "@/lib/i18n"
import {
  Zap,
  TrendingUp,
  TrendingDown,
  Clock,
  Activity,
  BarChart3,
  Gauge,
  Plug,
  CircleDollarSign,
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Header } from "@/components/layout/header"
import { Main } from "@/components/layout/main"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  ProfessionalAreaChart,
  ProfessionalBarChart,
  ProfessionalPieChart,
} from "@/components/ui/professional-charts"

// Saatlik tuketim (bugun)
const hourlyData = [
  { saat: "00:00", tuketim: 18 },
  { saat: "02:00", tuketim: 15 },
  { saat: "04:00", tuketim: 12 },
  { saat: "06:00", tuketim: 20 },
  { saat: "08:00", tuketim: 35 },
  { saat: "10:00", tuketim: 45 },
  { saat: "12:00", tuketim: 48 },
  { saat: "14:00", tuketim: 52 },
  { saat: "16:00", tuketim: 55 },
  { saat: "18:00", tuketim: 58 },
  { saat: "20:00", tuketim: 42 },
  { saat: "22:00", tuketim: 28 },
]

export default function ElectricityPage() {
  const { t, language } = useLanguage()
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  // Demo veriler - Interactive Bar Chart icin
  const monthlyConsumptionData = [
    { ay: language === 'tr' ? 'Oca' : 'Jan', tuketim: 14500, maliyet: 7250 },
    { ay: language === 'tr' ? 'Şub' : 'Feb', tuketim: 13800, maliyet: 6900 },
    { ay: language === 'tr' ? 'Mar' : 'Mar', tuketim: 13200, maliyet: 6600 },
    { ay: language === 'tr' ? 'Nis' : 'Apr', tuketim: 12500, maliyet: 6250 },
    { ay: language === 'tr' ? 'May' : 'May', tuketim: 12800, maliyet: 6400 },
    { ay: language === 'tr' ? 'Haz' : 'Jun', tuketim: 14200, maliyet: 7100 },
    { ay: language === 'tr' ? 'Tem' : 'Jul', tuketim: 15500, maliyet: 7750 },
    { ay: language === 'tr' ? 'Ağu' : 'Aug', tuketim: 15200, maliyet: 7600 },
    { ay: language === 'tr' ? 'Eyl' : 'Sep', tuketim: 13500, maliyet: 6750 },
    { ay: language === 'tr' ? 'Eki' : 'Oct', tuketim: 13000, maliyet: 6500 },
    { ay: language === 'tr' ? 'Kas' : 'Nov', tuketim: 13800, maliyet: 6900 },
    { ay: language === 'tr' ? 'Ara' : 'Dec', tuketim: 14800, maliyet: 7400 },
  ]

  // Alan bazli tuketim - Donut chart
  const consumptionByArea = [
    { name: t('productionArea'), value: 45, color: "#3b82f6" },
    { name: t('offices'), value: 20, color: "#22c55e" },
    { name: t('lighting'), value: 15, color: "#f59e0b" },
    { name: t('hvac'), value: 12, color: "#06b6d4" },
    { name: t('other'), value: 8, color: "#8b5cf6" },
  ]

  // Tarife bilgileri
  const tarifeBilgileri = [
    { period: t('nightTariff'), birimFiyat: 0.42, renk: "#1e40af" },
    { period: t('dayTariff'), birimFiyat: 0.68, renk: "#3b82f6" },
    { period: t('peakTariff'), birimFiyat: 0.95, renk: "#ef4444" },
  ]

  // Sayac verileri
  const sayaclar = [
    { id: "ELK-001", konum: t('mainDistribution'), anlikGuc: 32.4, gunlukTuketim: 485, durum: "normal" },
    { id: "ELK-002", konum: t('productionBlockA'), anlikGuc: 18.2, gunlukTuketim: 245, durum: "normal" },
    { id: "ELK-003", konum: t('productionBlockB'), anlikGuc: 22.8, gunlukTuketim: 312, durum: "uyari" },
    { id: "ELK-004", konum: t('officeBuilding'), anlikGuc: 8.5, gunlukTuketim: 98, durum: "normal" },
    { id: "ELK-005", konum: t('storageArea'), anlikGuc: 4.2, gunlukTuketim: 52, durum: "normal" },
  ]

  return (
    <>
      <Header>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Zap className="h-6 w-6 text-blue-500" />
            <h1 className="text-xl font-semibold">{t('electricityTitle')}</h1>
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
            <TabsTrigger value="meters">{t('meters')}</TabsTrigger>
            <TabsTrigger value="tariffs">{t('tariffs')}</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Ana Metrikler */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">{t('instantPower')}</CardTitle>
                  <Activity className="h-4 w-4 text-blue-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">86.1 kW</div>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <TrendingDown className="h-3 w-3 text-green-500" />
                    <span>-5.2% {t('comparedToAverage')}</span>
                  </div>
                  <Progress value={65} className="mt-2 h-1.5" />
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">{t('todayConsumption')}</CardTitle>
                  <BarChart3 className="h-4 w-4 text-cyan-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">1,192 kWh</div>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    <span>{t('asOf')} 14:00</span>
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
                  <div className="text-3xl font-bold">₺24,850</div>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <TrendingDown className="h-3 w-3 text-green-500" />
                    <span>-8.3% {t('comparedToLastMonth')}</span>
                  </div>
                  <Progress value={68} className="mt-2 h-1.5" />
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">{t('powerFactor')}</CardTitle>
                  <Gauge className="h-4 w-4 text-amber-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">0.92</div>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <TrendingUp className="h-3 w-3 text-green-500" />
                    <span>{t('idealRange')}</span>
                  </div>
                  <Progress value={92} className="mt-2 h-1.5" />
                </CardContent>
              </Card>
            </div>

            {/* Grafikler */}
            <div className="grid gap-6 lg:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-blue-500" />
                    {t('hourlyConsumptionProfile')}
                  </CardTitle>
                  <CardDescription>{t('todayHourlyConsumption')}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ProfessionalAreaChart
                    data={hourlyData}
                    xAxisKey="saat"
                    height={300}
                    areas={[
                      { dataKey: "tuketim", name: t('consumptionKwh'), color: "#3b82f6", gradientId: "blueGradient" },
                    ]}
                    tooltipType="energy"
                  />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Zap className="h-5 w-5 text-blue-500" />
                    {t('consumptionDistribution')}
                  </CardTitle>
                  <CardDescription>{t('percentageByArea')}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-6 lg:grid-cols-2">
                    <ProfessionalPieChart
                      data={consumptionByArea}
                      height={240}
                      innerRadius={55}
                      outerRadius={90}
                      tooltipType="percentage"
                      centerContent={
                        <div className="text-center">
                          <div className="text-2xl font-bold">1,192</div>
                          <div className="text-xs text-muted-foreground">kWh</div>
                        </div>
                      }
                    />
                    <div className="flex flex-col justify-center space-y-2">
                      {consumptionByArea.map((item) => (
                        <div key={item.name} className="flex items-center justify-between p-2 rounded-lg bg-muted/50 hover:bg-muted transition-colors text-sm">
                          <div className="flex items-center gap-2">
                            <div className="h-3 w-3 rounded-full shadow-sm" style={{ backgroundColor: item.color }} />
                            <span className="font-medium">{item.name}</span>
                          </div>
                          <span className="font-bold">{item.value}%</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="analysis" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5 text-blue-500" />
                  {t('monthlyTrendTitle')}
                </CardTitle>
                <CardDescription>{t('last12MonthsData')}</CardDescription>
              </CardHeader>
              <CardContent>
                <ProfessionalBarChart
                  data={monthlyConsumptionData}
                  xAxisKey="ay"
                  height={350}
                  bars={[
                    { dataKey: "tuketim", name: t('consumptionKwh'), color: "#3b82f6", radius: 6 },
                    { dataKey: "maliyet", name: t('costTl'), color: "#22c55e", radius: 6 },
                  ]}
                  tooltipType="energy"
                />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="meters" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Plug className="h-5 w-5 text-blue-500" />
                  {t('meterStatus')}
                </CardTitle>
                <CardDescription>{t('allMetersStatus')}</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>{t('meterId')}</TableHead>
                      <TableHead>{t('location')}</TableHead>
                      <TableHead className="text-right">{t('instantPower')} (kW)</TableHead>
                      <TableHead className="text-right">{t('dailyConsumptionKwh')}</TableHead>
                      <TableHead className="text-center">{t('status')}</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {sayaclar.map((sayac) => (
                      <TableRow key={sayac.id} className="hover:bg-muted/50 transition-colors">
                        <TableCell className="font-medium">{sayac.id}</TableCell>
                        <TableCell>{sayac.konum}</TableCell>
                        <TableCell className="text-right font-medium">{sayac.anlikGuc}</TableCell>
                        <TableCell className="text-right font-medium">{sayac.gunlukTuketim}</TableCell>
                        <TableCell className="text-center">
                          <Badge variant={sayac.durum === "normal" ? "default" : "secondary"}>
                            {sayac.durum === "normal" ? t('normal') : t('warning')}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="tariffs" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CircleDollarSign className="h-5 w-5 text-green-500" />
                  {t('tariffInfo')}
                </CardTitle>
                <CardDescription>{t('tariffsByTimeZone')}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {tarifeBilgileri.map((tarife) => (
                    <div 
                      key={tarife.period} 
                      className="flex items-center justify-between p-4 rounded-xl border bg-gradient-to-r from-muted/30 to-muted/10 hover:shadow-lg transition-all hover:scale-[1.02]"
                    >
                      <div className="flex items-center gap-3">
                        <div className="h-4 w-4 rounded-full shadow-sm" style={{ backgroundColor: tarife.renk }} />
                        <span className="font-medium">{tarife.period}</span>
                      </div>
                      <Badge variant="outline" className="text-lg font-bold">{tarife.birimFiyat} TL/kWh</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </Main>
    </>
  )
}
