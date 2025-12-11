import { useState, useMemo } from 'react'
import { 
  AlertTriangle, CheckCircle2, Info, Clock,
  Search, Download, Eye, Archive, Bell, BellOff,
  Zap, Wifi, Activity, Server, Cpu, AlertOctagon, 
  ShieldAlert, ChevronRight, BarChart3, Settings, 
  FileText, Users, Link2, MoreVertical,
  TrendingUp, ArrowUpRight, ArrowDownRight, Gauge
} from 'lucide-react'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import {
  Dialog, DialogContent, DialogHeader, DialogTitle
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
import { useLanguage } from '@/lib/i18n'

// Alert tipleri
type AlertSeverity = 'critical' | 'high' | 'medium' | 'low' | 'info'
type AlertCategory = 'power' | 'connectivity' | 'hardware' | 'security' | 'maintenance' | 'performance'
type AlertStatus = 'active' | 'acknowledged' | 'resolved'

interface Alert {
  id: string
  title: string
  description: string
  severity: AlertSeverity
  category: AlertCategory
  status: AlertStatus
  deviceId: string
  deviceName: string
  deviceType: string
  location: string
  zone: string
  timestamp: string
  acknowledgedAt?: string
  acknowledgedBy?: string
  resolvedAt?: string
  resolvedBy?: string
  technicalDetails: {
    errorCode?: string
    threshold?: string
    currentValue?: string
    expectedValue?: string
    affectedMetrics?: string[]
  }
  impactLevel: 'none' | 'minimal' | 'moderate' | 'significant' | 'severe'
  estimatedDowntime?: string
  affectedUsers?: number
  relatedAlerts?: string[]
}

// Mock alert verileri
const mockAlerts: Alert[] = [
  {
    id: 'ALT-001',
    title: 'Kritik Güç Kesintisi',
    description: 'Bina A ana elektrik beslemesinde beklenmeyen kesinti tespit edildi. Yedek güç sistemleri devreye girdi.',
    severity: 'critical',
    category: 'power',
    status: 'active',
    deviceId: 'DEV-001',
    deviceName: 'Ana Sayaç - Bina A',
    deviceType: 'energy_meter',
    location: 'Bina A - Giriş',
    zone: 'Bölge 1',
    timestamp: '2024-12-02T14:23:15',
    technicalDetails: {
      errorCode: 'PWR-001',
      threshold: '220V ±10%',
      currentValue: '0V',
      expectedValue: '220V',
      affectedMetrics: ['Voltage', 'Power Supply', 'Grid Connection']
    },
    impactLevel: 'severe',
    estimatedDowntime: '2-4 saat',
    affectedUsers: 450,
    relatedAlerts: ['ALT-012']
  },
  {
    id: 'ALT-002',
    title: 'Yüksek Sıcaklık Alarmı',
    description: 'Solar inverter #1 iç sıcaklığı kritik seviyeye yaklaştı. Soğutma sistemi performansı düşük.',
    severity: 'high',
    category: 'hardware',
    status: 'acknowledged',
    deviceId: 'DEV-002',
    deviceName: 'Solar İnverter #1',
    deviceType: 'solar_inverter',
    location: 'Çatı - Batı',
    zone: 'Bölge 2',
    timestamp: '2024-12-02T13:45:22',
    acknowledgedAt: '2024-12-02T13:50:18',
    acknowledgedBy: 'Ahmet Yılmaz',
    technicalDetails: {
      errorCode: 'TEMP-005',
      threshold: '≤75°C',
      currentValue: '82°C',
      expectedValue: '60-70°C',
      affectedMetrics: ['Internal Temperature', 'Cooling Fan Speed', 'Power Output']
    },
    impactLevel: 'moderate',
    affectedUsers: 120
  },
  {
    id: 'ALT-003',
    title: 'Batarya Şarj Seviyesi Düşük',
    description: 'Enerji depolama sisteminde batarya kapasitesi %15\'in altına düştü.',
    severity: 'high',
    category: 'power',
    status: 'active',
    deviceId: 'DEV-003',
    deviceName: 'Batarya Sistemi #1',
    deviceType: 'battery_storage',
    location: 'Yeraltı - Teknik Alan',
    zone: 'Bölge 1',
    timestamp: '2024-12-02T12:15:40',
    technicalDetails: {
      errorCode: 'BAT-012',
      threshold: '≥20%',
      currentValue: '12%',
      expectedValue: '80-95%',
      affectedMetrics: ['State of Charge', 'Available Capacity']
    },
    impactLevel: 'significant',
    estimatedDowntime: '6-8 saat',
    affectedUsers: 380
  },
  {
    id: 'ALT-004',
    title: 'Ağ Bağlantısı Kesildi',
    description: 'Akıllı sensör ağ ile bağlantısını kaybetti. Son 15 dakikadır veri aktarımı yapılmıyor.',
    severity: 'medium',
    category: 'connectivity',
    status: 'active',
    deviceId: 'DEV-004',
    deviceName: 'Sıcaklık/Nem Sensörü',
    deviceType: 'smart_sensor',
    location: 'Bina B - 3. Kat',
    zone: 'Bölge 2',
    timestamp: '2024-12-02T11:30:55',
    technicalDetails: {
      errorCode: 'NET-008',
      currentValue: 'Offline',
      expectedValue: 'Online',
      affectedMetrics: ['Network Status', 'Data Transmission']
    },
    impactLevel: 'minimal',
    affectedUsers: 25
  },
  {
    id: 'ALT-005',
    title: 'Firmware Güncellemesi Gerekli',
    description: 'Gateway cihazı için kritik güvenlik güncellemesi mevcut.',
    severity: 'medium',
    category: 'security',
    status: 'acknowledged',
    deviceId: 'DEV-005',
    deviceName: 'Merkezi Gateway',
    deviceType: 'gateway',
    location: 'Sunucu Odası',
    zone: 'Bölge 1',
    timestamp: '2024-12-02T09:00:00',
    acknowledgedAt: '2024-12-02T10:15:30',
    acknowledgedBy: 'Mehmet Demir',
    technicalDetails: {
      errorCode: 'FW-003',
      currentValue: 'v2.0.5',
      expectedValue: 'v2.1.8',
      affectedMetrics: ['Security Level', 'System Stability']
    },
    impactLevel: 'moderate',
    estimatedDowntime: '30 dakika'
  },
  {
    id: 'ALT-006',
    title: 'Anormal Enerji Tüketimi',
    description: 'Bina C\'de son 3 saatte olağandışı yüksek enerji tüketimi tespit edildi (+47% artış).',
    severity: 'medium',
    category: 'performance',
    status: 'active',
    deviceId: 'DEV-006',
    deviceName: 'Enerji Sayacı - Bina C',
    deviceType: 'energy_meter',
    location: 'Bina C - Zemin Kat',
    zone: 'Bölge 3',
    timestamp: '2024-12-02T10:45:12',
    technicalDetails: {
      errorCode: 'PERF-014',
      threshold: '±15% normal aralık',
      currentValue: '1,247 kWh',
      expectedValue: '850 kWh',
      affectedMetrics: ['Power Consumption', 'Load Profile']
    },
    impactLevel: 'moderate',
    affectedUsers: 180
  },
  {
    id: 'ALT-007',
    title: 'Transformatör Aşırı Yüklendi',
    description: 'Güç transformatörü kapasitesinin %92\'sine ulaştı. Yük dengeleme gerekiyor.',
    severity: 'high',
    category: 'power',
    status: 'active',
    deviceId: 'DEV-007',
    deviceName: 'Güç Transformatörü',
    deviceType: 'transformer',
    location: 'Trafo Merkezi',
    zone: 'Bölge 1',
    timestamp: '2024-12-02T08:20:33',
    technicalDetails: {
      errorCode: 'LOAD-007',
      threshold: '≤85% kapasite',
      currentValue: '92%',
      expectedValue: '70-80%',
      affectedMetrics: ['Load Percentage', 'Temperature']
    },
    impactLevel: 'significant',
    affectedUsers: 650
  },
  {
    id: 'ALT-008',
    title: 'Su Sayacı İletişim Hatası',
    description: 'Su sayacı modbus iletişim protokolünde kesinti yaşanıyor.',
    severity: 'low',
    category: 'connectivity',
    status: 'resolved',
    deviceId: 'DEV-008',
    deviceName: 'Su Sayacı #2',
    deviceType: 'water_meter',
    location: 'Bina A - Bodrum',
    zone: 'Bölge 1',
    timestamp: '2024-12-02T07:15:20',
    acknowledgedAt: '2024-12-02T07:30:45',
    acknowledgedBy: 'Ali Kaya',
    resolvedAt: '2024-12-02T08:05:10',
    resolvedBy: 'Ali Kaya',
    technicalDetails: {
      errorCode: 'COM-022',
      currentValue: 'Communication Error',
      expectedValue: 'Normal Communication',
      affectedMetrics: ['Modbus Status', 'Data Integrity']
    },
    impactLevel: 'minimal',
    affectedUsers: 45
  },
  {
    id: 'ALT-009',
    title: 'Sensör Kalibrasyon Uyarısı',
    description: 'Rüzgar hızı sensörü hatalı veri gönderiyor. Kalibrasyon gerekebilir.',
    severity: 'low',
    category: 'hardware',
    status: 'acknowledged',
    deviceId: 'DEV-009',
    deviceName: 'Hava Durumu İstasyonu',
    deviceType: 'weather_station',
    location: 'Çatı - Merkez',
    zone: 'Bölge 2',
    timestamp: '2024-12-02T06:40:15',
    acknowledgedAt: '2024-12-02T07:00:22',
    acknowledgedBy: 'Fatma Şahin',
    technicalDetails: {
      errorCode: 'SENS-018',
      threshold: '0-150 km/h',
      currentValue: '-12 km/h (Invalid)',
      expectedValue: '0-50 km/h',
      affectedMetrics: ['Wind Speed', 'Sensor Calibration']
    },
    impactLevel: 'minimal'
  },
  {
    id: 'ALT-010',
    title: 'Gaz Sayacı Düşük Sinyal',
    description: 'Gaz sayacı sinyal gücü zayıfladı. Anten veya kablo kontrolü gerekebilir.',
    severity: 'low',
    category: 'connectivity',
    status: 'active',
    deviceId: 'DEV-010',
    deviceName: 'Doğalgaz Sayacı',
    deviceType: 'gas_meter',
    location: 'Bina B - Dış Cephe',
    zone: 'Bölge 2',
    timestamp: '2024-12-02T05:30:48',
    technicalDetails: {
      errorCode: 'SIG-011',
      threshold: '≥-80 dBm',
      currentValue: '-95 dBm',
      expectedValue: '-60 to -70 dBm',
      affectedMetrics: ['Signal Strength', 'Data Reliability']
    },
    impactLevel: 'minimal',
    affectedUsers: 90
  },
  {
    id: 'ALT-011',
    title: 'Planlı Bakım Hatırlatıcı',
    description: 'Solar inverter #2 için aylık rutin bakım zamanı geldi.',
    severity: 'info',
    category: 'maintenance',
    status: 'active',
    deviceId: 'DEV-011',
    deviceName: 'Solar İnverter #2',
    deviceType: 'solar_inverter',
    location: 'Çatı - Doğu',
    zone: 'Bölge 2',
    timestamp: '2024-12-02T00:00:00',
    technicalDetails: {
      currentValue: 'Bakım Süresi Doldu',
      expectedValue: 'Aylık Bakım',
      affectedMetrics: ['Maintenance Schedule', 'Performance']
    },
    impactLevel: 'none',
    estimatedDowntime: '2 saat'
  },
  {
    id: 'ALT-012',
    title: 'Çoklu Cihaz Offline',
    description: 'Bölge 1\'de 5 cihaz eşzamanlı olarak çevrimdışı duruma geçti.',
    severity: 'critical',
    category: 'connectivity',
    status: 'active',
    deviceId: 'MULTIPLE',
    deviceName: 'Çoklu Cihaz',
    deviceType: 'multiple',
    location: 'Bölge 1 - Genel',
    zone: 'Bölge 1',
    timestamp: '2024-12-02T14:25:00',
    technicalDetails: {
      errorCode: 'NET-999',
      affectedMetrics: ['Network Infrastructure', 'Device Connectivity']
    },
    impactLevel: 'severe',
    affectedUsers: 750,
    relatedAlerts: ['ALT-001', 'ALT-003', 'ALT-007']
  }
]

export function Alerts() {
  const { t, language } = useLanguage()
  const [searchQuery, setSearchQuery] = useState('')
  const [severityFilter, setSeverityFilter] = useState<AlertSeverity | 'all'>('all')
  const [categoryFilter, setCategoryFilter] = useState<AlertCategory | 'all'>('all')
  const [statusFilter] = useState<AlertStatus | 'all'>('all')
  const [selectedAlert, setSelectedAlert] = useState<Alert | null>(null)
  const [activeTab, setActiveTab] = useState('all')

  // Severity config
  const getSeverityConfig = (severity: AlertSeverity) => {
    const configs = {
      critical: { 
        bg: 'bg-red-500', 
        text: 'text-red-500',
        lightBg: 'bg-red-50 dark:bg-red-950/50',
        border: 'border-red-200 dark:border-red-900',
        icon: AlertOctagon, 
        label: t('critical'),
        pulse: true
      },
      high: { 
        bg: 'bg-orange-500', 
        text: 'text-orange-500',
        lightBg: 'bg-orange-50 dark:bg-orange-950/50',
        border: 'border-orange-200 dark:border-orange-900',
        icon: AlertTriangle, 
        label: t('high'),
        pulse: false
      },
      medium: { 
        bg: 'bg-yellow-500', 
        text: 'text-yellow-500',
        lightBg: 'bg-yellow-50 dark:bg-yellow-950/50',
        border: 'border-yellow-200 dark:border-yellow-900',
        icon: AlertTriangle, 
        label: t('medium'),
        pulse: false
      },
      low: { 
        bg: 'bg-blue-500', 
        text: 'text-blue-500',
        lightBg: 'bg-blue-50 dark:bg-blue-950/50',
        border: 'border-blue-200 dark:border-blue-900',
        icon: Info, 
        label: t('low'),
        pulse: false
      },
      info: { 
        bg: 'bg-slate-400', 
        text: 'text-slate-500',
        lightBg: 'bg-slate-50 dark:bg-slate-900/50',
        border: 'border-slate-200 dark:border-slate-800',
        icon: Info, 
        label: t('info'),
        pulse: false
      }
    }
    return configs[severity]
  }

  // Status config
  const getStatusConfig = (status: AlertStatus) => {
    const configs = {
      active: { 
        bg: 'bg-red-100 dark:bg-red-900/30', 
        text: 'text-red-700 dark:text-red-400',
        icon: Activity, 
        label: t('active') 
      },
      acknowledged: { 
        bg: 'bg-amber-100 dark:bg-amber-900/30', 
        text: 'text-amber-700 dark:text-amber-400',
        icon: Eye, 
        label: t('acknowledgedLabel') 
      },
      resolved: { 
        bg: 'bg-green-100 dark:bg-green-900/30', 
        text: 'text-green-700 dark:text-green-400',
        icon: CheckCircle2, 
        label: t('resolvedLabel') 
      }
    }
    return configs[status]
  }

  // Category config
  const getCategoryConfig = (category: AlertCategory) => {
    const configs = {
      power: { icon: Zap, label: t('powerCategory'), color: 'text-yellow-600' },
      connectivity: { icon: Wifi, label: t('connectivityCategory'), color: 'text-blue-600' },
      hardware: { icon: Cpu, label: t('hardwareCategory'), color: 'text-purple-600' },
      security: { icon: ShieldAlert, label: t('securityCategory'), color: 'text-red-600' },
      maintenance: { icon: Settings, label: t('maintenanceCategory'), color: 'text-slate-600' },
      performance: { icon: TrendingUp, label: t('performanceCategory'), color: 'text-green-600' }
    }
    return configs[category]
  }

  // Filtreleme
  const filteredAlerts = useMemo(() => {
    return mockAlerts.filter(alert => {
      const matchesSearch = 
        alert.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        alert.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        alert.deviceName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        alert.id.toLowerCase().includes(searchQuery.toLowerCase())

      const matchesSeverity = severityFilter === 'all' || alert.severity === severityFilter
      const matchesCategory = categoryFilter === 'all' || alert.category === categoryFilter
      const matchesStatus = statusFilter === 'all' || alert.status === statusFilter
      
      // Tab filter
      const matchesTab = 
        activeTab === 'all' ||
        (activeTab === 'active' && alert.status === 'active') ||
        (activeTab === 'critical' && (alert.severity === 'critical' || alert.severity === 'high'))

      return matchesSearch && matchesSeverity && matchesCategory && matchesStatus && matchesTab
    }).sort((a, b) => {
      // Kritik önce, sonra zamana göre
      const severityOrder = { critical: 5, high: 4, medium: 3, low: 2, info: 1 }
      if (severityOrder[a.severity] !== severityOrder[b.severity]) {
        return severityOrder[b.severity] - severityOrder[a.severity]
      }
      return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    })
  }, [searchQuery, severityFilter, categoryFilter, statusFilter, activeTab])

  // İstatistikler
  const stats = useMemo(() => {
    const active = mockAlerts.filter(a => a.status === 'active').length
    const critical = mockAlerts.filter(a => (a.severity === 'critical' || a.severity === 'high') && a.status === 'active').length
    const acknowledged = mockAlerts.filter(a => a.status === 'acknowledged').length
    const resolved = mockAlerts.filter(a => a.status === 'resolved').length
    const totalAffected = mockAlerts.filter(a => a.status === 'active').reduce((sum, a) => sum + (a.affectedUsers || 0), 0)

    return { active, critical, acknowledged, resolved, total: mockAlerts.length, totalAffected }
  }, [])

  // Format time
  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp)
    const now = new Date()
    const diff = now.getTime() - date.getTime()
    const minutes = Math.floor(diff / 60000)
    const hours = Math.floor(minutes / 60)
    
    if (minutes < 60) return `${minutes} ${t('minutesAgo')}`
    if (hours < 24) return `${hours} ${t('hoursAgo')}`
    return date.toLocaleDateString(language === 'tr' ? 'tr-TR' : 'en-US', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' })
  }

  return (
    <>
      <Header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-primary/10">
            <Bell className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h1 className="text-lg font-semibold">{t('alertCenter')}</h1>
            <p className="text-xs text-muted-foreground">{t('alertCenterDesc')}</p>
          </div>
        </div>
        <div className="ml-auto flex items-center gap-2">
          <Button variant="outline" size="sm" className="gap-2">
            <Download className="h-4 w-4" />
            <span className="hidden sm:inline">{t('report')}</span>
          </Button>
        </div>
      </Header>
      
      <Main className="space-y-6">
        {/* Stats Overview */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
          <Card className="border-0 shadow-sm bg-gradient-to-br from-red-50 to-red-100/50 dark:from-red-950/30 dark:to-red-900/20">
            <CardContent className="p-4">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs font-medium text-red-600 dark:text-red-400">{t('criticalHigh')}</p>
                  <p className="text-3xl font-bold text-red-700 dark:text-red-300 mt-1">{stats.critical}</p>
                </div>
                <div className="p-2 rounded-lg bg-red-500/10">
                  <AlertOctagon className="h-5 w-5 text-red-500" />
                </div>
              </div>
              <p className="text-xs text-red-600/70 dark:text-red-400/70 mt-2">{t('urgentAction')}</p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm bg-gradient-to-br from-amber-50 to-amber-100/50 dark:from-amber-950/30 dark:to-amber-900/20">
            <CardContent className="p-4">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs font-medium text-amber-600 dark:text-amber-400">{t('activeAlert')}</p>
                  <p className="text-3xl font-bold text-amber-700 dark:text-amber-300 mt-1">{stats.active}</p>
                </div>
                <div className="p-2 rounded-lg bg-amber-500/10">
                  <Activity className="h-5 w-5 text-amber-500" />
                </div>
              </div>
              <div className="flex items-center gap-1 mt-2">
                <ArrowUpRight className="h-3 w-3 text-amber-600" />
                <p className="text-xs text-amber-600/70 dark:text-amber-400/70">{t('beingTracked')}</p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm bg-gradient-to-br from-blue-50 to-blue-100/50 dark:from-blue-950/30 dark:to-blue-900/20">
            <CardContent className="p-4">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs font-medium text-blue-600 dark:text-blue-400">{t('acknowledgedLabel')}</p>
                  <p className="text-3xl font-bold text-blue-700 dark:text-blue-300 mt-1">{stats.acknowledged}</p>
                </div>
                <div className="p-2 rounded-lg bg-blue-500/10">
                  <Eye className="h-5 w-5 text-blue-500" />
                </div>
              </div>
              <p className="text-xs text-blue-600/70 dark:text-blue-400/70 mt-2">{t('awaitingProcess')}</p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm bg-gradient-to-br from-green-50 to-green-100/50 dark:from-green-950/30 dark:to-green-900/20">
            <CardContent className="p-4">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs font-medium text-green-600 dark:text-green-400">{t('resolvedLabel')}</p>
                  <p className="text-3xl font-bold text-green-700 dark:text-green-300 mt-1">{stats.resolved}</p>
                </div>
                <div className="p-2 rounded-lg bg-green-500/10">
                  <CheckCircle2 className="h-5 w-5 text-green-500" />
                </div>
              </div>
              <div className="flex items-center gap-1 mt-2">
                <ArrowDownRight className="h-3 w-3 text-green-600" />
                <p className="text-xs text-green-600/70 dark:text-green-400/70">{t('today')}</p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm bg-gradient-to-br from-slate-50 to-slate-100/50 dark:from-slate-950/30 dark:to-slate-900/20">
            <CardContent className="p-4">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs font-medium text-slate-600 dark:text-slate-400">{t('affectedUsers')}</p>
                  <p className="text-3xl font-bold text-slate-700 dark:text-slate-300 mt-1">{stats.totalAffected}</p>
                </div>
                <div className="p-2 rounded-lg bg-slate-500/10">
                  <Users className="h-5 w-5 text-slate-500" />
                </div>
              </div>
              <p className="text-xs text-slate-600/70 dark:text-slate-400/70 mt-2">{t('userCount')}</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Alert List */}
          <div className="lg:col-span-2 space-y-4">
            {/* Filters */}
            <Card className="border shadow-sm">
              <CardContent className="p-4">
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder={t('searchAlertPlaceholder')}
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-9 bg-muted/50"
                    />
                  </div>
                  <div className="flex gap-2">
                    <Select value={severityFilter} onValueChange={(v) => setSeverityFilter(v as AlertSeverity | 'all')}>
                      <SelectTrigger className="w-[130px]">
                        <SelectValue placeholder={t('severity')} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">{t('allSeverities')}</SelectItem>
                        <SelectItem value="critical">{t('critical')}</SelectItem>
                        <SelectItem value="high">{t('high')}</SelectItem>
                        <SelectItem value="medium">{t('medium')}</SelectItem>
                        <SelectItem value="low">{t('low')}</SelectItem>
                        <SelectItem value="info">{t('info')}</SelectItem>
                      </SelectContent>
                    </Select>
                    <Select value={categoryFilter} onValueChange={(v) => setCategoryFilter(v as AlertCategory | 'all')}>
                      <SelectTrigger className="w-[130px]">
                        <SelectValue placeholder={t('category')} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">{t('allCategories')}</SelectItem>
                        <SelectItem value="power">{t('powerCategory')}</SelectItem>
                        <SelectItem value="connectivity">{t('connectivityCategory')}</SelectItem>
                        <SelectItem value="hardware">{t('hardwareCategory')}</SelectItem>
                        <SelectItem value="security">{t('securityCategory')}</SelectItem>
                        <SelectItem value="maintenance">{t('maintenanceCategory')}</SelectItem>
                        <SelectItem value="performance">{t('performanceCategory')}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Tabs */}
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="bg-muted/50 p-1">
                <TabsTrigger value="all" className="gap-2">
                  {t('all')}
                  <Badge variant="secondary" className="h-5 px-1.5 text-xs">{mockAlerts.length}</Badge>
                </TabsTrigger>
                <TabsTrigger value="active" className="gap-2">
                  {t('active')}
                  <Badge variant="secondary" className="h-5 px-1.5 text-xs bg-red-100 text-red-700 dark:bg-red-900/50 dark:text-red-400">{stats.active}</Badge>
                </TabsTrigger>
                <TabsTrigger value="critical" className="gap-2">
                  {t('critical')}
                  <Badge variant="secondary" className="h-5 px-1.5 text-xs bg-red-100 text-red-700 dark:bg-red-900/50 dark:text-red-400">{stats.critical}</Badge>
                </TabsTrigger>
              </TabsList>

              <TabsContent value={activeTab} className="mt-4 space-y-3">
                {filteredAlerts.length === 0 ? (
                  <Card className="border shadow-sm">
                    <CardContent className="py-12 text-center">
                      <Bell className="h-12 w-12 text-muted-foreground/50 mx-auto mb-4" />
                      <p className="text-muted-foreground">{t('noAlertFound')}</p>
                    </CardContent>
                  </Card>
                ) : (
                  filteredAlerts.map((alert) => {
                    const severityConfig = getSeverityConfig(alert.severity)
                    const statusConfig = getStatusConfig(alert.status)
                    const categoryConfig = getCategoryConfig(alert.category)
                    const SeverityIcon = severityConfig.icon
                    const CategoryIcon = categoryConfig.icon

                    return (
                      <Card
                        key={alert.id}
                        className={`border shadow-sm cursor-pointer transition-all hover:shadow-md ${
                          alert.severity === 'critical' && alert.status === 'active' 
                            ? 'border-red-300 dark:border-red-800 ring-1 ring-red-200 dark:ring-red-900' 
                            : ''
                        }`}
                        onClick={() => setSelectedAlert(alert)}
                      >
                        <CardContent className="p-4">
                          <div className="flex gap-4">
                            {/* Severity Indicator */}
                            <div className="flex flex-col items-center gap-2">
                              <div className={`p-2 rounded-lg ${severityConfig.lightBg}`}>
                                <SeverityIcon className={`h-5 w-5 ${severityConfig.text}`} />
                              </div>
                              {severityConfig.pulse && alert.status === 'active' && (
                                <span className="relative flex h-2 w-2">
                                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                                  <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                                </span>
                              )}
                            </div>

                            {/* Content */}
                            <div className="flex-1 min-w-0">
                              <div className="flex items-start justify-between gap-2">
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-center gap-2 mb-1">
                                    <h3 className="font-semibold text-sm truncate">{alert.title}</h3>
                                    <Badge className={`${statusConfig.bg} ${statusConfig.text} border-0 text-xs`}>
                                      {statusConfig.label}
                                    </Badge>
                                  </div>
                                  <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                                    {alert.description}
                                  </p>
                                </div>
                                <DropdownMenu>
                                  <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                                    <Button variant="ghost" size="icon" className="h-8 w-8 shrink-0">
                                      <MoreVertical className="h-4 w-4" />
                                    </Button>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent align="end">
                                    <DropdownMenuItem>
                                      <Eye className="h-4 w-4 mr-2" />
                                      {t('acknowledge')}
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                      <CheckCircle2 className="h-4 w-4 mr-2" />
                                      {t('markResolved')}
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem>
                                      <BellOff className="h-4 w-4 mr-2" />
                                      {t('ignore')}
                                    </DropdownMenuItem>
                                  </DropdownMenuContent>
                                </DropdownMenu>
                              </div>

                              {/* Meta Info */}
                              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-muted-foreground">
                                <div className="flex items-center gap-1.5">
                                  <Server className="h-3.5 w-3.5" />
                                  <span>{alert.deviceName}</span>
                                </div>
                                <div className="flex items-center gap-1.5">
                                  <CategoryIcon className={`h-3.5 w-3.5 ${categoryConfig.color}`} />
                                  <span>{categoryConfig.label}</span>
                                </div>
                                <div className="flex items-center gap-1.5">
                                  <Clock className="h-3.5 w-3.5" />
                                  <span>{formatTime(alert.timestamp)}</span>
                                </div>
                                {alert.affectedUsers && (
                                  <div className="flex items-center gap-1.5">
                                    <Users className="h-3.5 w-3.5" />
                                    <span>{alert.affectedUsers} {t('affected')}</span>
                                  </div>
                                )}
                              </div>

                              {/* Technical Badge */}
                              {alert.technicalDetails.errorCode && (
                                <div className="mt-3 flex items-center gap-2">
                                  <code className="text-xs bg-muted px-2 py-1 rounded font-mono">
                                    {alert.technicalDetails.errorCode}
                                  </code>
                                  {alert.technicalDetails.currentValue && (
                                    <span className="text-xs text-red-600 dark:text-red-400">
                                      {alert.technicalDetails.currentValue}
                                    </span>
                                  )}
                                </div>
                              )}
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

          {/* Side Panel */}
          <div className="space-y-4">
            {/* Quick Stats */}
            <Card className="border shadow-sm">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium flex items-center gap-2">
                  <Gauge className="h-4 w-4" />
                  {t('severityDistribution')}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {(['critical', 'high', 'medium', 'low', 'info'] as AlertSeverity[]).map((severity) => {
                  const config = getSeverityConfig(severity)
                  const count = mockAlerts.filter(a => a.severity === severity).length
                  const percentage = Math.round((count / mockAlerts.length) * 100)
                  
                  return (
                    <div key={severity} className="space-y-1.5">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-medium">{config.label}</span>
                        <span className="text-muted-foreground">{count}</span>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div 
                          className={`h-full ${config.bg} rounded-full transition-all`}
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                    </div>
                  )
                })}
              </CardContent>
            </Card>

            {/* Category Stats */}
            <Card className="border shadow-sm">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium flex items-center gap-2">
                  <BarChart3 className="h-4 w-4" />
                  {t('categoryBased')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {(['power', 'connectivity', 'hardware', 'security', 'maintenance', 'performance'] as AlertCategory[]).map((category) => {
                    const config = getCategoryConfig(category)
                    const CategoryIcon = config.icon
                    const count = mockAlerts.filter(a => a.category === category && a.status === 'active').length
                    
                    return (
                      <div 
                        key={category} 
                        className="flex items-center justify-between p-2 rounded-lg hover:bg-muted/50 cursor-pointer transition-colors"
                        onClick={() => setCategoryFilter(category)}
                      >
                        <div className="flex items-center gap-2">
                          <CategoryIcon className={`h-4 w-4 ${config.color}`} />
                          <span className="text-sm">{config.label}</span>
                        </div>
                        <Badge variant={count > 0 ? "default" : "secondary"} className="h-5 px-1.5">
                          {count}
                        </Badge>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Recent Resolved */}
            <Card className="border shadow-sm">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-500" />
                  {t('recentResolved')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {mockAlerts
                    .filter(a => a.status === 'resolved')
                    .slice(0, 3)
                    .map((alert) => (
                      <div 
                        key={alert.id} 
                        className="flex items-start gap-3 p-2 rounded-lg hover:bg-muted/50 cursor-pointer"
                        onClick={() => setSelectedAlert(alert)}
                      >
                        <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 shrink-0" />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium truncate">{alert.title}</p>
                          <p className="text-xs text-muted-foreground">{formatTime(alert.resolvedAt!)}</p>
                        </div>
                        <ChevronRight className="h-4 w-4 text-muted-foreground" />
                      </div>
                    ))
                  }
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </Main>

      {/* Alert Detail Dialog */}
      {selectedAlert && (
        <Dialog open={!!selectedAlert} onOpenChange={() => setSelectedAlert(null)}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-hidden flex flex-col">
            <DialogHeader className="shrink-0">
              <div className="flex items-start gap-4">
                <div className={`p-3 rounded-xl ${getSeverityConfig(selectedAlert.severity).lightBg}`}>
                  {(() => {
                    const Icon = getSeverityConfig(selectedAlert.severity).icon
                    return <Icon className={`h-6 w-6 ${getSeverityConfig(selectedAlert.severity).text}`} />
                  })()}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <Badge className={`${getSeverityConfig(selectedAlert.severity).lightBg} ${getSeverityConfig(selectedAlert.severity).text} border-0`}>
                      {getSeverityConfig(selectedAlert.severity).label}
                    </Badge>
                    <Badge className={`${getStatusConfig(selectedAlert.status).bg} ${getStatusConfig(selectedAlert.status).text} border-0`}>
                      {getStatusConfig(selectedAlert.status).label}
                    </Badge>
                  </div>
                  <DialogTitle className="text-lg">{selectedAlert.title}</DialogTitle>
                  <p className="text-sm text-muted-foreground mt-1">{selectedAlert.description}</p>
                </div>
              </div>
            </DialogHeader>

            <ScrollArea className="flex-1 -mx-6 px-6">
              <div className="space-y-6 py-4">
                {/* Device Info */}
                <div className="grid grid-cols-2 gap-4">
                  <Card className="border bg-muted/30">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3">
                        <Server className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <p className="text-xs text-muted-foreground">{t('device')}</p>
                          <p className="font-medium text-sm">{selectedAlert.deviceName}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  <Card className="border bg-muted/30">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3">
                        <Gauge className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <p className="text-xs text-muted-foreground">{t('location')}</p>
                          <p className="font-medium text-sm">{selectedAlert.location}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Technical Details */}
                <Card className="border">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm flex items-center gap-2">
                      <FileText className="h-4 w-4" />
                      {t('technicalDetails')}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {selectedAlert.technicalDetails.errorCode && (
                      <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                        <span className="text-sm text-muted-foreground">{t('errorCode')}</span>
                        <code className="font-mono text-sm bg-background px-2 py-1 rounded">
                          {selectedAlert.technicalDetails.errorCode}
                        </code>
                      </div>
                    )}
                    
                    {selectedAlert.technicalDetails.currentValue && (
                      <div className="grid grid-cols-2 gap-4">
                        <div className="p-3 bg-red-50 dark:bg-red-950/30 rounded-lg border border-red-200 dark:border-red-900">
                          <p className="text-xs text-red-600 dark:text-red-400 mb-1">{t('currentValue')}</p>
                          <p className="font-semibold text-red-700 dark:text-red-300">{selectedAlert.technicalDetails.currentValue}</p>
                        </div>
                        {selectedAlert.technicalDetails.expectedValue && (
                          <div className="p-3 bg-green-50 dark:bg-green-950/30 rounded-lg border border-green-200 dark:border-green-900">
                            <p className="text-xs text-green-600 dark:text-green-400 mb-1">{t('expectedValue')}</p>
                            <p className="font-semibold text-green-700 dark:text-green-300">{selectedAlert.technicalDetails.expectedValue}</p>
                          </div>
                        )}
                      </div>
                    )}

                    {selectedAlert.technicalDetails.affectedMetrics && (
                      <div>
                        <p className="text-xs text-muted-foreground mb-2">{t('affectedMetrics')}</p>
                        <div className="flex flex-wrap gap-2">
                          {selectedAlert.technicalDetails.affectedMetrics.map((metric, i) => (
                            <Badge key={i} variant="outline" className="text-xs">
                              {metric}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Impact Analysis */}
                <Card className="border">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm flex items-center gap-2">
                      <BarChart3 className="h-4 w-4" />
                      {t('impactAnalysis')}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="text-center p-3 bg-muted/50 rounded-lg">
                        <p className="text-2xl font-bold capitalize">{selectedAlert.impactLevel}</p>
                        <p className="text-xs text-muted-foreground">{t('impactLevel')}</p>
                      </div>
                      {selectedAlert.affectedUsers && (
                        <div className="text-center p-3 bg-muted/50 rounded-lg">
                          <p className="text-2xl font-bold">{selectedAlert.affectedUsers}</p>
                          <p className="text-xs text-muted-foreground">{t('affectedUserCount')}</p>
                        </div>
                      )}
                      {selectedAlert.estimatedDowntime && (
                        <div className="text-center p-3 bg-muted/50 rounded-lg">
                          <p className="text-lg font-bold">{selectedAlert.estimatedDowntime}</p>
                          <p className="text-xs text-muted-foreground">{t('estimatedDowntime')}</p>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>

                {/* Timeline */}
                {(selectedAlert.acknowledgedAt || selectedAlert.resolvedAt) && (
                  <Card className="border">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        {t('timeline')}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-start gap-3">
                          <div className="w-2 h-2 rounded-full bg-red-500 mt-2" />
                          <div className="flex-1">
                            <p className="text-sm font-medium">{t('alertCreated')}</p>
                            <p className="text-xs text-muted-foreground">
                              {new Date(selectedAlert.timestamp).toLocaleString(language === 'tr' ? 'tr-TR' : 'en-US')}
                            </p>
                          </div>
                        </div>
                        {selectedAlert.acknowledgedAt && (
                          <div className="flex items-start gap-3">
                            <div className="w-2 h-2 rounded-full bg-amber-500 mt-2" />
                            <div className="flex-1">
                              <p className="text-sm font-medium">{t('acknowledgedLabel')}</p>
                              <p className="text-xs text-muted-foreground">
                                {new Date(selectedAlert.acknowledgedAt).toLocaleString(language === 'tr' ? 'tr-TR' : 'en-US')} • {selectedAlert.acknowledgedBy}
                              </p>
                            </div>
                          </div>
                        )}
                        {selectedAlert.resolvedAt && (
                          <div className="flex items-start gap-3">
                            <div className="w-2 h-2 rounded-full bg-green-500 mt-2" />
                            <div className="flex-1">
                              <p className="text-sm font-medium">{t('resolved')}</p>
                              <p className="text-xs text-muted-foreground">
                                {new Date(selectedAlert.resolvedAt).toLocaleString(language === 'tr' ? 'tr-TR' : 'en-US')} • {selectedAlert.resolvedBy}
                              </p>
                            </div>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Related Alerts */}
                {selectedAlert.relatedAlerts && selectedAlert.relatedAlerts.length > 0 && (
                  <Card className="border">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm flex items-center gap-2">
                        <Link2 className="h-4 w-4" />
                        {t('relatedAlerts')}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2">
                        {selectedAlert.relatedAlerts.map((id) => {
                          const related = mockAlerts.find(a => a.id === id)
                          if (!related) return null
                          return (
                            <Badge 
                              key={id} 
                              variant="outline" 
                              className="cursor-pointer hover:bg-muted"
                              onClick={() => setSelectedAlert(related)}
                            >
                              {id}: {related.title.slice(0, 20)}...
                            </Badge>
                          )
                        })}
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            </ScrollArea>

            <Separator />
            
            {/* Actions */}
            <div className="flex justify-between items-center pt-4 shrink-0">
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="gap-2">
                  <FileText className="h-4 w-4" />
                  {t('report')}
                </Button>
                <Button variant="outline" size="sm" className="gap-2">
                  <Archive className="h-4 w-4" />
                  {t('archive')}
                </Button>
              </div>
              <div className="flex gap-2">
                {selectedAlert.status === 'active' && (
                  <>
                    <Button variant="outline" size="sm" className="gap-2">
                      <Eye className="h-4 w-4" />
                      {t('acknowledge')}
                    </Button>
                    <Button size="sm" className="gap-2">
                      <CheckCircle2 className="h-4 w-4" />
                      {t('resolved')}
                    </Button>
                  </>
                )}
                {selectedAlert.status === 'acknowledged' && (
                  <Button size="sm" className="gap-2">
                    <CheckCircle2 className="h-4 w-4" />
                    {t('resolved')}
                  </Button>
                )}
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </>
  )
}
