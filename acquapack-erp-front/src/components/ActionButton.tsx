import { Button } from "@/components/ui/button";
import { LucideIcon } from "lucide-react";

interface ActionButtonProps {
  icon: LucideIcon;
  text: string;
  count: number;
  onClick: () => void;
  variant?: "destructive" | "default" | "outline";
}

const ActionButton = ({
  icon: Icon,
  text,
  count,
  onClick,
  variant = "destructive",
}: ActionButtonProps) => {
  return (
    <div className="flex justify-end">
      <Button variant={variant} onClick={onClick} className="flex items-center gap-2">
        <Icon className="h-4 w-4" />
        {text} ({count})
      </Button>
    </div>
  );
};

export default ActionButton;

