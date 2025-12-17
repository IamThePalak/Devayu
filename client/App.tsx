import "./global.css";

import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";

// ---------------- PAGES ----------------
import Splash from "./pages/Splash";
import Login from "./pages/Login";
import Register from "./pages/Register";
import RoleSelection from "./pages/RoleSelection";

import DashboardPatient from "./pages/DashboardPatient";
import DashboardDoctor from "./pages/DashboardDoctor";
import DashboardPharma from "./pages/DashboardPharma";

import AppointmentsPatient from "./pages/AppointmentsPatient";
import AppointmentsDoctor from "./pages/AppointmentsDoctor";
import AppointmentsPharma from "./pages/AppointmentsPharma";

import HealthRecords from "./pages/HealthRecords";
import RecordsDoctor from "./pages/RecordsDoctor";
import RecordsPharma from "./pages/RecordsPharma";

import Pharmacy from "./pages/Pharmacy";
import Profile from "./pages/Profile";
import Placeholder from "./pages/Placeholder";
import NotFound from "./pages/NotFound";

// ---------------- QUERY CLIENT ----------------
const queryClient = new QueryClient();

// ---------------- LAYOUT (INLINE) ----------------
function Layout() {
  return (
    <div>
      {/* Navbar / Sidebar can go here */}
      <Outlet />
    </div>
  );
}

// ---------------- APP ----------------
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />

        <BrowserRouter>
          <Routes>
            {/* PUBLIC ROUTES */}
            <Route path="/" element={<Splash />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/role-selection" element={<RoleSelection />} />

            {/* ROUTES WITH LAYOUT */}
            <Route element={<Layout />}>
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
              <Route path="/profile" element={<Profile />} />

              <Route
                path="/consultations"
                element={<Placeholder title="Consultations" />}
              />
              <Route
                path="/inventory"
                element={<Placeholder title="Inventory" />}
              />
            </Route>

            {/* FALLBACK */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

// ---------------- ROOT RENDER (SAME FILE) ----------------
const rootElement = document.getElementById("root");

if (rootElement) {
  createRoot(rootElement).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}

