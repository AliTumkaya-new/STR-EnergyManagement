import { useState } from 'react'
import {
  Calendar, Download, Zap,
  Sun, Target, BarChart3,
  FileText, Settings2, RefreshCw, CalendarClock, Filter,
  CheckCircle2, Loader2
} from 'lucide-react'
import { useLanguage } from '@/lib/i18n'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue
} from '@/components/ui/select'

// Rapor şablonları
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

// Son oluşturulan raporlar
const recentReports = [
  { 
    baslik: 'Kasım 2024 Enerji Özeti', 
    tarihAraligi: '01 Kas - 30 Kas 2024',
    olusturma: '01 Ara 2024, 09:15',
    format: 'PDF',
    boyut: '2.4 MB'
  },
  { 
    baslik: 'Q3 2024 Performans', 
    tarihAraligi: '01 Tem - 30 Eyl 2024',
    olusturma: '05 Eki 2024, 14:30',
    format: 'Excel',
    boyut: '1.8 MB'
  },
  { 
    baslik: 'Ekim Solar Üretim', 
    tarihAraligi: '01 Eki - 31 Eki 2024',
    olusturma: '02 Kas 2024, 10:00',
    format: 'PDF',
    boyut: '1.2 MB'
  },
]

// Metrik seçenekleri
const metricOptions = [
  { id: 'consumption', label: 'Toplam Tüketim' },
  { id: 'production', label: 'Toplam Üretim' },
  { id: 'cost', label: 'Maliyet Analizi' },
  { id: 'peak', label: 'Pik Değerler' },
  { id: 'efficiency', label: 'Verimlilik Metrikleri' },
  { id: 'carbon', label: 'Karbon Emisyonu' },
]

