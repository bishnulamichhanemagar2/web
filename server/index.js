import { createServer } from 'node:http'

const port = process.env.PORT || 5174

const products = [
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

const orders = []
const VALID_STATUSES = ['New', 'Processing', 'Shipped', 'Delivered', 'Cancelled']
// Orders can only be cancelled before they leave the warehouse.
const CANCELLABLE_STATUSES = ['New', 'Processing']
const MAX_BODY_BYTES = 100_000

function sendJson(response, status, data) {
  response.statusCode = status
  response.setHeader('Content-Type', 'application/json')
  response.setHeader('Access-Control-Allow-Origin', '*')
  response.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, OPTIONS')
  response.setHeader('Access-Control-Allow-Headers', 'Content-Type')
  response.end(JSON.stringify(data))
}

function readBody(request) {
  return new Promise((resolve, reject) => {
    let body = ''
    let tooLarge = false
    request.on('data', (chunk) => {
      body += chunk
      if (body.length > MAX_BODY_BYTES) {
        tooLarge = true
        request.destroy()
      }
    })
    request.on('end', () => {
      if (tooLarge) return reject(new Error('Payload too large'))
      resolve(body)
    })
    request.on('error', reject)
  })
}

const server = createServer(async (request, response) => {
  // CORS preflight
  if (request.method === 'OPTIONS') {
    sendJson(response, 204, {})
    return
  }

  const url = new URL(request.url, `http://localhost:${port}`)
  const { pathname } = url

  // GET /api/products
  if (request.method === 'GET' && pathname === '/api/products') {
    sendJson(response, 200, products)
    return
  }

  // GET /api/orders
  if (request.method === 'GET' && pathname === '/api/orders') {
    sendJson(response, 200, orders)
    return
  }

  // POST /api/orders
  if (request.method === 'POST' && pathname === '/api/orders') {
    try {
      const body = await readBody(request)
      const received = JSON.parse(body || '{}')
      // Basic validation
      if (!Array.isArray(received.items) || received.items.length === 0) {
        sendJson(response, 400, { error: 'Order must include at least one item.' })
        return
      }
      if (typeof received.total !== 'number' || received.total < 0) {
        sendJson(response, 400, { error: 'Invalid order total.' })
        return
      }
      const order = {
        orderId: `NX-${Date.now()}`,
        status: 'New',
        createdAt: new Date().toISOString(),
        received,
      }
      orders.push(order)
      sendJson(response, 201, order)
    } catch {
      sendJson(response, 400, { error: 'Invalid request body.' })
    }
    return
  }

  // PATCH /api/orders/:id  — update status
  const orderMatch = pathname.match(/^\/api\/orders\/([^/]+)$/)
  if (request.method === 'PATCH' && orderMatch) {
    try {
      const orderId = decodeURIComponent(orderMatch[1])
      const order = orders.find((item) => item.orderId === orderId)
      if (!order) {
        sendJson(response, 404, { error: 'Order not found.' })
        return
      }
      const body = await readBody(request)
      const patch = JSON.parse(body || '{}')
      if (!VALID_STATUSES.includes(patch.status)) {
        sendJson(response, 400, { error: `Status must be one of: ${VALID_STATUSES.join(', ')}.` })
        return
      }
      // Guard: a shipped, delivered, or already-cancelled order can't be cancelled.
      if (patch.status === 'Cancelled' && !CANCELLABLE_STATUSES.includes(order.status)) {
        sendJson(response, 409, { error: `An order that is ${order.status} can no longer be cancelled.` })
        return
      }
      order.status = patch.status
      sendJson(response, 200, order)
    } catch {
      sendJson(response, 400, { error: 'Invalid request body.' })
    }
    return
  }

  // Fallback
  sendJson(response, 404, { error: 'Not found' })
})

server.listen(port, '0.0.0.0', () => {
  console.log(`Nexus API running at:`)
  console.log(`  Local:   http://localhost:${port}`)
  console.log(`  Network: http://192.168.1.67:${port}`)
})