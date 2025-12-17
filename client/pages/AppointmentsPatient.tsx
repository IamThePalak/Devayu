import { useState } from "react";
import {
  Calendar,
  Clock,
  MapPin,
  Plus,
  X,
  Check,
  AlertCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { mockAppointments, mockDoctors } from "@/lib/mock-data";

interface Appointment {
  id: number;
  doctorName: string;
  date: string;
  time: string;
  status: "upcoming" | "completed" | "cancelled";
  department: string;
  type: string;
  reason?: string;
}

export default function AppointmentsPatient() {
  const [appointments, setAppointments] =
    useState<Appointment[]>(mockAppointments);
  const [filterStatus, setFilterStatus] = useState<
    "all" | "upcoming" | "completed"
  >("all");
  const [showBooking, setShowBooking] = useState(false);
  const [showReschedule, setShowReschedule] = useState(false);
  const [selectedAppointment, setSelectedAppointment] =
    useState<Appointment | null>(null);
  const [selectedDoctor, setSelectedDoctor] = useState<any>(null);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [reason, setReason] = useState("");

  const filteredAppointments =
    filterStatus === "all"
      ? appointments
      : appointments.filter((apt) => apt.status === filterStatus);

  const handleBookAppointment = () => {
    if (selectedDoctor && selectedDate && selectedTime) {
      const newAppointment: Appointment = {
        id: Math.max(...appointments.map((a) => a.id)) + 1,
        doctorName: selectedDoctor.name,
        date: selectedDate,
        time: selectedTime,
        status: "upcoming",
        department: selectedDoctor.specialization,
        type: "Consultation",
        reason,
      };
      setAppointments([...appointments, newAppointment]);
      setShowBooking(false);
      setSelectedDoctor(null);
      setSelectedDate("");
      setSelectedTime("");
      setReason("");
    }
  };

  const handleReschedule = () => {
    if (selectedAppointment && selectedDate && selectedTime) {
      setAppointments(
        appointments.map((apt) =>
          apt.id === selectedAppointment.id
            ? { ...apt, date: selectedDate, time: selectedTime }
            : apt,
        ),
      );
      setShowReschedule(false);
      setSelectedAppointment(null);
      setSelectedDate("");
      setSelectedTime("");
    }
  };

  const handleCancelAppointment = (id: number) => {
    setAppointments(
      appointments.map((apt) =>
        apt.id === id ? { ...apt, status: "cancelled" } : apt,
      ),
    );
  };

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case "upcoming":
        return "bg-blue-500/10 text-blue-700";
      case "completed":
        return "bg-green-500/10 text-green-700";
      case "cancelled":
        return "bg-red-500/10 text-red-700";
      default:
        return "bg-gray-500/10 text-gray-700";
    }
  };

  const timeSlots = [
    "09:00 AM",
    "09:30 AM",
    "10:00 AM",
    "10:30 AM",
    "11:00 AM",
    "02:00 PM",
    "02:30 PM",
    "03:00 PM",
    "03:30 PM",
    "04:00 PM",
  ];

  return (
    <div className="min-h-screen bg-background pb-24">
      <div className="max-w-4xl mx-auto px-4 py-6">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-foreground font-roboto mb-2">
            My Appointments
          </h1>
          <p className="text-muted-foreground">
            Manage your medical appointments
          </p>
        </div>

        {/* Book New Appointment Button */}
        <Button
          onClick={() => setShowBooking(true)}
          className="w-full bg-primary hover:bg-primary/90 text-white mb-6 gap-2"
        >
          <Plus size={20} />
          Book New Appointment
        </Button>

        {/* Filter Tabs */}
        <div className="flex gap-2 mb-6">
          {["all", "upcoming", "completed"].map((status) => (
            <Button
              key={status}
              variant={filterStatus === status ? "default" : "outline"}
              onClick={() => setFilterStatus(status as any)}
              className="capitalize"
            >
              {status}
            </Button>
          ))}
        </div>

        {/* Appointments List */}
        <div className="space-y-4">
          {filteredAppointments.length === 0 ? (
            <div className="bg-card border border-border rounded-lg p-8 text-center">
              <Calendar className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
              <p className="text-muted-foreground">No appointments found</p>
            </div>
          ) : (
            filteredAppointments.map((appointment) => (
              <div
                key={appointment.id}
                className={`bg-card border border-border rounded-lg p-5 shadow hover:shadow-md transition-shadow ${
                  appointment.status === "cancelled" ? "opacity-60" : ""
                }`}
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-foreground">
                      {appointment.doctorName}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {appointment.department}
                    </p>
                  </div>
                  <span
                    className={`text-xs px-3 py-1 rounded-full capitalize ${getStatusBadgeColor(
                      appointment.status,
                    )}`}
                  >
                    {appointment.status}
                  </span>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <Calendar size={16} />
                    {appointment.date}
                  </div>
                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <Clock size={16} />
                    {appointment.time}
                  </div>
                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <AlertCircle size={16} />
                    {appointment.type}
                  </div>
                </div>

                {appointment.status === "upcoming" && (
                  <div className="flex gap-2 pt-4 border-t border-border">
                    <Button
                      size="sm"
                      variant="outline"
                      className="flex-1"
                      onClick={() => {
                        setSelectedAppointment(appointment);
                        setShowReschedule(true);
                      }}
                    >
                      Reschedule
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="flex-1 text-destructive hover:text-destructive"
                      onClick={() => handleCancelAppointment(appointment.id)}
                    >
                      Cancel
                    </Button>
                  </div>
                )}

                {appointment.status === "completed" && (
                  <div className="flex gap-2 pt-4 border-t border-border">
                    <Button size="sm" variant="outline" className="flex-1">
                      View Records
                    </Button>
                    <Button size="sm" variant="outline" className="flex-1">
                      Book Again
                    </Button>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>

      {/* Book Appointment Dialog */}
      <Dialog open={showBooking} onOpenChange={setShowBooking}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Book New Appointment</DialogTitle>
            <DialogDescription>
              Select a doctor, date, and time for your appointment
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6">
            {/* Doctor Selection */}
            <div>
              <h4 className="font-semibold text-foreground mb-3">
                Select Doctor
              </h4>
              <div className="space-y-2">
                {mockDoctors.map((doctor) => (
                  <div
                    key={doctor.id}
                    onClick={() => setSelectedDoctor(doctor)}
                    className={`p-4 border rounded-lg cursor-pointer transition-all ${
                      selectedDoctor?.id === doctor.id
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-primary"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div>
                        <p className="font-medium text-foreground">
                          {doctor.name}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {doctor.specialization}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Date Selection */}
            <div>
              <label className="block font-semibold text-foreground mb-2">
                Select Date
              </label>
              <Input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-full"
              />
            </div>

            {/* Time Selection */}
            <div>
              <label className="block font-semibold text-foreground mb-3">
                Select Time
              </label>
              <div className="grid grid-cols-3 gap-2">
                {timeSlots.map((time) => (
                  <button
                    key={time}
                    onClick={() => setSelectedTime(time)}
                    className={`p-2 rounded border text-sm font-medium transition-all ${
                      selectedTime === time
                        ? "bg-primary text-white border-primary"
                        : "bg-card border-border hover:border-primary"
                    }`}
                  >
                    {time}
                  </button>
                ))}
              </div>
            </div>

            {/* Reason */}
            <div>
              <label className="block font-semibold text-foreground mb-2">
                Reason for Visit
              </label>
              <textarea
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                placeholder="Describe your symptoms or reason for visit..."
                className="w-full border border-border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-primary"
                rows={3}
              />
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={() => setShowBooking(false)}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                onClick={handleBookAppointment}
                disabled={!selectedDoctor || !selectedDate || !selectedTime}
                className="flex-1 bg-primary hover:bg-primary/90 text-white"
              >
                <Check size={18} className="mr-2" />
                Confirm Booking
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Reschedule Dialog */}
      <Dialog open={showReschedule} onOpenChange={setShowReschedule}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Reschedule Appointment</DialogTitle>
            <DialogDescription>
              {selectedAppointment?.doctorName} -{" "}
              {selectedAppointment?.department}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div>
              <label className="block font-semibold text-foreground mb-2">
                New Date
              </label>
              <Input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
              />
            </div>

            <div>
              <label className="block font-semibold text-foreground mb-3">
                New Time
              </label>
              <div className="grid grid-cols-3 gap-2">
                {timeSlots.map((time) => (
                  <button
                    key={time}
                    onClick={() => setSelectedTime(time)}
                    className={`p-2 rounded border text-sm font-medium transition-all ${
                      selectedTime === time
                        ? "bg-primary text-white border-primary"
                        : "bg-card border-border hover:border-primary"
                    }`}
                  >
                    {time}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={() => setShowReschedule(false)}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                onClick={handleReschedule}
                disabled={!selectedDate || !selectedTime}
                className="flex-1 bg-primary hover:bg-primary/90 text-white"
              >
                <Check size={18} className="mr-2" />
                Confirm
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
