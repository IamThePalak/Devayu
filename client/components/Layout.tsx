import BottomNav from "./BottomNav";
import { useLocation, Outlet } from "react-router-dom";

export default function Layout() {
  const location = useLocation();

  const hideNav = [
    "/",
    "/login",
    "/register",
    "/role-selection",
    "/splash",
  ].includes(location.pathname);

  return (
    <div className="min-h-screen bg-background">
      <div className={hideNav ? "" : "pb-24"}>
        {/* Render nested routes here */}
        <Outlet />
      </div>

      {!hideNav && <BottomNav />}
    </div>
  );
}
