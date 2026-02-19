import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  TableBody,
  TableCell,
  TableRow,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowRight, Loader2 } from "lucide-react";
import PageContainer from "@/components/PageContainer";
import PageTitle from "@/components/PageTitle";
import FormCard from "@/components/FormCard";
import TableCard from "@/components/TableCard";
import { BodegaSelect } from "@/components/BodegaSelect";
import { useToast } from "@/hooks/use-toast";
import { API_BASE_URL } from "@/config/api";

// Interface de bodega desde la BD
interface Bodega {
  id_bodega: number;
  nombre: string;
  id_estado?: number;
  estado_nombre?: string;
  estado_color?: string;
}

// Interface de producto en bodega
interface ProductoBodega {
  id_inventario: number;
  id_producto: number;
  id_factura: number;
  producto_codigo: string;
  producto_nombre: string;
  cantidad_lote: number;
  precio_unitario: number;
  costo_unitario_con_impuesto: number;
  iva_valor: number;
}

interface ProductoSeleccionado {
  id_inventario: number;
  id_producto: number;
  id_factura: number;
  cantidad: string;
}

const TrasladosBodegas = () => {
  const { toast } = useToast();
  const [bodegas, setBodegas] = useState<Bodega[]>([]);
  const [loading, setLoading] = useState(true);
  const [bodegaOrigen, setBodegaOrigen] = useState<string>("");
  const [bodegaDestino, setBodegaDestino] = useState<string>("");
  const [productosBodegaOrigen, setProductosBodegaOrigen] = useState<ProductoBodega[]>([]);
  const [loadingProductos, setLoadingProductos] = useState(false);
  const [productosSeleccionados, setProductosSeleccionados] = useState<Map<number, ProductoSeleccionado>>(new Map());
  const [usuarioLogueado, setUsuarioLogueado] = useState<any>(null);

  // Obtener usuario logueado
  useEffect(() => {
    const usuario = localStorage.getItem("usuario");
    if (usuario) {
      try {
        const usuarioObj = JSON.parse(usuario);
        setUsuarioLogueado(usuarioObj);
      } catch (error) {
        console.error("Error al parsear usuario:", error);
      }
    }
  }, []);

  // Cargar bodegas desde la BD
  useEffect(() => {
    const cargarBodegas = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${API_BASE_URL}/api/bodegas");
        const data = await response.json();

        if (data.success) {
          // Filtrar solo bodegas activas (estado 1 o 2, no eliminadas)
          const bodegasActivas = data.bodegas.filter(
            (bodega: Bodega) => bodega.id_estado === 1 || bodega.id_estado === 2
          );
          setBodegas(bodegasActivas);
        }
      } catch (error) {
        toast({
          title: "Error",
          description: "No se pudieron cargar las bodegas",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    cargarBodegas();
  }, [toast]);

  // Cargar productos cuando se selecciona bodega origen
  useEffect(() => {
    const cargarProductos = async () => {
      if (!bodegaOrigen) {
        setProductosBodegaOrigen([]);
        setProductosSeleccionados(new Map());
        return;
      }

      try {
        setLoadingProductos(true);
        const response = await fetch(`${API_BASE_URL}/api/bodegas/${bodegaOrigen}/productos`);
        
        if (!response.ok) {
          throw new Error(`Error ${response.status}: ${response.statusText}`);
        }
        
        const data = await response.json();

        if (data.success) {
          setProductosBodegaOrigen(data.productos || []);
        } else {
          toast({
            title: "Error",
            description: data.message || "No se pudieron cargar los productos",
            variant: "destructive",
          });
          setProductosBodegaOrigen([]);
        }
      } catch (error) {
        console.error("Error al cargar productos:", error);
        toast({
          title: "Error",
          description: error instanceof Error ? error.message : "Error al cargar los productos.",
          variant: "destructive",
        });
        setProductosBodegaOrigen([]);
      } finally {
        setLoadingProductos(false);
      }
    };

    cargarProductos();
    setProductosSeleccionados(new Map());
  }, [bodegaOrigen, toast]);

  // Manejar selección de producto
  const handleSeleccionarProducto = (idInventario: number, checked: boolean) => {
    const nuevo = new Map(productosSeleccionados);
    if (checked) {
      const producto = productosBodegaOrigen.find((p) => p.id_inventario === idInventario);
      if (producto) {
        nuevo.set(idInventario, { 
          id_inventario: producto.id_inventario,
          id_producto: producto.id_producto,
          id_factura: producto.id_factura,
          cantidad: "" 
        });
      }
    } else {
      nuevo.delete(idInventario);
    }
    setProductosSeleccionados(nuevo);
  };

  // Manejar cambio de cantidad
  const handleCambiarCantidad = (idInventario: number, cantidad: string) => {
    const nuevo = new Map(productosSeleccionados);
    const producto = nuevo.get(idInventario);
    if (producto) {
      nuevo.set(idInventario, { ...producto, cantidad });
    }
    setProductosSeleccionados(nuevo);
  };

  // Obtener cantidad disponible de un producto
  const obtenerCantidadDisponible = (idInventario: number): number => {
    const producto = productosBodegaOrigen.find((p) => p.id_inventario === idInventario);
    return producto?.cantidad_lote || 0;
  };

  // Validar y mover productos
  const handleMover = () => {
    if (!bodegaOrigen || !bodegaDestino) {
      toast({
        title: "Error",
        description: "Debe seleccionar bodega de origen y destino",
        variant: "destructive",
      });
      return;
    }

    if (bodegaOrigen === bodegaDestino) {
      toast({
        title: "Error",
        description: "La bodega de origen y destino no pueden ser la misma",
        variant: "destructive",
      });
      return;
    }

    if (productosSeleccionados.size === 0) {
      toast({
        title: "Error",
        description: "Debe seleccionar al menos un producto",
        variant: "destructive",
      });
      return;
    }

    // Validar que todas las cantidades estén ingresadas y sean válidas
    const productosInvalidos: string[] = [];
    productosSeleccionados.forEach((producto, idInventario) => {
      const cantidad = parseFloat(producto.cantidad);
      const disponible = obtenerCantidadDisponible(idInventario);
      const productoInfo = productosBodegaOrigen.find((p) => p.id_inventario === idInventario);

      if (!producto.cantidad || cantidad <= 0) {
        productosInvalidos.push(`${productoInfo?.producto_nombre || "Producto"}: cantidad no válida`);
      } else if (cantidad > disponible) {
        productosInvalidos.push(`${productoInfo?.producto_nombre || "Producto"}: cantidad excede el stock disponible (${disponible})`);
      }
    });

    if (productosInvalidos.length > 0) {
      toast({
        title: "Error de validación",
        description: productosInvalidos.join(", "),
        variant: "destructive",
      });
      return;
    }

    // Realizar traslado
    const realizarTraslado = async () => {
      // Validar que el usuario esté logueado
      if (!usuarioLogueado || !usuarioLogueado.id_usuarios) {
        toast({
          title: "Error",
          description: "Debe estar logueado para realizar un traslado",
          variant: "destructive",
        });
        return;
      }

      try {
        setLoadingProductos(true);
        const traslados = Array.from(productosSeleccionados.values()).map((p) => ({
          id_inventario: p.id_inventario,
          id_producto: p.id_producto,
          id_factura: p.id_factura,
          cantidad: parseFloat(p.cantidad)
        }));

        const response = await fetch(`${API_BASE_URL}/api/bodegas/traslado", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id_bodega_origen: parseInt(bodegaOrigen),
            id_bodega_destino: parseInt(bodegaDestino),
            id_usuario: usuarioLogueado?.id_usuarios || null,
            observacion: null, // Opcional, se puede agregar un campo en el formulario más adelante
            traslados
          }),
        });

        const data = await response.json();

        if (data.success) {
          toast({
            title: "Traslado exitoso",
            description: `${productosSeleccionados.size} producto(s) movido(s) de ${bodegas.find((b) => b.id_bodega.toString() === bodegaOrigen)?.nombre} a ${bodegas.find((b) => b.id_bodega.toString() === bodegaDestino)?.nombre}`,
          });

          // Recargar productos de la bodega origen
          const productosResponse = await fetch(`${API_BASE_URL}/api/bodegas/${bodegaOrigen}/productos`);
          const productosData = await productosResponse.json();
          if (productosData.success) {
            setProductosBodegaOrigen(productosData.productos || []);
          }

          // Limpiar selección
          setProductosSeleccionados(new Map());
        } else {
          toast({
            title: "Error",
            description: data.message || "No se pudo realizar el traslado",
            variant: "destructive",
          });
        }
      } catch (error) {
        console.error("Error al realizar traslado:", error);
        toast({
          title: "Error",
          description: error instanceof Error ? error.message : "Error al realizar el traslado",
          variant: "destructive",
        });
      } finally {
        setLoadingProductos(false);
      }
    };

    realizarTraslado();
  };


  return (
    <PageContainer>
      <PageTitle title="Traslados entre Bodegas" />

      {/* Selectores de bodegas */}
      <FormCard title="Seleccionar Bodegas">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="bodega-origen">Mover de</Label>
            <BodegaSelect
              bodegas={bodegas}
              value={bodegaOrigen}
              onValueChange={setBodegaOrigen}
              placeholder={loading ? "Cargando bodegas..." : "Seleccione bodega origen"}
              disabled={loading || bodegas.length === 0}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="bodega-destino">Mover a</Label>
            <BodegaSelect
              bodegas={bodegas.filter((b) => b.id_bodega.toString() !== bodegaOrigen)}
              value={bodegaDestino}
              onValueChange={setBodegaDestino}
              placeholder={loading ? "Cargando bodegas..." : "Seleccione bodega destino"}
              disabled={loading || bodegas.length === 0 || !bodegaOrigen}
            />
          </div>
        </div>
      </FormCard>

      {/* Tabla de productos de la bodega origen */}
      {bodegaOrigen && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">
            Productos en {bodegas.find((b) => b.id_bodega.toString() === bodegaOrigen)?.nombre}
          </h3>
          <TableCard
            headers={["", "Código", "Producto", "Cantidad Disponible", "Cantidad a Mover"]}
            emptyMessage={
              productosBodegaOrigen.length === 0
                ? "No hay productos en esta bodega"
                : undefined
            }
            colSpan={5}
          >
            {loadingProductos ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-8">
                  <Loader2 className="h-6 w-6 animate-spin mx-auto" />
                </TableCell>
              </TableRow>
            ) : (
              productosBodegaOrigen.map((producto) => {
                const estaSeleccionado = productosSeleccionados.has(producto.id_inventario);
                const productoSeleccionado = productosSeleccionados.get(producto.id_inventario);

                return (
                  <TableRow key={producto.id_inventario}>
                    <TableCell className="border-r border-border w-12">
                      <Checkbox
                        checked={estaSeleccionado}
                        onCheckedChange={(checked) =>
                          handleSeleccionarProducto(producto.id_inventario, checked as boolean)
                        }
                      />
                    </TableCell>
                    <TableCell className="border-r border-border font-medium">
                      {producto.producto_codigo}
                    </TableCell>
                    <TableCell className="border-r border-border">
                      {producto.producto_nombre}
                    </TableCell>
                    <TableCell className="border-r border-border">
                      {producto.cantidad_lote}
                    </TableCell>
                    <TableCell>
                      {estaSeleccionado ? (
                        <Input
                          type="number"
                          min="1"
                          max={producto.cantidad_lote}
                          value={productoSeleccionado?.cantidad || ""}
                          onChange={(e) =>
                            handleCambiarCantidad(producto.id_inventario, e.target.value)
                          }
                          placeholder="Cantidad"
                          className="w-32"
                        />
                      ) : (
                        <span className="text-muted-foreground">-</span>
                      )}
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableCard>

          {/* Botón Mover */}
          {productosSeleccionados.size > 0 && (
            <div className="flex justify-end">
              <Button 
                onClick={handleMover} 
                className="flex items-center gap-2"
                disabled={loadingProductos || !bodegaDestino}
              >
                {loadingProductos ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <ArrowRight className="h-4 w-4" />
                )}
                Mover Productos
              </Button>
            </div>
          )}
        </div>
      )}

      {!bodegaOrigen && (
        <div className="text-center text-muted-foreground py-8">
          Seleccione una bodega de origen para ver los productos disponibles
        </div>
      )}
    </PageContainer>
  );
};

export default TrasladosBodegas;

