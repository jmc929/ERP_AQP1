import { Card, CardContent } from "@/components/ui/card";
import { User } from "lucide-react";

interface TrabajadorCardProps {
  nombre: string;
  tareasCompletadas: number;
  tareasTotales: number;
  onClick: () => void;
}

const TrabajadorCard = ({ nombre, tareasCompletadas, tareasTotales, onClick }: TrabajadorCardProps) => {
  const porcentaje = tareasTotales > 0 ? Math.round((tareasCompletadas / tareasTotales) * 100) : 0;

  return (
    <Card
      className="cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-105 border-border bg-card group"
      onClick={onClick}
    >
      <CardContent className="p-6">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
            <User className="h-6 w-6 text-primary" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-foreground mb-1">{nombre}</h3>
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">
                {tareasCompletadas} / {tareasTotales} tareas
              </span>
              <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary transition-all duration-300"
                  style={{ width: `${porcentaje}%` }}
                />
              </div>
              <span className="text-sm font-medium text-foreground">{porcentaje}%</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TrabajadorCard;


