"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronRight } from "lucide-react";

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

  return (
    <section className="container mx-auto px-4 py-16">
      <div className="flex items-center justify-between mb-10">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="h-8 w-1 bg-red-600" />
            <span className="text-sm font-bold text-red-500 uppercase tracking-wider">
              Latest
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight">
            F1 News
          </h2>
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {news.slice(0, 6).map((article, index) => (
          <a
            key={index}
            href={article.link}
            target="_blank"
            rel="noopener noreferrer"
            className="block group"
          >
            <Card className="bg-zinc-900 border-zinc-800 hover:border-red-600 transition-all duration-300 cursor-pointer group-hover:translate-y-[-4px] group-hover:shadow-2xl group-hover:shadow-red-600/20 rounded-none overflow-hidden h-full">
              <div className="h-1 bg-red-600" />

              <CardHeader className="pb-3">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-red-500 uppercase tracking-wider">
                    {article.source}
                  </span>
                  <span className="text-xs text-zinc-600">
                    {formatDate(article.pubDate)}
                  </span>
                </div>
                <CardTitle className="text-lg font-black text-white leading-tight group-hover:text-red-400 transition-colors">
                  {article.title}
                </CardTitle>
              </CardHeader>

              <CardContent>
                <p className="text-zinc-400 text-sm leading-relaxed line-clamp-3">
                  {article.description}
                </p>
                <div className="mt-4 flex items-center text-red-500 text-sm font-bold">
                  Read more
                  <ChevronRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </CardContent>
            </Card>
          </a>
        ))}
      </div>
    </section>
  );
};

export default NewsSection;