import React from 'react';
import {
  ListVideo,
  ExternalLink,
  Calendar,
  Sparkles,
  Layers,
  FolderOpen
} from 'lucide-react';
import { PlaylistSummary } from '../../../types/youtube';
import { Badge } from '../../ui/Badge';

interface PlaylistsTabProps {
  playlists: PlaylistSummary[];
  channelTitle: string;
}

export const PlaylistsTab: React.FC<PlaylistsTabProps> = ({ playlists, channelTitle }) => {
  // Largest playlists
  const sortedBySize = [...playlists].sort((a, b) => b.videoCount - a.videoCount);

  // Classify playlist organization strategy
  const categorized = playlists.map((p) => {
    const text = (p.title + ' ' + p.description).toLowerCase();
    let category = 'General Series';
    let badgeColor: 'emerald' | 'indigo' | 'amber' | 'blue' | 'purple' = 'indigo';

    if (text.includes('review') || text.includes('vs') || text.includes('comparison')) {
      category = 'Product Reviews & Comparisons';
      badgeColor = 'amber';
    } else if (text.includes('tutorial') || text.includes('how to') || text.includes('guide')) {
      category = 'Educational & Tutorials';
      badgeColor = 'emerald';
    } else if (text.includes('award') || text.includes('best of') || text.includes('year')) {
      category = 'Curated Superlatives';
      badgeColor = 'purple';
    } else if (text.includes('tech') || text.includes('hardware') || text.includes('deep dive')) {
      category = 'Flagship Deep Dives';
      badgeColor = 'blue';
    }

    return { ...p, category, badgeColor };
  });

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Strategic Header */}
      <div className="p-5 rounded-xl bg-zinc-900 border border-zinc-800 space-y-3">
        <div className="flex items-center gap-2 text-indigo-400 font-bold text-sm">
          <Sparkles className="w-4 h-4" />
          <span>Content Architecture & Organization Strategy</span>
        </div>
        <p className="text-xs text-zinc-300 leading-relaxed">
          {channelTitle} organizes their content library into <strong>{playlists.length} public playlists</strong>.
          Structuring videos into episodic playlists preserves audience session watch time, increases binge retention, and provides structured landing funnels for search traffic.
        </p>
      </div>

      {/* Playlists Cards Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <ListVideo className="w-4 h-4 text-indigo-400" />
            Public Playlists ({playlists.length})
          </h3>
          <span className="text-xs text-zinc-500">Sorted by catalog size</span>
        </div>

        {playlists.length === 0 ? (
          <div className="p-8 text-center bg-zinc-900/60 border border-zinc-800 rounded-xl text-xs text-zinc-500">
            No public playlists were found for this channel.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {categorized.map((p) => (
              <div
                key={p.id}
                className="p-4 rounded-xl bg-zinc-900 border border-zinc-800/90 hover:border-zinc-700 transition-all flex gap-4"
              >
                <div className="relative shrink-0 w-32 h-20 rounded-lg overflow-hidden bg-zinc-800">
                  <img
                    src={p.thumbnail || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=240&h=140&fit=crop'}
                    alt={p.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-end justify-end p-1.5">
                    <span className="bg-zinc-950/80 text-white text-[10px] font-bold px-1.5 py-0.5 rounded font-mono">
                      {p.videoCount} videos
                    </span>
                  </div>
                </div>

                <div className="space-y-1.5 flex-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <Badge variant={p.badgeColor} size="sm">
                      {p.category}
                    </Badge>
                  </div>
                  <h4 className="text-xs font-bold text-zinc-100 line-clamp-1">
                    {p.title}
                  </h4>
                  <p className="text-[11px] text-zinc-400 line-clamp-2 leading-relaxed">
                    {p.description || 'No public playlist description provided.'}
                  </p>
                  <div className="pt-1 flex items-center justify-between text-[10px] text-zinc-500">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {p.publishedAt ? new Date(p.publishedAt).toLocaleDateString() : 'N/A'}
                    </span>
                    <a
                      href={`https://youtube.com/playlist?list=${p.id}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-indigo-400 hover:text-indigo-300 font-medium inline-flex items-center gap-1"
                    >
                      <span>Open on YouTube</span>
                      <ExternalLink className="w-2.5 h-2.5" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Playlist Size Ranking Table */}
      {playlists.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-sm font-bold uppercase tracking-wider text-zinc-400 flex items-center gap-2">
            <FolderOpen className="w-4 h-4 text-indigo-400" />
            Playlist Library Distribution
          </h3>

          <div className="overflow-x-auto rounded-xl border border-zinc-800 bg-zinc-900/60">
            <table className="w-full text-left text-xs text-zinc-300">
              <thead className="bg-zinc-950/80 text-[11px] font-semibold text-zinc-400 uppercase tracking-wider border-b border-zinc-800">
                <tr>
                  <th className="py-3 px-4">Playlist Name</th>
                  <th className="py-3 px-4">Classification</th>
                  <th className="py-3 px-4 text-right">Video Count</th>
                  <th className="py-3 px-4 text-right">Published</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800/60 font-medium">
                {sortedBySize.map((p) => (
                  <tr key={p.id} className="hover:bg-zinc-800/40 transition-colors">
                    <td className="py-3 px-4 font-semibold text-zinc-100 max-w-sm line-clamp-1">
                      {p.title}
                    </td>
                    <td className="py-3 px-4 text-zinc-400">
                      Curated Series
                    </td>
                    <td className="py-3 px-4 text-right font-bold text-white font-mono">
                      {p.videoCount}
                    </td>
                    <td className="py-3 px-4 text-right text-zinc-500 font-mono text-[11px]">
                      {p.publishedAt ? new Date(p.publishedAt).toLocaleDateString() : 'N/A'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
