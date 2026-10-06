import React, { useState, useEffect } from 'react';
import {
  Search,
  Sparkles,
  TrendingUp,
  History,
  X,
  ArrowRight,
  Tv,
  Hash,
  Compass,
  FolderOpen
} from 'lucide-react';
import { VideoCategory } from '../../types/youtube';

interface SearchHeroProps {
  onSearch: (query: string, mode: 'channel' | 'niche' | 'category', categoryId?: string) => void;
  categories: VideoCategory[];
  isLoading: boolean;
}

interface RecentSearch {
  query: string;
  mode: 'channel' | 'niche' | 'category';
  timestamp: number;
}

const POPULAR_EXAMPLES = [
  { label: '@mkbhd', query: '@mkbhd', mode: 'channel' as const },
  { label: 'Veritasium', query: 'Veritasium', mode: 'channel' as const },
  { label: 'ERP Software', query: 'ERP Software', mode: 'niche' as const },
  { label: 'AI Agents', query: 'AI Agents', mode: 'niche' as const },
  { label: 'Tesla', query: 'Tesla', mode: 'channel' as const },
  { label: 'Digital Marketing', query: 'Digital Marketing', mode: 'niche' as const },
  { label: 'Personal Finance', query: 'Personal Finance', mode: 'niche' as const }
];

const DISCOVERY_NICHES = [
  { title: 'Artificial Intelligence', subtitle: 'Autonomous agents & LLM engineering', icon: Sparkles, query: 'AI Agents' },
  { title: 'ERP Software & SaaS', subtitle: 'Enterprise architecture & cloud software', icon: Tv, query: 'ERP Software' },
  { title: 'Personal Finance & Wealth', subtitle: 'Investing strategies & macroeconomics', icon: TrendingUp, query: 'Personal Finance' },
  { title: 'Consumer Hardware', subtitle: 'Smartphones, wearables & tech reviews', icon: Hash, query: '@mkbhd' },
  { title: 'Science & Education', subtitle: 'Deep research & conceptual breakthroughs', icon: Compass, query: 'Veritasium' },
  { title: 'B2B Growth & Marketing', subtitle: 'Lead acquisition & creator monetization', icon: FolderOpen, query: 'Digital Marketing' }
];

