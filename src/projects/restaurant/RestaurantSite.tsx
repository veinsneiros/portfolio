import { FormEvent, useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Check,
  ChevronLeft,
  ChevronRight,
  Clock3,
  MapPin,
  Menu,
  Phone,
  X,
} from 'lucide-react'
import './restaurant.css'

type MenuDish = {
  name: string
  japanese: string
  description: string
  price: string
}

type BookingConfirmation = {
  name: string
  date: string
  time: string
  guests: string
}

const menu: Record<string, MenuDish[]> = {
  Omakase: [
    { name: 'Kinu', japanese: '絹', description: 'Fourteen moments · chef’s seasonal expression', price: '225' },
    { name: 'Hikari', japanese: '光', description: 'Ten moments · fish, fire, rice and broth', price: '175' },
    { name: 'Mori', japanese: '森', description: 'Nine moments · a plant-led tasting journey', price: '145' },
    { name: 'Sake pairing', japanese: '酒', description: 'Rare and small-production sake · six pours', price: '95' },
  ],
  Sakizuke: [
    { name: 'Chawanmushi', japanese: '茶碗蒸し', description: 'Corn · king crab · white shoyu', price: '24' },
    { name: 'Hokkaido scallop', japanese: '帆立', description: 'Sudachi · shiso oil · finger lime', price: '28' },
    { name: 'Toro tartare', japanese: '鮪', description: 'Smoked daikon · oscietra · nori', price: '34' },
    { name: 'Silken tofu', japanese: '豆腐', description: 'Myoga · mountain tomato · sansho', price: '19' },
  ],
  Nigiri: [
    { name: 'Kinmedai', japanese: '金目鯛', description: 'Golden eye snapper · yuzu kosho', price: '14' },
    { name: 'Chūtoro', japanese: '中とろ', description: 'Medium fatty tuna · nikiri', price: '18' },
    { name: 'Aori ika', japanese: '障泥烏賊', description: 'Bigfin reef squid · sea salt · lime', price: '13' },
    { name: 'Uni', japanese: '雲丹', description: 'Hokkaido sea urchin · warm rice', price: '22' },
  ],
  Robata: [
    { name: 'Miso black cod', japanese: '銀鱈', description: 'Saikyo miso · pickled ginger', price: '42' },
    { name: 'A5 wagyu', japanese: '和牛', description: 'Kagoshima striploin · fresh wasabi · tare', price: '68' },
    { name: 'Koji aubergine', japanese: '茄子', description: 'Red miso · sesame · spring onion', price: '21' },
    { name: 'King oyster', japanese: '平茸', description: 'Smoked soy · mitsuba · fermented chilli', price: '19' },
  ],
  Sweet: [
    { name: 'Miso caramel', japanese: '味噌', description: 'Hojicha ice cream · puffed rice', price: '16' },
    { name: 'Yuzu', japanese: '柚子', description: 'Yuzu curd · sake kasu · shiso granita', price: '17' },
    { name: 'Ichigo', japanese: '苺', description: 'Strawberry · genmaicha · white chocolate', price: '17' },
    { name: 'Seasonal wagashi', japanese: '和菓子', description: 'Hand-shaped sweets · ceremonial matcha', price: '14' },
  ],
}

const gallery = [
  {
    src: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=1800&q=90',
    alt: 'A precise selection of nigiri sushi',
  },
  {
    src: 'https://images.unsplash.com/photo-1553621042-f6e147245754?auto=format&fit=crop&w=1500&q=90',
    alt: 'Chef preparing fresh sushi at the counter',
  },
  {
    src: 'https://images.unsplash.com/photo-1569050467447-ce54b3bbc37d?auto=format&fit=crop&w=1500&q=90',
    alt: 'Japanese dishes set for dinner',
  },
  {
    src: 'https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?auto=format&fit=crop&w=1500&q=90',
    alt: 'Seasonal Japanese small plate',
  },
  {
    src: 'https://images.unsplash.com/photo-1563612116625-3012372fccce?auto=format&fit=crop&w=1500&q=90',
    alt: 'Sashimi with delicate garnishes',
  },
]

const navItems = [
  ['Story', 'kn-story'],
  ['Menu', 'kn-menu'],
  ['Chef', 'kn-chef'],
  ['Visit', 'kn-visit'],
]

