import { Badge } from '@/components/ui/badge'
import { AlertTriangle, Info, AlertCircle, CheckCircle2 } from 'lucide-react'

const alerts = [
  {
    id: 1,
    message: 'Panel temizligi zamani yaklasıyor',
    device: 'Gunes Panel A',
    severity: 'info',
    time: '2 saat once',
    acknowledged: true,
  },
  {
    id: 2,
    message: 'Elektrik tuketimi normal seviyenin uzerinde',
    device: 'Ana Elektrik Sayaci',
    severity: 'warning',
    time: '4 saat once',
    acknowledged: false,
  },
  {
    id: 3,
    message: 'Batarya sarj seviyesi dusuk',
    device: 'Batarya Sistemi',
    severity: 'warning',
    time: '5 saat once',
    acknowledged: false,
  },
  {
    id: 4,
    message: 'Gunluk limit yaklasıyor (%90)',
    device: 'Dogalgaz Sayaci',
    severity: 'critical',
    time: '6 saat once',
    acknowledged: false,
  },
]

const severityConfig = {
  info: { icon: Info, color: 'text-blue-500', bg: 'bg-blue-500/10' },
  warning: { icon: AlertTriangle, color: 'text-amber-500', bg: 'bg-amber-500/10' },
  critical: { icon: AlertCircle, color: 'text-red-500', bg: 'bg-red-500/10' },
}

export function RecentSales() {
  return (
    <div className='space-y-4'>
      {alerts.map((alert) => {
        const config = severityConfig[alert.severity as keyof typeof severityConfig]
        const Icon = config.icon
        return (
          <div key={alert.id} className={'flex items-start gap-3 p-3 rounded-lg border ' + (alert.acknowledged ? 'opacity-60' : '')}>
            <div className={'p-2 rounded-full ' + config.bg}>
              <Icon className={'h-4 w-4 ' + config.color} />
            </div>
            <div className='flex-1 space-y-1'>
              <p className='text-sm font-medium leading-none'>{alert.message}</p>
              <p className='text-xs text-muted-foreground'>{alert.device}</p>
            </div>
            <div className='text-right'>
              <p className='text-xs text-muted-foreground'>{alert.time}</p>
              {alert.acknowledged ? (
                <Badge variant='secondary' className='mt-1 text-xs'>
                  <CheckCircle2 className='mr-1 h-3 w-3' />
                  Onaylandi
                </Badge>
              ) : (
                <Badge variant='outline' className='mt-1 text-xs cursor-pointer hover:bg-muted'>
                  Onayla
                </Badge>
              )}
            </div>
          </div>
        )
      })}
    </div>
  )
}
