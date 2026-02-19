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
import Pagination from "@/components/Pagination";
import { useToast } from "@/hooks/use-toast";
import { Plus, Edit, Trash2, X, Check } from "lucide-react";
import { API_BASE_URL } from "@/config/api";

interface Registro {
  id: number;
  nombre: string;
  codigo?: string;
}

type TipoRegistro = 
  | "tipo-entidad" 
  | "ciudad" 
  | "tipo-regimen-iva" 
  | "responsabilidad-fiscal";

const ConfiguracionClientes = () => {
  const { toast } = useToast();
  const [tabActivo, setTabActivo] = useState<TipoRegistro>("tipo-entidad");
  
  // Estados para cada tipo de registro
  const [tipoEntidad, setTipoEntidad] = useState<Registro[]>([]);
  const [ciudad, setCiudad] = useState<Registro[]>([]);
  const [tipoRegimenIva, setTipoRegimenIva] = useState<Registro[]>([]);
  const [responsabilidadFiscal, setResponsabilidadFiscal] = useState<Registro[]>([]);
  
  // Estados para edición
  const [editandoId, setEditandoId] = useState<number | null>(null);
  const [nombreEditando, setNombreEditando] = useState("");
  const [codigoEditando, setCodigoEditando] = useState("");
  const [nombreNuevo, setNombreNuevo] = useState("");
  const [codigoNuevo, setCodigoNuevo] = useState("");
  const [loading, setLoading] = useState(false);
  
  // Estados para paginación de ciudades
  const [paginaCiudades, setPaginaCiudades] = useState(1);
  const [paginacionCiudades, setPaginacionCiudades] = useState<{
    paginaActual: number;
    totalPaginas: number;
    totalRegistros: number;
    limite: number;
  } | null>(null);

  // Cargar datos según la pestaña activa
  useEffect(() => {
    if (tabActivo === "ciudad") {
      // Resetear a página 1 cuando se cambia al tab de ciudades
      setPaginaCiudades(1);
    } else {
      cargarDatos(tabActivo);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tabActivo]);

  // Cargar ciudades cuando cambia la página o cuando se activa el tab de ciudades
  useEffect(() => {
    if (tabActivo === "ciudad") {
      cargarDatos("ciudad");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paginaCiudades, tabActivo]);

  const cargarDatos = async (tipo: TipoRegistro) => {
    try {
      setLoading(true);
      let endpoint = `${API_BASE_URL}/api/configuracion-clientes/${tipo}`;
      
      // Si es ciudad, agregar parámetros de paginación
      if (tipo === "ciudad") {
        endpoint += `?page=${paginaCiudades}&limit=30`;
      }
      
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
          if (tipoTab === "tipo-entidad") {
            id = reg.id_tipo_entidad || reg.id;
          } else if (tipoTab === "ciudad") {
            id = reg.id_ciudad || reg.id;
          } else if (tipoTab === "tipo-regimen-iva") {
            id = reg.id_regimen_iva || reg.id;
          } else if (tipoTab === "responsabilidad-fiscal") {
            id = reg.id_responsabilidad_fiscal || reg.id;
          }
          return {
            id,
            nombre: reg.nombre || "",
            codigo: reg.codigo || undefined,
          };
        });
      };

      // Obtener los registros según el tipo
      let registros: any[] = [];
      if (tipo === "tipo-entidad" && data.tiposEntidad) {
        registros = data.tiposEntidad;
      } else if (tipo === "ciudad" && data.ciudades) {
        registros = data.ciudades;
        // Guardar información de paginación si existe
        if (data.paginacion) {
          setPaginacionCiudades(data.paginacion);
        }
      } else if (tipo === "tipo-regimen-iva" && data.tiposRegimenIva) {
        registros = data.tiposRegimenIva;
      } else if (tipo === "responsabilidad-fiscal" && data.responsabilidadesFiscales) {
        registros = data.responsabilidadesFiscales;
      }

      const registrosNormalizados = normalizarRegistros(registros, tipo);

      if (tipo === "tipo-entidad") {
        setTipoEntidad(registrosNormalizados);
      } else if (tipo === "ciudad") {
        setCiudad(registrosNormalizados);
      } else if (tipo === "tipo-regimen-iva") {
        setTipoRegimenIva(registrosNormalizados);
      } else if (tipo === "responsabilidad-fiscal") {
        setResponsabilidadFiscal(registrosNormalizados);
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
      const endpoint = `${API_BASE_URL}/api/configuracion-clientes/${tabActivo}`;
      const body: any = { nombre: nombreNuevo.trim() };
      
      // Si es responsabilidad fiscal, incluir código
      if (tabActivo === "responsabilidad-fiscal") {
        body.codigo = codigoNuevo.trim() || null;
      }

      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
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
      setCodigoNuevo("");
      // Si es ciudad, volver a la primera página después de crear
      if (tabActivo === "ciudad") {
        setPaginaCiudades(1);
      }
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

  const handleIniciarEdicion = (id: number, nombre: string, codigo?: string) => {
    if (editandoId !== null) {
      handleCancelarEdicion();
    }
    setEditandoId(id);
    setNombreEditando(nombre);
    setCodigoEditando(codigo || "");
  };

  const handleCancelarEdicion = () => {
    setEditandoId(null);
    setNombreEditando("");
    setCodigoEditando("");
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
      const endpoint = `${API_BASE_URL}/api/configuracion-clientes/${tabActivo}/${editandoId}`;
      const body: any = { nombre: nombreEditando.trim() };
      
      // Si es responsabilidad fiscal, incluir código
      if (tabActivo === "responsabilidad-fiscal") {
        body.codigo = codigoEditando.trim() || null;
      }

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
        description: `${getTituloSingular(tabActivo)} actualizado exitosamente`,
      });

      setEditandoId(null);
      setNombreEditando("");
      setCodigoEditando("");
      
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
      const endpoint = `${API_BASE_URL}/api/configuracion-clientes/${tabActivo}/${id}`;
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

      // Si es ciudad y eliminamos el último registro de la página, volver a la anterior
      if (tabActivo === "ciudad" && ciudad.length === 1 && paginaCiudades > 1) {
        setPaginaCiudades(paginaCiudades - 1);
      } else {
        cargarDatos(tabActivo);
      }
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
      case "tipo-entidad":
        return "Tipo de Entidad";
      case "ciudad":
        return "Ciudad";
      case "tipo-regimen-iva":
        return "Tipo de Régimen IVA";
      case "responsabilidad-fiscal":
        return "Responsabilidad Fiscal";
      default:
        return "Registro";
    }
  };

  const getTituloPlural = (tipo: TipoRegistro): string => {
    switch (tipo) {
      case "tipo-entidad":
        return "Tipos de Entidad";
      case "ciudad":
        return "Ciudades";
      case "tipo-regimen-iva":
        return "Tipos de Régimen IVA";
      case "responsabilidad-fiscal":
        return "Responsabilidades Fiscales";
      default:
        return "Registros";
    }
  };

  const getRegistros = (): Registro[] => {
    switch (tabActivo) {
      case "tipo-entidad":
        return tipoEntidad;
      case "ciudad":
        return ciudad;
      case "tipo-regimen-iva":
        return tipoRegimenIva;
      case "responsabilidad-fiscal":
        return responsabilidadFiscal;
      default:
        return [];
    }
  };

  const renderTabla = () => {
    const registros = getRegistros();

    const registrosUnicos = registros.filter((reg, index, self) => 
      index === self.findIndex((r) => r.id === reg.id)
    );

    const mostrarCodigo = tabActivo === "responsabilidad-fiscal";

    return (
      <TableCard
        headers={mostrarCodigo ? ["ID", "Nombre", "Código", "Acciones"] : ["ID", "Nombre", "Acciones"]}
        emptyMessage={
          loading
            ? `Cargando ${getTituloPlural(tabActivo).toLowerCase()}...`
            : registrosUnicos.length === 0
            ? `No hay ${getTituloPlural(tabActivo).toLowerCase()} registrados`
            : undefined
        }
        colSpan={mostrarCodigo ? 4 : 3}
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
            {mostrarCodigo && (
              <TableCell>
                {editandoId === registro.id ? (
                  <Input
                    value={codigoEditando}
                    onChange={(e) => setCodigoEditando(e.target.value)}
                    className="max-w-xs"
                    placeholder="Código (opcional)"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        handleGuardarEdicion();
                      } else if (e.key === "Escape") {
                        handleCancelarEdicion();
                      }
                    }}
                  />
                ) : (
                  registro.codigo || "N/A"
                )}
              </TableCell>
            )}
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
                    onClick={() => handleIniciarEdicion(registro.id, registro.nombre, registro.codigo)}
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

  const renderTabContent = (tipo: TipoRegistro) => {
    const mostrarCodigo = tipo === "responsabilidad-fiscal";

    return (
      <TabsContent value={tipo} className="space-y-4">
        <FormCard title={`Agregar ${getTituloSingular(tipo)}`}>
          <div className="space-y-4">
            <div className="flex gap-4">
              <div className="flex-1">
                <Label htmlFor={`nombre-${tipo}`}>Nombre</Label>
                <Input
                  id={`nombre-${tipo}`}
                  value={nombreNuevo}
                  onChange={(e) => setNombreNuevo(e.target.value)}
                  placeholder={`Ingrese el nombre del ${getTituloSingular(tipo).toLowerCase()}`}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !mostrarCodigo) {
                      handleCrear();
                    }
                  }}
                />
              </div>
              {mostrarCodigo && (
                <div className="flex-1">
                  <Label htmlFor={`codigo-${tipo}`}>Código (opcional)</Label>
                  <Input
                    id={`codigo-${tipo}`}
                    value={codigoNuevo}
                    onChange={(e) => setCodigoNuevo(e.target.value)}
                    placeholder="Ingrese el código"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        handleCrear();
                      }
                    }}
                  />
                </div>
              )}
              <div className="flex items-end">
                <Button onClick={handleCrear} disabled={loading || editandoId !== null}>
                  <Plus className="h-4 w-4 mr-2" />
                  Agregar
                </Button>
              </div>
            </div>
          </div>
        </FormCard>
        {renderTabla()}
        {tipo === "ciudad" && paginacionCiudades && paginacionCiudades.totalPaginas > 1 && (
          <Pagination
            paginaActual={paginacionCiudades.paginaActual}
            totalPaginas={paginacionCiudades.totalPaginas}
            onPageChange={(pagina) => setPaginaCiudades(pagina)}
          />
        )}
      </TabsContent>
    );
  };

  return (
    <PageContainer>
      <PageTitle title="Configuración de Clientes" />

      <Tabs value={tabActivo} onValueChange={(value) => setTabActivo(value as TipoRegistro)} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="tipo-entidad">Tipo Entidad</TabsTrigger>
          <TabsTrigger value="ciudad">Ciudad</TabsTrigger>
          <TabsTrigger value="tipo-regimen-iva">Tipo Régimen IVA</TabsTrigger>
          <TabsTrigger value="responsabilidad-fiscal">Responsabilidad Fiscal</TabsTrigger>
        </TabsList>

        {renderTabContent("tipo-entidad")}
        {renderTabContent("ciudad")}
        {renderTabContent("tipo-regimen-iva")}
        {renderTabContent("responsabilidad-fiscal")}
      </Tabs>
    </PageContainer>
  );
};

export default ConfiguracionClientes;

