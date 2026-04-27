# 🌐 GoDaddy Domain & Hosting Setup Guide
## malwagiftandtoys.in — Complete Step-by-Step

---

## 📋 WHAT YOU HAVE ON GODADDY

Based on your purchase, you likely have one or both of these:
1. **Domain Registration** — malwagiftandtoys.in
2. **Hosting Plan** — cPanel / Linux Hosting

---

## ═══════════════════════════════════════════
## OPTION A: Using GoDaddy Hosting (cPanel)
## ═══════════════════════════════════════════

### Step 1 — Build Your Website
Run: `DEPLOY_TO_GODADDY_HOSTING.bat`
This creates a `GODADDY_UPLOAD\` folder with all files ready.

---

### Step 2 — Login to GoDaddy
1. Go to **https://godaddy.com**
2. Click **Sign In** (top right)
3. Click **My Products**
4. Under **Web Hosting**, click **Manage**

---

### Step 3 — Access cPanel File Manager
1. In Hosting dashboard, click **cPanel Admin**
2. Scroll to **Files** section
3. Click **File Manager**
4. Navigate to **public_html** folder
5. ⚠️ DELETE all existing files in public_html (select all → delete)

---

### Step 4 — Upload Your Files
**Method 1 — File Manager Upload (Easy)**
1. In File Manager, click **Upload** button
2. Select all files from your `GODADDY_UPLOAD\` folder
3. Upload all files and folders
4. ✅ Done!

**Method 2 — FTP with FileZilla (Recommended for large files)**
```
FTP Details (find in GoDaddy cPanel → FTP Accounts):
  Host:     ftp.malwagiftandtoys.in
  Username: your_ftp_username
  Password: your_ftp_password
  Port:     21
  
Upload destination: /public_html/
```
Download FileZilla Free: https://filezilla-project.org/

---

### Step 5 — Configure .htaccess for React Router
Create a file called `.htaccess` in public_html with this content:

```apache
Options -MultiViews
RewriteEngine On
RewriteCond %{REQUEST_FILENAME} !-f
RewriteRule ^ index.html [QSA,L]

# Force HTTPS
RewriteCond %{HTTPS} off
RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]

# Security Headers
Header always set X-Frame-Options "SAMEORIGIN"
Header always set X-Content-Type-Options "nosniff"
Header always set X-XSS-Protection "1; mode=block"
Header always set Referrer-Policy "strict-origin-when-cross-origin"

# Cache static files
<FilesMatch "\.(css|js|jpg|jpeg|png|gif|ico|svg|woff2)$">
  Header set Cache-Control "max-age=31536000, public"
