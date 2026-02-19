import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Plus, Trash2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { API_BASE_URL } from "@/config/api";

export interface Tarea {
  id: number;
  descripcion: string;
  completada: boolean;
  fecha_asignacion?: string;
}

interface TareaChecklistProps {
  trabajadorId: number;
  trabajadorNombre: string;
  tareas: Tarea[];
  onTareasChange: (tareas: Tarea[]) => void;
}

const TareaChecklist = ({ trabajadorId, trabajadorNombre, tareas, onTareasChange }: TareaChecklistProps) => {
  const { toast } = useToast();
  const [nuevaTarea, setNuevaTarea] = useState("");
  const [loading, setLoading] = useState(false);

  const handleToggleTarea = async (tareaId: number) => {
    const tarea = tareas.find((t) => t.id === tareaId);
    if (!tarea) return;

    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/api/tareas/${tareaId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          completada: !tarea.completada,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Error al actualizar la tarea");
      }

      const tareasActualizadas = tareas.map((t) =>
        t.id === tareaId ? { ...t, completada: !t.completada } : t
      );
      onTareasChange(tareasActualizadas);
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Error al actualizar la tarea",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleAgregarTarea = async () => {
    if (!nuevaTarea.trim()) {
      return;
    }

    try {
      setLoading(true);
      // Generar fecha y hora localmente en el frontend
      const fechaAsignacion = new Date().toISOString();
      
      const response = await fetch(`${API_BASE_URL}/api/tareas`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id_usuarios: trabajadorId,
          descripcion: nuevaTarea.trim(),
          completada: false,
          fecha_asignacion: fechaAsignacion, // Fecha generada en el frontend
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Error al crear la tarea");
      }

      const nueva: Tarea = {
        id: data.tarea.id_tareas,
        descripcion: data.tarea.descripcion,
        completada: data.tarea.completada,
        fecha_asignacion: fechaAsignacion, // Usar la fecha generada en el frontend, no la del backend
      };

      onTareasChange([...tareas, nueva]);
      setNuevaTarea("");

      toast({
        title: "Tarea creada",
        description: "La tarea se ha creado exitosamente",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Error al crear la tarea",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleEliminarTarea = async (tareaId: number) => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/api/tareas/${tareaId}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Error al eliminar la tarea");
      }

      onTareasChange(tareas.filter((tarea) => tarea.id !== tareaId));

      toast({
        title: "Tarea eliminada",
        description: "La tarea se ha eliminado exitosamente",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Error al eliminar la tarea",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
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
              if (e.key === "Enter" && !loading) {
                handleAgregarTarea();
              }
            }}
            className="flex-1"
            disabled={loading}
          />
          <Button onClick={handleAgregarTarea} className="flex items-center gap-2" disabled={loading}>
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
                  disabled={loading}
                />
                <div className="flex-1">
                  <Label
                    htmlFor={`tarea-${tarea.id}`}
                    className={`cursor-pointer ${
                      tarea.completada ? "line-through text-muted-foreground" : ""
                    }`}
                  >
                    {tarea.descripcion}
                  </Label>
                  {tarea.fecha_asignacion && (
                    <div className="text-xs text-muted-foreground mt-1">
                      {(() => {
                        // Si el timestamp no tiene información de zona horaria, asumir que ya está en hora local (America/Bogota)
                        const fechaStr = tarea.fecha_asignacion;
                        let fecha = new Date(fechaStr);
                        // Si el string no tiene Z ni offset, asumir que está en hora local de Colombia
                        if (!fechaStr.includes('Z') && !fechaStr.includes('+') && !fechaStr.includes('-', 10)) {
                          // Ya está en hora local, usar directamente
                          return fecha.toLocaleString("es-CO", {
                            year: "numeric",
                            month: "2-digit",
                            day: "2-digit",
                            hour: "2-digit",
                            minute: "2-digit",
                            timeZone: "America/Bogota"
                          });
                        }
                        // Si tiene información de zona horaria, convertir a hora local de Colombia
                        return fecha.toLocaleString("es-CO", {
                          year: "numeric",
                          month: "2-digit",
                          day: "2-digit",
                          hour: "2-digit",
                          minute: "2-digit",
                          timeZone: "America/Bogota"
                        });
                      })()}
                    </div>
                  )}
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleEliminarTarea(tarea.id)}
                  className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10"
                  disabled={loading}
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


