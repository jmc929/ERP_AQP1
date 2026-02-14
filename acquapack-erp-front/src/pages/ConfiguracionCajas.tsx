import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import PageContainer from "@/components/PageContainer";
import PageTitle from "@/components/PageTitle";
import TableCard from "@/components/TableCard";
import FormCard from "@/components/FormCard";
import { useToast } from "@/hooks/use-toast";
import { Plus, Edit, Trash2, X, Check, Archive, RotateCcw } from "lucide-react";

interface TipoMovimiento {
  id_tipo_movimiento: number;
  nombre: string;
}

interface Caja {
  id_caja: number;
  nombre: string;
  descripcion: string | null;
  saldo_actual: number;
  id_estado: number;
  estado_nombre?: string;
  estado_color?: string;
}

interface Estado {
  id_estado: number;
  nombre: string;
  color: string;
}

type TipoTab = "tipo-movimiento" | "cajas";

const ConfiguracionCajas = () => {
  const { toast } = useToast();
  const [tabActivo, setTabActivo] = useState<TipoTab>("tipo-movimiento");
  
  // Estados para cada tipo de registro
  const [tiposMovimiento, setTiposMovimiento] = useState<TipoMovimiento[]>([]);
  const [cajas, setCajas] = useState<Caja[]>([]);
  const [estados, setEstados] = useState<Estado[]>([]);
  
  // Estados para edición
  const [editandoId, setEditandoId] = useState<number | null>(null);
  const [nombreEditando, setNombreEditando] = useState("");
  const [loading, setLoading] = useState(false);
  
  // Estados para formulario de tipo_movimiento
  const [nombreNuevo, setNombreNuevo] = useState("");
  
  // Estados para formulario de cajas
  const [formCaja, setFormCaja] = useState({
    nombre: "",
    descripcion: "",
    saldo_actual: "",
    id_estado: "",
  });

  // Cargar datos según la pestaña activa
  useEffect(() => {
    cargarDatos(tabActivo);
    if (tabActivo === "cajas") {
      cargarEstados();
    }
  }, [tabActivo]);

  const cargarEstados = async () => {
    try {
      const response = await fetch("http://localhost:4000/api/configuracion-cajas/estados");
      const data = await response.json();
      if (data.success) {
        setEstados(data.estados || []);
      }
    } catch (error) {
      console.error("Error al cargar estados:", error);
    }
  };

  const cargarDatos = async (tipo: TipoTab) => {
    try {
      setLoading(true);
      const endpoint = tipo === "tipo-movimiento" 
        ? "http://localhost:4000/api/configuracion-cajas/tipo-movimiento"
        : "http://localhost:4000/api/configuracion-cajas/cajas";
      
      const response = await fetch(endpoint);
      const data = await response.json();

      if (data.success) {
        if (tipo === "tipo-movimiento") {
          setTiposMovimiento(data.tiposMovimiento || []);
        } else {
          setCajas(data.cajas || []);
        }
      }
    } catch (error) {
      toast({
        title: "Error",
        description: `No se pudieron cargar los ${tipo === "tipo-movimiento" ? "tipos de movimiento" : "cajas"}`,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCrearTipoMovimiento = async () => {
    if (!nombreNuevo.trim()) {
      toast({
        title: "Error",
        description: "El nombre es obligatorio",
        variant: "destructive",
      });
      return;
    }

    try {
      setLoading(true);
      const response = await fetch("http://localhost:4000/api/configuracion-cajas/tipo-movimiento", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ nombre: nombreNuevo.trim() }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Error al crear");
      }

      toast({
        title: "Éxito",
        description: "Tipo de movimiento creado exitosamente",
      });

      setNombreNuevo("");
      cargarDatos("tipo-movimiento");
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Error al crear",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCrearCaja = async () => {
    if (!formCaja.nombre.trim()) {
      toast({
        title: "Error",
        description: "El nombre es obligatorio",
        variant: "destructive",
      });
      return;
    }

    if (!formCaja.id_estado) {
      toast({
        title: "Error",
        description: "El estado es obligatorio",
        variant: "destructive",
      });
      return;
    }

    try {
      setLoading(true);
      const response = await fetch("http://localhost:4000/api/configuracion-cajas/cajas", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nombre: formCaja.nombre.trim(),
          descripcion: formCaja.descripcion.trim() || null,
          saldo_actual: parseFloat(formCaja.saldo_actual) || 0,
          id_estado: parseInt(formCaja.id_estado),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Error al crear");
      }

      toast({
        title: "Éxito",
        description: "Caja creada exitosamente",
      });

      setFormCaja({ nombre: "", descripcion: "", saldo_actual: "", id_estado: "" });
      cargarDatos("cajas");
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Error al crear",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleIniciarEdicion = (id: number, nombre: string) => {
    if (editandoId !== null) {
      handleCancelarEdicion();
    }
    setEditandoId(id);
    setNombreEditando(nombre);
  };

  const handleCancelarEdicion = () => {
    setEditandoId(null);
    setNombreEditando("");
  };

  const handleGuardarEdicion = async () => {
    if (!nombreEditando.trim()) {
      toast({
        title: "Error",
        description: "El nombre es obligatorio",
        variant: "destructive",
      });
      return;
    }

    if (!editandoId) return;

    try {
      setLoading(true);
      const endpoint = tabActivo === "tipo-movimiento"
        ? `http://localhost:4000/api/configuracion-cajas/tipo-movimiento/${editandoId}`
        : `http://localhost:4000/api/configuracion-cajas/cajas/${editandoId}`;
      
      const body = tabActivo === "tipo-movimiento"
        ? { nombre: nombreEditando.trim() }
        : { nombre: nombreEditando.trim() };

      const response = await fetch(endpoint, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Error al actualizar");
      }

      toast({
        title: "Éxito",
        description: `${tabActivo === "tipo-movimiento" ? "Tipo de movimiento" : "Caja"} actualizado exitosamente`,
      });

      setEditandoId(null);
      setNombreEditando("");
      cargarDatos(tabActivo);
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Error al actualizar",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleEliminarTipoMovimiento = async (id: number) => {
    if (!confirm("¿Está seguro de eliminar este tipo de movimiento?")) {
      return;
    }

    try {
      setLoading(true);
      const response = await fetch(`http://localhost:4000/api/configuracion-cajas/tipo-movimiento/${id}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Error al eliminar");
      }

      toast({
        title: "Éxito",
        description: "Tipo de movimiento eliminado exitosamente",
      });

      cargarDatos("tipo-movimiento");
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Error al eliminar",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleArchivarCaja = async (id: number) => {
    // Buscar estado "Eliminado" o "Archivado"
    const estadoArchivado = estados.find(e => 
      e.nombre.toLowerCase().includes("eliminado") || 
      e.nombre.toLowerCase().includes("archivado")
    ) || estados.find(e => e.id_estado === 3);

    if (!estadoArchivado) {
      toast({
        title: "Error",
        description: "No se encontró el estado para archivar",
        variant: "destructive",
      });
      return;
    }

    if (!confirm(`¿Está seguro de archivar esta caja?`)) {
      return;
    }

    try {
      setLoading(true);
      const response = await fetch(`http://localhost:4000/api/configuracion-cajas/cajas/${id}/archivar`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id_estado: estadoArchivado.id_estado,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Error al archivar");
      }

      toast({
        title: "Éxito",
        description: "Caja archivada exitosamente",
      });

      cargarDatos("cajas");
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Error al archivar",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDesarchivarCaja = async (id: number) => {
    if (!confirm(`¿Está seguro de desarchivar esta caja?`)) {
      return;
    }

    try {
      setLoading(true);
      const response = await fetch(`http://localhost:4000/api/configuracion-cajas/cajas/${id}/desarchivar`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Error al desarchivar");
      }

      toast({
        title: "Éxito",
        description: "Caja desarchivada exitosamente",
      });

      cargarDatos("cajas");
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Error al desarchivar",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  // Función para verificar si una caja está archivada
  const estaArchivada = (caja: Caja): boolean => {
    const estadoArchivado = estados.find(e => 
      e.nombre.toLowerCase().includes("eliminado") || 
      e.nombre.toLowerCase().includes("archivado")
    );
    if (!estadoArchivado) return false;
    return caja.id_estado === estadoArchivado.id_estado;
  };

  return (
    <PageContainer>
      <PageTitle>Configuración de Cajas</PageTitle>

      <Tabs value={tabActivo} onValueChange={(value) => setTabActivo(value as TipoTab)} className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="tipo-movimiento">Tipo de Movimiento</TabsTrigger>
          <TabsTrigger value="cajas">Cajas</TabsTrigger>
        </TabsList>

        <TabsContent value="tipo-movimiento" className="space-y-4">
          <FormCard title="Agregar Tipo de Movimiento">
            <div className="flex gap-4">
              <div className="flex-1">
                <Label htmlFor="nombre-tipo-movimiento">Nombre</Label>
                <Input
                  id="nombre-tipo-movimiento"
                  value={nombreNuevo}
                  onChange={(e) => setNombreNuevo(e.target.value)}
                  placeholder="Ingrese el nombre del tipo de movimiento"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleCrearTipoMovimiento();
                    }
                  }}
                />
              </div>
              <div className="flex items-end">
                <Button onClick={handleCrearTipoMovimiento} disabled={loading || editandoId !== null}>
                  <Plus className="h-4 w-4 mr-2" />
                  Agregar
                </Button>
              </div>
            </div>
          </FormCard>

          <TableCard
            headers={["ID", "Nombre", "Acciones"]}
            emptyMessage={
              loading
                ? "Cargando tipos de movimiento..."
                : tiposMovimiento.length === 0
                ? "No hay tipos de movimiento registrados"
                : undefined
            }
            colSpan={3}
          >
            {tiposMovimiento.map((tipo) => (
              <TableRow key={tipo.id_tipo_movimiento}>
                <TableCell className="font-medium">{tipo.id_tipo_movimiento}</TableCell>
                <TableCell>
                  {editandoId === tipo.id_tipo_movimiento ? (
                    <Input
                      value={nombreEditando}
                      onChange={(e) => setNombreEditando(e.target.value)}
                      className="max-w-xs"
                      autoFocus
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          handleGuardarEdicion();
                        } else if (e.key === "Escape") {
                          handleCancelarEdicion();
                        }
                      }}
                    />
                  ) : (
                    tipo.nombre
                  )}
                </TableCell>
                <TableCell>
                  {editandoId === tipo.id_tipo_movimiento ? (
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={handleGuardarEdicion}
                        disabled={loading}
                      >
                        <Check className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={handleCancelarEdicion}
                        disabled={loading}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ) : (
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleIniciarEdicion(tipo.id_tipo_movimiento, tipo.nombre)}
                        disabled={loading || editandoId !== null}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEliminarTipoMovimiento(tipo.id_tipo_movimiento)}
                        disabled={loading || editandoId !== null}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableCard>
        </TabsContent>

        <TabsContent value="cajas" className="space-y-4">
          <FormCard title="Agregar Caja">
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="nombre-caja">Nombre *</Label>
                  <Input
                    id="nombre-caja"
                    value={formCaja.nombre}
                    onChange={(e) => setFormCaja({ ...formCaja, nombre: e.target.value })}
                    placeholder="Ingrese el nombre de la caja"
                  />
                </div>
                <div>
                  <Label htmlFor="estado-caja">Estado *</Label>
                  <Select
                    value={formCaja.id_estado}
                    onValueChange={(value) => setFormCaja({ ...formCaja, id_estado: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccione un estado" />
                    </SelectTrigger>
                    <SelectContent>
                      {estados.map((estado) => (
                        <SelectItem key={estado.id_estado} value={estado.id_estado.toString()}>
                          {estado.nombre}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div>
                <Label htmlFor="descripcion-caja">Descripción</Label>
                <Textarea
                  id="descripcion-caja"
                  value={formCaja.descripcion}
                  onChange={(e) => setFormCaja({ ...formCaja, descripcion: e.target.value })}
                  placeholder="Ingrese la descripción de la caja"
                  rows={3}
                />
              </div>
              <div>
                <Label htmlFor="saldo-caja">Saldo Inicial</Label>
                <Input
                  id="saldo-caja"
                  type="number"
                  step="0.01"
                  value={formCaja.saldo_actual}
                  onChange={(e) => setFormCaja({ ...formCaja, saldo_actual: e.target.value })}
                  placeholder="0.00"
                />
              </div>
              <div className="flex justify-end">
                <Button onClick={handleCrearCaja} disabled={loading || editandoId !== null}>
                  <Plus className="h-4 w-4 mr-2" />
                  Agregar
                </Button>
              </div>
            </div>
          </FormCard>

          <TableCard
            headers={["ID", "Nombre", "Descripción", "Saldo Actual", "Estado", "Acciones"]}
            emptyMessage={
              loading
                ? "Cargando cajas..."
                : cajas.length === 0
                ? "No hay cajas registradas"
                : undefined
            }
            colSpan={6}
          >
            {cajas.map((caja) => (
              <TableRow key={caja.id_caja}>
                <TableCell className="font-medium">{caja.id_caja}</TableCell>
                <TableCell>
                  {editandoId === caja.id_caja ? (
                    <Input
                      value={nombreEditando}
                      onChange={(e) => setNombreEditando(e.target.value)}
                      className="max-w-xs"
                      autoFocus
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          handleGuardarEdicion();
                        } else if (e.key === "Escape") {
                          handleCancelarEdicion();
                        }
                      }}
                    />
                  ) : (
                    caja.nombre
                  )}
                </TableCell>
                <TableCell className="max-w-md">
                  <p className="truncate">{caja.descripcion || "-"}</p>
                </TableCell>
                <TableCell className="font-medium">
                  ${new Intl.NumberFormat("es-CO", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  }).format(caja.saldo_actual)}
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
                  {editandoId === caja.id_caja ? (
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={handleGuardarEdicion}
                        disabled={loading}
                      >
                        <Check className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={handleCancelarEdicion}
                        disabled={loading}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ) : (
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleIniciarEdicion(caja.id_caja, caja.nombre)}
                        disabled={loading || editandoId !== null}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      {estaArchivada(caja) ? (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDesarchivarCaja(caja.id_caja)}
                          disabled={loading || editandoId !== null}
                          title="Desarchivar caja"
                        >
                          <RotateCcw className="h-4 w-4" />
                        </Button>
                      ) : (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleArchivarCaja(caja.id_caja)}
                          disabled={loading || editandoId !== null}
                          title="Archivar caja"
                        >
                          <Archive className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableCard>
        </TabsContent>
      </Tabs>
    </PageContainer>
  );
};

export default ConfiguracionCajas;

