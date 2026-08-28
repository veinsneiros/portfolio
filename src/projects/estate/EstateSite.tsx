import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  Check,
  ChevronRight,
  Expand,
  MapPin,
  Menu,
  MoveUpRight,
  X,
} from 'lucide-react'
import './estate.css'

type Category = 'All' | 'Residential' | 'Hospitality' | 'Workplace'

type Property = {
  id: string
  name: string
  category: Exclude<Category, 'All'>
  location: string
  year: string
  image: string
  area: string
  rooms: string
  status: string
  summary: string
}

const properties: Property[] = [
  {
    id: 'm01',
    name: 'Pale House',
    category: 'Residential',
    location: 'Copenhagen, DK',
    year: '2026',
    image:
      'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1800&q=90',
    area: '386 m²',
    rooms: '4 bedrooms',
    status: 'Available',
    summary:
      'A study in northern light, honed limestone and quiet domestic ritual. Private gardens frame every principal room.',
  },
  {
    id: 'm02',
    name: 'Casa Bruma',
    category: 'Hospitality',
    location: 'Menorca, ES',
    year: '2025',
    image:
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1800&q=90',
    area: '1,840 m²',
    rooms: '18 suites',
    status: 'Opening Q4',
    summary:
      'An intimate retreat carved into the island landscape, where shaded courts connect stone, sea air and slow living.',
  },
  {
    id: 'm03',
    name: 'No. 31',
    category: 'Residential',
    location: 'London, UK',
    year: '2027',
    image:
      'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1800&q=90',
    area: '512 m²',
    rooms: '5 bedrooms',
    status: 'Private sale',
    summary:
      'A rigorously restored townhouse with a newly composed garden wing, crafted for enduring city life.',
  },
  {
    id: 'm04',
    name: 'Atelier North',
    category: 'Workplace',
    location: 'Berlin, DE',
    year: '2024',
    image:
      'https://images.unsplash.com/photo-1600607688969-a5bfcd646154?auto=format&fit=crop&w=1800&q=90',
    area: '2,240 m²',
    rooms: '7 studios',
    status: 'Completed',
    summary:
      'A former industrial shell reshaped as adaptable studios, anchored by a generous collective hall and winter garden.',
  },
  {
    id: 'm05',
    name: 'Stone Court',
    category: 'Residential',
    location: 'Lisbon, PT',
    year: '2026',
    image:
      'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?auto=format&fit=crop&w=1800&q=90',
    area: '294 m²',
    rooms: '3 bedrooms',
    status: 'Two remaining',
    summary:
      'Four restrained courtyard homes designed around textured shade, long views and the scent of citrus trees.',
  },
  {
    id: 'm06',
    name: 'Nera Rooms',
    category: 'Hospitality',
    location: 'Kyoto, JP',
    year: '2027',
    image:
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1800&q=90',
    area: '968 m²',
    rooms: '12 suites',
    status: 'In development',
    summary:
      'A contemporary inn shaped by precise timber joinery, inward gardens and a choreography of shadow.',
  },
]

const categories: Category[] = ['All', 'Residential', 'Hospitality', 'Workplace']

