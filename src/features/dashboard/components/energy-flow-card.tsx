import { Home, Sun, Battery, CloudLightning } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useEffect, useState } from 'react'
import { useLanguage } from '@/lib/i18n'
import './data-flow.css'

// Types for our energy data
interface EnergyState {
  solar: number // kW
  grid: number // kW (positive = import, negative = export)
  battery: number // kW (positive = charge, negative = discharge)
  home: number // kW (consumption)
  batteryLevel: number // %
}

export function EnergyFlowCard() {
  const { t } = useLanguage()
  // Mock data - in a real app this would come from an API
  const [data, setData] = useState<EnergyState>({
    solar: 4.2,
    grid: 1.5,
    battery: -2.1, // Discharging
    home: 7.8,
    batteryLevel: 76,
  })

  // Simulate live data changes
  useEffect(() => {
    const interval = setInterval(() => {
      setData((prev) => ({
        ...prev,
        solar: Math.max(0, prev.solar + (Math.random() * 0.4 - 0.2)),
        home: Math.max(0, prev.home + (Math.random() * 0.4 - 0.2)),
        grid: prev.home - prev.solar - prev.battery, // Simple balance calculation
      }))
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="rounded-xl border bg-card p-6 shadow-sm">
      <div className="mb-6 flex items-center justify-between">
        <h3 className="font-semibold leading-none tracking-tight">{t('liveEnergyFlow')}</h3>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500"></span>
          </span>
          {t('live')}
        </div>
      </div>

      <div className="relative mx-auto aspect-video w-full max-w-3xl select-none">
        {/* SVG Layer for Lines and Animations */}
        <svg
          viewBox="0 0 800 400"
          className="absolute inset-0 h-full w-full"
          style={{ overflow: 'visible' }}
        >
          <defs>
            <linearGradient id="grid-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#3b82f6" />
              <stop offset="100%" stopColor="#3b82f6" />
            </linearGradient>
            <linearGradient id="solar-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#eab308" />
              <stop offset="100%" stopColor="#eab308" />
            </linearGradient>
            <linearGradient id="battery-gradient" x1="100%" y1="0%" x2="0%" y2="0%">
              <stop offset="0%" stopColor="#22c55e" />
              <stop offset="100%" stopColor="#22c55e" />
            </linearGradient>
            
            {/* Animation Keyframes defined in CSS, but we use masks/paths here */}
          </defs>

          {/* Connection: Grid -> Home (Left to Center) */}
          <FlowLine
            from={{ x: 100, y: 200 }}
            to={{ x: 400, y: 200 }}
            isActive={data.grid > 0}
            color="#3b82f6" // Blue
            speed={Math.max(1, 5 - Math.abs(data.grid))} // Faster when value is higher
            direction={data.grid > 0 ? 'forward' : 'backward'}
          />

          {/* Connection: Solar -> Home (Top to Center) */}
          <FlowLine
            from={{ x: 400, y: 50 }}
            to={{ x: 400, y: 200 }}
            isActive={data.solar > 0}
            color="#eab308" // Yellow
            speed={Math.max(1, 5 - data.solar)}
            direction="forward"
          />

          {/* Connection: Battery <-> Home (Right to Center) */}
          <FlowLine
            from={{ x: 700, y: 200 }}
            to={{ x: 400, y: 200 }}
            isActive={Math.abs(data.battery) > 0.1}
            color="#22c55e" // Green
            speed={Math.max(1, 5 - Math.abs(data.battery))}
            direction={data.battery < 0 ? 'forward' : 'backward'} // Discharging = forward (to home)
          />
        </svg>

        {/* Nodes Layer (HTML/React) */}
        
        {/* Solar Node (Top) */}
        <div className="absolute left-1/2 top-0 -translate-x-1/2 transform">
          <EnergyNode
            icon={<Sun className="h-8 w-8 text-yellow-500" />}
            label={t('solar')}
            value={data.solar}
            unit="kW"
            color="border-yellow-500/50 bg-yellow-500/10"
          />
        </div>

        {/* Grid Node (Left) */}
        <div className="absolute left-0 top-1/2 -translate-y-1/2 transform">
          <EnergyNode
            icon={<CloudLightning className="h-8 w-8 text-blue-500" />}
            label={t('grid')}
            value={Math.abs(data.grid)}
            subLabel={data.grid > 0 ? t('imported') : t('exported')}
            unit="kW"
            color="border-blue-500/50 bg-blue-500/10"
          />
        </div>

        {/* Home Node (Center) */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform">
          <div className="relative flex h-32 w-32 flex-col items-center justify-center rounded-full border-4 border-primary/20 bg-background shadow-2xl">
            <div className="absolute inset-0 rounded-full border-4 border-primary/50 opacity-20 animate-pulse"></div>
            <Home className="mb-1 h-10 w-10 text-primary" />
            <span className="text-xs font-medium text-muted-foreground">{t('consumption')}</span>
            <span className="text-2xl font-bold">{data.home.toFixed(1)}</span>
            <span className="text-xs text-muted-foreground">kW</span>
          </div>
        </div>

        {/* Battery Node (Right) */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 transform">
          <EnergyNode
            icon={<Battery className="h-8 w-8 text-green-500" />}
            label={t('battery')}
            value={Math.abs(data.battery)}
            subLabel={`${data.batteryLevel}%`}
            unit="kW"
            color="border-green-500/50 bg-green-500/10"
            status={data.battery > 0 ? t('charging') : t('discharging')}
          />
        </div>
      </div>
      
      {/* Legend / Stats Footer */}
      <div className="mt-12 grid grid-cols-3 gap-4 border-t pt-6">
        <div className="text-center">
          <div className="text-sm text-muted-foreground">{t('todayProduction')}</div>
          <div className="text-xl font-bold text-yellow-600">24.5 kWh</div>
        </div>
        <div className="text-center border-l border-r">
          <div className="text-sm text-muted-foreground">{t('todayConsumption')}</div>
          <div className="text-xl font-bold text-primary">18.2 kWh</div>
        </div>
        <div className="text-center">
          <div className="text-sm text-muted-foreground">{t('gridSavings')}</div>
          <div className="text-xl font-bold text-green-600">₺145.20</div>
        </div>
      </div>
    </div>
  )
}

// Helper Components

function EnergyNode({ 
  icon, 
  label, 
  value, 
  unit, 
  color, 
  subLabel,
  status 
}: { 
  icon: React.ReactNode
  label: string
  value: number
  unit: string
  color: string
  subLabel?: string
  status?: string
}) {
  return (
    <div className={cn("flex flex-col items-center justify-center rounded-2xl border-2 p-4 backdrop-blur-sm transition-all hover:scale-105 w-32 h-32", color)}>
      <div className="mb-2">{icon}</div>
      <span className="text-sm font-medium">{label}</span>
      <div className="flex items-baseline gap-1">
        <span className="text-xl font-bold">{value.toFixed(1)}</span>
        <span className="text-xs text-muted-foreground">{unit}</span>
      </div>
      {subLabel && <span className="text-xs font-medium opacity-80">{subLabel}</span>}
      {status && <span className="mt-1 rounded-full bg-background/50 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider">{status}</span>}
    </div>
  )
}

function FlowLine({ 
  from, 
  to, 
  isActive, 
  color, 
  speed, 
  direction = 'forward' 
}: { 
  from: { x: number; y: number }
  to: { x: number; y: number }
  isActive: boolean
  color: string
  speed: number
  direction?: 'forward' | 'backward'
}) {
  if (!isActive) {
    // Draw a faint static line if inactive
    return (
      <path
        d={`M ${from.x} ${from.y} L ${to.x} ${to.y}`}
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        className="text-muted/20"
      />
    )
  }

  // Calculate path
  const pathD = `M ${from.x} ${from.y} L ${to.x} ${to.y}`
  
  return (
    <g>
      {/* Base Line */}
      <path
        d={pathD}
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeOpacity="0.2"
      />
      
      {/* Animated Flow Line */}
      <path
        d={pathD}
        fill="none"
        stroke={color}
        strokeWidth="4"
        strokeDasharray="10 10"
        className={cn(
          "animate-flow",
          direction === 'backward' && "animate-flow-reverse"
        )}
        style={{
          animationDuration: `${speed}s`,
        }}
      />
      
      {/* Moving Particle (Dot) */}
      <circle r="4" fill={color}>
        <animateMotion 
          dur={`${speed}s`} 
          repeatCount="indefinite"
          keyPoints={direction === 'forward' ? "0;1" : "1;0"}
          keyTimes="0;1"
        >
          <mpath href={`#path-${from.x}-${from.y}-${to.x}-${to.y}`} />
        </animateMotion>
      </circle>
      
      {/* Hidden path for the circle to follow (needs an ID) */}
      <path
        id={`path-${from.x}-${from.y}-${to.x}-${to.y}`}
        d={pathD}
        fill="none"
        stroke="none"
      />
    </g>
  )
}
