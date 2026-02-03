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
import PageContainer from "@/components/PageContainer";
import PageTitle from "@/components/PageTitle";
import TableCard from "@/components/TableCard";
import FormCard from "@/components/FormCard";
import { useToast } from "@/hooks/use-toast";
import { Plus, Edit, Trash2, X, Check } from "lucide-react";

interface TipoHora {
  id_tipo_hora: number;
  nombre: string;
  horario: string | null;
  recargo: string | null;
  valor_hora: number;
  id_estado: number;
  estado_nombre?: string;
  estado_color?: string;
}

interface TipoDeduccion {
  id_tipo_deduccion: number;
  nombre: string;
  descripcion: string | null;
  id_estado: number;
  estado_nombre?: string;
  estado_color?: string;
}

type TipoTab = "tipo-hora" | "tipo-deduccion";

const ConfiguracionNomina = () => {
  const { toast } = useToast();
  const [tabActivo, setTabActivo] = useState<TipoTab>("tipo-hora");
  
  // Estados para cada tipo de registro
  const [tiposHora, setTiposHora] = useState<TipoHora[]>([]);
  const [tiposDeduccion, setTiposDeduccion] = useState<TipoDeduccion[]>([]);
  
  // Estados para edición
  const [editandoId, setEditandoId] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  
  // Estados para formulario de tipo_hora
  const [formTipoHora, setFormTipoHora] = useState({
    nombre: "",
    horario: "",
    recargo: "",
    valor_hora: "",
  });
  
  // Estados para formulario de tipo_deduccion
  const [formTipoDeduccion, setFormTipoDeduccion] = useState({
    nombre: "",
    descripcion: "",
  });

  // Cargar datos según la pestaña activa
  useEffect(() => {
    cargarDatos(tabActivo);
  }, [tabActivo]);

  const cargarDatos = async (tipo: TipoTab) => {
    try {
      setLoading(true);
      const endpoint = tipo === "tipo-hora" 
        ? "http://localhost:4000/api/configuracion-nomina/tipo-hora"
        : "http://localhost:4000/api/configuracion-nomina/tipo-deduccion";
      
      const response = await fetch(endpoint);
      const data = await response.json();

      if (data.success) {
        if (tipo === "tipo-hora") {
          setTiposHora(data.tiposHora || []);
        } else {
          setTiposDeduccion(data.tiposDeduccion || []);
        }
      }
    } catch (error) {
      toast({
        title: "Error",
        description: `No se pudieron cargar los ${tipo === "tipo-hora" ? "tipos de hora" : "tipos de deducción"}`,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCrearTipoHora = async () => {
    if (!formTipoHora.nombre.trim()) {
      toast({
        title: "Error",
        description: "El nombre es obligatorio",
        variant: "destructive",
      });
      return;
    }

    try {
      setLoading(true);
      const response = await fetch("http://localhost:4000/api/configuracion-nomina/tipo-hora", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nombre: formTipoHora.nombre.trim(),
          horario: formTipoHora.horario.trim() || null,
          recargo: formTipoHora.recargo.trim() || null,
          valor_hora: parseFloat(formTipoHora.valor_hora) || 0,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Error al crear");
      }

      toast({
        title: "Éxito",
        description: "Tipo de hora creado exitosamente",
      });

      setFormTipoHora({ nombre: "", horario: "", recargo: "", valor_hora: "" });
      cargarDatos("tipo-hora");
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

  const handleCrearTipoDeduccion = async () => {
    if (!formTipoDeduccion.nombre.trim()) {
      toast({
        title: "Error",
        description: "El nombre es obligatorio",
        variant: "destructive",
      });
      return;
    }

    try {
      setLoading(true);
      const response = await fetch("http://localhost:4000/api/configuracion-nomina/tipo-deduccion", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nombre: formTipoDeduccion.nombre.trim(),
          descripcion: formTipoDeduccion.descripcion.trim() || null,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Error al crear");
      }

      toast({
        title: "Éxito",
        description: "Tipo de deducción creado exitosamente",
      });

      setFormTipoDeduccion({ nombre: "", descripcion: "" });
      cargarDatos("tipo-deduccion");
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

  const handleIniciarEdicionTipoHora = (tipoHora: TipoHora) => {
    if (editandoId !== null) {
      handleCancelarEdicion();
    }
    setEditandoId(tipoHora.id_tipo_hora);
    setFormTipoHora({
      nombre: tipoHora.nombre,
      horario: tipoHora.horario || "",
      recargo: tipoHora.recargo || "",
      valor_hora: tipoHora.valor_hora.toString(),
    });
  };

  const handleIniciarEdicionTipoDeduccion = (tipoDeduccion: TipoDeduccion) => {
    if (editandoId !== null) {
      handleCancelarEdicion();
    }
    setEditandoId(tipoDeduccion.id_tipo_deduccion);
    setFormTipoDeduccion({
      nombre: tipoDeduccion.nombre,
      descripcion: tipoDeduccion.descripcion || "",
    });
  };

  const handleCancelarEdicion = () => {
    setEditandoId(null);
    setFormTipoHora({ nombre: "", horario: "", recargo: "", valor_hora: "" });
    setFormTipoDeduccion({ nombre: "", descripcion: "" });
  };

  const handleGuardarEdicionTipoHora = async () => {
    if (!formTipoHora.nombre.trim() || !editandoId) {
      toast({
        title: "Error",
        description: "El nombre es obligatorio",
        variant: "destructive",
      });
      return;
    }

    try {
      setLoading(true);
      const response = await fetch(`http://localhost:4000/api/configuracion-nomina/tipo-hora/${editandoId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nombre: formTipoHora.nombre.trim(),
          horario: formTipoHora.horario.trim() || null,
          recargo: formTipoHora.recargo.trim() || null,
          valor_hora: parseFloat(formTipoHora.valor_hora) || 0,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Error al actualizar");
      }

      toast({
        title: "Éxito",
        description: "Tipo de hora actualizado exitosamente",
      });

      handleCancelarEdicion();
      await cargarDatos("tipo-hora");
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

  const handleGuardarEdicionTipoDeduccion = async () => {
    if (!formTipoDeduccion.nombre.trim() || !editandoId) {
      toast({
        title: "Error",
        description: "El nombre es obligatorio",
        variant: "destructive",
      });
      return;
    }

    try {
      setLoading(true);
      const response = await fetch(`http://localhost:4000/api/configuracion-nomina/tipo-deduccion/${editandoId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nombre: formTipoDeduccion.nombre.trim(),
          descripcion: formTipoDeduccion.descripcion.trim() || null,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Error al actualizar");
      }

      toast({
        title: "Éxito",
        description: "Tipo de deducción actualizado exitosamente",
      });

      handleCancelarEdicion();
      await cargarDatos("tipo-deduccion");
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

  const handleEliminarTipoHora = async (id: number) => {
    if (!confirm("¿Está seguro de eliminar este tipo de hora?")) {
      return;
    }

    try {
      setLoading(true);
      const response = await fetch(`http://localhost:4000/api/configuracion-nomina/tipo-hora/${id}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Error al eliminar");
      }

      toast({
        title: "Éxito",
        description: "Tipo de hora eliminado exitosamente",
      });

      cargarDatos("tipo-hora");
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

  const handleEliminarTipoDeduccion = async (id: number) => {
    if (!confirm("¿Está seguro de eliminar este tipo de deducción?")) {
      return;
    }

    try {
      setLoading(true);
      const response = await fetch(`http://localhost:4000/api/configuracion-nomina/tipo-deduccion/${id}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Error al eliminar");
      }

      toast({
        title: "Éxito",
        description: "Tipo de deducción eliminado exitosamente",
      });

      cargarDatos("tipo-deduccion");
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
      <PageTitle title="Configuración de Nómina" />

      <Tabs value={tabActivo} onValueChange={(value) => setTabActivo(value as TipoTab)} className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="tipo-hora">Tipos de Hora</TabsTrigger>
          <TabsTrigger value="tipo-deduccion">Tipos de Deducción</TabsTrigger>
        </TabsList>

        <TabsContent value="tipo-hora" className="space-y-4">
          <FormCard title={editandoId && tiposHora.find(th => th.id_tipo_hora === editandoId) ? "Editar Tipo de Hora" : "Agregar Tipo de Hora"}>
            <div className="space-y-4">
              <div>
                <Label htmlFor="nombre-tipo-hora">Nombre *</Label>
                <Input
                  id="nombre-tipo-hora"
                  value={formTipoHora.nombre}
                  onChange={(e) => setFormTipoHora({ ...formTipoHora, nombre: e.target.value })}
                  placeholder="Ej: Hora Normal, Hora Extra"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="horario-tipo-hora">Horario</Label>
                  <Input
                    id="horario-tipo-hora"
                    value={formTipoHora.horario}
                    onChange={(e) => setFormTipoHora({ ...formTipoHora, horario: e.target.value })}
                    placeholder="Ej: 6:00 AM - 6:00 PM"
                  />
                </div>
                <div>
                  <Label htmlFor="recargo-tipo-hora">Recargo</Label>
                  <Input
                    id="recargo-tipo-hora"
                    value={formTipoHora.recargo}
                    onChange={(e) => setFormTipoHora({ ...formTipoHora, recargo: e.target.value })}
                    placeholder="Ej: 25%, 35%"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="valor-hora-tipo-hora">Valor Hora</Label>
                <Input
                  id="valor-hora-tipo-hora"
                  type="number"
                  step="0.01"
                  value={formTipoHora.valor_hora}
                  onChange={(e) => setFormTipoHora({ ...formTipoHora, valor_hora: e.target.value })}
                  placeholder="0.00"
                />
              </div>
              <div className="flex gap-2">
                {editandoId ? (
                  <>
                    <Button onClick={handleGuardarEdicionTipoHora} disabled={loading}>
                      <Check className="h-4 w-4 mr-2" />
                      Guardar
                    </Button>
                    <Button variant="outline" onClick={handleCancelarEdicion} disabled={loading}>
                      <X className="h-4 w-4 mr-2" />
                      Cancelar
                    </Button>
                  </>
                ) : (
                  <Button onClick={handleCrearTipoHora} disabled={loading}>
                    <Plus className="h-4 w-4 mr-2" />
                    Agregar
                  </Button>
                )}
              </div>
            </div>
          </FormCard>

          <TableCard
            headers={["ID", "Nombre", "Horario", "Recargo", "Valor Hora", "Acciones"]}
            emptyMessage={
              loading
                ? "Cargando tipos de hora..."
                : tiposHora.length === 0
                ? "No hay tipos de hora registrados"
                : undefined
            }
            colSpan={6}
          >
            {tiposHora.map((tipoHora) => (
              <TableRow key={tipoHora.id_tipo_hora}>
                <TableCell className="font-medium">{tipoHora.id_tipo_hora}</TableCell>
                <TableCell>{tipoHora.nombre}</TableCell>
                <TableCell>{tipoHora.horario || "-"}</TableCell>
                <TableCell>{tipoHora.recargo || "-"}</TableCell>
                <TableCell>${parseFloat(tipoHora.valor_hora.toString()).toLocaleString('es-CO', { minimumFractionDigits: 2 })}</TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleIniciarEdicionTipoHora(tipoHora)}
                      disabled={loading || (editandoId !== null && editandoId !== tipoHora.id_tipo_hora)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEliminarTipoHora(tipoHora.id_tipo_hora)}
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

        <TabsContent value="tipo-deduccion" className="space-y-4">
          <FormCard title={editandoId && tiposDeduccion.find(td => td.id_tipo_deduccion === editandoId) ? "Editar Tipo de Deducción" : "Agregar Tipo de Deducción"}>
            <div className="space-y-4">
              <div>
                <Label htmlFor="nombre-tipo-deduccion">Nombre *</Label>
                <Input
                  id="nombre-tipo-deduccion"
                  value={formTipoDeduccion.nombre}
                  onChange={(e) => setFormTipoDeduccion({ ...formTipoDeduccion, nombre: e.target.value })}
                  placeholder="Ej: Salud, Pensión, Retención"
                />
              </div>
              <div>
                <Label htmlFor="descripcion-tipo-deduccion">Descripción</Label>
                <Textarea
                  id="descripcion-tipo-deduccion"
                  value={formTipoDeduccion.descripcion}
                  onChange={(e) => setFormTipoDeduccion({ ...formTipoDeduccion, descripcion: e.target.value })}
                  placeholder="Descripción del tipo de deducción"
                  rows={3}
                />
              </div>
              <div className="flex gap-2">
                {editandoId ? (
                  <>
                    <Button onClick={handleGuardarEdicionTipoDeduccion} disabled={loading}>
                      <Check className="h-4 w-4 mr-2" />
                      Guardar
                    </Button>
                    <Button variant="outline" onClick={handleCancelarEdicion} disabled={loading}>
                      <X className="h-4 w-4 mr-2" />
                      Cancelar
                    </Button>
                  </>
                ) : (
                  <Button onClick={handleCrearTipoDeduccion} disabled={loading}>
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
                ? "Cargando tipos de deducción..."
                : tiposDeduccion.length === 0
                ? "No hay tipos de deducción registrados"
                : undefined
            }
            colSpan={4}
          >
            {tiposDeduccion.map((tipoDeduccion) => (
              <TableRow key={tipoDeduccion.id_tipo_deduccion}>
                <TableCell className="font-medium">{tipoDeduccion.id_tipo_deduccion}</TableCell>
                <TableCell>{tipoDeduccion.nombre}</TableCell>
                <TableCell className="max-w-md">
                  <p className="truncate">{tipoDeduccion.descripcion || "-"}</p>
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleIniciarEdicionTipoDeduccion(tipoDeduccion)}
                      disabled={loading || (editandoId !== null && editandoId !== tipoDeduccion.id_tipo_deduccion)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEliminarTipoDeduccion(tipoDeduccion.id_tipo_deduccion)}
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

export default ConfiguracionNomina;

