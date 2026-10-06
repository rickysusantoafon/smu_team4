import React, { useState, useMemo } from 'react';
import {
  Users,
  Eye,
  Video,
  Flame,
  ThumbsUp,
  MessageSquare,
  Clock,
  Zap,
  TrendingUp,
  Calendar,
  Sparkles,
  ArrowUpRight,
  Filter
} from 'lucide-react';
import { ChannelAnalyticsResponse, VideoItem } from '../../../types/youtube';
import { Tooltip } from '../../ui/Tooltip';
import { Badge } from '../../ui/Badge';
import {
  formatCompactNumber,
  formatNumber,
  calculateMedian,
  calculateMean,
  calculateEngagementRate
} from '../../../lib/calculations';

interface OverviewTabProps {
  analytics: ChannelAnalyticsResponse;
  onNavigateToTab: (tabId: string) => void;
}

export const OverviewTab: React.FC<OverviewTabProps> = ({ analytics, onNavigateToTab }) => {
  const { channel, calculations, breakouts, recentVideos } = analytics;
  const [dateFilter, setDateFilter] = useState<'all' | '30d' | '90d' | '180d' | '365d'>('all');

  // Filter recent videos based on publication date
  const filteredVideos = useMemo(() => {
    if (dateFilter === 'all') return recentVideos;

    const daysMap = {
      '30d': 30,
      '90d': 90,
      '180d': 180,
      '365d': 365
    };
    const maxDays = daysMap[dateFilter];
    const cutoffTime = Date.now() - maxDays * 24 * 60 * 60 * 1000;

    return recentVideos.filter((v) => new Date(v.publishedAt).getTime() >= cutoffTime);
  }, [recentVideos, dateFilter]);

  // Dynamically calculate metrics for the filtered period if filtered
  const periodStats = useMemo(() => {
    if (dateFilter === 'all' || filteredVideos.length === 0) {
      return {
        sampleCount: recentVideos.length,
        avgViews: calculations.sampledRecentAvgViews,
        medianViews: calculations.sampledRecentMedianViews,
        avgLikes: calculations.sampledAvgLikes,
        avgComments: calculations.sampledAvgComments,
        engagementRate: calculations.sampledEngagementRate
      };
    }

    const views = filteredVideos.map((v) => v.views);
    const likes = filteredVideos.map((v) => v.likes);
    const comments = filteredVideos.map((v) => v.comments);

    const avgViews = calculateMean(views);
    const avgLikes = calculateMean(likes);
    const avgComments = calculateMean(comments);

    return {
      sampleCount: filteredVideos.length,
      avgViews,
      medianViews: calculateMedian(views),
      avgLikes,
      avgComments,
      engagementRate: calculateEngagementRate(avgLikes, avgComments, avgViews)
    };
  }, [dateFilter, filteredVideos, recentVideos, calculations]);

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Date Filter Bar & Transparency Note */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-xl bg-zinc-900/60 border border-zinc-800">
        <div className="flex items-center gap-2 text-xs text-zinc-300">
          <Filter className="w-4 h-4 text-indigo-400" />
          <span className="font-semibold text-zinc-200">Filter Analysis Window:</span>
          <span className="text-zinc-400 hidden md:inline">
            (Calculates statistics on videos published in this timeframe)
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-1.5">
          {[
            { id: 'all', label: 'All Retrieved' },
            { id: '30d', label: 'Last 30 Days' },
            { id: '90d', label: 'Last 90 Days' },
            { id: '180d', label: 'Last 6 Months' },
            { id: '365d', label: 'Last 12 Months' }
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setDateFilter(item.id as any)}
              className={`px-3 py-1 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                dateFilter === item.id
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700 hover:text-white'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold uppercase tracking-wider text-zinc-300 flex items-center gap-2">
            <Zap className="w-4 h-4 text-indigo-400" />
            Core Channel Performance Benchmarks
          </h3>
          <span className="text-xs text-zinc-400">
            Based on {periodStats.sampleCount} analyzed videos
          </span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
          {/* Card 1: Subscribers */}
          <div className="p-4 rounded-xl bg-zinc-900 border border-zinc-800/90 shadow-sm space-y-1.5">
            <div className="flex items-center justify-between text-zinc-400">
              <span className="text-xs font-medium">Subscribers</span>
              <Tooltip content="Total verified public channel subscribers reported directly by YouTube Data API v3.">
                <Users className="w-3.5 h-3.5 text-zinc-400" />
              </Tooltip>
            </div>
            <div className="text-2xl font-extrabold text-white">
              {formatCompactNumber(channel.subscriberCount)}
            </div>
            <div className="text-[11px] text-zinc-400 font-mono">
              {formatNumber(channel.subscriberCount)} exact
            </div>
          </div>

          {/* Card 2: Total Channel Views */}
          <div className="p-4 rounded-xl bg-zinc-900 border border-zinc-800/90 shadow-sm space-y-1.5">
            <div className="flex items-center justify-between text-zinc-400">
              <span className="text-xs font-medium">All-Time Views</span>
              <Tooltip content="Cumulative lifetime video views across all public uploads since channel inception.">
                <Eye className="w-3.5 h-3.5 text-zinc-400" />
              </Tooltip>
            </div>
            <div className="text-2xl font-extrabold text-white">
              {formatCompactNumber(channel.viewCount)}
            </div>
            <div className="text-[11px] text-zinc-400 font-mono">
              {formatNumber(channel.viewCount)} exact
            </div>
          </div>

          {/* Card 3: Recent Median Views */}
          <div className="p-4 rounded-xl bg-zinc-900 border border-indigo-500/20 shadow-sm space-y-1.5 relative overflow-hidden">
            <div className="flex items-center justify-between text-zinc-400">
              <span className="text-xs font-medium text-indigo-300">Median Recent Views</span>
              <Tooltip content="Median view count of analyzed videos. Much more resilient than average because it prevents viral runaway videos from skewing the baseline.">
                <Flame className="w-3.5 h-3.5 text-indigo-400" />
              </Tooltip>
            </div>
            <div className="text-2xl font-extrabold text-indigo-200">
              {formatCompactNumber(periodStats.medianViews)}
            </div>
            <div className="text-[11px] text-zinc-400 flex items-center justify-between">
              <span>Avg: {formatCompactNumber(periodStats.avgViews)}</span>
              <Badge variant="indigo" size="sm">Baseline</Badge>
            </div>
          </div>

          {/* Card 4: Engagement Rate */}
          <div className="p-4 rounded-xl bg-zinc-900 border border-emerald-500/20 shadow-sm space-y-1.5">
            <div className="flex items-center justify-between text-zinc-400">
              <span className="text-xs font-medium text-emerald-300">Engagement Rate</span>
              <Tooltip content="Calculated Formula: (Total Likes + Total Comments) ÷ Total Views × 100 across analyzed sample. Higher values denote stronger audience connection.">
                <ThumbsUp className="w-3.5 h-3.5 text-emerald-400" />
              </Tooltip>
            </div>
            <div className="text-2xl font-extrabold text-emerald-400">
              {periodStats.engagementRate.toFixed(1)}%
            </div>
            <div className="text-[11px] text-zinc-400 flex items-center gap-1">
              <span>Benchmark: &gt;3.0% is strong</span>
            </div>
          </div>

          {/* Card 5: Sampled Avg Likes */}
          <div className="p-4 rounded-xl bg-zinc-900 border border-zinc-800/90 shadow-sm space-y-1.5">
            <div className="flex items-center justify-between text-zinc-400">
              <span className="text-xs font-medium">Avg Likes / Video</span>
              <Tooltip content="Mean number of public likes per video in the analyzed window.">
                <ThumbsUp className="w-3.5 h-3.5 text-zinc-400" />
              </Tooltip>
            </div>
            <div className="text-2xl font-extrabold text-white">
              {formatCompactNumber(periodStats.avgLikes)}
            </div>
            <div className="text-[11px] text-zinc-400">
              Like Rate: {calculations.sampledLikeToViewRate.toFixed(2)}%
            </div>
          </div>

          {/* Card 6: Sampled Avg Comments */}
          <div className="p-4 rounded-xl bg-zinc-900 border border-zinc-800/90 shadow-sm space-y-1.5">
            <div className="flex items-center justify-between text-zinc-400">
              <span className="text-xs font-medium">Avg Comments / Video</span>
              <Tooltip content="Mean number of public comments per video in the analyzed window.">
                <MessageSquare className="w-3.5 h-3.5 text-zinc-400" />
              </Tooltip>
            </div>
            <div className="text-2xl font-extrabold text-white">
              {formatCompactNumber(periodStats.avgComments)}
            </div>
            <div className="text-[11px] text-zinc-400">
              Comment Rate: {calculations.sampledCommentToViewRate.toFixed(2)}%
            </div>
          </div>

          {/* Card 7: Upload Frequency */}
          <div className="p-4 rounded-xl bg-zinc-900 border border-zinc-800/90 shadow-sm space-y-1.5">
            <div className="flex items-center justify-between text-zinc-400">
              <span className="text-xs font-medium">Publishing Frequency</span>
              <Tooltip content="Upload velocity calculated from the publication dates across recent video uploads.">
                <Calendar className="w-3.5 h-3.5 text-zinc-400" />
              </Tooltip>
            </div>
            <div className="text-2xl font-extrabold text-white">
              {calculations.uploadFrequencyWeekly}{' '}
              <span className="text-xs font-normal text-zinc-400">/ week</span>
            </div>
            <div className="text-[11px] text-zinc-400">
              ~{calculations.uploadFrequencyMonthly} uploads per month
            </div>
          </div>

          {/* Card 8: Views per Subscriber */}
          <div className="p-4 rounded-xl bg-zinc-900 border border-zinc-800/90 shadow-sm space-y-1.5">
            <div className="flex items-center justify-between text-zinc-400">
              <span className="text-xs font-medium">Views per Subscriber</span>
              <Tooltip content="Calculated Formula: Total Channel Views ÷ Subscriber Count. Measures historical catalog monetization and evergreen replay endurance.">
                <TrendingUp className="w-3.5 h-3.5 text-zinc-400" />
              </Tooltip>
            </div>
            <div className="text-2xl font-extrabold text-white">
              {calculations.viewsPerSubscriber}x
            </div>
            <div className="text-[11px] text-zinc-400">
              Avg Duration: {calculations.avgDurationFormatted}
            </div>
          </div>
        </div>
      </div>

      {/* Breakout / Outlier Performance Detection Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Flame className="w-4 h-4 text-amber-400" />
              Breakout Video Intelligence
            </h3>
            <p className="text-xs text-zinc-400">
              Videos outperforming the channel baseline by &ge; 1.8&times; with algorithm catalyst analysis
            </p>
          </div>
          <button
            onClick={() => onNavigateToTab('content')}
            className="text-xs text-indigo-400 hover:text-indigo-300 font-medium inline-flex items-center gap-1 cursor-pointer"
          >
            <span>Full Content Matrix</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {breakouts.length === 0 ? (
          <div className="p-8 text-center bg-zinc-900/60 border border-zinc-800 rounded-xl text-xs text-zinc-400">
            No outlier videos exceeded 1.8x median performance in this sample window. Performance remains clustered closely around the baseline.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {breakouts.map((breakout) => {
              const video = breakout.video;
              return (
                <div
                  key={video.id}
                  className="p-4 rounded-xl bg-zinc-900 border border-amber-500/20 hover:border-amber-500/40 transition-all space-y-3"
                >
                  <div className="flex gap-3">
                    <img
                      src={video.thumbnail}
                      alt={video.title}
                      className="w-28 h-18 rounded-lg object-cover bg-zinc-800 shrink-0"
                    />
                    <div className="space-y-1 flex-1 min-w-0">
                      <div className="flex items-center gap-1.5">
                        <Badge variant="amber" size="sm">
                          {breakout.multiplier}&times; Typical Performance
                        </Badge>
                        <span className="text-[10px] text-zinc-400">
                          {video.durationFormatted}
                        </span>
                      </div>
                      <h4 className="text-xs font-semibold text-zinc-100 line-clamp-2 leading-snug">
                        {video.title}
                      </h4>
                      <div className="flex items-center gap-3 text-[11px] text-zinc-400">
                        <span>{formatCompactNumber(video.views)} views</span>
                        <span>{video.engagementRate}% engagement</span>
                        <span>{formatCompactNumber(video.viewsPerDay)} views/day</span>
                      </div>
                    </div>
                  </div>

                  {/* AI Hypothesis */}
                  <div className="p-2.5 rounded-lg bg-zinc-950/80 border border-zinc-800/80 text-xs space-y-1">
                    <div className="flex items-center gap-1.5 text-indigo-300 font-semibold text-[11px]">
                      <Sparkles className="w-3 h-3 text-indigo-400" />
                      <span>Likely Driver (AI Analysis):</span>
                    </div>
                    <p className="text-zinc-400 leading-relaxed text-[11px]">
                      {breakout.aiHypothesis}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Quick Summary of Top Performing Content */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-indigo-400" />
              Highest Performing Content (Sampled)
            </h3>
            <p className="text-xs text-zinc-400">
              Ranked by cumulative view volume with engagement rate and velocity
            </p>
          </div>
          <button
            onClick={() => onNavigateToTab('videos')}
            className="text-xs text-indigo-400 hover:text-indigo-300 font-medium inline-flex items-center gap-1 cursor-pointer"
          >
            <span>View All Videos Table</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="overflow-x-auto rounded-xl border border-zinc-800 bg-zinc-900/60">
          <table className="w-full text-left text-xs text-zinc-300">
            <thead className="bg-zinc-950/80 text-[11px] font-semibold text-zinc-400 uppercase tracking-wider border-b border-zinc-800">
              <tr>
                <th className="py-3 px-4">Video Title</th>
                <th className="py-3 px-4 text-right">Published</th>
                <th className="py-3 px-4 text-right">Views</th>
                <th className="py-3 px-4 text-right">Engagement</th>
                <th className="py-3 px-4 text-right">Relative Baseline</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/60 font-medium">
              {recentVideos.slice(0, 5).map((v) => (
                <tr key={v.id} className="hover:bg-zinc-800/40 transition-colors">
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={v.thumbnail}
                        alt={v.title}
                        className="w-12 h-8 rounded object-cover bg-zinc-800 shrink-0"
                      />
                      <span className="font-semibold text-zinc-100 line-clamp-1 max-w-md">
                        {v.title}
                      </span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-right text-zinc-400 font-mono text-[11px]">
                    {new Date(v.publishedAt).toLocaleDateString()}
                  </td>
                  <td className="py-3 px-4 text-right font-bold text-white font-mono">
                    {formatCompactNumber(v.views)}
                  </td>
                  <td className="py-3 px-4 text-right text-emerald-400 font-mono">
                    {v.engagementRate}%
                  </td>
                  <td className="py-3 px-4 text-right font-mono">
                    <span
                      className={
                        v.relativePerformance >= 1.5
                          ? 'text-amber-400 font-semibold'
                          : v.relativePerformance >= 1.0
                          ? 'text-indigo-400'
                          : 'text-zinc-500'
                      }
                    >
                      {v.relativePerformance}x
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
