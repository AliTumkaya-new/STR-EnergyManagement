import { useState, useEffect, useCallback, useMemo } from 'react'
import { 
  Activity, Zap, Wifi, WifiOff, 
  AlertCircle, CheckCircle2, AlertTriangle, Info, Search, 
  Filter, Clock, Gauge, ThermometerSun, Droplets, Flame, Sun,
  Plug, CircleDot, Power, Waves, RefreshCw,
  type LucideIcon
} from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Skeleton } from '@/components/ui/skeleton'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { useLanguage } from '@/lib/i18n'
import { cn } from '@/lib/utils'

// ============================================
// TYPE DEFINITIONS
// ============================================

interface RegisterData {
  address: string
  name: string
  value: number
  unit: string
  status: 'normal' | 'warning' | 'critical'
  lastUpdate: Date
}

interface PhaseData {
  phase: string
  voltage: number
  current: number
  power: number
  powerFactor: number
  frequency: number
}

interface ElectricityData {
  phases: PhaseData[]
  totalPower: number
  totalEnergy: number
  registers: RegisterData[]
}

interface GasData {
  flow: number
  pressure: number
  temperature: number
  totalVolume: number
  registers: RegisterData[]
}

interface SolarData {
  dcVoltage: number
  dcCurrent: number
  dcPower: number
  acVoltage: number
  acCurrent: number
  acPower: number
  efficiency: number
  temperature: number
  strings: { id: number; voltage: number; current: number; power: number }[]
  registers: RegisterData[]
}

interface WaterData {
  flow: number
  pressure: number
  temperature: number
  totalVolume: number
  ph: number
  registers: RegisterData[]
}

interface EventItem {
  id: string
  type: 'info' | 'success' | 'warning' | 'error'
  message: string
  source: string
  timestamp: Date
}

type EventType = 'all' | 'info' | 'success' | 'warning' | 'error'
type EnergyTab = 'electricity' | 'gas' | 'solar' | 'water'

// ============================================
// TRANSLATIONS
// ============================================

