import React, { useState } from 'react';
import {
  Search,
  Globe,
  Sun,
  Moon,
  Zap,
  BarChart3,
  Layers,
  Sparkles,
  GitCompare,
  SlidersHorizontal
} from 'lucide-react';
import { ApiStatus } from '../../types/youtube';

interface NavbarProps {
  currentView: 'discover' | 'channel' | 'niche' | 'compare';
  onNavigate: (view: 'discover' | 'channel' | 'niche' | 'compare') => void;
  selectedRegion: string;
  onSelectRegion: (region: string) => void;
  onQuickSearch: (query: string) => void;
  apiStatus: ApiStatus | null;
  onOpenApiModal: () => void;
  isDark: boolean;
  onToggleTheme: () => void;
}

export const REGIONS = [
  { code: 'US', name: 'United States (Global)' },
  { code: 'SG', name: 'Singapore' },
  { code: 'GB', name: 'United Kingdom' },
  { code: 'AU', name: 'Australia' },
  { code: 'IN', name: 'India' },
  { code: 'ID', name: 'Indonesia' },
  { code: 'MY', name: 'Malaysia' },
  { code: 'CA', name: 'Canada' },
  { code: 'DE', name: 'Germany' },
  { code: 'JP', name: 'Japan' }
];

export const Navbar: React.FC<NavbarProps> = ({
  currentView,
  onNavigate,
  selectedRegion,
  onSelectRegion,
  onQuickSearch,
  apiStatus,
  onOpenApiModal,
  isDark,
  onToggleTheme
}) => {
  const [navSearch, setNavSearch] = useState('');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (navSearch.trim()) {
      onQuickSearch(navSearch.trim());
      setNavSearch('');
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-zinc-800/80 bg-zinc-950/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Brand */}
        <div className="flex items-center gap-6">
          <button
            onClick={() => onNavigate('discover')}
            className="flex items-center gap-2.5 text-left group cursor-pointer"
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 via-indigo-600 to-purple-600 flex items-center justify-center shadow-md shadow-indigo-500/20 group-hover:scale-105 transition-transform">
              <Zap className="w-4 h-4 text-white fill-white" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-base font-extrabold tracking-tight text-white font-['Plus_Jakarta_Sans']">
                  Tube<span className="text-indigo-400">Intel</span>
                </span>
                <span className="text-[10px] font-semibold uppercase tracking-wider px-1.5 py-0.5 rounded bg-indigo-500/15 text-indigo-300 border border-indigo-500/30">
                  SaaS
                </span>
              </div>
              <p className="text-[10px] text-zinc-400 font-medium hidden sm:block">
                YouTube Market Intelligence
              </p>
            </div>
          </button>

          {/* Primary Navigation Tabs */}
          <nav className="hidden md:flex items-center gap-1">
            <button
              onClick={() => onNavigate('discover')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer flex items-center gap-1.5 ${
                currentView === 'discover'
                  ? 'bg-zinc-800 text-white font-semibold'
                  : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-850'
              }`}
            >
              <Search className="w-3.5 h-3.5" />
              Discover
            </button>
            <button
              onClick={() => onNavigate('channel')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer flex items-center gap-1.5 ${
                currentView === 'channel'
                  ? 'bg-zinc-800 text-white font-semibold'
                  : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-850'
              }`}
            >
              <BarChart3 className="w-3.5 h-3.5" />
              Channel Workspace
            </button>
            <button
              onClick={() => onNavigate('niche')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer flex items-center gap-1.5 ${
                currentView === 'niche'
                  ? 'bg-zinc-800 text-white font-semibold'
                  : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-850'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              Niche Explorer
            </button>
            <button
              onClick={() => onNavigate('compare')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer flex items-center gap-1.5 ${
                currentView === 'compare'
                  ? 'bg-zinc-800 text-white font-semibold'
                  : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-850'
              }`}
            >
              <GitCompare className="w-3.5 h-3.5" />
              Compare
            </button>
          </nav>
        </div>

        {/* Quick Search */}
        <form onSubmit={handleSearchSubmit} className="hidden lg:flex items-center flex-1 max-w-sm mx-4">
          <div className="relative w-full">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none" />
            <input
              type="text"
              value={navSearch}
              onChange={(e) => setNavSearch(e.target.value)}
              placeholder="Jump to @handle, URL or niche..."
              className="w-full bg-zinc-900/80 border border-zinc-800 hover:border-zinc-700 focus:border-indigo-500 rounded-lg pl-8 pr-3 py-1.5 text-xs text-zinc-200 placeholder-zinc-500 focus:outline-none transition-colors"
            />
          </div>
        </form>

        {/* Right Controls */}
        <div className="flex items-center gap-2.5">
          {/* Region Selector */}
          <div className="relative flex items-center">
            <Globe className="w-3.5 h-3.5 absolute left-2.5 text-zinc-400 pointer-events-none" />
            <select
              value={selectedRegion}
              onChange={(e) => onSelectRegion(e.target.value)}
              className="bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-zinc-300 text-xs rounded-lg pl-8 pr-3 py-1.5 focus:outline-none focus:border-indigo-500 appearance-none cursor-pointer transition-colors"
            >
              {REGIONS.map((r) => (
                <option key={r.code} value={r.code} className="bg-zinc-900 text-zinc-200">
                  {r.name}
                </option>
              ))}
            </select>
          </div>

          {/* API Status Button */}
          <button
            onClick={onOpenApiModal}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border text-xs font-medium transition-colors cursor-pointer bg-zinc-900 hover:bg-zinc-850 border-zinc-800 text-zinc-300"
            title="Inspect API and Environment status"
          >
            <span
              className={`w-2 h-2 rounded-full ${
                apiStatus?.hasYouTubeKey ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'
              }`}
            />
            <span className="hidden sm:inline">
              {apiStatus?.hasYouTubeKey ? 'Live API' : 'Demo Mode'}
            </span>
            <SlidersHorizontal className="w-3 h-3 text-zinc-400" />
          </button>

          {/* Dark / Light Toggle */}
          <button
            onClick={onToggleTheme}
            className="p-1.5 rounded-lg border border-zinc-800 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900 transition-colors cursor-pointer"
            aria-label="Toggle Theme"
          >
            {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
        </div>
      </div>
    </header>
  );
};
