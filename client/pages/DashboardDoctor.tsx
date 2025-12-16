import { useState } from "react";
import { Users, Clock, TrendingUp, Calendar, MessageSquare, Video, Phone, Search, Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  mockPatients,
  mockTodaySlots,
  mockConsultationHistory,
} from "@/lib/mock-data";

export default function DashboardDoctor() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredPatients, setFilteredPatients] = useState(mockPatients);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    const filtered = mockPatients.filter((patient) =>
      patient.name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredPatients(filtered);
  };

  const todayAppointmentCount = mockTodaySlots.filter((slot) => !slot.available).length;
  const pendingConsultations = mockConsultationHistory.length;

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto px-4 py-6">
        {/* Welcome Banner */}
        <div className="bg-gradient-to-r from-primary to-secondary text-white rounded-lg p-6 mb-6 shadow-lg">
          <h1 className="text-2xl font-bold font-roboto mb-2">
            Welcome, Dr. Johnson! 👨‍⚕️
          </h1>
          <p className="text-primary/20">Manage your appointments and patients</p>
        </div>

        {/* Metrics Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-card border border-border rounded-lg p-6 shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm">Today's Appointments</p>
                <p className="text-3xl font-bold text-primary font-roboto">
                  {todayAppointmentCount}
                </p>
              </div>
              <Calendar className="text-blue-500" size={32} />
            </div>
          </div>
          <div className="bg-card border border-border rounded-lg p-6 shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm">Pending Consultations</p>
                <p className="text-3xl font-bold text-secondary font-roboto">
                  {pendingConsultations}
                </p>
              </div>
              <Clock className="text-orange-500" size={32} />
            </div>
          </div>
          <div className="bg-card border border-border rounded-lg p-6 shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm">Total Patients</p>
                <p className="text-3xl font-bold text-primary font-roboto">
                  {mockPatients.length}
                </p>
              </div>
              <Users className="text-green-500" size={32} />
            </div>
          </div>
        </div>

        {/* Today's Schedule */}
        <h2 className="text-lg font-bold text-foreground mb-4 font-roboto">
          Today's Schedule
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
          {mockTodaySlots.map((slot) => (
            <div
              key={slot.id}
              className={`rounded-lg p-4 border text-center cursor-pointer transition-all ${
                slot.available
                  ? "bg-card border-border hover:border-primary hover:shadow"
                  : "bg-muted border-border opacity-60"
              }`}
            >
              <p className="font-semibold text-foreground">{slot.time}</p>
              <p className="text-xs text-muted-foreground">
                {slot.available ? "Available" : "Booked"}
              </p>
            </div>
          ))}
        </div>

        {/* Patient Search */}
        <h2 className="text-lg font-bold text-foreground mb-4 font-roboto">
          My Patients
        </h2>
        <div className="mb-4">
          <div className="relative">
            <Search className="absolute left-3 top-3 text-muted-foreground" size={20} />
            <Input
              type="text"
              placeholder="Search patients..."
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        <div className="space-y-3 mb-6">
          {filteredPatients.map((patient) => (
            <div
              key={patient.id}
              className="bg-card border border-border rounded-lg p-4 shadow hover:shadow-md transition-shadow"
            >
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h4 className="font-semibold text-foreground">{patient.name}</h4>
                  <p className="text-sm text-muted-foreground">
                    Age: {patient.age} • {patient.condition}
                  </p>
                </div>
                <span className="bg-primary/10 text-primary text-xs px-2 py-1 rounded">
                  {patient.department}
                </span>
              </div>
              <p className="text-xs text-muted-foreground mb-4">
                Last visit: {patient.lastVisit}
              </p>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  className="flex-1 gap-2"
                >
                  <MessageSquare size={16} />
                  Chat
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="flex-1 gap-2"
                >
                  <Video size={16} />
                  Video Call
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="flex-1"
                >
                  <Phone size={16} />
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Consultation History */}
        <h2 className="text-lg font-bold text-foreground mb-4 font-roboto">
          Recent Consultations
        </h2>
        <div className="space-y-3">
          {mockConsultationHistory.map((consultation) => (
            <div
              key={consultation.id}
              className="bg-card border border-border rounded-lg p-4 shadow hover:shadow-md transition-shadow"
            >
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h4 className="font-semibold text-foreground">
                    {consultation.patientName}
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    {consultation.date} • {consultation.duration}
                  </p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                📝 {consultation.notes}
              </p>
            </div>
          ))}
        </div>

        {/* Analytics Cards */}
        <div className="mt-8 pt-8 border-t border-border">
          <h2 className="text-lg font-bold text-foreground mb-4 font-roboto">
            Analytics
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-card border border-border rounded-lg p-6 shadow">
              <div className="flex items-center gap-3 mb-4">
                <TrendingUp className="text-green-500" size={24} />
                <h3 className="font-semibold text-foreground">Patient Retention</h3>
              </div>
              <div className="bg-muted rounded-full h-2 mb-2">
                <div className="bg-green-500 h-2 rounded-full" style={{ width: "78%" }} />
              </div>
              <p className="text-sm text-muted-foreground">78% retention rate</p>
            </div>
            <div className="bg-card border border-border rounded-lg p-6 shadow">
              <div className="flex items-center gap-3 mb-4">
                <Clock className="text-blue-500" size={24} />
                <h3 className="font-semibold text-foreground">Avg Consultation</h3>
              </div>
              <p className="text-2xl font-bold text-primary font-roboto">28 mins</p>
              <p className="text-sm text-muted-foreground">Average duration</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
