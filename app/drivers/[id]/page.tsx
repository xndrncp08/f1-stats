import { Suspense } from "react";
import DriverProfile from "./DriverProfile";

export default function DriverProfilePage({
  params,
}: {
  params: { driverId: string };
}) {
  return (
    <Suspense fallback={
      <main className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="w-10 h-10 border-2 border-red-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-zinc-500 text-sm font-bold uppercase tracking-widest">Loading Driver</p>
        </div>
      </main>
    }>
      <DriverProfile driverId={params.driverId} />
    </Suspense>
  );
}