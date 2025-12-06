import * as React from "react"
import { ResponsiveContainer, Tooltip as RechartsTooltip } from "recharts"
import { cn } from "@/lib/utils"

// Chart Container
interface ChartContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  config: ChartConfig
  children: React.ReactNode
}

export type ChartConfig = Record<string, { label: string; color: string }>

export function ChartContainer({
  config,
  children,
  className,
  ...props
}: ChartContainerProps) {
  const cssVars = React.useMemo(() => {
    const vars: Record<string, string> = {}
    Object.entries(config).forEach(([key, value]) => {
      vars[`--color-${key}`] = value.color
    })
    return vars
  }, [config])

  return (
    <div
      className={cn("w-full h-full min-h-[200px]", className)}
      style={cssVars as React.CSSProperties}
      {...props}
    >
      <ResponsiveContainer width="100%" height="100%">
        {children as React.ReactElement}
      </ResponsiveContainer>
    </div>
  )
}

// Chart Tooltip - wrapper for Recharts Tooltip
interface ChartTooltipProps {
  content?: React.ReactNode
  cursor?: boolean | object
}

export function ChartTooltip({ content, cursor = true }: ChartTooltipProps) {
  return <RechartsTooltip content={content as never} cursor={cursor} />
}

// Chart Tooltip Content
interface ChartTooltipContentProps {
  active?: boolean
  payload?: Array<{
    name: string
    value: number
    color?: string
    dataKey?: string
    payload?: Record<string, unknown>
  }>
  label?: string
  hideLabel?: boolean
  hideIndicator?: boolean
  indicator?: "line" | "dot" | "dashed"
  nameKey?: string
  labelKey?: string
}

export function ChartTooltipContent({
  active,
  payload,
  label,
  hideLabel = false,
  hideIndicator = false,
  indicator = "dot",
  nameKey,
}: ChartTooltipContentProps) {
  if (!active || !payload?.length) {
    return null
  }

  return (
    <div className="rounded-lg border bg-background p-2 shadow-md">
      {!hideLabel && label && (
        <div className="mb-1 font-medium text-sm">{label}</div>
      )}
      <div className="flex flex-col gap-1">
        {payload.map((item, index) => (
          <div key={index} className="flex items-center gap-2 text-sm">
            {!hideIndicator && (
              <div
                className={cn(
                  "h-2 w-2 rounded-full",
                  indicator === "line" && "h-0.5 w-3 rounded-none",
                  indicator === "dashed" && "h-0.5 w-3 rounded-none border-dashed"
                )}
                style={{ backgroundColor: item.color }}
              />
            )}
            <span className="text-muted-foreground">
              {nameKey ? (item.payload?.[nameKey] as React.ReactNode) : item.name}:
            </span>
            <span className="font-medium">{item.value}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

// Chart Legend - using Recharts Legend internally
interface ChartLegendProps {
  content?: React.ReactNode
  verticalAlign?: "top" | "middle" | "bottom"
  align?: "left" | "center" | "right"
}

export function ChartLegend(_: ChartLegendProps) {
  // Note: Use Recharts Legend component directly in charts
  return null
}

// Chart Legend Content
interface ChartLegendContentProps {
  payload?: Array<{
    value: string
    color?: string
    dataKey?: string
  }>
  nameKey?: string
  hideIcon?: boolean
}

export function ChartLegendContent({
  payload,
  hideIcon = false,
}: ChartLegendContentProps) {
  if (!payload?.length) {
    return null
  }

  return (
    <div className="flex flex-wrap items-center justify-center gap-4">
      {payload.map((item, index) => (
        <div key={index} className="flex items-center gap-1.5 text-sm">
          {!hideIcon && (
            <div
              className="h-2 w-2 rounded-full"
              style={{ backgroundColor: item.color }}
            />
          )}
          <span className="text-muted-foreground">{item.value}</span>
        </div>
      ))}
    </div>
  )
}

// Re-export for convenience
export { ChartTooltip as Tooltip }