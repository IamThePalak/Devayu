import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Splash from "./pages/Splash";
import Login from "./pages/Login";
import Register from "./pages/Register";
import RoleSelection from "./pages/RoleSelection";
import DashboardPatient from "./pages/DashboardPatient";
import DashboardDoctor from "./pages/DashboardDoctor";
import DashboardPharma from "./pages/DashboardPharma";
import AppointmentsPatient from "./pages/AppointmentsPatient";
import HealthRecords from "./pages/HealthRecords";
import Pharmacy from "./pages/Pharmacy";
import Profile from "./pages/Profile";
import AppointmentsDoctor from "./pages/AppointmentsDoctor";
import RecordsDoctor from "./pages/RecordsDoctor";
import AppointmentsPharma from "./pages/AppointmentsPharma";
import RecordsPharma from "./pages/RecordsPharma";
import Placeholder from "./pages/Placeholder";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/splash" element={<Splash />} />
            <Route path="/" element={<Splash />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/role-selection" element={<RoleSelection />} />

            <Route path="/dashboard-patient" element={<DashboardPatient />} />
            <Route path="/dashboard-doctor" element={<DashboardDoctor />} />
            <Route path="/dashboard-pharma" element={<DashboardPharma />} />

            <Route
              path="/appointments-patient"
              element={<AppointmentsPatient />}
            />
            <Route
              path="/appointments-doctor"
              element={<AppointmentsDoctor />}
            />
            <Route
              path="/appointments-pharma"
              element={<AppointmentsPharma />}
            />

            <Route path="/records-patient" element={<HealthRecords />} />
            <Route path="/records-doctor" element={<RecordsDoctor />} />
            <Route path="/records-pharma" element={<RecordsPharma />} />

            <Route path="/pharmacy" element={<Pharmacy />} />
            <Route
              path="/consultations"
              element={<Placeholder title="Consultations" />}
            />
            <Route
              path="/inventory"
              element={<Placeholder title="Inventory" />}
            />

            <Route path="/profile" element={<Profile />} />

            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

createRoot(document.getElementById("root")!).render(<App />);
