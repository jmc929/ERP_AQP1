import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Trash2, ChevronLeft, ChevronRight, Pencil, Check, X } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

export interface Tarea {
  id: number;
  descripcion: string;
  id_estado: number;
  fecha_asignacion?: string;
  estado_nombre?: string;
  estado_color?: string;
  id_usuario_creador?: number;
  nombre_usuario_creador?: string;
}

interface TareaKanbanProps {
  trabajadorId: number;
  trabajadorNombre: string;
  tareas: Tarea[];
  onTareasChange: (tareas: Tarea[]) => void;
}

const ESTADOS = {
  POR_HACER: 21,
  EN_PROCESO: 22,
  TERMINADO: 23,
};

const ESTADOS_CONFIG = {
  [ESTADOS.POR_HACER]: { nombre: "Pendiente", color: "#94a3b8" },
  [ESTADOS.EN_PROCESO]: { nombre: "En proceso", color: "#3b82f6" },
  [ESTADOS.TERMINADO]: { nombre: "Terminado", color: "#10b981" },
};

const TareaKanban = ({
  trabajadorId,
  trabajadorNombre,
  tareas,
  onTareasChange,
}: TareaKanbanProps) => {
  const { toast } = useToast();
  const [nuevaTarea, setNuevaTarea] = useState("");
  const [loading, setLoading] = useState(false);
  const [editandoTareaId, setEditandoTareaId] = useState<number | null>(null);
  const [textoEditado, setTextoEditado] = useState("");

  const obtenerTareasPorEstado = (estadoId: number) => {
    if (!tareas || !Array.isArray(tareas)) {
      return [];
    }
    return tareas.filter((t) => t && t.id_estado === estadoId);
  };

  const handleAgregarTarea = async () => {
    if (!nuevaTarea.trim()) {
      return;
    }

    try {
      setLoading(true);
      // Generar fecha y hora localmente en el frontend
      const fechaAsignacion = new Date().toISOString();
      
      // Obtener el usuario logueado desde localStorage
      const usuarioLogueado = localStorage.getItem("usuario");
      let idUsuarioCreador = null;
      
      console.log("=== DEBUG CREAR TAREA ===");
      console.log("Usuario en localStorage:", usuarioLogueado);
      
      if (usuarioLogueado) {
        try {
          const usuario = JSON.parse(usuarioLogueado);
          console.log("Usuario parseado:", usuario);
          idUsuarioCreador = usuario.id_usuarios;
          console.log("ID Usuario Creador extraído:", idUsuarioCreador);
        } catch (error) {
          console.error("Error al parsear usuario:", error);
        }
      } else {
        console.warn("No hay usuario en localStorage!");
      }

      const headers: HeadersInit = {
        "Content-Type": "application/json",
      };

      // Agregar el header con el ID del usuario logueado
      if (idUsuarioCreador) {
        headers["x-user-id"] = idUsuarioCreador.toString();
        console.log("Header x-user-id agregado:", idUsuarioCreador.toString());
      } else {
        console.warn("No se pudo obtener idUsuarioCreador, no se agregará header");
      }

      const bodyData = {
        id_usuarios: trabajadorId,
        descripcion: nuevaTarea.trim(),
        id_estado: ESTADOS.POR_HACER, // 21 = Pendiente
        fecha_asignacion: fechaAsignacion, // Fecha generada en el frontend
        id_usuario_creador: idUsuarioCreador, // Enviar también en el body como respaldo
      };

      console.log("Body que se enviará:", bodyData);
      console.log("Headers que se enviarán:", headers);

      const response = await fetch("http://localhost:4000/api/tareas", {
        method: "POST",
        headers,
        body: JSON.stringify(bodyData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Error al crear la tarea");
      }

      // Obtener el nombre del usuario creador desde localStorage
      let nombreUsuarioCreador = null;
      if (usuarioLogueado) {
        try {
          const usuario = JSON.parse(usuarioLogueado);
          nombreUsuarioCreador = `${usuario.nombre || ''} ${usuario.apellido || ''}`.trim() || null;
        } catch (error) {
          console.error("Error al parsear usuario para nombre:", error);
        }
      }

      const nueva: Tarea = {
        id: data.tarea.id_tareas,
        descripcion: data.tarea.descripcion,
        id_estado: data.tarea.id_estado || ESTADOS.POR_HACER,
        fecha_asignacion: fechaAsignacion, // Usar la fecha generada en el frontend, no la del backend
        estado_nombre: ESTADOS_CONFIG[ESTADOS.POR_HACER].nombre,
        estado_color: ESTADOS_CONFIG[ESTADOS.POR_HACER].color,
        id_usuario_creador: idUsuarioCreador,
        nombre_usuario_creador: nombreUsuarioCreador || data.tarea.nombre_usuario_creador,
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

  const handleMoverTarea = async (tareaId: number, nuevoEstado: number, direccion: "izquierda" | "derecha") => {
    try {
      setLoading(true);
      const response = await fetch(`http://localhost:4000/api/tareas/${tareaId}/estado`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id_estado: nuevoEstado,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Error al mover la tarea");
      }

      const tareasActualizadas = tareas.map((t) =>
        t.id === tareaId
          ? {
              ...t,
              id_estado: nuevoEstado,
              estado_nombre: ESTADOS_CONFIG[nuevoEstado as keyof typeof ESTADOS_CONFIG]?.nombre || "Pendiente",
              estado_color: ESTADOS_CONFIG[nuevoEstado as keyof typeof ESTADOS_CONFIG]?.color || "#94a3b8",
            }
          : t
      );
      onTareasChange(tareasActualizadas);

      toast({
        title: "Tarea movida",
        description: `La tarea se movió a "${ESTADOS_CONFIG[nuevoEstado as keyof typeof ESTADOS_CONFIG]?.nombre}"`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Error al mover la tarea",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleEditarTarea = (tarea: Tarea) => {
    setEditandoTareaId(tarea.id);
    setTextoEditado(tarea.descripcion);
  };

  const handleGuardarEdicion = async (tareaId: number) => {
    if (!textoEditado.trim()) {
      toast({
        title: "Error",
        description: "La descripción no puede estar vacía",
        variant: "destructive",
      });
      return;
    }

    try {
      setLoading(true);
      const response = await fetch(`http://localhost:4000/api/tareas/${tareaId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          descripcion: textoEditado.trim(),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Error al actualizar la tarea");
      }

      const tareasActualizadas = tareas.map((t) =>
        t.id === tareaId
          ? {
              ...t,
              descripcion: textoEditado.trim(),
            }
          : t
      );
      onTareasChange(tareasActualizadas);

      setEditandoTareaId(null);
      setTextoEditado("");

      toast({
        title: "Tarea actualizada",
        description: "La tarea se ha actualizado exitosamente",
      });
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

  const handleCancelarEdicion = () => {
    setEditandoTareaId(null);
    setTextoEditado("");
  };

  const handleEliminarTarea = async (tareaId: number) => {
    try {
      setLoading(true);
      const response = await fetch(`http://localhost:4000/api/tareas/${tareaId}`, {
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

  const tareasPorHacer = obtenerTareasPorEstado(ESTADOS.POR_HACER);
  const tareasEnProceso = obtenerTareasPorEstado(ESTADOS.EN_PROCESO);
  const tareasTerminadas = obtenerTareasPorEstado(ESTADOS.TERMINADO);

  // Validación de seguridad
  if (!trabajadorNombre || !trabajadorId) {
    return (
      <Card>
        <CardContent className="p-4">
          <p className="text-muted-foreground text-center">Error: Información del trabajador incompleta</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Tareas de {trabajadorNombre}</CardTitle>
        <div className="text-sm text-muted-foreground">
          {tareas.length} tarea(s) en total
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

        {/* Board Kanban */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          {/* Columna: Por hacer */}
          <div className="flex flex-col space-y-3">
            <div
              className="rounded-lg p-3 text-center font-semibold text-white"
              style={{ backgroundColor: ESTADOS_CONFIG[ESTADOS.POR_HACER].color }}
            >
              Pendiente ({tareasPorHacer.length})
            </div>
            <div className="space-y-2 min-h-[200px]">
              {tareasPorHacer.length === 0 ? (
                <p className="text-sm text-muted-foreground text-center py-8">No hay tareas</p>
              ) : (
                tareasPorHacer.map((tarea) => (
                  <div
                    key={tarea.id}
                    className="p-3 rounded-lg border border-border bg-card hover:bg-accent transition-colors"
                  >
                    {editandoTareaId === tarea.id ? (
                      <div className="mb-2">
                        <Input
                          value={textoEditado}
                          onChange={(e) => setTextoEditado(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === "Enter" && !loading) {
                              handleGuardarEdicion(tarea.id);
                            } else if (e.key === "Escape") {
                              handleCancelarEdicion();
                            }
                          }}
                          className="text-sm mb-2"
                          disabled={loading}
                          autoFocus
                        />
                        <div className="flex gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleGuardarEdicion(tarea.id)}
                            className="h-7 text-green-600 hover:text-green-700 hover:bg-green-50"
                            disabled={loading}
                          >
                            <Check className="h-3 w-3" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={handleCancelarEdicion}
                            className="h-7 text-muted-foreground hover:text-foreground"
                            disabled={loading}
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <>
                        <p className="text-sm mb-2">{tarea.descripcion}</p>
                        {tarea.fecha_asignacion && (
                          <p className="text-xs text-muted-foreground mb-1">
                            {(() => {
                              const fechaStr = tarea.fecha_asignacion;
                              const fecha = new Date(fechaStr);
                              return fecha.toLocaleString("es-CO", {
                                year: "numeric",
                                month: "2-digit",
                                day: "2-digit",
                                hour: "2-digit",
                                minute: "2-digit",
                                timeZone: "America/Bogota"
                              });
                            })()}
                          </p>
                        )}
                        {tarea.nombre_usuario_creador && (
                          <p className="text-xs text-muted-foreground mb-2">
                            Creado por: {tarea.nombre_usuario_creador}
                          </p>
                        )}
                        <div className="flex items-center justify-between gap-2">
                          <div className="flex gap-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleEditarTarea(tarea)}
                              className="h-7 text-muted-foreground hover:text-foreground"
                              disabled={loading}
                            >
                              <Pencil className="h-3 w-3" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleEliminarTarea(tarea.id)}
                              className="h-7 text-destructive hover:text-destructive hover:bg-destructive/10"
                              disabled={loading}
                            >
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          </div>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleMoverTarea(tarea.id, ESTADOS.EN_PROCESO, "derecha")}
                            disabled={loading}
                            className="h-7"
                          >
                            <ChevronRight className="h-4 w-4" />
                          </Button>
                        </div>
                      </>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Columna: En proceso */}
          <div className="flex flex-col space-y-3">
            <div
              className="rounded-lg p-3 text-center font-semibold text-white"
              style={{ backgroundColor: ESTADOS_CONFIG[ESTADOS.EN_PROCESO].color }}
            >
              En proceso ({tareasEnProceso.length})
            </div>
            <div className="space-y-2 min-h-[200px]">
              {tareasEnProceso.length === 0 ? (
                <p className="text-sm text-muted-foreground text-center py-8">No hay tareas</p>
              ) : (
                tareasEnProceso.map((tarea) => (
                  <div
                    key={tarea.id}
                    className="p-3 rounded-lg border border-border bg-card hover:bg-accent transition-colors"
                  >
                    {editandoTareaId === tarea.id ? (
                      <div className="mb-2">
                        <Input
                          value={textoEditado}
                          onChange={(e) => setTextoEditado(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === "Enter" && !loading) {
                              handleGuardarEdicion(tarea.id);
                            } else if (e.key === "Escape") {
                              handleCancelarEdicion();
                            }
                          }}
                          className="text-sm mb-2"
                          disabled={loading}
                          autoFocus
                        />
                        <div className="flex gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleGuardarEdicion(tarea.id)}
                            className="h-7 text-green-600 hover:text-green-700 hover:bg-green-50"
                            disabled={loading}
                          >
                            <Check className="h-3 w-3" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={handleCancelarEdicion}
                            className="h-7 text-muted-foreground hover:text-foreground"
                            disabled={loading}
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <>
                        <p className="text-sm mb-2">{tarea.descripcion}</p>
                        {tarea.fecha_asignacion && (
                          <p className="text-xs text-muted-foreground mb-1">
                            {(() => {
                              const fechaStr = tarea.fecha_asignacion;
                              const fecha = new Date(fechaStr);
                              return fecha.toLocaleString("es-CO", {
                                year: "numeric",
                                month: "2-digit",
                                day: "2-digit",
                                hour: "2-digit",
                                minute: "2-digit",
                                timeZone: "America/Bogota"
                              });
                            })()}
                          </p>
                        )}
                        {tarea.nombre_usuario_creador && (
                          <p className="text-xs text-muted-foreground mb-2">
                            Creado por: {tarea.nombre_usuario_creador}
                          </p>
                        )}
                        <div className="flex items-center justify-between gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleMoverTarea(tarea.id, ESTADOS.POR_HACER, "izquierda")}
                            disabled={loading}
                            className="h-7"
                          >
                            <ChevronLeft className="h-4 w-4" />
                          </Button>
                          <div className="flex gap-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleEditarTarea(tarea)}
                              className="h-7 text-muted-foreground hover:text-foreground"
                              disabled={loading}
                            >
                              <Pencil className="h-3 w-3" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleEliminarTarea(tarea.id)}
                              className="h-7 text-destructive hover:text-destructive hover:bg-destructive/10"
                              disabled={loading}
                            >
                              <Trash2 className="h-3 w-3" />
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleMoverTarea(tarea.id, ESTADOS.TERMINADO, "derecha")}
                              disabled={loading}
                              className="h-7"
                            >
                              <ChevronRight className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Columna: Terminado */}
          <div className="flex flex-col space-y-3">
            <div
              className="rounded-lg p-3 text-center font-semibold text-white"
              style={{ backgroundColor: ESTADOS_CONFIG[ESTADOS.TERMINADO].color }}
            >
              Terminado ({tareasTerminadas.length})
            </div>
            <div className="space-y-2 min-h-[200px]">
              {tareasTerminadas.length === 0 ? (
                <p className="text-sm text-muted-foreground text-center py-8">No hay tareas</p>
              ) : (
                tareasTerminadas.map((tarea) => (
                  <div
                    key={tarea.id}
                    className="p-3 rounded-lg border border-border bg-card hover:bg-accent transition-colors"
                  >
                    {editandoTareaId === tarea.id ? (
                      <div className="mb-2">
                        <Input
                          value={textoEditado}
                          onChange={(e) => setTextoEditado(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === "Enter" && !loading) {
                              handleGuardarEdicion(tarea.id);
                            } else if (e.key === "Escape") {
                              handleCancelarEdicion();
                            }
                          }}
                          className="text-sm mb-2"
                          disabled={loading}
                          autoFocus
                        />
                        <div className="flex gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleGuardarEdicion(tarea.id)}
                            className="h-7 text-green-600 hover:text-green-700 hover:bg-green-50"
                            disabled={loading}
                          >
                            <Check className="h-3 w-3" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={handleCancelarEdicion}
                            className="h-7 text-muted-foreground hover:text-foreground"
                            disabled={loading}
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <>
                        <p className="text-sm mb-2 line-through text-muted-foreground">{tarea.descripcion}</p>
                        {tarea.fecha_asignacion && (
                          <p className="text-xs text-muted-foreground mb-1">
                            {(() => {
                              const fechaStr = tarea.fecha_asignacion;
                              const fecha = new Date(fechaStr);
                              return fecha.toLocaleString("es-CO", {
                                year: "numeric",
                                month: "2-digit",
                                day: "2-digit",
                                hour: "2-digit",
                                minute: "2-digit",
                                timeZone: "America/Bogota"
                              });
                            })()}
                          </p>
                        )}
                        {tarea.nombre_usuario_creador && (
                          <p className="text-xs text-muted-foreground mb-2">
                            Creado por: {tarea.nombre_usuario_creador}
                          </p>
                        )}
                        <div className="flex items-center justify-between gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleMoverTarea(tarea.id, ESTADOS.EN_PROCESO, "izquierda")}
                            disabled={loading}
                            className="h-7"
                          >
                            <ChevronLeft className="h-4 w-4" />
                          </Button>
                          <div className="flex gap-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleEditarTarea(tarea)}
                              className="h-7 text-muted-foreground hover:text-foreground"
                              disabled={loading}
                            >
                              <Pencil className="h-3 w-3" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleEliminarTarea(tarea.id)}
                              className="h-7 text-destructive hover:text-destructive hover:bg-destructive/10"
                              disabled={loading}
                            >
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TareaKanban;