export function ReportsCustom() {
  const { t, language } = useLanguage()
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null)
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [selectedMetrics, setSelectedMetrics] = useState<string[]>(['consumption', 'production', 'cost'])
  const [reportFormat, setReportFormat] = useState('pdf')
  const [isGenerating, setIsGenerating] = useState(false)
  const [showPreview, setShowPreview] = useState(false)

  const handleMetricToggle = (metricId: string) => {
    setSelectedMetrics(prev => 
      prev.includes(metricId) 
        ? prev.filter(id => id !== metricId)
        : [...prev, metricId]
    )
  }

  const handleGenerate = () => {
    setIsGenerating(true)
    setTimeout(() => {
      setIsGenerating(false)
      setShowPreview(true)
    }, 2000)
  }

  return (
    <>
      <Header fixed>
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center size-10 rounded-xl bg-muted/50 border border-border">
            <CalendarClock className="size-5 text-muted-foreground" />
          </div>
          <div>
            <h1 className="text-lg font-semibold tracking-tight">{t('customReport')}</h1>
            <p className="text-xs text-muted-foreground">{t('defineReportParameters')}</p>
          </div>
        </div>
        <div className="ml-auto flex items-center gap-2">
          <Button size="sm" variant="outline" className="gap-2">
            <RefreshCw className="size-4" />
          </Button>
        </div>
      </Header>

      <Main>
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Report Builder */}
          <div className="lg:col-span-2 space-y-6">
            {/* Template Selection */}
            <Card className="border shadow-sm">
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <FileText className="size-4" />
                  {t('reportTemplate')}
                </CardTitle>
                <CardDescription>{t('selectTemplateOrCreate')}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid sm:grid-cols-2 gap-3">
                  {reportTemplates.map((template) => (
                    <div
                      key={template.id}
                      onClick={() => setSelectedTemplate(template.id === selectedTemplate ? null : template.id)}
                      className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                        selectedTemplate === template.id 
                          ? 'border-primary bg-primary/5' 
                          : 'border-transparent bg-muted/50 hover:border-muted-foreground/20'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className="size-10 rounded-lg bg-muted/50 flex items-center justify-center">
                          <template.icon className="size-5 text-muted-foreground" />
                        </div>
                        <div>
                          <p className="text-sm font-medium">{template.baslik}</p>
                          <p className="text-xs text-muted-foreground mt-0.5">{template.aciklama}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Date Range */}
            <Card className="border shadow-sm">
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <Calendar className="size-4" />
                  {t('dateRange')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="startDate">{t('startDate')}</Label>
                    <Input 
                      type="date" 
                      id="startDate"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="endDate">{t('endDate')}</Label>
                    <Input 
                      type="date" 
                      id="endDate"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                    />
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 mt-4">
                  <Button size="sm" variant="outline" onClick={() => {
                    const now = new Date()
                    const start = new Date(now.getFullYear(), now.getMonth(), 1)
                    setStartDate(start.toISOString().split('T')[0])
                    setEndDate(now.toISOString().split('T')[0])
                  }}>
                    {t('thisMonth')}
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => {
                    const now = new Date()
                    const start = new Date(now.getFullYear(), now.getMonth() - 1, 1)
                    const end = new Date(now.getFullYear(), now.getMonth(), 0)
                    setStartDate(start.toISOString().split('T')[0])
                    setEndDate(end.toISOString().split('T')[0])
                  }}>
                    {t('lastMonth')}
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => {
                    const now = new Date()
                    const quarter = Math.floor(now.getMonth() / 3)
                    const start = new Date(now.getFullYear(), quarter * 3, 1)
                    setStartDate(start.toISOString().split('T')[0])
                    setEndDate(now.toISOString().split('T')[0])
                  }}>
                    {t('thisQuarter')}
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => {
                    const now = new Date()
                    const start = new Date(now.getFullYear(), 0, 1)
                    setStartDate(start.toISOString().split('T')[0])
                    setEndDate(now.toISOString().split('T')[0])
                  }}>
                    {t('thisYear')}
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Metrics Selection */}
            <Card className="border shadow-sm">
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <Filter className="size-4" />
                  {t('reportMetrics')}
                </CardTitle>
                <CardDescription>{t('selectMetricsToInclude')}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid sm:grid-cols-2 gap-3">
                  {metricOptions.map((metric) => (
                    <div
                      key={metric.id}
                      className="flex items-center space-x-3 p-3 rounded-lg border bg-muted/30"
                    >
                      <Checkbox 
                        id={metric.id}
                        checked={selectedMetrics.includes(metric.id)}
                        onCheckedChange={() => handleMetricToggle(metric.id)}
                      />
                      <Label htmlFor={metric.id} className="text-sm cursor-pointer">
                        {metric.label}
                      </Label>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Format & Generate */}
            <Card className="border shadow-sm">
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <Settings2 className="size-4" />
                  {t('outputSettings')}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>{t('reportFormat')}</Label>
                  <Select value={reportFormat} onValueChange={setReportFormat}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pdf">{t('pdfReport')}</SelectItem>
                      <SelectItem value="excel">{t('excelFile')}</SelectItem>
                      <SelectItem value="csv">{t('csvFile')}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Separator />
                <div className="flex items-center gap-3">
                  <Button 
                    className="flex-1 gap-2" 
                    onClick={handleGenerate}
                    disabled={isGenerating || !startDate || !endDate || selectedMetrics.length === 0}
                  >
                    {isGenerating ? (
                      <>
                        <Loader2 className="size-4 animate-spin" />
                        {t('generating')}
                      </>
                    ) : (
                      <>
                        <FileText className="size-4" />
                        {t('generateReport')}
                      </>
                    )}
                  </Button>
                  <Button variant="outline" className="gap-2">
                    <Download className="size-4" />
                    {t('download')}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Summary */}
            <Card className="border shadow-sm">
              <CardHeader>
                <CardTitle className="text-base">{t('reportSummary')}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">{t('template')}</span>
                    <span className="font-medium">
                      {selectedTemplate 
                        ? reportTemplates.find(t => t.id === selectedTemplate)?.baslik 
                        : t('notSelected')}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">{t('dateRange')}</span>
                    <span className="font-medium">
                      {startDate && endDate 
                        ? `${new Date(startDate).toLocaleDateString(language === 'tr' ? 'tr-TR' : 'en-US')} - ${new Date(endDate).toLocaleDateString(language === 'tr' ? 'tr-TR' : 'en-US')}`
                        : t('notDetermined')}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">{t('metricCount')}</span>
                    <span className="font-medium">{selectedMetrics.length} {t('items')}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">{t('format')}</span>
                    <Badge variant="outline">{reportFormat.toUpperCase()}</Badge>
                  </div>
                </div>

                {showPreview && (
                  <div className="p-3 rounded-lg bg-muted/50 border">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="size-4 text-green-600" />
                      <span className="text-sm font-medium text-foreground">
                        {t('reportReady')}
                      </span>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Recent Reports */}
            <Card className="border shadow-sm">
              <CardHeader>
                <CardTitle className="text-base">{t('recentlyCreatedReports')}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {recentReports.map((rapor, idx) => (
                  <div 
                    key={idx} 
                    className="p-3 rounded-lg border bg-muted/30 hover:bg-muted/50 cursor-pointer transition-colors"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-sm font-medium">{rapor.baslik}</p>
                        <p className="text-xs text-muted-foreground mt-0.5">{rapor.tarihAraligi}</p>
                      </div>
                      <Badge variant="secondary" className="text-[10px]">{rapor.format}</Badge>
                    </div>
                    <div className="flex items-center justify-between mt-2 text-xs text-muted-foreground">
                      <span>{rapor.olusturma}</span>
                      <span>{rapor.boyut}</span>
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
