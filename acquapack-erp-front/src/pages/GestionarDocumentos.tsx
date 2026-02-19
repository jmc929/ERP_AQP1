import { useState, useEffect, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import { Plus, Download, Trash2, FileText, Search, Upload, X } from "lucide-react";
import SearchBar from "@/components/SearchBar";
import PageContainer from "@/components/PageContainer";
import PageTitle from "@/components/PageTitle";
import TableCard from "@/components/TableCard";
import EmptyTableMessage from "@/components/EmptyTableMessage";
import ConfirmDialog from "@/components/ConfirmDialog";
import ActionButton from "@/components/ActionButton";
import FormCard from "@/components/FormCard";
import Pagination from "@/components/Pagination";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { API_BASE_URL } from "@/config/api";

interface Documento {
  id_documento: number;
  nombre_archivo: string;
  nombre_original: string;
  ruta_archivo: string;
  tipo_mime: string;
  tamaño_bytes: number;
  extension: string;
  descripcion?: string;
  categoria?: string;
  id_usuario_creador?: number;
  fecha_subida: string;
  fecha_modificacion?: string;
  id_estado?: number;
}

// Carpetas principales del sistema de documentos
const CARPETAS = [
  { id: "trabajadores", nombre: "Trabajadores", icon: "👥" },
  { id: "gestion-humana", nombre: "Gestión Humana", icon: "📋" },
  { id: "sst", nombre: "SST", icon: "🛡️" },
  { id: "facturas", nombre: "Facturas", icon: "🧾" },
  { id: "contratos", nombre: "Contratos", icon: "📄" },
  { id: "certificados", nombre: "Certificados", icon: "🏆" },
  { id: "manuales", nombre: "Manuales", icon: "📚" },
  { id: "otros", nombre: "Otros", icon: "📁" },
];

const GestionarDocumentos = () => {
  const { toast } = useToast();
  const [searchParams, setSearchParams] = useSearchParams();
  const carpetaDesdeURL = searchParams.get("carpeta");
  
  const [documentos, setDocumentos] = useState<Documento[]>([]);
  const [loading, setLoading] = useState(true);
  const [busqueda, setBusqueda] = useState("");
  const [carpetaActual, setCarpetaActual] = useState<string>(
    carpetaDesdeURL || "all"
  ); // "all" para ver todos, o el ID de la carpeta
  const [mostrarDialogoSubida, setMostrarDialogoSubida] = useState(false);
  const [mostrarDialogoEliminar, setMostrarDialogoEliminar] = useState(false);
  const [documentoSeleccionado, setDocumentoSeleccionado] = useState<Documento | null>(null);
  const [archivoSeleccionado, setArchivoSeleccionado] = useState<File | null>(null);
  const [subiendo, setSubiendo] = useState(false);
  const [paginaActual, setPaginaActual] = useState(1);
  const itemsPorPagina = 10;

  // Formulario de subida
  const [formData, setFormData] = useState({
    descripcion: "",
    categoria: carpetaActual !== "all" ? carpetaActual : "otros",
  });

  // Cargar documentos
  useEffect(() => {
    cargarDocumentos();
  }, []);

  // Sincronizar carpeta con URL
  useEffect(() => {
    const carpetaURL = searchParams.get("carpeta");
    if (carpetaURL && carpetaURL !== carpetaActual) {
      setCarpetaActual(carpetaURL);
    }
  }, [searchParams]);

  // Actualizar URL cuando cambia la carpeta
  const handleCambiarCarpeta = (carpetaId: string) => {
    setCarpetaActual(carpetaId);
    setPaginaActual(1);
    if (carpetaId === "all") {
      setSearchParams({});
    } else {
      setSearchParams({ carpeta: carpetaId });
    }
  };

  const cargarDocumentos = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/api/documentos`);
      
      if (!response.ok) {
        // Si la API no existe o hay error, usar array vacío
        console.warn("API de documentos no disponible o error:", response.status);
        setDocumentos([]);
        return;
      }
      
      const data = await response.json();

      if (data.success) {
        setDocumentos(data.documentos || []);
      } else {
        // Si no hay éxito pero tampoco hay error crítico, usar array vacío
        setDocumentos([]);
      }
    } catch (error) {
      console.error("Error al cargar documentos:", error);
      // En caso de error, asegurar que siempre haya un array
      setDocumentos([]);
      toast({
        title: "Advertencia",
        description: "No se pudieron cargar los documentos. La funcionalidad puede estar limitada.",
        variant: "default",
      });
    } finally {
      setLoading(false);
    }
  };

  // Filtrar documentos
  const documentosFiltrados = useMemo(() => {
    // Asegurar que documentos siempre sea un array
    let filtrados = Array.isArray(documentos) ? documentos : [];

    // Filtro por carpeta
    if (carpetaActual !== "all") {
      filtrados = filtrados.filter((doc) => doc?.categoria === carpetaActual);
    }

    // Filtro por búsqueda
    if (busqueda.trim()) {
      const termino = busqueda.toLowerCase();
      filtrados = filtrados.filter(
        (doc) =>
          doc?.nombre_original?.toLowerCase().includes(termino) ||
          doc?.descripcion?.toLowerCase().includes(termino) ||
          doc?.categoria?.toLowerCase().includes(termino)
      );
    }

    return filtrados;
  }, [documentos, busqueda, carpetaActual]);

  // Contar documentos por carpeta
  const contarDocumentosPorCarpeta = (carpetaId: string) => {
    return documentos.filter((doc) => doc.categoria === carpetaId).length;
  };

  // Paginación
  const totalPaginas = Math.ceil((documentosFiltrados?.length || 0) / itemsPorPagina);
  const documentosPaginados = (documentosFiltrados || []).slice(
    (paginaActual - 1) * itemsPorPagina,
    paginaActual * itemsPorPagina
  );

  // Manejar selección de archivo
  const handleSeleccionarArchivo = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validar tipo de archivo
      const tiposPermitidos = [
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        "image/jpeg",
        "image/png",
      ];

      if (!tiposPermitidos.includes(file.type)) {
        toast({
          title: "Error",
          description: "Tipo de archivo no permitido. Solo se permiten PDF, Word, JPG y PNG",
          variant: "destructive",
        });
        return;
      }

      // Validar tamaño (10MB máximo)
      if (file.size > 10 * 1024 * 1024) {
        toast({
          title: "Error",
          description: "El archivo es demasiado grande. Máximo 10MB",
          variant: "destructive",
        });
        return;
      }

      setArchivoSeleccionado(file);
    }
  };

  // Subir documento
  const handleSubirDocumento = async () => {
    if (!archivoSeleccionado) {
      toast({
        title: "Error",
        description: "Debes seleccionar un archivo",
        variant: "destructive",
      });
      return;
    }

    try {
      setSubiendo(true);

      const formDataToSend = new FormData();
      formDataToSend.append("archivo", archivoSeleccionado);
      formDataToSend.append("descripcion", formData.descripcion);
      formDataToSend.append("categoria", formData.categoria);
      formDataToSend.append("id_usuario_creador", "1"); // TODO: Obtener del contexto de usuario

      const response = await fetch(`${API_BASE_URL}/api/documentos/subir`, {
        method: "POST",
        body: formDataToSend,
      });

      const data = await response.json();

      if (response.ok && data.success) {
        toast({
          title: "Éxito",
          description: "Documento subido exitosamente",
        });
        setMostrarDialogoSubida(false);
        setArchivoSeleccionado(null);
        setFormData({ descripcion: "", categoria: "Otro" });
        cargarDocumentos();
      } else {
        throw new Error(data.message || "Error al subir documento");
      }
    } catch (error) {
      console.error("Error al subir documento:", error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Error al subir el documento",
        variant: "destructive",
      });
    } finally {
      setSubiendo(false);
    }
  };

  // Descargar documento
  const handleDescargarDocumento = async (documento: Documento) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/documentos/descargar/${documento.id_documento}`);
      
      if (!response.ok) {
        throw new Error("Error al descargar el documento");
      }

      // Obtener el blob del archivo
      const blob = await response.blob();
      
      // Crear URL temporal y descargar
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = documento.nombre_original;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);

      toast({
        title: "Éxito",
        description: "Documento descargado exitosamente",
      });
    } catch (error) {
      console.error("Error al descargar documento:", error);
      toast({
        title: "Error",
        description: "No se pudo descargar el documento",
        variant: "destructive",
      });
    }
  };

  // Eliminar documento
  const handleEliminarDocumento = async () => {
    if (!documentoSeleccionado) return;

    try {
      const response = await fetch(
        `${API_BASE_URL}/api/documentos/${documentoSeleccionado.id_documento}`,
        {
          method: "DELETE",
        }
      );

      const data = await response.json();

      if (response.ok && data.success) {
        toast({
          title: "Éxito",
          description: "Documento eliminado exitosamente",
        });
        setMostrarDialogoEliminar(false);
        setDocumentoSeleccionado(null);
        cargarDocumentos();
      } else {
        throw new Error(data.message || "Error al eliminar documento");
      }
    } catch (error) {
      console.error("Error al eliminar documento:", error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Error al eliminar el documento",
        variant: "destructive",
      });
    }
  };

  // Formatear tamaño de archivo
  const formatearTamaño = (bytes: number): string => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(2)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  };

  // Formatear fecha
  const formatearFecha = (fecha: string): string => {
    return new Date(fecha).toLocaleDateString("es-CO", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Obtener ícono según extensión
  const obtenerIcono = (extension: string) => {
    switch (extension.toLowerCase()) {
      case "pdf":
        return "📄";
      case "doc":
      case "docx":
        return "📝";
      case "jpg":
      case "jpeg":
      case "png":
        return "🖼️";
      default:
        return "📎";
    }
  };

  // Obtener nombre de carpeta actual
  const carpetaActualNombre = carpetaActual === "all" 
    ? "Todos los Documentos" 
    : CARPETAS.find(c => c.id === carpetaActual)?.nombre || carpetaActual;

  return (
    <PageContainer>
      <PageTitle title="Gestión de Documentos" />
      <p className="text-muted-foreground mb-6">
        Sube, gestiona y descarga documentos y PDFs organizados por carpetas
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar de Carpetas */}
        <div className="lg:col-span-1">
          <Card>
            <CardContent className="p-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-lg">Carpetas</h3>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleCambiarCarpeta("all")}
                    className={carpetaActual === "all" ? "bg-primary/10" : ""}
                  >
                    Ver Todos
                  </Button>
                </div>
                
                {CARPETAS.map((carpeta) => {
                  const cantidad = contarDocumentosPorCarpeta(carpeta.id);
                  const estaSeleccionada = carpetaActual === carpeta.id;
                  
                  return (
                    <button
                      key={carpeta.id}
                      onClick={() => handleCambiarCarpeta(carpeta.id)}
                      className={`w-full flex items-center justify-between p-3 rounded-lg transition-all ${
                        estaSeleccionada
                          ? "bg-primary text-primary-foreground shadow-md"
                          : "bg-card hover:bg-accent border border-border"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{carpeta.icon}</span>
                        <span className="font-medium">{carpeta.nombre}</span>
                      </div>
                      <span className={`text-sm px-2 py-1 rounded-full ${
                        estaSeleccionada
                          ? "bg-primary-foreground/20 text-primary-foreground"
                          : "bg-muted text-muted-foreground"
                      }`}>
                        {cantidad}
                      </span>
                    </button>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Contenido Principal */}
        <div className="lg:col-span-3 space-y-6">
          {/* Barra de acciones y búsqueda */}
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <div className="flex-1 w-full">
              <div className="flex items-center gap-2 mb-2">
                <h2 className="font-semibold text-lg">{carpetaActualNombre}</h2>
                <span className="text-sm text-muted-foreground">
                  ({documentosFiltrados.length} documento{documentosFiltrados.length !== 1 ? 's' : ''})
                </span>
              </div>
              <SearchBar
                value={busqueda}
                onChange={(e) => {
                  setBusqueda(e.target.value);
                  setPaginaActual(1);
                }}
                placeholder="Buscar documentos..."
                className="w-full"
              />
            </div>
            <Button
              onClick={() => {
                setFormData({
                  descripcion: "",
                  categoria: carpetaActual !== "all" ? carpetaActual : "otros",
                });
                setMostrarDialogoSubida(true);
              }}
              className="w-full sm:w-auto"
              size="lg"
            >
              <Upload className="h-4 w-4 mr-2" />
              Subir PDF
            </Button>
          </div>

          {/* Tabla de documentos */}
          <TableCard
            headers={["Nombre", "Categoría", "Tamaño", "Fecha Subida", "Acciones"]}
          >
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-8">
                    Cargando documentos...
                  </TableCell>
                </TableRow>
              ) : documentosPaginados.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-12">
                    <div className="flex flex-col items-center gap-4">
                      <FileText className="h-12 w-12 text-muted-foreground" />
                      <div className="space-y-2">
                        <p className="text-lg font-medium text-foreground">
                          {carpetaActual !== "all"
                            ? `No hay documentos en "${carpetaActualNombre}"`
                            : "No hay documentos registrados"}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {carpetaActual !== "all"
                            ? `Haz clic en "Subir PDF" para agregar el primer documento a esta carpeta.`
                            : "Haz clic en 'Subir PDF' para agregar el primer documento."}
                        </p>
                      </div>
                      <Button
                        onClick={() => {
                          setFormData({
                            descripcion: "",
                            categoria: carpetaActual !== "all" ? carpetaActual : "otros",
                          });
                          setMostrarDialogoSubida(true);
                        }}
                        className="mt-2"
                      >
                        <Upload className="h-4 w-4 mr-2" />
                        Subir PDF
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
            documentosPaginados.map((documento) => (
              <TableRow key={documento.id_documento}>
                <TableCell className="font-medium">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">{obtenerIcono(documento.extension)}</span>
                    <div>
                      <div className="font-semibold">{documento.nombre_original}</div>
                      {documento.descripcion && (
                        <div className="text-sm text-muted-foreground">
                          {documento.descripcion}
                        </div>
                      )}
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <span className="px-2 py-1 bg-primary/10 text-primary rounded-md text-sm">
                    {documento.categoria || "Sin categoría"}
                  </span>
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {formatearTamaño(documento.tamaño_bytes)}
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {formatearFecha(documento.fecha_subida)}
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <ActionButton
                      icon={Download}
                      label="Descargar"
                      onClick={() => handleDescargarDocumento(documento)}
                      variant="default"
                    />
                    <ActionButton
                      icon={Trash2}
                      label="Eliminar"
                      onClick={() => {
                        setDocumentoSeleccionado(documento);
                        setMostrarDialogoEliminar(true);
                      }}
                      variant="destructive"
                    />
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </TableCard>

          {/* Paginación */}
          {totalPaginas > 1 && (
            <div className="mt-4">
              <Pagination
                currentPage={paginaActual}
                totalPages={totalPaginas}
                onPageChange={setPaginaActual}
              />
            </div>
          )}
        </div>
      </div>

      {/* Dialog para subir documento */}
      <Dialog open={mostrarDialogoSubida} onOpenChange={setMostrarDialogoSubida}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Subir Nuevo Documento</DialogTitle>
            <DialogDescription>
              Selecciona un archivo PDF, Word o imagen para subir
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="archivo">Archivo</Label>
              <div className="mt-2">
                {archivoSeleccionado ? (
                  <Card>
                    <CardContent className="p-4 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <FileText className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <div className="font-medium">{archivoSeleccionado.name}</div>
                          <div className="text-sm text-muted-foreground">
                            {formatearTamaño(archivoSeleccionado.size)}
                          </div>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setArchivoSeleccionado(null)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </CardContent>
                  </Card>
                ) : (
                  <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                    <Upload className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                    <Label
                      htmlFor="archivo"
                      className="cursor-pointer text-primary hover:underline"
                    >
                      Haz clic para seleccionar un archivo
                    </Label>
                    <Input
                      id="archivo"
                      type="file"
                      className="hidden"
                      accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                      onChange={handleSeleccionarArchivo}
                    />
                    <p className="text-xs text-muted-foreground mt-2">
                      PDF, Word, JPG, PNG (máx. 10MB)
                    </p>
                  </div>
                )}
              </div>
            </div>

            <div>
              <Label htmlFor="categoria">Carpeta</Label>
              <Select
                value={formData.categoria}
                onValueChange={(value) =>
                  setFormData({ ...formData, categoria: value })
                }
              >
                <SelectTrigger id="categoria" className="mt-2">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {CARPETAS.map((carpeta) => (
                    <SelectItem key={carpeta.id} value={carpeta.id}>
                      <div className="flex items-center gap-2">
                        <span>{carpeta.icon}</span>
                        <span>{carpeta.nombre}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="descripcion">Descripción (opcional)</Label>
              <Textarea
                id="descripcion"
                className="mt-2"
                placeholder="Agrega una descripción del documento..."
                value={formData.descripcion}
                onChange={(e) =>
                  setFormData({ ...formData, descripcion: e.target.value })
                }
                rows={3}
              />
            </div>

            <div className="flex gap-2 justify-end">
              <Button
                variant="outline"
                onClick={() => {
                  setMostrarDialogoSubida(false);
                  setArchivoSeleccionado(null);
                  setFormData({ 
                    descripcion: "", 
                    categoria: carpetaActual !== "all" ? carpetaActual : "otros" 
                  });
                }}
              >
                Cancelar
              </Button>
              <Button onClick={handleSubirDocumento} disabled={subiendo || !archivoSeleccionado}>
                {subiendo ? "Subiendo..." : "Subir"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Dialog de confirmación para eliminar */}
      <ConfirmDialog
        open={mostrarDialogoEliminar}
        onOpenChange={setMostrarDialogoEliminar}
        onConfirm={handleEliminarDocumento}
        title="Eliminar Documento"
        description={`¿Estás seguro de que deseas eliminar el documento "${documentoSeleccionado?.nombre_original}"? Esta acción no se puede deshacer.`}
      />
    </PageContainer>
  );
};

export default GestionarDocumentos;