const liveTranslations = {
  tr: {
    title: 'Canlı İzleme',
    subtitle: 'Anlık enerji değerleri ve register verileri',
    connected: 'Bağlı',
    disconnected: 'Bağlantı Kesildi',
    refresh: 'Yenile',
    lastUpdate: 'Son güncelleme',
    secondsAgo: 'sn önce',
    
    // Tabs
    electricity: 'Elektrik',
    gas: 'Doğalgaz',
    solar: 'Güneş Enerjisi',
    water: 'Su',
    
    // Electricity
    phaseData: 'Faz Verileri',
    phase: 'Faz',
    voltage: 'Voltaj',
    current: 'Akım',
    power: 'Güç',
    powerFactor: 'Güç Faktörü',
    frequency: 'Frekans',
    totalPower: 'Toplam Güç',
    totalEnergy: 'Toplam Enerji',
    threePhase: '3 Fazlı Sistem',
    
    // Gas
    gasFlow: 'Anlık Debi',
    gasPressure: 'Basınç',
    gasTemperature: 'Sıcaklık',
    totalVolume: 'Toplam Hacim',
    gasMetering: 'Doğalgaz Sayacı',
    
    // Solar
    dcSide: 'DC Tarafı',
    acSide: 'AC Tarafı',
    dcVoltage: 'DC Voltaj',
    dcCurrent: 'DC Akım',
    dcPower: 'DC Güç',
    acVoltage: 'AC Voltaj',
    acCurrent: 'AC Akım',
    acPower: 'AC Güç',
    efficiency: 'Verimlilik',
    inverterTemp: 'İnverter Sıcaklığı',
    stringData: 'String Verileri',
    string: 'String',
    solarProduction: 'Güneş Paneli Üretimi',
    
    // Water
    waterFlow: 'Anlık Debi',
    waterPressure: 'Basınç',
    waterTemperature: 'Sıcaklık',
    waterVolume: 'Toplam Tüketim',
    phLevel: 'pH Seviyesi',
    waterMetering: 'Su Sayacı',
    
    // Registers
    registerData: 'Register Verileri',
    address: 'Adres',
    registerName: 'Register Adı',
    value: 'Değer',
    status: 'Durum',
    normal: 'Normal',
    warning: 'Uyarı',
    critical: 'Kritik',
    
    // Events
    liveEvents: 'Anlık Olaylar',
    events: 'olay',
    searchPlaceholder: 'Olaylarda ara...',
    all: 'Tümü',
    info: 'Bilgi',
    success: 'Başarı',
    error: 'Hata',
    noEvents: 'Olay bulunamadı',
    
    // Units
    kw: 'kW',
    kwh: 'kWh',
    v: 'V',
    a: 'A',
    hz: 'Hz',
    celsius: '°C',
    percent: '%',
    m3h: 'm³/h',
    m3: 'm³',
    bar: 'bar',
    lh: 'L/h',
    l: 'L',
  },
  en: {
    title: 'Live Monitoring',
    subtitle: 'Real-time energy values and register data',
    connected: 'Connected',
    disconnected: 'Disconnected',
    refresh: 'Refresh',
    lastUpdate: 'Last update',
    secondsAgo: 'sec ago',
    
    // Tabs
    electricity: 'Electricity',
    gas: 'Natural Gas',
    solar: 'Solar Energy',
    water: 'Water',
    
    // Electricity
    phaseData: 'Phase Data',
    phase: 'Phase',
    voltage: 'Voltage',
    current: 'Current',
    power: 'Power',
    powerFactor: 'Power Factor',
    frequency: 'Frequency',
    totalPower: 'Total Power',
    totalEnergy: 'Total Energy',
    threePhase: '3-Phase System',
    
    // Gas
    gasFlow: 'Flow Rate',
    gasPressure: 'Pressure',
    gasTemperature: 'Temperature',
    totalVolume: 'Total Volume',
    gasMetering: 'Gas Meter',
    
    // Solar
    dcSide: 'DC Side',
    acSide: 'AC Side',
    dcVoltage: 'DC Voltage',
    dcCurrent: 'DC Current',
    dcPower: 'DC Power',
    acVoltage: 'AC Voltage',
    acCurrent: 'AC Current',
    acPower: 'AC Power',
    efficiency: 'Efficiency',
    inverterTemp: 'Inverter Temp',
    stringData: 'String Data',
    string: 'String',
    solarProduction: 'Solar Panel Production',
    
    // Water
    waterFlow: 'Flow Rate',
    waterPressure: 'Pressure',
    waterTemperature: 'Temperature',
    waterVolume: 'Total Consumption',
    phLevel: 'pH Level',
    waterMetering: 'Water Meter',
    
    // Registers
    registerData: 'Register Data',
    address: 'Address',
    registerName: 'Register Name',
    value: 'Value',
    status: 'Status',
    normal: 'Normal',
    warning: 'Warning',
    critical: 'Critical',
    
    // Events
    liveEvents: 'Live Events',
    events: 'events',
    searchPlaceholder: 'Search events...',
    all: 'All',
    info: 'Info',
    success: 'Success',
    error: 'Error',
    noEvents: 'No events found',
    
    // Units
    kw: 'kW',
    kwh: 'kWh',
    v: 'V',
    a: 'A',
    hz: 'Hz',
    celsius: '°C',
    percent: '%',
    m3h: 'm³/h',
    m3: 'm³',
    bar: 'bar',
    lh: 'L/h',
    l: 'L',
  }
}

// ============================================
// DATA GENERATORS
// ============================================

const generateElectricityData = (): ElectricityData => {
  const phases: PhaseData[] = ['L1', 'L2', 'L3'].map(phase => ({
    phase,
    voltage: 220 + Math.random() * 10 - 5,
    current: 15 + Math.random() * 10,
    power: (220 * (15 + Math.random() * 10)) / 1000,
    powerFactor: 0.85 + Math.random() * 0.12,
    frequency: 49.9 + Math.random() * 0.2
  }))
  
  const totalPower = phases.reduce((sum, p) => sum + p.power, 0)
  
  return {
    phases,
    totalPower,
    totalEnergy: 15420 + Math.random() * 100,
    registers: [
      { address: '0x0000', name: 'Voltage L1-N', value: phases[0].voltage, unit: 'V', status: 'normal', lastUpdate: new Date() },
      { address: '0x0002', name: 'Voltage L2-N', value: phases[1].voltage, unit: 'V', status: 'normal', lastUpdate: new Date() },
      { address: '0x0004', name: 'Voltage L3-N', value: phases[2].voltage, unit: 'V', status: 'normal', lastUpdate: new Date() },
      { address: '0x0006', name: 'Current L1', value: phases[0].current, unit: 'A', status: phases[0].current > 20 ? 'warning' : 'normal', lastUpdate: new Date() },
      { address: '0x0008', name: 'Current L2', value: phases[1].current, unit: 'A', status: phases[1].current > 20 ? 'warning' : 'normal', lastUpdate: new Date() },
      { address: '0x000A', name: 'Current L3', value: phases[2].current, unit: 'A', status: phases[2].current > 20 ? 'warning' : 'normal', lastUpdate: new Date() },
      { address: '0x000C', name: 'Active Power Total', value: totalPower, unit: 'kW', status: 'normal', lastUpdate: new Date() },
      { address: '0x000E', name: 'Power Factor', value: (phases[0].powerFactor + phases[1].powerFactor + phases[2].powerFactor) / 3, unit: '', status: 'normal', lastUpdate: new Date() },
      { address: '0x0010', name: 'Frequency', value: phases[0].frequency, unit: 'Hz', status: 'normal', lastUpdate: new Date() },
      { address: '0x0012', name: 'Total Energy', value: 15420 + Math.random() * 100, unit: 'kWh', status: 'normal', lastUpdate: new Date() },
    ]
  }
}

