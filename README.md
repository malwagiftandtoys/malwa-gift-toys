
# 🎁 Malwa Gift and Toys — Production Website

**Domain:** https://malwagiftandtoys.in  
**Location:** Bathinda, Punjab, India  
**Stack:** React (Frontend) + Node.js/Express (Backend) + MongoDB (Database)

---

## 📁 Complete Folder Structure

```
malwa-gift-toys/
├── frontend/                     # React / Next.js App
│   ├── public/
│   │   ├── favicon.ico
│   │   ├── robots.txt
│   │   ├── sitemap.xml
│   │   └── manifest.json
│   ├── src/
│   │   ├── components/
│   │   │   ├── Header.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── ProductCard.jsx
│   │   │   ├── CartSidebar.jsx
│   │   │   ├── WhatsAppFloat.jsx
│   │   │   └── Toast.jsx
│   │   ├── pages/
│   │   │   ├── index.jsx          (Home)
│   │   │   ├── shop.jsx           (Shop/Products)
│   │   │   ├── product/[id].jsx   (Product Detail)
│   │   │   ├── about.jsx          (About Us)
│   │   │   ├── contact.jsx        (Contact)
│   │   │   ├── cart.jsx           (Cart)
│   │   │   ├── checkout.jsx       (Checkout)
│   │   │   ├── privacy.jsx
│   │   │   └── terms.jsx
│   │   ├── admin/
│   │   │   ├── login.jsx
│   │   │   ├── dashboard.jsx
│   │   │   ├── products.jsx
│   │   │   └── orders.jsx
│   │   ├── context/
│   │   │   ├── CartContext.jsx
│   │   │   └── AuthContext.jsx
│   │   ├── hooks/
│   │   │   ├── useCart.js
│   │   │   └── useProducts.js
│   │   ├── utils/
│   │   │   ├── sanitize.js        (XSS prevention)
│   │   │   ├── validate.js        (Input validation)
│   │   │   └── api.js             (API calls)
│   │   └── styles/
│   │       └── globals.css
│   ├── .env.local                 (environment variables)
│   ├── next.config.js
│   └── package.json
│
├── backend/                      # Node.js / Express API
│   ├── src/
│   │   ├── routes/
│   │   │   ├── products.js
│   │   │   ├── orders.js
│   │   │   ├── auth.js
│   │   │   ├── contact.js
│   │   │   └── newsletter.js
│   │   ├── models/
│   │   │   ├── Product.js         (Mongoose Schema)
│   │   │   ├── Order.js
│   │   │   ├── User.js
│   │   │   └── Newsletter.js
│   │   ├── middleware/
│   │   │   ├── auth.js            (JWT verification)
│   │   │   ├── rateLimiter.js     (Brute-force protection)
│   │   │   ├── sanitize.js        (Input sanitization)
│   │   │   ├── validate.js        (Validation rules)
│   │   │   └── adminGuard.js      (Admin route protection)
│   │   ├── controllers/
│   │   │   ├── productController.js
│   │   │   ├── orderController.js
│   │   │   └── authController.js
│   │   ├── config/
│   │   │   ├── db.js              (MongoDB connection)
│   │   │   └── cors.js            (CORS config)
│   │   └── app.js                 (Express app)
│   ├── .env                       (secrets)
│   ├── server.js
│   └── package.json
│
├── docs/
│   ├── API.md
│   ├── SECURITY.md
│   └── DEPLOYMENT.md
│
├── index.jsx                      ← THIS FILE (Single-file demo)
└── README.md
```

---

## 🚀 Quick Start (Local Development)

### Prerequisites
- Node.js 18+ 
- MongoDB (local or Atlas)
- npm or yarn

### 1. Clone & Setup Frontend

```bash
git clone https://github.com/malwagiftandtoys/malwa-gift-toys.git
cd C:\Users\DESKTOP\Desktop\website\malwa-gift-toys-website\malwa-gift-toys\frontend

npm install

# Create .env.local
cat > .env.local << EOF
NEXT_PUBLIC_API_URL=http://localhost:5000/api
NEXT_PUBLIC_WHATSAPP_NUMBER=919988601230
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_live_XXXXXXXXXXXXXXX
EOF

npm run dev   # Starts on http://localhost:3000
```

### 2. Setup Backend

