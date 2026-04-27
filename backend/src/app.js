/**
 * ═══════════════════════════════════════════════════════
 *   MALWA GIFT AND TOYS - Backend Express Server
 *   malwagiftandtoys.in | Bathinda, Punjab, India
 * ═══════════════════════════════════════════════════════
 */

const express        = require('express');
const cors           = require('cors');
const helmet         = require('helmet');
const mongoSanitize  = require('express-mongo-sanitize');
const xssClean       = require('xss-clean');
const rateLimit      = require('express-rate-limit');
const dotenv         = require('dotenv');
const path           = require('path');

dotenv.config();
const app = express();

/* ── SECURITY MIDDLEWARE ─────────────────────────── */

// 1. Helmet - sets secure HTTP headers
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc:  ["'self'", "https://checkout.razorpay.com", "https://fonts.googleapis.com"],
      styleSrc:   ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
      fontSrc:    ["'self'", "https://fonts.gstatic.com"],
      imgSrc:     ["'self'", "data:", "https:", "blob:"],
      connectSrc: ["'self'", "https://api.razorpay.com"],
      frameSrc:   ["https://api.razorpay.com"],
    }
  },
  hsts: { maxAge: 31536000, includeSubDomains: true, preload: true },
}));

// 2. CORS - allow only your domain
app.use(cors({
  origin: (origin, callback) => {
    const whitelist = (process.env.CORS_ORIGIN || 'http://localhost:3000').split(',');
    if (!origin || whitelist.includes(origin)) callback(null, true);
    else callback(new Error('CORS: Not allowed'));
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-CSRF-Token'],
}));

// 3. Rate limiting - prevent brute force
const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 200,
  message: { error: 'Too many requests. Please try again after 15 minutes.' },
  standardHeaders: true,
  legacyHeaders: false,
});

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: { error: 'Too many login attempts. Try after 15 minutes.' },
  skipSuccessfulRequests: true,
});

app.use('/api/', globalLimiter);
app.use('/api/auth/login', authLimiter);

// 4. Body parser
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

// 5. NoSQL Injection prevention
app.use(mongoSanitize());

// 6. XSS prevention
app.use(xssClean());

// 7. Remove X-Powered-By
app.disable('x-powered-by');

/* ── ROUTES ──────────────────────────────────────── */
app.use('/api/products',   require('./routes/products'));
app.use('/api/orders',     require('./routes/orders'));
app.use('/api/auth',       require('./routes/auth'));
app.use('/api/contact',    require('./routes/contact'));
app.use('/api/newsletter', require('./routes/newsletter'));

/* ── SERVE FRONTEND (Production) ─────────────────── */
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../../frontend/build')));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../../frontend/build', 'index.html'));
  });
}

/* ── HEALTH CHECK ────────────────────────────────── */
app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    store: 'Malwa Gift and Toys',
    location: 'Bathinda, Punjab',
    timestamp: new Date().toISOString(),
    security: {
      helmet: true, cors: true, rateLimit: true,
      xssPrevention: true, noSqlInjection: true
    }
  });
});

/* ── GLOBAL ERROR HANDLER ────────────────────────── */
app.use((err, req, res, next) => {
  console.error(`[ERROR] ${err.message}`);
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    success: false,
    message: process.env.NODE_ENV === 'production' ? 'Something went wrong' : err.message
  });
});

module.exports = app;
