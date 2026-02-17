import Link from "next/link";

export default function FeaturesGrid() {
  const features = [
    {
      href: "/drivers",
      title: "Driver Profiles",
      description:
        "Detailed statistics, career highlights, and performance metrics",
      gradient: "from-red-600/20 to-red-900/20",
      borderColor: "border-red-700/30",
      hoverGradient: "hover:from-red-600/30 hover:to-red-900/30",
      textColor: "text-red-400",
    },
    {
      href: "/live",
      title: "Live Telemetry",
      description: "Real-time speed, RPM, and gear data during race sessions",
      gradient: "from-red-600/20 to-red-900/20",
      borderColor: "border-red-700/30",
      hoverGradient: "hover:from-red-600/30 hover:to-red-900/30",
      textColor: "text-red-400",
    },
    {
      href: "/compare",
      title: "Compare Drivers",
      description: "Head-to-head statistics and performance comparisons",
      gradient: "from-red-600/20 to-red-900/20",
      borderColor: "border-red-700/30",
      hoverGradient: "hover:from-red-600/30 hover:to-red-900/30",
      textColor: "text-red-400",
    },
    {
      href: "/calendar",
      title: "Race Calendar",
      description: "Complete schedule with timezone conversion and countdowns",
      gradient: "from-red-600/20 to-red-900/20",
      borderColor: "border-red-700/30",
      hoverGradient: "hover:from-red-600/30 hover:to-red-900/30",
      textColor: "text-red-400",
    },
  ];

  return (
    <section className="px-4 py-16">
      <div className="mb-12">
        <div className="flex items-center gap-3 mb-3">
          <div className="h-10 w-1.5 bg-gradient-to-b from-red-600 to-red-500 rounded-full" />
          <span className="text-xs font-bold text-red-500 uppercase tracking-wider">
            Explore
          </span>
        </div>
        <h2 className="text-3xl md:text-4xl font-black bg-gradient-to-r from-white to-zinc-300 bg-clip-text text-transparent">
          Features
        </h2>
        <p className="text-zinc-400 text-base">
          Comprehensive F1 analytics and insights at your fingertips
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((feature) => {
          return (
            <Link
              key={feature.href}
              href={feature.href}
              className="group/feature"
            >
              <div
                className={`bg-gradient-to-br ${feature.gradient} ${feature.borderColor} border backdrop-blur-sm rounded-xl transition-all duration-300 hover:border-red-600/40 cursor-pointer group-hover/feature:translate-y-[-4px] h-full overflow-hidden relative ${feature.hoverGradient}`}
              >
                {/* Accent top border */}
                <div className="h-1 bg-gradient-to-r from-red-600 to-red-500" />

                <div className="p-6 relative z-10">
                  {/* Title */}
                  <h3
                    className={`text-2xl font-black ${feature.textColor} group-hover/feature:text-red-400 transition-colors duration-300 mb-3`}
                  >
                    {feature.title}
                  </h3>

                  {/* Description */}
                  <p className="text-zinc-400 text-sm leading-relaxed mb-4">
                    {feature.description}
                  </p>

                  {/* Explore link */}
                  <div className="text-red-500 font-bold text-sm">
                    <span>Explore</span>
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
