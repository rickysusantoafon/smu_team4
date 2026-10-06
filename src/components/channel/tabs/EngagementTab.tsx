import React from 'react';
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  ZAxis,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell
} from 'recharts';
import { ThumbsUp, MessageSquare, Eye, Sparkles, TrendingUp, Info } from 'lucide-react';
import { ChannelAnalyticsResponse, VideoItem } from '../../../types/youtube';
import { formatCompactNumber } from '../../../lib/calculations';
import { Tooltip } from '../../ui/Tooltip';
import { Badge } from '../../ui/Badge';

interface EngagementTabProps {
  analytics: ChannelAnalyticsResponse;
}

export const EngagementTab: React.FC<EngagementTabProps> = ({ analytics }) => {
  const { recentVideos, calculations } = analytics;

  // Scatter plot data: Views (X) vs Likes (Y) with Z = comments (bubble size)
  const scatterData = recentVideos.map((v) => ({
    id: v.id,
    title: v.title,
    views: v.views,
    likes: v.likes,
    comments: v.comments,
    engagementRate: v.engagementRate,
    publishedAt: v.publishedAt
  }));

  // Top videos by view volume for bar chart
  const top10Videos = [...recentVideos]
    .sort((a, b) => b.views - a.views)
    .slice(0, 8)
    .map((v) => ({
      name: v.title.length > 25 ? v.title.substring(0, 25) + '...' : v.title,
      fullTitle: v.title,
      views: v.views,
      likes: v.likes,
      comments: v.comments,
      engagementRate: v.engagementRate
    }));

  // Top comment magnets (videos driving disproportionately high discussion)
  const commentMagnets = [...recentVideos]
    .sort((a, b) => b.commentRate - a.commentRate)
    .slice(0, 4);

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* High-level Engagement Metrics Banner */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 rounded-xl bg-zinc-900 border border-zinc-800 space-y-1">
          <div className="text-xs font-semibold text-zinc-400 flex items-center justify-between">
            <span>Overall Engagement Rate</span>
            <Tooltip content="(Total Sampled Likes + Total Sampled Comments) / Total Sampled Views * 100">
              <Info className="w-3.5 h-3.5 text-zinc-500" />
            </Tooltip>
          </div>
          <div className="text-2xl font-extrabold text-emerald-400">
            {calculations.sampledEngagementRate.toFixed(2)}%
          </div>
          <div className="text-[11px] text-zinc-400">
            {calculations.sampledEngagementRate >= 3.5 ? 'Above typical industry median' : 'Within normal engagement corridor'}
          </div>
        </div>

        <div className="p-4 rounded-xl bg-zinc-900 border border-zinc-800 space-y-1">
          <div className="text-xs font-semibold text-zinc-400 flex items-center justify-between">
            <span>Like-to-View Rate</span>
            <Tooltip content="Total Sampled Likes / Total Sampled Views * 100">
              <ThumbsUp className="w-3.5 h-3.5 text-zinc-500" />
            </Tooltip>
          </div>
          <div className="text-2xl font-extrabold text-white">
            {calculations.sampledLikeToViewRate.toFixed(2)}%
          </div>
          <div className="text-[11px] text-zinc-400">
            ~{Math.round(calculations.sampledLikeToViewRate * 10)} likes per 1,000 views
          </div>
        </div>

        <div className="p-4 rounded-xl bg-zinc-900 border border-zinc-800 space-y-1">
          <div className="text-xs font-semibold text-zinc-400 flex items-center justify-between">
            <span>Comment-to-View Rate</span>
            <Tooltip content="Total Sampled Comments / Total Sampled Views * 100. Key signal for audience debate and algorithm distribution.">
              <MessageSquare className="w-3.5 h-3.5 text-zinc-500" />
            </Tooltip>
          </div>
          <div className="text-2xl font-extrabold text-indigo-400">
            {calculations.sampledCommentToViewRate.toFixed(2)}%
          </div>
          <div className="text-[11px] text-zinc-400">
            ~{Math.round(calculations.sampledCommentToViewRate * 10)} comments per 1,000 views
          </div>
        </div>
      </div>

      {/* Scatter Plot: Likes vs Views */}
      <div className="p-5 rounded-xl bg-zinc-900 border border-zinc-800 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="space-y-0.5">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-indigo-400" />
              Likes vs Views Engagement Distribution
            </h3>
            <p className="text-xs text-zinc-400">
              X Axis: Total Views &bull; Y Axis: Total Likes &bull; Bubble Size: Comment Volume
            </p>
          </div>
          <Badge variant="indigo" size="sm">
            Interactive Scatter Plot
          </Badge>
        </div>

        <div className="h-72 w-full pt-4">
          <ResponsiveContainer width="100%" height="100%">
            <ScatterChart margin={{ top: 10, right: 20, bottom: 20, left: 20 }}>
              <XAxis
                type="number"
                dataKey="views"
                name="Views"
                tickFormatter={(v) => formatCompactNumber(v)}
                stroke="#71717a"
                fontSize={11}
              />
              <YAxis
                type="number"
                dataKey="likes"
                name="Likes"
                tickFormatter={(v) => formatCompactNumber(v)}
                stroke="#71717a"
                fontSize={11}
              />
              <ZAxis type="number" dataKey="comments" range={[60, 400]} name="Comments" />
              <RechartsTooltip
                cursor={{ strokeDasharray: '3 3', stroke: '#52525b' }}
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    const data = payload[0].payload;
                    return (
                      <div className="bg-zinc-950 border border-zinc-800 p-3 rounded-xl shadow-xl max-w-xs text-xs space-y-1.5">
                        <p className="font-bold text-zinc-100 line-clamp-2">{data.title}</p>
                        <div className="space-y-0.5 text-zinc-400 font-mono text-[11px]">
                          <div>Views: {formatCompactNumber(data.views)}</div>
                          <div>Likes: {formatCompactNumber(data.likes)}</div>
                          <div>Comments: {formatCompactNumber(data.comments)}</div>
                          <div className="text-emerald-400 font-semibold">
                            Engagement: {data.engagementRate}%
                          </div>
                        </div>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Scatter name="Videos" data={scatterData} fill="#6366f1" opacity={0.8} />
            </ScatterChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Bar Chart: Views by Top Performing Videos */}
      <div className="p-5 rounded-xl bg-zinc-900 border border-zinc-800 space-y-4">
        <div className="space-y-0.5">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Eye className="w-4 h-4 text-indigo-400" />
            Top Performing Video Views Breakdown
          </h3>
          <p className="text-xs text-zinc-400">
            Top sampled videos ranked by cumulative public view count
          </p>
        </div>

        <div className="h-64 w-full pt-4">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={top10Videos} margin={{ top: 10, right: 20, bottom: 40, left: 20 }}>
              <XAxis
                dataKey="name"
                stroke="#71717a"
                fontSize={10}
                angle={-15}
                textAnchor="end"
                interval={0}
              />
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
                      <div className="bg-zinc-950 border border-zinc-800 p-3 rounded-xl shadow-xl max-w-xs text-xs space-y-1">
                        <p className="font-bold text-zinc-100">{data.fullTitle}</p>
                        <p className="text-white font-mono">{formatCompactNumber(data.views)} views</p>
                        <p className="text-emerald-400 font-mono">{data.engagementRate}% engagement</p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Bar dataKey="views" fill="#4f46e5" radius={[6, 6, 0, 0]}>
                {top10Videos.map((_, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={index === 0 ? '#818cf8' : '#4f46e5'}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Comment Magnets / Discussion Drivers */}
      <div className="space-y-4">
        <div className="space-y-0.5">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <MessageSquare className="w-4 h-4 text-indigo-400" />
            High Conversation & Discussion Drivers
          </h3>
          <p className="text-xs text-zinc-400">
            Videos generating the highest comment-to-view ratio in the sample
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {commentMagnets.map((v) => (
            <div
              key={v.id}
              className="p-4 rounded-xl bg-zinc-900 border border-zinc-800 flex gap-3 text-xs"
            >
              <img
                src={v.thumbnail}
                alt={v.title}
                className="w-20 h-14 rounded-lg object-cover bg-zinc-800 shrink-0"
              />
              <div className="space-y-1 flex-1 min-w-0">
                <h4 className="font-semibold text-zinc-100 line-clamp-1">{v.title}</h4>
                <div className="flex items-center gap-3 text-zinc-400 font-mono text-[11px]">
                  <span>{formatCompactNumber(v.comments)} comments</span>
                  <span className="text-indigo-400 font-bold">{v.commentRate}% comment rate</span>
                </div>
                <p className="text-[10px] text-zinc-500 line-clamp-1">
                  High discussion density signals audience debate or controversial angle.
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
