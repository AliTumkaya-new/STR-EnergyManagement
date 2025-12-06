// =============================================================================
// PROFESSIONAL DESIGN SYSTEM - STR Enerji v2
// =============================================================================
// Bu dosya tüm sayfalarda tutarlı, profesyonel bir görünüm sağlamak için
// kullanılacak stil konfigürasyonlarını içerir.
// Uyarılar, bildirimler ve sinyaller hariç tüm renkler nötr tonlarda olmalıdır.
// =============================================================================

// Profesyonel kart stilleri - Renkli gradientler yerine nötr tonlar
export const cardStyles = {
  // Ana metrik kartları için
  primary: 'border bg-card shadow-sm hover:shadow-md transition-shadow',
  // Vurgulu kartlar için
  elevated: 'border bg-card shadow-md hover:shadow-lg transition-shadow',
  // Şeffaf/hafif kartlar için
  subtle: 'border bg-muted/30 shadow-sm',
  // Aktif/seçili kartlar için
  active: 'border-2 border-primary bg-card shadow-md',
}

// Profesyonel ikon container stilleri
export const iconContainerStyles = {
  // Ana ikon kutusu - nötr
  primary: 'flex items-center justify-center size-12 rounded-xl bg-muted/50 border border-border/50',
  // Küçük ikon kutusu
  small: 'flex items-center justify-center size-10 rounded-lg bg-muted/50 border border-border/50',
  // Inline ikon kutusu
  inline: 'p-2 rounded-lg bg-muted/50',
}

// Profesyonel metin renkleri - Nötr tonlar
export const textColors = {
  // Başlık metinleri
  title: 'text-foreground',
  // Alt başlıklar
  subtitle: 'text-muted-foreground',
  // Değerler/sayılar
  value: 'text-foreground font-bold',
  // Etiketler
  label: 'text-xs font-medium text-muted-foreground',
  // Birimler
  unit: 'text-xs text-muted-foreground',
}

// Trend göstergeleri - Sadece bunlar renkli olabilir (uyarı/bilgi amaçlı)
export const trendColors = {
  positive: 'text-green-600 dark:text-green-500',
  negative: 'text-red-600 dark:text-red-500',
  neutral: 'text-muted-foreground',
  warning: 'text-amber-600 dark:text-amber-500',
}

// Uyarı/Bildirim stilleri - Bu renkler korunacak
export const alertStyles = {
  critical: 'bg-red-50 dark:bg-red-950/30 border-red-200 dark:border-red-800 text-red-700 dark:text-red-400',
  warning: 'bg-amber-50 dark:bg-amber-950/30 border-amber-200 dark:border-amber-800 text-amber-700 dark:text-amber-400',
  info: 'bg-blue-50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-400',
  success: 'bg-green-50 dark:bg-green-950/30 border-green-200 dark:border-green-800 text-green-700 dark:text-green-400',
}

// Badge stilleri - Durumlar için renk korunur
export const badgeStyles = {
  // Profesyonel nötr badge'ler
  default: 'bg-muted text-muted-foreground border-border',
  // Aktif durum
  active: 'bg-primary/10 text-primary border-primary/20',
  // Durum badge'leri (renkli - uyarı amaçlı)
  online: 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 border-green-200 dark:border-green-800',
  offline: 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 border-red-200 dark:border-red-800',
  warning: 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 border-amber-200 dark:border-amber-800',
}

// Grafik renkleri - Profesyonel palete
export const chartColors = {
  // Ana veri serisi
  primary: 'hsl(var(--primary))',
  // İkincil veri serisi
  secondary: 'hsl(var(--muted-foreground))',
  // Aksan renk
  accent: 'hsl(var(--accent-foreground))',
  // Tahmin/projeksiyon çizgileri
  forecast: 'hsl(var(--muted-foreground) / 0.6)',
  // Grid çizgileri
  grid: 'hsl(var(--border))',
}

// Sayfa başlığı stilleri
export const pageHeaderStyles = {
  container: 'flex items-center gap-4',
  iconBox: 'flex items-center justify-center size-12 rounded-xl bg-muted/50 border border-border/50',
  icon: 'size-6 text-foreground',
  title: 'text-2xl font-bold tracking-tight text-foreground',
  subtitle: 'text-sm text-muted-foreground',
}

// Stat kart içeriği
export const statCardContent = {
  container: 'p-4',
  header: 'flex items-start justify-between',
  label: 'text-xs font-medium text-muted-foreground uppercase tracking-wide',
  value: 'text-3xl font-bold text-foreground mt-1',
  unit: 'text-xs text-muted-foreground mt-1',
  iconBox: 'p-2 rounded-lg bg-muted/50',
  icon: 'h-5 w-5 text-muted-foreground',
  trend: 'flex items-center gap-1 mt-3',
}
