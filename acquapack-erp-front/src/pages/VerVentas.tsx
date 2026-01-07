import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
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
} from "@/components/ui/dialog";
import { Eye, Loader2 } from "lucide-react";
import SearchBar from "@/components/SearchBar";
import PageContainer from "@/components/PageContainer";
import PageTitle from "@/components/PageTitle";
import TableCard from "@/components/TableCard";
import { useToast } from "@/hooks/use-toast";

// Interfaces desde la BD
interface DetalleSalida {
  id_detalle_salida: number;
  cantidad: number;
  precio_unitario: number;
  descuento: number;
  subtotal: number;
  iva_valor: number;
  retefuente_valor: number;
  valor_total: number;
  producto_codigo: string;
  producto_nombre: string;
  iva_nombre?: string;
  retencion_nombre?: string;
}

interface Salida {
  id_salida: number;
  fecha_creacion: string;
  total_subtotal: number;
  total_descuento: number;
  total_iva: number;
  total_retencion: number;
  total_factura: number;
  id_cliente: number;
  razon_social: string;
  nombre_comercial?: string;
  id_usuario: number;
  usuario_nombre: string;
  usuario_apellido: string;
  detalles?: DetalleSalida[];
}

const VerVentas = () => {
  const { toast } = useToast();
  const [busqueda, setBusqueda] = useState("");
  const [mostrarDialogo, setMostrarDialogo] = useState(false);
  const [ventaSeleccionada, setVentaSeleccionada] = useState<Salida | null>(null);
  const [salidas, setSalidas] = useState<Salida[]>([]);
  const [loading, setLoading] = useState(true);
  const [cargandoDetalle, setCargandoDetalle] = useState(false);

  // Cargar salidas desde la API
  useEffect(() => {
    const cargarSalidas = async () => {
      try {
        setLoading(true);
        const response = await fetch("http://localhost:4000/api/ventas/salidas");
        
        if (!response.ok) {
          throw new Error(`Error ${response.status}: ${response.statusText}`);
        }
        
        const data = await response.json();

        if (data.success) {
          setSalidas(data.salidas || []);
        } else {
          throw new Error(data.message || "Error al cargar las ventas");
        }
      } catch (error) {
        console.error("Error al cargar salidas:", error);
        toast({
          title: "Error",
          description: error instanceof Error ? error.message : "Error al cargar las ventas",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    cargarSalidas();
  }, [toast]);

  // Filtrar ventas según búsqueda
  const ventasFiltradas = salidas.filter((venta) =>
    venta.id_salida.toString().includes(busqueda) ||
    venta.fecha_creacion.includes(busqueda) ||
    (venta.razon_social && venta.razon_social.toLowerCase().includes(busqueda.toLowerCase())) ||
    (venta.nombre_comercial && venta.nombre_comercial.toLowerCase().includes(busqueda.toLowerCase())) ||
    (venta.usuario_nombre && venta.usuario_nombre.toLowerCase().includes(busqueda.toLowerCase()))
  );

  const handleVerDetalle = async (venta: Salida) => {
    setCargandoDetalle(true);
    setMostrarDialogo(true);
    
    try {
      // Si ya tiene detalles cargados, usarlos
      if (venta.detalles) {
        setVentaSeleccionada(venta);
        setCargandoDetalle(false);
        return;
      }

      // Cargar detalles desde la API
      const response = await fetch(`http://localhost:4000/api/ventas/salidas/${venta.id_salida}`);
      
      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }
      
      const data = await response.json();

      if (data.success) {
        setVentaSeleccionada({
          ...venta,
          detalles: data.detalles || []
        });
      } else {
        throw new Error(data.message || "Error al cargar el detalle");
      }
    } catch (error) {
      console.error("Error al cargar detalle:", error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Error al cargar el detalle de la venta",
        variant: "destructive",
      });
    } finally {
      setCargandoDetalle(false);
    }
  };

  return (
    <PageContainer>
      <PageTitle title="Ver Ventas" />

      {/* Barra de búsqueda */}
      <SearchBar
        placeholder="Buscar por ID, número, fecha, cliente o vendedor..."
        value={busqueda}
        onChange={setBusqueda}
      />

      {/* Tabla */}
      <TableCard
        headers={["Acción", "ID Salida", "Fecha", "Cliente", "Vendedor", "Total"]}
        emptyMessage={
          loading
            ? "Cargando ventas..."
            : ventasFiltradas.length === 0
              ? salidas.length === 0
                ? "No hay ventas registradas"
                : "No se encontraron ventas"
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
          ventasFiltradas.map((venta) => (
            <TableRow key={venta.id_salida}>
              <TableCell className="border-r border-border text-center w-32">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleVerDetalle(venta)}
                  className="flex items-center gap-2"
                >
                  <Eye className="h-4 w-4" />
                  Ver
                </Button>
              </TableCell>
              <TableCell className="border-r border-border font-medium">
                {venta.id_salida}
              </TableCell>
              <TableCell className="border-r border-border">
                {new Date(venta.fecha_creacion).toLocaleDateString("es-CO")}
              </TableCell>
              <TableCell className="border-r border-border">
                {venta.razon_social || venta.nombre_comercial || "N/A"}
              </TableCell>
              <TableCell className="border-r border-border">
                {venta.usuario_nombre} {venta.usuario_apellido}
              </TableCell>
              <TableCell className="font-semibold">
                ${Number(venta.total_factura).toLocaleString("es-CO", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </TableCell>
            </TableRow>
          ))
        )}
      </TableCard>

      {/* Diálogo para ver detalles de la venta */}
      <Dialog open={mostrarDialogo} onOpenChange={setMostrarDialogo}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Detalles de la Venta</DialogTitle>
            <DialogDescription>
              Información completa de la venta seleccionada
            </DialogDescription>
          </DialogHeader>
          {cargandoDetalle ? (
            <div className="flex justify-center py-8">
              <Loader2 className="h-6 w-6 animate-spin" />
            </div>
          ) : ventaSeleccionada && (
            <div className="space-y-6">
              {/* Información de la venta */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">ID Salida</p>
                  <p className="text-lg font-semibold">{ventaSeleccionada.id_salida}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Fecha</p>
                  <p className="text-lg font-semibold">
                    {new Date(ventaSeleccionada.fecha_creacion).toLocaleDateString("es-CO", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Cliente</p>
                  <p className="text-lg font-semibold">{ventaSeleccionada.razon_social || ventaSeleccionada.nombre_comercial || "N/A"}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Vendedor</p>
                  <p className="text-lg font-semibold">{ventaSeleccionada.usuario_nombre} {ventaSeleccionada.usuario_apellido}</p>
                </div>
              </div>

              {/* Totales */}
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4 p-4 bg-muted rounded-lg">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Subtotal</p>
                  <p className="text-lg font-semibold">${Number(ventaSeleccionada.total_subtotal).toLocaleString("es-CO", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Descuento</p>
                  <p className="text-lg font-semibold">${Number(ventaSeleccionada.total_descuento).toLocaleString("es-CO", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">IVA</p>
                  <p className="text-lg font-semibold">${Number(ventaSeleccionada.total_iva).toLocaleString("es-CO", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Retención</p>
                  <p className="text-lg font-semibold">${Number(ventaSeleccionada.total_retencion).toLocaleString("es-CO", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total</p>
                  <p className="text-lg font-semibold text-primary">${Number(ventaSeleccionada.total_factura).toLocaleString("es-CO", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                </div>
              </div>

              {/* Tabla de productos */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Productos</h3>
                {ventaSeleccionada.detalles && ventaSeleccionada.detalles.length > 0 ? (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="border-r border-border">Producto</TableHead>
                        <TableHead className="border-r border-border">Cantidad</TableHead>
                        <TableHead className="border-r border-border">Valor Unitario</TableHead>
                        <TableHead className="border-r border-border">Descuento</TableHead>
                        <TableHead className="border-r border-border">IVA</TableHead>
                        <TableHead className="border-r border-border">Retención</TableHead>
                        <TableHead>Valor Total</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {ventaSeleccionada.detalles.map((detalle) => (
                        <TableRow key={detalle.id_detalle_salida}>
                          <TableCell className="border-r border-border font-medium">
                            <div className="flex flex-col">
                              <span className="font-bold">{detalle.producto_nombre}</span>
                              <span className="text-xs text-muted-foreground">{detalle.producto_codigo}</span>
                            </div>
                          </TableCell>
                          <TableCell className="border-r border-border">
                            {Number(detalle.cantidad).toLocaleString("es-CO", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                          </TableCell>
                          <TableCell className="border-r border-border">
                            ${Number(detalle.precio_unitario).toLocaleString("es-CO", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                          </TableCell>
                          <TableCell className="border-r border-border">
                            ${Number(detalle.descuento).toLocaleString("es-CO", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                          </TableCell>
                          <TableCell className="border-r border-border">
                            ${Number(detalle.iva_valor).toLocaleString("es-CO", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                            {detalle.iva_nombre && (
                              <div className="text-xs text-muted-foreground">{detalle.iva_nombre}</div>
                            )}
                          </TableCell>
                          <TableCell className="border-r border-border">
                            ${Number(detalle.retefuente_valor).toLocaleString("es-CO", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                            {detalle.retencion_nombre && (
                              <div className="text-xs text-muted-foreground">{detalle.retencion_nombre}</div>
                            )}
                          </TableCell>
                          <TableCell className="font-semibold">
                            ${Number(detalle.valor_total).toLocaleString("es-CO", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                ) : (
                  <p className="text-center text-muted-foreground py-4">No hay detalles disponibles</p>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </PageContainer>
  );
};

export default VerVentas;

