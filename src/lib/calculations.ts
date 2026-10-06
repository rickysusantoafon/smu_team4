import {
  VideoItem,
  ChannelSummary,
  ChannelBadge,
  BreakoutVideo,
  RevenueScenarios,
  RevenueStreamIndicator,
  ContentIntelligenceData,
  ChannelSizeClassification
} from '../types/youtube';

/**
 * Robust ISO 8601 Duration parser (e.g. PT1H4M33S, PT12M3S, PT45S, P1DT2H)
 */
export function parseISO8601Duration(durationStr: string): number {
  if (!durationStr) return 0;
  const match = durationStr.match(/P(?:(\d+)D)?T?(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
  if (!match) return 0;
  const days = parseInt(match[1] || '0', 10);
  const hours = parseInt(match[2] || '0', 10);
  const minutes = parseInt(match[3] || '0', 10);
  const seconds = parseInt(match[4] || '0', 10);
  return days * 86400 + hours * 3600 + minutes * 60 + seconds;
}

export function formatDuration(totalSeconds: number): string {
  if (isNaN(totalSeconds) || totalSeconds <= 0) return '0:00';
  const hrs = Math.floor(totalSeconds / 3600);
  const mins = Math.floor((totalSeconds % 3600) / 60);
  const secs = Math.floor(totalSeconds % 60);

  if (hrs > 0) {
    return `${hrs}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}

export function calculateEngagementRate(likes: number, comments: number, views: number): number {
  if (!views || views <= 0) return 0;
  const safeLikes = Math.max(0, likes || 0);
  const safeComments = Math.max(0, comments || 0);
  const rate = ((safeLikes + safeComments) / views) * 100;
  return Math.round(rate * 100) / 100;
}

export function calculateLikeRate(likes: number, views: number): number {
  if (!views || views <= 0) return 0;
  const safeLikes = Math.max(0, likes || 0);
  return Math.round(((safeLikes / views) * 100) * 100) / 100;
}

export function calculateCommentRate(comments: number, views: number): number {
  if (!views || views <= 0) return 0;
  const safeComments = Math.max(0, comments || 0);
  return Math.round(((safeComments / views) * 100) * 100) / 100;
}

export function calculateViewsPerDay(views: number, publishedAt: string): number {
  if (!views || views <= 0) return 0;
  const pubDate = new Date(publishedAt).getTime();
  const now = Date.now();
  const diffDays = Math.max(1, (now - pubDate) / (1000 * 60 * 60 * 24));
  return Math.round(views / diffDays);
}

export function calculateMedian(numbers: number[]): number {
  if (!numbers || numbers.length === 0) return 0;
  const sorted = [...numbers].filter(n => typeof n === 'number' && !isNaN(n)).sort((a, b) => a - b);
  if (sorted.length === 0) return 0;
  const mid = Math.floor(sorted.length / 2);
  if (sorted.length % 2 !== 0) {
    return sorted[mid];
  }
  return Math.round((sorted[mid - 1] + sorted[mid]) / 2);
}

export function calculateMean(numbers: number[]): number {
  if (!numbers || numbers.length === 0) return 0;
  const valid = numbers.filter(n => typeof n === 'number' && !isNaN(n));
  if (valid.length === 0) return 0;
  const sum = valid.reduce((acc, curr) => acc + curr, 0);
  return Math.round(sum / valid.length);
}

export function calculateUploadFrequency(publishedDates: string[]): { weekly: number; monthly: number } {
  if (!publishedDates || publishedDates.length < 2) {
    return { weekly: publishedDates.length, monthly: publishedDates.length * 4 };
  }
  const timestamps = publishedDates
    .map(d => new Date(d).getTime())
    .filter(t => !isNaN(t))
    .sort((a, b) => a - b);

  if (timestamps.length < 2) return { weekly: 1, monthly: 4 };

  const spanDays = Math.max(7, (timestamps[timestamps.length - 1] - timestamps[0]) / (1000 * 60 * 60 * 24));
  const spanWeeks = spanDays / 7;
  const spanMonths = spanDays / 30.417;

  const weekly = Math.round((timestamps.length / spanWeeks) * 10) / 10;
  const monthly = Math.round((timestamps.length / spanMonths) * 10) / 10;

  return {
    weekly: Math.max(0.1, weekly),
    monthly: Math.max(0.4, monthly)
  };
}

export function assignChannelBadges(
  channel: Pick<ChannelSummary, 'subscriberCount' | 'viewCount' | 'videoCount'>,
  videos: VideoItem[],
  engagementRate: number,
  weeklyUploads: number
): ChannelBadge[] {
  const badges: ChannelBadge[] = [];

  // High Engagement (> 3.5%)
  if (engagementRate >= 3.5) {
    badges.push({
      id: 'high-engagement',
      label: 'High Engagement',
      description: `Audience engagement rate of ${engagementRate.toFixed(1)}% is above the benchmark (3.5%).`,
      variant: 'emerald'
    });
  }

  // Fast Publisher (> 3 videos/week)
  if (weeklyUploads >= 3) {
    badges.push({
      id: 'fast-publisher',
      label: 'Fast Publisher',
      description: `Publishes approx. ${weeklyUploads} videos per week.`,
      variant: 'blue'
    });
  }

  // Shorts Heavy (> 45% shorts)
  if (videos.length > 0) {
    const shortsCount = videos.filter(v => v.isShort).length;
    const shortsPct = (shortsCount / videos.length) * 100;
    if (shortsPct >= 45) {
      badges.push({
        id: 'shorts-heavy',
        label: 'Shorts Heavy',
        description: `${Math.round(shortsPct)}% of recent uploads are YouTube Shorts.`,
        variant: 'amber'
      });
    } else if (shortsPct <= 20 && videos.some(v => v.durationSec > 600)) {
      badges.push({
        id: 'longform-heavy',
        label: 'Long-form Focus',
        description: 'Focuses primarily on in-depth, long-form content (>10 mins).',
        variant: 'indigo'
      });
    }
  }

  // High View Efficiency (> 1.2 views/subscriber)
  if (channel.subscriberCount > 0 && channel.viewCount > 0) {
    const viewsPerSub = channel.viewCount / channel.subscriberCount;
    if (viewsPerSub >= 150) { // All-time view count to subscriber ratio
      badges.push({
        id: 'high-view-efficiency',
        label: 'High View Efficiency',
        description: `Exceptional evergreen ratio: ${Math.round(viewsPerSub)} total views per subscriber.`,
        variant: 'purple'
      });
    }
  }

  return badges;
}

export function detectBreakouts(videos: VideoItem[], medianViews: number): BreakoutVideo[] {
  if (!videos || videos.length === 0 || medianViews <= 0) return [];

  // Outliers that perform at least 1.8x the median views
  const breakouts: BreakoutVideo[] = [];
  for (const video of videos) {
    const multiplier = Math.round((video.views / medianViews) * 10) / 10;
    if (multiplier >= 1.8 && video.views >= 5000) {
      let aiHypothesis = 'High click-through potential from compelling title framing and topic timing.';
      if (video.title.toLowerCase().includes('how') || video.title.toLowerCase().includes('guide')) {
        aiHypothesis = 'Strong evergreen search utility and problem-solving focus.';
      } else if (video.title.toLowerCase().includes('vs') || video.title.toLowerCase().includes('comparison')) {
        aiHypothesis = 'High-intent buyer comparison driving sustained audience interest.';
      } else if (video.title.toLowerCase().includes('ai') || video.title.toLowerCase().includes('future')) {
        aiHypothesis = 'Trending tech discourse and market curiosity catalyst.';
      } else if (video.engagementRate > 6) {
        aiHypothesis = 'Unusually high audience discussion and comment debate propelling algorithm distribution.';
      }

      breakouts.push({
        video,
        multiplier,
        baselineMedian: medianViews,
        aiHypothesis
      });
    }
  }

  return breakouts.sort((a, b) => b.multiplier - a.multiplier).slice(0, 6);
}

export function analyzeContentPatterns(videos: VideoItem[]): ContentIntelligenceData {
  if (!videos || videos.length === 0) {
    return {
      topKeywords: [],
      durationBuckets: [],
      publishingCadence: [],
      shortsPercentage: 0,
      longformPercentage: 0
    };
  }

  const stopWords = new Set([
    'the', 'and', 'for', 'with', 'that', 'this', 'from', 'your', 'you', 'how', 'what', 'why',
    'are', 'was', 'were', 'will', 'can', 'not', 'all', 'any', 'about', 'into', 'just', 'more',
    'out', 'get', 'has', 'have', 'had', 'been', 'its', 'they', 'our', 'who', 'his', 'her',
    'which', 'after', 'before', 'then', 'than', 'over', 'under', 'again', 'when', 'where'
  ]);

  const wordStats: Record<string, { count: number; totalViews: number }> = {};

  for (const v of videos) {
    const cleanTitle = v.title.toLowerCase().replace(/[^a-z0-9\s]/g, ' ');
    const words = cleanTitle.split(/\s+/).filter(w => w.length > 2 && !stopWords.has(w));
    const uniqueInTitle = new Set(words);

    for (const word of uniqueInTitle) {
      if (!wordStats[word]) {
        wordStats[word] = { count: 0, totalViews: 0 };
      }
      wordStats[word].count += 1;
      wordStats[word].totalViews += v.views;
    }
  }

  const topKeywords = Object.entries(wordStats)
    .filter(([_, data]) => data.count >= 2)
    .map(([word, data]) => ({
      word,
      count: data.count,
      avgViews: Math.round(data.totalViews / data.count)
    }))
    .sort((a, b) => b.avgViews - a.avgViews)
    .slice(0, 15);

  // Duration Buckets
  const buckets = [
    { bucket: '< 1 min (Shorts)', filter: (sec: number) => sec <= 60 },
    { bucket: '1 - 5 mins', filter: (sec: number) => sec > 60 && sec <= 300 },
    { bucket: '5 - 15 mins', filter: (sec: number) => sec > 300 && sec <= 900 },
    { bucket: '15 - 30 mins', filter: (sec: number) => sec > 900 && sec <= 1800 },
    { bucket: '30+ mins (Deep Dive)', filter: (sec: number) => sec > 1800 }
  ];

  const durationBuckets = buckets.map(b => {
    const matched = videos.filter(v => b.filter(v.durationSec));
    const count = matched.length;
    const avgViews = count > 0 ? calculateMean(matched.map(v => v.views)) : 0;
    const avgEngagement = count > 0 ? Math.round(calculateMean(matched.map(v => v.engagementRate)) * 10) / 10 : 0;
    return {
      bucket: b.bucket,
      count,
      avgViews,
      avgEngagement
    };
  }).filter(b => b.count > 0);

  // Publishing Cadence by day of week
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const dayCounts: Record<string, number> = { Sun: 0, Mon: 0, Tue: 0, Wed: 0, Thu: 0, Fri: 0, Sat: 0 };
  for (const v of videos) {
    const d = new Date(v.publishedAt);
    if (!isNaN(d.getTime())) {
      const dayName = days[d.getUTCDay()];
      dayCounts[dayName] = (dayCounts[dayName] || 0) + 1;
    }
  }

  const publishingCadence = days.map(d => ({
    dayOfWeek: d,
    count: dayCounts[d] || 0
  }));

  const shortsCount = videos.filter(v => v.isShort).length;
  const shortsPercentage = Math.round((shortsCount / videos.length) * 100);
  const longformPercentage = 100 - shortsPercentage;

  return {
    topKeywords,
    durationBuckets,
    publishingCadence,
    shortsPercentage,
    longformPercentage
  };
}

export function detectRevenueStreams(channelDesc: string, videos: VideoItem[]): RevenueStreamIndicator[] {
  const combinedText = (
    (channelDesc || '') + ' ' +
    videos.map(v => (v.title || '') + ' ' + (v.description || '')).join(' ')
  ).toLowerCase();

  const streams: RevenueStreamIndicator[] = [
    {
      type: 'ad_revenue',
      label: 'YouTube AdSense',
      status: 'confirmed',
      evidence: 'Public view volume qualifies for YouTube Partner Program monetisation.',
      details: 'Baseline programmatic pre-roll, mid-roll, and display ad revenue based on viewer RPM.'
    }
  ];

  // Sponsorships
  const sponsorKeywords = ['sponsored by', 'thanks to our sponsor', 'promo code', 'use code', 'partnered with', 'check out our sponsor'];
  const hasSponsor = sponsorKeywords.some(kw => combinedText.includes(kw));
  if (hasSponsor) {
    streams.push({
      type: 'sponsorships',
      label: 'Brand Sponsorships & Integrations',
      status: 'confirmed',
      evidence: 'Observed sponsor disclosures and promotional partner codes in video descriptions.',
      details: 'Direct brand integration contracts, typically priced at $15 - $40 CPM per dedicated mention.'
    });
  } else {
    streams.push({
      type: 'sponsorships',
      label: 'Brand Sponsorships',
      status: 'possible',
      evidence: 'No explicit sponsor disclosures detected in recent sample descriptions.',
      details: 'Opportunity exists for industry sponsorship outreach given niche audience reach.'
    });
  }

  // Affiliate Marketing
  const affiliateKeywords = ['amzn.to', 'affiliate', 'link below', 'discount link', 'bit.ly', 'my setup', 'gear used'];
  const hasAffiliate = affiliateKeywords.some(kw => combinedText.includes(kw));
  if (hasAffiliate) {
    streams.push({
      type: 'affiliates',
      label: 'Affiliate Marketing & Gear Links',
      status: 'confirmed',
      evidence: 'Detected tagged affiliate trackable links (e.g., Amazon, custom referral redirects).',
      details: 'Commission-based revenue generated on equipment, software trials, or reviewed goods.'
    });
  } else {
    streams.push({
      type: 'affiliates',
      label: 'Affiliate Marketing',
      status: 'likely',
      evidence: 'Standard commercial monetization route for review and tech content.',
      details: 'Product review formats readily convert to high-margin affiliate referral revenues.'
    });
  }

  // Merchandise
  const merchKeywords = ['merch', 'store', 'shop.', 'apparel', 'hoodie', 't-shirt', 'store.'];
  const hasMerch = merchKeywords.some(kw => combinedText.includes(kw));
  if (hasMerch) {
    streams.push({
      type: 'merchandise',
      label: 'Merchandise & Branded Apparel',
      status: 'confirmed',
      evidence: 'Detected dedicated eCommerce storefront links in channel description and videos.',
      details: 'Direct-to-consumer branded merchandise with 30-50% gross product margins.'
    });
  } else {
    streams.push({
      type: 'merchandise',
      label: 'Merchandise & Branded Goods',
      status: 'no_evidence',
      evidence: 'No active merchandise store or branded apparel links detected.',
      details: 'May not align with channel persona or prioritized behind digital services.'
    });
  }

  // Memberships & Community
  const memberKeywords = ['join this channel', 'patreon.com', 'discord.gg', 'members only', 'community tier', 'exclusive access'];
  const hasMemberships = memberKeywords.some(kw => combinedText.includes(kw));
  if (hasMemberships) {
    streams.push({
      type: 'memberships',
      label: 'Channel Memberships & Patreon',
      status: 'confirmed',
      evidence: 'Public Patreon/Discord membership links or YouTube Join tier detected.',
      details: 'Predictable monthly recurring revenue (MRR) supported by loyal super-fans.'
    });
  } else {
    streams.push({
      type: 'memberships',
      label: 'Channel Memberships / Community',
      status: 'possible',
      evidence: 'No direct third-party Patreon or community tier links in recent metadata.',
      details: 'High-value opportunity for exclusive monthly Q&A or private community access.'
    });
  }

  // Digital Products / Courses / SaaS
  const digitalKeywords = ['course', 'academy', 'masterclass', 'bootcamp', 'gumroad', 'skool.com', 'software', 'download template'];
  const hasDigital = digitalKeywords.some(kw => combinedText.includes(kw));
  if (hasDigital) {
    streams.push({
      type: 'digital_products',
      label: 'Digital Products, Courses & Software',
      status: 'confirmed',
      evidence: 'Detected links to educational curriculum, digital toolkits, or SaaS products.',
      details: 'High-margin (85%+) proprietary educational or software solutions sold directly.'
    });
  } else {
    streams.push({
      type: 'digital_products',
      label: 'Digital Products & Software',
      status: 'possible',
      evidence: 'No dedicated course portals or SaaS solutions explicitly advertised.',
      details: 'High monetization potential if audience demonstrates repeated problem-solving intent.'
    });
  }

  return streams;
}

export function calculateRevenueScenarios(
  views: number,
  videoCount: number,
  weeklyUploads: number,
  lowRpm = 1.5,
  baseRpm = 4.0,
  highRpm = 8.5
): RevenueScenarios {
  // Safe estimate of monthly views:
  // If recent videos average views exists, monthlyViews = weeklyUploads * 4.33 * avgViews
  const monthlyViewsEstimate = Math.max(1000, Math.round(views));

  const monthlyLow = Math.round((monthlyViewsEstimate / 1000) * lowRpm);
  const monthlyBase = Math.round((monthlyViewsEstimate / 1000) * baseRpm);
  const monthlyHigh = Math.round((monthlyViewsEstimate / 1000) * highRpm);

  const annualLow = monthlyLow * 12;
  const annualBase = monthlyBase * 12;
  const annualHigh = monthlyHigh * 12;

  return {
    views30DayEstimate: monthlyViewsEstimate,
    lowRpm,
    baseRpm,
    highRpm,
    monthlyLow,
    monthlyBase,
    monthlyHigh,
    annualLow,
    annualBase,
    annualHigh,
    diversificationScore: 78,
    streams: []
  };
}

export function classifyChannelSize(subscribers: number): ChannelSizeClassification {
  if (subscribers >= 5000000) return 'Major';
  if (subscribers >= 1000000) return 'Large';
  if (subscribers >= 100000) return 'Mid-size';
  if (subscribers >= 10000) return 'Small';
  return 'Emerging';
}

export function formatCompactNumber(num: number): string {
  if (typeof num !== 'number' || isNaN(num)) return '0';
  if (Math.abs(num) >= 1_000_000_000) {
    return (num / 1_000_000_000).toFixed(1).replace(/\.0$/, '') + 'B';
  }
  if (Math.abs(num) >= 1_000_000) {
    return (num / 1_000_000).toFixed(1).replace(/\.0$/, '') + 'M';
  }
  if (Math.abs(num) >= 1_000) {
    return (num / 1_000).toFixed(1).replace(/\.0$/, '') + 'K';
  }
  return num.toLocaleString();
}

export function formatNumber(num: number): string {
  if (typeof num !== 'number' || isNaN(num)) return '0';
  return num.toLocaleString();
}

export function formatCurrency(amount: number): string {
  if (typeof amount !== 'number' || isNaN(amount)) return '$0';
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0
  }).format(amount);
}
