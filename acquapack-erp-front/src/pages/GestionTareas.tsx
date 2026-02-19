import { useState, useEffect, useMemo } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { ArrowLeft } from "lucide-react";
import PageContainer from "@/components/PageContainer";
import PageTitle from "@/components/PageTitle";
import TrabajadorCard from "@/components/TrabajadorCard";
import TareaKanban, { Tarea } from "@/components/TareaKanban";
import { useToast } from "@/hooks/use-toast";
import { API_BASE_URL } from "@/config/api";

interface Trabajador {
  id: number;
  nombre: string;
  tareas: Tarea[];
}

const GestionTareas = () => {
  const { toast } = useToast();
  const [trabajadores, setTrabajadores] = useState<Trabajador[]>([]);
  const [trabajadorSeleccionado, setTrabajadorSeleccionado] = useState<Trabajador | null>(null);
  const [mostrarDialogo, setMostrarDialogo] = useState(false);
  const [loading, setLoading] = useState(true);
  const [busqueda, setBusqueda] = useState("");

  // Cargar usuarios y sus tareas
  useEffect(() => {
    const cargarDatos = async () => {
      try {
        setLoading(true);
        
        // Cargar usuarios
        let usuariosData;
        try {
          const usuariosRes = await fetch(`${API_BASE_URL}/api/usuarios");
          usuariosData = await usuariosRes.json();
          
          if (!usuariosRes.ok) {
            console.error("Error al cargar usuarios:", usuariosData);
            throw new Error(usuariosData.message || "Error al cargar usuarios");
          }
        } catch (error) {
          console.error("Error al hacer fetch de usuarios:", error);
          toast({
            title: "Error",
            description: "No se pudieron cargar los usuarios",
            variant: "destructive",
          });
          setTrabajadores([]);
          return;
        }
        
        // Cargar tareas (permitir que falle)
        let tareas: any[] = [];
        try {
          const tareasRes = await fetch(`${API_BASE_URL}/api/tareas");
          if (tareasRes.ok) {
            const tareasData = await tareasRes.json();
            if (tareasData.success && Array.isArray(tareasData.tareas)) {
              tareas = tareasData.tareas;
            }
          } else {
            console.warn("Error al cargar tareas, continuando sin tareas");
          }
        } catch (error) {
          console.warn("Error al cargar tareas (continuando sin tareas):", error);
        }

        // Validar que los datos sean arrays
        if (!usuariosData.success || !Array.isArray(usuariosData.usuarios)) {
          console.error("Datos de usuarios inválidos:", usuariosData);
          toast({
            title: "Error",
            description: "Formato de datos inválido",
            variant: "destructive",
          });
          setTrabajadores([]);
          return;
        }

        // Mapear usuarios a trabajadores con sus tareas
        const trabajadoresConTareas: Trabajador[] = usuariosData.usuarios
          .filter((usuario: any) => usuario && usuario.id_usuarios)
          .map((usuario: any) => {
            const tareasUsuario = tareas
              .filter((tarea: any) => tarea && tarea.id_usuarios === usuario.id_usuarios)
              .map((tarea: any) => ({
                id: tarea.id_tareas,
                descripcion: tarea.descripcion || "",
                id_estado: tarea.id_estado ?? 21,
                fecha_asignacion: tarea.fecha_asignacion,
                estado_nombre: tarea.estado_nombre || "Pendiente",
                estado_color: tarea.estado_color || "#94a3b8",
                id_usuario_creador: tarea.id_usuario_creador,
                nombre_usuario_creador: tarea.nombre_usuario_creador,
              }));

            return {
              id: usuario.id_usuarios,
              nombre: `${usuario.nombre || ""} ${usuario.apellido || ""}`.trim() || `Usuario ${usuario.id_usuarios}`,
              tareas: tareasUsuario || []
            };
          })
          .filter((trabajador) => trabajador && trabajador.id);

        console.log("Trabajadores mapeados:", trabajadoresConTareas.length, trabajadoresConTareas);
        setTrabajadores(trabajadoresConTareas);
      } catch (error) {
        console.error("Error completo:", error);
        toast({
          title: "Error",
          description: error instanceof Error ? error.message : "No se pudieron cargar los usuarios y tareas",
          variant: "destructive",
        });
        setTrabajadores([]);
      } finally {
        setLoading(false);
      }
    };

    cargarDatos();
  }, [toast]);

  const handleSeleccionarTrabajador = (trabajador: Trabajador) => {
    setTrabajadorSeleccionado(trabajador);
    setMostrarDialogo(true);
  };

  const handleCerrarDialogo = () => {
    setMostrarDialogo(false);
    setTrabajadorSeleccionado(null);
  };

  const handleTareasChange = async (trabajadorId: number, nuevasTareas: Tarea[]) => {
    // Actualizar estado local
    setTrabajadores((prev) =>
      prev.map((trabajador) =>
        trabajador.id === trabajadorId
          ? { ...trabajador, tareas: nuevasTareas }
          : trabajador
      )
    );
    
    // Actualizar también el trabajador seleccionado si está abierto
    if (trabajadorSeleccionado && trabajadorSeleccionado.id === trabajadorId) {
      setTrabajadorSeleccionado({ ...trabajadorSeleccionado, tareas: nuevasTareas });
    }
  };

  // Filtrar trabajadores basándose en la búsqueda
  const trabajadoresFiltrados = useMemo(() => {
    if (!busqueda.trim()) {
      return trabajadores;
    }
    
    const terminoBusqueda = busqueda.toLowerCase().trim();
    return trabajadores.filter((trabajador) =>
      trabajador.nombre.toLowerCase().includes(terminoBusqueda)
    );
  }, [trabajadores, busqueda]);

  return (
    <PageContainer>
      <PageTitle title="Gestión de Tareas" />
      <p className="text-muted-foreground mb-6">
        Selecciona un trabajador para ver y gestionar sus tareas
      </p>

      {/* Barra de búsqueda */}
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Buscar trabajador por nombre..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            className="pl-10"
          />
        </div>
        {busqueda.trim() && (
          <p className="text-sm text-muted-foreground mt-2">
            {trabajadoresFiltrados.length === 0
              ? "No se encontraron trabajadores"
              : `${trabajadoresFiltrados.length} trabajador(es) encontrado(s)`}
          </p>
        )}
      </div>

      {/* Grid de tarjetas de trabajadores */}
      {loading ? (
        <div className="text-center py-8">Cargando usuarios y tareas...</div>
      ) : trabajadores.length === 0 ? (
        <div className="text-center py-8 text-muted-foreground">
          No hay usuarios registrados
        </div>
      ) : trabajadoresFiltrados.length === 0 ? (
        <div className="text-center py-8 text-muted-foreground">
          No se encontraron trabajadores que coincidan con la búsqueda
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {trabajadoresFiltrados.map((trabajador) => {
            const tareasTotales = trabajador.tareas.length;
            const tareasTerminadas = trabajador.tareas.filter((t) => t.id_estado === 23).length;

            return (
              <TrabajadorCard
                key={trabajador.id}
                nombre={trabajador.nombre}
                tareasCompletadas={tareasTerminadas}
                tareasTotales={tareasTotales}
                onClick={() => handleSeleccionarTrabajador(trabajador)}
              />
            );
          })}
        </div>
      )}

      {/* Dialog para mostrar el board Kanban de tareas */}
      {mostrarDialogo && trabajadorSeleccionado && (
        <Dialog open={mostrarDialogo} onOpenChange={setMostrarDialogo}>
          <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <ArrowLeft
                  className="h-5 w-5 cursor-pointer hover:text-primary transition-colors"
                  onClick={handleCerrarDialogo}
                />
                {trabajadorSeleccionado.nombre}
              </DialogTitle>
            </DialogHeader>
            <TareaKanban
              trabajadorId={trabajadorSeleccionado.id}
              trabajadorNombre={trabajadorSeleccionado.nombre}
              tareas={trabajadorSeleccionado.tareas || []}
              onTareasChange={(nuevasTareas) =>
                handleTareasChange(trabajadorSeleccionado.id, nuevasTareas)
              }
            />
          </DialogContent>
        </Dialog>
      )}
    </PageContainer>
  );
};

export default GestionTareas;


