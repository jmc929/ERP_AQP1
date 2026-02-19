import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  TableBody,
  TableCell,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Eye, Archive, Edit, AlertTriangle, CheckCircle2, Clock } from "lucide-react";
import SearchBar from "@/components/SearchBar";
import PageContainer from "@/components/PageContainer";
import PageTitle from "@/components/PageTitle";
import TableCard from "@/components/TableCard";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { API_BASE_URL } from "@/config/api";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import UsuarioAlertasCard from "@/components/UsuarioAlertasCard";

interface Rol {
  id_rol: number;
  nombre_rol: string;
}

interface Usuario {
  id_usuarios: number;
  documento: string;
  nombre: string;
  apellido: string;
  correo_electronico?: string;
  id_estado: number;
  estado_nombre?: string;
  roles: Rol[];
}

interface UsuarioCompleto extends Usuario {
  fecha_nacimiento?: string;
  dia_ingreso?: string;
  celular?: string;
  direccion?: string;
  nombre_contacto?: string;
  telefono_contacto?: string;
  tipo_identificacion_nombre?: string;
  tipo_contrato_nombre?: string;
  estado_civil_nombre?: string;
  arl_nombre?: string;
  arl_fecha_ingreso?: string;
  eps_nombre?: string;
  eps_fecha_ingreso?: string;
  caja_compensacion_nombre?: string;
  fondo_pensiones_nombre?: string;
  induccion_sst?: boolean;
  induccion_puesto_trabajo?: boolean;
  afiliacion_a_beneficiarios?: boolean;
  firma_reglamento_interno_trabajo?: boolean;
  firma_elementos_proteccion?: boolean;
  firma_contrato?: boolean;
}

interface Estado {
  id_estado: number;
  nombre: string;
}

