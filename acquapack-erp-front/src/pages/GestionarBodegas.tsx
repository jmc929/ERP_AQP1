import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  TableBody,
  TableCell,
  TableRow,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Plus, Archive } from "lucide-react";
import SearchBar from "@/components/SearchBar";
import PageContainer from "@/components/PageContainer";
import PageTitle from "@/components/PageTitle";
import TableCard from "@/components/TableCard";
import EmptyTableMessage from "@/components/EmptyTableMessage";
import ConfirmDialog from "@/components/ConfirmDialog";
import ActionButton from "@/components/ActionButton";
import FormCard from "@/components/FormCard";

// Datos mock de bodegas
interface Bodega {
  id: number;
  nombre: string;
}

const bodegasIniciales: Bodega[] = [
  { id: 1, nombre: "Bodega Principal" },
  { id: 2, nombre: "Bodega Secundaria" },
  { id: 3, nombre: "Bodega Norte" },
  { id: 4, nombre: "Bodega Sur" },
  { id: 5, nombre: "Bodega Centro" },
  { id: 6, nombre: "Bodega Este" },
  { id: 7, nombre: "Bodega Oeste" },
  { id: 8, nombre: "Bodega Almacén 1" },
  { id: 9, nombre: "Bodega Almacén 2" },
  { id: 10, nombre: "Bodega Distribución" },
  { id: 11, nombre: "Bodega Temporal" },
  { id: 12, nombre: "Bodega Frigorífica" },
  { id: 13, nombre: "Bodega Seca" },
  { id: 14, nombre: "Bodega Húmeda" },
  { id: 15, nombre: "Bodega Exterior" },
];

const GestionarBodegas = () => {
  const [bodegas, setBodegas] = useState<Bodega[]>(bodegasIniciales);
  const [bodegasSeleccionadas, setBodegasSeleccionadas] = useState<Set<number>>(new Set());
  const [mostrarDialogoArchivar, setMostrarDialogoArchivar] = useState(false);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [formId, setFormId] = useState("");
  const [formNombre, setFormNombre] = useState("");
  const [busqueda, setBusqueda] = useState("");

  // Filtrar bodegas según búsqueda
  const bodegasFiltradas = bodegas.filter((bodega) =>
    bodega.id.toString().includes(busqueda) ||
    bodega.nombre.toLowerCase().includes(busqueda.toLowerCase())
  );

  const handleCheckbox = (bodegaId: number, checked: boolean) => {
    setBodegasSeleccionadas((prev) => {
      const nuevo = new Set(prev);
      if (checked) {
        nuevo.add(bodegaId);
      } else {
        nuevo.delete(bodegaId);
      }
      return nuevo;
    });
  };

  const handleAgregarBodega = () => {
    if (formId.trim() && formNombre.trim()) {
      const nuevaBodega: Bodega = {
        id: parseInt(formId) || Math.max(...bodegas.map((b) => b.id), 0) + 1,
        nombre: formNombre.trim(),
      };
      setBodegas([...bodegas, nuevaBodega]);
      setFormId("");
      setFormNombre("");
      setMostrarFormulario(false);
    }
  };

  const handleArchivarConfirmado = () => {
    setBodegas(bodegas.filter((b) => !bodegasSeleccionadas.has(b.id)));
    setBodegasSeleccionadas(new Set());
    setMostrarDialogoArchivar(false);
  };

  return (
    <PageContainer>
      <div className="flex items-center justify-between">
        <PageTitle title="Gestionar Bodegas" />
        <Button
          onClick={() => setMostrarFormulario(!mostrarFormulario)}
          className="flex items-center gap-2"
        >
          <Plus className="h-4 w-4" />
          Agregar Bodega
        </Button>
      </div>

      {/* Formulario para agregar bodega */}
      {mostrarFormulario && (
        <FormCard title="Agregar Nueva Bodega">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="id">ID</Label>
              <Input
                id="id"
                type="number"
                value={formId}
                onChange={(e) => setFormId(e.target.value)}
                placeholder="Ingrese el ID de la bodega"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="nombre">Nombre</Label>
              <Input
                id="nombre"
                value={formNombre}
                onChange={(e) => setFormNombre(e.target.value)}
                placeholder="Ingrese el nombre de la bodega"
              />
            </div>
          </div>
          <div className="flex gap-2">
            <Button onClick={handleAgregarBodega} className="flex-1">
              Guardar Bodega
            </Button>
            <Button
              variant="outline"
              onClick={() => {
                setMostrarFormulario(false);
                setFormId("");
                setFormNombre("");
              }}
            >
              Cancelar
            </Button>
          </div>
        </FormCard>
      )}

      {/* Barra de búsqueda */}
      <SearchBar
        placeholder="Buscar por ID o nombre..."
        value={busqueda}
        onChange={setBusqueda}
      />

      {/* Tabla de bodegas */}
      <TableCard
        headers={["", "ID", "Nombre"]}
        emptyMessage={
          bodegasFiltradas.length === 0
            ? bodegas.length === 0
              ? "No hay bodegas registradas"
              : "No se encontraron bodegas"
            : undefined
        }
        colSpan={3}
      >
        {bodegasFiltradas.map((bodega) => (
          <TableRow key={bodega.id}>
            <TableCell className="border-r border-border w-12">
              <Checkbox
                checked={bodegasSeleccionadas.has(bodega.id)}
                onCheckedChange={(checked) =>
                  handleCheckbox(bodega.id, checked as boolean)
                }
              />
            </TableCell>
            <TableCell className="border-r border-border font-medium">
              {bodega.id}
            </TableCell>
            <TableCell>{bodega.nombre}</TableCell>
          </TableRow>
        ))}
      </TableCard>

      {/* Botón Archivar */}
      {bodegasSeleccionadas.size > 0 && (
        <ActionButton
          icon={Archive}
          text="Archivar"
          count={bodegasSeleccionadas.size}
          onClick={() => setMostrarDialogoArchivar(true)}
        />
      )}

      {/* Diálogo de confirmación para archivar */}
      <ConfirmDialog
        open={mostrarDialogoArchivar}
        onOpenChange={setMostrarDialogoArchivar}
        description={`Se archivarán ${bodegasSeleccionadas.size} bodega(s). Esta acción puede deshacerse más tarde.`}
        confirmText="Sí, archivar"
        cancelText="Cancelar"
        onConfirm={handleArchivarConfirmado}
      />
    </PageContainer>
  );
};

export default GestionarBodegas;

