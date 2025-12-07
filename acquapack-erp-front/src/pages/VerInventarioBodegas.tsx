import { useState, useMemo } from "react";
import { Label } from "@/components/ui/label";
import {
  TableBody,
  TableCell,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import SearchBar from "@/components/SearchBar";
import PageContainer from "@/components/PageContainer";
import PageTitle from "@/components/PageTitle";
import TableCard from "@/components/TableCard";

// Datos mock de bodegas
interface Bodega {
  id: string;
  nombre: string;
}

const bodegas: Bodega[] = [
  { id: "BOD001", nombre: "Bodega Principal" },
  { id: "BOD002", nombre: "Bodega Secundaria" },
  { id: "BOD003", nombre: "Bodega Norte" },
  { id: "BOD004", nombre: "Bodega Sur" },
  { id: "BOD005", nombre: "Bodega Centro" },
  { id: "BOD006", nombre: "Bodega Este" },
];

// Datos mock de inventario por bodega
interface ProductoInventario {
  id: number;
  consecutivo: number;
  codigo: string;
  nombre: string;
  cantidad: number;
  costo: number;
}

// Simular inventario por bodega con más información
const inventarioPorBodega: Record<string, ProductoInventario[]> = {
  BOD001: [
    { id: 1, consecutivo: 1001, codigo: "PROD001", nombre: "Producto A", cantidad: 50, costo: 15000 },
    { id: 2, consecutivo: 1002, codigo: "PROD002", nombre: "Producto B", cantidad: 30, costo: 25000 },
    { id: 3, consecutivo: 1003, codigo: "PROD003", nombre: "Producto C", cantidad: 75, costo: 18000 },
    { id: 4, consecutivo: 1004, codigo: "PROD004", nombre: "Producto D", cantidad: 20, costo: 32000 },
    { id: 5, consecutivo: 1005, codigo: "PROD005", nombre: "Producto E", cantidad: 100, costo: 12000 },
    { id: 6, consecutivo: 1006, codigo: "PROD006", nombre: "Producto F", cantidad: 45, costo: 22000 },
  ],
  BOD002: [
    { id: 1, consecutivo: 2001, codigo: "PROD001", nombre: "Producto A", cantidad: 25, costo: 15000 },
    { id: 2, consecutivo: 2002, codigo: "PROD002", nombre: "Producto B", cantidad: 40, costo: 25000 },
    { id: 3, consecutivo: 2003, codigo: "PROD006", nombre: "Producto F", cantidad: 60, costo: 22000 },
    { id: 4, consecutivo: 2004, codigo: "PROD007", nombre: "Producto G", cantidad: 35, costo: 28000 },
    { id: 5, consecutivo: 2005, codigo: "PROD008", nombre: "Producto H", cantidad: 55, costo: 19000 },
  ],
  BOD003: [
    { id: 1, consecutivo: 3001, codigo: "PROD003", nombre: "Producto C", cantidad: 15, costo: 18000 },
    { id: 2, consecutivo: 3002, codigo: "PROD008", nombre: "Producto H", cantidad: 80, costo: 19000 },
    { id: 3, consecutivo: 3003, codigo: "PROD009", nombre: "Producto I", cantidad: 45, costo: 35000 },
    { id: 4, consecutivo: 3004, codigo: "PROD010", nombre: "Producto J", cantidad: 30, costo: 42000 },
  ],
  BOD004: [
    { id: 1, consecutivo: 4001, codigo: "PROD001", nombre: "Producto A", cantidad: 10, costo: 15000 },
    { id: 2, consecutivo: 4002, codigo: "PROD010", nombre: "Producto J", cantidad: 90, costo: 42000 },
    { id: 3, consecutivo: 4003, codigo: "PROD011", nombre: "Producto K", cantidad: 25, costo: 38000 },
  ],
  BOD005: [
    { id: 1, consecutivo: 5001, codigo: "PROD002", nombre: "Producto B", cantidad: 55, costo: 25000 },
    { id: 2, consecutivo: 5002, codigo: "PROD011", nombre: "Producto K", cantidad: 70, costo: 38000 },
    { id: 3, consecutivo: 5003, codigo: "PROD012", nombre: "Producto L", cantidad: 40, costo: 29000 },
  ],
  BOD006: [
    { id: 1, consecutivo: 6001, codigo: "PROD001", nombre: "Producto A", cantidad: 5, costo: 15000 },
    { id: 2, consecutivo: 6002, codigo: "PROD004", nombre: "Producto D", cantidad: 25, costo: 32000 },
    { id: 3, consecutivo: 6003, codigo: "PROD013", nombre: "Producto M", cantidad: 60, costo: 27000 },
  ],
};

const VerInventarioBodegas = () => {
  const [bodegaSeleccionada, setBodegaSeleccionada] = useState<string>("BOD001"); // Por defecto Bodega Principal
  const [busqueda, setBusqueda] = useState("");

  // Obtener productos de la bodega seleccionada
  const productosBodega = useMemo(() => {
    return bodegaSeleccionada ? (inventarioPorBodega[bodegaSeleccionada] || []) : [];
  }, [bodegaSeleccionada]);

  // Filtrar productos según búsqueda
  const productosFiltrados = useMemo(() => {
    if (!busqueda.trim()) return productosBodega;
    
    const query = busqueda.toLowerCase();
    return productosBodega.filter((producto) =>
      producto.id.toString().includes(query) ||
      producto.consecutivo.toString().includes(query) ||
      producto.codigo.toLowerCase().includes(query) ||
      producto.nombre.toLowerCase().includes(query) ||
      producto.cantidad.toString().includes(query) ||
      producto.costo.toString().includes(query)
    );
  }, [productosBodega, busqueda]);

  return (
    <PageContainer>
      <div className="flex items-center justify-between mb-6">
        <PageTitle title="Ver Inventario (Bodegas)" />
        <div className="w-64">
          <Label htmlFor="bodega-selector" className="sr-only">
            Seleccionar Bodega
          </Label>
          <Select value={bodegaSeleccionada} onValueChange={setBodegaSeleccionada}>
            <SelectTrigger id="bodega-selector">
              <SelectValue placeholder="Seleccione una bodega" />
            </SelectTrigger>
            <SelectContent>
              {bodegas.map((bodega) => (
                <SelectItem key={bodega.id} value={bodega.id}>
                  {bodega.nombre}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Barra de búsqueda - siempre visible */}
      <SearchBar
        placeholder="Buscar por ID, consecutivo, código, nombre, cantidad o costo..."
        value={busqueda}
        onChange={setBusqueda}
      />

      {/* Tabla de productos */}
      <TableCard
        headers={["ID", "Consecutivo", "Código", "Nombre", "Cantidad", "Costo"]}
        emptyMessage={
          productosFiltrados.length === 0
            ? productosBodega.length === 0
              ? "No hay productos en esta bodega"
              : "No se encontraron productos"
            : undefined
        }
        colSpan={6}
      >
        {productosFiltrados.map((producto) => (
          <TableRow key={producto.id}>
            <TableCell className="border-r border-border font-medium py-4 px-6">
              {producto.id}
            </TableCell>
            <TableCell className="border-r border-border py-4 px-6">
              {producto.consecutivo}
            </TableCell>
            <TableCell className="border-r border-border py-4 px-6">
              {producto.codigo}
            </TableCell>
            <TableCell className="border-r border-border py-4 px-6">
              {producto.nombre}
            </TableCell>
            <TableCell className="border-r border-border py-4 px-6">
              {producto.cantidad}
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

export default VerInventarioBodegas;

