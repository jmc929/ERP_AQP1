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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowRight } from "lucide-react";
import PageContainer from "@/components/PageContainer";
import PageTitle from "@/components/PageTitle";
import FormCard from "@/components/FormCard";
import TableCard from "@/components/TableCard";
import { useToast } from "@/hooks/use-toast";

// Datos mock de bodegas
interface Bodega {
  id: string;
  nombre: string;
}

const bodegas: Bodega[] = [
  { id: "BOD001", nombre: "Bodega Principal" },
  { id: "BOD002", nombre: "Bodega Secundaria" },
  { id: "BOD003", nombre: "Bodega Norte" },
  { id: "BOD004", nombre: "Bodega Sur" },
  { id: "BOD005", nombre: "Bodega Centro" },
  { id: "BOD006", nombre: "Bodega Este" },
];

// Datos mock de productos por bodega
interface ProductoBodega {
  id: number;
  codigo: string;
  nombre: string;
  cantidad: number;
}

// Simular inventario por bodega
const inventarioPorBodega: Record<string, ProductoBodega[]> = {
  BOD001: [
    { id: 1, codigo: "PROD001", nombre: "Producto A", cantidad: 50 },
    { id: 2, codigo: "PROD002", nombre: "Producto B", cantidad: 30 },
    { id: 3, codigo: "PROD003", nombre: "Producto C", cantidad: 75 },
    { id: 4, codigo: "PROD004", nombre: "Producto D", cantidad: 20 },
    { id: 5, codigo: "PROD005", nombre: "Producto E", cantidad: 100 },
  ],
  BOD002: [
    { id: 1, codigo: "PROD001", nombre: "Producto A", cantidad: 25 },
    { id: 2, codigo: "PROD002", nombre: "Producto B", cantidad: 40 },
    { id: 3, codigo: "PROD006", nombre: "Producto F", cantidad: 60 },
    { id: 4, codigo: "PROD007", nombre: "Producto G", cantidad: 35 },
  ],
  BOD003: [
    { id: 1, codigo: "PROD003", nombre: "Producto C", cantidad: 15 },
    { id: 2, codigo: "PROD008", nombre: "Producto H", cantidad: 80 },
    { id: 3, codigo: "PROD009", nombre: "Producto I", cantidad: 45 },
  ],
  BOD004: [
    { id: 1, codigo: "PROD001", nombre: "Producto A", cantidad: 10 },
    { id: 2, codigo: "PROD010", nombre: "Producto J", cantidad: 90 },
  ],
  BOD005: [
    { id: 1, codigo: "PROD002", nombre: "Producto B", cantidad: 55 },
    { id: 2, codigo: "PROD011", nombre: "Producto K", cantidad: 70 },
  ],
  BOD006: [
    { id: 1, codigo: "PROD001", nombre: "Producto A", cantidad: 5 },
    { id: 2, codigo: "PROD004", nombre: "Producto D", cantidad: 25 },
  ],
};

interface ProductoSeleccionado {
  productoId: number;
  cantidad: string;
}

