import { FormEvent, useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import {
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  Check,
  ChevronLeft,
  Menu,
  Minus,
  Plus,
  X,
} from 'lucide-react'
import './service.css'

type Project = {
  name: string
  location: string
  type: string
  year: string
  image: string
  note: string
}

const services = [
  {
    number: '01',
    title: 'Interior architecture',
    copy: 'Spatial planning, material direction and architectural detailing—resolved as one quiet, coherent whole.',
  },
  {
    number: '02',
    title: 'Furniture & objects',
    copy: 'Bespoke joinery, collectible pieces and everyday objects selected for tactility, longevity and soul.',
  },
  {
    number: '03',
    title: 'Creative stewardship',
    copy: 'A considered hand from first sketch to final installation, coordinating makers, trades and every last detail.',
  },
]

const projects: Project[] = [
  {
    name: 'House in the Dunes',
    location: 'Comporta, Portugal',
    type: 'Residential',
    year: '2025',
    image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=2000&q=90',
    note: 'A coastal retreat shaped by filtered light, sand-washed oak and the slow rhythm of the Atlantic.',
  },
  {
    name: 'Belgravia Residence',
    location: 'London, UK',
    type: 'Residential',
    year: '2024',
    image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1800&q=90',
    note: 'A Georgian townhouse rebalanced with sculptural plaster, aged brass and a collection built over generations.',
  },
  {
    name: 'Casa Orilla',
    location: 'Mallorca, Spain',
    type: 'Hospitality',
    year: '2024',
    image: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1800&q=90',
    note: 'An intimate guesthouse where monolithic stone meets woven fibres, limewash and Mediterranean shade.',
  },
]

const process = [
  ['I', 'Listen', 'We begin with how you live—not a prescribed look.'],
  ['II', 'Distil', 'We edit the brief into a clear spatial and material idea.'],
  ['III', 'Compose', 'Architecture, objects and light are developed in concert.'],
  ['IV', 'Realise', 'We steward every decision through making and installation.'],
]

const navItems = [
  ['Studio', 'mv-studio'],
  ['Services', 'mv-services'],
  ['Work', 'mv-work'],
  ['Process', 'mv-process'],
]

const reveal = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0 },
}

