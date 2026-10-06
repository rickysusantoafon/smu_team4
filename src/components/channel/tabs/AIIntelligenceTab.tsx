import React, { useState } from 'react';
import {
  Sparkles,
  RefreshCw,
  Copy,
  Check,
  ShieldCheck,
  AlertCircle,
  Lightbulb,
  Target,
  Clock,
  Compass,
  TrendingUp,
  DollarSign,
  ArrowRight,
  Flame
} from 'lucide-react';
import { ChannelAnalyticsResponse, AIIntelligenceReport } from '../../../types/youtube';
import { Badge } from '../../ui/Badge';
import { Tooltip } from '../../ui/Tooltip';

interface AIIntelligenceTabProps {
  analytics: ChannelAnalyticsResponse;
  onRefreshAI: () => Promise<void>;
  isGenerating: boolean;
}

export const AIIntelligenceTab: React.FC<AIIntelligenceTabProps> = ({
  analytics,
  onRefreshAI,
  isGenerating
}) => {
  const [copied, setCopied] = useState(false);
  const aiReport: AIIntelligenceReport | undefined = analytics.aiInsight;

  const handleCopyReport = () => {
    if (!aiReport) return;
    const textReport = `TUBEINTEL MARKET INTELLIGENCE REPORT
Target: ${analytics.channel.title} (${analytics.channel.handle})
Generated: ${new Date(aiReport.generatedAt).toLocaleDateString()}

1. EXECUTIVE SUMMARY
${aiReport.executiveSummary}

2. CHANNEL POSITIONING
${aiReport.channelPositioning}

3. PERFORMANCE ASSESSMENT
Strengths:
${aiReport.performanceAssessment.strengths.map((s) => `• ${s}`).join('\n')}
Weaknesses:
${aiReport.performanceAssessment.weaknesses.map((w) => `• ${w}`).join('\n')}

4. AUDIENCE INTELLIGENCE
${aiReport.audienceIntelligence.sentimentSummary}
Common Questions:
${aiReport.audienceIntelligence.coreQuestions.map((q) => `• ${q}`).join('\n')}

5. COMPETITIVE OPPORTUNITIES
${aiReport.competitiveOpportunities.map((c) => `• ${c}`).join('\n')}

6. RECOMMENDED CONTENT OPPORTUNITIES
${aiReport.contentOpportunities.map((o) => `[${o.priority}] ${o.opportunity} - Why: ${o.why} (Evidence: ${o.evidence})`).join('\n')}

7. ACTION PLAN
Immediate:
${aiReport.actionPlan.immediate.map((a) => `• ${a}`).join('\n')}
30 Days:
${aiReport.actionPlan.thirtyDays.map((a) => `• ${a}`).join('\n')}
90 Days:
${aiReport.actionPlan.ninetyDays.map((a) => `• ${a}`).join('\n')}
`;

    navigator.clipboard.writeText(textReport);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Action Bar & AI Governance */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-xl bg-zinc-900 border border-zinc-800">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-sm font-bold text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-indigo-400" />
              Gemini Market Intelligence Synthesis
            </span>
            <Badge variant="indigo" size="sm">
              Grounded in Fact JSON
            </Badge>
          </div>
          <p className="text-xs text-zinc-400">
            Synthesized exclusively from normalized YouTube API metrics, comment themes, and observable signals.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={onRefreshAI}
            disabled={isGenerating}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white text-xs font-semibold shadow-md shadow-indigo-600/20 transition-all cursor-pointer"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isGenerating ? 'animate-spin' : ''}`} />
            <span>{isGenerating ? 'Analyzing Data...' : aiReport ? 'Refresh AI Analysis' : 'Generate AI Analysis'}</span>
          </button>

          {aiReport && (
            <button
              onClick={handleCopyReport}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white text-xs font-medium border border-zinc-700 transition-colors cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400">Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy Report</span>
                </>
              )}
            </button>
          )}
        </div>
      </div>

      {/* Coverage & Confidence Badge Bar */}
      {aiReport && (
        <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 rounded-lg bg-zinc-950/80 border border-zinc-800/80 text-xs">
          <div className="flex flex-wrap items-center gap-4 text-zinc-400">
            <span>
              <strong>Coverage:</strong> {aiReport.dataCoverage.videosAnalysed} videos &bull; {aiReport.dataCoverage.commentsAnalysed} comments &bull; {aiReport.dataCoverage.playlistsAnalysed} playlists
            </span>
            <span className="text-zinc-600 hidden sm:inline">|</span>
            <span className="text-zinc-400">
              Confidence:{' '}
              <strong className="text-emerald-400">{aiReport.confidenceLevel}</strong>
            </span>
          </div>
          <span className="text-[11px] text-zinc-500 font-mono">
            Generated {new Date(aiReport.generatedAt).toLocaleTimeString()}
          </span>
        </div>
      )}

      {/* Main AI Report Content */}
      {aiReport ? (
        <div className="space-y-6">
          {/* Executive Summary */}
          <div className="p-6 rounded-2xl bg-zinc-900 border border-indigo-500/20 shadow-lg space-y-3">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-indigo-300 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
              Executive Summary
            </h3>
            <p className="text-sm sm:text-base text-zinc-200 leading-relaxed font-normal">
              {aiReport.executiveSummary}
            </p>
          </div>

          {/* Channel Positioning & Strategic Hook */}
          <div className="p-5 rounded-xl bg-zinc-900 border border-zinc-800 space-y-2 text-xs">
            <h4 className="font-bold text-zinc-200 text-sm flex items-center gap-2">
              <Target className="w-4 h-4 text-indigo-400" />
              Channel Editorial Positioning & Viewer Hook
            </h4>
            <p className="text-zinc-300 leading-relaxed text-xs">
              {aiReport.channelPositioning}
            </p>
          </div>

          {/* Performance Assessment Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-5 rounded-xl bg-zinc-900 border border-emerald-500/20 space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                Core Observed Strengths
              </h4>
              <ul className="space-y-2 text-xs text-zinc-300">
                {aiReport.performanceAssessment.strengths.map((s, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 shrink-0" />
                    <span>{s}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-5 rounded-xl bg-zinc-900 border border-amber-500/20 space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400">
                Vulnerabilities & Production Overhead
              </h4>
              <ul className="space-y-2 text-xs text-zinc-300">
                {aiReport.performanceAssessment.weaknesses.map((w, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1.5 shrink-0" />
                    <span>{w}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Content Strategy Insights */}
          <div className="p-5 rounded-xl bg-zinc-900 border border-zinc-800 space-y-4">
            <h4 className="text-sm font-bold text-white flex items-center gap-2">
              <Compass className="w-4 h-4 text-indigo-400" />
              Content Strategy Breakdown
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
              <div className="p-3.5 rounded-lg bg-zinc-950 border border-zinc-800 space-y-1.5">
                <span className="font-semibold text-indigo-300">Winning Themes</span>
                <ul className="space-y-1 text-zinc-300">
                  {aiReport.contentStrategy.winningThemes.map((t, idx) => (
                    <li key={idx}>&bull; {t}</li>
                  ))}
                </ul>
              </div>

              <div className="p-3.5 rounded-lg bg-zinc-950 border border-zinc-800 space-y-1.5">
                <span className="font-semibold text-indigo-300">Dominant Formats</span>
                <ul className="space-y-1 text-zinc-300">
                  {aiReport.contentStrategy.formats.map((f, idx) => (
                    <li key={idx}>&bull; {f}</li>
                  ))}
                </ul>
              </div>

              <div className="p-3.5 rounded-lg bg-zinc-950 border border-zinc-800 space-y-1.5">
                <span className="font-semibold text-indigo-300">Titling Strategy</span>
                <ul className="space-y-1 text-zinc-300">
                  {aiReport.contentStrategy.titleTactics.map((tt, idx) => (
                    <li key={idx}>&bull; {tt}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Competitive Opportunities (What competitors can do better) */}
          <div className="p-5 rounded-xl bg-zinc-900 border border-indigo-500/20 space-y-3">
            <h4 className="text-sm font-bold text-white flex items-center gap-2">
              <Lightbulb className="w-4 h-4 text-indigo-400" />
              Competitor Arbitrage: What a Competing Brand Can Exploit
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {aiReport.competitiveOpportunities.map((opp, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-lg bg-zinc-950/80 border border-zinc-800 text-xs text-zinc-300 leading-relaxed"
                >
                  <span className="font-bold text-indigo-400 block mb-1">Angle #{idx + 1}</span>
                  {opp}
                </div>
              ))}
            </div>
          </div>

          {/* Evidence-Based Content Opportunities Table */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white flex items-center gap-2">
              <Flame className="w-4 h-4 text-amber-400" />
              Evidence-Based Content Production Opportunities
            </h4>

            <div className="overflow-x-auto rounded-xl border border-zinc-800 bg-zinc-900/60 shadow-sm">
              <table className="w-full text-left text-xs text-zinc-300">
                <thead className="bg-zinc-950/80 text-[11px] font-semibold text-zinc-400 uppercase tracking-wider border-b border-zinc-800">
                  <tr>
                    <th className="py-3 px-4">Content Opportunity</th>
                    <th className="py-3 px-4">Strategic Rationale</th>
                    <th className="py-3 px-4">Audited Evidence</th>
                    <th className="py-3 px-4 text-right">Priority</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-800/60 font-medium">
                  {aiReport.contentOpportunities.map((co, idx) => (
                    <tr key={idx} className="hover:bg-zinc-800/40 transition-colors">
                      <td className="py-3 px-4 font-bold text-zinc-100 max-w-xs">
                        {co.opportunity}
                      </td>
                      <td className="py-3 px-4 text-zinc-300 max-w-xs leading-relaxed">
                        {co.why}
                      </td>
                      <td className="py-3 px-4 text-zinc-400 max-w-xs text-[11px] leading-relaxed">
                        {co.evidence}
                      </td>
                      <td className="py-3 px-4 text-right">
                        <Badge
                          variant={co.priority === 'High' ? 'rose' : co.priority === 'Medium' ? 'amber' : 'secondary'}
                          size="sm"
                        >
                          {co.priority} Priority
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Action Plan: Immediate, 30-Day, 90-Day */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white flex items-center gap-2">
              <Clock className="w-4 h-4 text-indigo-400" />
              Execution Roadmap
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
              {/* Immediate */}
              <div className="p-4 rounded-xl bg-zinc-900 border border-zinc-800 space-y-2">
                <span className="font-bold text-rose-400 flex items-center gap-1.5">
                  <ArrowRight className="w-3.5 h-3.5" /> Next 7 Days (Tactical)
                </span>
                <ul className="space-y-1.5 text-zinc-300">
                  {aiReport.actionPlan.immediate.map((a, idx) => (
                    <li key={idx}>&bull; {a}</li>
                  ))}
                </ul>
              </div>

              {/* 30 Days */}
              <div className="p-4 rounded-xl bg-zinc-900 border border-zinc-800 space-y-2">
                <span className="font-bold text-amber-400 flex items-center gap-1.5">
                  <ArrowRight className="w-3.5 h-3.5" /> Next 30 Days (Strategic)
                </span>
                <ul className="space-y-1.5 text-zinc-300">
                  {aiReport.actionPlan.thirtyDays.map((a, idx) => (
                    <li key={idx}>&bull; {a}</li>
                  ))}
                </ul>
              </div>

              {/* 90 Days */}
              <div className="p-4 rounded-xl bg-zinc-900 border border-zinc-800 space-y-2">
                <span className="font-bold text-indigo-400 flex items-center gap-1.5">
                  <ArrowRight className="w-3.5 h-3.5" /> Next 90 Days (Scaling)
                </span>
                <ul className="space-y-1.5 text-zinc-300">
                  {aiReport.actionPlan.ninetyDays.map((a, idx) => (
                    <li key={idx}>&bull; {a}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="p-12 text-center bg-zinc-900/60 border border-zinc-800 rounded-2xl space-y-4">
          <Sparkles className="w-8 h-8 text-indigo-400 mx-auto" />
          <div className="space-y-1">
            <h4 className="text-base font-bold text-white">Generate Full AI Market Narrative</h4>
            <p className="text-xs text-zinc-400 max-w-md mx-auto">
              Click below to initiate server-side Gemini 3.8 Flash analysis over the normalized YouTube data points.
            </p>
          </div>
          <button
            onClick={onRefreshAI}
            disabled={isGenerating}
            className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-lg shadow-indigo-600/30 transition-all cursor-pointer inline-flex items-center gap-2"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Generate Intelligence Report</span>
          </button>
        </div>
      )}
    </div>
  );
};
