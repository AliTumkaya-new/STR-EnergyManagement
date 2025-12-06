import { useState } from 'react'
import {
  Calendar, Download, Clock, Zap, TrendingUp,
  ArrowUpRight, ArrowDownRight, Sun, Moon, Sunrise, Sunset,
  AlertTriangle, CheckCircle2, BarChart3, RefreshCw
} from 'lucide-react'
import { useLanguage } from '@/lib/i18n'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue
} from '@/components/ui/select'
import { ProfessionalAreaChart } from '@/components/ui/professional-charts'

// Saatlik tüketim verisi (bugün)
const hourlyData = [
  { saat: '00', tuketim: 125, uretim: 0 },
  { saat: '01', tuketim: 110, uretim: 0 },
  { saat: '02', tuketim: 95, uretim: 0 },
  { saat: '03', tuketim: 88, uretim: 0 },
  { saat: '04', tuketim: 92, uretim: 0 },
  { saat: '05', tuketim: 115, uretim: 5 },
  { saat: '06', tuketim: 180, uretim: 45 },
  { saat: '07', tuketim: 320, uretim: 120 },
  { saat: '08', tuketim: 480, uretim: 280 },
  { saat: '09', tuketim: 520, uretim: 420 },
  { saat: '10', tuketim: 540, uretim: 520 },
  { saat: '11', tuketim: 560, uretim: 580 },
  { saat: '12', tuketim: 580, uretim: 620 },
  { saat: '13', tuketim: 575, uretim: 600 },
  { saat: '14', tuketim: 565, uretim: 560 },
  { saat: '15', tuketim: 550, uretim: 480 },
  { saat: '16', tuketim: 540, uretim: 380 },
  { saat: '17', tuketim: 560, uretim: 250 },
  { saat: '18', tuketim: 520, uretim: 120 },
  { saat: '19', tuketim: 450, uretim: 25 },
  { saat: '20', tuketim: 380, uretim: 0 },
  { saat: '21', tuketim: 320, uretim: 0 },
  { saat: '22', tuketim: 250, uretim: 0 },
  { saat: '23', tuketim: 180, uretim: 0 },
]

// Zaman dilimi özeti
const periodSummary = [
  { period: 'Gece', icon: Moon, time: '00:00 - 06:00', tuketim: 625, ort: 104, renk: 'slate' },
  { period: 'Sabah', icon: Sunrise, time: '06:00 - 12:00', tuketim: 2660, ort: 443, renk: 'orange' },
  { period: 'Öğle', icon: Sun, time: '12:00 - 18:00', tuketim: 3370, ort: 562, renk: 'yellow' },
  { period: 'Akşam', icon: Sunset, time: '18:00 - 24:00', tuketim: 2100, ort: 350, renk: 'indigo' },
]

// Günlük alarmlar
const dailyAlerts = [
  { tip: 'warning', mesaj: '14:30 - Anlık tüketim pik değere ulaştı (612 kW)', zaman: '2 saat önce' },
  { tip: 'success', mesaj: 'Güneş enerjisi üretimi hedefin %8 üzerinde', zaman: '4 saat önce' },
  { tip: 'info', mesaj: 'Gece tarifesi başladı, yük kaydırma önerilir', zaman: '22:00' },
]

