// =============================================================================
// 48 PANELLİ GÜNEŞ ENERJİ SANTRALİ
// 4 Inverter istasyonu, DC/AC kablo sistemleri, junction box'lar
// =============================================================================

import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Html, Sparkles } from '@react-three/drei'
import { Inverter } from './facility-components'
import * as THREE from 'three'
import { Sun } from 'lucide-react'

// =============================================================================
// GÜNEŞ PANELİ (Tek Panel)
// =============================================================================
function SolarPanel({ 
  position, 
  rotation, 
  panelNumber 
}: { 
  position: [number, number, number]
  rotation: number
  panelNumber: number
}) {
  return (
    <group position={position}>
      {/* Panel çerçevesi */}
      <mesh castShadow receiveShadow rotation={[-rotation, 0, 0]}>
        <boxGeometry args={[2, 0.05, 1.2]} />
        <meshStandardMaterial color="#1e293b" roughness={0.3} metalness={0.8} />
      </mesh>

      {/* Fotovoltaik hücreler (mavi yüzey) */}
      <mesh castShadow receiveShadow rotation={[-rotation, 0, 0]} position={[0, 0.03, 0]}>
        <boxGeometry args={[1.95, 0.02, 1.15]} />
        <meshStandardMaterial 
          color="#1e3a8a" 
          roughness={0.1} 
          metalness={0.9} 
          emissive="#1e40af" 
          emissiveIntensity={0.1} 
        />
      </mesh>

      {/* Hücre grid çizgileri */}
      <mesh rotation={[-rotation, 0, 0]} position={[0, 0.04, 0]}>
        <boxGeometry args={[0.02, 0.01, 1.16]} />
        <meshStandardMaterial color="#475569" roughness={0.4} metalness={0.7} />
      </mesh>

      {/* Destek ayakları */}
      <mesh position={[-0.8, -0.3, -0.4]} castShadow>
        <cylinderGeometry args={[0.05, 0.08, 0.8, 8]} />
        <meshStandardMaterial color="#64748b" roughness={0.5} metalness={0.6} />
      </mesh>
      <mesh position={[0.8, -0.3, -0.4]} castShadow>
        <cylinderGeometry args={[0.05, 0.08, 0.8, 8]} />
        <meshStandardMaterial color="#64748b" roughness={0.5} metalness={0.6} />
      </mesh>

      {/* Panel numarası etiketi */}
      <Html position={[0, 0.8, 0]} center distanceFactor={35}>
        <div className="pointer-events-none">
          <div className="rounded bg-blue-900/80 px-1 py-0.5 backdrop-blur-sm border border-blue-400/30">
            <span className="text-[6px] font-mono font-bold text-blue-200">P{panelNumber.toString().padStart(2, '0')}</span>
          </div>
        </div>
      </Html>
    </group>
  )
}

// =============================================================================
// JUNCTION BOX (String birleştirme kutusu)
// =============================================================================
function JunctionBox({ 
  position, 
  name, 
  strings 
}: { 
  position: [number, number, number]
  name: string
  strings: number
}) {
  return (
    <group position={position}>
      {/* Ana kutu */}
      <mesh castShadow receiveShadow>
        <boxGeometry args={[0.5, 0.6, 0.3]} />
        <meshStandardMaterial color="#f97316" roughness={0.3} metalness={0.7} />
      </mesh>

      {/* Kapak */}
      <mesh position={[0, 0, 0.16]} castShadow>
        <boxGeometry args={[0.48, 0.58, 0.03]} />
        <meshStandardMaterial color="#ea580c" roughness={0.2} metalness={0.8} />
      </mesh>

      {/* Kablo giriş noktaları */}
      {Array.from({ length: strings }).map((_, i) => (
        <mesh key={i} position={[0, 0.35, -0.05 - i * 0.1]} castShadow>
          <cylinderGeometry args={[0.03, 0.03, 0.15, 8]} />
          <meshStandardMaterial color="#dc2626" roughness={0.4} metalness={0.6} />
        </mesh>
      ))}

      {/* Etiket */}
      <Html position={[0, 0.8, 0]} center distanceFactor={25}>
        <div className="pointer-events-none">
          <div className="rounded border border-orange-500/40 bg-black/80 px-1.5 py-0.5 backdrop-blur-sm">
            <div className="flex flex-col items-center">
              <span className="text-[7px] font-bold text-orange-400">{name}</span>
              <span className="text-[6px] text-orange-300">{strings} String</span>
            </div>
          </div>
        </div>
      </Html>
    </group>
  )
}

