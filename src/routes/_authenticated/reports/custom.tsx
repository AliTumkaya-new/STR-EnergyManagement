// Manual custom route - timestamp: 2025-12-02
import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import {
  Download, Zap,
  Sun, Target, BarChart3,
  FileText, RefreshCw, CalendarClock, Filter,
  CheckCircle2, Loader2, Settings
} from 'lucide-react'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'

const reportTemplates = [
  { 
    id: 'energy-summary', 
    baslik: 'Enerji Özeti', 
    aciklama: 'Tüketim, üretim ve maliyet özeti',
    icon: Zap,
    renk: 'blue'
  },
  { 
    id: 'production-analysis', 
    baslik: 'Üretim Analizi', 
    aciklama: 'Solar ve rüzgar üretim detayları',
    icon: Sun,
    renk: 'amber'
  },
  { 
    id: 'cost-breakdown', 
    baslik: 'Maliyet Dökümü', 
    aciklama: 'Tarife ve kategori bazlı maliyetler',
    icon: Target,
    renk: 'green'
  },
  { 
    id: 'performance', 
    baslik: 'Performans Raporu', 
    aciklama: 'KPI ve hedef takibi',
    icon: BarChart3,
    renk: 'purple'
  },
]

const availableMetrics = [
  { id: 'tuketim', label: 'Enerji Tüketimi', kategori: 'enerji' },
  { id: 'uretim', label: 'Enerji Üretimi', kategori: 'enerji' },
  { id: 'sebekecekis', label: 'Şebeke Çekişi', kategori: 'enerji' },
  { id: 'ozuketim', label: 'Özüketim Oranı', kategori: 'enerji' },
  { id: 'maliyet', label: 'Toplam Maliyet', kategori: 'finansal' },
  { id: 'tasarruf', label: 'Enerji Tasarrufu', kategori: 'finansal' },
  { id: 'karbon', label: 'Karbon Emisyonu', kategori: 'cevre' },
  { id: 'verimlilik', label: 'Enerji Verimliliği', kategori: 'performans' },
  { id: 'pik', label: 'Pik Talepler', kategori: 'performans' },
  { id: 'kapasite', label: 'Kapasite Faktörü', kategori: 'performans' },
]

const dateRangeOptions = [
  { value: 'last-7-days', label: 'Son 7 Gün' },
  { value: 'last-30-days', label: 'Son 30 Gün' },
  { value: 'current-month', label: 'Bu Ay' },
  { value: 'last-month', label: 'Geçen Ay' },
  { value: 'current-quarter', label: 'Bu Çeyrek' },
  { value: 'current-year', label: 'Bu Yıl' },
  { value: 'custom', label: 'Özel Tarih Aralığı' },
]