const scrollTo = (id: string) => {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

export default function EstateSite() {
  const [category, setCategory] = useState<Category>('All')
  const [selected, setSelected] = useState<Property | null>(null)
  const [menuOpen, setMenuOpen] = useState(false)
  const [formSuccess, setFormSuccess] = useState(false)
  const [inquiryProperty, setInquiryProperty] = useState('General enquiry')

  const filtered = category === 'All' ? properties : properties.filter((item) => item.category === category)

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setSelected(null)
        setMenuOpen(false)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const enquireFor = (property: Property) => {
    setInquiryProperty(property.name)
    setSelected(null)
    setFormSuccess(false)
    window.setTimeout(() => scrollTo('monument-inquiry'), 80)
  }

  return (
    <div className="monument-site">
      <header className="monument-nav">
        <a href="#monument-top" className="monument-wordmark" aria-label="Monument home">
          MONUMENT
        </a>
        <nav className="monument-nav-links" aria-label="Monument navigation">
          <a href="#monument-projects">Projects</a>
          <a href="#monument-practice">Practice</a>
          <a href="#monument-location">Locations</a>
        </nav>
        <button className="monument-enquire-nav" type="button" onClick={() => scrollTo('monument-inquiry')}>
          Enquire <MoveUpRight size={15} />
        </button>
        <button
          className="monument-menu-button"
          type="button"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <X /> : <Menu />}
        </button>
        <AnimatePresence>
          {menuOpen && (
            <motion.nav
              className="monument-mobile-nav"
              initial={{ opacity: 0, clipPath: 'inset(0 0 100% 0)' }}
              animate={{ opacity: 1, clipPath: 'inset(0 0 0% 0)' }}
              exit={{ opacity: 0, clipPath: 'inset(0 0 100% 0)' }}
              transition={{ duration: 0.35, ease: [0.76, 0, 0.24, 1] }}
            >
              {[
                ['Projects', 'monument-projects'],
                ['Practice', 'monument-practice'],
                ['Locations', 'monument-location'],
                ['Enquire', 'monument-inquiry'],
              ].map(([label, id], index) => (
                <button
                  type="button"
                  key={label}
                  onClick={() => {
                    setMenuOpen(false)
                    window.setTimeout(() => scrollTo(id), 100)
                  }}
                >
                  <span>0{index + 1}</span>{label}<ArrowRight />
                </button>
              ))}
            </motion.nav>
          )}
        </AnimatePresence>
      </header>

      <main>
        <section className="monument-hero" id="monument-top">
          <motion.img
            src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=2400&q=92"
            alt="Sculptural modern home in warm stone"
            initial={{ scale: 1.08 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
          />
          <div className="monument-hero-shade" />
          <motion.div
            className="monument-hero-title"
            initial="hidden"
            animate="visible"
            variants={{ visible: { transition: { staggerChildren: 0.09 } } }}
          >
            {['Spaces', 'of lasting', 'consequence.'].map((line, index) => (
              <div className={index === 2 ? 'is-indent' : ''} key={line}>
                <motion.span
                  variants={{
                    hidden: { y: '110%' },
                    visible: { y: 0, transition: { duration: 0.75, ease: [0.16, 1, 0.3, 1] } },
                  }}
                >
                  {line}
                </motion.span>
              </div>
            ))}
          </motion.div>
          <motion.p
            className="monument-hero-intro"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55, duration: 0.6 }}
          >
            Monument develops architecture with permanence—considered homes, rare retreats and cultural workplaces across Europe.
          </motion.p>
          <button className="monument-scroll" type="button" onClick={() => scrollTo('monument-projects')}>
            <span>View selected work</span><ArrowDown />
          </button>
          <div className="monument-hero-index">M / 01</div>
        </section>

        <section className="monument-statement" id="monument-practice">
          <div className="monument-section-index">01<br />Practice</div>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.75 }}
          >
            We make places that improve with time, shaped by <em>material intelligence</em> and an exacting sense of proportion.
          </motion.h2>
          <div className="monument-statement-foot">
            <p>From first site reading to the final hand-finished surface, we unite development, architecture and interiors under one point of view.</p>
            <button type="button" onClick={() => scrollTo('monument-inquiry')}>Commission Monument <ArrowRight /></button>
          </div>
        </section>

        <section className="monument-projects" id="monument-projects">
          <div className="monument-projects-head">
            <div>
              <div className="monument-section-index">02 / Selected projects</div>
              <h2>Built with intent.</h2>
            </div>
            <p>Private residences, hospitality and workplaces. Each singular; all grounded in place.</p>
          </div>
          <div className="monument-filters" role="group" aria-label="Filter projects">
            {categories.map((item) => (
              <button
                type="button"
                key={item}
                onClick={() => setCategory(item)}
                className={category === item ? 'is-active' : ''}
              >
                {item}<sup>{item === 'All' ? properties.length : properties.filter((project) => project.category === item).length}</sup>
              </button>
            ))}
          </div>

          <motion.div layout className="monument-property-grid">
            <AnimatePresence mode="popLayout">
              {filtered.map((property, index) => (
                <motion.article
                  className="monument-property"
                  key={property.id}
                  layout
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -14 }}
                  transition={{ duration: 0.45, delay: index * 0.04 }}
                >
                  <button type="button" onClick={() => setSelected(property)} aria-label={`View ${property.name}`}>
                    <div className="monument-property-image">
                      <img src={property.image} alt={`${property.name}, ${property.location}`} />
                      <span><Expand size={16} /> View project</span>
                    </div>
                    <div className="monument-property-meta">
                      <div><span>{property.location}</span><span>{property.year}</span></div>
                      <h3>{property.name}</h3>
                      <p>{property.category} / {property.area}</p>
                      <i><ArrowRight /></i>
                    </div>
                  </button>
                </motion.article>
              ))}
            </AnimatePresence>
          </motion.div>
        </section>

        <section className="monument-numbers">
          <div className="monument-section-index">03 / In numbers</div>
          <div className="monument-number-grid">
            {[
              ['18', 'Completed places'],
              ['07', 'Cities in practice'],
              ['14', 'International awards'],
              ['26', 'People, one studio'],
            ].map(([number, label]) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <strong>{number}</strong><span>{label}</span>
              </motion.div>
            ))}
          </div>
        </section>

        <section className="monument-location" id="monument-location">
          <div className="monument-map">
            <img
              src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&w=1600&q=86"
              alt="Aerial landscape suggesting Monument project locations"
            />
            <button className="monument-pin pin-one" type="button" onClick={() => setSelected(properties[0])} aria-label="Open Copenhagen project"><span />CPH</button>
            <button className="monument-pin pin-two" type="button" onClick={() => setSelected(properties[2])} aria-label="Open London project"><span />LON</button>
            <button className="monument-pin pin-three" type="button" onClick={() => setSelected(properties[4])} aria-label="Open Lisbon project"><span />LIS</button>
            <div className="monument-map-label">Selected European work<br />55.6761° N, 12.5683° E</div>
          </div>
          <div className="monument-location-copy">
            <div className="monument-section-index">04 / In context</div>
            <h2>Locally found.<br />Globally exacting.</h2>
            <p>Our Copenhagen studio works across Europe and selected international sites. We begin with climate, craft and the histories already held by a place.</p>
            <div className="monument-offices">
              <div><span>Studio</span><b>Frederiksgade 12<br />1265 Copenhagen K</b></div>
              <div><span>Hours</span><b>Mon—Fri<br />09:00—18:00</b></div>
            </div>
            <button type="button" onClick={() => scrollTo('monument-inquiry')}>Arrange a studio visit <ChevronRight /></button>
          </div>
        </section>

        <section className="monument-inquiry" id="monument-inquiry">
          <div className="monument-inquiry-copy">
            <div className="monument-section-index">05 / Private enquiries</div>
            <h2>What will<br />you leave behind?</h2>
            <p>Tell us about the site, the ambition, and where you are in the process. Every conversation begins in confidence.</p>
            <a href="mailto:studio@monument.example">studio@monument.example <MoveUpRight /></a>
          </div>
          <form
            className="monument-form"
            onSubmit={(event) => {
              event.preventDefault()
              setFormSuccess(true)
            }}
          >
            <label>
              <span>01 / Your name</span>
              <input type="text" name="name" placeholder="Full name" required onChange={() => setFormSuccess(false)} />
            </label>
            <label>
              <span>02 / Email address</span>
              <input type="email" name="email" placeholder="name@company.com" required onChange={() => setFormSuccess(false)} />
            </label>
            <label>
              <span>03 / Enquiry</span>
              <select value={inquiryProperty} onChange={(event) => { setInquiryProperty(event.target.value); setFormSuccess(false) }}>
                <option>General enquiry</option>
                {properties.map((property) => <option key={property.id}>{property.name}</option>)}
              </select>
            </label>
            <label>
              <span>04 / A few details</span>
              <textarea name="details" placeholder="Site, location, timeframe and ambition" rows={4} required onChange={() => setFormSuccess(false)} />
            </label>
            <button type="submit">Send private enquiry <ArrowRight /></button>
            <AnimatePresence>
              {formSuccess && (
                <motion.div
                  className="monument-form-success"
                  role="status"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                >
                  <span><Check /></span>
                  <div><b>Enquiry received.</b><p>Our development director will respond within two working days.</p></div>
                </motion.div>
              )}
            </AnimatePresence>
          </form>
        </section>
      </main>

      <footer className="monument-footer">
        <a className="monument-footer-wordmark" href="#monument-top">MONUMENT</a>
        <div><span>Copenhagen / London</span><span>Architecture & development</span></div>
        <div className="monument-footer-links">
          <a href="#monument-projects">Projects</a>
          <a href="mailto:studio@monument.example">Email</a>
          <a href="#monument-top">Top ↑</a>
        </div>
        <small>© 2026 Monument Development Studio</small>
      </footer>

      <AnimatePresence>
        {selected && (
          <motion.div
            className="monument-modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onMouseDown={(event) => {
              if (event.target === event.currentTarget) setSelected(null)
            }}
          >
            <motion.article
              className="monument-modal"
              role="dialog"
              aria-modal="true"
              aria-label={`${selected.name} project details`}
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ duration: 0.58, ease: [0.76, 0, 0.24, 1] }}
            >
              <button className="monument-modal-close" type="button" onClick={() => setSelected(null)} aria-label="Close project detail">
                <X />
              </button>
              <div className="monument-modal-image">
                <img src={selected.image} alt={`${selected.name} architecture`} />
                <div><span>{selected.id.toUpperCase()}</span><span>{selected.location}</span></div>
              </div>
              <div className="monument-modal-content">
                <button className="monument-modal-back" type="button" onClick={() => setSelected(null)}><ArrowLeft /> All projects</button>
                <p>{selected.category} / {selected.year}</p>
                <h2>{selected.name}</h2>
                <blockquote>{selected.summary}</blockquote>
                <dl>
                  <div><dt>Location</dt><dd>{selected.location}</dd></div>
                  <div><dt>Internal area</dt><dd>{selected.area}</dd></div>
                  <div><dt>Composition</dt><dd>{selected.rooms}</dd></div>
                  <div><dt>Status</dt><dd>{selected.status}</dd></div>
                </dl>
                <button className="monument-modal-enquire" type="button" onClick={() => enquireFor(selected)}>
                  Enquire about {selected.name} <ArrowRight />
                </button>
              </div>
            </motion.article>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