</FilesMatch>
```

---

### Step 6 — Verify It's Working
1. Open browser → https://malwagiftandtoys.in
2. ✅ You should see your Malwa Gift & Toys website!

---

## ═══════════════════════════════════════════
## OPTION B: GoDaddy Domain + Vercel Hosting
## (RECOMMENDED — Better Performance + Free SSL)
## ═══════════════════════════════════════════

### Step 1 — Deploy to Vercel
Run: `DEPLOY_TO_VERCEL.bat`
After deployment, Vercel gives you a URL like:
`malwa-gift-toys.vercel.app`

---

### Step 2 — Add Custom Domain in Vercel
1. Go to **https://vercel.com** → your project
2. Click **Settings** → **Domains**
3. Type: `malwagiftandtoys.in` → click **Add**
4. Also add: `www.malwagiftandtoys.in`
5. Vercel shows you DNS records to add ↓

---

### Step 3 — Update DNS in GoDaddy
1. Login to **https://godaddy.com**
2. Click **My Products** → **Domains**
3. Click **DNS** next to `malwagiftandtoys.in`
4. Delete the existing **A record** for `@`
5. Add these new records:

```
┌─────────────────────────────────────────────────────────────┐
│  TYPE    │  NAME  │  VALUE                   │  TTL        │
├─────────────────────────────────────────────────────────────┤
│  A       │  @     │  76.76.21.21             │  1 Hour     │
│  CNAME   │  www   │  cname.vercel-dns.com    │  1 Hour     │
└─────────────────────────────────────────────────────────────┘
```

6. Click **Save** ✅

---

### Step 4 — Wait for DNS Propagation
- DNS updates take **15 minutes to 48 hours**
- Check status: https://dnschecker.org/#A/malwagiftandtoys.in

---

### Step 5 — SSL Certificate (HTTPS)
- **Vercel provides FREE SSL automatically** ✅
- **GoDaddy hosting** — Enable in cPanel → SSL/TLS → Let's Encrypt
- Your site will be https://malwagiftandtoys.in ✅

---

## ═══════════════════════════════════════════
## GoDaddy DNS Quick Reference
## ═══════════════════════════════════════════

### How to Access DNS Settings:
```
GoDaddy.com → Sign In → My Products → 
Domains → DNS (next to malwagiftandtoys.in)
```

### DNS Records You Need:

**For GoDaddy Hosting:**
```
TYPE   NAME    VALUE                          TTL
A      @       [GoDaddy Server IP from cPanel] 1 Hour
CNAME  www     @                               1 Hour
MX     @       mail.malwagiftandtoys.in        1 Hour
TXT    @       v=spf1 include:secureserver.net ~all
```

**For Vercel Hosting (Recommended):**
```
TYPE   NAME    VALUE                    TTL
A      @       76.76.21.21              1 Hour
CNAME  www     cname.vercel-dns.com     1 Hour
```

**For Email (Business Email on GoDaddy):**
```
MX     @       mailstore1.secureserver.net  Priority: 10
MX     @       smtp.secureserver.net        Priority: 0
```

---

## ═══════════════════════════════════════════
## GoDaddy Email Setup
## ═══════════════════════════════════════════

To use info@malwagiftandtoys.in:
1. GoDaddy → Email & Office → Get Started
2. Choose **Professional Email** or **Microsoft 365**
3. Create: info@malwagiftandtoys.in
4. Create: admin@malwagiftandtoys.in
5. Outlook/Gmail: add as account using IMAP settings

**IMAP Settings for Email Client:**
```
Incoming (IMAP): imap.secureserver.net  Port: 993  SSL: Yes
Outgoing (SMTP): smtpout.secureserver.net Port: 465 SSL: Yes
```

---

## ═══════════════════════════════════════════
## WhatsApp Business Setup
## ═══════════════════════════════════════════

1. Download **WhatsApp Business** app
2. Register +91 98760 00000 (your store number)
3. Set business name: **Malwa Gift and Toys**
4. Add business hours, address, website
5. Create Quick Replies for common queries:
   - "Order confirmed ✅"
   - "Delivery in 2-3 hours 🚚"
   - "Out of stock — check back soon"

---

## ═══════════════════════════════════════════
## Google Search Console (SEO)
## ═══════════════════════════════════════════

Register your site with Google:
1. Go to: https://search.google.com/search-console
2. Add property: malwagiftandtoys.in
3. Verify via DNS TXT record in GoDaddy:
   ```
   TXT  @  google-site-verification=XXXXXXXXXXXXXXXX
   ```
4. Submit sitemap: https://malwagiftandtoys.in/sitemap.xml

---

## ═══════════════════════════════════════════
## IMPORTANT SECURITY REMINDERS
## ═══════════════════════════════════════════

⚠️  Before going live:
1. Change admin password from Admin@123 to something strong
2. Update JWT_SECRET in backend/.env to a 64-char random string
3. Enable SSL in GoDaddy cPanel (Let's Encrypt — FREE)
4. Enable GoDaddy DDoS protection in security settings
5. Set up regular backups in cPanel → Backup Wizard

---

## 📞 Need Help?

- **GoDaddy Support:** 1800-419-4253 (India, 24/7)
- **GoDaddy Chat:** godaddy.com → Help → Chat
- **Your Website Email:** info@malwagiftandtoys.in
