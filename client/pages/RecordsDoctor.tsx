import { useState } from "react";
import {
  User,
  Search,
  Plus,
  FileText,
  Calendar,
  AlertCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { mockPatients } from "@/lib/mock-data";

interface PatientNote {
  id: number;
  date: string;
  title: string;
  content: string;
  diagnosis?: string;
  prescription?: string;
  followUp?: string;
}

export default function RecordsDoctor() {
  const [searchQuery, setSearchQuery] = useState("");
  const [patients, setPatients] = useState(mockPatients);
  const [selectedPatient, setSelectedPatient] = useState<any>(null);
  const [showPatientNotes, setShowPatientNotes] = useState(false);
  const [showAddNote, setShowAddNote] = useState(false);
  const [patientNotes, setPatientNotes] = useState<PatientNote[]>([
    {
      id: 1,
      date: "2024-01-10",
      title: "Consultation - Hypertension",
      content: "Patient presented with elevated BP readings over past week",
      diagnosis: "Essential Hypertension",
      prescription: "Amlodipine 5mg once daily",
      followUp: "2024-01-24",
    },
    {
      id: 2,
      date: "2024-01-03",
      title: "Follow-up Check",
      content: "BP stable with current medication regimen",
      diagnosis: "Hypertension Management",
      prescription: "Continue current medication",
      followUp: "2024-02-07",
    },
  ]);

  const [newNote, setNewNote] = useState({
    title: "",
    content: "",
    diagnosis: "",
    prescription: "",
    followUp: "",
  });

  const filteredPatients = patients.filter(
    (patient) =>
      patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      patient.phone.includes(searchQuery),
  );

  const handleSelectPatient = (patient: any) => {
    setSelectedPatient(patient);
    setShowPatientNotes(true);
  };

  const handleAddNote = () => {
    if (newNote.title && newNote.content) {
      const note: PatientNote = {
        id: Math.max(...patientNotes.map((n) => n.id), 0) + 1,
        date: new Date().toISOString().split("T")[0],
        title: newNote.title,
        content: newNote.content,
        diagnosis: newNote.diagnosis,
        prescription: newNote.prescription,
        followUp: newNote.followUp,
      };
      setPatientNotes([note, ...patientNotes]);
      setShowAddNote(false);
      setNewNote({
        title: "",
        content: "",
        diagnosis: "",
        prescription: "",
        followUp: "",
      });
    }
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      <div className="max-w-4xl mx-auto px-4 py-6">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-foreground font-roboto mb-2">
            Patient Records
          </h1>
          <p className="text-muted-foreground">
            Manage patient medical records and notes
          </p>
        </div>

        {/* Search */}
        <div className="mb-6">
          <div className="relative">
            <Search
              className="absolute left-3 top-3 text-muted-foreground"
              size={20}
            />
            <Input
              type="text"
              placeholder="Search patients by name or phone..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-12"
            />
          </div>
        </div>

        {/* Patient List */}
        <div className="space-y-3">
          {filteredPatients.length === 0 ? (
            <div className="bg-card border border-border rounded-lg p-8 text-center">
              <User className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
              <p className="text-muted-foreground">No patients found</p>
            </div>
          ) : (
            filteredPatients.map((patient) => (
              <div
                key={patient.id}
                onClick={() => handleSelectPatient(patient)}
                className="bg-card border border-border rounded-lg p-4 shadow hover:shadow-md hover:border-primary transition-all cursor-pointer"
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
                      <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white text-sm font-bold">
                        {patient.name.charAt(0)}
                      </div>
                      {patient.name}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Age: {patient.age} • {patient.condition}
                    </p>
                  </div>
                  <span className="bg-primary/10 text-primary text-xs px-3 py-1 rounded-full">
                    {patient.department}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3 mb-3">
                  <div className="text-sm">
                    <p className="text-muted-foreground text-xs">Last Visit</p>
                    <p className="font-medium text-foreground">
                      {patient.lastVisit}
                    </p>
                  </div>
                  <div className="text-sm">
                    <p className="text-muted-foreground text-xs">Phone</p>
                    <p className="font-medium text-foreground">
                      {patient.phone}
                    </p>
                  </div>
                </div>

                <Button size="sm" variant="outline" className="w-full">
                  View Records & Notes
                </Button>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Patient Notes Dialog */}
      <Dialog open={showPatientNotes} onOpenChange={setShowPatientNotes}>
        <DialogContent className="max-w-2xl max-h-96 overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Medical Records - {selectedPatient?.name}</DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            {/* Patient Summary */}
            <div className="bg-muted p-4 rounded-lg grid grid-cols-2 gap-3">
              <div>
                <p className="text-xs text-muted-foreground">Age</p>
                <p className="font-semibold text-foreground">
                  {selectedPatient?.age} years
                </p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Condition</p>
                <p className="font-semibold text-foreground">
                  {selectedPatient?.condition}
                </p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Department</p>
                <p className="font-semibold text-foreground">
                  {selectedPatient?.department}
                </p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Phone</p>
                <p className="font-semibold text-foreground">
                  {selectedPatient?.phone}
                </p>
              </div>
            </div>

            {/* Add Note Button */}
            <Button
              onClick={() => setShowAddNote(true)}
              className="w-full bg-primary hover:bg-primary/90 text-white gap-2"
            >
              <Plus size={18} />
              Add New Note
            </Button>

            {/* Notes History */}
            <div className="space-y-3">
              <h3 className="font-semibold text-foreground">
                Notes & Diagnosis
              </h3>
              {patientNotes.map((note) => (
                <div
                  key={note.id}
                  className="border border-border rounded-lg p-4 space-y-2"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-semibold text-foreground">
                        {note.title}
                      </p>
                      <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                        <Calendar size={14} />
                        {note.date}
                      </p>
                    </div>
                    <FileText className="text-primary" size={20} />
                  </div>

                  <p className="text-sm text-muted-foreground">
                    {note.content}
                  </p>

                  {note.diagnosis && (
                    <div className="bg-blue-50 border border-blue-200 rounded p-2">
                      <p className="text-xs text-blue-700 font-semibold">
                        Diagnosis
                      </p>
                      <p className="text-sm text-blue-900">{note.diagnosis}</p>
                    </div>
                  )}

                  {note.prescription && (
                    <div className="bg-green-50 border border-green-200 rounded p-2">
                      <p className="text-xs text-green-700 font-semibold">
                        Prescription
                      </p>
                      <p className="text-sm text-green-900">
                        {note.prescription}
                      </p>
                    </div>
                  )}

                  {note.followUp && (
                    <div className="bg-orange-50 border border-orange-200 rounded p-2">
                      <p className="text-xs text-orange-700 font-semibold">
                        Follow-up Date
                      </p>
                      <p className="text-sm text-orange-900">{note.followUp}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <Button
              variant="outline"
              onClick={() => setShowPatientNotes(false)}
              className="w-full"
            >
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Add Note Dialog */}
      <Dialog open={showAddNote} onOpenChange={setShowAddNote}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Add Medical Note</DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <div>
              <label className="block font-semibold text-foreground mb-2">
                Note Title
              </label>
              <Input
                placeholder="e.g., Consultation - Hypertension"
                value={newNote.title}
                onChange={(e) =>
                  setNewNote({ ...newNote, title: e.target.value })
                }
              />
            </div>

            <div>
              <label className="block font-semibold text-foreground mb-2">
                Clinical Notes
              </label>
              <textarea
                placeholder="Detailed clinical observations..."
                value={newNote.content}
                onChange={(e) =>
                  setNewNote({ ...newNote, content: e.target.value })
                }
                className="w-full border border-border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-primary"
                rows={3}
              />
            </div>

            <div>
              <label className="block font-semibold text-foreground mb-2">
                Diagnosis
              </label>
              <Input
                placeholder="Primary diagnosis"
                value={newNote.diagnosis}
                onChange={(e) =>
                  setNewNote({ ...newNote, diagnosis: e.target.value })
                }
              />
            </div>

            <div>
              <label className="block font-semibold text-foreground mb-2">
                Prescription / Treatment
              </label>
              <Input
                placeholder="Prescribed medications and dosage"
                value={newNote.prescription}
                onChange={(e) =>
                  setNewNote({ ...newNote, prescription: e.target.value })
                }
              />
            </div>

            <div>
              <label className="block font-semibold text-foreground mb-2">
                Follow-up Date
              </label>
              <Input
                type="date"
                value={newNote.followUp}
                onChange={(e) =>
                  setNewNote({ ...newNote, followUp: e.target.value })
                }
              />
            </div>

            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={() => {
                  setShowAddNote(false);
                  setNewNote({
                    title: "",
                    content: "",
                    diagnosis: "",
                    prescription: "",
                    followUp: "",
                  });
                }}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                onClick={handleAddNote}
                disabled={!newNote.title || !newNote.content}
                className="flex-1 bg-primary hover:bg-primary/90 text-white"
              >
                Save Note
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
