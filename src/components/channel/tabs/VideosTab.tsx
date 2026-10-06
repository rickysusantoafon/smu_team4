import React, { useState, useMemo } from 'react';
import {
  Search,
  ArrowUpDown,
  Download,
  Filter,
  Eye,
  ThumbsUp,
  MessageSquare,
  Clock,
  Sparkles,
  ExternalLink
} from 'lucide-react';
import { VideoItem } from '../../../types/youtube';
import { formatCompactNumber, formatNumber } from '../../../lib/calculations';
import { Badge } from '../../ui/Badge';
import { Tooltip } from '../../ui/Tooltip';

interface VideosTabProps {
  videos: VideoItem[];
  medianViews: number;
}

type SortField =
  | 'publishedAt'
  | 'views'
  | 'likes'
  | 'comments'
  | 'likeRate'
  | 'commentRate'
  | 'engagementRate'
  | 'viewsPerDay'
  | 'durationSec';

export const VideosTab: React.FC<VideosTabProps> = ({ videos, medianViews }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<
    'all' | 'longform' | 'shorts' | 'high_engagement' | 'most_viewed' | 'low_performing'
  >('all');
  const [sortField, setSortField] = useState<SortField>('views');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  // Filtered & Searched list
  const filteredVideos = useMemo(() => {
    return videos.filter((v) => {
      // Search
      const matchesSearch =
        v.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        v.description.toLowerCase().includes(searchTerm.toLowerCase());
      if (!matchesSearch) return false;

      // Filter type
      if (filterType === 'shorts') return v.isShort;
      if (filterType === 'longform') return !v.isShort;
      if (filterType === 'high_engagement') return v.engagementRate >= 3.5;
      if (filterType === 'most_viewed') return v.views >= medianViews;
      if (filterType === 'low_performing') return v.views < medianViews * 0.6;

      return true;
    });
  }, [videos, searchTerm, filterType, medianViews]);

  // Sorted list
  const sortedVideos = useMemo(() => {
    return [...filteredVideos].sort((a, b) => {
      let aVal: any = a[sortField];
      let bVal: any = b[sortField];

      if (sortField === 'publishedAt') {
        aVal = new Date(aVal).getTime();
        bVal = new Date(bVal).getTime();
      }

      if (aVal < bVal) return sortOrder === 'asc' ? -1 : 1;
      if (aVal > bVal) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    });
  }, [filteredVideos, sortField, sortOrder]);

  // Paginated list
  const totalPages = Math.max(1, Math.ceil(sortedVideos.length / pageSize));
  const paginatedVideos = useMemo(() => {
    const start = (page - 1) * pageSize;
    return sortedVideos.slice(start, start + pageSize);
  }, [sortedVideos, page, pageSize]);

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'desc' ? 'asc' : 'desc');
    } else {
      setSortField(field);
      setSortOrder('desc');
    }
  };

  const handleExportCSV = () => {
    const headers = [
      'Video ID',
      'Title',
      'Published Date',
      'Duration (sec)',
      'Duration Formatted',
      'Is Short',
      'Views',
      'Likes',
      'Comments',
      'Like Rate (%)',
      'Comment Rate (%)',
      'Engagement Rate (%)',
      'Views Per Day',
      'Relative Performance'
    ];

    const rows = sortedVideos.map((v) => [
      `"${v.id}"`,
      `"${v.title.replace(/"/g, '""')}"`,
      `"${v.publishedAt}"`,
      v.durationSec,
      `"${v.durationFormatted}"`,
      v.isShort ? 'Yes' : 'No',
      v.views,
      v.likes,
      v.comments,
      v.likeRate,
      v.commentRate,
      v.engagementRate,
      v.viewsPerDay,
      v.relativePerformance
    ]);

    const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `tubeintel_video_analysis_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Search, Filter & Action Bar */}
      <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 p-4 rounded-xl bg-zinc-900/60 border border-zinc-800">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 flex-1">
          {/* Search inside results */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setPage(1);
              }}
              placeholder="Search title or keywords in sample..."
              className="w-full bg-zinc-900 border border-zinc-800 focus:border-indigo-500 rounded-lg pl-9 pr-3 py-1.5 text-xs text-zinc-200 placeholder-zinc-500 focus:outline-none"
            />
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-1">
            {[
              { id: 'all', label: 'All Videos' },
              { id: 'longform', label: 'Long-form' },
              { id: 'shorts', label: 'Shorts' },
              { id: 'high_engagement', label: 'High Engagement' },
              { id: 'most_viewed', label: 'Top Viewed' },
              { id: 'low_performing', label: 'Lower Baseline' }
            ].map((f) => (
              <button
                key={f.id}
                onClick={() => {
                  setFilterType(f.id as any);
                  setPage(1);
                }}
                className={`px-2.5 py-1 rounded-md text-xs font-medium transition-colors cursor-pointer ${
                  filterType === f.id
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'bg-zinc-800/80 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* Export CSV button */}
        <div className="flex items-center justify-end gap-2 shrink-0">
          <button
            onClick={handleExportCSV}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-zinc-800 bg-zinc-900 hover:bg-zinc-800 text-xs font-medium text-zinc-300 hover:text-white transition-colors cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* Videos Advanced Table */}
      <div className="overflow-x-auto rounded-xl border border-zinc-800 bg-zinc-900/60 shadow-md">
        <table className="w-full text-left text-xs text-zinc-300">
          <thead className="bg-zinc-950/80 text-[11px] font-semibold text-zinc-400 uppercase tracking-wider border-b border-zinc-800 select-none">
            <tr>
              <th className="py-3.5 px-4 w-12">#</th>
              <th className="py-3.5 px-4 min-w-[280px]">Video Title</th>
              <th
                onClick={() => handleSort('publishedAt')}
                className="py-3.5 px-4 text-right cursor-pointer hover:text-zinc-200"
              >
                <div className="inline-flex items-center gap-1">
                  <span>Published</span>
                  <ArrowUpDown className="w-3 h-3 text-zinc-400" />
                </div>
              </th>
              <th
                onClick={() => handleSort('durationSec')}
                className="py-3.5 px-4 text-right cursor-pointer hover:text-zinc-200"
              >
                <div className="inline-flex items-center gap-1">
                  <span>Duration</span>
                  <ArrowUpDown className="w-3 h-3 text-zinc-400" />
                </div>
              </th>
              <th
                onClick={() => handleSort('views')}
                className="py-3.5 px-4 text-right cursor-pointer hover:text-zinc-200"
              >
                <div className="inline-flex items-center gap-1">
                  <span>Views</span>
                  <ArrowUpDown className="w-3 h-3 text-zinc-400" />
                </div>
              </th>
              <th
                onClick={() => handleSort('likes')}
                className="py-3.5 px-4 text-right cursor-pointer hover:text-zinc-200"
              >
                <div className="inline-flex items-center gap-1">
                  <span>Likes</span>
                  <ArrowUpDown className="w-3 h-3 text-zinc-400" />
                </div>
              </th>
              <th
                onClick={() => handleSort('comments')}
                className="py-3.5 px-4 text-right cursor-pointer hover:text-zinc-200"
              >
                <div className="inline-flex items-center gap-1">
                  <span>Comments</span>
                  <ArrowUpDown className="w-3 h-3 text-zinc-400" />
                </div>
              </th>
              <th
                onClick={() => handleSort('engagementRate')}
                className="py-3.5 px-4 text-right cursor-pointer hover:text-zinc-200"
              >
                <div className="inline-flex items-center gap-1">
                  <span>Engagement</span>
                  <ArrowUpDown className="w-3 h-3 text-zinc-400" />
                </div>
              </th>
              <th
                onClick={() => handleSort('viewsPerDay')}
                className="py-3.5 px-4 text-right cursor-pointer hover:text-zinc-200"
              >
                <div className="inline-flex items-center gap-1">
                  <span>Views/Day</span>
                  <ArrowUpDown className="w-3 h-3 text-zinc-400" />
                </div>
              </th>
              <th className="py-3.5 px-4 text-right">Relative Baseline</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-800/60 font-medium">
            {paginatedVideos.length === 0 ? (
              <tr>
                <td colSpan={10} className="py-8 text-center text-zinc-500 text-xs">
                  No videos match your search and filter criteria.
                </td>
              </tr>
            ) : (
              paginatedVideos.map((v, idx) => {
                const globalIndex = (page - 1) * pageSize + idx + 1;
                return (
                  <tr key={v.id} className="hover:bg-zinc-800/40 transition-colors">
                    <td className="py-3.5 px-4 text-zinc-500 font-mono text-[11px]">
                      {globalIndex}
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="flex items-start gap-3">
                        <div className="relative shrink-0">
                          <img
                            src={v.thumbnail}
                            alt={v.title}
                            className="w-16 h-10 rounded object-cover bg-zinc-800"
                          />
                          {v.isShort && (
                            <span className="absolute bottom-0.5 right-0.5 bg-red-600 text-white text-[9px] font-bold px-1 rounded">
                              Short
                            </span>
                          )}
                        </div>
                        <div className="min-w-0 space-y-1">
                          <a
                            href={`https://youtube.com/watch?v=${v.id}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-semibold text-zinc-100 hover:text-indigo-400 line-clamp-1 transition-colors flex items-center gap-1 group"
                          >
                            <span>{v.title}</span>
                            <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                          </a>
                          <div className="text-[10px] text-zinc-400 font-mono flex items-center gap-2">
                            <span>ID: {v.id}</span>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 text-right text-zinc-400 font-mono text-[11px] whitespace-nowrap">
                      {new Date(v.publishedAt).toLocaleDateString()}
                    </td>
                    <td className="py-3.5 px-4 text-right text-zinc-300 font-mono whitespace-nowrap">
                      {v.durationFormatted}
                    </td>
                    <td className="py-3.5 px-4 text-right font-bold text-white font-mono whitespace-nowrap">
                      {formatCompactNumber(v.views)}
                    </td>
                    <td className="py-3.5 px-4 text-right text-zinc-300 font-mono whitespace-nowrap">
                      {formatCompactNumber(v.likes)}
                    </td>
                    <td className="py-3.5 px-4 text-right text-zinc-300 font-mono whitespace-nowrap">
                      {formatCompactNumber(v.comments)}
                    </td>
                    <td className="py-3.5 px-4 text-right font-mono whitespace-nowrap">
                      <span className="text-emerald-400 font-semibold">{v.engagementRate}%</span>
                    </td>
                    <td className="py-3.5 px-4 text-right text-zinc-400 font-mono whitespace-nowrap">
                      {formatCompactNumber(v.viewsPerDay)}
                    </td>
                    <td className="py-3.5 px-4 text-right font-mono whitespace-nowrap">
                      <span
                        className={
                          v.relativePerformance >= 1.8
                            ? 'text-amber-400 font-bold bg-amber-500/10 px-1.5 py-0.5 rounded border border-amber-500/20'
                            : v.relativePerformance >= 1.0
                            ? 'text-indigo-300'
                            : 'text-zinc-500'
                        }
                      >
                        {v.relativePerformance}x
                      </span>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-zinc-400">
        <div>
          Showing {(page - 1) * pageSize + 1}–
          {Math.min(page * pageSize, sortedVideos.length)} of {sortedVideos.length} videos
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <span>Rows per page:</span>
            <select
              value={pageSize}
              onChange={(e) => {
                setPageSize(Number(e.target.value));
                setPage(1);
              }}
              className="bg-zinc-800 border border-zinc-700 text-zinc-200 text-xs rounded px-2 py-1 focus:outline-none"
            >
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
            </select>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={() => setPage(Math.max(1, page - 1))}
              disabled={page === 1}
              className="px-2.5 py-1 rounded bg-zinc-800 text-zinc-300 hover:bg-zinc-700 disabled:opacity-40 disabled:pointer-events-none transition-colors"
            >
              Prev
            </button>
            <span className="px-2 font-mono text-zinc-300">
              {page} / {totalPages}
            </span>
            <button
              onClick={() => setPage(Math.min(totalPages, page + 1))}
              disabled={page === totalPages}
              className="px-2.5 py-1 rounded bg-zinc-800 text-zinc-300 hover:bg-zinc-700 disabled:opacity-40 disabled:pointer-events-none transition-colors"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
