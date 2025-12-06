import { ReactNode } from 'react'
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ReferenceLine,
  Brush,
} from 'recharts'
import { cn } from '@/lib/utils'
import { EnergyTooltip, PercentageTooltip, CurrencyTooltip } from './chart-tooltip'

// Profesyonel gradient tanımları
export function ChartGradients() {
  return (
    <defs>
      {/* Mavi gradient */}
      <linearGradient id="blueGradient" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.4} />
        <stop offset="50%" stopColor="#3b82f6" stopOpacity={0.15} />
        <stop offset="100%" stopColor="#3b82f6" stopOpacity={0.02} />
      </linearGradient>
      {/* Yeşil gradient */}
      <linearGradient id="greenGradient" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#10b981" stopOpacity={0.4} />
        <stop offset="50%" stopColor="#10b981" stopOpacity={0.15} />
        <stop offset="100%" stopColor="#10b981" stopOpacity={0.02} />
      </linearGradient>
      {/* Turuncu gradient */}
      <linearGradient id="orangeGradient" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#f97316" stopOpacity={0.4} />
        <stop offset="50%" stopColor="#f97316" stopOpacity={0.15} />
        <stop offset="100%" stopColor="#f97316" stopOpacity={0.02} />
      </linearGradient>
      {/* Mor gradient */}
      <linearGradient id="purpleGradient" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#8b5cf6" stopOpacity={0.4} />
        <stop offset="50%" stopColor="#8b5cf6" stopOpacity={0.15} />
        <stop offset="100%" stopColor="#8b5cf6" stopOpacity={0.02} />
      </linearGradient>
      {/* Cyan gradient */}
      <linearGradient id="cyanGradient" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#06b6d4" stopOpacity={0.4} />
        <stop offset="50%" stopColor="#06b6d4" stopOpacity={0.15} />
        <stop offset="100%" stopColor="#06b6d4" stopOpacity={0.02} />
      </linearGradient>
      {/* Sarı gradient */}
      <linearGradient id="yellowGradient" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#f59e0b" stopOpacity={0.4} />
        <stop offset="50%" stopColor="#f59e0b" stopOpacity={0.15} />
        <stop offset="100%" stopColor="#f59e0b" stopOpacity={0.02} />
      </linearGradient>
      {/* Kırmızı gradient */}
      <linearGradient id="redGradient" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#ef4444" stopOpacity={0.4} />
        <stop offset="50%" stopColor="#ef4444" stopOpacity={0.15} />
        <stop offset="100%" stopColor="#ef4444" stopOpacity={0.02} />
      </linearGradient>
      {/* Glow efektleri */}
      <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur stdDeviation="3" result="coloredBlur" />
        <feMerge>
          <feMergeNode in="coloredBlur" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
      {/* Shadow efekti */}
      <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="0" dy="4" stdDeviation="8" floodOpacity="0.15" />
      </filter>
    </defs>
  )
}

// Profesyonel eksen stilleri
const axisProps = {
  stroke: 'hsl(var(--muted-foreground))',
  fontSize: 11,
  fontFamily: 'Inter, system-ui, sans-serif',
  tickLine: false,
  axisLine: false,
}

const gridProps = {
  strokeDasharray: '3 3',
  stroke: 'hsl(var(--border))',
  strokeOpacity: 0.6,
  vertical: false,
}

// Profesyonel Legend
function CustomLegend({ payload }: { payload?: Array<{ value: string; color: string }> }) {
  if (!payload) return null
  
  return (
    <div className="flex flex-wrap items-center justify-center gap-4 pt-4 pb-1">
      {payload.map((entry, index) => (
        <div key={index} className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-muted/50 backdrop-blur-sm">
          <div
            className="size-2.5 rounded-full shadow-sm"
            style={{ backgroundColor: entry.color }}
          />
          <span className="text-xs font-medium text-muted-foreground">{entry.value}</span>
        </div>
      ))}
    </div>
  )
}

// Profesyonel Area Chart
interface ProfessionalAreaChartProps {
  data: Record<string, unknown>[]
  areas: Array<{
    dataKey: string
    name: string
    color: string
    gradientId?: string
  }>
  xAxisKey: string
  height?: number
  showLegend?: boolean
  showGrid?: boolean
  showBrush?: boolean
  tooltipType?: 'energy' | 'percentage' | 'currency'
  yAxisFormatter?: (value: number) => string
  className?: string
}

