import {
  LayoutDashboard,
  Sun,
  Zap,
  Flame,
  Droplets,
  Battery,
  Cpu,
  Bell,
  Settings,
  UserCog,
  Wrench,
  Palette,
  Monitor,
  FileText,
  BarChart3,
  TrendingUp,
  AlertTriangle,
  Map,
  Building2,
  HelpCircle,
  Activity,
} from 'lucide-react'
import { type SidebarData } from '../types'
import { useLanguage } from '@/lib/i18n'

export function useSidebarData(): SidebarData {
  const { t } = useLanguage()

  return {
    user: {
      name: 'Admin',
      email: 'admin@strenerji.com',
      avatar: '/avatars/admin.jpg',
    },
    teams: [
      {
        name: 'STR Enerji',
        logo: Zap,
        plan: 'Enerji Yonetim Sistemi',
      },
      {
        name: 'Fabrika A',
        logo: Building2,
        plan: 'Uretim Tesisi',
      },
      {
        name: 'Fabrika B',
        logo: Building2,
        plan: 'Depo Tesisi',
      },
    ],
    navGroups: [
      {
        title: t('sidebarGeneral'),
        items: [
          {
            title: t('sidebarDashboard'),
            url: '/',
            icon: LayoutDashboard,
          },
          {
            title: t('sidebarLiveMonitoring'),
            url: '/live',
            icon: Activity,
            badge: t('sidebarLive'),
          },
          {
            title: t('sidebarMapView'),
            url: '/map',
            icon: Map,
          },
        ],
      },
      {
        title: t('sidebarEnergySources'),
        items: [
          {
            title: t('sidebarSolarEnergy'),
            url: '/energy/solar',
            icon: Sun,
          },
          {
            title: t('sidebarElectricity'),
            url: '/energy/electricity',
            icon: Zap,
          },
          {
            title: t('sidebarNaturalGas'),
            url: '/energy/gas',
            icon: Flame,
          },
          {
            title: t('sidebarWater'),
            url: '/energy/water',
            icon: Droplets,
          },
          {
            title: t('sidebarBatterySystem'),
            url: '/energy/battery',
            icon: Battery,
          },
        ],
      },
      {
        title: t('sidebarDeviceManagement'),
        items: [
          {
            title: t('sidebarAllDevices'),
            url: '/devices',
            icon: Cpu,
          },
          {
            title: t('sidebarAlerts'),
            url: '/alerts',
            icon: AlertTriangle,
            badge: '3',
          },
        ],
      },
      {
        title: t('sidebarReports'),
        items: [
          {
            title: t('sidebarAnalytics'),
            icon: BarChart3,
            items: [
              {
                title: t('consumptionAnalysis'),
                url: '/analytics/consumption',
              },
              {
                title: t('productionAnalysis'),
                url: '/analytics/production',
              },
              {
                title: t('costAnalysis'),
                url: '/analytics/cost',
              },
              {
                title: t('carbonFootprint'),
                url: '/analytics/carbon-footprint',
              },
            ],
          },
          {
            title: t('sidebarAnalyticsReports'),
            icon: FileText,
            items: [
              {
                title: t('dailyReport'),
                url: '/reports/daily',
              },
              {
                title: t('weeklyReport'),
                url: '/reports/weekly',
              },
              {
                title: t('monthlyReport'),
                url: '/reports/monthly',
              },
              {
                title: t('customReport'),
                url: '/reports/custom',
              },
            ],
          },
          {
            title: t('sidebarForecasts'),
            url: '/forecasts',
            icon: TrendingUp,
          },
        ],
      },
      {
        title: t('sidebarSystem'),
        items: [
          {
            title: t('sidebarSettings'),
            icon: Settings,
            items: [
              {
                title: t('profile'),
                url: '/settings',
                icon: UserCog,
              },
              {
                title: t('systemSettings'),
                url: '/settings/system',
                icon: Wrench,
              },
              {
                title: t('appearance'),
                url: '/settings/appearance',
                icon: Palette,
              },
              {
                title: t('notifications'),
                url: '/settings/notifications',
                icon: Bell,
              },
              {
                title: t('display'),
                url: '/settings/display',
                icon: Monitor,
              },
            ],
          },
          {
            title: t('sidebarHelpCenter'),
            url: '/help',
            icon: HelpCircle,
          },
        ],
      },
    ],
  }
}

// Eski export icin uyumluluk
export const sidebarData: SidebarData = {
  user: {
    name: 'Admin',
    email: 'admin@strenerji.com',
    avatar: '/avatars/admin.jpg',
  },
  teams: [
    {
      name: 'STR Enerji',
      logo: Zap,
      plan: 'Enerji Yonetim Sistemi',
    },
    {
      name: 'Fabrika A',
      logo: Building2,
      plan: 'Uretim Tesisi',
    },
    {
      name: 'Fabrika B',
      logo: Building2,
      plan: 'Depo Tesisi',
    },
  ],
  navGroups: [],
}