import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Heart } from "lucide-react";

export default function Splash() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      const isLoggedIn = localStorage.getItem("isLoggedIn");
      if (isLoggedIn) {
        const userRole = localStorage.getItem("userRole");
        navigate(`/dashboard-${userRole}`);
      } else {
        navigate("/login");
      }
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary via-secondary to-primary flex flex-col items-center justify-center text-white">
      <div className="text-center">
        <div className="flex justify-center mb-8">
          <Heart className="w-24 h-24 animate-heartbeat text-white" />
        </div>
        <h1 className="text-4xl font-bold mb-4 font-roboto">Devayu</h1>
        <p className="text-xl font-light animate-pulse-slow">
          Breathing Life into Healthcare
        </p>
      </div>
    </div>
  );
}
