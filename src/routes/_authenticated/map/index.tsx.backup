import { createFileRoute } from '@tanstack/react-router'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, PerspectiveCamera, Environment, Html, Sky, Sparkles, ContactShadows } from '@react-three/drei'
import { useRef, useState, useMemo } from 'react'
import * as THREE from 'three'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Sun, Battery, Zap, Maximize2, RotateCcw, Eye, Activity, Gauge, Settings2, Info, Power, Factory, Droplets, TrendingUp, AlertTriangle, CheckCircle2, Clock, Cable, ArrowRight, Minimize2, ZoomIn, ZoomOut, Move3D } from 'lucide-react'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { Progress } from '@/components/ui/progress'
import { ScrollArea } from '@/components/ui/scroll-area'

export const Route = createFileRoute('/_authenticated/map/')({
  component: MapPage,
})

// Gerçekçi Ana Fabrika Binası
function MainFactory({ position }: { position: [number, number, number] }) {
  const meshRef = useRef<THREE.Group>(null)

  return (
    <group position={position} ref={meshRef}>
      {/* Ana Bina Gövdesi */}
      <mesh position={[0, 3, 0]} castShadow receiveShadow>
        <boxGeometry args={[12, 6, 8]} />
        <meshStandardMaterial color="#374151" roughness={0.3} metalness={0.7} />
      </mesh>
      
      {/* Çatı */}
      <mesh position={[0, 6.5, 0]} castShadow>
        <boxGeometry args={[13, 1, 9]} />
        <meshStandardMaterial color="#1f2937" roughness={0.2} metalness={0.8} />
      </mesh>

      {/* Pencereler - Ön */}
      {[-4, -1.5, 1, 3.5].map((x, i) => (
        <mesh key={`window-front-${i}`} position={[x, 3, 4.01]} castShadow>
          <boxGeometry args={[2, 3, 0.1]} />
          <meshStandardMaterial color="#60a5fa" emissive="#3b82f6" emissiveIntensity={0.3} transparent opacity={0.8} />
        </mesh>
      ))}

      {/* Fabrika Bacası */}
      <mesh position={[4, 8, -2]} castShadow>
        <cylinderGeometry args={[0.8, 1, 4, 16]} />
        <meshStandardMaterial color="#4b5563" roughness={0.4} metalness={0.6} />
      </mesh>

      {/* Duman Efekti */}
      <Sparkles position={[4, 11, -2]} count={30} scale={3} size={4} speed={0.3} opacity={0.2} color="#94a3b8" />

      {/* Yükleme Rampası */}
      <mesh position={[-7, 1, 0]} castShadow receiveShadow>
        <boxGeometry args={[2, 2, 6]} />
        <meshStandardMaterial color="#6b7280" roughness={0.5} metalness={0.5} />
      </mesh>

      {/* Etiket */}
      <Html position={[0, 9, 0]} center distanceFactor={20}>
        <div className="pointer-events-none flex flex-col items-center animate-in fade-in duration-500">
          <div className="flex items-center gap-2 rounded-xl border border-slate-500/30 bg-slate-900/90 px-4 py-2 text-white shadow-2xl backdrop-blur-xl">
            <Factory className="h-5 w-5 text-slate-400" />
            <div className="flex flex-col">
              <span className="text-sm font-bold">ANA ÜRETİM TESİSİ</span>
              <span className="text-[10px] text-slate-400">Kapasite: 5.2 MW</span>
            </div>
          </div>
          <div className="mt-2 flex items-center gap-1.5 rounded-full bg-green-500/20 px-3 py-1 border border-green-500/30">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            <span className="text-[10px] font-semibold text-green-400">ÇALIŞIYOR</span>
          </div>
        </div>
      </Html>
    </group>
  )
}

