import React, { useState, useMemo, useEffect } from "react";
import { Label } from "@/components/ui/label";
import {
  TableBody,
  TableCell,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Loader2, ChevronRight, ArrowDownCircle, ArrowUpCircle, ArrowLeftRight } from "lucide-react";
import SearchBar from "@/components/SearchBar";
import PageContainer from "@/components/PageContainer";
import PageTitle from "@/components/PageTitle";
import TableCard from "@/components/TableCard";
import { BodegaSelect } from "@/components/BodegaSelect";
import { useToast } from "@/hooks/use-toast";
import { API_BASE_URL } from "@/config/api";

// Interface para bodegas desde la BD
interface Bodega {
  id_bodega: number;
  nombre: string;
  id_estado: number;
  total_productos?: number;
}

// Interface para productos de inventario (detalles individuales)
interface ProductoInventario {
  id_inventario: number;
  id_producto: number;
  id_bodega: number;
  cantidad_lote: number;
  costo_producto: number;
  fecha_ingreso: string;
  id_factura: number | null;
  id_traslado: number | null;
  producto_codigo: string;
  producto_nombre: string;
  precio_unitario: number;
  costo_unitario_con_impuesto: number;
  iva_valor: number;
  valor_total: number;
  id_iva: number | null;
  iva_nombre: string | null;
  iva_porcentaje: number | null;
  unidad_medida: string;
  comprobante: string;
  fecha_comprobante: string;
  cantidad_entrada: number;
  cantidad_salida: number;
  saldo_cantidad: number;
}

// Interface para detalles (pueden ser entradas o salidas)
interface DetalleTransaccion extends ProductoInventario {
  tipo?: 'entrada' | 'salida';
  tipo_movimiento?: string;
  id_movimientos?: number;
}

// Interface para productos agrupados (vista resumida)
interface ProductoAgrupado {
  id_producto: number;
  producto_codigo: string;
  producto_nombre: string;
  unidad_medida: string;
  cantidad_entrada: number;
  cantidad_salida: number;
  saldo_cantidad: number;
  detalles: DetalleTransaccion[];
}

// Interface para movimientos de kardex
interface MovimientoKardex {
  id_movimiento_kardex: number;
  id_bodega: number;
  id_producto: number;
  tipo_movimiento: string;
  tipo_flujo: string;
  cantidad: number;
  costo_unitario: number;
  costo_total_movimiento: number;
  fecha: string;
  bodega_nombre: string;
  producto_codigo: string;
  producto_nombre: string;
}

