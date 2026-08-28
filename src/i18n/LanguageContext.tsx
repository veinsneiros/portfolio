import { createContext, useContext, useEffect, useLayoutEffect, useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import { localizeDom, observeLocalizedDom } from './runtimeTranslations'

export type Language = 'en' | 'uk'

type LanguageContextValue = {
  language: Language
  setLanguage: (language: Language) => void
}

const LanguageContext = createContext<LanguageContextValue | null>(null)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>(() => {
    const saved = window.localStorage.getItem('atelier-language')
    return saved === 'uk' ? 'uk' : 'en'
  })

  useEffect(() => {
    window.localStorage.setItem('atelier-language', language)
    document.documentElement.lang = language === 'uk' ? 'uk' : 'en'
    document.title = language === 'uk'
      ? 'Atelier Nineteen — цифрові досвіди'
      : 'Atelier Nineteen — Digital experiences'
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute(
        'content',
        language === 'uk'
          ? 'Atelier Nineteen — цифрові досвіди для амбітних компаній.'
          : 'Atelier Nineteen — digital experiences for ambitious businesses.',
      )
  }, [language])

  useLayoutEffect(() => {
    const root = document.getElementById('root')
    if (!root) return

    localizeDom(root, language)
    return observeLocalizedDom(root, language)
  }, [language])

  const value = useMemo(() => ({ language, setLanguage }), [language])

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) throw new Error('useLanguage must be used inside LanguageProvider')
  return context
}

export function useTranslate() {
  const { language } = useLanguage()
  return (english: string, ukrainian: string) => language === 'uk' ? ukrainian : english
}
