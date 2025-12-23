import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import PageContainer from "@/components/PageContainer";
import PageTitle from "@/components/PageTitle";
import FormCard from "@/components/FormCard";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Trash2, Plus } from "lucide-react";

// Datos mock
interface Producto {
  codigo: string;
  nombre: string;
}

interface Bodega {
  id: string;
  nombre: string;
}

interface Cliente {
  id: string;
  nombre: string;
}

const productos: Producto[] = [
  { codigo: "PROD001", nombre: "Producto A" },
  { codigo: "PROD002", nombre: "Producto B" },
  { codigo: "PROD003", nombre: "Producto C" },
  { codigo: "PROD004", nombre: "Producto D" },
  { codigo: "PROD005", nombre: "Producto E" },
];

const bodegas: Bodega[] = [
  { id: "BOD001", nombre: "Bodega Principal" },
  { id: "BOD002", nombre: "Bodega Secundaria" },
  { id: "BOD003", nombre: "Bodega Norte" },
  { id: "BOD004", nombre: "Bodega Sur" },
];

const clientes: Cliente[] = [
  { id: "CLI001", nombre: "Cliente A" },
  { id: "CLI002", nombre: "Cliente B" },
  { id: "CLI003", nombre: "Cliente C" },
  { id: "CLI004", nombre: "Cliente D" },
  { id: "CLI005", nombre: "Cliente E" },
];

interface FilaVenta {
  id: number;
  productoCodigo: string;
  productoNombre: string;
  bodega: string;
  cantidad: string;
  valorUnitario: string;
  descuento: string;
  iva19: boolean;
  impuestoRetencion: boolean;
  valorTotal: number;
  ivaMonto?: number;
  retencionMonto?: number;
  montoDescuento?: number;
}

