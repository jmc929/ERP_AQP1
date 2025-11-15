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
      className="cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-105 border-border bg-module-card hover:bg-module-card-hover group"
      onClick={onClick}
    >
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
              <Icon className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-lg font-semibold text-foreground">{title}</h3>
          </div>
          <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
        </div>
      </CardContent>
    </Card>
  );
};

export default ModuleCard;
