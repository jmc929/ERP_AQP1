import { useState, useEffect } from "react";
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
import { Checkbox } from "@/components/ui/checkbox";
import { Plus, Archive, Edit, Eye } from "lucide-react";
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
import { API_BASE_URL } from "@/config/api";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Proveedor {
  id_proveedor: number;
  id_tipo_entidad?: number;
  id_tipo_identificacion?: number;
  identificacion?: string;
  dv?: number;
  telefono?: string;
  razon_social?: string;
  nombre_comercial?: string;
  id_ciudad?: number;
  direccion?: string;
  nombre_contacto?: string;
  apellido_contacto?: string;
  correo_electronico?: string;
  id_tipo_regimen_iva?: number;
  id_responsabilidad_fiscal?: number;
  id_estado?: number;
  tipo_entidad_nombre?: string;
  tipo_identificacion_nombre?: string;
  ciudad_nombre?: string;
  tipo_regimen_iva_nombre?: string;
  responsabilidad_fiscal_nombre?: string;
  responsabilidad_fiscal_codigo?: string;
  estado_nombre?: string;
  estado_color?: string;
}

interface Catalogos {
  tiposEntidad: Array<{ id_tipo_entidad: number; nombre: string }>;
  tiposIdentificacion: Array<{ id_tipo_identificacion: number; nombre: string }>;
  ciudades: Array<{ id_ciudad: number; nombre: string }>;
  tiposRegimenIva: Array<{ id_regimen_iva: number; nombre: string }>;
  responsabilidadesFiscales: Array<{ id_responsabilidad_fiscal: number; nombre: string; codigo: string }>;
  estados: Array<{ id_estado: number; nombre: string; color: string }>;
}

