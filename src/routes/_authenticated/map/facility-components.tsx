// =============================================================================
// PROFESSIONAL 3D FACILITY COMPONENTS
// Detaylı tesis bileşenleri - Elektrik panoları, borular, sensörler
// =============================================================================

import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { Html, Sparkles, Line } from '@react-three/drei'
import * as THREE from 'three'
import { 
  Zap, Thermometer, Droplets, Wind, 
  Activity, Gauge, Cpu, Server, Wifi, Radio
} from 'lucide-react'

// =============================================================================
// ELEKTRİK PANOSU (Main Distribution Panel)
// =============================================================================
export function ElectrikPanosu({ 
  position, 
  name, 
  voltage, 
  current, 
  status = 'active' 
}: { 
  position: [number, number, number]
  name: string
  voltage: string
  current: string
  status?: 'active' | 'warning' | 'offline'
}) {
  const statusColor = status === 'active' ? '#22c55e' : status === 'warning' ? '#f59e0b' : '#ef4444'

  return (
    <group position={position}>
      {/* Ana pano kutusu */}
      <mesh castShadow receiveShadow>
        <boxGeometry args={[1.2, 2, 0.4]} />
        <meshStandardMaterial color="#374151" roughness={0.3} metalness={0.7} />
      </mesh>

      {/* Pano kapağı (metal çerçeve) */}
      <mesh position={[0, 0, 0.21]} castShadow>
        <boxGeometry args={[1.1, 1.9, 0.05]} />
        <meshStandardMaterial color="#1f2937" roughness={0.2} metalness={0.9} />
      </mesh>

      {/* LED gösterge */}
      <mesh position={[0.4, 0.8, 0.25]}>
        <sphereGeometry args={[0.05, 16, 16]} />
        <meshStandardMaterial 
          color={statusColor} 
          emissive={statusColor} 
          emissiveIntensity={1} 
        />
      </mesh>

      {/* Dijital ekran */}
      <mesh position={[0, 0.3, 0.24]}>
        <boxGeometry args={[0.8, 0.6, 0.02]} />
        <meshStandardMaterial 
          color="#0f172a" 
          emissive="#1e40af" 
          emissiveIntensity={0.2} 
        />
      </mesh>

      {/* Kablo giriş noktaları (üstten) */}
      {[-0.3, 0, 0.3].map((x, i) => (
        <mesh key={i} position={[x, 1.05, 0]} castShadow>
          <cylinderGeometry args={[0.08, 0.08, 0.15, 8]} />
          <meshStandardMaterial color="#64748b" roughness={0.4} metalness={0.6} />
        </mesh>
      ))}

      {/* Etiket */}
      <Html position={[0, 2.5, 0]} center distanceFactor={15}>
        <div className="pointer-events-none flex flex-col items-center">
          <div className="flex items-center gap-1.5 rounded-lg border bg-slate-900/95 px-2 py-1 shadow-xl backdrop-blur-sm" style={{ borderColor: `${statusColor}40` }}>
            <Zap className="h-3 w-3" style={{ color: statusColor }} />
            <div className="flex flex-col">
              <span className="text-[9px] font-bold text-white">{name}</span>
              <span className="text-[7px] text-slate-400">{voltage} • {current}</span>
            </div>
          </div>
        </div>
      </Html>
    </group>
  )
}