```bash
cd ../backend
npm install

# Create .env
cat > .env << EOF
PORT=5000
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/malwagifts
JWT_SECRET=your-256-bit-super-secret-key-here
JWT_EXPIRE=7d
ADMIN_EMAIL=admin@malwa.in
ADMIN_PASS_HASH=$2b$10$hashedpasswordhere
CORS_ORIGIN=http://localhost:3000,https://malwagiftandtoys.in
RAZORPAY_KEY_ID=rzp_live_XXXXXXXX
RAZORPAY_SECRET=your_razorpay_secret
SMTP_HOST=smtp.gmail.com
SMTP_USER=noreply@malwagiftandtoys.in
SMTP_PASS=your_app_password
WHATSAPP_API_TOKEN=your_meta_token  # optional
NODE_ENV=production
EOF

npm start   # Starts on http://localhost:5000
```

---

## 🔐 Security Implementation Guide

### 1. Helmet.js (HTTP Security Headers)
```javascript
// backend/src/app.js
const helmet = require('helmet');
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "https://checkout.razorpay.com"],
      styleSrc: ["'self'", "https://fonts.googleapis.com"],
      imgSrc: ["'self'", "data:", "https:"],
      connectSrc: ["'self'", "https://api.razorpay.com"],
    }
  },
  hsts: { maxAge: 31536000, includeSubDomains: true, preload: true },
}));
```

### 2. Rate Limiting (Brute Force Protection)
```javascript
// backend/src/middleware/rateLimiter.js
const rateLimit = require('express-rate-limit');

exports.apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
  message: { error: 'Too many requests, please try again later.' }
});

exports.authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5, // Only 5 login attempts per 15 min
  skipSuccessfulRequests: true,
  message: { error: 'Too many failed login attempts. Try after 15 minutes.' }
});
```

### 3. Input Sanitization (XSS Prevention)
```javascript
// backend/src/middleware/sanitize.js
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const DOMPurify = require('isomorphic-dompurify');

app.use(mongoSanitize()); // Prevent NoSQL injection
app.use(xss());           // Sanitize HTML input

// Custom sanitizer for all string fields
exports.sanitizeBody = (req, res, next) => {
  for (const key in req.body) {
    if (typeof req.body[key] === 'string') {
      req.body[key] = DOMPurify.sanitize(req.body[key].trim());
    }
  }
  next();
};
```

### 4. JWT Authentication
```javascript
// backend/src/middleware/auth.js
const jwt = require('jsonwebtoken');

exports.protect = async (req, res, next) => {
  let token;
  if (req.headers.authorization?.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }
  if (!token) return res.status(401).json({ error: 'Not authorized' });
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select('-password');
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Token invalid or expired' });
  }
};
```

### 5. CORS Configuration
```javascript
// backend/src/config/cors.js
const corsOptions = {
  origin: (origin, callback) => {
    const whitelist = process.env.CORS_ORIGIN.split(',');
    if (!origin || whitelist.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-CSRF-Token'],
};
```

### 6. CSRF Protection
```javascript
const csrf = require('csurf');
app.use(csrf({ cookie: { secure: true, sameSite: 'strict' } }));
app.use((req, res, next) => {
  res.locals.csrfToken = req.csrfToken();
  next();
});
```

### 7. Input Validation (Express Validator)
```javascript
// backend/src/middleware/validate.js
const { body, validationResult } = require('express-validator');

exports.validateOrder = [
  body('name').trim().notEmpty().isLength({ max: 100 }).escape(),
  body('phone').matches(/^[6-9]\d{9}$/).withMessage('Valid Indian phone required'),
  body('email').optional().isEmail().normalizeEmail(),
  body('address').trim().notEmpty().isLength({ max: 500 }).escape(),
  body('pincode').matches(/^\d{6}$/).withMessage('Valid 6-digit PIN required'),
  body('items').isArray({ min: 1 }),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    next();
  }
];
```

### 8. File Upload Validation
```javascript
const multer = require('multer');
const path = require('path');

const upload = multer({
  limits: { fileSize: 2 * 1024 * 1024 }, // 2MB max
  fileFilter: (req, file, cb) => {
    const allowed = ['.jpg', '.jpeg', '.png', '.webp'];
    const ext = path.extname(file.originalname).toLowerCase();
    if (allowed.includes(ext)) cb(null, true);
    else cb(new Error('Only JPG, PNG, WebP images allowed'));
  }
});
```

---

## 📦 MongoDB Schemas

