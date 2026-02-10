import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Eye, Loader2, Filter } from "lucide-react";
import SearchBar from "@/components/SearchBar";
import PageContainer from "@/components/PageContainer";
import PageTitle from "@/components/PageTitle";
import TableCard from "@/components/TableCard";
import { useToast } from "@/hooks/use-toast";

// Interfaces para las facturas reales
interface DetalleFactura {
  id_detalle_factura: number;
  cantidad: number;
  precio_unitario: number;
  descuento: number;
  porcentaje_descuento: number;
  subtotal: number;
  iva_valor: number;
  retefuente_valor: number;
  valor_total: number;
  id_producto: number;
  producto_codigo: string;
  producto_nombre: string;
  id_bodega: number | null;
  bodega_nombre: string;
  id_iva: number | null;
  iva_nombre: string | null;
  iva_porcentaje: number | null;
  id_retefuente: number | null;
  retencion_nombre: string | null;
  retencion_porcentaje: number | null;
}

interface Factura {
  id_facturas: number;
  fecha_creacion: string;
  numero_factura_proveedor: string;
  total_subtotal: number;
  total_descuento: number;
  total_iva: number;
  total_retencion: number;
  total_factura: number;
  observaciones?: string | null;
  id_estado: number;
  estado_nombre: string;
  id_proveedor: number;
  razon_social: string;
  nombre_comercial: string;
  id_usuarios: number;
  usuario_nombre: string;
  usuario_apellido: string;
}

interface FacturaCompleta extends Factura {
  detalles: DetalleFactura[];
}

interface Proveedor {
  id_proveedor: number;
  razon_social: string;
  nombre_comercial?: string;
}

interface Estado {
  id_estado: number;
  nombre: string;
}