// =============================================================================
// ENERJI SAYACI (Smart Meter)
// =============================================================================
export function EnerjiSayaci({ 
  position, 
  power, 
  type = 'import' 
}: { 
  position: [number, number, number]
  power: string
  type?: 'import' | 'export'
}) {
  return (
    <group position={position}>
      {/* Sayaç kutusu */}
      <mesh castShadow receiveShadow>
        <boxGeometry args={[0.4, 0.5, 0.25]} />
        <meshStandardMaterial color="#1f2937" roughness={0.3} metalness={0.7} />
      </mesh>

      {/* LCD ekran */}
      <mesh position={[0, 0.05, 0.13]}>
        <boxGeometry args={[0.32, 0.2, 0.02]} />
        <meshStandardMaterial 
          color="#0a0a0a" 
          emissive={type === 'import' ? '#3b82f6' : '#22c55e'} 
          emissiveIntensity={0.3} 
        />
      </mesh>

      {/* Bağlantı kabloları */}
      <mesh position={[0, 0.28, 0]} castShadow>
        <cylinderGeometry args={[0.04, 0.04, 0.1, 8]} />
        <meshStandardMaterial color="#64748b" roughness={0.4} metalness={0.6} />
      </mesh>

      {/* Küçük etiket */}
      <Html position={[0, 0.6, 0]} center distanceFactor={20}>
        <div className="pointer-events-none">
          <div className="rounded bg-black/80 px-1.5 py-0.5 backdrop-blur-sm">
            <span className="text-[7px] font-mono font-bold" style={{ color: type === 'import' ? '#3b82f6' : '#22c55e' }}>
              {power}
            </span>
          </div>
        </div>
      </Html>
    </group>
  )
}

// =============================================================================
// SICAKLIK SENSÖRÜ (Temperature Sensor)
// =============================================================================
export function SicaklikSensoru({ 
  position, 
  temperature, 
  status = 'normal' 
}: { 
  position: [number, number, number]
  temperature: string
  status?: 'normal' | 'warning' | 'critical'
}) {
  const statusColor = status === 'normal' ? '#22c55e' : status === 'warning' ? '#f59e0b' : '#ef4444'

  return (
    <group position={position}>
      {/* Sensör gövdesi */}
      <mesh castShadow>
        <cylinderGeometry args={[0.08, 0.08, 0.3, 16]} />
        <meshStandardMaterial color="#f8fafc" roughness={0.2} metalness={0.8} />
      </mesh>

      {/* Sensör başlığı */}
      <mesh position={[0, 0.2, 0]} castShadow>
        <sphereGeometry args={[0.1, 16, 16]} />
        <meshStandardMaterial color="#e2e8f0" roughness={0.3} metalness={0.7} />
      </mesh>

      {/* LED gösterge */}
      <mesh position={[0.08, 0.2, 0]}>
        <sphereGeometry args={[0.025, 8, 8]} />
        <meshStandardMaterial 
          color={statusColor} 
          emissive={statusColor} 
          emissiveIntensity={1.5} 
        />
      </mesh>

      {/* Etiket */}
      <Html position={[0, 0.5, 0]} center distanceFactor={25}>
        <div className="pointer-events-none">
          <div className="flex items-center gap-1 rounded bg-black/80 px-1.5 py-0.5 backdrop-blur-sm border" style={{ borderColor: `${statusColor}60` }}>
            <Thermometer className="h-2.5 w-2.5" style={{ color: statusColor }} />
            <span className="text-[7px] font-mono font-bold text-white">{temperature}</span>
          </div>
        </div>
      </Html>
    </group>
  )
}