```javascript
// Product Schema
const productSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true, maxlength: 200 },
  category: { type: String, enum: ['toys','gifts','kids','seasonal'], required: true },
  price: { type: Number, required: true, min: 0 },
  originalPrice: { type: Number, required: true },
  description: { type: String, maxlength: 1000 },
  images: [{ type: String }],  // Cloudinary URLs
  stock: { type: Number, default: 0 },
  tag: String,
  rating: { type: Number, default: 0 },
  reviews: { type: Number, default: 0 },
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
});

// Order Schema
const orderSchema = new mongoose.Schema({
  orderId: { type: String, unique: true },
  customer: { name: String, phone: String, email: String, address: String, pincode: String },
  items: [{ productId: mongoose.Schema.Types.ObjectId, name: String, price: Number, qty: Number }],
  total: Number,
  deliveryCharge: Number,
  paymentMethod: { type: String, enum: ['cod','upi','card','razorpay'] },
  paymentStatus: { type: String, enum: ['pending','paid','failed'], default: 'pending' },
  orderStatus: { type: String, enum: ['pending','processing','shipped','delivered','cancelled'], default: 'pending' },
  razorpayOrderId: String,
  createdAt: { type: Date, default: Date.now },
});
```

---

## 🚀 Deployment Guide

### Frontend: Deploy to Vercel

```bash
# 1. Install Vercel CLI
npm i -g vercel

# 2. Build & Deploy
cd frontend
vercel login
vercel --prod

# 3. Add custom domain in Vercel Dashboard
# Settings → Domains → Add: malwagiftandtoys.in

# 4. Set environment variables in Vercel Dashboard
# Settings → Environment Variables → Add all vars from .env.local
```

### Backend: Deploy to Railway / Render

```bash
# Option A: Railway
npm i -g @railway/cli
railway login
railway init
railway up

# Option B: Render
# Push to GitHub, connect repo on render.com
# Set environment variables in Render dashboard
```

### DNS Configuration (for malwagiftandtoys.in)

```
# Add these DNS records in your domain registrar (GoDaddy/Namecheap):
Type    Host    Value                     TTL
A       @       76.76.21.21               Auto    ← Vercel IP
CNAME   www     cname.vercel-dns.com      Auto
CNAME   api     your-app.railway.app      Auto    ← Backend
MX      @       mail.malwagiftandtoys.in  Auto
TXT     @       v=spf1 include:...        Auto    ← SPF
```

### SSL (HTTPS)
- **Vercel** and **Railway** provide automatic SSL certificates.
- Your domain will have HTTPS automatically once DNS propagates (24–48 hrs).

---

## ⚡ Performance Optimization

```javascript
// next.config.js
module.exports = {
  images: {
    domains: ['res.cloudinary.com'],
    formats: ['image/avif', 'image/webp'],
  },
  compress: true,
  poweredByHeader: false,  // Remove X-Powered-By header
  async headers() {
    return [{
      source: '/(.*)',
      headers: [
        { key: 'X-Content-Type-Options', value: 'nosniff' },
        { key: 'X-Frame-Options', value: 'DENY' },
        { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
        { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
      ],
    }];
  },
};
```

---

## 💳 Razorpay Integration

```javascript
// Create order (backend)
const Razorpay = require('razorpay');
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_SECRET,
});

const order = await razorpay.orders.create({
  amount: totalAmount * 100,  // in paise
  currency: 'INR',
  receipt: `order_${Date.now()}`,
});

// Verify payment signature (backend)
const crypto = require('crypto');
const body = razorpay_order_id + "|" + razorpay_payment_id;
const expectedSignature = crypto
  .createHmac("sha256", process.env.RAZORPAY_SECRET)
  .update(body)
  .digest("hex");
const isValid = expectedSignature === razorpay_signature;
```

---

## 📊 SEO Configuration

```html
<!-- pages/_document.jsx -->
<Head>
  <title>Malwa Gift and Toys — Best Gift & Toy Store in Bathinda, Punjab</title>
  <meta name="description" content="Premium toys, gifts & kids items in Bathinda. Free delivery above ₹499. 10,000+ happy customers. Order on WhatsApp!" />
  <meta name="keywords" content="toys bathinda, gifts bathinda, kids store punjab, malwa toys, gift shop bathinda" />
  
  <!-- Open Graph -->
  <meta property="og:title" content="Malwa Gift and Toys" />
  <meta property="og:description" content="Best gift & toy store in Bathinda, Punjab" />
  <meta property="og:url" content="https://malwagiftandtoys.in" />
  <meta property="og:image" content="https://malwagiftandtoys.in/og-image.jpg" />
  
  <!-- Schema.org LocalBusiness -->
  <script type="application/ld+json">{JSON.stringify({
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Malwa Gift and Toys",
    "telephone": "+91-9876000000",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Near Bus Stand",
      "addressLocality": "Bathinda",
      "addressRegion": "Punjab",
      "postalCode": "151001",
      "addressCountry": "IN"
    },
    "url": "https://malwagiftandtoys.in",
    "openingHours": "Mo-Su 09:00-21:00",
    "priceRange": "₹₹"
  })}</script>
</Head>
```

