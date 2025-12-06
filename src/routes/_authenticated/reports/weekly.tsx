// Manual weekly route - timestamp: 2025-12-02
import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import {
  Download, Zap, TrendingUp,
  ArrowUpRight, ArrowDownRight, Sun, BarChart3,
  CheckCircle2, RefreshCw, CalendarDays
} from 'lucide-react'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue
} from '@/components/ui/select'
import {
  BarChart, Bar,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts'

const weeklyData = [
  { gun: 'Pazartesi', tuketim: 8500, uretim: 3800, maliyet: 2850 },
  { gun: 'Salı', tuketim: 8750, uretim: 4200, maliyet: 2720 },
  { gun: 'Çarşamba', tuketim: 9200, uretim: 4100, maliyet: 3050 },
  { gun: 'Perşembe', tuketim: 8900, uretim: 3950, maliyet: 2950 },
  { gun: 'Cuma', tuketim: 8650, uretim: 4350, maliyet: 2580 },
  { gun: 'Cumartesi', tuketim: 5200, uretim: 4500, maliyet: 420 },
  { gun: 'Pazar', tuketim: 4800, uretim: 4200, maliyet: 360 },
]

const weekComparison = [
  { metrik: 'Toplam Tüketim', buHafta: '54,000 kWh', gecenHafta: '56,200 kWh', degisim: -3.9 },
  { metrik: 'Toplam Üretim', buHafta: '29,100 kWh', gecenHafta: '27,500 kWh', degisim: 5.8 },
  { metrik: 'Şebeke Çekişi', buHafta: '24,900 kWh', gecenHafta: '28,700 kWh', degisim: -13.2 },
  { metrik: 'Toplam Maliyet', buHafta: '₺14,930', gecenHafta: '₺16,850', degisim: -11.4 },
]

const peakValues = [
  { gun: 'Pzt', saat: '14:30', deger: 612 },
  { gun: 'Sal', saat: '15:00', deger: 628 },
  { gun: 'Çar', saat: '14:45', deger: 645 },
  { gun: 'Per', saat: '14:15', deger: 618 },
  { gun: 'Cum', saat: '11:30', deger: 595 },
  { gun: 'Cmt', saat: '12:00', deger: 385 },
  { gun: 'Paz', saat: '13:30', deger: 342 },
]

function ManualWeeklyComponent() {
  const [selectedWeek, setSelectedWeek] = useState('this-week')

  return (
    <>
      <Header fixed>
        <div className="ml-auto flex items-center gap-2">
          <Select value={selectedWeek} onValueChange={setSelectedWeek}>
            <SelectTrigger className="w-[140px] h-9">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="this-week">Bu Hafta</SelectItem>
              <SelectItem value="last-week">Geçen Hafta</SelectItem>
              <SelectItem value="custom">Hafta Seç</SelectItem>
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

      <Main className="pt-0">
        <div className="space-y-6 pt-6">
          {/* Page Header */}
          <div className="flex items-center gap-4">
            <div className="flex items-center justify-center size-12 rounded-xl bg-muted/50 border border-border">
              <CalendarDays className="size-6 text-muted-foreground" />
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight">Haftalık Rapor</h1>
              <p className="text-sm text-muted-foreground">25 Kasım - 1 Aralık 2025</p>
            </div>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="border bg-card hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Haftalık Tüketim</p>
                    <p className="text-2xl font-bold text-foreground">54,000</p>
                    <p className="text-xs text-muted-foreground">kWh</p>
                  </div>
                  <div className="size-9 rounded-lg bg-muted/50 flex items-center justify-center">
                    <Zap className="size-4 text-muted-foreground" />
                  </div>
                </div>
                <div className="flex items-center gap-1 mt-2">
                  <ArrowDownRight className="size-3 text-green-600" />
                  <span className="text-xs text-green-600 font-medium">-3.9%</span>
                  <span className="text-xs text-muted-foreground">vs geçen hafta</span>
                </div>
              </CardContent>
            </Card>

            <Card className="border bg-card hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Haftalık Üretim</p>
                    <p className="text-2xl font-bold text-foreground">29,100</p>
                    <p className="text-xs text-muted-foreground">kWh</p>
                  </div>
                  <div className="size-9 rounded-lg bg-muted/50 flex items-center justify-center">
                    <Sun className="size-4 text-muted-foreground" />
                  </div>
                </div>
                <div className="flex items-center gap-1 mt-2">
                  <ArrowUpRight className="size-3 text-green-600" />
                  <span className="text-xs text-green-600 font-medium">+5.8%</span>
                  <span className="text-xs text-muted-foreground">vs geçen hafta</span>
                </div>
              </CardContent>
            </Card>

            <Card className="border bg-card hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Ortalama Pik</p>
                    <p className="text-2xl font-bold text-foreground">586</p>
                    <p className="text-xs text-muted-foreground">kW</p>
                  </div>
                  <div className="size-9 rounded-lg bg-muted/50 flex items-center justify-center">
                    <TrendingUp className="size-4 text-muted-foreground" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border bg-card hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Haftalık Maliyet</p>
                    <p className="text-2xl font-bold text-foreground">₺14,930</p>
                    <p className="text-xs text-muted-foreground">toplam</p>
                  </div>
                  <div className="size-9 rounded-lg bg-muted/50 flex items-center justify-center">
                    <CheckCircle2 className="size-4 text-muted-foreground" />
                  </div>
                </div>
                <div className="flex items-center gap-1 mt-2">
                  <ArrowDownRight className="size-3 text-green-600" />
                  <span className="text-xs text-green-600 font-medium">-11.4%</span>
                  <span className="text-xs text-muted-foreground">vs geçen hafta</span>
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
                    Günlük Tüketim ve Üretim
                  </CardTitle>
                  <CardDescription>7 günlük enerji profili</CardDescription>
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
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={320}>
                <BarChart data={weeklyData}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis dataKey="gun" className="text-xs" tick={{ fontSize: 10 }} />
                  <YAxis className="text-xs" tick={{ fontSize: 10 }} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'hsl(var(--background))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px',
                      fontSize: '12px'
                    }}
                    formatter={(value: number, name: string) => [
                      name === 'maliyet' ? `₺${value}` : `${value} kWh`,
                      name === 'tuketim' ? 'Tüketim' : name === 'uretim' ? 'Üretim' : 'Maliyet'
                    ]}
                  />
                  <Legend />
                  <Bar dataKey="tuketim" fill="#3b82f6" name="Tüketim (kWh)" />
                  <Bar dataKey="uretim" fill="#10b981" name="Üretim (kWh)" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <div className="grid lg:grid-cols-2 gap-6">
            <Card className="border shadow-sm">
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2">
                  <CheckCircle2 className="size-4" />
                  Haftalık Karşılaştırma
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {weekComparison.map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 rounded-lg border bg-muted/30">
                    <div>
                      <p className="text-sm font-medium">{item.metrik}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs text-muted-foreground">Bu hafta: {item.buHafta}</span>
                        <span className="text-xs text-muted-foreground">Geçen: {item.gecenHafta}</span>
                      </div>
                    </div>
                    <Badge variant={item.degisim < 0 ? 'default' : 'secondary'} className="text-xs">
                      {item.degisim > 0 ? '+' : ''}{item.degisim}%
                    </Badge>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="border shadow-sm">
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2">
                  <TrendingUp className="size-4" />
                  Günlük Pik Değerler
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {peakValues.map((peak, idx) => (
                  <div key={idx} className="flex items-center justify-between p-2 rounded border">
                    <div className="flex items-center gap-2">
                      <div className="size-6 rounded bg-muted flex items-center justify-center text-xs font-medium">
                        {peak.gun}
                      </div>
                      <span className="text-sm text-muted-foreground">{peak.saat}</span>
                    </div>
                    <span className="text-sm font-medium">{peak.deger} kW</span>
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

export const Route = createFileRoute('/_authenticated/reports/weekly')({
  component: ManualWeeklyComponent,
})
