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

// Datos mock de productos de venta
interface ProductoVenta {
  producto: string;
  bodega: string;
  cantidad: number;
  valorUnitario: number;
  valorTotal: number;
}

// Datos mock de ventas
interface Venta {
  id: number;
  fecha: string;
  cliente: string;
  vendedor: string;
  numero: number;
  productos: ProductoVenta[];
}

const ventasIniciales: Venta[] = [
  {
    id: 1,
    fecha: "2024-01-15",
    cliente: "Cliente A",
    vendedor: "Vendedor A",
    numero: 1,
    productos: [
      { producto: "Producto A", bodega: "Bodega Principal", cantidad: 10, valorUnitario: 50000, valorTotal: 500000 },
      { producto: "Producto B", bodega: "Bodega Secundaria", cantidad: 5, valorUnitario: 30000, valorTotal: 150000 },
    ],
  },
  {
    id: 2,
    fecha: "2024-01-16",
    cliente: "Cliente B",
    vendedor: "Vendedor B",
    numero: 2,
    productos: [
      { producto: "Producto C", bodega: "Bodega Norte", cantidad: 8, valorUnitario: 40000, valorTotal: 320000 },
      { producto: "Producto D", bodega: "Bodega Sur", cantidad: 12, valorUnitario: 25000, valorTotal: 300000 },
      { producto: "Producto E", bodega: "Bodega Principal", cantidad: 3, valorUnitario: 60000, valorTotal: 180000 },
    ],
  },
  {
    id: 3,
    fecha: "2024-01-17",
    cliente: "Cliente C",
    vendedor: "Vendedor A",
    numero: 3,
    productos: [
      { producto: "Producto A", bodega: "Bodega Principal", cantidad: 15, valorUnitario: 50000, valorTotal: 750000 },
    ],
  },
  {
    id: 4,
    fecha: "2024-01-18",
    cliente: "Cliente D",
    vendedor: "Vendedor C",
    numero: 4,
    productos: [
      { producto: "Producto B", bodega: "Bodega Secundaria", cantidad: 20, valorUnitario: 30000, valorTotal: 600000 },
      { producto: "Producto C", bodega: "Bodega Norte", cantidad: 7, valorUnitario: 40000, valorTotal: 280000 },
    ],
  },
  {
    id: 5,
    fecha: "2024-01-19",
    cliente: "Cliente E",
    vendedor: "Vendedor B",
    numero: 5,
    productos: [
      { producto: "Producto D", bodega: "Bodega Sur", cantidad: 6, valorUnitario: 25000, valorTotal: 150000 },
      { producto: "Producto E", bodega: "Bodega Principal", cantidad: 9, valorUnitario: 60000, valorTotal: 540000 },
      { producto: "Producto A", bodega: "Bodega Principal", cantidad: 4, valorUnitario: 50000, valorTotal: 200000 },
    ],
  },
];

const VerVentas = () => {
  const [busqueda, setBusqueda] = useState("");
  const [mostrarDialogo, setMostrarDialogo] = useState(false);
  const [ventaSeleccionada, setVentaSeleccionada] = useState<Venta | null>(null);

  // Filtrar ventas según búsqueda
  const ventasFiltradas = ventasIniciales.filter((venta) =>
    venta.id.toString().includes(busqueda) ||
    venta.numero.toString().includes(busqueda) ||
    venta.fecha.includes(busqueda) ||
    venta.cliente.toLowerCase().includes(busqueda.toLowerCase()) ||
    venta.vendedor.toLowerCase().includes(busqueda.toLowerCase())
  );

  const handleVerDetalle = (venta: Venta) => {
    setVentaSeleccionada(venta);
    setMostrarDialogo(true);
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
        headers={["Acción", "ID Venta", "Fecha", "Cliente", "Vendedor"]}
        emptyMessage={ventasFiltradas.length === 0 ? "No se encontraron ventas" : undefined}
        colSpan={5}
      >
        {ventasFiltradas.map((venta) => (
          <TableRow key={venta.id}>
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
              {venta.id}
            </TableCell>
            <TableCell className="border-r border-border">
              {new Date(venta.fecha).toLocaleDateString("es-ES")}
            </TableCell>
            <TableCell className="border-r border-border">
              {venta.cliente}
            </TableCell>
            <TableCell>
              {venta.vendedor}
            </TableCell>
          </TableRow>
        ))}
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
          {ventaSeleccionada && (
            <div className="space-y-6">
              {/* Información de la venta */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">ID Venta</p>
                  <p className="text-lg font-semibold">{ventaSeleccionada.id}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Número</p>
                  <p className="text-lg font-semibold">{ventaSeleccionada.numero}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Fecha</p>
                  <p className="text-lg font-semibold">
                    {new Date(ventaSeleccionada.fecha).toLocaleDateString("es-ES", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Cliente</p>
                  <p className="text-lg font-semibold">{ventaSeleccionada.cliente}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Vendedor</p>
                  <p className="text-lg font-semibold">{ventaSeleccionada.vendedor}</p>
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
                    {ventaSeleccionada.productos.map((producto, index) => (
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

export default VerVentas;

