import React, { useState } from 'react';
import {
  Layers,
  Search,
  Filter,
  Users,
  Eye,
  Video,
  TrendingUp,
  GitCompare,
  ArrowRight,
  ExternalLink,
  Sparkles,
  BarChart3
} from 'lucide-react';
import { NicheExplorerResponse, NicheChannel, VideoCategory } from '../../types/youtube';
import { formatCompactNumber, formatNumber } from '../../lib/calculations';
import { Badge } from '../ui/Badge';
import { Tooltip } from '../ui/Tooltip';

interface NicheExplorerProps {
  nicheData: NicheExplorerResponse | null;
  categories: VideoCategory[];
  isLoading: boolean;
  onSearchNiche: (query: string, categoryId?: string) => void;
  onSelectChannel: (channelIdOrHandle: string) => void;
  onCompareChannels: (channels: NicheChannel[]) => void;
}

export const NicheExplorer: React.FC<NicheExplorerProps> = ({
  nicheData,
  categories,
  isLoading,
  onSearchNiche,
  onSelectChannel,
  onCompareChannels
}) => {
  const [keyword, setKeyword] = useState('');
  const [selectedCatId, setSelectedCatId] = useState<string>('');
  const [selectedForCompare, setSelectedForCompare] = useState<Set<string>>(new Set());

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearchNiche(keyword.trim(), selectedCatId || undefined);
  };

  const toggleCompare = (channel: NicheChannel) => {
    const next = new Set(selectedForCompare);
    if (next.has(channel.id)) {
      next.delete(channel.id);
    } else {
      if (next.size >= 5) {
        alert('You can compare a maximum of 5 channels simultaneously.');
        return;
      }
      next.add(channel.id);
    }
    setSelectedForCompare(next);
  };

  const handleStartComparison = () => {
    if (!nicheData) return;
    const matched = nicheData.channels.filter((c) => selectedForCompare.has(c.id));
    if (matched.length >= 2) {
      onCompareChannels(matched);
    }
  };

  const getSizeBadgeColor = (sizeClass: string) => {
    switch (sizeClass) {
      case 'Major':
        return 'purple';
      case 'Large':
        return 'indigo';
      case 'Mid-size':
        return 'blue';
      case 'Small':
        return 'emerald';
      default:
        return 'amber';
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Header and Filter Form */}
      <div className="p-6 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-base font-bold text-white flex items-center gap-2 font-['Plus_Jakarta_Sans']">
              <Layers className="w-5 h-5 text-indigo-400" />
              Niche & Category Market Explorer
            </span>
            <Badge variant="indigo" size="sm">
              Competitor Discovery
            </Badge>
          </div>
          <p className="text-xs text-zinc-400">
            Identify market leaders, emerging channels, and content volume across commercial niches and official YouTube video categories.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
          {/* Keyword input */}
          <div className="sm:col-span-1">
            <label className="block text-[11px] font-semibold text-zinc-400 mb-1">
              Commercial Niche / Keyword
            </label>
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500 pointer-events-none" />
              <input
                type="text"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                placeholder="e.g. ERP Software, AI Agents..."
                className="w-full bg-zinc-950 border border-zinc-800 focus:border-indigo-500 rounded-lg pl-9 pr-3 py-2 text-xs text-zinc-200 placeholder-zinc-500 focus:outline-none"
              />
            </div>
          </div>

          {/* Category select */}
          <div className="sm:col-span-1">
            <label className="block text-[11px] font-semibold text-zinc-400 mb-1">
              YouTube Video Category
            </label>
            <select
              value={selectedCatId}
              onChange={(e) => setSelectedCatId(e.target.value)}
              className="w-full bg-zinc-950 border border-zinc-800 focus:border-indigo-500 rounded-lg px-3 py-2 text-xs text-zinc-200 focus:outline-none cursor-pointer"
            >
              <option value="">All Categories</option>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.title}
                </option>
              ))}
            </select>
          </div>

          {/* Submit */}
          <div className="sm:col-span-1 flex items-end">
            <button
              type="submit"
              disabled={isLoading || (!keyword.trim() && !selectedCatId)}
              className="w-full py-2 px-4 rounded-lg bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white font-medium text-xs shadow-md shadow-indigo-600/20 flex items-center justify-center gap-1.5 transition-all cursor-pointer h-[38px]"
            >
              {isLoading ? (
                <>
                  <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Scanning Market...</span>
                </>
              ) : (
                <>
                  <span>Scan Niche Competitors</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      {/* Results Section */}
      {nicheData && (
        <div className="space-y-6">
          {/* Niche Summary KPIs */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
            <div className="p-4 rounded-xl bg-zinc-900 border border-zinc-800 space-y-1">
              <span className="text-xs font-medium text-zinc-400">Channels Discovered</span>
              <div className="text-2xl font-extrabold text-white">
                {nicheData.totalDiscovered}
              </div>
              <span className="text-[11px] text-zinc-500">Market sample pool</span>
            </div>

            <div className="p-4 rounded-xl bg-zinc-900 border border-zinc-800 space-y-1">
              <span className="text-xs font-medium text-zinc-400">Combined Subscribers</span>
              <div className="text-2xl font-extrabold text-white">
                {formatCompactNumber(nicheData.totalSubscribers)}
              </div>
              <span className="text-[11px] text-zinc-500">Total audience capture</span>
            </div>

            <div className="p-4 rounded-xl bg-zinc-900 border border-zinc-800 space-y-1">
              <span className="text-xs font-medium text-zinc-400">Combined Total Views</span>
              <div className="text-2xl font-extrabold text-white">
                {formatCompactNumber(nicheData.totalViews)}
              </div>
              <span className="text-[11px] text-zinc-500">Lifetime video impressions</span>
            </div>

            <div className="p-4 rounded-xl bg-zinc-900 border border-zinc-800 space-y-1">
              <span className="text-xs font-medium text-indigo-300">Median Channel Size</span>
              <div className="text-2xl font-extrabold text-indigo-400">
                {formatCompactNumber(nicheData.medianSubscribers)}
              </div>
              <span className="text-[11px] text-zinc-500">Subscribers benchmark</span>
            </div>
          </div>

          {/* Comparison CTA Bar (if channels selected) */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-4 rounded-xl bg-zinc-900/90 border border-indigo-500/30">
            <div className="space-y-0.5">
              <span className="text-xs font-bold text-white flex items-center gap-2">
                <GitCompare className="w-4 h-4 text-indigo-400" />
                Side-by-Side Channel Comparison
              </span>
              <p className="text-xs text-zinc-400">
                Selected <strong>{selectedForCompare.size} of 5</strong> channels for detailed head-to-head benchmarking.
              </p>
            </div>
            <button
              onClick={handleStartComparison}
              disabled={selectedForCompare.size < 2}
              className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 disabled:cursor-not-allowed text-white text-xs font-bold shadow-md shadow-indigo-600/20 transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <span>Compare Selected Channels</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Discovered Channels Table */}
          <div className="overflow-x-auto rounded-xl border border-zinc-800 bg-zinc-900/60 shadow-md">
            <table className="w-full text-left text-xs text-zinc-300">
              <thead className="bg-zinc-950/80 text-[11px] font-semibold text-zinc-400 uppercase tracking-wider border-b border-zinc-800 select-none">
                <tr>
                  <th className="py-3.5 px-4 w-12 text-center">Compare</th>
                  <th className="py-3.5 px-4 min-w-[240px]">Channel</th>
                  <th className="py-3.5 px-4 text-right">Subscribers</th>
                  <th className="py-3.5 px-4 text-right">Lifetime Views</th>
                  <th className="py-3.5 px-4 text-right">Videos</th>
                  <th className="py-3.5 px-4 text-right">Avg Views/Video</th>
                  <th className="py-3.5 px-4 text-center">Tier</th>
                  <th className="py-3.5 px-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800/60 font-medium">
                {nicheData.channels.map((ch) => {
                  const isChecked = selectedForCompare.has(ch.id);
                  return (
                    <tr
                      key={ch.id}
                      className={`hover:bg-zinc-800/40 transition-colors ${
                        isChecked ? 'bg-indigo-950/20' : ''
                      }`}
                    >
                      <td className="py-3.5 px-4 text-center">
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => toggleCompare(ch)}
                          className="w-4 h-4 rounded border-zinc-700 text-indigo-600 focus:ring-indigo-500 focus:ring-offset-zinc-900 cursor-pointer"
                        />
                      </td>
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={ch.thumbnail}
                            alt={ch.title}
                            className="w-10 h-10 rounded-full object-cover bg-zinc-800 shrink-0 border border-zinc-700/60"
                          />
                          <div className="space-y-0.5 min-w-0">
                            <span className="font-bold text-zinc-100 hover:text-indigo-400 transition-colors line-clamp-1">
                              {ch.title}
                            </span>
                            <span className="text-[11px] text-zinc-500 font-mono block">
                              {ch.handle}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className="py-3.5 px-4 text-right font-bold text-white font-mono">
                        {formatCompactNumber(ch.subscriberCount)}
                      </td>
                      <td className="py-3.5 px-4 text-right text-zinc-300 font-mono">
                        {formatCompactNumber(ch.viewCount)}
                      </td>
                      <td className="py-3.5 px-4 text-right text-zinc-300 font-mono">
                        {formatNumber(ch.videoCount)}
                      </td>
                      <td className="py-3.5 px-4 text-right text-indigo-300 font-mono font-semibold">
                        {formatCompactNumber(ch.avgViews)}
                      </td>
                      <td className="py-3.5 px-4 text-center">
                        <Badge variant={getSizeBadgeColor(ch.sizeClass) as any} size="sm">
                          {ch.sizeClass}
                        </Badge>
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <button
                          onClick={() => onSelectChannel(ch.handle || ch.id)}
                          className="px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-indigo-600 text-zinc-200 hover:text-white font-medium text-xs transition-colors inline-flex items-center gap-1 cursor-pointer"
                        >
                          <BarChart3 className="w-3 h-3" />
                          <span>Analyse</span>
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
