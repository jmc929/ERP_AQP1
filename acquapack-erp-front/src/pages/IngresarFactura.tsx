import { useState } from "react";
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

interface Proveedor {
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

const proveedores: Proveedor[] = [
  { id: "PROV001", nombre: "Proveedor A" },
  { id: "PROV002", nombre: "Proveedor B" },
  { id: "PROV003", nombre: "Proveedor C" },
];

interface FilaFactura {
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
}

const IngresarFactura = () => {
  // Simular que hay 2 facturas en la BD, entonces el siguiente ID sería 3
  const [facturaId] = useState(3);
  const [fecha, setFecha] = useState(new Date().toISOString().split("T")[0]);
  const [proveedor, setProveedor] = useState("");
  const [numeroFacturaLetras, setNumeroFacturaLetras] = useState("");
  const [numeroFacturaNumeros, setNumeroFacturaNumeros] = useState("");
  const [descuentoEnPorcentaje, setDescuentoEnPorcentaje] = useState(false);
  const [filas, setFilas] = useState<FilaFactura[]>([
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
    },
  ]);

  // Calcular valor total de una fila
  const calcularValorTotal = async (fila: FilaFactura): Promise<number> => {
    try {
      const response = await fetch("http://localhost:4000/api/compras/calcular-valor-total", {
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
      return data.valorTotal;
    } catch (error) {
      console.error("Error al calcular valor total:", error);
      // Fallback al cálculo local si el backend no está disponible
      return calcularValorTotalLocal(fila);
    }
  };

  // Cálculo local como fallback
  const calcularValorTotalLocal = (fila: FilaFactura): number => {
    const cantidad = parseFloat(fila.cantidad) || 0;
    const valorUnitario = parseFloat(fila.valorUnitario) || 0;
    const descuento = parseFloat(fila.descuento) || 0;

    let subtotal = cantidad * valorUnitario;
    subtotal = subtotal - descuento;

    if (fila.iva19) {
      subtotal = subtotal * 1.19;
    }

    if (fila.impuestoRetencion) {
      // Se suma el 2.5% del valor unitario por cada unidad
      const retencion = (valorUnitario * 0.025) * cantidad;
      subtotal = subtotal + retencion;
    }

    return Math.round(subtotal * 100) / 100; // Redondear a 2 decimales
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
    const valorTotal = await calcularValorTotal(nuevaFila);
    
    setFilas(
      filas.map((fila) => {
        if (fila.id === id) {
          return {
            ...nuevaFila,
            valorTotal,
          };
        }
        return fila;
      })
    );
  };

  const handleCambioCampo = async (
    id: number,
    campo: keyof FilaFactura,
    valor: string | boolean
  ) => {
    const nuevaFila = { ...filas.find((f) => f.id === id)!, [campo]: valor };
    const valorTotal = await calcularValorTotal(nuevaFila);
    
    setFilas(
      filas.map((fila) => {
        if (fila.id === id) {
          return {
            ...nuevaFila,
            valorTotal,
          };
        }
        return fila;
      })
    );
  };

  return (
    <PageContainer>
      <PageTitle title="Ingresar Factura" />

      {/* Formulario principal */}
      <FormCard title="Datos de la Factura">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="space-y-2">
              <Label htmlFor="fecha">Fecha</Label>
              <Input
                id="fecha"
                type="date"
                value={fecha}
                onChange={(e) => setFecha(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="proveedor">Proveedor</Label>
              <Select value={proveedor} onValueChange={setProveedor}>
                <SelectTrigger id="proveedor">
                  <SelectValue placeholder="Seleccione proveedor" />
                </SelectTrigger>
                <SelectContent>
                  {proveedores.map((prov) => (
                    <SelectItem key={prov.id} value={prov.id}>
                      {prov.nombre}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="facturaId">ID Factura</Label>
              <Input
                id="facturaId"
                type="text"
                value={facturaId}
                disabled
                className="bg-muted"
              />
            </div>

            <div className="space-y-2">
              <Label>Número Factura Proveedor</Label>
              <div className="flex gap-2">
                <Input
                  placeholder="Letras"
                  value={numeroFacturaLetras}
                  onChange={(e) => setNumeroFacturaLetras(e.target.value)}
                  className="flex-1"
                />
                <Input
                  placeholder="Números"
                  type="text"
                  value={numeroFacturaNumeros}
                  onChange={(e) => setNumeroFacturaNumeros(e.target.value)}
                  className="flex-1"
                />
              </div>
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
                    <TableCell className="border-r border-border text-center">
                      <Checkbox
                        checked={fila.iva19}
                        onCheckedChange={(checked) =>
                          handleCambioCampo(fila.id, "iva19", checked as boolean)
                        }
                      />
                    </TableCell>
                    <TableCell className="border-r border-border text-center">
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
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </PageContainer>
  );
};

export default IngresarFactura;