const VentaProducto = () => {
  // Simular que hay 2 ventas en la BD, entonces el siguiente número sería 3
  const [ventaNumero] = useState(3);
  const [fechaElaboracion, setFechaElaboracion] = useState(new Date().toISOString().split("T")[0]);
  const [cliente, setCliente] = useState("");
  const [descuentoEnPorcentaje, setDescuentoEnPorcentaje] = useState(false);
  const [filas, setFilas] = useState<FilaVenta[]>([
    {
      id: 1,
      productoCodigo: "",
      productoNombre: "",
      bodega: "",
      cantidad: "",
      valorUnitario: "",
      descuento: "",
      iva19: false,
      impuestoRetencion: false,
      valorTotal: 0,
      ivaMonto: 0,
      retencionMonto: 0,
      montoDescuento: 0,
    },
  ]);

  // Calcular valor total de una fila y obtener desglose
  const calcularValorTotal = async (fila: FilaVenta): Promise<{ valorTotal: number; ivaMonto: number; retencionMonto: number; montoDescuento: number }> => {
    try {
      const response = await fetch("http://localhost:4000/api/ventas/calcular-valor-total", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          cantidad: parseFloat(fila.cantidad) || 0,
          valorUnitario: parseFloat(fila.valorUnitario) || 0,
          descuento: parseFloat(fila.descuento) || 0,
          descuentoEnPorcentaje: descuentoEnPorcentaje,
          iva19: fila.iva19,
          impuestoRetencion: fila.impuestoRetencion,
        }),
      });

      if (!response.ok) {
        throw new Error("Error al calcular valor total");
      }

      const data = await response.json();
      return {
        valorTotal: data.valorTotal,
        ivaMonto: data.desglose?.ivaMonto || 0,
        retencionMonto: data.desglose?.retencionMonto || 0,
        montoDescuento: data.desglose?.montoDescuento || 0,
      };
    } catch (error) {
      console.error("Error al calcular valor total:", error);
      // Fallback al cálculo local si el backend no está disponible
      return calcularValorTotalLocal(fila);
    }
  };

  // Cálculo local como fallback
  const calcularValorTotalLocal = (fila: FilaVenta): { valorTotal: number; ivaMonto: number; retencionMonto: number; montoDescuento: number } => {        
    const cantidad = parseFloat(fila.cantidad) || 0;
    const valorUnitario = parseFloat(fila.valorUnitario) || 0;
    const descuento = parseFloat(fila.descuento) || 0;

    let subtotal = cantidad * valorUnitario;
    
    let montoDescuento = 0;
    if (descuentoEnPorcentaje) {
      montoDescuento = (subtotal * descuento) / 100;
    } else {
      montoDescuento = descuento;
    }
    subtotal = subtotal - montoDescuento;

    // Guardar el subtotal después del descuento para calcular impuestos
    const subtotalDespuesDescuento = subtotal;

    let ivaMonto = 0;
    if (fila.iva19) {
      ivaMonto = subtotalDespuesDescuento * 0.19;
      subtotal = subtotal * 1.19;
    }

    let retencionMonto = 0;
    if (fila.impuestoRetencion) {
      // Se resta el 2.5% del subtotal (después del descuento)
      retencionMonto = subtotalDespuesDescuento * 0.025;
      subtotal = subtotal - retencionMonto;
    }

    return {
      valorTotal: Math.round(subtotal * 100) / 100,
      ivaMonto: Math.round(ivaMonto * 100) / 100,
      retencionMonto: Math.round(retencionMonto * 100) / 100,
      montoDescuento: Math.round(montoDescuento * 100) / 100,
    };
  };

  const handleAgregarFila = () => {
    const nuevoId = Math.max(...filas.map((f) => f.id), 0) + 1;
    setFilas([
      ...filas,
      {
        id: nuevoId,
        productoCodigo: "",
        productoNombre: "",
        bodega: "",
        cantidad: "",
        valorUnitario: "",
        descuento: "",
        iva19: false,
        impuestoRetencion: false,
        valorTotal: 0,
      },
    ]);
  };

  const handleEliminarFila = (id: number) => {
    if (filas.length > 1) {
      setFilas(filas.filter((fila) => fila.id !== id));
    }
  };

  const handleCambioProducto = async (id: number, codigo: string) => {
    const producto = productos.find((p) => p.codigo === codigo);
    const nuevaFila = {
      ...filas.find((f) => f.id === id)!,
      productoCodigo: codigo,
      productoNombre: producto ? producto.nombre : "",
    };
    const calculo = await calcularValorTotal(nuevaFila);
    
    setFilas(
      filas.map((fila) => {
        if (fila.id === id) {
          return {
            ...nuevaFila,
            valorTotal: calculo.valorTotal,
            ivaMonto: calculo.ivaMonto,
            retencionMonto: calculo.retencionMonto,
            montoDescuento: calculo.montoDescuento,
          };
        }
        return fila;
      })
    );
  };

  const handleCambioCampo = async (
    id: number,
    campo: keyof FilaVenta,
    valor: string | boolean
  ) => {
    const nuevaFila = { ...filas.find((f) => f.id === id)!, [campo]: valor };
    const calculo = await calcularValorTotal(nuevaFila);
    
    setFilas(
      filas.map((fila) => {
        if (fila.id === id) {
          return {
            ...nuevaFila,
            valorTotal: calculo.valorTotal,
            ivaMonto: calculo.ivaMonto,
            retencionMonto: calculo.retencionMonto,
            montoDescuento: calculo.montoDescuento,
          };
        }
        return fila;
      })
    );
  };

  // Recalcular todas las filas cuando cambie el tipo de descuento (porcentaje o fijo)
  useEffect(() => {
    const recalcularTodasLasFilas = async () => {
      const filasActualizadas = await Promise.all(
        filas.map(async (fila) => {
          // Solo recalcular si la fila tiene datos suficientes
          if (fila.cantidad && fila.valorUnitario) {
            const calculo = await calcularValorTotal(fila);
            return {
              ...fila,
              valorTotal: calculo.valorTotal,
              ivaMonto: calculo.ivaMonto,
              retencionMonto: calculo.retencionMonto,
              montoDescuento: calculo.montoDescuento,
            };
          }
          return fila;
        })
      );
      setFilas(filasActualizadas);
    };

    // Solo recalcular si hay filas con datos
    if (filas.some(f => f.cantidad && f.valorUnitario)) {
      recalcularTodasLasFilas();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [descuentoEnPorcentaje]);

  return (
    <PageContainer>
      <PageTitle title="Venta de Producto" />

      {/* Formulario principal */}
      <FormCard title="Datos de la Venta">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="fechaElaboracion">Fecha de Elaboración</Label>
            <Input
              id="fechaElaboracion"
              type="date"
              value={fechaElaboracion}
              onChange={(e) => setFechaElaboracion(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="cliente">Cliente</Label>
            <Select value={cliente} onValueChange={setCliente}>
              <SelectTrigger id="cliente">
                <SelectValue placeholder="Seleccione cliente" />
              </SelectTrigger>
              <SelectContent>
                {clientes.map((cli) => (
                  <SelectItem key={cli.id} value={cli.id}>
                    {cli.nombre}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="ventaNumero">Número</Label>
            <Input
              id="ventaNumero"
              type="text"
              value={ventaNumero}
              disabled
              className="bg-muted"
            />
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <Checkbox
            id="descuentoPorcentaje"
            checked={descuentoEnPorcentaje}
            onCheckedChange={(checked) => setDescuentoEnPorcentaje(checked as boolean)}
          />
          <Label htmlFor="descuentoPorcentaje" className="cursor-pointer">
            Descuento en porcentaje
          </Label>
        </div>
      </FormCard>

      {/* Tabla de productos */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Productos</CardTitle>
          <Button onClick={handleAgregarFila} size="sm" className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Agregar Fila
          </Button>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="border-r border-border w-12">#</TableHead>
                  <TableHead className="border-r border-border">Código Producto</TableHead>
                  <TableHead className="border-r border-border">Producto</TableHead>
                  <TableHead className="border-r border-border">Bodega</TableHead>
                  <TableHead className="border-r border-border">Cantidad</TableHead>
                  <TableHead className="border-r border-border">Valor Unitario</TableHead>
                  <TableHead className="border-r border-border">Descuento</TableHead>
                  <TableHead className="border-r border-border">Subtotal</TableHead>
                  <TableHead className="border-r border-border">IVA 19%</TableHead>
                  <TableHead className="border-r border-border">Imp. Retención 2.5%</TableHead>
                  <TableHead className="border-r border-border">Valor Total</TableHead>
                  <TableHead className="w-16">Acción</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filas.map((fila, index) => (
                  <TableRow key={fila.id}>
                    <TableCell className="border-r border-border text-center font-medium">
                      {index + 1}
                    </TableCell>
                    <TableCell className="border-r border-border p-2">
                      <Select
                        value={fila.productoCodigo}
                        onValueChange={(value) => handleCambioProducto(fila.id, value)}
                      >
                        <SelectTrigger className="h-9">
                          <SelectValue placeholder="Código" />
                        </SelectTrigger>
                        <SelectContent>
                          {productos.map((prod) => (
                            <SelectItem key={prod.codigo} value={prod.codigo}>
                              {prod.codigo}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </TableCell>
                    <TableCell className="border-r border-border">
                      <Input
                        value={fila.productoNombre}
                        disabled
                        className="bg-muted"
                      />
                    </TableCell>
                    <TableCell className="border-r border-border p-2">
                      <Select
                        value={fila.bodega}
                        onValueChange={(value) =>
                          handleCambioCampo(fila.id, "bodega", value)
                        }
                      >
                        <SelectTrigger className="h-9">
                          <SelectValue placeholder="Bodega" />
                        </SelectTrigger>
                        <SelectContent>
                          {bodegas.map((bod) => (
                            <SelectItem key={bod.id} value={bod.id}>
                              {bod.nombre}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </TableCell>
                    <TableCell className="border-r border-border p-2">
                      <Input
                        type="number"
                        value={fila.cantidad}
                        onChange={(e) =>
                          handleCambioCampo(fila.id, "cantidad", e.target.value)
                        }
                        className="h-9"
                        placeholder="0"
                      />
                    </TableCell>
                    <TableCell className="border-r border-border p-2">
                      <Input
                        type="number"
                        value={fila.valorUnitario}
                        onChange={(e) =>
                          handleCambioCampo(fila.id, "valorUnitario", e.target.value)
                        }
                        className="h-9"
                        placeholder="0"
                      />
                    </TableCell>
                    <TableCell className="border-r border-border p-2">
                      <Input
                        type="number"
                        value={fila.descuento}
                        onChange={(e) =>
                          handleCambioCampo(fila.id, "descuento", e.target.value)
                        }
                        className="h-9"
                        placeholder={descuentoEnPorcentaje ? "0%" : "0"}
                      />
                    </TableCell>
                    <TableCell className="border-r border-border font-medium text-center">
                      ${(() => {
                        const cantidad = parseFloat(fila.cantidad) || 0;
                        const valorUnitario = parseFloat(fila.valorUnitario) || 0;
                        const subtotal = (cantidad * valorUnitario) - (fila.montoDescuento || 0);
                        return subtotal.toLocaleString("es-CO", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
                      })()}
                    </TableCell>
                    <TableCell className="border-r border-border">
                      <div className="flex flex-col items-center gap-1">
                        <Checkbox
                          checked={fila.iva19}
                          onCheckedChange={(checked) =>
                            handleCambioCampo(fila.id, "iva19", checked as boolean)
                          }
                        />
                        {fila.iva19 && fila.ivaMonto && fila.ivaMonto > 0 && (
                          <span className="text-xs text-muted-foreground">
                            ${fila.ivaMonto.toLocaleString("es-CO", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                          </span>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="border-r border-border">
                      <div className="flex flex-col items-center gap-1">
                        <Checkbox
                          checked={fila.impuestoRetencion}
                          onCheckedChange={(checked) =>
                            handleCambioCampo(
                              fila.id,
                              "impuestoRetencion",
                              checked as boolean
                            )
                          }
                        />
                        {fila.impuestoRetencion && fila.retencionMonto && fila.retencionMonto > 0 && (
                          <span className="text-xs text-muted-foreground">
                            ${fila.retencionMonto.toLocaleString("es-CO", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                          </span>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="border-r border-border font-medium">
                      ${fila.valorTotal.toLocaleString("es-CO", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </TableCell>
                    <TableCell className="text-center">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEliminarFila(fila.id)}
                        disabled={filas.length === 1}
                        className="h-8 w-8 p-0"
                      >
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
                {/* Fila de totales */}
                <TableRow className="bg-muted/50 font-bold">
                  <TableCell colSpan={5} className="border-r border-border text-right pr-4">
                    TOTAL
                  </TableCell>
                  <TableCell className="border-r border-border font-bold text-center">
                    ${filas.reduce((sum, fila) => {
                      const cantidad = parseFloat(fila.cantidad) || 0;
                      const valorUnitario = parseFloat(fila.valorUnitario) || 0;
                      return sum + (cantidad * valorUnitario);
                    }, 0).toLocaleString("es-CO", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </TableCell>
                  <TableCell className="border-r border-border font-bold text-center">
                    ${filas.reduce((sum, fila) => sum + (fila.montoDescuento || 0), 0).toLocaleString("es-CO", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </TableCell>
                  <TableCell className="border-r border-border font-bold text-center">
                    ${filas.reduce((sum, fila) => {
                      const cantidad = parseFloat(fila.cantidad) || 0;
                      const valorUnitario = parseFloat(fila.valorUnitario) || 0;
                      const subtotal = (cantidad * valorUnitario) - (fila.montoDescuento || 0);
                      return sum + subtotal;
                    }, 0).toLocaleString("es-CO", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </TableCell>
                  <TableCell className="border-r border-border font-bold text-center">
                    ${filas.reduce((sum, fila) => sum + (fila.ivaMonto || 0), 0).toLocaleString("es-CO", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </TableCell>
                  <TableCell className="border-r border-border font-bold text-center">
                    ${filas.reduce((sum, fila) => sum + (fila.retencionMonto || 0), 0).toLocaleString("es-CO", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </TableCell>
                  <TableCell className="border-r border-border font-bold text-lg text-center">
                    ${filas.reduce((sum, fila) => sum + fila.valorTotal, 0).toLocaleString("es-CO", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </PageContainer>
  );
};

export default VentaProducto;