// =============================================================================
// BORU SİSTEMİ (Pipe System)
// =============================================================================
export function BoruSistemi({ 
  points, 
  color = '#64748b', 
  diameter = 0.15, 
  type = 'water' 
}: { 
  points: [number, number, number][]
  color?: string
  diameter?: number
  type?: 'water' | 'hot-water' | 'gas' | 'electric'
}) {
  return (
    <group>
      {points.slice(0, -1).map((point, i) => {
        const nextPoint = points[i + 1]
        const direction = new THREE.Vector3(
          nextPoint[0] - point[0],
          nextPoint[1] - point[1],
          nextPoint[2] - point[2]
        )
        const length = direction.length()
        const midPoint: [number, number, number] = [
          (point[0] + nextPoint[0]) / 2,
          (point[1] + nextPoint[1]) / 2,
          (point[2] + nextPoint[2]) / 2,
        ]

        // Rotasyon hesaplama
        const axis = new THREE.Vector3(0, 1, 0)
        const quaternion = new THREE.Quaternion().setFromUnitVectors(
          axis,
          direction.normalize()
        )
        const euler = new THREE.Euler().setFromQuaternion(quaternion)

        return (
          <group key={i}>
            {/* Boru segmenti */}
            <mesh position={midPoint} rotation={[euler.x, euler.y, euler.z]} castShadow>
              <cylinderGeometry args={[diameter, diameter, length, 16]} />
              <meshStandardMaterial 
                color={color} 
                roughness={type === 'electric' ? 0.3 : 0.5} 
                metalness={type === 'electric' ? 0.9 : 0.6} 
              />
            </mesh>

            {/* Bağlantı flanşı */}
            <mesh position={nextPoint} castShadow>
              <cylinderGeometry args={[diameter * 1.3, diameter * 1.3, 0.08, 16]} />
              <meshStandardMaterial color="#475569" roughness={0.4} metalness={0.7} />
            </mesh>

            {/* Sıcak su için buhar efekti */}
            {type === 'hot-water' && i % 3 === 0 && (
              <Sparkles position={midPoint} count={8} scale={0.5} size={1} speed={0.3} opacity={0.3} color="#fbbf24" />
            )}
          </group>
        )
      })}
    </group>
  )
}

// =============================================================================
// İNVERTER (Solar Inverter)
// =============================================================================
export function Inverter({ 
  position, 
  name, 
  power, 
  efficiency 
}: { 
  position: [number, number, number]
  name: string
  power: string
  efficiency: number
}) {
  return (
    <group position={position}>
      {/* Ana inverter kutusu */}
      <mesh castShadow receiveShadow>
        <boxGeometry args={[1.5, 1.2, 0.5]} />
        <meshStandardMaterial color="#1e293b" roughness={0.3} metalness={0.7} />
      </mesh>

      {/* Soğutma kanatları */}
      {[-0.6, -0.2, 0.2, 0.6].map((x, i) => (
        <mesh key={i} position={[x, 0, 0.26]} castShadow>
          <boxGeometry args={[0.08, 1, 0.02]} />
          <meshStandardMaterial color="#334155" roughness={0.4} metalness={0.6} />
        </mesh>
      ))}

      {/* Dijital display */}
      <mesh position={[0, 0.3, 0.26]}>
        <boxGeometry args={[1, 0.4, 0.02]} />
        <meshStandardMaterial 
          color="#0f172a" 
          emissive="#22c55e" 
          emissiveIntensity={0.3} 
        />
      </mesh>

      {/* DC giriş terminalleri */}
      <mesh position={[-0.5, -0.7, 0.26]} castShadow>
        <cylinderGeometry args={[0.1, 0.1, 0.1, 8]} />
        <meshStandardMaterial color="#dc2626" roughness={0.3} metalness={0.7} />
      </mesh>
      <mesh position={[0.5, -0.7, 0.26]} castShadow>
        <cylinderGeometry args={[0.1, 0.1, 0.1, 8]} />
        <meshStandardMaterial color="#0ea5e9" roughness={0.3} metalness={0.7} />
      </mesh>

      {/* Etiket */}
      <Html position={[0, 1.5, 0]} center distanceFactor={18}>
        <div className="pointer-events-none flex flex-col items-center gap-1">
          <div className="flex items-center gap-1.5 rounded-lg border border-green-500/30 bg-slate-900/95 px-2 py-1 shadow-xl backdrop-blur-sm">
            <Activity className="h-3 w-3 text-green-400" />
            <div className="flex flex-col">
              <span className="text-[9px] font-bold text-white">{name}</span>
              <span className="text-[7px] text-slate-400">{power}</span>
            </div>
          </div>
          <div className="rounded-full border border-green-500/30 bg-green-500/20 px-2 py-0.5">
            <span className="text-[7px] font-bold text-green-400">%{efficiency}</span>
          </div>
        </div>
      </Html>
    </group>
  )
}

