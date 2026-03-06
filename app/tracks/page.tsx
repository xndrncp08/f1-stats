import Link from "next/link";
import circuits from '../../lib/circuit/circuits.json';

export default function TracksPage() {
  return (
    <main className="min-h-screen" style={{ background: "#080808" }}>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-zinc-800">
        <div className="h-1 w-full bg-red-600" />

        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute left-1/4 top-0 bottom-0 w-px bg-zinc-800/50" />
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-zinc-800/50" />
          <div className="absolute left-3/4 top-0 bottom-0 w-px bg-zinc-800/50" />
        </div>

        <div className="relative container mx-auto px-4 py-12">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-zinc-500 hover:text-white mb-8 transition-colors"
          >
            ← Home
          </Link>

          <div className="max-w-2xl">
            <div className="text-xs font-black uppercase tracking-widest text-red-600 mb-3">
              Formula 1 · 2025 Season
            </div>
            <h1
              className="font-black uppercase text-white mb-4 leading-none"
              style={{ fontSize: "clamp(3rem, 10vw, 7rem)" }}
            >
              Race
              <br />
              <span className="text-zinc-600">Circuits</span>
            </h1>
            <p className="text-zinc-400 text-base max-w-md">
              Every circuit on the Formula 1 calendar — track statistics, lap records, and history.
            </p>
          </div>

          <div className="mt-8 flex gap-8 text-center border-t border-zinc-800 pt-8">
            <div>
              <div className="text-3xl font-black text-white">{circuits.length}</div>
              <div className="text-xs font-bold uppercase tracking-widest text-zinc-600">Circuits</div>
            </div>
            <div>
              <div className="text-3xl font-black text-white">24</div>
              <div className="text-xs font-bold uppercase tracking-widest text-zinc-600">Races</div>
            </div>
            <div>
              <div className="text-3xl font-black text-white">21</div>
              <div className="text-xs font-bold uppercase tracking-widest text-zinc-600">Countries</div>
            </div>
          </div>
        </div>
      </section>

      {/* Circuit Grid */}
      <div className="container mx-auto px-4 py-10">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-zinc-800">
          {circuits.map((circuit) => (
            <Link key={circuit.id} href={`/tracks/${circuit.id}`}>
              <div className="bg-black p-6 h-full hover:bg-zinc-900 transition-colors group cursor-pointer">
                <div className="h-px w-12 bg-red-600 mb-4 group-hover:w-full transition-all duration-300" />

                {/* Track layout image */}
                <div className="mb-4 bg-zinc-950 flex items-center justify-center h-32 overflow-hidden">
                  <img
                    src={circuit.layoutUrl}
                    alt={`${circuit.name} layout`}
                    className="h-full w-full object-contain p-2"
                    loading="lazy"
                  />
                </div>

                <div className="mb-3">
                  <div className="text-xs font-bold uppercase tracking-widest text-zinc-600 mb-1">
                    {circuit.location}
                  </div>
                  <h2 className="text-lg font-black text-white leading-tight group-hover:text-red-500 transition-colors">
                    {circuit.name}
                  </h2>
                </div>

                <div className="grid grid-cols-3 gap-2 border-t border-zinc-900 pt-4">
                  <div>
                    <div className="text-xs font-bold uppercase tracking-widest text-zinc-700 mb-1">Length</div>
                    <div className="text-sm font-black text-white">{circuit.length}</div>
                  </div>
                  <div>
                    <div className="text-xs font-bold uppercase tracking-widest text-zinc-700 mb-1">Laps</div>
                    <div className="text-sm font-black text-white">{circuit.laps}</div>
                  </div>
                  <div>
                    <div className="text-xs font-bold uppercase tracking-widest text-zinc-700 mb-1">Since</div>
                    <div className="text-sm font-black text-white">{circuit.firstGP}</div>
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-between">
                  <div>
                    <div className="text-xs font-bold uppercase tracking-widest text-zinc-700 mb-1">Lap Record</div>
                    <div className="text-sm font-black text-red-500">{circuit.lapRecord}</div>
                  </div>
                  <span className="text-xs font-bold uppercase tracking-widest text-zinc-700 group-hover:text-white transition-colors">
                    View →
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}