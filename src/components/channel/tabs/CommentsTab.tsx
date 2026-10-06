import React, { useState } from 'react';
import {
  MessageSquare,
  ThumbsUp,
  Sparkles,
  HelpCircle,
  AlertTriangle,
  ShoppingCart,
  Calendar,
  Layers,
  Info,
  CheckCircle2
} from 'lucide-react';
import { CommentItem, ChannelAnalyticsResponse } from '../../../types/youtube';
import { formatCompactNumber } from '../../../lib/calculations';
import { Badge } from '../../ui/Badge';
import { Tooltip } from '../../ui/Tooltip';

interface CommentsTabProps {
  analytics: ChannelAnalyticsResponse;
}

export const CommentsTab: React.FC<CommentsTabProps> = ({ analytics }) => {
  const { commentsSample, audienceIntelligence } = analytics;
  const { sentiment, topics, questions, painPoints, commercialSignals } = audienceIntelligence;
  const [filterVideoId, setFilterVideoId] = useState<string>('all');

  const filteredComments = filterVideoId === 'all'
    ? commentsSample
    : commentsSample.filter((c) => c.videoId === filterVideoId);

  // Unique video titles in comments
  const uniqueVideos = Array.from(
    new Map(commentsSample.map((c) => [c.videoId, c.videoTitle || 'Video'])).entries()
  );

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Sample Size & AI Sentiment Banner */}
      <div className="p-5 rounded-xl bg-zinc-900 border border-zinc-800 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-zinc-800 pb-3">
          <div className="space-y-0.5">
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
                Audience Sentiment & Conversation Sample
              </span>
              <Badge variant="indigo" size="sm">
                AI-Classified Sentiment
              </Badge>
            </div>
            <p className="text-xs text-zinc-400">
              Based on <strong>{sentiment.sampleCount} public comments</strong> sampled across {uniqueVideos.length} top performing videos
            </p>
          </div>
          <div className="text-[11px] text-zinc-500 flex items-center gap-1">
            <Info className="w-3.5 h-3.5" />
            <span>Sentiment is inferred by AI analysis of public comments, not YouTube API directly.</span>
          </div>
        </div>

        {/* Sentiment Progress Bar & Numbers */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs font-bold">
            <span className="text-emerald-400">Positive: {sentiment.positive}%</span>
            <span className="text-zinc-300">Neutral / Inquisitive: {sentiment.neutral}%</span>
            <span className="text-rose-400">Critical / Pain Points: {sentiment.negative}%</span>
          </div>
          <div className="w-full h-3 rounded-full bg-zinc-800 overflow-hidden flex">
            <div
              style={{ width: `${sentiment.positive}%` }}
              className="bg-emerald-500 h-full transition-all"
              title={`Positive: ${sentiment.positive}%`}
            />
            <div
              style={{ width: `${sentiment.neutral}%` }}
              className="bg-zinc-500 h-full transition-all"
              title={`Neutral: ${sentiment.neutral}%`}
            />
            <div
              style={{ width: `${sentiment.negative}%` }}
              className="bg-rose-500 h-full transition-all"
              title={`Critical: ${sentiment.negative}%`}
            />
          </div>
        </div>
      </div>

      {/* Audience Topics & Recurring Discussion Themes */}
      <div className="space-y-4">
        <div className="space-y-0.5">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Layers className="w-4 h-4 text-indigo-400" />
            Audience Recurring Topics & Debate Themes
          </h3>
          <p className="text-xs text-zinc-400">
            Clustered conversational subjects identified across viewer comment responses
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {topics.map((t, idx) => (
            <div
              key={idx}
              className="p-4 rounded-xl bg-zinc-900 border border-zinc-800 space-y-2 text-xs"
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-zinc-100 text-sm">{t.topic}</span>
                <span className="text-xs font-mono text-zinc-400">{t.percentage}% of comments</span>
              </div>
              <div className="p-2.5 rounded-lg bg-zinc-950 border border-zinc-800/80 text-[11px] text-zinc-400 italic">
                "{t.exampleQuote}"
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Common Audience Questions & Pain Points Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Common Questions */}
        <div className="p-5 rounded-xl bg-zinc-900 border border-indigo-500/20 space-y-4">
          <div className="flex items-center gap-2 text-indigo-400 font-bold text-sm">
            <HelpCircle className="w-4 h-4" />
            <span>Frequent Audience Questions</span>
          </div>
          <div className="space-y-3">
            {questions.map((q, idx) => (
              <div key={idx} className="p-3 rounded-lg bg-zinc-950/70 border border-zinc-800 space-y-1 text-xs">
                <div className="flex items-center justify-between">
                  <Badge variant="blue" size="sm">{q.category}</Badge>
                  <span className="text-[10px] text-zinc-500 font-mono">Repeated ~{q.frequency}x</span>
                </div>
                <p className="font-medium text-zinc-200">{q.question}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Audience Pain Points */}
        <div className="p-5 rounded-xl bg-zinc-900 border border-rose-500/20 space-y-4">
          <div className="flex items-center gap-2 text-rose-400 font-bold text-sm">
            <AlertTriangle className="w-4 h-4" />
            <span>Audience Friction & Product Pain Points</span>
          </div>
          <div className="space-y-3">
            {painPoints.map((p, idx) => (
              <div key={idx} className="p-3 rounded-lg bg-zinc-950/70 border border-zinc-800 space-y-1 text-xs">
                <div className="flex items-center justify-between">
                  <Badge variant={p.severity === 'high' ? 'rose' : 'amber'} size="sm">
                    {p.severity.toUpperCase()} SEVERITY
                  </Badge>
                  <span className="text-[10px] text-zinc-500 font-mono">{p.mentions} mentions</span>
                </div>
                <p className="font-medium text-zinc-200">{p.issue}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Commercial & Purchase Intent Signals */}
      <div className="space-y-4">
        <div className="space-y-0.5">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <ShoppingCart className="w-4 h-4 text-emerald-400" />
            Commercial & Purchase Intention Signals
          </h3>
          <p className="text-xs text-zinc-400">
            Direct monetization and buyer conversion signals extracted from viewer statements
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {commercialSignals.map((cs, idx) => (
            <div
              key={idx}
              className="p-4 rounded-xl bg-zinc-900 border border-emerald-500/20 space-y-2.5 text-xs"
            >
              <div className="flex items-center justify-between">
                <Badge variant="emerald" size="sm">
                  {cs.intentType.replace('_', ' ').toUpperCase()}
                </Badge>
              </div>
              <h4 className="font-bold text-zinc-100">{cs.signal}</h4>
              <div className="p-2.5 rounded-lg bg-zinc-950 border border-zinc-800 text-[11px] text-zinc-400 italic">
                "{cs.evidenceQuote}"
              </div>
              <div className="text-[11px] text-emerald-300 font-medium">
                <strong>Strategic Opportunity:</strong> {cs.opportunity}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Public Sampled Comments Feed */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="space-y-0.5">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-indigo-400" />
              Public Comments Feed Sample ({filteredComments.length})
            </h3>
            <p className="text-xs text-zinc-400">
              Real viewer discussions sampled directly from YouTube Data API v3
            </p>
          </div>

          {/* Filter by Video */}
          {uniqueVideos.length > 1 && (
            <div className="flex items-center gap-2 text-xs">
              <span className="text-zinc-400">Filter video:</span>
              <select
                value={filterVideoId}
                onChange={(e) => setFilterVideoId(e.target.value)}
                className="bg-zinc-800 border border-zinc-700 text-zinc-200 text-xs rounded-lg px-2.5 py-1.5 focus:outline-none"
              >
                <option value="all">All Sampled Videos</option>
                {uniqueVideos.map(([vid, title]) => (
                  <option key={vid} value={vid}>
                    {title.length > 35 ? title.substring(0, 35) + '...' : title}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>

        <div className="space-y-3">
          {filteredComments.map((comment) => (
            <div
              key={comment.id}
              className="p-4 rounded-xl bg-zinc-900 border border-zinc-800 space-y-2 text-xs"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-indigo-900/60 border border-indigo-700/60 flex items-center justify-center font-bold text-[10px] text-indigo-200">
                    {comment.author.charAt(0).toUpperCase()}
                  </div>
                  <span className="font-semibold text-zinc-200">{comment.author}</span>
                  {comment.videoTitle && (
                    <span className="text-zinc-500 hidden sm:inline">&bull; on "{comment.videoTitle}"</span>
                  )}
                </div>
                <span className="text-zinc-500 font-mono text-[10px]">
                  {comment.publishedAt ? new Date(comment.publishedAt).toLocaleDateString() : ''}
                </span>
              </div>

              <p className="text-zinc-300 leading-relaxed pl-8">
                {comment.text}
              </p>

              <div className="flex items-center gap-4 pl-8 pt-1 text-[11px] text-zinc-400 font-mono">
                <span className="flex items-center gap-1">
                  <ThumbsUp className="w-3 h-3 text-zinc-500" />
                  {formatCompactNumber(comment.likeCount)} likes
                </span>
                {comment.replyCount > 0 && (
                  <span className="flex items-center gap-1 text-indigo-400">
                    <MessageSquare className="w-3 h-3" />
                    {comment.replyCount} replies
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
