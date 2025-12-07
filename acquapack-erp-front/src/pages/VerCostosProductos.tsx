import { useState } from "react";
import {
  TableBody,
  TableCell,
  TableRow,
} from "@/components/ui/table";
import SearchBar from "@/components/SearchBar";
import PageContainer from "@/components/PageContainer";
import PageTitle from "@/components/PageTitle";
import TableCard from "@/components/TableCard";

// Datos mock de productos con costos y proveedores
interface ProductoCosto {
  id: number;
  nombre: string;
  proveedor: string;
  costo: number;
}

const productosIniciales: ProductoCosto[] = [
  { id: 1, nombre: "Producto A", proveedor: "Distribuidora Acuática S.A.", costo: 15000 },
  { id: 2, nombre: "Producto B", proveedor: "Suministros Marítimos del Caribe", costo: 25000 },
  { id: 3, nombre: "Producto C", proveedor: "Aqua Supplies Colombia", costo: 18000 },
  { id: 4, nombre: "Producto D", proveedor: "Proveedores Oceánicos Ltda.", costo: 32000 },
  { id: 5, nombre: "Producto E", proveedor: "Marine Equipment Solutions", costo: 12000 },
  { id: 6, nombre: "Producto F", proveedor: "Distribuidora Náutica del Pacífico", costo: 22000 },
  { id: 7, nombre: "Producto G", proveedor: "Suministros Acuáticos Premium", costo: 28000 },
  { id: 8, nombre: "Producto H", proveedor: "AquaTech Internacional", costo: 19000 },
  { id: 9, nombre: "Producto I", proveedor: "Proveedores de Equipos Acuáticos", costo: 35000 },
  { id: 10, nombre: "Producto J", proveedor: "Distribuidora Marina Central", costo: 42000 },
  { id: 11, nombre: "Producto K", proveedor: "Ocean Supplies & More", costo: 38000 },
  { id: 12, nombre: "Producto L", proveedor: "Aqua Distribuciones del Norte", costo: 29000 },
  { id: 13, nombre: "Producto M", proveedor: "Suministros para Piscinas S.A.", costo: 27000 },
  { id: 14, nombre: "Producto N", proveedor: "Proveedores Acuáticos del Sur", costo: 31000 },
  { id: 15, nombre: "Producto O", proveedor: "Marine World Distributors", costo: 24000 },
];

const VerCostosProductos = () => {
  const [busqueda, setBusqueda] = useState("");

  // Filtrar productos según búsqueda (busca en ID, nombre, proveedor y costo)
  const productosFiltrados = productosIniciales.filter((producto) =>
    producto.id.toString().includes(busqueda) ||
    producto.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
    producto.proveedor.toLowerCase().includes(busqueda.toLowerCase()) ||
    producto.costo.toString().includes(busqueda)
  );

  return (
    <PageContainer>
      <PageTitle title="Ver Costos por Productos" />

      {/* Barra de búsqueda */}
      <SearchBar
        placeholder="Buscar por ID, nombre, proveedor o costo..."
        value={busqueda}
        onChange={setBusqueda}
      />

      {/* Tabla */}
      <TableCard
        headers={["ID", "Nombre", "Proveedor", "Costo"]}
        emptyMessage={productosFiltrados.length === 0 ? "No se encontraron productos" : undefined}
        colSpan={4}
      >
        {productosFiltrados.map((producto) => (
          <TableRow key={producto.id}>
            <TableCell className="font-medium py-4 px-6 border-r border-border">
              {producto.id}
            </TableCell>
            <TableCell className="py-4 px-6 border-r border-border">
              {producto.nombre}
            </TableCell>
            <TableCell className="py-4 px-6 border-r border-border">
              {producto.proveedor}
            </TableCell>
            <TableCell className="py-4 px-6">
              ${producto.costo.toLocaleString("es-CO")}
            </TableCell>
          </TableRow>
        ))}
      </TableCard>
    </PageContainer>
  );
};

export default VerCostosProductos;

