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

// Datos mock de clientes
interface Cliente {
  id: number;
  nombre: string;
}

const clientesIniciales: Cliente[] = [
  { id: 1, nombre: "Cliente Empresarial A" },
  { id: 2, nombre: "Distribuidora Comercial del Sur" },
  { id: 3, nombre: "Cliente Premium Colombia" },
  { id: 4, nombre: "Empresa de Suministros Ltda." },
  { id: 5, nombre: "Comercializadora Nacional" },
  { id: 6, nombre: "Cliente Corporativo del Norte" },
  { id: 7, nombre: "Distribuidora de Equipos S.A." },
  { id: 8, nombre: "Cliente VIP Internacional" },
  { id: 9, nombre: "Empresa de Abastecimientos" },
  { id: 10, nombre: "Comercializadora Central" },
  { id: 11, nombre: "Cliente Mayorista Plus" },
  { id: 12, nombre: "Distribuidora del Pacífico" },
  { id: 13, nombre: "Cliente Corporativo Premium" },
  { id: 14, nombre: "Empresa de Suministros del Este" },
  { id: 15, nombre: "Comercializadora Global" },
];

const GestionarClientes = () => {
  const [clientes, setClientes] = useState<Cliente[]>(clientesIniciales);
  const [clientesSeleccionados, setClientesSeleccionados] = useState<Set<number>>(new Set());
  const [mostrarDialogoArchivar, setMostrarDialogoArchivar] = useState(false);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [formId, setFormId] = useState("");
  const [formNombre, setFormNombre] = useState("");
  const [busqueda, setBusqueda] = useState("");

  // Filtrar clientes según búsqueda
  const clientesFiltrados = clientes.filter((cliente) =>
    cliente.id.toString().includes(busqueda) ||
    cliente.nombre.toLowerCase().includes(busqueda.toLowerCase())
  );

  const handleCheckbox = (clienteId: number, checked: boolean) => {
    setClientesSeleccionados((prev) => {
      const nuevo = new Set(prev);
      if (checked) {
        nuevo.add(clienteId);
      } else {
        nuevo.delete(clienteId);
      }
      return nuevo;
    });
  };

  const handleAgregarCliente = () => {
    if (formId.trim() && formNombre.trim()) {
      const nuevoCliente: Cliente = {
        id: parseInt(formId) || Math.max(...clientes.map((c) => c.id), 0) + 1,
        nombre: formNombre.trim(),
      };
      setClientes([...clientes, nuevoCliente]);
      setFormId("");
      setFormNombre("");
      setMostrarFormulario(false);
    }
  };

  const handleArchivarConfirmado = () => {
    setClientes(clientes.filter((c) => !clientesSeleccionados.has(c.id)));
    setClientesSeleccionados(new Set());
    setMostrarDialogoArchivar(false);
  };

  return (
    <PageContainer>
      <div className="flex items-center justify-between">
        <PageTitle title="Gestionar Clientes" />
        <Button
          onClick={() => setMostrarFormulario(!mostrarFormulario)}
          className="flex items-center gap-2"
        >
          <Plus className="h-4 w-4" />
          Agregar Cliente
        </Button>
      </div>

      {/* Formulario para agregar cliente */}
      {mostrarFormulario && (
        <FormCard title="Agregar Nuevo Cliente">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="id">ID</Label>
              <Input
                id="id"
                type="number"
                value={formId}
                onChange={(e) => setFormId(e.target.value)}
                placeholder="Ingrese el ID del cliente"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="nombre">Nombre</Label>
              <Input
                id="nombre"
                value={formNombre}
                onChange={(e) => setFormNombre(e.target.value)}
                placeholder="Ingrese el nombre del cliente"
              />
            </div>
          </div>
          <div className="flex gap-2">
            <Button onClick={handleAgregarCliente} className="flex-1">
              Guardar Cliente
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

      {/* Tabla de clientes */}
      <TableCard
        headers={["", "ID", "Nombre"]}
        emptyMessage={
          clientesFiltrados.length === 0
            ? clientes.length === 0
              ? "No hay clientes registrados"
              : "No se encontraron clientes"
            : undefined
        }
        colSpan={3}
      >
        {clientesFiltrados.map((cliente) => (
          <TableRow key={cliente.id}>
            <TableCell className="border-r border-border w-12">
              <Checkbox
                checked={clientesSeleccionados.has(cliente.id)}
                onCheckedChange={(checked) =>
                  handleCheckbox(cliente.id, checked as boolean)
                }
              />
            </TableCell>
            <TableCell className="border-r border-border font-medium">
              {cliente.id}
            </TableCell>
            <TableCell>{cliente.nombre}</TableCell>
          </TableRow>
        ))}
      </TableCard>

      {/* Botón Archivar */}
      {clientesSeleccionados.size > 0 && (
        <ActionButton
          icon={Archive}
          text="Archivar"
          count={clientesSeleccionados.size}
          onClick={() => setMostrarDialogoArchivar(true)}
        />
      )}

      {/* Diálogo de confirmación para archivar */}
      <ConfirmDialog
        open={mostrarDialogoArchivar}
        onOpenChange={setMostrarDialogoArchivar}
        description={`Se archivarán ${clientesSeleccionados.size} cliente(s). Esta acción puede deshacerse más tarde.`}
        confirmText="Sí, archivar"
        cancelText="Cancelar"
        onConfirm={handleArchivarConfirmado}
      />
    </PageContainer>
  );
};

export default GestionarClientes;

