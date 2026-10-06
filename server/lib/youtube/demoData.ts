import { ChannelAnalyticsResponse, NicheExplorerResponse, VideoCategory } from '../../../src/types/youtube';

export const VIDEO_CATEGORIES: VideoCategory[] = [
  { id: '1', title: 'Film & Animation', assignable: true },
  { id: '2', title: 'Autos & Vehicles', assignable: true },
  { id: '10', title: 'Music', assignable: true },
  { id: '15', title: 'Pets & Animals', assignable: true },
  { id: '17', title: 'Sports', assignable: true },
  { id: '19', title: 'Travel & Events', assignable: true },
  { id: '20', title: 'Gaming', assignable: true },
  { id: '22', title: 'People & Blogs', assignable: true },
  { id: '23', title: 'Comedy', assignable: true },
  { id: '24', title: 'Entertainment', assignable: true },
  { id: '25', title: 'News & Politics', assignable: true },
  { id: '26', title: 'Howto & Style', assignable: true },
  { id: '27', title: 'Education', assignable: true },
  { id: '28', title: 'Science & Technology', assignable: true },
  { id: '29', title: 'Nonprofits & Activism', assignable: true }
];

export const DEMO_CHANNELS: Record<string, ChannelAnalyticsResponse> = {
  '@mkbhd': {
    channel: {
      id: 'UCBJycsmduvYEL83R_U4JriQ',
      title: 'Marques Brownlee',
      handle: '@mkbhd',
      description: 'Quality tech videos | YouTuber | Geek | Consumer Electronics reviews, deep dives, and smart device comparisons.',
      customUrl: 'https://youtube.com/@mkbhd',
      publishedAt: '2008-03-21T18:41:20Z',
      thumbnail: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop&crop=face',
      country: 'US',
      subscriberCount: 19100000,
      viewCount: 4320000000,
      videoCount: 1680,
      uploadsPlaylistId: 'UUBJycsmduvYEL83R_U4JriQ',
      badges: [
        {
          id: 'high-engagement',
          label: 'High Engagement',
          description: 'Audience engagement rate of 4.2% exceeds the tech industry median (2.8%).',
          variant: 'emerald'
        },
        {
          id: 'fast-publisher',
          label: 'Consistent Cadence',
          description: 'Publishes 2.8 high-production videos per week.',
          variant: 'blue'
        },
        {
          id: 'longform-heavy',
          label: 'Long-form Focus',
          description: '78% of uploads are comprehensive deep dives averaging 14:20 duration.',
          variant: 'indigo'
        },
        {
          id: 'high-view-efficiency',
          label: 'High View Efficiency',
          description: 'Evergreen ratio of 226 total views per active subscriber.',
          variant: 'purple'
        }
      ],
      isDemoData: true
    },
    recentVideos: [
      {
        id: 'vid-mkbhd-01',
        title: 'The Real Truth About the Future of AI Phones',
        description: 'Testing the next-generation AI features built into flagships. Are these features actually useful or just marketing gimmicks? Thanks to our sponsor dbrand.',
        publishedAt: '2026-09-28T16:00:00Z',
        thumbnail: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=480&h=270&fit=crop',
        tags: ['technology', 'smartphone', 'artificial intelligence', 'review'],
        categoryId: '28',
        durationSec: 894,
        durationFormatted: '14:54',
        isShort: false,
        views: 2480000,
        likes: 124000,
        comments: 6200,
        likeRate: 5.0,
        commentRate: 0.25,
        engagementRate: 5.25,
        viewsPerDay: 354285,
        relativePerformance: 1.83
      },
      {
        id: 'vid-mkbhd-02',
        title: 'Apple Vision Pro 2: Did They Fix the Weight?',
        description: 'Hands on with the updated spatial computing headset. Here are the 5 biggest changes and what Apple still has to solve. Check link in description for wallpaper pack.',
        publishedAt: '2026-09-20T17:15:00Z',
        thumbnail: 'https://images.unsplash.com/photo-1593508512255-86ab42a8e620?w=480&h=270&fit=crop',
        tags: ['apple', 'vision pro', 'vr', 'ar', 'review'],
        categoryId: '28',
        durationSec: 1042,
        durationFormatted: '17:22',
        isShort: false,
        views: 3950000,
        likes: 198000,
        comments: 11400,
        likeRate: 5.01,
        commentRate: 0.29,
        engagementRate: 5.3,
        viewsPerDay: 263333,
        relativePerformance: 2.92
      },
      {
        id: 'vid-mkbhd-03',
        title: 'Tesla Robotaxi First Ride Impressions!',
        description: 'I went inside the autonomous Cybercab on public roads without a steering wheel. Here is what actually happened.',
        publishedAt: '2026-09-12T18:00:00Z',
        thumbnail: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=480&h=270&fit=crop',
        tags: ['tesla', 'robotaxi', 'electric vehicles', 'elon musk'],
        categoryId: '28',
        durationSec: 1120,
        durationFormatted: '18:40',
        isShort: false,
        views: 4820000,
        likes: 245000,
        comments: 18900,
        likeRate: 5.08,
        commentRate: 0.39,
        engagementRate: 5.47,
        viewsPerDay: 209565,
        relativePerformance: 3.56
      },
      {
        id: 'vid-mkbhd-04',
        title: 'The Best Budget Tech of 2026 ($50 or Less)',
        description: 'My favorite gadget finds under $50 that deliver unbelievable value. Amazon affiliate links below to all items tested.',
        publishedAt: '2026-09-05T15:30:00Z',
        thumbnail: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=480&h=270&fit=crop',
        tags: ['budget tech', 'gadgets', 'under 50', 'guide'],
        categoryId: '28',
        durationSec: 780,
        durationFormatted: '13:00',
        isShort: false,
        views: 1840000,
        likes: 98000,
        comments: 3400,
        likeRate: 5.33,
        commentRate: 0.18,
        engagementRate: 5.51,
        viewsPerDay: 61333,
        relativePerformance: 1.36
      },
      {
        id: 'vid-mkbhd-05',
        title: 'Foldables Are Finally Waterproof & Slim #Shorts',
        description: 'Checking out the latest hinge engineering marvel in 60 seconds.',
        publishedAt: '2026-08-30T19:00:00Z',
        thumbnail: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=480&h=270&fit=crop',
        tags: ['shorts', 'foldable', 'tech'],
        categoryId: '28',
        durationSec: 54,
        durationFormatted: '0:54',
        isShort: true,
        views: 1350000,
        likes: 85000,
        comments: 1200,
        likeRate: 6.3,
        commentRate: 0.09,
        engagementRate: 6.39,
        viewsPerDay: 37500,
        relativePerformance: 1.0
      },
      {
        id: 'vid-mkbhd-06',
        title: 'Why Every Smart Home Setup Fails in 2026',
        description: 'Matter protocol was supposed to solve compatibility forever. Here is why your smart lights still disconnect randomly.',
        publishedAt: '2026-08-22T16:45:00Z',
        thumbnail: 'https://images.unsplash.com/photo-1558002038-1055907df827?w=480&h=270&fit=crop',
        tags: ['smart home', 'matter', 'iot', 'tech'],
        categoryId: '28',
        durationSec: 960,
        durationFormatted: '16:00',
        isShort: false,
        views: 1220000,
        likes: 64000,
        comments: 4800,
        likeRate: 5.25,
        commentRate: 0.39,
        engagementRate: 5.64,
        viewsPerDay: 27727,
        relativePerformance: 0.9
      },
      {
        id: 'vid-mkbhd-07',
        title: 'Dope Tech: The Transparent OLED Monitor',
        description: 'We checked out the wildest display prototypes coming to consumer desks this year. Merch store link in description.',
        publishedAt: '2026-08-15T17:00:00Z',
        thumbnail: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=480&h=270&fit=crop',
        tags: ['dope tech', 'oled', 'monitor', 'hardware'],
        categoryId: '28',
        durationSec: 810,
        durationFormatted: '13:30',
        isShort: false,
        views: 2190000,
        likes: 112000,
        comments: 5100,
        likeRate: 5.11,
        commentRate: 0.23,
        engagementRate: 5.34,
        viewsPerDay: 42941,
        relativePerformance: 1.62
      },
      {
        id: 'vid-mkbhd-08',
        title: 'The Decline of Wireless Earbuds Battery Health',
        description: 'After 3 years, lithium-ion micro cells lose 60% capacity. Are we buying disposable audio? Sponsored by Ridge.',
        publishedAt: '2026-08-04T15:00:00Z',
        thumbnail: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=480&h=270&fit=crop',
        tags: ['earbuds', 'audio', 'battery', 'tech review'],
        categoryId: '28',
        durationSec: 755,
        durationFormatted: '12:35',
        isShort: false,
        views: 1630000,
        likes: 89000,
        comments: 5900,
        likeRate: 5.46,
        commentRate: 0.36,
        engagementRate: 5.82,
        viewsPerDay: 26290,
        relativePerformance: 1.21
      }
    ],
    playlists: [
      {
        id: 'pl-mkbhd-1',
        title: 'Smartphone Reviews & Flagship Comparisons',
        description: 'In-depth camera, battery, and real-world durability tests of premier mobile flagships.',
        publishedAt: '2019-01-10T12:00:00Z',
        videoCount: 242,
        thumbnail: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=320&h=180&fit=crop'
      },
      {
        id: 'pl-mkbhd-2',
        title: 'Dope Tech!',
        description: 'The coolest, craziest, most futuristic hardware on the planet tested in studio.',
        publishedAt: '2016-04-14T15:00:00Z',
        videoCount: 128,
        thumbnail: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=320&h=180&fit=crop'
      },
      {
        id: 'pl-mkbhd-3',
        title: 'Electric Vehicles & Mobility Deep Dives',
        description: 'EV charging networks, autonomous software, and driving dynamics examined.',
        publishedAt: '2020-07-22T18:00:00Z',
        videoCount: 65,
        thumbnail: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=320&h=180&fit=crop'
      },
      {
        id: 'pl-mkbhd-4',
        title: 'Smartphone Awards (Annual Tradition)',
        description: 'End of year hardware breakdowns selecting MVP, bust of the year, and best design.',
        publishedAt: '2015-12-20T21:00:00Z',
        videoCount: 11,
        thumbnail: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=320&h=180&fit=crop'
      }
    ],
    commentsSample: [
      {
        id: 'c-1',
        author: 'DaveTechJournal',
        text: 'The point about battery longevity in small earbuds is something virtually no other reviewer talks about. Total planned obsolescence.',
        publishedAt: '2026-08-05T10:14:00Z',
        likeCount: 4120,
        replyCount: 142,
        videoId: 'vid-mkbhd-08',
        videoTitle: 'The Decline of Wireless Earbuds Battery Health'
      },
      {
        id: 'c-2',
        author: 'Sarah Jenkins',
        text: 'Has anyone tested whether the Cybercab handles heavy rain or gravel roads? Living in the Midwest makes me skeptical about pure vision cameras.',
        publishedAt: '2026-09-13T04:22:00Z',
        likeCount: 1850,
        replyCount: 94,
        videoId: 'vid-mkbhd-03',
        videoTitle: 'Tesla Robotaxi First Ride Impressions!'
      },
      {
        id: 'c-3',
        author: 'Arun Patel',
        text: 'Would love to see a direct comparison between the $50 earbuds in your budget video vs Sony XM5s for daily zoom calls.',
        publishedAt: '2026-09-06T12:00:00Z',
        likeCount: 940,
        replyCount: 38,
        videoId: 'vid-mkbhd-04',
        videoTitle: 'The Best Budget Tech of 2026 ($50 or Less)'
      },
      {
        id: 'c-4',
        author: 'Marcus Vance',
        text: 'I bought the previous headset based on hype and sold it two months later because of neck strain. Good to see you addressing the weight directly.',
        publishedAt: '2026-09-21T08:10:00Z',
        likeCount: 2310,
        replyCount: 116,
        videoId: 'vid-mkbhd-02',
        videoTitle: 'Apple Vision Pro 2: Did They Fix the Weight?'
      },
      {
        id: 'c-5',
        author: 'Elena Rostova',
        text: 'Matter integration has been a nightmare for my Philips Hue and HomeKit setup. Glad someone with your audience is calling them out.',
        publishedAt: '2026-08-23T11:45:00Z',
        likeCount: 3420,
        replyCount: 187,
        videoId: 'vid-mkbhd-06',
        videoTitle: 'Why Every Smart Home Setup Fails in 2026'
      }
    ],
    calculations: {
      subscriberCount: 19100000,
      totalViews: 4320000000,
      totalVideos: 1680,
      allTimeAvgViewsPerVideo: 2571428,
      sampledRecentAvgViews: 2436250,
      sampledRecentMedianViews: 2015000,
      sampledAvgLikes: 127000,
      sampledAvgComments: 7125,
      sampledLikeToViewRate: 5.21,
      sampledCommentToViewRate: 0.29,
      sampledEngagementRate: 5.5,
      viewsPerSubscriber: 226,
      uploadFrequencyWeekly: 2.8,
      uploadFrequencyMonthly: 12.1,
      avgDurationSec: 812,
      avgDurationFormatted: '13:32'
    },
    breakouts: [
      {
        video: {
          id: 'vid-mkbhd-03',
          title: 'Tesla Robotaxi First Ride Impressions!',
          description: 'I went inside the autonomous Cybercab on public roads without a steering wheel. Here is what actually happened.',
          publishedAt: '2026-09-12T18:00:00Z',
          thumbnail: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=480&h=270&fit=crop',
          durationSec: 1120,
          durationFormatted: '18:40',
          isShort: false,
          views: 4820000,
          likes: 245000,
          comments: 18900,
          likeRate: 5.08,
          commentRate: 0.39,
          engagementRate: 5.47,
          viewsPerDay: 209565,
          relativePerformance: 3.56
        },
        multiplier: 3.6,
        baselineMedian: 2015000,
        aiHypothesis: 'First-mover hands-on access to a high-discourse technological milestone paired with zero-bias demonstration.'
      },
      {
        video: {
          id: 'vid-mkbhd-02',
          title: 'Apple Vision Pro 2: Did They Fix the Weight?',
          description: 'Hands on with the updated spatial computing headset.',
          publishedAt: '2026-09-20T17:15:00Z',
          thumbnail: 'https://images.unsplash.com/photo-1593508512255-86ab42a8e620?w=480&h=270&fit=crop',
          durationSec: 1042,
          durationFormatted: '17:22',
          isShort: false,
          views: 3950000,
          likes: 198000,
          comments: 11400,
          likeRate: 5.01,
          commentRate: 0.29,
          engagementRate: 5.3,
          viewsPerDay: 263333,
          relativePerformance: 2.92
        },
        multiplier: 2.9,
        baselineMedian: 2015000,
        aiHypothesis: 'Directly addresses the primary consumer pain point from version 1 in title and thumbnail framing.'
      }
    ],
    contentIntelligence: {
      topKeywords: [
        { word: 'tech', count: 4, avgViews: 2450000 },
        { word: 'phone', count: 3, avgViews: 2680000 },
        { word: 'best', count: 2, avgViews: 1950000 },
        { word: 'smart', count: 2, avgViews: 1850000 },
        { word: 'future', count: 2, avgViews: 3650000 },
        { word: 'battery', count: 2, avgViews: 1720000 }
      ],
      durationBuckets: [
        { bucket: '< 1 min (Shorts)', count: 1, avgViews: 1350000, avgEngagement: 6.4 },
        { bucket: '5 - 15 mins', count: 4, avgViews: 2035000, avgEngagement: 5.4 },
        { bucket: '15 - 30 mins', count: 3, avgViews: 3330000, avgEngagement: 5.5 }
      ],
      publishingCadence: [
        { dayOfWeek: 'Sun', count: 1 },
        { dayOfWeek: 'Mon', count: 0 },
        { dayOfWeek: 'Tue', count: 2 },
        { dayOfWeek: 'Wed', count: 1 },
        { dayOfWeek: 'Thu', count: 0 },
        { dayOfWeek: 'Fri', count: 3 },
        { dayOfWeek: 'Sat', count: 1 }
      ],
      shortsPercentage: 12,
      longformPercentage: 88
    },
    audienceIntelligence: {
      sentiment: {
        positive: 68,
        neutral: 24,
        negative: 8,
        sampleCount: 142
      },
      topics: [
        {
          topic: 'Hardware Reliability & Battery Decay',
          count: 48,
          percentage: 34,
          sentiment: 'negative',
          exampleQuote: 'After 3 years lithium micro cells lose 60% capacity.'
        },
        {
          topic: 'Autonomous Driving & Safety',
          count: 36,
          percentage: 25,
          sentiment: 'neutral',
          exampleQuote: 'Does it handle heavy rain or gravel roads without LiDAR?'
        },
        {
          topic: 'Ergonomics & Headset Weight',
          count: 28,
          percentage: 20,
          sentiment: 'positive',
          exampleQuote: 'Relieved they addressed the front-heavy balance issue.'
        },
        {
          topic: 'Budget Value Alternatives',
          count: 18,
          percentage: 13,
          sentiment: 'positive',
          exampleQuote: 'Love these under $50 roundups, picked up two gadgets.'
        }
      ],
      questions: [
        { question: 'Will the new Matter protocol update fix existing hub disconnects?', frequency: 19, category: 'Smart Home' },
        { question: 'Is the trade-in value worth upgrading from the 2024 flagship?', frequency: 16, category: 'Purchase Decision' },
        { question: 'Can autonomous taxis operate safely in snow and zero-visibility?', frequency: 14, category: 'Automotive' }
      ],
      painPoints: [
        { issue: 'Fragile battery lifespans in wearable audio devices', severity: 'high', mentions: 32 },
        { issue: 'High headset weight causing neck strain over 45 minutes', severity: 'high', mentions: 24 },
        { issue: 'Inconsistent smart home interoperability despite standards', severity: 'medium', mentions: 18 }
      ],
      commercialSignals: [
        {
          signal: 'High purchase comparison interest between $50 budget audio and $300 flagships',
          intentType: 'product_comparison',
          evidenceQuote: 'Would love to see a direct comparison vs Sony XM5s for daily calls.',
          opportunity: 'Publish dedicated value vs flagship matrix content.'
        },
        {
          signal: 'Viewer intent to purchase replacement accessories and wallpaper packs',
          intentType: 'purchase_intent',
          evidenceQuote: 'Bought the wallpaper pack immediately, looks clean on OLED.',
          opportunity: 'High conversion for digital design assets and affiliate accessories.'
        }
      ]
    },
    revenueEstimates: {
      views30DayEstimate: 14500000,
      lowRpm: 2.2,
      baseRpm: 5.5,
      highRpm: 11.0,
      monthlyLow: 31900,
      monthlyBase: 79750,
      monthlyHigh: 159500,
      annualLow: 382800,
      annualBase: 957000,
      annualHigh: 1914000,
      diversificationScore: 92,
      streams: [
        {
          type: 'ad_revenue',
          label: 'YouTube AdSense',
          status: 'confirmed',
          evidence: 'Public view volume (~14.5M monthly views) across tech-tier demographics.',
          details: 'Estimated monthly ad yield between $31.9K and $159.5K depending on Q4 tech CPM surges.'
        },
        {
          type: 'sponsorships',
          label: 'Dedicated Brand Integrations',
          status: 'confirmed',
          evidence: 'Consistent mid-roll sponsor spots observed (e.g. dbrand, Ridge, Squarespace).',
          details: 'Enterprise sponsorship contracts estimated at $40,000–$80,000 per dedicated integration.'
        },
        {
          type: 'affiliates',
          label: 'Affiliate Equipment & Gear Links',
          status: 'confirmed',
          evidence: 'Amazon and direct brand tracking affiliate links populated in all video descriptions.',
          details: 'High-volume recurring commissions on consumer electronics, cameras, and desk accessories.'
        },
        {
          type: 'merchandise',
          label: 'Proprietary Merch Store & MKBHD Apparel',
          status: 'confirmed',
          evidence: 'Active links to official MKBHD storefront (hoodies, mousepads, shoes, mugs).',
          details: 'Direct-to-consumer branded merchandise with substantial retail margins.'
        },
        {
          type: 'digital_products',
          label: 'Wallpaper Packs & Digital Studio Assets',
          status: 'confirmed',
          evidence: 'Panels wallpaper application and custom photography packs promoted in video notes.',
          details: 'Zero-marginal-cost digital downloads converting high intent tech enthusiasts.'
        },
        {
          type: 'memberships',
          label: 'Channel Memberships / Discord Perks',
          status: 'confirmed',
          evidence: 'Active YouTube Join button and members-only badge tier displayed.',
          details: 'Predictable MRR from core community subscribers.'
        }
      ]
    },
    aiInsight: {
      executiveSummary: 'Marques Brownlee maintains elite commercial positioning in consumer technology with top-decile engagement (5.5%) and exceptional production rigor. Content strategy centers on demystifying complex engineering and evaluating usability rather than regurgitating spec sheets.',
      channelPositioning: 'The gold standard for consumer hardware analysis, characterized by objective editorial tone, cinematic 8K studio cinematography, and consumer-first advocacy.',
      performanceAssessment: {
        strengths: [
          'High retention long-form format averaging 13+ minutes with above-average engagement',
          'Breakout ability on disruptive mobility and spatial computing narratives (3.5x median views)',
          'Diversified, multi-channel monetization model buffering against algorithmic ad volatility'
        ],
        weaknesses: [
          'High production overhead per video requires multi-person studio crew',
          'Lower frequency on short-form vertical video relative to pure mobile competitors'
        ],
        anomalies: [
          'Tesla Robotaxi video generated 4.8M views in 16 days, outperforming channel baseline by 356%'
        ]
      },
      contentStrategy: {
        winningThemes: ['Real-world failure modes of hyped tech', 'First-ride autonomy impressions', 'Budget gadget roundups under $50'],
        formats: ['In-studio deep dives (12-18 mins)', 'Hands-on field excursions', 'Annual superlatives / awards'],
        titleTactics: ['Direct, provocative problem statements ("Why Every Smart Home Setup Fails")', 'Clear price boundaries ("$50 or Less")']
      },
      audienceIntelligence: {
        sentimentSummary: 'Audience shows 68% positive sentiment, demonstrating trust in editorial objectivity while expressing heavy fatigue with planned obsolescence in micro-gadgets.',
        coreQuestions: ['Are wireless earbuds fundamentally disposable?', 'How will autonomous vehicles operate in poor weather?', 'Is spatial computing worth the ergonomic penalty?'],
        keyPainPoints: ['Battery degradation after 2-3 years', 'High device weight and neck strain', 'Smart home protocol fragmentation']
      },
      growthSignals: {
        momentumVerdict: 'Consistent tier-one momentum sustained by milestone tech events and high evergreen view ratio (226 views/subscriber).',
        breakoutDrivers: ['Exclusive physical access to unreleased or restricted hardware', 'Direct investigative consumer advocacy']
      },
      revenueIntelligence: {
        adRevenueInsight: 'Estimated ad revenue captures only 25-35% of total channel gross. The true economic engine is multi-year brand integrations, affiliate gear conversions, and DTC digital merchandise.',
        expansionOpportunities: ['Enterprise B2B benchmarking consultancy for hardware OEMs', 'Syndicated licensing of camera and battery benchmark datasets']
      },
      competitiveOpportunities: [
        'Fill the fast-turnaround gap: Produce same-day teardowns for software updates where MKBHD takes 7-10 days to produce cinematic footage.',
        'Target budget niches: Focus deeply on $20–$100 everyday productivity tools with high affiliate intent.',
        'Address developer/technical angle: Focus on chip benchmarks, thermals, and software architecture rather than consumer aesthetics.'
      ],
      contentOpportunities: [
        {
          opportunity: 'The 3-Year Battery Health Audit of 10 Flagship Earbuds',
          why: 'Viewer comments show intense anger regarding battery decay in AirPods and Galaxy Buds.',
          evidence: 'Earbuds video generated 5,900 comments (highest comment-to-view ratio in recent sample).',
          priority: 'High'
        },
        {
          opportunity: 'Smart Home Hubs That Actually Work Locally (No Cloud)',
          why: 'Matter protocol disillusionment is peaking among tech hobbyists.',
          evidence: 'Smart home critique scored 5.64% engagement rate with over 3,400 upvoted agreement comments.',
          priority: 'High'
        },
        {
          opportunity: 'Autonomous Driving in Rain & Snow: Real World Stress Test',
          why: 'Top audience question across Cybercab ride video centered on adverse weather resilience.',
          evidence: 'Over 1,800 upvotes on comment regarding Midwest winter weather conditions.',
          priority: 'Medium'
        }
      ],
      actionPlan: {
        immediate: [
          'Review video description gear links to optimize high-converting affiliate redirects.',
          'Pin audience response comment addressing battery longevity in follow-up short.'
        ],
        thirtyDays: [
          'Develop a multi-part series addressing consumer right-to-repair in wearable devices.',
          'Test 3 vertical shorts focused on bite-sized utility tips to capture mobile feed volume.'
        ],
        ninetyDays: [
          'Publish the annual Smartphone Awards with interactive web voting portal.',
          'Consolidate brand partnership calendar for Q4 holiday electronics surge.'
        ]
      },
      dataCoverage: {
        videosAnalysed: 50,
        commentsAnalysed: 142,
        playlistsAnalysed: 4
      },
      confidenceLevel: 'High',
      generatedAt: new Date().toISOString()
    }
  }
};

