// Profesyonel grafik yapılandırmaları
export const chartColors = {
  // Ana renkler
  primary: {
    main: '#3b82f6',
    light: '#60a5fa',
    dark: '#2563eb',
    gradient: ['#3b82f6', '#1d4ed8'],
  },
  secondary: {
    main: '#10b981',
    light: '#34d399',
    dark: '#059669',
    gradient: ['#10b981', '#047857'],
  },
  warning: {
    main: '#f59e0b',
    light: '#fbbf24',
    dark: '#d97706',
    gradient: ['#f59e0b', '#b45309'],
  },
  danger: {
    main: '#ef4444',
    light: '#f87171',
    dark: '#dc2626',
    gradient: ['#ef4444', '#b91c1c'],
  },
  purple: {
    main: '#8b5cf6',
    light: '#a78bfa',
    dark: '#7c3aed',
    gradient: ['#8b5cf6', '#6d28d9'],
  },
  cyan: {
    main: '#06b6d4',
    light: '#22d3ee',
    dark: '#0891b2',
    gradient: ['#06b6d4', '#0e7490'],
  },
  orange: {
    main: '#f97316',
    light: '#fb923c',
    dark: '#ea580c',
    gradient: ['#f97316', '#c2410c'],
  },
}

// Enerji türlerine göre renkler
export const energyColors = {
  elektrik: '#3b82f6',
  dogalgaz: '#f97316',
  su: '#06b6d4',
  solar: '#f59e0b',
  batarya: '#8b5cf6',
  sebeке: '#ef4444',
  uretim: '#10b981',
  tuketim: '#3b82f6',
}

// Grafik genel ayarları
export const chartDefaults = {
  // Grid çizgileri
  grid: {
    strokeDasharray: '3 3',
    stroke: 'hsl(var(--border))',
    strokeOpacity: 0.5,
  },
  // Eksen stilleri
  axis: {
    stroke: 'hsl(var(--muted-foreground))',
    fontSize: 11,
    fontFamily: 'Inter, system-ui, sans-serif',
    tickLine: false,
    axisLine: false,
  },
  // Legend stilleri
  legend: {
    iconType: 'circle' as const,
    iconSize: 8,
    wrapperStyle: {
      paddingTop: 16,
    },
  },
  // Animasyon
  animation: {
    duration: 800,
    easing: 'ease-out',
  },
}

// Gradyan tanımları
export const gradientDefs = {
  blue: {
    id: 'blueGradient',
    colors: [
      { offset: '0%', color: '#3b82f6', opacity: 0.4 },
      { offset: '100%', color: '#3b82f6', opacity: 0.05 },
    ],
  },
  green: {
    id: 'greenGradient',
    colors: [
      { offset: '0%', color: '#10b981', opacity: 0.4 },
      { offset: '100%', color: '#10b981', opacity: 0.05 },
    ],
  },
  orange: {
    id: 'orangeGradient',
    colors: [
      { offset: '0%', color: '#f97316', opacity: 0.4 },
      { offset: '100%', color: '#f97316', opacity: 0.05 },
    ],
  },
  purple: {
    id: 'purpleGradient',
    colors: [
      { offset: '0%', color: '#8b5cf6', opacity: 0.4 },
      { offset: '100%', color: '#8b5cf6', opacity: 0.05 },
    ],
  },
  cyan: {
    id: 'cyanGradient',
    colors: [
      { offset: '0%', color: '#06b6d4', opacity: 0.4 },
      { offset: '100%', color: '#06b6d4', opacity: 0.05 },
    ],
  },
  yellow: {
    id: 'yellowGradient',
    colors: [
      { offset: '0%', color: '#f59e0b', opacity: 0.4 },
      { offset: '100%', color: '#f59e0b', opacity: 0.05 },
    ],
  },
}

// Responsive container boyutları
export const chartHeights = {
  sm: 200,
  md: 280,
  lg: 350,
  xl: 420,
}

// Profesyonel grafik temaları
export const chartThemes = {
  light: {
    background: '#ffffff',
    text: '#1f2937',
    grid: '#e5e7eb',
    tooltip: {
      background: '#ffffff',
      border: '#e5e7eb',
      shadow: '0 10px 40px rgba(0, 0, 0, 0.1)',
    },
  },
  dark: {
    background: '#0f172a',
    text: '#f1f5f9',
    grid: '#334155',
    tooltip: {
      background: '#1e293b',
      border: '#475569',
      shadow: '0 10px 40px rgba(0, 0, 0, 0.5)',
    },
  },
}
