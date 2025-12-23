import { useState, useMemo, useEffect } from "react";
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
import { Loader2 } from "lucide-react";
import SearchBar from "@/components/SearchBar";
import PageContainer from "@/components/PageContainer";
import PageTitle from "@/components/PageTitle";
import TableCard from "@/components/TableCard";
import { useToast } from "@/hooks/use-toast";

// Interface para bodegas desde la BD
interface Bodega {
  id_bodega: number;
  nombre: string;
  id_estado: number;
}

// Interface para productos de inventario
interface ProductoInventario {
  id_inventario: number;
  id_producto: number;
  id_bodega: number;
  cantidad_lote: number;
  costo_producto: number;
  fecha_ingreso: string;
  id_factura: number;
  producto_codigo: string;
  producto_nombre: string;
  precio_unitario: number;
  costo_unitario_con_impuesto: number;
  iva_valor: number;
  id_iva: number | null;
  iva_nombre: string | null;
  iva_porcentaje: number | null;
}

const VerInventarioBodegas = () => {
  const { toast } = useToast();
  const [bodegas, setBodegas] = useState<Bodega[]>([]);
  const [bodegaSeleccionada, setBodegaSeleccionada] = useState<string>("");
  const [productosBodega, setProductosBodega] = useState<ProductoInventario[]>([]);
  const [busqueda, setBusqueda] = useState("");
  const [loading, setLoading] = useState(true);
  const [loadingProductos, setLoadingProductos] = useState(false);

  // Cargar bodegas al montar el componente
  useEffect(() => {
    const cargarBodegas = async () => {
      try {
        setLoading(true);
        const response = await fetch("http://localhost:4000/api/compras/bodegas");
        
        if (!response.ok) {
          throw new Error(`Error ${response.status}: ${response.statusText}`);
        }
        
        const data = await response.json();

        if (data.success) {
          setBodegas(data.bodegas || []);
          // Seleccionar la primera bodega por defecto si hay bodegas
          if (data.bodegas && data.bodegas.length > 0) {
            setBodegaSeleccionada(data.bodegas[0].id_bodega.toString());
          }
        } else {
          toast({
            title: "Error",
            description: data.message || "No se pudieron cargar las bodegas",
            variant: "destructive",
          });
        }
      } catch (error) {
        console.error("Error al cargar bodegas:", error);
        toast({
          title: "Error",
          description: error instanceof Error ? error.message : "Error al cargar las bodegas. Verifique que el servidor esté corriendo.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    cargarBodegas();
  }, [toast]);

  // Cargar productos cuando se selecciona una bodega
  useEffect(() => {
    const cargarProductos = async () => {
      if (!bodegaSeleccionada) {
        setProductosBodega([]);
        return;
      }

      try {
        setLoadingProductos(true);
        const response = await fetch(`http://localhost:4000/api/bodegas/${bodegaSeleccionada}/productos`);
        
        if (!response.ok) {
          throw new Error(`Error ${response.status}: ${response.statusText}`);
        }
        
        const data = await response.json();

        if (data.success) {
          setProductosBodega(data.productos || []);
        } else {
          toast({
            title: "Error",
            description: data.message || "No se pudieron cargar los productos",
            variant: "destructive",
          });
          setProductosBodega([]);
        }
      } catch (error) {
        console.error("Error al cargar productos:", error);
        toast({
          title: "Error",
          description: error instanceof Error ? error.message : "Error al cargar los productos.",
          variant: "destructive",
        });
        setProductosBodega([]);
      } finally {
        setLoadingProductos(false);
      }
    };

    cargarProductos();
  }, [bodegaSeleccionada, toast]);

  // Filtrar productos según búsqueda
  const productosFiltrados = useMemo(() => {
    if (!busqueda.trim()) return productosBodega;
    
    const query = busqueda.toLowerCase();
    return productosBodega.filter((producto) =>
      producto.id_inventario.toString().includes(query) ||
      producto.id_producto.toString().includes(query) ||
      producto.producto_codigo.toLowerCase().includes(query) ||
      producto.producto_nombre.toLowerCase().includes(query) ||
      producto.cantidad_lote.toString().includes(query) ||
      producto.precio_unitario.toString().includes(query) ||
      producto.costo_unitario_con_impuesto.toString().includes(query)
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
          <Select 
            value={bodegaSeleccionada} 
            onValueChange={setBodegaSeleccionada}
            disabled={loading || bodegas.length === 0}
          >
            <SelectTrigger id="bodega-selector">
              <SelectValue placeholder={loading ? "Cargando..." : bodegas.length === 0 ? "No hay bodegas" : "Seleccione una bodega"} />
            </SelectTrigger>
            <SelectContent>
              {bodegas.map((bodega) => (
                <SelectItem key={bodega.id_bodega} value={bodega.id_bodega.toString()}>
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
        headers={["ID Inventario", "Código", "Nombre", "Cantidad", "Precio Unitario", "Costo Unitario con Impuesto", "IVA Valor"]}
        emptyMessage={
          loadingProductos
            ? "Cargando productos..."
            : productosFiltrados.length === 0
              ? productosBodega.length === 0
                ? "No hay productos en esta bodega"
                : "No se encontraron productos"
              : undefined
        }
        colSpan={7}
      >
        {loadingProductos ? (
          <TableRow>
            <TableCell colSpan={7} className="text-center py-8">
              <Loader2 className="h-6 w-6 animate-spin mx-auto" />
            </TableCell>
          </TableRow>
        ) : (
          productosFiltrados.map((producto) => (
            <TableRow key={producto.id_inventario}>
              <TableCell className="border-r border-border font-medium py-4 px-6">
                {producto.id_inventario}
              </TableCell>
              <TableCell className="border-r border-border py-4 px-6">
                {producto.producto_codigo}
              </TableCell>
              <TableCell className="border-r border-border py-4 px-6">
                {producto.producto_nombre}
              </TableCell>
              <TableCell className="border-r border-border py-4 px-6">
                {producto.cantidad_lote}
              </TableCell>
              <TableCell className="border-r border-border py-4 px-6">
                ${producto.precio_unitario.toLocaleString("es-CO", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </TableCell>
              <TableCell className="border-r border-border py-4 px-6 font-semibold">
                ${producto.costo_unitario_con_impuesto.toLocaleString("es-CO", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </TableCell>
              <TableCell className="py-4 px-6">
                ${producto.iva_valor.toLocaleString("es-CO", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </TableCell>
            </TableRow>
          ))
        )}
      </TableCard>
    </PageContainer>
  );
};

export default VerInventarioBodegas;

