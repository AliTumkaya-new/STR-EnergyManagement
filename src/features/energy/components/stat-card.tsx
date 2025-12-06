import { Card, CardContent, CardDescription, CardHeader } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import { TrendingUp, TrendingDown } from 'lucide-react'

interface StatCardProps {
  title: string
  value: string | number
  unit?: string
  description?: string
  trend?: number
  trendLabel?: string
  icon?: React.ReactNode
  iconColor?: string
  className?: string
}

export function StatCard({
  title,
  value,
  unit,
  description,
  trend,
  trendLabel,
  icon,
  iconColor = 'text-primary',
  className,
}: StatCardProps) {
  const isPositive = trend && trend > 0
  const isNegative = trend && trend < 0

  return (
    <Card className={cn('@container/card', className)}>
      <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
        <CardDescription className='text-sm font-medium'>{title}</CardDescription>
        {icon && <div className={cn('h-5 w-5', iconColor)}>{icon}</div>}
      </CardHeader>
      <CardContent>
        <div className='flex items-baseline gap-1'>
          <span className='text-2xl font-bold tabular-nums @[250px]/card:text-3xl'>{value}</span>
          {unit && <span className='text-sm text-muted-foreground'>{unit}</span>}
        </div>
        {(trend !== undefined || description) && (
          <div className='mt-2 flex flex-col gap-1'>
            {trend !== undefined && (
              <div className='flex items-center gap-1'>
                <Badge variant='outline' className={cn(
                  'text-xs',
                  isPositive && 'border-green-500/50 text-green-600',
                  isNegative && 'border-red-500/50 text-red-600'
                )}>
                  {isPositive ? <TrendingUp className='mr-1 h-3 w-3' /> : <TrendingDown className='mr-1 h-3 w-3' />}
                  {isPositive ? '+' : ''}{trend}%
                </Badge>
                {trendLabel && <span className='text-xs text-muted-foreground'>{trendLabel}</span>}
              </div>
            )}
            {description && (
              <p className='text-xs text-muted-foreground'>{description}</p>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  )
}