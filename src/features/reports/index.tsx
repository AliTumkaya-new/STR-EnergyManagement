import { useState, useMemo } from 'react'
import {
  FileText, Download, Calendar, Clock, Search,
  TrendingUp, TrendingDown, Zap,
  BarChart3, FileSpreadsheet, MoreVertical, Eye, Trash2,
  Share2, ArrowUpRight, ArrowDownRight, RefreshCw,
  CalendarDays, FileDown, Printer, Mail, CheckCircle2,
  AlertTriangle, Activity, Target, Plus,
  ChevronRight, Settings, FolderOpen,
  FileBarChart, PieChart
} from 'lucide-react'
import { useLanguage } from '@/lib/i18n'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Progress } from '@/components/ui/progress'
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter
} from '@/components/ui/dialog'
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue
} from '@/components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem,
  DropdownMenuSeparator, DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'

// Types
type ReportType = 'energy' | 'consumption' | 'efficiency' | 'cost' | 'maintenance' | 'environmental'
type ReportPeriod = 'daily' | 'weekly' | 'monthly' | 'quarterly' | 'yearly'
type ReportStatus = 'ready' | 'generating' | 'scheduled' | 'failed'

interface ReportMetric {
  label: string
  value: string
  change?: number
  trend?: 'up' | 'down' | 'stable'
}

interface Report {
  id: string
  title: string
  description: string
  type: ReportType
  period: ReportPeriod
  status: ReportStatus
  createdAt: string
  scheduledAt?: string
  completedAt?: string
  fileSize?: string
  pageCount?: number
  author: string
  recipients: string[]
  metrics: ReportMetric[]
  tags: string[]
}

// Config maps
const typeConfig: Record<ReportType, { icon: typeof Zap; labelKey: string; color: string; bgColor: string }> = {
  energy: { icon: Zap, labelKey: 'energy', color: 'text-muted-foreground', bgColor: 'bg-muted/50' },
  consumption: { icon: BarChart3, labelKey: 'consumption', color: 'text-muted-foreground', bgColor: 'bg-muted/50' },
  efficiency: { icon: Target, labelKey: 'efficiency', color: 'text-muted-foreground', bgColor: 'bg-muted/50' },
  cost: { icon: TrendingUp, labelKey: 'cost', color: 'text-muted-foreground', bgColor: 'bg-muted/50' },
  maintenance: { icon: Settings, labelKey: 'maintenance', color: 'text-muted-foreground', bgColor: 'bg-muted/50' },
  environmental: { icon: Activity, labelKey: 'environmental', color: 'text-muted-foreground', bgColor: 'bg-muted/50' }
}

const statusConfig: Record<ReportStatus, { icon: typeof CheckCircle2; labelKey: string; color: string; bgColor: string }> = {
  ready: { icon: CheckCircle2, labelKey: 'ready', color: 'text-green-600 dark:text-green-400', bgColor: 'bg-muted/50' },
  generating: { icon: RefreshCw, labelKey: 'generating', color: 'text-muted-foreground', bgColor: 'bg-muted/50' },
  scheduled: { icon: Calendar, labelKey: 'scheduled', color: 'text-amber-600 dark:text-amber-400', bgColor: 'bg-muted/50' },
  failed: { icon: AlertTriangle, labelKey: 'failed', color: 'text-red-600 dark:text-red-400', bgColor: 'bg-muted/50' }
}

const periodLabels: Record<ReportPeriod, string> = {
  daily: 'periodDaily',
  weekly: 'periodWeekly',
  monthly: 'periodMonthly',
  quarterly: 'periodQuarterly',
  yearly: 'periodYearly'
}

