import { Card, CardContent } from "@/components/ui/card";

export default function EmptyState() {
  return (
    <Card className="bg-zinc-900 border-zinc-800 rounded-none overflow-hidden">
      <div className="h-1 bg-zinc-700" />
      <CardContent className="py-32 text-center">
        <p className="text-zinc-400 mb-4 text-xl font-bold uppercase tracking-wider">
          No telemetry data available
        </p>
        <p className="text-sm text-zinc-600 font-semibold uppercase tracking-wider">
          Start the demo to see simulated real-time telemetry
        </p>
      </CardContent>
    </Card>
  );
}