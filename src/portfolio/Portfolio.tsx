import { FormEvent, useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useScroll, useTransform } from 'framer-motion'
import { ArrowDown, ArrowRight, Check, Mail, Menu, MoveUpRight, X } from 'lucide-react'
import { PROJECTS } from '../data/projects'
import type { ProjectId } from '../types'
import { LanguageToggle } from '../components/LanguageToggle'
import { useTranslate } from '../i18n/LanguageContext'
import './portfolio.css'

type PortfolioProps = {
  onOpenProject: (project: ProjectId) => void
}

const capabilities = [
  ['01', 'Creative direction', 'Креативне керівництво', 'Positioning, visual language, content systems', 'Позиціювання, візуальна мова та контент-системи'],
  ['02', 'Web design', 'Вебдизайн', 'Editorial layouts, UI systems, responsive art direction', 'Редакційні макети, UI-системи й адаптивна артдирекція'],
  ['03', 'Development', 'Розробка', 'React builds, motion, commerce, clean handoff', 'React-розробка, анімація, e-commerce та чиста передача проєкту'],
  ['04', 'Digital launches', 'Цифрові запуски', 'QA, refinement, analytics, ongoing evolution', 'Тестування, удосконалення, аналітика й подальший розвиток'],
]

const processSteps = [
  [
    '01',
    'Discover',
    'Дослідження',
    'We align on the audience, offer, ambition and the one thing the site must make unmistakable.',
    'Узгоджуємо аудиторію, пропозицію, амбіції та головну думку, яку сайт має донести безпомилково.',
  ],
  [
    '02',
    'Direct',
    'Напрям',
    'A sharp creative territory turns strategy into a distinct visual and verbal point of view.',
    'Чітка креативна територія перетворює стратегію на виразний візуальний і вербальний погляд.',
  ],
  [
    '03',
    'Design + build',
    'Дизайн + розробка',
    'The interface and code evolve together, with real content and motion from the start.',
    'Інтерфейс і код розвиваються разом — із реальним контентом та анімацією від самого початку.',
  ],
  [
    '04',
    'Launch',
    'Запуск',
    'We pressure-test every breakpoint, interaction and edge case before the work meets the world.',
    'До запуску ретельно перевіряємо кожен розмір екрана, взаємодію та нестандартний сценарій.',
  ],
]

const projectCopy: Record<ProjectId, { eyebrow: [string, string]; note: [string, string] }> = {
  service: {
    eyebrow: ['Interior architecture', 'Архітектура інтер’єру'],
    note: ['Quiet spaces, precisely composed.', 'Тихі простори, вивірені до деталей.'],
  },
  store: {
    eyebrow: ['Independent fragrance', 'Незалежна парфумерія'],
    note: ['Scent after the lights go down.', 'Аромат, що оживає після заходу сонця.'],
  },
  events: {
    eyebrow: ['Playful celebrations', 'Яскраві святкування'],
    note: ['Big little days, brilliantly made.', 'Великі маленькі дні, створені блискуче.'],
  },
  restaurant: {
    eyebrow: ['Japanese dining', 'Японська гастрономія'],
    note: ['Tokyo technique, seasonal instinct.', 'Токійська техніка, сезонна інтуїція.'],
  },
  estate: {
    eyebrow: ['Property development', 'Девелопмент нерухомості'],
    note: ['Homes of lasting consequence.', 'Оселі, значення яких не минає.'],
  },
}