// Gerçekçi Güneş Paneli Çiftliği
function SolarFarm({ position }: { position: [number, number, number] }) {
  const groupRef = useRef<THREE.Group>(null)
  
  useFrame(({ clock }) => {
    if (groupRef.current) {
      // Güneş takip sistemi simülasyonu
      groupRef.current.rotation.x = Math.sin(clock.elapsedTime * 0.1) * 0.05 - 0.3
    }
  })

  const panelRows = 4
  const panelCols = 6

  return (
    <group position={position}>
      {/* Panel Dizisi */}
      <group ref={groupRef}>
        {Array.from({ length: panelRows }).map((_, row) =>
          Array.from({ length: panelCols }).map((_, col) => (
            <group key={`panel-${row}-${col}`} position={[col * 3.5 - 8, 0, row * 2.5]}>
              {/* Panel Çerçevesi */}
              <mesh position={[0, 1.5, 0]} rotation={[-0.3, 0, 0]} castShadow receiveShadow>
                <boxGeometry args={[3, 0.15, 2]} />
                <meshStandardMaterial color="#1e3a5f" roughness={0.1} metalness={0.95} />
              </mesh>
              {/* Panel Yüzeyi - Cam Efekti */}
              <mesh position={[0, 1.58, 0.05]} rotation={[-0.3, 0, 0]}>
                <planeGeometry args={[2.8, 1.8]} />
                <meshStandardMaterial 
                  color="#1e40af" 
                  emissive="#2563eb" 
                  emissiveIntensity={0.15}
                  roughness={0.05}
                  metalness={0.9}
                />
              </mesh>
              {/* Panel Grid Çizgileri */}
              <mesh position={[0, 1.59, 0.05]} rotation={[-0.3, 0, 0]}>
                <planeGeometry args={[2.8, 1.8]} />
                <meshBasicMaterial color="#0f172a" wireframe transparent opacity={0.3} />
              </mesh>
              {/* Destek Direği */}
              <mesh position={[0, 0.7, 0.3]} castShadow>
                <cylinderGeometry args={[0.08, 0.1, 1.4, 8]} />
                <meshStandardMaterial color="#64748b" roughness={0.3} metalness={0.8} />
              </mesh>
            </group>
          ))
        )}
      </group>

      {/* İnverter Kutusu */}
      <mesh position={[-10, 0.75, 2]} castShadow receiveShadow>
        <boxGeometry args={[1.5, 1.5, 1]} />
        <meshStandardMaterial color="#374151" roughness={0.4} metalness={0.6} />
      </mesh>

      {/* Güneş Işın Efekti */}
      <Sparkles position={[0, 4, 2]} count={50} scale={15} size={3} speed={0.2} opacity={0.4} color="#fbbf24" />

      {/* Etiket */}
      <Html position={[0, 5, 2]} center distanceFactor={20}>
        <div className="pointer-events-none flex flex-col items-center">
          <div className="flex items-center gap-2 rounded-xl border border-yellow-500/30 bg-slate-900/90 px-4 py-2 text-yellow-500 shadow-2xl backdrop-blur-xl">
            <Sun className="h-5 w-5 animate-pulse" />
            <div className="flex flex-col">
              <span className="text-sm font-bold text-white">GÜNEŞ ENERJİSİ SANTRALİ</span>
              <span className="text-[10px] text-yellow-400/80">24 Panel • 2.4 MW Üretim</span>
            </div>
          </div>
          <div className="mt-2 rounded-full bg-yellow-500/20 px-3 py-1 border border-yellow-500/30">
            <span className="text-[11px] font-mono font-bold text-yellow-400">⚡ 2,847 kWh/saat</span>
          </div>
        </div>
      </Html>
    </group>
  )
}

