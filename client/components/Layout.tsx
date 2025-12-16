import BottomNav from "./BottomNav";
import { useLocation } from "react-router-dom";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const location = useLocation();
  const hideNav = ["/", "/login", "/register", "/role-selection", "/splash"].includes(
    location.pathname
  );

  return (
    <div className="min-h-screen bg-background">
      <div className={hideNav ? "" : "pb-24"}>
        {children}
      </div>
      {!hideNav && <BottomNav />}
    </div>
  );
}