// Mock data
const mockReports: Report[] = [
  {
    id: 'RPT-001',
    title: 'Aylık Enerji Özet Raporu',
    description: 'Kasım 2024 genel enerji tüketim ve üretim özeti',
    type: 'energy',
    period: 'monthly',
    status: 'ready',
    createdAt: '2024-12-01T09:00:00',
    completedAt: '2024-12-01T09:02:34',
    fileSize: '2.4 MB',
    pageCount: 24,
    author: 'Sistem',
    recipients: ['yonetim@strenerji.com'],
    metrics: [
      { label: 'Toplam Tüketim', value: '45,820 kWh', change: -8.2, trend: 'down' },
      { label: 'Solar Üretim', value: '12,450 kWh', change: 15.3, trend: 'up' },
      { label: 'Şebeke', value: '33,370 kWh', change: -12.1, trend: 'down' }
    ],
    tags: ['Aylık', 'Enerji', 'Özet']
  },
  {
    id: 'RPT-002',
    title: 'Haftalık Maliyet Analizi',
    description: '25 Kas - 1 Ara haftası detaylı maliyet raporu',
    type: 'cost',
    period: 'weekly',
    status: 'ready',
    createdAt: '2024-12-02T06:00:00',
    completedAt: '2024-12-02T06:01:12',
    fileSize: '1.1 MB',
    pageCount: 12,
    author: 'Sistem',
    recipients: ['finans@strenerji.com'],
    metrics: [
      { label: 'Toplam Maliyet', value: '₺48,250', change: -5.4, trend: 'down' },
      { label: 'Tasarruf', value: '₺4,820', change: 18.5, trend: 'up' }
    ],
    tags: ['Haftalık', 'Maliyet']
  },
  {
    id: 'RPT-003',
    title: 'Q3 Verimlilik Raporu',
    description: '2024 Q3 sistem verimlilik analizi',
    type: 'efficiency',
    period: 'quarterly',
    status: 'ready',
    createdAt: '2024-10-05T10:30:00',
    completedAt: '2024-10-05T10:35:22',
    fileSize: '5.8 MB',
    pageCount: 48,
    author: 'Ahmet Yılmaz',
    recipients: ['teknik@strenerji.com'],
    metrics: [
      { label: 'Ortalama Verim', value: '%92.8', change: 3.2, trend: 'up' },
      { label: 'Kayıp Oranı', value: '%7.2', change: -2.1, trend: 'down' }
    ],
    tags: ['Çeyreklik', 'Verimlilik']
  },
  {
    id: 'RPT-004',
    title: 'Solar Performans Raporu',
    description: 'Kasım ayı güneş enerjisi üretim performansı',
    type: 'energy',
    period: 'monthly',
    status: 'ready',
    createdAt: '2024-12-01T08:00:00',
    completedAt: '2024-12-01T08:03:45',
    fileSize: '3.2 MB',
    pageCount: 18,
    author: 'Sistem',
    recipients: [],
    metrics: [
      { label: 'Toplam Üretim', value: '12,450 kWh', change: -22.4, trend: 'down' },
      { label: 'Performans', value: '%85.2', change: -5.1, trend: 'down' }
    ],
    tags: ['Solar', 'Performans']
  },
  {
    id: 'RPT-005',
    title: 'Yıllık Çevresel Etki Raporu',
    description: '2024 yılı karbon ayak izi ve sürdürülebilirlik',
    type: 'environmental',
    period: 'yearly',
    status: 'generating',
    createdAt: '2024-12-02T00:00:00',
    author: 'Sistem',
    recipients: ['surdurulebilirlik@strenerji.com'],
    metrics: [],
    tags: ['Yıllık', 'Çevresel']
  },
  {
    id: 'RPT-006',
    title: 'Günlük Operasyon Özeti',
    description: '1 Aralık 2024 operasyonel durum raporu',
    type: 'consumption',
    period: 'daily',
    status: 'ready',
    createdAt: '2024-12-02T00:05:00',
    completedAt: '2024-12-02T00:05:45',
    fileSize: '0.8 MB',
    pageCount: 6,
    author: 'Sistem',
    recipients: [],
    metrics: [
      { label: 'Günlük Tüketim', value: '1,528 kWh', change: 2.1, trend: 'up' },
      { label: 'Pik Yük', value: '245 kW', change: -5.2, trend: 'down' }
    ],
    tags: ['Günlük', 'Operasyon']
  },
  {
    id: 'RPT-007',
    title: 'Bakım ve Servis Raporu',
    description: 'Kasım ayı bakım aktiviteleri özeti',
    type: 'maintenance',
    period: 'monthly',
    status: 'ready',
    createdAt: '2024-12-01T12:00:00',
    completedAt: '2024-12-01T12:02:18',
    fileSize: '1.8 MB',
    pageCount: 15,
    author: 'Fatma Şahin',
    recipients: ['bakim@strenerji.com'],
    metrics: [
      { label: 'Planlı Bakım', value: '12', trend: 'stable' },
      { label: 'Arıza', value: '3', change: -40, trend: 'down' },
      { label: 'Uptime', value: '%99.4', change: 0.2, trend: 'up' }
    ],
    tags: ['Bakım', 'Servis']
  },
  {
    id: 'RPT-008',
    title: 'Su Tüketim Analizi Q4',
    description: 'Q4 2024 su kullanım ve tasarruf analizi',
    type: 'consumption',
    period: 'quarterly',
    status: 'scheduled',
    createdAt: '2024-11-15T10:00:00',
    scheduledAt: '2025-01-05T08:00:00',
    author: 'Sistem',
    recipients: ['operasyon@strenerji.com'],
    metrics: [],
    tags: ['Su', 'Planlı']
  }
]

