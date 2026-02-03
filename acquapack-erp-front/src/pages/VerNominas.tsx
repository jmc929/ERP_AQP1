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
import { Card, CardContent } from "@/components/ui/card";
import { Eye, Loader2 } from "lucide-react";
import SearchBar from "@/components/SearchBar";
import PageContainer from "@/components/PageContainer";
import PageTitle from "@/components/PageTitle";
import { useToast } from "@/hooks/use-toast";

interface DetalleHora {
  id_detalle_nomina: number;
  id_tipo_hora: number;
  cantidad_horas: number;
  valor_hora: number;
  total: number;
  tipo_hora_nombre: string;
  horario: string | null;
  recargo: string | null;
}

interface DetalleDeduccion {
  id_detalle_deducciones: number;
  id_tipo_deduccion: number;
  valor_deduccion: number;
  observaciones: string | null;
  tipo_deduccion_nombre: string;
  tipo_deduccion_descripcion: string | null;
}

interface Nomina {
  id_nomina: number;
  id_usuario_trabajador: number;
  periodo_inicio: string;
  periodo_fin: string;
  fecha_nomina: string;
  id_estado: number;
  total_bruto_nomina: number;
  total_deducciones: number;
  valor_auxilio_transporte: number;
  total_pagar: number;
  id_usuario_creador: number;
  observaciones: string | null;
  nombre_trabajador: string;
  estado_nombre: string;
  estado_color: string;
  nombre_creador: string;
  documento_trabajador?: string;
}

interface NominaCompleta extends Nomina {
  detalles_horas: DetalleHora[];
  detalles_deducciones: DetalleDeduccion[];
}

