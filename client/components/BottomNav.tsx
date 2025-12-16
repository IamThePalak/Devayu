import { Link, useLocation } from "react-router-dom";
import {
  Home,
  Calendar,
  FileText,
  Pill,
  User,
} from "lucide-react";

export default function BottomNav() {
  const location = useLocation();
  const userRole = localStorage.getItem("userRole") || "patient";

  const getNavItems = () => {
    const baseItems = [
      { path: `/dashboard-${userRole}`, label: "Home", icon: Home },
      { path: `/appointments-${userRole}`, label: "Appointments", icon: Calendar },
      { path: `/records-${userRole}`, label: "Records", icon: FileText },
    ];

    if (userRole === "patient") {
      return [
        ...baseItems,
        { path: "/pharmacy", label: "Pharmacy", icon: Pill },
        { path: "/profile", label: "Profile", icon: User },
      ];
    }

    if (userRole === "doctor") {
      return [
        ...baseItems,
        { path: "/consultations", label: "Consultations", icon: FileText },
        { path: "/profile", label: "Profile", icon: User },
      ];
    }

    if (userRole === "pharma") {
      return [
        ...baseItems,
        { path: "/inventory", label: "Inventory", icon: Pill },
        { path: "/profile", label: "Profile", icon: User },
      ];
    }

    return baseItems;
  };

  const items = getNavItems();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="fixed bottom-0 left-0 right-0 border-t border-border bg-card">
      <div className="flex justify-around items-center">
        {items.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.path);
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex flex-col items-center justify-center py-3 px-2 flex-1 transition-colors ${
                active
                  ? "text-primary border-t-2 border-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Icon size={24} />
              <span className="text-xs mt-1">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