// Batarya Depolama Sistemi
function BatteryStorage({ position }: { position: [number, number, number] }) {
  const [chargeLevel] = useState(85)
  
  return (
    <group position={position}>
      {/* Ana Konteyner */}
      <mesh position={[0, 2, 0]} castShadow receiveShadow>
        <boxGeometry args={[8, 4, 4]} />
        <meshStandardMaterial color="#064e3b" roughness={0.3} metalness={0.7} />
      </mesh>

      {/* Batarya Hücreleri */}
      {[-2.5, 0, 2.5].map((x, i) => (
        <group key={`battery-${i}`} position={[x, 2, 2.01]}>
          <mesh castShadow>
            <boxGeometry args={[2, 3, 0.1]} />
            <meshStandardMaterial color="#0d9488" roughness={0.2} metalness={0.8} />
          </mesh>
          {/* Şarj Göstergesi */}
          <mesh position={[0, -0.5, 0.06]}>
            <boxGeometry args={[1.6, 0.3, 0.05]} />
            <meshStandardMaterial color="#022c22" />
          </mesh>
          <mesh position={[-0.8 + (chargeLevel / 100) * 0.8, -0.5, 0.08]}>
            <boxGeometry args={[(chargeLevel / 100) * 1.5, 0.2, 0.05]} />
            <meshStandardMaterial color="#22c55e" emissive="#22c55e" emissiveIntensity={0.5} />
          </mesh>
        </group>
      ))}

      {/* Soğutma Fanları */}
      {[-3, 3].map((x, i) => (
        <mesh key={`fan-${i}`} position={[x, 3.5, 2.1]} castShadow>
          <cylinderGeometry args={[0.4, 0.4, 0.2, 16]} />
          <meshStandardMaterial color="#1f2937" roughness={0.3} metalness={0.7} />
        </mesh>
      ))}

      {/* Etiket */}
      <Html position={[0, 6, 0]} center distanceFactor={20}>
        <div className="pointer-events-none flex flex-col items-center">
          <div className="flex items-center gap-2 rounded-xl border border-green-500/30 bg-slate-900/90 px-4 py-2 text-green-500 shadow-2xl backdrop-blur-xl">
            <Battery className="h-5 w-5" />
            <div className="flex flex-col">
              <span className="text-sm font-bold text-white">ENERJİ DEPOLAMA</span>
              <span className="text-[10px] text-green-400/80">Li-ion • 5 MWh Kapasite</span>
            </div>
          </div>
          <div className="mt-2 flex items-center gap-2">
            <div className="flex items-center gap-1 rounded-full bg-green-500/20 px-3 py-1 border border-green-500/30">
              <span className="text-[11px] font-bold text-green-400">%{chargeLevel}</span>
            </div>
            <div className="rounded-full bg-blue-500/20 px-2 py-1 border border-blue-500/30">
              <span className="text-[10px] text-blue-400">ŞARJ OLUYOR</span>
            </div>
          </div>
        </div>
      </Html>
    </group>
  )
}

// Elektrik Trafosu ve Şebeke Bağlantısı
function GridConnection({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      {/* Trafo Binası */}
      <mesh position={[0, 1.5, 0]} castShadow receiveShadow>
        <boxGeometry args={[4, 3, 3]} />
        <meshStandardMaterial color="#374151" roughness={0.4} metalness={0.6} />
      </mesh>

      {/* Yüksek Gerilim Direkleri */}
      {[-3, 3].map((x, i) => (
        <group key={`pole-${i}`} position={[x, 0, -4]}>
          <mesh position={[0, 6, 0]} castShadow>
            <cylinderGeometry args={[0.15, 0.25, 12, 8]} />
            <meshStandardMaterial color="#6b7280" roughness={0.5} metalness={0.5} />
          </mesh>
          {/* Çapraz Kol */}
          <mesh position={[0, 10, 0]} castShadow>
            <boxGeometry args={[3, 0.2, 0.2]} />
            <meshStandardMaterial color="#6b7280" roughness={0.5} metalness={0.5} />
          </mesh>
          {/* İzolatörler */}
          {[-1, 0, 1].map((ix, j) => (
            <mesh key={`insulator-${i}-${j}`} position={[ix, 10.3, 0]} castShadow>
              <cylinderGeometry args={[0.1, 0.15, 0.5, 8]} />
              <meshStandardMaterial color="#0ea5e9" roughness={0.2} metalness={0.3} />
            </mesh>
          ))}
        </group>
      ))}

      {/* Elektrik Kıvılcım Efekti */}
      <Sparkles position={[0, 10, -4]} count={20} scale={4} size={2} speed={1} opacity={0.6} color="#60a5fa" />

      {/* Etiket */}
      <Html position={[0, 14, -4]} center distanceFactor={20}>
        <div className="pointer-events-none flex flex-col items-center">
          <div className="flex items-center gap-2 rounded-xl border border-blue-500/30 bg-slate-900/90 px-4 py-2 text-blue-500 shadow-2xl backdrop-blur-xl">
            <Zap className="h-5 w-5" />
            <div className="flex flex-col">
              <span className="text-sm font-bold text-white">ŞEBEKE BAĞLANTISI</span>
              <span className="text-[10px] text-blue-400/80">34.5 kV • Çift Devre</span>
            </div>
          </div>
          <div className="mt-2 flex items-center gap-1 rounded-full bg-blue-500/20 px-3 py-1 border border-blue-500/30">
            <Cable className="h-3 w-3 text-blue-400" />
            <span className="text-[10px] font-semibold text-blue-400">BAĞLI</span>
          </div>
        </div>
      </Html>
    </group>
  )
}

