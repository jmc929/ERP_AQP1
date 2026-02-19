import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
import { API_BASE_URL } from "@/config/api";

interface Registro {
  id: number;
  nombre: string;
}

type TipoRegistro = "grupos" | "familias" | "medidas";

const ConfiguracionProductos = () => {
  const { toast } = useToast();
  const [tabActivo, setTabActivo] = useState<TipoRegistro>("grupos");
  
  // Estados para cada tipo de registro
  const [grupos, setGrupos] = useState<Registro[]>([]);
  const [familias, setFamilias] = useState<Registro[]>([]);
  const [medidas, setMedidas] = useState<Registro[]>([]);
  
  // Estados para edición
  const [editandoId, setEditandoId] = useState<number | null>(null);
  const [nombreEditando, setNombreEditando] = useState("");
  const [nombreNuevo, setNombreNuevo] = useState("");
  const [loading, setLoading] = useState(false);

  // Cargar datos según la pestaña activa
  useEffect(() => {
    cargarDatos(tabActivo);
  }, [tabActivo]);

  const cargarDatos = async (tipo: TipoRegistro) => {
    try {
      setLoading(true);
      const endpoint = `${API_BASE_URL}/api/configuracion-productos/${tipo}`;
      const response = await fetch(endpoint);
      const data = await response.json();

      if (data.success) {
        // Normalizar los IDs para que todos tengan el campo "id"
        const normalizarRegistros = (registros: any[]): Registro[] => {
          return registros.map((reg) => ({
            id: reg.id_grupos_productos || reg.id_familia_producto || reg.id_medida || reg.id,
            nombre: reg.nombre,
          }));
        };

        if (tipo === "grupos") {
          setGrupos(normalizarRegistros(data.grupos));
        } else if (tipo === "familias") {
          setFamilias(normalizarRegistros(data.familias));
        } else if (tipo === "medidas") {
          setMedidas(normalizarRegistros(data.medidas));
        }
      }
    } catch (error) {
      toast({
        title: "Error",
        description: `No se pudieron cargar los ${tipo}`,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCrear = async () => {
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
      const endpoint = `${API_BASE_URL}/api/configuracion-productos/${tabActivo}`;
      const response = await fetch(endpoint, {
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
        description: `${getTituloSingular(tabActivo)} creado exitosamente`,
      });

      setNombreNuevo("");
      cargarDatos(tabActivo);
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
    // Cancelar cualquier edición previa si existe
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
      const endpoint = `${API_BASE_URL}/api/configuracion-productos/${tabActivo}/${editandoId}`;
      const response = await fetch(endpoint, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ nombre: nombreEditando.trim() }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Error al actualizar");
      }

      toast({
        title: "Éxito",
        description: `${getTituloSingular(tabActivo)} actualizado exitosamente`,
      });

      // Limpiar estado de edición antes de recargar
      setEditandoId(null);
      setNombreEditando("");
      
      // Recargar datos
      await cargarDatos(tabActivo);
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

  const handleEliminar = async (id: number) => {
    if (!confirm(`¿Está seguro de eliminar este ${getTituloSingular(tabActivo)}?`)) {
      return;
    }

    try {
      setLoading(true);
      const endpoint = `${API_BASE_URL}/api/configuracion-productos/${tabActivo}/${id}`;
      const response = await fetch(endpoint, {
        method: "DELETE",
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Error al eliminar");
      }

      toast({
        title: "Éxito",
        description: `${getTituloSingular(tabActivo)} eliminado exitosamente`,
      });

      cargarDatos(tabActivo);
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

  const getTituloSingular = (tipo: TipoRegistro): string => {
    switch (tipo) {
      case "grupos":
        return "Grupo";
      case "familias":
        return "Familia";
      case "medidas":
        return "Medida";
      default:
        return "Registro";
    }
  };

  const getTituloPlural = (tipo: TipoRegistro): string => {
    switch (tipo) {
      case "grupos":
        return "Grupos";
      case "familias":
        return "Familias";
      case "medidas":
        return "Medidas";
      default:
        return "Registros";
    }
  };

  const getRegistros = (): Registro[] => {
    switch (tabActivo) {
      case "grupos":
        return grupos;
      case "familias":
        return familias;
      case "medidas":
        return medidas;
      default:
        return [];
    }
  };

  const renderTabla = () => {
    const registros = getRegistros();

    // Filtrar duplicados por ID (por si acaso)
    const registrosUnicos = registros.filter((reg, index, self) => 
      index === self.findIndex((r) => r.id === reg.id)
    );

    return (
      <TableCard
        headers={["ID", "Nombre", "Acciones"]}
        emptyMessage={
          loading
            ? `Cargando ${getTituloPlural(tabActivo).toLowerCase()}...`
            : registrosUnicos.length === 0
            ? `No hay ${getTituloPlural(tabActivo).toLowerCase()} registrados`
            : undefined
        }
        colSpan={3}
      >
        {registrosUnicos.map((registro) => (
          <TableRow key={registro.id}>
            <TableCell className="font-medium">{registro.id}</TableCell>
            <TableCell>
              {editandoId === registro.id ? (
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
                registro.nombre
              )}
            </TableCell>
            <TableCell>
              {editandoId === registro.id ? (
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
                    onClick={() => handleIniciarEdicion(registro.id, registro.nombre)}
                    disabled={loading || editandoId !== null}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEliminar(registro.id)}
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
    );
  };

  return (
    <PageContainer>
      <PageTitle title="Configuración de Productos" />

      <Tabs value={tabActivo} onValueChange={(value) => setTabActivo(value as TipoRegistro)} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="grupos">Grupos</TabsTrigger>
          <TabsTrigger value="familias">Familias</TabsTrigger>
          <TabsTrigger value="medidas">Medidas</TabsTrigger>
        </TabsList>

        <TabsContent value="grupos" className="space-y-4">
          <FormCard title={`Agregar ${getTituloSingular("grupos")}`}>
            <div className="flex gap-4">
              <div className="flex-1">
                <Label htmlFor="nombre-grupo">Nombre del Grupo</Label>
                <Input
                  id="nombre-grupo"
                  value={nombreNuevo}
                  onChange={(e) => setNombreNuevo(e.target.value)}
                  placeholder="Ingrese el nombre del grupo"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleCrear();
                    }
                  }}
                />
              </div>
              <div className="flex items-end">
                <Button onClick={handleCrear} disabled={loading || editandoId !== null}>
                  <Plus className="h-4 w-4 mr-2" />
                  Agregar
                </Button>
              </div>
            </div>
          </FormCard>
          {renderTabla()}
        </TabsContent>

        <TabsContent value="familias" className="space-y-4">
          <FormCard title={`Agregar ${getTituloSingular("familias")}`}>
            <div className="flex gap-4">
              <div className="flex-1">
                <Label htmlFor="nombre-familia">Nombre de la Familia</Label>
                <Input
                  id="nombre-familia"
                  value={nombreNuevo}
                  onChange={(e) => setNombreNuevo(e.target.value)}
                  placeholder="Ingrese el nombre de la familia"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleCrear();
                    }
                  }}
                />
              </div>
              <div className="flex items-end">
                <Button onClick={handleCrear} disabled={loading || editandoId !== null}>
                  <Plus className="h-4 w-4 mr-2" />
                  Agregar
                </Button>
              </div>
            </div>
          </FormCard>
          {renderTabla()}
        </TabsContent>

        <TabsContent value="medidas" className="space-y-4">
          <FormCard title={`Agregar ${getTituloSingular("medidas")}`}>
            <div className="flex gap-4">
              <div className="flex-1">
                <Label htmlFor="nombre-medida">Nombre de la Medida</Label>
                <Input
                  id="nombre-medida"
                  value={nombreNuevo}
                  onChange={(e) => setNombreNuevo(e.target.value)}
                  placeholder="Ingrese el nombre de la medida"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleCrear();
                    }
                  }}
                />
              </div>
              <div className="flex items-end">
                <Button onClick={handleCrear} disabled={loading || editandoId !== null}>
                  <Plus className="h-4 w-4 mr-2" />
                  Agregar
                </Button>
              </div>
            </div>
          </FormCard>
          {renderTabla()}
        </TabsContent>
      </Tabs>
    </PageContainer>
  );
};

export default ConfiguracionProductos;
