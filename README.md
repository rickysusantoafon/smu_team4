# TubeIntel — YouTube Market Intelligence & Competitor Research

An enterprise-grade YouTube market research and competitor intelligence portal built with **React**, **TypeScript**, **Tailwind CSS**, **Recharts**, **YouTube Data API v3**, and **Google Gemini AI**.

TubeIntel transforms raw YouTube channel statistics, video metrics, and public audience discussions into actionable strategic market intelligence.

---

## Key Features

- **Multi-Mode Search Resolution**: Search by `@handle`, full YouTube channel URL, Channel ID, legacy username, or channel name with zero quota waste (uses `channels.list` with `forHandle` before falling back to `search.list`).
- **Niche & Category Explorer**: Discover leading and emerging channels across commercial keywords (e.g. *ERP Software*, *AI Agents*, *Personal Finance*) and official YouTube video categories for selected regions.
- **Side-by-Side Channel Comparison**: Select 2–5 channels to benchmark scale, lifetime impressions, publishing frequency, engagement rates, and average video yield with grouped charts and CSV export.
- **Core Performance Benchmarks**:
  - All-time views vs. recent sampled average and median views (resilient to viral outlier distortion).
  - Like-to-view rate, comment-to-view rate, and transparent engagement rate formula `(likes + comments) / views * 100`.
  - Publishing velocity (videos/week and videos/month).
  - Calculated channel badges (*High Engagement*, *Consistent Cadence*, *Long-form Focus*, *High View Efficiency*).
- **Breakout & Outlier Detection**: Automatically surfaces videos performing &ge; 1.8&times; above baseline median views with AI-classified driver hypotheses.
- **Content Intelligence**: Analyzes repeated title keywords and average view yields, duration vs. performance distribution, and shorts vs. long-form ratios.
- **Audience & Comments Intelligence**: Samples public discussions from top videos to compute AI-classified sentiment (Positive / Neutral / Negative), clusters audience recurring topics, extracts common questions, and detects buyer purchase signals.
- **Revenue Intelligence**:
  - Differentiates public mathematical estimates from observable commercial streams.
  - Interactive RPM configurator ($0.50 – $20.00/1,000 views) with instant recalculation of monthly and annualized revenue.
  - Audits observable revenue streams (*YouTube AdSense*, *Brand Sponsorships*, *Affiliate Links*, *Merchandise Stores*, *Channel Memberships*, *Digital Courses/SaaS*).
- **Gemini AI Market Narrative**: Produces a structured executive summary, channel positioning analysis, strengths/weaknesses audit, competitive arbitrage angles, evidence-based content production opportunities, and a 7/30/90-day execution roadmap.

---

## Serverless Architecture & Security

```
Browser (React SPA UI)
  │
  ▼
Express / Next.js Serverless Route Handlers (/api/*)
  ├── YouTube Data API v3  (Private YOUTUBE_API_KEY server-side)
  │     ├── Direct Handle / ID Resolution
  │     ├── Uploads Playlist Batch Fetching
  │     └── In-Memory TTL Quota Cache
  │
  ├── Data Normalization & Analytics Layer
  │     ├── Transparent Mathematical Formulas (Median, Means, Rates)
  │     └── Outlier & Revenue Scenario Engine
  │
  └── Google Gemini 3.8 Flash SDK (@google/genai)
        └── Synthesizes Structured Market Narrative from Facts JSON
```

### Critical Security Rule
- **Never expose API keys to browser code.**
- `YOUTUBE_API_KEY` and `GEMINI_API_KEY` are read exclusively by server-side code.
- Client requests never send raw Google API requests or receive server credentials.

---

## Environment Variables

Create a `.env` file in the project root:

```env
# Server-side Gemini API key for AI market intelligence analysis
GEMINI_API_KEY="AIzaSy..."

# YouTube Data API v3 key from Google Cloud Console
YOUTUBE_API_KEY="AIzaSy..."

# Optional application settings
VITE_DEFAULT_REGION="US"
DEFAULT_RPM_LOW=1.5
DEFAULT_RPM_BASE=4.0
DEFAULT_RPM_HIGH=8.5
```

> **Note on Demo Mode:** If `YOUTUBE_API_KEY` is omitted or quota is reached, TubeIntel automatically activates a high-fidelity Demo Preview mode featuring verified datasets for popular channels (such as `@mkbhd`) and niches (*ERP Software*, *AI Agents*) so all dashboards, charts, and calculations can be tested immediately.

---

## Local Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-org/tubeintel.git
   cd tubeintel
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure environment:**
   ```bash
   cp .env.example .env
   # Add your YOUTUBE_API_KEY and GEMINI_API_KEY
   ```

4. **Start the development server:**
   ```bash
   npm run dev
   ```
   Open `http://localhost:3000` in your browser.

---

## Google Cloud Setup

1. Go to the [Google Cloud Console](https://console.cloud.google.com/).
2. Create or select a Google Cloud Project.
3. Navigate to **APIs & Services → Library**.
4. Search for **YouTube Data API v3** and click **Enable**.
5. Navigate to **APIs & Services → Credentials** and create an **API Key**.
6. (Recommended) Restrict the API key to YouTube Data API v3.
7. Paste this key as `YOUTUBE_API_KEY` in your environment.
8. Obtain a Gemini API key from [Google AI Studio](https://aistudio.google.com/) and paste as `GEMINI_API_KEY`.

---

## Vercel Deployment

TubeIntel is designed for seamless Vercel deployment:

1. Push your repository to **GitHub**.
2. Go to [Vercel](https://vercel.com/) and click **Add New Project**.
3. Import your TubeIntel repository.
4. In the configuration step, open **Environment Variables**:
   - Add `YOUTUBE_API_KEY` = your YouTube Data API v3 key
   - Add `GEMINI_API_KEY` = your Gemini API key
   - (Optional) Add `VITE_DEFAULT_REGION` = `US`
5. Click **Deploy**.
6. Vercel builds the SPA and mounts serverless API routes under `/api/*`.

---

## License

MIT License. Built for enterprise YouTube market intelligence and competitor benchmarking.
