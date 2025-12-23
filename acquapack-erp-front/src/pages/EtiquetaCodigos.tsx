import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
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
import { FileDown } from "lucide-react";

interface Producto {
  id_producto: number;
  codigo: string;
  nombre: string;
  codigo_barras: string;
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

const EtiquetaCodigos = () => {
  const { toast } = useToast();
  const [productos, setProductos] = useState<Producto[]>([]);
  const [catalogos, setCatalogos] = useState<Catalogos | null>(null);
  const [loading, setLoading] = useState(true);
  const [busqueda, setBusqueda] = useState("");
  const [filtros, setFiltros] = useState<{
    id_familia?: string;
    id_grupos_producto?: string;
    id_estado?: string;
  }>({});
  const [pagina, setPagina] = useState(1);
  const [paginacion, setPaginacion] = useState<Paginacion | null>(null);
  const [productosSeleccionados, setProductosSeleccionados] = useState<Set<number>>(new Set());
  const [generandoPDF, setGenerandoPDF] = useState(false);

  // Debounce para la búsqueda
  const busquedaDebounced = useDebounce(busqueda, 500);

  // Cargar catálogos al montar
  useEffect(() => {
    const cargarCatalogos = async () => {
      try {
        const response = await fetch("http://localhost:4000/api/productos/catalogos");
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

  // Cargar productos cuando cambian los filtros, búsqueda o página
  useEffect(() => {
    const cargarProductos = async () => {
      try {
        setLoading(true);
        const params = new URLSearchParams({
          pagina: pagina.toString(),
          limite: "20",
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

        if (filtros.id_estado) {
          params.append("id_estado", filtros.id_estado);
        }

        const response = await fetch(
          `http://localhost:4000/api/productos?${params.toString()}`
        );
        const data = await response.json();

        if (data.success) {
          setProductos(data.productos);
          setPaginacion(data.paginacion);
        }
      } catch (error) {
        toast({
          title: "Error",
          description: "No se pudieron cargar los productos",
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

  // Limpiar selección cuando cambian los productos
  useEffect(() => {
    setProductosSeleccionados(new Set());
  }, [productos]);

  const handleClearFilters = () => {
    setFiltros({});
  };

  const handleToggleProducto = (id: number, checked: boolean) => {
    setProductosSeleccionados((prev) => {
      const nuevo = new Set(prev);
      if (checked) {
        nuevo.add(id);
      } else {
        nuevo.delete(id);
      }
      return nuevo;
    });
  };

  const handleToggleTodos = (checked: boolean) => {
    if (checked) {
      const todosIds = new Set(productos.map((p) => p.id_producto));
      setProductosSeleccionados(todosIds);
    } else {
      setProductosSeleccionados(new Set());
    }
  };

  const todosSeleccionados = productos.length > 0 && productos.every((p) => productosSeleccionados.has(p.id_producto));
  const algunosSeleccionados = productos.some((p) => productosSeleccionados.has(p.id_producto)) && !todosSeleccionados;

  const generarPDF = async () => {
    if (productosSeleccionados.size === 0) {
      toast({
        title: "Error",
        description: "Debe seleccionar al menos un producto",
        variant: "destructive",
      });
      return;
    }

    try {
      setGenerandoPDF(true);

      // Obtener los IDs de los productos seleccionados
      const idsProductos = Array.from(productosSeleccionados);

      // Llamar al backend para generar el PDF
      const response = await fetch(
        "http://localhost:4000/api/configuracion-productos/generar-pdf-codigos-barras",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ ids_productos: idsProductos }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || "Error al generar el PDF");
      }

      // Obtener el PDF como blob
      const blob = await response.blob();

      // Crear un enlace temporal para descargar el PDF
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `codigos_barras_${new Date().getTime()}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

      toast({
        title: "Éxito",
        description: `PDF generado con ${idsProductos.length} código(s) de barras`,
      });
    } catch (error) {
      console.error("Error al generar PDF:", error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "No se pudo generar el PDF",
        variant: "destructive",
      });
    } finally {
      setGenerandoPDF(false);
    }
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
      <PageTitle title="Etiqueta y Códigos" />

      {/* Barra de búsqueda y filtros */}
      <div className="flex gap-4 mb-4">
        <div className="flex-1">
          <SearchBar
            placeholder="Buscar por código, nombre o código de barras..."
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
            estados={catalogos.estados.map((e) => ({
              id: e.id_estado,
              nombre: e.nombre,
            }))}
            filtros={filtros}
            onFilterChange={setFiltros}
            onClearFilters={handleClearFilters}
          />
        )}
      </div>

      {/* Botón generar PDF (solo si hay seleccionados) */}
      {productosSeleccionados.size > 0 && (
        <div className="mb-4">
          <Button
            onClick={generarPDF}
            disabled={generandoPDF}
            className="flex items-center gap-2"
          >
            <FileDown className="h-4 w-4" />
            {generandoPDF ? "Generando PDF..." : `Generar PDF (${productosSeleccionados.size} seleccionado${productosSeleccionados.size > 1 ? "s" : ""})`}
          </Button>
        </div>
      )}

      {/* Tabla de productos */}
      <TableCard
        headers={[
          "Seleccionar",
          "Código",
          "Nombre",
          "Código de Barras",
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
            ? "Cargando productos..."
            : productos.length === 0
            ? "No se encontraron productos"
            : undefined
        }
        colSpan={12}
      >
        <TableRow>
          <TableCell>
            <Checkbox
              checked={todosSeleccionados}
              onCheckedChange={handleToggleTodos}
            />
          </TableCell>
          <TableCell colSpan={11} className="font-medium">
            Seleccionar todos
          </TableCell>
        </TableRow>
        {productos.map((producto) => (
          <TableRow key={producto.id_producto}>
            <TableCell>
              <Checkbox
                checked={productosSeleccionados.has(producto.id_producto)}
                onCheckedChange={(checked) =>
                  handleToggleProducto(producto.id_producto, checked as boolean)
                }
              />
            </TableCell>
            <TableCell className="border-r border-border font-medium">
              {producto.codigo || "N/A"}
            </TableCell>
            <TableCell className="border-r border-border">
              {producto.nombre || "N/A"}
            </TableCell>
            <TableCell className="border-r border-border font-mono text-sm">
              {producto.codigo_barras || "N/A"}
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
            Mostrando {productos.length} de {paginacion.totalRegistros} productos
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

export default EtiquetaCodigos;
