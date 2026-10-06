import React, { useState, useEffect } from 'react';
import { Navbar } from './components/layout/Navbar';
import { SearchHero } from './components/search/SearchHero';
import { ChannelWorkspace } from './components/channel/ChannelWorkspace';
import { NicheExplorer } from './components/niche/NicheExplorer';
import { ChannelComparison } from './components/compare/ChannelComparison';
import { ApiKeyModal } from './components/ui/ApiKeyModal';
import {
  ChannelAnalyticsResponse,
  NicheExplorerResponse,
  NicheChannel,
  VideoCategory,
  ApiStatus
} from './types/youtube';
import { AlertTriangle, RefreshCw, Sparkles, ExternalLink } from 'lucide-react';

export function App() {
  const [currentView, setCurrentView] = useState<'discover' | 'channel' | 'niche' | 'compare'>('discover');
  const [selectedRegion, setSelectedRegion] = useState<string>('US');
  const [analytics, setAnalytics] = useState<ChannelAnalyticsResponse | null>(null);
  const [nicheData, setNicheData] = useState<NicheExplorerResponse | null>(null);
  const [comparisonChannels, setComparisonChannels] = useState<NicheChannel[]>([]);
  const [categories, setCategories] = useState<VideoCategory[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isGeneratingAI, setIsGeneratingAI] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [apiStatus, setApiStatus] = useState<ApiStatus | null>(null);
  const [isApiKeyModalOpen, setIsApiKeyModalOpen] = useState<boolean>(false);
  const [isDark, setIsDark] = useState<boolean>(true);

  // Initial load: fetch health and video categories
  useEffect(() => {
    fetchHealthStatus();
    loadCategories(selectedRegion);
  }, []);

  // Update categories when region changes
  useEffect(() => {
    loadCategories(selectedRegion);
  }, [selectedRegion]);

  const fetchHealthStatus = async () => {
    try {
      const res = await fetch('/api/health');
      if (res.ok) {
        const data = await res.json();
        setApiStatus(data);
        if (data.defaultRegion) {
          setSelectedRegion(data.defaultRegion);
        }
      }
    } catch (e) {
      console.warn('Could not fetch API health status:', e);
    }
  };

  const loadCategories = async (region: string) => {
    try {
      const res = await fetch(`/api/youtube/categories?regionCode=${region}`);
      if (res.ok) {
        const data = await res.json();
        setCategories(data);
      }
    } catch (e) {
      console.warn('Failed to load categories:', e);
    }
  };

  // Search routing
  const handleSearch = async (
    query: string,
    mode: 'channel' | 'niche' | 'category',
    categoryId?: string
  ) => {
    setError(null);
    setIsLoading(true);

    try {
      if (mode === 'channel') {
        const res = await fetch(`/api/youtube/channel?query=${encodeURIComponent(query)}`);
        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.error || 'Failed to resolve YouTube channel.');
        }
        setAnalytics(data);
        setCurrentView('channel');
      } else {
        // Niche or category search
        let url = `/api/youtube/niche?regionCode=${selectedRegion}`;
        if (query) url += `&query=${encodeURIComponent(query)}`;
        if (categoryId) url += `&categoryId=${encodeURIComponent(categoryId)}`;

        const res = await fetch(url);
        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.error || 'Failed to search niche.');
        }
        setNicheData(data);
        setCurrentView('niche');
      }
    } catch (err: any) {
      console.error('Search error:', err);
      setError(err.message || 'An unexpected error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  // Quick search handler (from navbar or presets)
  const handleQuickSearch = (query: string) => {
    const trimmed = query.trim();
    if (trimmed.startsWith('@') || trimmed.includes('youtube.com') || trimmed.startsWith('UC')) {
      handleSearch(trimmed, 'channel');
    } else if (trimmed.toLowerCase().includes('software') || trimmed.toLowerCase().includes('agent') || trimmed.toLowerCase().includes('finance')) {
      handleSearch(trimmed, 'niche');
    } else {
      // Default to channel resolution first
      handleSearch(trimmed, 'channel');
    }
  };

  // Generate / Refresh AI Analysis
  const handleRefreshAI = async () => {
    if (!analytics) return;
    setIsGeneratingAI(true);
    setError(null);

    try {
      const res = await fetch('/api/ai/analyse', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ analytics })
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to generate AI report.');
      }
      setAnalytics({
        ...analytics,
        aiInsight: data
      });
    } catch (err: any) {
      console.error('AI generation error:', err);
      setError(err.message || 'Failed to run Gemini AI analysis.');
    } finally {
      setIsGeneratingAI(false);
    }
  };

  const handleStartComparison = (channels: NicheChannel[]) => {
    setComparisonChannels(channels);
    setCurrentView('compare');
  };

  const handleRemoveCompareChannel = (id: string) => {
    const updated = comparisonChannels.filter((c) => c.id !== id);
    setComparisonChannels(updated);
    if (updated.length < 2) {
      setCurrentView('niche');
    }
  };

  return (
    <div className={`min-h-screen ${isDark ? 'bg-zinc-950 text-zinc-100' : 'bg-zinc-50 text-zinc-900'} font-['Plus_Jakarta_Sans'] antialiased flex flex-col selection:bg-indigo-500/30 selection:text-indigo-200`}>
      {/* Top Navbar */}
      <Navbar
        currentView={currentView}
        onNavigate={setCurrentView}
        selectedRegion={selectedRegion}
        onSelectRegion={setSelectedRegion}
        onQuickSearch={handleQuickSearch}
        apiStatus={apiStatus}
        onOpenApiModal={() => setIsApiKeyModalOpen(true)}
        isDark={isDark}
        onToggleTheme={() => setIsDark(!isDark)}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Error Notification Banner */}
        {error && (
          <div className="mb-6 p-4 rounded-xl bg-rose-500/10 border border-rose-500/25 flex items-start justify-between gap-3 text-xs text-rose-300 animate-in fade-in">
            <div className="flex items-start gap-2.5">
              <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
              <div className="space-y-1">
                <span className="font-bold text-white">Market Query Notice</span>
                <p className="leading-relaxed">{error}</p>
              </div>
            </div>
            <button
              onClick={() => setError(null)}
              className="text-rose-400 hover:text-white px-2 py-1 rounded bg-rose-950/40 border border-rose-800 shrink-0 cursor-pointer"
            >
              Dismiss
            </button>
          </div>
        )}

        {/* Global Loading State */}
        {isLoading && (
          <div className="py-24 flex flex-col items-center justify-center space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-indigo-600/15 border border-indigo-500/30 flex items-center justify-center animate-pulse">
              <RefreshCw className="w-6 h-6 text-indigo-400 animate-spin" />
            </div>
            <div className="text-center space-y-1">
              <h3 className="text-base font-bold text-white font-['Plus_Jakarta_Sans']">
                Querying YouTube Intelligence Engine...
              </h3>
              <p className="text-xs text-zinc-400">
                Retrieving channel metadata, batching video statistics, and computing baseline engagement metrics.
              </p>
            </div>
          </div>
        )}

        {/* Main View Router */}
        {!isLoading && (
          <>
            {currentView === 'discover' && (
              <SearchHero
                onSearch={handleSearch}
                categories={categories}
                isLoading={isLoading}
              />
            )}

            {currentView === 'channel' && analytics && (
              <ChannelWorkspace
                analytics={analytics}
                onRefreshAI={handleRefreshAI}
                isGeneratingAI={isGeneratingAI}
              />
            )}

            {currentView === 'channel' && !analytics && (
              <div className="py-16 text-center space-y-4">
                <h3 className="text-base font-bold text-white">No Channel Selected</h3>
                <p className="text-xs text-zinc-400 max-w-sm mx-auto">
                  Search for a YouTube channel by @handle, full URL, or name to launch the intelligence workspace.
                </p>
                <button
                  onClick={() => handleQuickSearch('@mkbhd')}
                  className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-md shadow-indigo-600/20 cursor-pointer"
                >
                  Load Sample Channel (@mkbhd)
                </button>
              </div>
            )}

            {currentView === 'niche' && (
              <NicheExplorer
                nicheData={nicheData}
                categories={categories}
                isLoading={isLoading}
                onSearchNiche={(q, catId) => handleSearch(q, catId ? 'category' : 'niche', catId)}
                onSelectChannel={(h) => handleSearch(h, 'channel')}
                onCompareChannels={handleStartComparison}
              />
            )}

            {currentView === 'compare' && (
              <ChannelComparison
                channels={comparisonChannels}
                onRemoveChannel={handleRemoveCompareChannel}
                onSelectChannel={(h) => handleSearch(h, 'channel')}
                onBackToExplorer={() => setCurrentView('niche')}
              />
            )}
          </>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-800/80 bg-zinc-950 py-8 text-xs text-zinc-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-extrabold text-white">Tube<span className="text-indigo-400">Intel</span></span>
            <span>&bull; Enterprise YouTube Market Research & Competitor Intelligence</span>
          </div>
          <div className="flex items-center gap-4 text-zinc-400">
            <span>Powered by YouTube Data API v3 & Google Gemini AI</span>
            <button
              onClick={() => setIsApiKeyModalOpen(true)}
              className="hover:text-zinc-200 underline cursor-pointer"
            >
              Credentials & Architecture
            </button>
          </div>
        </div>
      </footer>

      {/* API Key & Architecture Configuration Modal */}
      <ApiKeyModal
        isOpen={isApiKeyModalOpen}
        onClose={() => setIsApiKeyModalOpen(false)}
        status={apiStatus}
      />
    </div>
  );
}
export default App;