const TrasladosBodegas = () => {
  const { toast } = useToast();
  const [bodegaOrigen, setBodegaOrigen] = useState<string>("");
  const [bodegaDestino, setBodegaDestino] = useState<string>("");
  const [productosSeleccionados, setProductosSeleccionados] = useState<Map<number, ProductoSeleccionado>>(new Map());

  // Obtener productos de la bodega origen
  const productosBodegaOrigen = bodegaOrigen ? (inventarioPorBodega[bodegaOrigen] || []) : [];

  // Manejar selección de producto
  const handleSeleccionarProducto = (productoId: number, checked: boolean) => {
    const nuevo = new Map(productosSeleccionados);
    if (checked) {
      nuevo.set(productoId, { productoId, cantidad: "" });
    } else {
      nuevo.delete(productoId);
    }
    setProductosSeleccionados(nuevo);
  };

  // Manejar cambio de cantidad
  const handleCambiarCantidad = (productoId: number, cantidad: string) => {
    const nuevo = new Map(productosSeleccionados);
    const producto = nuevo.get(productoId);
    if (producto) {
      nuevo.set(productoId, { ...producto, cantidad });
    }
    setProductosSeleccionados(nuevo);
  };

  // Obtener cantidad disponible de un producto
  const obtenerCantidadDisponible = (productoId: number): number => {
    const producto = productosBodegaOrigen.find((p) => p.id === productoId);
    return producto?.cantidad || 0;
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
    productosSeleccionados.forEach((producto, productoId) => {
      const cantidad = parseFloat(producto.cantidad);
      const disponible = obtenerCantidadDisponible(productoId);
      const productoInfo = productosBodegaOrigen.find((p) => p.id === productoId);

      if (!producto.cantidad || cantidad <= 0) {
        productosInvalidos.push(`${productoInfo?.nombre || "Producto"}: cantidad no válida`);
      } else if (cantidad > disponible) {
        productosInvalidos.push(`${productoInfo?.nombre || "Producto"}: cantidad excede el stock disponible (${disponible})`);
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

    // Simular movimiento (aquí iría la llamada al backend)
    toast({
      title: "Traslado exitoso",
      description: `${productosSeleccionados.size} producto(s) movido(s) de ${bodegas.find((b) => b.id === bodegaOrigen)?.nombre} a ${bodegas.find((b) => b.id === bodegaDestino)?.nombre}`,
    });

    // Limpiar formulario
    setProductosSeleccionados(new Map());
    setBodegaOrigen("");
    setBodegaDestino("");
  };

  // Limpiar selección cuando cambia la bodega origen
  useEffect(() => {
    setProductosSeleccionados(new Map());
  }, [bodegaOrigen]);

  return (
    <PageContainer>
      <PageTitle title="Traslados entre Bodegas" />

      {/* Selectores de bodegas */}
      <FormCard title="Seleccionar Bodegas">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="bodega-origen">Mover de</Label>
            <Select value={bodegaOrigen} onValueChange={setBodegaOrigen}>
              <SelectTrigger id="bodega-origen">
                <SelectValue placeholder="Seleccione bodega origen" />
              </SelectTrigger>
              <SelectContent>
                {bodegas.map((bodega) => (
                  <SelectItem key={bodega.id} value={bodega.id}>
                    {bodega.nombre}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="bodega-destino">Mover a</Label>
            <Select value={bodegaDestino} onValueChange={setBodegaDestino}>
              <SelectTrigger id="bodega-destino">
                <SelectValue placeholder="Seleccione bodega destino" />
              </SelectTrigger>
              <SelectContent>
                {bodegas
                  .filter((b) => b.id !== bodegaOrigen)
                  .map((bodega) => (
                    <SelectItem key={bodega.id} value={bodega.id}>
                      {bodega.nombre}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </FormCard>

      {/* Tabla de productos de la bodega origen */}
      {bodegaOrigen && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">
            Productos en {bodegas.find((b) => b.id === bodegaOrigen)?.nombre}
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
            {productosBodegaOrigen.map((producto) => {
              const estaSeleccionado = productosSeleccionados.has(producto.id);
              const productoSeleccionado = productosSeleccionados.get(producto.id);

              return (
                <TableRow key={producto.id}>
                  <TableCell className="border-r border-border w-12">
                    <Checkbox
                      checked={estaSeleccionado}
                      onCheckedChange={(checked) =>
                        handleSeleccionarProducto(producto.id, checked as boolean)
                      }
                    />
                  </TableCell>
                  <TableCell className="border-r border-border font-medium">
                    {producto.codigo}
                  </TableCell>
                  <TableCell className="border-r border-border">
                    {producto.nombre}
                  </TableCell>
                  <TableCell className="border-r border-border">
                    {producto.cantidad}
                  </TableCell>
                  <TableCell>
                    {estaSeleccionado ? (
                      <Input
                        type="number"
                        min="1"
                        max={producto.cantidad}
                        value={productoSeleccionado?.cantidad || ""}
                        onChange={(e) =>
                          handleCambiarCantidad(producto.id, e.target.value)
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
            })}
          </TableCard>

          {/* Botón Mover */}
          {productosSeleccionados.size > 0 && (
            <div className="flex justify-end">
              <Button onClick={handleMover} className="flex items-center gap-2">
                <ArrowRight className="h-4 w-4" />
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

