export interface ChannelSummary {
  id: string;
  title: string;
  handle: string;
  description: string;
  customUrl?: string;
  publishedAt: string;
  thumbnail: string;
  bannerUrl?: string;
  country?: string;
  subscriberCount: number;
  viewCount: number;
  videoCount: number;
  uploadsPlaylistId: string;
  badges: ChannelBadge[];
  isDemoData?: boolean;
}

export interface ChannelBadge {
  id: 'high-engagement' | 'fast-publisher' | 'shorts-heavy' | 'longform-heavy' | 'high-view-efficiency';
  label: string;
  description: string;
  variant: 'emerald' | 'amber' | 'blue' | 'purple' | 'indigo';
}

export interface VideoItem {
  id: string;
  title: string;
  description: string;
  publishedAt: string;
  thumbnail: string;
  tags?: string[];
  categoryId?: string;
  durationSec: number;
  durationFormatted: string;
  isShort: boolean;
  views: number;
  likes: number;
  comments: number;
  likeRate: number; // likes / views * 100
  commentRate: number; // comments / views * 100
  engagementRate: number; // (likes + comments) / views * 100
  viewsPerDay: number;
  relativePerformance: number; // views / medianViews
}

export interface PlaylistSummary {
  id: string;
  title: string;
  description: string;
  publishedAt: string;
  videoCount: number;
  thumbnail: string;
}

export interface CommentItem {
  id: string;
  author: string;
  authorThumbnail?: string;
  text: string;
  publishedAt: string;
  likeCount: number;
  replyCount: number;
  videoId: string;
  videoTitle?: string;
}

export interface AudienceSentiment {
  positive: number; // percentage
  neutral: number;
  negative: number;
  sampleCount: number;
}

export interface AudienceTopic {
  topic: string;
  count: number;
  percentage: number;
  sentiment: 'positive' | 'neutral' | 'negative';
  exampleQuote: string;
}

export interface CommonQuestion {
  question: string;
  frequency: number;
  category: string;
}

export interface AudiencePainPoint {
  issue: string;
  severity: 'high' | 'medium' | 'low';
  mentions: number;
}

export interface CommercialSignal {
  signal: string;
  intentType: 'purchase_intent' | 'product_comparison' | 'pricing_query' | 'feature_demand';
  evidenceQuote: string;
  opportunity: string;
}

export interface BreakoutVideo {
  video: VideoItem;
  multiplier: number;
  baselineMedian: number;
  aiHypothesis?: string;
}

export type RevenueStreamStatus = 'confirmed' | 'likely' | 'possible' | 'no_evidence';

export interface RevenueStreamIndicator {
  type: string;
  label: string;
  status: RevenueStreamStatus;
  evidence: string;
  details: string;
}

export interface RevenueScenarios {
  views30DayEstimate: number;
  lowRpm: number;
  baseRpm: number;
  highRpm: number;
  monthlyLow: number;
  monthlyBase: number;
  monthlyHigh: number;
  annualLow: number;
  annualBase: number;
  annualHigh: number;
  diversificationScore: number;
  streams: RevenueStreamIndicator[];
}

export interface ContentIntelligenceData {
  topKeywords: { word: string; count: number; avgViews: number }[];
  durationBuckets: { bucket: string; count: number; avgViews: number; avgEngagement: number }[];
  publishingCadence: { dayOfWeek: string; count: number }[];
  shortsPercentage: number;
  longformPercentage: number;
}

export interface ChannelAnalyticsCalculations {
  subscriberCount: number;
  totalViews: number;
  totalVideos: number;
  allTimeAvgViewsPerVideo: number;
  sampledRecentAvgViews: number;
  sampledRecentMedianViews: number;
  sampledAvgLikes: number;
  sampledAvgComments: number;
  sampledLikeToViewRate: number;
  sampledCommentToViewRate: number;
  sampledEngagementRate: number;
  viewsPerSubscriber: number;
  uploadFrequencyWeekly: number;
  uploadFrequencyMonthly: number;
  avgDurationSec: number;
  avgDurationFormatted: string;
}

export interface AIIntelligenceReport {
  executiveSummary: string;
  channelPositioning: string;
  performanceAssessment: {
    strengths: string[];
    weaknesses: string[];
    anomalies: string[];
  };
  contentStrategy: {
    winningThemes: string[];
    formats: string[];
    titleTactics: string[];
  };
  audienceIntelligence: {
    sentimentSummary: string;
    coreQuestions: string[];
    keyPainPoints: string[];
  };
  growthSignals: {
    momentumVerdict: string;
    breakoutDrivers: string[];
  };
  revenueIntelligence: {
    adRevenueInsight: string;
    expansionOpportunities: string[];
  };
  competitiveOpportunities: string[];
  contentOpportunities: {
    opportunity: string;
    why: string;
    evidence: string;
    priority: 'High' | 'Medium' | 'Low';
  }[];
  actionPlan: {
    immediate: string[]; // next 7 days
    thirtyDays: string[];
    ninetyDays: string[];
  };
  dataCoverage: {
    videosAnalysed: number;
    commentsAnalysed: number;
    playlistsAnalysed: number;
  };
  confidenceLevel: 'High' | 'Medium' | 'Limited Data';
  generatedAt: string;
}

export interface ChannelAnalyticsResponse {
  channel: ChannelSummary;
  recentVideos: VideoItem[];
  playlists: PlaylistSummary[];
  commentsSample: CommentItem[];
  calculations: ChannelAnalyticsCalculations;
  breakouts: BreakoutVideo[];
  contentIntelligence: ContentIntelligenceData;
  audienceIntelligence: {
    sentiment: AudienceSentiment;
    topics: AudienceTopic[];
    questions: CommonQuestion[];
    painPoints: AudiencePainPoint[];
    commercialSignals: CommercialSignal[];
  };
  revenueEstimates: RevenueScenarios;
  aiInsight?: AIIntelligenceReport;
}

export type ChannelSizeClassification = 'Emerging' | 'Small' | 'Mid-size' | 'Large' | 'Major';

export interface NicheChannel {
  id: string;
  title: string;
  handle: string;
  thumbnail: string;
  description: string;
  country?: string;
  subscriberCount: number;
  viewCount: number;
  videoCount: number;
  avgViews: number;
  engagementRate: number;
  lastPublishedAt: string;
  sizeClass: ChannelSizeClassification;
  isDemoData?: boolean;
}

export interface VideoCategory {
  id: string;
  title: string;
  assignable: boolean;
}

export interface NicheExplorerResponse {
  query?: string;
  categoryId?: string;
  categoryTitle?: string;
  regionCode: string;
  channels: NicheChannel[];
  totalDiscovered: number;
  totalSubscribers: number;
  totalViews: number;
  medianSubscribers: number;
  medianEngagement: number;
  isDemoData?: boolean;
}

export interface ApiStatus {
  hasYouTubeKey: boolean;
  hasGeminiKey: boolean;
  demoModeActive: boolean;
  defaultRegion: string;
  appName?: string;
  defaultRpmLow?: number;
  defaultRpmBase?: number;
  defaultRpmHigh?: number;
}
