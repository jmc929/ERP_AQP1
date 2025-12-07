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

// Datos mock de productos con atributos
interface Producto {
  id: number;
  producto: string;
  codigoBarras: string;
  stock: number;
  stockMinimo: number;
  stockMaximo: number;
}

const productosIniciales: Producto[] = [
  { id: 1, producto: "Producto A", codigoBarras: "1234567890123", stock: 100, stockMinimo: 20, stockMaximo: 500 },
  { id: 2, producto: "Producto B", codigoBarras: "2345678901234", stock: 50, stockMinimo: 10, stockMaximo: 200 },
  { id: 3, producto: "Producto C", codigoBarras: "3456789012345", stock: 200, stockMinimo: 50, stockMaximo: 1000 },
  { id: 4, producto: "Producto D", codigoBarras: "4567890123456", stock: 75, stockMinimo: 15, stockMaximo: 300 },
  { id: 5, producto: "Producto E", codigoBarras: "5678901234567", stock: 150, stockMinimo: 30, stockMaximo: 600 },
  { id: 6, producto: "Producto F", codigoBarras: "6789012345678", stock: 80, stockMinimo: 25, stockMaximo: 400 },
  { id: 7, producto: "Producto G", codigoBarras: "7890123456789", stock: 120, stockMinimo: 40, stockMaximo: 500 },
  { id: 8, producto: "Producto H", codigoBarras: "8901234567890", stock: 90, stockMinimo: 20, stockMaximo: 350 },
];

const Atributos = () => {
  const [busqueda, setBusqueda] = useState("");

  // Filtrar productos según búsqueda (busca en producto y código de barras)
  const productosFiltrados = productosIniciales.filter((producto) =>
    producto.producto.toLowerCase().includes(busqueda.toLowerCase()) ||
    producto.codigoBarras.includes(busqueda)
  );

  return (
    <PageContainer>
      <PageTitle title="Atributos" />

      {/* Barra de búsqueda */}
      <SearchBar
        placeholder="Buscar por producto o código de barras..."
        value={busqueda}
        onChange={setBusqueda}
      />

      {/* Tabla */}
      <TableCard
        headers={["Producto", "Código de Barras", "Stock", "Stock Mínimo", "Stock Máximo"]}
        emptyMessage={productosFiltrados.length === 0 ? "No se encontraron productos" : undefined}
        colSpan={5}
      >
        {productosFiltrados.map((producto) => (
          <TableRow key={producto.id}>
            <TableCell className="font-medium py-4 px-6 border-r border-border">{producto.producto}</TableCell>
            <TableCell className="py-4 px-6 border-r border-border">{producto.codigoBarras}</TableCell>
            <TableCell className="py-4 px-6 border-r border-border">{producto.stock}</TableCell>
            <TableCell className="py-4 px-6 border-r border-border">{producto.stockMinimo}</TableCell>
            <TableCell className="py-4 px-6">{producto.stockMaximo}</TableCell>
          </TableRow>
        ))}
      </TableCard>
    </PageContainer>
  );
};

export default Atributos;