const generateGasData = (): GasData => {
  const flow = 2.5 + Math.random() * 2
  const pressure = 0.8 + Math.random() * 0.4
  const temperature = 18 + Math.random() * 8
  
  return {
    flow,
    pressure,
    temperature,
    totalVolume: 8542 + Math.random() * 10,
    registers: [
      { address: '0x1000', name: 'Flow Rate', value: flow, unit: 'm³/h', status: 'normal', lastUpdate: new Date() },
      { address: '0x1002', name: 'Pressure', value: pressure, unit: 'bar', status: pressure < 0.5 ? 'warning' : 'normal', lastUpdate: new Date() },
      { address: '0x1004', name: 'Temperature', value: temperature, unit: '°C', status: 'normal', lastUpdate: new Date() },
      { address: '0x1006', name: 'Total Volume', value: 8542 + Math.random() * 10, unit: 'm³', status: 'normal', lastUpdate: new Date() },
      { address: '0x1008', name: 'Daily Volume', value: 45 + Math.random() * 10, unit: 'm³', status: 'normal', lastUpdate: new Date() },
      { address: '0x100A', name: 'Valve Status', value: 1, unit: '', status: 'normal', lastUpdate: new Date() },
    ]
  }
}

const generateSolarData = (): SolarData => {
  const hour = new Date().getHours()
  const solarFactor = Math.max(0, Math.sin(((hour - 6) / 12) * Math.PI))
  
  const dcVoltage = solarFactor * (580 + Math.random() * 40)
  const dcCurrent = solarFactor * (15 + Math.random() * 5)
  const dcPower = (dcVoltage * dcCurrent) / 1000
  
  const efficiency = 0.94 + Math.random() * 0.04
  const acPower = dcPower * efficiency
  const acVoltage = 220 + Math.random() * 10 - 5
  const acCurrent = (acPower * 1000) / acVoltage
  
  const strings = [1, 2, 3, 4].map(id => ({
    id,
    voltage: solarFactor * (145 + Math.random() * 10),
    current: solarFactor * (8 + Math.random() * 2),
    power: solarFactor * ((145 + Math.random() * 10) * (8 + Math.random() * 2)) / 1000
  }))
  
  return {
    dcVoltage,
    dcCurrent,
    dcPower,
    acVoltage,
    acCurrent,
    acPower,
    efficiency: efficiency * 100,
    temperature: 35 + Math.random() * 15,
    strings,
    registers: [
      { address: '0x2000', name: 'DC Voltage', value: dcVoltage, unit: 'V', status: 'normal', lastUpdate: new Date() },
      { address: '0x2002', name: 'DC Current', value: dcCurrent, unit: 'A', status: 'normal', lastUpdate: new Date() },
      { address: '0x2004', name: 'DC Power', value: dcPower, unit: 'kW', status: 'normal', lastUpdate: new Date() },
      { address: '0x2006', name: 'AC Voltage', value: acVoltage, unit: 'V', status: 'normal', lastUpdate: new Date() },
      { address: '0x2008', name: 'AC Current', value: acCurrent, unit: 'A', status: 'normal', lastUpdate: new Date() },
      { address: '0x200A', name: 'AC Power', value: acPower, unit: 'kW', status: 'normal', lastUpdate: new Date() },
      { address: '0x200C', name: 'Efficiency', value: efficiency * 100, unit: '%', status: 'normal', lastUpdate: new Date() },
      { address: '0x200E', name: 'Inverter Temp', value: 35 + Math.random() * 15, unit: '°C', status: (35 + Math.random() * 15) > 45 ? 'warning' : 'normal', lastUpdate: new Date() },
      { address: '0x2010', name: 'String 1 Voltage', value: strings[0].voltage, unit: 'V', status: 'normal', lastUpdate: new Date() },
      { address: '0x2012', name: 'String 2 Voltage', value: strings[1].voltage, unit: 'V', status: 'normal', lastUpdate: new Date() },
      { address: '0x2014', name: 'String 3 Voltage', value: strings[2].voltage, unit: 'V', status: 'normal', lastUpdate: new Date() },
      { address: '0x2016', name: 'String 4 Voltage', value: strings[3].voltage, unit: 'V', status: 'normal', lastUpdate: new Date() },
    ]
  }
}

