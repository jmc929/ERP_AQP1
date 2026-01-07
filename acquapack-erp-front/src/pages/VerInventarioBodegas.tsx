import React, { useState, useMemo, useEffect } from "react";
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
  valor_total: number;
  id_iva: number | null;
  iva_nombre: string | null;
  iva_porcentaje: number | null;
  unidad_medida: string;
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
  const [productosBodega, setProductosBodega] = useState<ProductoInventario[]>([]);
  const [busqueda, setBusqueda] = useState("");
  const [loading, setLoading] = useState(true);
  const [loadingProductos, setLoadingProductos] = useState(false);
  const [movimientosAbiertos, setMovimientosAbiertos] = useState<Map<number, boolean>>(new Map());
  const [movimientosKardex, setMovimientosKardex] = useState<Map<number, MovimientoKardex[]>>(new Map());
  const [loadingMovimientos, setLoadingMovimientos] = useState<Map<number, boolean>>(new Map());

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
      producto.unidad_medida.toLowerCase().includes(query) ||
      producto.precio_unitario.toString().includes(query) ||
      producto.costo_unitario_con_impuesto.toString().includes(query) ||
      producto.valor_total.toString().includes(query)
    );
  }, [productosBodega, busqueda]);

  // Calcular totales correctamente
  const totales = useMemo(() => {
    if (productosFiltrados.length === 0) {
      return {
        cantidadTotal: 0,
        precioUnitarioPromedio: 0,
        costoUnitarioConImpuestoPromedio: 0,
        valorTotal: 0,
      };
    }

    const resultado = productosFiltrados.reduce(
      (acc, producto) => {
        const cantidad = producto.cantidad_lote || 0;
        const precioUnitario = producto.precio_unitario || 0;
        const costoUnitarioConImpuesto = producto.costo_unitario_con_impuesto || 0;
        const valorTotal = producto.valor_total || 0;

        // Sumas directas
        acc.cantidadTotal += cantidad;
        acc.valorTotal += valorTotal;

        // Para promedios ponderados: sumar (cantidad * valor) y luego dividir por total cantidad
        acc.sumaPrecioUnitarioPonderado += cantidad * precioUnitario;
        acc.sumaCostoUnitarioPonderado += cantidad * costoUnitarioConImpuesto;

        return acc;
      },
      {
        cantidadTotal: 0,
        sumaPrecioUnitarioPonderado: 0,
        sumaCostoUnitarioPonderado: 0,
        valorTotal: 0,
      }
    );

    // Calcular promedios ponderados
    const precioUnitarioPromedio =
      resultado.cantidadTotal > 0
        ? resultado.sumaPrecioUnitarioPonderado / resultado.cantidadTotal
        : 0;

    const costoUnitarioConImpuestoPromedio =
      resultado.cantidadTotal > 0
        ? resultado.sumaCostoUnitarioPonderado / resultado.cantidadTotal
        : 0;

    return {
      cantidadTotal: resultado.cantidadTotal,
      precioUnitarioPromedio,
      costoUnitarioConImpuestoPromedio,
      valorTotal: resultado.valorTotal,
    };
  }, [productosFiltrados]);

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
        `http://localhost:4000/api/bodegas/${producto.id_bodega}/movimientos-kardex?id_producto=${producto.id_producto}`
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
        headers={["", "ID Inventario", "Código", "Nombre", "Cantidad", "Unidad de Medida", "Precio Unitario", "Costo Unitario con Impuesto", "Valor Total"]}
        emptyMessage={
          loadingProductos
            ? "Cargando productos..."
            : productosFiltrados.length === 0
              ? productosBodega.length === 0
                ? "No hay productos en esta bodega"
                : "No se encontraron productos"
              : undefined
        }
        colSpan={9}
      >
        {loadingProductos ? (
          <TableRow>
            <TableCell colSpan={9} className="text-center py-8">
              <Loader2 className="h-6 w-6 animate-spin mx-auto" />
            </TableCell>
          </TableRow>
        ) : (
          productosFiltrados.map((producto) => {
            const estaAbierto = movimientosAbiertos.get(producto.id_inventario) || false;
            const movimientos = movimientosKardex.get(producto.id_inventario) || [];
            const cargando = loadingMovimientos.get(producto.id_inventario) || false;

            return (
              <React.Fragment key={producto.id_inventario}>
                <TableRow>
                  <TableCell className="border-r border-border py-4 px-4 w-12">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => cargarMovimientosKardex(producto)}
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
                  </TableCell>
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
                    {producto.unidad_medida}
                  </TableCell>
                  <TableCell className="border-r border-border py-4 px-6">
                    ${producto.precio_unitario.toLocaleString("es-CO", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </TableCell>
                  <TableCell className="border-r border-border py-4 px-6 font-semibold">
                    ${producto.costo_unitario_con_impuesto.toLocaleString("es-CO", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </TableCell>
                  <TableCell className="py-4 px-6 font-semibold">
                    ${producto.valor_total.toLocaleString("es-CO", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </TableCell>
                </TableRow>
                {estaAbierto && movimientos.length > 0 && (
                  <TableRow>
                    <TableCell colSpan={9} className="bg-muted/50 p-0">
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
                                  Costo unitario: ${movimiento.costo_unitario.toLocaleString("es-CO", {
                                    minimumFractionDigits: 2,
                                    maximumFractionDigits: 2,
                                  })}
                                </div>
                                <div className="text-xs text-muted-foreground">
                                  Total: ${movimiento.costo_total_movimiento.toLocaleString("es-CO", {
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
                {estaAbierto && movimientos.length === 0 && !cargando && (
                  <TableRow>
                    <TableCell colSpan={9} className="bg-muted/50 p-4 text-center text-sm text-muted-foreground">
                      No hay movimientos registrados para este producto
                    </TableCell>
                  </TableRow>
                )}
              </React.Fragment>
            );
          })
        )}
        {/* Fila de totales */}
        {!loadingProductos && productosFiltrados.length > 0 && (
          <TableRow className="bg-muted/50 font-semibold border-t-2 border-border">
            <TableCell colSpan={4} className="text-right border-r border-border py-4 px-6">
              <span className="text-base">TOTALES:</span>
            </TableCell>
            <TableCell className="border-r border-border py-4 px-6 text-right">
              {totales.cantidadTotal.toLocaleString("es-CO", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </TableCell>
            <TableCell className="border-r border-border py-4 px-6"></TableCell>
            <TableCell className="border-r border-border py-4 px-6 text-right">
              ${totales.precioUnitarioPromedio.toLocaleString("es-CO", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </TableCell>
            <TableCell className="border-r border-border py-4 px-6 text-right">
              ${totales.costoUnitarioConImpuestoPromedio.toLocaleString("es-CO", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </TableCell>
            <TableCell className="py-4 px-6 text-right text-primary">
              ${totales.valorTotal.toLocaleString("es-CO", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </TableCell>
          </TableRow>
        )}
      </TableCard>
    </PageContainer>
  );
};

export default VerInventarioBodegas;

