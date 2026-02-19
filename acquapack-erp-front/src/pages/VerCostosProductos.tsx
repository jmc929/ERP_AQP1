import { useState, useEffect, useMemo } from "react";
import {
  TableCell,
  TableRow,
} from "@/components/ui/table";
import { Loader2 } from "lucide-react";
import SearchBar from "@/components/SearchBar";
import PageContainer from "@/components/PageContainer";
import PageTitle from "@/components/PageTitle";
import TableCard from "@/components/TableCard";
import Pagination from "@/components/Pagination";
import { useToast } from "@/hooks/use-toast";
import { API_BASE_URL } from "@/config/api";

interface CostoProducto {
  id_producto: number;
  codigo: string;
  producto: string;
  stock_total: number;
  costo_promedio_unitario: number;
  ultimo_costo_compra: number;
  valor_total_inventario: number;
}

const VerCostosProductos = () => {
  const { toast } = useToast();
  const [busqueda, setBusqueda] = useState("");
  const [costos, setCostos] = useState<CostoProducto[]>([]);
  const [loading, setLoading] = useState(true);
  const [pagina, setPagina] = useState(1);
  const productosPorPagina = 40;

  useEffect(() => {
    cargarCostos();
  }, []);

  const cargarCostos = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/api/productos/costos");
      
      if (!response.ok) {
        throw new Error("Error al cargar los costos");
      }

      const data = await response.json();
      
      if (data.success) {
        setCostos(data.costos || []);
      } else {
        throw new Error(data.message || "Error al cargar los costos");
      }
    } catch (error) {
      console.error("Error al cargar costos:", error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "No se pudieron cargar los costos",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  // Filtrar costos por búsqueda
  const costosFiltrados = useMemo(() => {
    if (!busqueda.trim()) {
      return costos;
    }

    const busquedaLower = busqueda.toLowerCase();
    return costos.filter(
      (costo) =>
        costo.codigo?.toLowerCase().includes(busquedaLower) ||
        costo.producto?.toLowerCase().includes(busquedaLower)
    );
  }, [costos, busqueda]);

  // Calcular paginación
  const totalPaginas = Math.ceil(costosFiltrados.length / productosPorPagina);
  const inicio = (pagina - 1) * productosPorPagina;
  const fin = inicio + productosPorPagina;
  const costosPaginados = costosFiltrados.slice(inicio, fin);

  // Resetear a página 1 cuando cambia la búsqueda
  useEffect(() => {
    setPagina(1);
  }, [busqueda]);

  // Formatear números con separadores de miles y decimales
  const formatearNumero = (valor: number, decimales: number = 2): string => {
    return new Intl.NumberFormat("es-CO", {
      minimumFractionDigits: decimales,
      maximumFractionDigits: decimales,
    }).format(valor);
  };

  // Calcular totales (de todos los productos filtrados, no solo de la página actual)
  const totales = useMemo(() => {
    return {
      stockTotal: costosFiltrados.reduce((sum, c) => sum + c.stock_total, 0),
      valorTotalInventario: costosFiltrados.reduce(
        (sum, c) => sum + c.valor_total_inventario,
        0
      ),
    };
  }, [costosFiltrados]);

  return (
    <PageContainer>
      <PageTitle>Ver Costos por Productos</PageTitle>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <SearchBar
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            placeholder="Buscar por código o nombre de producto..."
            className="max-w-md"
          />
          <div className="text-sm text-muted-foreground">
            Mostrando {costosPaginados.length > 0 ? inicio + 1 : 0}-{Math.min(fin, costosFiltrados.length)} de {costosFiltrados.length} productos
            {costos.length !== costosFiltrados.length && ` (${costos.length} total)`}
          </div>
        </div>

        <TableCard
          headers={[
            "Código",
            "Producto",
            "Stock Total",
            "Costo Promedio (Unitario)",
            "Último Costo Compra",
            "Valor Total Inventario",
          ]}
          emptyMessage={
            loading
              ? undefined
              : costosFiltrados.length === 0
              ? busqueda
                ? "No se encontraron productos que coincidan con la búsqueda"
                : "No hay productos con costos registrados"
              : undefined
          }
          colSpan={6}
        >
          {loading ? (
            <TableRow>
              <TableCell colSpan={6} className="text-center py-12">
                <Loader2 className="h-8 w-8 animate-spin mx-auto text-muted-foreground" />
              </TableCell>
            </TableRow>
          ) : (
            <>
              {costosPaginados.map((costo) => (
                <TableRow key={costo.id_producto}>
                  <TableCell className="font-medium">{costo.codigo || "-"}</TableCell>
                  <TableCell>{costo.producto}</TableCell>
                  <TableCell className="text-right">
                    {formatearNumero(costo.stock_total, 2)}
                  </TableCell>
                  <TableCell className="text-right">
                    ${formatearNumero(costo.costo_promedio_unitario, 2)}
                  </TableCell>
                  <TableCell className="text-right">
                    ${formatearNumero(costo.ultimo_costo_compra, 2)}
                  </TableCell>
                  <TableCell className="text-right font-semibold">
                    ${formatearNumero(costo.valor_total_inventario, 2)}
                  </TableCell>
                </TableRow>
              ))}
            </>
          )}
        </TableCard>

        {/* Totales - Fuera de TableCard */}
        {!loading && costosFiltrados.length > 0 && (
          <div className="border-t bg-muted/50 px-6 py-4 rounded-b-lg border border-t-0">
            <div className="flex justify-end gap-8">
              <div className="text-right">
                <div className="text-sm text-muted-foreground">Stock Total General</div>
                <div className="text-lg font-semibold">
                  {formatearNumero(totales.stockTotal, 2)}
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm text-muted-foreground">Valor Total Inventario</div>
                <div className="text-lg font-semibold text-primary">
                  ${formatearNumero(totales.valorTotalInventario, 2)}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Paginación */}
        {!loading && costosFiltrados.length > 0 && totalPaginas > 1 && (
          <div className="mt-4">
            <Pagination
              paginaActual={pagina}
              totalPaginas={totalPaginas}
              onPageChange={setPagina}
            />
          </div>
        )}
      </div>
    </PageContainer>
  );
};

export default VerCostosProductos;
