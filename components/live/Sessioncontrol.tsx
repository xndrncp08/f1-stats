import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface SessionControlProps {
  isLive: boolean;
  onToggle: () => void;
}

export default function SessionControl({ isLive, onToggle }: SessionControlProps) {
  return (
    <Card className="bg-zinc-900 border-zinc-800 mb-12 rounded-none overflow-hidden">
      <div className="h-1 bg-red-600" />
      <CardHeader className="border-b border-zinc-800/50 bg-zinc-900/50 backdrop-blur">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-8 w-1 bg-red-600" />
            <CardTitle className="text-2xl font-black text-white tracking-tight">
              SESSION STATUS
            </CardTitle>
          </div>
          <Button
            onClick={onToggle}
            className={`rounded-none font-bold px-8 h-12 ${
              isLive
                ? "bg-red-600 hover:bg-red-700 text-white"
                : "bg-white text-black hover:bg-white/90"
            }`}
          >
            {isLive ? "STOP DEMO" : "START DEMO"}
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-8">
        <div className="flex items-center gap-4">
          <div
            className={`h-4 w-4 rounded-full ${isLive ? "bg-red-600 animate-pulse" : "bg-zinc-700"}`}
          />
          <p className="text-lg font-bold text-white uppercase tracking-wider">
            {isLive ? "DEMO TELEMETRY STREAMING" : "NO ACTIVE SESSION"}
          </p>
        </div>
        {!isLive && (
          <p className="text-zinc-500 mt-3 text-sm font-semibold">
            Click "START DEMO" to see simulated real-time data
          </p>
        )}
      </CardContent>
    </Card>
  );
}