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
import { Eye, Loader2, FileDown, Mail } from "lucide-react";
import SearchBar from "@/components/SearchBar";
import PageContainer from "@/components/PageContainer";
import PageTitle from "@/components/PageTitle";
import { useToast } from "@/hooks/use-toast";
import jsPDF from "jspdf";
import { API_BASE_URL } from "@/config/api";

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
  const [generandoPDF, setGenerandoPDF] = useState(false);
  const [enviandoEmail, setEnviandoEmail] = useState(false);

  // Cargar nóminas desde la API
  useEffect(() => {
    const cargarNominas = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${API_BASE_URL}/api/nomina`);
        
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

      const response = await fetch(`${API_BASE_URL}/api/nomina/${idNomina}`);
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

  // Formatear fecha corta para PDF
  const formatearFechaCorta = (fecha: string) => {
    if (!fecha) return "-";
    try {
      const date = new Date(fecha);
      return date.toLocaleDateString("es-CO", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      });
    } catch {
      return fecha;
    }
  };

  // Convertir favicon a base64
  const obtenerLogoBase64 = async (): Promise<string> => {
    try {
      const response = await fetch("/favicon.ico");
      const blob = await response.blob();
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          const base64 = reader.result as string;
          resolve(base64);
        };
        reader.onerror = reject;
        reader.readAsDataURL(blob);
      });
    } catch (error) {
      console.error("Error al cargar el logo:", error);
      return "";
    }
  };

  // Generar PDF de la nómina (retorna el documento o lo guarda según el parámetro)
  const generarPDFDocumento = async (guardar: boolean = true): Promise<jsPDF | null> => {
    if (!nominaCompleta) return null;

    try {
      const doc = new jsPDF();
      const pageWidth = doc.internal.pageSize.getWidth();
      const pageHeight = doc.internal.pageSize.getHeight();
      const margin = 20;
      let yPos = margin;

      // Cargar y agregar logo
      const logoBase64 = await obtenerLogoBase64();
      if (logoBase64) {
        try {
          doc.addImage(logoBase64, "PNG", margin, yPos, 30, 30);
        } catch (error) {
          console.error("Error al agregar logo:", error);
        }
      }

      // Título
      doc.setFontSize(20);
      doc.setFont("helvetica", "bold");
      doc.text("NÓMINA DE PAGO", pageWidth - margin, yPos + 15, { align: "right" });
      yPos += 35;

      // Línea separadora
      doc.setDrawColor(200, 200, 200);
      doc.line(margin, yPos, pageWidth - margin, yPos);
      yPos += 10;

      // Información general
      doc.setFontSize(12);
      doc.setFont("helvetica", "bold");
      doc.text("INFORMACIÓN GENERAL", margin, yPos);
      yPos += 8;

      doc.setFont("helvetica", "normal");
      doc.setFontSize(10);
      
      const infoGeneral = [
        ["Trabajador:", nominaCompleta.nombre_trabajador || "N/A"],
        ["Documento:", nominaCompleta.documento_trabajador || "N/A"],
        ["Período:", `${formatearFechaCorta(nominaCompleta.periodo_inicio)} - ${formatearFechaCorta(nominaCompleta.periodo_fin)}`],
        ["Fecha Nómina:", formatearFechaCorta(nominaCompleta.fecha_nomina)],
        ["Estado:", nominaCompleta.estado_nombre || "N/A"],
        ["Creado por:", nominaCompleta.nombre_creador || "N/A"],
      ];

      infoGeneral.forEach(([label, value]) => {
        doc.setFont("helvetica", "bold");
        doc.text(label, margin, yPos);
        doc.setFont("helvetica", "normal");
        doc.text(value, margin + 50, yPos);
        yPos += 7;
      });

      if (nominaCompleta.observaciones) {
        yPos += 3;
        doc.setFont("helvetica", "bold");
        doc.text("Observaciones:", margin, yPos);
        yPos += 7;
        doc.setFont("helvetica", "normal");
        const observacionesLines = doc.splitTextToSize(nominaCompleta.observaciones, pageWidth - 2 * margin);
        doc.text(observacionesLines, margin, yPos);
        yPos += observacionesLines.length * 5 + 5;
      }

      yPos += 5;

      // Verificar si necesitamos nueva página
      if (yPos > pageHeight - 60) {
        doc.addPage();
        yPos = margin;
      }

      // Detalles de Horas
      if (nominaCompleta.detalles_horas && nominaCompleta.detalles_horas.length > 0) {
        doc.setFontSize(12);
        doc.setFont("helvetica", "bold");
        doc.text("DETALLE DE HORAS", margin, yPos);
        yPos += 8;

        // Encabezados de tabla
        doc.setFontSize(9);
        doc.setFont("helvetica", "bold");
        // Anchos de columna: Tipo Hora, Horario, Recargo, Valor Hora, Cant. Horas
        // Ancho disponible: pageWidth (210mm) - 2*margin (40mm) = 170mm
        // Reducimos un poco las columnas para dejar más espacio para Total
        const colWidths = [45, 24, 24, 38, 24];
        const totalColWidth = colWidths.reduce((sum, width) => sum + width, 0);
        const totalColWidthAvailable = pageWidth - 2 * margin;
        const spaceForTotal = 55; // Espacio fijo para Total (aumentado)
        const spacingBetween = 5; // Espacio entre Cant. Horas y Total
        
        const headers = ["Tipo Hora", "Horario", "Recargo", "Valor Hora", "Cant. Horas", "Total"];
        let xPos = margin;
        
        // Dibujar las primeras 5 columnas
        headers.slice(0, 5).forEach((header, index) => {
          doc.text(header, xPos, yPos);
          xPos += colWidths[index];
        });
        
        // Dibujar "Total" alineado a la derecha, dejando espacio suficiente
        const totalXPos = pageWidth - margin;
        doc.text("Total", totalXPos, yPos, { align: "right" });
        yPos += 6;

        // Línea bajo encabezados
        doc.line(margin, yPos, pageWidth - margin, yPos);
        yPos += 5;

        // Filas de datos
        doc.setFont("helvetica", "normal");
        doc.setFontSize(9);
        nominaCompleta.detalles_horas.forEach((detalle) => {
          if (yPos > pageHeight - 40) {
            doc.addPage();
            yPos = margin;
          }

          xPos = margin;
          const rowData = [
            detalle.tipo_hora_nombre || "N/A",
            detalle.horario || "-",
            detalle.recargo || "-",
            formatearMoneda(parseFloat(detalle.valor_hora as any) || 0),
            (parseFloat(detalle.cantidad_horas as any) || 0).toFixed(2),
            formatearMoneda(parseFloat(detalle.total as any) || 0),
          ];

          // Dibujar las primeras 5 columnas con límites estrictos
          rowData.slice(0, 5).forEach((data, index) => {
            // Limitar el ancho del texto para que no se sobreponga
            const maxWidth = colWidths[index] - 5; // Dejamos 5mm de margen
            const text = doc.splitTextToSize(data, maxWidth);
            doc.text(text, xPos, yPos);
            xPos += colWidths[index];
          });
          
          // Dibujar "Total" alineado a la derecha con espacio suficiente
          // Asegurarnos de que haya al menos 5mm de espacio entre Cant. Horas y Total
          doc.text(rowData[5], totalXPos, yPos, { align: "right" });
          
          // Calcular altura necesaria para la fila
          const maxLines = Math.max(...rowData.slice(0, 5).map((data, index) => {
            const maxWidth = colWidths[index] - 5;
            return doc.splitTextToSize(data, maxWidth).length;
          }));
          
          yPos += Math.max(8, maxLines * 4); // Mínimo 8mm, más si hay múltiples líneas
        });

        // Total bruto
        yPos += 3;
        doc.line(margin, yPos, pageWidth - margin, yPos);
        yPos += 5;
        doc.setFont("helvetica", "bold");
        doc.text("Total Bruto Nómina:", pageWidth - margin - 60, yPos, { align: "right" });
        doc.text(
          formatearMoneda(parseFloat(nominaCompleta.total_bruto_nomina as any) || 0),
          pageWidth - margin,
          yPos,
          { align: "right" }
        );
        yPos += 10;
      }

      // Verificar si necesitamos nueva página
      if (yPos > pageHeight - 60) {
        doc.addPage();
        yPos = margin;
      }

      // Detalles de Deducciones
      if (nominaCompleta.detalles_deducciones && nominaCompleta.detalles_deducciones.length > 0) {
        doc.setFontSize(12);
        doc.setFont("helvetica", "bold");
        doc.text("DEDUCCIONES", margin, yPos);
        yPos += 8;

        // Encabezados
        doc.setFontSize(9);
        doc.setFont("helvetica", "bold");
        doc.text("Tipo Deducción", margin, yPos);
        doc.text("Valor", pageWidth - margin - 60, yPos, { align: "right" });
        yPos += 6;
        doc.line(margin, yPos, pageWidth - margin, yPos);
        yPos += 5;

        // Filas
        doc.setFont("helvetica", "normal");
        nominaCompleta.detalles_deducciones.forEach((deduccion) => {
          if (yPos > pageHeight - 40) {
            doc.addPage();
            yPos = margin;
          }

          const tipoText = doc.splitTextToSize(deduccion.tipo_deduccion_nombre || "N/A", pageWidth - margin - 80);
          doc.text(tipoText, margin, yPos);
          doc.text(
            formatearMoneda(parseFloat(deduccion.valor_deduccion as any) || 0),
            pageWidth - margin,
            yPos,
            { align: "right" }
          );
          yPos += tipoText.length * 5 + 3;

          if (deduccion.observaciones) {
            doc.setFontSize(8);
            doc.setTextColor(120, 120, 120);
            const obsText = doc.splitTextToSize(`Obs: ${deduccion.observaciones}`, pageWidth - margin - 80);
            doc.text(obsText, margin + 5, yPos);
            yPos += obsText.length * 4 + 2;
            doc.setFontSize(9);
            doc.setTextColor(0, 0, 0);
          }
        });

        // Total deducciones
        yPos += 3;
        doc.line(margin, yPos, pageWidth - margin, yPos);
        yPos += 5;
        doc.setFont("helvetica", "bold");
        doc.text("Total Deducciones:", pageWidth - margin - 60, yPos, { align: "right" });
        doc.text(
          formatearMoneda(parseFloat(nominaCompleta.total_deducciones as any) || 0),
          pageWidth - margin,
          yPos,
          { align: "right" }
        );
        yPos += 10;
      }

      // Verificar si necesitamos nueva página
      if (yPos > pageHeight - 80) {
        doc.addPage();
        yPos = margin;
      }

      // Resumen Final
      yPos += 5;
      doc.setFontSize(12);
      doc.setFont("helvetica", "bold");
      doc.text("RESUMEN", margin, yPos);
      yPos += 10;

      doc.setFontSize(10);
      doc.setFont("helvetica", "normal");
      doc.text("Total Bruto Nómina:", margin, yPos);
      doc.text(
        formatearMoneda(parseFloat(nominaCompleta.total_bruto_nomina as any) || 0),
        pageWidth - margin,
        yPos,
        { align: "right" }
      );
      yPos += 8;

      doc.setTextColor(200, 0, 0);
      doc.text("Total Deducciones:", margin, yPos);
      doc.text(
        `-${formatearMoneda(parseFloat(nominaCompleta.total_deducciones as any) || 0)}`,
        pageWidth - margin,
        yPos,
        { align: "right" }
      );
      yPos += 8;

      doc.setTextColor(0, 0, 0);
      doc.text("Auxilio de Transporte:", margin, yPos);
      doc.text(
        formatearMoneda(parseFloat(nominaCompleta.valor_auxilio_transporte as any) || 0),
        pageWidth - margin,
        yPos,
        { align: "right" }
      );
      yPos += 10;

      doc.line(margin, yPos, pageWidth - margin, yPos);
      yPos += 8;

      doc.setFontSize(14);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(0, 150, 0);
      doc.text("TOTAL A PAGAR:", margin, yPos);
      doc.text(
        formatearMoneda(parseFloat(nominaCompleta.total_pagar as any) || 0),
        pageWidth - margin,
        yPos,
        { align: "right" }
      );

      // Pie de página
      const totalPages = doc.getNumberOfPages();
      for (let i = 1; i <= totalPages; i++) {
        doc.setPage(i);
        doc.setFontSize(8);
        doc.setTextColor(150, 150, 150);
        doc.text(
          `Página ${i} de ${totalPages}`,
          pageWidth / 2,
          pageHeight - 10,
          { align: "center" }
        );
        doc.text(
          `Generado el ${new Date().toLocaleDateString("es-CO")}`,
          pageWidth - margin,
          pageHeight - 10,
          { align: "right" }
        );
      }

      // Guardar PDF si se solicita
      if (guardar) {
        const nombreArchivo = `Nomina_${nominaCompleta.id_nomina}_${nominaCompleta.nombre_trabajador?.replace(/\s+/g, "_") || "N/A"}_${new Date().getTime()}.pdf`;
        doc.save(nombreArchivo);

        toast({
          title: "Éxito",
          description: "PDF generado correctamente",
        });
      }

      return doc;
    } catch (error) {
      console.error("Error al generar PDF:", error);
      toast({
        title: "Error",
        description: "Error al generar el PDF",
        variant: "destructive",
      });
      return null;
    }
  };

  // Generar PDF de la nómina (para descargar)
  const generarPDF = async () => {
    setGenerandoPDF(true);
    try {
      await generarPDFDocumento(true);
    } finally {
      setGenerandoPDF(false);
    }
  };

  // Enviar nómina por email
  const enviarPorEmail = async () => {
    if (!nominaCompleta) return;

    try {
      setEnviandoEmail(true);
      
      // Generar el PDF completo (sin guardar)
      const doc = await generarPDFDocumento(false);
      if (!doc) {
        throw new Error("No se pudo generar el PDF");
      }

      // Obtener PDF como array buffer y luego convertir a blob
      const pdfArrayBuffer = doc.output("arraybuffer");
      const pdfBlob = new Blob([pdfArrayBuffer], { type: "application/pdf" });
      
      const formData = new FormData();
      formData.append("pdf", pdfBlob, `Nomina_${nominaCompleta.id_nomina}.pdf`);
      formData.append("id_nomina", nominaCompleta.id_nomina.toString());
      formData.append("nombre_trabajador", nominaCompleta.nombre_trabajador || "");
      formData.append("total_pagar", nominaCompleta.total_pagar.toString());

      // Enviar al backend
      const response = await fetch(`${API_BASE_URL}/api/nomina/enviar-email`, {
        method: "POST",
        body: formData,
      });

      let data;
      try {
        data = await response.json();
      } catch (jsonError) {
        const text = await response.text();
        throw new Error(`Error del servidor: ${response.status} ${response.statusText}. ${text}`);
      }

      if (!response.ok) {
        throw new Error(data.message || data.error || "Error al enviar el email");
      }

      toast({
        title: "Éxito",
        description: "Nómina enviada por email correctamente",
      });
    } catch (error) {
      console.error("Error al enviar email:", error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Error al enviar el email",
        variant: "destructive",
      });
    } finally {
      setEnviandoEmail(false);
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
            <div className="flex justify-between items-center mb-4">
              <div>
                <DialogTitle>Detalle de Nómina #{nominaCompleta?.id_nomina || ""}</DialogTitle>
                <DialogDescription>
                  Información completa de la nómina
                </DialogDescription>
              </div>
              {nominaCompleta && (
                <div className="flex gap-2 flex-shrink-0">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={generarPDF}
                    disabled={generandoPDF}
                    className="flex items-center gap-2"
                  >
                    {generandoPDF ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <FileDown className="h-4 w-4" />
                    )}
                    PDF
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={enviarPorEmail}
                    disabled={enviandoEmail}
                    className="flex items-center gap-2"
                  >
                    {enviandoEmail ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Mail className="h-4 w-4" />
                    )}
                    Enviar
                  </Button>
                </div>
              )}
            </div>
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
