interface RaceGridProps {
  races: any[];
  season: string;
  currentYear: number;
}

export default function RaceGrid({
  races,
  season,
  currentYear,
}: RaceGridProps) {
  const now = new Date();

  if (races.length === 0) {
    return (
      <div
        className="max-w-7xl mx-auto px-6 py-20 text-center"
        style={{
          border: "1px solid rgba(255,255,255,0.07)",
          background: "#111",
        }}
      >
        <p
          className="text-white/30"
          style={{
            fontFamily: "'Barlow Condensed', sans-serif",
            fontWeight: 700,
            fontSize: "1.1rem",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
          }}
        >
          No races scheduled for {season}
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6">
      <div
        className="grid md:grid-cols-2 lg:grid-cols-3 gap-0"
        style={{
          border: "1px solid rgba(255,255,255,0.07)",
          borderRight: "none",
          borderBottom: "none",
        }}
      >
        {races.map((race: any, index: number) => {
          const raceDate = new Date(race.date);
          const isUpcoming =
            raceDate > now && season === currentYear.toString();
          const isPast = raceDate < now || season !== currentYear.toString();
          const daysUntil = Math.ceil(
            (raceDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24),
          );

          return (
            <div
              key={index}
              className="relative overflow-hidden group"
              style={{
                borderRight: "1px solid rgba(255,255,255,0.07)",
                borderBottom: "1px solid rgba(255,255,255,0.07)",
                background: isPast ? "#0d0d0d" : "#111",
                opacity: isPast ? 0.6 : 1,
              }}
            >
              {/* Top bar */}
              <div
                className="h-[2px]"
                style={{
                  background: isUpcoming ? "#E10600" : "rgba(255,255,255,0.1)",
                }}
              />

              {/* Hover wash */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none"
                style={{ background: "rgba(225,6,0,0.03)" }}
              />

              {/* Round watermark */}
              <div
                className="absolute top-4 right-5 font-display font-black pointer-events-none select-none leading-none"
                style={{
                  fontFamily: "'Barlow Condensed', sans-serif",
                  fontWeight: 900,
                  fontSize: "5rem",
                  color: "rgba(255,255,255,0.03)",
                  lineHeight: 1,
                }}
              >
                {race.round}
              </div>

              <div className="p-6 relative">
                {/* Round badge */}
                <div
                  className="inline-flex items-center mb-4 px-2 py-1"
                  style={{
                    background: isUpcoming
                      ? "rgba(225,6,0,0.1)"
                      : "rgba(255,255,255,0.04)",
                    border: `1px solid ${isUpcoming ? "rgba(225,6,0,0.2)" : "rgba(255,255,255,0.07)"}`,
                  }}
                >
                  <span
                    style={{
                      fontFamily: "'Barlow Condensed', sans-serif",
                      fontWeight: 700,
                      fontSize: "0.625rem",
                      letterSpacing: "0.15em",
                      textTransform: "uppercase",
                      color: isUpcoming ? "#E10600" : "rgba(255,255,255,0.3)",
                    }}
                  >
                    Round {race.round}
                  </span>
                </div>

                {/* Race name */}
                <h3
                  className="text-white leading-tight mb-1"
                  style={{
                    fontFamily: "'Barlow Condensed', sans-serif",
                    fontWeight: 800,
                    fontSize: "1.3rem",
                    textTransform: "uppercase",
                    lineHeight: 1.05,
                  }}
                >
                  {race.raceName}
                </h3>

                {/* Location */}
                <p className="data-readout mb-6">
                  {race.Circuit.Location.locality},{" "}
                  {race.Circuit.Location.country}
                </p>

                {/* Divider */}
                <div
                  className="h-px mb-4"
                  style={{ background: "rgba(255,255,255,0.06)" }}
                />

                {/* Date row */}
                <div className="flex items-end justify-between">
                  <div>
                    <div className="stat-label mb-1">Race Date</div>
                    <div
                      className="text-white/80"
                      style={{
                        fontFamily: "'Barlow Condensed', sans-serif",
                        fontWeight: 700,
                        fontSize: "1rem",
                        textTransform: "uppercase",
                      }}
                    >
                      {raceDate.toLocaleDateString("en-US", {
                        weekday: "short",
                        month: "short",
                        day: "numeric",
                      })}
                    </div>
                    <div className="data-readout">
                      {raceDate.toLocaleDateString("en-US", {
                        year: "numeric",
                      })}
                    </div>
                  </div>

                  {isUpcoming && daysUntil > 0 && (
                    <div className="text-right">
                      <div
                        style={{
                          fontFamily: "'Barlow Condensed', sans-serif",
                          fontWeight: 900,
                          fontSize: "1.6rem",
                          color: "#E10600",
                          lineHeight: 1,
                        }}
                      >
                        {daysUntil === 1 ? "TOMORROW" : `${daysUntil}D`}
                      </div>
                      <div className="stat-label">To go</div>
                    </div>
                  )}

                  {isPast && (
                    <div
                      className="text-right"
                      style={{
                        fontFamily: "'Barlow Condensed', sans-serif",
                        fontWeight: 700,
                        fontSize: "0.625rem",
                        letterSpacing: "0.12em",
                        textTransform: "uppercase",
                        color: "rgba(255,255,255,0.2)",
                      }}
                    >
                      Completed
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
