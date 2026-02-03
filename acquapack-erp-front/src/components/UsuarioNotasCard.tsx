import { Card, CardContent } from "@/components/ui/card";
import { StickyNote } from "lucide-react";

interface UsuarioNotasCardProps {
  nombre: string;
  notasTotales: number;
  onClick: () => void;
}

const UsuarioNotasCard = ({ nombre, notasTotales, onClick }: UsuarioNotasCardProps) => {
  return (
    <Card
      className="cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-105 border-border bg-card group"
      onClick={onClick}
    >
      <CardContent className="p-6">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
            <StickyNote className="h-6 w-6 text-primary" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-foreground mb-1">{nombre}</h3>
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">
                {notasTotales} {notasTotales === 1 ? "nota" : "notas"}
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default UsuarioNotasCard;