// Su Arıtma / Soğutma Sistemi
function WaterSystem({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      {/* Su Tankı */}
      <mesh position={[0, 2, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[2, 2, 4, 32]} />
        <meshStandardMaterial color="#0369a1" roughness={0.2} metalness={0.7} />
      </mesh>

      {/* Tank Üst Kapak */}
      <mesh position={[0, 4.1, 0]} castShadow>
        <cylinderGeometry args={[2.1, 2.1, 0.2, 32]} />
        <meshStandardMaterial color="#0c4a6e" roughness={0.3} metalness={0.8} />
      </mesh>

      {/* Borular */}
      <mesh position={[2.2, 1, 0]} rotation={[0, 0, Math.PI / 2]} castShadow>
        <cylinderGeometry args={[0.15, 0.15, 2, 16]} />
        <meshStandardMaterial color="#64748b" roughness={0.4} metalness={0.6} />
      </mesh>

      {/* Su Seviye Göstergesi */}
      <mesh position={[0, 2, 2.01]}>
        <boxGeometry args={[0.3, 3, 0.1]} />
        <meshStandardMaterial color="#0c4a6e" transparent opacity={0.5} />
      </mesh>
      <mesh position={[0, 1.5, 2.05]}>
        <boxGeometry args={[0.2, 2, 0.1]} />
        <meshStandardMaterial color="#0ea5e9" emissive="#0ea5e9" emissiveIntensity={0.3} />
      </mesh>

      {/* Etiket */}
      <Html position={[0, 6, 0]} center distanceFactor={20}>
        <div className="pointer-events-none flex flex-col items-center">
          <div className="flex items-center gap-2 rounded-xl border border-cyan-500/30 bg-slate-900/90 px-4 py-2 text-cyan-500 shadow-2xl backdrop-blur-xl">
            <Droplets className="h-5 w-5" />
            <div className="flex flex-col">
              <span className="text-sm font-bold text-white">SOĞUTMA SİSTEMİ</span>
              <span className="text-[10px] text-cyan-400/80">50,000 L Kapasite</span>
            </div>
          </div>
        </div>
      </Html>
    </group>
  )
}

// Animasyonlu Enerji Akış Çizgisi
function EnergyFlow({ start, end, color, power }: { start: [number, number, number], end: [number, number, number], color: string, power: string }) {
  const particlesRef = useRef<THREE.Points>(null)
  
  const curve = useMemo(() => {
    const startVec = new THREE.Vector3(...start)
    const endVec = new THREE.Vector3(...end)
    const midPoint = new THREE.Vector3().addVectors(startVec, endVec).multiplyScalar(0.5)
    midPoint.y += 2
    return new THREE.QuadraticBezierCurve3(startVec, midPoint, endVec)
  }, [start, end])

  const points = useMemo(() => curve.getPoints(50), [curve])
  const geometry = useMemo(() => new THREE.BufferGeometry().setFromPoints(points), [points])

  // Parçacık pozisyonları
  const particleCount = 10
  const particlePositions = useMemo(() => {
    const positions = new Float32Array(particleCount * 3)
    for (let i = 0; i < particleCount; i++) {
      const point = curve.getPoint(i / particleCount)
      positions[i * 3] = point.x
      positions[i * 3 + 1] = point.y
      positions[i * 3 + 2] = point.z
    }
    return positions
  }, [curve])

  useFrame(({ clock }) => {
    if (particlesRef.current) {
      const positions = particlesRef.current.geometry.attributes.position.array as Float32Array
      for (let i = 0; i < particleCount; i++) {
        const t = ((clock.elapsedTime * 0.3 + i / particleCount) % 1)
        const point = curve.getPoint(t)
        positions[i * 3] = point.x
        positions[i * 3 + 1] = point.y
        positions[i * 3 + 2] = point.z
      }
      particlesRef.current.geometry.attributes.position.needsUpdate = true
    }
  })

  return (
    <group>
      {/* Ana Çizgi */}
      <line>
        <bufferGeometry attach="geometry" {...geometry} />
        <lineBasicMaterial color={color} transparent opacity={0.4} linewidth={2} />
      </line>

      {/* Akan Parçacıklar */}
      <points ref={particlesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[particlePositions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial color={color} size={0.3} transparent opacity={0.9} />
      </points>

      {/* Güç Etiketi */}
      <Html position={[...curve.getPoint(0.5).toArray()] as [number, number, number]} center>
        <div className="pointer-events-none">
          <div className="flex items-center gap-1 rounded-full bg-black/70 px-2 py-0.5 backdrop-blur-sm border border-white/10">
            <ArrowRight className="h-2.5 w-2.5" style={{ color }} />
            <span className="text-[9px] font-mono font-bold" style={{ color }}>{power}</span>
          </div>
        </div>
      </Html>
    </group>
  )
}

// Ana Zemin
function Ground() {
  return (
    <group>
      {/* Ana Zemin */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]} receiveShadow>
        <planeGeometry args={[200, 200]} />
        <meshStandardMaterial color="#1a1a2e" roughness={0.9} metalness={0.1} />
      </mesh>

      {/* Beton Yollar */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
        <planeGeometry args={[6, 80]} />
        <meshStandardMaterial color="#374151" roughness={0.8} metalness={0.2} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 15]} receiveShadow>
        <planeGeometry args={[60, 4]} />
        <meshStandardMaterial color="#374151" roughness={0.8} metalness={0.2} />
      </mesh>

      {/* Grid Çizgileri */}
      <gridHelper args={[200, 40, '#334155', '#1e293b']} position={[0, 0.02, 0]} />

      {/* Çevre Duvarı */}
      <mesh position={[0, 1, -50]} castShadow>
        <boxGeometry args={[100, 2, 0.5]} />
        <meshStandardMaterial color="#4b5563" roughness={0.6} metalness={0.4} />
      </mesh>
    </group>
  )
}

// Ana 3D Sahne
function Scene() {
  return (
    <>
      {/* Işıklandırma */}
      <ambientLight intensity={0.3} />
      <directionalLight
        position={[50, 50, 25]}
        intensity={1.5}
        castShadow
        shadow-mapSize={[2048, 2048]}
        shadow-camera-far={100}
        shadow-camera-left={-50}
        shadow-camera-right={50}
        shadow-camera-top={50}
        shadow-camera-bottom={-50}
      />
      <pointLight position={[-20, 20, 20]} intensity={0.5} color="#fbbf24" />
      <hemisphereLight intensity={0.4} groundColor="#1e293b" />

      {/* Gökyüzü */}
      <Sky sunPosition={[100, 20, 100]} turbidity={0.1} rayleigh={0.5} />

      {/* Zemin */}
      <Ground />

      {/* Tesis Bileşenleri */}
      <MainFactory position={[0, 0, 0]} />
      <SolarFarm position={[-25, 0, 20]} />
      <BatteryStorage position={[20, 0, 10]} />
      <GridConnection position={[0, 0, -25]} />
      <WaterSystem position={[25, 0, -10]} />

      {/* Enerji Akış Çizgileri */}
      <EnergyFlow 
        start={[-15, 2, 20]} 
        end={[-6, 3, 0]} 
        color="#fbbf24" 
        power="2.4 MW" 
      />
      <EnergyFlow 
        start={[16, 2, 10]} 
        end={[6, 3, 0]} 
        color="#22c55e" 
        power="1.2 MW" 
      />
      <EnergyFlow 
        start={[0, 3, -6]} 
        end={[0, 3, -20]} 
        color="#3b82f6" 
        power="450 kW" 
      />
      <EnergyFlow 
        start={[6, 3, 0]} 
        end={[20, 2, -10]} 
        color="#06b6d4" 
        power="150 kW" 
      />

      {/* Gölgeler */}
      <ContactShadows position={[0, 0, 0]} opacity={0.4} scale={100} blur={2} far={50} />

      {/* Ortam */}
      <Environment preset="sunset" />
      <fog attach="fog" args={['#0f172a', 50, 150]} />
    </>
  )
}

function MapPage() {
  const [showLabels, setShowLabels] = useState(true)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [selectedAsset, setSelectedAsset] = useState<string | null>(null)

  const systemStats = [
    { label: 'Güneş Üretimi', value: '2.4 MW', change: '+12%', trend: 'up', color: 'text-yellow-500', bgColor: 'bg-yellow-500/10', borderColor: 'border-yellow-500/20', icon: Sun },
    { label: 'Batarya Durumu', value: '%85', change: '+5%', trend: 'up', color: 'text-green-500', bgColor: 'bg-green-500/10', borderColor: 'border-green-500/20', icon: Battery },
    { label: 'Şebeke Akışı', value: '450 kW', change: '-8%', trend: 'down', color: 'text-blue-500', bgColor: 'bg-blue-500/10', borderColor: 'border-blue-500/20', icon: Zap },
    { label: 'Tüketim', value: '3.2 MW', change: '+2%', trend: 'up', color: 'text-purple-500', bgColor: 'bg-purple-500/10', borderColor: 'border-purple-500/20', icon: Factory },
  ]

  const assets = [
    { id: 'factory', name: 'Ana Üretim Tesisi', type: 'Üretim', status: 'active', power: '5.2 MW', efficiency: 94, icon: Factory, color: 'slate' },
    { id: 'solar', name: 'Güneş Enerji Santrali', type: 'Yenilenebilir', status: 'active', power: '2.4 MW', efficiency: 98, icon: Sun, color: 'yellow' },
    { id: 'battery', name: 'Enerji Depolama Sistemi', type: 'Depolama', status: 'charging', power: '5 MWh', efficiency: 85, icon: Battery, color: 'green' },
    { id: 'grid', name: 'Şebeke Bağlantısı', type: 'Dağıtım', status: 'active', power: '34.5 kV', efficiency: 99, icon: Zap, color: 'blue' },
    { id: 'water', name: 'Soğutma Sistemi', type: 'Destek', status: 'active', power: '150 kW', efficiency: 92, icon: Droplets, color: 'cyan' },
  ]

  const alerts = [
    { type: 'warning', message: 'Panel A3 bakım gerekiyor', time: '2 saat önce' },
    { type: 'info', message: 'Batarya şarjı %85\'e ulaştı', time: '15 dk önce' },
  ]

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge variant="outline" className="text-[10px] border-green-500/30 text-green-500 bg-green-500/10">Aktif</Badge>
      case 'charging':
        return <Badge variant="outline" className="text-[10px] border-blue-500/30 text-blue-500 bg-blue-500/10">Şarj</Badge>
      case 'warning':
        return <Badge variant="outline" className="text-[10px] border-yellow-500/30 text-yellow-500 bg-yellow-500/10">Uyarı</Badge>
      default:
        return <Badge variant="outline" className="text-[10px]">Bilinmiyor</Badge>
    }
  }

  const getColorClasses = (color: string) => {
    const colors: Record<string, { bg: string, text: string }> = {
      slate: { bg: 'bg-slate-500/10', text: 'text-slate-500' },
      yellow: { bg: 'bg-yellow-500/10', text: 'text-yellow-500' },
      green: { bg: 'bg-green-500/10', text: 'text-green-500' },
      blue: { bg: 'bg-blue-500/10', text: 'text-blue-500' },
      cyan: { bg: 'bg-cyan-500/10', text: 'text-cyan-500' },
    }
    return colors[color] || colors.slate
  }

  return (
    <>
      <Header />
      <Main>
        <div className="flex flex-col gap-4">
          {/* Header Section */}
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-2xl font-bold tracking-tight flex items-center gap-2">
                <Move3D className="h-6 w-6 text-primary" />
                3D Tesis Haritası
              </h1>
              <p className="text-muted-foreground">
                Tesis yerleşimi ve enerji akış diyagramı • Gerçek zamanlı izleme
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button 
                      variant={showLabels ? "default" : "outline"} 
                      size="sm"
                      onClick={() => setShowLabels(!showLabels)}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Etiketleri {showLabels ? 'Gizle' : 'Göster'}</TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <Button variant="outline" size="sm">
                <RotateCcw className="mr-2 h-4 w-4" />
                Sıfırla
              </Button>
              <Button 
                variant={isFullscreen ? "default" : "outline"}
                size="sm"
                onClick={() => setIsFullscreen(!isFullscreen)}
              >
                {isFullscreen ? <Minimize2 className="mr-2 h-4 w-4" /> : <Maximize2 className="mr-2 h-4 w-4" />}
                {isFullscreen ? 'Küçült' : 'Tam Ekran'}
              </Button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
            {systemStats.map((stat) => (
              <Card key={stat.label} className={`border ${stat.borderColor} shadow-sm hover:shadow-md transition-shadow`}>
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className={`rounded-xl p-3 ${stat.bgColor}`}>
                      <stat.icon className={`h-5 w-5 ${stat.color}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-muted-foreground truncate">{stat.label}</p>
                      <div className="flex items-baseline gap-2">
                        <span className="text-xl font-bold">{stat.value}</span>
                        <span className={`text-xs font-medium flex items-center gap-0.5 ${stat.trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>
                          <TrendingUp className={`h-3 w-3 ${stat.trend === 'down' ? 'rotate-180' : ''}`} />
                          {stat.change}
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Main Content */}
          <div className="grid gap-4 lg:grid-cols-4">
            {/* 3D Canvas */}
            <Card className={`overflow-hidden border-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 shadow-2xl ring-1 ring-white/10 ${isFullscreen ? 'fixed inset-4 z-50' : 'lg:col-span-3'}`}>
              <div className={`relative w-full ${isFullscreen ? 'h-full' : 'h-[550px] lg:h-[650px]'}`}>
                <Canvas shadows dpr={[1, 2]} gl={{ antialias: true }}>
                  <PerspectiveCamera makeDefault position={[40, 30, 40]} fov={45} />
                  <OrbitControls 
                    enablePan={true} 
                    enableZoom={true} 
                    enableRotate={true}
                    maxPolarAngle={Math.PI / 2.2}
                    minDistance={15}
                    maxDistance={100}
                    autoRotate
                    autoRotateSpeed={0.3}
                  />
                  <Scene />
                </Canvas>
                
                {/* Overlays */}
                <div className="absolute right-4 top-4 flex flex-col gap-2">
                  <Badge variant="outline" className="border-green-500/50 bg-black/70 text-green-500 backdrop-blur-xl shadow-lg">
                    <span className="mr-1.5 relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                    </span>
                    CANLI İZLEME
                  </Badge>
                  <Badge variant="outline" className="border-white/20 bg-black/70 text-white backdrop-blur-xl shadow-lg">
                    <Clock className="mr-1.5 h-3 w-3" />
                    {new Date().toLocaleTimeString('tr-TR')}
                  </Badge>
                </div>

                {/* Quick Stats Panel */}
                <div className="absolute bottom-4 left-4">
                  <Card className="w-72 border-white/10 bg-black/70 backdrop-blur-xl shadow-2xl">
                    <CardHeader className="pb-2 pt-3 px-4">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-sm font-medium text-white flex items-center gap-2">
                          <Activity className="h-4 w-4 text-green-400" />
                          Anlık Durum
                        </CardTitle>
                        <Badge variant="outline" className="text-[10px] border-green-500/30 text-green-400 bg-green-500/10">
                          <CheckCircle2 className="mr-1 h-3 w-3" />
                          Normal
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="px-4 pb-4">
                      <div className="grid gap-3">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-slate-400 flex items-center gap-2">
                            <Power className="h-3.5 w-3.5" />
                            Toplam Üretim
                          </span>
                          <span className="font-bold text-white">3.6 MW</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-slate-400 flex items-center gap-2">
                            <Gauge className="h-3.5 w-3.5" />
                            Tüketim
                          </span>
                          <span className="font-bold text-white">3.2 MW</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-slate-400 flex items-center gap-2">
                            <TrendingUp className="h-3.5 w-3.5" />
                            Net Fazla
                          </span>
                          <span className="font-bold text-green-400">+400 kW</span>
                        </div>
                        <div className="pt-2 border-t border-white/10">
                          <div className="flex items-center justify-between text-xs mb-1.5">
                            <span className="text-slate-500">Sistem Verimliliği</span>
                            <span className="text-green-400 font-semibold">94.2%</span>
                          </div>
                          <Progress value={94.2} className="h-2" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Zoom Controls */}
                <div className="absolute bottom-4 right-4 flex flex-col gap-1.5">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button size="icon" variant="outline" className="h-9 w-9 border-white/10 bg-black/70 text-white hover:bg-white/10 backdrop-blur-xl">
                          <ZoomIn className="h-4 w-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent side="left">Yakınlaştır</TooltipContent>
                    </Tooltip>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button size="icon" variant="outline" className="h-9 w-9 border-white/10 bg-black/70 text-white hover:bg-white/10 backdrop-blur-xl">
                          <ZoomOut className="h-4 w-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent side="left">Uzaklaştır</TooltipContent>
                    </Tooltip>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button size="icon" variant="outline" className="h-9 w-9 border-white/10 bg-black/70 text-white hover:bg-white/10 backdrop-blur-xl">
                          <Info className="h-4 w-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent side="left" className="max-w-xs">
                        <p className="text-xs">Sol tık + sürükle: Döndür</p>
                        <p className="text-xs">Sağ tık + sürükle: Kaydır</p>
                        <p className="text-xs">Scroll: Yakınlaştır/Uzaklaştır</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>

                {/* Fullscreen close */}
                {isFullscreen && (
                  <Button 
                    className="absolute top-4 left-4 z-10"
                    variant="outline"
                    size="sm"
                    onClick={() => setIsFullscreen(false)}
                  >
                    <Minimize2 className="mr-2 h-4 w-4" />
                    Kapat
                  </Button>
                )}
              </div>
            </Card>

            {/* Side Panel */}
            <div className={`space-y-4 ${isFullscreen ? 'hidden' : ''}`}>
              {/* Assets List */}
              <Card className="border-0 shadow-sm">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base flex items-center gap-2">
                    <Settings2 className="h-4 w-4" />
                    Tesis Varlıkları
                  </CardTitle>
                  <CardDescription>5 aktif bileşen</CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                  <ScrollArea className="h-[280px]">
                    <div className="grid gap-1 p-3 pt-0">
                      {assets.map((asset) => {
                        const colors = getColorClasses(asset.color)
                        return (
                          <div 
                            key={asset.id}
                            className={`flex items-center gap-3 rounded-lg border p-3 transition-all cursor-pointer hover:bg-muted/50 ${selectedAsset === asset.id ? 'bg-muted/50 ring-1 ring-primary' : ''}`}
                            onClick={() => setSelectedAsset(asset.id)}
                          >
                            <div className={`rounded-lg p-2 ${colors.bg}`}>
                              <asset.icon className={`h-4 w-4 ${colors.text}`} />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="font-medium text-sm truncate">{asset.name}</p>
                              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                <span>{asset.power}</span>
                                <span>•</span>
                                <span>%{asset.efficiency}</span>
                              </div>
                            </div>
                            {getStatusBadge(asset.status)}
                          </div>
                        )
                      })}
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>

              {/* Alerts */}
              <Card className="border-0 shadow-sm">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4 text-yellow-500" />
                    Bildirimler
                  </CardTitle>
                </CardHeader>
                <CardContent className="grid gap-2">
                  {alerts.map((alert, i) => (
                    <div key={i} className={`flex items-start gap-2 rounded-lg p-2.5 text-sm ${alert.type === 'warning' ? 'bg-yellow-500/10 border border-yellow-500/20' : 'bg-blue-500/10 border border-blue-500/20'}`}>
                      {alert.type === 'warning' ? (
                        <AlertTriangle className="h-4 w-4 text-yellow-500 mt-0.5 shrink-0" />
                      ) : (
                        <Info className="h-4 w-4 text-blue-500 mt-0.5 shrink-0" />
                      )}
                      <div className="flex-1 min-w-0">
                        <p className={`text-xs font-medium ${alert.type === 'warning' ? 'text-yellow-600 dark:text-yellow-400' : 'text-blue-600 dark:text-blue-400'}`}>
                          {alert.message}
                        </p>
                        <p className="text-[10px] text-muted-foreground mt-0.5">{alert.time}</p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Energy Flow Summary */}
              <Card className="border-0 shadow-sm">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base flex items-center gap-2">
                    <Cable className="h-4 w-4" />
                    Enerji Akışı
                  </CardTitle>
                </CardHeader>
                <CardContent className="grid gap-2">
                  <div className="flex items-center justify-between text-sm p-2 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
                    <span className="flex items-center gap-2 text-yellow-600 dark:text-yellow-400">
                      <Sun className="h-3.5 w-3.5" />
                      Güneş → Tesis
                    </span>
                    <span className="font-mono font-bold text-yellow-600 dark:text-yellow-400">2.4 MW</span>
                  </div>
                  <div className="flex items-center justify-between text-sm p-2 rounded-lg bg-green-500/10 border border-green-500/20">
                    <span className="flex items-center gap-2 text-green-600 dark:text-green-400">
                      <Battery className="h-3.5 w-3.5" />
                      Batarya → Tesis
                    </span>
                    <span className="font-mono font-bold text-green-600 dark:text-green-400">1.2 MW</span>
                  </div>
                  <div className="flex items-center justify-between text-sm p-2 rounded-lg bg-blue-500/10 border border-blue-500/20">
                    <span className="flex items-center gap-2 text-blue-600 dark:text-blue-400">
                      <Zap className="h-3.5 w-3.5" />
                      Şebeke ← Fazla
                    </span>
                    <span className="font-mono font-bold text-blue-600 dark:text-blue-400">450 kW</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </Main>
    </>
  )
}
