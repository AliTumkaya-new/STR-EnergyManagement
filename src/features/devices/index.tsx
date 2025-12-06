import { useState, useMemo } from 'react'
import { 
  Search, MoreHorizontal, Wifi, WifiOff, Battery, 
  Zap, Sun, Settings, Trash2,
  Clock, MapPin, AlertTriangle, CheckCircle2, 
  XCircle, RefreshCw, Download, Eye, Copy, QrCode,
  Cpu, Server, Router, 
  Droplets, Wind, Flame, Cable, CircuitBoard, Activity,
  Filter, ArrowUpDown, ArrowUp, ArrowDown, BarChart3,
  FileDown, Scan, Network, TrendingUp, Waves, History
} from 'lucide-react'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { 
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, 
  DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu'
import {
  Dialog, DialogContent, DialogDescription, DialogFooter,
  DialogHeader, DialogTitle
} from '@/components/ui/dialog'
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow
} from '@/components/ui/table'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue
} from '@/components/ui/select'
import { useLanguage } from '@/lib/i18n'

// Cihaz türleri
type DeviceType = 'energy_meter' | 'solar_inverter' | 'battery_storage' | 'smart_sensor' | 'gateway' | 'transformer' | 'water_meter' | 'gas_meter' | 'weather_station'

type DeviceStatus = 'online' | 'offline' | 'warning' | 'maintenance'

// Device type icons mapping (labels are dynamic based on language)
const deviceTypeIcons: Record<DeviceType, { icon: React.ComponentType<{ className?: string }>, color: string, bgColor: string }> = {
  energy_meter: { icon: Zap, color: 'text-foreground', bgColor: 'bg-muted' },
  solar_inverter: { icon: Sun, color: 'text-foreground', bgColor: 'bg-muted' },
  battery_storage: { icon: Battery, color: 'text-foreground', bgColor: 'bg-muted' },
  smart_sensor: { icon: CircuitBoard, color: 'text-foreground', bgColor: 'bg-muted' },
  gateway: { icon: Router, color: 'text-foreground', bgColor: 'bg-muted' },
  transformer: { icon: Cable, color: 'text-foreground', bgColor: 'bg-muted' },
  water_meter: { icon: Droplets, color: 'text-foreground', bgColor: 'bg-muted' },
  gas_meter: { icon: Flame, color: 'text-foreground', bgColor: 'bg-muted' },
  weather_station: { icon: Wind, color: 'text-foreground', bgColor: 'bg-muted' },
}

interface Device {
  id: string
  serialNumber: string
  name: string
  type: DeviceType
  status: DeviceStatus
  location: string
  zone: string
  lastSeen: string
  firmware: string
  signalStrength: number
  batteryLevel: number | null
  ipAddress: string
  macAddress: string
  manufacturer: string
  model: string
  installDate: string
  lastMaintenance: string
  readings: {
    label: string
    value: string
    unit: string
  }[]
  alerts: number
}

