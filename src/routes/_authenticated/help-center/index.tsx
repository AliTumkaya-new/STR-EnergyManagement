import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Header } from '@/components/layout/header'
import { useLanguage } from '@/lib/i18n'
import { 
  Search, 
  BookOpen, 
  MessageCircle, 
  Phone, 
  Mail, 
  FileText, 
  Video, 
  HelpCircle,
  ChevronRight,
  ChevronDown,
  Zap,
  Sun,
  Battery,
  Activity,
  Settings,
  Users,
  Shield,
  Clock,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  PlayCircle,
  Download,
  Lightbulb,
  Headphones,
  Globe,
  BarChart3,
  Gauge,
  Building2
} from 'lucide-react'

export const Route = createFileRoute('/_authenticated/help-center/')({
  component: HelpCenterPage,
})

function HelpCenterPage() {
  const { t } = useLanguage()
  const [searchQuery, setSearchQuery] = useState('')
  const [expandedFaq, setExpandedFaq] = useState<string | null>(null)
  const [selectedCategory, setSelectedCategory] = useState<string>('all')

  // SSS Verileri - i18n
  const faqData = [
    {
      category: t('general'),
      icon: HelpCircle,
      questions: [
        { q: t('faqWhatIsStr'), a: t('faqWhatIsStrAnswer') },
        { q: t('faqHowToAccess'), a: t('faqHowToAccessAnswer') },
        { q: t('faqDataSecurity'), a: t('faqDataSecurityAnswer') }
      ]
    },
    {
      category: t('energyMonitoring'),
      icon: Activity,
      questions: [
        { q: t('faqViewLiveData'), a: t('faqViewLiveDataAnswer') },
        { q: t('faqAnalyzeCharts'), a: t('faqAnalyzeChartsAnswer') },
        { q: t('faqCarbonFootprint'), a: t('faqCarbonFootprintAnswer') }
      ]
    },
    {
      category: t('solarEnergy'),
      icon: Sun,
      questions: [
        { q: t('faqPanelEfficiency'), a: t('faqPanelEfficiencyAnswer') },
        { q: t('faqInverterFaults'), a: t('faqInverterFaultsAnswer') },
        { q: t('faqSolarForecast'), a: t('faqSolarForecastAnswer') }
      ]
    },
    {
      category: t('batterySystem'),
      icon: Battery,
      questions: [
        { q: t('faqBatteryOptimize'), a: t('faqBatteryOptimizeAnswer') },
        { q: t('faqBatteryHealth'), a: t('faqBatteryHealthAnswer') },
        { q: t('faqEmergencyBattery'), a: t('faqEmergencyBatteryAnswer') }
      ]
    },
    {
      category: t('reporting'),
      icon: FileText,
      questions: [
        { q: t('faqAutoReport'), a: t('faqAutoReportAnswer') },
        { q: t('faqCustomReport'), a: t('faqCustomReportAnswer') },
        { q: t('faqCostReport'), a: t('faqCostReportAnswer') }
      ]
    }
  ]

  // Eğitim Videoları - i18n
  const videoTutorials = [
    { title: t('videoGettingStarted'), duration: '5:30', category: t('beginner'), thumbnail: '🎬' },
    { title: t('videoDashboard'), duration: '8:15', category: t('beginner'), thumbnail: '📊' },
    { title: t('video3DMap'), duration: '12:45', category: t('advanced'), thumbnail: '🗺️' },
    { title: t('videoAnalytics'), duration: '15:20', category: t('advanced'), thumbnail: '📈' },
    { title: t('videoReports'), duration: '7:00', category: t('beginner'), thumbnail: '📄' },
    { title: t('videoAlarms'), duration: '6:30', category: t('settingsCategory'), thumbnail: '🔔' },
    { title: t('videoBattery'), duration: '10:15', category: t('advanced'), thumbnail: '🔋' },
    { title: t('videoApi'), duration: '18:00', category: t('developer'), thumbnail: '🔌' },
  ]

  // Dökümanlar - i18n
  const documents = [
    { title: t('userGuide'), type: 'PDF', size: '2.4 MB', icon: BookOpen },
    { title: t('technicalDocs'), type: 'PDF', size: '5.1 MB', icon: FileText },
    { title: t('apiReference'), type: 'HTML', size: t('online'), icon: Globe },
    { title: t('commonIssues'), type: 'PDF', size: '1.2 MB', icon: AlertCircle },
    { title: t('securityPolicy'), type: 'PDF', size: '890 KB', icon: Shield },
    { title: t('systemRequirements'), type: 'PDF', size: '450 KB', icon: Settings },
  ]

  // Hızlı Başlangıç Kartları - i18n
  const quickStartCards = [
    {
      title: t('dashboardUsage'),
      description: t('dashboardUsageDesc'),
      icon: BarChart3,
      color: 'blue'
    },
    {
      title: t('liveMonitoringTitle'),
      description: t('liveMonitoringDesc'),
      icon: Activity,
      color: 'green'
    },
    {
      title: t('energyAnalysis'),
      description: t('energyAnalysisDesc'),
      icon: Gauge,
      color: 'purple'
    },
    {
      title: t('reportGeneration'),
      description: t('reportGenerationDesc'),
      icon: FileText,
      color: 'orange'
    }
  ]

  const filteredFaqs = faqData.filter(category => 
    selectedCategory === 'all' || category.category === selectedCategory
  ).map(category => ({
    ...category,
    questions: category.questions.filter(q => 
      q.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.a.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(category => category.questions.length > 0)

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <Header fixed />
      
      {/* Hero Section */}
      <div className="relative overflow-hidden border-b border-border bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 px-6 py-12">
        <div className="absolute inset-0 bg-grid-white/[0.02]" />
        <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
        
        <div className="relative mx-auto max-w-4xl text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-1.5">
            <Headphones className="h-4 w-4 text-blue-400" />
            <span className="text-sm font-medium text-blue-400">{t('support247')}</span>
          </div>
          
          <h1 className="mb-4 text-4xl font-bold tracking-tight text-white">
            {t('helpCenter')}
          </h1>
          <p className="mb-8 text-lg text-slate-400">
            {t('helpCenterSubtitle')}
          </p>

          {/* Arama */}
          <div className="relative mx-auto max-w-2xl">
            <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
            <Input
              placeholder={t('helpSearchPlaceholder')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-14 rounded-xl border-slate-700 bg-slate-800/50 pl-12 pr-4 text-lg placeholder:text-slate-500 focus:border-blue-500 focus:ring-blue-500/20"
            />
          </div>
        </div>
      </div>

      {/* Ana İçerik */}
      <div className="flex-1 overflow-auto p-6">
        <div className="mx-auto max-w-7xl">
          {/* Hızlı Başlangıç */}
          <div className="mb-8">
            <div className="mb-4 flex items-center gap-2">
              <Lightbulb className="h-5 w-5 text-yellow-400" />
              <h2 className="text-lg font-semibold">{t('quickStart')}</h2>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {quickStartCards.map((card, i) => (
                <Card key={i} className="group cursor-pointer border-border bg-card p-4 transition-all hover:border-blue-500/50 hover:shadow-lg hover:shadow-blue-500/5">
                  <div className={`mb-3 inline-flex rounded-lg p-2.5 ${
                    card.color === 'blue' ? 'bg-blue-500/10' :
                    card.color === 'green' ? 'bg-green-500/10' :
                    card.color === 'purple' ? 'bg-purple-500/10' :
                    'bg-orange-500/10'
                  }`}>
                    <card.icon className={`h-5 w-5 ${
                      card.color === 'blue' ? 'text-blue-400' :
                      card.color === 'green' ? 'text-green-400' :
                      card.color === 'purple' ? 'text-purple-400' :
                      'text-orange-400'
                    }`} />
                  </div>
                  <h3 className="mb-1 font-semibold group-hover:text-blue-400">{card.title}</h3>
                  <p className="text-sm text-muted-foreground">{card.description}</p>
                  <ChevronRight className="mt-3 h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-blue-400" />
                </Card>
              ))}
            </div>
          </div>

          {/* Tabs */}
          <Tabs defaultValue="faq" className="space-y-6">
            <TabsList className="grid w-full max-w-lg grid-cols-4 bg-muted/50">
              <TabsTrigger value="faq" className="gap-2">
                <HelpCircle className="h-4 w-4" />
                <span className="hidden sm:inline">{t('faq')}</span>
              </TabsTrigger>
              <TabsTrigger value="videos" className="gap-2">
                <Video className="h-4 w-4" />
                <span className="hidden sm:inline">{t('videos')}</span>
              </TabsTrigger>
              <TabsTrigger value="docs" className="gap-2">
                <FileText className="h-4 w-4" />
                <span className="hidden sm:inline">{t('docs')}</span>
              </TabsTrigger>
              <TabsTrigger value="contact" className="gap-2">
                <MessageCircle className="h-4 w-4" />
                <span className="hidden sm:inline">{t('contact')}</span>
              </TabsTrigger>
            </TabsList>

            {/* SSS Tab */}
            <TabsContent value="faq" className="space-y-6">
              {/* Kategori Filtreleri */}
              <div className="flex flex-wrap gap-2">
                <Button
                  variant={selectedCategory === 'all' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedCategory('all')}
                  className="rounded-full"
                >
                  {t('all')}
                </Button>
                {faqData.map((cat) => (
                  <Button
                    key={cat.category}
                    variant={selectedCategory === cat.category ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setSelectedCategory(cat.category)}
                    className="gap-1.5 rounded-full"
                  >
                    <cat.icon className="h-3.5 w-3.5" />
                    {cat.category}
                  </Button>
                ))}
              </div>

              {/* SSS Listesi */}
              <div className="space-y-4">
                {filteredFaqs.map((category) => (
                  <div key={category.category}>
                    <div className="mb-3 flex items-center gap-2">
                      <category.icon className="h-4 w-4 text-muted-foreground" />
                      <h3 className="font-semibold text-muted-foreground">{category.category}</h3>
                      <Badge variant="secondary" className="text-xs">{category.questions.length}</Badge>
                    </div>
                    <div className="space-y-2">
                      {category.questions.map((item, i) => {
                        const isExpanded = expandedFaq === `${category.category}-${i}`
                        return (
                          <Card
                            key={i}
                            className={`cursor-pointer border-border bg-card transition-all ${isExpanded ? 'border-blue-500/50 shadow-lg shadow-blue-500/5' : 'hover:border-border/80'}`}
                            onClick={() => setExpandedFaq(isExpanded ? null : `${category.category}-${i}`)}
                          >
                            <div className="flex items-start justify-between p-4">
                              <div className="flex-1 pr-4">
                                <h4 className="font-medium">{item.q}</h4>
                                {isExpanded && (
                                  <p className="mt-3 text-sm text-muted-foreground leading-relaxed animate-in fade-in slide-in-from-top-2">
                                    {item.a}
                                  </p>
                                )}
                              </div>
                              <ChevronDown className={`h-5 w-5 shrink-0 text-muted-foreground transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                            </div>
                          </Card>
                        )
                      })}
                    </div>
                  </div>
                ))}

                {filteredFaqs.length === 0 && (
                  <div className="py-12 text-center">
                    <HelpCircle className="mx-auto mb-4 h-12 w-12 text-muted-foreground/50" />
                    <h3 className="mb-2 font-semibold">{t('noResultsFound')}</h3>
                    <p className="text-sm text-muted-foreground">
                      {t('noResultsFoundDesc')}
                    </p>
                  </div>
                )}
              </div>
            </TabsContent>

            {/* Videolar Tab */}
            <TabsContent value="videos" className="space-y-6">
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {videoTutorials.map((video, i) => (
                  <Card key={i} className="group cursor-pointer overflow-hidden border-border bg-card transition-all hover:border-blue-500/50 hover:shadow-lg">
                    <div className="relative aspect-video bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center">
                      <span className="text-4xl">{video.thumbnail}</span>
                      <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity group-hover:opacity-100">
                        <div className="rounded-full bg-white/90 p-3">
                          <PlayCircle className="h-8 w-8 text-slate-900" />
                        </div>
                      </div>
                      <Badge className="absolute bottom-2 right-2 bg-black/70 text-white">
                        {video.duration}
                      </Badge>
                    </div>
                    <div className="p-3">
                      <Badge variant="outline" className="mb-2 text-[10px]">{video.category}</Badge>
                      <h4 className="text-sm font-medium line-clamp-2">{video.title}</h4>
                    </div>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Dökümanlar Tab */}
            <TabsContent value="docs" className="space-y-4">
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {documents.map((doc, i) => (
                  <Card key={i} className="group cursor-pointer border-border bg-card p-4 transition-all hover:border-blue-500/50 hover:shadow-lg">
                    <div className="flex items-start gap-3">
                      <div className="rounded-lg bg-blue-500/10 p-2.5">
                        <doc.icon className="h-5 w-5 text-blue-400" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium group-hover:text-blue-400">{doc.title}</h4>
                        <div className="mt-1 flex items-center gap-2 text-xs text-muted-foreground">
                          <span>{doc.type}</span>
                          <span>•</span>
                          <span>{doc.size}</span>
                        </div>
                      </div>
                      <Button variant="ghost" size="icon" className="shrink-0">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* İletişim Tab */}
            <TabsContent value="contact" className="space-y-6">
              <div className="grid gap-6 lg:grid-cols-3">
                {/* Canlı Destek */}
                <Card className="border-green-500/30 bg-gradient-to-br from-green-500/5 to-transparent p-6">
                  <div className="mb-4 inline-flex rounded-xl bg-green-500/10 p-3">
                    <MessageCircle className="h-6 w-6 text-green-400" />
                  </div>
                  <h3 className="mb-2 text-lg font-semibold">{t('liveSupport')}</h3>
                  <p className="mb-4 text-sm text-muted-foreground">
                    {t('liveSupportDesc')}
                  </p>
                  <div className="mb-4 flex items-center gap-2">
                    <span className="relative flex h-2.5 w-2.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
                    </span>
                    <span className="text-sm text-green-400">{t('onlineNow')}</span>
                  </div>
                  <Button className="w-full bg-green-600 hover:bg-green-700">
                    <MessageCircle className="mr-2 h-4 w-4" />
                    {t('startChat')}
                  </Button>
                </Card>

                {/* Telefon */}
                <Card className="border-blue-500/30 bg-gradient-to-br from-blue-500/5 to-transparent p-6">
                  <div className="mb-4 inline-flex rounded-xl bg-blue-500/10 p-3">
                    <Phone className="h-6 w-6 text-blue-400" />
                  </div>
                  <h3 className="mb-2 text-lg font-semibold">{t('phoneSupport')}</h3>
                  <p className="mb-4 text-sm text-muted-foreground">
                    {t('phoneSupportDesc')}
                  </p>
                  <div className="mb-4 space-y-1">
                    <p className="text-lg font-bold text-blue-400">0850 XXX XX XX</p>
                    <p className="text-xs text-muted-foreground">{t('fixedRateLine')}</p>
                  </div>
                  <Button variant="outline" className="w-full border-blue-500/30 hover:bg-blue-500/10">
                    <Phone className="mr-2 h-4 w-4" />
                    {t('callNow')}
                  </Button>
                </Card>

                {/* E-posta */}
                <Card className="border-purple-500/30 bg-gradient-to-br from-purple-500/5 to-transparent p-6">
                  <div className="mb-4 inline-flex rounded-xl bg-purple-500/10 p-3">
                    <Mail className="h-6 w-6 text-purple-400" />
                  </div>
                  <h3 className="mb-2 text-lg font-semibold">{t('emailSupport')}</h3>
                  <p className="mb-4 text-sm text-muted-foreground">
                    {t('emailSupportDesc')}
                  </p>
                  <div className="mb-4">
                    <p className="font-medium text-purple-400">destek@strenerji.com</p>
                  </div>
                  <Button variant="outline" className="w-full border-purple-500/30 hover:bg-purple-500/10">
                    <Mail className="mr-2 h-4 w-4" />
                    {t('sendEmail')}
                  </Button>
                </Card>
              </div>

              {/* Destek Bilgileri */}
              <Card className="border-border bg-card p-6">
                <h3 className="mb-4 font-semibold">{t('supportHoursTitle')}</h3>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  <div className="flex items-start gap-3">
                    <Clock className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="font-medium">{t('workingHours')}</p>
                      <p className="text-sm text-muted-foreground">{t('weekdays')}: 09:00 - 18:00</p>
                      <p className="text-sm text-muted-foreground">{t('weekends')}: 10:00 - 16:00</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Zap className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="font-medium">{t('emergencySupport')}</p>
                      <p className="text-sm text-muted-foreground">{t('emergencyLine')}</p>
                      <p className="text-sm text-green-400">0850 XXX XX XX</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="font-medium">{t('slaGuarantee')}</p>
                      <p className="text-sm text-muted-foreground">{t('firstResponse')}: 2 {t('hours')}</p>
                      <p className="text-sm text-muted-foreground">{t('resolution')}: 24 {t('hours')}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Building2 className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="font-medium">{t('headOffice')}</p>
                      <p className="text-sm text-muted-foreground">İstanbul, Türkiye</p>
                      <p className="text-sm text-muted-foreground">Maslak, Sarıyer</p>
                    </div>
                  </div>
                </div>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
