import { useState, useEffect } from "react";
import {
  TableBody,
  TableCell,
  TableRow,
} from "@/components/ui/table";
import SearchBar from "@/components/SearchBar";
import PageContainer from "@/components/PageContainer";
import PageTitle from "@/components/PageTitle";
import TableCard from "@/components/TableCard";
import FiltersDialog from "@/components/FiltersDialog";
import Pagination from "@/components/Pagination";
import { useToast } from "@/hooks/use-toast";
import { useDebounce } from "@/hooks/use-debounce";
import { API_BASE_URL } from "@/config/api";

interface Producto {
  id_producto: number;
  codigo: string;
  nombre: string;
  grupo_nombre: string;
  familia_nombre: string;
  existencia: boolean;
  medida_nombre: string;
  cantidad_total: number;
  cantidad_minima: number;
  cantidad_maxima: number;
  estado_nombre: string;
  estado_color: string;
  id_estado: number;
}

interface Catalogos {
  familias: Array<{ id_familia_producto: number; nombre: string }>;
  grupos: Array<{ id_grupos_productos: number; nombre: string }>;
  estados: Array<{ id_estado: number; nombre: string }>;
}

interface Paginacion {
  paginaActual: number;
  totalPaginas: number;
  totalRegistros: number;
  limite: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

const ProductosArchivados = () => {
  const { toast } = useToast();
  const [productos, setProductos] = useState<Producto[]>([]);
  const [catalogos, setCatalogos] = useState<Catalogos | null>(null);
  const [loading, setLoading] = useState(true);
  const [busqueda, setBusqueda] = useState("");
  const [filtros, setFiltros] = useState<{
    id_familia?: string;
    id_grupos_producto?: string;
  }>({});
  const [pagina, setPagina] = useState(1);
  const [paginacion, setPaginacion] = useState<Paginacion | null>(null);

  // Debounce para la búsqueda
  const busquedaDebounced = useDebounce(busqueda, 500);

  // Cargar catálogos al montar
  useEffect(() => {
    const cargarCatalogos = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/productos/catalogos`);
        const data = await response.json();
        if (data.success) {
          setCatalogos(data.catalogos);
        }
      } catch (error) {
        toast({
          title: "Error",
          description: "No se pudieron cargar los catálogos",
          variant: "destructive",
        });
      }
    };

    cargarCatalogos();
  }, [toast]);

  // Cargar productos archivados (id_estado = 3)
  useEffect(() => {
    const cargarProductos = async () => {
      try {
        setLoading(true);
        const params = new URLSearchParams({
          pagina: pagina.toString(),
          limite: "20",
          id_estado: "3", // Solo productos archivados (Eliminado)
        });

        if (busquedaDebounced) {
          params.append("busqueda", busquedaDebounced);
        }

        if (filtros.id_familia) {
          params.append("id_familia", filtros.id_familia);
        }

        if (filtros.id_grupos_producto) {
          params.append("id_grupos_producto", filtros.id_grupos_producto);
        }

        const response = await fetch(
          `${API_BASE_URL}/api/productos?${params.toString()}`
        );
        const data = await response.json();

        if (data.success) {
          setProductos(data.productos);
          setPaginacion(data.paginacion);
        }
      } catch (error) {
        toast({
          title: "Error",
          description: "No se pudieron cargar los productos archivados",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    cargarProductos();
  }, [busquedaDebounced, filtros, pagina, toast]);

  // Resetear a página 1 cuando cambian los filtros o búsqueda
  useEffect(() => {
    setPagina(1);
  }, [busquedaDebounced, filtros]);

  const handleClearFilters = () => {
    setFiltros({});
  };

  const formatearNumero = (numero: number | null | undefined) => {
    if (numero === null || numero === undefined) return "N/A";
    return numero.toLocaleString("es-CO", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  return (
    <PageContainer>
      <PageTitle title="Productos Archivados" />

      {/* Barra de búsqueda y filtros */}
      <div className="flex gap-4 mb-4">
        <div className="flex-1">
          <SearchBar
            placeholder="Buscar productos archivados por código, nombre o código de barras..."
            value={busqueda}
            onChange={setBusqueda}
          />
        </div>
        {catalogos && (
          <FiltersDialog
            familias={catalogos.familias.map((f) => ({
              id: f.id_familia_producto,
              nombre: f.nombre,
            }))}
            grupos={catalogos.grupos.map((g) => ({
              id: g.id_grupos_productos,
              nombre: g.nombre,
            }))}
            estados={[]} // No mostrar estados ya que solo mostramos archivados
            filtros={filtros}
            onFilterChange={setFiltros}
            onClearFilters={handleClearFilters}
          />
        )}
      </div>

      {/* Tabla de productos */}
      <TableCard
        headers={[
          "Código",
          "Nombre",
          "Grupo",
          "Familia",
          "Existencia",
          "Medida",
          "Cantidad Total",
          "Cantidad Mínima",
          "Cantidad Máxima",
          "Estado",
        ]}
        emptyMessage={
          loading
            ? "Cargando productos archivados..."
            : productos.length === 0
            ? "No se encontraron productos archivados"
            : undefined
        }
        colSpan={10}
      >
        {productos.map((producto) => (
          <TableRow key={producto.id_producto}>
            <TableCell className="border-r border-border font-medium">
              {producto.codigo || "N/A"}
            </TableCell>
            <TableCell className="border-r border-border">
              {producto.nombre || "N/A"}
            </TableCell>
            <TableCell className="border-r border-border">
              {producto.grupo_nombre || "N/A"}
            </TableCell>
            <TableCell className="border-r border-border">
              {producto.familia_nombre || "N/A"}
            </TableCell>
            <TableCell className="border-r border-border text-center">
              {producto.existencia ? (
                <span className="text-green-600 font-semibold">Sí</span>
              ) : (
                <span className="text-red-600 font-semibold">No</span>
              )}
            </TableCell>
            <TableCell className="border-r border-border">
              {producto.medida_nombre || "N/A"}
            </TableCell>
            <TableCell className="border-r border-border text-right">
              {formatearNumero(producto.cantidad_total)}
            </TableCell>
            <TableCell className="border-r border-border text-right">
              {formatearNumero(producto.cantidad_minima)}
            </TableCell>
            <TableCell className="border-r border-border text-right">
              {formatearNumero(producto.cantidad_maxima)}
            </TableCell>
            <TableCell>
              <span
                className="px-2 py-1 rounded text-xs font-medium"
                style={{
                  backgroundColor: producto.estado_color
                    ? `${producto.estado_color}20`
                    : "#f3f4f6",
                  color: producto.estado_color || "#374151",
                }}
              >
                {producto.estado_nombre || "Sin estado"}
              </span>
            </TableCell>
          </TableRow>
        ))}
      </TableCard>

      {/* Paginación */}
      {paginacion && paginacion.totalPaginas > 1 && (
        <div className="mt-4">
          <div className="text-sm text-muted-foreground text-center mb-2">
            Mostrando {productos.length} de {paginacion.totalRegistros} productos archivados
          </div>
          <Pagination
            paginaActual={paginacion.paginaActual}
            totalPaginas={paginacion.totalPaginas}
            onPageChange={setPagina}
          />
        </div>
      )}
    </PageContainer>
  );
};

export default ProductosArchivados;

