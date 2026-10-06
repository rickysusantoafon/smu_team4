import React, { useState } from 'react';
import {
  ExternalLink,
  Calendar,
  MapPin,
  Users,
  Eye,
  Video,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  ShieldAlert,
  Info
} from 'lucide-react';
import { ChannelSummary } from '../../types/youtube';
import { Badge } from '../ui/Badge';
import { Tooltip } from '../ui/Tooltip';
import { formatCompactNumber, formatNumber } from '../../lib/calculations';

interface ChannelHeaderProps {
  channel: ChannelSummary;
  onOpenTransparencyModal?: () => void;
}

export const ChannelHeader: React.FC<ChannelHeaderProps> = ({ channel }) => {
  const [showFullDesc, setShowFullDesc] = useState(false);

  const formattedCreatedDate = channel.publishedAt
    ? new Date(channel.publishedAt).toLocaleDateString('en-US', {
        month: 'short',
        year: 'numeric'
      })
    : 'Unknown';

  const youtubeUrl = channel.customUrl || `https://youtube.com/channel/${channel.id}`;

  return (
    <div className="bg-zinc-900/80 border border-zinc-800/90 rounded-2xl p-6 sm:p-7 shadow-xl space-y-6">
      {/* Demo notification banner if demo dataset */}
      {channel.isDemoData && (
        <div className="flex items-center justify-between p-3 bg-amber-500/10 border border-amber-500/25 rounded-xl text-xs text-amber-300">
          <div className="flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 text-amber-400 shrink-0" />
            <span>
              <strong>Demo Data Mode Active:</strong> Showing verified sample analytics. To query live production channels via YouTube API, set <code className="bg-amber-950/60 px-1 py-0.5 rounded border border-amber-800">YOUTUBE_API_KEY</code> in server environment.
            </span>
          </div>
        </div>
      )}

      {/* Main Header Content */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-start gap-4 sm:gap-5">
          {/* Avatar Thumbnail */}
          <div className="relative shrink-0">
            <img
              src={channel.thumbnail || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=160&h=160&fit=crop'}
              alt={channel.title}
              className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl object-cover border-2 border-zinc-700/60 shadow-lg bg-zinc-800"
              onError={(e) => {
                // Fallback avatar if external image fails
                (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=160&h=160&fit=crop';
              }}
            />
            <div className="absolute -bottom-1 -right-1 bg-zinc-950 p-0.5 rounded-full">
              <CheckCircle2 className="w-5 h-5 text-indigo-400 fill-indigo-950" />
            </div>
          </div>

          {/* Details */}
          <div className="space-y-1.5">
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-bold text-white font-['Plus_Jakarta_Sans']">
                {channel.title}
              </h1>
              <span className="text-xs font-mono font-medium text-zinc-400 bg-zinc-800/80 px-2 py-0.5 rounded-md border border-zinc-700/60">
                {channel.handle}
              </span>
            </div>

            {/* Metadata Pills */}
            <div className="flex flex-wrap items-center gap-3 text-xs text-zinc-400">
              {channel.country && (
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-zinc-400" />
                  {channel.country}
                </span>
              )}
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-zinc-400" />
                Created {formattedCreatedDate}
              </span>
              <a
                href={youtubeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-indigo-400 hover:text-indigo-300 font-medium transition-colors"
              >
                <span>YouTube Profile</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>

            {/* Calculated Badges */}
            <div className="flex flex-wrap items-center gap-1.5 pt-1.5">
              {channel.badges.map((badge) => (
                <Tooltip key={badge.id} content={badge.description}>
                  <Badge variant={badge.variant} size="md">
                    {badge.label}
                  </Badge>
                </Tooltip>
              ))}
            </div>
          </div>
        </div>

        {/* Top-Level High Density Stat Pills */}
        <div className="grid grid-cols-3 gap-2 sm:gap-4 w-full md:w-auto shrink-0 bg-zinc-950/60 p-3 sm:p-4 rounded-xl border border-zinc-800">
          <div className="text-center px-2">
            <span className="text-[11px] font-medium text-zinc-400 uppercase tracking-wider flex items-center justify-center gap-1">
              <Users className="w-3 h-3" /> Subscribers
            </span>
            <div className="text-lg sm:text-xl font-bold text-white mt-0.5">
              {formatCompactNumber(channel.subscriberCount)}
            </div>
            <span className="text-[10px] text-zinc-400 font-mono">
              {formatNumber(channel.subscriberCount)}
            </span>
          </div>

          <div className="text-center px-2 border-x border-zinc-800/80">
            <span className="text-[11px] font-medium text-zinc-400 uppercase tracking-wider flex items-center justify-center gap-1">
              <Eye className="w-3 h-3" /> Total Views
            </span>
            <div className="text-lg sm:text-xl font-bold text-white mt-0.5">
              {formatCompactNumber(channel.viewCount)}
            </div>
            <span className="text-[10px] text-zinc-400 font-mono">
              {formatNumber(channel.viewCount)}
            </span>
          </div>

          <div className="text-center px-2">
            <span className="text-[11px] font-medium text-zinc-400 uppercase tracking-wider flex items-center justify-center gap-1">
              <Video className="w-3 h-3" /> Videos
            </span>
            <div className="text-lg sm:text-xl font-bold text-white mt-0.5">
              {formatCompactNumber(channel.videoCount)}
            </div>
            <span className="text-[10px] text-zinc-400 font-mono">
              {formatNumber(channel.videoCount)} public
            </span>
          </div>
        </div>
      </div>

      {/* Expandable Channel Description */}
      {channel.description && (
        <div className="pt-2 border-t border-zinc-800/80">
          <div className="text-xs text-zinc-400 leading-relaxed font-normal">
            <p className={showFullDesc ? '' : 'line-clamp-2'}>
              {channel.description}
            </p>
            {channel.description.length > 150 && (
              <button
                onClick={() => setShowFullDesc(!showFullDesc)}
                className="mt-1 text-xs text-indigo-400 hover:text-indigo-300 font-medium inline-flex items-center gap-1 cursor-pointer"
              >
                {showFullDesc ? (
                  <>
                    Show less <ChevronUp className="w-3 h-3" />
                  </>
                ) : (
                  <>
                    Read full description <ChevronDown className="w-3 h-3" />
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
