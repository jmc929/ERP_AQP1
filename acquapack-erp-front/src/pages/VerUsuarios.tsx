import { useState } from "react";
import {
  TableBody,
  TableCell,
  TableRow,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Archive } from "lucide-react";
import SearchBar from "@/components/SearchBar";
import PageContainer from "@/components/PageContainer";
import PageTitle from "@/components/PageTitle";
import TableCard from "@/components/TableCard";
import ConfirmDialog from "@/components/ConfirmDialog";
import ActionButton from "@/components/ActionButton";

// Datos mock de usuarios
interface Usuario {
  id: number;
  nombre: string;
  rol: string;
}

const usuariosIniciales: Usuario[] = [
  { id: 1, nombre: "Juan Pérez", rol: "Administrador" },
  { id: 2, nombre: "María García", rol: "Usuario" },
  { id: 3, nombre: "Carlos Rodríguez", rol: "Vendedor" },
  { id: 4, nombre: "Ana Martínez", rol: "Contador" },
  { id: 5, nombre: "Luis Fernández", rol: "Supervisor" },
  { id: 6, nombre: "Laura Sánchez", rol: "Usuario" },
  { id: 7, nombre: "Pedro López", rol: "Vendedor" },
  { id: 8, nombre: "Sofía Ramírez", rol: "Administrador" },
  { id: 9, nombre: "Diego Torres", rol: "Usuario" },
  { id: 10, nombre: "Carmen Vargas", rol: "Contador" },
  { id: 11, nombre: "Roberto Jiménez", rol: "Vendedor" },
  { id: 12, nombre: "Patricia Herrera", rol: "Supervisor" },
  { id: 13, nombre: "Fernando Castro", rol: "Usuario" },
  { id: 14, nombre: "Isabel Morales", rol: "Administrador" },
  { id: 15, nombre: "Jorge Ruiz", rol: "Vendedor" },
];

const VerUsuarios = () => {
  const [usuarios, setUsuarios] = useState<Usuario[]>(usuariosIniciales);
  const [usuariosSeleccionados, setUsuariosSeleccionados] = useState<Set<number>>(new Set());
  const [mostrarDialogoArchivar, setMostrarDialogoArchivar] = useState(false);
  const [busqueda, setBusqueda] = useState("");

  // Filtrar usuarios según búsqueda
  const usuariosFiltrados = usuarios.filter((usuario) =>
    usuario.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
    usuario.rol.toLowerCase().includes(busqueda.toLowerCase())
  );

  const handleCheckbox = (usuarioId: number, checked: boolean) => {
    setUsuariosSeleccionados((prev) => {
      const nuevo = new Set(prev);
      if (checked) {
        nuevo.add(usuarioId);
      } else {
        nuevo.delete(usuarioId);
      }
      return nuevo;
    });
  };

  const handleArchivarConfirmado = () => {
    setUsuarios(usuarios.filter((u) => !usuariosSeleccionados.has(u.id)));
    setUsuariosSeleccionados(new Set());
    setMostrarDialogoArchivar(false);
  };

  return (
    <PageContainer>
      <PageTitle title="Ver Usuarios" />

      {/* Barra de búsqueda */}
      <SearchBar
        placeholder="Buscar por nombre o rol..."
        value={busqueda}
        onChange={setBusqueda}
      />

      {/* Tabla de usuarios */}
      <TableCard
        headers={["", "Nombre", "Rol"]}
        emptyMessage={
          usuariosFiltrados.length === 0
            ? usuarios.length === 0
              ? "No hay usuarios registrados"
              : "No se encontraron usuarios"
            : undefined
        }
        colSpan={3}
      >
        {usuariosFiltrados.map((usuario) => (
          <TableRow key={usuario.id}>
            <TableCell className="border-r border-border w-12">
              <Checkbox
                checked={usuariosSeleccionados.has(usuario.id)}
                onCheckedChange={(checked) =>
                  handleCheckbox(usuario.id, checked as boolean)
                }
              />
            </TableCell>
            <TableCell className="border-r border-border font-medium">
              {usuario.nombre}
            </TableCell>
            <TableCell>{usuario.rol}</TableCell>
          </TableRow>
        ))}
      </TableCard>

      {/* Botón Archivar */}
      {usuariosSeleccionados.size > 0 && (
        <ActionButton
          icon={Archive}
          text="Archivar"
          count={usuariosSeleccionados.size}
          onClick={() => setMostrarDialogoArchivar(true)}
        />
      )}

      {/* Diálogo de confirmación para archivar */}
      <ConfirmDialog
        open={mostrarDialogoArchivar}
        onOpenChange={setMostrarDialogoArchivar}
        description={`Se archivarán ${usuariosSeleccionados.size} usuario(s). Esta acción puede deshacerse más tarde.`}
        confirmText="Sí, archivar"
        cancelText="Cancelar"
        onConfirm={handleArchivarConfirmado}
      />
    </PageContainer>
  );
};

export default VerUsuarios;

