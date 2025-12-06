import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { translations, type Language, type TranslationKey } from './translations'

interface LanguageState {
  language: Language
  isChangingLanguage: boolean
  setLanguage: (lang: Language) => void
  setIsChangingLanguage: (value: boolean) => void
  t: (key: TranslationKey) => string
}

export const useLanguage = create<LanguageState>()(
  persist(
    (set, get) => ({
      language: 'tr',
      isChangingLanguage: false,
      setLanguage: (lang: Language) => {
        set({ isChangingLanguage: true })
        // Kısa bir gecikme ile dil değişikliğini uygula
        setTimeout(() => {
          set({ language: lang })
          setTimeout(() => {
            set({ isChangingLanguage: false })
          }, 1500)
        }, 100)
      },
      setIsChangingLanguage: (value: boolean) => set({ isChangingLanguage: value }),
      t: (key: TranslationKey) => {
        const { language } = get()
        return translations[language][key] || key
      },
    }),
    {
      name: 'str-language',
      partialize: (state) => ({ language: state.language }),
    }
  )
)