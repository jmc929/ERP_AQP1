import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ArrowLeft } from "lucide-react";
import PageContainer from "@/components/PageContainer";
import PageTitle from "@/components/PageTitle";
import TrabajadorCard from "@/components/TrabajadorCard";
import TareaChecklist, { Tarea } from "@/components/TareaChecklist";

interface Trabajador {
  id: number;
  nombre: string;
  tareas: Tarea[];
}

// Datos mock de trabajadores con sus tareas
const trabajadoresIniciales: Trabajador[] = [
  {
    id: 1,
    nombre: "Juan Pérez",
    tareas: [
      { id: 1, descripcion: "Revisar inventario de productos", completada: true },
      { id: 2, descripcion: "Actualizar precios en el sistema", completada: false },
      { id: 3, descripcion: "Preparar reporte de ventas", completada: false },
    ],
  },
  {
    id: 2,
    nombre: "María García",
    tareas: [
      { id: 1, descripcion: "Contactar nuevos proveedores", completada: true },
      { id: 2, descripcion: "Revisar facturas pendientes", completada: true },
      { id: 3, descripcion: "Organizar documentos de compras", completada: false },
    ],
  },
  {
    id: 3,
    nombre: "Carlos Rodríguez",
    tareas: [
      { id: 1, descripcion: "Capacitar nuevo personal", completada: false },
      { id: 2, descripcion: "Revisar políticas de seguridad", completada: false },
    ],
  },
  {
    id: 4,
    nombre: "Ana Martínez",
    tareas: [
      { id: 1, descripcion: "Revisar estados financieros", completada: true },
      { id: 2, descripcion: "Preparar presupuesto mensual", completada: true },
      { id: 3, descripcion: "Auditar gastos del mes", completada: true },
      { id: 4, descripcion: "Enviar reporte a gerencia", completada: false },
    ],
  },
  {
    id: 5,
    nombre: "Luis Fernández",
    tareas: [
      { id: 1, descripcion: "Supervisar producción", completada: true },
      { id: 2, descripcion: "Revisar calidad de productos", completada: false },
    ],
  },
  {
    id: 6,
    nombre: "Laura Sánchez",
    tareas: [
      { id: 1, descripcion: "Atender clientes VIP", completada: true },
      { id: 2, descripcion: "Seguimiento de pedidos", completada: false },
      { id: 3, descripcion: "Actualizar base de datos de clientes", completada: false },
    ],
  },
];

const GestionTareas = () => {
  const [trabajadores, setTrabajadores] = useState<Trabajador[]>(trabajadoresIniciales);
  const [trabajadorSeleccionado, setTrabajadorSeleccionado] = useState<Trabajador | null>(null);
  const [mostrarDialogo, setMostrarDialogo] = useState(false);

  const handleSeleccionarTrabajador = (trabajador: Trabajador) => {
    setTrabajadorSeleccionado(trabajador);
    setMostrarDialogo(true);
  };

  const handleCerrarDialogo = () => {
    setMostrarDialogo(false);
    setTrabajadorSeleccionado(null);
  };

  const handleTareasChange = (trabajadorId: number, nuevasTareas: Tarea[]) => {
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


