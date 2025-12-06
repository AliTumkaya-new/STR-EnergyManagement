// Manual monthly route - timestamp: 2025-12-02  
import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import {
  Download, TrendingUp,
  ArrowUpRight, ArrowDownRight, BarChart3,
  CheckCircle2, RefreshCw, PieChart, Calendar
} from 'lucide-react'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue
} from '@/components/ui/select'
import {
  BarChart, Bar, LineChart, Line,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  PieChart as RePieChart, Pie, Cell
} from 'recharts'

const monthlyData = [
  { hafta: 'Hafta 1', tuketim: 52000, uretim: 28500, maliyet: 14200 },
  { hafta: 'Hafta 2', tuketim: 54500, uretim: 29100, maliyet: 15300 },
  { hafta: 'Hafta 3', tuketim: 51200, uretim: 31200, maliyet: 12000 },
  { hafta: 'Hafta 4', tuketim: 53800, uretim: 30400, maliyet: 14100 },
]

const categoryDistribution = [
  { name: 'Üretim', value: 45, color: '#3b82f6' },
  { name: 'HVAC', value: 28, color: '#10b981' },
  { name: 'Aydınlatma', value: 15, color: '#f59e0b' },
  { name: 'Diğer', value: 12, color: '#8b5cf6' },
]

const monthComparison = [
  { metrik: 'Toplam Tüketim', buAy: '211,500 kWh', gecenAy: '224,800 kWh', degisim: -5.9 },
  { metrik: 'Toplam Üretim', buAy: '119,200 kWh', gecenAy: '108,500 kWh', degisim: 9.9 },
  { metrik: 'Özüketim Oranı', buAy: '%56.4', gecenAy: '%48.3', degisim: 16.8 },
  { metrik: 'Toplam Maliyet', buAy: '₺55,600', gecenAy: '₺68,200', degisim: -18.5 },
  { metrik: 'Karbon Emisyonu', buAy: '89.2 ton', gecenAy: '102.4 ton', degisim: -12.9 },
]

const dailyAverages = Array.from({ length: 30 }, (_, i) => ({
  gun: (i + 1).toString(),
  ort: Math.floor(Math.random() * 2000) + 6000
}))

const performanceMetrics = [
  { metrik: 'Enerji Verimliliği', deger: '87%', hedef: '85%', durum: 'hedef-asildi' },
  { metrik: 'Güneş Performansı', deger: '92%', hedef: '90%', durum: 'hedef-asildi' },
  { metrik: 'Grid Bağımlılığı', deger: '43%', hedef: '45%', durum: 'hedef-asildi' },
  { metrik: 'Maliyet Optimizasyon', deger: '78%', hedef: '80%', durum: 'hedef-alti' },
]

