import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface DriverSelectorProps {
  driver1Id: string;
  driver2Id: string;
  onDriver1Change: (id: string) => void;
  onDriver2Change: (id: string) => void;
  allDrivers: any[];
}

export default function DriverSelector({
  driver1Id,
  driver2Id,
  onDriver1Change,
  onDriver2Change,
  allDrivers,
}: DriverSelectorProps) {
  return (
    <Card className="bg-zinc-900 border-zinc-800 mb-12 rounded-none overflow-hidden">
      <div className="h-1 bg-red-600" />
      <CardHeader className="border-b border-zinc-800/50 bg-zinc-900/50 backdrop-blur">
        <div className="flex items-center gap-3">
          <div className="h-8 w-1 bg-red-600" />
          <CardTitle className="text-2xl font-black text-white tracking-tight">
            SELECT DRIVERS
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent className="p-8">
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="text-sm text-zinc-500 mb-3 block uppercase tracking-wider font-bold">
              Driver 1
            </label>
            <Select value={driver1Id} onValueChange={onDriver1Change}>
              <SelectTrigger className="bg-zinc-800 border-zinc-700 text-white h-14 rounded-none font-bold text-lg">
                <SelectValue placeholder="Select driver" />
              </SelectTrigger>
              <SelectContent className="bg-zinc-800 border-zinc-700 rounded-none">
                {allDrivers?.map((driver: any) => (
                  <SelectItem
                    key={driver.driverId}
                    value={driver.driverId}
                    className="text-white hover:bg-zinc-700 font-bold"
                  >
                    {driver.givenName} {driver.familyName}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="text-sm text-zinc-500 mb-3 block uppercase tracking-wider font-bold">
              Driver 2
            </label>
            <Select value={driver2Id} onValueChange={onDriver2Change}>
              <SelectTrigger className="bg-zinc-800 border-zinc-700 text-white h-14 rounded-none font-bold text-lg">
                <SelectValue placeholder="Select driver" />
              </SelectTrigger>
              <SelectContent className="bg-zinc-800 border-zinc-700 rounded-none">
                {allDrivers?.map((driver: any) => (
                  <SelectItem
                    key={driver.driverId}
                    value={driver.driverId}
                    className="text-white hover:bg-zinc-700 font-bold"
                  >
                    {driver.givenName} {driver.familyName}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
