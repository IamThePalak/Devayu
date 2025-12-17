import { useState } from "react";
import {
  Activity,
  TrendingUp,
  TrendingDown,
  Plus,
  Calendar,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { mockVitals } from "@/lib/mock-data";

interface VitalRecord {
  id: number;
  date: string;
  bloodPressure: string;
  sugarLevel: string;
  weight: number;
  heartRate: number;
  temperature: string;
  notes?: string;
}

export default function HealthRecords() {
  const [records, setRecords] = useState<VitalRecord[]>([
    {
      id: 1,
      date: "2024-01-12",
      bloodPressure: "120/80",
      sugarLevel: "95 mg/dL",
      weight: 75,
      heartRate: 72,
      temperature: "98.6°F",
      notes: "Regular checkup",
    },
    {
      id: 2,
      date: "2024-01-08",
      bloodPressure: "118/78",
      sugarLevel: "92 mg/dL",
      weight: 75.2,
      heartRate: 70,
      temperature: "98.4°F",
      notes: "Post-exercise measurement",
    },
    {
      id: 3,
      date: "2024-01-05",
      bloodPressure: "122/82",
      sugarLevel: "98 mg/dL",
      weight: 75.5,
      heartRate: 74,
      temperature: "98.8°F",
    },
  ]);

  const [showAddRecord, setShowAddRecord] = useState(false);
  const [newRecord, setNewRecord] = useState({
    date: new Date().toISOString().split("T")[0],
    bloodPressure: "",
    sugarLevel: "",
    weight: "",
    heartRate: "",
    temperature: "",
    notes: "",
  });

  const handleAddRecord = () => {
    if (newRecord.bloodPressure && newRecord.sugarLevel) {
      const vitalRecord: VitalRecord = {
        id: Math.max(...records.map((r) => r.id), 0) + 1,
        date: newRecord.date,
        bloodPressure: newRecord.bloodPressure,
        sugarLevel: newRecord.sugarLevel,
        weight: parseFloat(newRecord.weight) || 0,
        heartRate: parseInt(newRecord.heartRate) || 0,
        temperature: newRecord.temperature,
        notes: newRecord.notes,
      };
      setRecords([vitalRecord, ...records]);
      setShowAddRecord(false);
      setNewRecord({
        date: new Date().toISOString().split("T")[0],
        bloodPressure: "",
        sugarLevel: "",
        weight: "",
        heartRate: "",
        temperature: "",
        notes: "",
      });
    }
  };

  const getTrendIcon = (
    current: number,
    previous: number,
    isHigherBetter: boolean,
  ) => {
    if (current === previous) return null;
    const isUp = current > previous;
    const isBetter = isHigherBetter ? isUp : !isUp;

    return (
      <div
        className={`flex items-center gap-1 ${isBetter ? "text-green-600" : "text-red-600"}`}
      >
        {isBetter ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
        <span className="text-xs">
          {Math.abs(((current - previous) / previous) * 100).toFixed(1)}%
        </span>
      </div>
    );
  };

  const latestRecord = records[0];
  const previousRecord = records[1];

  return (
    <div className="min-h-screen bg-background pb-24">
      <div className="max-w-4xl mx-auto px-4 py-6">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-foreground font-roboto mb-2">
            Health Records
          </h1>
          <p className="text-muted-foreground">
            Track and manage your health vitals
          </p>
        </div>

        {/* Add Record Button */}
        <Button
          onClick={() => setShowAddRecord(true)}
          className="w-full bg-primary hover:bg-primary/90 text-white mb-6 gap-2"
        >
          <Plus size={20} />
          Add New Record
        </Button>

        {/* Latest Vitals Summary */}
        {latestRecord && (
          <div className="mb-8">
            <h2 className="text-lg font-semibold text-foreground mb-4">
              Latest Vitals
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {/* Blood Pressure */}
              <div className="bg-card border border-border rounded-lg p-4 shadow">
                <div className="flex justify-between items-start mb-2">
                  <p className="text-sm text-muted-foreground">
                    Blood Pressure
                  </p>
                  {previousRecord &&
                    getTrendIcon(
                      parseInt(latestRecord.bloodPressure.split("/")[0]),
                      parseInt(previousRecord.bloodPressure.split("/")[0]),
                      false,
                    )}
                </div>
                <p className="text-2xl font-bold text-primary">
                  {latestRecord.bloodPressure}
                </p>
                <p className="text-xs text-muted-foreground mt-1">mmHg</p>
              </div>

              {/* Sugar Level */}
              <div className="bg-card border border-border rounded-lg p-4 shadow">
                <div className="flex justify-between items-start mb-2">
                  <p className="text-sm text-muted-foreground">Sugar Level</p>
                  {previousRecord && (
                    <div className="text-green-600 flex items-center gap-1 text-xs">
                      <TrendingDown size={16} />
                      5%
                    </div>
                  )}
                </div>
                <p className="text-2xl font-bold text-secondary">
                  {latestRecord.sugarLevel}
                </p>
              </div>

              {/* Heart Rate */}
              <div className="bg-card border border-border rounded-lg p-4 shadow">
                <div className="flex justify-between items-start mb-2">
                  <p className="text-sm text-muted-foreground">Heart Rate</p>
                </div>
                <p className="text-2xl font-bold text-primary">
                  {latestRecord.heartRate}
                </p>
                <p className="text-xs text-muted-foreground mt-1">bpm</p>
              </div>

              {/* Weight */}
              <div className="bg-card border border-border rounded-lg p-4 shadow">
                <p className="text-sm text-muted-foreground mb-2">Weight</p>
                <p className="text-2xl font-bold text-primary">
                  {latestRecord.weight}
                </p>
                <p className="text-xs text-muted-foreground mt-1">kg</p>
              </div>

              {/* Temperature */}
              <div className="bg-card border border-border rounded-lg p-4 shadow">
                <p className="text-sm text-muted-foreground mb-2">
                  Temperature
                </p>
                <p className="text-2xl font-bold text-primary">
                  {latestRecord.temperature}
                </p>
              </div>

              {/* Last Updated */}
              <div className="bg-card border border-border rounded-lg p-4 shadow">
                <div className="flex items-center gap-2 mb-2">
                  <Calendar size={16} className="text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">Last Updated</p>
                </div>
                <p className="text-lg font-bold text-foreground">
                  {latestRecord.date}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Medical History */}
        <h2 className="text-lg font-semibold text-foreground mb-4">
          Records History
        </h2>
        <div className="space-y-4">
          {records.map((record) => (
            <div
              key={record.id}
              className="bg-card border border-border rounded-lg p-5 shadow hover:shadow-md transition-shadow"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <Calendar size={16} className="text-muted-foreground" />
                    <p className="font-semibold text-foreground">
                      {record.date}
                    </p>
                  </div>
                  {record.notes && (
                    <p className="text-sm text-muted-foreground">
                      {record.notes}
                    </p>
                  )}
                </div>
                <Activity className="text-primary" size={20} />
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <p className="text-xs text-muted-foreground mb-1">
                    Blood Pressure
                  </p>
                  <p className="font-semibold text-foreground">
                    {record.bloodPressure}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">
                    Sugar Level
                  </p>
                  <p className="font-semibold text-foreground">
                    {record.sugarLevel}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">
                    Heart Rate
                  </p>
                  <p className="font-semibold text-foreground">
                    {record.heartRate} bpm
                  </p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Weight</p>
                  <p className="font-semibold text-foreground">
                    {record.weight} kg
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add Record Dialog */}
      <Dialog open={showAddRecord} onOpenChange={setShowAddRecord}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Add Health Record</DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <div>
              <label className="block font-semibold text-foreground mb-2">
                Date
              </label>
              <Input
                type="date"
                value={newRecord.date}
                onChange={(e) =>
                  setNewRecord({ ...newRecord, date: e.target.value })
                }
              />
            </div>

            <div>
              <label className="block font-semibold text-foreground mb-2">
                Blood Pressure (e.g., 120/80)
              </label>
              <Input
                placeholder="120/80"
                value={newRecord.bloodPressure}
                onChange={(e) =>
                  setNewRecord({ ...newRecord, bloodPressure: e.target.value })
                }
              />
            </div>

            <div>
              <label className="block font-semibold text-foreground mb-2">
                Sugar Level (e.g., 95 mg/dL)
              </label>
              <Input
                placeholder="95 mg/dL"
                value={newRecord.sugarLevel}
                onChange={(e) =>
                  setNewRecord({ ...newRecord, sugarLevel: e.target.value })
                }
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-semibold text-foreground mb-2 text-sm">
                  Weight (kg)
                </label>
                <Input
                  type="number"
                  placeholder="75"
                  value={newRecord.weight}
                  onChange={(e) =>
                    setNewRecord({ ...newRecord, weight: e.target.value })
                  }
                />
              </div>

              <div>
                <label className="block font-semibold text-foreground mb-2 text-sm">
                  Heart Rate (bpm)
                </label>
                <Input
                  type="number"
                  placeholder="72"
                  value={newRecord.heartRate}
                  onChange={(e) =>
                    setNewRecord({ ...newRecord, heartRate: e.target.value })
                  }
                />
              </div>
            </div>

            <div>
              <label className="block font-semibold text-foreground mb-2">
                Temperature
              </label>
              <Input
                placeholder="98.6°F"
                value={newRecord.temperature}
                onChange={(e) =>
                  setNewRecord({ ...newRecord, temperature: e.target.value })
                }
              />
            </div>

            <div>
              <label className="block font-semibold text-foreground mb-2">
                Notes
              </label>
              <textarea
                placeholder="Any additional notes..."
                value={newRecord.notes}
                onChange={(e) =>
                  setNewRecord({ ...newRecord, notes: e.target.value })
                }
                className="w-full border border-border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-primary"
                rows={2}
              />
            </div>

            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={() => setShowAddRecord(false)}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                onClick={handleAddRecord}
                className="flex-1 bg-primary hover:bg-primary/90 text-white"
              >
                Save Record
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