// Mock cihaz verileri
const mockDevices: Device[] = [
  {
    id: 'DEV-001',
    serialNumber: 'STR-EM-2024-00001',
    name: 'Ana Sayaç - Bina A',
    type: 'energy_meter',
    status: 'online',
    location: 'Bina A - Giriş',
    zone: 'Bölge 1',
    lastSeen: '2 dakika önce',
    firmware: 'v2.4.1',
    signalStrength: 95,
    batteryLevel: null,
    ipAddress: '192.168.1.101',
    macAddress: 'AA:BB:CC:DD:EE:01',
    manufacturer: 'STR Enerji',
    model: 'EM-3000 Pro',
    installDate: '2024-01-15',
    lastMaintenance: '2024-11-01',
    readings: [
      { label: 'Anlık Güç', value: '245.6', unit: 'kW' },
      { label: 'Günlük Tüketim', value: '1,847', unit: 'kWh' },
      { label: 'Gerilim', value: '398', unit: 'V' },
    ],
    alerts: 0
  },
  {
    id: 'DEV-002',
    serialNumber: 'STR-SI-2024-00015',
    name: 'Solar İnverter #1',
    type: 'solar_inverter',
    status: 'online',
    location: 'Çatı - Batı',
    zone: 'Bölge 2',
    lastSeen: '1 dakika önce',
    firmware: 'v3.1.0',
    signalStrength: 88,
    batteryLevel: null,
    ipAddress: '192.168.1.115',
    macAddress: 'AA:BB:CC:DD:EE:15',
    manufacturer: 'STR Enerji',
    model: 'SI-50K Plus',
    installDate: '2024-03-20',
    lastMaintenance: '2024-10-15',
    readings: [
      { label: 'DC Giriş', value: '52.4', unit: 'kW' },
      { label: 'AC Çıkış', value: '48.7', unit: 'kW' },
      { label: 'Verimlilik', value: '92.9', unit: '%' },
    ],
    alerts: 0
  },
  {
    id: 'DEV-003',
    serialNumber: 'STR-SI-2024-00016',
    name: 'Solar İnverter #2',
    type: 'solar_inverter',
    status: 'warning',
    location: 'Çatı - Doğu',
    zone: 'Bölge 2',
    lastSeen: '5 dakika önce',
    firmware: 'v3.0.8',
    signalStrength: 72,
    batteryLevel: null,
    ipAddress: '192.168.1.116',
    macAddress: 'AA:BB:CC:DD:EE:16',
    manufacturer: 'STR Enerji',
    model: 'SI-50K Plus',
    installDate: '2024-03-20',
    lastMaintenance: '2024-09-01',
    readings: [
      { label: 'DC Giriş', value: '45.2', unit: 'kW' },
      { label: 'AC Çıkış', value: '38.1', unit: 'kW' },
      { label: 'Verimlilik', value: '84.3', unit: '%' },
    ],
    alerts: 2
  },
  {
    id: 'DEV-004',
    serialNumber: 'STR-BS-2024-00003',
    name: 'Batarya Depolama Ünitesi',
    type: 'battery_storage',
    status: 'online',
    location: 'Enerji Odası',
    zone: 'Bölge 1',
    lastSeen: '30 saniye önce',
    firmware: 'v1.8.5',
    signalStrength: 98,
    batteryLevel: 85,
    ipAddress: '192.168.1.103',
    macAddress: 'AA:BB:CC:DD:EE:03',
    manufacturer: 'STR Enerji',
    model: 'BS-500 LiFePO4',
    installDate: '2024-02-10',
    lastMaintenance: '2024-11-10',
    readings: [
      { label: 'Şarj Durumu', value: '85', unit: '%' },
      { label: 'Şarj Gücü', value: '125', unit: 'kW' },
      { label: 'Sıcaklık', value: '32', unit: '°C' },
    ],
    alerts: 0
  },
  {
    id: 'DEV-005',
    serialNumber: 'STR-SS-2024-00042',
    name: 'Sıcaklık Sensörü - Trafo',
    type: 'smart_sensor',
    status: 'online',
    location: 'Trafo Odası',
    zone: 'Bölge 3',
    lastSeen: '1 dakika önce',
    firmware: 'v1.2.3',
    signalStrength: 82,
    batteryLevel: 67,
    ipAddress: '192.168.1.142',
    macAddress: 'AA:BB:CC:DD:EE:42',
    manufacturer: 'STR Enerji',
    model: 'SS-T200',
    installDate: '2024-05-05',
    lastMaintenance: '2024-10-20',
    readings: [
      { label: 'Sıcaklık', value: '45.2', unit: '°C' },
      { label: 'Nem', value: '38', unit: '%' },
    ],
    alerts: 0
  },
  {
    id: 'DEV-006',
    serialNumber: 'STR-GW-2024-00001',
    name: 'Ana Gateway',
    type: 'gateway',
    status: 'online',
    location: 'Kontrol Odası',
    zone: 'Bölge 1',
    lastSeen: 'Şimdi',
    firmware: 'v4.2.0',
    signalStrength: 100,
    batteryLevel: null,
    ipAddress: '192.168.1.1',
    macAddress: 'AA:BB:CC:DD:EE:00',
    manufacturer: 'STR Enerji',
    model: 'GW-1000 Enterprise',
    installDate: '2024-01-10',
    lastMaintenance: '2024-11-15',
    readings: [
      { label: 'Bağlı Cihaz', value: '47', unit: 'adet' },
      { label: 'Uptime', value: '99.9', unit: '%' },
      { label: 'Veri Trafiği', value: '2.4', unit: 'GB/gün' },
    ],
    alerts: 0
  },
  {
    id: 'DEV-007',
    serialNumber: 'STR-TR-2024-00002',
    name: 'Trafo Monitörü',
    type: 'transformer',
    status: 'online',
    location: 'Trafo Merkezi',
    zone: 'Bölge 3',
    lastSeen: '2 dakika önce',
    firmware: 'v2.1.4',
    signalStrength: 91,
    batteryLevel: null,
    ipAddress: '192.168.1.102',
    macAddress: 'AA:BB:CC:DD:EE:02',
    manufacturer: 'STR Enerji',
    model: 'TM-2000',
    installDate: '2024-01-20',
    lastMaintenance: '2024-10-25',
    readings: [
      { label: 'Yük', value: '78', unit: '%' },
      { label: 'Yağ Sıcaklığı', value: '62', unit: '°C' },
      { label: 'Gerilim', value: '34.5', unit: 'kV' },
    ],
    alerts: 0
  },
  {
    id: 'DEV-008',
    serialNumber: 'STR-WM-2024-00008',
    name: 'Su Sayacı - Ana Hat',
    type: 'water_meter',
    status: 'online',
    location: 'Mekanik Oda',
    zone: 'Bölge 1',
    lastSeen: '3 dakika önce',
    firmware: 'v1.5.2',
    signalStrength: 79,
    batteryLevel: 92,
    ipAddress: '192.168.1.108',
    macAddress: 'AA:BB:CC:DD:EE:08',
    manufacturer: 'STR Enerji',
    model: 'WM-500',
    installDate: '2024-04-12',
    lastMaintenance: '2024-09-15',
    readings: [
      { label: 'Anlık Debi', value: '12.5', unit: 'm³/h' },
      { label: 'Günlük Tüketim', value: '245', unit: 'm³' },
      { label: 'Basınç', value: '4.2', unit: 'bar' },
    ],
    alerts: 0
  },
  {
    id: 'DEV-009',
    serialNumber: 'STR-GM-2024-00005',
    name: 'Gaz Sayacı - Kazan',
    type: 'gas_meter',
    status: 'offline',
    location: 'Kazan Dairesi',
    zone: 'Bölge 4',
    lastSeen: '2 saat önce',
    firmware: 'v1.3.1',
    signalStrength: 0,
    batteryLevel: 15,
    ipAddress: '192.168.1.105',
    macAddress: 'AA:BB:CC:DD:EE:05',
    manufacturer: 'STR Enerji',
    model: 'GM-300',
    installDate: '2024-02-28',
    lastMaintenance: '2024-08-20',
    readings: [
      { label: 'Son Okuma', value: '45.8', unit: 'm³/h' },
      { label: 'Günlük Tüketim', value: '892', unit: 'm³' },
    ],
    alerts: 3
  },
  {
    id: 'DEV-010',
    serialNumber: 'STR-WS-2024-00001',
    name: 'Hava İstasyonu',
    type: 'weather_station',
    status: 'online',
    location: 'Çatı - Kuzey',
    zone: 'Bölge 2',
    lastSeen: '1 dakika önce',
    firmware: 'v2.0.3',
    signalStrength: 86,
    batteryLevel: 78,
    ipAddress: '192.168.1.110',
    macAddress: 'AA:BB:CC:DD:EE:10',
    manufacturer: 'STR Enerji',
    model: 'WS-Pro',
    installDate: '2024-03-01',
    lastMaintenance: '2024-10-01',
    readings: [
      { label: 'Sıcaklık', value: '18.5', unit: '°C' },
      { label: 'Işınım', value: '847', unit: 'W/m²' },
      { label: 'Rüzgar', value: '12', unit: 'km/h' },
    ],
    alerts: 0
  },
  {
    id: 'DEV-011',
    serialNumber: 'STR-EM-2024-00002',
    name: 'Alt Sayaç - Üretim',
    type: 'energy_meter',
    status: 'maintenance',
    location: 'Üretim Hattı',
    zone: 'Bölge 5',
    lastSeen: '1 gün önce',
    firmware: 'v2.3.9',
    signalStrength: 45,
    batteryLevel: null,
    ipAddress: '192.168.1.111',
    macAddress: 'AA:BB:CC:DD:EE:11',
    manufacturer: 'STR Enerji',
    model: 'EM-2000',
    installDate: '2024-01-25',
    lastMaintenance: '2024-11-28',
    readings: [
      { label: 'Son Okuma', value: '156.2', unit: 'kW' },
    ],
    alerts: 1
  },
  {
    id: 'DEV-012',
    serialNumber: 'STR-SS-2024-00043',
    name: 'Akım Sensörü - Hat 1',
    type: 'smart_sensor',
    status: 'online',
    location: 'Elektrik Panosu',
    zone: 'Bölge 1',
    lastSeen: '45 saniye önce',
    firmware: 'v1.2.3',
    signalStrength: 94,
    batteryLevel: 89,
    ipAddress: '192.168.1.143',
    macAddress: 'AA:BB:CC:DD:EE:43',
    manufacturer: 'STR Enerji',
    model: 'SS-C100',
    installDate: '2024-06-10',
    lastMaintenance: '2024-10-30',
    readings: [
      { label: 'Akım L1', value: '245', unit: 'A' },
      { label: 'Akım L2', value: '238', unit: 'A' },
      { label: 'Akım L3', value: '251', unit: 'A' },
    ],
    alerts: 0
  },
]

