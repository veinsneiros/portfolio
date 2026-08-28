import { ArrowLeft, ArrowRight, Grid2X2 } from 'lucide-react'
import { motion } from 'framer-motion'
import type { ProjectMeta } from '../types'
import { LanguageToggle } from './LanguageToggle'
import { useLanguage } from '../i18n/LanguageContext'

type ProjectControllerProps = {
  current: number
  project: ProjectMeta
  onBack: () => void
  onPrevious: () => void
  onNext: () => void
}

export function ProjectController({
  current,
  project,
  onBack,
  onPrevious,
  onNext,
}: ProjectControllerProps) {
  const { language } = useLanguage()
  const allProjects = language === 'uk' ? 'Усі проєкти' : 'All projects'

  return (
    <motion.aside
      className="project-controller"
      style={{ '--controller-accent': project.color } as React.CSSProperties}
      initial={{ y: 36, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.55, duration: 0.45 }}
      aria-label="Portfolio project controls"
    >
      <button onClick={onPrevious} aria-label="Previous project">
        <ArrowLeft size={16} strokeWidth={1.6} />
      </button>
      <button className="project-controller__all" onClick={onBack}>
        <Grid2X2 size={13} strokeWidth={1.8} />
        <span>{allProjects}</span>
      </button>
      <span className="project-controller__count" aria-label={`Project ${current + 1} of 5`}>
        {String(current + 1).padStart(2, '0')} / 05
      </span>
      <LanguageToggle compact />
      <button onClick={onNext} aria-label="Next project">
        <ArrowRight size={16} strokeWidth={1.6} />
      </button>
    </motion.aside>
  )
}
