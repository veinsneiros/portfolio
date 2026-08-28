import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import {
  ArrowDown,
  ArrowRight,
  Check,
  ChevronRight,
  Instagram,
  Menu,
  Minus,
  Plus,
  ShoppingBag,
  Trash2,
  X,
} from 'lucide-react'
import { useEffect, useMemo, useRef, useState } from 'react'
import type { CSSProperties, FormEvent } from 'react'
import { useLanguage, useTranslate } from '../../i18n/LanguageContext'
import './store.css'

type Category = 'All' | 'Floral' | 'Woody' | 'Noir'

type Product = {
  id: string
  name: string
  edition: string
  category: Exclude<Category, 'All'>
  price: number
  size: string
  concentration: string
  image: string
  imagePosition?: string
  alt: string
  notes: [string, string, string]
  description: string
  accent: string
  uk: {
    size: string
    concentration: string
    alt: string
    notes: [string, string, string]
    description: string
  }
}

const PRODUCTS: Product[] = [
  {
    id: 'after-dark',
    name: 'After Dark',
    edition: 'N° 01',
    category: 'Noir',
    price: 165,
    size: '50 ml',
    concentration: 'Parfum extrait',
    image: '/images/nocturne/after-dark.png',
    alt: 'Sculptural smoked-black Nocturne perfume bottle on stone and brushed metal',
    notes: ['Black tea', 'Incense', 'Vetiver'],
    description:
      'A slow-burning study in shadow. Smoked black tea opens into temple incense and a cool, mineral trail of Haitian vetiver.',
    accent: '#c2b5a0',
    uk: {
      size: '50 мл',
      concentration: 'Парфумований екстракт',
      alt: 'Скульптурний димчасто-чорний флакон Nocturne на камені та шліфованому металі',
      notes: ['Чорний чай', 'Ладан', 'Ветивер'],
      description:
        'Повільне занурення в тінь. Димний чорний чай розкривається храмовим ладаном і прохолодним мінеральним шлейфом гаїтянського ветиверу.',
    },
  },
  {
    id: 'velvet-hour',
    name: 'Velvet Hour',
    edition: 'N° 02',
    category: 'Floral',
    price: 180,
    size: '50 ml',
    concentration: 'Eau de parfum',
    image: '/images/nocturne/velvet-hour.png',
    alt: 'Deep plum Nocturne perfume bottle with crimson flowers and silk',
    notes: ['Damask rose', 'Saffron', 'Suede'],
    description:
      'Rose with its sweetness removed. Saffron and soft suede wrap the petals in an intimate, skin-close warmth.',
    accent: '#b96854',
    uk: {
      size: '50 мл',
      concentration: 'Парфумована вода',
      alt: 'Темно-сливовий флакон Nocturne серед багряних квітів і шовку',
      notes: ['Дамаська троянда', 'Шафран', 'Замша'],
      description:
        'Троянда, позбавлена солодкості. Шафран і м’яка замша огортають пелюстки інтимним теплом, що залишається близько до шкіри.',
    },
  },
  {
    id: 'ghost-wood',
    name: 'Ghost Wood',
    edition: 'N° 03',
    category: 'Woody',
    price: 155,
    size: '50 ml',
    concentration: 'Eau de parfum',
    image: '/images/nocturne/ghost-wood.png',
    alt: 'Pale smoked Nocturne perfume bottle on limestone with a botanical shadow',
    notes: ['Juniper', 'Hinoki', 'White musk'],
    description:
      'Air moving through a silent forest. Crisp juniper, pale hinoki and clean musk leave a translucent signature.',
    accent: '#a8aaa2',
    uk: {
      size: '50 мл',
      concentration: 'Парфумована вода',
      alt: 'Світлий димчастий флакон Nocturne на вапняку з ботанічною тінню',
      notes: ['Ялівець', 'Хінокі', 'Білий мускус'],
      description:
        'Повітря, що рухається крізь безмовний ліс. Свіжий ялівець, світлий хінокі й чистий мускус залишають прозорий шлейф.',
    },
  },
  {
    id: 'electric-bloom',
    name: 'Electric Bloom',
    edition: 'N° 04',
    category: 'Floral',
    price: 145,
    size: '50 ml',
    concentration: 'Eau de parfum',
    image: '/images/nocturne/electric-bloom.png',
    alt: 'Chartreuse Nocturne perfume bottle among coral petals and green leaves',
    notes: ['Neroli', 'Tuberose', 'Pink pepper'],
    description:
      'White flowers after a summer storm: luminous neroli, charged tuberose and a bright flash of pink pepper.',
    accent: '#bbd857',
    uk: {
      size: '50 мл',
      concentration: 'Парфумована вода',
      alt: 'Шартрезовий флакон Nocturne серед коралових пелюсток і зеленого листя',
      notes: ['Неролі', 'Тубероза', 'Рожевий перець'],
      description:
        'Білі квіти після літньої грози: сяйливий неролі, наелектризована тубероза та яскравий спалах рожевого перцю.',
    },
  },
  {
    id: 'blue-cipher',
    name: 'Blue Cipher',
    edition: 'N° 05',
    category: 'Noir',
    price: 175,
    size: '50 ml',
    concentration: 'Parfum extrait',
    image: '/images/nocturne/blue-cipher.png',
    alt: 'Deep cobalt Nocturne perfume bottle with reflected water light',
    notes: ['Bergamot', 'Orris', 'Ambergris'],
    description:
      'A cold spark of bergamot dissolves into powdery orris and salted ambergris. Precise, strange and quietly magnetic.',
    accent: '#708796',
    uk: {
      size: '50 мл',
      concentration: 'Парфумований екстракт',
      alt: 'Насичено-кобальтовий флакон Nocturne у відблисках води',
      notes: ['Бергамот', 'Корінь ірису', 'Амбра'],
      description:
        'Холодна іскра бергамоту розчиняється в пудровому корені ірису та солоній амбрі. Точний, дивний і стримано магнетичний.',
    },
  },
  {
    id: 'cedar-radio',
    name: 'Cedar Radio',
    edition: 'N° 06',
    category: 'Woody',
    price: 160,
    size: '50 ml',
    concentration: 'Eau de parfum',
    image: '/images/nocturne/cedar-radio.png',
    alt: 'Amber Nocturne perfume bottle on architectural cedar and charred wood',
    notes: ['Cardamom', 'Cedar', 'Tonka bean'],
    description:
      'Warm circuitry: green cardamom flickers over dry cedar before settling into the low hum of roasted tonka bean.',
    accent: '#af8c64',
    uk: {
      size: '50 мл',
      concentration: 'Парфумована вода',
      alt: 'Бурштиновий флакон Nocturne на архітектурних формах із кедра та обвугленого дерева',
      notes: ['Кардамон', 'Кедр', 'Боби тонка'],
      description:
        'Тепла електрика: зелений кардамон мерехтить над сухим кедром, а потім стихає в низькому гулі обсмажених бобів тонка.',
    },
  },
]