function ManualReportsCustomComponent() {
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null)
  const [selectedMetrics, setSelectedMetrics] = useState<string[]>([])
  const [selectedDateRange, setSelectedDateRange] = useState('last-30-days')
  const [customStartDate, setCustomStartDate] = useState('')
  const [customEndDate, setCustomEndDate] = useState('')
  const [reportTitle, setReportTitle] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)

  const handleTemplateSelect = (templateId: string) => {
    setSelectedTemplate(templateId)
    // Template seçimine göre otomatik metrik seçimi
    switch (templateId) {
      case 'energy-summary':
        setSelectedMetrics(['tuketim', 'uretim', 'ozuketim', 'maliyet'])
        setReportTitle('Enerji Özet Raporu')
        break
      case 'production-analysis':
        setSelectedMetrics(['uretim', 'kapasite', 'verimlilik'])
        setReportTitle('Üretim Analiz Raporu')
        break
      case 'cost-breakdown':
        setSelectedMetrics(['maliyet', 'tasarruf', 'sebekecekis'])
        setReportTitle('Maliyet Dökümü Raporu')
        break
      case 'performance':
        setSelectedMetrics(['verimlilik', 'pik', 'ozuketim', 'karbon'])
        setReportTitle('Performans Değerlendirme Raporu')
        break
    }
  }

  const handleMetricToggle = (metricId: string) => {
    setSelectedMetrics(prev => 
      prev.includes(metricId)
        ? prev.filter(id => id !== metricId)
        : [...prev, metricId]
    )
  }

  const generateReport = async () => {
    setIsGenerating(true)
    // Simüle edilmiş rapor oluşturma
    await new Promise(resolve => setTimeout(resolve, 2000))
    setIsGenerating(false)
    // Gerçek uygulamada burada rapor oluşturma işlemi olurdu
  }

  const getMetricsByCategory = (category: string) => {
    return availableMetrics.filter(metric => metric.kategori === category)
  }

  const getTemplateColor = (color: string) => {
    const colors = {
      blue: 'from-blue-50 to-blue-100/50 dark:from-blue-950/40 dark:to-blue-900/20 border-blue-500/20',
      amber: 'from-amber-50 to-amber-100/50 dark:from-amber-950/40 dark:to-amber-900/20 border-amber-500/20',
      green: 'from-green-50 to-green-100/50 dark:from-green-950/40 dark:to-green-900/20 border-green-500/20',
      purple: 'from-purple-50 to-purple-100/50 dark:from-purple-950/40 dark:to-purple-900/20 border-purple-500/20',
    }
    return colors[color as keyof typeof colors] || colors.blue
  }

  return (
    <>
      <Header fixed>
        <div className="ml-auto flex items-center gap-2">
          <Button size="sm" variant="outline" className="gap-2">
            <RefreshCw className="size-4" />
            Sıfırla
          </Button>
          <Button 
            size="sm" 
            className="gap-2" 
            onClick={generateReport}
            disabled={!selectedTemplate || selectedMetrics.length === 0 || isGenerating}
          >
            {isGenerating ? (
              <Loader2 className="size-4 animate-spin" />
            ) : (
              <Download className="size-4" />
            )}
            <span className="hidden sm:inline">
              {isGenerating ? 'Oluşturuluyor...' : 'Rapor Oluştur'}
            </span>
          </Button>
        </div>
      </Header>

      <Main className="pt-0">
        <div className="space-y-6 pt-6">
          {/* Page Header */}
          <div className="flex items-center gap-4">
            <div className="flex items-center justify-center size-12 rounded-xl bg-gradient-to-br from-orange-500/20 to-red-500/10 border border-orange-500/20">
              <Settings className="size-6 text-orange-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight">Özel Rapor Oluşturucu</h1>
              <p className="text-sm text-muted-foreground">Kişiselleştirilmiş analiz raporları</p>
            </div>
          </div>
          {/* Şablon Seçimi */}
          <Card className="border shadow-sm">
            <CardHeader className="pb-4">
              <CardTitle className="text-base flex items-center gap-2">
                <FileText className="size-4" />
                Rapor Şablonu Seçin
              </CardTitle>
              <CardDescription>
                Hazır şablonlardan birini seçin veya özel rapor oluşturun
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {reportTemplates.map((template) => {
                  const IconComponent = template.icon
                  return (
                    <Card
                      key={template.id}
                      className={`cursor-pointer transition-all border-2 ${
                        selectedTemplate === template.id
                          ? `bg-gradient-to-br ${getTemplateColor(template.renk)} border-current`
                          : 'border-border hover:border-muted-foreground/50'
                      }`}
                      onClick={() => handleTemplateSelect(template.id)}
                    >
                      <CardContent className="p-4 text-center space-y-3">
                        <div className="flex justify-center">
                          <div className={`size-10 rounded-lg bg-${template.renk}-500/15 flex items-center justify-center`}>
                            <IconComponent className={`size-5 text-${template.renk}-600`} />
                          </div>
                        </div>
                        <div>
                          <p className="font-medium text-sm">{template.baslik}</p>
                          <p className="text-xs text-muted-foreground mt-1">
                            {template.aciklama}
                          </p>
                        </div>
                        {selectedTemplate === template.id && (
                          <Badge variant="secondary" className="text-xs">
                            <CheckCircle2 className="size-3 mr-1" />
                            Seçildi
                          </Badge>
                        )}
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            </CardContent>
          </Card>

          <div className="grid lg:grid-cols-2 gap-6">
            {/* Metrik Seçimi */}
            <Card className="border shadow-sm">
              <CardHeader className="pb-4">
                <CardTitle className="text-base flex items-center gap-2">
                  <Filter className="size-4" />
                  Dahil Edilecek Metrikler
                </CardTitle>
                <CardDescription>
                  Raporunuzda görmek istediğiniz metrikleri seçin
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {['enerji', 'finansal', 'cevre', 'performans'].map((kategori) => (
                  <div key={kategori}>
                    <h4 className="font-medium text-sm mb-2 capitalize">
                      {kategori === 'enerji' ? 'Enerji' : 
                       kategori === 'finansal' ? 'Finansal' :
                       kategori === 'cevre' ? 'Çevre' : 'Performans'} Metrikleri
                    </h4>
                    <div className="space-y-2">
                      {getMetricsByCategory(kategori).map((metric) => (
                        <div key={metric.id} className="flex items-center space-x-2">
                          <Checkbox 
                            id={metric.id}
                            checked={selectedMetrics.includes(metric.id)}
                            onCheckedChange={() => handleMetricToggle(metric.id)}
                          />
                          <Label 
                            htmlFor={metric.id} 
                            className="text-sm font-normal cursor-pointer"
                          >
                            {metric.label}
                          </Label>
                        </div>
                      ))}
                    </div>
                    {kategori !== 'performans' && <Separator className="mt-3" />}
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Tarih Aralığı ve Ayarlar */}
            <Card className="border shadow-sm">
              <CardHeader className="pb-4">
                <CardTitle className="text-base flex items-center gap-2">
                  <CalendarClock className="size-4" />
                  Rapor Ayarları
                </CardTitle>
                <CardDescription>
                  Tarih aralığı ve rapor detaylarını belirleyin
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="report-title" className="text-sm font-medium">
                    Rapor Başlığı
                  </Label>
                  <Input
                    id="report-title"
                    placeholder="Rapor başlığı girin..."
                    value={reportTitle}
                    onChange={(e) => setReportTitle(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-medium">Tarih Aralığı</Label>
                  <div className="grid grid-cols-2 gap-2">
                    {dateRangeOptions.map((option) => (
                      <Button
                        key={option.value}
                        size="sm"
                        variant={selectedDateRange === option.value ? 'default' : 'outline'}
                        onClick={() => setSelectedDateRange(option.value)}
                        className="text-xs h-8"
                      >
                        {option.label}
                      </Button>
                    ))}
                  </div>
                </div>

                {selectedDateRange === 'custom' && (
                  <div className="grid grid-cols-2 gap-2">
                    <div className="space-y-1">
                      <Label htmlFor="start-date" className="text-xs">Başlangıç</Label>
                      <Input
                        id="start-date"
                        type="date"
                        value={customStartDate}
                        onChange={(e) => setCustomStartDate(e.target.value)}
                        className="h-8"
                      />
                    </div>
                    <div className="space-y-1">
                      <Label htmlFor="end-date" className="text-xs">Bitiş</Label>
                      <Input
                        id="end-date"
                        type="date"
                        value={customEndDate}
                        onChange={(e) => setCustomEndDate(e.target.value)}
                        className="h-8"
                      />
                    </div>
                  </div>
                )}

                <Separator />

                <div className="space-y-3">
                  <Label className="text-sm font-medium">Rapor Özeti</Label>
                  <div className="p-3 rounded-lg bg-muted/50 text-sm space-y-1">
                    <p>
                      <span className="font-medium">Şablon:</span>{' '}
                      {selectedTemplate 
                        ? reportTemplates.find(t => t.id === selectedTemplate)?.baslik
                        : 'Seçilmedi'
                      }
                    </p>
                    <p>
                      <span className="font-medium">Metrikler:</span>{' '}
                      {selectedMetrics.length > 0 ? `${selectedMetrics.length} adet` : 'Seçilmedi'}
                    </p>
                    <p>
                      <span className="font-medium">Tarih:</span>{' '}
                      {dateRangeOptions.find(o => o.value === selectedDateRange)?.label}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </Main>
    </>
  )
}

export const Route = createFileRoute('/_authenticated/reports/custom')({
  component: ManualReportsCustomComponent,
})