const generateWaterData = (): WaterData => {
  const flow = 120 + Math.random() * 80
  const pressure = 2.5 + Math.random() * 1.5
  const temperature = 15 + Math.random() * 10
  const ph = 6.8 + Math.random() * 0.8
  
  return {
    flow,
    pressure,
    temperature,
    totalVolume: 125840 + Math.random() * 100,
    ph,
    registers: [
      { address: '0x3000', name: 'Flow Rate', value: flow, unit: 'L/h', status: 'normal', lastUpdate: new Date() },
      { address: '0x3002', name: 'Pressure', value: pressure, unit: 'bar', status: pressure < 1.5 ? 'warning' : 'normal', lastUpdate: new Date() },
      { address: '0x3004', name: 'Temperature', value: temperature, unit: '°C', status: 'normal', lastUpdate: new Date() },
      { address: '0x3006', name: 'Total Volume', value: 125840 + Math.random() * 100, unit: 'L', status: 'normal', lastUpdate: new Date() },
      { address: '0x3008', name: 'pH Level', value: ph, unit: '', status: ph < 6.5 || ph > 7.5 ? 'warning' : 'normal', lastUpdate: new Date() },
      { address: '0x300A', name: 'Daily Volume', value: 850 + Math.random() * 100, unit: 'L', status: 'normal', lastUpdate: new Date() },
    ]
  }
}

// ============================================
// COMPONENTS
// ============================================

// Connection Status
const ConnectionStatus = ({ isConnected, t }: { isConnected: boolean, t: typeof liveTranslations['tr'] }) => (
  <div className={cn(
    "flex items-center gap-2 px-3 py-1.5 rounded-full border transition-all text-sm",
    isConnected 
      ? "border-emerald-200 dark:border-emerald-500/30 bg-emerald-50 dark:bg-emerald-500/10" 
      : "border-red-200 dark:border-red-500/30 bg-red-50 dark:bg-red-500/10"
  )}>
    {isConnected ? (
      <>
        <div className="relative">
          <Wifi className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
          <span className="absolute -top-0.5 -right-0.5 flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>
        </div>
        <span className="font-medium text-emerald-700 dark:text-emerald-400">{t.connected}</span>
      </>
    ) : (
      <>
        <WifiOff className="h-4 w-4 text-red-600 dark:text-red-400" />
        <span className="font-medium text-red-700 dark:text-red-400">{t.disconnected}</span>
      </>
    )}
  </div>
)

// Live Value Display
const LiveValue = ({ 
  label, 
  value, 
  unit, 
  icon: Icon,
  color = 'blue',
  size = 'default'
}: { 
  label: string
  value: number
  unit: string
  icon?: LucideIcon
  color?: 'blue' | 'green' | 'amber' | 'red' | 'purple'
  size?: 'default' | 'large'
}) => {
  const colorClasses = {
    blue: 'from-blue-500 to-blue-600',
    green: 'from-emerald-500 to-emerald-600',
    amber: 'from-amber-500 to-amber-600',
    red: 'from-red-500 to-red-600',
    purple: 'from-purple-500 to-purple-600'
  }
  
  return (
    <div className={cn(
      "flex items-center gap-3 p-4 rounded-xl border bg-card hover:shadow-md transition-all",
      size === 'large' && "p-6"
    )}>
      {Icon && (
        <div className={cn(
          "p-2.5 rounded-lg bg-gradient-to-br text-white",
          colorClasses[color]
        )}>
          <Icon className={cn("h-5 w-5", size === 'large' && "h-6 w-6")} />
        </div>
      )}
      <div className="flex-1 min-w-0">
        <p className="text-sm text-muted-foreground">{label}</p>
        <div className="flex items-baseline gap-1.5">
          <span className={cn(
            "font-bold tabular-nums",
            size === 'large' ? "text-3xl" : "text-xl"
          )}>
            {value.toFixed(unit === '%' || unit === '' ? 2 : 1)}
          </span>
          <span className="text-sm text-muted-foreground">{unit}</span>
          <CircleDot className="h-2 w-2 text-emerald-500 animate-pulse ml-1" />
        </div>
      </div>
    </div>
  )
}