const VerUsuarios = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState<UsuarioCompleto | null>(null);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [busqueda, setBusqueda] = useState("");
  const [loading, setLoading] = useState(true);
  const [cargandoUsuario, setCargandoUsuario] = useState(false);
  const [estados, setEstados] = useState<Estado[]>([]);
  const [nuevoEstado, setNuevoEstado] = useState<string>("");
  const [actualizandoEstado, setActualizandoEstado] = useState(false);
  const [usuarioActual, setUsuarioActual] = useState<any>(null);
  const [esSuperAdministrador, setEsSuperAdministrador] = useState(false);
  const [alertas, setAlertas] = useState<any[]>([]);
  const [cargandoAlertas, setCargandoAlertas] = useState(false);

  // Cargar alertas de usuarios
  useEffect(() => {
    const cargarAlertas = async () => {
      setCargandoAlertas(true);
      try {
        const response = await fetch(`${API_BASE_URL}/api/usuarios/alertas");
        if (response.ok) {
          const data = await response.json();
          setAlertas(data.alertas || []);
        }
      } catch (error) {
        console.error("Error al cargar alertas:", error);
      } finally {
        setCargandoAlertas(false);
      }
    };
    cargarAlertas();
  }, []);

  // Cargar usuario actual y verificar si es super administrador
  useEffect(() => {
    const usuarioStr = localStorage.getItem("usuario");
    if (usuarioStr) {
      try {
        const usuario = JSON.parse(usuarioStr);
        setUsuarioActual(usuario);
        
        // Verificar si tiene el rol de super administrador
        const tieneRolSuperAdmin = usuario.roles?.some(
          (rol: Rol) => 
            rol.nombre_rol?.toLowerCase().includes("super administrador") ||
            rol.nombre_rol?.toLowerCase().includes("superadministrador") ||
            rol.nombre_rol?.toLowerCase() === "super admin"
        );
        setEsSuperAdministrador(!!tieneRolSuperAdmin);
      } catch (error) {
        console.error("Error al parsear usuario:", error);
      }
    }
  }, []);

  // Cargar alertas de usuarios
  useEffect(() => {
    const cargarAlertas = async () => {
      setCargandoAlertas(true);
      try {
        const response = await fetch(`${API_BASE_URL}/api/usuarios/alertas");
        if (response.ok) {
          const data = await response.json();
          setAlertas(data.alertas || []);
        }
      } catch (error) {
        console.error("Error al cargar alertas:", error);
      } finally {
        setCargandoAlertas(false);
      }
    };
    cargarAlertas();
  }, []);

  // Cargar usuarios y estados
  useEffect(() => {
    const cargarDatos = async () => {
      try {
        setLoading(true);
        const [usuariosRes, catalogosRes] = await Promise.all([
          fetch(`${API_BASE_URL}/api/usuarios"),
          fetch(`${API_BASE_URL}/api/usuarios/catalogos")
        ]);

        const usuariosData = await usuariosRes.json();
        const catalogosData = await catalogosRes.json();

        if (usuariosData.success) {
          setUsuarios(usuariosData.usuarios);
        }

        if (catalogosData.success && catalogosData.catalogos.estados) {
          setEstados(catalogosData.catalogos.estados);
        }
      } catch (error) {
        toast({
          title: "Error",
          description: "No se pudieron cargar los usuarios",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    cargarDatos();
  }, [toast]);

  // Cargar usuario completo al abrir el modal
  const handleVerDetalles = async (idUsuario: number) => {
    try {
      setCargandoUsuario(true);
      const response = await fetch(`${API_BASE_URL}/api/usuarios/${idUsuario}`);
      const data = await response.json();

      if (data.success) {
        setUsuarioSeleccionado(data.usuario);
        setNuevoEstado(data.usuario.id_estado.toString());
        setMostrarModal(true);
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "No se pudo cargar la información del usuario",
        variant: "destructive",
      });
    } finally {
      setCargandoUsuario(false);
    }
  };

  // Actualizar estado del usuario
  const handleActualizarEstado = async () => {
    if (!usuarioSeleccionado || !nuevoEstado) return;

    try {
      setActualizandoEstado(true);
      const response = await fetch(
        `${API_BASE_URL}/api/usuarios/${usuarioSeleccionado.id_usuarios}/estado`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id_estado: parseInt(nuevoEstado),
          }),
        }
      );

      const data = await response.json();

      if (data.success) {
        toast({
          title: "Estado actualizado",
          description: "El estado del usuario ha sido actualizado exitosamente",
        });

        // Actualizar la lista de usuarios
        const usuariosRes = await fetch(`${API_BASE_URL}/api/usuarios");
        const usuariosData = await usuariosRes.json();
        if (usuariosData.success) {
          setUsuarios(usuariosData.usuarios);
        }

        // Actualizar el usuario en el modal
        if (usuarioSeleccionado) {
          const usuarioRes = await fetch(
            `${API_BASE_URL}/api/usuarios/${usuarioSeleccionado.id_usuarios}`
          );
          const usuarioData = await usuarioRes.json();
          if (usuarioData.success) {
            setUsuarioSeleccionado(usuarioData.usuario);
          }
        }
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "No se pudo actualizar el estado del usuario",
        variant: "destructive",
      });
    } finally {
      setActualizandoEstado(false);
    }
  };

  // Filtrar usuarios según búsqueda
  const usuariosFiltrados = usuarios.filter((usuario) => {
    const nombreCompleto = `${usuario.nombre} ${usuario.apellido}`.toLowerCase();
    const documento = usuario.documento?.toLowerCase() || "";
    const roles = usuario.roles?.map((r) => r.nombre_rol).join(" ").toLowerCase() || "";
    const busquedaLower = busqueda.toLowerCase();
    
    return (
      nombreCompleto.includes(busquedaLower) ||
      documento.includes(busquedaLower) ||
      roles.includes(busquedaLower)
    );
  });

  const formatearFecha = (fecha: string | null | undefined) => {
    if (!fecha) return "N/A";
    try {
      return new Date(fecha).toLocaleDateString("es-CO");
    } catch {
      return fecha;
    }
  };

  return (
    <PageContainer>
      <PageTitle title="Ver Usuarios" />

      {/* Tarjetas de alertas - debajo del título */}
      {!cargandoAlertas && alertas.length > 0 && (
        <div className="mb-6">
          <UsuarioAlertasCard alertas={alertas} />
        </div>
      )}

      {/* Barra de búsqueda */}
      <SearchBar
        placeholder="Buscar por nombre, documento o rol..."
        value={busqueda}
        onChange={setBusqueda}
      />

      {/* Tabla de usuarios */}
      <TableCard
        headers={["", "Nombre", "Documento", "Roles", "Estado"]}
        emptyMessage={
          loading
            ? "Cargando usuarios..."
            : usuariosFiltrados.length === 0
            ? usuarios.length === 0
              ? "No hay usuarios registrados"
              : "No se encontraron usuarios"
            : undefined
        }
        colSpan={5}
      >
        {usuariosFiltrados.map((usuario) => (
          <TableRow key={usuario.id_usuarios}>
            <TableCell className="border-r border-border w-12">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleVerDetalles(usuario.id_usuarios)}
                disabled={cargandoUsuario}
              >
                <Eye className="h-4 w-4" />
              </Button>
            </TableCell>
            <TableCell className="border-r border-border font-medium">
              {usuario.nombre} {usuario.apellido}
            </TableCell>
            <TableCell className="border-r border-border">
              {usuario.documento}
            </TableCell>
            <TableCell className="border-r border-border">
              {usuario.roles && usuario.roles.length > 0
                ? usuario.roles.map((r) => r.nombre_rol).join(", ")
                : "Sin roles"}
            </TableCell>
            <TableCell>
              <span
                className={`px-2 py-1 rounded text-xs ${
                  usuario.id_estado === 1
                    ? "bg-green-100 text-green-800"
                    : usuario.id_estado === 2
                    ? "bg-red-100 text-red-800"
                    : "bg-gray-100 text-gray-800"
                }`}
              >
                {usuario.estado_nombre || "Sin estado"}
              </span>
            </TableCell>
          </TableRow>
        ))}
      </TableCard>

      {/* Modal de detalles del usuario */}
      <Dialog open={mostrarModal} onOpenChange={setMostrarModal}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Información del Usuario</DialogTitle>
            <DialogDescription>
              Detalles completos del usuario seleccionado
            </DialogDescription>
          </DialogHeader>

          {usuarioSeleccionado && (
            <div className="space-y-6">
              {/* Datos Personales */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Datos Personales</CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-semibold">Nombre(s)</Label>
                    <p>{usuarioSeleccionado.nombre}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-semibold">Apellidos</Label>
                    <p>{usuarioSeleccionado.apellido}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-semibold">Fecha de Nacimiento</Label>
                    <p>{formatearFecha(usuarioSeleccionado.fecha_nacimiento)}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-semibold">Estado Civil</Label>
                    <p>{usuarioSeleccionado.estado_civil_nombre || "N/A"}</p>
                  </div>
                </CardContent>
              </Card>

              {/* Identificación */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Identificación</CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-semibold">Tipo de Documento</Label>
                    <p>{usuarioSeleccionado.tipo_identificacion_nombre || "N/A"}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-semibold">Número de Documento</Label>
                    <p>{usuarioSeleccionado.documento}</p>
                  </div>
                </CardContent>
              </Card>

              {/* Contacto */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Contacto</CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-semibold">Correo Electrónico</Label>
                    <p>{usuarioSeleccionado.correo_electronico || "N/A"}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-semibold">Celular</Label>
                    <p>{usuarioSeleccionado.celular || "N/A"}</p>
                  </div>
                  <div className="col-span-2">
                    <Label className="text-sm font-semibold">Dirección</Label>
                    <p>{usuarioSeleccionado.direccion || "N/A"}</p>
                  </div>
                </CardContent>
              </Card>

              {/* Datos del Contrato */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Datos del Contrato</CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-semibold">Fecha de Ingreso</Label>
                    <p>{formatearFecha(usuarioSeleccionado.dia_ingreso)}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-semibold">Tipo de Contrato</Label>
                    <p>{usuarioSeleccionado.tipo_contrato_nombre || "N/A"}</p>
                  </div>
                </CardContent>
              </Card>

              {/* Seguridad Social */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Seguridad Social</CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-semibold">EPS</Label>
                    <p>{usuarioSeleccionado.eps_nombre || "N/A"}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-semibold">Fecha Afiliación EPS</Label>
                    <p>{formatearFecha(usuarioSeleccionado.eps_fecha_ingreso)}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-semibold">ARL</Label>
                    <p>{usuarioSeleccionado.arl_nombre || "N/A"}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-semibold">Fecha Afiliación ARL</Label>
                    <p>{formatearFecha(usuarioSeleccionado.arl_fecha_ingreso)}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-semibold">Fondo de Pensiones</Label>
                    <p>{usuarioSeleccionado.fondo_pensiones_nombre || "N/A"}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-semibold">Caja de Compensación</Label>
                    <p>{usuarioSeleccionado.caja_compensacion_nombre || "N/A"}</p>
                  </div>
                </CardContent>
              </Card>

              {/* Contacto de Emergencia */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Contacto de Emergencia</CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-semibold">Nombre del Contacto</Label>
                    <p>{usuarioSeleccionado.nombre_contacto || "N/A"}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-semibold">Teléfono del Contacto</Label>
                    <p>{usuarioSeleccionado.telefono_contacto || "N/A"}</p>
                  </div>
                </CardContent>
              </Card>

              {/* Lista de Chequeo */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Lista de Chequeo</CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-semibold">Inducción SST</Label>
                    <p>{usuarioSeleccionado.induccion_sst ? "✓ Sí" : "✗ No"}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-semibold">Inducción Puesto de Trabajo</Label>
                    <p>{usuarioSeleccionado.induccion_puesto_trabajo ? "✓ Sí" : "✗ No"}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-semibold">Afiliación a Beneficiarios</Label>
                    <p>{usuarioSeleccionado.afiliacion_a_beneficiarios ? "✓ Sí" : "✗ No"}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-semibold">Firmó Reglamento Interno</Label>
                    <p>{usuarioSeleccionado.firma_reglamento_interno_trabajo ? "✓ Sí" : "✗ No"}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-semibold">Firmó Elementos de Protección</Label>
                    <p>{usuarioSeleccionado.firma_elementos_proteccion ? "✓ Sí" : "✗ No"}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-semibold">Firmó Contrato</Label>
                    <p>{usuarioSeleccionado.firma_contrato ? "✓ Sí" : "✗ No"}</p>
                  </div>
                </CardContent>
              </Card>

              {/* Alertas del Usuario */}
              {(() => {
                const pendientesUsuario = alertas.find(a => a.id_usuarios === usuarioSeleccionado.id_usuarios);
                if (!pendientesUsuario || pendientesUsuario.pendientes.length === 0) {
                  return (
                    <Card className="border-green-200 bg-green-50">
                      <CardHeader>
                        <CardTitle className="text-lg flex items-center gap-2 text-green-700">
                          <CheckCircle2 className="h-5 w-5" />
                          Estado de Documentos
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-green-700">✓ Todos los documentos están al día</p>
                      </CardContent>
                    </Card>
                  );
                }
                return (
                  <Card className="border-red-200 bg-red-50">
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center gap-2 text-red-700">
                        <AlertTriangle className="h-5 w-5" />
                        Alertas Pendientes ({pendientesUsuario.total_pendientes})
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      {pendientesUsuario.pendientes.map((pendiente: any, idx: number) => (
                        <div
                          key={idx}
                          className={`p-3 rounded-lg border ${
                            pendiente.prioridad === 'alta'
                              ? 'bg-red-100 border-red-300 text-red-800'
                              : 'bg-yellow-100 border-yellow-300 text-yellow-800'
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            {pendiente.prioridad === 'alta' ? (
                              <AlertTriangle className="h-4 w-4" />
                            ) : (
                              <Clock className="h-4 w-4" />
                            )}
                            <span className="font-medium">{pendiente.mensaje}</span>
                            <Badge
                              variant="outline"
                              className={`ml-auto ${
                                pendiente.prioridad === 'alta'
                                  ? 'border-red-500 text-red-700'
                                  : 'border-yellow-500 text-yellow-700'
                              }`}
                            >
                              {pendiente.prioridad === 'alta' ? 'Alta' : 'Media'}
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                );
              })()}

              {/* Roles */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Roles</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {usuarioSeleccionado.roles && usuarioSeleccionado.roles.length > 0
                      ? usuarioSeleccionado.roles.map((rol) => (
                          <span
                            key={rol.id_rol}
                            className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                          >
                            {rol.nombre_rol}
                          </span>
                        ))
                      : "Sin roles asignados"}
                  </div>
                </CardContent>
              </Card>

              <Separator />

              {/* Cambiar Estado */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Cambiar Estado</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="flex-1">
                      <Label htmlFor="estado">Estado Actual</Label>
                      <Select value={nuevoEstado} onValueChange={setNuevoEstado}>
                        <SelectTrigger id="estado">
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
                    <Button
                      onClick={handleActualizarEstado}
                      disabled={actualizandoEstado || !nuevoEstado}
                    >
                      {actualizandoEstado ? "Actualizando..." : "Actualizar Estado"}
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Botón Editar (solo para super administradores) */}
              {esSuperAdministrador && (
                <>
                  <Separator />
                  <div className="flex justify-end">
                    <Button
                      onClick={() => {
                        setMostrarModal(false);
                        navigate(`/dashboard/usuarios/editar-usuarios/${usuarioSeleccionado.id_usuarios}`);
                      }}
                      variant="default"
                    >
                      <Edit className="h-4 w-4 mr-2" />
                      Editar Usuario
                    </Button>
                  </div>
                </>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </PageContainer>
  );
};

export default VerUsuarios;
