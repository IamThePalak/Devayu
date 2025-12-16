import { useNavigate } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PlaceholderProps {
  title?: string;
}

export default function Placeholder({ title = "Page" }: PlaceholderProps) {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="mb-6">
          <div className="w-16 h-16 mx-auto bg-muted rounded-full flex items-center justify-center mb-4">
            <span className="text-2xl">📋</span>
          </div>
          <h1 className="text-2xl font-bold text-foreground font-roboto mb-2">
            {title}
          </h1>
          <p className="text-muted-foreground mb-6">
            This section is coming soon! Continue prompting to fill in this page's content.
          </p>
        </div>
        <Button
          onClick={() => navigate(-1)}
          variant="outline"
          className="gap-2"
        >
          <ChevronLeft size={20} />
          Go Back
        </Button>
      </div>
    </div>
  );
}
