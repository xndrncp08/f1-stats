"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import championshipData from "@/lib/data/championships.json";

const TEAM_COLORS: Record<string, string> = {
  mercedes: "#00D2BE",
  ferrari: "#E8002D",
  red_bull: "#3671C6",
  mclaren: "#FF8000",
  alpine: "#FF87BC",
  aston_martin: "#229971",
  williams: "#64C4FF",
  haas: "#B6BABD",
  sauber: "#52E252",
  rb: "#6692FF",
  alphatauri: "#6692FF",
  renault: "#FFF500",
};

function getTeamColor(teamName: string): string {
  const lower = teamName.toLowerCase();
  for (const [key, color] of Object.entries(TEAM_COLORS)) {
    if (lower.includes(key)) return color;
  }
  return "#E10600";
}

async function fetchJSON(url: string) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}

// Fetch ALL pages of results from Jolpica
async function fetchAllResults(driverId: string) {
  const pageSize = 100;
  let offset = 0;
  let allRaces: any[] = [];
  let total = Infinity;

  while (offset < total) {
    const data = await fetchJSON(
      `https://api.jolpi.ca/ergast/f1/drivers/${driverId}/results.json?limit=${pageSize}&offset=${offset}`,
    );
    const mrData = data?.MRData;
    total = parseInt(mrData?.total || "0");
    const races = mrData?.RaceTable?.Races || [];
    allRaces = [...allRaces, ...races];
    offset += pageSize;
    if (races.length === 0) break;
  }

  return allRaces;
}