---

## 🛡️ OWASP Top 10 Compliance Checklist

| # | Vulnerability | Status | Implementation |
|---|--------------|--------|----------------|
| A01 | Broken Access Control | ✅ | JWT + Admin Guard middleware |
| A02 | Cryptographic Failures | ✅ | HTTPS + bcrypt password hashing |
| A03 | Injection | ✅ | Mongoose sanitize + express-validator |
| A04 | Insecure Design | ✅ | Input validation + least privilege |
| A05 | Security Misconfiguration | ✅ | Helmet.js + secure headers |
| A06 | Vulnerable Components | ✅ | Regular npm audit + updates |
| A07 | Auth Failures | ✅ | Rate limiting + JWT expiry |
| A08 | Data Integrity Failures | ✅ | CSRF tokens + signature verification |
| A09 | Logging Failures | ✅ | Winston logger + error tracking |
| A10 | SSRF | ✅ | URL validation + allowlist |

---

## 🤖 Bot Protection & Firewall

```nginx
# Nginx config (if self-hosting)
# Rate limit: 10 req/sec per IP
limit_req_zone $binary_remote_addr zone=api:10m rate=10r/s;
limit_req zone=api burst=20 nodelay;

# Block common bad bots
if ($http_user_agent ~* "scrapy|bot|crawler|spider|wget|curl") {
  return 403;
}

# Block non-Indian IPs (optional, for Razorpay compliance)
# Use Cloudflare WAF rules or GeoIP filtering
```

**Cloudflare (Recommended):**
- Enable **Cloudflare WAF** (free plan covers basics)
- Enable **Bot Fight Mode**
- Enable **DDoS Protection**
- Use **Cloudflare Proxy** for all DNS records

---

## 📱 WhatsApp Business API Integration

```javascript
// Simple click-to-WhatsApp (free, no API needed)
const whatsappOrder = (cart) => {
  const message = `Hi Malwa Gift & Toys! 🎁\n\nI'd like to order:\n` +
    cart.map(i => `• ${i.name} × ${i.qty} = ₹${i.price * i.qty}`).join('\n') +
    `\n\nTotal: ₹${cart.reduce((s, i) => s + i.price * i.qty, 0)}\n\nMy details:\nName: [your name]\nAddress: [your address]`;
  
  window.open(`https://wa.me/919876000000?text=${encodeURIComponent(message)}`, '_blank');
};
```

---

## 👤 Admin Credentials (Demo)

```
Email:    admin@malwa.in
Password: Admin@123
URL:      https://malwagiftandtoys.in/admin

⚠️ IMPORTANT: Change these immediately in production!
Use: bcrypt.hash('YourNewPassword', 10) to generate a new hash
```

---

## 📦 Required npm Packages

**Frontend:**
```json
{
  "dependencies": {
    "next": "^14.0.0",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "axios": "^1.6.0",
    "razorpay": "^2.9.0",
    "dompurify": "^3.0.6",
    "react-hot-toast": "^2.4.1"
  }
}
```

**Backend:**
```json
{
  "dependencies": {
    "express": "^4.18.2",
    "mongoose": "^7.6.3",
    "bcryptjs": "^2.4.3",
    "jsonwebtoken": "^9.0.2",
    "helmet": "^7.1.0",
    "cors": "^2.8.5",
    "express-rate-limit": "^7.1.5",
    "express-mongo-sanitize": "^2.2.0",
    "xss-clean": "^0.1.4",
    "express-validator": "^7.0.1",
    "multer": "^1.4.5",
    "sharp": "^0.32.6",
    "csurf": "^1.11.0",
    "winston": "^3.11.0",
    "dotenv": "^16.3.1",
    "razorpay": "^2.9.2",
    "nodemailer": "^6.9.7"
  }
}
```

---

## 📞 Support

- **Phone:** +91 98760 00000  
- **WhatsApp:** https://wa.me/919876000000  
- **Email:** info@malwagiftandtoys.in  
- **Website:** https://malwagiftandtoys.in  

Built with ❤️ for Bathinda, Punjab 🌾
