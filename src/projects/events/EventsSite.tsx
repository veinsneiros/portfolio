import { useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import {
  ArrowRight,
  CalendarDays,
  Check,
  ChevronDown,
  Heart,
  Menu,
  Minus,
  PartyPopper,
  Plus,
  Sparkles,
  Star,
  WandSparkles,
  X,
} from 'lucide-react'
import './events.css'

type EventKind = 'Birthday' | 'Little disco' | 'Creative lab'
type PackageName = 'Mini Magic' | 'Big Wow' | 'Full Wonder'

const eventTypes: Array<{
  title: EventKind
  kicker: string
  description: string
  image: string
  color: string
}> = [
  {
    title: 'Birthday',
    kicker: 'The signature party',
    description: 'A joyful, fully hosted celebration built around one brilliant little person.',
    image:
      'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=1200&q=88',
    color: '#ff5d7d',
  },
  {
    title: 'Little disco',
    kicker: 'Lights up, music on',
    description: 'A high-energy dance floor, mini DJ games and a finale made for happy feet.',
    image:
      'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1200&q=88',
    color: '#6d62ff',
  },
  {
    title: 'Creative lab',
    kicker: 'Make something marvellous',
    description: 'Beautifully styled workshops where curious minds paint, build, mix and invent.',
    image:
      'https://images.unsplash.com/photo-1596464716127-f2a82984de30?auto=format&fit=crop&w=1200&q=88',
    color: '#f0b500',
  },
]

const packages: Array<{
  name: PackageName
  price: number
  length: string
  label: string
  features: string[]
}> = [
  {
    name: 'Mini Magic',
    price: 390,
    length: '90 min',
    label: 'Sweet & simple',
    features: ['1 Lumi host', 'Games & music', 'Digital invitations', 'Up to 10 children'],
  },
  {
    name: 'Big Wow',
    price: 690,
    length: '2.5 hours',
    label: 'Most loved',
    features: ['2 Lumi hosts', 'Styled theme set', 'Cake moment', 'Party keepsakes', 'Up to 16 children'],
  },
  {
    name: 'Full Wonder',
    price: 1090,
    length: '4 hours',
    label: 'Everything, beautifully',
    features: ['Full creative direction', 'Immersive decor', 'Live show', 'Photo story', 'Up to 24 children'],
  },
]

const themes = [
  { name: 'Cosmic', icon: '✦', hue: '#635bff' },
  { name: 'Wild', icon: '♞', hue: '#2b8c6b' },
  { name: 'Candy', icon: '●', hue: '#ff5d7d' },
  { name: 'Magic', icon: '✷', hue: '#e29a00' },
]

const gallery = [
  {
    src: 'https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?auto=format&fit=crop&w=1100&q=88',
    alt: 'Colourful birthday cake with candles',
  },
  {
    src: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?auto=format&fit=crop&w=900&q=88',
    alt: 'Happy child at a party',
  },
  {
    src: 'https://images.unsplash.com/photo-1527529482837-4698179dc6ce?auto=format&fit=crop&w=1100&q=88',
    alt: 'Friends celebrating together',
  },
  {
    src: 'https://images.unsplash.com/photo-1513159446162-54eb8bdaa79b?auto=format&fit=crop&w=900&q=88',
    alt: 'Party decorations',
  },
]

const scrollToPlanner = () => {
  document.getElementById('lumi-planner')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

export default function EventsSite() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [eventKind, setEventKind] = useState<EventKind>('Birthday')
  const [age, setAge] = useState('6–8')
  const [children, setChildren] = useState(12)
  const [date, setDate] = useState('')
  const [packageName, setPackageName] = useState<PackageName>('Big Wow')
  const [theme, setTheme] = useState('Cosmic')
  const [success, setSuccess] = useState(false)

  const selectedPackage = packages.find((item) => item.name === packageName) ?? packages[1]
  const total = useMemo(() => {
    const typeSurcharge: Record<EventKind, number> = {
      Birthday: 0,
      'Little disco': 90,
      'Creative lab': 120,
    }
    const included = packageName === 'Mini Magic' ? 10 : packageName === 'Big Wow' ? 16 : 24
    const additionalGuests = Math.max(0, children - included) * 24
    const chosenDate = date ? new Date(`${date}T12:00:00`) : null
    const weekend = chosenDate && [0, 6].includes(chosenDate.getDay()) ? 75 : 0
    return selectedPackage.price + typeSurcharge[eventKind] + additionalGuests + weekend
  }, [children, date, eventKind, packageName, selectedPackage.price])

  const chooseEvent = (kind: EventKind) => {
    setEventKind(kind)
    setSuccess(false)
    scrollToPlanner()
  }

  const choosePackage = (name: PackageName) => {
    setPackageName(name)
    setSuccess(false)
  }

  return (
    <div className="lumi-site">
      <header className="lumi-nav">
        <a className="lumi-logo" href="#lumi-top" aria-label="Lumi Club home">
          <span>Lumi</span>
          <i>club</i>
        </a>
        <nav className="lumi-nav-links" aria-label="Lumi Club navigation">
          <a href="#lumi-parties">Parties</a>
          <a href="#lumi-packages">Packages</a>
          <a href="#lumi-moments">Moments</a>
        </nav>
        <button className="lumi-nav-cta" type="button" onClick={scrollToPlanner}>
          Plan a party <ArrowRight size={17} />
        </button>
        <button
          className="lumi-menu-button"
          type="button"
          aria-label={mobileOpen ? 'Close navigation' : 'Open navigation'}
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((open) => !open)}
        >
          {mobileOpen ? <X /> : <Menu />}
        </button>
        <AnimatePresence>
          {mobileOpen && (
            <motion.nav
              className="lumi-mobile-nav"
              initial={{ opacity: 0, y: -14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -14 }}
            >
              {[
                ['Parties', '#lumi-parties'],
                ['Packages', '#lumi-packages'],
                ['Moments', '#lumi-moments'],
              ].map(([label, href]) => (
                <a key={label} href={href} onClick={() => setMobileOpen(false)}>
                  {label}
                </a>
              ))}
              <button
                type="button"
                onClick={() => {
                  setMobileOpen(false)
                  scrollToPlanner()
                }}
              >
                Plan a party
              </button>
            </motion.nav>
          )}
        </AnimatePresence>
      </header>

      <main>
        <section className="lumi-hero" id="lumi-top">
          <div className="lumi-hero-copy">
            <motion.div
              className="lumi-kicker"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Sparkles size={16} /> Extraordinary parties for little people
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.05 }}
            >
              Their big day,
              <br />
              <em>brilliantly</em> made.
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.16 }}
            >
              Design-led children’s celebrations, full of proper play, bright ideas and the kind of
              details grown-ups notice too.
            </motion.p>
            <motion.div
              className="lumi-hero-actions"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.24 }}
            >
              <button className="lumi-primary-button" type="button" onClick={scrollToPlanner}>
                Build your party <WandSparkles size={18} />
              </button>
              <a href="#lumi-moments" className="lumi-text-link">
                See the magic <ArrowRight size={17} />
              </a>
            </motion.div>
            <div className="lumi-trust-row">
              <div className="lumi-faces" aria-hidden="true">
                {[
                  'photo-1544005313-94ddf0286df2',
                  'photo-1494790108377-be9c29b29330',
                  'photo-1500648767791-00dcc994a43e',
                ].map((id) => (
                  <img
                    key={id}
                    src={`https://images.unsplash.com/${id}?auto=format&fit=crop&w=100&q=80`}
                    alt=""
                  />
                ))}
              </div>
              <span>
                <b>4.9</b> from 240 happy families
              </span>
            </div>
          </div>

          <motion.div
            className="lumi-hero-visual"
            initial={{ opacity: 0, clipPath: 'inset(12% 0 0 0 round 40px)' }}
            animate={{ opacity: 1, clipPath: 'inset(0% 0 0 0 round 40px)' }}
            transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
          >
            <img
              src="https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=1500&q=90"
              alt="A joyful, colourful birthday celebration"
            />
            <motion.div
              className="lumi-orbit lumi-orbit-one"
              animate={{ rotate: [0, 8, -5, 0] }}
              transition={{ repeat: Infinity, duration: 9 }}
            >
              <Heart fill="currentColor" />
            </motion.div>
            <motion.div
              className="lumi-orbit lumi-orbit-two"
              animate={{ y: [0, -10, 0], rotate: [8, -3, 8] }}
              transition={{ repeat: Infinity, duration: 5 }}
            >
              <PartyPopper />
            </motion.div>
            <div className="lumi-hero-stamp">
              <b>100%</b>
              <span>joy, handled</span>
            </div>
            <div className="lumi-squiggle" aria-hidden="true">
              ~ ~ ~
            </div>
          </motion.div>
        </section>

        <section className="lumi-marquee" aria-label="What Lumi Club brings">
          <div>
            <span>Big imagination</span><i>✦</i><span>Zero party stress</span><i>✦</i>
            <span>Beautifully hosted</span><i>✦</i><span>Big imagination</span><i>✦</i>
            <span>Zero party stress</span>
          </div>
        </section>

        <section className="lumi-section lumi-parties" id="lumi-parties">
          <div className="lumi-section-heading">
            <div>
              <span className="lumi-eyebrow">Pick your kind of brilliant</span>
              <h2>One good reason<br />to get very excited.</h2>
            </div>
            <p>Every Lumi experience is created for real children—not photo shoots. Beautiful, yes. But always wildly good fun.</p>
          </div>
          <div className="lumi-event-grid">
            {eventTypes.map((event, index) => (
              <motion.article
                className="lumi-event-card"
                key={event.title}
                whileHover={{ y: -8 }}
                transition={{ type: 'spring', stiffness: 260, damping: 22 }}
              >
                <button type="button" onClick={() => chooseEvent(event.title)} aria-label={`Plan a ${event.title} event`}>
                  <div className="lumi-event-image">
                    <img src={event.image} alt={event.title} />
                    <span style={{ background: event.color }}>0{index + 1}</span>
                  </div>
                  <div className="lumi-event-copy">
                    <small>{event.kicker}</small>
                    <h3>{event.title}</h3>
                    <p>{event.description}</p>
                    <i><ArrowRight /></i>
                  </div>
                </button>
              </motion.article>
            ))}
          </div>
        </section>

        <section className="lumi-theme-section">
          <div className="lumi-theme-intro">
            <span className="lumi-eyebrow">Choose their world</span>
            <h2>Never off-the-shelf.<br /><em>Always theirs.</em></h2>
            <p>Select a starting theme. We’ll layer in their favourite colours, stories and wonderfully specific obsessions.</p>
          </div>
          <div className="lumi-theme-picker" role="group" aria-label="Party theme">
            {themes.map((item) => (
              <button
                type="button"
                key={item.name}
                className={theme === item.name ? 'is-active' : ''}
                onClick={() => {
                  setTheme(item.name)
                  setSuccess(false)
                }}
                style={{ '--theme-color': item.hue } as React.CSSProperties}
              >
                <span>{item.icon}</span>
                <b>{item.name}</b>
                <Check size={16} />
              </button>
            ))}
          </div>
          <AnimatePresence mode="wait">
            <motion.div
              className={`lumi-theme-preview lumi-theme-${theme.toLowerCase()}`}
              key={theme}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
            >
              <span>{themes.find((item) => item.name === theme)?.icon}</span>
              <div>
                <small>Current mood</small>
                <strong>{`${theme} wonderland`}</strong>
              </div>
              <p>We’ll make it unmistakably theirs.</p>
            </motion.div>
          </AnimatePresence>
        </section>

        <section className="lumi-section lumi-packages" id="lumi-packages">
          <div className="lumi-section-heading lumi-package-heading">
            <div>
              <span className="lumi-eyebrow">Good times, neatly packaged</span>
              <h2>Choose your<br />level of wow.</h2>
            </div>
            <p>All packages include thoughtful planning, professional party hosts and our unflappable day-of support.</p>
          </div>
          <div className="lumi-package-grid">
            {packages.map((item) => (
              <motion.button
                type="button"
                key={item.name}
                className={`lumi-package-card ${packageName === item.name ? 'is-selected' : ''}`}
                onClick={() => choosePackage(item.name)}
                whileTap={{ scale: 0.985 }}
              >
                <span className="lumi-package-label">{item.label}</span>
                <div className="lumi-package-title">
                  <h3>{item.name}</h3>
                  <span>{item.length}</span>
                </div>
                <div className="lumi-package-price"><small>from</small> €{item.price}</div>
                <ul>
                  {item.features.map((feature) => (
                    <li key={feature}><Check size={15} /> {feature}</li>
                  ))}
                </ul>
                <i>{packageName === item.name ? 'Selected' : 'Choose package'} <ArrowRight size={16} /></i>
              </motion.button>
            ))}
          </div>
        </section>

        <section className="lumi-moments" id="lumi-moments">
          <div className="lumi-moments-title">
            <span className="lumi-eyebrow">Made of moments</span>
            <h2>The lovely, loud,<br />can-we-do-it-again kind.</h2>
          </div>
          <div className="lumi-gallery">
            {gallery.map((image, index) => (
              <motion.figure
                key={image.src}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ delay: index * 0.07 }}
              >
                <img src={image.src} alt={image.alt} />
                <figcaption>{`0${index + 1} / Lumi moments`}</figcaption>
              </motion.figure>
            ))}
          </div>
        </section>

        <section className="lumi-testimonial">
          <div className="lumi-stars" aria-label="Five stars">
            {[1, 2, 3, 4, 5].map((star) => <Star key={star} size={20} fill="currentColor" />)}
          </div>
          <blockquote>“The children called it the best day ever. I called it the first party I’ve actually enjoyed hosting.”</blockquote>
          <div className="lumi-quote-person">
            <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=160&q=85" alt="Portrait of Amelia" />
            <p><b>Amelia R.</b><span>Mum to Florence, age 7</span></p>
          </div>
        </section>

        <section className="lumi-planner" id="lumi-planner">
          <div className="lumi-planner-intro">
            <span className="lumi-eyebrow">Your party starts here</span>
            <h2>Let’s make a<br /><em>little magic.</em></h2>
            <p>Build a quick party outline and get an instant estimate. We’ll follow up with the clever ideas.</p>
            <div className="lumi-planner-note"><Sparkles /><span><b>No hidden surprises.</b> Your estimate updates as you build.</span></div>
          </div>
          <form
            className="lumi-calculator"
            onSubmit={(event) => {
              event.preventDefault()
              setSuccess(true)
            }}
          >
            <div className="lumi-field lumi-field-wide">
              <label htmlFor="lumi-event-type">What are we celebrating?</label>
              <div className="lumi-select-wrap">
                <select
                  id="lumi-event-type"
                  value={eventKind}
                  onChange={(event) => {
                    setEventKind(event.target.value as EventKind)
                    setSuccess(false)
                  }}
                >
                  {eventTypes.map((item) => <option key={item.title}>{item.title}</option>)}
                </select>
                <ChevronDown size={18} />
              </div>
            </div>

            <fieldset className="lumi-field lumi-field-wide">
              <legend>Age of the party star</legend>
              <div className="lumi-segments">
                {['3–5', '6–8', '9–12', '13+'].map((item) => (
                  <button
                    type="button"
                    className={age === item ? 'is-active' : ''}
                    key={item}
                    onClick={() => {
                      setAge(item)
                      setSuccess(false)
                    }}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </fieldset>

            <div className="lumi-field">
              <label>Number of children</label>
              <div className="lumi-counter">
                <button
                  type="button"
                  aria-label="Remove one child"
                  onClick={() => {
                    setChildren((count) => Math.max(4, count - 1))
                    setSuccess(false)
                  }}
                ><Minus size={17} /></button>
                <strong>{children}</strong>
                <button
                  type="button"
                  aria-label="Add one child"
                  onClick={() => {
                    setChildren((count) => Math.min(40, count + 1))
                    setSuccess(false)
                  }}
                ><Plus size={17} /></button>
              </div>
            </div>

            <div className="lumi-field">
              <label htmlFor="lumi-date">Ideal date</label>
              <div className="lumi-date-wrap">
                <input
                  id="lumi-date"
                  type="date"
                  value={date}
                  min={new Date().toISOString().slice(0, 10)}
                  required
                  onChange={(event) => {
                    setDate(event.target.value)
                    setSuccess(false)
                  }}
                />
                <CalendarDays size={18} />
              </div>
            </div>

            <fieldset className="lumi-field lumi-field-wide">
              <legend>Package</legend>
              <div className="lumi-package-radios">
                {packages.map((item) => (
                  <label className={packageName === item.name ? 'is-active' : ''} key={item.name}>
                    <input
                      type="radio"
                      name="package"
                      value={item.name}
                      checked={packageName === item.name}
                      onChange={() => choosePackage(item.name)}
                    />
                    <span><b>{item.name}</b><small>€{item.price}</small></span>
                    <i><Check size={14} /></i>
                  </label>
                ))}
              </div>
            </fieldset>

            <div className="lumi-estimate lumi-field-wide">
              <div>
                <small>Your estimated party</small>
                <strong>€{total.toLocaleString('en-US')}</strong>
              </div>
              <span>{`${eventKind} · ages ${age} · ${theme}`}</span>
            </div>
            <button className="lumi-submit" type="submit">
              Request my party plan <ArrowRight size={18} />
            </button>
            <AnimatePresence>
              {success && (
                <motion.div
                  className="lumi-success"
                  role="status"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                >
                  <span><Check /></span>
                  <div><b>Your party idea is on its way!</b><p>We’ve saved the outline. A Lumi planner would be in touch within one working day.</p></div>
                </motion.div>
              )}
            </AnimatePresence>
          </form>
        </section>
      </main>

      <footer className="lumi-footer">
        <div className="lumi-footer-logo">Lumi <i>club</i></div>
        <p>Really good parties for<br />really brilliant children.</p>
        <div className="lumi-footer-links">
          <a href="mailto:hello@lumiclub.example">hello@lumiclub.example</a>
          <a href="#lumi-moments">Instagram</a>
          <a href="#lumi-top">Back to top ↑</a>
        </div>
        <small>© 2026 Lumi Club. Joyfully made.</small>
      </footer>
    </div>
  )
}
