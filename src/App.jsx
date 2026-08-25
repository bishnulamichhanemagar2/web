import { useEffect, useMemo, useRef, useState } from 'react'
import './App.css'

const productsSeed = [
  { id: 1, name: 'Haven Lounge Chair', category: 'Furniture', price: 248, detail: 'Oat boucle · Ash wood', image: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?auto=format&fit=crop&w=900&q=85', tone: 'warm' },
  { id: 2, name: 'Arc Table Lamp', category: 'Lighting', price: 96, detail: 'Brushed brass · Linen shade', image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=900&q=85', tone: 'gold' },
  { id: 3, name: 'Form Stoneware Set', category: 'Tabletop', price: 74, detail: 'Hand-thrown · Set of 4', image: 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=900&q=85', tone: 'clay' },
  { id: 4, name: 'Woven Day Bag', category: 'Accessories', price: 118, detail: 'Natural raffia · Leather trim', image: 'https://images.unsplash.com/photo-1594223274512-ad4803739b7c?auto=format&fit=crop&w=900&q=85', tone: 'sand' },
  { id: 5, name: 'Moss Throw', category: 'Textiles', price: 82, detail: 'Organic cotton · 130 × 180 cm', image: 'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&w=900&q=85', tone: 'green' },
  { id: 6, name: 'Sculptural Vase', category: 'Tabletop', price: 64, detail: 'Matte ceramic · Sea salt', image: 'https://images.unsplash.com/photo-1612196808214-b8e1d6145a8c?auto=format&fit=crop&w=900&q=85', tone: 'blue' },
  { id: 7, name: 'Cove Side Table', category: 'Furniture', price: 186, detail: 'Travertine · Rounded edge', image: 'https://images.unsplash.com/photo-1532372320572-cda25653a26d?auto=format&fit=crop&w=900&q=85', tone: 'clay' },
  { id: 8, name: 'Luna Pendant', category: 'Lighting', price: 142, detail: 'Opal glass · Aged brass', image: 'https://images.unsplash.com/photo-1543198126-a8ad8e47fb22?auto=format&fit=crop&w=900&q=85', tone: 'gold' },
  { id: 9, name: 'Daily Carry Tote', category: 'Accessories', price: 88, detail: 'Washed canvas · Cotton strap', image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=900&q=85', tone: 'sand' },
  { id: 10, name: 'Linen Cushion Set', category: 'Textiles', price: 68, detail: 'Stonewashed linen · Set of 2', image: 'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&w=900&q=85', tone: 'sand' },
  { id: 11, name: 'Carafe No. 2', category: 'Tabletop', price: 58, detail: 'Recycled glass · 1 litre', image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=900&q=85', tone: 'blue' },
  { id: 12, name: 'Archive Candle', category: 'Objects', price: 36, detail: 'Cedar & fig · Soy wax', image: 'https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&w=900&q=85', tone: 'warm' },
  { id: 13, name: 'Everyday Overshirt', category: 'Clothes', price: 128, detail: 'Organic cotton · Fern green', image: 'https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?auto=format&fit=crop&w=900&q=85', tone: 'green' },
  { id: 14, name: 'Stack Cup Set', category: 'Cups', price: 42, detail: 'Glazed stoneware · Set of 4', image: 'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?auto=format&fit=crop&w=900&q=85', tone: 'clay' },
  { id: 15, name: 'Morrow Watch', category: 'Watches', price: 220, detail: 'Brushed steel · Leather strap', image: 'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?auto=format&fit=crop&w=900&q=85', tone: 'gold' },
  { id: 16, name: 'Frame 4K Television', category: 'TVs', price: 799, detail: '48 inch · Gallery display mode', image: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?auto=format&fit=crop&w=900&q=85', tone: 'blue' },
  { id: 17, name: 'Nexus Mobile One', category: 'Mobiles', price: 649, detail: 'Graphite · 256 GB', image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=900&q=85', tone: 'blue' },
  { id: 18, name: 'Halo Floor Light', category: 'Lights', price: 214, detail: 'Warm LED · Recycled aluminium', image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=900&q=85', tone: 'gold' },
  { id: 19, name: 'Nexus Air Laptop', category: 'Laptops', price: 999, detail: '13 inch · 16 GB memory', image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=900&q=85', tone: 'sand' },
  { id: 20, name: 'Canvas City Sneakers', category: 'Clothes', price: 94, detail: 'Recycled canvas · Rubber sole', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=85', tone: 'clay' },
  { id: 21, name: 'Transit Weekender', category: 'Accessories', price: 156, detail: 'Waxed canvas · Brass hardware', image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=900&q=85', tone: 'green' },
  { id: 22, name: 'Quiet Wireless Headphones', category: 'Mobiles', price: 188, detail: 'Active noise canceling · 30 hour battery', image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=900&q=85', tone: 'blue' },
  { id: 23, name: 'Pocket Bluetooth Speaker', category: 'Mobiles', price: 79, detail: 'Water resistant · Recycled shell', image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&w=900&q=85', tone: 'gold' },
  { id: 24, name: 'Morning Coffee Maker', category: 'Objects', price: 164, detail: 'Pour-over · Stainless steel', image: 'https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?auto=format&fit=crop&w=900&q=85', tone: 'warm' },
  { id: 25, name: 'Desk Tray Set', category: 'Objects', price: 52, detail: 'Powder-coated steel · Set of 2', image: 'https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?auto=format&fit=crop&w=900&q=85', tone: 'sand' },
]

const materialByCategory = { Furniture: 'Wood', Lighting: 'Metal', Tabletop: 'Ceramic', Accessories: 'Leather', Textiles: 'Linen', Objects: 'Wax', Clothes: 'Cotton', Cups: 'Ceramic', Watches: 'Steel', TVs: 'Glass', Mobiles: 'Aluminium', Lights: 'Metal', Laptops: 'Aluminium' }

// Deterministic pseudo-random from an id, so ratings stay stable across renders/reloads.
function seededFraction(id, salt) {
  const value = Math.sin(id * salt) * 10000
  return value - Math.floor(value)
}
const ratingFor = (id) => Math.round((3.9 + seededFraction(id, 999.13) * 1.1) * 10) / 10
const reviewsFor = (id) => 12 + Math.floor(seededFraction(id, 137.5) * 240)

const addComputed = (product) => ({
  ...product,
  material: product.material || materialByCategory[product.category] || 'Mixed material',
  rating: product.rating || ratingFor(product.id),
  reviews: product.reviews || reviewsFor(product.id),
})

const rotatingWords = ['better.', 'calmer.', 'joyful.', 'yours.']

const categoryTiles = [
  { label: 'Furniture', count: 'Seating & tables', image: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?auto=format&fit=crop&w=800&q=85', tone: 'warm' },
  { label: 'Lighting', count: 'Glow & ambience', image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=800&q=85', tone: 'gold' },
  { label: 'Tabletop', count: 'Dine & display', image: 'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?auto=format&fit=crop&w=800&q=85', tone: 'clay' },
  { label: 'Textiles', count: 'Layer & lounge', image: 'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&w=800&q=85', tone: 'green' },
]

const WISHLIST_KEY = 'nexus-wishlist'
const CART_KEY = 'nexus-cart'
const RECENT_KEY = 'nexus-recent'
const ORDERS_KEY = 'nexus-orders'
const CUSTOMER_KEY = 'nexus-customer'
const ORDER_FLOW = ['New', 'Processing', 'Shipped', 'Delivered']
// A customer may only pull an order back before it leaves the warehouse.
const CANCELLABLE = ['New', 'Processing']

// Promo codes accepted at checkout.
const PROMOS = {
  NEXUS10: { type: 'pct', value: 0.1, label: '10% off your order' },
  WELCOME15: { type: 'flat', value: 15, label: '$15 off your first order' },
}

/* ---------- Animation helpers ---------- */
function usePersistentState(key, initial) {
  const [value, setValue] = useState(() => {
    try {
      const stored = localStorage.getItem(key)
      return stored != null ? JSON.parse(stored) : initial
    } catch { return initial }
  })
  useEffect(() => {
    try { localStorage.setItem(key, JSON.stringify(value)) } catch { }
  }, [key, value])
  return [value, setValue]
}

function useInView(threshold = 0.12) {
  const ref = useRef(null)
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setInView(true)
        observer.disconnect()
      }
    }, { threshold })
    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold])
  return [ref, inView]
}

function useCountUp(target, active = true, duration = 1300) {
  const [value, setValue] = useState(0)
  useEffect(() => {
    if (!active) return
    let frame
    const start = performance.now()
    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setValue(target * eased)
      if (progress < 1) frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [target, active, duration])
  return value
}

/* ---------- Small visual components ---------- */
function Sparkline({ data }) {
  if (!data.length) return <div className="sparkline-empty">Sales data appears here after your first order.</div>
  if (data.length === 1) {
    return (
      <svg className="sparkline" viewBox="0 0 100 100" preserveAspectRatio="none">
        <circle cx="50" cy="28" r="4" className="spark-dot" style={{ '--i': 0 }} />
      </svg>
    )
  }
  const max = Math.max(...data)
  const min = Math.min(...data)
  const span = max - min || 1
  const step = 100 / (data.length - 1)
  const points = data.map((value, index) => {
    const x = index * step
    const y = 92 - ((value - min) / span) * 74
    return `${x.toFixed(2)},${y.toFixed(2)}`
  }).join(' ')
  return (
    <svg className="sparkline" viewBox="0 0 100 100" preserveAspectRatio="none">
      <polygon className="spark-fill" points={`0,100 ${points} 100,100`} />
      <polyline className="spark-line" points={points} />
      {data.map((value, index) => (
        <circle key={index} className="spark-dot" style={{ '--i': index }} cx={(index * step).toFixed(2)} cy={(92 - ((value - min) / span) * 74).toFixed(2)} r="2" />
      ))}
    </svg>
  )
}

function OrderStepper({ status }) {
  if (status === 'Cancelled') {
    return (
      <div className="order-stepper cancelled">
        <div className="stepper-cancelled"><span aria-hidden="true">✕</span> Order cancelled</div>
      </div>
    )
  }
  const current = ORDER_FLOW.indexOf(status)
  const progress = current === -1 ? 0 : (current / (ORDER_FLOW.length - 1)) * 100
  return (
    <div className="order-stepper">
      <div className="stepper-track"><span style={{ width: `${progress}%` }} /></div>
      <div className="stepper-steps">
        {ORDER_FLOW.map((step, index) => (
          <div key={step} className={`stepper-step ${index <= current ? 'done' : ''}`}>
            <span className="stepper-dot">{index < current ? '✓' : index + 1}</span>
            <small>{step}</small>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ---------- Payment gateway helpers (front-end simulation) ---------- */
function detectCardBrand(digits) {
  if (/^4/.test(digits)) return 'Visa'
  if (/^(5[1-5]|2[2-7])/.test(digits)) return 'Mastercard'
  if (/^3[47]/.test(digits)) return 'Amex'
  if (/^6(011|5)/.test(digits)) return 'Discover'
  return ''
}

function luhnValid(digits) {
  if (!/^\d{12,19}$/.test(digits)) return false
  let sum = 0
  let alt = false
  for (let i = digits.length - 1; i >= 0; i--) {
    let n = Number(digits[i])
    if (alt) { n *= 2; if (n > 9) n -= 9 }
    sum += n
    alt = !alt
  }
  return sum % 10 === 0
}

function formatCardNumber(value) {
  const digits = value.replace(/\D/g, '').slice(0, 19)
  return digits.replace(/(.{4})/g, '$1 ').trim()
}

function formatExpiry(value) {
  const digits = value.replace(/\D/g, '').slice(0, 4)
  return digits.length <= 2 ? digits : `${digits.slice(0, 2)}/${digits.slice(2)}`
}

function expiryValid(value) {
  const match = value.match(/^(\d{2})\/(\d{2})$/)
  if (!match) return false
  const month = Number(match[1])
  const year = Number(match[2])
  if (month < 1 || month > 12) return false
  const expiresAfter = new Date(2000 + year, month, 1)
  return expiresAfter > new Date()
}

// Rough delivery estimate from the order date + chosen shipping speed.
function estimateDelivery(order) {
  const created = new Date(order.createdAt)
  if (Number.isNaN(created.getTime())) return null
  const days = order.received?.shipping === 'express' ? 2 : 5
  const eta = new Date(created)
  eta.setDate(eta.getDate() + days)
  return eta
}

const formatDay = (date) => date.toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' })

function Stars({ value, count, size = 'sm' }) {
  const rounded = Math.round(value * 2) / 2
  return (
    <span className={`stars stars-${size}`} role="img" aria-label={`Rated ${value} out of 5`}>
      <span className="stars-track">★★★★★</span>
      <span className="stars-fill" style={{ width: `${(rounded / 5) * 100}%` }}>★★★★★</span>
      {count != null && <small className="stars-count">{value.toFixed(1)} ({count})</small>}
    </span>
  )
}

function App() {
  const [products, setProducts] = useState(productsSeed.map(addComputed))
  const [loading, setLoading] = useState(true)
  const [category, setCategory] = useState('All pieces')
  const [material, setMaterial] = useState('All materials')
  const [query, setQuery] = useState('')
  const [sort, setSort] = useState('featured')
  const [maxPrice, setMaxPrice] = useState(null)
  const [cart, setCart] = usePersistentState(CART_KEY, [])
  const [cartOpen, setCartOpen] = useState(false)
  const [checkout, setCheckout] = useState(false)
  const [notice, setNotice] = useState('')
  const [shipping, setShipping] = useState('standard')
  const [payment, setPayment] = useState('card')
  const [promoInput, setPromoInput] = useState('')
  const [promo, setPromo] = useState(null)
  const [promoError, setPromoError] = useState('')
  const [orders, setOrders] = usePersistentState(ORDERS_KEY, [])
  const [adminOpen, setAdminOpen] = useState(false)
  const [trackOpen, setTrackOpen] = useState(false)
  const [trackQuery, setTrackQuery] = useState('')
  const [confirmCancel, setConfirmCancel] = useState(null)
  const [editorialChoice, setEditorialChoice] = useState('Materials')
  const [view, setView] = useState(window.location.hash === '#shop' ? 'shop' : window.location.hash === '#about' ? 'about' : 'home')
  const [wishlist, setWishlist] = usePersistentState(WISHLIST_KEY, [])
  const [wishSelected, setWishSelected] = useState([])
  const [customer, setCustomer] = usePersistentState(CUSTOMER_KEY, { name: '', email: '', address: '' })
  const [recent, setRecent] = usePersistentState(RECENT_KEY, [])
  const [wishlistOpen, setWishlistOpen] = useState(false)
  const [quickView, setQuickView] = useState(null)
  const [qvQty, setQvQty] = useState(1)
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [rotatingIndex, setRotatingIndex] = useState(0)
  const [heroCursor, setHeroCursor] = useState({ x: 0, y: 0 })
  const [emailInput, setEmailInput] = useState('')
  const [subscribed, setSubscribed] = useState(false)
  const [card, setCard] = useState({ number: '', name: '', expiry: '', cvc: '' })
  const [cardFlipped, setCardFlipped] = useState(false)
  const [payStage, setPayStage] = useState(null) // null | 'processing' | 'auth' | 'approved'
  const [otp, setOtp] = useState('')
  const [cardError, setCardError] = useState('')

  const [heroRef, heroInView] = useInView(0.1)
  const [shopRef, shopInView] = useInView(0.04)
  const [storyRef, storyInView] = useInView(0.15)
  const [aboutRef, aboutInView] = useInView(0.15)

  useEffect(() => {
    let active = true
    fetch('/api/products')
      .then((response) => (response.ok ? response.json() : Promise.reject()))
      .then((items) => { if (active && Array.isArray(items) && items.length) setProducts(items.map(addComputed)) })
      .catch(() => { })
      .finally(() => { if (active) setLoading(false) })
    return () => { active = false }
  }, [])

  // Merge server orders with locally-saved ones so customer tracking survives
  // reloads and works on static hosting where no API is running.
  useEffect(() => {
    fetch('/api/orders')
      .then((response) => (response.ok ? response.json() : Promise.reject()))
      .then((serverOrders) => {
        if (!Array.isArray(serverOrders)) return
        setOrders((local) => {
          const byId = new Map(local.map((order) => [order.orderId, order]))
          serverOrders.forEach((order) => byId.set(order.orderId, order)) // server is authoritative for status
          return Array.from(byId.values())
        })
      })
      .catch(() => { })
  }, [setOrders])

  useEffect(() => {
    const onHashChange = () => setView(window.location.hash === '#shop' ? 'shop' : window.location.hash === '#about' ? 'about' : 'home')
    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [])

  // wishlist, cart, and recently-viewed persist via usePersistentState.

  useEffect(() => { setQvQty(1) }, [quickView])

  // When the Saved drawer opens, pre-select every item so the shopper can
  // simply uncheck the pieces they don't want to buy right now.
  useEffect(() => {
    if (wishlistOpen) setWishSelected(wishlist.map((item) => item.id))
  }, [wishlistOpen]) // eslint-disable-line react-hooks/exhaustive-deps

  // Keep the selection in sync when items leave the wishlist (removed with ×
  // or moved individually), so the "Clear all" toggle and totals stay honest.
  useEffect(() => {
    setWishSelected((current) => current.filter((id) => wishlist.some((item) => item.id === id)))
  }, [wishlist])

  useEffect(() => {
    const onKey = (event) => {
      if (event.key === 'Escape') {
        setCartOpen(false); setAdminOpen(false); setWishlistOpen(false); setQuickView(null); setMenuOpen(false); setCheckout(false); setTrackOpen(false)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const categories = ['All pieces', ...new Set(products.map((product) => product.category))]
  const materials = ['All materials', ...new Set(products.map((product) => product.material))]
  const priceBounds = useMemo(() => {
    const prices = products.map((product) => product.price)
    return { min: Math.floor(Math.min(...prices)), max: Math.ceil(Math.max(...prices)) }
  }, [products])
  const priceCap = maxPrice ?? priceBounds.max

  useEffect(() => {
    const timer = setInterval(() => setRotatingIndex((index) => (index + 1) % rotatingWords.length), 2600)
    return () => clearInterval(timer)
  }, [])

  const heroProductsCount = useCountUp(products.length, heroInView, 1200)
  const heroCategoriesCount = useCountUp(Math.max(categories.length - 1, 0), heroInView, 1500)

  const filteredProducts = useMemo(() => {
    const filtered = products.filter((product) =>
      (category === 'All pieces' || product.category === category) &&
      (material === 'All materials' || product.material === material) &&
      (maxPrice == null || product.price <= maxPrice) &&
      product.name.toLowerCase().includes(query.toLowerCase())
    )
    const sorted = [...filtered]
    if (sort === 'price-asc') sorted.sort((a, b) => a.price - b.price)
    else if (sort === 'price-desc') sorted.sort((a, b) => b.price - a.price)
    else if (sort === 'name') sorted.sort((a, b) => a.name.localeCompare(b.name))
    else if (sort === 'rating') sorted.sort((a, b) => b.rating - a.rating)
    return sorted
  }, [products, category, material, maxPrice, query, sort])

  const itemCount = cart.reduce((total, item) => total + item.quantity, 0)
  const subtotal = cart.reduce((total, item) => total + item.price * item.quantity, 0)
  const discount = promo ? (promo.type === 'pct' ? Math.round(subtotal * promo.value) : Math.min(promo.value, subtotal)) : 0
  const discountedSubtotal = Math.max(0, subtotal - discount)
  const shippingCost = shipping === 'express' ? 24 : discountedSubtotal >= 150 ? 0 : 12
  const total = discountedSubtotal + shippingCost

  const revenue = orders.reduce((sum, order) => sum + (order.status === 'Cancelled' ? 0 : order.received?.total || 0), 0)
  const revenueHistory = orders.filter((order) => order.status !== 'Cancelled').slice().sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt)).map((order) => order.received?.total || 0)

  const categoryData = useMemo(() => {
    const counts = {}
    products.forEach((product) => { counts[product.category] = (counts[product.category] || 0) + 1 })
    return Object.entries(counts).sort((a, b) => b[1] - a[1]).slice(0, 6)
  }, [products])
  const maxCount = Math.max(...categoryData.map(([, count]) => count), 1)

  const statRevenue = useCountUp(revenue, adminOpen, 1600)
  const statOrders = useCountUp(orders.length, adminOpen, 1100)
  const statProducts = useCountUp(products.length, adminOpen, 900)

  const editorialContent = {
    Materials: 'Natural wood, washed linen, recycled glass, and honest metal give every piece a grounded feeling. We choose materials that age with grace and feel good to live with.',
    Makers: 'We work with independent studios and patient hands. The people behind each object matter as much as the object itself, from the first sketch to the final finish.',
    Care: 'Good design should stay useful. We look for repairable forms, thoughtful packaging, and pieces that can move through seasons without asking you to replace them.',
  }

  function goTo(nextView) {
    window.location.hash = nextView === 'home' ? 'top' : nextView
    setView(nextView)
    setMenuOpen(false)
  }

  function handleHeroMouse(event) {
    const rect = event.currentTarget.getBoundingClientRect()
    const x = (event.clientX - rect.left) / rect.width - 0.5
    const y = (event.clientY - rect.top) / rect.height - 0.5
    setHeroCursor({ x: Number(x.toFixed(3)), y: Number(y.toFixed(3)) })
  }

  function openCategory(tileLabel) {
    setCategory(tileLabel)
    goTo('shop')
  }

  function trackRecent(product) {
    setRecent((current) => {
      const lite = { id: product.id, name: product.name, price: product.price, image: product.image, material: product.material, category: product.category, detail: product.detail, tone: product.tone, rating: product.rating, reviews: product.reviews }
      return [lite, ...current.filter((item) => item.id !== product.id)].slice(0, 8)
    })
  }

  function openQuickView(product) {
    setQuickView(product)
    trackRecent(product)
  }

  function addToCart(product, qty = 1) {
    setCart((current) => {
      const found = current.find((item) => item.id === product.id)
      return found ? current.map((item) => item.id === product.id ? { ...item, quantity: item.quantity + qty } : item) : [...current, { ...product, quantity: qty }]
    })
    trackRecent(product)
    setNotice(`${product.name} added to your bag`)
    setTimeout(() => setNotice(''), 2200)
  }

  function applyPromo(event) {
    event?.preventDefault?.()
    const code = promoInput.trim().toUpperCase()
    if (!code) return
    const match = PROMOS[code]
    if (match) {
      setPromo({ code, ...match })
      setPromoError('')
    } else {
      setPromo(null)
      setPromoError('That code isn’t valid.')
    }
  }

  function removePromo() {
    setPromo(null)
    setPromoInput('')
    setPromoError('')
  }

  function updateQuantity(id, change) {
    setCart((current) => current.flatMap((item) => item.id === id && item.quantity + change < 1 ? [] : item.id === id ? [{ ...item, quantity: item.quantity + change }] : [item]))
  }

  function toggleWishlist(product) {
    // Compute the change from current state, then update — keeping the state
    // updater pure so it stays correct under StrictMode's double-invoke.
    const exists = wishlist.some((item) => item.id === product.id)
    setWishlist((current) => exists ? current.filter((item) => item.id !== product.id) : [...current, product])
    setNotice(exists ? `${product.name} removed from wishlist` : `${product.name} saved to wishlist`)
    setTimeout(() => setNotice(''), 2200)
  }

  function moveWishlistToCart(product) {
    addToCart(product)
    setWishlist((current) => current.filter((item) => item.id !== product.id))
  }

  function toggleWishSelect(id) {
    setWishSelected((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id])
  }

  const allWishSelected = wishlist.length > 0 && wishSelected.length === wishlist.length
  const selectedWishItems = wishlist.filter((item) => wishSelected.includes(item.id))
  const selectedWishTotal = selectedWishItems.reduce((sum, item) => sum + item.price, 0)

  function toggleSelectAllWish() {
    setWishSelected(allWishSelected ? [] : wishlist.map((item) => item.id))
  }

  // Move only the ticked pieces into the bag, then hand off to checkout.
  function checkoutSelectedWish() {
    if (selectedWishItems.length === 0) return
    selectedWishItems.forEach((item) => addToCart(item))
    setWishlist((current) => current.filter((item) => !wishSelected.includes(item.id)))
    setWishSelected([])
    setWishlistOpen(false)
    setCartOpen(true)
    setNotice(`${selectedWishItems.length} piece${selectedWishItems.length === 1 ? '' : 's'} moved to your bag`)
    setTimeout(() => setNotice(''), 2400)
  }

  // Clear the ticked pieces from the Saved list in one go.
  function removeSelectedWish() {
    if (selectedWishItems.length === 0) return
    const count = selectedWishItems.length
    setWishlist((current) => current.filter((item) => !wishSelected.includes(item.id)))
    setNotice(`${count} piece${count === 1 ? '' : 's'} removed from saved`)
    setTimeout(() => setNotice(''), 2400)
  }

  const cardDigits = card.number.replace(/\D/g, '')
  const cardBrand = detectCardBrand(cardDigits)

  function updateCard(field, rawValue) {
    setCardError('')
    let value = rawValue
    if (field === 'number') value = formatCardNumber(rawValue)
    else if (field === 'expiry') value = formatExpiry(rawValue)
    else if (field === 'cvc') value = rawValue.replace(/\D/g, '').slice(0, cardBrand === 'Amex' ? 4 : 3)
    setCard((current) => ({ ...current, [field]: value }))
  }

  async function placeOrder() {
    const cardMeta = payment === 'card' ? { brand: cardBrand || 'Card', last4: cardDigits.slice(-4) } : null
    const contact = { name: customer.name.trim(), email: customer.email.trim(), address: customer.address.trim() }
    const received = { items: cart, total, subtotal, discount, promo: promo?.code || null, shipping, payment, card: cardMeta, customer: contact }
    const response = await fetch('/api/orders', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(received) }).catch(() => null)
    // On static hosting there is no API server, so fall back to a locally-recorded order.
    const order = response?.ok
      ? await response.json()
      : { orderId: `NX-${Date.now()}`, status: 'New', createdAt: new Date().toISOString(), received }
    setOrders((current) => [...current, order])
    setCart([])
    setCheckout(false)
    removePromo()
    setCard({ number: '', name: '', expiry: '', cvc: '' })
    setNotice('Order received. Thank you for shopping with us.')
    setTimeout(() => setNotice(''), 3500)
    return true
  }

  // Checkout submit — routes card payments through the simulated gateway.
  function startCheckout(event) {
    event.preventDefault()
    if (payment !== 'card') { placeOrder(); return }
    if (!luhnValid(cardDigits)) { setCardError('Please check the card number.'); return }
    if (!card.name.trim()) { setCardError('Enter the name printed on the card.'); return }
    if (!expiryValid(card.expiry)) { setCardError('Card expiry date looks invalid.'); return }
    if (card.cvc.length < 3) { setCardError('Enter the security code (CVC).'); return }
    setCardError('')
    setOtp('')
    setPayStage('processing')
    setTimeout(() => setPayStage('auth'), 1600)
  }

  function verifyPayment() {
    if (otp.replace(/\D/g, '').length < 6) { setCardError('Enter the 6-digit code from your bank.'); return }
    setCardError('')
    setPayStage('processing')
    setTimeout(() => {
      setPayStage('approved')
      setTimeout(async () => {
        await placeOrder()
        setPayStage(null)
        setOtp('')
      }, 1300)
    }, 1500)
  }

  function cancelPayment() {
    setPayStage(null)
    setOtp('')
    setCardError('')
  }


  async function advanceOrderStatus(orderId) {
    const order = orders.find((item) => item.orderId === orderId)
    if (!order || order.status === 'Cancelled') return
    const next = ORDER_FLOW[Math.min(ORDER_FLOW.indexOf(order.status) + 1, ORDER_FLOW.length - 1)]
    const response = await fetch(`/api/orders/${orderId}`, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ status: next }) }).catch(() => null)
    if (response?.ok) {
      const updated = await response.json()
      setOrders((current) => current.map((item) => item.orderId === orderId ? updated : item))
    } else {
      setOrders((current) => current.map((item) => item.orderId === orderId ? { ...item, status: next } : item))
    }
  }

  // Customer-initiated cancellation. Works against the API when present, and
  // falls back to a local status change on static hosting.
  async function cancelOrder(orderId) {
    const order = orders.find((item) => item.orderId === orderId)
    if (!order || !CANCELLABLE.includes(order.status)) { setConfirmCancel(null); return }
    const response = await fetch(`/api/orders/${orderId}`, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ status: 'Cancelled' }) }).catch(() => null)
    if (response?.ok) {
      const updated = await response.json()
      setOrders((current) => current.map((item) => item.orderId === orderId ? updated : item))
    } else if (response == null) {
      // No API reachable (static hosting): apply the cancellation locally.
      setOrders((current) => current.map((item) => item.orderId === orderId ? { ...item, status: 'Cancelled' } : item))
    } else {
      // Server rejected it (e.g. 409 — already shipped). Don't force a local cancel that would diverge from the server.
      setConfirmCancel(null)
      setNotice(`Order ${orderId} can no longer be cancelled — it may have already shipped.`)
      setTimeout(() => setNotice(''), 3600)
      return
    }
    setConfirmCancel(null)
    const refundNote = order.received?.payment === 'card' ? ' Any card charge will be refunded.' : ''
    setNotice(`Order ${orderId} cancelled.${refundNote}`)
    setTimeout(() => setNotice(''), 3600)
  }

  // Reorder — drop every item from a past order back into the bag.
  function reorder(order) {
    const items = order.received?.items || []
    if (items.length === 0) return
    setCart((current) => {
      const next = current.map((item) => ({ ...item }))
      items.forEach((item) => {
        const found = next.find((entry) => entry.id === item.id)
        if (found) found.quantity += item.quantity
        else next.push({ ...item })
      })
      return next
    })
    setTrackOpen(false)
    setCartOpen(true)
    const units = items.reduce((sum, item) => sum + item.quantity, 0)
    setNotice(`${units} item${units === 1 ? '' : 's'} added back to your bag`)
    setTimeout(() => setNotice(''), 2600)
  }

  const trackedOrders = useMemo(() => {
    const q = trackQuery.trim().toLowerCase()
    return orders
      .filter((order) => !q || order.orderId.toLowerCase().includes(q))
      .slice()
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
  }, [orders, trackQuery])

  function clearFilters() {
    setCategory('All pieces')
    setMaterial('All materials')
    setQuery('')
    setSort('featured')
    setMaxPrice(null)
  }

  function subscribe(event) {
    event.preventDefault()
    const valid = /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(emailInput.trim())
    if (!valid) {
      setNotice('Please enter a valid email address.')
      setTimeout(() => setNotice(''), 2400)
      return
    }
    setSubscribed(true)
    setNotice('You’re on the list — welcome to Nexus+.')
    setTimeout(() => setNotice(''), 3200)
  }

  return (
    <div className="store-shell">
      <div className="announcement">
        <span className="announcement-text">Free delivery on orders over $150</span>
        <span className="announcement-dot">·</span>
        <span className="announcement-text muted">New pieces added every week</span>
        <span className="announcement-arrow">↗</span>
      </div>

      <header className={`site-header ${scrolled ? 'scrolled' : ''}`}>
        <button className="logo logo-button" onClick={() => goTo('home')}>NEXUS<span>+</span></button>
        <nav>
          <button className={view === 'home' ? 'active' : ''} onClick={() => goTo('home')}>Home</button>
          <button className={view === 'shop' ? 'active' : ''} onClick={() => goTo('shop')}>Shop all</button>
          <button className={view === 'about' ? 'active' : ''} onClick={() => goTo('about')}>About</button>
        </nav>
        <div className="header-actions">
          <label className="search">
            <span>⌕</span>
            <input aria-label="Search products" placeholder="Search" value={query} onChange={(event) => setQuery(event.target.value)} />
          </label>
          <button className="admin-link" onClick={() => setAdminOpen(true)}>Control panel</button>
          <button className="pill-button orders-button" onClick={() => setTrackOpen(true)}>Orders {orders.length > 0 && <b key={orders.length}>{orders.length}</b>}</button>
          <button className="pill-button wishlist-button" onClick={() => setWishlistOpen(true)}>Saved {wishlist.length > 0 && <b key={wishlist.length}>{wishlist.length}</b>}</button>
          <button className="pill-button bag-button" onClick={() => setCartOpen(true)}>Bag {itemCount > 0 && <b key={itemCount}>{itemCount}</b>}</button>
          <button className="menu-toggle" aria-label="Open menu" onClick={() => setMenuOpen(true)}>☰</button>
        </div>
      </header>

      <main id="top" className={`view-${view}`}>
        <section ref={heroRef} className={`hero-section home-content ${heroInView ? 'in-view' : ''}`} onMouseMove={handleHeroMouse} style={{ '--mx': heroCursor.x, '--my': heroCursor.y, '--gx': `${(heroCursor.x + 0.5) * 100}%`, '--gy': `${(heroCursor.y + 0.5) * 100}%` }}>
          <div className="hero-bg"><span className="hero-blob one" /><span className="hero-blob two" /><span className="hero-blob three" /></div>
          <div className="hero-copy">
            <p className="eyebrow">Objects for considered living</p>
            <h1>Make room<br /><em className="rotating-word" key={rotatingWords[rotatingIndex]}>{rotatingWords[rotatingIndex]}</em></h1>
            <p className="hero-description">Thoughtfully made pieces that bring a little more calm, character, and joy to the everyday.</p>
            <button className="dark-button" onClick={() => goTo('shop')}>Explore the collection <span>↘</span></button>
            <div className="hero-mini-stats">
              <div><strong>{Math.round(heroProductsCount)}</strong><span>Objects</span></div>
              <div><strong>{Math.round(heroCategoriesCount)}</strong><span>Categories</span></div>
              <div><strong>24h</strong><span>Dispatch</span></div>
            </div>
          </div>
          <div className="hero-image">
            <img src="https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&w=1400&q=90" alt="Warm, minimal living room with a lounge chair" />
            <div className="image-caption">01 / Living, thoughtfully</div>
            <span className="hero-float-card float-card-one">✦ Small-batch</span>
            <span className="hero-float-card float-card-two">Hand-finished</span>
          </div>
        </section>

        <section className="marquee-strip home-content" aria-hidden="true">
          <div className="marquee-track">
            {[0, 1].map((copy) => (
              <div className="marquee-group" key={copy}>
                <span>Small-batch goods</span><i>✦</i>
                <span>Designed in Copenhagen</span><i>✦</i>
                <span>Made everywhere with care</span><i>✦</i>
                <span>New pieces every week</span><i>✦</i>
                <span>Free delivery over $150</span><i>✦</i>
              </div>
            ))}
          </div>
        </section>

        <section className="tiles-section home-content">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Shop by category</p>
              <h2>Start<br /><em>somewhere.</em></h2>
            </div>
            <p className="section-note">Four places to begin. Pick a category, filter the edit, and make it yours.</p>
          </div>
          <div className="category-tiles">
            {categoryTiles.map((tile, index) => (
              <button className={`category-tile ${tile.tone}`} key={tile.label} style={{ '--i': index }} onClick={() => openCategory(tile.label)}>
                <img src={tile.image} alt={tile.label} loading="lazy" />
                <span className="tile-shade" />
                <div className="tile-copy">
                  <span className="tile-index">0{index + 1}</span>
                  <h3>{tile.label}</h3>
                  <p>{tile.count} <span className="tile-arrow">↗</span></p>
                </div>
              </button>
            ))}
          </div>
        </section>

        <section ref={shopRef} className={`shop-section marketplace-shop ${shopInView ? 'in-view' : ''}`} id="shop">
          <div className="section-heading">
            <div>
              <p className="eyebrow">The edit / 01</p>
              <h2>Good things,<br /><em>well chosen.</em></h2>
            </div>
            <p className="section-note">A growing collection of useful, beautiful objects. Each one chosen for its materiality, longevity, and ability to make a room feel like yours.</p>
          </div>

          <div className="shop-toolbar">
            <div className="categories">
              {categories.map((item) => <button className={category === item ? 'active' : ''} key={item} onClick={() => setCategory(item)}>{item}</button>)}
            </div>
            <span className="piece-count">{filteredProducts.length} pieces</span>
          </div>

          <div className="filter-row">
            <div className="material-filter">
              <span>Material</span>
              {materials.map((item) => <button className={material === item ? 'active' : ''} key={item} onClick={() => setMaterial(item)}>{item}</button>)}
            </div>
            <div className="price-filter">
              <label htmlFor="price-range">Max price <b>{maxPrice == null ? 'Any' : `$${priceCap}`}</b></label>
              <input
                id="price-range"
                type="range"
                min={priceBounds.min}
                max={priceBounds.max}
                step="10"
                value={priceCap}
                onChange={(event) => {
                  const next = Number(event.target.value)
                  setMaxPrice(next >= priceBounds.max ? null : next)
                }}
              />
            </div>
            <div className="sort-control">
              <label htmlFor="sort">Sort</label>
              <select id="sort" value={sort} onChange={(event) => setSort(event.target.value)}>
                <option value="featured">Featured</option>
                <option value="rating">Top rated</option>
                <option value="price-asc">Price ↑</option>
                <option value="price-desc">Price ↓</option>
                <option value="name">A–Z</option>
              </select>
            </div>
          </div>

          <div className="product-grid">
            {loading ? (
              Array.from({ length: 6 }).map((_, index) => (
                <div className="skeleton-card" key={`skeleton-${index}`} style={{ '--delay': `${index * 80}ms` }}>
                  <div className="skeleton-image" />
                  <div className="skeleton-line" />
                  <div className="skeleton-line short" />
                </div>
              ))
            ) : filteredProducts.length === 0 ? (
              <div className="empty-state">
                <h3>Nothing matches just yet.</h3>
                <p>Try adjusting your filters or search to find your piece.</p>
                <button onClick={clearFilters}>Clear filters</button>
              </div>
            ) : (
              filteredProducts.map((product, index) => (
                <article className="product-card" key={product.id} style={{ '--delay': `${Math.min(index * 55, 550)}ms` }}>
                  <div className={`product-image ${product.tone}`}>
                    <img src={product.image} alt={product.name} loading="lazy" />
                    <span className="product-category">{product.category}</span>
                    <div className="hover-details">
                      <p className="hover-eyebrow">{product.category} · {product.material}</p>
                      <h3>{product.name}</h3>
                      <p className="hover-detail">{product.detail}</p>
                      <div className="hover-price-row">
                        <strong>${product.price}</strong>
                        <button className="hover-quickview" onClick={(event) => { event.stopPropagation(); openQuickView(product) }}>Quick view <span className="qv-arrow">↗</span></button>
                      </div>
                      <button className="hover-add" onClick={(event) => { event.stopPropagation(); addToCart(product) }}>
                        <span className="hover-add-label">Add to bag</span>
                        <span className="hover-add-icon">+</span>
                      </button>
                    </div>
                    <button className="add-button" aria-label={`Add ${product.name} to bag`} onClick={() => addToCart(product)}>+</button>
                    <button className={`wishlist-toggle ${wishlist.some((item) => item.id === product.id) ? 'active' : ''}`} aria-label={`Save ${product.name}`} onClick={() => toggleWishlist(product)}>{wishlist.some((item) => item.id === product.id) ? '♥' : '♡'}</button>
                    <button className="quickview-trigger" onClick={() => openQuickView(product)} style={{ position: 'absolute', inset: 0, background: 'transparent', border: 0, cursor: 'pointer' }} aria-label={`Quick view ${product.name}`} />
                  </div>
                  <div className="product-meta">
                    <div>
                      <h3>{product.name}</h3>
                      <Stars value={product.rating} count={product.reviews} />
                      <p>{product.detail} · {product.material}</p>
                    </div>
                    <strong>${product.price}</strong>
                  </div>
                  <button className="card-add" onClick={() => addToCart(product)}>Add to bag <span>↗</span></button>
                </article>
              ))
            )}
          </div>

          {recent.length > 0 && (
            <div className="recent-viewed">
              <div className="recent-head">
                <h3>Recently viewed</h3>
                <button className="recent-clear" onClick={() => setRecent([])}>Clear</button>
              </div>
              <div className="recent-track">
                {recent.map((item) => (
                  <button className="recent-card" key={item.id} onClick={() => openQuickView(item)}>
                    <img src={item.image} alt={item.name} loading="lazy" />
                    <span className="recent-name">{item.name}</span>
                    <span className="recent-price">${item.price}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </section>

        <section ref={storyRef} className={`story-section about-content ${storyInView ? 'in-view' : ''}`}>
          <div className="story-image">
            <img src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1000&q=85" alt="Sunlit interior with natural materials" />
          </div>
          <div className="story-copy">
            <p className="eyebrow">The nexus principle</p>
            <h2>Less, but<br /><em>meaningful.</em></h2>
            <p>We believe the things around us shape how we feel. So we look for pieces with soul: honest materials, quiet details, and forms that only get better with time.</p>
          </div>
        </section>

        <section ref={aboutRef} className={`about-section about-content ${aboutInView ? 'in-view' : ''}`} id="about">
          <div>
            <p className="eyebrow">About Nexus+</p>
            <h2>Beautiful things<br /><em>belong in daily life.</em></h2>
            <div className="editorial-choices">
              {Object.keys(editorialContent).map((choice) => <button className={editorialChoice === choice ? 'active' : ''} key={choice} onClick={() => setEditorialChoice(choice)}>{choice}</button>)}
            </div>
          </div>
          <div className="editorial-copy">
            <span className="editorial-number">0{Object.keys(editorialContent).indexOf(editorialChoice) + 1}</span>
            <p>{editorialContent[editorialChoice]}</p>
            <span className="editorial-rule"></span>
          </div>
        </section>
      </main>

      <footer id="journal">
        <div className="footer-main">
          <div className="footer-brand-col">
            <div className="footer-brand">NEXUS<span>+</span></div>
            <p className="footer-tagline">Objects for considered living. Thoughtfully made goods for a calmer, more characterful everyday.</p>
            <div className="footer-social">
              {[
                { name: 'Instagram', icon: 'M12 2.2c3.2 0 3.6 0 4.9.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.86s0 3.6-.07 4.86c-.05 1.17-.25 1.8-.41 2.23a3.7 3.7 0 0 1-.9 1.38c-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.86.07s-3.6 0-4.86-.07c-1.17-.05-1.8-.25-2.23-.41a3.7 3.7 0 0 1-1.38-.9 3.7 3.7 0 0 1-.9-1.38c-.16-.42-.36-1.06-.41-2.23C2.21 15.6 2.2 15.2 2.2 12s0-3.6.07-4.86c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41C8.4 2.21 8.8 2.2 12 2.2Zm0 3.05A6.75 6.75 0 1 0 18.75 12 6.75 6.75 0 0 0 12 5.25Zm0 11.13A4.38 4.38 0 1 1 16.38 12 4.38 4.38 0 0 1 12 16.38Zm6.98-11.4a1.58 1.58 0 1 1-1.58-1.57 1.58 1.58 0 0 1 1.58 1.57Z' },
                { name: 'Pinterest', icon: 'M12 2a10 10 0 0 0-3.65 19.31c-.09-.8-.17-2.04.04-2.92.18-.78 1.18-4.98 1.18-4.98s-.3-.6-.3-1.5c0-1.4.82-2.45 1.83-2.45.86 0 1.28.65 1.28 1.42 0 .87-.55 2.16-.84 3.36-.24 1 .5 1.82 1.49 1.82 1.79 0 3.16-1.89 3.16-4.61 0-2.41-1.73-4.1-4.2-4.1a4.35 4.35 0 0 0-4.54 4.36c0 .86.33 1.79.75 2.29a.3.3 0 0 1 .07.29c-.08.31-.25.98-.28 1.12-.04.18-.15.22-.34.13-1.25-.58-2.03-2.4-2.03-3.87 0-3.15 2.29-6.04 6.6-6.04 3.46 0 6.16 2.47 6.16 5.77 0 3.44-2.17 6.21-5.18 6.21-1.01 0-1.97-.53-2.29-1.15l-.62 2.37c-.23.87-.83 1.96-1.24 2.62A10 10 0 1 0 12 2Z' },
                { name: 'Newsletter', icon: 'M3 5h18a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Zm1.4 2 7.6 5.3L19.6 7H4.4ZM20 8.6l-7.4 5.2a1 1 0 0 1-1.2 0L4 8.6V17h16V8.6Z' },
              ].map((social) => (
                <button
                  key={social.name}
                  className="social-btn"
                  aria-label={social.name}
                  title={social.name}
                  onClick={() => { setNotice(`${social.name} — coming soon.`); setTimeout(() => setNotice(''), 2000) }}
                >
                  <svg viewBox="0 0 24 24" aria-hidden="true"><path d={social.icon} /></svg>
                </button>
              ))}
            </div>
          </div>

          <div className="footer-links">
            <div className="footer-col">
              <p className="footer-label">Shop</p>
              <ul>
                {['Furniture', 'Lighting', 'Textiles', 'Tabletop'].map((cat) => (
                  <li key={cat}><button onClick={() => openCategory(cat)}>{cat}</button></li>
                ))}
                <li><button onClick={() => goTo('shop')}>New in</button></li>
              </ul>
            </div>
            <div className="footer-col">
              <p className="footer-label">Company</p>
              <ul>
                <li><button onClick={() => goTo('about')}>About</button></li>
                <li><button onClick={() => goTo('about')}>Materials</button></li>
                <li><button onClick={() => goTo('about')}>Sustainability</button></li>
                <li><button onClick={() => setAdminOpen(true)}>Control panel</button></li>
              </ul>
            </div>
            <div className="footer-col">
              <p className="footer-label">Help</p>
              <ul>
                <li><span>Shipping &amp; returns</span></li>
                <li><span>Contact us</span></li>
                <li><span>FAQ</span></li>
                <li><button onClick={() => setTrackOpen(true)}>Track order</button></li>
              </ul>
            </div>
          </div>

          <div className="footer-newsletter">
            <p className="footer-label">The weekly edit</p>
            <p className="newsletter-copy">New pieces, quietly. One considered email a week — no noise, unsubscribe anytime.</p>
            {subscribed ? (
              <div className="newsletter-done">
                <span className="newsletter-check">✓</span>
                <span>You’re subscribed. Look out for us on Sundays.</span>
              </div>
            ) : (
              <form className="newsletter-form" onSubmit={subscribe}>
                <input
                  type="email"
                  inputMode="email"
                  aria-label="Email address"
                  placeholder="you@example.com"
                  value={emailInput}
                  onChange={(event) => setEmailInput(event.target.value)}
                />
                <button type="submit" aria-label="Subscribe">→</button>
              </form>
            )}
          </div>
        </div>

        <div className="footer-bottom">
          <small>© 2026 Nexus Objects — Everyday, considered.</small>
          <div className="footer-legal">
            <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>Back to top ↑</button>
            <span>Privacy</span>
            <span>Terms</span>
          </div>
        </div>
      </footer>

      {notice && <div className="toast" key={notice}>{notice} <span>×</span></div>}

      <button
        className={`scroll-top ${scrolled ? 'visible' : ''}`}
        aria-label="Back to top"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      >↑</button>

      {menuOpen && (
        <div className="mobile-menu">
          <div className="mobile-menu-head">
            <button className="logo logo-button" onClick={() => goTo('home')}>NEXUS<span>+</span></button>
            <button aria-label="Close menu" onClick={() => setMenuOpen(false)}>×</button>
          </div>
          <nav>
            <button className={view === 'home' ? 'active' : ''} onClick={() => goTo('home')}>Home</button>
            <button className={view === 'shop' ? 'active' : ''} onClick={() => goTo('shop')}>Shop all</button>
            <button className={view === 'about' ? 'active' : ''} onClick={() => goTo('about')}>About</button>
            <button onClick={() => { setMenuOpen(false); setTrackOpen(true) }}>Track order</button>
            <button onClick={() => { setMenuOpen(false); setAdminOpen(true) }}>Control panel</button>
          </nav>
        </div>
      )}

      {quickView && (
        <div className="quickview-backdrop" onClick={() => setQuickView(null)}>
          <div className="quickview" onClick={(event) => event.stopPropagation()}>
            <button className="quickview-close" aria-label="Close" onClick={() => setQuickView(null)}>×</button>
            <div className="quickview-image"><img src={quickView.image} alt={quickView.name} /></div>
            <div className="quickview-body">
              <p className="eyebrow">{quickView.category}</p>
              <h2>{quickView.name}</h2>
              <Stars value={quickView.rating} count={quickView.reviews} size="md" />
              <p className="qv-detail">{quickView.detail} · {quickView.material}</p>
              <span className="qv-price">${quickView.price}</span>
              <div className="qv-qty">
                <span>Quantity</span>
                <div className="quantity">
                  <button aria-label="Decrease quantity" onClick={() => setQvQty((q) => Math.max(1, q - 1))}>−</button>
                  <span>{qvQty}</span>
                  <button aria-label="Increase quantity" onClick={() => setQvQty((q) => q + 1)}>+</button>
                </div>
              </div>
              <button className="dark-button" onClick={() => { addToCart(quickView, qvQty); setQuickView(null) }}>Add {qvQty > 1 ? `${qvQty} ` : ''}to bag <span>↗</span></button>
              <button className={`wishlist-toggle ${wishlist.some((item) => item.id === quickView.id) ? 'active' : ''}`} style={{ position: 'static', borderRadius: 0, width: 'auto', height: 'auto', padding: '12px', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.1em', border: '1px solid var(--ink)' }} onClick={() => toggleWishlist(quickView)}>
                {wishlist.some((item) => item.id === quickView.id) ? '♥ Saved' : '♡ Save for later'}
              </button>
            </div>
          </div>
        </div>
      )}

      {wishlistOpen && (
        <div className="drawer-backdrop" onClick={() => setWishlistOpen(false)}>
          <aside className="wishlist-drawer" onClick={(event) => event.stopPropagation()}>
            <div className="drawer-head">
              <h2>Saved <small>{wishlist.length}</small></h2>
              <button onClick={() => setWishlistOpen(false)}>×</button>
            </div>
            {wishlist.length === 0 ? (
              <div className="empty-cart">
                <p>Nothing saved yet.</p>
                <span>Tap the heart on any piece to keep it here.</span>
              </div>
            ) : (
              <>
                <div className="wish-select-bar">
                  <button type="button" className="wish-selectall" onClick={toggleSelectAllWish}>
                    <span className={`wish-check ${allWishSelected ? 'checked' : ''}`} aria-hidden="true">{allWishSelected ? '✓' : ''}</span>
                    {allWishSelected ? 'Clear all' : 'Select all'}
                  </button>
                  <span className="wish-select-count">{selectedWishItems.length} of {wishlist.length} chosen</span>
                </div>
                <div className="cart-items">
                  {wishlist.map((item) => {
                    const chosen = wishSelected.includes(item.id)
                    return (
                      <div className={`wishlist-item ${chosen ? 'chosen' : ''}`} key={item.id}>
                        <button type="button" className={`wish-check ${chosen ? 'checked' : ''}`} aria-label={chosen ? `Deselect ${item.name}` : `Select ${item.name}`} aria-pressed={chosen} onClick={() => toggleWishSelect(item.id)}>{chosen ? '✓' : ''}</button>
                        <img src={item.image} alt="" />
                        <div>
                          <h3>{item.name}</h3>
                          <p>${item.price} · {item.material}</p>
                          <button className="move-btn" onClick={() => moveWishlistToCart(item)}>Move to bag →</button>
                        </div>
                        <button className="back-button" style={{ fontSize: '18px', padding: '0 0 0 8px' }} aria-label="Remove" onClick={() => toggleWishlist(item)}>×</button>
                      </div>
                    )
                  })}
                </div>
                <div className="wish-checkout">
                  <div className="wish-checkout-total">
                    <span>{selectedWishItems.length} selected</span>
                    <strong>${selectedWishTotal}</strong>
                  </div>
                  <button className="dark-button" disabled={selectedWishItems.length === 0} onClick={checkoutSelectedWish}>
                    Move selected to bag <span>↗</span>
                  </button>
                  <button type="button" className="wish-remove-selected" disabled={selectedWishItems.length === 0} onClick={removeSelectedWish}>
                    Remove selected
                  </button>
                </div>
              </>
            )}
          </aside>
        </div>
      )}

      {adminOpen && (
        <div className="drawer-backdrop" onClick={() => setAdminOpen(false)}>
          <aside className="admin-panel" onClick={(event) => event.stopPropagation()}>
            <div className="drawer-head">
              <h2>Control panel</h2>
              <button onClick={() => setAdminOpen(false)}>×</button>
            </div>

            <div className="admin-dashboard">
              {/* Animated stats */}
              <div className="admin-stats">
                <div className="admin-stat">
                  <strong>${Math.round(statRevenue)}</strong>
                  <span>Revenue</span>
                </div>
                <div className="admin-stat">
                  <strong>{Math.round(statOrders)}</strong>
                  <span>Orders</span>
                </div>
                <div className="admin-stat">
                  <strong>{Math.round(statProducts)}</strong>
                  <span>Products</span>
                </div>
              </div>

              {/* Revenue sparkline */}
              <div className="admin-card">
                <div className="admin-card-head">
                  <h3>Revenue flow</h3>
                  <span className="live-badge"><i /> Live</span>
                </div>
                <Sparkline data={revenueHistory} />
                <div className="sparkline-labels">
                  <span>First order</span>
                  <span>Latest</span>
                </div>
              </div>

              {/* Category distribution */}
              <div className="admin-card">
                <div className="admin-card-head">
                  <h3>Inventory by category</h3>
                  <small>top 6</small>
                </div>
                <div className="category-bars">
                  {categoryData.map(([name, count], index) => (
                    <div className="category-bar-row" key={name} style={{ '--i': index }}>
                      <span>{name}</span>
                      <div className="category-bar-track"><div className="category-bar-fill" style={{ width: `${(count / maxCount) * 100}%` }} /></div>
                      <b>{count}</b>
                    </div>
                  ))}
                </div>
              </div>

              {/* Orders with stepper */}
              <div className="admin-orders-head">
                <h3>Recent orders</h3>
                <span className="order-total-label">{orders.length} total</span>
              </div>
              {orders.length === 0 ? (
                <p className="admin-empty">No orders yet. New orders arrive here in real time.</p>
              ) : (
                <div className="order-list">
                  {orders.slice().reverse().map((order) => (
                    <div className="admin-order-card" key={order.orderId}>
                      <div className="admin-order-top">
                        <span className="order-id">{order.orderId}</span>
                        <strong>${order.received?.total ?? 0}</strong>
                      </div>
                      <OrderStepper status={order.status} />
                      <div className="admin-order-foot">
                        <small>{new Date(order.createdAt).toLocaleString()}</small>
                        {order.status === 'Cancelled' ? (
                          <span className="order-status status-cancelled">✕ Cancelled</span>
                        ) : order.status === 'Delivered' ? (
                          <span className="order-status status-delivered">Delivered</span>
                        ) : (
                          <button className="advance-btn" onClick={() => advanceOrderStatus(order.orderId)}>Advance →</button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </aside>
        </div>
      )}

      {cartOpen && (
        <div className="drawer-backdrop" onClick={() => setCartOpen(false)}>
          <aside className="cart-drawer" onClick={(event) => event.stopPropagation()}>
            <div className="drawer-head">
              <h2>Your bag <small>{itemCount}</small></h2>
              <button onClick={() => setCartOpen(false)}>×</button>
            </div>
            {cart.length === 0 ? (
              <div className="empty-cart">
                <p>Your bag is waiting.</p>
                <span>Add something good to get started.</span>
              </div>
            ) : (
              <>
                <div className="cart-items">
                  {cart.map((item) => (
                    <div className="cart-item" key={item.id}>
                      <img src={item.image} alt="" />
                      <div>
                        <h3>{item.name}</h3>
                        <p>${item.price}</p>
                        <div className="quantity">
                          <button onClick={() => updateQuantity(item.id, -1)}>−</button>
                          <span>{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.id, 1)}>+</button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="promo-box">
                  <form className="promo-row" onSubmit={applyPromo}>
                    <input aria-label="Promo code" placeholder="Promo code (try NEXUS10)" value={promoInput} onChange={(event) => { setPromoInput(event.target.value); setPromoError('') }} />
                    {promo ? (
                      <button type="button" className="promo-remove" onClick={removePromo}>Remove</button>
                    ) : (
                      <button type="submit" className="promo-apply">Apply</button>
                    )}
                  </form>
                  {promoError && <small className="promo-error">{promoError}</small>}
                  {promo && <small className="promo-ok">✓ {promo.code} — {promo.label}</small>}
                </div>
                <div className="cart-total"><span>Subtotal</span><strong>${subtotal}</strong></div>
                {discount > 0 && <div className="cart-total discount-line"><span>Discount</span><strong>−${discount}</strong></div>}
                <button className="dark-button checkout-button" onClick={() => setCheckout(true)}>Checkout <span>↗</span></button>
              </>
            )}
            {checkout && (
              <form className="checkout-form" onSubmit={startCheckout}>
                <button type="button" className="back-button" onClick={() => setCheckout(false)}>← Back to bag</button>
                <h2>Almost there.</h2>
                <input required placeholder="Full name" autoComplete="name" value={customer.name} onChange={(event) => setCustomer((c) => ({ ...c, name: event.target.value }))} />
                <input required type="email" placeholder="Email address" autoComplete="email" value={customer.email} onChange={(event) => setCustomer((c) => ({ ...c, email: event.target.value }))} />
                <input required placeholder="Delivery address" autoComplete="street-address" value={customer.address} onChange={(event) => setCustomer((c) => ({ ...c, address: event.target.value }))} />
                <h3>Shipping</h3>
                <label className="option-row"><input type="radio" name="shipping" checked={shipping === 'standard'} onChange={() => setShipping('standard')} /> Standard delivery <span>{discountedSubtotal >= 150 ? 'Free' : '$12'}</span></label>
                <label className="option-row"><input type="radio" name="shipping" checked={shipping === 'express'} onChange={() => setShipping('express')} /> Express delivery <span>$24</span></label>
                <h3>Payment</h3>
                <div className="payment-options">
                  <button type="button" className={payment === 'card' ? 'selected' : ''} onClick={() => setPayment('card')}>Card</button>
                  <button type="button" className={payment === 'cash' ? 'selected' : ''} onClick={() => setPayment('cash')}>Pay on delivery</button>
                </div>
                {payment === 'card' && (
                  <>
                    <div className={`card-preview brand-${(cardBrand || 'default').toLowerCase()} ${cardFlipped ? 'flipped' : ''}`}>
                      <div className="card-face card-front">
                        <div className="card-top">
                          <span className="card-chip" aria-hidden="true" />
                          <span className="card-brand">{cardBrand || 'CARD'}</span>
                        </div>
                        <div className="card-number">{card.number || '•••• •••• •••• ••••'}</div>
                        <div className="card-meta">
                          <div><small>Card holder</small><span>{card.name || 'YOUR NAME'}</span></div>
                          <div><small>Expires</small><span>{card.expiry || 'MM/YY'}</span></div>
                        </div>
                      </div>
                      <div className="card-face card-back">
                        <div className="card-stripe" />
                        <div className="card-cvc"><small>CVC</small><span>{card.cvc || '•••'}</span></div>
                      </div>
                    </div>
                    <input
                      inputMode="numeric"
                      autoComplete="cc-number"
                      placeholder="Card number"
                      value={card.number}
                      onChange={(event) => updateCard('number', event.target.value)}
                      onFocus={() => setCardFlipped(false)}
                    />
                    <input
                      autoComplete="cc-name"
                      placeholder="Name on card"
                      value={card.name}
                      onChange={(event) => updateCard('name', event.target.value)}
                      onFocus={() => setCardFlipped(false)}
                    />
                    <div className="card-row">
                      <input
                        inputMode="numeric"
                        autoComplete="cc-exp"
                        placeholder="MM / YY"
                        value={card.expiry}
                        onChange={(event) => updateCard('expiry', event.target.value)}
                        onFocus={() => setCardFlipped(false)}
                      />
                      <input
                        inputMode="numeric"
                        autoComplete="cc-csc"
                        placeholder="CVC"
                        value={card.cvc}
                        onChange={(event) => updateCard('cvc', event.target.value)}
                        onFocus={() => setCardFlipped(true)}
                        onBlur={() => setCardFlipped(false)}
                      />
                    </div>
                    {cardError && <p className="card-error" role="alert">{cardError}</p>}
                    <p className="card-secure"><span aria-hidden="true">🔒</span> Secured simulation · no real card is charged</p>
                  </>
                )}
                {discount > 0 && <div className="checkout-total discount-line"><span>Discount ({promo.code})</span><strong>−${discount}</strong></div>}
                <div className="checkout-total"><span>Total</span><strong>${total}</strong></div>
                <button className="dark-button" type="submit">{payment === 'card' ? `Pay $${total}` : 'Place order'} <span>↗</span></button>
              </form>
            )}
          </aside>
        </div>
      )}
      {trackOpen && (
        <div className="drawer-backdrop" onClick={() => setTrackOpen(false)}>
          <aside className="cart-drawer track-drawer" onClick={(event) => event.stopPropagation()}>
            <div className="drawer-head">
              <h2>Track orders <small>{orders.length}</small></h2>
              <button onClick={() => setTrackOpen(false)}>×</button>
            </div>
            {orders.length === 0 ? (
              <div className="empty-cart">
                <p>No orders to track yet.</p>
                <span>Once you place an order, follow it here from packing to your door.</span>
              </div>
            ) : (
              <>
                <label className="track-lookup">
                  <span aria-hidden="true">⌕</span>
                  <input aria-label="Find order by ID" placeholder="Find by order ID (e.g. NX-…)" value={trackQuery} onChange={(event) => setTrackQuery(event.target.value)} />
                </label>
                <div className="order-list track-list">
                  {trackedOrders.length === 0 ? (
                    <p className="admin-empty">No order matches “{trackQuery}”.</p>
                  ) : trackedOrders.map((order) => {
                    const items = order.received?.items || []
                    const units = items.reduce((sum, item) => sum + item.quantity, 0)
                    const cancellable = CANCELLABLE.includes(order.status)
                    const contact = order.received?.customer
                    const payLabel = order.received?.payment === 'card'
                      ? `${order.received?.card?.brand || 'Card'} ···· ${order.received?.card?.last4 || '••••'}`
                      : 'Pay on delivery'
                    const shipLabel = order.received?.shipping === 'express' ? 'Express delivery' : 'Standard delivery'
                    const eta = estimateDelivery(order)
                    const inFlight = order.status !== 'Cancelled' && order.status !== 'Delivered'
                    return (
                      <div className={`admin-order-card track-order-card ${order.status === 'Cancelled' ? 'is-cancelled' : ''}`} key={order.orderId}>
                        <div className="admin-order-top">
                          <span className="order-id">{order.orderId}</span>
                          <strong>${order.received?.total ?? 0}</strong>
                        </div>
                        <div className="track-order-items">
                          {items.slice(0, 4).map((item) => (
                            <img key={item.id} src={item.image} alt={item.name} title={`${item.name} × ${item.quantity}`} loading="lazy" />
                          ))}
                          {items.length > 4 && <span className="track-more">+{items.length - 4}</span>}
                          <span className="track-item-summary">{units} item{units === 1 ? '' : 's'} · {new Date(order.createdAt).toLocaleDateString()}</span>
                        </div>
                        {(contact?.name || contact?.address || contact?.email) && (
                          <dl className="track-order-details">
                            {contact.name && (<><dt>Recipient</dt><dd>{contact.name}</dd></>)}
                            {contact.address && (<><dt>Ship to</dt><dd>{contact.address}</dd></>)}
                            {contact.email && (<><dt>Contact</dt><dd>{contact.email}</dd></>)}
                            <dt>Delivery</dt><dd>{shipLabel}</dd>
                            <dt>Payment</dt><dd>{payLabel}</dd>
                          </dl>
                        )}
                        <OrderStepper status={order.status} />
                        {inFlight && eta && (
                          <p className="track-eta"><span aria-hidden="true">🚚</span> {order.status === 'Shipped' ? 'Arriving' : 'Est. arrival'} <strong>{formatDay(eta)}</strong></p>
                        )}
                        {order.status === 'Delivered' && eta && (
                          <p className="track-eta is-delivered"><span aria-hidden="true">✓</span> Delivered <strong>{formatDay(eta)}</strong></p>
                        )}
                        <div className="admin-order-foot track-order-foot">
                          <span className={`order-status status-${order.status.toLowerCase()}`}>{order.status === 'Cancelled' ? '✕ Cancelled' : order.status}</span>
                          {cancellable ? (
                            confirmCancel === order.orderId ? (
                              <span className="cancel-confirm">
                                Cancel this order?
                                <button type="button" className="cancel-yes" onClick={() => cancelOrder(order.orderId)}>Yes</button>
                                <button type="button" className="cancel-no" onClick={() => setConfirmCancel(null)}>Keep</button>
                              </span>
                            ) : (
                              <button type="button" className="cancel-btn" onClick={() => setConfirmCancel(order.orderId)}>Cancel order</button>
                            )
                          ) : order.status === 'Shipped' ? (
                            <small>On the way — too late to cancel</small>
                          ) : (order.status === 'Delivered' || order.status === 'Cancelled') ? (
                            <button type="button" className="buy-again" onClick={() => reorder(order)}>{order.status === 'Cancelled' ? 'Order again' : 'Buy again'} ↻</button>
                          ) : null}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </>
            )}
          </aside>
        </div>
      )}

      {payStage && (
        <div className="gateway-overlay" role="dialog" aria-modal="true" aria-label="Payment">
          <div className="gateway-modal">
            {payStage === 'processing' && (
              <div className="gateway-processing">
                <div className="gateway-spinner" aria-hidden="true" />
                <h3>Contacting your bank…</h3>
                <p>Securing a connection with {cardBrand || 'your card'} ending {cardDigits.slice(-4) || '••••'}</p>
              </div>
            )}
            {payStage === 'auth' && (
              <div className="gateway-auth">
                <span className="gateway-badge">3-D Secure</span>
                <h3>Verify it's you</h3>
                <p>Your bank sent a one-time code to the phone on file. Enter any 6 digits to approve this simulated payment of <strong>${total}</strong>.</p>
                <input
                  className="gateway-otp"
                  inputMode="numeric"
                  autoFocus
                  placeholder="––––––"
                  maxLength={6}
                  value={otp}
                  onChange={(event) => { setCardError(''); setOtp(event.target.value.replace(/\D/g, '').slice(0, 6)) }}
                />
                {cardError && <p className="card-error" role="alert">{cardError}</p>}
                <div className="gateway-actions">
                  <button type="button" className="ghost-button" onClick={cancelPayment}>Cancel</button>
                  <button type="button" className="dark-button" onClick={verifyPayment}>Verify &amp; pay</button>
                </div>
              </div>
            )}
            {payStage === 'approved' && (
              <div className="gateway-approved">
                <div className="gateway-check" aria-hidden="true">
                  <svg viewBox="0 0 52 52"><circle cx="26" cy="26" r="24" /><path d="M14 27l8 8 16-16" /></svg>
                </div>
                <h3>Payment approved</h3>
                <p>Finalising your order…</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default App