export default function RestaurantSite() {
  const categories = Object.keys(menu)
  const [category, setCategory] = useState(categories[0])
  const [mobileOpen, setMobileOpen] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)
  const [booking, setBooking] = useState<BookingConfirmation | null>(null)
  const [selectedTime, setSelectedTime] = useState('19:30')

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    setMobileOpen(false)
  }

  const moveLightbox = (direction: number) => {
    setLightboxIndex((current) => {
      if (current === null) return null
      return (current + direction + gallery.length) % gallery.length
    })
  }

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMobileOpen(false)
        setLightboxIndex(null)
      }
      if (event.key === 'ArrowLeft' && lightboxIndex !== null) moveLightbox(-1)
      if (event.key === 'ArrowRight' && lightboxIndex !== null) moveLightbox(1)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [lightboxIndex])

  const submitBooking = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    setBooking({
      name: String(data.get('name')),
      date: String(data.get('date')),
      time: selectedTime,
      guests: String(data.get('guests')),
    })
  }

  return (
    <div className="kn-site">
      <section className="kn-hero" id="kn-top">
        <header className="kn-header">
          <button type="button" className="kn-logo" onClick={() => scrollTo('kn-top')} aria-label="Kinu, home">
            <span>絹</span><strong>KINU</strong><small>Tokyo · London</small>
          </button>
          <nav className="kn-nav" aria-label="Kinu navigation">
            {navItems.map(([label, id]) => <button type="button" onClick={() => scrollTo(id)} key={id}>{label}</button>)}
          </nav>
          <button type="button" className="kn-reserve-top" onClick={() => scrollTo('kn-book')}>Reservations <ArrowUpRight size={15} /></button>
          <button
            type="button"
            className="kn-mobile-toggle"
            onClick={() => setMobileOpen((open) => !open)}
            aria-expanded={mobileOpen}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          >
            {mobileOpen ? <X /> : <Menu />}
          </button>
        </header>

        <AnimatePresence>
          {mobileOpen && (
            <motion.nav
              className="kn-mobile-nav"
              initial={{ opacity: 0, scale: 1.03 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.02 }}
              transition={{ duration: 0.35 }}
              aria-label="Mobile navigation"
            >
              <span className="kn-mobile-kanji">季節<br />料理</span>
              {navItems.map(([label, id], index) => (
                <motion.button
                  key={id}
                  type="button"
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.06 }}
                  onClick={() => scrollTo(id)}
                >
                  <small>0{index + 1}</small>{label}
                </motion.button>
              ))}
              <button type="button" className="kn-mobile-book" onClick={() => scrollTo('kn-book')}>Reserve a table</button>
            </motion.nav>
          )}
        </AnimatePresence>

        <motion.div
          className="kn-hero-bg"
          initial={{ scale: 1.12 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1] }}
        />
        <div className="kn-hero-shade" />
        <motion.p className="kn-hero-vertical" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}>
          旬の心を一皿に
        </motion.p>
        <div className="kn-hero-content">
          <motion.div
            className="kn-hero-prelude"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.7 }}
          >
            <span>Modern kaiseki</span><span>Mayfair · London</span>
          </motion.div>
          <h1 aria-label="Kinu">
            {'KINU'.split('').map((letter, index) => (
              <motion.span
                key={letter + index}
                initial={{ y: '110%' }}
                animate={{ y: 0 }}
                transition={{ duration: 0.7, delay: 0.12 + index * 0.08, ease: [0.22, 1, 0.36, 1] }}
              >
                {letter}
              </motion.span>
            ))}
          </h1>
          <motion.div
            className="kn-hero-footer"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.8 }}
          >
            <p>Tokyo technique.<br />British seasons.</p>
            <button type="button" onClick={() => scrollTo('kn-story')}><span>Enter</span><ArrowDown /></button>
            <p>Tuesday—Saturday<br />Dinner from 5:30</p>
          </motion.div>
        </div>
      </section>

      <main>
        <section className="kn-story" id="kn-story">
          <div className="kn-section-marker"><span>壱</span><small>Our story</small></div>
          <motion.div
            className="kn-story-heading"
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8 }}
          >
            <p>Not fusion.<br />A conversation.</p>
            <h2>Between <em>Tokyo</em><br />and this moment.</h2>
          </motion.div>
          <div className="kn-story-grid">
            <motion.div className="kn-story-image-main" initial={{ clipPath: 'inset(0 100% 0 0)' }} whileInView={{ clipPath: 'inset(0 0% 0 0)' }} viewport={{ once: true }} transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}>
              <img src="https://images.unsplash.com/photo-1516211697506-8360dbcfe9a4?auto=format&fit=crop&w=1700&q=90" alt="Intimate Japanese restaurant counter" />
              <span>Our counter · twelve seats</span>
            </motion.div>
            <div className="kn-story-copy">
              <span className="kn-red-seal">絹<br />倫敦</span>
              <p className="kn-story-lead">Kinu means silk: fine, resilient, made from countless threads.</p>
              <p>Our cooking follows the same idea. Japanese discipline is woven with produce from British shores, farms and forests. The result belongs to neither place entirely—and could only exist here.</p>
              <p>Each evening unfolds at the pace of the season, one plate at a time.</p>
              <button type="button" onClick={() => scrollTo('kn-menu')}>Discover the menu <ArrowRight size={17} /></button>
            </div>
            <motion.div className="kn-story-image-small" initial={{ opacity: 0, y: 35 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
              <img src="https://images.unsplash.com/photo-1579027989536-b7b1f875659b?auto=format&fit=crop&w=1000&q=90" alt="Chef's hands preparing sushi" />
            </motion.div>
          </div>
        </section>

        <section className="kn-menu-section" id="kn-menu">
          <div className="kn-menu-top">
            <div className="kn-section-marker kn-marker-light"><span>弐</span><small>The menu</small></div>
            <div>
              <span>Summer · 2026</span>
              <h2>À la carte</h2>
              <p>Designed to share. Our menu changes with the day’s arrivals.</p>
            </div>
            <p className="kn-menu-japanese">季節<br />献立</p>
          </div>

          <div className="kn-menu-tabs" role="tablist" aria-label="Menu categories">
            {categories.map((item, index) => (
              <button
                type="button"
                role="tab"
                aria-selected={category === item}
                className={category === item ? 'is-active' : ''}
                onClick={() => setCategory(item)}
                key={item}
              >
                <small>0{index + 1}</small><span>{item}</span>
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              className="kn-dishes"
              key={category}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.35 }}
              role="tabpanel"
            >
              {menu[category].map((dish, index) => (
                <motion.div
                  className="kn-dish"
                  key={dish.name}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.055 }}
                >
                  <span className="kn-dish-japanese">{dish.japanese}</span>
                  <div><h3>{dish.name}</h3><p>{dish.description}</p></div>
                  <span className="kn-price">£{dish.price}</span>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
          <div className="kn-menu-note"><span>お任せ</span><p>Please tell us about allergies when booking. A discretionary 15% service charge is added to your bill.</p></div>
        </section>

        <section className="kn-chef" id="kn-chef">
          <div className="kn-chef-image">
            <img src="https://images.unsplash.com/photo-1583394293214-28ded15ee548?auto=format&fit=crop&w=1600&q=90" alt="Chef Ren Ito in the Kinu kitchen" />
            <span>Ren Ito · Chef founder</span>
          </div>
          <div className="kn-chef-copy">
            <div className="kn-section-marker"><span>参</span><small>The chef</small></div>
            <div className="kn-chef-title"><span>伊藤 蓮</span><h2>Ren<br />Ito</h2></div>
            <blockquote>“Luxury is not excess. It is the right ingredient, at the right moment, with nowhere to hide.”</blockquote>
            <p>Raised in Kamakura, Ren trained in Kyoto before spending a decade in the kitchens of Paris and Copenhagen. Kinu is his return to the clarity of Japanese cooking—with a new landscape at hand.</p>
          </div>
        </section>

        <section className="kn-philosophy">
          <div className="kn-section-marker"><span>肆</span><small>Our philosophy</small></div>
          <h2>Three threads.<br />One <em>experience.</em></h2>
          <div className="kn-principles">
            <article><span>一</span><h3>Shun</h3><small>旬 · Season</small><p>Ingredients at their precise point of beauty. Not before. Not after.</p></article>
            <article><span>二</span><h3>Ma</h3><small>間 · Space</small><p>The pause between courses, the quiet around a plate, room to notice.</p></article>
            <article><span>三</span><h3>Te</h3><small>手 · Hand</small><p>The trace of the maker in every cut, vessel, fold and gesture.</p></article>
          </div>
        </section>

        <section className="kn-gallery" aria-label="Kinu gallery">
          <div className="kn-gallery-heading"><span>Scenes from Kinu</span><span>Click an image to explore</span></div>
          <div className="kn-gallery-grid">
            {gallery.map((image, index) => (
              <motion.button
                type="button"
                key={image.src}
                className={`kn-gallery-item kn-gallery-item-${index + 1}`}
                onClick={() => setLightboxIndex(index)}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.6, delay: (index % 2) * 0.08 }}
                aria-label={`Open image: ${image.alt}`}
              >
                <img src={image.src} alt={image.alt} />
                <span>0{index + 1}</span>
              </motion.button>
            ))}
          </div>
        </section>

        <section className="kn-visit" id="kn-visit">
          <div className="kn-visit-info">
            <div className="kn-section-marker kn-marker-light"><span>伍</span><small>Visit</small></div>
            <h2>Find us<br />after <em>dusk.</em></h2>
            <div className="kn-visit-columns">
              <div><MapPin /><span><strong>22 Hay Hill</strong><br />Mayfair, London<br />W1J 6QY</span></div>
              <div><Clock3 /><span><strong>Tuesday—Saturday</strong><br />Dinner 17:30—23:30<br />Last seating 21:30</span></div>
              <div><Phone /><span><a href="tel:+442079460381">+44 (0)20 7946 0381</a><br /><a href="mailto:hello@kinu.restaurant">hello@kinu.restaurant</a></span></div>
            </div>
            <a className="kn-directions" href="https://www.google.com/maps/search/?api=1&query=22+Hay+Hill+London" target="_blank" rel="noreferrer">Open in maps <ArrowUpRight size={17} /></a>
          </div>
          <div className="kn-visit-image">
            <img src="https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=1600&q=90" alt="Warm evening at a Japanese restaurant" />
            <div className="kn-map-mark"><span>絹</span><small>KINU</small></div>
          </div>
        </section>

        <section className="kn-booking" id="kn-book">
          <div className="kn-booking-intro">
            <span>ご予約</span>
            <div><small>Reservations</small><h2>Your seat<br />at the <em>counter.</em></h2><p>For parties larger than six or private dining, please call us directly.</p></div>
          </div>
          <AnimatePresence mode="wait">
            {booking ? (
              <motion.div className="kn-booking-success" key="success" initial={{ opacity: 0, y: 25 }} animate={{ opacity: 1, y: 0 }}>
                <span className="kn-success-mark"><Check /></span>
                <small>Reservation received</small>
                <h3>We look forward<br />to welcoming you, {booking.name}.</h3>
                <div><span>{booking.date}</span><span>{booking.time}</span><span>{booking.guests} guests</span></div>
                <p>A confirmation has been sent to your email. Please allow two hours for the full Kinu experience.</p>
                <button type="button" onClick={() => setBooking(null)}>Make another reservation</button>
              </motion.div>
            ) : (
              <motion.form className="kn-booking-form" onSubmit={submitBooking} key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <label><span>Name</span><input name="name" required autoComplete="name" placeholder="Your name" /></label>
                <label><span>Email</span><input name="email" required type="email" autoComplete="email" placeholder="you@email.com" /></label>
                <label><span>Date</span><input name="date" required type="date" min={new Date().toISOString().split('T')[0]} /></label>
                <label><span>Guests</span><select name="guests" required defaultValue="2"><option value="1">1 guest</option><option value="2">2 guests</option><option value="3">3 guests</option><option value="4">4 guests</option><option value="5">5 guests</option><option value="6">6 guests</option></select></label>
                <fieldset>
                  <legend>Preferred time</legend>
                  <div>{['17:30', '18:00', '19:30', '20:00', '21:30'].map((time) => <button type="button" className={selectedTime === time ? 'is-active' : ''} onClick={() => setSelectedTime(time)} key={time}>{time}</button>)}</div>
                </fieldset>
                <label className="kn-booking-note"><span>Notes <small>Optional</small></span><textarea name="notes" rows={3} placeholder="Allergies, celebration, or anything we should know" /></label>
                <button type="submit" className="kn-submit-booking"><span>Request reservation</span><ArrowUpRight /></button>
              </motion.form>
            )}
          </AnimatePresence>
        </section>
      </main>

      <footer className="kn-footer">
        <button type="button" className="kn-footer-logo" onClick={() => scrollTo('kn-top')}><span>絹</span><strong>KINU</strong></button>
        <div><small>Enquiries</small><a href="mailto:hello@kinu.restaurant">hello@kinu.restaurant</a><a href="tel:+442079460381">+44 (0)20 7946 0381</a></div>
        <div><small>Follow</small><a href="https://www.instagram.com/" target="_blank" rel="noreferrer">Instagram ↗</a><a href="https://www.facebook.com/" target="_blank" rel="noreferrer">Facebook ↗</a></div>
        <div className="kn-footer-bottom"><span>© Kinu London 2026</span><span>Japanese dining · Mayfair</span></div>
      </footer>

      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            className="kn-lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            role="dialog"
            aria-modal="true"
            aria-label="Gallery image viewer"
            onClick={() => setLightboxIndex(null)}
          >
            <button type="button" className="kn-lightbox-close" onClick={() => setLightboxIndex(null)} aria-label="Close gallery"><X /></button>
            <button type="button" className="kn-lightbox-prev" onClick={(event) => { event.stopPropagation(); moveLightbox(-1) }} aria-label="Previous image"><ChevronLeft /></button>
            <motion.img
              key={gallery[lightboxIndex].src}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              src={gallery[lightboxIndex].src}
              alt={gallery[lightboxIndex].alt}
              onClick={(event) => event.stopPropagation()}
            />
            <button type="button" className="kn-lightbox-next" onClick={(event) => { event.stopPropagation(); moveLightbox(1) }} aria-label="Next image"><ChevronRight /></button>
            <span className="kn-lightbox-count">0{lightboxIndex + 1} / 0{gallery.length}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