// Phase Card
const PhaseCard = ({ phase, t }: { phase: PhaseData, t: typeof liveTranslations['tr'] }) => (
  <Card className="overflow-hidden">
    <CardHeader className="pb-2 bg-gradient-to-r from-blue-500/10 to-transparent">
      <CardTitle className="text-lg flex items-center gap-2">
        <Zap className="h-5 w-5 text-blue-500" />
        {t.phase} {phase.phase}
      </CardTitle>
    </CardHeader>
    <CardContent className="pt-4 space-y-3">
      <div className="grid grid-cols-2 gap-3">
        <div className="p-3 rounded-lg bg-muted/50">
          <p className="text-xs text-muted-foreground">{t.voltage}</p>
          <p className="text-lg font-bold tabular-nums">{phase.voltage.toFixed(1)} <span className="text-sm font-normal text-muted-foreground">V</span></p>
        </div>
        <div className="p-3 rounded-lg bg-muted/50">
          <p className="text-xs text-muted-foreground">{t.current}</p>
          <p className="text-lg font-bold tabular-nums">{phase.current.toFixed(2)} <span className="text-sm font-normal text-muted-foreground">A</span></p>
        </div>
        <div className="p-3 rounded-lg bg-muted/50">
          <p className="text-xs text-muted-foreground">{t.power}</p>
          <p className="text-lg font-bold tabular-nums">{phase.power.toFixed(2)} <span className="text-sm font-normal text-muted-foreground">kW</span></p>
        </div>
        <div className="p-3 rounded-lg bg-muted/50">
          <p className="text-xs text-muted-foreground">{t.powerFactor}</p>
          <p className="text-lg font-bold tabular-nums">{phase.powerFactor.toFixed(3)}</p>
        </div>
      </div>
      <div className="p-3 rounded-lg bg-blue-50 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/20">
        <p className="text-xs text-blue-600 dark:text-blue-400">{t.frequency}</p>
        <p className="text-lg font-bold tabular-nums text-blue-700 dark:text-blue-300">{phase.frequency.toFixed(2)} <span className="text-sm font-normal">Hz</span></p>
      </div>
    </CardContent>
  </Card>
)

