// =============================================================================
// 3 KATLI ENDÜSTRİYEL BİNA SİSTEMİ
// Detaylı cihaz yerleşimi ile profesyonel üretim tesisi
// =============================================================================

import { Html, Sparkles } from '@react-three/drei'
import { 
  ElectrikPanosu, 
  EnerjiSayaci, 
  SicaklikSensoru, 
  HavaKalitesiSensoru,
  BoruSistemi,
  KabloKanali
} from './facility-components'

// =============================================================================
// ANA ÜRETİM BİNASI (3 Katlı)
// =============================================================================
export function DetailedProductionBuilding({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      {/* ===== ZEMIN KAT (Üretim Alanı) ===== */}
      <group position={[0, 0, 0]}>
        {/* Ana yapı */}
        <mesh castShadow receiveShadow position={[0, 2, 0]}>
          <boxGeometry args={[15, 4, 10]} />
          <meshStandardMaterial color="#475569" roughness={0.7} metalness={0.3} />
        </mesh>

        {/* Zemin kat pencereleri */}
        {Array.from({ length: 8 }).map((_, i) => (
          <mesh key={`window-ground-${i}`} position={[-7.51, 1.5 + Math.floor(i / 4) * 2, -4 + (i % 4) * 2.5]} castShadow>
            <boxGeometry args={[0.05, 1.5, 1.5]} />
            <meshStandardMaterial color="#60a5fa" transparent opacity={0.3} roughness={0.1} metalness={0.9} />
          </mesh>
        ))}

        {/* Giriş kapısı */}
        <mesh position={[-7.51, 1.5, 0]} castShadow>
          <boxGeometry args={[0.05, 3, 2.5]} />
          <meshStandardMaterial color="#1e293b" roughness={0.3} metalness={0.7} />
        </mesh>

        {/* ZEMIN KAT - Elektrik Panoları */}
        <ElectrikPanosu position={[-6.5, 1, -4]} name="Ana Dağıtım Panosu" voltage="400V" current="630A" status="active" />
        <ElectrikPanosu position={[-6.5, 1, 4]} name="Üretim Hattı 1" voltage="400V" current="250A" status="active" />
        <ElectrikPanosu position={[6.5, 1, -4]} name="Üretim Hattı 2" voltage="400V" current="250A" status="active" />
        
        {/* ZEMIN KAT - Enerji Sayaçları */}
        <EnerjiSayaci position={[-6, 2, -3]} power="145 kW" type="import" />
        <EnerjiSayaci position={[-6, 2, 3.5]} power="87 kW" type="import" />
        
        {/* ZEMIN KAT - Sıcaklık Sensörleri */}
        <SicaklikSensoru position={[0, 3.5, -4.5]} temperature="24°C" status="normal" />
        <SicaklikSensoru position={[0, 3.5, 4.5]} temperature="26°C" status="normal" />
        <SicaklikSensoru position={[-5, 3.5, 0]} temperature="28°C" status="warning" />
        
        {/* Zemin kat - Hava kalitesi sensörleri */}
        <HavaKalitesiSensoru position={[5, 3.5, 0]} co2Level="420 ppm" humidity="45%" />

        {/* Zemin kat - Kablo kanalları (elektrik hatları) */}
        <KabloKanali start={[-6.5, 3.8, -4]} end={[-6.5, 3.8, 4]} cableCount={4} />
        <KabloKanali start={[-6.5, 3.8, 0]} end={[6.5, 3.8, 0]} cableCount={5} />
      </group>

      {/* ===== 1. KAT (Ofisler ve Kontrol Odası) ===== */}
      <group position={[0, 4, 0]}>
        {/* 1. Kat yapısı */}
        <mesh castShadow receiveShadow position={[0, 2, 0]}>
          <boxGeometry args={[15, 4, 10]} />
          <meshStandardMaterial color="#64748b" roughness={0.6} metalness={0.4} />
        </mesh>

        {/* 1. Kat pencereleri - daha fazla */}
        {Array.from({ length: 12 }).map((_, i) => (
          <mesh key={`window-first-${i}`} position={[-7.51, 1.5 + Math.floor(i / 6) * 2, -4.5 + (i % 6) * 1.8]} castShadow>
            <boxGeometry args={[0.05, 1.2, 1.2]} />
            <meshStandardMaterial color="#60a5fa" transparent opacity={0.4} roughness={0.1} metalness={0.9} />
          </mesh>
        ))}

        {/* 1. KAT - Elektrik Panoları (Ofis dağıtımı) */}
        <ElectrikPanosu position={[-6.5, 1, -3]} name="Ofis Dağıtım" voltage="230V" current="100A" status="active" />
        <ElectrikPanosu position={[6.5, 1, 3]} name="HVAC Panosu" voltage="400V" current="80A" status="active" />
        
        {/* 1. KAT - Kontrol odası ekipmanları */}
        <mesh position={[0, 0.5, 4.5]} castShadow>
          <boxGeometry args={[3, 1, 0.5]} />
          <meshStandardMaterial color="#1e293b" emissive="#3b82f6" emissiveIntensity={0.2} />
        </mesh>
        
        {/* 1. KAT - Sensörler */}
        <SicaklikSensoru position={[-3, 3.5, 0]} temperature="22°C" status="normal" />
        <SicaklikSensoru position={[3, 3.5, 0]} temperature="21°C" status="normal" />
        <HavaKalitesiSensoru position={[0, 3.5, -4.5]} co2Level="380 ppm" humidity="42%" />

        {/* 1. kat - Kablo kanalları */}
        <KabloKanali start={[-6.5, 3.8, -3]} end={[6.5, 3.8, -3]} cableCount={3} />
        <KabloKanali start={[0, 3.8, -4.5]} end={[0, 3.8, 4.5]} cableCount={3} />
      </group>

      {/* ===== 2. KAT (Sunucu Odası & Yedek Jeneratör) ===== */}
      <group position={[0, 8, 0]}>
        {/* 2. Kat yapısı */}
        <mesh castShadow receiveShadow position={[0, 2, 0]}>
          <boxGeometry args={[15, 4, 10]} />
          <meshStandardMaterial color="#475569" roughness={0.6} metalness={0.4} />
        </mesh>

        {/* 2. Kat pencereleri - daha küçük (teknik kat) */}
        {Array.from({ length: 6 }).map((_, i) => (
          <mesh key={`window-second-${i}`} position={[-7.51, 2, -3 + (i % 3) * 3]} castShadow>
            <boxGeometry args={[0.05, 0.8, 0.8]} />
            <meshStandardMaterial color="#60a5fa" transparent opacity={0.3} roughness={0.1} metalness={0.9} />
          </mesh>
        ))}

        {/* 2. KAT - Sunucu odası elektrik sistemleri */}
        <ElectrikPanosu position={[-6, 1, 0]} name="Sunucu UPS" voltage="230V" current="200A" status="active" />
        <ElectrikPanosu position={[6, 1, 0]} name="Jeneratör ATS" voltage="400V" current="500A" status="active" />
        
        {/* 2. KAT - Yedek jeneratör (çatıda) */}
        <group position={[5, 0.8, 3]}>
          <mesh castShadow>
            <boxGeometry args={[2.5, 1.5, 1.2]} />
            <meshStandardMaterial color="#ef4444" roughness={0.4} metalness={0.6} />
          </mesh>
          <Html position={[0, 1.5, 0]} center distanceFactor={18}>
            <div className="pointer-events-none">
              <div className="rounded border border-red-500/30 bg-black/80 px-2 py-1 backdrop-blur-sm">
                <span className="text-[8px] font-bold text-red-400">Jeneratör 500 kVA</span>
              </div>
            </div>
          </Html>
        </group>

        {/* 2. KAT - Sunucu kabinleri */}
        {[-2, 0, 2].map((x, i) => (
          <group key={`server-${i}`} position={[x, 1, -3]}>
            <mesh castShadow>
              <boxGeometry args={[0.8, 2, 1]} />
              <meshStandardMaterial color="#0f172a" emissive="#3b82f6" emissiveIntensity={0.3} />
            </mesh>
            {/* LED ışıkları */}
            {Array.from({ length: 6 }).map((_, j) => (
              <mesh key={j} position={[0.35, 0.8 - j * 0.3, 0.51]}>
                <sphereGeometry args={[0.02, 8, 8]} />
                <meshStandardMaterial 
                  color={j % 2 === 0 ? '#22c55e' : '#3b82f6'} 
                  emissive={j % 2 === 0 ? '#22c55e' : '#3b82f6'} 
                  emissiveIntensity={2} 
                />
              </mesh>
            ))}
          </group>
        ))}

        {/* 2. KAT - Soğutma sensörleri */}
        <SicaklikSensoru position={[-5, 3.5, -3]} temperature="18°C" status="normal" />
        <SicaklikSensoru position={[5, 3.5, -3]} temperature="19°C" status="normal" />
        <SicaklikSensoru position={[5, 2, 3]} temperature="65°C" status="critical" />

        {/* 2. kat - Kablo kanalları (ağ ve güç) */}
        <KabloKanali start={[-6, 3.8, 0]} end={[6, 3.8, 0]} cableCount={6} />
        <KabloKanali start={[0, 0.5, -3]} end={[0, 3.8, -3]} cableCount={4} />
      </group>

      {/* ===== ÇATI SİSTEMLERİ ===== */}
      <group position={[0, 12, 0]}>
        {/* Çatı */}
        <mesh castShadow receiveShadow position={[0, 0.2, 0]}>
          <boxGeometry args={[15.5, 0.4, 10.5]} />
          <meshStandardMaterial color="#1e293b" roughness={0.5} metalness={0.5} />
        </mesh>

        {/* HVAC üniteleri */}
        {[-4, 0, 4].map((x, i) => (
          <group key={`hvac-${i}`} position={[x, 0.8, 0]}>
            <mesh castShadow>
              <boxGeometry args={[2, 1.2, 2]} />
              <meshStandardMaterial color="#64748b" roughness={0.4} metalness={0.6} />
            </mesh>
            {/* Fan */}
            <mesh position={[0, 0.7, 0]} castShadow>
              <cylinderGeometry args={[0.7, 0.7, 0.2, 32]} />
              <meshStandardMaterial color="#94a3b8" roughness={0.3} metalness={0.7} />
            </mesh>
            <Sparkles position={[0, 1.5, 0]} count={10} scale={1.5} size={1.5} speed={0.5} opacity={0.2} color="#60a5fa" />
          </group>
        ))}

        {/* Yıldırım direği */}
        <mesh position={[0, 3, 0]} castShadow>
          <cylinderGeometry args={[0.05, 0.08, 6, 8]} />
          <meshStandardMaterial color="#94a3b8" roughness={0.2} metalness={0.9} />
        </mesh>
        <mesh position={[0, 6.3, 0]} castShadow>
          <coneGeometry args={[0.15, 0.6, 8]} />
          <meshStandardMaterial color="#fbbf24" roughness={0.2} metalness={0.9} />
        </mesh>

        {/* Çatı sensörleri */}
        <SicaklikSensoru position={[-6, 1, 0]} temperature="15°C" status="normal" />
        <HavaKalitesiSensoru position={[6, 1, 0]} co2Level="410 ppm" humidity="38%" />
      </group>

      {/* ===== BORU SİSTEMLERİ (Binanın dış cephesi) ===== */}
      {/* Sıcak su boruları (kırmızı) */}
      <BoruSistemi 
        points={[
          [-8, 0, -5] as [number, number, number],
          [-8, 4, -5] as [number, number, number],
          [-8, 8, -5] as [number, number, number],
          [-8, 12, -5] as [number, number, number],
        ]} 
        color="#dc2626" 
        diameter={0.25} 
        type="hot-water" 
      />

      {/* Soğuk su boruları (mavi) */}
      <BoruSistemi 
        points={[
          [-8, 0, 5] as [number, number, number],
          [-8, 4, 5] as [number, number, number],
          [-8, 8, 5] as [number, number, number],
          [-8, 12, 5] as [number, number, number],
        ]} 
        color="#3b82f6" 
        diameter={0.2} 
        type="water" 
      />

      {/* Doğalgaz boruları (sarı) */}
      <BoruSistemi 
        points={[
          [8, 0, 0] as [number, number, number],
          [8, 4, 0] as [number, number, number],
          [8, 8, 0] as [number, number, number],
        ]} 
        color="#fbbf24" 
        diameter={0.12} 
        type="gas" 
      />

      {/* Bina etiketi */}
      <Html position={[0, 15, 0]} center distanceFactor={20}>
        <div className="pointer-events-none">
          <div className="rounded-lg border border-blue-500/30 bg-slate-900/95 px-3 py-2 shadow-2xl backdrop-blur-sm">
            <div className="flex flex-col items-center gap-1">
              <span className="text-[11px] font-bold text-white">Üretim Tesisi</span>
              <span className="text-[8px] text-slate-400">3 Kat • 15m × 10m × 12m</span>
              <div className="mt-1 flex gap-2 text-[7px]">
                <span className="text-green-400">● 24 Cihaz Aktif</span>
                <span className="text-blue-400">● 345 kW</span>
              </div>
            </div>
          </div>
        </div>
      </Html>
    </group>
  )
}
