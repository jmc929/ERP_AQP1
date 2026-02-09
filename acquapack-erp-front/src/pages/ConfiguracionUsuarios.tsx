import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  TableRow,
  TableCell,
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

interface Registro {
  id: number;
  nombre: string;
}

type TipoRegistro = 
  | "tipo-identificacion" 
  | "tipo-contrato" 
  | "estado-civil" 
  | "arl" 
  | "eps" 
  | "caja-compensacion" 
  | "fondo-pensiones"
  | "rol";

const ConfiguracionUsuarios = () => {
  const { toast } = useToast();
  const [tabActivo, setTabActivo] = useState<TipoRegistro>("tipo-identificacion");
  
  // Estados para cada tipo de registro
  const [tipoIdentificacion, setTipoIdentificacion] = useState<Registro[]>([]);
  const [tipoContrato, setTipoContrato] = useState<Registro[]>([]);
  const [estadoCivil, setEstadoCivil] = useState<Registro[]>([]);
  const [arl, setArl] = useState<Registro[]>([]);
  const [eps, setEps] = useState<Registro[]>([]);
  const [cajaCompensacion, setCajaCompensacion] = useState<Registro[]>([]);
  const [fondoPensiones, setFondoPensiones] = useState<Registro[]>([]);
  const [roles, setRoles] = useState<Registro[]>([]);
  
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
      const endpoint = `http://localhost:4000/api/configuracion-usuarios/${tipo}`;
      const response = await fetch(endpoint);
      
      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }
      
      const data = await response.json();

      if (!data.success) {
        throw new Error(data.message || "Error al cargar los datos");
      }

      // Normalizar los IDs según el tipo
      const normalizarRegistros = (registros: any[], tipoTab: TipoRegistro): Registro[] => {
        if (!Array.isArray(registros)) {
          return [];
        }
        return registros.map((reg) => {
          let id = reg.id;
          if (tipoTab === "tipo-identificacion") {
            id = reg.id_tipo_identificacion || reg.id;
          } else if (tipoTab === "tipo-contrato") {
            id = reg.id_tipo_contrato || reg.id;
          } else if (tipoTab === "estado-civil") {
            id = reg.id_estado_civil || reg.id;
          } else if (tipoTab === "arl") {
            id = reg.id_arl || reg.id;
          } else if (tipoTab === "eps") {
            id = reg.id_eps || reg.id;
          } else if (tipoTab === "caja-compensacion") {
            id = reg.id_caja_compensacion || reg.id;
          } else if (tipoTab === "fondo-pensiones") {
            id = reg.id_fondo_pensiones || reg.id;
          } else if (tipoTab === "rol") {
            id = reg.id_rol || reg.id;
          }
          return {
            id,
            nombre: reg.nombre || "",
          };
        });
      };

      // Obtener los registros según el tipo
      let registros: any[] = [];
      if (tipo === "tipo-identificacion" && data.tiposIdentificacion) {
        registros = data.tiposIdentificacion;
      } else if (tipo === "tipo-contrato" && data.tiposContrato) {
        registros = data.tiposContrato;
      } else if (tipo === "estado-civil" && data.estadosCiviles) {
        registros = data.estadosCiviles;
      } else if (tipo === "arl" && data.arls) {
        registros = data.arls;
      } else if (tipo === "eps" && data.epss) {
        registros = data.epss;
      } else if (tipo === "caja-compensacion" && data.cajasCompensacion) {
        registros = data.cajasCompensacion;
      } else if (tipo === "fondo-pensiones" && data.fondosPensiones) {
        registros = data.fondosPensiones;
      } else if (tipo === "rol" && data.roles) {
        registros = data.roles;
      }

      const registrosNormalizados = normalizarRegistros(registros, tipo);

      if (tipo === "tipo-identificacion") {
        setTipoIdentificacion(registrosNormalizados);
      } else if (tipo === "tipo-contrato") {
        setTipoContrato(registrosNormalizados);
      } else if (tipo === "estado-civil") {
        setEstadoCivil(registrosNormalizados);
      } else if (tipo === "arl") {
        setArl(registrosNormalizados);
      } else if (tipo === "eps") {
        setEps(registrosNormalizados);
      } else if (tipo === "caja-compensacion") {
        setCajaCompensacion(registrosNormalizados);
      } else if (tipo === "fondo-pensiones") {
        setFondoPensiones(registrosNormalizados);
      } else if (tipo === "rol") {
        setRoles(registrosNormalizados);
      }
    } catch (error) {
      console.error("Error al cargar datos:", error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "No se pudieron cargar los datos",
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
      const endpoint = `http://localhost:4000/api/configuracion-usuarios/${tabActivo}`;
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
      const endpoint = `http://localhost:4000/api/configuracion-usuarios/${tabActivo}/${editandoId}`;
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

      setEditandoId(null);
      setNombreEditando("");
      
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
      const endpoint = `http://localhost:4000/api/configuracion-usuarios/${tabActivo}/${id}`;
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
      case "tipo-identificacion":
        return "Tipo de Identificación";
      case "tipo-contrato":
        return "Tipo de Contrato";
      case "estado-civil":
        return "Estado Civil";
      case "arl":
        return "ARL";
      case "eps":
        return "EPS";
      case "caja-compensacion":
        return "Caja de Compensación";
      case "fondo-pensiones":
        return "Fondo de Pensiones";
      case "rol":
        return "Rol";
      default:
        return "Registro";
    }
  };

  const getTituloPlural = (tipo: TipoRegistro): string => {
    switch (tipo) {
      case "tipo-identificacion":
        return "Tipos de Identificación";
      case "tipo-contrato":
        return "Tipos de Contrato";
      case "estado-civil":
        return "Estados Civiles";
      case "arl":
        return "ARLs";
      case "eps":
        return "EPSs";
      case "caja-compensacion":
        return "Cajas de Compensación";
      case "fondo-pensiones":
        return "Fondos de Pensiones";
      case "rol":
        return "Roles";
      default:
        return "Registros";
    }
  };

  const getRegistros = (): Registro[] => {
    switch (tabActivo) {
      case "tipo-identificacion":
        return tipoIdentificacion;
      case "tipo-contrato":
        return tipoContrato;
      case "estado-civil":
        return estadoCivil;
      case "arl":
        return arl;
      case "eps":
        return eps;
      case "caja-compensacion":
        return cajaCompensacion;
      case "fondo-pensiones":
        return fondoPensiones;
      case "rol":
        return roles;
      default:
        return [];
    }
  };

  const renderTabla = () => {
    const registros = getRegistros();

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

  const renderTabContent = (tipo: TipoRegistro) => (
    <TabsContent value={tipo} className="space-y-4">
      <FormCard title={`Agregar ${getTituloSingular(tipo)}`}>
        <div className="flex gap-4">
          <div className="flex-1">
            <Label htmlFor={`nombre-${tipo}`}>Nombre</Label>
            <Input
              id={`nombre-${tipo}`}
              value={nombreNuevo}
              onChange={(e) => setNombreNuevo(e.target.value)}
              placeholder={`Ingrese el nombre del ${getTituloSingular(tipo).toLowerCase()}`}
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
  );

  return (
    <PageContainer>
      <PageTitle title="Configuración de Usuarios" />

      <Tabs value={tabActivo} onValueChange={(value) => setTabActivo(value as TipoRegistro)} className="w-full">
        <TabsList className="grid w-full grid-cols-8">
          <TabsTrigger value="tipo-identificacion">Tipo Identificación</TabsTrigger>
          <TabsTrigger value="tipo-contrato">Tipo Contrato</TabsTrigger>
          <TabsTrigger value="estado-civil">Estado Civil</TabsTrigger>
          <TabsTrigger value="arl">ARL</TabsTrigger>
          <TabsTrigger value="eps">EPS</TabsTrigger>
          <TabsTrigger value="caja-compensacion">Caja Compensación</TabsTrigger>
          <TabsTrigger value="fondo-pensiones">Fondo Pensiones</TabsTrigger>
          <TabsTrigger value="rol">Roles</TabsTrigger>
        </TabsList>

        {renderTabContent("tipo-identificacion")}
        {renderTabContent("tipo-contrato")}
        {renderTabContent("estado-civil")}
        {renderTabContent("arl")}
        {renderTabContent("eps")}
        {renderTabContent("caja-compensacion")}
        {renderTabContent("fondo-pensiones")}
        {renderTabContent("rol")}
      </Tabs>
    </PageContainer>
  );
};

export default ConfiguracionUsuarios;

