import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname,
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/10 flex flex-col items-center justify-center px-4">
      <div className="text-center">
        <div className="mb-6">
          <Heart className="w-16 h-16 text-primary mx-auto mb-4 opacity-50" />
          <h1 className="text-5xl font-bold text-foreground mb-2 font-roboto">404</h1>
          <p className="text-lg text-muted-foreground mb-8">
            Oops! Page not found
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button
            onClick={() => navigate("/")}
            className="bg-primary hover:bg-primary/90 text-white"
            size="lg"
          >
            Go to Home
          </Button>
          <Button
            onClick={() => navigate(-1)}
            variant="outline"
            size="lg"
          >
            Go Back
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
