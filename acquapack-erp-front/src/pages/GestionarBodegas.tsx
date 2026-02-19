import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
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
import { Checkbox } from "@/components/ui/checkbox";
import { Plus, Archive, Edit, RefreshCw } from "lucide-react";
import SearchBar from "@/components/SearchBar";
import PageContainer from "@/components/PageContainer";
import PageTitle from "@/components/PageTitle";
import TableCard from "@/components/TableCard";
import ConfirmDialog from "@/components/ConfirmDialog";
import ActionButton from "@/components/ActionButton";
import FormCard from "@/components/FormCard";
import Pagination from "@/components/Pagination";
import { useToast } from "@/hooks/use-toast";
import { API_BASE_URL } from "@/config/api";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface Bodega {
  id_bodega: number;
  nombre: string;
  id_estado?: number;
  estado_nombre?: string;
  estado_color?: string;
}

interface Catalogos {
  estados: Array<{ id_estado: number; nombre: string; color: string }>;
}

const GestionarBodegas = () => {
  const { toast } = useToast();
  const [bodegas, setBodegas] = useState<Bodega[]>([]);
  const [bodegasSeleccionadas, setBodegasSeleccionadas] = useState<Set<number>>(new Set());
  const [mostrarDialogoArchivar, setMostrarDialogoArchivar] = useState(false);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [loading, setLoading] = useState(true);
  const [loadingCatalogos, setLoadingCatalogos] = useState(true);
  const [catalogos, setCatalogos] = useState<Catalogos | null>(null);
  const [busqueda, setBusqueda] = useState("");
  const [paginaActual, setPaginaActual] = useState(1);
  const registrosPorPagina = 30;
  
  // Estados del formulario
  const [nombre, setNombre] = useState("");
  const [idEstado, setIdEstado] = useState("");
  const [guardando, setGuardando] = useState(false);
  const [bodegaEditando, setBodegaEditando] = useState<Bodega | null>(null);
  
  // Estados para cambiar estado
  const [mostrarDialogoCambiarEstado, setMostrarDialogoCambiarEstado] = useState(false);
  const [bodegaCambiandoEstado, setBodegaCambiandoEstado] = useState<Bodega | null>(null);
  const [nuevoEstadoId, setNuevoEstadoId] = useState("");

  // Cargar bodegas y catálogos
  useEffect(() => {
    const cargarDatos = async () => {
      try {
        setLoading(true);
        setLoadingCatalogos(true);
        const [bodegasRes, catalogosRes] = await Promise.all([
          fetch(`${API_BASE_URL}/api/bodegas"),
          fetch(`${API_BASE_URL}/api/bodegas/catalogos")
        ]);

        const bodegasData = await bodegasRes.json();
        const catalogosData = await catalogosRes.json();

        if (bodegasData.success) {
          setBodegas(bodegasData.bodegas);
        }

        if (catalogosData.success) {
          setCatalogos(catalogosData.catalogos);
        }
      } catch (error) {
        toast({
          title: "Error",
          description: "No se pudieron cargar las bodegas",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
        setLoadingCatalogos(false);
      }
    };

    cargarDatos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Filtrar bodegas según búsqueda
  const bodegasFiltradas = bodegas.filter((bodega) =>
    bodega.id_bodega.toString().includes(busqueda) ||
    bodega.nombre.toLowerCase().includes(busqueda.toLowerCase())
  );

  // Calcular paginación
  const totalPaginas = Math.ceil(bodegasFiltradas.length / registrosPorPagina);
  const indiceInicio = (paginaActual - 1) * registrosPorPagina;
  const indiceFin = indiceInicio + registrosPorPagina;
  const bodegasPaginadas = bodegasFiltradas.slice(indiceInicio, indiceFin);

  // Resetear a página 1 cuando cambie la búsqueda
  useEffect(() => {
    setPaginaActual(1);
  }, [busqueda]);

  // Ajustar página actual si excede el total de páginas después del filtrado
  useEffect(() => {
    if (totalPaginas > 0 && paginaActual > totalPaginas) {
      setPaginaActual(totalPaginas);
    } else if (totalPaginas === 0 && paginaActual > 1) {
      setPaginaActual(1);
    }
  }, [totalPaginas, paginaActual]);

  const handleCheckbox = (bodegaId: number, checked: boolean) => {
    setBodegasSeleccionadas((prev) => {
      const nuevo = new Set(prev);
      if (checked) {
        nuevo.add(bodegaId);
      } else {
        nuevo.delete(bodegaId);
      }
      return nuevo;
    });
  };

  const limpiarFormulario = () => {
    setNombre("");
    setIdEstado("");
    setBodegaEditando(null);
  };

  const handleAgregarBodega = async () => {
    if (!nombre.trim()) {
      toast({
        title: "Error",
        description: "El nombre es obligatorio",
        variant: "destructive",
      });
      return;
    }

    try {
      setGuardando(true);
      const url = bodegaEditando 
        ? `${API_BASE_URL}/api/bodegas/${bodegaEditando.id_bodega}`
        : `${API_BASE_URL}/api/bodegas";
      
      const method = bodegaEditando ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nombre: nombre.trim(),
          id_estado: idEstado ? parseInt(idEstado) : null,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Error al guardar la bodega");
      }

      toast({
        title: "Éxito",
        description: bodegaEditando 
          ? "Bodega actualizada exitosamente"
          : "Bodega creada exitosamente",
      });

      // Recargar bodegas
      const bodegasRes = await fetch(`${API_BASE_URL}/api/bodegas");
      const bodegasData = await bodegasRes.json();
      if (bodegasData.success) {
        setBodegas(bodegasData.bodegas);
      }

      setMostrarFormulario(false);
      limpiarFormulario();
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Error al guardar la bodega",
        variant: "destructive",
      });
    } finally {
      setGuardando(false);
    }
  };

  const handleEditarBodega = (bodega: Bodega) => {
    setBodegaEditando(bodega);
    setNombre(bodega.nombre || "");
    setIdEstado(bodega.id_estado?.toString() || "");
    setMostrarFormulario(true);
  };

  const handleCambiarEstado = (bodega: Bodega) => {
    setBodegaCambiandoEstado(bodega);
    setNuevoEstadoId(bodega.id_estado?.toString() || "");
    setMostrarDialogoCambiarEstado(true);
  };

  const handleConfirmarCambioEstado = async () => {
    if (!bodegaCambiandoEstado || !nuevoEstadoId) {
      toast({
        title: "Error",
        description: "Debe seleccionar un estado",
        variant: "destructive",
      });
      return;
    }

    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/api/bodegas/${bodegaCambiandoEstado.id_bodega}/estado`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id_estado: parseInt(nuevoEstadoId),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Error al cambiar el estado de la bodega");
      }

      toast({
        title: "Éxito",
        description: "Estado de bodega cambiado exitosamente",
      });

      // Recargar bodegas
      const bodegasRes = await fetch(`${API_BASE_URL}/api/bodegas");
      const bodegasData = await bodegasRes.json();
      if (bodegasData.success) {
        setBodegas(bodegasData.bodegas);
      }

      setMostrarDialogoCambiarEstado(false);
      setBodegaCambiandoEstado(null);
      setNuevoEstadoId("");
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Error al cambiar el estado de la bodega",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleArchivarConfirmado = async () => {
    // Obtener el estado "Eliminado" (id 3) o el estado con id 3
    const estadoEliminado = catalogos?.estados.find(e => e.id_estado === 3);
    
    if (!estadoEliminado) {
      toast({
        title: "Error",
        description: "No se encontró el estado para archivar",
        variant: "destructive",
      });
      return;
    }

    try {
      setLoading(true);
      const promesas = Array.from(bodegasSeleccionadas).map((id) =>
        fetch(`${API_BASE_URL}/api/bodegas/${id}/estado`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id_estado: 3, // Estado eliminado
          }),
        })
      );

      await Promise.all(promesas);

      toast({
        title: "Éxito",
        description: `${bodegasSeleccionadas.size} bodega(s) archivada(s) exitosamente`,
      });

      // Recargar bodegas
      const bodegasRes = await fetch(`${API_BASE_URL}/api/bodegas");
      const bodegasData = await bodegasRes.json();
      if (bodegasData.success) {
        setBodegas(bodegasData.bodegas);
      }

      setBodegasSeleccionadas(new Set());
      setMostrarDialogoArchivar(false);
    } catch (error) {
      toast({
        title: "Error",
        description: "Error al archivar las bodegas",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageContainer>
      <div className="flex items-center justify-between">
        <PageTitle title="Gestionar Bodegas" />
        <Button
          onClick={() => setMostrarFormulario(!mostrarFormulario)}
          className="flex items-center gap-2"
        >
          <Plus className="h-4 w-4" />
          Agregar Bodega
        </Button>
      </div>

      {/* Formulario para agregar/editar bodega */}
      {mostrarFormulario && (
        <FormCard title={bodegaEditando ? "Editar Bodega" : "Agregar Nueva Bodega"}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="nombre">Nombre</Label>
              <Input
                id="nombre"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                placeholder="Ingrese el nombre de la bodega"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="estado">Estado</Label>
              <Select value={idEstado} onValueChange={setIdEstado} disabled={loadingCatalogos}>
                <SelectTrigger id="estado">
                  <SelectValue placeholder="Seleccione el estado" />
                </SelectTrigger>
                <SelectContent>
                  {catalogos?.estados.map((estado) => (
                    <SelectItem key={estado.id_estado} value={estado.id_estado.toString()}>
                      {estado.nombre}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="flex gap-2">
            <Button 
              onClick={handleAgregarBodega} 
              className="flex-1"
              disabled={guardando}
            >
              {guardando ? "Guardando..." : bodegaEditando ? "Actualizar Bodega" : "Guardar Bodega"}
            </Button>
            <Button
              variant="outline"
              onClick={() => {
                setMostrarFormulario(false);
                limpiarFormulario();
              }}
              disabled={guardando}
            >
              Cancelar
            </Button>
          </div>
        </FormCard>
      )}

      {/* Barra de búsqueda */}
      <SearchBar
        placeholder="Buscar por ID o nombre..."
        value={busqueda}
        onChange={setBusqueda}
      />

      {/* Tabla de bodegas */}
      <TableCard
        headers={["", "ID", "Nombre", "Estado", "Acciones"]}
        emptyMessage={
          loading
            ? "Cargando bodegas..."
            : bodegasFiltradas.length === 0
            ? bodegas.length === 0
              ? "No hay bodegas registradas"
              : "No se encontraron bodegas"
            : undefined
        }
        colSpan={5}
      >
        {bodegasPaginadas.map((bodega) => (
          <TableRow key={bodega.id_bodega}>
            <TableCell className="border-r border-border w-12">
              <Checkbox
                checked={bodegasSeleccionadas.has(bodega.id_bodega)}
                onCheckedChange={(checked) =>
                  handleCheckbox(bodega.id_bodega, checked as boolean)
                }
              />
            </TableCell>
            <TableCell className="border-r border-border font-medium">
              {bodega.id_bodega}
            </TableCell>
            <TableCell className="border-r border-border">
              {bodega.nombre}
            </TableCell>
            <TableCell className="border-r border-border">
              {bodega.estado_nombre ? (
                <span 
                  className="px-2 py-1 rounded text-xs font-medium"
                  style={{ 
                    backgroundColor: bodega.estado_color ? `${bodega.estado_color}20` : '#f3f4f6',
                    color: bodega.estado_color || '#374151'
                  }}
                >
                  {bodega.estado_nombre}
                </span>
              ) : "N/A"}
            </TableCell>
            <TableCell>
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleEditarBodega(bodega)}
                  title="Editar bodega"
                >
                  <Edit className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleCambiarEstado(bodega)}
                  title="Cambiar estado"
                >
                  <RefreshCw className="h-4 w-4" />
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableCard>

      {/* Paginación */}
      {totalPaginas > 1 && (
        <div className="mt-4">
          <div className="text-sm text-muted-foreground text-center mb-2">
            Mostrando {bodegasPaginadas.length} de {bodegasFiltradas.length} bodega(s)
          </div>
          <Pagination
            paginaActual={paginaActual}
            totalPaginas={totalPaginas}
            onPageChange={setPaginaActual}
          />
        </div>
      )}

      {/* Botón Archivar */}
      {bodegasSeleccionadas.size > 0 && (
        <ActionButton
          icon={Archive}
          text="Archivar"
          count={bodegasSeleccionadas.size}
          onClick={() => setMostrarDialogoArchivar(true)}
        />
      )}

      {/* Diálogo de confirmación para archivar */}
      <ConfirmDialog
        open={mostrarDialogoArchivar}
        onOpenChange={setMostrarDialogoArchivar}
        description={`Se cambiará el estado de ${bodegasSeleccionadas.size} bodega(s) a "Eliminado". Esta acción puede deshacerse más tarde.`}
        confirmText="Sí, archivar"
        cancelText="Cancelar"
        onConfirm={handleArchivarConfirmado}
      />

      {/* Diálogo para cambiar estado de una bodega */}
      <Dialog open={mostrarDialogoCambiarEstado} onOpenChange={setMostrarDialogoCambiarEstado}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Cambiar Estado de Bodega</DialogTitle>
            <DialogDescription>
              Seleccione el nuevo estado para la bodega "{bodegaCambiandoEstado?.nombre}"
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="nuevo-estado">Estado</Label>
              <Select value={nuevoEstadoId} onValueChange={setNuevoEstadoId} disabled={loadingCatalogos}>
                <SelectTrigger id="nuevo-estado">
                  <SelectValue placeholder="Seleccione el estado" />
                </SelectTrigger>
                <SelectContent>
                  {catalogos?.estados.map((estado) => (
                    <SelectItem key={estado.id_estado} value={estado.id_estado.toString()}>
                      {estado.nombre}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex gap-2 justify-end">
              <Button
                variant="outline"
                onClick={() => {
                  setMostrarDialogoCambiarEstado(false);
                  setBodegaCambiandoEstado(null);
                  setNuevoEstadoId("");
                }}
                disabled={loading}
              >
                Cancelar
              </Button>
              <Button
                onClick={handleConfirmarCambioEstado}
                disabled={loading || !nuevoEstadoId}
              >
                {loading ? "Cambiando..." : "Cambiar Estado"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </PageContainer>
  );
};

export default GestionarBodegas;