const VerFactura = () => {
  const { toast } = useToast();
  const [busqueda, setBusqueda] = useState("");
  const [facturas, setFacturas] = useState<Factura[]>([]);
  const [facturaCompleta, setFacturaCompleta] = useState<FacturaCompleta | null>(null);
  const [mostrarDialogo, setMostrarDialogo] = useState(false);
  const [loading, setLoading] = useState(true);
  const [loadingDetalle, setLoadingDetalle] = useState(false);
  
  // Estados para filtros
  const [filtroFechaDesde, setFiltroFechaDesde] = useState("");
  const [filtroFechaHasta, setFiltroFechaHasta] = useState("");
  const [filtroProveedor, setFiltroProveedor] = useState("");
  const [filtroEstado, setFiltroEstado] = useState("");
  
  // Datos para filtros
  const [proveedores, setProveedores] = useState<Proveedor[]>([]);
  const [estados, setEstados] = useState<Estado[]>([]);

  // Cargar facturas y datos para filtros al montar el componente
  useEffect(() => {
    cargarFacturas();
    cargarDatosFiltros();
  }, []);

  const cargarDatosFiltros = async () => {
    try {
      // Cargar proveedores
      const proveedoresRes = await fetch("http://localhost:4000/api/compras/proveedores");
      const proveedoresData = await proveedoresRes.json();
      if (proveedoresData.success) {
        setProveedores(proveedoresData.proveedores || []);
      }

      // Cargar estados únicos de las facturas
      const facturasRes = await fetch("http://localhost:4000/api/compras/facturas");
      const facturasData = await facturasRes.json();
      if (facturasData.success && facturasData.facturas) {
        // Obtener estados únicos
        const estadosUnicos = Array.from(
          new Map(
            facturasData.facturas
              .filter((f: Factura) => f.estado_nombre)
              .map((f: Factura) => [f.id_estado, { id_estado: f.id_estado, nombre: f.estado_nombre }])
          ).values()
        );
        setEstados(estadosUnicos);
      }
    } catch (error) {
      console.error("Error al cargar datos para filtros:", error);
    }
  };

  const cargarFacturas = async () => {
    try {
      setLoading(true);
      const response = await fetch("http://localhost:4000/api/compras/facturas");
      
      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }
      
      const data = await response.json();

      if (data.success) {
        setFacturas(data.facturas || []);
      } else {
        toast({
          title: "Error",
          description: data.message || "No se pudieron cargar las facturas",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error al cargar facturas:", error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Error al cargar las facturas. Verifique que el servidor esté corriendo.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  // Filtrar facturas según búsqueda y filtros
  const facturasFiltradas = facturas.filter((factura) => {
    // Filtro de búsqueda general
    const coincideBusqueda = 
      factura.id_facturas.toString().includes(busqueda) ||
      factura.fecha_creacion.includes(busqueda) ||
      (factura.razon_social || factura.nombre_comercial || "").toLowerCase().includes(busqueda.toLowerCase()) ||
      (factura.numero_factura_proveedor || "").toLowerCase().includes(busqueda.toLowerCase());

    if (!coincideBusqueda) return false;

    // Filtro de fecha desde
    if (filtroFechaDesde) {
      const fechaFactura = new Date(factura.fecha_creacion);
      const fechaDesde = new Date(filtroFechaDesde);
      if (fechaFactura < fechaDesde) return false;
    }

    // Filtro de fecha hasta
    if (filtroFechaHasta) {
      const fechaFactura = new Date(factura.fecha_creacion);
      const fechaHasta = new Date(filtroFechaHasta);
      fechaHasta.setHours(23, 59, 59, 999); // Incluir todo el día
      if (fechaFactura > fechaHasta) return false;
    }

    // Filtro de proveedor
    if (filtroProveedor && factura.id_proveedor.toString() !== filtroProveedor) {
      return false;
    }

    // Filtro de estado
    if (filtroEstado && factura.id_estado.toString() !== filtroEstado) {
      return false;
    }

    return true;
  });

  const limpiarFiltros = () => {
    setFiltroFechaDesde("");
    setFiltroFechaHasta("");
    setFiltroProveedor("");
    setFiltroEstado("");
  };

  const tieneFiltrosActivos = filtroFechaDesde || filtroFechaHasta || filtroProveedor || filtroEstado;

  const handleVerDetalle = async (factura: Factura) => {
    try {
      setLoadingDetalle(true);
      setMostrarDialogo(true);
      
      const response = await fetch(`http://localhost:4000/api/compras/facturas/${factura.id_facturas}`);
      
      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }
      
      const data = await response.json();

      if (data.success) {
        setFacturaCompleta({
          ...data.factura,
          detalles: data.detalles || []
        });
      } else {
        toast({
          title: "Error",
          description: data.message || "No se pudieron cargar los detalles de la factura",
          variant: "destructive",
        });
        setMostrarDialogo(false);
      }
    } catch (error) {
      console.error("Error al cargar detalle de factura:", error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Error al cargar los detalles de la factura. Verifique que el servidor esté corriendo.",
        variant: "destructive",
      });
      setMostrarDialogo(false);
    } finally {
      setLoadingDetalle(false);
    }
  };

  return (
    <PageContainer>
      <PageTitle title="Ver Facturas" />

      {/* Barra de búsqueda y filtros */}
      <div className="flex gap-4 mb-4">
        <div className="flex-1">
          <SearchBar
            placeholder="Buscar por ID, fecha, proveedor o número de factura..."
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
                  {[filtroFechaDesde, filtroFechaHasta, filtroProveedor, filtroEstado].filter(Boolean).length}
                </span>
              )}
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Filtros</DialogTitle>
              <DialogDescription>
                Selecciona los filtros para buscar facturas
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="fechaDesde">Fecha Desde</Label>
                <Input
                  id="fechaDesde"
                  type="date"
                  value={filtroFechaDesde}
                  onChange={(e) => setFiltroFechaDesde(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="fechaHasta">Fecha Hasta</Label>
                <Input
                  id="fechaHasta"
                  type="date"
                  value={filtroFechaHasta}
                  onChange={(e) => setFiltroFechaHasta(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="proveedor">Proveedor</Label>
                <Select value={filtroProveedor || "all"} onValueChange={(value) => setFiltroProveedor(value === "all" ? "" : value)}>
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
              <div className="space-y-2">
                <Label htmlFor="estado">Estado</Label>
                <Select value={filtroEstado || "all"} onValueChange={(value) => setFiltroEstado(value === "all" ? "" : value)}>
                  <SelectTrigger id="estado">
                    <SelectValue placeholder="Todos los estados" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos los estados</SelectItem>
                    {estados.map((est) => (
                      <SelectItem key={est.id_estado} value={est.id_estado.toString()}>
                        {est.nombre}
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
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <span>
            Mostrando {facturasFiltradas.length} de {facturas.length} factura{facturas.length !== 1 ? "s" : ""}
            {tieneFiltrosActivos && " (filtradas)"}
          </span>
        </div>
      )}

      {/* Tabla */}
      <TableCard
        headers={["Acción", "ID Factura", "Fecha", "Proveedor", "Número Factura Proveedor", "Total"]}
        emptyMessage={
          loading 
            ? "Cargando facturas..." 
            : facturasFiltradas.length === 0 
              ? tieneFiltrosActivos 
                ? "No se encontraron facturas con los filtros aplicados" 
                : "No se encontraron facturas"
              : undefined
        }
        colSpan={6}
      >
        {loading ? (
          <TableRow>
            <TableCell colSpan={6} className="text-center py-8">
              <Loader2 className="h-6 w-6 animate-spin mx-auto" />
            </TableCell>
          </TableRow>
        ) : (
          facturasFiltradas.map((factura) => (
            <TableRow key={factura.id_facturas}>
              <TableCell className="border-r border-border text-center w-32">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleVerDetalle(factura)}
                  className="flex items-center gap-2"
                >
                  <Eye className="h-4 w-4" />
                  Ver
                </Button>
              </TableCell>
              <TableCell className="border-r border-border font-medium">
                {factura.id_facturas}
              </TableCell>
              <TableCell className="border-r border-border">
                {new Date(factura.fecha_creacion).toLocaleDateString("es-ES")}
              </TableCell>
              <TableCell className="border-r border-border">
                {factura.razon_social || factura.nombre_comercial || "N/A"}
              </TableCell>
              <TableCell className="border-r border-border">
                {factura.numero_factura_proveedor || "N/A"}
              </TableCell>
              <TableCell className="font-semibold">
                ${Number(factura.total_factura).toLocaleString("es-CO", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </TableCell>
            </TableRow>
          ))
        )}
      </TableCard>

      {/* Diálogo para ver detalles de la factura */}
      <Dialog open={mostrarDialogo} onOpenChange={setMostrarDialogo}>
        <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Detalles de la Factura</DialogTitle>
            <DialogDescription>
              Información completa de la factura #{facturaCompleta?.id_facturas}
            </DialogDescription>
          </DialogHeader>
          {loadingDetalle ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="h-6 w-6 animate-spin" />
            </div>
          ) : facturaCompleta ? (
            <div className="space-y-6 mt-4">
              {/* Información de la factura */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">ID Factura</p>
                  <p className="text-lg font-semibold">{facturaCompleta.id_facturas}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Fecha</p>
                  <p className="text-lg font-semibold">
                    {new Date(facturaCompleta.fecha_creacion).toLocaleDateString("es-ES", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Estado</p>
                  <p className="text-lg font-semibold">{facturaCompleta.estado_nombre || "N/A"}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Proveedor</p>
                  <p className="text-lg font-semibold">{facturaCompleta.razon_social || facturaCompleta.nombre_comercial || "N/A"}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Número Factura Proveedor</p>
                  <p className="text-lg font-semibold">{facturaCompleta.numero_factura_proveedor || "N/A"}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Usuario</p>
                  <p className="text-lg font-semibold">
                    {facturaCompleta.usuario_nombre} {facturaCompleta.usuario_apellido}
                  </p>
                </div>
              </div>

              {/* Totales */}
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4 p-4 bg-muted rounded-lg">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Subtotal</p>
                  <p className="text-lg font-semibold">
                    ${Number(facturaCompleta.total_subtotal).toLocaleString("es-CO", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Descuento</p>
                  <p className="text-lg font-semibold">
                    ${Number(facturaCompleta.total_descuento).toLocaleString("es-CO", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">IVA</p>
                  <p className="text-lg font-semibold">
                    ${Number(facturaCompleta.total_iva).toLocaleString("es-CO", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Retención</p>
                  <p className="text-lg font-semibold">
                    ${Number(facturaCompleta.total_retencion).toLocaleString("es-CO", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total</p>
                  <p className="text-xl font-bold">
                    ${Number(facturaCompleta.total_factura).toLocaleString("es-CO", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </p>
                </div>
              </div>

              {/* Observaciones */}
              {facturaCompleta.observaciones && (
                <div className="p-4 bg-muted rounded-lg">
                  <p className="text-sm font-medium text-muted-foreground mb-2">Observaciones</p>
                  <p className="text-base">{facturaCompleta.observaciones}</p>
                </div>
              )}

              {/* Tabla de productos */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Productos</h3>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="border-r border-border">Producto</TableHead>
                        <TableHead className="border-r border-border">Bodega</TableHead>
                        <TableHead className="border-r border-border text-center">Cantidad</TableHead>
                        <TableHead className="border-r border-border text-right">Precio Unitario</TableHead>
                        <TableHead className="border-r border-border text-right">Descuento</TableHead>
                        <TableHead className="border-r border-border text-right">Subtotal</TableHead>
                        <TableHead className="border-r border-border text-right">IVA</TableHead>
                        <TableHead className="border-r border-border text-right">Retención</TableHead>
                        <TableHead className="text-right">Valor Total</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {facturaCompleta.detalles.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={9} className="text-center py-4 text-muted-foreground">
                            No hay productos en esta factura
                          </TableCell>
                        </TableRow>
                      ) : (
                        facturaCompleta.detalles.map((detalle) => (
                          <TableRow key={detalle.id_detalle_factura}>
                            <TableCell className="border-r border-border">
                              <div className="flex flex-col">
                                <span className="font-medium">{detalle.producto_nombre}</span>
                                <span className="text-xs text-muted-foreground">{detalle.producto_codigo}</span>
                              </div>
                            </TableCell>
                            <TableCell className="border-r border-border">
                              {detalle.bodega_nombre || "N/A"}
                            </TableCell>
                            <TableCell className="border-r border-border text-center">
                              {detalle.cantidad}
                            </TableCell>
                            <TableCell className="border-r border-border text-right">
                              ${Number(detalle.precio_unitario).toLocaleString("es-CO", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                            </TableCell>
                            <TableCell className="border-r border-border text-right">
                              {detalle.porcentaje_descuento > 0 ? (
                                <div className="flex flex-col">
                                  <span className="text-xs text-muted-foreground">{Number(detalle.porcentaje_descuento).toFixed(2)}%</span>
                                  <span>${Number(detalle.descuento).toLocaleString("es-CO", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                                </div>
                              ) : (
                                <span>${Number(detalle.descuento).toLocaleString("es-CO", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                              )}
                            </TableCell>
                            <TableCell className="border-r border-border text-right">
                              ${Number(detalle.subtotal).toLocaleString("es-CO", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                            </TableCell>
                            <TableCell className="border-r border-border text-right">
                              {detalle.iva_valor > 0 ? (
                                <div className="flex flex-col">
                                  <span className="text-xs text-muted-foreground">
                                    {detalle.iva_nombre || "N/A"} ({detalle.iva_porcentaje || 0}%)
                                  </span>
                                  <span>${Number(detalle.iva_valor).toLocaleString("es-CO", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                                </div>
                              ) : (
                                <span className="text-muted-foreground">Sin IVA</span>
                              )}
                            </TableCell>
                            <TableCell className="border-r border-border text-right">
                              {detalle.retefuente_valor > 0 ? (
                                <div className="flex flex-col">
                                  <span className="text-xs text-muted-foreground">
                                    {detalle.retencion_nombre || "N/A"} ({detalle.retencion_porcentaje || 0}%)
                                  </span>
                                  <span>${Number(detalle.retefuente_valor).toLocaleString("es-CO", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                                </div>
                              ) : (
                                <span className="text-muted-foreground">Sin Retención</span>
                              )}
                            </TableCell>
                            <TableCell className="text-right font-semibold">
                              ${Number(detalle.valor_total).toLocaleString("es-CO", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                            </TableCell>
                          </TableRow>
                        ))
                      )}
                    </TableBody>
                  </Table>
                </div>
              </div>
            </div>
          ) : null}
        </DialogContent>
      </Dialog>
    </PageContainer>
  );
};

export default VerFactura;