const CATEGORIES: Category[] = ['All', 'Floral', 'Woody', 'Noir']

function formatPrice(value: number, language: 'en' | 'uk') {
  return new Intl.NumberFormat(language === 'uk' ? 'uk-UA' : 'en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(value)
}

export default function StoreSite() {
  const rootRef = useRef<HTMLDivElement>(null)
  const reduceMotion = useReducedMotion()
  const { language } = useLanguage()
  const t = useTranslate()
  const [activeCategory, setActiveCategory] = useState<Category>('All')
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [cartOpen, setCartOpen] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [cart, setCart] = useState<Record<string, number>>({})
  const [toastProduct, setToastProduct] = useState<Product | null>(null)
  const [checkoutComplete, setCheckoutComplete] = useState(false)
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const filteredProducts = useMemo(
    () =>
      activeCategory === 'All'
        ? PRODUCTS
        : PRODUCTS.filter((product) => product.category === activeCategory),
    [activeCategory],
  )

  const cartItems = useMemo(
    () =>
      PRODUCTS.flatMap((product) => {
        const quantity = cart[product.id] ?? 0
        return quantity > 0 ? [{ product, quantity }] : []
      }),
    [cart],
  )

  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0)
  const subtotal = cartItems.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0,
  )

  useEffect(() => {
    if (!toastProduct) return
    const timeout = window.setTimeout(() => setToastProduct(null), 2600)
    return () => window.clearTimeout(timeout)
  }, [toastProduct])

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Escape' || (!selectedProduct && !cartOpen && !mobileOpen)) return
      // The portfolio shell also owns Escape. Capture it while a store overlay is open
      // so the first press dismisses the local UI instead of closing the whole demo.
      event.preventDefault()
      event.stopPropagation()
      event.stopImmediatePropagation()
      setSelectedProduct(null)
      setCartOpen(false)
      setMobileOpen(false)
    }
    window.addEventListener('keydown', handleKeyDown, { capture: true })
    return () => window.removeEventListener('keydown', handleKeyDown, { capture: true })
  }, [selectedProduct, cartOpen, mobileOpen])

  useEffect(() => {
    if (!selectedProduct && !cartOpen && !mobileOpen) return
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = previousOverflow
    }
  }, [selectedProduct, cartOpen, mobileOpen])

  const scrollToSection = (id: string) => {
    setMobileOpen(false)
    rootRef.current
      ?.querySelector<HTMLElement>(`#${id}`)
      ?.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' })
  }

  const addToCart = (product: Product, revealCart = false) => {
    setCart((current) => ({
      ...current,
      [product.id]: (current[product.id] ?? 0) + 1,
    }))
    setCheckoutComplete(false)
    setToastProduct(product)
    if (revealCart) {
      setSelectedProduct(null)
      setCartOpen(true)
    }
  }

  const updateQuantity = (productId: string, difference: number) => {
    setCart((current) => {
      const nextQuantity = Math.max(0, (current[productId] ?? 0) + difference)
      const next = { ...current }
      if (nextQuantity === 0) delete next[productId]
      else next[productId] = nextQuantity
      return next
    })
    setCheckoutComplete(false)
  }

  const handleNewsletter = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!email.trim()) return
    setSubscribed(true)
  }

  const handleCheckout = () => {
    setCart({})
    setCheckoutComplete(true)
  }

  const featured = PRODUCTS[0]
  const productCopy = (product: Product) => language === 'uk' ? product.uk : product
  const categoryLabel = (category: Category) => ({
    All: t('All', 'Усі'),
    Floral: t('Floral', 'Квіткові'),
    Woody: t('Woody', 'Деревні'),
    Noir: t('Noir', 'Темні'),
  })[category]
  const featuredCopy = productCopy(featured)
  const selectedCopy = selectedProduct ? productCopy(selectedProduct) : null

  return (
    <div className="nocturne-site" ref={rootRef}>
      <header className="ns-header">
        <button
          className="ns-wordmark"
          type="button"
          onClick={() => rootRef.current?.scrollIntoView({ behavior: 'smooth' })}
          aria-label={t('Nocturne, return to top', 'Nocturne, повернутися на початок')}
        >
          NOCTURNE<span>®</span>
        </button>

        <nav className="ns-desktop-nav" aria-label={t('Nocturne navigation', 'Навігація Nocturne')}>
          <button type="button" onClick={() => scrollToSection('nocturne-catalog')}>
            {t('Collection', 'Колекція')}
          </button>
          <button type="button" onClick={() => scrollToSection('nocturne-atelier')}>
            {t('The atelier', 'Ательє')}
          </button>
          <button type="button" onClick={() => scrollToSection('nocturne-journal')}>
            {t('Journal', 'Журнал')}
          </button>
        </nav>

        <div className="ns-header-actions">
          <button
            className="ns-bag-button"
            type="button"
            onClick={() => {
              setMobileOpen(false)
              setCartOpen(true)
            }}
            aria-label={t(
              `Open shopping bag with ${cartCount} items`,
              `Відкрити кошик, товарів: ${cartCount}`,
            )}
          >
            <ShoppingBag size={17} strokeWidth={1.7} aria-hidden="true" />
            <span>{t('Bag', 'Кошик')}</span>
            <span className="ns-bag-count">{String(cartCount).padStart(2, '0')}</span>
          </button>
          <button
            className="ns-menu-button"
            type="button"
            onClick={() => setMobileOpen((open) => !open)}
            aria-label={mobileOpen
              ? t('Close navigation menu', 'Закрити меню навігації')
              : t('Open navigation menu', 'Відкрити меню навігації')}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
          </button>
        </div>

        <AnimatePresence>
          {mobileOpen && (
            <motion.nav
              className="ns-mobile-nav"
              aria-label={t('Mobile navigation', 'Мобільна навігація')}
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
            >
              <button type="button" onClick={() => scrollToSection('nocturne-catalog')}>
                <span>01</span> {t('Collection', 'Колекція')} <ArrowRight aria-hidden="true" />
              </button>
              <button type="button" onClick={() => scrollToSection('nocturne-atelier')}>
                <span>02</span> {t('The atelier', 'Ательє')} <ArrowRight aria-hidden="true" />
              </button>
              <button type="button" onClick={() => scrollToSection('nocturne-journal')}>
                <span>03</span> {t('Journal', 'Журнал')} <ArrowRight aria-hidden="true" />
              </button>
            </motion.nav>
          )}
        </AnimatePresence>
      </header>

      <main>
        <section className="ns-hero" aria-labelledby="nocturne-title">
          <motion.div
            className="ns-hero-copy"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: reduceMotion ? 0 : 0.6 }}
          >
            <div className="ns-hero-kicker">
              <span>{t('Independent perfumery', 'Незалежна парфумерія')}</span>
              <span>{t('Paris / Montreal', 'Париж / Монреаль')}</span>
            </div>
            <h1 id="nocturne-title">
              <motion.span
                initial={{ y: reduceMotion ? 0 : '110%' }}
                animate={{ y: 0 }}
                transition={{ duration: reduceMotion ? 0 : 0.7, ease: [0.16, 1, 0.3, 1] }}
              >
                {t('Wear', 'Огорніться')}
              </motion.span>
              <motion.span
                className="ns-hero-title-italic"
                initial={{ y: reduceMotion ? 0 : '110%' }}
                animate={{ y: 0 }}
                transition={{
                  duration: reduceMotion ? 0 : 0.7,
                  delay: reduceMotion ? 0 : 0.08,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                {t('the night.', 'ніччю.')}
              </motion.span>
            </h1>
            <div className="ns-hero-bottom">
              <p>
                {t(
                  'Radical fragrance for the hours that refuse to be ordinary. Composed in darkness, bottled by hand.',
                  'Радикальні аромати для годин, які відмовляються бути звичайними. Створені в темряві, розлиті вручну.',
                )}
              </p>
              <button
                className="ns-arrow-link ns-arrow-link--light"
                type="button"
                onClick={() => scrollToSection('nocturne-catalog')}
              >
                {t('Discover the collection', 'Відкрити колекцію')}
                <span><ArrowDown size={18} aria-hidden="true" /></span>
              </button>
            </div>
          </motion.div>

          <motion.div
            className="ns-hero-visual"
            initial={{ clipPath: reduceMotion ? 'inset(0)' : 'inset(0 0 100% 0)' }}
            animate={{ clipPath: 'inset(0)' }}
            transition={{ duration: reduceMotion ? 0 : 0.9, delay: 0.15, ease: [0.76, 0, 0.24, 1] }}
          >
            <img src={featured.image} alt={featuredCopy.alt} />
            <div className="ns-hero-image-noise" aria-hidden="true" />
            <div className="ns-hero-edition">N° 01 — 2026</div>
            <div className="ns-hero-product">
              <div>
                <span>{featuredCopy.concentration}</span>
                <strong>{featured.name}</strong>
              </div>
              <div>
                <span>{featuredCopy.size}</span>
                <strong>{formatPrice(featured.price, language)}</strong>
              </div>
              <button
                type="button"
                onClick={() => addToCart(featured, true)}
                aria-label={t(`Add ${featured.name} to bag`, `Додати ${featured.name} до кошика`)}
              >
                {t('Add to bag', 'До кошика')} <Plus size={17} aria-hidden="true" />
              </button>
            </div>
          </motion.div>
        </section>

        <section className="ns-signal" aria-label={t('Nocturne philosophy', 'Філософія Nocturne')}>
          <div className="ns-signal-index">{t('( Our signal )', '( Наш сигнал )')}</div>
          <motion.p
            initial={{ opacity: 0.25 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.45 }}
            transition={{ duration: reduceMotion ? 0 : 0.8 }}
          >
            {t('We make perfume for the space between ', 'Ми створюємо парфуми для простору між ')}
            <em>{t('who you are', 'тим, ким ви є')}</em>
            {t(' and who you become after midnight.', ' і тим, ким стаєте після опівночі.')}
          </motion.p>
          <div className="ns-signal-meta">
            <span>{t('Small batch', 'Малі партії')}</span>
            <span>{t('Genderless', 'Поза гендером')}</span>
            <span>{t('Made in France', 'Створено у Франції')}</span>
          </div>
        </section>

        <section className="ns-catalog" id="nocturne-catalog" aria-labelledby="catalog-title">
          <div className="ns-section-heading">
            <div>
              <span className="ns-section-number">01 / 03</span>
              <span className="ns-section-label">{t('Olfactive objects', 'Ольфакторні об’єкти')}</span>
            </div>
            <h2 id="catalog-title">{t('The collection', 'Колекція')}</h2>
            <p>
              {t(
                'Six nocturnal compositions. No rules, no prescribed gender—only instinct.',
                'Шість нічних композицій. Без правил і нав’язаного гендеру — лише інстинкт.',
              )}
            </p>
          </div>

          <div
            className="ns-filter-row"
            aria-label={t('Filter products by scent family', 'Фільтр товарів за родиною ароматів')}
          >
            {CATEGORIES.map((category) => (
              <button
                key={category}
                type="button"
                className={activeCategory === category ? 'is-active' : ''}
                onClick={() => setActiveCategory(category)}
                aria-pressed={activeCategory === category}
              >
                {categoryLabel(category)}
                <sup>
                  {category === 'All'
                    ? PRODUCTS.length
                    : PRODUCTS.filter((product) => product.category === category).length}
                </sup>
              </button>
            ))}
          </div>

          <motion.div className="ns-product-grid" layout>
            <AnimatePresence mode="popLayout" initial={false}>
              {filteredProducts.map((product, index) => {
                const copy = productCopy(product)
                return (
                  <motion.article
                    className="ns-product"
                    key={product.id}
                    layout
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 12 }}
                    transition={{ duration: reduceMotion ? 0 : 0.35, delay: index * 0.025 }}
                    style={{ '--product-accent': product.accent } as CSSProperties}
                  >
                    <button
                      className="ns-product-visual"
                      type="button"
                      onClick={() => setSelectedProduct(product)}
                      aria-label={t(
                        `View details for ${product.name}`,
                        `Переглянути інформацію про аромат ${product.name}`,
                      )}
                    >
                      <span className="ns-product-edition">{product.edition}</span>
                      <img
                        src={product.image}
                        alt={copy.alt}
                        style={{ objectPosition: product.imagePosition }}
                        loading="lazy"
                      />
                      <span className="ns-product-view">
                        {t('View scent', 'Переглянути аромат')} <ArrowRight size={17} aria-hidden="true" />
                      </span>
                    </button>
                    <div className="ns-product-info">
                      <button type="button" onClick={() => setSelectedProduct(product)}>
                        <span>{product.name}</span>
                        <small>{categoryLabel(product.category)} / {copy.size}</small>
                      </button>
                      <div>
                        <span>{formatPrice(product.price, language)}</span>
                        <button
                          type="button"
                          className="ns-product-add"
                          onClick={() => addToCart(product)}
                          aria-label={t(
                            `Add ${product.name} to bag`,
                            `Додати ${product.name} до кошика`,
                          )}
                        >
                          <Plus size={18} aria-hidden="true" />
                        </button>
                      </div>
                    </div>
                  </motion.article>
                )
              })}
            </AnimatePresence>
          </motion.div>
        </section>

        <section className="ns-atelier" id="nocturne-atelier" aria-labelledby="atelier-title">
          <div className="ns-atelier-image-wrap">
            <motion.img
              src="https://images.unsplash.com/photo-1709662074625-b646cd95c0d3?auto=format&fit=crop&w=1600&q=88"
              alt={t(
                'Perfumer using a glass pipette to fill a fragrance bottle',
                'Парфумер наповнює флакон аромату скляною піпеткою',
              )}
              loading="lazy"
              initial={{ scale: reduceMotion ? 1 : 1.08 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: reduceMotion ? 0 : 1.2, ease: [0.16, 1, 0.3, 1] }}
            />
            <span>{t('Atelier 11, Grasse', 'Ательє 11, Грасс')}</span>
          </div>
          <div className="ns-atelier-copy">
            <div className="ns-section-heading ns-section-heading--dark">
              <div>
                <span className="ns-section-number">02 / 03</span>
                <span className="ns-section-label">{t('Behind the formula', 'За лаштунками формули')}</span>
              </div>
              <h2 id="atelier-title">
                {t('Made slowly.', 'Створено повільно.')}<br />
                <em>{t('Felt instantly.', 'Відчутно миттєво.')}</em>
              </h2>
            </div>
            <p className="ns-atelier-lead">
              {t(
                'Every Nocturne perfume is composed in Grasse and matured for twelve weeks before it ever touches skin.',
                'Кожен аромат Nocturne створюють у Грассі й витримують дванадцять тижнів, перш ніж він уперше торкнеться шкіри.',
              )}
            </p>
            <div className="ns-atelier-facts">
              <div>
                <strong>28%</strong>
                <span>{t('Perfume oil in every extrait', 'Парфумерної олії в кожному екстракті')}</span>
              </div>
              <div>
                <strong>{t('12w', '12 тиж.')}</strong>
                <span>{t('Minimum maturation time', 'Мінімальний час визрівання')}</span>
              </div>
              <div>
                <strong>00</strong>
                <span>{t('Animal-derived ingredients', 'Інгредієнтів тваринного походження')}</span>
              </div>
            </div>
            <button
              className="ns-arrow-link ns-arrow-link--light"
              type="button"
              onClick={() => scrollToSection('nocturne-journal')}
            >
              {t('Read our field notes', 'Читати польові нотатки')}
              <span><ArrowRight size={18} aria-hidden="true" /></span>
            </button>
          </div>
        </section>

        <section className="ns-notes" id="nocturne-journal" aria-labelledby="notes-title">
          <div className="ns-notes-topline">
            <span>03 / 03</span>
            <span>{t('Field note № 018', 'Польова нотатка № 018')}</span>
            <span>{t('Five-minute read', 'П’ять хвилин читання')}</span>
          </div>
          <div className="ns-notes-grid">
            <div>
              <span className="ns-section-label">{t('Journal / Materials', 'Журнал / Матеріали')}</span>
              <h2 id="notes-title">
                {t('Why the darkest scents begin with light.', 'Чому найтемніші аромати починаються зі світла.')}
              </h2>
              <button
                className="ns-arrow-link"
                type="button"
                onClick={() => setSelectedProduct(PRODUCTS[4])}
              >
                {t('Explore the composition', 'Дослідити композицію')}
                <span><ChevronRight size={18} aria-hidden="true" /></span>
              </button>
            </div>
            <motion.figure
              initial={{ opacity: 0, y: reduceMotion ? 0 : 36 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
            >
              <img
                src="https://images.unsplash.com/photo-1612817288484-6f916006741a?auto=format&fit=crop&w=1400&q=88"
                alt={t(
                  'Botanical essences and glass vessels in warm light',
                  'Ботанічні есенції та скляні посудини в теплому світлі',
                )}
                loading="lazy"
              />
              <figcaption>
                {t('Iris pallida / Tuscany', 'Iris pallida / Тоскана')}<br />
                {t('Harvested before dawn', 'Зібрано до світанку')}
              </figcaption>
            </motion.figure>
          </div>
        </section>

        <section className="ns-newsletter" aria-labelledby="newsletter-title">
          <div>
            <span>{t('Private transmissions', 'Приватні послання')}</span>
            <h2 id="newsletter-title">
              {t('Letters from', 'Листи з')}<br />{t('after dark.', 'темряви.')}
            </h2>
          </div>
          {subscribed ? (
            <motion.div
              className="ns-newsletter-success"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              role="status"
            >
              <span><Check aria-hidden="true" /></span>
              <div>
                <strong>{t('You’re on the list.', 'Ви у списку.')}</strong>
                <p>{t('Watch your inbox after sunset.', 'Зазирніть у пошту після заходу сонця.')}</p>
              </div>
            </motion.div>
          ) : (
            <form onSubmit={handleNewsletter}>
              <label htmlFor="nocturne-email">{t('Email address', 'Електронна пошта')}</label>
              <div>
                <input
                  id="nocturne-email"
                  type="email"
                  required
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder={t('you@somewhere.com', 'ви@десь.com')}
                  autoComplete="email"
                />
                <button
                  type="submit"
                  aria-label={t('Subscribe to Nocturne letters', 'Підписатися на листи Nocturne')}
                >
                  {t('Join the list', 'Приєднатися')} <ArrowRight aria-hidden="true" />
                </button>
              </div>
              <p>
                {t(
                  'New releases, field notes and invitations. Sent sparingly.',
                  'Нові релізи, польові нотатки та запрошення. Пишемо зрідка.',
                )}
              </p>
            </form>
          )}
        </section>
      </main>

      <footer className="ns-footer">
        <div className="ns-footer-main">
          <span className="ns-footer-logo">NOCTURNE®</span>
          <p>
            {t('Independent fragrance', 'Незалежна парфумерія')}<br />
            {t('for unconventional hours.', 'для незвичних годин.')}
          </p>
        </div>
        <div className="ns-footer-links">
          <div>
            <span>{t('Inquiries', 'Зв’язок')}</span>
            <a href="mailto:atelier@nocturne.paris">atelier@nocturne.paris</a>
          </div>
          <div>
            <span>{t('Social', 'Соцмережі')}</span>
            <a href="https://www.instagram.com" target="_blank" rel="noreferrer">
              Instagram <Instagram size={14} aria-hidden="true" />
            </a>
          </div>
        </div>
        <div className="ns-footer-legal">
          <span>© 2026 Nocturne Parfums</span>
          <span>{t('Paris / Montreal', 'Париж / Монреаль')}</span>
          <button type="button" onClick={() => rootRef.current?.scrollIntoView({ behavior: 'smooth' })}>
            {t('Back to top ↑', 'На початок ↑')}
          </button>
        </div>
      </footer>

      <AnimatePresence>
        {selectedProduct && selectedCopy && (
          <motion.div
            className="ns-modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onMouseDown={(event) => {
              if (event.target === event.currentTarget) setSelectedProduct(null)
            }}
          >
            <motion.section
              className="ns-product-modal"
              role="dialog"
              aria-modal="true"
              aria-labelledby="product-modal-title"
              initial={{ opacity: 0, y: reduceMotion ? 0 : 44, scale: reduceMotion ? 1 : 0.985 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: reduceMotion ? 0 : 28 }}
              transition={{ duration: reduceMotion ? 0 : 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              <button
                className="ns-modal-close"
                type="button"
                onClick={() => setSelectedProduct(null)}
                aria-label={t('Close product details', 'Закрити деталі аромату')}
              >
                <X aria-hidden="true" />
              </button>
              <div
                className="ns-modal-image"
                style={{ '--product-accent': selectedProduct.accent } as CSSProperties}
              >
                <span>{selectedProduct.edition}</span>
                <img src={selectedProduct.image} alt={selectedCopy.alt} />
              </div>
              <div className="ns-modal-copy">
                <div className="ns-modal-meta">
                  <span>{categoryLabel(selectedProduct.category)}</span>
                  <span>{selectedCopy.concentration}</span>
                </div>
                <h2 id="product-modal-title">{selectedProduct.name}</h2>
                <p className="ns-modal-description">{selectedCopy.description}</p>
                <div className="ns-modal-notes">
                  <span>{t('Top / Heart / Base', 'Верх / Серце / База')}</span>
                  <ol>
                    {selectedCopy.notes.map((note) => <li key={note}>{note}</li>)}
                  </ol>
                </div>
                <div className="ns-modal-purchase">
                  <div>
                    <span>{selectedCopy.size}</span>
                    <strong>{formatPrice(selectedProduct.price, language)}</strong>
                  </div>
                  <button type="button" onClick={() => addToCart(selectedProduct, true)}>
                    {t('Add to bag', 'До кошика')} <Plus aria-hidden="true" />
                  </button>
                </div>
                <p className="ns-modal-delivery">
                  {t(
                    'Complimentary shipping and two samples included.',
                    'Безкоштовна доставка та два зразки в подарунок.',
                  )}
                </p>
              </div>
            </motion.section>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {cartOpen && (
          <motion.div
            className="ns-drawer-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onMouseDown={(event) => {
              if (event.target === event.currentTarget) setCartOpen(false)
            }}
          >
            <motion.aside
              className="ns-cart-drawer"
              role="dialog"
              aria-modal="true"
              aria-labelledby="cart-title"
              initial={{ x: reduceMotion ? 0 : '100%' }}
              animate={{ x: 0 }}
              exit={{ x: reduceMotion ? 0 : '100%' }}
              transition={{ duration: reduceMotion ? 0 : 0.46, ease: [0.76, 0, 0.24, 1] }}
            >
              <div className="ns-cart-head">
                <div>
                  <span>{t('Your selection', 'Ваш вибір')}</span>
                  <h2 id="cart-title">{t('The bag', 'Кошик')} <sup>{cartCount}</sup></h2>
                </div>
                <button
                  type="button"
                  onClick={() => setCartOpen(false)}
                  aria-label={t('Close shopping bag', 'Закрити кошик')}
                >
                  <X aria-hidden="true" />
                </button>
              </div>

              {checkoutComplete ? (
                <motion.div
                  className="ns-checkout-complete"
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  role="status"
                >
                  <span><Check aria-hidden="true" /></span>
                  <p>{t('Order simulation complete', 'Тестове замовлення оформлено')}</p>
                  <h3>{t('Consider the night yours.', 'Ця ніч — ваша.')}</h3>
                  <small>
                    {t(
                      'This is a demo store, so no payment was collected.',
                      'Це демонстраційний магазин, тому оплату не стягнуто.',
                    )}
                  </small>
                  <button type="button" onClick={() => {
                    setCheckoutComplete(false)
                    setCartOpen(false)
                  }}>
                    {t('Continue exploring', 'Продовжити знайомство')} <ArrowRight aria-hidden="true" />
                  </button>
                </motion.div>
              ) : cartItems.length === 0 ? (
                <div className="ns-cart-empty">
                  <span>00</span>
                  <h3>{t('Your night is still unwritten.', 'Ваша ніч іще не написана.')}</h3>
                  <p>
                    {t(
                      'Begin with one of our six olfactive objects.',
                      'Почніть із одного з шести наших ольфакторних об’єктів.',
                    )}
                  </p>
                  <button type="button" onClick={() => {
                    setCartOpen(false)
                    window.setTimeout(() => scrollToSection('nocturne-catalog'), 80)
                  }}>
                    {t('Explore the collection', 'Переглянути колекцію')} <ArrowRight aria-hidden="true" />
                  </button>
                </div>
              ) : (
                <>
                  <div className="ns-cart-items" data-lenis-prevent>
                    {cartItems.map(({ product, quantity }) => {
                      const copy = productCopy(product)
                      return (
                        <motion.div className="ns-cart-item" layout key={product.id}>
                          <button
                            className="ns-cart-item-image"
                            type="button"
                            onClick={() => {
                              setCartOpen(false)
                              setSelectedProduct(product)
                            }}
                            aria-label={t(`View ${product.name}`, `Переглянути ${product.name}`)}
                          >
                            <img src={product.image} alt="" />
                          </button>
                          <div className="ns-cart-item-info">
                            <div>
                              <button type="button" onClick={() => {
                                setCartOpen(false)
                                setSelectedProduct(product)
                              }}>
                                {product.name}
                              </button>
                              <span>{copy.size} / {copy.concentration}</span>
                            </div>
                            <div className="ns-cart-item-bottom">
                              <div
                                className="ns-quantity"
                                aria-label={t(
                                  `Quantity for ${product.name}`,
                                  `Кількість ${product.name}`,
                                )}
                              >
                                <button
                                  type="button"
                                  onClick={() => updateQuantity(product.id, -1)}
                                  aria-label={t(
                                    `Decrease ${product.name} quantity`,
                                    `Зменшити кількість ${product.name}`,
                                  )}
                                >
                                  <Minus aria-hidden="true" />
                                </button>
                                <span aria-live="polite">{quantity}</span>
                                <button
                                  type="button"
                                  onClick={() => updateQuantity(product.id, 1)}
                                  aria-label={t(
                                    `Increase ${product.name} quantity`,
                                    `Збільшити кількість ${product.name}`,
                                  )}
                                >
                                  <Plus aria-hidden="true" />
                                </button>
                              </div>
                              <strong>{formatPrice(product.price * quantity, language)}</strong>
                              <button
                                className="ns-remove-item"
                                type="button"
                                onClick={() => updateQuantity(product.id, -quantity)}
                                aria-label={t(
                                  `Remove ${product.name} from bag`,
                                  `Видалити ${product.name} з кошика`,
                                )}
                              >
                                <Trash2 aria-hidden="true" />
                              </button>
                            </div>
                          </div>
                        </motion.div>
                      )
                    })}
                  </div>
                  <div className="ns-cart-summary">
                    <div>
                      <span>{t('Subtotal', 'Проміжний підсумок')}</span>
                      <strong>{formatPrice(subtotal, language)}</strong>
                    </div>
                    <p>
                      {t(
                        'Taxes calculated at checkout. Complimentary shipping included.',
                        'Податки буде розраховано під час оформлення. Доставка безкоштовна.',
                      )}
                    </p>
                    <button type="button" onClick={handleCheckout}>
                      {t('Simulate checkout', 'Оформити тестове замовлення')} <ArrowRight aria-hidden="true" />
                    </button>
                  </div>
                </>
              )}
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {toastProduct && (
          <motion.div
            className="ns-toast"
            role="status"
            aria-live="polite"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
          >
            <Check size={16} aria-hidden="true" />
            <span>
              {t(
                `${toastProduct.name} added to your bag`,
                `${toastProduct.name} додано до кошика`,
              )}
            </span>
            <button type="button" onClick={() => {
              setToastProduct(null)
              setCartOpen(true)
            }}>
              {t('View bag', 'Переглянути кошик')}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