export function ReportsDaily() {
  const { t, language } = useLanguage()
  const [selectedDate, setSelectedDate] = useState('today')

  const today = new Date()
  const formattedDate = today.toLocaleDateString(language === 'tr' ? 'tr-TR' : 'en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })

  return (
    <>
      <Header fixed>
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center size-10 rounded-xl bg-muted/50 border border-border">
            <Calendar className="size-5 text-muted-foreground" />
          </div>
          <div>
            <h1 className="text-lg font-semibold tracking-tight">{t('dailyReport')}</h1>
            <p className="text-xs text-muted-foreground">{formattedDate}</p>
          </div>
        </div>
        <div className="ml-auto flex items-center gap-2">
          <Select value={selectedDate} onValueChange={setSelectedDate}>
            <SelectTrigger className="w-[140px] h-9">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="today">{t('today')}</SelectItem>
              <SelectItem value="yesterday">{t('yesterday')}</SelectItem>
              <SelectItem value="custom">{t('selectDate')}</SelectItem>
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
          {/* Daily Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="border bg-card hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">{t('totalConsumption')}</p>
                    <p className="text-3xl font-bold text-foreground">8,755</p>
                    <p className="text-xs text-muted-foreground">kWh</p>
                  </div>
                  <div className="size-10 rounded-xl bg-muted/50 flex items-center justify-center">
                    <Zap className="size-5 text-muted-foreground" />
                  </div>
                </div>
                <div className="flex items-center gap-1 mt-2">
                  <ArrowDownRight className="size-3 text-green-600" />
                  <span className="text-xs text-green-600 font-medium">-3.2%</span>
                  <span className="text-xs text-muted-foreground">{t('vsYesterday')}</span>
                </div>
              </CardContent>
            </Card>

            <Card className="border bg-card hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">{t('totalProduction')}</p>
                    <p className="text-3xl font-bold text-foreground">4,005</p>
                    <p className="text-xs text-muted-foreground">kWh</p>
                  </div>
                  <div className="size-10 rounded-xl bg-muted/50 flex items-center justify-center">
                    <Sun className="size-5 text-muted-foreground" />
                  </div>
                </div>
                <div className="flex items-center gap-1 mt-2">
                  <ArrowUpRight className="size-3 text-green-600" />
                  <span className="text-xs text-green-600 font-medium">+8.5%</span>
                  <span className="text-xs text-muted-foreground">{t('vsYesterday')}</span>
                </div>
              </CardContent>
            </Card>

            <Card className="border bg-card hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">{t('peakValue')}</p>
                    <p className="text-3xl font-bold text-foreground">612</p>
                    <p className="text-xs text-muted-foreground">kW @ 14:30</p>
                  </div>
                  <div className="size-10 rounded-xl bg-muted/50 flex items-center justify-center">
                    <TrendingUp className="size-5 text-muted-foreground" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border bg-card hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">{t('selfConsumptionRate')}</p>
                    <p className="text-3xl font-bold text-foreground">45.7%</p>
                    <p className="text-xs text-muted-foreground">{t('fromProduction')}</p>
                  </div>
                  <div className="size-10 rounded-xl bg-muted/50 flex items-center justify-center">
                    <CheckCircle2 className="size-5 text-muted-foreground" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Hourly Chart */}
          <Card className="border shadow-sm">
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <BarChart3 className="size-4" />
                {t('hourlyConsumptionProduction')}
              </CardTitle>
              <CardDescription>{t('hourlyEnergyProfile')}</CardDescription>
            </CardHeader>
            <CardContent>
              <ProfessionalAreaChart
                data={hourlyData}
                xAxisKey="saat"
                height={350}
                areas={[
                  { dataKey: 'tuketim', name: `${t('consumption')} (kW)`, color: '#3b82f6', gradientId: 'blueGradient' },
                  { dataKey: 'uretim', name: `${t('production')} (kW)`, color: '#10b981', gradientId: 'greenGradient' },
                ]}
              />
            </CardContent>
          </Card>

          {/* Period Summary & Alerts */}
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Period Summary */}
            <Card className="border shadow-sm">
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <Clock className="size-4" />
                  {t('timePeriodSummary')}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {periodSummary.map((period, idx) => (
                  <div key={idx} className="flex items-center gap-4 p-3 rounded-lg border bg-muted/30">
                    <div className={`size-10 rounded-xl bg-${period.renk}-500/15 flex items-center justify-center`}>
                      <period.icon className={`size-5 text-${period.renk}-600`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">{period.period}</span>
                        <span className="text-xs text-muted-foreground">{period.time}</span>
                      </div>
                      <div className="flex items-center justify-between mt-1">
                        <span className="text-xs text-muted-foreground">{t('total')}: {period.tuketim} kWh</span>
                        <span className="text-xs font-medium">{t('average')}: {period.ort} kW</span>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Daily Alerts */}
            <Card className="border shadow-sm">
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <AlertTriangle className="size-4" />
                  {t('dailyNotifications')}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {dailyAlerts.map((alert, idx) => (
                  <div 
                    key={idx} 
                    className={`flex items-start gap-3 p-3 rounded-lg border ${
                      alert.tip === 'warning' ? 'bg-amber-50 dark:bg-amber-950/30 border-amber-200 dark:border-amber-800' :
                      alert.tip === 'success' ? 'bg-green-50 dark:bg-green-950/30 border-green-200 dark:border-green-800' :
                      'bg-blue-50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-800'
                    }`}
                  >
                    {alert.tip === 'warning' ? (
                      <AlertTriangle className="size-4 text-amber-600 mt-0.5 flex-shrink-0" />
                    ) : alert.tip === 'success' ? (
                      <CheckCircle2 className="size-4 text-green-600 mt-0.5 flex-shrink-0" />
                    ) : (
                      <Clock className="size-4 text-blue-600 mt-0.5 flex-shrink-0" />
                    )}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm">{alert.mesaj}</p>
                      <p className="text-xs text-muted-foreground mt-1">{alert.zaman}</p>
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
