import React from 'react';
import {
  GitCompare,
  Download,
  Users,
  Eye,
  Video,
  Flame,
  ThumbsUp,
  Calendar,
  Clock,
  DollarSign,
  ArrowRight,
  TrendingUp,
  X
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';
import { NicheChannel } from '../../types/youtube';
import { formatCompactNumber, formatNumber, formatCurrency } from '../../lib/calculations';
import { Badge } from '../ui/Badge';
import { Tooltip } from '../ui/Tooltip';

interface ChannelComparisonProps {
  channels: NicheChannel[];
  onRemoveChannel: (id: string) => void;
  onSelectChannel: (handleOrId: string) => void;
  onBackToExplorer: () => void;
}

export const ChannelComparison: React.FC<ChannelComparisonProps> = ({
  channels,
  onRemoveChannel,
  onSelectChannel,
  onBackToExplorer
}) => {
  // Chart Data: Subscribers & Views grouped
  const chartData = channels.map((c) => ({
    name: c.title.length > 15 ? c.title.substring(0, 15) + '...' : c.title,
    fullTitle: c.title,
    subscribers: c.subscriberCount,
    avgViews: c.avgViews,
    views: c.viewCount
  }));

  const handleExportCSV = () => {
    const headers = [
      'Channel Name',
      'Handle',
      'Subscribers',
      'Lifetime Views',
      'Public Videos',
      'Avg Views Per Video',
      'Engagement Rate (%)',
      'Size Classification'
    ];

    const rows = channels.map((c) => [
      `"${c.title.replace(/"/g, '""')}"`,
      `"${c.handle}"`,
      c.subscriberCount,
      c.viewCount,
      c.videoCount,
      c.avgViews,
      c.engagementRate,
      `"${c.sizeClass}"`
    ]);

    const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `tubeintel_channel_comparison_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Header & Export Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-zinc-900 border border-zinc-800">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-base font-bold text-white flex items-center gap-2 font-['Plus_Jakarta_Sans']">
              <GitCompare className="w-5 h-5 text-indigo-400" />
              Channel Competitor Benchmarking Matrix
            </span>
            <Badge variant="indigo" size="sm">
              {channels.length} Channels
            </Badge>
          </div>
          <p className="text-xs text-zinc-400">
            Head-to-head comparison across scale, audience engagement, view yield, and content efficiency.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onBackToExplorer}
            className="px-3.5 py-1.5 rounded-lg border border-zinc-800 text-xs font-medium text-zinc-300 hover:bg-zinc-800 transition-colors cursor-pointer"
          >
            &larr; Back to Explorer
          </button>
          <button
            onClick={handleExportCSV}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-md shadow-indigo-600/20 transition-all cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* Comparison Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        {channels.map((c) => (
          <div
            key={c.id}
            className="p-5 rounded-xl bg-zinc-900 border border-zinc-800/90 shadow-md flex flex-col justify-between space-y-4 relative group"
          >
            {channels.length > 2 && (
              <button
                onClick={() => onRemoveChannel(c.id)}
                className="absolute top-3 right-3 p-1 rounded-md text-zinc-500 hover:text-rose-400 hover:bg-zinc-800 transition-colors opacity-0 group-hover:opacity-100"
                title="Remove from comparison"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}

            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <img
                  src={c.thumbnail}
                  alt={c.title}
                  className="w-12 h-12 rounded-full object-cover border border-zinc-700 bg-zinc-800 shrink-0"
                />
                <div className="min-w-0 space-y-0.5">
                  <h4 className="text-sm font-bold text-zinc-100 line-clamp-1">{c.title}</h4>
                  <span className="text-xs text-zinc-500 font-mono block">{c.handle}</span>
                </div>
              </div>

              <div className="space-y-2 pt-2 border-t border-zinc-800/80 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-zinc-400">Subscribers:</span>
                  <span className="font-bold text-white font-mono">
                    {formatCompactNumber(c.subscriberCount)}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-zinc-400">Total Views:</span>
                  <span className="font-bold text-zinc-200 font-mono">
                    {formatCompactNumber(c.viewCount)}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-zinc-400">Public Videos:</span>
                  <span className="font-mono text-zinc-300">{formatNumber(c.videoCount)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-zinc-400">Avg Views/Video:</span>
                  <span className="font-bold text-indigo-400 font-mono">
                    {formatCompactNumber(c.avgViews)}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-zinc-400">Size Tier:</span>
                  <Badge variant="indigo" size="sm">
                    {c.sizeClass}
                  </Badge>
                </div>
              </div>
            </div>

            <button
              onClick={() => onSelectChannel(c.handle || c.id)}
              className="w-full py-2 rounded-lg bg-zinc-800 hover:bg-indigo-600 text-zinc-200 hover:text-white font-semibold text-xs transition-colors cursor-pointer flex items-center justify-center gap-1.5"
            >
              <span>Full Intelligence</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}
      </div>

      {/* Grouped Visual Benchmark Chart */}
      <div className="p-5 rounded-xl bg-zinc-900 border border-zinc-800 space-y-4">
        <div className="space-y-0.5">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-indigo-400" />
            Audience Scale vs Average Video Yield
          </h3>
          <p className="text-xs text-zinc-400">
            Comparing subscriber pool against average views generated per public video release
          </p>
        </div>

        <div className="h-72 w-full pt-4">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 10, right: 30, left: 20, bottom: 20 }}>
              <XAxis dataKey="name" stroke="#71717a" fontSize={11} />
              <YAxis
                tickFormatter={(v) => formatCompactNumber(v)}
                stroke="#71717a"
                fontSize={11}
              />
              <RechartsTooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    const data = payload[0].payload;
                    return (
                      <div className="bg-zinc-950 border border-zinc-800 p-3 rounded-xl shadow-xl text-xs space-y-1">
                        <p className="font-bold text-zinc-100">{data.fullTitle}</p>
                        <p className="text-indigo-400 font-mono">
                          Subscribers: {formatCompactNumber(data.subscribers)}
                        </p>
                        <p className="text-emerald-400 font-mono">
                          Avg Views / Video: {formatCompactNumber(data.avgViews)}
                        </p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
              <Bar dataKey="subscribers" name="Subscribers" fill="#6366f1" radius={[4, 4, 0, 0]} />
              <Bar dataKey="avgViews" name="Avg Views / Video" fill="#10b981" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Comprehensive Benchmark Comparison Matrix Table */}
      <div className="overflow-x-auto rounded-xl border border-zinc-800 bg-zinc-900/60 shadow-md">
        <table className="w-full text-left text-xs text-zinc-300">
          <thead className="bg-zinc-950/80 text-[11px] font-semibold text-zinc-400 uppercase tracking-wider border-b border-zinc-800">
            <tr>
              <th className="py-3.5 px-4">Metric Benchmark</th>
              {channels.map((c) => (
                <th key={c.id} className="py-3.5 px-4 text-right">
                  <div className="font-bold text-zinc-200">{c.title}</div>
                  <div className="text-[10px] text-zinc-500 font-mono font-normal">{c.handle}</div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-800/60 font-medium">
            <tr>
              <td className="py-3.5 px-4 text-zinc-400 flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5 text-indigo-400" /> Subscribers
              </td>
              {channels.map((c) => (
                <td key={c.id} className="py-3.5 px-4 text-right font-bold text-white font-mono">
                  {formatCompactNumber(c.subscriberCount)}
                </td>
              ))}
            </tr>
            <tr>
              <td className="py-3.5 px-4 text-zinc-400 flex items-center gap-1.5">
                <Eye className="w-3.5 h-3.5 text-indigo-400" /> Lifetime Views
              </td>
              {channels.map((c) => (
                <td key={c.id} className="py-3.5 px-4 text-right font-mono text-zinc-200">
                  {formatCompactNumber(c.viewCount)}
                </td>
              ))}
            </tr>
            <tr>
              <td className="py-3.5 px-4 text-zinc-400 flex items-center gap-1.5">
                <Video className="w-3.5 h-3.5 text-indigo-400" /> Public Videos
              </td>
              {channels.map((c) => (
                <td key={c.id} className="py-3.5 px-4 text-right font-mono text-zinc-300">
                  {formatNumber(c.videoCount)}
                </td>
              ))}
            </tr>
            <tr>
              <td className="py-3.5 px-4 text-zinc-400 flex items-center gap-1.5">
                <Flame className="w-3.5 h-3.5 text-indigo-400" /> Avg Views / Video
              </td>
              {channels.map((c) => (
                <td key={c.id} className="py-3.5 px-4 text-right font-bold text-indigo-300 font-mono">
                  {formatCompactNumber(c.avgViews)}
                </td>
              ))}
            </tr>
            <tr>
              <td className="py-3.5 px-4 text-zinc-400 flex items-center gap-1.5">
                <ThumbsUp className="w-3.5 h-3.5 text-indigo-400" /> Engagement Rate
              </td>
              {channels.map((c) => (
                <td key={c.id} className="py-3.5 px-4 text-right font-mono text-emerald-400 font-semibold">
                  {c.engagementRate}%
                </td>
              ))}
            </tr>
            <tr>
              <td className="py-3.5 px-4 text-zinc-400 flex items-center gap-1.5">
                <TrendingUp className="w-3.5 h-3.5 text-indigo-400" /> Size Classification
              </td>
              {channels.map((c) => (
                <td key={c.id} className="py-3.5 px-4 text-right">
                  <Badge variant="indigo" size="sm">
                    {c.sizeClass}
                  </Badge>
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};
