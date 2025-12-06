// Manual route override to prevent TanStack Router auto-generation
import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import {
  Calendar, Download, Clock, Zap, TrendingUp,
  ArrowUpRight, ArrowDownRight, Sun, Moon, Sunrise, Sunset,
  AlertTriangle, CheckCircle2, BarChart3, RefreshCw, Battery,
  Gauge, Activity, Info
} from 'lucide-react'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue
} from '@/components/ui/select'
import {
  AreaChart, Area,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts'

const hourlyData = [
  { saat: '00:00', tuketim: 125, uretim: 0, sebekeCekis: 125 },
  { saat: '01:00', tuketim: 110, uretim: 0, sebekeCekis: 110 },
  { saat: '02:00', tuketim: 95, uretim: 0, sebekeCekis: 95 },
  { saat: '03:00', tuketim: 88, uretim: 0, sebekeCekis: 88 },
  { saat: '04:00', tuketim: 92, uretim: 0, sebekeCekis: 92 },
  { saat: '05:00', tuketim: 115, uretim: 5, sebekeCekis: 110 },
  { saat: '06:00', tuketim: 180, uretim: 45, sebekeCekis: 135 },
  { saat: '07:00', tuketim: 320, uretim: 120, sebekeCekis: 200 },
  { saat: '08:00', tuketim: 480, uretim: 280, sebekeCekis: 200 },
  { saat: '09:00', tuketim: 520, uretim: 420, sebekeCekis: 100 },
  { saat: '10:00', tuketim: 540, uretim: 520, sebekeCekis: 20 },
  { saat: '11:00', tuketim: 560, uretim: 580, sebekeCekis: -20 },
  { saat: '12:00', tuketim: 580, uretim: 620, sebekeCekis: -40 },
  { saat: '13:00', tuketim: 575, uretim: 600, sebekeCekis: -25 },
  { saat: '14:00', tuketim: 565, uretim: 560, sebekeCekis: 5 },
  { saat: '15:00', tuketim: 550, uretim: 480, sebekeCekis: 70 },
  { saat: '16:00', tuketim: 540, uretim: 380, sebekeCekis: 160 },
  { saat: '17:00', tuketim: 560, uretim: 250, sebekeCekis: 310 },
  { saat: '18:00', tuketim: 520, uretim: 120, sebekeCekis: 400 },
  { saat: '19:00', tuketim: 450, uretim: 25, sebekeCekis: 425 },
  { saat: '20:00', tuketim: 380, uretim: 0, sebekeCekis: 380 },
  { saat: '21:00', tuketim: 320, uretim: 0, sebekeCekis: 320 },
  { saat: '22:00', tuketim: 250, uretim: 0, sebekeCekis: 250 },
  { saat: '23:00', tuketim: 180, uretim: 0, sebekeCekis: 180 },
]

const periodSummary = [
  { period: 'Gece', icon: Moon, time: '00:00 - 06:00', tuketim: 625, uretim: 5, maliyet: 906, color: 'slate' },
  { period: 'Sabah', icon: Sunrise, time: '06:00 - 12:00', tuketim: 2660, uretim: 2065, maliyet: 1785, color: 'orange' },
  { period: 'Öğleden Sonra', icon: Sun, time: '12:00 - 18:00', tuketim: 3370, uretim: 2890, maliyet: 1440, color: 'amber' },
  { period: 'Akşam', icon: Sunset, time: '18:00 - 24:00', tuketim: 2100, uretim: 145, maliyet: 5865, color: 'indigo' },
]

const deviceConsumption = [
  { cihaz: 'HVAC Sistemleri', tuketim: 3250, oran: 37.1, trend: -2.5 },
  { cihaz: 'Üretim Hatları', tuketim: 2850, oran: 32.5, trend: 1.2 },
  { cihaz: 'Aydınlatma', tuketim: 1420, oran: 16.2, trend: -5.8 },
  { cihaz: 'Ofis Ekipmanları', tuketim: 680, oran: 7.8, trend: 0.5 },
  { cihaz: 'Diğer', tuketim: 555, oran: 6.4, trend: 3.2 },
]

const dailyAlerts = [
  { tip: 'warning', baslik: 'Pik Tüketim Uyarısı', mesaj: 'Saat 14:30\'da anlık tüketim 612 kW ile pik değere ulaştı', zaman: '14:30' },
  { tip: 'success', baslik: 'Üretim Hedefi Aşıldı', mesaj: 'Güneş enerjisi üretimi günlük hedefin %8 üzerinde gerçekleşti', zaman: '16:00' },
  { tip: 'info', baslik: 'Gece Tarifesi Aktif', mesaj: 'Gece tarifesi başladı, yük kaydırma için uygun zaman', zaman: '22:00' },
]

function ManualReportsDailyComponent() {
  const [selectedDate, setSelectedDate] = useState('today')
  const today = new Date()
  const formattedDate = today.toLocaleDateString('tr-TR', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })

  const totalConsumption = 8755
  const totalProduction = 5105
  const selfConsumptionRate = 58.3
  const peakDemand = 612
  const avgPowerFactor = 0.94

  return (
    <>
      <Header fixed>
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center size-10 rounded-xl bg-gradient-to-br from-blue-500/20 to-cyan-500/10 border border-blue-500/20">
            <Calendar className="size-5 text-blue-600" />
          </div>
          <div>
            <h1 className="text-lg font-semibold tracking-tight">Günlük Rapor</h1>
            <p className="text-xs text-muted-foreground">{formattedDate}</p>
          </div>
        </div>
        <div className="ml-auto flex items-center gap-2">
          <Select value={selectedDate} onValueChange={setSelectedDate}>
            <SelectTrigger className="w-[140px] h-9">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="today">Bugün</SelectItem>
              <SelectItem value="yesterday">Dün</SelectItem>
              <SelectItem value="custom">Tarih Seç</SelectItem>
            </SelectContent>
          </Select>
          <Button size="sm" variant="outline" className="gap-2">
            <RefreshCw className="size-4" />
          </Button>
          <Button size="sm" className="gap-2">
            <Download className="size-4" />
            <span className="hidden sm:inline">PDF İndir</span>
          </Button>
        </div>
      </Header>

      <Main>
        <div className="space-y-6">
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
            <Card className="border-0 bg-gradient-to-br from-blue-50 to-blue-100/50 dark:from-blue-950/40 dark:to-blue-900/20">
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <p className="text-xs font-medium text-blue-700 dark:text-blue-300">Toplam Tüketim</p>
                    <p className="text-2xl font-bold text-blue-800 dark:text-blue-200">{totalConsumption.toLocaleString()}</p>
                    <p className="text-xs text-blue-600/80">kWh</p>
                  </div>
                  <div className="size-9 rounded-lg bg-blue-500/15 flex items-center justify-center">
                    <Zap className="size-4 text-blue-600" />
                  </div>
                </div>
                <div className="flex items-center gap-1 mt-2">
                  <ArrowDownRight className="size-3 text-green-600" />
                  <span className="text-xs text-green-600 font-medium">-3.2%</span>
                  <span className="text-xs text-muted-foreground">vs dün</span>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 bg-gradient-to-br from-emerald-50 to-emerald-100/50 dark:from-emerald-950/40 dark:to-emerald-900/20">
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <p className="text-xs font-medium text-emerald-700 dark:text-emerald-300">Toplam Üretim</p>
                    <p className="text-2xl font-bold text-emerald-800 dark:text-emerald-200">{totalProduction.toLocaleString()}</p>
                    <p className="text-xs text-emerald-600/80">kWh</p>
                  </div>
                  <div className="size-9 rounded-lg bg-emerald-500/15 flex items-center justify-center">
                    <Sun className="size-4 text-emerald-600" />
                  </div>
                </div>
                <div className="flex items-center gap-1 mt-2">
                  <ArrowUpRight className="size-3 text-green-600" />
                  <span className="text-xs text-green-600 font-medium">+8.5%</span>
                  <span className="text-xs text-muted-foreground">vs dün</span>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 bg-gradient-to-br from-amber-50 to-amber-100/50 dark:from-amber-950/40 dark:to-amber-900/20">
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <p className="text-xs font-medium text-amber-700 dark:text-amber-300">Pik Talep</p>
                    <p className="text-2xl font-bold text-amber-800 dark:text-amber-200">{peakDemand}</p>
                    <p className="text-xs text-amber-600/80">kW @ 14:30</p>
                  </div>
                  <div className="size-9 rounded-lg bg-amber-500/15 flex items-center justify-center">
                    <TrendingUp className="size-4 text-amber-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 bg-gradient-to-br from-green-50 to-green-100/50 dark:from-green-950/40 dark:to-green-900/20">
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <p className="text-xs font-medium text-green-700 dark:text-green-300">Özüketim Oranı</p>
                    <p className="text-2xl font-bold text-green-800 dark:text-green-200">%{selfConsumptionRate}</p>
                    <p className="text-xs text-green-600/80">üretimden</p>
                  </div>
                  <div className="size-9 rounded-lg bg-green-500/15 flex items-center justify-center">
                    <Battery className="size-4 text-green-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 bg-gradient-to-br from-purple-50 to-purple-100/50 dark:from-purple-950/40 dark:to-purple-900/20">
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <p className="text-xs font-medium text-purple-700 dark:text-purple-300">Güç Faktörü</p>
                    <p className="text-2xl font-bold text-purple-800 dark:text-purple-200">{avgPowerFactor}</p>
                    <p className="text-xs text-purple-600/80">ortalama</p>
                  </div>
                  <div className="size-9 rounded-lg bg-purple-500/15 flex items-center justify-center">
                    <Gauge className="size-4 text-purple-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="border shadow-sm">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-base flex items-center gap-2">
                    <BarChart3 className="size-4" />
                    Saatlik Enerji Profili
                  </CardTitle>
                  <CardDescription>24 saatlik tüketim, üretim ve şebeke çekişi</CardDescription>
                </div>
                <div className="flex items-center gap-4 text-xs">
                  <div className="flex items-center gap-1.5">
                    <div className="size-2.5 rounded-full bg-blue-500" />
                    <span>Tüketim</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="size-2.5 rounded-full bg-emerald-500" />
                    <span>Üretim</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="size-2.5 rounded-full bg-amber-500" />
                    <span>Şebeke</span>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={320}>
                <AreaChart data={hourlyData}>
                  <defs>
                    <linearGradient id="tuketimGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="uretimGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis dataKey="saat" className="text-xs" tick={{ fontSize: 10 }} />
                  <YAxis className="text-xs" tick={{ fontSize: 10 }} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'hsl(var(--background))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px',
                      fontSize: '12px'
                    }}
                    formatter={(value: number, name: string) => [
                      `${value} kW`,
                      name === 'tuketim' ? 'Tüketim' : name === 'uretim' ? 'Üretim' : 'Şebeke Çekişi'
                    ]}
                  />
                  <Area type="monotone" dataKey="tuketim" stroke="#3b82f6" fill="url(#tuketimGrad)" strokeWidth={2} />
                  <Area type="monotone" dataKey="uretim" stroke="#10b981" fill="url(#uretimGrad)" strokeWidth={2} />
                  <Area type="monotone" dataKey="sebekeCekis" stroke="#f59e0b" fill="none" strokeWidth={2} strokeDasharray="5 5" />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <div className="grid lg:grid-cols-3 gap-6">
            <Card className="border shadow-sm">
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2">
                  <Clock className="size-4" />
                  Zaman Dilimi Özeti
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {periodSummary.map((period, idx) => (
                  <div key={idx} className="p-3 rounded-lg border bg-muted/30 hover:bg-muted/50 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className={`size-9 rounded-lg bg-${period.color}-500/15 flex items-center justify-center`}>
                        <period.icon className={`size-4 text-${period.color}-600`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">{period.period}</span>
                          <span className="text-[10px] text-muted-foreground">{period.time}</span>
                        </div>
                        <div className="flex items-center justify-between mt-1 text-xs">
                          <span className="text-muted-foreground">Tüketim: <span className="text-foreground font-medium">{period.tuketim} kWh</span></span>
                          <span className="text-muted-foreground">₺{period.maliyet.toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="border shadow-sm">
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2">
                  <Activity className="size-4" />
                  Cihaz Bazlı Tüketim
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {deviceConsumption.map((device, idx) => (
                  <div key={idx} className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-medium">{device.cihaz}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-muted-foreground">{device.tuketim} kWh</span>
                        <Badge variant={device.trend < 0 ? 'default' : 'secondary'} className="text-[10px] px-1.5">
                          {device.trend > 0 ? '+' : ''}{device.trend}%
                        </Badge>
                      </div>
                    </div>
                    <Progress value={device.oran} className="h-1.5" />
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="border shadow-sm">
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2">
                  <AlertTriangle className="size-4" />
                  Günlük Bildirimler
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {dailyAlerts.map((alert, idx) => (
                  <div 
                    key={idx} 
                    className={`p-3 rounded-lg border ${
                      alert.tip === 'warning' ? 'bg-amber-50 dark:bg-amber-950/30 border-amber-200 dark:border-amber-800' :
                      alert.tip === 'success' ? 'bg-green-50 dark:bg-green-950/30 border-green-200 dark:border-green-800' :
                      'bg-blue-50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-800'
                    }`}
                  >
                    <div className="flex items-start gap-2">
                      {alert.tip === 'warning' ? (
                        <AlertTriangle className="size-4 text-amber-600 mt-0.5 flex-shrink-0" />
                      ) : alert.tip === 'success' ? (
                        <CheckCircle2 className="size-4 text-green-600 mt-0.5 flex-shrink-0" />
                      ) : (
                        <Info className="size-4 text-blue-600 mt-0.5 flex-shrink-0" />
                      )}
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-medium">{alert.baslik}</p>
                        <p className="text-[11px] text-muted-foreground mt-0.5">{alert.mesaj}</p>
                        <p className="text-[10px] text-muted-foreground mt-1">{alert.zaman}</p>
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

// Manual export with timestamp to prevent overrides
export const Route = createFileRoute('/_authenticated/reports/daily')({
  component: ManualReportsDailyComponent,
})