export function Portfolio({ onOpenProject }: PortfolioProps) {
  const t = useTranslate()
  const [preview, setPreview] = useState(0)
  const [menuOpen, setMenuOpen] = useState(false)
  const [contactOpen, setContactOpen] = useState(false)
  const [sent, setSent] = useState(false)
  const heroRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 110])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8, 1], [1, 0.15, 0.15], { clamp: true })

  useEffect(() => {
    document.body.dataset.surface = 'portfolio'
    return () => {
      delete document.body.dataset.surface
    }
  }, [])

  const scrollTo = (target: string) => {
    setMenuOpen(false)
    document.querySelector(target)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const submitContact = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setSent(true)
  }

  return (
    <div className="pf">
      <header className="pf-nav">
        <button className="pf-mark" onClick={() => scrollTo('#top')} aria-label={t('Back to top', 'На початок')}>
          A<span>19</span>
        </button>
        <div className="pf-nav__center" aria-label={t('Primary navigation', 'Основна навігація')}>
          <button onClick={() => scrollTo('#projects')}>{t('Work', 'Проєкти')}</button>
          <button onClick={() => scrollTo('#capabilities')}>{t('Capabilities', 'Послуги')}</button>
          <button onClick={() => scrollTo('#process')}>{t('Process', 'Процес')}</button>
        </div>
        <div className="pf-nav__actions">
          <LanguageToggle />
          <button className="pf-nav__contact" onClick={() => setContactOpen(true)}>
            {t('Start a project', 'Обговорити проєкт')} <ArrowRight size={15} />
          </button>
          <button className="pf-nav__menu" onClick={() => setMenuOpen(true)} aria-label={t('Open menu', 'Відкрити меню')}>
            <Menu />
          </button>
        </div>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="pf-mobile-menu"
            initial={{ y: '-100%' }}
            animate={{ y: 0 }}
            exit={{ y: '-100%' }}
            transition={{ duration: 0.48, ease: [0.76, 0, 0.24, 1] }}
          >
            <button className="pf-mobile-menu__close" onClick={() => setMenuOpen(false)} aria-label={t('Close menu', 'Закрити меню')}>
              <X />
            </button>
            <button onClick={() => scrollTo('#projects')}>{t('Work', 'Проєкти')}</button>
            <button onClick={() => scrollTo('#capabilities')}>{t('Capabilities', 'Послуги')}</button>
            <button onClick={() => scrollTo('#process')}>{t('Process', 'Процес')}</button>
            <button onClick={() => { setMenuOpen(false); setContactOpen(true) }}>{t('Start a project', 'Обговорити проєкт')}</button>
          </motion.div>
        )}
      </AnimatePresence>

      <section className="pf-hero" id="top" ref={heroRef}>
        <motion.div className="pf-hero__inner" style={{ y: heroY, opacity: heroOpacity }}>
          <div className="pf-hero__meta">
            <span><i /> {t('Available for selected projects', 'Відкриті до вибраних проєктів')}</span>
            <span>{t('Worldwide', 'Увесь світ')}</span>
            <span>2026</span>
          </div>
          <motion.h1
            initial={{ y: 45, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
          >
            {t('We build digital worlds', 'Створюємо цифрові світи')}<br />
            <em>{t('your business can own.', 'які стануть вашими.')}</em>
          </motion.h1>
          <div className="pf-hero__bottom">
            <p>
              {t(
                'Strategy, design and development for ambitious businesses that refuse to look interchangeable.',
                'Стратегія, дизайн і розробка для амбітних компаній, які не хочуть бути як усі.',
              )}
            </p>
            <div className="pf-hero__actions">
              <button className="pf-button pf-button--light" onClick={() => scrollTo('#projects')}>
                {t('Explore projects', 'Переглянути проєкти')} <ArrowDown size={16} />
              </button>
              <button className="pf-button pf-button--line" onClick={() => setContactOpen(true)}>
                {t('Start a project', 'Обговорити проєкт')} <MoveUpRight size={16} />
              </button>
            </div>
          </div>
        </motion.div>
        <div className="pf-hero__rule" />
      </section>

      <section className="pf-projects" id="projects">
        <div className="pf-section-heading">
          <span>(01 — 05)</span>
          <h2>{t('Selected experiences', 'Вибрані проєкти')}</h2>
          <p>{t(
            'Five businesses. Five independent visual systems. Enter any project to explore the working experience.',
            'П’ять бізнесів. П’ять незалежних візуальних систем. Відкрийте будь-який проєкт і дослідіть його в дії.',
          )}</p>
        </div>

        <div className="pf-project-browser">
          <div className="pf-project-preview">
            <AnimatePresence mode="popLayout">
              <motion.img
                key={PROJECTS[preview].id}
                src={PROJECTS[preview].image}
                alt=""
                initial={{ opacity: 0, scale: 1.035 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.45 }}
              />
            </AnimatePresence>
            <div className="pf-project-preview__veil" />
            <span>{t(...projectCopy[PROJECTS[preview].id].note)}</span>
            <small>{t('Open live experience ↗', 'Відкрити інтерактивний проєкт ↗')}</small>
          </div>
          <div className="pf-project-list">
            {PROJECTS.map((project, index) => (
              <motion.button
                className={preview === index ? 'is-active' : ''}
                key={project.id}
                onMouseEnter={() => setPreview(index)}
                onFocus={() => setPreview(index)}
                onClick={() => onOpenProject(project.id)}
                whileTap={{ scale: 0.995 }}
              >
                <span className="pf-project-list__index">{project.index}</span>
                <span className="pf-project-list__name">
                  <small>{t(...projectCopy[project.id].eyebrow)}</small>
                  {project.name}
                </span>
                <span className="pf-project-list__arrow"><ArrowRight /></span>
                <img src={project.image} alt="" />
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      <section className="pf-capabilities" id="capabilities">
        <div className="pf-section-heading pf-section-heading--inverse">
          <span>({t('What we do', 'Що ми робимо')})</span>
          <h2>{t('One partner, from first thought to final pixel.', 'Один партнер — від першої думки до останнього пікселя.')}</h2>
        </div>
        <div className="pf-capability-list">
          {capabilities.map(([index, title, titleUk, detail, detailUk]) => (
            <div className="pf-capability" key={index}>
              <span>{index}</span>
              <h3>{t(title, titleUk)}</h3>
              <p>{t(detail, detailUk)}</p>
              <i>↗</i>
            </div>
          ))}
        </div>
      </section>

      <section className="pf-process" id="process">
        <div className="pf-process__intro">
          <span>({t('How it happens', 'Як це відбувається')})</span>
          <h2>{t('Clear thinking.', 'Чітке мислення.')}<br />{t('Beautiful execution.', 'Бездоганне втілення.')}</h2>
          <p>{t(
            'A compact senior team stays close from discovery through launch. Less theatre, more good decisions.',
            'Компактна команда досвідчених фахівців поруч від дослідження до запуску. Менше театру — більше влучних рішень.',
          )}</p>
        </div>
        <div className="pf-process__steps">
          {processSteps.map(([number, title, titleUk, text, textUk]) => (
            <motion.article
              key={number}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-10%' }}
              transition={{ duration: 0.55 }}
            >
              <span>{number}</span>
              <h3>{t(title, titleUk)}</h3>
              <p>{t(text, textUk)}</p>
            </motion.article>
          ))}
        </div>
      </section>

      <section className="pf-cta" id="contact">
        <span>{t('Have a project in mind?', 'Маєте проєкт?')}</span>
        <h2>{t('Let’s build something', 'Створімо те,')}<br /><em>{t('people remember.', 'що запам’ятають.')}</em></h2>
        <button onClick={() => setContactOpen(true)}>
          {t('Start a conversation', 'Почати розмову')} <ArrowRight />
        </button>
      </section>

      <footer className="pf-footer">
        <button className="pf-mark" onClick={() => scrollTo('#top')} aria-label={t('Back to top', 'На початок')}>A<span>19</span></button>
        <a href="mailto:hello@ateliernineteen.studio"><Mail size={15} /> hello@ateliernineteen.studio</a>
        <div><span>© 2026 Atelier Nineteen</span><span>{t('Independent digital studio', 'Незалежна цифрова студія')}</span></div>
      </footer>

      <AnimatePresence>
        {contactOpen && (
          <motion.div
            className="pf-contact"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            role="dialog"
            aria-modal="true"
            aria-label={t('Start a project', 'Обговорити проєкт')}
            onMouseDown={(event) => {
              if (event.currentTarget === event.target) setContactOpen(false)
            }}
          >
            <motion.div
              className="pf-contact__panel"
              data-lenis-prevent
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.52, ease: [0.76, 0, 0.24, 1] }}
            >
              <button className="pf-contact__close" onClick={() => setContactOpen(false)} aria-label={t('Close contact form', 'Закрити форму') }>
                <X />
              </button>
              {sent ? (
                <div className="pf-contact__success">
                  <span><Check /></span>
                  <small>{t('Message received', 'Повідомлення отримано')}</small>
                  <h2>{t('Good things', 'Усе важливе')}<br />{t('start here.', 'починається тут.')}</h2>
                  <p>{t('Thanks — we’ll come back to you within two working days.', 'Дякуємо — відповімо протягом двох робочих днів.')}</p>
                  <button onClick={() => { setContactOpen(false); setSent(false) }}>{t('Back to the work', 'Повернутися до проєктів')}</button>
                </div>
              ) : (
                <form onSubmit={submitContact}>
                  <small>{t('New business · 2026', 'Новий проєкт · 2026')}</small>
                  <h2>{t('Tell us what', 'Розкажіть, що')}<br />{t('you’re building.', 'ви створюєте.')}</h2>
                  <label>{t('Your name', 'Ваше ім’я')}<input name="name" required placeholder={t('Name or company', 'Ім’я або компанія')} /></label>
                  <label>{t('Email', 'Ел. пошта')}<input name="email" required type="email" placeholder="you@company.com" /></label>
                  <label>{t('Project type', 'Тип проєкту')}
                    <select name="type" required defaultValue="">
                      <option value="" disabled>{t('Select one', 'Оберіть варіант')}</option>
                      <option>{t('Brand + website', 'Бренд + сайт')}</option><option>{t('E-commerce', 'Інтернет-магазин')}</option><option>{t('Website redesign', 'Редизайн сайту')}</option><option>{t('Something else', 'Інше')}</option>
                    </select>
                  </label>
                  <label>{t('A little context', 'Трохи контексту')}<textarea name="context" required placeholder={t('Goals, timing, ambition…', 'Цілі, терміни, амбіції…')} rows={3} /></label>
                  <button type="submit">{t('Send project brief', 'Надіслати бриф')} <ArrowRight /></button>
                </form>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
