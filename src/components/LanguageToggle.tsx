import { useLanguage, useTranslate } from '../i18n/LanguageContext'

type LanguageToggleProps = {
  className?: string
  compact?: boolean
}

export function LanguageToggle({ className = '', compact = false }: LanguageToggleProps) {
  const { language, setLanguage } = useLanguage()
  const t = useTranslate()

  return (
    <div
      className={`language-toggle ${compact ? 'language-toggle--compact' : ''} ${className}`.trim()}
      role="group"
      aria-label={t('Language selector', 'Перемикач мови')}
    >
      <button
        type="button"
        className={language === 'en' ? 'is-active' : ''}
        aria-pressed={language === 'en'}
        aria-label={t('Switch to English', 'Перемкнути англійською')}
        onClick={() => setLanguage('en')}
      >
        ENG
      </button>
      <span aria-hidden="true">/</span>
      <button
        type="button"
        className={language === 'uk' ? 'is-active' : ''}
        aria-pressed={language === 'uk'}
        aria-label={t('Switch to Ukrainian', 'Перемкнути українською')}
        onClick={() => setLanguage('uk')}
      >
        УКР
      </button>
    </div>
  )
}