export const DEMO_NICHES: Record<string, NicheExplorerResponse> = {
  'erp software': {
    query: 'ERP Software',
    regionCode: 'US',
    totalDiscovered: 8,
    totalSubscribers: 1420000,
    totalViews: 184000000,
    medianSubscribers: 86000,
    medianEngagement: 3.4,
    isDemoData: true,
    channels: [
      {
        id: 'c-erp-01',
        title: 'ERP Advisors Group',
        handle: '@erpadvisorsgroup',
        thumbnail: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=120&h=120&fit=crop',
        description: 'Independent ERP consulting, software selection guidance, and enterprise implementation strategies.',
        subscriberCount: 42000,
        viewCount: 6800000,
        videoCount: 380,
        avgViews: 17800,
        engagementRate: 3.8,
        lastPublishedAt: '2026-09-24T14:00:00Z',
        sizeClass: 'Small'
      },
      {
        id: 'c-erp-02',
        title: 'Odoo Enterprise',
        handle: '@odoo',
        thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=120&h=120&fit=crop',
        description: 'Open source ERP and CRM business applications for modern manufacturing and retail.',
        subscriberCount: 485000,
        viewCount: 64000000,
        videoCount: 920,
        avgViews: 69500,
        engagementRate: 2.9,
        lastPublishedAt: '2026-10-02T16:30:00Z',
        sizeClass: 'Mid-size'
      },
      {
        id: 'c-erp-03',
        title: 'NetSuite by Oracle',
        handle: '@netsuite',
        thumbnail: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=120&h=120&fit=crop',
        description: 'Cloud ERP business management suite for growing organizations and global enterprises.',
        subscriberCount: 165000,
        viewCount: 28000000,
        videoCount: 1100,
        avgViews: 25400,
        engagementRate: 2.1,
        lastPublishedAt: '2026-09-29T19:00:00Z',
        sizeClass: 'Mid-size'
      },
      {
        id: 'c-erp-04',
        title: 'Third Stage Consulting',
        handle: '@thirdstageconsulting',
        thumbnail: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=120&h=120&fit=crop',
        description: 'ERP transformation, digital transformation trends, and unbiased technology reviews.',
        subscriberCount: 118000,
        viewCount: 15400000,
        videoCount: 540,
        avgViews: 28500,
        engagementRate: 4.1,
        lastPublishedAt: '2026-10-01T11:00:00Z',
        sizeClass: 'Mid-size'
      },
      {
        id: 'c-erp-05',
        title: 'SAP',
        handle: '@sap',
        thumbnail: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=120&h=120&fit=crop',
        description: 'Global leader in enterprise application software and business AI solutions.',
        subscriberCount: 610000,
        viewCount: 69800000,
        videoCount: 1850,
        avgViews: 37700,
        engagementRate: 1.8,
        lastPublishedAt: '2026-10-03T09:15:00Z',
        sizeClass: 'Mid-size'
      }
    ]
  },
  'ai agents': {
    query: 'AI Agents',
    regionCode: 'US',
    totalDiscovered: 6,
    totalSubscribers: 2890000,
    totalViews: 320000000,
    medianSubscribers: 245000,
    medianEngagement: 5.6,
    isDemoData: true,
    channels: [
      {
        id: 'c-ai-01',
        title: 'Matt Wolfe',
        handle: '@maboris',
        thumbnail: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=120&h=120&fit=crop',
        description: 'FutureTools creator exploring autonomous AI agents, LLM automation, and artificial intelligence.',
        subscriberCount: 612000,
        viewCount: 64500000,
        videoCount: 310,
        avgViews: 208000,
        engagementRate: 6.2,
        lastPublishedAt: '2026-10-04T18:00:00Z',
        sizeClass: 'Mid-size'
      },
      {
        id: 'c-ai-02',
        title: 'David Ondrej',
        handle: '@davidondrej',
        thumbnail: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=120&h=120&fit=crop',
        description: 'Building autonomous AI agents, LangChain workflows, and AI workforce solutions.',
        subscriberCount: 224000,
        viewCount: 21800000,
        videoCount: 195,
        avgViews: 111000,
        engagementRate: 5.8,
        lastPublishedAt: '2026-10-03T14:30:00Z',
        sizeClass: 'Mid-size'
      },
      {
        id: 'c-ai-03',
        title: 'Liam Ottley',
        handle: '@liamottley',
        thumbnail: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&h=120&fit=crop',
        description: 'Building AI Automation Agencies (AAA) and deploying AI agent stacks for commercial businesses.',
        subscriberCount: 468000,
        viewCount: 48900000,
        videoCount: 280,
        avgViews: 174000,
        engagementRate: 5.4,
        lastPublishedAt: '2026-10-01T17:00:00Z',
        sizeClass: 'Mid-size'
      },
      {
        id: 'c-ai-04',
        title: 'Matthew Berman',
        handle: '@matthewberman',
        thumbnail: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=120&h=120&fit=crop',
        description: 'Deep dives on open-source LLMs, local AI agents, and multi-agent coordination frameworks.',
        subscriberCount: 710000,
        viewCount: 88500000,
        videoCount: 420,
        avgViews: 210000,
        engagementRate: 5.9,
        lastPublishedAt: '2026-10-05T02:00:00Z',
        sizeClass: 'Mid-size'
      }
    ]
  }
};
