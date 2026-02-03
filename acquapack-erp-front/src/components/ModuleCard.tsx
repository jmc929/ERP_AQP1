import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";

interface ModuleCardProps {
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  onClick: () => void;
}

const ModuleCard = ({ title, icon: Icon, onClick }: ModuleCardProps) => {
  return (
    <Card 
      className="cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-[1.02] md:hover:scale-105 border-border bg-module-card hover:bg-module-card-hover group active:scale-95 md:active:scale-100"
      onClick={onClick}
    >
      <CardContent className="p-4 md:p-6">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 md:gap-4 min-w-0 flex-1">
            <div className="p-2 md:p-3 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors flex-shrink-0">
              <Icon className="h-5 w-5 md:h-6 md:w-6 text-primary" />
            </div>
            <h3 className="text-base md:text-lg font-semibold text-foreground truncate">{title}</h3>
          </div>
          <ArrowRight className="h-4 w-4 md:h-5 md:w-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all flex-shrink-0" />
        </div>
      </CardContent>
    </Card>
  );
};

export default ModuleCard;
