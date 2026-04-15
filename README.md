# CARDO — AI-Powered Indian Credit Card Intelligence

> Find the best card for every purchase. Compare 59+ cards. Never leave money on the table.

![Cardo Screenshot](https://raw.githubusercontent.com/scarsymmetry899/cardo-credit-card-app/main/preview.png)

## What is Cardo?

Cardo is a premium mobile-first React app that helps Indians get the most out of their credit cards:

- **AI Oracle** — Ask any purchase query, get top 3 card picks with live offer tips
- **Card Flip Explorer** — 59+ cards with full benefits, 3D flip to see all perks
- **Smart Pay** — Enter amount + category → ranked card recommendations
- **Compare Tab** — Side-by-side comparison, AI auto-picks the best 3 cards
- **Combo Optimizer** — Finds best 3-card stack from 29,260 combinations
- **Milestone Tracker** — Track fee waiver and bonus progress per card
- **Reward Expiry Calendar** — Never lose points again
- **Fee ROI Dashboard** — Is your annual fee earning its keep?
- **Travel Mode** — Right cards for any destination
- **Eligibility Predictor** — Check which cards you qualify for
- **SMS Autopilot** — Paste bank SMS, see missed savings
- **Affiliate Engine** — 59 affiliate links, ₹300–₹8,000 per approval

## Tech Stack

| Layer | Tech |
|---|---|
| Frontend | React 18 + Vite |
| Styling | Inline styles + CSS vars |
| Fonts | Outfit + DM Sans + JetBrains Mono |
| AI | Claude Sonnet 4 (via Anthropic API) |
| API Proxy | Vercel Edge Function |
| Persistence | localStorage (upgrade to Supabase for accounts) |
| Deploy | Vercel |

## Setup

```bash
# 1. Clone & install
git clone https://github.com/scarsymmetry899/cardo-credit-card-app
cd cardo-credit-card-app
npm install

# 2. Configure environment
cp .env.local.template .env.local
# Edit .env.local and add your ANTHROPIC_API_KEY

# 3. Switch API endpoint for local dev
# In src/App.jsx, change:
#   const API_ENDPOINT = "https://api.anthropic.com/v1/messages";
# to:
#   const API_ENDPOINT = "/api/ai";

# 4. Run locally
npm run dev

# 5. Deploy to Vercel
npm install -g vercel
vercel
# Set ANTHROPIC_API_KEY in Vercel Dashboard → Settings → Env Vars
```

## Affiliate Revenue Setup

1. Sign up at [PaisaBazaar Publisher](https://www.paisabazaar.com/publisher/)
2. Sign up at [BankBazaar Affiliate](https://www.bankbazaar.com/affiliate.html)
3. Replace `CARDO001` in `src/App.jsx` with your publisher IDs
4. Add postback webhook endpoint `/api/conversion` for commission tracking

## Branches

| Branch | Description |
|---|---|
| `main` | Stable production build |
| `cardo-v5-production` | Latest v5 with all production fixes |

## Cards Database

59 Indian credit cards across 18 banks: HDFC, SBI, ICICI, Axis, IDFC FIRST, Amex, HSBC, RBL, AU Small Finance, Kotak, Fi Money, IndusInd, YES Bank, Standard Chartered, OneCard, Scapia, Federal Bank, Bank of Baroda.

## License

Private — All rights reserved. Built by [Abhiteja](https://github.com/scarsymmetry899).