function ManualReportsMonthlyComponent() {
  const [selectedMonth, setSelectedMonth] = useState('current')
  const [activeTab, setActiveTab] = useState('overview')

  return (
    <>
      <Header fixed>
        <div className="ml-auto flex items-center gap-2">
          <Select value={selectedMonth} onValueChange={setSelectedMonth}>
            <SelectTrigger className="w-[140px] h-9">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="current">Bu Ay</SelectItem>
              <SelectItem value="last">Geçen Ay</SelectItem>
              <SelectItem value="custom">Ay Seç</SelectItem>
            </SelectContent>
          </Select>
          <Button size="sm" variant="outline" className="gap-2">
            <RefreshCw className="size-4" />
          </Button>
          <Button size="sm" className="gap-2">
            <Download className="size-4" />
            <span className="hidden sm:inline">Rapor İndir</span>
          </Button>
        </div>
      </Header>

      <Main className="pt-0">
        <div className="space-y-6 pt-6">
          {/* Page Header */}
          <div className="flex items-center gap-4">
            <div className="flex items-center justify-center size-12 rounded-xl bg-muted/50 border border-border">
              <Calendar className="size-6 text-muted-foreground" />
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight">Aylık Rapor</h1>
              <p className="text-sm text-muted-foreground">Kasım 2025</p>
            </div>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="border bg-card hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Aylık Tüketim</p>
                    <p className="text-2xl font-bold text-foreground">211.5k</p>
                    <p className="text-xs text-muted-foreground">kWh</p>
                  </div>
                  <div className="size-9 rounded-lg bg-muted/50 flex items-center justify-center">
                    <BarChart3 className="size-4 text-muted-foreground" />
                  </div>
                </div>
                <div className="flex items-center gap-1 mt-2">
                  <ArrowDownRight className="size-3 text-green-600" />
                  <span className="text-xs text-green-600 font-medium">-5.9%</span>
                  <span className="text-xs text-muted-foreground">vs geçen ay</span>
                </div>
              </CardContent>
            </Card>

            <Card className="border bg-card hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Aylık Üretim</p>
                    <p className="text-2xl font-bold text-foreground">119.2k</p>
                    <p className="text-xs text-muted-foreground">kWh</p>
                  </div>
                  <div className="size-9 rounded-lg bg-muted/50 flex items-center justify-center">
                    <TrendingUp className="size-4 text-muted-foreground" />
                  </div>
                </div>
                <div className="flex items-center gap-1 mt-2">
                  <ArrowUpRight className="size-3 text-green-600" />
                  <span className="text-xs text-green-600 font-medium">+9.9%</span>
                  <span className="text-xs text-muted-foreground">vs geçen ay</span>
                </div>
              </CardContent>
            </Card>

            <Card className="border bg-card hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Özüketim Oranı</p>
                    <p className="text-2xl font-bold text-foreground">56.4%</p>
                    <p className="text-xs text-muted-foreground">oran</p>
                  </div>
                  <div className="size-9 rounded-lg bg-muted/50 flex items-center justify-center">
                    <PieChart className="size-4 text-muted-foreground" />
                  </div>
                </div>
                <div className="flex items-center gap-1 mt-2">
                  <ArrowUpRight className="size-3 text-green-600" />
                  <span className="text-xs text-green-600 font-medium">+16.8%</span>
                  <span className="text-xs text-muted-foreground">vs geçen ay</span>
                </div>
              </CardContent>
            </Card>

            <Card className="border bg-card hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Toplam Maliyet</p>
                    <p className="text-2xl font-bold text-foreground">₺55.6k</p>
                    <p className="text-xs text-muted-foreground">toplam</p>
                  </div>
                  <div className="size-9 rounded-lg bg-muted/50 flex items-center justify-center">
                    <CheckCircle2 className="size-4 text-muted-foreground" />
                  </div>
                </div>
                <div className="flex items-center gap-1 mt-2">
                  <ArrowDownRight className="size-3 text-green-600" />
                  <span className="text-xs text-green-600 font-medium">-18.5%</span>
                  <span className="text-xs text-muted-foreground">vs geçen ay</span>
                </div>
              </CardContent>
            </Card>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="overview">Genel Bakış</TabsTrigger>
              <TabsTrigger value="comparison">Karşılaştırma</TabsTrigger>
              <TabsTrigger value="performance">Performans</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <div className="grid lg:grid-cols-2 gap-6">
                <Card className="border shadow-sm">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base flex items-center gap-2">
                      <BarChart3 className="size-4" />
                      Haftalık Trend
                    </CardTitle>
                    <CardDescription>Aylık enerji dağılımı</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={280}>
                      <BarChart data={monthlyData}>
                        <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                        <XAxis dataKey="hafta" className="text-xs" tick={{ fontSize: 10 }} />
                        <YAxis className="text-xs" tick={{ fontSize: 10 }} />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: 'hsl(var(--background))',
                            border: '1px solid hsl(var(--border))',
                            borderRadius: '8px',
                            fontSize: '12px'
                          }}
                        />
                        <Legend />
                        <Bar dataKey="tuketim" fill="#3b82f6" name="Tüketim (kWh)" />
                        <Bar dataKey="uretim" fill="#10b981" name="Üretim (kWh)" />
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                <Card className="border shadow-sm">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base flex items-center gap-2">
                      <PieChart className="size-4" />
                      Kategori Dağılımı
                    </CardTitle>
                    <CardDescription>Tüketim kategorileri</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={280}>
                      <RePieChart>
                        <Pie
                          data={categoryDistribution}
                          cx="50%"
                          cy="50%"
                          outerRadius={80}
                          dataKey="value"
                          label={({ name, value }) => `${name}: ${value}%`}
                        >
                          {categoryDistribution.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </RePieChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </div>

              <Card className="border shadow-sm">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">Günlük Ortalamalar</CardTitle>
                  <CardDescription>30 günlük tüketim trendi</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={200}>
                    <LineChart data={dailyAverages}>
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
                      />
                      <Line
                        type="monotone"
                        dataKey="ort"
                        stroke="#3b82f6"
                        strokeWidth={2}
                        dot={{ fill: '#3b82f6', strokeWidth: 2, r: 3 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="comparison" className="space-y-4">
              <Card className="border shadow-sm">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base flex items-center gap-2">
                    <CheckCircle2 className="size-4" />
                    Aylık Karşılaştırma
                  </CardTitle>
                  <CardDescription>Bu ay vs geçen ay performans</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {monthComparison.map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between p-4 rounded-lg border bg-muted/30">
                      <div className="space-y-1">
                        <p className="text-sm font-medium">{item.metrik}</p>
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          <span>Bu ay: {item.buAy}</span>
                          <span>Geçen ay: {item.gecenAy}</span>
                        </div>
                      </div>
                      <Badge 
                        variant={Math.abs(item.degisim) < 5 ? 'secondary' : item.degisim < 0 ? 'default' : 'destructive'} 
                        className="text-xs"
                      >
                        {item.degisim > 0 ? '+' : ''}{item.degisim}%
                      </Badge>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="performance" className="space-y-4">
              <Card className="border shadow-sm">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base flex items-center gap-2">
                    <TrendingUp className="size-4" />
                    Performans Metrikleri
                  </CardTitle>
                  <CardDescription>Aylık hedef karşılaştırması</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {performanceMetrics.map((metric, idx) => (
                    <div key={idx} className="flex items-center justify-between p-4 rounded-lg border bg-muted/30">
                      <div className="space-y-1">
                        <p className="text-sm font-medium">{metric.metrik}</p>
                        <div className="flex items-center gap-2">
                          <span className="text-lg font-semibold">{metric.deger}</span>
                          <span className="text-xs text-muted-foreground">/ {metric.hedef} hedef</span>
                        </div>
                      </div>
                      <Badge 
                        variant={metric.durum === 'hedef-asildi' ? 'default' : 'secondary'}
                        className="text-xs"
                      >
                        {metric.durum === 'hedef-asildi' ? 'Hedef Aşıldı' : 'Hedef Altı'}
                      </Badge>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </Main>
    </>
  )
}

export const Route = createFileRoute('/_authenticated/reports/monthly')({
  component: ManualReportsMonthlyComponent,
})
