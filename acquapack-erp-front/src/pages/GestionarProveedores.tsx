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

// Datos mock de proveedores
interface Proveedor {
  id: number;
  nombre: string;
}

const proveedoresIniciales: Proveedor[] = [
  { id: 1, nombre: "Distribuidora Acuática S.A." },
  { id: 2, nombre: "Suministros Marítimos del Caribe" },
  { id: 3, nombre: "Aqua Supplies Colombia" },
  { id: 4, nombre: "Proveedores Oceánicos Ltda." },
  { id: 5, nombre: "Marine Equipment Solutions" },
  { id: 6, nombre: "Distribuidora Náutica del Pacífico" },
  { id: 7, nombre: "Suministros Acuáticos Premium" },
  { id: 8, nombre: "AquaTech Internacional" },
  { id: 9, nombre: "Proveedores de Equipos Acuáticos" },
  { id: 10, nombre: "Distribuidora Marina Central" },
  { id: 11, nombre: "Ocean Supplies & More" },
  { id: 12, nombre: "Aqua Distribuciones del Norte" },
  { id: 13, nombre: "Suministros para Piscinas S.A." },
  { id: 14, nombre: "Proveedores Acuáticos del Sur" },
  { id: 15, nombre: "Marine World Distributors" },
];

const GestionarProveedores = () => {
  const [proveedores, setProveedores] = useState<Proveedor[]>(proveedoresIniciales);
  const [proveedoresSeleccionados, setProveedoresSeleccionados] = useState<Set<number>>(new Set());
  const [mostrarDialogoArchivar, setMostrarDialogoArchivar] = useState(false);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [formId, setFormId] = useState("");
  const [formNombre, setFormNombre] = useState("");
  const [busqueda, setBusqueda] = useState("");

  // Filtrar proveedores según búsqueda
  const proveedoresFiltrados = proveedores.filter((proveedor) =>
    proveedor.id.toString().includes(busqueda) ||
    proveedor.nombre.toLowerCase().includes(busqueda.toLowerCase())
  );

  const handleCheckbox = (proveedorId: number, checked: boolean) => {
    setProveedoresSeleccionados((prev) => {
      const nuevo = new Set(prev);
      if (checked) {
        nuevo.add(proveedorId);
      } else {
        nuevo.delete(proveedorId);
      }
      return nuevo;
    });
  };

  const handleAgregarProveedor = () => {
    if (formId.trim() && formNombre.trim()) {
      const nuevoProveedor: Proveedor = {
        id: parseInt(formId) || Math.max(...proveedores.map((p) => p.id), 0) + 1,
        nombre: formNombre.trim(),
      };
      setProveedores([...proveedores, nuevoProveedor]);
      setFormId("");
      setFormNombre("");
      setMostrarFormulario(false);
    }
  };

  const handleArchivarConfirmado = () => {
    setProveedores(proveedores.filter((p) => !proveedoresSeleccionados.has(p.id)));
    setProveedoresSeleccionados(new Set());
    setMostrarDialogoArchivar(false);
  };

  return (
    <PageContainer>
      <div className="flex items-center justify-between">
        <PageTitle title="Gestionar Proveedores" />
        <Button
          onClick={() => setMostrarFormulario(!mostrarFormulario)}
          className="flex items-center gap-2"
        >
          <Plus className="h-4 w-4" />
          Agregar Proveedor
        </Button>
      </div>

      {/* Formulario para agregar proveedor */}
      {mostrarFormulario && (
        <FormCard title="Agregar Nuevo Proveedor">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="id">ID</Label>
              <Input
                id="id"
                type="number"
                value={formId}
                onChange={(e) => setFormId(e.target.value)}
                placeholder="Ingrese el ID del proveedor"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="nombre">Nombre</Label>
              <Input
                id="nombre"
                value={formNombre}
                onChange={(e) => setFormNombre(e.target.value)}
                placeholder="Ingrese el nombre del proveedor"
              />
            </div>
          </div>
          <div className="flex gap-2">
            <Button onClick={handleAgregarProveedor} className="flex-1">
              Guardar Proveedor
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

      {/* Tabla de proveedores */}
      <TableCard
        headers={["", "ID", "Nombre"]}
        emptyMessage={
          proveedoresFiltrados.length === 0
            ? proveedores.length === 0
              ? "No hay proveedores registrados"
              : "No se encontraron proveedores"
            : undefined
        }
        colSpan={3}
      >
        {proveedoresFiltrados.map((proveedor) => (
          <TableRow key={proveedor.id}>
            <TableCell className="border-r border-border w-12">
              <Checkbox
                checked={proveedoresSeleccionados.has(proveedor.id)}
                onCheckedChange={(checked) =>
                  handleCheckbox(proveedor.id, checked as boolean)
                }
              />
            </TableCell>
            <TableCell className="border-r border-border font-medium">
              {proveedor.id}
            </TableCell>
            <TableCell>{proveedor.nombre}</TableCell>
          </TableRow>
        ))}
      </TableCard>

      {/* Botón Archivar */}
      {proveedoresSeleccionados.size > 0 && (
        <ActionButton
          icon={Archive}
          text="Archivar"
          count={proveedoresSeleccionados.size}
          onClick={() => setMostrarDialogoArchivar(true)}
        />
      )}

      {/* Diálogo de confirmación para archivar */}
      <ConfirmDialog
        open={mostrarDialogoArchivar}
        onOpenChange={setMostrarDialogoArchivar}
        description={`Se archivarán ${proveedoresSeleccionados.size} proveedor(es). Esta acción puede deshacerse más tarde.`}
        confirmText="Sí, archivar"
        cancelText="Cancelar"
        onConfirm={handleArchivarConfirmado}
      />
    </PageContainer>
  );
};

export default GestionarProveedores;