export default function ServiceSite() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeService, setActiveService] = useState(0)
  const [activeProject, setActiveProject] = useState<Project | null>(null)
  const [formOpen, setFormOpen] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    setMenuOpen(false)
  }

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMenuOpen(false)
        setActiveProject(null)
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])

  const submitInquiry = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setSubmitted(true)
  }

  return (
    <div className="mv-site">
      <header className="mv-header">
        <button className="mv-wordmark" type="button" onClick={() => scrollTo('mv-top')} aria-label="Maison Vale, home">
          <span>Maison</span><span>Vale</span>
        </button>

        <nav className="mv-nav" aria-label="Maison Vale navigation">
          {navItems.map(([label, id]) => (
            <button type="button" onClick={() => scrollTo(id)} key={id}>{label}</button>
          ))}
        </nav>

        <button className="mv-inquire-link" type="button" onClick={() => scrollTo('mv-inquiry')}>
          Begin a project <ArrowUpRight size={15} />
        </button>
        <button
          className="mv-menu-button"
          type="button"
          onClick={() => setMenuOpen((open) => !open)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
        >
          {menuOpen ? <X /> : <Menu />}
        </button>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="mv-mobile-menu"
            initial={{ clipPath: 'inset(0 0 100% 0)' }}
            animate={{ clipPath: 'inset(0 0 0% 0)' }}
            exit={{ clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.42, ease: [0.76, 0, 0.24, 1] }}
          >
            {navItems.map(([label, id], index) => (
              <motion.button
                key={id}
                type="button"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.08 + index * 0.06 }}
                onClick={() => scrollTo(id)}
              >
                <span>0{index + 1}</span>{label}
              </motion.button>
            ))}
            <button type="button" className="mv-mobile-inquire" onClick={() => scrollTo('mv-inquiry')}>Begin a project</button>
          </motion.div>
        )}
      </AnimatePresence>

      <main>
        <section className="mv-hero" id="mv-top">
          <div className="mv-hero-copy">
            <motion.p
              className="mv-kicker"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.15, duration: 0.8 }}
            >
              Interior architecture · London & beyond
            </motion.p>
            <h1>
              <motion.span initial={{ y: '110%' }} animate={{ y: 0 }} transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}>
                Rooms with
              </motion.span>
              <motion.span initial={{ y: '110%' }} animate={{ y: 0 }} transition={{ duration: 0.8, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}>
                a quiet <em>pulse.</em>
              </motion.span>
            </h1>
            <motion.div
              className="mv-hero-bottom"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.7 }}
            >
              <p>We create soulful interiors for people who value restraint, character and the beautifully unexpected.</p>
              <button type="button" onClick={() => scrollTo('mv-work')}>
                Explore our work <ArrowDownRight size={18} />
              </button>
            </motion.div>
          </div>
          <motion.div
            className="mv-hero-image-wrap"
            initial={{ clipPath: 'inset(100% 0 0 0)' }}
            animate={{ clipPath: 'inset(0% 0 0 0)' }}
            transition={{ duration: 1.15, delay: 0.2, ease: [0.76, 0, 0.24, 1] }}
          >
            <motion.img
              initial={{ scale: 1.12 }}
              animate={{ scale: 1 }}
              transition={{ duration: 1.7, ease: [0.22, 1, 0.36, 1] }}
              src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=2000&q=90"
              alt="Warm modern living room with sculptural furniture"
            />
            <span className="mv-image-caption">Hampstead House · 2025</span>
          </motion.div>
        </section>

        <section className="mv-intro" id="mv-studio">
          <motion.div
            className="mv-section-index"
            variants={reveal}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.65 }}
          >
            <span>01</span><span>The studio</span>
          </motion.div>
          <motion.div
            className="mv-intro-copy"
            variants={reveal}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8 }}
          >
            <p className="mv-intro-lead">A home should feel collected, not decorated.</p>
            <div>
              <p>Maison Vale is a London-based interior architecture studio founded by Elise Vale. We shape enduring spaces through an instinctive dialogue between architecture, art and the rituals of daily life.</p>
              <p>Our work is calm but never anonymous—layered with natural materials, honest craft and moments that reveal themselves slowly.</p>
            </div>
          </motion.div>
        </section>

        <section className="mv-services" id="mv-services">
          <div className="mv-section-index mv-section-index-light">
            <span>02</span><span>What we do</span>
          </div>
          <div className="mv-services-heading">
            <h2>One vision,<br /><em>fully considered.</em></h2>
            <p>From the architecture of a room to the object on a table, we hold the entire story.</p>
          </div>
          <div className="mv-service-list">
            {services.map((service, index) => {
              const isActive = activeService === index
              return (
                <motion.button
                  className={`mv-service-row ${isActive ? 'is-active' : ''}`}
                  key={service.title}
                  type="button"
                  onClick={() => setActiveService(isActive ? -1 : index)}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.08 }}
                  aria-expanded={isActive}
                >
                  <span className="mv-service-number">{service.number}</span>
                  <span className="mv-service-title">{service.title}</span>
                  <AnimatePresence initial={false}>
                    {isActive && (
                      <motion.span
                        className="mv-service-copy"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                      >
                        {service.copy}
                      </motion.span>
                    )}
                  </AnimatePresence>
                  <span className="mv-service-icon">{isActive ? <Minus /> : <Plus />}</span>
                </motion.button>
              )
            })}
          </div>
        </section>

        <section className="mv-work" id="mv-work">
          <div className="mv-section-index">
            <span>03</span><span>Selected work</span>
          </div>
          <div className="mv-work-title">
            <h2>Spaces that feel<br /><em>inevitable.</em></h2>
            <span>2019—2026</span>
          </div>
          <div className="mv-project-grid">
            {projects.map((project, index) => (
              <motion.button
                type="button"
                className={`mv-project mv-project-${index + 1}`}
                key={project.name}
                onClick={() => setActiveProject(project)}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.18 }}
                transition={{ duration: 0.75 }}
              >
                <span className="mv-project-image">
                  <img src={project.image} alt={`${project.name}, ${project.location}`} />
                  <span className="mv-view-project"><ArrowUpRight size={18} /> View project</span>
                </span>
                <span className="mv-project-meta">
                  <span><strong>{project.name}</strong><small>{project.location}</small></span>
                  <span><small>{project.type}</small><small>{project.year}</small></span>
                </span>
              </motion.button>
            ))}
          </div>
        </section>

        <section className="mv-process" id="mv-process">
          <div className="mv-process-image">
            <img src="https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1600&q=88" alt="Handcrafted interior materials and furniture" />
            <span>Material study · Chalk, oak, linen</span>
          </div>
          <div className="mv-process-content">
            <div className="mv-section-index"><span>04</span><span>Our process</span></div>
            <h2>Rigour,<br /><em>with feeling.</em></h2>
            <div className="mv-process-steps">
              {process.map(([number, title, copy]) => (
                <div className="mv-process-step" key={number}>
                  <span>{number}</span><strong>{title}</strong><p>{copy}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mv-testimonial">
          <motion.blockquote
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.8 }}
          >
            “Elise understood the way we wanted to live before we had the words for it. The result feels entirely ours—only more beautiful.”
          </motion.blockquote>
          <div className="mv-testimonial-meta">
            <span>Private client</span><span>Hampstead, London</span><span>2025</span>
          </div>
        </section>

        <section className="mv-inquiry" id="mv-inquiry">
          <div className="mv-inquiry-top">
            <p>Have a place in mind?</p>
            <h2>Let’s create a home<br />that feels <em>like you.</em></h2>
          </div>
          <AnimatePresence mode="wait">
            {!formOpen ? (
              <motion.button
                key="start"
                className="mv-start-project"
                type="button"
                onClick={() => setFormOpen(true)}
                exit={{ opacity: 0, y: -12 }}
              >
                <span>Begin an inquiry</span><ArrowRight />
              </motion.button>
            ) : submitted ? (
              <motion.div
                key="success"
                className="mv-inquiry-success"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <span><Check /></span>
                <div><strong>Thank you.</strong><p>Your note is with the studio. We’ll be in touch within two working days.</p></div>
                <button type="button" onClick={() => { setSubmitted(false); setFormOpen(false) }}>Close</button>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                className="mv-inquiry-form"
                onSubmit={submitInquiry}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <label>Your name<input name="name" autoComplete="name" required placeholder="Name" /></label>
                <label>Email address<input name="email" type="email" autoComplete="email" required placeholder="you@domain.com" /></label>
                <label>Project location<input name="location" required placeholder="City, country" /></label>
                <label>Project type<select name="type" required defaultValue=""><option value="" disabled>Select one</option><option>Full residence</option><option>Selected rooms</option><option>Hospitality</option><option>Other</option></select></label>
                <label className="mv-form-message">Tell us a little about the project<textarea name="message" required rows={4} placeholder="Scope, timing and what brought you to us…" /></label>
                <div className="mv-form-actions">
                  <button type="button" onClick={() => setFormOpen(false)}><ChevronLeft size={16} /> Back</button>
                  <button type="submit">Send inquiry <ArrowUpRight size={17} /></button>
                </div>
              </motion.form>
            )}
          </AnimatePresence>
        </section>
      </main>

      <footer className="mv-footer">
        <button className="mv-footer-logo" type="button" onClick={() => scrollTo('mv-top')}><span>M</span><span>V</span></button>
        <div><span>London</span><span>+44 (0)20 7946 0352</span><a href="mailto:studio@maisonvale.com">studio@maisonvale.com</a></div>
        <div><span>Follow</span><a href="https://www.instagram.com/" target="_blank" rel="noreferrer">Instagram ↗</a><a href="https://www.pinterest.com/" target="_blank" rel="noreferrer">Pinterest ↗</a></div>
        <div className="mv-footer-legal"><span>© Maison Vale 2026</span><span>London · Lisbon · Elsewhere</span></div>
      </footer>

      <AnimatePresence>
        {activeProject && (
          <motion.div
            className="mv-project-modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            role="dialog"
            aria-modal="true"
            aria-label={`${activeProject.name} project details`}
            onClick={() => setActiveProject(null)}
          >
            <motion.div
              className="mv-project-modal-inner"
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ duration: 0.62, ease: [0.76, 0, 0.24, 1] }}
              onClick={(event) => event.stopPropagation()}
            >
              <button type="button" className="mv-modal-close" onClick={() => setActiveProject(null)} aria-label="Close project"><X /></button>
              <div className="mv-modal-image"><img src={activeProject.image} alt={activeProject.name} /></div>
              <div className="mv-modal-copy">
                <span>{activeProject.type} · {activeProject.year}</span>
                <h3>{activeProject.name}</h3>
                <p>{activeProject.note}</p>
                <div><span>Location</span><strong>{activeProject.location}</strong></div>
                <button type="button" onClick={() => { setActiveProject(null); scrollTo('mv-inquiry') }}>Discuss a similar project <ArrowRight size={18} /></button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