export function ProfessionalAreaChart({
  data,
  areas,
  xAxisKey,
  height = 300,
  showLegend = true,
  showGrid = true,
  showBrush = false,
  tooltipType = 'energy',
  yAxisFormatter,
  className,
}: ProfessionalAreaChartProps) {
  const TooltipComponent = tooltipType === 'percentage' 
    ? PercentageTooltip 
    : tooltipType === 'currency' 
      ? CurrencyTooltip 
      : EnergyTooltip

  return (
    <div className={cn('w-full', className)}>
      <ResponsiveContainer width="100%" height={height}>
        <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
          <ChartGradients />
          {showGrid && <CartesianGrid {...gridProps} />}
          <XAxis 
            dataKey={xAxisKey} 
            {...axisProps}
            dy={10}
            tick={{ fill: 'hsl(var(--muted-foreground))' }}
          />
          <YAxis 
            {...axisProps}
            dx={-10}
            tick={{ fill: 'hsl(var(--muted-foreground))' }}
            tickFormatter={yAxisFormatter}
          />
          <Tooltip content={<TooltipComponent />} />
          {showLegend && <Legend content={<CustomLegend />} />}
          {areas.map((area) => (
            <Area
              key={area.dataKey}
              type="monotone"
              dataKey={area.dataKey}
              name={area.name}
              stroke={area.color}
              strokeWidth={2.5}
              fill={`url(#${area.gradientId || 'blueGradient'})`}
              dot={false}
              activeDot={{
                r: 6,
                stroke: area.color,
                strokeWidth: 2,
                fill: 'hsl(var(--background))',
                filter: 'url(#glow)',
              }}
            />
          ))}
          {showBrush && (
            <Brush 
              dataKey={xAxisKey} 
              height={30} 
              stroke="hsl(var(--primary))"
              fill="hsl(var(--muted))"
            />
          )}
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}

// Profesyonel Line Chart
interface ProfessionalLineChartProps {
  data: Record<string, unknown>[]
  lines: Array<{
    dataKey: string
    name: string
    color: string
    dashed?: boolean
  }>
  xAxisKey: string
  height?: number
  showLegend?: boolean
  showGrid?: boolean
  showDots?: boolean
  tooltipType?: 'energy' | 'percentage' | 'currency'
  referenceLine?: {
    y: number
    label: string
    color?: string
  }
  className?: string
}

export function ProfessionalLineChart({
  data,
  lines,
  xAxisKey,
  height = 300,
  showLegend = true,
  showGrid = true,
  showDots = false,
  tooltipType = 'energy',
  referenceLine,
  className,
}: ProfessionalLineChartProps) {
  const TooltipComponent = tooltipType === 'percentage' 
    ? PercentageTooltip 
    : tooltipType === 'currency' 
      ? CurrencyTooltip 
      : EnergyTooltip

  return (
    <div className={cn('w-full', className)}>
      <ResponsiveContainer width="100%" height={height}>
        <LineChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
          <ChartGradients />
          {showGrid && <CartesianGrid {...gridProps} />}
          <XAxis 
            dataKey={xAxisKey} 
            {...axisProps}
            dy={10}
            tick={{ fill: 'hsl(var(--muted-foreground))' }}
          />
          <YAxis 
            {...axisProps}
            dx={-10}
            tick={{ fill: 'hsl(var(--muted-foreground))' }}
          />
          <Tooltip content={<TooltipComponent />} />
          {showLegend && <Legend content={<CustomLegend />} />}
          {referenceLine && (
            <ReferenceLine 
              y={referenceLine.y} 
              stroke={referenceLine.color || 'hsl(var(--destructive))'} 
              strokeDasharray="5 5"
              strokeWidth={2}
              label={{
                value: referenceLine.label,
                fill: referenceLine.color || 'hsl(var(--destructive))',
                fontSize: 11,
              }}
            />
          )}
          {lines.map((line) => (
            <Line
              key={line.dataKey}
              type="monotone"
              dataKey={line.dataKey}
              name={line.name}
              stroke={line.color}
              strokeWidth={2.5}
              strokeDasharray={line.dashed ? '8 4' : undefined}
              dot={showDots ? {
                r: 4,
                stroke: line.color,
                strokeWidth: 2,
                fill: 'hsl(var(--background))',
              } : false}
              activeDot={{
                r: 7,
                stroke: line.color,
                strokeWidth: 2,
                fill: 'hsl(var(--background))',
                filter: 'url(#glow)',
              }}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

// Profesyonel Bar Chart
interface ProfessionalBarChartProps {
  data: Record<string, unknown>[]
  bars: Array<{
    dataKey: string
    name: string
    color: string
    radius?: number
  }>
  xAxisKey: string
  height?: number
  showLegend?: boolean
  showGrid?: boolean
  tooltipType?: 'energy' | 'percentage' | 'currency'
  layout?: 'horizontal' | 'vertical'
  stacked?: boolean
  className?: string
}

export function ProfessionalBarChart({
  data,
  bars,
  xAxisKey,
  height = 300,
  showLegend = true,
  showGrid = true,
  tooltipType = 'energy',
  layout = 'horizontal',
  stacked = false,
  className,
}: ProfessionalBarChartProps) {
  const TooltipComponent = tooltipType === 'percentage' 
    ? PercentageTooltip 
    : tooltipType === 'currency' 
      ? CurrencyTooltip 
      : EnergyTooltip

  return (
    <div className={cn('w-full', className)}>
      <ResponsiveContainer width="100%" height={height}>
        <BarChart 
          data={data} 
          layout={layout}
          margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
          barCategoryGap="20%"
        >
          <ChartGradients />
          {showGrid && <CartesianGrid {...gridProps} />}
          {layout === 'horizontal' ? (
            <>
              <XAxis 
                dataKey={xAxisKey} 
                {...axisProps}
                dy={10}
                tick={{ fill: 'hsl(var(--muted-foreground))' }}
              />
              <YAxis 
                {...axisProps}
                dx={-10}
                tick={{ fill: 'hsl(var(--muted-foreground))' }}
              />
            </>
          ) : (
            <>
              <XAxis type="number" {...axisProps} />
              <YAxis 
                type="category" 
                dataKey={xAxisKey} 
                {...axisProps}
                width={100}
              />
            </>
          )}
          <Tooltip content={<TooltipComponent />} cursor={{ fill: 'hsl(var(--muted))', opacity: 0.3 }} />
          {showLegend && <Legend content={<CustomLegend />} />}
          {bars.map((bar, index) => (
            <Bar
              key={bar.dataKey}
              dataKey={bar.dataKey}
              name={bar.name}
              fill={bar.color}
              radius={bar.radius ?? [6, 6, 0, 0]}
              stackId={stacked ? 'stack' : undefined}
              animationBegin={index * 100}
              animationDuration={800}
            />
          ))}
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

// Profesyonel Pie/Donut Chart
interface ProfessionalPieChartProps {
  data: Array<{
    name: string
    value: number
    color: string
  }>
  height?: number
  innerRadius?: number
  outerRadius?: number
  showLabel?: boolean
  tooltipType?: 'energy' | 'percentage' | 'currency'
  centerContent?: ReactNode
  className?: string
}

export function ProfessionalPieChart({
  data,
  height = 280,
  innerRadius = 60,
  outerRadius = 100,
  showLabel = true,
  tooltipType = 'percentage',
  centerContent,
  className,
}: ProfessionalPieChartProps) {
  const TooltipComponent = tooltipType === 'percentage' 
    ? PercentageTooltip 
    : tooltipType === 'currency' 
      ? CurrencyTooltip 
      : EnergyTooltip

  const renderLabel = ({ cx, cy, midAngle, innerRadius: ir, outerRadius: or, percent, name }: {
    cx?: number
    cy?: number
    midAngle?: number
    innerRadius?: number
    outerRadius?: number
    percent?: number
    name?: string
  }) => {
    if (!showLabel || !percent || percent < 0.05 || !cx || !cy || !midAngle || !ir || !or) return null
    
    const RADIAN = Math.PI / 180
    const radius = ir + (or - ir) * 1.4
    const x = cx + radius * Math.cos(-midAngle * RADIAN)
    const y = cy + radius * Math.sin(-midAngle * RADIAN)

    return (
      <text
        x={x}
        y={y}
        fill="hsl(var(--foreground))"
        textAnchor={x > cx ? 'start' : 'end'}
        dominantBaseline="central"
        className="text-xs font-medium"
      >
        {`${name} ${(percent * 100).toFixed(0)}%`}
      </text>
    )
  }

  return (
    <div className={cn('w-full relative', className)}>
      <ResponsiveContainer width="100%" height={height}>
        <PieChart>
          <defs>
            <filter id="pieShadow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="4" stdDeviation="6" floodOpacity="0.2" />
            </filter>
          </defs>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={innerRadius}
            outerRadius={outerRadius}
            paddingAngle={3}
            dataKey="value"
            nameKey="name"
            label={renderLabel}
            labelLine={false}
            animationBegin={0}
            animationDuration={800}
            filter="url(#pieShadow)"
          >
            {data.map((entry, index) => (
              <Cell 
                key={`cell-${index}`} 
                fill={entry.color}
                stroke="hsl(var(--background))"
                strokeWidth={2}
              />
            ))}
          </Pie>
          <Tooltip content={<TooltipComponent />} />
        </PieChart>
      </ResponsiveContainer>
      {centerContent && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          {centerContent}
        </div>
      )}
    </div>
  )
}

// Profesyonel Mini Sparkline
interface SparklineProps {
  data: number[]
  color?: string
  height?: number
  showArea?: boolean
  className?: string
}

export function Sparkline({
  data,
  color = '#3b82f6',
  height = 40,
  showArea = true,
  className,
}: SparklineProps) {
  const chartData = data.map((value, index) => ({ value, index }))

  return (
    <div className={cn('w-full', className)}>
      <ResponsiveContainer width="100%" height={height}>
        <AreaChart data={chartData} margin={{ top: 2, right: 2, left: 2, bottom: 2 }}>
          <defs>
            <linearGradient id={`sparkline-${color}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={color} stopOpacity={0.3} />
              <stop offset="100%" stopColor={color} stopOpacity={0} />
            </linearGradient>
          </defs>
          {showArea && (
            <Area
              type="monotone"
              dataKey="value"
              stroke={color}
              strokeWidth={1.5}
              fill={`url(#sparkline-${color})`}
              dot={false}
            />
          )}
          {!showArea && (
            <Line
              type="monotone"
              dataKey="value"
              stroke={color}
              strokeWidth={1.5}
              dot={false}
            />
          )}
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}