// =============================================================================
// TRAFO (Transformer)
// =============================================================================
export function Trafo({ 
  position, 
  name, 
  primaryVoltage, 
  secondaryVoltage, 
  capacity 
}: { 
  position: [number, number, number]
  name: string
  primaryVoltage: string
  secondaryVoltage: string
  capacity: string
}) {
  return (
    <group position={position}>
      {/* Ana trafo tankı */}
      <mesh castShadow receiveShadow>
        <cylinderGeometry args={[1.2, 1.2, 2.5, 16]} />
        <meshStandardMaterial color="#475569" roughness={0.4} metalness={0.7} />
      </mesh>

      {/* Üst kapak */}
      <mesh position={[0, 1.3, 0]} castShadow>
        <cylinderGeometry args={[1.3, 1.3, 0.2, 16]} />
        <meshStandardMaterial color="#1e293b" roughness={0.3} metalness={0.8} />
      </mesh>

      {/* Yağ radyatörleri */}
      {[-1, 1].map((x, i) => (
        <mesh key={i} position={[x, 0, 0]} castShadow>
          <boxGeometry args={[0.15, 2, 1.5]} />
          <meshStandardMaterial color="#64748b" roughness={0.5} metalness={0.6} />
        </mesh>
      ))}

      {/* HV Bushing (yüksek gerilim) */}
      <mesh position={[0, 1.7, 0]} castShadow>
        <cylinderGeometry args={[0.2, 0.15, 0.8, 12]} />
        <meshStandardMaterial color="#0ea5e9" roughness={0.2} metalness={0.3} />
      </mesh>

      {/* Elektrik kıvılcımı */}
      <Sparkles position={[0, 2.3, 0]} count={15} scale={2} size={2} speed={0.8} opacity={0.5} color="#60a5fa" />

      {/* Etiket */}
      <Html position={[0, 3, 0]} center distanceFactor={18}>
        <div className="pointer-events-none flex flex-col items-center">
          <div className="flex items-center gap-1.5 rounded-lg border border-blue-500/30 bg-slate-900/95 px-2.5 py-1 shadow-xl backdrop-blur-sm">
            <Zap className="h-3.5 w-3.5 text-blue-400" />
            <div className="flex flex-col">
              <span className="text-[9px] font-bold text-white">{name}</span>
              <span className="text-[7px] text-slate-400">{primaryVoltage} → {secondaryVoltage}</span>
              <span className="text-[7px] text-blue-400">{capacity}</span>
            </div>
          </div>
        </div>
      </Html>
    </group>
  )
}

// =============================================================================
// HAVA KALİTESİ SENSÖRÜ (Air Quality Sensor)
// =============================================================================
export function HavaKalitesiSensoru({ 
  position, 
  co2Level, 
  humidity 
}: { 
  position: [number, number, number]
  co2Level: string
  humidity: string
}) {
  return (
    <group position={position}>
      {/* Sensör kutusu */}
      <mesh castShadow>
        <boxGeometry args={[0.25, 0.25, 0.15]} />
        <meshStandardMaterial color="#f8fafc" roughness={0.2} metalness={0.8} />
      </mesh>

      {/* Havalandırma delikleri */}
      {[-0.08, 0, 0.08].map((y, i) => (
        <mesh key={i} position={[0, y, 0.076]} castShadow>
          <boxGeometry args={[0.2, 0.03, 0.01]} />
          <meshStandardMaterial color="#64748b" roughness={0.5} metalness={0.5} />
        </mesh>
      ))}

      {/* Etiket */}
      <Html position={[0, 0.3, 0]} center distanceFactor={28}>
        <div className="pointer-events-none">
          <div className="flex flex-col gap-0.5 rounded bg-black/80 px-1.5 py-1 backdrop-blur-sm border border-white/10">
            <div className="flex items-center gap-1">
              <Wind className="h-2 w-2 text-cyan-400" />
              <span className="text-[7px] text-white">CO₂: {co2Level}</span>
            </div>
            <div className="flex items-center gap-1">
              <Droplets className="h-2 w-2 text-blue-400" />
              <span className="text-[7px] text-white">Nem: {humidity}</span>
            </div>
          </div>
        </div>
      </Html>
    </group>
  )
}

