import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { Overview } from './components/overview'
import { RecentSales } from './components/recent-sales'
import { EnergyFlowCard } from './components/energy-flow-card'
import { useLanguage } from '@/lib/i18n'
import { Sun, Zap, Flame, Droplets, TrendingUp, TrendingDown, Download } from 'lucide-react'

export function Dashboard() {
  const { t, language } = useLanguage()
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  return (
    <>
      <Header />

      <Main>
        <div className='mb-2 flex items-center justify-between space-y-2'>
          <div>
            <h1 className='text-2xl font-bold tracking-tight'>{t('dashboardTitle')}</h1>
            <p className='text-muted-foreground text-sm'>
              {t('dashboardWelcome')}
            </p>
          </div>
          <div className='flex items-center space-x-2'>
            <Badge variant='outline' className='gap-1'>
              <span className='relative flex h-2 w-2'>
                <span className='animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75'></span>
                <span className='relative inline-flex rounded-full h-2 w-2 bg-green-500'></span>
              </span>
              {t('live')}
            </Badge>
            <span className='text-sm text-muted-foreground'>
              {currentTime.toLocaleTimeString(language === 'tr' ? 'tr-TR' : 'en-US')}
            </span>
            <Button variant='outline' size='sm'>
              <Download className='mr-2 h-4 w-4' />
              {t('downloadReport')}
            </Button>
          </div>
        </div>

        <Tabs defaultValue='overview' className='space-y-4'>
          <div className='w-full overflow-x-auto pb-2'>
            <TabsList>
              <TabsTrigger value='overview'>{t('overview')}</TabsTrigger>
              <TabsTrigger value='analytics'>{t('analytics')}</TabsTrigger>
              <TabsTrigger value='reports'>{t('reports')}</TabsTrigger>
              <TabsTrigger value='alerts'>{t('alerts')}</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value='overview' className='space-y-4'>
            {/* Ozet Kartlari */}
            <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-4'>
              <Card>
                <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                  <CardTitle className='text-sm font-medium'>{t('solarProduction')}</CardTitle>
                  <Sun className='h-4 w-4 text-amber-500' />
                </CardHeader>
                <CardContent>
                  <div className='text-2xl font-bold'>2,060 kWh</div>
                  <div className='flex items-center text-xs text-green-500'>
                    <TrendingUp className='mr-1 h-3 w-3' />
                    +12.5% {t('comparedToLastMonth')}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                  <CardTitle className='text-sm font-medium'>{t('electricityConsumption')}</CardTitle>
                  <Zap className='h-4 w-4 text-blue-500' />
                </CardHeader>
                <CardContent>
                  <div className='text-2xl font-bold'>3,750 kWh</div>
                  <div className='flex items-center text-xs text-green-500'>
                    <TrendingDown className='mr-1 h-3 w-3' />
                    -5.2% {t('comparedToLastMonth')}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                  <CardTitle className='text-sm font-medium'>{t('gasConsumption')}</CardTitle>
                  <Flame className='h-4 w-4 text-orange-500' />
                </CardHeader>
                <CardContent>
                  <div className='text-2xl font-bold'>561 m3</div>
                  <div className='flex items-center text-xs text-green-500'>
                    <TrendingDown className='mr-1 h-3 w-3' />
                    -8.3% {t('comparedToLastMonth')}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                  <CardTitle className='text-sm font-medium'>{t('waterConsumption')}</CardTitle>
                  <Droplets className='h-4 w-4 text-cyan-500' />
                </CardHeader>
                <CardContent>
                  <div className='text-2xl font-bold'>315 m3</div>
                  <div className='flex items-center text-xs text-red-500'>
                    <TrendingUp className='mr-1 h-3 w-3' />
                    +3.1% {t('comparedToLastMonth')}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Grafikler */}
            <div className='grid grid-cols-1 gap-4 lg:grid-cols-7'>
              <Card className='col-span-1 lg:col-span-4'>
                <CardHeader>
                  <CardTitle>{t('energyProductionConsumption')}</CardTitle>
                  <CardDescription>{t('last7Days')}</CardDescription>
                </CardHeader>
                <CardContent className='ps-2'>
                  <Overview />
                </CardContent>
              </Card>

              <Card className='col-span-1 lg:col-span-3'>
                <CardHeader>
                  <CardTitle>{t('recentAlerts')}</CardTitle>
                  <CardDescription>{t('attentionRequired')}</CardDescription>
                </CardHeader>
                <CardContent>
                  <RecentSales />
                </CardContent>
              </Card>
            </div>

            {/* Maliyet Ozeti */}
            <Card>
              <CardHeader>
                <CardTitle>{t('monthlyCostSummary')}</CardTitle>
                <CardDescription>{t('thisMonthEnergyCosts')}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className='grid gap-4 md:grid-cols-4'>
                  <div className='space-y-2'>
                    <div className='flex items-center justify-between'>
                      <span className='text-sm text-muted-foreground'>{t('electricity')}</span>
                      <span className='font-bold'>4,125 TL</span>
                    </div>
                    <Progress value={52} className='h-2' />
                    <span className='text-xs text-muted-foreground'>{t('ofTotal')}52</span>
                  </div>
                  <div className='space-y-2'>
                    <div className='flex items-center justify-between'>
                      <span className='text-sm text-muted-foreground'>{t('naturalGas')}</span>
                      <span className='font-bold'>2,805 TL</span>
                    </div>
                    <Progress value={36} className='h-2' />
                    <span className='text-xs text-muted-foreground'>{t('ofTotal')}36</span>
                  </div>
                  <div className='space-y-2'>
                    <div className='flex items-center justify-between'>
                      <span className='text-sm text-muted-foreground'>{t('water')}</span>
                      <span className='font-bold'>945 TL</span>
                    </div>
                    <Progress value={12} className='h-2' />
                    <span className='text-xs text-muted-foreground'>{t('ofTotal')}12</span>
                  </div>
                  <div className='flex flex-col items-center justify-center p-4 bg-muted/50 rounded-lg'>
                    <span className='text-sm text-muted-foreground'>{t('totalCost')}</span>
                    <span className='text-3xl font-bold'>7,875 TL</span>
                    <Badge variant='secondary' className='mt-2'>
                      <TrendingDown className='mr-1 h-3 w-3' />
                      -8.5% {t('savings')}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value='analytics' className='space-y-4'>
            <div className='grid grid-cols-1 gap-4 lg:grid-cols-2'>
              <EnergyFlowCard />
              <Card>
                <CardHeader>
                  <CardTitle>{t('analytics')}</CardTitle>
                  <CardDescription>{t('detailedEnergyAnalysis')}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className='space-y-4'>
                    <div className='flex items-center justify-between p-4 bg-amber-500/10 rounded-lg border border-amber-500/20'>
                      <div className='flex items-center gap-3'>
                        <Sun className='h-8 w-8 text-amber-500' />
                        <div>
                          <p className='font-medium'>{t('solarEnergy')}</p>
                          <p className='text-sm text-muted-foreground'>{t('totalProduction')}</p>
                        </div>
                      </div>
                      <span className='text-2xl font-bold text-amber-500'>2,060 kWh</span>
                    </div>
                    <div className='flex items-center justify-between p-4 bg-blue-500/10 rounded-lg border border-blue-500/20'>
                      <div className='flex items-center gap-3'>
                        <Zap className='h-8 w-8 text-blue-500' />
                        <div>
                          <p className='font-medium'>{t('electricity')}</p>
                          <p className='text-sm text-muted-foreground'>{t('totalConsumption')}</p>
                        </div>
                      </div>
                      <span className='text-2xl font-bold text-blue-500'>3,750 kWh</span>
                    </div>
                    <div className='flex items-center justify-between p-4 bg-orange-500/10 rounded-lg border border-orange-500/20'>
                      <div className='flex items-center gap-3'>
                        <Flame className='h-8 w-8 text-orange-500' />
                        <div>
                          <p className='font-medium'>{t('naturalGas')}</p>
                          <p className='text-sm text-muted-foreground'>{t('totalConsumption')}</p>
                        </div>
                      </div>
                      <span className='text-2xl font-bold text-orange-500'>561 m</span>
                    </div>
                    <div className='flex items-center justify-between p-4 bg-cyan-500/10 rounded-lg border border-cyan-500/20'>
                      <div className='flex items-center gap-3'>
                        <Droplets className='h-8 w-8 text-cyan-500' />
                        <div>
                          <p className='font-medium'>{t('water')}</p>
                          <p className='text-sm text-muted-foreground'>{t('totalConsumption')}</p>
                        </div>
                      </div>
                      <span className='text-2xl font-bold text-cyan-500'>315 m</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value='reports' className='space-y-4'>
            <Card>
              <CardHeader>
                <CardTitle>{t('reports')}</CardTitle>
                <CardDescription>{t('reportsComingSoon')}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className='text-muted-foreground'>{t('reportsComingSoon')}</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value='alerts' className='space-y-4'>
            <Card>
              <CardHeader>
                <CardTitle>{t('alerts')}</CardTitle>
                <CardDescription>{t('alertsComingSoon')}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className='text-muted-foreground'>{t('alertsComingSoon')}</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </Main>
    </>
  )
}