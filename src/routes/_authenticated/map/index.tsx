import { createFileRoute } from '@tanstack/react-router'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, PerspectiveCamera, Environment, Html, Sky, Sparkles, ContactShadows } from '@react-three/drei'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Sun, Zap, Factory, Activity, Gauge, Thermometer, Flame, Droplets, Wind, Cpu, Container } from 'lucide-react'

export const Route = createFileRoute('/_authenticated/map/')({
  component: MapPage,
})

// Veri Noktası
function DataPoint({ position, name, value, unit, color = '#22c55e' }: {
  position: [number, number, number]; name: string; value: string; unit: string; color?: string
}) {
  return (
    <group position={position}>
      <mesh castShadow>
        <boxGeometry args={[0.25, 0.25, 0.12]} />
        <meshStandardMaterial color="#1e293b" roughness={0.2} metalness={0.9} />
      </mesh>
      <mesh position={[0.08, 0.08, 0.07]}>
        <sphereGeometry args={[0.03, 8, 8]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={2} />
      </mesh>
      <Html position={[0, 0.4, 0]} center distanceFactor={35}>
        <div className="pointer-events-none">
          <div className="rounded border border-slate-600/50 bg-slate-900/95 px-1.5 py-0.5">
            <div className="text-[6px] text-slate-400">{name}</div>
            <div className="text-[8px] font-mono font-bold" style={{ color }}>{value} {unit}</div>
          </div>
        </div>
      </Html>
    </group>
  )
}

// Elektrik Panosu
function Panel({ position, name, power }: { position: [number, number, number]; name: string; power: string }) {
  return (
    <group position={position}>
      <mesh castShadow><boxGeometry args={[1, 2, 0.4]} /><meshStandardMaterial color="#1f2937" roughness={0.2} metalness={0.85} /></mesh>
      <mesh position={[0.35, 0.7, 0.21]}><sphereGeometry args={[0.04, 8, 8]} /><meshStandardMaterial color="#22c55e" emissive="#22c55e" emissiveIntensity={2} /></mesh>
      <Html position={[0, 1.4, 0]} center distanceFactor={30}>
        <div className="pointer-events-none"><div className="rounded border border-green-500/30 bg-slate-900/95 px-1.5 py-0.5"><div className="text-[7px] font-bold text-white">{name}</div><div className="text-[6px] text-green-400">{power}</div></div></div>
      </Html>
    </group>
  )
}

// Çatı GES Panelleri
function RoofSolar({ position, width, depth, rows, cols }: { position: [number, number, number]; width: number; depth: number; rows: number; cols: number }) {
  const panelW = (width - 2) / cols
  const panelD = (depth - 2) / rows
  return (
    <group position={position}>
      {Array.from({ length: rows }).map((_, r) =>
        Array.from({ length: cols }).map((_, c) => (
          <group key={`rp-${r}-${c}`} position={[-width/2 + 1 + c * panelW + panelW/2, 0, -depth/2 + 1 + r * panelD + panelD/2]}>
            <mesh rotation={[-0.2, 0, 0]} castShadow>
              <boxGeometry args={[panelW * 0.9, 0.08, panelD * 0.85]} />
              <meshStandardMaterial color="#1e3a5f" roughness={0.1} metalness={0.95} />
            </mesh>
            <mesh position={[0, 0.05, 0]} rotation={[-0.2, 0, 0]}>
              <planeGeometry args={[panelW * 0.85, panelD * 0.8]} />
              <meshStandardMaterial color="#1e40af" emissive="#2563eb" emissiveIntensity={0.1} roughness={0.05} metalness={0.9} />
            </mesh>
          </group>
        ))
      )}
    </group>
  )
}

// İnverter
function Inverter({ position, name, power }: { position: [number, number, number]; name: string; power: string }) {
  return (
    <group position={position}>
      <mesh position={[0, 0.8, 0]} castShadow><boxGeometry args={[1.5, 1.4, 0.7]} /><meshStandardMaterial color="#1e293b" roughness={0.2} metalness={0.85} /></mesh>
      {[-0.5, -0.25, 0, 0.25, 0.5].map((x, i) => (<mesh key={i} position={[x, 0.8, 0.37]} castShadow><boxGeometry args={[0.08, 1.2, 0.02]} /><meshStandardMaterial color="#334155" /></mesh>))}
      <mesh position={[0.6, 1.3, 0.37]}><sphereGeometry args={[0.04, 8, 8]} /><meshStandardMaterial color="#22c55e" emissive="#22c55e" emissiveIntensity={2} /></mesh>
      <Html position={[0, 1.8, 0]} center distanceFactor={30}>
        <div className="pointer-events-none"><div className="rounded border border-yellow-500/30 bg-slate-900/95 px-1.5 py-0.5"><div className="text-[7px] font-bold text-white">{name}</div><div className="text-[6px] text-yellow-400">{power}</div></div></div>
      </Html>
    </group>
  )
}

// ==================== ANA ÜRETİM HOLÜ ====================
function MainFactory({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      {/* Ana Bina */}
      <mesh position={[0, 6, 0]} castShadow receiveShadow><boxGeometry args={[60, 12, 35]} /><meshStandardMaterial color="#374151" roughness={0.5} metalness={0.5} /></mesh>
      <mesh position={[0, 12.4, 0]} castShadow><boxGeometry args={[62, 0.8, 37]} /><meshStandardMaterial color="#1f2937" roughness={0.3} metalness={0.7} /></mesh>
      
      {/* Çatı GES - 120 Panel */}
      <RoofSolar position={[0, 13, 0]} width={58} depth={33} rows={6} cols={10} />
      <Sparkles position={[0, 15, 0]} count={80} scale={[60, 5, 35]} size={2} speed={0.2} opacity={0.3} color="#fbbf24" />
      
      {/* Çatı İnverterleri */}
      {[-20, -10, 0, 10, 20].map((x, i) => (<Inverter key={i} position={[x, 13, 18]} name={`R-INV-${i+1}`} power={`${45 + i * 3} kW`} />))}
      
      {/* Pencereler - Ön */}
      {Array.from({ length: 18 }).map((_, i) => (<mesh key={`wf-${i}`} position={[-26 + i * 3, 6, 17.51]} castShadow><boxGeometry args={[2, 8, 0.1]} /><meshStandardMaterial color="#60a5fa" emissive="#3b82f6" emissiveIntensity={0.15} transparent opacity={0.7} /></mesh>))}
      
      {/* Yükleme Kapıları */}
      {[-20, -10, 0, 10, 20].map((x, i) => (<mesh key={`d-${i}`} position={[x, 3, 17.51]} castShadow><boxGeometry args={[5, 6, 0.1]} /><meshStandardMaterial color="#0f172a" roughness={0.3} metalness={0.8} /></mesh>))}
      
      {/* MCC Panoları */}
      {[[-25, 'MCC-01', '520 kW'], [-15, 'MCC-02', '485 kW'], [-5, 'MCC-03', '510 kW'], [5, 'MCC-04', '495 kW'], [15, 'MCC-05', '530 kW'], [25, 'MCC-06', '460 kW']].map(([x, n, p], i) => (<Panel key={i} position={[x as number, 1, 17]} name={n as string} power={p as string} />))}
      
      {/* Vinçler */}
      {[-15, 15].map((x, i) => (
        <group key={`crane-${i}`} position={[x, 10.5, 0]}>
          <mesh castShadow><boxGeometry args={[3, 1, 32]} /><meshStandardMaterial color="#f97316" roughness={0.4} metalness={0.6} /></mesh>
          <mesh position={[0, -2, 8]} castShadow><boxGeometry args={[0.3, 4, 0.3]} /><meshStandardMaterial color="#fbbf24" /></mesh>
        </group>
      ))}
      
      {/* Sıcaklık Sensörleri */}
      {[[-20, 10, 0], [0, 10, 0], [20, 10, 0], [-20, 10, -12], [20, 10, -12]].map(([x, y, z], i) => (<DataPoint key={i} position={[x, y, z]} name={`T-${i+1}`} value={`${22 + Math.floor(i * 1.5)}`} unit="°C" color="#ef4444" />))}
      
      <Html position={[0, 18, 0]} center distanceFactor={16}>
        <div className="pointer-events-none"><div className="rounded-xl border border-blue-500/30 bg-slate-900/95 px-6 py-3 shadow-2xl"><div className="flex items-center gap-3"><Factory className="h-7 w-7 text-blue-400" /><div><div className="text-lg font-bold text-white">ANA ÜRETİM HOLÜ</div><div className="text-xs text-slate-400">60 Panel GES • 5 İnverter • 6 MCC • 3000 kW</div></div></div></div></div>
      </Html>
    </group>
  )
}

// ==================== MONTAJ HATTI ====================
function AssemblyLine({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      <mesh position={[0, 5, 0]} castShadow receiveShadow><boxGeometry args={[45, 10, 28]} /><meshStandardMaterial color="#4b5563" roughness={0.5} metalness={0.5} /></mesh>
      <mesh position={[0, 10.3, 0]} castShadow><boxGeometry args={[47, 0.6, 30]} /><meshStandardMaterial color="#1f2937" roughness={0.3} metalness={0.7} /></mesh>
      
      {/* Çatı GES - 80 Panel */}
      <RoofSolar position={[0, 10.8, 0]} width={43} depth={26} rows={5} cols={8} />
      {[-12, 0, 12].map((x, i) => (<Inverter key={i} position={[x, 10.8, 14]} name={`M-INV-${i+1}`} power={`${52 + i * 4} kW`} />))}
      
      {/* Pencereler */}
      {Array.from({ length: 14 }).map((_, i) => (<mesh key={i} position={[-20 + i * 3, 5, 14.01]} castShadow><boxGeometry args={[2, 6, 0.1]} /><meshStandardMaterial color="#60a5fa" emissive="#3b82f6" emissiveIntensity={0.15} transparent opacity={0.7} /></mesh>))}
      
      {/* Panoları */}
      {[[-15, 'AP-01', '380 kW'], [-5, 'AP-02', '420 kW'], [5, 'AP-03', '395 kW'], [15, 'AP-04', '410 kW']].map(([x, n, p], i) => (<Panel key={i} position={[x as number, 1, 13.5]} name={n as string} power={p as string} />))}
      
      {/* Robot Hücreleri */}
      {[-12, 0, 12].map((x, i) => (
        <group key={i} position={[x, 0, 0]}>
          <mesh position={[0, 2.5, 0]} castShadow><boxGeometry args={[8, 5, 8]} /><meshStandardMaterial color="#fbbf24" transparent opacity={0.12} /></mesh>
          <mesh position={[0, 1, 0]} castShadow><cylinderGeometry args={[0.5, 0.6, 2, 12]} /><meshStandardMaterial color="#f97316" roughness={0.3} metalness={0.8} /></mesh>
          <mesh position={[0, 2.5, 0]} rotation={[0, 0, Math.PI/4]} castShadow><boxGeometry args={[0.2, 3, 0.2]} /><meshStandardMaterial color="#ea580c" /></mesh>
          <DataPoint position={[3.5, 4, 4]} name={`ROB-${i+1}`} value="Aktif" unit="" color="#22c55e" />
        </group>
      ))}
      
      {/* Konveyör */}
      <mesh position={[0, 0.8, 0]} castShadow><boxGeometry args={[40, 0.3, 2]} /><meshStandardMaterial color="#475569" roughness={0.4} metalness={0.6} /></mesh>
      
      <Html position={[0, 14, 0]} center distanceFactor={18}>
        <div className="pointer-events-none"><div className="rounded-xl border border-yellow-500/30 bg-slate-900/95 px-5 py-2 shadow-xl"><div className="flex items-center gap-2"><Cpu className="h-5 w-5 text-yellow-400" /><div><div className="text-sm font-bold text-white">MONTAJ HATTI</div><div className="text-[10px] text-slate-400">40 Panel GES • 3 Robot • 1605 kW</div></div></div></div></div>
      </Html>
    </group>
  )
}

// ==================== BÜYÜK DEPOLAR ====================
function Warehouses({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      {/* Hammadde Deposu */}
      <group position={[-25, 0, 0]}>
        <mesh position={[0, 5, 0]} castShadow receiveShadow><boxGeometry args={[30, 10, 25]} /><meshStandardMaterial color="#374151" roughness={0.5} metalness={0.5} /></mesh>
        <mesh position={[0, 10.3, 0]} castShadow><boxGeometry args={[32, 0.6, 27]} /><meshStandardMaterial color="#1f2937" roughness={0.3} metalness={0.7} /></mesh>
        <RoofSolar position={[0, 10.8, 0]} width={28} depth={23} rows={4} cols={5} />
        {[-6, 6].map((x, i) => (<Inverter key={i} position={[x, 10.8, 12]} name={`H-INV-${i+1}`} power={`${38 + i * 5} kW`} />))}
        
        {/* Raf Sistemleri */}
        {[-10, 0, 10].map((x, i) => (
          <group key={i} position={[x, 0, 0]}>
            {Array.from({ length: 4 }).map((_, j) => (<mesh key={j} position={[0, 2 + j * 2, 0]} castShadow><boxGeometry args={[6, 0.2, 20]} /><meshStandardMaterial color="#64748b" roughness={0.5} metalness={0.5} /></mesh>))}
            <mesh position={[-2.8, 4.5, 0]} castShadow><boxGeometry args={[0.2, 9, 20]} /><meshStandardMaterial color="#475569" /></mesh>
            <mesh position={[2.8, 4.5, 0]} castShadow><boxGeometry args={[0.2, 9, 20]} /><meshStandardMaterial color="#475569" /></mesh>
          </group>
        ))}
        
        {/* Forklift */}
        <group position={[-5, 0, 8]}>
          <mesh position={[0, 0.8, 0]} castShadow><boxGeometry args={[2, 1.2, 3]} /><meshStandardMaterial color="#eab308" /></mesh>
          <mesh position={[0, 1.8, -1.8]} castShadow><boxGeometry args={[1.5, 1.2, 0.3]} /><meshStandardMaterial color="#ca8a04" /></mesh>
        </group>
        
        {/* Yükleme Kapıları */}
        {[-8, 0, 8].map((x, i) => (<mesh key={i} position={[x, 2.5, 12.51]} castShadow><boxGeometry args={[5, 5, 0.1]} /><meshStandardMaterial color="#0f172a" /></mesh>))}
        
        <Panel position={[-12, 1, 12]} name="HD-01" power="120 kW" />
        <Panel position={[12, 1, 12]} name="HD-02" power="95 kW" />
        
        <Html position={[0, 14, 0]} center distanceFactor={20}>
          <div className="pointer-events-none"><div className="rounded-xl border border-slate-500/30 bg-slate-900/95 px-4 py-2"><div className="flex items-center gap-2"><Container className="h-5 w-5 text-slate-400" /><div><div className="text-sm font-bold text-white">HAMMADDE DEPOSU</div><div className="text-[10px] text-slate-400">20 Panel • Raf Sistemi • 215 kW</div></div></div></div></div>
        </Html>
      </group>
      
      {/* Ürün Deposu */}
      <group position={[25, 0, 0]}>
        <mesh position={[0, 5, 0]} castShadow receiveShadow><boxGeometry args={[30, 10, 25]} /><meshStandardMaterial color="#374151" roughness={0.5} metalness={0.5} /></mesh>
        <mesh position={[0, 10.3, 0]} castShadow><boxGeometry args={[32, 0.6, 27]} /><meshStandardMaterial color="#1f2937" roughness={0.3} metalness={0.7} /></mesh>
        <RoofSolar position={[0, 10.8, 0]} width={28} depth={23} rows={4} cols={5} />
        {[-6, 6].map((x, i) => (<Inverter key={i} position={[x, 10.8, 12]} name={`U-INV-${i+1}`} power={`${40 + i * 4} kW`} />))}
        
        {/* Otomatik Depo Sistemi */}
        {[-8, 0, 8].map((x, i) => (
          <group key={i} position={[x, 0, 0]}>
            <mesh position={[0, 4.5, 0]} castShadow><boxGeometry args={[4, 9, 22]} /><meshStandardMaterial color="#3b82f6" transparent opacity={0.15} /></mesh>
            {Array.from({ length: 5 }).map((_, j) => (<mesh key={j} position={[0, 1 + j * 1.8, 0]} castShadow><boxGeometry args={[3.5, 0.15, 21]} /><meshStandardMaterial color="#64748b" /></mesh>))}
          </group>
        ))}
        
        {/* Yükleme Rampları */}
        {[-8, 0, 8].map((x, i) => (
          <group key={i}>
            <mesh position={[x, 2.5, 12.51]} castShadow><boxGeometry args={[5, 5, 0.1]} /><meshStandardMaterial color="#0f172a" /></mesh>
            <mesh position={[x, 0.15, 14]} castShadow><boxGeometry args={[6, 0.3, 3]} /><meshStandardMaterial color="#475569" /></mesh>
          </group>
        ))}
        
        <Panel position={[-12, 1, 12]} name="UD-01" power="130 kW" />
        <Panel position={[12, 1, 12]} name="UD-02" power="110 kW" />
        
        <Html position={[0, 14, 0]} center distanceFactor={20}>
          <div className="pointer-events-none"><div className="rounded-xl border border-slate-500/30 bg-slate-900/95 px-4 py-2"><div className="flex items-center gap-2"><Container className="h-5 w-5 text-blue-400" /><div><div className="text-sm font-bold text-white">ÜRÜN DEPOSU</div><div className="text-[10px] text-slate-400">20 Panel • Otomasyon • 240 kW</div></div></div></div></div>
        </Html>
      </group>
    </group>
  )
}

// ==================== TRAFO MERKEZİ ====================
function TransformerYard({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      {/* Ana Trafo */}
      <group position={[0, 0, 0]}>
        <mesh position={[0, 3, 0]} castShadow><cylinderGeometry args={[3, 3, 5.5, 24]} /><meshStandardMaterial color="#475569" roughness={0.3} metalness={0.8} /></mesh>
        <mesh position={[0, 6, 0]} castShadow><cylinderGeometry args={[3.3, 3.3, 0.5, 24]} /><meshStandardMaterial color="#1e293b" roughness={0.2} metalness={0.9} /></mesh>
        {[-2.8, 2.8].map((x, i) => (<mesh key={i} position={[x, 3, 0]} castShadow><boxGeometry args={[0.5, 5, 3.5]} /><meshStandardMaterial color="#64748b" /></mesh>))}
        {[-1.2, 0, 1.2].map((x, i) => (<mesh key={i} position={[x, 7, 0]} castShadow><cylinderGeometry args={[0.25, 0.35, 2, 12]} /><meshStandardMaterial color="#0ea5e9" roughness={0.1} metalness={0.3} /></mesh>))}
        <Sparkles position={[0, 8.5, 0]} count={25} scale={5} size={3} speed={1.5} opacity={0.7} color="#60a5fa" />
        <DataPoint position={[4, 4, 0]} name="TR-ANA" value="62" unit="°C" color="#ef4444" />
        <Html position={[0, 10, 0]} center distanceFactor={22}>
          <div className="pointer-events-none"><div className="rounded-lg border border-blue-500/30 bg-slate-900/95 px-3 py-1.5"><div className="text-[10px] font-bold text-white">ANA TRAFO</div><div className="text-[9px] text-slate-400">34.5kV → 400V • 4 MVA</div><div className="mt-1 text-[8px] text-cyan-400">Yük: 85%</div></div></div>
        </Html>
      </group>
      
      {/* Yardımcı Trafolar */}
      {[-12, 12].map((x, i) => (
        <group key={i} position={[x, 0, 0]}>
          <mesh position={[0, 2, 0]} castShadow><cylinderGeometry args={[2, 2, 3.5, 20]} /><meshStandardMaterial color="#475569" roughness={0.3} metalness={0.8} /></mesh>
          <mesh position={[0, 4, 0]} castShadow><cylinderGeometry args={[2.2, 2.2, 0.4, 20]} /><meshStandardMaterial color="#1e293b" /></mesh>
          {[-0.7, 0.7].map((bx, j) => (<mesh key={j} position={[bx, 4.8, 0]} castShadow><cylinderGeometry args={[0.18, 0.25, 1.3, 10]} /><meshStandardMaterial color="#0ea5e9" roughness={0.1} metalness={0.3} /></mesh>))}
          <DataPoint position={[2.8, 3, 0]} name={`TR-${i+2}`} value={`${58 + i * 6}`} unit="°C" color="#ef4444" />
          <Html position={[0, 7, 0]} center distanceFactor={28}><div className="pointer-events-none"><div className="rounded border border-slate-500/30 bg-slate-900/95 px-2 py-1"><div className="text-[8px] font-bold text-white">TRAFO-{i+2}</div><div className="text-[7px] text-slate-400">1.6 MVA • {72 + i * 8}%</div></div></div></Html>
        </group>
      ))}
      
      {/* OG Hücreleri */}
      <group position={[0, 0, 10]}>
        <mesh position={[0, 1.5, 0]} castShadow><boxGeometry args={[20, 3, 4]} /><meshStandardMaterial color="#1e293b" roughness={0.2} metalness={0.85} /></mesh>
        {[-8, -4, 0, 4, 8].map((x, i) => (<group key={i}><mesh position={[x, 1.5, 2.01]} castShadow><boxGeometry args={[3, 2.5, 0.05]} /><meshStandardMaterial color="#0f172a" /></mesh><mesh position={[x + 1, 2.5, 2.02]}><sphereGeometry args={[0.06, 8, 8]} /><meshStandardMaterial color="#22c55e" emissive="#22c55e" emissiveIntensity={2} /></mesh><Html position={[x, 3.3, 2]} center distanceFactor={35}><div className="pointer-events-none text-[6px] font-bold text-green-400">OG-{i+1}</div></Html></group>))}
      </group>
      
      {/* YG Direkleri */}
      {[-18, 18].map((x, i) => (
        <group key={i} position={[x, 0, -15]}>
          <mesh position={[0, 12, 0]} castShadow><cylinderGeometry args={[0.35, 0.5, 24, 8]} /><meshStandardMaterial color="#78716c" roughness={0.6} metalness={0.4} /></mesh>
          <mesh position={[0, 22, 0]} castShadow><boxGeometry args={[8, 0.35, 0.35]} /><meshStandardMaterial color="#78716c" /></mesh>
          {[-3, 0, 3].map((ix, j) => (<mesh key={j} position={[ix, 22.6, 0]} castShadow><cylinderGeometry args={[0.12, 0.18, 1, 8]} /><meshStandardMaterial color="#0ea5e9" roughness={0.2} metalness={0.3} /></mesh>))}
        </group>
      ))}
      <mesh position={[0, 22.8, -15]} castShadow><boxGeometry args={[36, 0.06, 0.06]} /><meshStandardMaterial color="#1e293b" /></mesh>
      
      <Html position={[0, 26, -15]} center distanceFactor={16}>
        <div className="pointer-events-none"><div className="rounded-xl border border-purple-500/30 bg-slate-900/95 px-6 py-3 shadow-2xl"><div className="flex items-center gap-3"><Zap className="h-7 w-7 text-purple-400" /><div><div className="text-lg font-bold text-white">TRAFO MERKEZİ</div><div className="text-xs text-slate-400">34.5 kV • 3 Trafo • 7.2 MVA</div></div></div></div></div>
      </Html>
    </group>
  )
}

// ==================== EŞANJÖR DAİRESİ ====================
function BoilerHouse({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      <mesh position={[0, 4, 0]} castShadow receiveShadow><boxGeometry args={[22, 8, 14]} /><meshStandardMaterial color="#7c2d12" roughness={0.5} metalness={0.5} /></mesh>
      <mesh position={[0, 8.3, 0]} castShadow><boxGeometry args={[24, 0.6, 16]} /><meshStandardMaterial color="#451a03" /></mesh>
      
      {/* Bacalar */}
      {[-6, 6].map((x, i) => (<mesh key={i} position={[x, 12, -4]} castShadow><cylinderGeometry args={[0.8, 1.2, 12, 16]} /><meshStandardMaterial color="#78716c" roughness={0.5} metalness={0.5} /></mesh>))}
      
      {/* Eşanjörler */}
      {[-6, 0, 6].map((x, i) => (
        <group key={i} position={[x, 0, 2]}>
          <mesh position={[0, 2.5, 0]} castShadow><cylinderGeometry args={[1.5, 1.5, 4, 20]} /><meshStandardMaterial color="#dc2626" roughness={0.3} metalness={0.8} /></mesh>
          <mesh position={[0, 4.7, 0]} castShadow><cylinderGeometry args={[1.6, 1.6, 0.4, 20]} /><meshStandardMaterial color="#991b1b" /></mesh>
          <mesh position={[-2, 2.5, 0]} rotation={[0, 0, Math.PI/2]} castShadow><cylinderGeometry args={[0.25, 0.25, 1, 10]} /><meshStandardMaterial color="#f97316" /></mesh>
          <mesh position={[2, 2.5, 0]} rotation={[0, 0, Math.PI/2]} castShadow><cylinderGeometry args={[0.25, 0.25, 1, 10]} /><meshStandardMaterial color="#3b82f6" /></mesh>
          <DataPoint position={[0, 5.5, 0]} name={`ESJ-${i+1}`} value={`${85 - i * 8}`} unit="°C" color="#ef4444" />
        </group>
      ))}
      
      {/* Gaz Hattı */}
      <mesh position={[0, 1, -8]} rotation={[0, 0, Math.PI/2]} castShadow><cylinderGeometry args={[0.35, 0.35, 28, 12]} /><meshStandardMaterial color="#fbbf24" roughness={0.3} metalness={0.7} /></mesh>
      
      {/* Gaz Sayaçları */}
      {[-8, 0, 8].map((x, i) => (<group key={i} position={[x, 1, -7]}><mesh castShadow><boxGeometry args={[1, 1.2, 0.6]} /><meshStandardMaterial color="#1e293b" roughness={0.2} metalness={0.9} /></mesh><DataPoint position={[0, 1.2, 0]} name={`GAZ-${i+1}`} value={`${160 + i * 45}`} unit="m³/h" color="#fbbf24" /></group>))}
      
      {/* Basınç Regülatörü */}
      <group position={[-12, 1, -8]}>
        <mesh castShadow><boxGeometry args={[1.5, 1.5, 1]} /><meshStandardMaterial color="#ea580c" /></mesh>
        <DataPoint position={[0, 1.3, 0]} name="REG" value="4.2" unit="bar" color="#f97316" />
      </group>
      
      <Sparkles position={[0, 5, 2]} count={30} scale={15} size={2.5} speed={0.5} opacity={0.4} color="#f97316" />
      
      <Html position={[0, 12, 0]} center distanceFactor={18}>
        <div className="pointer-events-none"><div className="rounded-xl border border-orange-500/30 bg-slate-900/95 px-5 py-2 shadow-xl"><div className="flex items-center gap-2"><Flame className="h-6 w-6 text-orange-400" /><div><div className="text-base font-bold text-white">EŞANJÖR DAİRESİ</div><div className="text-[11px] text-slate-400">3 Eşanjör • 3 Sayaç • 480 m³/h</div></div></div></div></div>
      </Html>
    </group>
  )
}

// ==================== SU SİSTEMİ ====================
function WaterSystem({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      {/* Su Depoları */}
      {[-8, 8].map((x, i) => (
        <group key={i} position={[x, 0, 0]}>
          <mesh position={[0, 6, 0]} castShadow><cylinderGeometry args={[6, 6, 10, 24]} /><meshStandardMaterial color="#0369a1" roughness={0.3} metalness={0.6} transparent opacity={0.9} /></mesh>
          <mesh position={[0, 11.3, 0]} castShadow><cylinderGeometry args={[6.3, 6.3, 0.6, 24]} /><meshStandardMaterial color="#0c4a6e" /></mesh>
          <mesh position={[0, 6, 6.1]} castShadow><boxGeometry args={[0.5, 8, 0.2]} /><meshStandardMaterial color="#f8fafc" /></mesh>
          <DataPoint position={[0, 9, 6.5]} name={`SEV-${i+1}`} value={`${72 + i * 12}`} unit="%" color="#0ea5e9" />
        </group>
      ))}
      
      {/* Pompa İstasyonu */}
      <group position={[0, 0, 12]}>
        <mesh position={[0, 2, 0]} castShadow><boxGeometry args={[14, 4, 6]} /><meshStandardMaterial color="#334155" roughness={0.4} metalness={0.6} /></mesh>
        {[-4, 0, 4].map((x, i) => (
          <group key={i} position={[x, 0, 0]}>
            <mesh position={[0, 2.2, 2.5]} castShadow><cylinderGeometry args={[0.9, 0.9, 1.5, 14]} /><meshStandardMaterial color="#1e40af" roughness={0.3} metalness={0.8} /></mesh>
            <mesh position={[0, 2.2, 3.8]} rotation={[Math.PI/2, 0, 0]} castShadow><cylinderGeometry args={[0.3, 0.3, 1, 10]} /><meshStandardMaterial color="#60a5fa" /></mesh>
            <DataPoint position={[0, 3.5, 2.5]} name={`P-${i+1}`} value={i === 1 ? "Bekleme" : "Aktif"} unit="" color={i === 1 ? "#eab308" : "#22c55e"} />
          </group>
        ))}
      </group>
      
      {/* Su Sayaçları */}
      {[-5, 0, 5].map((x, i) => (<group key={i} position={[x, 0.6, 16]}><mesh castShadow><boxGeometry args={[0.7, 0.8, 0.5]} /><meshStandardMaterial color="#0f172a" roughness={0.2} metalness={0.9} /></mesh><DataPoint position={[0, 0.9, 0]} name={`SU-${i+1}`} value={`${14 + i * 6}`} unit="m³/h" color="#0ea5e9" /></group>))}
      
      {/* Ana Boru */}
      <mesh position={[0, 0.6, 14]} rotation={[0, 0, Math.PI/2]} castShadow><cylinderGeometry args={[0.3, 0.3, 18, 12]} /><meshStandardMaterial color="#0ea5e9" roughness={0.3} metalness={0.7} /></mesh>
      
      <Html position={[0, 15, 6]} center distanceFactor={18}>
        <div className="pointer-events-none"><div className="rounded-xl border border-cyan-500/30 bg-slate-900/95 px-5 py-2 shadow-xl"><div className="flex items-center gap-2"><Droplets className="h-6 w-6 text-cyan-400" /><div><div className="text-base font-bold text-white">SU SİSTEMİ</div><div className="text-[11px] text-slate-400">2 Tank • 3 Pompa • 44 m³/h</div></div></div></div></div>
      </Html>
    </group>
  )
}

// ==================== HVAC MERKEZİ ====================
function HVACCenter({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      <mesh position={[0, 2.5, 0]} castShadow receiveShadow><boxGeometry args={[16, 5, 8]} /><meshStandardMaterial color="#64748b" roughness={0.4} metalness={0.6} /></mesh>
      
      {/* Fanlar */}
      {[-5, 0, 5].map((x, i) => (
        <group key={i} position={[x, 5.3, 0]}>
          <mesh castShadow><cylinderGeometry args={[1.5, 1.5, 0.5, 20]} /><meshStandardMaterial color="#334155" roughness={0.3} metalness={0.7} /></mesh>
          <mesh position={[0, 0.3, 0]}><torusGeometry args={[1.1, 0.12, 8, 24]} /><meshStandardMaterial color="#1e293b" /></mesh>
          <DataPoint position={[0, 1.2, 0]} name={`FAN-${i+1}`} value={`${1200 + i * 150}`} unit="RPM" color="#22c55e" />
        </group>
      ))}
      
      {/* Chiller */}
      <group position={[0, 0, -8]}>
        <mesh position={[0, 2, 0]} castShadow><boxGeometry args={[12, 4, 5]} /><meshStandardMaterial color="#0f766e" roughness={0.4} metalness={0.6} /></mesh>
        <DataPoint position={[6.2, 2.5, 0]} name="CHILLER" value="7" unit="°C" color="#0ea5e9" />
        <DataPoint position={[-6.2, 2.5, 0]} name="CHILLER-2" value="8" unit="°C" color="#0ea5e9" />
      </group>
      
      {/* Kanal Çıkışları */}
      {[-5, 0, 5].map((x, i) => (<mesh key={i} position={[x, 2.5, 4.2]} castShadow><boxGeometry args={[2.5, 2, 0.5]} /><meshStandardMaterial color="#475569" /></mesh>))}
      
      <Html position={[0, 9, -3]} center distanceFactor={20}>
        <div className="pointer-events-none"><div className="rounded-xl border border-teal-500/30 bg-slate-900/95 px-4 py-2 shadow-xl"><div className="flex items-center gap-2"><Wind className="h-5 w-5 text-teal-400" /><div><div className="text-sm font-bold text-white">HVAC MERKEZİ</div><div className="text-[10px] text-slate-400">3 Fan • 2 Chiller • 120 kW</div></div></div></div></div>
      </Html>
    </group>
  )
}

// ==================== YER GES ====================
function GroundSolar({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      {Array.from({ length: 10 }).map((_, row) =>
        Array.from({ length: 12 }).map((_, col) => (
          <group key={`gs-${row}-${col}`} position={[col * 3.2 - 17.6, 0, row * 2.4 - 10.8]}>
            <mesh position={[0, 2, 0]} rotation={[-0.4, 0, 0]} castShadow receiveShadow><boxGeometry args={[2.8, 0.1, 1.6]} /><meshStandardMaterial color="#1e3a5f" roughness={0.1} metalness={0.95} /></mesh>
            <mesh position={[0, 2.06, 0.05]} rotation={[-0.4, 0, 0]}><planeGeometry args={[2.6, 1.4]} /><meshStandardMaterial color="#1e40af" emissive="#2563eb" emissiveIntensity={0.1} roughness={0.05} metalness={0.9} /></mesh>
            <mesh position={[0, 0.95, 0.4]} castShadow><cylinderGeometry args={[0.06, 0.08, 1.9, 6]} /><meshStandardMaterial color="#64748b" /></mesh>
          </group>
        ))
      )}
      
      {/* Merkezi İnverter İstasyonu */}
      <group position={[0, 0, 16]}>
        <mesh position={[0, 1.5, 0]} castShadow><boxGeometry args={[20, 3, 5]} /><meshStandardMaterial color="#1e293b" roughness={0.2} metalness={0.85} /></mesh>
        {[-7, -3.5, 0, 3.5, 7].map((x, i) => (<Inverter key={i} position={[x, 0, 2.2]} name={`GES-INV-${i+1}`} power={`${95 + i * 8} kW`} />))}
      </group>
      
      {/* DC Combiner Boxlar */}
      {[-12, -4, 4, 12].map((x, i) => (<group key={i} position={[x, 0, 8]}><mesh position={[0, 0.5, 0]} castShadow><boxGeometry args={[0.8, 0.8, 0.5]} /><meshStandardMaterial color="#f97316" roughness={0.3} metalness={0.7} /></mesh><DataPoint position={[0, 1.1, 0]} name={`DCB-${i+1}`} value="OK" unit="" color="#22c55e" /></group>))}
      
      <Sparkles position={[0, 4, 0]} count={100} scale={[40, 5, 30]} size={3} speed={0.2} opacity={0.35} color="#fbbf24" />
      
      <Html position={[0, 8, 5]} center distanceFactor={16}>
        <div className="pointer-events-none flex flex-col items-center"><div className="rounded-xl border border-yellow-500/30 bg-slate-900/95 px-6 py-3 shadow-2xl"><div className="flex items-center gap-3"><Sun className="h-7 w-7 text-yellow-400" /><div><div className="text-lg font-bold text-white">YER GES</div><div className="text-xs text-slate-400">120 Panel • 5 İnverter • 500 kWp</div></div></div></div><div className="mt-2 rounded-full border border-yellow-500/30 bg-slate-900/90 px-4 py-1"><span className="text-sm font-mono font-bold text-yellow-400">⚡ 485 kW Üretim</span></div></div>
      </Html>
    </group>
  )
}

// ==================== ZEMİN ====================
function Ground() {
  return (
    <group>
      <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.1, 0]}><planeGeometry args={[400, 400]} /><meshStandardMaterial color="#1e293b" roughness={0.9} metalness={0.1} /></mesh>
      <gridHelper args={[400, 80, '#334155', '#1e293b']} position={[0, 0.01, 0]} />
      <ContactShadows position={[0, 0, 0]} opacity={0.4} scale={250} blur={2.5} far={60} />
    </group>
  )
}

