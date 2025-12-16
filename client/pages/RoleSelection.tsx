import { useNavigate } from "react-router-dom";
import { Heart, Stethoscope, Pill, User } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function RoleSelection() {
  const navigate = useNavigate();

  const roles = [
    {
      id: "patient",
      title: "Patient",
      description: "Access health records, book appointments, order medicines",
      icon: User,
      color: "from-blue-500 to-blue-600",
    },
    {
      id: "doctor",
      title: "Doctor",
      description: "Manage appointments, patient consultations, medical records",
      icon: Stethoscope,
      color: "from-primary to-emerald-600",
    },
    {
      id: "pharma",
      title: "Pharma Owner",
      description: "Manage inventory, orders, sales analytics, suppliers",
      icon: Pill,
      color: "from-orange-500 to-orange-600",
    },
  ];

  const handleRoleSelect = (roleId: string) => {
    localStorage.setItem("userRole", roleId);
    navigate(`/dashboard-${roleId}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/10 flex flex-col">
      <div className="flex-1 flex flex-col items-center justify-center px-4 py-8">
        <div className="w-full max-w-2xl">
          <div className="text-center mb-12">
            <div className="flex justify-center mb-4">
              <Heart className="w-12 h-12 text-primary" />
            </div>
            <h1 className="text-3xl font-bold text-foreground font-roboto mb-2">
              Select Your Role
            </h1>
            <p className="text-muted-foreground">
              Choose how you want to use Devayu
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {roles.map((role) => {
              const Icon = role.icon;
              return (
                <div
                  key={role.id}
                  className="group cursor-pointer"
                  onClick={() => handleRoleSelect(role.id)}
                >
                  <div
                    className={`bg-gradient-to-br ${role.color} p-6 rounded-lg text-white mb-4 group-hover:shadow-lg transition-all`}
                  >
                    <Icon size={40} />
                  </div>
                  <h3 className="text-lg font-bold text-foreground mb-2 font-roboto">
                    {role.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    {role.description}
                  </p>
                  <Button
                    className="w-full bg-primary hover:bg-primary/90 text-white"
                    onClick={() => handleRoleSelect(role.id)}
                  >
                    Continue as {role.title}
                  </Button>
                </div>
              );
            })}
          </div>

          <div className="mt-12 text-center">
            <Button
              variant="outline"
              onClick={() => {
                localStorage.removeItem("isLoggedIn");
                localStorage.removeItem("userRole");
                navigate("/login");
              }}
            >
              Back to Login
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
