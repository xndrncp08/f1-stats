import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function CompareHero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-red-600 via-red-700 to-black border-b border-zinc-800">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNnoiIHN0cm9rZT0iI2ZmZiIgc3Ryb2tlLW9wYWNpdHk9Ii4xIi8+PC9nPjwvc3ZnPg==')] opacity-20" />

      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse" />
        <div className="absolute top-1/4 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
        <div className="absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
        <div className="absolute top-3/4 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      </div>

      <div className="relative container mx-auto px-4 py-16 lg:py-20">
        <Link href="/">
          <Button className="mb-6 bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20 rounded-none font-bold">
            ← BACK TO HOME
          </Button>
        </Link>

        <div className="max-w-4xl">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-4">
            <span className="text-sm font-semibold text-white tracking-wider uppercase">
              Head to Head
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl font-black text-white mb-4 tracking-tighter">
            DRIVER <span className="text-red-400">COMPARISON</span>
          </h1>
          <p className="text-xl text-white/80 font-medium">
            Compare career statistics and performance metrics
          </p>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0">
        <svg
          viewBox="0 0 1440 60"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full"
        >
          <path d="M0 60L1440 60L1440 0L0 30L0 60Z" fill="#000000" />
        </svg>
      </div>
    </section>
  );
}