// Utility functions moved inside component for i18n support

export function Reports() {
  const { t, language } = useLanguage()
  
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString(language === 'tr' ? 'tr-TR' : 'en-US', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const formatShortDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString(language === 'tr' ? 'tr-TR' : 'en-US', {
      day: '2-digit',
      month: 'short'
    })
  }
  
  const [searchQuery, setSearchQuery] = useState('')
  const [typeFilter, setTypeFilter] = useState<ReportType | 'all'>('all')
  const [periodFilter, setPeriodFilter] = useState<ReportPeriod | 'all'>('all')
  const [_statusFilter, _setStatusFilter] = useState<ReportStatus | 'all'>('all')
  const [selectedReport, setSelectedReport] = useState<Report | null>(null)
  const [showCreateDialog, setShowCreateDialog] = useState(false)
  const [activeTab, setActiveTab] = useState('all')

  // Filtered reports
  const filteredReports = useMemo(() => {
    return mockReports.filter(report => {
      const matchesSearch = searchQuery === '' ||
        report.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        report.description.toLowerCase().includes(searchQuery.toLowerCase())

      const matchesType = typeFilter === 'all' || report.type === typeFilter
      const matchesPeriod = periodFilter === 'all' || report.period === periodFilter

      const matchesTab = activeTab === 'all' ||
        (activeTab === 'ready' && report.status === 'ready') ||
        (activeTab === 'scheduled' && report.status === 'scheduled')

      return matchesSearch && matchesType && matchesPeriod && matchesTab
    }).sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
  }, [searchQuery, typeFilter, periodFilter, activeTab])

  // Statistics
  const stats = useMemo(() => {
    const ready = mockReports.filter(r => r.status === 'ready').length
    const generating = mockReports.filter(r => r.status === 'generating').length
    const scheduled = mockReports.filter(r => r.status === 'scheduled').length
    const thisMonth = mockReports.filter(r => {
      const date = new Date(r.createdAt)
      const now = new Date()
      return date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear()
    }).length
    return { ready, generating, scheduled, thisMonth, total: mockReports.length }
  }, [])

  // Report type distribution
  const typeDistribution = useMemo(() => {
    const distribution: Record<ReportType, number> = {
      energy: 0, consumption: 0, efficiency: 0, cost: 0, maintenance: 0, environmental: 0
    }
    mockReports.forEach(r => distribution[r.type]++)
    return distribution
  }, [])

  return (
    <>
      <Header fixed>
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center size-10 rounded-xl bg-muted/50 border border-border">
            <FileText className="size-5 text-muted-foreground" />
          </div>
          <div>
            <h1 className="text-lg font-semibold tracking-tight">{t('reports')}</h1>
            <p className="text-xs text-muted-foreground">{t('analysisAndReportingCenter')}</p>
          </div>
        </div>
        <div className="ml-auto flex items-center gap-2">
          <Button variant="outline" size="sm" className="gap-2 hidden sm:flex">
            <CalendarDays className="size-4" />
            {t('scheduling')}
          </Button>
          <Button size="sm" className="gap-2" onClick={() => setShowCreateDialog(true)}>
            <Plus className="size-4" />
            <span className="hidden sm:inline">{t('newReport')}</span>
          </Button>
        </div>
      </Header>

      <Main>
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Main Content */}
          <div className="flex-1 space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <Card className="relative overflow-hidden bg-card hover:shadow-md transition-shadow border">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">{t('ready')}</p>
                      <p className="text-3xl font-bold text-foreground">{stats.ready}</p>
                    </div>
                    <div className="size-10 rounded-xl bg-muted/50 flex items-center justify-center">
                      <CheckCircle2 className="size-5 text-green-600 dark:text-green-400" />
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">{t('downloadableReports')}</p>
                </CardContent>
              </Card>

              <Card className="relative overflow-hidden bg-card hover:shadow-md transition-shadow border">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">{t('generating')}</p>
                      <p className="text-3xl font-bold text-foreground">{stats.generating}</p>
                    </div>
                    <div className="size-10 rounded-xl bg-muted/50 flex items-center justify-center">
                      <RefreshCw className="size-5 text-muted-foreground animate-spin" />
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">{t('processing')}</p>
                </CardContent>
              </Card>

              <Card className="relative overflow-hidden bg-card hover:shadow-md transition-shadow border">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">{t('scheduled')}</p>
                      <p className="text-3xl font-bold text-foreground">{stats.scheduled}</p>
                    </div>
                    <div className="size-10 rounded-xl bg-muted/50 flex items-center justify-center">
                      <Calendar className="size-5 text-amber-600 dark:text-amber-400" />
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">{t('pendingReports')}</p>
                </CardContent>
              </Card>

              <Card className="relative overflow-hidden bg-card hover:shadow-md transition-shadow border">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">{t('thisMonth')}</p>
                      <p className="text-3xl font-bold text-foreground">{stats.thisMonth}</p>
                    </div>
                    <div className="size-10 rounded-xl bg-muted/50 flex items-center justify-center">
                      <FileBarChart className="size-5 text-muted-foreground" />
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">{t('createdReport')}</p>
                </CardContent>
              </Card>
            </div>

            {/* Tabs & Filters */}
            <div className="space-y-4">
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <TabsList className="bg-muted/60 p-1 h-auto">
                    <TabsTrigger value="all" className="text-xs px-3 py-1.5">
                      {t('all')}
                      <Badge variant="secondary" className="ml-1.5 text-[10px] px-1.5 py-0">{stats.total}</Badge>
                    </TabsTrigger>
                    <TabsTrigger value="ready" className="text-xs px-3 py-1.5">
                      {t('ready')}
                      <Badge variant="secondary" className="ml-1.5 text-[10px] px-1.5 py-0">{stats.ready}</Badge>
                    </TabsTrigger>
                    <TabsTrigger value="scheduled" className="text-xs px-3 py-1.5">
                      {t('scheduled')}
                      <Badge variant="secondary" className="ml-1.5 text-[10px] px-1.5 py-0">{stats.scheduled}</Badge>
                    </TabsTrigger>
                  </TabsList>
                </div>

                {/* Filters */}
                <Card className="border shadow-sm">
                  <CardContent className="p-3">
                    <div className="flex flex-col lg:flex-row gap-3">
                      <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                        <Input
                          placeholder={t('searchReport')}
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="pl-9 h-9 bg-muted/40"
                        />
                      </div>
                      <div className="flex gap-2 flex-wrap">
                        <Select value={typeFilter} onValueChange={(v) => setTypeFilter(v as ReportType | 'all')}>
                          <SelectTrigger className="w-[120px] h-9">
                            <SelectValue placeholder="Tür" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">{t('allTypes')}</SelectItem>
                            <SelectItem value="energy">{t('energy')}</SelectItem>
                            <SelectItem value="consumption">{t('consumption')}</SelectItem>
                            <SelectItem value="efficiency">{t('efficiency')}</SelectItem>
                            <SelectItem value="cost">{t('cost')}</SelectItem>
                            <SelectItem value="maintenance">{t('maintenance')}</SelectItem>
                            <SelectItem value="environmental">{t('environmental')}</SelectItem>
                          </SelectContent>
                        </Select>
                        <Select value={periodFilter} onValueChange={(v) => setPeriodFilter(v as ReportPeriod | 'all')}>
                          <SelectTrigger className="w-[120px] h-9">
                            <SelectValue placeholder="Periyot" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">{t('allPeriods')}</SelectItem>
                            <SelectItem value="daily">{t('periodDaily')}</SelectItem>
                            <SelectItem value="weekly">{t('periodWeekly')}</SelectItem>
                            <SelectItem value="monthly">{t('periodMonthly')}</SelectItem>
                            <SelectItem value="quarterly">{t('periodQuarterly')}</SelectItem>
                            <SelectItem value="yearly">{t('periodYearly')}</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Reports List */}
                <TabsContent value={activeTab} className="mt-4 space-y-3">
                  {filteredReports.length === 0 ? (
                    <Card className="border">
                      <CardContent className="py-16 text-center">
                        <FolderOpen className="size-12 text-muted-foreground/40 mx-auto mb-4" />
                        <p className="text-sm text-muted-foreground">{t('noReportsFound')}</p>
                        <p className="text-xs text-muted-foreground/70 mt-1">{t('tryChangingFilters')}</p>
                      </CardContent>
                    </Card>
                  ) : (
                    filteredReports.map((report) => {
                      const type = typeConfig[report.type]
                      const status = statusConfig[report.status]
                      const TypeIcon = type.icon
                      const StatusIcon = status.icon

                      return (
                        <Card
                          key={report.id}
                          className="group border shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer"
                          onClick={() => setSelectedReport(report)}
                        >
                          <CardContent className="p-4">
                            <div className="flex gap-4">
                              {/* Icon */}
                              <div className={`size-12 rounded-xl ${type.bgColor} flex items-center justify-center shrink-0`}>
                                <TypeIcon className={`size-6 ${type.color}`} />
                              </div>

                              {/* Content */}
                              <div className="flex-1 min-w-0 space-y-2">
                                {/* Header */}
                                <div className="flex items-start justify-between gap-2">
                                  <div className="min-w-0">
                                    <div className="flex items-center gap-2 flex-wrap">
                                      <h3 className="font-semibold text-sm truncate">{report.title}</h3>
                                      <Badge className={`${status.bgColor} ${status.color} border-0 text-[10px] px-1.5 py-0 h-5`}>
                                        <StatusIcon className={`size-3 mr-1 ${report.status === 'generating' ? 'animate-spin' : ''}`} />
                                        {t(status.labelKey as any)}
                                      </Badge>
                                    </div>
                                    <p className="text-xs text-muted-foreground mt-0.5 line-clamp-1">{report.description}</p>
                                  </div>
                                  
                                  <DropdownMenu>
                                    <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                                      <Button variant="ghost" size="icon" className="size-8 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <MoreVertical className="size-4" />
                                      </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end" className="w-48">
                                      <DropdownMenuItem>
                                        <Eye className="size-4 mr-2" />
                                        {t('view')}
                                      </DropdownMenuItem>
                                      {report.status === 'ready' && (
                                        <>
                                          <DropdownMenuItem>
                                            <Download className="size-4 mr-2" />
                                            {t('downloadPdf')}
                                          </DropdownMenuItem>
                                          <DropdownMenuItem>
                                            <FileSpreadsheet className="size-4 mr-2" />
                                            {t('downloadExcel')}
                                          </DropdownMenuItem>
                                        </>
                                      )}
                                      <DropdownMenuSeparator />
                                      <DropdownMenuItem>
                                        <Share2 className="size-4 mr-2" />
                                        {t('share')}
                                      </DropdownMenuItem>
                                      <DropdownMenuItem>
                                        <Mail className="size-4 mr-2" />
                                        {t('sendEmail')}
                                      </DropdownMenuItem>
                                      <DropdownMenuSeparator />
                                      <DropdownMenuItem className="text-destructive focus:text-destructive">
                                        <Trash2 className="size-4 mr-2" />
                                        {t('delete')}
                                      </DropdownMenuItem>
                                    </DropdownMenuContent>
                                  </DropdownMenu>
                                </div>

                                {/* Metrics */}
                                {report.metrics.length > 0 && (
                                  <div className="flex items-center gap-4 flex-wrap">
                                    {report.metrics.slice(0, 3).map((metric, idx) => (
                                      <div key={idx} className="flex items-center gap-1.5">
                                        <span className="text-xs text-muted-foreground">{metric.label}:</span>
                                        <span className="text-xs font-semibold">{metric.value}</span>
                                        {metric.change !== undefined && (
                                          <span className={`text-[10px] flex items-center ${
                                            metric.trend === 'up' ? 'text-green-600 dark:text-green-400' : 
                                            metric.trend === 'down' ? 'text-red-600 dark:text-red-400' : 
                                            'text-muted-foreground'
                                          }`}>
                                            {metric.trend === 'up' && <ArrowUpRight className="size-3" />}
                                            {metric.trend === 'down' && <ArrowDownRight className="size-3" />}
                                            {Math.abs(metric.change)}%
                                          </span>
                                        )}
                                      </div>
                                    ))}
                                  </div>
                                )}

                                {/* Footer */}
                                <div className="flex items-center gap-3 flex-wrap text-xs text-muted-foreground">
                                  <Badge variant="outline" className="text-[10px] px-1.5 py-0 h-5">{t(periodLabels[report.period] as any)}</Badge>
                                  <span className="flex items-center gap-1">
                                    <Clock className="size-3" />
                                    {formatShortDate(report.createdAt)}
                                  </span>
                                  {report.fileSize && (
                                    <span className="flex items-center gap-1">
                                      <FileDown className="size-3" />
                                      {report.fileSize}
                                    </span>
                                  )}
                                  {report.pageCount && (
                                    <span>{report.pageCount} {t('pages')}</span>
                                  )}
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      )
                    })
                  )}
                </TabsContent>
              </Tabs>
            </div>
          </div>

          {/* Sidebar */}
          <div className="w-full lg:w-80 space-y-4">
            {/* Type Distribution */}
            <Card className="border shadow-sm">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm flex items-center gap-2">
                  <PieChart className="size-4" />
                  {t('reportTypes')}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {(Object.entries(typeDistribution) as [ReportType, number][])
                  .filter(([_, count]) => count > 0)
                  .sort((a, b) => b[1] - a[1])
                  .map(([type, count]) => {
                    const config = typeConfig[type]
                    const percentage = Math.round((count / stats.total) * 100)
                    return (
                      <div key={type} className="space-y-1.5">
                        <div className="flex items-center justify-between text-xs">
                          <span className="flex items-center gap-2">
                            <config.icon className={`size-3.5 ${config.color}`} />
                            <span className="font-medium">{t(config.labelKey as any)}</span>
                          </span>
                          <span className="text-muted-foreground">{count} {t('report')}</span>
                        </div>
                        <Progress value={percentage} className="h-1.5" />
                      </div>
                    )
                  })}
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="border shadow-sm">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm flex items-center gap-2">
                  <Zap className="size-4" />
                  {t('quickReports')}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {[
                  { labelKey: 'dailySummary', icon: FileText, type: 'daily' },
                  { labelKey: 'weeklyAnalysis', icon: BarChart3, type: 'weekly' },
                  { labelKey: 'costReportItem', icon: TrendingUp, type: 'cost' },
                  { labelKey: 'efficiencyReportItem', icon: Target, type: 'efficiency' }
                ].map((item, idx) => (
                  <Button
                    key={idx}
                    variant="outline"
                    className="w-full justify-between h-9 text-xs"
                    onClick={() => setShowCreateDialog(true)}
                  >
                    <span className="flex items-center gap-2">
                      <item.icon className="size-3.5" />
                      {t(item.labelKey as any)}
                    </span>
                    <ChevronRight className="size-3.5 text-muted-foreground" />
                  </Button>
                ))}
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card className="border shadow-sm">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm flex items-center gap-2">
                  <Activity className="size-4" />
                  {t('recentActivity')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {mockReports
                    .filter(r => r.status === 'ready')
                    .slice(0, 4)
                    .map((report) => {
                      const config = typeConfig[report.type]
                      return (
                        <div 
                          key={report.id} 
                          className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50 cursor-pointer transition-colors"
                          onClick={() => setSelectedReport(report)}
                        >
                          <div className={`size-8 rounded-lg ${config.bgColor} flex items-center justify-center shrink-0`}>
                            <config.icon className={`size-4 ${config.color}`} />
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="text-xs font-medium truncate">{report.title}</p>
                            <p className="text-[10px] text-muted-foreground">{formatShortDate(report.createdAt)}</p>
                          </div>
                          <CheckCircle2 className="size-3.5 text-green-500 shrink-0" />
                        </div>
                      )
                    })}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </Main>

      {/* Report Detail Dialog */}
      <Dialog open={!!selectedReport} onOpenChange={() => setSelectedReport(null)}>
        <DialogContent className="max-w-2xl max-h-[90vh] flex flex-col">
          {selectedReport && (() => {
            const type = typeConfig[selectedReport.type]
            const status = statusConfig[selectedReport.status]
            return (
              <>
                <DialogHeader className="shrink-0">
                  <div className="flex items-start gap-4">
                    <div className={`size-12 rounded-xl ${type.bgColor} flex items-center justify-center shrink-0`}>
                      <type.icon className={`size-6 ${type.color}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap mb-1">
                        <Badge className={`${status.bgColor} ${status.color} border-0`}>
                          {t(status.labelKey as any)}
                        </Badge>
                        <Badge variant="outline">{t(periodLabels[selectedReport.period] as any)}</Badge>
                      </div>
                      <DialogTitle className="text-base">{selectedReport.title}</DialogTitle>
                      <p className="text-sm text-muted-foreground mt-1">{selectedReport.description}</p>
                    </div>
                  </div>
                </DialogHeader>

                <ScrollArea className="flex-1 -mx-6 px-6">
                  <div className="space-y-6 py-4">
                    {/* Info Grid */}
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                      <div className="p-3 rounded-lg bg-muted/50">
                        <p className="text-[10px] text-muted-foreground uppercase tracking-wider">{t('created')}</p>
                        <p className="text-sm font-medium mt-1">{formatDate(selectedReport.createdAt)}</p>
                      </div>
                      {selectedReport.fileSize && (
                        <div className="p-3 rounded-lg bg-muted/50">
                          <p className="text-[10px] text-muted-foreground uppercase tracking-wider">{t('fileSize')}</p>
                          <p className="text-sm font-medium mt-1">{selectedReport.fileSize}</p>
                        </div>
                      )}
                      {selectedReport.pageCount && (
                        <div className="p-3 rounded-lg bg-muted/50">
                          <p className="text-[10px] text-muted-foreground uppercase tracking-wider">{t('page')}</p>
                          <p className="text-sm font-medium mt-1">{selectedReport.pageCount} {t('pages')}</p>
                        </div>
                      )}
                      <div className="p-3 rounded-lg bg-muted/50">
                        <p className="text-[10px] text-muted-foreground uppercase tracking-wider">{t('createdBy')}</p>
                        <p className="text-sm font-medium mt-1">{selectedReport.author}</p>
                      </div>
                    </div>

                    {/* Metrics */}
                    {selectedReport.metrics.length > 0 && (
                      <div className="space-y-3">
                        <h4 className="text-sm font-medium flex items-center gap-2">
                          <BarChart3 className="size-4" />
                          {t('summaryMetrics')}
                        </h4>
                        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
                          {selectedReport.metrics.map((metric, idx) => (
                            <div key={idx} className="p-4 rounded-lg border bg-card">
                              <p className="text-xs text-muted-foreground">{metric.label}</p>
                              <p className="text-xl font-bold mt-1">{metric.value}</p>
                              {metric.change !== undefined && (
                                <div className={`flex items-center gap-1 mt-1 text-xs ${
                                  metric.trend === 'up' ? 'text-green-600' : 
                                  metric.trend === 'down' ? 'text-red-600' : 
                                  'text-muted-foreground'
                                }`}>
                                  {metric.trend === 'up' && <TrendingUp className="size-3" />}
                                  {metric.trend === 'down' && <TrendingDown className="size-3" />}
                                  {metric.change > 0 ? '+' : ''}{metric.change}% {t('vsPreviousPeriod')}
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Recipients */}
                    {selectedReport.recipients.length > 0 && (
                      <div className="space-y-3">
                        <h4 className="text-sm font-medium flex items-center gap-2">
                          <Mail className="size-4" />
                          {t('recipients')}
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {selectedReport.recipients.map((email, idx) => (
                            <Badge key={idx} variant="secondary">{email}</Badge>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Tags */}
                    <div className="space-y-3">
                      <h4 className="text-sm font-medium">{t('tags')}</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedReport.tags.map((tag, idx) => (
                          <Badge key={idx} variant="outline">{tag}</Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </ScrollArea>

                <Separator />

                <div className="flex justify-between items-center pt-4 shrink-0">
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="gap-2">
                      <Share2 className="size-4" />
                      {t('share')}
                    </Button>
                    <Button variant="outline" size="sm" className="gap-2">
                      <Printer className="size-4" />
                      {t('print')}
                    </Button>
                  </div>
                  {selectedReport.status === 'ready' && (
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="gap-2">
                        <FileSpreadsheet className="size-4" />
                        Excel
                      </Button>
                      <Button size="sm" className="gap-2">
                        <Download className="size-4" />
                        {t('downloadPdf')}
                      </Button>
                    </div>
                  )}
                </div>
              </>
            )
          })()}
        </DialogContent>
      </Dialog>

      {/* Create Report Dialog */}
      <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>{t('createNewReport')}</DialogTitle>
            <DialogDescription>
              {t('createNewReportDescription')}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            {/* Report Type Selection */}
            <div className="space-y-2">
              <label className="text-sm font-medium">{t('reportType')}</label>
              <div className="grid grid-cols-2 gap-2">
                {(Object.entries(typeConfig) as [ReportType, typeof typeConfig.energy][]).map(([key, config]) => (
                  <Button
                    key={key}
                    variant="outline"
                    className="justify-start h-auto py-3 px-4"
                  >
                    <config.icon className={`size-5 mr-3 ${config.color}`} />
                    <span className="text-sm">{t(config.labelKey as any)}</span>
                  </Button>
                ))}
              </div>
            </div>

            {/* Period Selection */}
            <div className="space-y-2">
              <label className="text-sm font-medium">{t('period')}</label>
              <Select defaultValue="monthly">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="daily">{t('periodDaily')}</SelectItem>
                  <SelectItem value="weekly">{t('periodWeekly')}</SelectItem>
                  <SelectItem value="monthly">{t('periodMonthly')}</SelectItem>
                  <SelectItem value="quarterly">{t('periodQuarterly')}</SelectItem>
                  <SelectItem value="yearly">{t('periodYearly')}</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Format Selection */}
            <div className="space-y-2">
              <label className="text-sm font-medium">{t('format')}</label>
              <Select defaultValue="pdf">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pdf">PDF</SelectItem>
                  <SelectItem value="excel">Excel</SelectItem>
                  <SelectItem value="csv">CSV</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Email */}
            <div className="space-y-2">
              <label className="text-sm font-medium">{t('sendByEmailOptional')}</label>
              <Input type="email" placeholder={t('emailPlaceholder')} />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowCreateDialog(false)}>
              {t('cancel')}
            </Button>
            <Button className="gap-2">
              <FileText className="size-4" />
              {t('generateReport')}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