// Status badge component - uses translation hook for labels
function StatusBadge({ status, t }: { status: DeviceStatus, t: (key: any) => string }) {
  const statusConfig = {
    online: { 
      labelKey: 'online', 
      color: 'border-green-200 bg-green-50 text-green-700 dark:border-green-800 dark:bg-green-950 dark:text-green-300', 
      icon: CheckCircle2,
      iconColor: 'text-green-600 dark:text-green-400'
    },
    offline: { 
      labelKey: 'offline', 
      color: 'border-red-200 bg-red-50 text-red-700 dark:border-red-800 dark:bg-red-950 dark:text-red-300', 
      icon: XCircle,
      iconColor: 'text-red-600 dark:text-red-400'
    },
    warning: { 
      labelKey: 'warning', 
      color: 'border-orange-200 bg-orange-50 text-orange-700 dark:border-orange-800 dark:bg-orange-950 dark:text-orange-300', 
      icon: AlertTriangle,
      iconColor: 'text-orange-600 dark:text-orange-400'
    },
    maintenance: { 
      labelKey: 'maintenance', 
      color: 'border-blue-200 bg-blue-50 text-blue-700 dark:border-blue-800 dark:bg-blue-950 dark:text-blue-300', 
      icon: Settings,
      iconColor: 'text-blue-600 dark:text-blue-400'
    },
  }
  
  const config = statusConfig[status]
  const Icon = config.icon
  
  return (
    <Badge variant="outline" className={`text-[10px] ${config.color} border`}>
      <Icon className={`mr-1 h-3 w-3 ${config.iconColor}`} />
      {t(config.labelKey)}
    </Badge>
  )
}

// Signal strength indicator - With color coding
function SignalIndicator({ strength, t }: { strength: number, t: (key: any) => string }) {
  const getSignalConfig = () => {
    if (strength === 0) {
      return {
        icon: WifiOff,
        color: 'text-red-500 dark:text-red-400',
        bgColor: 'bg-red-50 dark:bg-red-950',
        labelKey: 'noSignal'
      }
    }
    if (strength < 30) {
      return {
        icon: Wifi,
        color: 'text-red-500 dark:text-red-400',
        bgColor: 'bg-red-50 dark:bg-red-950',
        labelKey: 'weak'
      }
    }
    if (strength < 60) {
      return {
        icon: Wifi,
        color: 'text-orange-500 dark:text-orange-400',
        bgColor: 'bg-orange-50 dark:bg-orange-950',
        labelKey: 'medium'
      }
    }
    if (strength < 80) {
      return {
        icon: Wifi,
        color: 'text-yellow-600 dark:text-yellow-400',
        bgColor: 'bg-yellow-50 dark:bg-yellow-950',
        labelKey: 'good'
      }
    }
    return {
      icon: Wifi,
      color: 'text-green-600 dark:text-green-400',
      bgColor: 'bg-green-50 dark:bg-green-950',
      labelKey: 'excellent'
    }
  }

  const config = getSignalConfig()
  const Icon = config.icon
  
  return (
    <div className={`flex items-center gap-1.5 px-2 py-1 rounded-md ${config.bgColor}`}>
      <Icon className={`h-3.5 w-3.5 ${config.color}`} />
      <span className={`text-xs font-medium ${config.color}`}>{strength}%</span>
    </div>
  )
}

