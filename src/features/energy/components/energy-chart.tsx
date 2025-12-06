import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from 'recharts'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

interface EnergyChartProps {
  title: string
  description?: string
  data: any[]
  dataKey: string
  xAxisKey?: string
  color?: string
  gradientId?: string
  unit?: string
  timeRange?: string
  onTimeRangeChange?: (value: string) => void
  showTimeSelector?: boolean
}

export function EnergyChart({
  title,
  description,
  data,
  dataKey,
  xAxisKey = 'time',
  color = 'var(--primary)',
  gradientId = 'energyGradient',
  unit = '',
  timeRange = '24h',
  onTimeRangeChange,
  showTimeSelector = true,
}: EnergyChartProps) {
  const chartConfig = {
    [dataKey]: {
      label: title,
      color: color,
    },
  } satisfies ChartConfig

  return (
    <Card className='@container/card'>
      <CardHeader className='flex flex-row items-center justify-between'>
        <div>
          <CardTitle>{title}</CardTitle>
          {description && <CardDescription>{description}</CardDescription>}
        </div>
        {showTimeSelector && onTimeRangeChange && (
          <Select value={timeRange} onValueChange={onTimeRangeChange}>
            <SelectTrigger className='w-32'>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='24h'>Son 24 Saat</SelectItem>
              <SelectItem value='7d'>Son 7 Gun</SelectItem>
              <SelectItem value='30d'>Son 30 Gun</SelectItem>
              <SelectItem value='12m'>Son 12 Ay</SelectItem>
            </SelectContent>
          </Select>
        )}
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className='h-[300px] w-full'>
          <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id={gradientId} x1='0' y1='0' x2='0' y2='1'>
                <stop offset='5%' stopColor={color} stopOpacity={0.8} />
                <stop offset='95%' stopColor={color} stopOpacity={0.1} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray='3 3' vertical={false} className='stroke-muted' />
            <XAxis
              dataKey={xAxisKey}
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              className='text-xs'
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              className='text-xs'
              tickFormatter={(value) => `${value}${unit}`}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                />
              }
            />
            <Area
              type='monotone'
              dataKey={dataKey}
              stroke={color}
              strokeWidth={2}
              fill={`url(#${gradientId})`}
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}