const VerInventarioBodegas = () => {
  const { toast } = useToast();
  const [bodegas, setBodegas] = useState<Bodega[]>([]);
  const [bodegaSeleccionada, setBodegaSeleccionada] = useState<string>("");
  const [productosBodega, setProductosBodega] = useState<ProductoAgrupado[]>([]);
  const [busqueda, setBusqueda] = useState("");
  const [loading, setLoading] = useState(true);
  const [loadingProductos, setLoadingProductos] = useState(false);
  const [productosExpandidos, setProductosExpandidos] = useState<Map<number, boolean>>(new Map());
  const [movimientosAbiertos, setMovimientosAbiertos] = useState<Map<number, boolean>>(new Map());
  const [movimientosKardex, setMovimientosKardex] = useState<Map<number, MovimientoKardex[]>>(new Map());
  const [loadingMovimientos, setLoadingMovimientos] = useState<Map<number, boolean>>(new Map());

  // Cargar bodegas al montar el componente
  useEffect(() => {
    const cargarBodegas = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${API_BASE_URL}/api/compras/bodegas`);
        
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
        const response = await fetch(`${API_BASE_URL}/api/bodegas/${bodegaSeleccionada}/productos?agrupado=true`);
        
        if (!response.ok) {
          throw new Error(`Error ${response.status}: ${response.statusText}`);
        }
        
        const data = await response.json();

        if (data.success) {
          console.log("Productos agrupados cargados:", data.productos);
          setProductosBodega(data.productos || []);
          setProductosExpandidos(new Map()); // Resetear productos expandidos
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
      producto.id_producto.toString().includes(query) ||
      producto.producto_codigo.toLowerCase().includes(query) ||
      producto.producto_nombre.toLowerCase().includes(query) ||
      producto.cantidad_entrada.toString().includes(query) ||
      producto.cantidad_salida.toString().includes(query) ||
      producto.saldo_cantidad.toString().includes(query) ||
      producto.unidad_medida.toLowerCase().includes(query)
    );
  }, [productosBodega, busqueda]);

  // Calcular totales correctamente (para productos agrupados)
  const totales = useMemo(() => {
    if (productosFiltrados.length === 0) {
      return {
        cantidadEntradaTotal: 0,
        cantidadSalidaTotal: 0,
        saldoCantidadTotal: 0,
      };
    }

    return productosFiltrados.reduce(
      (acc, producto) => {
        acc.cantidadEntradaTotal += producto.cantidad_entrada || 0;
        acc.cantidadSalidaTotal += producto.cantidad_salida || 0;
        acc.saldoCantidadTotal += producto.saldo_cantidad || 0;
        return acc;
      },
      {
        cantidadEntradaTotal: 0,
        cantidadSalidaTotal: 0,
        saldoCantidadTotal: 0,
      }
    );
  }, [productosFiltrados]);

  // Función para expandir/colapsar producto
  const toggleExpandirProducto = (idProducto: number) => {
    const nuevo = new Map(productosExpandidos);
    nuevo.set(idProducto, !nuevo.get(idProducto));
    setProductosExpandidos(nuevo);
  };

  // Cargar movimientos de kardex
  const cargarMovimientosKardex = async (producto: ProductoInventario) => {
    const key = producto.id_inventario;
    
    // Si ya están cargados, solo abrir/cerrar
    if (movimientosKardex.has(key)) {
      const nuevo = new Map(movimientosAbiertos);
      nuevo.set(key, !nuevo.get(key));
      setMovimientosAbiertos(nuevo);
      return;
    }

    // Si no están cargados, cargarlos
    try {
      const nuevoLoading = new Map(loadingMovimientos);
      nuevoLoading.set(key, true);
      setLoadingMovimientos(nuevoLoading);

      const response = await fetch(
        `${API_BASE_URL}/api/bodegas/${producto.id_bodega}/movimientos-kardex?id_producto=${producto.id_producto}`
      );

      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();

      if (data.success) {
        const nuevoMovimientos = new Map(movimientosKardex);
        nuevoMovimientos.set(key, data.movimientos || []);
        setMovimientosKardex(nuevoMovimientos);

        const nuevoAbiertos = new Map(movimientosAbiertos);
        nuevoAbiertos.set(key, true);
        setMovimientosAbiertos(nuevoAbiertos);
      } else {
        toast({
          title: "Error",
          description: data.message || "No se pudieron cargar los movimientos",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error al cargar movimientos:", error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Error al cargar los movimientos.",
        variant: "destructive",
      });
    } finally {
      const nuevoLoading = new Map(loadingMovimientos);
      nuevoLoading.set(key, false);
      setLoadingMovimientos(nuevoLoading);
    }
  };

  // Obtener icono según tipo de movimiento
  const obtenerIconoMovimiento = (tipoMovimiento: string, tipoFlujo: string) => {
    if (tipoMovimiento.includes("Traslado")) {
      return <ArrowLeftRight className="h-4 w-4 text-blue-500" />;
    }
    if (tipoFlujo === "Entrada") {
      return <ArrowDownCircle className="h-4 w-4 text-green-500" />;
    }
    return <ArrowUpCircle className="h-4 w-4 text-red-500" />;
  };

  // Obtener color según tipo de flujo
  const obtenerColorFlujo = (tipoFlujo: string) => {
    if (tipoFlujo === "Entrada") {
      return "text-green-600 bg-green-50";
    }
    return "text-red-600 bg-red-50";
  };

  return (
    <PageContainer>
      <div className="flex items-center justify-between mb-6">
        <PageTitle title="Ver Inventario (Bodegas)" />
        <div className="w-64">
          <BodegaSelect
            bodegas={bodegas}
            value={bodegaSeleccionada}
            onValueChange={setBodegaSeleccionada}
            placeholder={loading ? "Cargando..." : bodegas.length === 0 ? "No hay bodegas" : "Seleccione una bodega"}
            disabled={loading || bodegas.length === 0}
          />
        </div>
      </div>

      {/* Barra de búsqueda - siempre visible */}
      <SearchBar
        placeholder="Buscar por ID, código, nombre, comprobante, cantidad o costo..."
        value={busqueda}
        onChange={setBusqueda}
      />

      {/* Tabla de productos agrupados */}
      <TableCard
        headers={["", "Código", "Nombre", "Cantidad Entrada", "Cantidad Salida", "Saldo Cantidad", "Unidad de Medida"]}
        emptyMessage={
          loadingProductos
            ? "Cargando productos..."
            : productosFiltrados.length === 0
              ? productosBodega.length === 0
                ? "No hay productos en esta bodega"
                : "No se encontraron productos"
              : undefined
        }
        colSpan={8}
      >
        {loadingProductos ? (
          <TableRow>
            <TableCell colSpan={8} className="text-center py-8">
              <Loader2 className="h-6 w-6 animate-spin mx-auto" />
            </TableCell>
          </TableRow>
        ) : (
          productosFiltrados.map((productoAgrupado) => {
            const estaExpandido = productosExpandidos.get(productoAgrupado.id_producto) || false;

            return (
              <React.Fragment key={productoAgrupado.id_producto}>
                {/* Fila resumida del producto */}
                <TableRow className="bg-muted/30">
                  <TableCell className="border-r border-border py-4 px-4 w-12">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => toggleExpandirProducto(productoAgrupado.id_producto)}
                      className="h-8 w-8 p-0"
                    >
                      <ChevronRight
                        className={`h-4 w-4 transition-transform ${estaExpandido ? "rotate-90" : ""}`}
                      />
                    </Button>
                  </TableCell>
                  <TableCell className="border-r border-border font-medium py-4 px-6">
                    {productoAgrupado.producto_codigo}
                  </TableCell>
                  <TableCell className="border-r border-border py-4 px-6 font-semibold">
                    {productoAgrupado.producto_nombre}
                  </TableCell>
                  <TableCell className="border-r border-border py-4 px-6 text-green-600 font-medium">
                    {productoAgrupado.cantidad_entrada.toLocaleString("es-CO", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </TableCell>
                  <TableCell className="border-r border-border py-4 px-6 text-red-600 font-medium">
                    {productoAgrupado.cantidad_salida.toLocaleString("es-CO", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </TableCell>
                  <TableCell className="border-r border-border py-4 px-6 font-semibold text-primary">
                    {productoAgrupado.saldo_cantidad.toLocaleString("es-CO", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </TableCell>
                  <TableCell className="py-4 px-6">
                    {productoAgrupado.unidad_medida}
                  </TableCell>
                </TableRow>
                
                {/* Detalles expandidos del producto */}
                {estaExpandido && productoAgrupado.detalles && productoAgrupado.detalles.length > 0 && (
                  <>
                    {/* Header de detalles */}
                    <TableRow className="bg-muted/20">
                      <TableCell colSpan={8} className="py-2 px-6 font-semibold text-sm">
                        Detalles del Producto
                      </TableCell>
                    </TableRow>
                    {/* Header de la tabla de detalles */}
                    <TableRow className="bg-muted/10">
                      <TableCell colSpan={8} className="py-2 px-6">
                        <div className="grid grid-cols-8 gap-2 text-xs font-semibold text-muted-foreground">
                          <div></div>
                          <div>ID / Tipo</div>
                          <div>Comprobante</div>
                          <div>Fecha</div>
                          <div>Cantidad</div>
                          <div>Costo Unitario</div>
                          <div>Costo Unitario c/Imp.</div>
                          <div>Total</div>
                        </div>
                      </TableCell>
                    </TableRow>
                    {/* Filas de detalles (entradas y salidas) */}
                    {productoAgrupado.detalles.map((detalle, index) => {
                      const esEntrada = detalle.tipo === 'entrada' || detalle.id_inventario;
                      const estaAbierto = esEntrada ? (movimientosAbiertos.get(detalle.id_inventario) || false) : false;
                      const movimientos = esEntrada ? (movimientosKardex.get(detalle.id_inventario) || []) : [];
                      const cargando = esEntrada ? (loadingMovimientos.get(detalle.id_inventario) || false) : false;
                      const key = esEntrada ? `entrada-${detalle.id_inventario}` : `salida-${detalle.id_movimientos}`;

                      return (
                        <React.Fragment key={key}>
                          <TableRow className={esEntrada ? "" : "bg-red-50/50"}>
                            <TableCell className="border-r border-border py-3 px-4 w-12">
                              {esEntrada ? (
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => cargarMovimientosKardex(detalle)}
                                  disabled={cargando}
                                  className="h-8 w-8 p-0"
                                >
                                  {cargando ? (
                                    <Loader2 className="h-4 w-4 animate-spin" />
                                  ) : (
                                    <ChevronRight
                                      className={`h-4 w-4 transition-transform ${estaAbierto ? "rotate-90" : ""}`}
                                    />
                                  )}
                                </Button>
                              ) : (
                                <ArrowUpCircle className="h-4 w-4 text-red-500 mx-auto" />
                              )}
                            </TableCell>
                            <TableCell className="border-r border-border py-3 px-6 text-sm">
                              {esEntrada ? `ID: ${detalle.id_inventario}` : 'Salida'}
                            </TableCell>
                            <TableCell className="border-r border-border py-3 px-6 text-sm font-medium">
                              {detalle.comprobante || detalle.tipo_movimiento || "N/A"}
                            </TableCell>
                            <TableCell className="border-r border-border py-3 px-6 text-sm">
                              {detalle.fecha_comprobante 
                                ? new Date(detalle.fecha_comprobante).toLocaleDateString("es-CO", {
                                    year: "numeric",
                                    month: "2-digit",
                                    day: "2-digit"
                                  })
                                : detalle.fecha_ingreso
                                ? new Date(detalle.fecha_ingreso).toLocaleDateString("es-CO", {
                                    year: "numeric",
                                    month: "2-digit",
                                    day: "2-digit"
                                  })
                                : "N/A"}
                            </TableCell>
                            <TableCell className={`border-r border-border py-3 px-6 text-sm font-medium ${esEntrada ? "text-green-600" : "text-red-600"}`}>
                              {(esEntrada ? (detalle.cantidad_entrada || detalle.cantidad || 0) : (detalle.cantidad_salida || detalle.cantidad || 0)).toLocaleString("es-CO", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                            </TableCell>
                            <TableCell className="border-r border-border py-3 px-6 text-sm">
                              ${Number(esEntrada ? (detalle.precio_unitario || 0) : (detalle.precio_unitario || 0)).toLocaleString("es-CO", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                            </TableCell>
                            <TableCell className="border-r border-border py-3 px-6 text-sm font-semibold">
                              ${Number(detalle.costo_unitario_con_impuesto || 0).toLocaleString("es-CO", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                            </TableCell>
                            <TableCell className="py-3 px-6 text-sm font-semibold text-primary">
                              ${Number(detalle.valor_total || 0).toLocaleString("es-CO", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                            </TableCell>
                          </TableRow>
                          {estaAbierto && movimientos.length > 0 && (
                            <TableRow>
                              <TableCell colSpan={8} className="bg-muted/50 p-0">
                                <div className="p-4">
                                  <h4 className="font-semibold mb-3 text-sm">Movimientos de Kardex</h4>
                                  <div className="space-y-2">
                                    {movimientos.map((movimiento) => (
                                      <div
                                        key={movimiento.id_movimiento_kardex}
                                        className="flex items-center justify-between p-3 bg-background rounded-lg border border-border"
                                      >
                                        <div className="flex items-center gap-3 flex-1">
                                          {obtenerIconoMovimiento(movimiento.tipo_movimiento, movimiento.tipo_flujo)}
                                          <div className="flex-1">
                                            <div className="flex items-center gap-2">
                                              <span className="font-medium text-sm">{movimiento.tipo_movimiento}</span>
                                              <span
                                                className={`px-2 py-1 rounded text-xs font-medium ${obtenerColorFlujo(movimiento.tipo_flujo)}`}
                                              >
                                                {movimiento.tipo_flujo}
                                              </span>
                                            </div>
                                            <div className="text-xs text-muted-foreground mt-1">
                                              {new Date(movimiento.fecha).toLocaleString("es-CO", {
                                                year: "numeric",
                                                month: "2-digit",
                                                day: "2-digit",
                                                hour: "2-digit",
                                                minute: "2-digit",
                                              })}
                                            </div>
                                          </div>
                                        </div>
                                        <div className="text-right">
                                          <div className="text-sm font-medium">
                                            Cantidad: {movimiento.cantidad}
                                          </div>
                                          <div className="text-xs text-muted-foreground">
                                            Costo unitario: ${Number(movimiento.costo_unitario).toLocaleString("es-CO", {
                                              minimumFractionDigits: 2,
                                              maximumFractionDigits: 2,
                                            })}
                                          </div>
                                          <div className="text-xs text-muted-foreground">
                                            Total: ${Number(movimiento.costo_total_movimiento).toLocaleString("es-CO", {
                                              minimumFractionDigits: 2,
                                              maximumFractionDigits: 2,
                                            })}
                                          </div>
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              </TableCell>
                            </TableRow>
                          )}
                        </React.Fragment>
                      );
                    })}
                  </>
                )}
              </React.Fragment>
            );
          })
        )}
        {/* Fila de totales */}
        {!loadingProductos && productosFiltrados.length > 0 && (
          <TableRow className="bg-muted/50 font-semibold border-t-2 border-border">
            <TableCell colSpan={3} className="text-right border-r border-border py-4 px-6">
              <span className="text-base">TOTALES:</span>
            </TableCell>
            <TableCell className="border-r border-border py-4 px-6 text-right text-green-600">
              {totales.cantidadEntradaTotal.toLocaleString("es-CO", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </TableCell>
            <TableCell className="border-r border-border py-4 px-6 text-right text-red-600">
              {totales.cantidadSalidaTotal.toLocaleString("es-CO", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </TableCell>
            <TableCell className="border-r border-border py-4 px-6 text-right text-primary">
              {totales.saldoCantidadTotal.toLocaleString("es-CO", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </TableCell>
            <TableCell className="border-r border-border py-4 px-6"></TableCell>
            <TableCell className="border-r border-border py-4 px-6"></TableCell>
            <TableCell className="py-4 px-6"></TableCell>
          </TableRow>
        )}
      </TableCard>
    </PageContainer>
  );
};

export default VerInventarioBodegas;