// ==================== SAHNE ====================
function Scene() {
  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight position={[120, 120, 60]} intensity={1.2} castShadow shadow-mapSize-width={4096} shadow-mapSize-height={4096} shadow-camera-far={300} shadow-camera-left={-150} shadow-camera-right={150} shadow-camera-top={150} shadow-camera-bottom={-150} />
      <hemisphereLight intensity={0.3} groundColor="#1e293b" />
      <Sky sunPosition={[100, 30, 100]} />
      <Environment preset="city" />
      <Ground />

      <MainFactory position={[0, 0, 50]} />
      <AssemblyLine position={[70, 0, 50]} />
      <Warehouses position={[0, 0, -45]} />
      <TransformerYard position={[0, 0, -110]} />
      <BoilerHouse position={[-75, 0, 10]} />
      <WaterSystem position={[95, 0, -30]} />
      <HVACCenter position={[-75, 0, -50]} />
      <GroundSolar position={[100, 0, 50]} />

      <PerspectiveCamera makeDefault position={[150, 100, 150]} fov={50} />
      <OrbitControls enablePan enableZoom enableRotate autoRotate autoRotateSpeed={0.1} maxPolarAngle={Math.PI / 2.1} minDistance={60} maxDistance={280} />
    </>
  )
}

// ==================== ANA SAYFA ====================
export default function MapPage() {
  return (
    <div className="flex h-[calc(100vh-4rem)] gap-4 p-4">
      <div className="flex w-80 flex-col gap-3 overflow-y-auto">
        <div className="grid grid-cols-2 gap-2">
          {[
            { icon: Zap, label: 'Toplam Tüketim', value: '5.2 MW', color: 'text-blue-400', bg: 'bg-blue-500/10' },
            { icon: Sun, label: 'GES Üretimi', value: '1.1 MW', color: 'text-yellow-400', bg: 'bg-yellow-500/10' },
            { icon: Flame, label: 'Doğalgaz', value: '480 m³/h', color: 'text-orange-400', bg: 'bg-orange-500/10' },
            { icon: Droplets, label: 'Su', value: '44 m³/h', color: 'text-cyan-400', bg: 'bg-cyan-500/10' },
          ].map((item, i) => (
            <Card key={i} className="border-slate-700 bg-slate-900/80 p-3">
              <div className="flex items-center gap-2">
                <div className={`rounded-lg ${item.bg} p-2`}><item.icon className={`h-4 w-4 ${item.color}`} /></div>
                <div><div className="text-[9px] text-slate-400">{item.label}</div><div className={`text-sm font-bold ${item.color}`}>{item.value}</div></div>
              </div>
            </Card>
          ))}
        </div>

        <Card className="border-slate-700 bg-slate-900/80 p-3">
          <div className="mb-2 flex items-center justify-between"><span className="text-xs font-semibold text-white">Çatı GES Sistemleri</span><Badge variant="secondary" className="text-[10px]">200 Panel</Badge></div>
          <div className="space-y-1.5">
            {[
              { name: 'Ana Üretim Çatısı', panels: 60, inverters: 5, power: '240 kW' },
              { name: 'Montaj Hattı Çatısı', panels: 40, inverters: 3, power: '160 kW' },
              { name: 'Hammadde Deposu', panels: 20, inverters: 2, power: '80 kW' },
              { name: 'Ürün Deposu', panels: 20, inverters: 2, power: '84 kW' },
              { name: 'Yer GES', panels: 120, inverters: 5, power: '485 kW' },
            ].map((item, i) => (
              <div key={i} className="flex items-center justify-between rounded-lg border border-slate-700 bg-slate-800/50 p-2">
                <div className="flex items-center gap-2"><Sun className="h-3.5 w-3.5 text-yellow-400" /><span className="text-[10px] font-medium text-white">{item.name}</span></div>
                <div className="flex items-center gap-2"><span className="text-[8px] text-slate-400">{item.panels}P • {item.inverters}I</span><Badge className="bg-yellow-500/10 text-[8px] text-yellow-400">{item.power}</Badge></div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="border-slate-700 bg-slate-900/80 p-3">
          <div className="mb-2 flex items-center justify-between"><span className="text-xs font-semibold text-white">Üretim Tesisleri</span><Badge variant="secondary" className="text-[10px]">4 Bina</Badge></div>
          <div className="space-y-1.5">
            {[
              { name: 'Ana Üretim Holü', icon: Factory, detail: '6 MCC • 2 Vinç', power: '3000 kW' },
              { name: 'Montaj Hattı', icon: Cpu, detail: '3 Robot • 4 Pano', power: '1605 kW' },
              { name: 'Hammadde Deposu', icon: Container, detail: 'Raf Sistemi', power: '215 kW' },
              { name: 'Ürün Deposu', icon: Container, detail: 'Otomasyon', power: '240 kW' },
            ].map((item, i) => (
              <div key={i} className="flex items-center justify-between rounded-lg border border-slate-700 bg-slate-800/50 p-2">
                <div className="flex items-center gap-2"><item.icon className="h-3.5 w-3.5 text-blue-400" /><div><span className="text-[10px] font-medium text-white">{item.name}</span><div className="text-[8px] text-slate-500">{item.detail}</div></div></div>
                <Badge className="bg-blue-500/10 text-[8px] text-blue-400">{item.power}</Badge>
              </div>
            ))}
          </div>
        </Card>

        <Card className="border-slate-700 bg-slate-900/80 p-3">
          <div className="mb-2 flex items-center justify-between"><span className="text-xs font-semibold text-white">Altyapı Sistemleri</span><Badge variant="secondary" className="text-[10px]">4 Sistem</Badge></div>
          <div className="space-y-1.5">
            {[
              { name: 'Trafo Merkezi', icon: Zap, detail: '3 Trafo • 5 OG Hücre', value: '7.2 MVA', color: 'text-purple-400' },
              { name: 'Eşanjör Dairesi', icon: Flame, detail: '3 Eşanjör • 3 Sayaç', value: '480 m³/h', color: 'text-orange-400' },
              { name: 'Su Sistemi', icon: Droplets, detail: '2 Tank • 3 Pompa', value: '44 m³/h', color: 'text-cyan-400' },
              { name: 'HVAC Merkezi', icon: Wind, detail: '3 Fan • 2 Chiller', value: '120 kW', color: 'text-teal-400' },
            ].map((item, i) => (
              <div key={i} className="flex items-center justify-between rounded-lg border border-slate-700 bg-slate-800/50 p-2">
                <div className="flex items-center gap-2"><item.icon className={`h-3.5 w-3.5 ${item.color}`} /><div><span className="text-[10px] font-medium text-white">{item.name}</span><div className="text-[8px] text-slate-500">{item.detail}</div></div></div>
                <Badge className="bg-green-500/10 text-[8px] text-green-400">{item.value}</Badge>
              </div>
            ))}
          </div>
        </Card>

        <Card className="border-slate-700 bg-slate-900/80 p-3">
          <div className="mb-2 flex items-center justify-between"><span className="text-xs font-semibold text-white">Veri Noktaları</span><Badge variant="secondary" className="text-[10px]">78 Aktif</Badge></div>
          <div className="grid grid-cols-2 gap-2 text-[10px]">
            {[
              { icon: Zap, label: 'Elektrik Panoları', count: 18 },
              { icon: Sun, label: 'İnverterler', count: 17 },
              { icon: Thermometer, label: 'Sıcaklık Sens.', count: 16 },
              { icon: Gauge, label: 'Basınç/Seviye', count: 10 },
              { icon: Activity, label: 'Debi Sayaçları', count: 9 },
              { icon: Cpu, label: 'Robot/Otomasyon', count: 6 },
              { icon: Wind, label: 'HVAC Üniteleri', count: 5 },
              { icon: Zap, label: 'OG Hücreleri', count: 5 },
            ].map((item, i) => (
              <div key={i} className="rounded border border-slate-700 bg-slate-800/50 p-2">
                <div className="flex items-center gap-1 text-slate-400"><item.icon className="h-3 w-3" /><span>{item.label}</span></div>
                <div className="mt-1 font-bold text-white">{item.count}</div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <Card className="flex-1 overflow-hidden border-slate-700 bg-slate-950">
        <Canvas shadows><Scene /></Canvas>
      </Card>
    </div>
  )
}
