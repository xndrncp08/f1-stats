import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function FeaturesGrid() {
  const features = [
    {
      href: "/drivers",
      title: "Driver Profiles",
      description: "Detailed statistics, career highlights, and performance metrics",
    },
    {
      href: "/live",
      title: "Live Telemetry",
      description: "Real-time speed, RPM, and gear data during race sessions",
    },
    {
      href: "/compare",
      title: "Compare Drivers",
      description: "Head-to-head statistics and performance comparisons",
    },
    {
      href: "/calendar",
      title: "Race Calendar",
      description: "Complete schedule with timezone conversion and countdowns",
    },
  ];

  return (
    <section className="container mx-auto px-4 py-16 pb-24">
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-3 mb-3">
          <div className="h-6 w-1 bg-red-600" />
          <span className="text-sm font-bold text-red-500 uppercase tracking-wider">
            Features
          </span>
        </div>
        <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight">
          Explore the Platform
        </h2>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((feature) => (
          <Link key={feature.href} href={feature.href}>
            <Card className="bg-zinc-900 border-zinc-800 hover:border-red-600 transition-all duration-300 hover:translate-y-[-4px] hover:shadow-xl hover:shadow-red-600/20 cursor-pointer group rounded-none overflow-hidden h-full">
              <div className="h-1 bg-red-600" />
              <CardHeader className="pb-3">
                <CardTitle className="text-xl font-bold">
                  {feature.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-zinc-400 leading-relaxed">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  );
}