import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Heart, Mail, Lock, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    await new Promise((resolve) => setTimeout(resolve, 1000));

    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("userName", email.split("@")[0]);
    localStorage.setItem("userRole", "patient");

    setLoading(false);
    navigate("/role-selection");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/10 flex flex-col">
      <div className="flex-1 flex flex-col items-center justify-center px-4">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <Heart className="w-12 h-12 text-primary" />
            </div>
            <h1 className="text-3xl font-bold text-foreground font-roboto">Devayu</h1>
            <p className="text-muted-foreground text-sm mt-2">
              Your Health, Our Priority
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="text-sm font-medium text-foreground">Email</label>
              <div className="relative mt-2">
                <Mail className="absolute left-3 top-3 text-muted-foreground" size={20} />
                <Input
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-foreground">Password</label>
              <div className="relative mt-2">
                <Lock className="absolute left-3 top-3 text-muted-foreground" size={20} />
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 pr-10"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-primary hover:bg-primary/90 text-white font-roboto"
            >
              {loading ? "Signing in..." : "Sign In"}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground">
              Don't have an account?{" "}
              <Link to="/register" className="text-primary font-medium hover:underline">
                Register
              </Link>
            </p>
          </div>

          <div className="mt-8 pt-8 border-t border-border">
            <p className="text-xs text-muted-foreground text-center">
              Demo credentials: any email & password
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
