import { useState, useEffect, useMemo } from "react";
import {
  Table,
  TableCell,
  TableRow,
  TableBody,
  TableHead,
  TableHeader,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Loader2, Eye, TrendingUp, TrendingDown } from "lucide-react";
import SearchBar from "@/components/SearchBar";
import PageContainer from "@/components/PageContainer";
import PageTitle from "@/components/PageTitle";
import TableCard from "@/components/TableCard";
import Pagination from "@/components/Pagination";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "@/config/api";

interface Caja {
  id_caja: number;
  nombre: string;
  descripcion: string | null;
  saldo_actual: number;
  id_estado: number;
  estado_nombre?: string;
  estado_color?: string;
}

interface MovimientoHistorial {
  id_movimiento_caja: number;
  id_caja: number;
  id_tipo_movimiento: number;
  tipo_movimiento_nombre: string;
  monto: number;
  descripcion: string | null;
  fecha_hora: string;
  id_usuario: number;
  usuario_nombre: string;
  observaciones: string | null;
  id_estado: number;
  estado_nombre: string;
  saldo_despues: number;
  es_ingreso: boolean;
}

const VerCajas = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [busqueda, setBusqueda] = useState("");
  const [cajas, setCajas] = useState<Caja[]>([]);
  const [loading, setLoading] = useState(true);
  const [pagina, setPagina] = useState(1);
  const cajasPorPagina = 20;
  const [mostrarDialogoMovimientos, setMostrarDialogoMovimientos] = useState(false);
  const [cajaSeleccionada, setCajaSeleccionada] = useState<Caja | null>(null);
  const [historialMovimientos, setHistorialMovimientos] = useState<MovimientoHistorial[]>([]);
  const [cargandoHistorial, setCargandoHistorial] = useState(false);

  useEffect(() => {
    cargarCajas();
  }, []);

  const cargarCajas = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/api/cajas`);
      
      if (!response.ok) {
        throw new Error("Error al cargar las cajas");
      }

      const data = await response.json();
      
      if (data.success) {
        setCajas(data.cajas || []);
      } else {
        throw new Error(data.message || "Error al cargar las cajas");
      }
    } catch (error) {
      console.error("Error al cargar cajas:", error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "No se pudieron cargar las cajas",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  // Filtrar cajas por búsqueda
  const cajasFiltradas = useMemo(() => {
    if (!busqueda.trim()) {
      return cajas;
    }

    const busquedaLower = busqueda.toLowerCase();
    return cajas.filter(
      (caja) =>
        caja.nombre?.toLowerCase().includes(busquedaLower) ||
        caja.descripcion?.toLowerCase().includes(busquedaLower)
    );
  }, [cajas, busqueda]);

  // Calcular paginación
  const totalPaginas = Math.ceil(cajasFiltradas.length / cajasPorPagina);
  const inicio = (pagina - 1) * cajasPorPagina;
  const fin = inicio + cajasPorPagina;
  const cajasPaginadas = cajasFiltradas.slice(inicio, fin);

  // Resetear a página 1 cuando cambia la búsqueda
  useEffect(() => {
    setPagina(1);
  }, [busqueda]);

  // Formatear números con separadores de miles y decimales
  const formatearNumero = (valor: number, decimales: number = 2): string => {
    return new Intl.NumberFormat("es-CO", {
      minimumFractionDigits: decimales,
      maximumFractionDigits: decimales,
    }).format(valor);
  };

  // Calcular totales
  const totales = useMemo(() => {
    return {
      saldoTotal: cajasFiltradas.reduce((sum, c) => sum + (c.saldo_actual || 0), 0),
    };
  }, [cajasFiltradas]);

  const handleVerMovimientos = async (caja: Caja) => {
    setCajaSeleccionada(caja);
    setMostrarDialogoMovimientos(true);
    setCargandoHistorial(true);
    
    try {
      const response = await fetch(`${API_BASE_URL}/api/cajas/${caja.id_caja}/historial`);
      
      if (!response.ok) {
        throw new Error("Error al cargar el historial");
      }

      const data = await response.json();
      
      if (data.success) {
        setHistorialMovimientos(data.historial || []);
      } else {
        throw new Error(data.message || "Error al cargar el historial");
      }
    } catch (error) {
      console.error("Error al cargar historial:", error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "No se pudo cargar el historial",
        variant: "destructive",
      });
      setHistorialMovimientos([]);
    } finally {
      setCargandoHistorial(false);
    }
  };

  return (
    <PageContainer>
      <PageTitle>Ver Cajas</PageTitle>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <SearchBar
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            placeholder="Buscar por nombre o descripción..."
            className="max-w-md"
          />
          <div className="text-sm text-muted-foreground">
            Mostrando {cajasPaginadas.length > 0 ? inicio + 1 : 0}-{Math.min(fin, cajasFiltradas.length)} de {cajasFiltradas.length} cajas
            {cajas.length !== cajasFiltradas.length && ` (${cajas.length} total)`}
          </div>
        </div>

        <TableCard
          headers={[
            "ID",
            "Nombre",
            "Descripción",
            "Saldo Actual",
            "Estado",
            "Acciones",
          ]}
          emptyMessage={
            loading
              ? undefined
              : cajasFiltradas.length === 0
              ? busqueda
                ? "No se encontraron cajas que coincidan con la búsqueda"
                : "No hay cajas registradas"
              : undefined
          }
          colSpan={6}
        >
          {loading ? (
            <TableRow>
              <TableCell colSpan={6} className="text-center py-12">
                <Loader2 className="h-8 w-8 animate-spin mx-auto text-muted-foreground" />
              </TableCell>
            </TableRow>
          ) : (
            cajasPaginadas.map((caja) => (
              <TableRow key={caja.id_caja}>
                <TableCell className="font-medium">{caja.id_caja}</TableCell>
                <TableCell>{caja.nombre}</TableCell>
                <TableCell className="max-w-md">
                  <p className="truncate">{caja.descripcion || "-"}</p>
                </TableCell>
                <TableCell className="font-medium">
                  ${formatearNumero(caja.saldo_actual)}
                </TableCell>
                <TableCell>
                  {caja.estado_color ? (
                    <span
                      className="px-2 py-1 rounded-full text-xs font-medium"
                      style={{
                        backgroundColor: `${caja.estado_color}20`,
                        color: caja.estado_color,
                      }}
                    >
                      {caja.estado_nombre || "Sin estado"}
                    </span>
                  ) : (
                    <span className="text-muted-foreground">-</span>
                  )}
                </TableCell>
                <TableCell>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleVerMovimientos(caja)}
                  >
                    <Eye className="h-4 w-4 mr-2" />
                    Ver Movimientos
                  </Button>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableCard>

        {!loading && cajasFiltradas.length > 0 && (
          <div className="flex items-center justify-between border-t pt-4">
            <div className="text-sm text-muted-foreground">
              <span className="font-medium">Saldo Total:</span> ${formatearNumero(totales.saldoTotal)}
            </div>
            <Pagination
              paginaActual={pagina}
              totalPaginas={totalPaginas}
              onCambiarPagina={setPagina}
            />
          </div>
        )}
      </div>

      {/* Dialog para mostrar historial de movimientos */}
      {mostrarDialogoMovimientos && (
        <Dialog open={mostrarDialogoMovimientos} onOpenChange={setMostrarDialogoMovimientos}>
          <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                Historial de Movimientos - {cajaSeleccionada?.nombre || "Caja"}
              </DialogTitle>
              <DialogDescription>
                Historial completo de movimientos con saldo acumulado
              </DialogDescription>
            </DialogHeader>

            {cargandoHistorial ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
              </div>
            ) : historialMovimientos.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">
                No hay movimientos registrados para esta caja
              </div>
            ) : (
              <div className="space-y-4">
                <div className="border rounded-lg overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[120px]">Fecha y Hora</TableHead>
                        <TableHead className="w-[120px]">Tipo</TableHead>
                        <TableHead className="w-[150px]">Monto</TableHead>
                        <TableHead>Descripción</TableHead>
                        <TableHead>Observaciones</TableHead>
                        <TableHead className="w-[150px]">Usuario</TableHead>
                        <TableHead className="w-[150px]">Saldo Después</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {historialMovimientos.map((movimiento) => {
                        try {
                          const esIngreso = movimiento.es_ingreso ?? (movimiento.tipo_movimiento_nombre?.toLowerCase().includes("ingreso") ?? false);
                          const monto = parseFloat(movimiento.monto?.toString() || "0") || 0;
                          const saldoDespues = parseFloat(movimiento.saldo_despues?.toString() || "0") || 0;
                          
                          return (
                            <TableRow key={movimiento.id_movimiento_caja}>
                              <TableCell className="font-medium">
                                {movimiento.fecha_hora 
                                  ? (() => {
                                      // La fecha viene como "timestamp without time zone" en hora local de Colombia
                                      // Simplemente formatearla sin conversión de timezone
                                      const fechaStr = movimiento.fecha_hora;
                                      const fecha = new Date(fechaStr);
                                      return fecha.toLocaleString("es-CO", {
                                        year: "numeric",
                                        month: "2-digit",
                                        day: "2-digit",
                                        hour: "2-digit",
                                        minute: "2-digit"
                                      });
                                    })()
                                  : "-"}
                              </TableCell>
                              <TableCell>
                                <div className="flex items-center gap-2">
                                  {esIngreso ? (
                                    <TrendingUp className="h-4 w-4 text-green-600" />
                                  ) : (
                                    <TrendingDown className="h-4 w-4 text-red-600" />
                                  )}
                                  <span
                                    className={`font-medium ${
                                      esIngreso ? "text-green-600" : "text-red-600"
                                    }`}
                                  >
                                    {movimiento.tipo_movimiento_nombre || "-"}
                                  </span>
                                </div>
                              </TableCell>
                              <TableCell className="font-medium">
                                <span
                                  className={esIngreso ? "text-green-600" : "text-red-600"}
                                >
                                  {esIngreso ? "+" : "-"}${formatearNumero(monto)}
                                </span>
                              </TableCell>
                              <TableCell className="max-w-md">
                                <p className="truncate">{movimiento.descripcion || "-"}</p>
                              </TableCell>
                              <TableCell className="max-w-md">
                                <p className="truncate">{movimiento.observaciones || "-"}</p>
                              </TableCell>
                              <TableCell>{movimiento.usuario_nombre || "-"}</TableCell>
                              <TableCell className="font-bold">
                                ${formatearNumero(saldoDespues)}
                              </TableCell>
                            </TableRow>
                          );
                        } catch (error) {
                          console.error("Error al renderizar movimiento:", error, movimiento);
                          return (
                            <TableRow key={movimiento.id_movimiento_caja}>
                              <TableCell colSpan={7} className="text-center text-red-500">
                                Error al mostrar este movimiento
                              </TableCell>
                            </TableRow>
                          );
                        }
                      })}
                    </TableBody>
                  </Table>
                </div>

                {cajaSeleccionada && (
                  <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
                    <div>
                      <span className="text-sm text-muted-foreground">Saldo Actual:</span>
                      <span className="ml-2 text-lg font-bold">
                        ${formatearNumero(cajaSeleccionada.saldo_actual)}
                      </span>
                    </div>
                    <div>
                      <span className="text-sm text-muted-foreground">Total Movimientos:</span>
                      <span className="ml-2 font-medium">{historialMovimientos.length}</span>
                    </div>
                  </div>
                )}
              </div>
            )}
          </DialogContent>
        </Dialog>
      )}
    </PageContainer>
  );
};

export default VerCajas;

