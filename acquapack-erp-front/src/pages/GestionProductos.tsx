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
import { Plus, Trash2, Edit } from "lucide-react";
import SearchBar from "@/components/SearchBar";
import PageContainer from "@/components/PageContainer";
import PageTitle from "@/components/PageTitle";
import TableCard from "@/components/TableCard";
import ConfirmDialog from "@/components/ConfirmDialog";
import ActionButton from "@/components/ActionButton";
import FormCard from "@/components/FormCard";

// Datos mock de productos
interface Producto {
  id: number;
  nombre: string;
  cantidad: number;
}

const productosIniciales: Producto[] = [
  { id: 1, nombre: "Producto A", cantidad: 100 },
  { id: 2, nombre: "Producto B", cantidad: 50 },
  { id: 3, nombre: "Producto C", cantidad: 200 },
  { id: 4, nombre: "Producto D", cantidad: 75 },
  { id: 5, nombre: "Producto E", cantidad: 150 },
];

type Modo = "crear" | "editar" | "eliminar" | null;

const GestionProductos = () => {
  const [productos, setProductos] = useState<Producto[]>(productosIniciales);
  const [modo, setModo] = useState<Modo>(null);
  const [productosSeleccionados, setProductosSeleccionados] = useState<Set<number>>(new Set());
  const [productoEditando, setProductoEditando] = useState<Producto | null>(null);
  const [busqueda, setBusqueda] = useState("");
  const [mostrarDialogoEliminar, setMostrarDialogoEliminar] = useState(false);
  
  // Formulario crear/editar
  const [formNombre, setFormNombre] = useState("");
  const [formCantidad, setFormCantidad] = useState("");

  // Filtrar productos según búsqueda
  const productosFiltrados = productos.filter((producto) =>
    producto.nombre.toLowerCase().includes(busqueda.toLowerCase())
  );

  const handleModo = (nuevoModo: Modo) => {
    setModo(nuevoModo);
    setProductosSeleccionados(new Set());
    setProductoEditando(null);
    setFormNombre("");
    setFormCantidad("");
    setBusqueda("");
  };

  const handleCheckbox = (productoId: number, checked: boolean) => {
    setProductosSeleccionados((prev) => {
      const nuevo = new Set(prev);
      if (checked) {
        nuevo.add(productoId);
      } else {
        nuevo.delete(productoId);
      }
      return nuevo;
    });
  };

  const handleSeleccionarProductoEditar = (producto: Producto) => {
    setProductoEditando(producto);
    setFormNombre(producto.nombre);
    setFormCantidad(producto.cantidad.toString());
  };

  const handleCrearProducto = () => {
    if (formNombre.trim() && formCantidad.trim()) {
      const nuevoProducto: Producto = {
        id: Math.max(...productos.map((p) => p.id), 0) + 1,
        nombre: formNombre.trim(),
        cantidad: parseInt(formCantidad) || 0,
      };
      setProductos([...productos, nuevoProducto]);
      setFormNombre("");
      setFormCantidad("");
    }
  };

  const handleEditarProducto = () => {
    if (productoEditando && formNombre.trim() && formCantidad.trim()) {
      setProductos(
        productos.map((p) =>
          p.id === productoEditando.id
            ? { ...p, nombre: formNombre.trim(), cantidad: parseInt(formCantidad) || 0 }
            : p
        )
      );
      setProductoEditando(null);
      setFormNombre("");
      setFormCantidad("");
    }
  };

  const handleEliminarConfirmado = () => {
    setProductos(productos.filter((p) => !productosSeleccionados.has(p.id)));
    setProductosSeleccionados(new Set());
    setMostrarDialogoEliminar(false);
    if (productosSeleccionados.size === productos.length) {
      setModo(null);
    }
  };

  return (
    <PageContainer>
      <PageTitle title="Gestión de Productos" />

      {/* Tres botones principales */}
      <div className="flex gap-4">
        <Button
          onClick={() => handleModo("crear")}
          variant={modo === "crear" ? "default" : "outline"}
          className="flex items-center gap-2"
        >
          <Plus className="h-4 w-4" />
          Crear
        </Button>
        <Button
          onClick={() => handleModo("eliminar")}
          variant={modo === "eliminar" ? "default" : "outline"}
          className="flex items-center gap-2"
        >
          <Trash2 className="h-4 w-4" />
          Eliminar
        </Button>
        <Button
          onClick={() => handleModo("editar")}
          variant={modo === "editar" ? "default" : "outline"}
          className="flex items-center gap-2"
        >
          <Edit className="h-4 w-4" />
          Editar
        </Button>
      </div>

      {/* Formulario de Crear */}
      {modo === "crear" && (
        <FormCard title="Crear Nuevo Producto">
          <div className="space-y-2">
            <Label htmlFor="nombre">Nombre</Label>
            <Input
              id="nombre"
              value={formNombre}
              onChange={(e) => setFormNombre(e.target.value)}
              placeholder="Ingrese el nombre del producto"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="cantidad">Cantidad</Label>
            <Input
              id="cantidad"
              type="number"
              value={formCantidad}
              onChange={(e) => setFormCantidad(e.target.value)}
              placeholder="Ingrese la cantidad"
            />
          </div>
          <Button onClick={handleCrearProducto} className="w-full">
            Guardar Producto
          </Button>
        </FormCard>
      )}

      {/* Tabla para Eliminar */}
      {modo === "eliminar" && (
        <div className="space-y-4">
          {/* Barra de búsqueda */}
          <SearchBar
            placeholder="Buscar productos..."
            value={busqueda}
            onChange={setBusqueda}
          />

          {/* Tabla */}
          <TableCard
            headers={["", "Producto", "Stock"]}
            emptyMessage={productosFiltrados.length === 0 ? "No se encontraron productos" : undefined}
            colSpan={3}
          >
            {productosFiltrados.length > 0 && (
              <>
                {productosFiltrados.map((producto) => (
                  <TableRow key={producto.id}>
                    <TableCell className="w-12">
                      <Checkbox
                        checked={productosSeleccionados.has(producto.id)}
                        onCheckedChange={(checked) =>
                          handleCheckbox(producto.id, checked as boolean)
                        }
                      />
                    </TableCell>
                    <TableCell className="font-medium">{producto.nombre}</TableCell>
                    <TableCell>{producto.cantidad}</TableCell>
                  </TableRow>
                ))}
              </>
            )}
          </TableCard>

          {/* Botón Eliminar */}
          {productosSeleccionados.size > 0 && (
            <ActionButton
              icon={Trash2}
              text="Eliminar"
              count={productosSeleccionados.size}
              onClick={() => setMostrarDialogoEliminar(true)}
            />
          )}
        </div>
      )}

      {/* Tabla para Editar */}
      {modo === "editar" && (
        <div className="space-y-4">
          {/* Barra de búsqueda */}
          <SearchBar
            placeholder="Buscar productos..."
            value={busqueda}
            onChange={setBusqueda}
          />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Tabla */}
            <TableCard
              headers={["Producto", "Stock"]}
              emptyMessage={productosFiltrados.length === 0 ? "No se encontraron productos" : undefined}
              colSpan={2}
            >
              {productosFiltrados.map((producto) => (
                <TableRow
                  key={producto.id}
                  className={`cursor-pointer ${
                    productoEditando?.id === producto.id
                      ? "bg-primary/10"
                      : "hover:bg-muted/50"
                  }`}
                  onClick={() => handleSeleccionarProductoEditar(producto)}
                >
                  <TableCell className="font-medium">{producto.nombre}</TableCell>
                  <TableCell>{producto.cantidad}</TableCell>
                </TableRow>
              ))}
            </TableCard>

            {/* Formulario de Edición */}
            {productoEditando && (
              <FormCard title="Editar Producto">
                <div className="space-y-2">
                  <Label htmlFor="edit-nombre">Nombre</Label>
                  <Input
                    id="edit-nombre"
                    value={formNombre}
                    onChange={(e) => setFormNombre(e.target.value)}
                    placeholder="Ingrese el nombre del producto"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-cantidad">Cantidad</Label>
                  <Input
                    id="edit-cantidad"
                    type="number"
                    value={formCantidad}
                    onChange={(e) => setFormCantidad(e.target.value)}
                    placeholder="Ingrese la cantidad"
                  />
                </div>
                <div className="flex gap-2">
                  <Button onClick={handleEditarProducto} className="flex-1">
                    Guardar Cambios
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setProductoEditando(null);
                      setFormNombre("");
                      setFormCantidad("");
                    }}
                  >
                    Cancelar
                  </Button>
                </div>
              </FormCard>
            )}
          </div>
        </div>
      )}

      {/* Diálogo de confirmación para eliminar */}
      <ConfirmDialog
        open={mostrarDialogoEliminar}
        onOpenChange={setMostrarDialogoEliminar}
        description={`Esta acción no se puede deshacer. Se eliminarán ${productosSeleccionados.size} producto(s) permanentemente.`}
        confirmText="Sí, eliminar"
        cancelText="No"
        onConfirm={handleEliminarConfirmado}
      />
    </PageContainer>
  );
};

export default GestionProductos;