// =============================================================================
// DC KABLO (Güneş panellerinden invertere)
// =============================================================================
function DCCable({ 
  start, 
  end, 
  animated = true 
}: { 
  start: [number, number, number]
  end: [number, number, number]
  animated?: boolean
}) {
  const particlesRef = useRef<THREE.Points>(null)

  useFrame(() => {
    if (particlesRef.current && animated) {
      const positions = particlesRef.current.geometry.attributes.position.array as Float32Array
      for (let i = 0; i < positions.length; i += 3) {
        positions[i + 1] += 0.02
        if (positions[i + 1] > 1) positions[i + 1] = 0
      }
      particlesRef.current.geometry.attributes.position.needsUpdate = true
    }
  })

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

  // Parçacıklar için pozisyonlar
  const particleCount = 20
  const particlePositions = new Float32Array(particleCount * 3)
  for (let i = 0; i < particleCount; i++) {
    particlePositions[i * 3] = 0
    particlePositions[i * 3 + 1] = (Math.random() - 0.5) * length
    particlePositions[i * 3 + 2] = 0
  }

  return (
    <group>
      {/* DC Kablo (turuncu) */}
      <mesh position={midPoint} rotation={[euler.x, euler.y, euler.z]}>
        <cylinderGeometry args={[0.04, 0.04, length, 8]} />
        <meshStandardMaterial color="#f97316" roughness={0.6} metalness={0.4} />
      </mesh>

      {/* Animasyonlu enerji akışı */}
      {animated && (
        <points ref={particlesRef} position={midPoint} rotation={[euler.x, euler.y, euler.z]}>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              args={[particlePositions, 3]}
              count={particleCount}
            />
          </bufferGeometry>
          <pointsMaterial size={0.08} color="#fbbf24" transparent opacity={0.8} sizeAttenuation />
        </points>
      )}
    </group>
  )
}

// =============================================================================
// AC KABLO (Inverterden ana şebekeye)
// =============================================================================
function ACCable({ 
  start, 
  end, 
  animated = true 
}: { 
  start: [number, number, number]
  end: [number, number, number]
  animated?: boolean
}) {
  const particlesRef = useRef<THREE.Points>(null)

  useFrame(() => {
    if (particlesRef.current && animated) {
      const positions = particlesRef.current.geometry.attributes.position.array as Float32Array
      for (let i = 0; i < positions.length; i += 3) {
        positions[i + 1] += 0.03
        if (positions[i + 1] > 1) positions[i + 1] = 0
      }
      particlesRef.current.geometry.attributes.position.needsUpdate = true
    }
  })

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

  // Parçacıklar için pozisyonlar
  const particleCount = 25
  const particlePositions = new Float32Array(particleCount * 3)
  for (let i = 0; i < particleCount; i++) {
    particlePositions[i * 3] = 0
    particlePositions[i * 3 + 1] = (Math.random() - 0.5) * length
    particlePositions[i * 3 + 2] = 0
  }

  return (
    <group>
      {/* AC Kablo (mavi) */}
      <mesh position={midPoint} rotation={[euler.x, euler.y, euler.z]}>
        <cylinderGeometry args={[0.06, 0.06, length, 8]} />
        <meshStandardMaterial color="#0ea5e9" roughness={0.6} metalness={0.4} />
      </mesh>

      {/* Animasyonlu enerji akışı */}
      {animated && (
        <points ref={particlesRef} position={midPoint} rotation={[euler.x, euler.y, euler.z]}>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              args={[particlePositions, 4]}
              count={particleCount}
            />
          </bufferGeometry>
          <pointsMaterial size={0.1} color="#60a5fa" transparent opacity={0.9} sizeAttenuation />
        </points>
      )}
    </group>
  )
}