// =============================================================================
// KABLO KANALI (Cable Tray)
// =============================================================================
export function KabloKanali({ 
  start, 
  end, 
  cableCount = 3 
}: { 
  start: [number, number, number]
  end: [number, number, number]
  cableCount?: number
}) {
  const direction = new THREE.Vector3(
    end[0] - start[0],
    end[1] - start[1],
    end[2] - start[2]
  )
  const length = direction.length()
  const midPoint: [number, number, number] = [
    (start[0] + end[0]) / 2,
    (start[1] + end[1]) / 2,
    (start[2] + end[2]) / 2,
  ]

  const axis = new THREE.Vector3(0, 1, 0)
  const quaternion = new THREE.Quaternion().setFromUnitVectors(
    axis,
    direction.normalize()
  )
  const euler = new THREE.Euler().setFromQuaternion(quaternion)

  return (
    <group>
      {/* Ana kanal */}
      <mesh position={midPoint} rotation={[euler.x, euler.y, euler.z]} castShadow>
        <boxGeometry args={[0.3, length, 0.15]} />
        <meshStandardMaterial color="#94a3b8" roughness={0.6} metalness={0.4} wireframe={false} />
      </mesh>

      {/* Kablolar */}
      {Array.from({ length: cableCount }).map((_, i) => {
        return (
          <mesh key={i} position={midPoint} rotation={[euler.x, euler.y, euler.z]}>
            <cylinderGeometry args={[0.03, 0.03, length * 0.98, 8]} />
            <meshStandardMaterial 
              color={i === 0 ? '#dc2626' : i === 1 ? '#3b82f6' : '#22c55e'} 
              roughness={0.7} 
              metalness={0.3} 
            />
          </mesh>
        )
      })}
    </group>
  )
}

// =============================================================================
// ANİMASYONLU VERİ AKIŞI (Data Flow with Particles)
// =============================================================================
export function AnimatedDataFlow({ 
  points, 
  color = '#22c55e',
  speed = 1,
  particleCount = 20,
  label
}: { 
  points: [number, number, number][]
  color?: string
  speed?: number
  particleCount?: number
  label?: string
}) {
  const particlesRef = useRef<THREE.Points>(null)
  const timeRef = useRef(0)

  // Eğri oluştur
  const curve = useMemo(() => {
    if (points.length < 2) return null
    const vectors = points.map(p => new THREE.Vector3(...p))
    return new THREE.CatmullRomCurve3(vectors)
  }, [points])

  // Parçacık pozisyonları
  const particlePositions = useMemo(() => {
    const positions = new Float32Array(particleCount * 3)
    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = 0
      positions[i * 3 + 1] = 0
      positions[i * 3 + 2] = 0
    }
    return positions
  }, [particleCount])

  useFrame((_, delta) => {
    if (!particlesRef.current || !curve) return
    timeRef.current += delta * speed * 0.5
    
    const positions = particlesRef.current.geometry.attributes.position.array as Float32Array
    for (let i = 0; i < particleCount; i++) {
      const t = ((i / particleCount) + timeRef.current) % 1
      const point = curve.getPoint(t)
      positions[i * 3] = point.x
      positions[i * 3 + 1] = point.y
      positions[i * 3 + 2] = point.z
    }
    particlesRef.current.geometry.attributes.position.needsUpdate = true
  })

  if (!curve) return null

  return (
    <group>
      {/* Ana çizgi */}
      <Line 
        points={points} 
        color={color} 
        lineWidth={2} 
        transparent 
        opacity={0.4} 
      />
      
      {/* Animasyonlu parçacıklar */}
      <points ref={particlesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[particlePositions, 3]}
            count={particleCount}
          />
        </bufferGeometry>
        <pointsMaterial 
          size={0.25} 
          color={color} 
          transparent 
          opacity={0.9} 
          sizeAttenuation 
        />
      </points>

      {/* Etiket */}
      {label && (
        <Html position={points[Math.floor(points.length / 2)]} center distanceFactor={30}>
          <div className="pointer-events-none">
            <div className="rounded bg-black/70 px-1.5 py-0.5 backdrop-blur-sm border border-white/10">
              <span className="text-[7px] font-medium" style={{ color }}>{label}</span>
            </div>
          </div>
        </Html>
      )}
    </group>
  )
}

