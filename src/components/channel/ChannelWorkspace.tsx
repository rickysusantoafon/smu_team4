import React, { useState } from 'react';
import {
  LayoutDashboard,
  Layers,
  Video,
  ThumbsUp,
  ListVideo,
  MessageSquare,
  DollarSign,
  Sparkles
} from 'lucide-react';
import { ChannelAnalyticsResponse } from '../../types/youtube';
import { ChannelHeader } from './ChannelHeader';
import { OverviewTab } from './tabs/OverviewTab';
import { ContentIntelligenceTab } from './tabs/ContentIntelligenceTab';
import { VideosTab } from './tabs/VideosTab';
import { EngagementTab } from './tabs/EngagementTab';
import { PlaylistsTab } from './tabs/PlaylistsTab';
import { CommentsTab } from './tabs/CommentsTab';
import { RevenueTab } from './tabs/RevenueTab';
import { AIIntelligenceTab } from './tabs/AIIntelligenceTab';

interface ChannelWorkspaceProps {
  analytics: ChannelAnalyticsResponse;
  onRefreshAI: () => Promise<void>;
  isGeneratingAI: boolean;
}

export type ChannelTabId =
  | 'overview'
  | 'content'
  | 'videos'
  | 'engagement'
  | 'playlists'
  | 'comments'
  | 'revenue'
  | 'ai';

export const ChannelWorkspace: React.FC<ChannelWorkspaceProps> = ({
  analytics,
  onRefreshAI,
  isGeneratingAI
}) => {
  const [activeTab, setActiveTab] = useState<ChannelTabId>('overview');

  const tabs = [
    { id: 'overview' as const, label: 'Overview', icon: LayoutDashboard },
    { id: 'content' as const, label: 'Content Intelligence', icon: Layers },
    { id: 'videos' as const, label: 'Videos', icon: Video },
    { id: 'engagement' as const, label: 'Engagement', icon: ThumbsUp },
    { id: 'playlists' as const, label: 'Playlists', icon: ListVideo },
    { id: 'comments' as const, label: 'Comments & Audience', icon: MessageSquare },
    { id: 'revenue' as const, label: 'Revenue Intelligence', icon: DollarSign },
    { id: 'ai' as const, label: 'AI Intelligence', icon: Sparkles }
  ];

  return (
    <div className="space-y-6 pb-16">
      {/* Channel Header Card */}
      <ChannelHeader channel={analytics.channel} />

      {/* Workspace Section Navigation Bar */}
      <div className="border-b border-zinc-800/80 bg-zinc-950/60 sticky top-16 z-30 backdrop-blur-sm -mx-4 px-4 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
        <div className="flex items-center gap-1 overflow-x-auto py-2.5 no-scrollbar">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 whitespace-nowrap transition-all cursor-pointer ${
                  isActive
                    ? 'bg-zinc-800 text-white shadow-sm border border-zinc-700/60'
                    : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900'
                }`}
              >
                <Icon
                  className={`w-3.5 h-3.5 ${
                    isActive ? 'text-indigo-400' : 'text-zinc-500'
                  }`}
                />
                <span>{tab.label}</span>
                {tab.id === 'ai' && analytics.aiInsight && (
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Active Tab Screen */}
      <div className="pt-2">
        {activeTab === 'overview' && (
          <OverviewTab analytics={analytics} onNavigateToTab={(t) => setActiveTab(t as any)} />
        )}
        {activeTab === 'content' && (
          <ContentIntelligenceTab analytics={analytics} />
        )}
        {activeTab === 'videos' && (
          <VideosTab
            videos={analytics.recentVideos}
            medianViews={analytics.calculations.sampledRecentMedianViews}
          />
        )}
        {activeTab === 'engagement' && (
          <EngagementTab analytics={analytics} />
        )}
        {activeTab === 'playlists' && (
          <PlaylistsTab
            playlists={analytics.playlists}
            channelTitle={analytics.channel.title}
          />
        )}
        {activeTab === 'comments' && (
          <CommentsTab analytics={analytics} />
        )}
        {activeTab === 'revenue' && (
          <RevenueTab analytics={analytics} />
        )}
        {activeTab === 'ai' && (
          <AIIntelligenceTab
            analytics={analytics}
            onRefreshAI={onRefreshAI}
            isGenerating={isGeneratingAI}
          />
        )}
      </div>
    </div>
  );
};