export const SearchHero: React.FC<SearchHeroProps> = ({
  onSearch,
  categories,
  isLoading
}) => {
  const [query, setQuery] = useState('');
  const [mode, setMode] = useState<'channel' | 'niche' | 'category'>('channel');
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>('');
  const [recentSearches, setRecentSearches] = useState<RecentSearch[]>([]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem('tubeintel_recent_searches');
      if (stored) {
        setRecentSearches(JSON.parse(stored).slice(0, 6));
      }
    } catch (e) {
      // Ignore storage errors
    }
  }, []);

  const saveRecentSearch = (q: string, m: 'channel' | 'niche' | 'category') => {
    try {
      const filtered = recentSearches.filter((item) => item.query.toLowerCase() !== q.toLowerCase());
      const updated: RecentSearch[] = [{ query: q, mode: m, timestamp: Date.now() }, ...filtered].slice(0, 6);
      setRecentSearches(updated);
      localStorage.setItem('tubeintel_recent_searches', JSON.stringify(updated));
    } catch (e) {
      // Ignore storage errors
    }
  };

  const removeRecentSearch = (e: React.MouseEvent, q: string) => {
    e.stopPropagation();
    try {
      const updated = recentSearches.filter((item) => item.query !== q);
      setRecentSearches(updated);
      localStorage.setItem('tubeintel_recent_searches', JSON.stringify(updated));
    } catch (e) {
      // Ignore storage errors
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (mode === 'category') {
      if (selectedCategoryId) {
        onSearch(query.trim(), 'category', selectedCategoryId);
        saveRecentSearch(`Category: ${categories.find(c => c.id === selectedCategoryId)?.title || selectedCategoryId}`, 'category');
      }
      return;
    }

    if (!query.trim()) return;
    saveRecentSearch(query.trim(), mode);
    onSearch(query.trim(), mode);
  };

  const handleExampleClick = (example: typeof POPULAR_EXAMPLES[0]) => {
    setQuery(example.query);
    setMode(example.mode);
    saveRecentSearch(example.query, example.mode);
    onSearch(example.query, example.mode);
  };

  return (
    <div className="relative py-12 md:py-16 overflow-hidden">
      {/* Background glow decoration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-indigo-500/10 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-6">
        {/* Subtitle pill */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-xs font-medium text-indigo-300">
          <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
          <span>YouTube Data API v3 & Gemini AI Market Intelligence</span>
        </div>

        {/* Hero Title */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight font-['Plus_Jakarta_Sans']">
          YouTube Market <span className="bg-gradient-to-r from-indigo-400 via-indigo-300 to-purple-400 bg-clip-text text-transparent">Intelligence</span>
        </h1>

        {/* Supporting Message */}
        <p className="text-base sm:text-lg text-zinc-300 max-w-2xl mx-auto font-normal leading-relaxed">
          Turn YouTube channels, videos and conversations into actionable market intelligence.
          Analyze baseline performance, audience pain points, monetization signals, and competitive opportunities.
        </p>

        {/* Search Mode Toggles */}
        <div className="inline-flex p-1 bg-zinc-900/90 border border-zinc-800 rounded-xl shadow-inner gap-1">
          <button
            type="button"
            onClick={() => setMode('channel')}
            className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              mode === 'channel'
                ? 'bg-indigo-600 text-white shadow-md'
                : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/60'
            }`}
          >
            Channel Research
          </button>
          <button
            type="button"
            onClick={() => setMode('niche')}
            className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              mode === 'niche'
                ? 'bg-indigo-600 text-white shadow-md'
                : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/60'
            }`}
          >
            Niche / Keyword
          </button>
          <button
            type="button"
            onClick={() => setMode('category')}
            className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              mode === 'category'
                ? 'bg-indigo-600 text-white shadow-md'
                : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/60'
            }`}
          >
            Video Category
          </button>
        </div>

        {/* Main Search Box */}
        <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
          <div className="relative flex items-center shadow-2xl rounded-2xl border border-zinc-700/80 bg-zinc-900/90 focus-within:border-indigo-500 focus-within:ring-2 focus-within:ring-indigo-500/20 transition-all p-1.5">
            <Search className="w-5 h-5 text-zinc-400 ml-3.5 shrink-0 pointer-events-none" />

            {mode === 'category' ? (
              <div className="flex-1 flex flex-col sm:flex-row gap-2 pl-3 pr-2">
                <select
                  value={selectedCategoryId}
                  onChange={(e) => setSelectedCategoryId(e.target.value)}
                  className="bg-zinc-800/80 text-zinc-200 text-sm py-2 px-3 rounded-lg border border-zinc-700 focus:outline-none focus:border-indigo-500 cursor-pointer"
                  required
                >
                  <option value="">Select YouTube Category...</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.title}
                    </option>
                  ))}
                </select>
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Optional keyword filter (e.g. ERP, AI)..."
                  className="flex-1 bg-transparent py-2 px-2 text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none"
                />
              </div>
            ) : (
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={
                  mode === 'channel'
                    ? 'Search channel, @handle, channel URL or Channel ID...'
                    : 'Search niche or commercial keyword (e.g. ERP Software, AI Agents)...'
                }
                className="w-full bg-transparent py-3.5 pl-3 pr-4 text-sm sm:text-base text-zinc-100 placeholder-zinc-500 focus:outline-none"
                required
              />
            )}

            <button
              type="submit"
              disabled={isLoading || (mode === 'category' && !selectedCategoryId)}
              className="px-5 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 active:scale-98 disabled:opacity-50 text-white font-medium text-xs sm:text-sm shadow-lg shadow-indigo-600/30 flex items-center gap-1.5 transition-all shrink-0 cursor-pointer"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Analyzing...</span>
                </>
              ) : (
                <>
                  <span>Analyse</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </form>

        {/* Examples */}
        <div className="flex flex-wrap items-center justify-center gap-1.5 text-xs">
          <span className="text-zinc-400 font-medium mr-1">Examples:</span>
          {POPULAR_EXAMPLES.map((ex) => (
            <button
              key={ex.label}
              onClick={() => handleExampleClick(ex)}
              className="px-2.5 py-1 rounded-md bg-zinc-900/80 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 hover:text-white transition-colors cursor-pointer"
            >
              {ex.label}
            </button>
          ))}
        </div>

        {/* Recent Searches */}
        {recentSearches.length > 0 && (
          <div className="pt-2 flex flex-wrap items-center justify-center gap-2 text-xs">
            <span className="text-zinc-400 flex items-center gap-1">
              <History className="w-3.5 h-3.5 text-zinc-400" /> Recent:
            </span>
            {recentSearches.map((item) => (
              <div
                key={item.query}
                onClick={() => {
                  setQuery(item.query);
                  setMode(item.mode);
                  onSearch(item.query, item.mode);
                }}
                className="group flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-zinc-900 border border-zinc-800/80 text-zinc-300 hover:border-zinc-700 hover:text-zinc-100 cursor-pointer transition-colors"
              >
                <span>{item.query}</span>
                <button
                  onClick={(e) => removeRecentSearch(e, item.query)}
                  className="opacity-0 group-hover:opacity-100 hover:text-rose-400 transition-opacity p-0.5"
                  title="Remove"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            ))}
          </div>
        )}

        {/* First-Run Experience Grid */}
        <div className="pt-10 max-w-4xl mx-auto text-left">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
              Curated Market Intelligence Niches
            </h3>
            <span className="text-[11px] text-zinc-400">1-click automated market scan</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {DISCOVERY_NICHES.map((niche) => {
              const Icon = niche.icon;
              return (
                <div
                  key={niche.title}
                  onClick={() => {
                    setQuery(niche.query);
                    const isChan = niche.query.startsWith('@') || niche.query === 'Veritasium';
                    const targetMode = isChan ? 'channel' : 'niche';
                    setMode(targetMode);
                    saveRecentSearch(niche.query, targetMode);
                    onSearch(niche.query, targetMode);
                  }}
                  className="p-4 rounded-xl bg-zinc-900/60 hover:bg-zinc-850/80 border border-zinc-800 hover:border-zinc-700 transition-all cursor-pointer group space-y-1.5"
                >
                  <div className="flex items-center justify-between">
                    <Icon className="w-4 h-4 text-indigo-400 group-hover:scale-110 transition-transform" />
                    <ArrowRight className="w-3.5 h-3.5 text-zinc-400 group-hover:text-zinc-200 group-hover:translate-x-0.5 transition-all" />
                  </div>
                  <h4 className="text-sm font-semibold text-zinc-100 group-hover:text-white">
                    {niche.title}
                  </h4>
                  <p className="text-xs text-zinc-400 leading-snug">
                    {niche.subtitle}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
