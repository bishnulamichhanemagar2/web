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
const ORDER_FLOW = ['New', 'Processing', 'Shipped', 'Delivered']

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
  const [orders, setOrders] = useState([])
  const [adminOpen, setAdminOpen] = useState(false)
  const [editorialChoice, setEditorialChoice] = useState('Materials')
  const [view, setView] = useState(window.location.hash === '#shop' ? 'shop' : window.location.hash === '#about' ? 'about' : 'home')
  const [wishlist, setWishlist] = usePersistentState(WISHLIST_KEY, [])
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

  useEffect(() => { fetch('/api/orders').then((response) => response.ok ? response.json() : Promise.reject()).then(setOrders).catch(() => { }) }, [])

  useEffect(() => {
    const onHashChange = () => setView(window.location.hash === '#shop' ? 'shop' : window.location.hash === '#about' ? 'about' : 'home')
    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [])

  // wishlist, cart, and recently-viewed persist via usePersistentState.

  useEffect(() => { setQvQty(1) }, [quickView])

  useEffect(() => {
    const onKey = (event) => {
      if (event.key === 'Escape') {
        setCartOpen(false); setAdminOpen(false); setWishlistOpen(false); setQuickView(null); setMenuOpen(false); setCheckout(false)
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

  const revenue = orders.reduce((sum, order) => sum + (order.received?.total || 0), 0)
  const revenueHistory = orders.slice().sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt)).map((order) => order.received?.total || 0)

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
    setHeroCursor({ x: x.toFixed(3), y: y.toFixed(3) })
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
    setWishlist((current) => {
      const exists = current.some((item) => item.id === product.id)
      setNotice(exists ? `${product.name} removed from wishlist` : `${product.name} saved to wishlist`)
      setTimeout(() => setNotice(''), 2200)
      return exists ? current.filter((item) => item.id !== product.id) : [...current, product]
    })
  }

  function moveWishlistToCart(product) {
    addToCart(product)
    setWishlist((current) => current.filter((item) => item.id !== product.id))
  }

  async function placeOrder(event) {
    event.preventDefault()
    const response = await fetch('/api/orders', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ items: cart, total, subtotal, discount, promo: promo?.code || null, shipping, payment }) }).catch(() => null)
    if (response?.ok) {
      const data = await response.json()
      setOrders((current) => [...current, data])
      setCart([])
      setCheckout(false)
      removePromo()
      setNotice('Order received. Thank you for shopping with us.')
      setTimeout(() => setNotice(''), 3500)
    } else {
      setNotice('Something went wrong. Please try again.')
      setTimeout(() => setNotice(''), 3500)
    }
  }

  async function advanceOrderStatus(orderId) {
    const order = orders.find((item) => item.orderId === orderId)
    if (!order) return
    const next = ORDER_FLOW[Math.min(ORDER_FLOW.indexOf(order.status) + 1, ORDER_FLOW.length - 1)]
    const response = await fetch(`/api/orders/${orderId}`, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ status: next }) }).catch(() => null)
    if (response?.ok) {
      const updated = await response.json()
      setOrders((current) => current.map((item) => item.orderId === orderId ? updated : item))
    }
  }

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
          <button className="wishlist-button" onClick={() => setWishlistOpen(true)}>Saved <b>{wishlist.length}</b></button>
          <button key={`bag-${itemCount}`} className="bag-button" onClick={() => setCartOpen(true)}>Bag <b>{itemCount}</b></button>
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
                <li><span>Track order</span></li>
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
              <div className="cart-items">
                {wishlist.map((item) => (
                  <div className="wishlist-item" key={item.id}>
                    <img src={item.image} alt="" />
                    <div>
                      <h3>{item.name}</h3>
                      <p>${item.price} · {item.material}</p>
                      <button className="move-btn" onClick={() => moveWishlistToCart(item)}>Move to bag →</button>
                    </div>
                    <button className="back-button" style={{ fontSize: '18px', padding: '0 0 0 8px' }} aria-label="Remove" onClick={() => toggleWishlist(item)}>×</button>
                  </div>
                ))}
              </div>
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
                        <strong>${order.received.total}</strong>
                      </div>
                      <OrderStepper status={order.status} />
                      <div className="admin-order-foot">
                        <small>{new Date(order.createdAt).toLocaleString()}</small>
                        <button className="advance-btn" onClick={() => advanceOrderStatus(order.orderId)}>Advance →</button>
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
              <form className="checkout-form" onSubmit={placeOrder}>
                <button type="button" className="back-button" onClick={() => setCheckout(false)}>← Back to bag</button>
                <h2>Almost there.</h2>
                <input required placeholder="Full name" />
                <input required type="email" placeholder="Email address" />
                <input required placeholder="Delivery address" />
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
                    <input required inputMode="numeric" placeholder="Card number" pattern="[0-9 ]{12,19}" />
                    <div className="card-row">
                      <input required placeholder="MM / YY" />
                      <input required placeholder="CVC" inputMode="numeric" />
                    </div>
                  </>
                )}
                {discount > 0 && <div className="checkout-total discount-line"><span>Discount ({promo.code})</span><strong>−${discount}</strong></div>}
                <div className="checkout-total"><span>Total</span><strong>${total}</strong></div>
                <button className="dark-button" type="submit">Place order <span>↗</span></button>
              </form>
            )}
          </aside>
        </div>
      )}
    </div>
  )
}

export default App