// =============================================================================
// ENERJİ MONİTÖRÜ (Real-time Energy Monitor)
// =============================================================================
export function EnergyMonitor({ 
  position, 
  name, 
  power, 
  voltage, 
  current,
  frequency,
  powerFactor,
  type = 'consumption'
}: { 
  position: [number, number, number]
  name: string
  power: string
  voltage: string
  current: string
  frequency?: string
  powerFactor?: string
  type?: 'consumption' | 'production' | 'grid'
}) {
  const colorMap = {
    consumption: { main: '#a855f7', bg: 'purple' },
    production: { main: '#22c55e', bg: 'green' },
    grid: { main: '#3b82f6', bg: 'blue' }
  }
  const colors = colorMap[type]

  return (
    <group position={position}>
      {/* Ana monitör kutusu */}
      <mesh castShadow receiveShadow>
        <boxGeometry args={[0.8, 1.2, 0.15]} />
        <meshStandardMaterial color="#1e293b" roughness={0.3} metalness={0.7} />
      </mesh>

      {/* Ekran */}
      <mesh position={[0, 0.1, 0.08]}>
        <boxGeometry args={[0.7, 0.8, 0.02]} />
        <meshStandardMaterial 
          color="#0f172a" 
          emissive={colors.main} 
          emissiveIntensity={0.2} 
        />
      </mesh>

      {/* LED gösterge */}
      <mesh position={[0.3, 0.5, 0.08]}>
        <sphereGeometry args={[0.03, 8, 8]} />
        <meshStandardMaterial 
          color={colors.main} 
          emissive={colors.main} 
          emissiveIntensity={1.5} 
        />
      </mesh>

      {/* Detaylı etiket */}
      <Html position={[0, 1.5, 0]} center distanceFactor={18}>
        <div className="pointer-events-none">
          <div className={`rounded-lg border bg-slate-900/95 px-3 py-2 shadow-xl backdrop-blur-sm`} style={{ borderColor: `${colors.main}40` }}>
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-1.5">
                <Gauge className="h-3 w-3" style={{ color: colors.main }} />
                <span className="text-[9px] font-bold text-white">{name}</span>
              </div>
              <div className="grid grid-cols-2 gap-x-3 gap-y-0.5 text-[7px]">
                <span className="text-slate-400">Güç:</span>
                <span className="font-mono font-bold" style={{ color: colors.main }}>{power}</span>
                <span className="text-slate-400">Gerilim:</span>
                <span className="font-mono text-white">{voltage}</span>
                <span className="text-slate-400">Akım:</span>
                <span className="font-mono text-white">{current}</span>
                {frequency && (
                  <>
                    <span className="text-slate-400">Frekans:</span>
                    <span className="font-mono text-white">{frequency}</span>
                  </>
                )}
                {powerFactor && (
                  <>
                    <span className="text-slate-400">Güç Faktörü:</span>
                    <span className="font-mono text-white">{powerFactor}</span>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </Html>
    </group>
  )
}

// =============================================================================
// SCADA KONTROL PANELİ
// =============================================================================
export function ScadaPanel({ 
  position, 
  name,
  status = 'online'
}: { 
  position: [number, number, number]
  name: string
  status?: 'online' | 'warning' | 'offline'
}) {
  const statusColors = {
    online: '#22c55e',
    warning: '#f59e0b',
    offline: '#ef4444'
  }

  return (
    <group position={position}>
      {/* Ana panel */}
      <mesh castShadow receiveShadow>
        <boxGeometry args={[1.5, 1, 0.2]} />
        <meshStandardMaterial color="#0f172a" roughness={0.2} metalness={0.8} />
      </mesh>

      {/* Çoklu ekranlar */}
      {[-0.4, 0.4].map((x, i) => (
        <mesh key={i} position={[x, 0.1, 0.11]} castShadow>
          <boxGeometry args={[0.5, 0.6, 0.02]} />
          <meshStandardMaterial 
            color="#020617" 
            emissive="#3b82f6" 
            emissiveIntensity={0.3} 
          />
        </mesh>
      ))}

      {/* Durum LED'leri */}
      {[-0.5, -0.2, 0.1, 0.4].map((x, i) => (
        <mesh key={i} position={[x, -0.35, 0.11]}>
          <sphereGeometry args={[0.03, 8, 8]} />
          <meshStandardMaterial 
            color={i < 3 ? '#22c55e' : statusColors[status]} 
            emissive={i < 3 ? '#22c55e' : statusColors[status]} 
            emissiveIntensity={1.5} 
          />
        </mesh>
      ))}

      {/* Etiket */}
      <Html position={[0, 1, 0]} center distanceFactor={20}>
        <div className="pointer-events-none">
          <div className="flex items-center gap-1.5 rounded border border-blue-500/30 bg-slate-900/95 px-2 py-1 shadow-xl backdrop-blur-sm">
            <Server className="h-3 w-3 text-blue-400" />
            <span className="text-[8px] font-bold text-white">{name}</span>
            <div className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: statusColors[status] }} />
          </div>
        </div>
      </Html>
    </group>
  )
}

