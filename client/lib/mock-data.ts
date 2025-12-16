export const mockAppointments = [
  {
    id: 1,
    doctorName: "Dr. Sarah Johnson",
    date: "2024-01-15",
    time: "2:00 PM",
    status: "upcoming",
    department: "Cardiology",
    type: "Follow-up",
  },
  {
    id: 2,
    doctorName: "Dr. Michael Chen",
    date: "2024-01-18",
    time: "10:30 AM",
    status: "upcoming",
    department: "General Medicine",
    type: "Consultation",
  },
  {
    id: 3,
    doctorName: "Dr. Emma Wilson",
    date: "2024-01-10",
    time: "3:15 PM",
    status: "completed",
    department: "Pediatrics",
    type: "Check-up",
  },
];

export const mockPrescriptions = [
  {
    id: 1,
    medicineName: "Aspirin",
    dosage: "100mg",
    frequency: "Once daily",
    duration: "10 days",
    prescribedBy: "Dr. Sarah Johnson",
    date: "2024-01-05",
  },
  {
    id: 2,
    medicineName: "Metformin",
    dosage: "500mg",
    frequency: "Twice daily",
    duration: "30 days",
    prescribedBy: "Dr. Michael Chen",
    date: "2024-01-01",
  },
];

export const mockHealthTips = [
  "Drink at least 8 glasses of water daily for optimal hydration",
  "Regular exercise for 30 minutes can boost your immune system",
  "Maintain a consistent sleep schedule for better health",
  "Include green vegetables in your daily diet",
  "Practice meditation for 10 minutes daily to reduce stress",
];

export const mockVitals = {
  bloodPressure: "120/80",
  sugarLevel: "95 mg/dL",
  heartRate: "72 bpm",
  temperature: "98.6°F",
  lastUpdated: "2024-01-12",
};

export const mockPatients = [
  {
    id: 1,
    name: "John Smith",
    age: 35,
    department: "Cardiology",
    lastVisit: "2024-01-10",
    condition: "Hypertension",
    phone: "+1 (555) 123-4567",
  },
  {
    id: 2,
    name: "Emma Brown",
    age: 28,
    department: "Pediatrics",
    lastVisit: "2024-01-08",
    condition: "Routine Check-up",
    phone: "+1 (555) 234-5678",
  },
  {
    id: 3,
    name: "Robert Davis",
    age: 52,
    department: "General Medicine",
    lastVisit: "2024-01-12",
    condition: "Diabetes Management",
    phone: "+1 (555) 345-6789",
  },
];

export const mockDoctors = [
  {
    id: 1,
    name: "Dr. Sarah Johnson",
    specialization: "Cardiology",
    experience: 12,
    rating: 4.8,
    patients: 256,
  },
  {
    id: 2,
    name: "Dr. Michael Chen",
    specialization: "General Medicine",
    experience: 8,
    rating: 4.6,
    patients: 189,
  },
  {
    id: 3,
    name: "Dr. Emma Wilson",
    specialization: "Pediatrics",
    experience: 10,
    rating: 4.9,
    patients: 342,
  },
];

export const mockTodaySlots = [
  { id: 1, time: "09:00 AM", available: true },
  { id: 2, time: "09:30 AM", available: false },
  { id: 3, time: "10:00 AM", available: true },
  { id: 4, time: "10:30 AM", available: true },
  { id: 5, time: "11:00 AM", available: false },
  { id: 6, time: "02:00 PM", available: true },
  { id: 7, time: "02:30 PM", available: true },
  { id: 8, time: "03:00 PM", available: false },
];

export const mockConsultationHistory = [
  {
    id: 1,
    patientName: "John Smith",
    date: "2024-01-10",
    duration: "30 mins",
    notes: "Blood pressure slightly elevated. Recommended lifestyle changes.",
  },
  {
    id: 2,
    patientName: "Emma Brown",
    date: "2024-01-08",
    duration: "20 mins",
    notes: "Routine check-up. All vitals normal.",
  },
  {
    id: 3,
    patientName: "Robert Davis",
    date: "2024-01-05",
    duration: "25 mins",
    notes: "Diabetes control improved. Continue current medications.",
  },
];

export const mockMedicines = [
  {
    id: 1,
    name: "Aspirin",
    brand: "Bayer",
    price: "$5.99",
    availability: "In Stock",
    manufacturer: "Bayer AG",
  },
  {
    id: 2,
    name: "Paracetamol",
    brand: "Tylenol",
    price: "$3.99",
    availability: "In Stock",
    manufacturer: "Johnson & Johnson",
  },
  {
    id: 3,
    name: "Ibuprofen",
    brand: "Advil",
    price: "$7.99",
    availability: "Low Stock",
    manufacturer: "Pfizer",
  },
  {
    id: 4,
    name: "Amoxicillin",
    brand: "Amoxil",
    price: "$12.99",
    availability: "In Stock",
    manufacturer: "GSK",
  },
];

export const mockInventory = [
  {
    id: 1,
    name: "Aspirin 100mg",
    quantity: 45,
    reorderLevel: 20,
    status: "Good Stock",
  },
  {
    id: 2,
    name: "Paracetamol 500mg",
    quantity: 12,
    reorderLevel: 20,
    status: "Low Stock",
  },
  {
    id: 3,
    name: "Cough Syrup",
    quantity: 8,
    reorderLevel: 15,
    status: "Critical",
  },
  {
    id: 4,
    name: "Multivitamin",
    quantity: 156,
    reorderLevel: 30,
    status: "Good Stock",
  },
];

export const mockOrders = [
  {
    id: "ORD001",
    patientName: "John Smith",
    medicineName: "Aspirin 100mg",
    quantity: 10,
    date: "2024-01-12",
    status: "Pending",
    totalAmount: "$59.90",
  },
  {
    id: "ORD002",
    patientName: "Emma Brown",
    medicineName: "Paracetamol 500mg",
    quantity: 20,
    date: "2024-01-11",
    status: "Shipped",
    totalAmount: "$79.80",
  },
  {
    id: "ORD003",
    patientName: "Robert Davis",
    medicineName: "Multivitamin",
    quantity: 30,
    date: "2024-01-10",
    status: "Delivered",
    totalAmount: "$299.70",
  },
];

export const mockSuppliers = [
  {
    id: 1,
    name: "PharmaCorp Supplies",
    contact: "+1 (555) 111-2222",
    email: "supply@pharmacorp.com",
    lastOrder: "2024-01-10",
  },
  {
    id: 2,
    name: "Global Health Distributions",
    contact: "+1 (555) 222-3333",
    email: "sales@globalhealthdist.com",
    lastOrder: "2024-01-08",
  },
];

export const mockSalesData = [
  { month: "Jan", revenue: 12000 },
  { month: "Feb", revenue: 19000 },
  { month: "Mar", revenue: 15000 },
  { month: "Apr", revenue: 22000 },
  { month: "May", revenue: 18000 },
  { month: "Jun", revenue: 25000 },
];

export const mockTopSelling = [
  { name: "Aspirin", sales: 450, percentage: 25 },
  { name: "Paracetamol", sales: 380, percentage: 21 },
  { name: "Ibuprofen", sales: 310, percentage: 17 },
  { name: "Others", sales: 760, percentage: 37 },
];