const VerNominas = () => {
  const { toast } = useToast();
  const [busqueda, setBusqueda] = useState("");
  const [mostrarDialogo, setMostrarDialogo] = useState(false);
  const [nominaCompleta, setNominaCompleta] = useState<NominaCompleta | null>(null);
  const [nominas, setNominas] = useState<Nomina[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingDetalle, setLoadingDetalle] = useState(false);

  // Cargar nóminas desde la API
  useEffect(() => {
    const cargarNominas = async () => {
      try {
        setLoading(true);
        const response = await fetch("http://localhost:4000/api/nomina");
        
        if (!response.ok) {
          throw new Error(`Error ${response.status}: ${response.statusText}`);
        }
        
        const data = await response.json();

        if (data.success) {
          setNominas(data.nominas || []);
        } else {
          throw new Error(data.message || "Error al cargar las nóminas");
        }
      } catch (error) {
        console.error("Error al cargar nóminas:", error);
        toast({
          title: "Error",
          description: error instanceof Error ? error.message : "Error al cargar las nóminas",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    cargarNominas();
  }, [toast]);

  // Filtrar nóminas según búsqueda
  const nominasFiltradas = nominas.filter((nomina) =>
    nomina.id_nomina.toString().includes(busqueda) ||
    nomina.fecha_nomina.includes(busqueda) ||
    (nomina.nombre_trabajador && nomina.nombre_trabajador.toLowerCase().includes(busqueda.toLowerCase())) ||
    nomina.periodo_inicio.includes(busqueda) ||
    nomina.periodo_fin.includes(busqueda)
  );

  const handleVerDetalle = async (idNomina: number) => {
    try {
      setLoadingDetalle(true);
      setMostrarDialogo(true);
      setNominaCompleta(null);

      const response = await fetch(`http://localhost:4000/api/nomina/${idNomina}`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Error al cargar el detalle");
      }

      if (data.success && data.nomina) {
        setNominaCompleta(data.nomina);
      } else {
        throw new Error(data.message || "No se pudo cargar la información de la nómina");
      }
    } catch (error) {
      console.error("Error al cargar detalle de nómina:", error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Error al cargar el detalle de la nómina",
        variant: "destructive",
      });
      setMostrarDialogo(false);
    } finally {
      setLoadingDetalle(false);
    }
  };

  // Formatear moneda
  const formatearMoneda = (valor: number | string) => {
    const num = typeof valor === "string" ? parseFloat(valor) : valor;
    return new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      minimumFractionDigits: 0,
    }).format(num || 0);
  };

  // Formatear fecha
  const formatearFecha = (fecha: string) => {
    if (!fecha) return "-";
    try {
      const date = new Date(fecha);
      return date.toLocaleDateString("es-CO", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    } catch {
      return fecha;
    }
  };

  return (
    <PageContainer>
      <PageTitle title="Ver Nóminas" />

      <div className="space-y-4">
        <SearchBar
          placeholder="Buscar por ID, trabajador, período o fecha..."
          value={busqueda}
          onChange={setBusqueda}
        />

        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              {loading ? (
                <div className="flex justify-center items-center p-8">
                  <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
                </div>
              ) : nominasFiltradas.length === 0 ? (
                <div className="text-center p-8 text-muted-foreground">
                  {busqueda ? "No se encontraron nóminas con ese criterio" : "No hay nóminas registradas"}
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Trabajador</TableHead>
                      <TableHead>Período</TableHead>
                      <TableHead>Fecha Nómina</TableHead>
                      <TableHead>Estado</TableHead>
                      <TableHead className="text-right">Total a Pagar</TableHead>
                      <TableHead className="w-[50px]"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {nominasFiltradas.map((nomina) => (
                      <TableRow key={nomina.id_nomina}>
                        <TableCell className="font-medium">{nomina.id_nomina}</TableCell>
                        <TableCell>{nomina.nombre_trabajador || "N/A"}</TableCell>
                        <TableCell>
                          {formatearFecha(nomina.periodo_inicio)} - {formatearFecha(nomina.periodo_fin)}
                        </TableCell>
                        <TableCell>{formatearFecha(nomina.fecha_nomina)}</TableCell>
                        <TableCell>
                          <span
                            className="px-2 py-1 rounded text-xs font-medium"
                            style={{
                              backgroundColor: nomina.estado_color
                                ? `${nomina.estado_color}20`
                                : "#f3f4f6",
                              color: nomina.estado_color || "#6b7280",
                            }}
                          >
                            {nomina.estado_nombre || "N/A"}
                          </span>
                        </TableCell>
                        <TableCell className="text-right font-medium">
                          {formatearMoneda(nomina.total_pagar)}
                        </TableCell>
                        <TableCell>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleVerDetalle(nomina.id_nomina)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Dialog con detalles */}
      <Dialog open={mostrarDialogo} onOpenChange={setMostrarDialogo}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Detalle de Nómina #{nominaCompleta?.id_nomina || ""}</DialogTitle>
            <DialogDescription>
              Información completa de la nómina
            </DialogDescription>
          </DialogHeader>

          {loadingDetalle ? (
            <div className="flex justify-center items-center p-8">
              <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
            </div>
          ) : nominaCompleta ? (
            <div className="space-y-6">
              {/* Información General */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Trabajador</p>
                  <p className="text-base">{nominaCompleta.nombre_trabajador || "N/A"}</p>
                  {nominaCompleta.documento_trabajador && (
                    <p className="text-sm text-muted-foreground">
                      Doc: {nominaCompleta.documento_trabajador}
                    </p>
                  )}
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Período</p>
                  <p className="text-base">
                    {formatearFecha(nominaCompleta.periodo_inicio)} - {formatearFecha(nominaCompleta.periodo_fin)}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Fecha Nómina</p>
                  <p className="text-base">{formatearFecha(nominaCompleta.fecha_nomina)}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Estado</p>
                  <span
                    className="inline-block px-2 py-1 rounded text-xs font-medium"
                    style={{
                      backgroundColor: nominaCompleta.estado_color
                        ? `${nominaCompleta.estado_color}20`
                        : "#f3f4f6",
                      color: nominaCompleta.estado_color || "#6b7280",
                    }}
                  >
                    {nominaCompleta.estado_nombre || "N/A"}
                  </span>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Creado por</p>
                  <p className="text-base">{nominaCompleta.nombre_creador || "N/A"}</p>
                </div>
                {nominaCompleta.observaciones && (
                  <div className="col-span-2">
                    <p className="text-sm font-medium text-muted-foreground">Observaciones</p>
                    <p className="text-base">{nominaCompleta.observaciones}</p>
                  </div>
                )}
              </div>

              {/* Detalles de Horas */}
              <div>
                <h3 className="text-lg font-semibold mb-3">Horas</h3>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Tipo Hora</TableHead>
                        <TableHead>Horario</TableHead>
                        <TableHead>Recargo</TableHead>
                        <TableHead>Valor Hora</TableHead>
                        <TableHead>Cantidad Horas</TableHead>
                        <TableHead className="text-right">Total</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {nominaCompleta.detalles_horas && nominaCompleta.detalles_horas.length > 0 ? (
                        <>
                          {nominaCompleta.detalles_horas.map((detalle) => (
                            <TableRow key={detalle.id_detalle_nomina}>
                              <TableCell className="font-medium">
                                {detalle.tipo_hora_nombre || "N/A"}
                              </TableCell>
                              <TableCell>{detalle.horario || "-"}</TableCell>
                              <TableCell>{detalle.recargo || "-"}</TableCell>
                              <TableCell>{formatearMoneda(parseFloat(detalle.valor_hora as any) || 0)}</TableCell>
                              <TableCell>{(parseFloat(detalle.cantidad_horas as any) || 0).toFixed(2)}</TableCell>
                              <TableCell className="text-right font-medium">
                                {formatearMoneda(parseFloat(detalle.total as any) || 0)}
                              </TableCell>
                            </TableRow>
                          ))}
                          <TableRow className="font-bold bg-muted">
                            <TableCell colSpan={5} className="text-right">
                              Total Bruto Nómina:
                            </TableCell>
                            <TableCell className="text-right">
                              {formatearMoneda(parseFloat(nominaCompleta.total_bruto_nomina as any) || 0)}
                            </TableCell>
                          </TableRow>
                        </>
                      ) : (
                        <TableRow>
                          <TableCell colSpan={6} className="text-center text-muted-foreground">
                            No hay horas registradas
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>
              </div>

              {/* Detalles de Deducciones */}
              <div>
                <h3 className="text-lg font-semibold mb-3">Deducciones</h3>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Tipo Deducción</TableHead>
                        <TableHead>Valor</TableHead>
                        <TableHead>Observaciones</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {nominaCompleta.detalles_deducciones && nominaCompleta.detalles_deducciones.length > 0 ? (
                        <>
                          {nominaCompleta.detalles_deducciones.map((deduccion) => (
                            <TableRow key={deduccion.id_detalle_deducciones}>
                              <TableCell className="font-medium">
                                {deduccion.tipo_deduccion_nombre || "N/A"}
                              </TableCell>
                              <TableCell className="font-medium">
                                {formatearMoneda(parseFloat(deduccion.valor_deduccion as any) || 0)}
                              </TableCell>
                              <TableCell>{deduccion.observaciones || "-"}</TableCell>
                            </TableRow>
                          ))}
                          <TableRow className="font-bold bg-muted">
                            <TableCell colSpan={2} className="text-right">
                              Total Deducciones:
                            </TableCell>
                            <TableCell className="font-medium">
                              {formatearMoneda(parseFloat(nominaCompleta.total_deducciones as any) || 0)}
                            </TableCell>
                          </TableRow>
                        </>
                      ) : (
                        <TableRow>
                          <TableCell colSpan={3} className="text-center text-muted-foreground">
                            No hay deducciones registradas
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>
              </div>

              {/* Resumen Final */}
              <div className="border-t pt-4 space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Total Bruto Nómina:</span>
                  <span className="font-medium">
                    {formatearMoneda(parseFloat(nominaCompleta.total_bruto_nomina as any) || 0)}
                  </span>
                </div>
                <div className="flex justify-between text-red-600">
                  <span className="text-muted-foreground">Total Deducciones:</span>
                  <span className="font-medium">
                    -{formatearMoneda(parseFloat(nominaCompleta.total_deducciones as any) || 0)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Auxilio de Transporte:</span>
                  <span className="font-medium">
                    {formatearMoneda(parseFloat(nominaCompleta.valor_auxilio_transporte as any) || 0)}
                  </span>
                </div>
                <div className="flex justify-between border-t pt-3 mt-3">
                  <span className="text-lg font-bold">Total a Pagar:</span>
                  <span className="text-lg font-bold text-green-600">
                    {formatearMoneda(parseFloat(nominaCompleta.total_pagar as any) || 0)}
                  </span>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center p-8 text-muted-foreground">
              No se pudo cargar la información
            </div>
          )}
        </DialogContent>
      </Dialog>
    </PageContainer>
  );
};

export default VerNominas;