// Register Table
const RegisterTable = ({ registers, t }: { registers: RegisterData[], t: typeof liveTranslations['tr'] }) => (
  <Card>
    <CardHeader className="pb-3">
      <CardTitle className="text-lg flex items-center gap-2">
        <Gauge className="h-5 w-5" />
        {t.registerData}
      </CardTitle>
      <CardDescription>Modbus Register Değerleri</CardDescription>
    </CardHeader>
    <CardContent>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b">
              <th className="text-left py-2 px-3 font-medium text-muted-foreground">{t.address}</th>
              <th className="text-left py-2 px-3 font-medium text-muted-foreground">{t.registerName}</th>
              <th className="text-right py-2 px-3 font-medium text-muted-foreground">{t.value}</th>
              <th className="text-center py-2 px-3 font-medium text-muted-foreground">{t.status}</th>
            </tr>
          </thead>
          <tbody>
            {registers.map((reg, idx) => (
              <tr key={idx} className="border-b last:border-0 hover:bg-muted/50 transition-colors">
                <td className="py-2.5 px-3 font-mono text-xs text-blue-600 dark:text-blue-400">{reg.address}</td>
                <td className="py-2.5 px-3">{reg.name}</td>
                <td className="py-2.5 px-3 text-right font-mono font-medium tabular-nums">
                  {reg.value.toFixed(reg.unit === '%' || reg.unit === '' ? 2 : 1)} 
                  <span className="text-muted-foreground ml-1">{reg.unit}</span>
                </td>
                <td className="py-2.5 px-3 text-center">
                  <Badge variant={reg.status === 'normal' ? 'default' : reg.status === 'warning' ? 'secondary' : 'destructive'} className={cn(
                    "text-xs",
                    reg.status === 'normal' && "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400",
                    reg.status === 'warning' && "bg-amber-100 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400"
                  )}>
                    {t[reg.status]}
                  </Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </CardContent>
  </Card>
)

// String Data Card (Solar)
const StringCard = ({ stringData, t }: { stringData: SolarData['strings'][0], t: typeof liveTranslations['tr'] }) => (
  <div className="p-4 rounded-xl border bg-card">
    <div className="flex items-center justify-between mb-3">
      <span className="font-medium">{t.string} {stringData.id}</span>
      <CircleDot className="h-2 w-2 text-emerald-500 animate-pulse" />
    </div>
    <div className="grid grid-cols-3 gap-2 text-sm">
      <div className="p-2 rounded bg-muted/50 text-center">
        <p className="text-xs text-muted-foreground">V</p>
        <p className="font-bold tabular-nums">{stringData.voltage.toFixed(1)}</p>
      </div>
      <div className="p-2 rounded bg-muted/50 text-center">
        <p className="text-xs text-muted-foreground">A</p>
        <p className="font-bold tabular-nums">{stringData.current.toFixed(2)}</p>
      </div>
      <div className="p-2 rounded bg-muted/50 text-center">
        <p className="text-xs text-muted-foreground">kW</p>
        <p className="font-bold tabular-nums">{stringData.power.toFixed(2)}</p>
      </div>
    </div>
  </div>
)

// Event Badge
const EventBadge = ({ type, lang }: { type: EventItem['type'], lang: 'tr' | 'en' }) => {
  const config = {
    info: { icon: Info, className: 'bg-blue-100 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400' },
    success: { icon: CheckCircle2, className: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400' },
    warning: { icon: AlertTriangle, className: 'bg-amber-100 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400' },
    error: { icon: AlertCircle, className: 'bg-red-100 text-red-700 dark:bg-red-500/10 dark:text-red-400' }
  }
  
  const { icon: EventIcon, className } = config[type]
  
  return (
    <div className={cn('inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium', className)}>
      <EventIcon className="h-3 w-3" />
      {liveTranslations[lang][type]}
    </div>
  )
}

// ============================================
// MAIN COMPONENT
// ============================================

export function LiveMonitoring() {
  const { language } = useLanguage()
  const t = liveTranslations[language]
  
  const [activeTab, setActiveTab] = useState<EnergyTab>('electricity')
  const [isConnected, setIsConnected] = useState(true)
  const [isLoading, setIsLoading] = useState(true)
  const [lastUpdate, setLastUpdate] = useState(0)
  const [isRefreshing, setIsRefreshing] = useState(false)
  
  const [electricityData, setElectricityData] = useState<ElectricityData | null>(null)
  const [gasData, setGasData] = useState<GasData | null>(null)
  const [solarData, setSolarData] = useState<SolarData | null>(null)
  const [waterData, setWaterData] = useState<WaterData | null>(null)
  
  const [searchQuery, setSearchQuery] = useState('')
  const [filterType, setFilterType] = useState<EventType>('all')
  const [events, setEvents] = useState<EventItem[]>([])

  // Initialize
  useEffect(() => {
    const initialEvents: EventItem[] = [
      { id: '1', type: 'success', message: language === 'tr' ? 'Elektrik sayacı bağlantısı başarılı' : 'Electricity meter connected', source: 'Electricity', timestamp: new Date(Date.now() - 60000) },
      { id: '2', type: 'info', message: language === 'tr' ? 'Güneş paneli üretimi optimum seviyede' : 'Solar panel production at optimum', source: 'Solar', timestamp: new Date(Date.now() - 120000) },
      { id: '3', type: 'warning', message: language === 'tr' ? 'Doğalgaz basıncı düşük' : 'Natural gas pressure low', source: 'Gas', timestamp: new Date(Date.now() - 180000) },
    ]
    setEvents(initialEvents)

    setTimeout(() => {
      setElectricityData(generateElectricityData())
      setGasData(generateGasData())
      setSolarData(generateSolarData())
      setWaterData(generateWaterData())
      setIsLoading(false)
    }, 800)
  }, [language])

  // Live updates
  useEffect(() => {
    if (isLoading) return

    const dataInterval = setInterval(() => {
      setElectricityData(generateElectricityData())
      setGasData(generateGasData())
      setSolarData(generateSolarData())
      setWaterData(generateWaterData())
      setLastUpdate(0)
    }, 2000)

    const timerInterval = setInterval(() => {
      setLastUpdate(prev => prev + 1)
    }, 1000)

    const connectionInterval = setInterval(() => {
      setIsConnected(Math.random() > 0.02)
    }, 5000)

    return () => {
      clearInterval(dataInterval)
      clearInterval(timerInterval)
      clearInterval(connectionInterval)
    }
  }, [isLoading])

  const handleRefresh = useCallback(() => {
    setIsRefreshing(true)
    setElectricityData(generateElectricityData())
    setGasData(generateGasData())
    setSolarData(generateSolarData())
    setWaterData(generateWaterData())
    setLastUpdate(0)
    setTimeout(() => setIsRefreshing(false), 500)
  }, [])

  const filteredEvents = useMemo(() => {
    return events.filter(event => {
      const matchesSearch = event.message.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesType = filterType === 'all' || event.type === filterType
      return matchesSearch && matchesType
    })
  }, [events, searchQuery, filterType])

  if (isLoading) {
    return (
      <>
        <Header />
        <Main>
          <div className="flex-1 space-y-6">
            <Skeleton className="h-10 w-64" />
            <Skeleton className="h-12 w-full" />
            <div className="grid gap-4 md:grid-cols-3">
              {[1, 2, 3].map(i => <Skeleton key={i} className="h-48" />)}
            </div>
            <Skeleton className="h-64" />
          </div>
        </Main>
      </>
    )
  }

  return (
    <>
      <Header />
      <Main>
        <div className="flex-1 space-y-6">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">{t.title}</h1>
          <p className="text-muted-foreground mt-1">{t.subtitle}</p>
        </div>
        
        <div className="flex items-center gap-3">
          <ConnectionStatus isConnected={isConnected} t={t} />
          <div className="text-sm text-muted-foreground bg-muted/50 px-3 py-1.5 rounded-full tabular-nums">
            {t.lastUpdate}: {lastUpdate} {t.secondsAgo}
          </div>
          <Button variant="outline" size="sm" onClick={handleRefresh} disabled={isRefreshing}>
            <RefreshCw className={cn("h-4 w-4 mr-2", isRefreshing && "animate-spin")} />
            {t.refresh}
          </Button>
        </div>
      </div>

      {/* Energy Source Tabs */}
      <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as EnergyTab)} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 h-auto p-1">
          <TabsTrigger value="electricity" className="flex items-center gap-2 py-2.5">
            <Zap className="h-4 w-4" />
            <span className="hidden sm:inline">{t.electricity}</span>
          </TabsTrigger>
          <TabsTrigger value="gas" className="flex items-center gap-2 py-2.5">
            <Flame className="h-4 w-4" />
            <span className="hidden sm:inline">{t.gas}</span>
          </TabsTrigger>
          <TabsTrigger value="solar" className="flex items-center gap-2 py-2.5">
            <Sun className="h-4 w-4" />
            <span className="hidden sm:inline">{t.solar}</span>
          </TabsTrigger>
          <TabsTrigger value="water" className="flex items-center gap-2 py-2.5">
            <Droplets className="h-4 w-4" />
            <span className="hidden sm:inline">{t.water}</span>
          </TabsTrigger>
        </TabsList>

        {/* Electricity Tab */}
        <TabsContent value="electricity" className="space-y-6">
          {electricityData && (
            <>
              {/* Summary Cards */}
              <div className="grid gap-4 md:grid-cols-2">
                <LiveValue 
                  label={t.totalPower} 
                  value={electricityData.totalPower} 
                  unit={t.kw}
                  icon={Zap}
                  color="blue"
                  size="large"
                />
                <LiveValue 
                  label={t.totalEnergy} 
                  value={electricityData.totalEnergy} 
                  unit={t.kwh}
                  icon={Activity}
                  color="green"
                  size="large"
                />
              </div>
              
              {/* Phase Data */}
              <div>
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Power className="h-5 w-5" />
                  {t.phaseData} - {t.threePhase}
                </h3>
                <div className="grid gap-4 md:grid-cols-3">
                  {electricityData.phases.map((phase) => (
                    <PhaseCard key={phase.phase} phase={phase} t={t} />
                  ))}
                </div>
              </div>
              
              {/* Register Data */}
              <RegisterTable registers={electricityData.registers} t={t} />
            </>
          )}
        </TabsContent>

        {/* Gas Tab */}
        <TabsContent value="gas" className="space-y-6">
          {gasData && (
            <>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Flame className="h-5 w-5 text-orange-500" />
                    {t.gasMetering}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 md:grid-cols-4">
                    <LiveValue label={t.gasFlow} value={gasData.flow} unit={t.m3h} icon={Waves} color="amber" />
                    <LiveValue label={t.gasPressure} value={gasData.pressure} unit={t.bar} icon={Gauge} color="blue" />
                    <LiveValue label={t.gasTemperature} value={gasData.temperature} unit={t.celsius} icon={ThermometerSun} color="red" />
                    <LiveValue label={t.totalVolume} value={gasData.totalVolume} unit={t.m3} icon={Activity} color="green" />
                  </div>
                </CardContent>
              </Card>
              
              <RegisterTable registers={gasData.registers} t={t} />
            </>
          )}
        </TabsContent>

        {/* Solar Tab */}
        <TabsContent value="solar" className="space-y-6">
          {solarData && (
            <>
              <div className="grid gap-6 lg:grid-cols-2">
                {/* DC Side */}
                <Card>
                  <CardHeader className="bg-gradient-to-r from-amber-500/10 to-transparent">
                    <CardTitle className="flex items-center gap-2">
                      <Sun className="h-5 w-5 text-amber-500" />
                      {t.dcSide}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-4 space-y-3">
                    <LiveValue label={t.dcVoltage} value={solarData.dcVoltage} unit={t.v} color="amber" />
                    <LiveValue label={t.dcCurrent} value={solarData.dcCurrent} unit={t.a} color="amber" />
                    <LiveValue label={t.dcPower} value={solarData.dcPower} unit={t.kw} color="amber" />
                  </CardContent>
                </Card>
                
                {/* AC Side */}
                <Card>
                  <CardHeader className="bg-gradient-to-r from-blue-500/10 to-transparent">
                    <CardTitle className="flex items-center gap-2">
                      <Plug className="h-5 w-5 text-blue-500" />
                      {t.acSide}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-4 space-y-3">
                    <LiveValue label={t.acVoltage} value={solarData.acVoltage} unit={t.v} color="blue" />
                    <LiveValue label={t.acCurrent} value={solarData.acCurrent} unit={t.a} color="blue" />
                    <LiveValue label={t.acPower} value={solarData.acPower} unit={t.kw} color="blue" />
                  </CardContent>
                </Card>
              </div>
              
              {/* Efficiency & Temp */}
              <div className="grid gap-4 md:grid-cols-2">
                <LiveValue label={t.efficiency} value={solarData.efficiency} unit={t.percent} icon={Activity} color="green" size="large" />
                <LiveValue label={t.inverterTemp} value={solarData.temperature} unit={t.celsius} icon={ThermometerSun} color={solarData.temperature > 45 ? 'red' : 'green'} size="large" />
              </div>
              
              {/* String Data */}
              <Card>
                <CardHeader>
                  <CardTitle>{t.stringData}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 md:grid-cols-4">
                    {solarData.strings.map((str) => (
                      <StringCard key={str.id} stringData={str} t={t} />
                    ))}
                  </div>
                </CardContent>
              </Card>
              
              <RegisterTable registers={solarData.registers} t={t} />
            </>
          )}
        </TabsContent>

        {/* Water Tab */}
        <TabsContent value="water" className="space-y-6">
          {waterData && (
            <>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Droplets className="h-5 w-5 text-blue-500" />
                    {t.waterMetering}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 md:grid-cols-5">
                    <LiveValue label={t.waterFlow} value={waterData.flow} unit={t.lh} icon={Waves} color="blue" />
                    <LiveValue label={t.waterPressure} value={waterData.pressure} unit={t.bar} icon={Gauge} color="blue" />
                    <LiveValue label={t.waterTemperature} value={waterData.temperature} unit={t.celsius} icon={ThermometerSun} color="blue" />
                    <LiveValue label={t.waterVolume} value={waterData.totalVolume} unit={t.l} icon={Activity} color="green" />
                    <LiveValue label={t.phLevel} value={waterData.ph} unit="" icon={Droplets} color={waterData.ph < 6.5 || waterData.ph > 7.5 ? 'amber' : 'green'} />
                  </div>
                </CardContent>
              </Card>
              
              <RegisterTable registers={waterData.registers} t={t} />
            </>
          )}
        </TabsContent>
      </Tabs>

      {/* Events */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <CardTitle className="flex items-center gap-2">
                {t.liveEvents}
                <Badge variant="secondary">{filteredEvents.length} {t.events}</Badge>
              </CardTitle>
            </div>
            <div className="flex items-center gap-2">
              <div className="relative flex-1 min-w-[180px]">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder={t.searchPlaceholder} 
                  value={searchQuery} 
                  onChange={(e) => setSearchQuery(e.target.value)} 
                  className="pl-9 h-9" 
                />
              </div>
              <Select value={filterType} onValueChange={(v: EventType) => setFilterType(v)}>
                <SelectTrigger className="w-[110px] h-9">
                  <Filter className="h-4 w-4 mr-1" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{t.all}</SelectItem>
                  <SelectItem value="info">{t.info}</SelectItem>
                  <SelectItem value="success">{t.success}</SelectItem>
                  <SelectItem value="warning">{t.warning}</SelectItem>
                  <SelectItem value="error">{t.error}</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 max-h-[200px] overflow-y-auto">
            {filteredEvents.length > 0 ? (
              filteredEvents.map((event) => (
                <div key={event.id} className="flex items-start gap-3 p-3 rounded-lg border hover:bg-muted/50 transition-colors">
                  <EventBadge type={event.type} lang={language} />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm">{event.message}</p>
                    <p className="text-xs text-muted-foreground">{event.source}</p>
                  </div>
                  <time className="text-xs text-muted-foreground flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {event.timestamp.toLocaleTimeString(language === 'tr' ? 'tr-TR' : 'en-US')}
                  </time>
                </div>
              ))
            ) : (
              <div className="text-center py-6 text-muted-foreground">
                <AlertCircle className="h-8 w-8 mx-auto mb-2 opacity-30" />
                <p>{t.noEvents}</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
        </div>
      </Main>
    </>
  )
}

export default LiveMonitoring