// Device Card Component
function DeviceCard({ device, onClick, t, deviceTypeInfo }: { 
  device: Device, 
  onClick: () => void, 
  t: (key: any) => string, 
  deviceTypeInfo: Record<DeviceType, { label: string, icon: React.ComponentType<{ className?: string }>, color: string, bgColor: string }> 
}) {
  const typeInfo = deviceTypeInfo[device.type]
  const TypeIcon = typeInfo.icon
  
  return (
    <Card 
      className={`cursor-pointer transition-all hover:shadow-md border ${device.status === 'offline' ? 'opacity-60' : ''}`}
      onClick={onClick}
    >
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-3">
            <div className={`rounded-lg p-2.5 border ${typeInfo.bgColor}`}>
              <TypeIcon className={`h-5 w-5 ${typeInfo.color}`} />
            </div>
            <div>
              <h3 className="font-semibold text-sm">{device.name}</h3>
              <p className="text-xs text-muted-foreground font-mono">{device.serialNumber}</p>
            </div>
          </div>
          <StatusBadge status={device.status} t={t} />
        </div>
        
        <div className="grid gap-2 mb-3">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground flex items-center gap-1.5">
              <MapPin className="h-3 w-3" />
              {device.location}
            </span>
            <SignalIndicator strength={device.signalStrength} t={t} />
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground flex items-center gap-1.5">
              <Clock className="h-3 w-3" />
              {device.lastSeen}
            </span>
            {device.batteryLevel !== null && (
              <div className={`flex items-center gap-1.5 px-2 py-1 rounded-md ${
                device.batteryLevel < 20 
                  ? 'bg-red-50 dark:bg-red-950' 
                  : device.batteryLevel < 50 
                    ? 'bg-orange-50 dark:bg-orange-950'
                    : 'bg-green-50 dark:bg-green-950'
              }`}>
                <Battery className={`h-3.5 w-3.5 ${
                  device.batteryLevel < 20 
                    ? 'text-red-600 dark:text-red-400' 
                    : device.batteryLevel < 50 
                      ? 'text-orange-600 dark:text-orange-400'
                      : 'text-green-600 dark:text-green-400'
                }`} />
                <span className={`text-xs font-medium ${
                  device.batteryLevel < 20 
                    ? 'text-red-600 dark:text-red-400' 
                    : device.batteryLevel < 50 
                      ? 'text-orange-600 dark:text-orange-400'
                      : 'text-green-600 dark:text-green-400'
                }`}>{device.batteryLevel}%</span>
              </div>
            )}
          </div>
        </div>
        
        {device.readings.length > 0 && (
          <div className="pt-3 border-t">
            <div className="grid grid-cols-3 gap-2">
              {device.readings.slice(0, 3).map((reading, idx) => (
                <div key={idx} className="text-center">
                  <p className="text-lg font-bold">{reading.value}</p>
                  <p className="text-[10px] text-muted-foreground">{reading.unit}</p>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {device.alerts > 0 && (
          <div className="mt-3 pt-3 border-t">
            <Badge variant="destructive" className="text-[10px]">
              <AlertTriangle className="mr-1 h-3 w-3" />
              {device.alerts} {t('activeAlert')}
            </Badge>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

// Device Detail Dialog
function DeviceDetailDialog({ device, open, onClose, t, deviceTypeInfo, language }: { 
  device: Device | null, 
  open: boolean, 
  onClose: () => void,
  t: (key: any) => string,
  deviceTypeInfo: Record<DeviceType, { label: string, icon: React.ComponentType<{ className?: string }>, color: string, bgColor: string }>,
  language: string
}) {
  if (!device) return null
  
  const typeInfo = deviceTypeInfo[device.type]
  const TypeIcon = typeInfo.icon
  
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <div className={`rounded-xl p-3 ${typeInfo.bgColor}`}>
              <TypeIcon className={`h-6 w-6 ${typeInfo.color}`} />
            </div>
            <div>
              <DialogTitle className="text-xl">{device.name}</DialogTitle>
              <DialogDescription className="font-mono">{device.serialNumber}</DialogDescription>
            </div>
          </div>
        </DialogHeader>
        
        <div className="grid gap-6 py-4">
          {/* Status & Signal */}
          <div className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
            <StatusBadge status={device.status} t={t} />
            <SignalIndicator strength={device.signalStrength} t={t} />
            {device.batteryLevel !== null && (
              <div className="flex items-center gap-2">
                <Battery className="h-5 w-5 text-foreground/60" />
                <span className="font-medium">{device.batteryLevel}%</span>
              </div>
            )}
          </div>
          
          {/* Device Info Grid */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-3">
              <h4 className="font-semibold text-sm flex items-center gap-2">
                <Server className="h-4 w-4" />
                {t('deviceInfo')}
              </h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">{t('deviceId')}</span>
                  <span className="font-mono font-medium">{device.id}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">{t('type')}</span>
                  <span>{typeInfo.label}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">{t('manufacturer')}</span>
                  <span>{device.manufacturer}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">{t('model')}</span>
                  <span>{device.model}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">{t('firmware')}</span>
                  <span className="font-mono">{device.firmware}</span>
                </div>
              </div>
            </div>
            
            <div className="space-y-3">
              <h4 className="font-semibold text-sm flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                {t('locationNetwork')}
              </h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">{t('location')}</span>
                  <span>{device.location}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">{t('zone')}</span>
                  <span>{device.zone}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">{t('ipAddress')}</span>
                  <span className="font-mono">{device.ipAddress}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">{t('macAddress')}</span>
                  <span className="font-mono text-xs">{device.macAddress}</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Readings */}
          {device.readings.length > 0 && (
            <div className="space-y-3">
              <h4 className="font-semibold text-sm flex items-center gap-2">
                <Activity className="h-4 w-4" />
                {t('currentReadings')}
              </h4>
              <div className="grid grid-cols-3 gap-3">
                {device.readings.map((reading, idx) => (
                  <Card key={idx} className="border-0 bg-muted/50">
                    <CardContent className="p-3 text-center">
                      <p className="text-2xl font-bold">{reading.value}</p>
                      <p className="text-xs text-muted-foreground">{reading.label}</p>
                      <p className="text-sm font-medium text-primary">{reading.unit}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}
          
          {/* Maintenance Info */}
          <div className="grid grid-cols-2 gap-4">
            <div className="p-3 rounded-lg bg-muted/50">
              <p className="text-xs text-muted-foreground mb-1">{t('installDate')}</p>
              <p className="font-medium">{new Date(device.installDate).toLocaleDateString(language === 'tr' ? 'tr-TR' : 'en-US')}</p>
            </div>
            <div className="p-3 rounded-lg bg-muted/50">
              <p className="text-xs text-muted-foreground mb-1">{t('lastMaintenanceDate')}</p>
              <p className="font-medium">{new Date(device.lastMaintenance).toLocaleDateString(language === 'tr' ? 'tr-TR' : 'en-US')}</p>
            </div>
          </div>
        </div>
        
        <DialogFooter className="flex-col sm:flex-row gap-2">
          <Button variant="outline" size="sm" className="gap-2">
            <Copy className="h-4 w-4" />
            {t('copyId')}
          </Button>
          <Button variant="outline" size="sm" className="gap-2">
            <QrCode className="h-4 w-4" />
            {t('qrCode')}
          </Button>
          <Button variant="outline" size="sm" className="gap-2">
            <RefreshCw className="h-4 w-4" />
            {t('restart')}
          </Button>
          <Button variant="default" size="sm" className="gap-2">
            <Settings className="h-4 w-4" />
            {t('configure')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

type SortField = 'name' | 'status' | 'signal' | 'lastSeen' | 'type'
type SortOrder = 'asc' | 'desc'

export function Devices() {
  const { t, language } = useLanguage()
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedType, setSelectedType] = useState<string>('all')
  const [selectedStatus, setSelectedStatus] = useState<string>('all')
  const [selectedZone, setSelectedZone] = useState<string>('all')
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid')
  const [selectedDevice, setSelectedDevice] = useState<Device | null>(null)
  const [detailOpen, setDetailOpen] = useState(false)
  const [sortField, setSortField] = useState<SortField>('name')
  const [sortOrder, setSortOrder] = useState<SortOrder>('asc')
  const [selectedDevices, setSelectedDevices] = useState<Set<string>>(new Set())

  // Device type info with translated labels
  const deviceTypeInfo = useMemo(() => ({
    energy_meter: { label: t('energyMeter'), icon: Zap, color: 'text-foreground', bgColor: 'bg-muted' },
    solar_inverter: { label: t('solarInverter'), icon: Sun, color: 'text-foreground', bgColor: 'bg-muted' },
    battery_storage: { label: t('batteryStorage'), icon: Battery, color: 'text-foreground', bgColor: 'bg-muted' },
    smart_sensor: { label: t('smartSensor'), icon: CircuitBoard, color: 'text-foreground', bgColor: 'bg-muted' },
    gateway: { label: t('gatewayDevice'), icon: Router, color: 'text-foreground', bgColor: 'bg-muted' },
    transformer: { label: t('transformerMonitor'), icon: Cable, color: 'text-foreground', bgColor: 'bg-muted' },
    water_meter: { label: t('waterMeter'), icon: Droplets, color: 'text-foreground', bgColor: 'bg-muted' },
    gas_meter: { label: t('gasMeter'), icon: Flame, color: 'text-foreground', bgColor: 'bg-muted' },
    weather_station: { label: t('weatherStation'), icon: Wind, color: 'text-foreground', bgColor: 'bg-muted' },
  }), [t])

  // Get unique zones
  const zones = useMemo(() => {
    const zoneSet = new Set(mockDevices.map(d => d.zone))
    return Array.from(zoneSet).sort()
  }, [])

  // Filter and sort devices
  const filteredDevices = useMemo(() => {
    let filtered = mockDevices.filter(device => {
      const matchesSearch = 
        device.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        device.serialNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
        device.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        device.location.toLowerCase().includes(searchQuery.toLowerCase())
      
      const matchesType = selectedType === 'all' || device.type === selectedType
      const matchesStatus = selectedStatus === 'all' || device.status === selectedStatus
      const matchesZone = selectedZone === 'all' || device.zone === selectedZone
      
      return matchesSearch && matchesType && matchesStatus && matchesZone
    })

    // Sort
    filtered.sort((a, b) => {
      let aValue: any, bValue: any
      
      switch (sortField) {
        case 'name':
          aValue = a.name.toLowerCase()
          bValue = b.name.toLowerCase()
          break
        case 'status':
          aValue = a.status
          bValue = b.status
          break
        case 'signal':
          aValue = a.signalStrength
          bValue = b.signalStrength
          break
        case 'lastSeen':
          aValue = a.lastSeen
          bValue = b.lastSeen
          break
        case 'type':
          aValue = a.type
          bValue = b.type
          break
        default:
          return 0
      }

      if (aValue < bValue) return sortOrder === 'asc' ? -1 : 1
      if (aValue > bValue) return sortOrder === 'asc' ? 1 : -1
      return 0
    })

    return filtered
  }, [searchQuery, selectedType, selectedStatus, selectedZone, sortField, sortOrder])

  // Stats
  const stats = useMemo(() => ({
    total: mockDevices.length,
    online: mockDevices.filter(d => d.status === 'online').length,
    offline: mockDevices.filter(d => d.status === 'offline').length,
    warning: mockDevices.filter(d => d.status === 'warning').length,
    maintenance: mockDevices.filter(d => d.status === 'maintenance').length,
    alerts: mockDevices.reduce((sum, d) => sum + d.alerts, 0),
  }), [])

  const handleDeviceClick = (device: Device) => {
    setSelectedDevice(device)
    setDetailOpen(true)
  }

  // const handleSort = (field: SortField) => {
  //   if (sortField === field) {
  //     setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
  //   } else {
  //     setSortField(field)
  //     setSortOrder('asc')
  //   }
  // }

  // const toggleDeviceSelection = (deviceId: string) => {
  //   const newSelection = new Set(selectedDevices)
  //   if (newSelection.has(deviceId)) {
  //     newSelection.delete(deviceId)
  //   } else {
  //     newSelection.add(deviceId)
  //   }
  //   setSelectedDevices(newSelection)
  // }

  // const toggleAllDevices = () => {
  //   if (selectedDevices.size === filteredDevices.length) {
  //     setSelectedDevices(new Set())
  //   } else {
  //     setSelectedDevices(new Set(filteredDevices.map(d => d.id)))
  //   }
  // }

  const exportDevices = () => {
    const data = filteredDevices.map(d => ({
      ID: d.id,
      [t('serialNumber')]: d.serialNumber,
      [t('name')]: d.name,
      [t('type')]: deviceTypeInfo[d.type].label,
      [t('status')]: d.status,
      [t('location')]: d.location,
      [t('zone')]: d.zone,
      IP: d.ipAddress,
      [t('signal')]: d.signalStrength + '%'
    }))
    console.log('Exporting data:', data)
  }

  return (
    <>
      <Header />
      <Main>
        <div className="flex flex-col gap-6">
          {/* Header */}
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="flex items-center gap-3">
                <div className="rounded-xl bg-muted p-3 border">
                  <Cpu className="h-7 w-7 text-foreground" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold tracking-tight">{t('deviceManagement')}</h1>
                  <p className="text-sm text-muted-foreground mt-0.5">
                    {t('deviceManagementDesc')}
                  </p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="gap-2" onClick={exportDevices}>
                <FileDown className="h-4 w-4" />
                {t('export')}
              </Button>
              <Button variant="outline" size="sm" className="gap-2">
                <Scan className="h-4 w-4" />
                {t('scan')}
              </Button>
            </div>
          </div>

          {/* Stats Cards - Professional Monochrome Design */}
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
            <Card className="border shadow-sm hover:shadow-md transition-all duration-300">
              <CardContent className="p-5">
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">{t('total')}</p>
                    <p className="text-3xl font-bold">{stats.total}</p>
                  </div>
                  <div className="rounded-lg bg-muted/50 p-2.5">
                    <Server className="h-5 w-5 text-foreground/60" />
                  </div>
                </div>
                <div className="mt-3 flex items-center gap-1 text-xs text-muted-foreground">
                  <Network className="h-3 w-3" />
                  <span>{t('registeredDevice')}</span>
                </div>
              </CardContent>
            </Card>

            <Card className="border shadow-sm hover:shadow-md transition-all duration-300">
              <CardContent className="p-5">
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">{t('active')}</p>
                    <p className="text-3xl font-bold">{stats.online}</p>
                  </div>
                  <div className="rounded-lg bg-muted/50 p-2.5">
                    <CheckCircle2 className="h-5 w-5 text-foreground/60" />
                  </div>
                </div>
                <div className="mt-3 flex items-center gap-1 text-xs text-muted-foreground">
                  <TrendingUp className="h-3 w-3" />
                  <span>{((stats.online / stats.total) * 100).toFixed(1)}% uptime</span>
                </div>
              </CardContent>
            </Card>

            <Card className="border shadow-sm hover:shadow-md transition-all duration-300">
              <CardContent className="p-5">
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">{t('offline')}</p>
                    <p className="text-3xl font-bold">{stats.offline}</p>
                  </div>
                  <div className="rounded-lg bg-muted/50 p-2.5">
                    <XCircle className="h-5 w-5 text-foreground/60" />
                  </div>
                </div>
                <div className="mt-3 flex items-center gap-1 text-xs text-muted-foreground">
                  <History className="h-3 w-3" />
                  <span>{t('noConnection')}</span>
                </div>
              </CardContent>
            </Card>

            <Card className="border shadow-sm hover:shadow-md transition-all duration-300">
              <CardContent className="p-5">
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">{t('warning')}</p>
                    <p className="text-3xl font-bold">{stats.warning}</p>
                  </div>
                  <div className="rounded-lg bg-muted/50 p-2.5">
                    <AlertTriangle className="h-5 w-5 text-foreground/60" />
                  </div>
                </div>
                <div className="mt-3 flex items-center gap-1 text-xs text-muted-foreground">
                  <Waves className="h-3 w-3" />
                  <span>{t('monitoringRequired')}</span>
                </div>
              </CardContent>
            </Card>

            <Card className="border shadow-sm hover:shadow-md transition-all duration-300">
              <CardContent className="p-5">
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">{t('maintenance')}</p>
                    <p className="text-3xl font-bold">{stats.maintenance}</p>
                  </div>
                  <div className="rounded-lg bg-muted/50 p-2.5">
                    <Settings className="h-5 w-5 text-foreground/60" />
                  </div>
                </div>
                <div className="mt-3 flex items-center gap-1 text-xs text-muted-foreground">
                  <Clock className="h-3 w-3" />
                  <span>{t('plannedMaintenance')}</span>
                </div>
              </CardContent>
            </Card>

            <Card className="border shadow-sm hover:shadow-md transition-all duration-300">
              <CardContent className="p-5">
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">{t('activeAlerts')}</p>
                    <p className="text-3xl font-bold">{stats.alerts}</p>
                  </div>
                  <div className="rounded-lg bg-muted/50 p-2.5">
                    <BarChart3 className="h-5 w-5 text-foreground/60" />
                  </div>
                </div>
                <div className="mt-3 flex items-center gap-1 text-xs text-muted-foreground">
                  <AlertTriangle className="h-3 w-3" />
                  <span>{t('requiresAttention')}</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Advanced Filters & Controls */}
          <Card className="border shadow-sm">
            <CardContent className="p-5">
              <div className="flex flex-col gap-4">
                {/* Search and Primary Filters */}
                <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
                  <div className="flex flex-1 items-center gap-3 flex-wrap">
                    <div className="relative flex-1 min-w-[280px] max-w-md">
                      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        placeholder={t('searchDevicePlaceholder')}
                        className="pl-9 h-10"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                    </div>
                    
                    <Select value={selectedType} onValueChange={setSelectedType}>
                      <SelectTrigger className="w-[180px] h-10">
                        <div className="flex items-center gap-2">
                          <Filter className="h-4 w-4" />
                          <SelectValue placeholder={t('deviceType')} />
                        </div>
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">{t('allTypes')}</SelectItem>
                        {Object.entries(deviceTypeInfo).map(([key, info]) => (
                          <SelectItem key={key} value={key}>
                            <div className="flex items-center gap-2">
                              <info.icon className={`h-4 w-4 ${info.color}`} />
                              {info.label}
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                      <SelectTrigger className="w-[150px] h-10">
                        <SelectValue placeholder={t('status')} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">{t('allStatuses')}</SelectItem>
                        <SelectItem value="online">
                          <div className="flex items-center gap-2">
                            <CheckCircle2 className="h-4 w-4" />
                            {t('online')}
                          </div>
                        </SelectItem>
                        <SelectItem value="offline">
                          <div className="flex items-center gap-2">
                            <XCircle className="h-4 w-4" />
                            {t('offline')}
                          </div>
                        </SelectItem>
                        <SelectItem value="warning">
                          <div className="flex items-center gap-2">
                            <AlertTriangle className="h-4 w-4" />
                            {t('warning')}
                          </div>
                        </SelectItem>
                        <SelectItem value="maintenance">
                          <div className="flex items-center gap-2">
                            <Settings className="h-4 w-4" />
                            {t('maintenance')}
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>

                    <Select value={selectedZone} onValueChange={setSelectedZone}>
                      <SelectTrigger className="w-[150px] h-10">
                        <SelectValue placeholder={t('zone')} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">{t('allZones')}</SelectItem>
                        {zones.map(zone => (
                          <SelectItem key={zone} value={zone}>{zone}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  {/* View Controls & Sort */}
                  <div className="flex items-center gap-2">
                    {/* Sort Dropdown */}
                    <Select value={sortField} onValueChange={(value) => setSortField(value as SortField)}>
                      <SelectTrigger className="w-[140px] h-10">
                        <div className="flex items-center gap-2">
                          <ArrowUpDown className="h-4 w-4" />
                          <span className="text-sm">{t('sortBy')}</span>
                        </div>
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="name">{t('name')}</SelectItem>
                        <SelectItem value="status">{t('status')}</SelectItem>
                        <SelectItem value="signal">{t('signal')}</SelectItem>
                        <SelectItem value="type">{t('type')}</SelectItem>
                        <SelectItem value="lastSeen">{t('lastSeen')}</SelectItem>
                      </SelectContent>
                    </Select>

                    <Button
                      variant="outline"
                      size="icon"
                      className="h-10 w-10"
                      onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                    >
                      {sortOrder === 'asc' ? (
                        <ArrowUp className="h-4 w-4" />
                      ) : (
                        <ArrowDown className="h-4 w-4" />
                      )}
                    </Button>

                    <div className="h-6 w-px bg-border mx-1" />

                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant={viewMode === 'grid' ? 'default' : 'outline'}
                            size="icon"
                            className="h-10 w-10"
                            onClick={() => setViewMode('grid')}
                          >
                            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                            </svg>
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>{t('gridView')}</TooltipContent>
                      </Tooltip>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant={viewMode === 'table' ? 'default' : 'outline'}
                            size="icon"
                            className="h-10 w-10"
                            onClick={() => setViewMode('table')}
                          >
                            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                            </svg>
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>{t('tableView')}</TooltipContent>
                      </Tooltip>
                    </TooltipProvider>

                    <div className="h-6 w-px bg-border mx-1" />

                    <Button variant="outline" size="icon" className="h-10 w-10">
                      <RefreshCw className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {/* Active Filters Display */}
                {(selectedType !== 'all' || selectedStatus !== 'all' || selectedZone !== 'all' || searchQuery) && (
                  <div className="flex items-center gap-2 flex-wrap pt-2 border-t">
                    <span className="text-sm text-muted-foreground">{t('activeFilters')}:</span>
                    {searchQuery && (
                      <Badge variant="secondary" className="gap-1">
                        {t('search')}: {searchQuery}
                        <button onClick={() => setSearchQuery('')} className="ml-1 hover:bg-muted rounded-full">
                          <XCircle className="h-3 w-3" />
                        </button>
                      </Badge>
                    )}
                    {selectedType !== 'all' && (
                      <Badge variant="secondary" className="gap-1">
                        {t('type')}: {deviceTypeInfo[selectedType as DeviceType]?.label}
                        <button onClick={() => setSelectedType('all')} className="ml-1 hover:bg-muted rounded-full">
                          <XCircle className="h-3 w-3" />
                        </button>
                      </Badge>
                    )}
                    {selectedStatus !== 'all' && (
                      <Badge variant="secondary" className="gap-1">
                        {t('status')}: {t(selectedStatus as any)}
                        <button onClick={() => setSelectedStatus('all')} className="ml-1 hover:bg-muted rounded-full">
                          <XCircle className="h-3 w-3" />
                        </button>
                      </Badge>
                    )}
                    {selectedZone !== 'all' && (
                      <Badge variant="secondary" className="gap-1">
                        {t('zone')}: {selectedZone}
                        <button onClick={() => setSelectedZone('all')} className="ml-1 hover:bg-muted rounded-full">
                          <XCircle className="h-3 w-3" />
                        </button>
                      </Badge>
                    )}
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="h-6 text-xs"
                      onClick={() => {
                        setSearchQuery('')
                        setSelectedType('all')
                        setSelectedStatus('all')
                        setSelectedZone('all')
                      }}
                    >
                      {t('clearAll')}
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Results Summary */}
          <div className="flex items-center justify-between px-1">
            <div className="flex items-center gap-4">
              <p className="text-sm font-medium">
                <span className="text-primary font-bold">{filteredDevices.length}</span>
                <span className="text-muted-foreground"> / {stats.total} {t('showingDevices')}</span>
              </p>
              {selectedDevices.size > 0 && (
                <Badge variant="secondary" className="gap-2">
                  <CheckCircle2 className="h-3 w-3" />
                  {selectedDevices.size} {t('selected')}
                </Badge>
              )}
            </div>
            {selectedDevices.size > 0 && (
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" className="h-8">
                  <Download className="mr-2 h-3 w-3" />
                  {t('exportSelected')}
                </Button>
                <Button variant="destructive" size="sm" className="h-8">
                  <Trash2 className="mr-2 h-3 w-3" />
                  {t('remove')}
                </Button>
              </div>
            )}
          </div>

          {/* Device Grid/Table */}
          {viewMode === 'grid' ? (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 animate-in fade-in duration-300">
              {filteredDevices.map(device => (
                <DeviceCard 
                  key={device.id} 
                  device={device} 
                  onClick={() => handleDeviceClick(device)}
                  t={t}
                  deviceTypeInfo={deviceTypeInfo}
                />
              ))}
            </div>
          ) : (
            <Card className="border shadow-sm animate-in fade-in duration-300">
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>{t('device')}</TableHead>
                      <TableHead>{t('serialNumber')}</TableHead>
                      <TableHead>{t('type')}</TableHead>
                      <TableHead>{t('location')}</TableHead>
                      <TableHead>{t('status')}</TableHead>
                      <TableHead>{t('signal')}</TableHead>
                      <TableHead>{t('lastSeen')}</TableHead>
                      <TableHead className="text-right">{t('actions')}</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredDevices.map(device => {
                      const typeInfo = deviceTypeInfo[device.type]
                      const TypeIcon = typeInfo.icon
                      return (
                        <TableRow key={device.id} className="cursor-pointer" onClick={() => handleDeviceClick(device)}>
                          <TableCell>
                            <div className="flex items-center gap-3">
                              <div className={`rounded-lg p-2 ${typeInfo.bgColor}`}>
                                <TypeIcon className={`h-4 w-4 ${typeInfo.color}`} />
                              </div>
                              <div>
                                <p className="font-medium">{device.name}</p>
                                <p className="text-xs text-muted-foreground font-mono">{device.id}</p>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell className="font-mono text-xs">{device.serialNumber}</TableCell>
                          <TableCell>{typeInfo.label}</TableCell>
                          <TableCell>{device.location}</TableCell>
                          <TableCell><StatusBadge status={device.status} t={t} /></TableCell>
                          <TableCell><SignalIndicator strength={device.signalStrength} t={t} /></TableCell>
                          <TableCell className="text-muted-foreground">{device.lastSeen}</TableCell>
                          <TableCell className="text-right">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                                <Button variant="ghost" size="icon">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuLabel>{t('actions')}</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>
                                  <Eye className="mr-2 h-4 w-4" />
                                  {t('details')}
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Settings className="mr-2 h-4 w-4" />
                                  {t('configure')}
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <RefreshCw className="mr-2 h-4 w-4" />
                                  {t('restart')}
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem className="text-red-500">
                                  <Trash2 className="mr-2 h-4 w-4" />
                                  {t('remove')}
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      )
                    })}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Device Detail Dialog */}
        <DeviceDetailDialog 
          device={selectedDevice} 
          open={detailOpen} 
          onClose={() => setDetailOpen(false)}
          t={t}
          deviceTypeInfo={deviceTypeInfo}
          language={language}
        />
      </Main>
    </>
  )
}