// =============================================================================
// AKILLI SAYAÇ (Smart Meter with Communication)
// =============================================================================
export function SmartMeter({ 
  position, 
  id,
  energy,
  power,
  communicationType = 'wifi'
}: { 
  position: [number, number, number]
  id: string
  energy: string
  power: string
  communicationType?: 'wifi' | 'lora' | 'modbus'
}) {
  const CommIcon = communicationType === 'wifi' ? Wifi : communicationType === 'lora' ? Radio : Cpu

  return (
    <group position={position}>
      {/* Sayaç kutusu */}
      <mesh castShadow receiveShadow>
        <boxGeometry args={[0.35, 0.45, 0.12]} />
        <meshStandardMaterial color="#f8fafc" roughness={0.2} metalness={0.3} />
      </mesh>

      {/* LCD ekran */}
      <mesh position={[0, 0.05, 0.061]}>
        <boxGeometry args={[0.28, 0.2, 0.01]} />
        <meshStandardMaterial 
          color="#064e3b" 
          emissive="#10b981" 
          emissiveIntensity={0.3} 
        />
      </mesh>

      {/* İletişim LED */}
      <mesh position={[0.12, 0.18, 0.061]}>
        <sphereGeometry args={[0.02, 8, 8]} />
        <meshStandardMaterial 
          color="#3b82f6" 
          emissive="#3b82f6" 
          emissiveIntensity={2} 
        />
      </mesh>

      {/* Etiket */}
      <Html position={[0, 0.5, 0]} center distanceFactor={25}>
        <div className="pointer-events-none">
          <div className="rounded border border-emerald-500/30 bg-black/80 px-1.5 py-1 backdrop-blur-sm">
            <div className="flex flex-col items-center gap-0.5">
              <div className="flex items-center gap-1">
                <CommIcon className="h-2 w-2 text-blue-400" />
                <span className="text-[6px] font-mono text-slate-400">{id}</span>
              </div>
              <span className="text-[8px] font-mono font-bold text-emerald-400">{energy}</span>
              <span className="text-[6px] text-slate-400">{power}</span>
            </div>
          </div>
        </div>
      </Html>
    </group>
  )
}

