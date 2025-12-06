import { cn } from '@/lib/utils'

interface ChartTooltipProps {
  active?: boolean
  payload?: Array<{
    name: string
    value: number
    color?: string
    dataKey?: string
    payload?: Record<string, unknown>
  }>
  label?: string
  labelFormatter?: (label: string) => string
  valueFormatter?: (value: number, name: string) => string
  className?: string
  unit?: string
}

export function ChartTooltip({
  active,
  payload,
  label,
  labelFormatter,
  valueFormatter,
  className,
}: ChartTooltipProps) {
  if (!active || !payload || payload.length === 0) {
    return null
  }

  const formattedLabel = labelFormatter ? labelFormatter(label || '') : label

  return (
    <div
      className={cn(
        'rounded-xl border border-border/50 bg-background/95 backdrop-blur-md shadow-xl',
        'px-4 py-3 min-w-[180px]',
        'animate-in fade-in-0 zoom-in-95 duration-200',
        className
      )}
    >
      {formattedLabel && (
        <div className="mb-2 pb-2 border-b border-border/50">
          <p className="text-sm font-semibold text-foreground">{formattedLabel}</p>
        </div>
      )}
      <div className="space-y-1.5">
        {payload.map((entry, index) => {
          const formattedValue = valueFormatter
            ? valueFormatter(entry.value, entry.name)
            : typeof entry.value === 'number'
              ? entry.value.toLocaleString('tr-TR')
              : entry.value

          return (
            <div key={`item-${index}`} className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <div
                  className="size-3 rounded-full shadow-sm"
                  style={{ backgroundColor: entry.color || 'hsl(var(--primary))' }}
                />
                <span className="text-xs text-muted-foreground">{entry.name}</span>
              </div>
              <span className="text-sm font-semibold tabular-nums">{formattedValue}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

// Enerji değerleri için özel tooltip
export function EnergyTooltip({ active, payload, label, unit }: ChartTooltipProps) {
  return (
    <ChartTooltip
      active={active}
      payload={payload}
      label={label}
      valueFormatter={(value, name) => {
        // Eğer özel birim belirtilmişse onu kullan
        if (unit) {
          return `${value.toLocaleString('tr-TR')} ${unit}`
        }
        if (name.toLowerCase().includes('maliyet') || name.toLowerCase().includes('cost') || name.toLowerCase().includes('tasarruf')) {
          return `₺${value.toLocaleString('tr-TR')}`
        }
        if (name.toLowerCase().includes('co2') || name.toLowerCase().includes('karbon')) {
          return `${value.toLocaleString('tr-TR')} ton`
        }
        if (name.toLowerCase().includes('ağaç') || name.toLowerCase().includes('agac')) {
          return `${value.toLocaleString('tr-TR')} ağaç`
        }
        if (name.toLowerCase().includes('su')) {
          return `${value.toLocaleString('tr-TR')} m³`
        }
        return `${value.toLocaleString('tr-TR')} kWh`
      }}
    />
  )
}

// Yüzde değerleri için özel tooltip
export function PercentageTooltip({ active, payload, label }: ChartTooltipProps) {
  return (
    <ChartTooltip
      active={active}
      payload={payload}
      label={label}
      valueFormatter={(value) => `%${value.toLocaleString('tr-TR')}`}
    />
  )
}

// Para birimi için özel tooltip
export function CurrencyTooltip({ active, payload, label }: ChartTooltipProps) {
  return (
    <ChartTooltip
      active={active}
      payload={payload}
      label={label}
      valueFormatter={(value) => `₺${value.toLocaleString('tr-TR')}`}
    />
  )
}
