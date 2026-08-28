import { useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Lenis from 'lenis'
import { Portfolio } from './portfolio/Portfolio'
import { ProjectController } from './components/ProjectController'
import { PROJECTS } from './data/projects'
import type { ProjectId } from './types'
import ServiceSite from './projects/service/ServiceSite'
import StoreSite from './projects/store/StoreSite'
import EventsSite from './projects/events/EventsSite'
import RestaurantSite from './projects/restaurant/RestaurantSite'
import EstateSite from './projects/estate/EstateSite'

const PROJECT_COMPONENTS: Record<ProjectId, React.ComponentType> = {
  service: ServiceSite,
  store: StoreSite,
  events: EventsSite,
  restaurant: RestaurantSite,
  estate: EstateSite,
}

export default function App() {
  const [activeProject, setActiveProject] = useState<ProjectId | null>(null)
  const activeIndex = useMemo(
    () => PROJECTS.findIndex((project) => project.id === activeProject),
    [activeProject],
  )

  useEffect(() => {
    let wheelVelocity = 0
    let targetWheelVelocity = 0
    let wheelActive = false
    let inputMode: 'wheel' | 'trackpad' | null = null
    let inputModeUntil = 0

    const stopWheelInertia = () => {
      wheelVelocity = 0
      targetWheelVelocity = 0
      wheelActive = false
    }

    const isDiscreteMouseWheel = (event: WheelEvent) => {
      const now = performance.now()
      if (inputMode && now < inputModeUntil) {
        inputModeUntil = now + 180
        return inputMode === 'wheel'
      }

      const delta = Math.abs(event.deltaY)
      const isFractional = Math.abs(event.deltaY - Math.round(event.deltaY)) > 0.01
      const isWheel = event.deltaMode !== WheelEvent.DOM_DELTA_PIXEL || (!isFractional && delta >= 48)

      inputMode = isWheel ? 'wheel' : 'trackpad'
      inputModeUntil = now + 180
      return isWheel
    }

    let lenis: Lenis
    lenis = new Lenis({
      autoRaf: false,
      smoothWheel: true,
      lerp: 0.065,
      wheelMultiplier: 0.8,
      virtualScroll: ({ deltaX, deltaY, event }) => {
        if (!(event instanceof WheelEvent) || event.ctrlKey) return true

        if (Math.abs(deltaX) > Math.abs(deltaY)) {
          stopWheelInertia()
          return false
        }

        const path = event.composedPath()
        if (path.some((node) => node instanceof HTMLElement && node.hasAttribute('data-lenis-prevent'))) return true

        if (!isDiscreteMouseWheel(event)) {
          stopWheelInertia()
          return false
        }

        if (event.cancelable) event.preventDefault()
        if (!wheelActive) {
          lenis.stop()
          lenis.start()
          wheelActive = true
        }

        targetWheelVelocity = Math.max(
          -48,
          Math.min(48, targetWheelVelocity + Math.max(-160, Math.min(160, deltaY)) * 0.18),
        )
        return false
      },
    })

    let previousTime = performance.now()
    let frameId = 0
    const frame = (time: number) => {
      const frameDelta = Math.min(2.5, Math.max(0.25, (time - previousTime) / (1000 / 60)))
      previousTime = time

      lenis.raf(time)

      if (wheelActive) {
        const acceleration = 1 - Math.pow(0.8, frameDelta)
        wheelVelocity += (targetWheelVelocity - wheelVelocity) * acceleration
        targetWheelVelocity *= Math.pow(0.92, frameDelta)

        const maxScroll = Math.max(0, document.documentElement.scrollHeight - window.innerHeight)
        const nextScroll = Math.max(0, Math.min(maxScroll, window.scrollY + wheelVelocity * frameDelta))
        const atBoundary = nextScroll === window.scrollY && (nextScroll === 0 || nextScroll === maxScroll)

        window.scrollTo(0, nextScroll)

        if (atBoundary || (Math.abs(wheelVelocity) < 0.025 && Math.abs(targetWheelVelocity) < 0.025)) {
          stopWheelInertia()
        }
      }

      frameId = window.requestAnimationFrame(frame)
    }

    frameId = window.requestAnimationFrame(frame)
    window.addEventListener('pointerdown', stopWheelInertia, { passive: true })

    return () => {
      window.cancelAnimationFrame(frameId)
      window.removeEventListener('pointerdown', stopWheelInertia)
      lenis.destroy()
    }
  }, [])

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [activeProject])

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && activeProject) setActiveProject(null)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [activeProject])

  const openProject = (project: ProjectId) => setActiveProject(project)

  const closeProject = () => {
    setActiveProject(null)
    window.setTimeout(() => {
      document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 620)
  }

  const stepProject = (direction: -1 | 1) => {
    const nextIndex = (activeIndex + direction + PROJECTS.length) % PROJECTS.length
    setActiveProject(PROJECTS[nextIndex].id)
  }

  const ActiveSite = activeProject ? PROJECT_COMPONENTS[activeProject] : null
  const project = activeProject ? PROJECTS[activeIndex] : null

  return (
    <AnimatePresence mode="wait" initial={false}>
      {!ActiveSite || !project ? (
        <motion.main
          key="portfolio"
          initial={{ opacity: 0, scale: 0.99 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.985, filter: 'blur(7px)' }}
          transition={{ duration: 0.45, ease: [0.65, 0, 0.35, 1] }}
        >
          <Portfolio onOpenProject={openProject} />
        </motion.main>
      ) : (
        <motion.main
          className="demo-stage"
          key={activeProject}
          initial={{ clipPath: 'inset(100% 0 0 0)', opacity: 0.94 }}
          animate={{ clipPath: 'inset(0% 0 0 0)', opacity: 1 }}
          exit={{ clipPath: 'inset(0 0 100% 0)', opacity: 0.94 }}
          transition={{ duration: 0.62, ease: [0.76, 0, 0.24, 1] }}
        >
          <ActiveSite />
          <ProjectController
            current={activeIndex}
            project={project}
            onBack={closeProject}
            onPrevious={() => stepProject(-1)}
            onNext={() => stepProject(1)}
          />
        </motion.main>
      )}
    </AnimatePresence>
  )
}
