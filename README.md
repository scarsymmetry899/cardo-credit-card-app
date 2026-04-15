# 💳 Cardo — India's Smart Credit Card Companion

**AI-powered card recommendations, SMS parsing, and affiliate rewards for Indian credit card users**

[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-000000.svg?style=flat&logo=vercel)](https://vercel.com)
[![React 18](https://img.shields.io/badge/React-18.3-61DAFB.svg?style=flat&logo=react)](https://reactjs.org)
[![Claude AI](https://img.shields.io/badge/Claude-Sonnet%204-FF6B35.svg?style=flat)](https://anthropic.com)
[![License MIT](https://img.shields.io/badge/License-MIT-green.svg?style=flat)](LICENSE)

---

## 🚀 Features

- **🧠 AI Advisor Bar** — Ask "Which card for ₹3,000 on Swiggy?" and get instant recommendations
- **💳 Physical Card UI** — Beautiful 3D credit card visuals with shimmer animations
- **📱 SMS Parsing** — Auto-import bank SMS transactions with AI + regex fallback
- **🏠 Smart Dashboard** — Track spend, earnings, missed savings across your card portfolio
- **💰 Affiliate Revenue** — Earn commission when users apply for cards via your recommendations
- **🔐 Secure Auth** — Google OAuth + Phone OTP login with Supabase-ready backend
- **📊 Card Directory** — 22 Indian credit cards with full benefit rates and filtering

## 🏗️ Architecture

| Layer | Technology |
|-------|------------|
| **Frontend** | React 18 + Vite |
| **Styling** | CSS-in-JS with animations |
| **AI** | Claude Sonnet 4 + Web Search |
| **API Proxy** | Vercel Serverless Functions |
| **Database** | Supabase (planned) |
| **Fonts** | Sora + Space Mono |
| **Deployment** | Vercel + Custom Domain |

## 📦 Quick Start

```bash
# 1. Clone the repo
git clone https://github.com/scarsymmetry899/cardo-credit-card-app.git
cd cardo-credit-card-app

# 2. Install dependencies
npm install

# 3. Create environment file
echo "ANTHROPIC_API_KEY=sk-ant-your-key-here" > .env.local

# 4. Start development server
npm run dev
```

🌐 **Visit:** `http://localhost:3000`

## 🚀 Deploy to Vercel

1. **Connect Repository**
   ```bash
   vercel
   # Follow prompts to connect your GitHub repo
   ```

2. **Add Environment Variable**
   - Go to Vercel Dashboard → Project Settings → Environment Variables
   - Add `ANTHROPIC_API_KEY` with your Claude API key

3. **Deploy**
   ```bash
   vercel --prod
   ```

4. **Custom Domain** (Optional)
   - Buy domain (e.g., `getcardo.in`)
   - Add to Vercel Dashboard → Domains
   - Update DNS records

## 🗂️ Database Setup (Supabase)

```sql
-- 1. User profiles
CREATE TABLE profiles (
  id UUID REFERENCES auth.users PRIMARY KEY,
  name TEXT,
  phone TEXT,
  ref_code TEXT UNIQUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. User cards
CREATE TABLE user_cards (
  id SERIAL PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  card_id TEXT NOT NULL,
  added_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Expenses
CREATE TABLE expenses (
  id SERIAL PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  merchant TEXT,
  amount NUMERIC(12,2),
  category TEXT,
  card_id TEXT,
  date DATE,
  note TEXT,
  source TEXT DEFAULT 'manual',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Affiliate log
CREATE TABLE affiliate_log (
  id SERIAL PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  card_id TEXT,
  network TEXT,
  commission NUMERIC(10,2),
  status TEXT DEFAULT 'pending',
  clicked_at TIMESTAMPTZ DEFAULT NOW(),
  approved_at TIMESTAMPTZ
);

-- Enable RLS
ALTER TABLE user_cards ENABLE ROW LEVEL SECURITY;
ALTER TABLE expenses ENABLE ROW LEVEL SECURITY;
ALTER TABLE affiliate_log ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY user_own ON user_cards USING (user_id = auth.uid());
CREATE POLICY user_own ON expenses USING (user_id = auth.uid());
CREATE POLICY user_own ON affiliate_log USING (user_id = auth.uid());
```

## 💳 Card Database

**22 cards across 12 Indian banks:**

- **HDFC Bank:** Infinia Metal, Regalia Gold, Millennia, Swiggy
- **SBI Card:** Cashback, ELITE, IRCTC Premier
- **ICICI Bank:** Amazon Pay, Emeralde Private Metal
- **Axis Bank:** Atlas, Magnus, Flipkart, Airtel
- **IDFC FIRST:** Select, Wealth Metal
- **American Express:** Platinum Charge, Gold
- **OneCard:** Metal
- **Federal/Scapia:** Travel
- **Standard Chartered:** Ultimate
- **RBL Bank:** Insignia Amex
- **Kotak Mahindra:** White Reserve, League Platinum

## 🎨 Design System

| Element | Specification |
|---------|---------------|
| **Colors** | Gold (#C9A84C), Dark (#06060F), Green (#4ADE80) |
| **Typography** | Sora (UI), Space Mono (card numbers) |
| **Animations** | Shimmer, 3D tilt, chip glow, slide-up |
| **Card Ratio** | 1.586:1 (standard credit card) |

## 📈 Revenue Model

| Commission Tier | Cards | Example |
|----------------|-------|----------|
| **Premium** | ₹4,000+ | AmEx Platinum (₹8,000), HDFC Infinia (₹4,500) |
| **Mid-tier** | ₹1,500-4,000 | Axis Magnus (₹4,000), SBI ELITE (₹2,500) |
| **Entry** | ₹200-1,500 | HDFC Millennia (₹1,000), ICICI Amazon (₹250) |

**Unit Economics:** 5% conversion rate at ₹1,500 avg commission = ₹75/user

## 🛣️ Roadmap

### Phase 1 — Ship (Week 1-2)
- ✅ React app with AI advisor
- ✅ Credit card visuals + animations
- ✅ SMS parsing (AI + regex)
- ✅ Affiliate commission system
- 🔄 Supabase auth integration
- 🔄 Vercel deployment

### Phase 2 — Monetize (Week 3-4)
- 🔄 PaisaBazaar + BankBazaar affiliate signup
- 🔄 Postback webhook integration
- 🔄 UTM tracking

### Phase 3 — Retain (Month 2)
- 🔄 Firebase push notifications
- 🔄 Monthly email summaries (Resend)
- 🔄 Posthog analytics

### Phase 4 — Automate (Month 3)
- 🔄 Setu Account Aggregator integration
- 🔄 Bank offer scraper cron job
- 🔄 Live offer database

### Phase 5 — Mobile (Month 4-5)
- 🔄 React Native app
- 🔄 Background SMS reading
- 🔄 App Store + Play Store

## 🤝 Contributing

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

## 📄 License

**MIT License** — see [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Abhiteja Chitikesi**
- 🐦 Twitter: [@abhitejahere](https://twitter.com/abhitejahere)
- 💼 LinkedIn: [abhiteja-chitikesi](https://linkedin.com/in/abhiteja-chitikesi)
- 🐙 GitHub: [@scarsymmetry899](https://github.com/scarsymmetry899)

---

<div align="center">
  <strong>Built with ❤️ for the Indian fintech community</strong>
</div>
