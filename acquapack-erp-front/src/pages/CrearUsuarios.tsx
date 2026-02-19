import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import PageContainer from "@/components/PageContainer";
import PageTitle from "@/components/PageTitle";
import FormCard from "@/components/FormCard";
import { useToast } from "@/hooks/use-toast";
import { Search } from "lucide-react";
import { API_BASE_URL } from "@/config/api";

interface Catalogos {
  tiposIdentificacion: Array<{ id_tipo_identificacion: number; nombre: string }>;
  tiposContrato: Array<{ id_tipo_contrato: number; nombre: string }>;
  estadosCiviles: Array<{ id_estado_civil: number; nombre: string }>;
  arls: Array<{ id_arl: number; nombre: string }>;
  epss: Array<{ id_eps: number; nombre: string }>;
  cajasCompensacion: Array<{ id_caja_compensacion: number; nombre: string }>;
  fondosPensiones: Array<{ id_fondo_pensiones: number; nombre: string }>;
  estados: Array<{ id_estado: number; nombre: string }>;
  roles: Array<{ id_rol: number; nombre: string }>;
}

const CrearUsuarios = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [catalogos, setCatalogos] = useState<Catalogos | null>(null);
  const [loadingCatalogos, setLoadingCatalogos] = useState(true);

  // Datos Personales
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [fechaNacimiento, setFechaNacimiento] = useState("");
  const [idEstadoCivil, setIdEstadoCivil] = useState("");

  // Identificación
  const [idTipoIdentificacion, setIdTipoIdentificacion] = useState("");
  const [documento, setDocumento] = useState("");

  // Contacto y Acceso
  const [celular, setCelular] = useState("");
  const [direccion, setDireccion] = useState("");
  const [correoElectronico, setCorreoElectronico] = useState("");
  const [password, setPassword] = useState("");

  // Datos del Contrato
  const [diaIngreso, setDiaIngreso] = useState("");
  const [idTipoContrato, setIdTipoContrato] = useState("");

  // Seguridad Social
  const [idEps, setIdEps] = useState("");
  const [epsFechaIngreso, setEpsFechaIngreso] = useState("");
  const [idArl, setIdArl] = useState("");
  const [arlFechaIngreso, setArlFechaIngreso] = useState("");
  const [idFondoPensiones, setIdFondoPensiones] = useState("");
  const [idCajaCompensacion, setIdCajaCompensacion] = useState("");

  // Contacto de Emergencia
  const [nombreContacto, setNombreContacto] = useState("");
  const [telefonoContacto, setTelefonoContacto] = useState("");

  // Lista de Chequeo
  const [induccionSst, setInduccionSst] = useState(true);
  const [induccionPuestoTrabajo, setInduccionPuestoTrabajo] = useState(true);
  const [afiliacionBeneficiarios, setAfiliacionBeneficiarios] = useState(true);
  const [firmaReglamentoInterno, setFirmaReglamentoInterno] = useState(true);
  const [firmaElementosProteccion, setFirmaElementosProteccion] = useState(true);
  const [firmaContrato, setFirmaContrato] = useState(true);

  // Rol
  const [rolesSeleccionados, setRolesSeleccionados] = useState<string[]>([]);

  // Estados para búsqueda en listas
  const [busquedaEstadoCivil, setBusquedaEstadoCivil] = useState("");
  const [busquedaTipoIdentificacion, setBusquedaTipoIdentificacion] = useState("");
  const [busquedaTipoContrato, setBusquedaTipoContrato] = useState("");
  const [busquedaEps, setBusquedaEps] = useState("");
  const [busquedaArl, setBusquedaArl] = useState("");
  const [busquedaFondoPensiones, setBusquedaFondoPensiones] = useState("");
  const [busquedaCajaCompensacion, setBusquedaCajaCompensacion] = useState("");

  // Cargar catálogos al montar el componente
  useEffect(() => {
    const cargarCatalogos = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/usuarios/catalogos`);
        const data = await response.json();
        if (data.success) {
          setCatalogos(data.catalogos);
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const datosUsuario = {
        // Datos Personales
        nombre,
        apellido,
        fecha_nacimiento: fechaNacimiento || null,
        id_estado_civil: idEstadoCivil ? parseInt(idEstadoCivil) : null,

        // Identificación
        id_tipo_identificacion: parseInt(idTipoIdentificacion),
        documento,

        // Contacto y Acceso
        celular: celular || null,
        direccion: direccion || null,
        correo_electronico: correoElectronico || null,
        password,

        // Datos del Contrato
        dia_ingreso: diaIngreso || null,
        id_tipo_contrato: idTipoContrato ? parseInt(idTipoContrato) : null,

        // Seguridad Social
        id_eps: idEps ? parseInt(idEps) : null,
        eps_fecha_ingreso: epsFechaIngreso || null,
        id_arl: idArl ? parseInt(idArl) : null,
        arl_fecha_ingreso: arlFechaIngreso || null,
        id_fondo_pensiones: idFondoPensiones ? parseInt(idFondoPensiones) : null,
        id_caja_compensacion: idCajaCompensacion ? parseInt(idCajaCompensacion) : null,

        // Contacto de Emergencia
        nombre_contacto: nombreContacto || null,
        telefono_contacto: telefonoContacto || null,

        // Lista de Chequeo
        induccion_sst: induccionSst,
        induccion_puesto_trabajo: induccionPuestoTrabajo,
        afiliacion_a_beneficiarios: afiliacionBeneficiarios,
        firma_reglamento_interno_trabajo: firmaReglamentoInterno,
        firma_elementos_proteccion: firmaElementosProteccion,
        firma_contrato: firmaContrato,

        // Estado (por defecto Activo = 1)
        id_estado: 1,

        // Roles
        roles: rolesSeleccionados.map((r) => parseInt(r)),
      };

      const response = await fetch(`${API_BASE_URL}/api/usuarios`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(datosUsuario),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Error al crear el usuario");
      }

      toast({
        title: "Usuario creado",
        description: `Usuario ${data.usuario.nombre} ${data.usuario.apellido} creado exitosamente`,
      });

      // Limpiar formulario
      limpiarFormulario();
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Error al crear el usuario",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const limpiarFormulario = () => {
    setNombre("");
    setApellido("");
    setFechaNacimiento("");
    setIdEstadoCivil("");
    setIdTipoIdentificacion("");
    setDocumento("");
    setCelular("");
    setDireccion("");
    setCorreoElectronico("");
    setPassword("");
    setDiaIngreso("");
    setIdTipoContrato("");
    setIdEps("");
    setEpsFechaIngreso("");
    setIdArl("");
    setArlFechaIngreso("");
    setIdFondoPensiones("");
    setIdCajaCompensacion("");
    setNombreContacto("");
    setTelefonoContacto("");
    setInduccionSst(true);
    setInduccionPuestoTrabajo(true);
    setAfiliacionBeneficiarios(true);
    setFirmaReglamentoInterno(true);
    setFirmaElementosProteccion(true);
    setFirmaContrato(true);
    setRolesSeleccionados([]);
    // Limpiar búsquedas
    setBusquedaEstadoCivil("");
    setBusquedaTipoIdentificacion("");
    setBusquedaTipoContrato("");
    setBusquedaEps("");
    setBusquedaArl("");
    setBusquedaFondoPensiones("");
    setBusquedaCajaCompensacion("");
  };

  const handleRolChange = (idRol: string, checked: boolean) => {
    if (checked) {
      setRolesSeleccionados([...rolesSeleccionados, idRol]);
    } else {
      setRolesSeleccionados(rolesSeleccionados.filter((r) => r !== idRol));
    }
  };

  if (loadingCatalogos) {
    return (
      <PageContainer>
        <PageTitle title="Crear Usuarios" />
        <div className="text-center py-8">Cargando catálogos...</div>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <PageTitle title="Crear Usuarios" />
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* 1. Datos Personales */}
        <FormCard title="1. Datos Personales">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="nombre">Nombre(s) *</Label>
              <Input
                id="nombre"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                placeholder="Ingrese el nombre"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="apellido">Apellidos *</Label>
              <Input
                id="apellido"
                value={apellido}
                onChange={(e) => setApellido(e.target.value)}
                placeholder="Ingrese los apellidos"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="fechaNacimiento">Fecha de Nacimiento</Label>
              <Input
                id="fechaNacimiento"
                type="date"
                value={fechaNacimiento}
                onChange={(e) => setFechaNacimiento(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="estadoCivil">Estado Civil</Label>
              <Select value={idEstadoCivil} onValueChange={setIdEstadoCivil}>
                <SelectTrigger id="estadoCivil">
                  <SelectValue placeholder="Seleccione estado civil" />
                </SelectTrigger>
                <SelectContent>
                  <div className="p-2 border-b">
                    <div className="relative">
                      <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Buscar estado civil..."
                        value={busquedaEstadoCivil}
                        onChange={(e) => setBusquedaEstadoCivil(e.target.value)}
                        className="pl-8 h-9"
                        onClick={(e) => e.stopPropagation()}
                        onKeyDown={(e) => e.stopPropagation()}
                      />
                    </div>
                  </div>
                  <div className="max-h-[200px] overflow-y-auto">
                    {catalogos?.estadosCiviles
                      .filter((estado) =>
                        estado.nombre.toLowerCase().includes(busquedaEstadoCivil.toLowerCase())
                      )
                      .map((estado) => (
                        <SelectItem key={estado.id_estado_civil} value={estado.id_estado_civil.toString()}>
                          {estado.nombre}
                        </SelectItem>
                      ))}
                  </div>
                </SelectContent>
              </Select>
            </div>
          </div>
        </FormCard>

        {/* 2. Identificación */}
        <FormCard title="2. Identificación">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="tipoIdentificacion">Tipo de Documento *</Label>
              <Select value={idTipoIdentificacion} onValueChange={setIdTipoIdentificacion} required>
                <SelectTrigger id="tipoIdentificacion">
                  <SelectValue placeholder="Seleccione tipo de documento" />
                </SelectTrigger>
                <SelectContent>
                  <div className="p-2 border-b">
                    <div className="relative">
                      <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Buscar tipo de documento..."
                        value={busquedaTipoIdentificacion}
                        onChange={(e) => setBusquedaTipoIdentificacion(e.target.value)}
                        className="pl-8 h-9"
                        onClick={(e) => e.stopPropagation()}
                        onKeyDown={(e) => e.stopPropagation()}
                      />
                    </div>
                  </div>
                  <div className="max-h-[200px] overflow-y-auto">
                    {catalogos?.tiposIdentificacion
                      .filter((tipo) =>
                        tipo.nombre.toLowerCase().includes(busquedaTipoIdentificacion.toLowerCase())
                      )
                      .map((tipo) => (
                        <SelectItem key={tipo.id_tipo_identificacion} value={tipo.id_tipo_identificacion.toString()}>
                          {tipo.nombre}
                        </SelectItem>
                      ))}
                  </div>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="documento">Número de Documento *</Label>
              <Input
                id="documento"
                value={documento}
                onChange={(e) => setDocumento(e.target.value)}
                placeholder="Ingrese el número de documento"
                required
              />
            </div>
          </div>
        </FormCard>

        {/* 3. Contacto y Acceso */}
        <FormCard title="3. Contacto y Acceso (Login)">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="celular">Celular</Label>
              <Input
                id="celular"
                value={celular}
                onChange={(e) => setCelular(e.target.value)}
                placeholder="Ingrese el celular"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="direccion">Dirección de Residencia</Label>
              <Input
                id="direccion"
                value={direccion}
                onChange={(e) => setDireccion(e.target.value)}
                placeholder="Ingrese la dirección"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="correo">Correo Electrónico (Usuario para entrar)</Label>
              <Input
                id="correo"
                type="email"
                value={correoElectronico}
                onChange={(e) => setCorreoElectronico(e.target.value)}
                placeholder="correo@ejemplo.com"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Contraseña *</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Ingrese la contraseña"
                required
              />
            </div>
          </div>
        </FormCard>

        {/* 4. Datos del Contrato */}
        <FormCard title="4. Datos del Contrato">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="diaIngreso">Fecha de Ingreso a la Empresa</Label>
              <Input
                id="diaIngreso"
                type="date"
                value={diaIngreso}
                onChange={(e) => setDiaIngreso(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="tipoContrato">Tipo de Contrato</Label>
              <Select value={idTipoContrato} onValueChange={setIdTipoContrato}>
                <SelectTrigger id="tipoContrato">
                  <SelectValue placeholder="Seleccione tipo de contrato" />
                </SelectTrigger>
                <SelectContent>
                  <div className="p-2 border-b">
                    <div className="relative">
                      <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Buscar tipo de contrato..."
                        value={busquedaTipoContrato}
                        onChange={(e) => setBusquedaTipoContrato(e.target.value)}
                        className="pl-8 h-9"
                        onClick={(e) => e.stopPropagation()}
                        onKeyDown={(e) => e.stopPropagation()}
                      />
                    </div>
                  </div>
                  <div className="max-h-[200px] overflow-y-auto">
                    {catalogos?.tiposContrato
                      .filter((tipo) =>
                        tipo.nombre.toLowerCase().includes(busquedaTipoContrato.toLowerCase())
                      )
                      .map((tipo) => (
                        <SelectItem key={tipo.id_tipo_contrato} value={tipo.id_tipo_contrato.toString()}>
                          {tipo.nombre}
                        </SelectItem>
                      ))}
                  </div>
                </SelectContent>
              </Select>
            </div>
          </div>
        </FormCard>

        {/* 5. Seguridad Social */}
        <FormCard title="5. Seguridad Social (Afiliaciones)">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="eps">EPS</Label>
              <Select value={idEps} onValueChange={setIdEps}>
                <SelectTrigger id="eps">
                  <SelectValue placeholder="Seleccione EPS" />
                </SelectTrigger>
                <SelectContent>
                  <div className="p-2 border-b">
                    <div className="relative">
                      <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Buscar EPS..."
                        value={busquedaEps}
                        onChange={(e) => setBusquedaEps(e.target.value)}
                        className="pl-8 h-9"
                        onClick={(e) => e.stopPropagation()}
                        onKeyDown={(e) => e.stopPropagation()}
                      />
                    </div>
                  </div>
                  <div className="max-h-[200px] overflow-y-auto">
                    {catalogos?.epss
                      .filter((eps) =>
                        eps.nombre.toLowerCase().includes(busquedaEps.toLowerCase())
                      )
                      .map((eps) => (
                        <SelectItem key={eps.id_eps} value={eps.id_eps.toString()}>
                          {eps.nombre}
                        </SelectItem>
                      ))}
                  </div>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="epsFecha">Fecha de Afiliación EPS</Label>
              <Input
                id="epsFecha"
                type="date"
                value={epsFechaIngreso}
                onChange={(e) => setEpsFechaIngreso(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="arl">ARL</Label>
              <Select value={idArl} onValueChange={setIdArl}>
                <SelectTrigger id="arl">
                  <SelectValue placeholder="Seleccione ARL" />
                </SelectTrigger>
                <SelectContent>
                  <div className="p-2 border-b">
                    <div className="relative">
                      <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Buscar ARL..."
                        value={busquedaArl}
                        onChange={(e) => setBusquedaArl(e.target.value)}
                        className="pl-8 h-9"
                        onClick={(e) => e.stopPropagation()}
                        onKeyDown={(e) => e.stopPropagation()}
                      />
                    </div>
                  </div>
                  <div className="max-h-[200px] overflow-y-auto">
                    {catalogos?.arls
                      .filter((arl) =>
                        arl.nombre.toLowerCase().includes(busquedaArl.toLowerCase())
                      )
                      .map((arl) => (
                        <SelectItem key={arl.id_arl} value={arl.id_arl.toString()}>
                          {arl.nombre}
                        </SelectItem>
                      ))}
                  </div>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="arlFecha">Fecha de Afiliación ARL</Label>
              <Input
                id="arlFecha"
                type="date"
                value={arlFechaIngreso}
                onChange={(e) => setArlFechaIngreso(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="fondoPensiones">Fondo de Pensiones</Label>
              <Select value={idFondoPensiones} onValueChange={setIdFondoPensiones}>
                <SelectTrigger id="fondoPensiones">
                  <SelectValue placeholder="Seleccione fondo de pensiones" />
                </SelectTrigger>
                <SelectContent>
                  <div className="p-2 border-b">
                    <div className="relative">
                      <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Buscar fondo de pensiones..."
                        value={busquedaFondoPensiones}
                        onChange={(e) => setBusquedaFondoPensiones(e.target.value)}
                        className="pl-8 h-9"
                        onClick={(e) => e.stopPropagation()}
                        onKeyDown={(e) => e.stopPropagation()}
                      />
                    </div>
                  </div>
                  <div className="max-h-[200px] overflow-y-auto">
                    {catalogos?.fondosPensiones
                      .filter((fondo) =>
                        fondo.nombre.toLowerCase().includes(busquedaFondoPensiones.toLowerCase())
                      )
                      .map((fondo) => (
                        <SelectItem key={fondo.id_fondo_pensiones} value={fondo.id_fondo_pensiones.toString()}>
                          {fondo.nombre}
                        </SelectItem>
                      ))}
                  </div>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="cajaCompensacion">Caja de Compensación</Label>
              <Select value={idCajaCompensacion} onValueChange={setIdCajaCompensacion}>
                <SelectTrigger id="cajaCompensacion">
                  <SelectValue placeholder="Seleccione caja de compensación" />
                </SelectTrigger>
                <SelectContent>
                  <div className="p-2 border-b">
                    <div className="relative">
                      <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Buscar caja de compensación..."
                        value={busquedaCajaCompensacion}
                        onChange={(e) => setBusquedaCajaCompensacion(e.target.value)}
                        className="pl-8 h-9"
                        onClick={(e) => e.stopPropagation()}
                        onKeyDown={(e) => e.stopPropagation()}
                      />
                    </div>
                  </div>
                  <div className="max-h-[200px] overflow-y-auto">
                    {catalogos?.cajasCompensacion
                      .filter((caja) =>
                        caja.nombre.toLowerCase().includes(busquedaCajaCompensacion.toLowerCase())
                      )
                      .map((caja) => (
                        <SelectItem key={caja.id_caja_compensacion} value={caja.id_caja_compensacion.toString()}>
                          {caja.nombre}
                        </SelectItem>
                      ))}
                  </div>
                </SelectContent>
              </Select>
            </div>
          </div>
        </FormCard>

        {/* 6. Contacto de Emergencia */}
        <FormCard title="6. Contacto de Emergencia">
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
              <Label htmlFor="telefonoContacto">Teléfono del Contacto</Label>
              <Input
                id="telefonoContacto"
                value={telefonoContacto}
                onChange={(e) => setTelefonoContacto(e.target.value)}
                placeholder="Ingrese el teléfono del contacto"
              />
            </div>
          </div>
        </FormCard>

        {/* 7. Lista de Chequeo */}
        <FormCard title="7. Lista de Chequeo (Inducciones y Firmas)">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="induccionSst"
                checked={induccionSst}
                onCheckedChange={(checked) => setInduccionSst(checked as boolean)}
              />
              <Label htmlFor="induccionSst" className="cursor-pointer">
                ¿Inducción SST realizada?
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="induccionPuestoTrabajo"
                checked={induccionPuestoTrabajo}
                onCheckedChange={(checked) => setInduccionPuestoTrabajo(checked as boolean)}
              />
              <Label htmlFor="induccionPuestoTrabajo" className="cursor-pointer">
                ¿Inducción Puesto de Trabajo realizada?
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="afiliacionBeneficiarios"
                checked={afiliacionBeneficiarios}
                onCheckedChange={(checked) => setAfiliacionBeneficiarios(checked as boolean)}
              />
              <Label htmlFor="afiliacionBeneficiarios" className="cursor-pointer">
                ¿Afiliación a beneficiarios?
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="firmaReglamento"
                checked={firmaReglamentoInterno}
                onCheckedChange={(checked) => setFirmaReglamentoInterno(checked as boolean)}
              />
              <Label htmlFor="firmaReglamento" className="cursor-pointer">
                ¿Firmó Reglamento Interno?
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="firmaElementos"
                checked={firmaElementosProteccion}
                onCheckedChange={(checked) => setFirmaElementosProteccion(checked as boolean)}
              />
              <Label htmlFor="firmaElementos" className="cursor-pointer">
                ¿Firmó Elementos de Protección (EPP)?
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="firmaContrato"
                checked={firmaContrato}
                onCheckedChange={(checked) => setFirmaContrato(checked as boolean)}
              />
              <Label htmlFor="firmaContrato" className="cursor-pointer">
                ¿Firmó Contrato físico?
              </Label>
            </div>
          </div>
        </FormCard>

        {/* Rol */}
        <FormCard title="Rol(es)">
          <div className="space-y-4">
            {catalogos?.roles.map((rol) => (
              <div key={rol.id_rol} className="flex items-center space-x-2">
                <Checkbox
                  id={`rol-${rol.id_rol}`}
                  checked={rolesSeleccionados.includes(rol.id_rol.toString())}
                  onCheckedChange={(checked) => handleRolChange(rol.id_rol.toString(), checked as boolean)}
                />
                <Label htmlFor={`rol-${rol.id_rol}`} className="cursor-pointer">
                  {rol.nombre}
                </Label>
              </div>
            ))}
          </div>
        </FormCard>

        {/* Botones de acción */}
        <div className="flex justify-end gap-4">
          <Button type="button" variant="outline" onClick={limpiarFormulario} disabled={loading}>
            Limpiar Formulario
          </Button>
          <Button type="submit" disabled={loading}>
            {loading ? "Creando Usuario..." : "Crear Usuario"}
          </Button>
        </div>
      </form>
    </PageContainer>
  );
};

export default CrearUsuarios;
