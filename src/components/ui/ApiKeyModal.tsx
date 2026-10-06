import React from 'react';
import { Modal } from './Modal';
import { Key, CheckCircle2, AlertTriangle, ShieldCheck, Terminal, Server } from 'lucide-react';
import { ApiStatus } from '../../types/youtube';

interface ApiKeyModalProps {
  isOpen: boolean;
  onClose: () => void;
  status: ApiStatus | null;
}

export const ApiKeyModal: React.FC<ApiKeyModalProps> = ({ isOpen, onClose, status }) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="API Credentials & Server Configuration"
      subtitle="TubeIntel enforces zero client-side credential exposure"
      maxWidth="xl"
    >
      <div className="space-y-5 text-sm text-zinc-300">
        {/* Security Banner */}
        <div className="flex items-start gap-3 p-3.5 bg-indigo-500/10 border border-indigo-500/20 rounded-lg">
          <ShieldCheck className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
          <div className="text-xs space-y-1">
            <span className="font-semibold text-indigo-200">Strict Serverless Security Architecture</span>
            <p className="text-zinc-400 leading-relaxed">
              API credentials are NEVER loaded into browser JavaScript or exposed in client bundles. All requests to YouTube Data API v3 and Google Gemini AI execute exclusively through server-side route handlers.
            </p>
          </div>
        </div>

        {/* Current Status */}
        <div className="space-y-3">
          <h4 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">Active Credentials</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="p-3 bg-zinc-950/60 border border-zinc-800 rounded-lg flex items-start justify-between">
              <div className="space-y-1">
                <div className="flex items-center gap-1.5">
                  <Key className="w-3.5 h-3.5 text-zinc-400" />
                  <span className="font-mono text-xs font-semibold text-zinc-200">YOUTUBE_API_KEY</span>
                </div>
                <p className="text-[11px] text-zinc-400">YouTube Data API v3</p>
              </div>
              {status?.hasYouTubeKey ? (
                <span className="inline-flex items-center gap-1 text-[11px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20 font-medium">
                  <CheckCircle2 className="w-3 h-3" /> Configured
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 text-[11px] text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20 font-medium">
                  <AlertTriangle className="w-3 h-3" /> Demo Mode
                </span>
              )}
            </div>

            <div className="p-3 bg-zinc-950/60 border border-zinc-800 rounded-lg flex items-start justify-between">
              <div className="space-y-1">
                <div className="flex items-center gap-1.5">
                  <Key className="w-3.5 h-3.5 text-zinc-400" />
                  <span className="font-mono text-xs font-semibold text-zinc-200">GEMINI_API_KEY</span>
                </div>
                <p className="text-[11px] text-zinc-400">Gemini 3.8 Flash SDK</p>
              </div>
              {status?.hasGeminiKey ? (
                <span className="inline-flex items-center gap-1 text-[11px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20 font-medium">
                  <CheckCircle2 className="w-3 h-3" /> Configured
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 text-[11px] text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20 font-medium">
                  <AlertTriangle className="w-3 h-3" /> Pre-computed
                </span>
              )}
            </div>
          </div>
        </div>

        {/* How to configure */}
        <div className="space-y-3 pt-2">
          <h4 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider flex items-center gap-1.5">
            <Server className="w-3.5 h-3.5 text-zinc-400" />
            Configuring for Production (Vercel / Local)
          </h4>
          <div className="p-3.5 bg-zinc-950/90 border border-zinc-800 rounded-lg text-xs space-y-2">
            <div className="flex items-center gap-2 text-zinc-300">
              <Terminal className="w-3.5 h-3.5 text-zinc-400" />
              <span className="font-mono text-[11px] text-indigo-300">.env / Vercel Environment Variables</span>
            </div>
            <pre className="font-mono text-[11px] bg-zinc-900/90 p-2.5 rounded border border-zinc-800/80 text-zinc-300 overflow-x-auto">
{`# 1. Enable YouTube Data API v3 in Google Cloud Console
YOUTUBE_API_KEY="AIzaSy..."

# 2. Get Gemini API key from Google AI Studio
GEMINI_API_KEY="AIzaSy..."

# 3. Optional configurations
VITE_DEFAULT_REGION="US"
DEFAULT_RPM_LOW=1.5
DEFAULT_RPM_BASE=4.0
DEFAULT_RPM_HIGH=8.5`}
            </pre>
            <p className="text-[11px] text-zinc-400 leading-relaxed">
              When deploying to Vercel, navigate to <strong>Project Settings → Environment Variables</strong>, add <code className="text-zinc-200">YOUTUBE_API_KEY</code> and <code className="text-zinc-200">GEMINI_API_KEY</code>, then redeploy. The app will immediately switch from high-fidelity demo previews to real-time YouTube Data API v3 querying!
            </p>
          </div>
        </div>

        <div className="pt-2 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-medium text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg transition-colors cursor-pointer"
          >
            Close Overview
          </button>
        </div>
      </div>
    </Modal>
  );
};
