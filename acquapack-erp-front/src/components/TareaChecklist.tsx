import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Plus, Trash2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export interface Tarea {
  id: number;
  descripcion: string;
  completada: boolean;
}

interface TareaChecklistProps {
  trabajadorNombre: string;
  tareas: Tarea[];
  onTareasChange: (tareas: Tarea[]) => void;
}

const TareaChecklist = ({ trabajadorNombre, tareas, onTareasChange }: TareaChecklistProps) => {
  const [nuevaTarea, setNuevaTarea] = useState("");

  const handleToggleTarea = (tareaId: number) => {
    const tareasActualizadas = tareas.map((tarea) =>
      tarea.id === tareaId ? { ...tarea, completada: !tarea.completada } : tarea
    );
    onTareasChange(tareasActualizadas);
  };

  const handleAgregarTarea = () => {
    if (nuevaTarea.trim()) {
      const nueva: Tarea = {
        id: Date.now(),
        descripcion: nuevaTarea.trim(),
        completada: false,
      };
      onTareasChange([...tareas, nueva]);
      setNuevaTarea("");
    }
  };

  const handleEliminarTarea = (tareaId: number) => {
    onTareasChange(tareas.filter((tarea) => tarea.id !== tareaId));
  };

  const tareasCompletadas = tareas.filter((t) => t.completada).length;
  const tareasTotales = tareas.length;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Tareas de {trabajadorNombre}</CardTitle>
        <div className="text-sm text-muted-foreground">
          {tareasCompletadas} de {tareasTotales} tareas completadas
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Formulario para agregar tarea */}
        <div className="flex gap-2">
          <Input
            placeholder="Agregar nueva tarea..."
            value={nuevaTarea}
            onChange={(e) => setNuevaTarea(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleAgregarTarea();
              }
            }}
            className="flex-1"
          />
          <Button onClick={handleAgregarTarea} className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Agregar
          </Button>
        </div>

        {/* Lista de tareas */}
        <div className="space-y-2">
          {tareas.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-4">
              No hay tareas asignadas. Agrega una nueva tarea arriba.
            </p>
          ) : (
            tareas.map((tarea) => (
              <div
                key={tarea.id}
                className="flex items-center gap-3 p-3 rounded-lg border border-border hover:bg-accent transition-colors"
              >
                <Checkbox
                  checked={tarea.completada}
                  onCheckedChange={() => handleToggleTarea(tarea.id)}
                  id={`tarea-${tarea.id}`}
                />
                <Label
                  htmlFor={`tarea-${tarea.id}`}
                  className={`flex-1 cursor-pointer ${
                    tarea.completada ? "line-through text-muted-foreground" : ""
                  }`}
                >
                  {tarea.descripcion}
                </Label>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleEliminarTarea(tarea.id)}
                  className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default TareaChecklist;


