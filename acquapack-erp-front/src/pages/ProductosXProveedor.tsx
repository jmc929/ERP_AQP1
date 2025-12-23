import { useState, useEffect, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Filter, Loader2 } from "lucide-react";
import SearchBar from "@/components/SearchBar";
import PageContainer from "@/components/PageContainer";
import PageTitle from "@/components/PageTitle";
import TableCard from "@/components/TableCard";
import { useToast } from "@/hooks/use-toast";

// Interfaces
interface ProductoXProveedor {
  id_producto_x_proveedor: number;
  id_producto: number;
  id_proveedor: number;
  costo: number;
  producto_codigo: string;
  producto_nombre: string;
  razon_social: string;
  nombre_comercial: string | null;
}

interface Proveedor {
  id_proveedor: number;
  razon_social: string;
  nombre_comercial?: string;
}

const ProductosXProveedor = () => {
  const { toast } = useToast();
  const [productosXProveedor, setProductosXProveedor] = useState<ProductoXProveedor[]>([]);
  const [proveedores, setProveedores] = useState<Proveedor[]>([]);
  const [busqueda, setBusqueda] = useState("");
  const [filtroProveedor, setFiltroProveedor] = useState("");
  const [loading, setLoading] = useState(true);

  // Cargar datos al montar el componente
  useEffect(() => {
    cargarDatos();
  }, []);

  // Cargar datos cuando cambia el filtro de proveedor
  useEffect(() => {
    cargarProductosXProveedor();
  }, [filtroProveedor]);

  const cargarDatos = async () => {
    try {
      setLoading(true);
      const [productosRes, proveedoresRes] = await Promise.all([
        fetch("http://localhost:4000/api/compras/productos-x-proveedor"),
        fetch("http://localhost:4000/api/compras/proveedores")
      ]);

      const productosData = await productosRes.json();
      const proveedoresData = await proveedoresRes.json();

      if (productosData.success) {
        setProductosXProveedor(productosData.productosXProveedor || []);
      } else {
        toast({
          title: "Error",
          description: productosData.message || "No se pudieron cargar los productos x proveedor",
          variant: "destructive",
        });
      }

      if (proveedoresData.success) {
        setProveedores(proveedoresData.proveedores || []);
      }
    } catch (error) {
      console.error("Error al cargar datos:", error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Error al cargar los datos. Verifique que el servidor esté corriendo.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const cargarProductosXProveedor = async () => {
    try {
      setLoading(true);
      const url = filtroProveedor 
        ? `http://localhost:4000/api/compras/productos-x-proveedor?id_proveedor=${filtroProveedor}`
        : "http://localhost:4000/api/compras/productos-x-proveedor";
      
      const response = await fetch(url);
      const data = await response.json();

      if (data.success) {
        setProductosXProveedor(data.productosXProveedor || []);
      } else {
        toast({
          title: "Error",
          description: data.message || "No se pudieron cargar los productos x proveedor",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error al cargar productos x proveedor:", error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Error al cargar los datos.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  // Filtrar productos según búsqueda
  const productosFiltrados = useMemo(() => {
    if (!busqueda.trim()) return productosXProveedor;
    
    const query = busqueda.toLowerCase();
    return productosXProveedor.filter((item) =>
      item.producto_codigo.toLowerCase().includes(query) ||
      item.producto_nombre.toLowerCase().includes(query) ||
      (item.razon_social || item.nombre_comercial || "").toLowerCase().includes(query) ||
      item.costo.toString().includes(query)
    );
  }, [productosXProveedor, busqueda]);

  const limpiarFiltros = () => {
    setFiltroProveedor("");
  };

  const tieneFiltrosActivos = filtroProveedor;

  return (
    <PageContainer>
      <PageTitle title="Productos x Proveedor" />

      {/* Barra de búsqueda y filtros */}
      <div className="flex gap-4 mb-4">
        <div className="flex-1">
          <SearchBar
            placeholder="Buscar por código, nombre de producto o proveedor..."
            value={busqueda}
            onChange={setBusqueda}
          />
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" className="flex items-center gap-2">
              <Filter className="h-4 w-4" />
              Filtros
              {tieneFiltrosActivos && (
                <span className="ml-1 px-2 py-0.5 text-xs bg-primary text-primary-foreground rounded-full">
                  1
                </span>
              )}
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Filtros</DialogTitle>
              <DialogDescription>
                Selecciona los filtros para buscar productos x proveedor
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="proveedor">Proveedor</Label>
                <Select 
                  value={filtroProveedor || "all"} 
                  onValueChange={(value) => setFiltroProveedor(value === "all" ? "" : value)}
                >
                  <SelectTrigger id="proveedor">
                    <SelectValue placeholder="Todos los proveedores" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos los proveedores</SelectItem>
                    {proveedores.map((prov) => (
                      <SelectItem key={prov.id_proveedor} value={prov.id_proveedor.toString()}>
                        {prov.razon_social || prov.nombre_comercial}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {tieneFiltrosActivos && (
                <Button
                  variant="outline"
                  onClick={limpiarFiltros}
                  className="w-full"
                >
                  Limpiar Filtros
                </Button>
              )}
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Contador de resultados */}
      {!loading && (
        <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
          <span>
            Mostrando {productosFiltrados.length} de {productosXProveedor.length} registro{productosXProveedor.length !== 1 ? "s" : ""}
            {tieneFiltrosActivos && " (filtrados)"}
          </span>
        </div>
      )}

      {/* Tabla */}
      <TableCard
        headers={["ID", "Producto", "Proveedor", "Costo"]}
        emptyMessage={
          loading 
            ? "Cargando productos x proveedor..." 
            : productosFiltrados.length === 0 
              ? tieneFiltrosActivos 
                ? "No se encontraron registros con los filtros aplicados" 
                : "No se encontraron registros"
              : undefined
        }
        colSpan={4}
      >
        {loading ? (
          <TableRow>
            <TableCell colSpan={4} className="text-center py-8">
              <Loader2 className="h-6 w-6 animate-spin mx-auto" />
            </TableCell>
          </TableRow>
        ) : (
          productosFiltrados.map((item) => (
            <TableRow key={item.id_producto_x_proveedor}>
              <TableCell className="border-r border-border font-medium">
                {item.id_producto_x_proveedor}
              </TableCell>
              <TableCell className="border-r border-border">
                <div className="flex flex-col">
                  <span className="font-medium">{item.producto_nombre}</span>
                  <span className="text-xs text-muted-foreground">{item.producto_codigo}</span>
                </div>
              </TableCell>
              <TableCell className="border-r border-border">
                {item.razon_social || item.nombre_comercial || "N/A"}
              </TableCell>
              <TableCell className="font-semibold">
                ${item.costo.toLocaleString("es-CO", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </TableCell>
            </TableRow>
          ))
        )}
      </TableCard>
    </PageContainer>
  );
};

export default ProductosXProveedor;

