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
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import PageContainer from "@/components/PageContainer";
import PageTitle from "@/components/PageTitle";
import TableCard from "@/components/TableCard";
import FormCard from "@/components/FormCard";
import { useToast } from "@/hooks/use-toast";
import { Plus, Edit, Trash2, X, Check } from "lucide-react";

interface TipoMaquina {
  id_tipo_maquina: number;
  nombre: string;
  descripcion: string | null;
}

interface Maquina {
  id_maquina: number;
  id_tipo_maquina: number | null;
  nombre: string;
  observaciones: string | null;
  tipo_maquina_nombre?: string;
}

type TipoTab = "tipo-maquina" | "maquina";

const ConfiguracionProduccion = () => {
  const { toast } = useToast();
  const [tabActivo, setTabActivo] = useState<TipoTab>("tipo-maquina");
  
  // Estados para cada tipo de registro
  const [tiposMaquina, setTiposMaquina] = useState<TipoMaquina[]>([]);
  const [maquinas, setMaquinas] = useState<Maquina[]>([]);
  
  // Estados para edición
  const [editandoId, setEditandoId] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  
  // Estados para formulario de tipo_maquina
  const [formTipoMaquina, setFormTipoMaquina] = useState({
    nombre: "",
    descripcion: "",
  });
  
  // Estados para formulario de maquina
  const [formMaquina, setFormMaquina] = useState({
    id_tipo_maquina: "",
    nombre: "",
    observaciones: "",
  });

  // Cargar datos según la pestaña activa
  useEffect(() => {
    cargarDatos(tabActivo);
  }, [tabActivo]);

  // Cargar tipos de máquina cuando se abre el tab de máquinas
  useEffect(() => {
    if (tabActivo === "maquina" && tiposMaquina.length === 0) {
      cargarDatos("tipo-maquina");
    }
  }, [tabActivo]);

  const cargarDatos = async (tipo: TipoTab) => {
    try {
      setLoading(true);
      const endpoint = tipo === "tipo-maquina" 
        ? "http://localhost:4000/api/configuracion-produccion/tipo-maquina"
        : "http://localhost:4000/api/configuracion-produccion/maquina";
      
      const response = await fetch(endpoint);
      const data = await response.json();

      if (data.success) {
        if (tipo === "tipo-maquina") {
          setTiposMaquina(data.tiposMaquina || []);
        } else {
          setMaquinas(data.maquinas || []);
        }
      }
    } catch (error) {
      toast({
        title: "Error",
        description: `No se pudieron cargar los ${tipo === "tipo-maquina" ? "tipos de máquina" : "máquinas"}`,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCrearTipoMaquina = async () => {
    if (!formTipoMaquina.nombre.trim()) {
      toast({
        title: "Error",
        description: "El nombre es obligatorio",
        variant: "destructive",
      });
      return;
    }

    try {
      setLoading(true);
      const response = await fetch("http://localhost:4000/api/configuracion-produccion/tipo-maquina", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nombre: formTipoMaquina.nombre.trim(),
          descripcion: formTipoMaquina.descripcion.trim() || null,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Error al crear");
      }

      toast({
        title: "Éxito",
        description: "Tipo de máquina creado exitosamente",
      });

      setFormTipoMaquina({ nombre: "", descripcion: "" });
      cargarDatos("tipo-maquina");
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

  const handleCrearMaquina = async () => {
    if (!formMaquina.nombre.trim()) {
      toast({
        title: "Error",
        description: "El nombre es obligatorio",
        variant: "destructive",
      });
      return;
    }

    try {
      setLoading(true);
      const response = await fetch("http://localhost:4000/api/configuracion-produccion/maquina", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id_tipo_maquina: formMaquina.id_tipo_maquina && formMaquina.id_tipo_maquina !== "none" ? parseInt(formMaquina.id_tipo_maquina) : null,
          nombre: formMaquina.nombre.trim(),
          observaciones: formMaquina.observaciones.trim() || null,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Error al crear");
      }

      toast({
        title: "Éxito",
        description: "Máquina creada exitosamente",
      });

      setFormMaquina({ id_tipo_maquina: "", nombre: "", observaciones: "" });
      cargarDatos("maquina");
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

  const handleIniciarEdicionTipoMaquina = (tipoMaquina: TipoMaquina) => {
    if (editandoId !== null) {
      handleCancelarEdicion();
    }
    setEditandoId(tipoMaquina.id_tipo_maquina);
    setFormTipoMaquina({
      nombre: tipoMaquina.nombre,
      descripcion: tipoMaquina.descripcion || "",
    });
  };

  const handleIniciarEdicionMaquina = (maquina: Maquina) => {
    if (editandoId !== null) {
      handleCancelarEdicion();
    }
    setEditandoId(maquina.id_maquina);
    setFormMaquina({
      id_tipo_maquina: maquina.id_tipo_maquina?.toString() || "none",
      nombre: maquina.nombre,
      observaciones: maquina.observaciones || "",
    });
  };

  const handleCancelarEdicion = () => {
    setEditandoId(null);
    setFormTipoMaquina({ nombre: "", descripcion: "" });
    setFormMaquina({ id_tipo_maquina: "none", nombre: "", observaciones: "" });
  };

  const handleGuardarEdicionTipoMaquina = async () => {
    if (!formTipoMaquina.nombre.trim() || !editandoId) {
      toast({
        title: "Error",
        description: "El nombre es obligatorio",
        variant: "destructive",
      });
      return;
    }

    try {
      setLoading(true);
      const response = await fetch(`http://localhost:4000/api/configuracion-produccion/tipo-maquina/${editandoId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nombre: formTipoMaquina.nombre.trim(),
          descripcion: formTipoMaquina.descripcion.trim() || null,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Error al actualizar");
      }

      toast({
        title: "Éxito",
        description: "Tipo de máquina actualizado exitosamente",
      });

      handleCancelarEdicion();
      await cargarDatos("tipo-maquina");
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

  const handleGuardarEdicionMaquina = async () => {
    if (!formMaquina.nombre.trim() || !editandoId) {
      toast({
        title: "Error",
        description: "El nombre es obligatorio",
        variant: "destructive",
      });
      return;
    }

    try {
      setLoading(true);
      const response = await fetch(`http://localhost:4000/api/configuracion-produccion/maquina/${editandoId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id_tipo_maquina: formMaquina.id_tipo_maquina && formMaquina.id_tipo_maquina !== "none" ? parseInt(formMaquina.id_tipo_maquina) : null,
          nombre: formMaquina.nombre.trim(),
          observaciones: formMaquina.observaciones.trim() || null,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Error al actualizar");
      }

      toast({
        title: "Éxito",
        description: "Máquina actualizada exitosamente",
      });

      handleCancelarEdicion();
      await cargarDatos("maquina");
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

  const handleEliminarTipoMaquina = async (id: number) => {
    if (!confirm("¿Está seguro de eliminar este tipo de máquina?")) {
      return;
    }

    try {
      setLoading(true);
      const response = await fetch(`http://localhost:4000/api/configuracion-produccion/tipo-maquina/${id}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Error al eliminar");
      }

      toast({
        title: "Éxito",
        description: "Tipo de máquina eliminado exitosamente",
      });

      cargarDatos("tipo-maquina");
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

  const handleEliminarMaquina = async (id: number) => {
    if (!confirm("¿Está seguro de eliminar esta máquina?")) {
      return;
    }

    try {
      setLoading(true);
      const response = await fetch(`http://localhost:4000/api/configuracion-produccion/maquina/${id}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Error al eliminar");
      }

      toast({
        title: "Éxito",
        description: "Máquina eliminada exitosamente",
      });

      cargarDatos("maquina");
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

  return (
    <PageContainer>
      <PageTitle title="Configuración de Producción" />

      <Tabs value={tabActivo} onValueChange={(value) => setTabActivo(value as TipoTab)} className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="tipo-maquina">Tipo de Máquina</TabsTrigger>
          <TabsTrigger value="maquina">Máquinas</TabsTrigger>
        </TabsList>

        {/* Tab: Tipo de Máquina */}
        <TabsContent value="tipo-maquina" className="space-y-4">
          <FormCard title={editandoId && tiposMaquina.find(tm => tm.id_tipo_maquina === editandoId) ? "Editar Tipo de Máquina" : "Agregar Tipo de Máquina"}>
            <div className="space-y-4">
              <div>
                <Label htmlFor="nombre-tipo-maquina">Nombre *</Label>
                <Input
                  id="nombre-tipo-maquina"
                  value={formTipoMaquina.nombre}
                  onChange={(e) => setFormTipoMaquina({ ...formTipoMaquina, nombre: e.target.value })}
                  placeholder="Ej: Aglutinadora, Peletizadora, Extrusora"
                />
              </div>
              <div>
                <Label htmlFor="descripcion-tipo-maquina">Descripción</Label>
                <Textarea
                  id="descripcion-tipo-maquina"
                  value={formTipoMaquina.descripcion}
                  onChange={(e) => setFormTipoMaquina({ ...formTipoMaquina, descripcion: e.target.value })}
                  placeholder="Descripción del tipo de máquina"
                  rows={3}
                />
              </div>
              <div className="flex gap-2">
                {editandoId ? (
                  <>
                    <Button onClick={handleGuardarEdicionTipoMaquina} disabled={loading}>
                      <Check className="h-4 w-4 mr-2" />
                      Guardar
                    </Button>
                    <Button variant="outline" onClick={handleCancelarEdicion} disabled={loading}>
                      <X className="h-4 w-4 mr-2" />
                      Cancelar
                    </Button>
                  </>
                ) : (
                  <Button onClick={handleCrearTipoMaquina} disabled={loading}>
                    <Plus className="h-4 w-4 mr-2" />
                    Agregar
                  </Button>
                )}
              </div>
            </div>
          </FormCard>

          <TableCard
            headers={["ID", "Nombre", "Descripción", "Acciones"]}
            emptyMessage={
              loading
                ? "Cargando tipos de máquina..."
                : tiposMaquina.length === 0
                ? "No hay tipos de máquina registrados"
                : undefined
            }
            colSpan={4}
          >
            {tiposMaquina.map((tipoMaquina) => (
              <TableRow key={tipoMaquina.id_tipo_maquina}>
                <TableCell className="font-medium">{tipoMaquina.id_tipo_maquina}</TableCell>
                <TableCell>{tipoMaquina.nombre}</TableCell>
                <TableCell className="max-w-md">
                  <p className="truncate">{tipoMaquina.descripcion || "-"}</p>
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleIniciarEdicionTipoMaquina(tipoMaquina)}
                      disabled={loading || (editandoId !== null && editandoId !== tipoMaquina.id_tipo_maquina)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEliminarTipoMaquina(tipoMaquina.id_tipo_maquina)}
                      disabled={loading || editandoId !== null}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableCard>
        </TabsContent>

        {/* Tab: Máquinas */}
        <TabsContent value="maquina" className="space-y-4">
          <FormCard title={editandoId && maquinas.find(m => m.id_maquina === editandoId) ? "Editar Máquina" : "Agregar Máquina"}>
            <div className="space-y-4">
              <div>
                <Label htmlFor="maquina-tipo">Tipo de Máquina</Label>
                <Select
                  value={formMaquina.id_tipo_maquina || "none"}
                  onValueChange={(value) =>
                    setFormMaquina({ ...formMaquina, id_tipo_maquina: value === "none" ? "" : value })
                  }
                >
                  <SelectTrigger id="maquina-tipo">
                    <SelectValue placeholder="Seleccione un tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">Sin tipo</SelectItem>
                    {tiposMaquina.map((tipo) => (
                      <SelectItem key={tipo.id_tipo_maquina} value={tipo.id_tipo_maquina.toString()}>
                        {tipo.nombre}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="maquina-nombre">Nombre *</Label>
                <Input
                  id="maquina-nombre"
                  value={formMaquina.nombre}
                  onChange={(e) => setFormMaquina({ ...formMaquina, nombre: e.target.value })}
                  placeholder="Ej: Extru1, Aglu, Pele"
                />
              </div>
              <div>
                <Label htmlFor="maquina-observaciones">Observaciones</Label>
                <Textarea
                  id="maquina-observaciones"
                  value={formMaquina.observaciones}
                  onChange={(e) => setFormMaquina({ ...formMaquina, observaciones: e.target.value })}
                  placeholder="Observaciones sobre la máquina"
                  rows={3}
                />
              </div>
              <div className="flex gap-2">
                {editandoId ? (
                  <>
                    <Button onClick={handleGuardarEdicionMaquina} disabled={loading}>
                      <Check className="h-4 w-4 mr-2" />
                      Guardar
                    </Button>
                    <Button variant="outline" onClick={handleCancelarEdicion} disabled={loading}>
                      <X className="h-4 w-4 mr-2" />
                      Cancelar
                    </Button>
                  </>
                ) : (
                  <Button onClick={handleCrearMaquina} disabled={loading}>
                    <Plus className="h-4 w-4 mr-2" />
                    Agregar
                  </Button>
                )}
              </div>
            </div>
          </FormCard>

          <TableCard
            headers={["ID", "Tipo", "Nombre", "Observaciones", "Acciones"]}
            emptyMessage={
              loading
                ? "Cargando máquinas..."
                : maquinas.length === 0
                ? "No hay máquinas registradas"
                : undefined
            }
            colSpan={5}
          >
            {maquinas.map((maquina) => (
              <TableRow key={maquina.id_maquina}>
                <TableCell className="font-medium">{maquina.id_maquina}</TableCell>
                <TableCell>{maquina.tipo_maquina_nombre || "-"}</TableCell>
                <TableCell>{maquina.nombre}</TableCell>
                <TableCell className="max-w-md">
                  <p className="truncate">{maquina.observaciones || "-"}</p>
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleIniciarEdicionMaquina(maquina)}
                      disabled={loading || (editandoId !== null && editandoId !== maquina.id_maquina)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEliminarMaquina(maquina.id_maquina)}
                      disabled={loading || editandoId !== null}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableCard>
        </TabsContent>
      </Tabs>
    </PageContainer>
  );
};

export default ConfiguracionProduccion;
