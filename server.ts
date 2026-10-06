import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { youtubeClient } from './server/lib/youtube/client';
import { generateMarketIntelligenceReport } from './server/lib/gemini';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json({ limit: '10mb' }));

// Health and configuration status endpoint
app.get('/api/health', (req: Request, res: Response) => {
  res.json({
    status: 'ok',
    hasYouTubeKey: youtubeClient.hasApiKey(),
    hasGeminiKey: Boolean(process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY.trim().length > 0),
    demoModeActive: !youtubeClient.hasApiKey(),
    defaultRegion: process.env.VITE_DEFAULT_REGION || process.env.NEXT_PUBLIC_DEFAULT_REGION || 'SG',
    appName: process.env.VITE_APP_NAME || process.env.NEXT_PUBLIC_APP_NAME || 'TubeIntel',
    defaultRpmLow: parseFloat(process.env.DEFAULT_RPM_LOW || '1.5'),
    defaultRpmBase: parseFloat(process.env.DEFAULT_RPM_BASE || '4.0'),
    defaultRpmHigh: parseFloat(process.env.DEFAULT_RPM_HIGH || '8.5')
  });
});

// Resolve channel and return comprehensive analytics
app.get('/api/youtube/channel', async (req: Request, res: Response) => {
  const query = req.query.query as string;
  if (!query || typeof query !== 'string' || query.trim().length === 0) {
    res.status(400).json({ error: 'A channel handle, URL, ID, or name is required.' });
    return;
  }

  try {
    const analytics = await youtubeClient.resolveChannel(query.trim());
    res.json(analytics);
  } catch (error: any) {
    console.error('Error resolving channel:', error);
    let message = 'An unexpected error occurred while resolving channel.';
    let status = 500;

    if (error.message === 'QUOTA_EXCEEDED') {
      message = 'YouTube API quota has temporarily been reached. Please try again after the quota resets or use demo mode.';
      status = 429;
    } else if (error.message === 'INVALID_API_KEY') {
      message = 'The configured YouTube API key is invalid. Please verify it in your environment settings.';
      status = 401;
    } else if (error.message.includes('not found')) {
      message = error.message;
      status = 404;
    }

    res.status(status).json({ error: message });
  }
});

// Niche / Keyword channel discovery
app.get('/api/youtube/niche', async (req: Request, res: Response) => {
  const query = (req.query.query as string) || '';
  const categoryId = req.query.categoryId as string | undefined;
  const regionCode = (req.query.regionCode as string) || 'US';

  try {
    const nicheData = await youtubeClient.searchNiche(query, categoryId, regionCode);
    res.json(nicheData);
  } catch (error: any) {
    console.error('Error in niche explorer:', error);
    res.status(500).json({ error: 'Failed to explore niche channels.' });
  }
});

// Video categories list
app.get('/api/youtube/categories', async (req: Request, res: Response) => {
  const regionCode = (req.query.regionCode as string) || 'US';
  try {
    const categories = await youtubeClient.fetchCategories(regionCode);
    res.json(categories);
  } catch (error: any) {
    res.status(500).json({ error: 'Failed to fetch video categories.' });
  }
});

// Server-side Gemini AI Market Intelligence Analysis
app.post('/api/ai/analyse', async (req: Request, res: Response) => {
  const { analytics } = req.body;
  if (!analytics || !analytics.channel) {
    res.status(400).json({ error: 'Valid channel analytics payload is required for AI interpretation.' });
    return;
  }

  try {
    const report = await generateMarketIntelligenceReport(analytics);
    res.json(report);
  } catch (error: any) {
    console.error('Error generating AI intelligence report:', error);
    res.status(500).json({ error: 'Failed to generate AI market intelligence report.' });
  }
});

// In dev, attach Vite middleware. In production, serve dist static files.
async function startServer() {
  const isProd = process.env.NODE_ENV === 'production';
  const port = parseInt(process.env.PORT || '3000', 10);

  if (!isProd) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(port, '0.0.0.0', () => {
    console.log(`TubeIntel server running at http://0.0.0.0:${port} [${isProd ? 'production' : 'development'}]`);
  });
}

startServer();
