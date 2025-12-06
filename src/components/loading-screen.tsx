import { useEffect, useState } from 'react'
import strLogo from '@/assets/str-logo0.png'

interface LoadingScreenProps {
  isLoading?: boolean
}

export function LoadingScreen({ isLoading = true }: LoadingScreenProps) {
  const [isVisible, setIsVisible] = useState(isLoading)
  const [logoLoaded, setLogoLoaded] = useState(false)

  useEffect(() => {
    if (!isLoading) {
      setIsVisible(false)
      setLogoLoaded(false)
      return
    }

    setIsVisible(true)
    
    // Logo animasyonu başlasın
    setTimeout(() => setLogoLoaded(true), 100)
    
    // 2.5 saniye sonra kapat
    const hideTimeout = setTimeout(() => setIsVisible(false), 2500)

    return () => clearTimeout(hideTimeout)
  }, [isLoading])

  if (!isVisible) return null

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center">
      {/* Blurlu arka plan */}
      <div className="absolute inset-0 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-xl" />

      {/* 3D Logo */}
      <div 
        className="relative z-10"
        style={{
          perspective: '1000px',
        }}
      >
        <img 
          src={strLogo} 
          alt="STR Enerji" 
          className="h-56 w-auto"
          style={{
            transform: logoLoaded 
              ? 'rotateY(0deg) rotateX(0deg) scale(1)' 
              : 'rotateY(-30deg) rotateX(10deg) scale(0.8)',
            opacity: logoLoaded ? 1 : 0,
            transition: 'all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)',
            transformStyle: 'preserve-3d',
            filter: 'drop-shadow(0 25px 50px rgba(0, 0, 0, 0.25))',
            animation: logoLoaded ? 'float3D 3s ease-in-out infinite' : 'none',
          }}
        />
      </div>

      {/* 3D float animasyonu */}
      <style>{`
        @keyframes float3D {
          0%, 100% {
            transform: rotateY(0deg) rotateX(0deg) translateY(0px);
          }
          25% {
            transform: rotateY(3deg) rotateX(-2deg) translateY(-8px);
          }
          50% {
            transform: rotateY(0deg) rotateX(0deg) translateY(0px);
          }
          75% {
            transform: rotateY(-3deg) rotateX(2deg) translateY(-8px);
          }
        }
      `}</style>
    </div>
  )
}
