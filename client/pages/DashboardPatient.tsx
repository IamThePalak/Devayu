import { useState, useEffect } from "react";
import { Heart, Pill, Zap, FileText, Clock, MapPin, Phone, Search, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  mockAppointments,
  mockPrescriptions,
  mockHealthTips,
  mockVitals,
  mockMedicines,
} from "@/lib/mock-data";

export default function DashboardPatient() {
  const [userName] = useState(localStorage.getItem("userName") || "User");
  const [currentTipIndex, setCurrentTipIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredMedicines, setFilteredMedicines] = useState(mockMedicines);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTipIndex((prev) => (prev + 1) % mockHealthTips.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const filtered = mockMedicines.filter((med) =>
      med.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredMedicines(filtered);
  }, [searchQuery]);

  const upcomingAppointments = mockAppointments.filter(
    (apt) => apt.status === "upcoming"
  );

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 py-6">
        {/* Welcome Banner */}
        <div className="bg-gradient-to-r from-primary to-secondary text-white rounded-lg p-6 mb-6 shadow-lg">
          <h1 className="text-2xl font-bold font-roboto mb-2">
            Hello {userName}! 👋
          </h1>
          <p className="text-primary/20">Track your health journey with Devayu</p>
        </div>

        {/* Health Tip Carousel */}
        <div className="bg-card border border-border rounded-lg p-4 mb-6 shadow">
          <div className="flex items-center gap-3 mb-3">
            <Zap className="text-yellow-500" size={20} />
            <h3 className="font-semibold text-foreground">Daily Health Tip</h3>
          </div>
          <p className="text-muted-foreground mb-4">
            {mockHealthTips[currentTipIndex]}
          </p>
          <div className="flex gap-2">
            {mockHealthTips.map((_, idx) => (
              <div
                key={idx}
                className={`h-2 flex-1 rounded-full transition-all ${
                  idx === currentTipIndex ? "bg-primary" : "bg-muted"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Quick Action Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {[
            { icon: Clock, label: "Book Appointment", color: "text-blue-500" },
            { icon: Pill, label: "My Prescriptions", color: "text-green-500" },
            { icon: Zap, label: "Symptom Checker", color: "text-orange-500" },
            { icon: FileText, label: "Health Records", color: "text-purple-500" },
          ].map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="bg-card border border-border rounded-lg p-4 cursor-pointer hover:shadow-lg hover:border-primary transition-all group"
              >
                <Icon className={`${item.color} mb-2 group-hover:scale-110 transition-transform`} size={24} />
                <p className="text-xs font-medium text-foreground">{item.label}</p>
              </div>
            );
          })}
        </div>

        {/* Vital Stats */}
        <h2 className="text-lg font-bold text-foreground mb-4 font-roboto">
          Your Vital Stats
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {[
            { label: "Blood Pressure", value: mockVitals.bloodPressure, unit: "mmHg" },
            { label: "Sugar Level", value: mockVitals.sugarLevel, unit: "" },
            { label: "Heart Rate", value: mockVitals.heartRate, unit: "" },
            { label: "Temperature", value: mockVitals.temperature, unit: "" },
          ].map((vital, idx) => (
            <div key={idx} className="bg-card border border-border rounded-lg p-4 shadow">
              <p className="text-xs text-muted-foreground mb-2">{vital.label}</p>
              <p className="text-2xl font-bold text-primary font-roboto">
                {vital.value}
              </p>
            </div>
          ))}
        </div>

        {/* Upcoming Appointments */}
        <h2 className="text-lg font-bold text-foreground mb-4 font-roboto">
          Upcoming Appointments
        </h2>
        <div className="space-y-3 mb-6">
          {upcomingAppointments.map((apt) => (
            <div
              key={apt.id}
              className="bg-card border border-border rounded-lg p-4 shadow hover:shadow-md transition-shadow"
            >
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h4 className="font-semibold text-foreground">{apt.doctorName}</h4>
                  <p className="text-sm text-muted-foreground">{apt.department}</p>
                </div>
                <span className="bg-primary/10 text-primary text-xs px-2 py-1 rounded">
                  {apt.type}
                </span>
              </div>
              <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                <div className="flex items-center gap-1">
                  <Clock size={16} />
                  {apt.time}
                </div>
                <div className="flex items-center gap-1">
                  <MapPin size={16} />
                  {apt.date}
                </div>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1"
                >
                  Reschedule
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1 text-destructive hover:text-destructive"
                >
                  Cancel
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Medicine Search */}
        <h2 className="text-lg font-bold text-foreground mb-4 font-roboto">
          Medicine Availability
        </h2>
        <div className="mb-4">
          <div className="relative">
            <Search className="absolute left-3 top-3 text-muted-foreground" size={20} />
            <Input
              type="text"
              placeholder="Search medicines..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        <div className="space-y-3 mb-6">
          {filteredMedicines.map((med) => (
            <div
              key={med.id}
              className="bg-card border border-border rounded-lg p-4 shadow hover:shadow-md transition-shadow"
            >
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h4 className="font-semibold text-foreground">{med.name}</h4>
                  <p className="text-sm text-muted-foreground">{med.brand}</p>
                </div>
                <p className="text-lg font-bold text-primary">{med.price}</p>
              </div>
              <div className="flex items-center justify-between">
                <span
                  className={`text-xs px-2 py-1 rounded ${
                    med.availability === "In Stock"
                      ? "bg-green-500/10 text-green-700"
                      : "bg-yellow-500/10 text-yellow-700"
                  }`}
                >
                  {med.availability}
                </span>
                <Button size="sm" className="bg-primary hover:bg-primary/90">
                  Order Now
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* My Prescriptions */}
        <h2 className="text-lg font-bold text-foreground mb-4 font-roboto">
          Active Prescriptions
        </h2>
        <div className="space-y-3">
          {mockPrescriptions.map((rx) => (
            <div
              key={rx.id}
              className="bg-card border border-border rounded-lg p-4 shadow hover:shadow-md transition-shadow"
            >
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h4 className="font-semibold text-foreground">{rx.medicineName}</h4>
                  <p className="text-sm text-muted-foreground">
                    {rx.dosage} • {rx.frequency}
                  </p>
                </div>
                <ChevronRight className="text-muted-foreground" size={20} />
              </div>
              <p className="text-xs text-muted-foreground">
                Prescribed by {rx.prescribedBy}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
