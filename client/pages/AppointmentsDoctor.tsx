import { useState } from "react";
import {
  Calendar,
  Clock,
  User,
  Check,
  X,
  Phone,
  Video,
  MessageSquare,
  AlertCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { mockAppointments, mockPatients } from "@/lib/mock-data";

interface DoctorAppointment {
  id: number;
  patientName: string;
  patientAge: number;
  patientPhone: string;
  date: string;
  time: string;
  status: "pending" | "confirmed" | "completed" | "cancelled";
  appointmentType: string;
  symptoms: string;
  notes?: string;
}

export default function AppointmentsDoctor() {
  const [appointments, setAppointments] = useState<DoctorAppointment[]>([
    {
      id: 1,
      patientName: "John Smith",
      patientAge: 35,
      patientPhone: "+1 (555) 123-4567",
      date: "2024-01-15",
      time: "09:00 AM",
      status: "pending",
      appointmentType: "Consultation",
      symptoms: "High blood pressure, frequent headaches",
    },
    {
      id: 2,
      patientName: "Emma Brown",
      patientAge: 28,
      patientPhone: "+1 (555) 234-5678",
      date: "2024-01-15",
      time: "10:30 AM",
      status: "confirmed",
      appointmentType: "Follow-up",
      symptoms: "Routine checkup",
    },
    {
      id: 3,
      patientName: "Robert Davis",
      patientAge: 52,
      patientPhone: "+1 (555) 345-6789",
      date: "2024-01-15",
      time: "02:00 PM",
      status: "pending",
      appointmentType: "Consultation",
      symptoms: "Diabetes management review",
    },
  ]);

  const [filterStatus, setFilterStatus] = useState<"all" | "pending" | "confirmed" | "completed">("all");
  const [selectedAppointment, setSelectedAppointment] = useState<DoctorAppointment | null>(null);
  const [showDetails, setShowDetails] = useState(false);
  const [showConsultation, setShowConsultation] = useState(false);
  const [consultationNotes, setConsultationNotes] = useState("");

  const filteredAppointments =
    filterStatus === "all"
      ? appointments
      : appointments.filter((apt) => apt.status === filterStatus);

  const handleConfirm = (id: number) => {
    setAppointments(
      appointments.map((apt) =>
        apt.id === id ? { ...apt, status: "confirmed" } : apt
      )
    );
  };

  const handleCancel = (id: number) => {
    setAppointments(
      appointments.map((apt) =>
        apt.id === id ? { ...apt, status: "cancelled" } : apt
      )
    );
  };

  const handleComplete = (id: number) => {
    setAppointments(
      appointments.map((apt) =>
        apt.id === id ? { ...apt, status: "completed", notes: consultationNotes } : apt
      )
    );
    setShowConsultation(false);
    setConsultationNotes("");
  };

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-500/10 text-yellow-700";
      case "confirmed":
        return "bg-blue-500/10 text-blue-700";
      case "completed":
        return "bg-green-500/10 text-green-700";
      case "cancelled":
        return "bg-red-500/10 text-red-700";
      default:
        return "bg-gray-500/10 text-gray-700";
    }
  };

  const todayAppointments = appointments.filter(
    (apt) => apt.status !== "cancelled"
  ).length;

  return (
    <div className="min-h-screen bg-background pb-24">
      <div className="max-w-4xl mx-auto px-4 py-6">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-foreground font-roboto mb-2">
            Appointments
          </h1>
          <p className="text-muted-foreground">Manage your patient consultations</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          <div className="bg-card border border-border rounded-lg p-4 shadow">
            <p className="text-xs text-muted-foreground mb-1">Today</p>
            <p className="text-2xl font-bold text-primary">{todayAppointments}</p>
          </div>
          <div className="bg-card border border-border rounded-lg p-4 shadow">
            <p className="text-xs text-muted-foreground mb-1">Pending</p>
            <p className="text-2xl font-bold text-yellow-600">
              {appointments.filter((a) => a.status === "pending").length}
            </p>
          </div>
          <div className="bg-card border border-border rounded-lg p-4 shadow">
            <p className="text-xs text-muted-foreground mb-1">Completed</p>
            <p className="text-2xl font-bold text-green-600">
              {appointments.filter((a) => a.status === "completed").length}
            </p>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-2 mb-6 overflow-x-auto">
          {["all", "pending", "confirmed", "completed"].map((status) => (
            <Button
              key={status}
              variant={filterStatus === status ? "default" : "outline"}
              onClick={() => setFilterStatus(status as any)}
              className="capitalize whitespace-nowrap"
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
                className={`bg-card border border-border rounded-lg p-5 shadow hover:shadow-md transition-all cursor-pointer ${
                  appointment.status === "cancelled" ? "opacity-60" : ""
                }`}
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <User size={18} className="text-primary" />
                      <h3 className="text-lg font-semibold text-foreground">
                        {appointment.patientName}
                      </h3>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Age: {appointment.patientAge} • {appointment.appointmentType}
                    </p>
                  </div>
                  <span
                    className={`text-xs px-3 py-1 rounded-full capitalize ${getStatusBadgeColor(
                      appointment.status
                    )}`}
                  >
                    {appointment.status}
                  </span>
                </div>

                <div className="space-y-2 mb-4 pb-4 border-b border-border">
                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <Calendar size={16} />
                    {appointment.date}
                  </div>
                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <Clock size={16} />
                    {appointment.time}
                  </div>
                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <Phone size={16} />
                    {appointment.patientPhone}
                  </div>
                  <div className="flex items-center gap-3 text-sm text-foreground">
                    <AlertCircle size={16} className="text-orange-500" />
                    <span>{appointment.symptoms}</span>
                  </div>
                </div>

                <div className="flex gap-2 flex-wrap">
                  {appointment.status === "pending" && (
                    <>
                      <Button
                        size="sm"
                        className="bg-green-500 hover:bg-green-600 text-white flex-1 gap-2"
                        onClick={() => handleConfirm(appointment.id)}
                      >
                        <Check size={16} />
                        Accept
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="flex-1 text-destructive hover:text-destructive gap-2"
                        onClick={() => handleCancel(appointment.id)}
                      >
                        <X size={16} />
                        Decline
                      </Button>
                    </>
                  )}

                  {appointment.status === "confirmed" && (
                    <>
                      <Button
                        size="sm"
                        variant="outline"
                        className="flex-1 gap-2"
                        onClick={() => {
                          setSelectedAppointment(appointment);
                          setShowConsultation(true);
                        }}
                      >
                        <MessageSquare size={16} />
                        Start Consultation
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="flex-1 gap-2"
                      >
                        <Video size={16} />
                        Video Call
                      </Button>
                    </>
                  )}

                  {(appointment.status === "confirmed" || appointment.status === "completed") && (
                    <Button
                      size="sm"
                      variant="outline"
                      className="flex-1"
                      onClick={() => {
                        setSelectedAppointment(appointment);
                        setShowDetails(true);
                      }}
                    >
                      View Details
                    </Button>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Consultation Dialog */}
      <Dialog open={showConsultation} onOpenChange={setShowConsultation}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Complete Consultation</DialogTitle>
            <DialogDescription>
              {selectedAppointment?.patientName} - {selectedAppointment?.appointmentType}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div>
              <p className="text-sm font-semibold text-foreground mb-2">
                Patient Symptoms
              </p>
              <p className="text-sm text-muted-foreground bg-muted p-3 rounded">
                {selectedAppointment?.symptoms}
              </p>
            </div>

            <div>
              <label className="block font-semibold text-foreground mb-2">
                Consultation Notes
              </label>
              <textarea
                value={consultationNotes}
                onChange={(e) => setConsultationNotes(e.target.value)}
                placeholder="Diagnosis, treatment plan, prescriptions, follow-up..."
                className="w-full border border-border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-primary"
                rows={4}
              />
            </div>

            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={() => {
                  setShowConsultation(false);
                  setConsultationNotes("");
                }}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                onClick={() => {
                  if (selectedAppointment) {
                    handleComplete(selectedAppointment.id);
                  }
                }}
                className="flex-1 bg-primary hover:bg-primary/90 text-white gap-2"
              >
                <Check size={18} />
                Complete
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Details Dialog */}
      <Dialog open={showDetails} onOpenChange={setShowDetails}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Appointment Details</DialogTitle>
          </DialogHeader>

          {selectedAppointment && (
            <div className="space-y-4">
              <div className="bg-muted p-4 rounded-lg space-y-3">
                <div>
                  <p className="text-xs text-muted-foreground">Patient Name</p>
                  <p className="font-semibold text-foreground">
                    {selectedAppointment.patientName}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Age / Phone</p>
                  <p className="font-semibold text-foreground">
                    {selectedAppointment.patientAge} / {selectedAppointment.patientPhone}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Date & Time</p>
                  <p className="font-semibold text-foreground">
                    {selectedAppointment.date} at {selectedAppointment.time}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Type</p>
                  <p className="font-semibold text-foreground">
                    {selectedAppointment.appointmentType}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Status</p>
                  <p className="font-semibold text-foreground capitalize">
                    {selectedAppointment.status}
                  </p>
                </div>
              </div>

              {selectedAppointment.notes && (
                <div>
                  <p className="text-sm font-semibold text-foreground mb-2">
                    Consultation Notes
                  </p>
                  <p className="text-sm text-muted-foreground bg-muted p-3 rounded">
                    {selectedAppointment.notes}
                  </p>
                </div>
              )}

              <Button
                onClick={() => setShowDetails(false)}
                className="w-full bg-primary hover:bg-primary/90 text-white"
              >
                Close
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