export default function DriverProfile({ driverId }: { driverId: string }) {
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!driverId) return;

    async function load() {
      try {
        const [driverRes, standingsRes, seasonRes] = await Promise.allSettled([
          fetchJSON(`https://api.jolpi.ca/ergast/f1/drivers/${driverId}.json`),
          fetchJSON(`https://api.jolpi.ca/ergast/f1/2025/driverstandings.json`),
          fetchJSON(
            `https://api.jolpi.ca/ergast/f1/2025/drivers/${driverId}/results.json`,
          ),
        ]);

        const driver =
          driverRes.status === "fulfilled"
            ? driverRes.value?.MRData?.DriverTable?.Drivers?.[0]
            : null;

        if (!driver) {
          setError("Driver not found");
          return;
        }

        const allStandings =
          standingsRes.status === "fulfilled"
            ? standingsRes.value?.MRData?.StandingsTable?.StandingsLists?.[0]
                ?.DriverStandings || []
            : [];
        const standing =
          allStandings.find((s: any) => s.Driver.driverId === driverId) || null;

        const seasonResults =
          seasonRes.status === "fulfilled"
            ? seasonRes.value?.MRData?.RaceTable?.Races || []
            : [];

        // Fetch ALL career results with pagination
        const allRaces = await fetchAllResults(driverId);

        const totalRaces = allRaces.length;
        const firstSeason = allRaces[0]?.season || "—";
        const wins = allRaces.filter(
          (r: any) => r.Results?.[0]?.position === "1",
        ).length;
        const podiums = allRaces.filter((r: any) => {
          const pos = parseInt(r.Results?.[0]?.position);
          return pos >= 1 && pos <= 3;
        }).length;
        const points = allRaces.reduce((sum: number, r: any) => {
          return sum + parseFloat(r.Results?.[0]?.points || "0");
        }, 0);
        const championships =
          (championshipData as Record<string, number>)[driverId] ?? 0;

        setData({
          driver,
          standing,
          seasonResults,
          careerStats: {
            totalRaces,
            wins,
            podiums,
            points,
            championships,
            firstSeason,
          },
        });
      } catch (err: any) {
        setError(err.message || "Failed to load");
      }
    }

    load();
  }, [driverId]);

  if (error)
    return (
      <main
        style={{
          minHeight: "100vh",
          background: "#080808",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <p
            style={{
              color: "#E10600",
              fontFamily: "'Rajdhani', sans-serif",
              fontWeight: 600,
              marginBottom: "1rem",
            }}
          >
            {error}
          </p>
          <Link
            href="/drivers"
            style={{
              color: "rgba(255,255,255,0.4)",
              fontFamily: "'Rajdhani', sans-serif",
              fontSize: "0.8rem",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
            }}
          >
            ← Back to Drivers
          </Link>
        </div>
      </main>
    );

  if (!data)
    return (
      <main
        style={{
          minHeight: "100vh",
          background: "#080808",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <div
            style={{
              width: "36px",
              height: "36px",
              border: "2px solid #E10600",
              borderTopColor: "transparent",
              borderRadius: "50%",
              animation: "spin 0.8s linear infinite",
              margin: "0 auto 1rem",
            }}
          />
          <p
            style={{
              fontFamily: "'Rajdhani', sans-serif",
              fontWeight: 600,
              fontSize: "0.75rem",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.3)",
            }}
          >
            Loading Driver
          </p>
        </div>
      </main>
    );

  const { driver, standing, careerStats, seasonResults } = data;
  const teamName = standing?.Constructors?.[0]?.name || "Unknown Team";
  const teamColor = getTeamColor(teamName);

  return (
    <main style={{ minHeight: "100vh", background: "#080808" }}>
      {/* Team color top stripe */}
      <div style={{ height: "3px", background: teamColor }} />

      {/* Hero */}
      <section
        style={{
          borderBottom: "1px solid rgba(255,255,255,0.06)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Number watermark */}
        <div
          style={{
            position: "absolute",
            right: "2rem",
            top: 0,
            bottom: 0,
            display: "flex",
            alignItems: "center",
            pointerEvents: "none",
            userSelect: "none",
          }}
        >
          <span
            style={{
              fontFamily: "'Russo One', sans-serif",
              fontSize: "clamp(8rem, 20vw, 16rem)",
              color: "rgba(255,255,255,0.025)",
              lineHeight: 1,
            }}
          >
            {driver.permanentNumber || "0"}
          </span>
        </div>

        <div
          style={{
            maxWidth: "1280px",
            margin: "0 auto",
            padding: "3rem 1.5rem",
          }}
        >
          <Link
            href="/drivers"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              marginBottom: "2rem",
              fontFamily: "'Rajdhani', sans-serif",
              fontWeight: 600,
              fontSize: "0.75rem",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.3)",
              textDecoration: "none",
            }}
          >
            ← Drivers
          </Link>

          {/* Number badge */}
          <div
            style={{
              display: "inline-block",
              padding: "0.2rem 0.75rem",
              marginBottom: "1rem",
              background: teamColor,
              fontFamily: "'Russo One', sans-serif",
              fontSize: "0.85rem",
              color: "#000",
            }}
          >
            #{driver.permanentNumber || "—"}
          </div>

          <div style={{ marginBottom: "1rem" }}>
            <span
              style={{
                display: "block",
                fontFamily: "'Rajdhani', sans-serif",
                fontWeight: 500,
                fontSize: "1.25rem",
                color: "rgba(255,255,255,0.5)",
              }}
            >
              {driver.givenName}
            </span>
            <span
              style={{
                display: "block",
                fontFamily: "'Russo One', sans-serif",
                fontSize: "clamp(2.5rem, 8vw, 5rem)",
                color: "white",
                lineHeight: 0.92,
                letterSpacing: "-0.02em",
              }}
            >
              {driver.familyName.toUpperCase()}
            </span>
          </div>

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "0.5rem 1.5rem",
              alignItems: "center",
            }}
          >
            <span
              style={{
                fontFamily: "'Rajdhani', sans-serif",
                fontWeight: 600,
                fontSize: "0.8rem",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.35)",
              }}
            >
              {driver.nationality}
            </span>
            <span style={{ color: "rgba(255,255,255,0.1)" }}>·</span>
            <span
              style={{
                fontFamily: "'Rajdhani', sans-serif",
                fontWeight: 600,
                fontSize: "0.8rem",
                letterSpacing: "0.1em",
                color: teamColor,
              }}
            >
              {teamName}
            </span>
            {driver.dateOfBirth && (
              <>
                <span style={{ color: "rgba(255,255,255,0.1)" }}>·</span>
                <span
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: "0.75rem",
                    color: "rgba(255,255,255,0.3)",
                  }}
                >
                  b.{" "}
                  {new Date(driver.dateOfBirth).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              </>
            )}
          </div>
        </div>
      </section>

      <div
        style={{ maxWidth: "1280px", margin: "0 auto", padding: "3rem 1.5rem" }}
      >
        {/* Career stats */}
        <div style={{ marginBottom: "0.5rem" }}>
          <span
            style={{
              fontFamily: "'Rajdhani', sans-serif",
              fontWeight: 600,
              fontSize: "0.68rem",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.25)",
            }}
          >
            Career Statistics
          </span>
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(6, 1fr)",
            background: "rgba(255,255,255,0.05)",
            marginBottom: "2rem",
          }}
          className="grid-cols-2 sm:grid-cols-3 lg:grid-cols-6"
        >
          {[
            {
              label: "Championships",
              value: careerStats.championships,
              accent: true,
            },
            { label: "Race Wins", value: careerStats.wins },
            { label: "Podiums", value: careerStats.podiums },
            { label: "Total Points", value: Math.round(careerStats.points) },
            { label: "Total Races", value: careerStats.totalRaces },
            { label: "Active Since", value: careerStats.firstSeason },
          ].map((s, i) => (
            <div
              key={s.label}
              style={{
                background: "#0a0a0a",
                padding: "1.25rem 1.5rem",
                borderRight:
                  i < 5 ? "1px solid rgba(255,255,255,0.05)" : "none",
              }}
            >
              <div
                style={{
                  fontFamily: "'Rajdhani', sans-serif",
                  fontWeight: 600,
                  fontSize: "0.62rem",
                  letterSpacing: "0.16em",
                  textTransform: "uppercase",
                  color: "rgba(255,255,255,0.25)",
                  marginBottom: "0.3rem",
                }}
              >
                {s.label}
              </div>
              <div
                style={{
                  fontFamily: "'Russo One', sans-serif",
                  fontSize: "1.5rem",
                  color: s.accent ? "#E10600" : "white",
                  lineHeight: 1,
                }}
              >
                {s.value}
              </div>
            </div>
          ))}
        </div>

        {/* 2025 Season Results */}
        <div style={{ marginBottom: "0.5rem" }}>
          <span
            style={{
              fontFamily: "'Rajdhani', sans-serif",
              fontWeight: 600,
              fontSize: "0.68rem",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.25)",
            }}
          >
            2025 Season Results
          </span>
        </div>
        {seasonResults.length > 0 ? (
          <div style={{ border: "1px solid rgba(255,255,255,0.06)" }}>
            {/* Header */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "3rem 1fr 5rem 5rem 5rem",
                padding: "0.6rem 1.25rem",
                borderBottom: "1px solid rgba(255,255,255,0.06)",
                background: "#0d0d0d",
              }}
            >
              {["Rd", "Race", "Grid", "Finish", "Pts"].map((h) => (
                <div
                  key={h}
                  style={{
                    fontFamily: "'Rajdhani', sans-serif",
                    fontWeight: 600,
                    fontSize: "0.62rem",
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    color: "rgba(255,255,255,0.2)",
                    textAlign:
                      h === "Rd" ? "left" : h === "Race" ? "left" : "center",
                  }}
                >
                  {h}
                </div>
              ))}
            </div>
            {seasonResults.map((race: any) => {
              const result = race.Results?.[0];
              const pos = parseInt(result?.position);
              const isWin = pos === 1;
              const isPodium = pos <= 3;
              return (
                <div
                  key={race.round}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "3rem 1fr 5rem 5rem 5rem",
                    padding: "0.75rem 1.25rem",
                    borderBottom: "1px solid rgba(255,255,255,0.04)",
                    background: "transparent",
                  }}
                >
                  <div
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: "0.75rem",
                      color: "rgba(255,255,255,0.25)",
                    }}
                  >
                    {race.round}
                  </div>
                  <div>
                    <div
                      style={{
                        fontFamily: "'Russo One', sans-serif",
                        fontSize: "0.82rem",
                        color: "white",
                      }}
                    >
                      {race.raceName}
                    </div>
                    <div
                      style={{
                        fontFamily: "'Rajdhani', sans-serif",
                        fontSize: "0.7rem",
                        color: "rgba(255,255,255,0.25)",
                        letterSpacing: "0.08em",
                      }}
                    >
                      {race.Circuit?.Location?.country}
                    </div>
                  </div>
                  <div
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: "0.8rem",
                      color: "rgba(255,255,255,0.4)",
                      textAlign: "center",
                    }}
                  >
                    {result?.grid || "—"}
                  </div>
                  <div style={{ textAlign: "center" }}>
                    <span
                      style={{
                        fontFamily: "'Russo One', sans-serif",
                        fontSize: "0.85rem",
                        color: isWin
                          ? "#FFD700"
                          : isPodium
                            ? "#FF8C00"
                            : "white",
                      }}
                    >
                      {result?.position || result?.status || "—"}
                    </span>
                  </div>
                  <div
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: "0.8rem",
                      color: "rgba(255,255,255,0.5)",
                      textAlign: "center",
                    }}
                  >
                    {result?.points || "0"}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div
            style={{
              border: "1px solid rgba(255,255,255,0.06)",
              padding: "3rem",
              textAlign: "center",
            }}
          >
            <span
              style={{
                fontFamily: "'Rajdhani', sans-serif",
                fontWeight: 600,
                fontSize: "0.8rem",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.2)",
              }}
            >
              No 2025 season data available
            </span>
          </div>
        )}

        {/* Back */}
        <div
          style={{
            marginTop: "3rem",
            paddingTop: "1.5rem",
            borderTop: "1px solid rgba(255,255,255,0.05)",
          }}
        >
          <Link
            href="/drivers"
            style={{
              fontFamily: "'Rajdhani', sans-serif",
              fontWeight: 600,
              fontSize: "0.75rem",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.3)",
              textDecoration: "none",
            }}
          >
            ← Back to Drivers
          </Link>
        </div>
      </div>

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </main>
  );
}
