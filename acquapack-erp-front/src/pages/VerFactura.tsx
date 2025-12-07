import { useState } from "react";
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
import { Eye } from "lucide-react";
import SearchBar from "@/components/SearchBar";
import PageContainer from "@/components/PageContainer";
import PageTitle from "@/components/PageTitle";
import TableCard from "@/components/TableCard";

// Datos mock de productos de factura
interface ProductoFactura {
  producto: string;
  bodega: string;
  cantidad: number;
  valorUnitario: number;
  valorTotal: number;
}

// Datos mock de facturas
interface Factura {
  id: number;
  fecha: string;
  proveedor: string;
  numeroFacturaLetras: string;
  numeroFacturaNumeros: string;
  productos: ProductoFactura[];
}

const facturasIniciales: Factura[] = [
  {
    id: 1,
    fecha: "2024-01-15",
    proveedor: "Proveedor A",
    numeroFacturaLetras: "FAC",
    numeroFacturaNumeros: "001",
    productos: [
      { producto: "Producto A", bodega: "Bodega Principal", cantidad: 10, valorUnitario: 50000, valorTotal: 500000 },
      { producto: "Producto B", bodega: "Bodega Secundaria", cantidad: 5, valorUnitario: 30000, valorTotal: 150000 },
    ],
  },
  {
    id: 2,
    fecha: "2024-01-20",
    proveedor: "Proveedor B",
    numeroFacturaLetras: "FAC",
    numeroFacturaNumeros: "002",
    productos: [
      { producto: "Producto C", bodega: "Bodega Principal", cantidad: 20, valorUnitario: 25000, valorTotal: 500000 },
    ],
  },
  {
    id: 3,
    fecha: "2024-02-05",
    proveedor: "Proveedor A",
    numeroFacturaLetras: "INV",
    numeroFacturaNumeros: "100",
    productos: [
      { producto: "Producto D", bodega: "Bodega Norte", cantidad: 15, valorUnitario: 40000, valorTotal: 600000 },
      { producto: "Producto E", bodega: "Bodega Sur", cantidad: 8, valorUnitario: 35000, valorTotal: 280000 },
      { producto: "Producto F", bodega: "Bodega Principal", cantidad: 12, valorUnitario: 45000, valorTotal: 540000 },
    ],
  },
  {
    id: 4,
    fecha: "2024-02-10",
    proveedor: "Proveedor C",
    numeroFacturaLetras: "FAC",
    numeroFacturaNumeros: "003",
    productos: [
      { producto: "Producto G", bodega: "Bodega Secundaria", cantidad: 25, valorUnitario: 20000, valorTotal: 500000 },
    ],
  },
  {
    id: 5,
    fecha: "2024-02-15",
    proveedor: "Proveedor B",
    numeroFacturaLetras: "FAC",
    numeroFacturaNumeros: "004",
    productos: [
      { producto: "Producto H", bodega: "Bodega Principal", cantidad: 30, valorUnitario: 15000, valorTotal: 450000 },
      { producto: "Producto I", bodega: "Bodega Norte", cantidad: 18, valorUnitario: 28000, valorTotal: 504000 },
    ],
  },
];

const VerFactura = () => {
  const [busqueda, setBusqueda] = useState("");
  const [facturaSeleccionada, setFacturaSeleccionada] = useState<Factura | null>(null);
  const [mostrarDialogo, setMostrarDialogo] = useState(false);

  // Filtrar facturas según búsqueda
  const facturasFiltradas = facturasIniciales.filter((factura) =>
    factura.id.toString().includes(busqueda) ||
    factura.fecha.includes(busqueda) ||
    factura.proveedor.toLowerCase().includes(busqueda.toLowerCase()) ||
    factura.numeroFacturaLetras.toLowerCase().includes(busqueda.toLowerCase()) ||
    factura.numeroFacturaNumeros.includes(busqueda)
  );

  const handleVerDetalle = (factura: Factura) => {
    setFacturaSeleccionada(factura);
    setMostrarDialogo(true);
  };

  return (
    <PageContainer>
      <PageTitle title="Ver Facturas" />

      {/* Barra de búsqueda */}
      <SearchBar
        placeholder="Buscar por ID, fecha, proveedor o número de factura..."
        value={busqueda}
        onChange={setBusqueda}
      />

      {/* Tabla */}
      <TableCard
        headers={["Acción", "ID Factura", "Fecha", "Proveedor", "Número Factura Proveedor"]}
        emptyMessage={facturasFiltradas.length === 0 ? "No se encontraron facturas" : undefined}
        colSpan={5}
      >
        {facturasFiltradas.map((factura) => (
          <TableRow key={factura.id}>
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
              {factura.id}
            </TableCell>
            <TableCell className="border-r border-border">
              {new Date(factura.fecha).toLocaleDateString("es-ES")}
            </TableCell>
            <TableCell className="border-r border-border">
              {factura.proveedor}
            </TableCell>
            <TableCell>
              {factura.numeroFacturaLetras} - {factura.numeroFacturaNumeros}
            </TableCell>
          </TableRow>
        ))}
      </TableCard>

      {/* Diálogo para ver detalles de la factura */}
      <Dialog open={mostrarDialogo} onOpenChange={setMostrarDialogo}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Detalles de la Factura</DialogTitle>
            <DialogDescription>
              Información completa de la factura #{facturaSeleccionada?.id}
            </DialogDescription>
          </DialogHeader>
          {facturaSeleccionada && (
            <div className="space-y-6 mt-4">
              {/* Información de la factura */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">ID Factura</p>
                  <p className="text-lg font-semibold">{facturaSeleccionada.id}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Fecha</p>
                  <p className="text-lg font-semibold">
                    {new Date(facturaSeleccionada.fecha).toLocaleDateString("es-ES", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Proveedor</p>
                  <p className="text-lg font-semibold">{facturaSeleccionada.proveedor}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Número Factura Proveedor</p>
                  <p className="text-lg font-semibold">
                    {facturaSeleccionada.numeroFacturaLetras} - {facturaSeleccionada.numeroFacturaNumeros}
                  </p>
                </div>
              </div>

              {/* Tabla de productos */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Productos</h3>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="border-r border-border">Producto</TableHead>
                      <TableHead className="border-r border-border">Bodega</TableHead>
                      <TableHead className="border-r border-border">Cantidad</TableHead>
                      <TableHead className="border-r border-border">Valor Unitario</TableHead>
                      <TableHead>Valor Total</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {facturaSeleccionada.productos.map((producto, index) => (
                      <TableRow key={index}>
                        <TableCell className="border-r border-border font-medium">
                          {producto.producto}
                        </TableCell>
                        <TableCell className="border-r border-border">
                          {producto.bodega}
                        </TableCell>
                        <TableCell className="border-r border-border">
                          {producto.cantidad}
                        </TableCell>
                        <TableCell className="border-r border-border">
                          ${producto.valorUnitario.toLocaleString("es-CO")}
                        </TableCell>
                        <TableCell className="font-semibold">
                          ${producto.valorTotal.toLocaleString("es-CO")}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </PageContainer>
  );
};

export default VerFactura;

