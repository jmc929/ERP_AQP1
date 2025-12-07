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
import EmptyTableMessage from "@/components/EmptyTableMessage";

// Datos mock de productos con categoría y familia
interface Producto {
  id: number;
  producto: string;
  categoria: string;
  familia: string;
  stock: number;
}

const productosIniciales: Producto[] = [
  { id: 1, producto: "Producto A", categoria: "Electrónica", familia: "Dispositivos", stock: 100 },
  { id: 2, producto: "Producto B", categoria: "Hogar", familia: "Muebles", stock: 50 },
  { id: 3, producto: "Producto C", categoria: "Electrónica", familia: "Accesorios", stock: 200 },
  { id: 4, producto: "Producto D", categoria: "Deportes", familia: "Fitness", stock: 75 },
  { id: 5, producto: "Producto E", categoria: "Hogar", familia: "Decoración", stock: 150 },
  { id: 6, producto: "Producto F", categoria: "Electrónica", familia: "Dispositivos", stock: 80 },
  { id: 7, producto: "Producto G", categoria: "Deportes", familia: "Outdoor", stock: 120 },
  { id: 8, producto: "Producto H", categoria: "Hogar", familia: "Muebles", stock: 90 },
];

const CategoriasFamilia = () => {
  const [busqueda, setBusqueda] = useState("");

  // Filtrar productos según búsqueda (busca en producto, categoría y familia)
  const productosFiltrados = productosIniciales.filter((producto) =>
    producto.producto.toLowerCase().includes(busqueda.toLowerCase()) ||
    producto.categoria.toLowerCase().includes(busqueda.toLowerCase()) ||
    producto.familia.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <PageContainer>
      <PageTitle title="Categorías y Familia" />

      {/* Barra de búsqueda */}
      <SearchBar
        placeholder="Buscar por producto, categoría o familia..."
        value={busqueda}
        onChange={setBusqueda}
      />

      {/* Tabla */}
      <TableCard
        headers={["Producto", "Categoría", "Familia", "Stock"]}
        emptyMessage={productosFiltrados.length === 0 ? "No se encontraron productos" : undefined}
        colSpan={4}
      >
        {productosFiltrados.map((producto) => (
          <TableRow key={producto.id}>
            <TableCell className="font-medium py-4 px-6 border-r border-border">{producto.producto}</TableCell>
            <TableCell className="py-4 px-6 border-r border-border">{producto.categoria}</TableCell>
            <TableCell className="py-4 px-6 border-r border-border">{producto.familia}</TableCell>
            <TableCell className="py-4 px-6">{producto.stock}</TableCell>
          </TableRow>
        ))}
      </TableCard>
    </PageContainer>
  );
};

export default CategoriasFamilia;