const GestionarProveedores = () => {
  const { toast } = useToast();
  const [proveedores, setProveedores] = useState<Proveedor[]>([]);
  const [proveedoresSeleccionados, setProveedoresSeleccionados] = useState<Set<number>>(new Set());
  const [mostrarDialogoArchivar, setMostrarDialogoArchivar] = useState(false);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [loading, setLoading] = useState(true);
  const [loadingCatalogos, setLoadingCatalogos] = useState(true);
  const [catalogos, setCatalogos] = useState<Catalogos | null>(null);
  const [busqueda, setBusqueda] = useState("");
  const [paginaActual, setPaginaActual] = useState(1);
  const [paginacion, setPaginacion] = useState<{
    paginaActual: number;
    totalPaginas: number;
    totalRegistros: number;
    limite: number;
  } | null>(null);

  // Estados del formulario
  const [idTipoEntidad, setIdTipoEntidad] = useState("");
  const [idTipoIdentificacion, setIdTipoIdentificacion] = useState("");
  const [identificacion, setIdentificacion] = useState("");
  const [dv, setDv] = useState("");
  const [telefono, setTelefono] = useState("");
  const [razonSocial, setRazonSocial] = useState("");
  const [nombreComercial, setNombreComercial] = useState("");
  const [idCiudad, setIdCiudad] = useState("");
  const [direccion, setDireccion] = useState("");
  const [nombreContacto, setNombreContacto] = useState("");
  const [apellidoContacto, setApellidoContacto] = useState("");
  const [correoElectronico, setCorreoElectronico] = useState("");
  const [idTipoRegimenIva, setIdTipoRegimenIva] = useState("");
  const [idResponsabilidadFiscal, setIdResponsabilidadFiscal] = useState("");
  const [idEstado, setIdEstado] = useState("");
  const [guardando, setGuardando] = useState(false);
  const [proveedorSeleccionado, setProveedorSeleccionado] = useState<Proveedor | null>(null);
  const [mostrarModalVer, setMostrarModalVer] = useState(false);
  const [mostrarModalEditar, setMostrarModalEditar] = useState(false);
  const [proveedorEditando, setProveedorEditando] = useState<Proveedor | null>(null);
  const [cargandoProveedor, setCargandoProveedor] = useState(false);

  // Cargar catálogos
  useEffect(() => {
    const cargarCatalogos = async () => {
      try {
        setLoadingCatalogos(true);
        const catalogosRes = await fetch(`${API_BASE_URL}/api/proveedores/catalogos");
        const catalogosData = await catalogosRes.json();

        if (catalogosData.success) {
          setCatalogos(catalogosData.catalogos);
        }
      } catch (error) {
        toast({
          title: "Error",
          description: "No se pudieron cargar los catálogos",
          variant: "destructive",
        });
      } finally {
        setLoadingCatalogos(false);
      }
    };

    cargarCatalogos();
  }, [toast]);

  // Cargar proveedores con paginación
  useEffect(() => {
    const cargarProveedores = async () => {
      try {
        setLoading(true);
        const url = new URL(`${API_BASE_URL}/api/proveedores/paginados");
        url.searchParams.append("page", paginaActual.toString());
        url.searchParams.append("limit", "30");
        if (busqueda.trim()) {
          url.searchParams.append("busqueda", busqueda.trim());
        }

        const proveedoresRes = await fetch(url.toString());
        const proveedoresData = await proveedoresRes.json();

        if (proveedoresData.success) {
          setProveedores(proveedoresData.proveedores);
          setPaginacion(proveedoresData.paginacion);
        }
      } catch (error) {
        toast({
          title: "Error",
          description: "No se pudieron cargar los proveedores",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    cargarProveedores();
  }, [paginaActual, busqueda, toast]);

  // Resetear a página 1 cuando cambia la búsqueda
  useEffect(() => {
    if (busqueda !== undefined) {
      setPaginaActual(1);
    }
  }, [busqueda]);

  // Cargar proveedor completo para ver o editar
  const cargarProveedorCompleto = async (idProveedor: number) => {
    try {
      setCargandoProveedor(true);
      const response = await fetch(`${API_BASE_URL}/api/proveedores/${idProveedor}`);
      const data = await response.json();

      if (data.success) {
        return data.proveedor;
      }
      return null;
    } catch (error) {
      toast({
        title: "Error",
        description: "No se pudo cargar la información del proveedor",
        variant: "destructive",
      });
      return null;
    } finally {
      setCargandoProveedor(false);
    }
  };

  // Manejar ver proveedor
  const handleVerProveedor = async (idProveedor: number) => {
    const proveedor = await cargarProveedorCompleto(idProveedor);
    if (proveedor) {
      setProveedorSeleccionado(proveedor);
      setMostrarModalVer(true);
    }
  };

  // Manejar editar proveedor
  const handleEditarProveedor = async (idProveedor: number) => {
    const proveedor = await cargarProveedorCompleto(idProveedor);
    if (proveedor) {
      setProveedorEditando(proveedor);
      // Llenar el formulario con los datos del proveedor
      setIdTipoEntidad(proveedor.id_tipo_entidad?.toString() || "");
      setIdTipoIdentificacion(proveedor.id_tipo_identificacion?.toString() || "");
      setIdentificacion(proveedor.identificacion || "");
      setDv(proveedor.dv?.toString() || "");
      setTelefono(proveedor.telefono || "");
      setRazonSocial(proveedor.razon_social || "");
      setNombreComercial(proveedor.nombre_comercial || "");
      setIdCiudad(proveedor.id_ciudad?.toString() || "");
      setDireccion(proveedor.direccion || "");
      setNombreContacto(proveedor.nombre_contacto || "");
      setApellidoContacto(proveedor.apellido_contacto || "");
      setCorreoElectronico(proveedor.correo_electronico || "");
      setIdTipoRegimenIva(proveedor.id_tipo_regimen_iva?.toString() || "");
      setIdResponsabilidadFiscal(proveedor.id_responsabilidad_fiscal?.toString() || "");
      setIdEstado(proveedor.id_estado?.toString() || "");
      setMostrarFormulario(true);
      setMostrarModalEditar(true);
    }
  };

  // Actualizar proveedor
  const handleActualizarProveedor = async () => {
    if (!proveedorEditando || !identificacion.trim()) {
      toast({
        title: "Error",
        description: "La identificación es obligatoria",
        variant: "destructive",
      });
      return;
    }

    try {
      setGuardando(true);
      const response = await fetch(`${API_BASE_URL}/api/proveedores/${proveedorEditando.id_proveedor}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id_tipo_entidad: idTipoEntidad ? parseInt(idTipoEntidad) : null,
          id_tipo_identificacion: idTipoIdentificacion ? parseInt(idTipoIdentificacion) : null,
          identificacion: identificacion.trim(),
          dv: dv ? parseInt(dv) : undefined,
          telefono: telefono.trim() || null,
          razon_social: razonSocial.trim() || null,
          nombre_comercial: nombreComercial.trim() || null,
          id_ciudad: idCiudad ? parseInt(idCiudad) : null,
          direccion: direccion.trim() || null,
          nombre_contacto: nombreContacto.trim() || null,
          apellido_contacto: apellidoContacto.trim() || null,
          correo_electronico: correoElectronico.trim() || null,
          id_tipo_regimen_iva: idTipoRegimenIva ? parseInt(idTipoRegimenIva) : null,
          id_responsabilidad_fiscal: idResponsabilidadFiscal ? parseInt(idResponsabilidadFiscal) : null,
          id_estado: idEstado ? parseInt(idEstado) : null,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Error al actualizar el proveedor");
      }

      toast({
        title: "Proveedor actualizado",
        description: "El proveedor se ha actualizado exitosamente",
      });

      // Recargar proveedores (se recargará automáticamente por el useEffect)
      setPaginaActual(1);

      limpiarFormulario();
      setMostrarFormulario(false);
      setMostrarModalEditar(false);
      setProveedorEditando(null);
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Error al actualizar el proveedor",
        variant: "destructive",
      });
    } finally {
      setGuardando(false);
    }
  };

  const handleCheckbox = (proveedorId: number, checked: boolean) => {
    setProveedoresSeleccionados((prev) => {
      const nuevo = new Set(prev);
      if (checked) {
        nuevo.add(proveedorId);
      } else {
        nuevo.delete(proveedorId);
      }
      return nuevo;
    });
  };

  const limpiarFormulario = () => {
    setIdTipoEntidad("");
    setIdTipoIdentificacion("");
    setIdentificacion("");
    setDv("");
    setTelefono("");
    setRazonSocial("");
    setNombreComercial("");
    setIdCiudad("");
    setDireccion("");
    setNombreContacto("");
    setApellidoContacto("");
    setCorreoElectronico("");
    setIdTipoRegimenIva("");
    setIdResponsabilidadFiscal("");
    setIdEstado("");
  };

  const handleAgregarProveedor = async () => {
    if (!identificacion.trim()) {
      toast({
        title: "Error",
        description: "La identificación es obligatoria",
        variant: "destructive",
      });
      return;
    }

    try {
      setGuardando(true);
      const response = await fetch(`${API_BASE_URL}/api/proveedores", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id_tipo_entidad: idTipoEntidad ? parseInt(idTipoEntidad) : null,
          id_tipo_identificacion: idTipoIdentificacion ? parseInt(idTipoIdentificacion) : null,
          identificacion: identificacion.trim(),
          // El DV se calcula automáticamente en el backend si no se envía
          dv: dv ? parseInt(dv) : undefined,
          telefono: telefono.trim() || null,
          razon_social: razonSocial.trim() || null,
          nombre_comercial: nombreComercial.trim() || null,
          id_ciudad: idCiudad ? parseInt(idCiudad) : null,
          direccion: direccion.trim() || null,
          nombre_contacto: nombreContacto.trim() || null,
          apellido_contacto: apellidoContacto.trim() || null,
          correo_electronico: correoElectronico.trim() || null,
          id_tipo_regimen_iva: idTipoRegimenIva ? parseInt(idTipoRegimenIva) : null,
          id_responsabilidad_fiscal: idResponsabilidadFiscal ? parseInt(idResponsabilidadFiscal) : null,
          id_estado: idEstado ? parseInt(idEstado) : null,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Error al crear el proveedor");
      }

      toast({
        title: "Proveedor creado",
        description: "El proveedor se ha creado exitosamente",
      });

      // Recargar proveedores (se recargará automáticamente por el useEffect)
      setPaginaActual(1);

      limpiarFormulario();
      setMostrarFormulario(false);
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Error al crear el proveedor",
        variant: "destructive",
      });
    } finally {
      setGuardando(false);
    }
  };

  const handleArchivarConfirmado = async () => {
    // TODO: Implementar archivar proveedores cuando se defina la lógica
    setProveedores(proveedores.filter((p) => !proveedoresSeleccionados.has(p.id_proveedor)));
    setProveedoresSeleccionados(new Set());
    setMostrarDialogoArchivar(false);
  };

  return (
    <PageContainer>
      <div className="flex items-center justify-between">
        <PageTitle title="Gestionar Proveedores" />
        <Button
          onClick={() => setMostrarFormulario(!mostrarFormulario)}
          className="flex items-center gap-2"
        >
          <Plus className="h-4 w-4" />
          Agregar Proveedor
        </Button>
      </div>

      {/* Formulario para agregar/editar proveedor */}
      {mostrarFormulario && (
        <FormCard title={proveedorEditando ? "Editar Proveedor" : "Agregar Nuevo Proveedor"}>
          {loadingCatalogos ? (
            <div className="text-center py-4">Cargando catálogos...</div>
          ) : (
            <div className="space-y-6">
              {/* Tipo de Entidad e Identificación */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="tipoEntidad">Tipo de Entidad</Label>
                  <Select value={idTipoEntidad} onValueChange={setIdTipoEntidad}>
                    <SelectTrigger id="tipoEntidad">
                      <SelectValue placeholder="Seleccione tipo de entidad" />
                    </SelectTrigger>
                    <SelectContent>
                      {catalogos?.tiposEntidad.map((tipo) => (
                        <SelectItem key={tipo.id_tipo_entidad} value={tipo.id_tipo_entidad.toString()}>
                          {tipo.nombre}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="tipoIdentificacion">Tipo de Identificación</Label>
                  <Select value={idTipoIdentificacion} onValueChange={setIdTipoIdentificacion}>
                    <SelectTrigger id="tipoIdentificacion">
                      <SelectValue placeholder="Seleccione tipo de identificación" />
                    </SelectTrigger>
                    <SelectContent>
                      {catalogos?.tiposIdentificacion.map((tipo) => (
                        <SelectItem key={tipo.id_tipo_identificacion} value={tipo.id_tipo_identificacion.toString()}>
                          {tipo.nombre}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Identificación y DV */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="identificacion">Identificación *</Label>
                  <Input
                    id="identificacion"
                    value={identificacion}
                    onChange={async (e) => {
                      const nuevaIdentificacion = e.target.value;
                      setIdentificacion(nuevaIdentificacion);
                      
                      // Calcular DV automáticamente si hay identificación
                      if (nuevaIdentificacion.trim()) {
                        try {
                          const response = await fetch(
                            `${API_BASE_URL}/api/proveedores/calcular-dv?identificacion=${encodeURIComponent(nuevaIdentificacion)}`
                          );
                          const data = await response.json();
                          if (data.success && data.dv !== null) {
                            setDv(data.dv.toString());
                          } else {
                            setDv("");
                          }
                        } catch (error) {
                          // Si falla el cálculo, dejar el campo vacío
                          setDv("");
                        }
                      } else {
                        setDv("");
                      }
                    }}
                    placeholder="Ingrese la identificación"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dv">Dígito Verificador (DV)</Label>
                  <Input
                    id="dv"
                    type="number"
                    value={dv}
                    disabled
                    className="bg-gray-100 text-gray-600 cursor-not-allowed"
                    placeholder="Se calcula automáticamente"
                  />
                </div>
              </div>

              {/* Razón Social y Nombre Comercial */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="razonSocial">Razón Social</Label>
                  <Input
                    id="razonSocial"
                    value={razonSocial}
                    onChange={(e) => setRazonSocial(e.target.value)}
                    placeholder="Ingrese la razón social"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="nombreComercial">Nombre Comercial</Label>
                  <Input
                    id="nombreComercial"
                    value={nombreComercial}
                    onChange={(e) => setNombreComercial(e.target.value)}
                    placeholder="Ingrese el nombre comercial"
                  />
                </div>
              </div>

              {/* Ciudad y Dirección */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="ciudad">Ciudad</Label>
                  <Select value={idCiudad} onValueChange={setIdCiudad}>
                    <SelectTrigger id="ciudad">
                      <SelectValue placeholder="Seleccione la ciudad" />
                    </SelectTrigger>
                    <SelectContent>
                      {catalogos?.ciudades.map((ciudad) => (
                        <SelectItem key={ciudad.id_ciudad} value={ciudad.id_ciudad.toString()}>
                          {ciudad.nombre}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="direccion">Dirección</Label>
                  <Input
                    id="direccion"
                    value={direccion}
                    onChange={(e) => setDireccion(e.target.value)}
                    placeholder="Ingrese la dirección"
                  />
                </div>
              </div>

              {/* Teléfono y Correo Electrónico */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="telefono">Teléfono</Label>
                  <Input
                    id="telefono"
                    value={telefono}
                    onChange={(e) => setTelefono(e.target.value)}
                    placeholder="Ingrese el teléfono"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="correo">Correo Electrónico</Label>
                  <Input
                    id="correo"
                    type="email"
                    value={correoElectronico}
                    onChange={(e) => setCorreoElectronico(e.target.value)}
                    placeholder="correo@ejemplo.com"
                  />
                </div>
              </div>

              {/* Nombre y Apellido Contacto */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="nombreContacto">Nombre del Contacto</Label>
                  <Input
                    id="nombreContacto"
                    value={nombreContacto}
                    onChange={(e) => setNombreContacto(e.target.value)}
                    placeholder="Ingrese el nombre del contacto"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="apellidoContacto">Apellido del Contacto</Label>
                  <Input
                    id="apellidoContacto"
                    value={apellidoContacto}
                    onChange={(e) => setApellidoContacto(e.target.value)}
                    placeholder="Ingrese el apellido del contacto"
                  />
                </div>
              </div>

              {/* Tipo Régimen IVA y Responsabilidad Fiscal */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="tipoRegimenIva">Tipo Régimen IVA</Label>
                  <Select value={idTipoRegimenIva} onValueChange={setIdTipoRegimenIva}>
                    <SelectTrigger id="tipoRegimenIva">
                      <SelectValue placeholder="Seleccione el régimen IVA" />
                    </SelectTrigger>
                    <SelectContent>
                      {catalogos?.tiposRegimenIva.map((tipo) => (
                        <SelectItem key={tipo.id_regimen_iva} value={tipo.id_regimen_iva.toString()}>
                          {tipo.nombre}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="responsabilidadFiscal">Responsabilidad Fiscal</Label>
                  <Select value={idResponsabilidadFiscal} onValueChange={setIdResponsabilidadFiscal}>
                    <SelectTrigger id="responsabilidadFiscal">
                      <SelectValue placeholder="Seleccione la responsabilidad fiscal" />
                    </SelectTrigger>
                    <SelectContent>
                      {catalogos?.responsabilidadesFiscales.map((resp) => (
                        <SelectItem key={resp.id_responsabilidad_fiscal} value={resp.id_responsabilidad_fiscal.toString()}>
                          {resp.nombre} {resp.codigo ? `(${resp.codigo})` : ""}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Estado */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="estado">Estado</Label>
                  <Select value={idEstado} onValueChange={setIdEstado}>
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
                  onClick={proveedorEditando ? handleActualizarProveedor : handleAgregarProveedor} 
                  className="flex-1" 
                  disabled={guardando}
                >
                  {guardando ? "Guardando..." : proveedorEditando ? "Actualizar Proveedor" : "Guardar Proveedor"}
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    setMostrarFormulario(false);
                    limpiarFormulario();
                    setProveedorEditando(null);
                    setMostrarModalEditar(false);
                  }}
                  disabled={guardando}
                >
                  Cancelar
                </Button>
              </div>
            </div>
          )}
        </FormCard>
      )}

      {/* Barra de búsqueda */}
      <SearchBar
        placeholder="Buscar por razón social, nombre comercial, identificación, contacto o ciudad..."
        value={busqueda}
        onChange={setBusqueda}
      />

      {/* Tabla de proveedores */}
      <TableCard
        headers={["Tipo Identificación", "Número", "Razón Social", "Contacto", "Teléfono", "Ciudad", "Estado", "Acciones"]}
        emptyMessage={
          loading
            ? "Cargando proveedores..."
            : proveedores.length === 0
            ? busqueda.trim()
              ? "No se encontraron proveedores"
              : "No hay proveedores registrados"
            : undefined
        }
        colSpan={8}
      >
        {proveedores.map((proveedor) => (
          <TableRow key={proveedor.id_proveedor}>
            <TableCell className="border-r border-border">
              {proveedor.tipo_identificacion_nombre || "N/A"}
            </TableCell>
            <TableCell className="border-r border-border font-medium">
              {proveedor.identificacion || "N/A"}
            </TableCell>
            <TableCell className="border-r border-border">
              {proveedor.razon_social || "N/A"}
            </TableCell>
            <TableCell className="border-r border-border">
              {proveedor.nombre_contacto && proveedor.apellido_contacto
                ? `${proveedor.nombre_contacto} ${proveedor.apellido_contacto}`
                : proveedor.nombre_contacto || proveedor.apellido_contacto || "N/A"}
            </TableCell>
            <TableCell className="border-r border-border">
              {proveedor.telefono || "N/A"}
            </TableCell>
            <TableCell className="border-r border-border">
              {proveedor.ciudad_nombre || "N/A"}
            </TableCell>
            <TableCell className="border-r border-border">
              {proveedor.estado_nombre ? (
                <span 
                  className="px-2 py-1 rounded text-xs font-medium"
                  style={{ 
                    backgroundColor: proveedor.estado_color ? `${proveedor.estado_color}20` : '#f3f4f6',
                    color: proveedor.estado_color || '#374151'
                  }}
                >
                  {proveedor.estado_nombre}
                </span>
              ) : "N/A"}
            </TableCell>
            <TableCell>
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleVerProveedor(proveedor.id_proveedor)}
                  disabled={cargandoProveedor}
                  title="Ver detalles"
                >
                  <Eye className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleEditarProveedor(proveedor.id_proveedor)}
                  disabled={cargandoProveedor}
                  title="Editar proveedor"
                >
                  <Edit className="h-4 w-4" />
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableCard>

      {/* Información de paginación y controles */}
      {paginacion && (
        <div className="mt-4">
          <div className="text-sm text-muted-foreground text-center mb-2">
            Mostrando {proveedores.length} de {paginacion.totalRegistros} proveedor{paginacion.totalRegistros !== 1 ? "es" : ""}
          </div>
          {paginacion.totalPaginas > 1 && (
            <Pagination
              paginaActual={paginacion.paginaActual}
              totalPaginas={paginacion.totalPaginas}
              onPageChange={setPaginaActual}
            />
          )}
        </div>
      )}

      {/* Modal para ver todos los datos del proveedor */}
      <Dialog open={mostrarModalVer} onOpenChange={setMostrarModalVer}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Información del Proveedor</DialogTitle>
            <DialogDescription>
              Detalles completos del proveedor seleccionado
            </DialogDescription>
          </DialogHeader>

          {proveedorSeleccionado && (
            <div className="space-y-6">
              {/* Datos Básicos */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Datos Básicos</CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-semibold">Tipo de Entidad</Label>
                    <p>{proveedorSeleccionado.tipo_entidad_nombre || "N/A"}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-semibold">Tipo de Identificación</Label>
                    <p>{proveedorSeleccionado.tipo_identificacion_nombre || "N/A"}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-semibold">Identificación</Label>
                    <p>{proveedorSeleccionado.identificacion || "N/A"}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-semibold">Dígito Verificador (DV)</Label>
                    <p>{proveedorSeleccionado.dv !== null && proveedorSeleccionado.dv !== undefined ? proveedorSeleccionado.dv : "N/A"}</p>
                  </div>
                </CardContent>
              </Card>

              {/* Información Comercial */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Información Comercial</CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-semibold">Razón Social</Label>
                    <p>{proveedorSeleccionado.razon_social || "N/A"}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-semibold">Nombre Comercial</Label>
                    <p>{proveedorSeleccionado.nombre_comercial || "N/A"}</p>
                  </div>
                </CardContent>
              </Card>

              {/* Ubicación */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Ubicación</CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-semibold">Ciudad</Label>
                    <p>{proveedorSeleccionado.ciudad_nombre || "N/A"}</p>
                  </div>
                  <div className="col-span-2">
                    <Label className="text-sm font-semibold">Dirección</Label>
                    <p>{proveedorSeleccionado.direccion || "N/A"}</p>
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
                    <Label className="text-sm font-semibold">Nombre del Contacto</Label>
                    <p>{proveedorSeleccionado.nombre_contacto || "N/A"}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-semibold">Apellido del Contacto</Label>
                    <p>{proveedorSeleccionado.apellido_contacto || "N/A"}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-semibold">Teléfono</Label>
                    <p>{proveedorSeleccionado.telefono || "N/A"}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-semibold">Correo Electrónico</Label>
                    <p>{proveedorSeleccionado.correo_electronico || "N/A"}</p>
                  </div>
                </CardContent>
              </Card>

              {/* Información Fiscal */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Información Fiscal</CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-semibold">Tipo Régimen IVA</Label>
                    <p>{proveedorSeleccionado.tipo_regimen_iva_nombre || "N/A"}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-semibold">Responsabilidad Fiscal</Label>
                    <p>
                      {proveedorSeleccionado.responsabilidad_fiscal_nombre || "N/A"}
                      {proveedorSeleccionado.responsabilidad_fiscal_codigo && ` (${proveedorSeleccionado.responsabilidad_fiscal_codigo})`}
                    </p>
                  </div>
                  <div>
                    <Label className="text-sm font-semibold">Estado</Label>
                    <p>
                      {proveedorSeleccionado.estado_nombre ? (
                        <span 
                          className="px-2 py-1 rounded text-xs font-medium"
                          style={{ 
                            backgroundColor: proveedorSeleccionado.estado_color ? `${proveedorSeleccionado.estado_color}20` : '#f3f4f6',
                            color: proveedorSeleccionado.estado_color || '#374151'
                          }}
                        >
                          {proveedorSeleccionado.estado_nombre}
                        </span>
                      ) : "N/A"}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </PageContainer>
  );
};

export default GestionarProveedores;