// =============================================================================
// POMPA İSTASYONU
// =============================================================================
export function PumpStation({ 
  position, 
  name,
  flowRate,
  pressure,
  status = 'running'
}: { 
  position: [number, number, number]
  name: string
  flowRate: string
  pressure: string
  status?: 'running' | 'idle' | 'fault'
}) {
  const pumpRef = useRef<THREE.Mesh>(null)
  
  useFrame((_, delta) => {
    if (pumpRef.current && status === 'running') {
      pumpRef.current.rotation.z += delta * 3
    }
  })

  const statusColor = status === 'running' ? '#22c55e' : status === 'idle' ? '#f59e0b' : '#ef4444'

  return (
    <group position={position}>
      {/* Pompa gövdesi */}
      <mesh castShadow receiveShadow rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.4, 0.4, 0.6, 16]} />
        <meshStandardMaterial color="#3b82f6" roughness={0.3} metalness={0.7} />
      </mesh>

      {/* Motor */}
      <mesh position={[0.5, 0, 0]} castShadow rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.25, 0.25, 0.5, 16]} />
        <meshStandardMaterial color="#1e293b" roughness={0.4} metalness={0.6} />
      </mesh>

      {/* Dönen fan (görsel) */}
      <mesh ref={pumpRef} position={[0.8, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.2, 0.2, 0.05, 6]} />
        <meshStandardMaterial color="#64748b" roughness={0.5} metalness={0.5} />
      </mesh>

      {/* Giriş/Çıkış boruları */}
      <mesh position={[0, 0, 0.5]} castShadow>
        <cylinderGeometry args={[0.15, 0.15, 0.4, 12]} />
        <meshStandardMaterial color="#0ea5e9" roughness={0.4} metalness={0.6} />
      </mesh>
      <mesh position={[0, 0, -0.5]} castShadow>
        <cylinderGeometry args={[0.15, 0.15, 0.4, 12]} />
        <meshStandardMaterial color="#0ea5e9" roughness={0.4} metalness={0.6} />
      </mesh>

      {/* Etiket */}
      <Html position={[0, 1, 0]} center distanceFactor={20}>
        <div className="pointer-events-none">
          <div className="rounded-lg border bg-slate-900/95 px-2 py-1.5 shadow-xl backdrop-blur-sm" style={{ borderColor: `${statusColor}40` }}>
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-1.5">
                <Activity className="h-3 w-3" style={{ color: statusColor }} />
                <span className="text-[8px] font-bold text-white">{name}</span>
              </div>
              <div className="flex gap-2 text-[7px]">
                <span className="text-slate-400">Debi: <span className="text-cyan-400">{flowRate}</span></span>
                <span className="text-slate-400">Basınç: <span className="text-cyan-400">{pressure}</span></span>
              </div>
            </div>
          </div>
        </div>
      </Html>
    </group>
  )
}

// =============================================================================
// VANA (Valve)
// =============================================================================
export function Valve({ 
  position, 
  rotation = [0, 0, 0],
  isOpen = true,
  size = 0.2
}: { 
  position: [number, number, number]
  rotation?: [number, number, number]
  isOpen?: boolean
  size?: number
}) {
  return (
    <group position={position} rotation={rotation}>
      {/* Vana gövdesi */}
      <mesh castShadow>
        <sphereGeometry args={[size, 16, 16]} />
        <meshStandardMaterial color={isOpen ? '#22c55e' : '#ef4444'} roughness={0.4} metalness={0.6} />
      </mesh>

      {/* Vana kolu */}
      <mesh position={[0, size * 1.2, 0]} castShadow>
        <cylinderGeometry args={[size * 0.15, size * 0.15, size * 0.8, 8]} />
        <meshStandardMaterial color="#1e293b" roughness={0.5} metalness={0.5} />
      </mesh>

      {/* El çarkı */}
      <mesh position={[0, size * 1.8, 0]} rotation={[Math.PI / 2, 0, 0]} castShadow>
        <torusGeometry args={[size * 0.4, size * 0.08, 8, 16]} />
        <meshStandardMaterial color="#dc2626" roughness={0.4} metalness={0.6} />
      </mesh>
    </group>
  )
}
