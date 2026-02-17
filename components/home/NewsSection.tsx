"use client";

import React from "react";

const NewsSection = ({ news }: { news: any[] }) => {
  if (!news || news.length === 0) return null;

  // Format date consistently to avoid hydration errors
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const year = date.getFullYear();
    return `${month}/${day}/${year}`;
  };

  // Get relative time
  const getRelativeTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "Yesterday";
    if (diffDays < 7) return `${diffDays} days ago`;
    return formatDate(dateString);
  };

  return (
    <section className="px-4 py-16">
      <div className="mb-12">
        <div className="flex items-center gap-3 mb-3">
          <div className="h-10 w-1.5 bg-gradient-to-b from-red-600 to-red-500 rounded-full" />
          <span className="text-xs font-bold text-red-500 uppercase tracking-wider">
            Latest
          </span>
        </div>
        <h2 className="text-3xl md:text-4xl font-black bg-gradient-to-r from-white to-zinc-300 bg-clip-text text-transparent">
          F1 News
        </h2>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {news.slice(0, 6).map((article, index) => (
          <a
            key={index}
            href={article.link}
            target="_blank"
            rel="noopener noreferrer"
            className="block group/article"
          >
            <div className="bg-zinc-800/30 backdrop-blur-sm rounded-xl border border-zinc-700/30 hover:border-red-600/40 transition-all duration-300 cursor-pointer group-hover/article:translate-y-[-4px] h-full overflow-hidden">
              {/* Accent top border */}
              <div className="h-1 bg-gradient-to-r from-red-600 to-red-500" />

              <div className="p-6">
                {/* Source */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 bg-red-600 rounded-full animate-pulse" />
                    <span className="text-xs font-bold text-red-500 uppercase tracking-wider">
                      {article.source}
                    </span>
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-xl font-black text-white leading-tight group-hover/article:text-red-400 transition-colors duration-300 line-clamp-2 mb-4">
                  {article.title}
                </h3>

                {/* Description */}
                <p className="text-zinc-400 text-sm leading-relaxed line-clamp-3 mb-4">
                  {article.description}
                </p>

                {/* Read more link */}
                <div className="text-red-500 text-sm font-bold">
                  <span>Read more</span>
                </div>
              </div>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
};

export default NewsSection;