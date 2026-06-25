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

interface Cliente {
  id_cliente: number;
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
  fecha_diligenciamiento?: string;
}

interface Catalogos {
  tiposEntidad: Array<{ id_tipo_entidad: number; nombre: string }>;
  tiposIdentificacion: Array<{ id_tipo_identificacion: number; nombre: string }>;
  ciudades: Array<{ id_ciudad: number; nombre: string }>;
  tiposRegimenIva: Array<{ id_regimen_iva: number; nombre: string }>;
  responsabilidadesFiscales: Array<{ id_responsabilidad_fiscal: number; nombre: string; codigo: string }>;
  estados: Array<{ id_estado: number; nombre: string; color: string }>;
}

const GestionarClientes = () => {
  const { toast } = useToast();
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [clientesSeleccionados, setClientesSeleccionados] = useState<Set<number>>(new Set());
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
  const [clienteSeleccionado, setClienteSeleccionado] = useState<Cliente | null>(null);
  const [mostrarModalVer, setMostrarModalVer] = useState(false);
  const [mostrarModalEditar, setMostrarModalEditar] = useState(false);
  const [clienteEditando, setClienteEditando] = useState<Cliente | null>(null);
  const [cargandoCliente, setCargandoCliente] = useState(false);

  // Cargar catálogos
  useEffect(() => {
    const cargarCatalogos = async () => {
      try {
        setLoadingCatalogos(true);
        const catalogosRes = await fetch(`${API_BASE_URL}/api/clientes/catalogos`);
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

  // Cargar clientes con paginación
  useEffect(() => {
    const cargarClientes = async () => {
      try {
        setLoading(true);
        const url = new URL(`${API_BASE_URL}/api/clientes/paginados`);
        url.searchParams.append("page", paginaActual.toString());
        url.searchParams.append("limit", "30");
        if (busqueda.trim()) {
          url.searchParams.append("busqueda", busqueda.trim());
        }

        const clientesRes = await fetch(url.toString());
        const clientesData = await clientesRes.json();

        if (clientesData.success) {
          setClientes(clientesData.clientes);
          setPaginacion(clientesData.paginacion);
        }
      } catch (error) {
        toast({
          title: "Error",
          description: "No se pudieron cargar los clientes",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    cargarClientes();
  }, [paginaActual, busqueda, toast]);

  // Resetear a página 1 cuando cambia la búsqueda
  useEffect(() => {
    if (busqueda !== undefined) {
      setPaginaActual(1);
    }
  }, [busqueda]);

  // Cargar cliente completo para ver o editar
  const cargarClienteCompleto = async (idCliente: number) => {
    try {
      setCargandoCliente(true);
      const response = await fetch(`${API_BASE_URL}/api/clientes/${idCliente}`);
      const data = await response.json();

      if (data.success) {
        return data.cliente;
      }
      return null;
    } catch (error) {
      toast({
        title: "Error",
        description: "No se pudo cargar la información del cliente",
        variant: "destructive",
      });
      return null;
    } finally {
      setCargandoCliente(false);
    }
  };

  // Manejar ver cliente
  const handleVerCliente = async (idCliente: number) => {
    const cliente = await cargarClienteCompleto(idCliente);
    if (cliente) {
      setClienteSeleccionado(cliente);
      setMostrarModalVer(true);
    }
  };

  // Manejar editar cliente
  const handleEditarCliente = async (idCliente: number) => {
    const cliente = await cargarClienteCompleto(idCliente);
    if (cliente) {
      setClienteEditando(cliente);
      // Llenar el formulario con los datos del cliente
      setIdTipoEntidad(cliente.id_tipo_entidad?.toString() || "");
      setIdTipoIdentificacion(cliente.id_tipo_identificacion?.toString() || "");
      setIdentificacion(cliente.identificacion || "");
      setDv(cliente.dv?.toString() || "");
      setTelefono(cliente.telefono || "");
      setRazonSocial(cliente.razon_social || "");
      setNombreComercial(cliente.nombre_comercial || "");
      setIdCiudad(cliente.id_ciudad?.toString() || "");
      setDireccion(cliente.direccion || "");
      setNombreContacto(cliente.nombre_contacto || "");
      setApellidoContacto(cliente.apellido_contacto || "");
      setCorreoElectronico(cliente.correo_electronico || "");
      setIdTipoRegimenIva(cliente.id_tipo_regimen_iva?.toString() || "");
      setIdResponsabilidadFiscal(cliente.id_responsabilidad_fiscal?.toString() || "");
      setIdEstado(cliente.id_estado?.toString() || "");
      setMostrarFormulario(true);
      setMostrarModalEditar(true);
    }
  };

  // Actualizar cliente
  const handleActualizarCliente = async () => {
    if (!clienteEditando || !identificacion.trim()) {
      toast({
        title: "Error",
        description: "La identificación es obligatoria",
        variant: "destructive",
      });
      return;
    }

    try {
      setGuardando(true);
      const response = await fetch(`${API_BASE_URL}/api/clientes/${clienteEditando.id_cliente}`, {
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
        throw new Error(data.message || "Error al actualizar el cliente");
      }

      toast({
        title: "Cliente actualizado",
        description: "El cliente se ha actualizado exitosamente",
      });

      // Recargar clientes (se recargará automáticamente por el useEffect)
      setPaginaActual(1);

      limpiarFormulario();
      setMostrarFormulario(false);
      setMostrarModalEditar(false);
      setClienteEditando(null);
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Error al actualizar el cliente",
        variant: "destructive",
      });
    } finally {
      setGuardando(false);
    }
  };

  const handleCheckbox = (clienteId: number, checked: boolean) => {
    setClientesSeleccionados((prev) => {
      const nuevo = new Set(prev);
      if (checked) {
        nuevo.add(clienteId);
      } else {
        nuevo.delete(clienteId);
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

  const handleAgregarCliente = async () => {
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
      const response = await fetch(`${API_BASE_URL}/api/clientes`, {
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
        throw new Error(data.message || "Error al crear el cliente");
      }

      toast({
        title: "Cliente creado",
        description: "El cliente se ha creado exitosamente",
      });

      // Recargar clientes (se recargará automáticamente por el useEffect)
      setPaginaActual(1);

      limpiarFormulario();
      setMostrarFormulario(false);
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Error al crear el cliente",
        variant: "destructive",
      });
    } finally {
      setGuardando(false);
    }
  };

  const handleArchivarConfirmado = async () => {
    // TODO: Implementar archivar clientes cuando se defina la lógica
    setClientes(clientes.filter((c) => !clientesSeleccionados.has(c.id_cliente)));
    setClientesSeleccionados(new Set());
    setMostrarDialogoArchivar(false);
  };

  return (
    <PageContainer>
      <div className="flex items-center justify-between">
        <PageTitle title="Gestionar Clientes" />
        <Button
          onClick={() => setMostrarFormulario(!mostrarFormulario)}
          className="flex items-center gap-2"
        >
          <Plus className="h-4 w-4" />
          Agregar Cliente
        </Button>
      </div>

      {/* Formulario para agregar/editar cliente */}
      {mostrarFormulario && (
        <div className="space-y-8 bg-white dark:bg-slate-900 p-6 md:p-8 rounded-2xl border border-slate-200/80 shadow-md">
          <div className="flex items-center justify-between border-b pb-4">
            <h2 className="text-xl md:text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              {clienteEditando ? "Editar Cliente" : "Agregar Nuevo Cliente"}
            </h2>
          </div>

          {loadingCatalogos ? (
            <div className="text-center py-8 text-muted-foreground">Cargando catálogos...</div>
          ) : (
            <div className="space-y-8">
              {/* Sección 1: Datos de Persona Natural o Jurídica */}
              <div className="p-6 border border-slate-100 dark:border-slate-800 rounded-2xl bg-slate-50/40 dark:bg-slate-900/40 space-y-6 shadow-sm">
                <div className="flex items-center gap-3 border-b border-slate-200/80 dark:border-slate-800 pb-4">
                  <div className="w-1.5 h-6 bg-blue-600 rounded-full" />
                  <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider">
                    Datos de Persona Natural o Jurídica
                  </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="tipoEntidad" className="text-slate-700 dark:text-slate-300 font-semibold">Tipo de Entidad</Label>
                    <Select value={idTipoEntidad} onValueChange={setIdTipoEntidad}>
                      <SelectTrigger id="tipoEntidad" className="bg-white dark:bg-slate-950 border-slate-200">
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
                    <Label htmlFor="tipoIdentificacion" className="text-slate-700 dark:text-slate-300 font-semibold">Tipo de Identificación</Label>
                    <Select value={idTipoIdentificacion} onValueChange={setIdTipoIdentificacion}>
                      <SelectTrigger id="tipoIdentificacion" className="bg-white dark:bg-slate-950 border-slate-200">
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

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="identificacion" className="text-slate-700 dark:text-slate-300 font-semibold">Identificación *</Label>
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
                              `${API_BASE_URL}/api/clientes/calcular-dv?identificacion=${encodeURIComponent(nuevaIdentificacion)}`
                            );
                            const data = await response.json();
                            if (data.success && data.dv !== null) {
                              setDv(data.dv.toString());
                            } else {
                              setDv("");
                            }
                          } catch (error) {
                            setDv("");
                          }
                        } else {
                          setDv("");
                        }
                      }}
                      placeholder="Ingrese la identificación"
                      required
                      className="bg-white dark:bg-slate-950 border-slate-200"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="dv" className="text-slate-700 dark:text-slate-300 font-semibold">Dígito Verificador (DV)</Label>
                    <Input
                      id="dv"
                      type="number"
                      value={dv}
                      disabled
                      className="bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 cursor-not-allowed border-slate-200"
                      placeholder="Se calcula automáticamente"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="razonSocial" className="text-slate-700 dark:text-slate-300 font-semibold">Razón Social</Label>
                    <Input
                      id="razonSocial"
                      value={razonSocial}
                      onChange={(e) => setRazonSocial(e.target.value)}
                      placeholder="Ingrese la razón social"
                      className="bg-white dark:bg-slate-950 border-slate-200"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="nombreComercial" className="text-slate-700 dark:text-slate-300 font-semibold">Nombre Comercial</Label>
                    <Input
                      id="nombreComercial"
                      value={nombreComercial}
                      onChange={(e) => setNombreComercial(e.target.value)}
                      placeholder="Ingrese el nombre comercial"
                      className="bg-white dark:bg-slate-950 border-slate-200"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="correo" className="text-slate-700 dark:text-slate-300 font-semibold">Correo Electrónico</Label>
                    <Input
                      id="correo"
                      type="email"
                      value={correoElectronico}
                      onChange={(e) => setCorreoElectronico(e.target.value)}
                      placeholder="correo@ejemplo.com"
                      className="bg-white dark:bg-slate-950 border-slate-200"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="telefono" className="text-slate-700 dark:text-slate-300 font-semibold">Teléfono</Label>
                    <Input
                      id="telefono"
                      value={telefono}
                      onChange={(e) => setTelefono(e.target.value)}
                      placeholder="Ingrese el teléfono"
                      className="bg-white dark:bg-slate-950 border-slate-200"
                    />
                  </div>
                </div>
              </div>

              {/* Sección 2: Oficina Principal */}
              <div className="p-6 border border-slate-100 dark:border-slate-800 rounded-2xl bg-slate-50/40 dark:bg-slate-900/40 space-y-6 shadow-sm">
                <div className="flex items-center gap-3 border-b border-slate-200/80 dark:border-slate-800 pb-4">
                  <div className="w-1.5 h-6 bg-blue-600 rounded-full" />
                  <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider">
                    Oficina Principal
                  </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="ciudad" className="text-slate-700 dark:text-slate-300 font-semibold">Ciudad</Label>
                    <Select value={idCiudad} onValueChange={setIdCiudad}>
                      <SelectTrigger id="ciudad" className="bg-white dark:bg-slate-950 border-slate-200">
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
                    <Label htmlFor="direccion" className="text-slate-700 dark:text-slate-300 font-semibold">Dirección</Label>
                    <Input
                      id="direccion"
                      value={direccion}
                      onChange={(e) => setDireccion(e.target.value)}
                      placeholder="Ingrese la dirección"
                      className="bg-white dark:bg-slate-950 border-slate-200"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="nombreContacto" className="text-slate-700 dark:text-slate-300 font-semibold">Nombre del Contacto</Label>
                    <Input
                      id="nombreContacto"
                      value={nombreContacto}
                      onChange={(e) => setNombreContacto(e.target.value)}
                      placeholder="Ingrese el nombre del contacto"
                      className="bg-white dark:bg-slate-950 border-slate-200"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="apellidoContacto" className="text-slate-700 dark:text-slate-300 font-semibold">Apellido del Contacto</Label>
                    <Input
                      id="apellidoContacto"
                      value={apellidoContacto}
                      onChange={(e) => setApellidoContacto(e.target.value)}
                      placeholder="Ingrese el apellido del contacto"
                      className="bg-white dark:bg-slate-950 border-slate-200"
                    />
                  </div>
                </div>
              </div>

              {/* Sección 3: Información Fiscal y Estado */}
              <div className="p-6 border border-slate-100 dark:border-slate-800 rounded-2xl bg-slate-50/40 dark:bg-slate-900/40 space-y-6 shadow-sm">
                <div className="flex items-center gap-3 border-b border-slate-200/80 dark:border-slate-800 pb-4">
                  <div className="w-1.5 h-6 bg-blue-600 rounded-full" />
                  <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider">
                    Información Fiscal y Estado
                  </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="tipoRegimenIva" className="text-slate-700 dark:text-slate-300 font-semibold">Tipo Régimen IVA</Label>
                    <Select value={idTipoRegimenIva} onValueChange={setIdTipoRegimenIva}>
                      <SelectTrigger id="tipoRegimenIva" className="bg-white dark:bg-slate-950 border-slate-200">
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
                    <Label htmlFor="responsabilidadFiscal" className="text-slate-700 dark:text-slate-300 font-semibold">Responsabilidad Fiscal</Label>
                    <Select value={idResponsabilidadFiscal} onValueChange={setIdResponsabilidadFiscal}>
                      <SelectTrigger id="responsabilidadFiscal" className="bg-white dark:bg-slate-950 border-slate-200">
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

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="estado" className="text-slate-700 dark:text-slate-300 font-semibold">Estado</Label>
                    <Select value={idEstado} onValueChange={setIdEstado}>
                      <SelectTrigger id="estado" className="bg-white dark:bg-slate-950 border-slate-200">
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
              </div>

              {/* Botones de acción */}
              <div className="flex gap-4">
                <Button
                  onClick={clienteEditando ? handleActualizarCliente : handleAgregarCliente}
                  className="flex-1 py-6 text-base font-bold bg-blue-600 hover:bg-blue-700 shadow-md hover:shadow-lg transition-all"
                  disabled={guardando}
                >
                  {guardando ? "Guardando..." : clienteEditando ? "Actualizar Cliente" : "Guardar Cliente"}
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    setMostrarFormulario(false);
                    limpiarFormulario();
                    setClienteEditando(null);
                    setMostrarModalEditar(false);
                  }}
                  className="py-6 text-base font-medium transition-all"
                  disabled={guardando}
                >
                  Cancelar
                </Button>
              </div>
            </div>
          )}
        </div>
      )}
      {/* Barra de búsqueda */}
      <SearchBar
        placeholder="Buscar por razón social, nombre comercial, identificación, contacto o ciudad..."
        value={busqueda}
        onChange={setBusqueda}
      />

      {/* Tabla de clientes */}
      <TableCard
        headers={["Tipo Identificación", "Número", "Razón Social", "Contacto", "Teléfono", "Ciudad", "Estado", "Acciones"]}
        emptyMessage={
          loading
            ? "Cargando clientes..."
            : clientes.length === 0
              ? busqueda.trim()
                ? "No se encontraron clientes"
                : "No hay clientes registrados"
              : undefined
        }
        colSpan={8}
      >
        {clientes.map((cliente) => (
          <TableRow key={cliente.id_cliente}>
            <TableCell className="border-r border-border">
              {cliente.tipo_identificacion_nombre || "N/A"}
            </TableCell>
            <TableCell className="border-r border-border font-medium">
              {cliente.identificacion || "N/A"}
            </TableCell>
            <TableCell className="border-r border-border">
              {cliente.razon_social || "N/A"}
            </TableCell>
            <TableCell className="border-r border-border">
              {cliente.nombre_contacto && cliente.apellido_contacto
                ? `${cliente.nombre_contacto} ${cliente.apellido_contacto}`
                : cliente.nombre_contacto || cliente.apellido_contacto || "N/A"}
            </TableCell>
            <TableCell className="border-r border-border">
              {cliente.telefono || "N/A"}
            </TableCell>
            <TableCell className="border-r border-border">
              {cliente.ciudad_nombre || "N/A"}
            </TableCell>
            <TableCell className="border-r border-border">
              {cliente.estado_nombre ? (
                <span
                  className="px-2 py-1 rounded text-xs font-medium"
                  style={{
                    backgroundColor: cliente.estado_color ? `${cliente.estado_color}20` : '#f3f4f6',
                    color: cliente.estado_color || '#374151'
                  }}
                >
                  {cliente.estado_nombre}
                </span>
              ) : "N/A"}
            </TableCell>
            <TableCell>
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleVerCliente(cliente.id_cliente)}
                  disabled={cargandoCliente}
                  title="Ver detalles"
                >
                  <Eye className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleEditarCliente(cliente.id_cliente)}
                  disabled={cargandoCliente}
                  title="Editar cliente"
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
            Mostrando {clientes.length} de {paginacion.totalRegistros} cliente{paginacion.totalRegistros !== 1 ? "s" : ""}
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


      {/* Modal para ver todos los datos del cliente */}
      <Dialog open={mostrarModalVer} onOpenChange={setMostrarModalVer}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Información del Cliente</DialogTitle>
            <DialogDescription>
              Detalles completos del cliente seleccionado
            </DialogDescription>
          </DialogHeader>

          {clienteSeleccionado && (
            <div className="space-y-6">
              {/* Datos Básicos */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Datos Básicos</CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-semibold">Tipo de Entidad</Label>
                    <p>{clienteSeleccionado.tipo_entidad_nombre || "N/A"}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-semibold">Tipo de Identificación</Label>
                    <p>{clienteSeleccionado.tipo_identificacion_nombre || "N/A"}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-semibold">Identificación</Label>
                    <p>{clienteSeleccionado.identificacion || "N/A"}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-semibold">Dígito Verificador (DV)</Label>
                    <p>{clienteSeleccionado.dv !== null && clienteSeleccionado.dv !== undefined ? clienteSeleccionado.dv : "N/A"}</p>
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
                    <p>{clienteSeleccionado.razon_social || "N/A"}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-semibold">Nombre Comercial</Label>
                    <p>{clienteSeleccionado.nombre_comercial || "N/A"}</p>
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
                    <p>{clienteSeleccionado.ciudad_nombre || "N/A"}</p>
                  </div>
                  <div className="col-span-2">
                    <Label className="text-sm font-semibold">Dirección</Label>
                    <p>{clienteSeleccionado.direccion || "N/A"}</p>
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
                    <p>{clienteSeleccionado.nombre_contacto || "N/A"}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-semibold">Apellido del Contacto</Label>
                    <p>{clienteSeleccionado.apellido_contacto || "N/A"}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-semibold">Teléfono</Label>
                    <p>{clienteSeleccionado.telefono || "N/A"}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-semibold">Correo Electrónico</Label>
                    <p>{clienteSeleccionado.correo_electronico || "N/A"}</p>
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
                    <p>{clienteSeleccionado.tipo_regimen_iva_nombre || "N/A"}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-semibold">Responsabilidad Fiscal</Label>
                    <p>
                      {clienteSeleccionado.responsabilidad_fiscal_nombre || "N/A"}
                      {clienteSeleccionado.responsabilidad_fiscal_codigo && ` (${clienteSeleccionado.responsabilidad_fiscal_codigo})`}
                    </p>
                  </div>
                  <div>
                    <Label className="text-sm font-semibold">Estado</Label>
                    <p>
                      {clienteSeleccionado.estado_nombre ? (
                        <span
                          className="px-2 py-1 rounded text-xs font-medium"
                          style={{
                            backgroundColor: clienteSeleccionado.estado_color ? `${clienteSeleccionado.estado_color}20` : '#f3f4f6',
                            color: clienteSeleccionado.estado_color || '#374151'
                          }}
                        >
                          {clienteSeleccionado.estado_nombre}
                        </span>
                      ) : "N/A"}
                    </p>
                  </div>
                  <div>
                    <Label className="text-sm font-semibold">Fecha de Diligenciamiento</Label>
                    <p>
                      {clienteSeleccionado.fecha_diligenciamiento
                        ? new Date(clienteSeleccionado.fecha_diligenciamiento).toLocaleString()
                        : "N/A"}
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

export default GestionarClientes;
