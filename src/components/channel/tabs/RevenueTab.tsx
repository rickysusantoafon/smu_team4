import React, { useState } from 'react';
import {
  DollarSign,
  TrendingUp,
  Sliders,
  ShieldCheck,
  CheckCircle,
  HelpCircle,
  ExternalLink,
  Info,
  Lock,
  Sparkles,
  PieChart,
  ShoppingBag,
  Share2,
  Tag,
  Users,
  Compass
} from 'lucide-react';
import { ChannelAnalyticsResponse, RevenueStreamStatus } from '../../../types/youtube';
import { formatCurrency, formatCompactNumber } from '../../../lib/calculations';
import { Tooltip } from '../../ui/Tooltip';
import { Badge } from '../../ui/Badge';

interface RevenueTabProps {
  analytics: ChannelAnalyticsResponse;
}

export const RevenueTab: React.FC<RevenueTabProps> = ({ analytics }) => {
  const { channel, calculations, revenueEstimates } = analytics;

  // Editable RPM scenarios state
  const [lowRpm, setLowRpm] = useState<number>(revenueEstimates.lowRpm || 1.5);
  const [baseRpm, setBaseRpm] = useState<number>(revenueEstimates.baseRpm || 4.0);
  const [highRpm, setHighRpm] = useState<number>(revenueEstimates.highRpm || 8.5);

  // Estimated 30-day view baseline:
  // (average recent views * monthly upload frequency) or default 1M
  const monthlyViewsEstimate = Math.max(
    10000,
    Math.round(calculations.sampledRecentAvgViews * calculations.uploadFrequencyMonthly)
  );

  // Recalculated instant estimates based on current slider values
  const monthlyLow = Math.round((monthlyViewsEstimate / 1000) * lowRpm);
  const monthlyBase = Math.round((monthlyViewsEstimate / 1000) * baseRpm);
  const monthlyHigh = Math.round((monthlyViewsEstimate / 1000) * highRpm);

  const annualLow = monthlyLow * 12;
  const annualBase = monthlyBase * 12;
  const annualHigh = monthlyHigh * 12;

  const getStatusBadge = (status: RevenueStreamStatus) => {
    switch (status) {
      case 'confirmed':
        return (
          <Badge variant="emerald" size="sm">
            Confirmed Public Signal
          </Badge>
        );
      case 'likely':
        return (
          <Badge variant="blue" size="sm">
            Likely
          </Badge>
        );
      case 'possible':
        return (
          <Badge variant="amber" size="sm">
            Possible
          </Badge>
        );
      case 'no_evidence':
        return (
          <Badge variant="secondary" size="sm">
            No Evidence Found
          </Badge>
        );
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Transparency Disclaimer Banner */}
      <div className="p-4 rounded-xl bg-indigo-500/10 border border-indigo-500/25 flex items-start gap-3.5 text-xs text-indigo-200">
        <ShieldCheck className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <span className="font-bold text-white">
            Data Integrity & Methodology Transparency
          </span>
          <p className="text-zinc-300 leading-relaxed">
            The public YouTube Data API v3 does <strong>NOT</strong> provide private AdSense earnings, CPM, or net revenue for third-party channels.
            All monetary estimates displayed below are calculated mathematically from public view volume and customizable RPM assumptions. Observable revenue streams are audited from public description metadata and links.
          </p>
        </div>
      </div>

      {/* Primary Estimated Revenue Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Card 1: Estimated Monthly Ad Revenue */}
        <div className="p-5 rounded-xl bg-zinc-900 border border-zinc-800 space-y-2 relative overflow-hidden">
          <div className="flex items-center justify-between text-zinc-400">
            <span className="text-xs font-semibold uppercase tracking-wider text-zinc-300">
              Estimated Monthly Ad Revenue
            </span>
            <Tooltip content="Calculated Formula: (Estimated 30-Day Views ÷ 1,000) × RPM. Based on public view volume. Not confirmed channel revenue.">
              <DollarSign className="w-3.5 h-3.5 text-zinc-500" />
            </Tooltip>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-white">
            {formatCurrency(monthlyLow)} – {formatCurrency(monthlyHigh)}
          </div>
          <div className="text-xs text-indigo-300 font-medium">
            Base Scenario: <strong>{formatCurrency(monthlyBase)} / month</strong>
          </div>
          <div className="text-[10px] text-zinc-500 pt-1 font-mono">
            Assumes ~{formatCompactNumber(monthlyViewsEstimate)} monthly catalog views
          </div>
        </div>

        {/* Card 2: Estimated Annualized Ad Revenue */}
        <div className="p-5 rounded-xl bg-zinc-900 border border-zinc-800 space-y-2">
          <div className="flex items-center justify-between text-zinc-400">
            <span className="text-xs font-semibold uppercase tracking-wider text-zinc-300">
              Estimated Annualized Ad Revenue
            </span>
            <Tooltip content="Estimated Monthly Ad Revenue × 12. Public estimate range under consistent publishing velocity.">
              <TrendingUp className="w-3.5 h-3.5 text-zinc-500" />
            </Tooltip>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-white">
            {formatCurrency(annualLow)} – {formatCurrency(annualHigh)}
          </div>
          <div className="text-xs text-indigo-300 font-medium">
            Base Scenario: <strong>{formatCurrency(annualBase)} / year</strong>
          </div>
          <div className="text-[10px] text-zinc-500 pt-1 font-mono">
            Run-rate based on current publishing cadence
          </div>
        </div>

        {/* Card 3: Monetization Diversification Score */}
        <div className="p-5 rounded-xl bg-zinc-900 border border-emerald-500/20 space-y-2">
          <div className="flex items-center justify-between text-zinc-400">
            <span className="text-xs font-semibold uppercase tracking-wider text-emerald-300">
              Diversification Score
            </span>
            <Tooltip content="Assessment of observed revenue streams beyond pure YouTube AdSense (Sponsorships, Affiliates, Merch, Memberships, Courses).">
              <PieChart className="w-3.5 h-3.5 text-emerald-400" />
            </Tooltip>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-emerald-400">
            {revenueEstimates.diversificationScore} / 100
          </div>
          <div className="text-xs text-zinc-300">
            Multiple active commercial channels buffering AdSense volatility
          </div>
          <div className="text-[10px] text-zinc-500 pt-1">
            Audited from public links & descriptions
          </div>
        </div>
      </div>

      {/* Editable Scenario Panel */}
      <div className="p-5 rounded-xl bg-zinc-900 border border-zinc-800 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-zinc-800 pb-3">
          <div className="space-y-0.5">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Sliders className="w-4 h-4 text-indigo-400" />
              Interactive RPM Scenario Configurator
            </h3>
            <p className="text-xs text-zinc-400">
              Adjust assumed Revenue Per Mille (RPM in USD per 1,000 views) to recalculate projections immediately
            </p>
          </div>
          <div className="text-xs font-mono bg-zinc-950 px-2.5 py-1 rounded border border-zinc-800 text-zinc-300">
            Estimated Revenue = (Estimated Views &divide; 1,000) &times; RPM
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-1">
          {/* Low RPM Slider */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-zinc-400 font-medium">Low RPM Scenario (Off-Peak / Broad):</span>
              <span className="font-mono font-bold text-white">${lowRpm.toFixed(2)}</span>
            </div>
            <input
              type="range"
              min="0.5"
              max="5.0"
              step="0.1"
              value={lowRpm}
              onChange={(e) => setLowRpm(parseFloat(e.target.value))}
              className="w-full h-1.5 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
            />
            <div className="flex justify-between text-[10px] text-zinc-500 font-mono">
              <span>$0.50</span>
              <span>Yield: {formatCurrency(monthlyLow)}/mo</span>
              <span>$5.00</span>
            </div>
          </div>

          {/* Base RPM Slider */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-indigo-300 font-semibold">Base RPM Scenario (Market Median):</span>
              <span className="font-mono font-bold text-indigo-300">${baseRpm.toFixed(2)}</span>
            </div>
            <input
              type="range"
              min="1.5"
              max="10.0"
              step="0.2"
              value={baseRpm}
              onChange={(e) => setBaseRpm(parseFloat(e.target.value))}
              className="w-full h-1.5 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
            />
            <div className="flex justify-between text-[10px] text-zinc-500 font-mono">
              <span>$1.50</span>
              <span>Yield: {formatCurrency(monthlyBase)}/mo</span>
              <span>$10.00</span>
            </div>
          </div>

          {/* High RPM Slider */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-zinc-400 font-medium">High RPM Scenario (Q4 Peak / Tier 1):</span>
              <span className="font-mono font-bold text-white">${highRpm.toFixed(2)}</span>
            </div>
            <input
              type="range"
              min="4.0"
              max="20.0"
              step="0.5"
              value={highRpm}
              onChange={(e) => setHighRpm(parseFloat(e.target.value))}
              className="w-full h-1.5 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
            />
            <div className="flex justify-between text-[10px] text-zinc-500 font-mono">
              <span>$4.00</span>
              <span>Yield: {formatCurrency(monthlyHigh)}/mo</span>
              <span>$20.00</span>
            </div>
          </div>
        </div>
      </div>

      {/* Observable Revenue Streams Analysis */}
      <div className="space-y-4">
        <div className="space-y-0.5">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <ShoppingBag className="w-4 h-4 text-indigo-400" />
            Publicly Observable Commercial Revenue Streams
          </h3>
          <p className="text-xs text-zinc-400">
            Detected and evaluated from video descriptions, sponsor disclosures, storefront redirects, and community links
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {revenueEstimates.streams.map((stream, idx) => (
            <div
              key={idx}
              className="p-4 rounded-xl bg-zinc-900 border border-zinc-800 space-y-2 text-xs"
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-zinc-100 text-sm">{stream.label}</span>
                {getStatusBadge(stream.status)}
              </div>
              <p className="text-zinc-300 text-[11px] leading-relaxed">
                {stream.details}
              </p>
              <div className="p-2.5 rounded-lg bg-zinc-950 border border-zinc-800/80 text-[11px] text-zinc-400">
                <strong className="text-zinc-300">Observed Signal:</strong> {stream.evidence}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Future-Ready Teaser: Connect My YouTube Channel */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-zinc-900 via-indigo-950/20 to-zinc-900 border border-indigo-500/20 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-indigo-300 font-bold text-sm">
            <Lock className="w-4 h-4 text-indigo-400" />
            <span>Connect My YouTube Channel (Future Authorized Mode)</span>
          </div>
          <p className="text-xs text-zinc-400 max-w-2xl leading-relaxed">
            Architected for upcoming YouTube Analytics API integration via Google OAuth. Connecting your owned channel will unlock verified CPM, playback-based CPM, actual estimated revenue, and gross transaction metrics directly from YouTube Analytics.
          </p>
        </div>
        <button
          disabled
          className="px-4 py-2.5 rounded-xl bg-zinc-800 text-zinc-400 text-xs font-semibold border border-zinc-700 cursor-not-allowed shrink-0"
        >
          Coming in Next Release
        </button>
      </div>
    </div>
  );
};
