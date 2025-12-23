import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ArrowLeft } from "lucide-react";
import PageContainer from "@/components/PageContainer";
import PageTitle from "@/components/PageTitle";
import TrabajadorCard from "@/components/TrabajadorCard";
import TareaChecklist, { Tarea } from "@/components/TareaChecklist";
import { useToast } from "@/hooks/use-toast";

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

  // Cargar usuarios y sus tareas
  useEffect(() => {
    const cargarDatos = async () => {
      try {
        setLoading(true);
        const [usuariosRes, tareasRes] = await Promise.all([
          fetch("http://localhost:4000/api/usuarios"),
          fetch("http://localhost:4000/api/tareas")
        ]);

        const usuariosData = await usuariosRes.json();
        const tareasData = await tareasRes.json();

        if (usuariosData.success && tareasData.success) {
          // Mapear usuarios a trabajadores con sus tareas
          const trabajadoresConTareas: Trabajador[] = usuariosData.usuarios.map((usuario: any) => {
            const tareasUsuario = tareasData.tareas
              .filter((tarea: any) => tarea.id_usuarios === usuario.id_usuarios)
              .map((tarea: any) => ({
                id: tarea.id_tareas,
                descripcion: tarea.descripcion,
                completada: tarea.completada,
                fecha_asignacion: tarea.fecha_asignacion
              }));

            return {
              id: usuario.id_usuarios,
              nombre: `${usuario.nombre} ${usuario.apellido}`,
              tareas: tareasUsuario
            };
          });

          setTrabajadores(trabajadoresConTareas);
        }
      } catch (error) {
        toast({
          title: "Error",
          description: "No se pudieron cargar los usuarios y tareas",
          variant: "destructive",
        });
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

  return (
    <PageContainer>
      <PageTitle title="Gestión de Tareas" />
      <p className="text-muted-foreground mb-6">
        Selecciona un trabajador para ver y gestionar sus tareas
      </p>

      {/* Grid de tarjetas de trabajadores */}
      {loading ? (
        <div className="text-center py-8">Cargando usuarios y tareas...</div>
      ) : trabajadores.length === 0 ? (
        <div className="text-center py-8 text-muted-foreground">
          No hay usuarios registrados
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {trabajadores.map((trabajador) => {
            const tareasCompletadas = trabajador.tareas.filter((t) => t.completada).length;
            const tareasTotales = trabajador.tareas.length;

            return (
              <TrabajadorCard
                key={trabajador.id}
                nombre={trabajador.nombre}
                tareasCompletadas={tareasCompletadas}
                tareasTotales={tareasTotales}
                onClick={() => handleSeleccionarTrabajador(trabajador)}
              />
            );
          })}
        </div>
      )}

      {/* Dialog para mostrar la checklist de tareas */}
      <Dialog open={mostrarDialogo} onOpenChange={setMostrarDialogo}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <ArrowLeft
                className="h-5 w-5 cursor-pointer hover:text-primary transition-colors"
                onClick={handleCerrarDialogo}
              />
              {trabajadorSeleccionado?.nombre}
            </DialogTitle>
          </DialogHeader>
          {trabajadorSeleccionado && (
            <TareaChecklist
              trabajadorId={trabajadorSeleccionado.id}
              trabajadorNombre={trabajadorSeleccionado.nombre}
              tareas={trabajadorSeleccionado.tareas}
              onTareasChange={(nuevasTareas) =>
                handleTareasChange(trabajadorSeleccionado.id, nuevasTareas)
              }
            />
          )}
        </DialogContent>
      </Dialog>
    </PageContainer>
  );
};

export default GestionTareas;


