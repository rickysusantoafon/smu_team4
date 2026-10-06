import React from 'react';
import {
  Tag,
  Clock,
  Layers,
  BarChart,
  Calendar,
  Sparkles,
  TrendingUp,
  Percent,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import { ChannelAnalyticsResponse } from '../../../types/youtube';
import { formatCompactNumber } from '../../../lib/calculations';
import { Badge } from '../../ui/Badge';
import { Tooltip } from '../../ui/Tooltip';

interface ContentIntelligenceTabProps {
  analytics: ChannelAnalyticsResponse;
}

export const ContentIntelligenceTab: React.FC<ContentIntelligenceTabProps> = ({ analytics }) => {
  const { contentIntelligence, recentVideos, calculations } = analytics;
  const { topKeywords, durationBuckets, publishingCadence, shortsPercentage, longformPercentage } = contentIntelligence;

  // Segment videos into top 25% performers and bottom 25% performers
  const sortedByViews = [...recentVideos].sort((a, b) => b.views - a.views);
  const quartileSize = Math.max(1, Math.floor(sortedByViews.length / 4));
  const topPerformers = sortedByViews.slice(0, quartileSize);
  const bottomPerformers = sortedByViews.slice(-quartileSize);

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Top Banner: Content Format Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Card 1: Shorts vs Long-form */}
        <div className="p-5 rounded-xl bg-zinc-900 border border-zinc-800 space-y-3">
          <div className="flex items-center justify-between text-zinc-400">
            <span className="text-xs font-semibold uppercase tracking-wider text-zinc-300 flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-indigo-400" />
              Content Format Ratio
            </span>
            <Tooltip content="Proportion of short-form (under 60s) vs standard landscape/long-form videos in sample.">
              <Percent className="w-3.5 h-3.5 text-zinc-500" />
            </Tooltip>
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm font-bold text-white">
              <span>Long-form: {longformPercentage}%</span>
              <span>Shorts: {shortsPercentage}%</span>
            </div>
            {/* Split bar */}
            <div className="w-full h-3 bg-zinc-800 rounded-full overflow-hidden flex">
              <div
                style={{ width: `${longformPercentage}%` }}
                className="bg-indigo-500 h-full transition-all"
                title={`Long-form: ${longformPercentage}%`}
              />
              <div
                style={{ width: `${shortsPercentage}%` }}
                className="bg-amber-500 h-full transition-all"
                title={`Shorts: ${shortsPercentage}%`}
              />
            </div>
            <p className="text-[11px] text-zinc-400">
              {longformPercentage > 70
                ? 'Channel predominantly relies on deep-dive long-form video assets.'
                : shortsPercentage > 40
                ? 'Channel relies on high-volume Shorts for discovery and mobile reach.'
                : 'Balanced multi-format hybrid distribution strategy.'}
            </p>
          </div>
        </div>

        {/* Card 2: Average Video Duration */}
        <div className="p-5 rounded-xl bg-zinc-900 border border-zinc-800 space-y-3">
          <div className="flex items-center justify-between text-zinc-400">
            <span className="text-xs font-semibold uppercase tracking-wider text-zinc-300 flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-indigo-400" />
              Duration Sweet Spot
            </span>
            <Tooltip content="Mean video runtime across analyzed uploads.">
              <Clock className="w-3.5 h-3.5 text-zinc-500" />
            </Tooltip>
          </div>
          <div className="text-2xl font-extrabold text-white">
            {calculations.avgDurationFormatted}
          </div>
          <p className="text-[11px] text-zinc-400 leading-relaxed">
            Content pacing indicates deliberate pacing aligned with sustained watch time and mid-roll ad placement.
          </p>
        </div>

        {/* Card 3: Publishing Cadence */}
        <div className="p-5 rounded-xl bg-zinc-900 border border-zinc-800 space-y-3">
          <div className="flex items-center justify-between text-zinc-400">
            <span className="text-xs font-semibold uppercase tracking-wider text-zinc-300 flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-indigo-400" />
              Publishing Velocity
            </span>
            <Tooltip content="Frequency of uploads per week and per month.">
              <Calendar className="w-3.5 h-3.5 text-zinc-500" />
            </Tooltip>
          </div>
          <div className="text-2xl font-extrabold text-emerald-400">
            {calculations.uploadFrequencyWeekly}{' '}
            <span className="text-xs font-normal text-zinc-400">videos / week</span>
          </div>
          <p className="text-[11px] text-zinc-400 leading-relaxed">
            Maintains ~{calculations.uploadFrequencyMonthly} public releases every 30 days.
          </p>
        </div>
      </div>

      {/* Repeated Title Keywords & Performance Impact */}
      <div className="space-y-4">
        <div className="space-y-1">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Tag className="w-4 h-4 text-indigo-400" />
            Title Keywords & Average Views Impact
          </h3>
          <p className="text-xs text-zinc-400">
            Frequently occurring keywords in titles and their associated average audience view yield
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
          {topKeywords.map((kw) => {
            const isHighYield = kw.avgViews > calculations.sampledRecentMedianViews;
            return (
              <div
                key={kw.word}
                className="p-3.5 rounded-xl bg-zinc-900 border border-zinc-800/80 hover:border-zinc-700 space-y-2 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-zinc-100 capitalize">
                    "{kw.word}"
                  </span>
                  <Badge variant={isHighYield ? 'emerald' : 'secondary'} size="sm">
                    {kw.count}x
                  </Badge>
                </div>
                <div className="space-y-0.5">
                  <div className="text-sm font-extrabold text-white">
                    {formatCompactNumber(kw.avgViews)}
                  </div>
                  <div className="text-[10px] text-zinc-400">
                    avg views / video
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Duration vs Performance Buckets */}
      <div className="space-y-4">
        <div className="space-y-1">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Clock className="w-4 h-4 text-indigo-400" />
            Video Runtime vs Audience Reception
          </h3>
          <p className="text-xs text-zinc-400">
            Comparing average views and engagement rates across different duration brackets
          </p>
        </div>

        <div className="overflow-x-auto rounded-xl border border-zinc-800 bg-zinc-900/60">
          <table className="w-full text-left text-xs text-zinc-300">
            <thead className="bg-zinc-950/80 text-[11px] font-semibold text-zinc-400 uppercase tracking-wider border-b border-zinc-800">
              <tr>
                <th className="py-3.5 px-4">Duration Bracket</th>
                <th className="py-3.5 px-4 text-right">Sampled Videos</th>
                <th className="py-3.5 px-4 text-right">Average Views</th>
                <th className="py-3.5 px-4 text-right">Avg Engagement Rate</th>
                <th className="py-3.5 px-4 text-right">Relative Baseline</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/60 font-medium">
              {durationBuckets.map((bucket) => {
                const multiplier =
                  calculations.sampledRecentMedianViews > 0
                    ? Math.round((bucket.avgViews / calculations.sampledRecentMedianViews) * 10) / 10
                    : 1;

                return (
                  <tr key={bucket.bucket} className="hover:bg-zinc-800/40 transition-colors">
                    <td className="py-3.5 px-4 font-semibold text-zinc-100 flex items-center gap-2">
                      <Clock className="w-3.5 h-3.5 text-indigo-400" />
                      {bucket.bucket}
                    </td>
                    <td className="py-3.5 px-4 text-right font-mono text-zinc-300">
                      {bucket.count}
                    </td>
                    <td className="py-3.5 px-4 text-right font-bold text-white font-mono">
                      {formatCompactNumber(bucket.avgViews)}
                    </td>
                    <td className="py-3.5 px-4 text-right font-mono text-emerald-400">
                      {bucket.avgEngagement}%
                    </td>
                    <td className="py-3.5 px-4 text-right font-mono">
                      <span
                        className={
                          multiplier >= 1.5
                            ? 'text-amber-400 font-bold'
                            : multiplier >= 1.0
                            ? 'text-indigo-300'
                            : 'text-zinc-500'
                        }
                      >
                        {multiplier}x
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* High-Performing vs Low-Performing Content Contrast */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Winning Themes */}
        <div className="p-5 rounded-xl bg-zinc-900 border border-emerald-500/20 space-y-4">
          <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
            <CheckCircle className="w-4 h-4" />
            <span>Top Performing Sampled Content (Top Quartile)</span>
          </div>
          <div className="space-y-3">
            {topPerformers.map((v) => (
              <div key={v.id} className="flex gap-3 text-xs border-b border-zinc-800/80 pb-3 last:border-0 last:pb-0">
                <img
                  src={v.thumbnail}
                  alt={v.title}
                  className="w-16 h-10 rounded object-cover shrink-0 bg-zinc-800"
                />
                <div className="space-y-1 min-w-0">
                  <h4 className="font-semibold text-zinc-100 line-clamp-1">{v.title}</h4>
                  <div className="flex items-center gap-3 text-zinc-400 font-mono text-[11px]">
                    <span className="text-white font-bold">{formatCompactNumber(v.views)} views</span>
                    <span className="text-emerald-400">{v.relativePerformance}x median</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Lower Performing Benchmarks */}
        <div className="p-5 rounded-xl bg-zinc-900 border border-zinc-800 space-y-4">
          <div className="flex items-center gap-2 text-zinc-400 font-bold text-sm">
            <AlertCircle className="w-4 h-4 text-zinc-400" />
            <span>Lower Baseline Sampled Content (Bottom Quartile)</span>
          </div>
          <div className="space-y-3">
            {bottomPerformers.map((v) => (
              <div key={v.id} className="flex gap-3 text-xs border-b border-zinc-800/80 pb-3 last:border-0 last:pb-0">
                <img
                  src={v.thumbnail}
                  alt={v.title}
                  className="w-16 h-10 rounded object-cover shrink-0 bg-zinc-800 opacity-80"
                />
                <div className="space-y-1 min-w-0">
                  <h4 className="font-semibold text-zinc-300 line-clamp-1">{v.title}</h4>
                  <div className="flex items-center gap-3 text-zinc-400 font-mono text-[11px]">
                    <span>{formatCompactNumber(v.views)} views</span>
                    <span className="text-zinc-400">{v.relativePerformance}x median</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