// =============================================================================
// 48 PANELLİ GÜNEŞ SANTRALI ANA BİLEŞENİ
// =============================================================================
export function DetailedSolarFarm({ position }: { position: [number, number, number] }) {
  // 8 satır x 6 sütun = 48 panel
  const rows = 8
  const cols = 6
  const spacingX = 2.5
  const spacingZ = 1.5
  const tilt = 0.35 // ~20 derece eğim

  // 4 inverter istasyonu konumları (her biri 12 panel)
  const inverterPositions: [number, number, number][] = [
    [-8, 0.6, -12],  // Sol üst bölge
    [8, 0.6, -12],   // Sağ üst bölge
    [-8, 0.6, 12],   // Sol alt bölge
    [8, 0.6, 12],    // Sağ alt bölge
  ]

  // 4 junction box konumu (her inverter için 1)
  const junctionBoxPositions: [number, number, number][] = [
    [-6, 0.5, -8],
    [6, 0.5, -8],
    [-6, 0.5, 8],
    [6, 0.5, 8],
  ]

  return (
    <group position={position}>
      {/* ===== GÜNEŞ PANELLERİ (48 adet) ===== */}
      {Array.from({ length: rows }).map((_, row) =>
        Array.from({ length: cols }).map((_, col) => {
          const panelNumber = row * cols + col + 1
          const xPos = (col - (cols - 1) / 2) * spacingX
          const zPos = (row - (rows - 1) / 2) * spacingZ
          
          return (
            <SolarPanel
              key={`panel-${panelNumber}`}
              position={[xPos, 0.5, zPos]}
              rotation={tilt}
              panelNumber={panelNumber}
            />
          )
        })
      )}

      {/* ===== JUNCTION BOX'LAR (4 adet - her biri 12 panel) ===== */}
      {junctionBoxPositions.map((pos, i) => (
        <JunctionBox
          key={`jbox-${i}`}
          position={pos}
          name={`JB-${i + 1}`}
          strings={4}
        />
      ))}

      {/* ===== INVERTER İSTASYONLARI (4 adet) ===== */}
      {inverterPositions.map((pos, i) => (
        <Inverter
          key={`inverter-${i}`}
          position={pos}
          name={`Inverter ${i + 1}`}
          power={`${75 + Math.random() * 10 | 0} kW`}
          efficiency={97.2 + Math.random() * 1.5 | 0}
        />
      ))}

      {/* ===== DC KABLO BAĞLANTILARI ===== */}
      {/* Sol üst bölge - Junction Box 1'e */}
      {Array.from({ length: 12 }).map((_, i) => {
        const row = Math.floor(i / 3)
        const col = i % 3
        const xPos = (col - (cols - 1) / 2) * spacingX
        const zPos = (row - (rows - 1) / 2) * spacingZ
        return (
          <DCCable
            key={`dc-cable-1-${i}`}
            start={[xPos, 0.5, zPos]}
            end={junctionBoxPositions[0]}
            animated={i % 2 === 0}
          />
        )
      })}

      {/* Sağ üst bölge - Junction Box 2'ye */}
      {Array.from({ length: 12 }).map((_, i) => {
        const row = Math.floor(i / 3)
        const col = i % 3 + 3
        const xPos = (col - (cols - 1) / 2) * spacingX
        const zPos = (row - (rows - 1) / 2) * spacingZ
        return (
          <DCCable
            key={`dc-cable-2-${i}`}
            start={[xPos, 0.5, zPos]}
            end={junctionBoxPositions[1]}
            animated={i % 2 === 0}
          />
        )
      })}

      {/* Sol alt bölge - Junction Box 3'e */}
      {Array.from({ length: 12 }).map((_, i) => {
        const row = Math.floor(i / 3) + 4
        const col = i % 3
        const xPos = (col - (cols - 1) / 2) * spacingX
        const zPos = (row - (rows - 1) / 2) * spacingZ
        return (
          <DCCable
            key={`dc-cable-3-${i}`}
            start={[xPos, 0.5, zPos]}
            end={junctionBoxPositions[2]}
            animated={i % 2 === 0}
          />
        )
      })}

      {/* Sağ alt bölge - Junction Box 4'e */}
      {Array.from({ length: 12 }).map((_, i) => {
        const row = Math.floor(i / 3) + 4
        const col = i % 3 + 3
        const xPos = (col - (cols - 1) / 2) * spacingX
        const zPos = (row - (rows - 1) / 2) * spacingZ
        return (
          <DCCable
            key={`dc-cable-4-${i}`}
            start={[xPos, 0.5, zPos]}
            end={junctionBoxPositions[3]}
            animated={i % 2 === 0}
          />
        )
      })}

      {/* ===== JUNCTION BOX'TAN INVERTER'E DC KABLOLAR ===== */}
      {junctionBoxPositions.map((jboxPos, i) => (
        <DCCable
          key={`jbox-to-inv-${i}`}
          start={jboxPos}
          end={inverterPositions[i]}
          animated={true}
        />
      ))}

      {/* ===== AC KABLO BAĞLANTILARI (Inverter'lerden ana şebekeye) ===== */}
      {inverterPositions.map((invPos, i) => (
        <ACCable
          key={`ac-cable-${i}`}
          start={invPos}
          end={[0, 0.5, i < 2 ? -15 : 15]}
          animated={true}
        />
      ))}

      {/* ===== TOPRAKLAMA DİREKLERİ ===== */}
      {[-10, -5, 0, 5, 10].map((x, i) => (
        <group key={`ground-${i}`} position={[x, 0, -10]}>
          <mesh castShadow>
            <cylinderGeometry args={[0.08, 0.08, 0.8, 8]} />
            <meshStandardMaterial color="#78716c" roughness={0.7} metalness={0.3} />
          </mesh>
        </group>
      ))}

      {/* ===== GÜNEŞ SANTRALİ ETİKETİ ===== */}
      <Html position={[0, 3, -15]} center distanceFactor={25}>
        <div className="pointer-events-none">
          <div className="rounded-xl border border-yellow-500/40 bg-slate-900/95 px-4 py-3 shadow-2xl backdrop-blur-sm">
            <div className="flex flex-col items-center gap-2">
              <div className="flex items-center gap-2">
                <Sun className="h-5 w-5 text-yellow-400" />
                <span className="text-[12px] font-bold text-white">Güneş Enerjisi Santrali</span>
              </div>
              <div className="flex gap-3 text-[8px]">
                <span className="text-yellow-400">48 Panel</span>
                <span className="text-orange-400">4 Inverter</span>
                <span className="text-green-400">~300 kWp</span>
              </div>
              <div className="mt-1 grid grid-cols-2 gap-2 text-[7px]">
                <div className="flex flex-col rounded border border-blue-500/30 bg-blue-500/10 px-2 py-1">
                  <span className="text-blue-300">DC Üretim</span>
                  <span className="font-mono font-bold text-blue-400">285 kW</span>
                </div>
                <div className="flex flex-col rounded border border-green-500/30 bg-green-500/10 px-2 py-1">
                  <span className="text-green-300">AC Çıkış</span>
                  <span className="font-mono font-bold text-green-400">277 kW</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Html>

      {/* ===== GÜNEŞ IŞIKLARI EFEKTİ ===== */}
      <Sparkles position={[0, 5, 0]} count={50} scale={30} size={3} speed={0.2} opacity={0.3} color="#fbbf24" />
    </group>
  )
}
