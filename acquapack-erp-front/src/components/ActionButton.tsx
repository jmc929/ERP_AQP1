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
      <Button 
        variant={variant} 
        onClick={onClick} 
        className="flex items-center gap-2 text-xs md:text-sm h-9 md:h-10 px-3 md:px-4"
      >
        <Icon className="h-4 w-4" />
        <span className="hidden sm:inline">{text}</span>
        <span className="sm:hidden">{text.split(' ')[0]}</span>
        <span className="ml-1">({count})</span>
      </Button>
    </div>
  );
};

export default ActionButton;

