import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

interface DeviceStatusProps {
  name: string
  location: string
  status: 'online' | 'offline' | 'warning' | 'maintenance'
  metrics?: { label: string; value: string | number; unit?: string }[]
  lastUpdate?: string
  icon?: React.ReactNode
}

const statusConfig = {
  online: { label: 'Cevrimici', color: 'bg-green-500', textColor: 'text-green-600' },
  offline: { label: 'Cevrimdisi', color: 'bg-red-500', textColor: 'text-red-600' },
  warning: { label: 'Uyari', color: 'bg-yellow-500', textColor: 'text-yellow-600' },
  maintenance: { label: 'Bakim', color: 'bg-blue-500', textColor: 'text-blue-600' },
}

export function DeviceStatus({ name, location, status, metrics, lastUpdate, icon }: DeviceStatusProps) {
  const config = statusConfig[status]

  return (
    <Card>
      <CardHeader className='pb-3'>
        <div className='flex items-center justify-between'>
          <div className='flex items-center gap-3'>
            {icon && <div className='h-10 w-10 rounded-lg bg-muted flex items-center justify-center'>{icon}</div>}
            <div>
              <CardTitle className='text-base'>{name}</CardTitle>
              <CardDescription className='text-xs'>{location}</CardDescription>
            </div>
          </div>
          <Badge variant='outline' className={cn('gap-1.5', config.textColor)}>
            <span className={cn('h-2 w-2 rounded-full', config.color)} />
            {config.label}
          </Badge>
        </div>
      </CardHeader>
      {metrics && metrics.length > 0 && (
        <CardContent className='pt-0'>
          <div className='grid grid-cols-2 gap-3'>
            {metrics.map((metric, index) => (
              <div key={index} className='rounded-lg bg-muted/50 p-3'>
                <p className='text-xs text-muted-foreground'>{metric.label}</p>
                <p className='text-lg font-semibold'>
                  {metric.value}
                  {metric.unit && <span className='text-sm font-normal text-muted-foreground ml-1'>{metric.unit}</span>}
                </p>
              </div>
            ))}
          </div>
          {lastUpdate && (
            <p className='mt-3 text-xs text-muted-foreground'>Son guncelleme: {lastUpdate}</p>
          )}
        </CardContent>
      )}
    </Card>
  )
}