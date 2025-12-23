import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
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

const EditarUsuarios = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [cargandoUsuario, setCargandoUsuario] = useState(true);
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
  const [induccionSst, setInduccionSst] = useState(false);
  const [induccionPuestoTrabajo, setInduccionPuestoTrabajo] = useState(false);
  const [afiliacionBeneficiarios, setAfiliacionBeneficiarios] = useState(false);
  const [firmaReglamentoInterno, setFirmaReglamentoInterno] = useState(false);
  const [firmaElementosProteccion, setFirmaElementosProteccion] = useState(false);
  const [firmaContrato, setFirmaContrato] = useState(false);

  // Rol
  const [rolesSeleccionados, setRolesSeleccionados] = useState<string[]>([]);
  const [idEstado, setIdEstado] = useState("");

  // Cargar catálogos y usuario
  useEffect(() => {
    const cargarDatos = async () => {
      try {
        const [catalogosRes, usuarioRes] = await Promise.all([
          fetch("http://localhost:4000/api/usuarios/catalogos"),
          fetch(`http://localhost:4000/api/usuarios/${id}`)
        ]);

        const catalogosData = await catalogosRes.json();
        const usuarioData = await usuarioRes.json();

        if (catalogosData.success) {
          setCatalogos(catalogosData.catalogos);
        }

        if (usuarioData.success && usuarioData.usuario) {
          const usuario = usuarioData.usuario;
          
          // Datos Personales
          setNombre(usuario.nombre || "");
          setApellido(usuario.apellido || "");
          setFechaNacimiento(usuario.fecha_nacimiento ? usuario.fecha_nacimiento.split('T')[0] : "");
          setIdEstadoCivil(usuario.id_estado_civil?.toString() || "");

          // Identificación
          setIdTipoIdentificacion(usuario.id_tipo_identificacion?.toString() || "");
          setDocumento(usuario.documento || "");

          // Contacto y Acceso
          setCelular(usuario.celular || "");
          setDireccion(usuario.direccion || "");
          setCorreoElectronico(usuario.correo_electronico || "");
          // No prellenar password por seguridad

          // Datos del Contrato
          setDiaIngreso(usuario.dia_ingreso ? usuario.dia_ingreso.split('T')[0] : "");
          setIdTipoContrato(usuario.id_tipo_contrato?.toString() || "");

          // Seguridad Social
          setIdEps(usuario.id_eps?.toString() || "");
          setEpsFechaIngreso(usuario.eps_fecha_ingreso ? usuario.eps_fecha_ingreso.split('T')[0] : "");
          setIdArl(usuario.id_arl?.toString() || "");
          setArlFechaIngreso(usuario.arl_fecha_ingreso ? usuario.arl_fecha_ingreso.split('T')[0] : "");
          setIdFondoPensiones(usuario.id_fondo_pensiones?.toString() || "");
          setIdCajaCompensacion(usuario.id_caja_compensacion?.toString() || "");

          // Contacto de Emergencia
          setNombreContacto(usuario.nombre_contacto || "");
          setTelefonoContacto(usuario.telefono_contacto || "");

          // Lista de Chequeo
          setInduccionSst(usuario.induccion_sst || false);
          setInduccionPuestoTrabajo(usuario.induccion_puesto_trabajo || false);
          setAfiliacionBeneficiarios(usuario.afiliacion_a_beneficiarios || false);
          setFirmaReglamentoInterno(usuario.firma_reglamento_interno_trabajo || false);
          setFirmaElementosProteccion(usuario.firma_elementos_proteccion || false);
          setFirmaContrato(usuario.firma_contrato || false);

          // Roles
          if (usuario.roles && Array.isArray(usuario.roles)) {
            setRolesSeleccionados(usuario.roles.map((r: any) => r.id_rol?.toString() || ""));
          }

          // Estado
          setIdEstado(usuario.id_estado?.toString() || "");
        } else {
          toast({
            title: "Error",
            description: "No se pudo cargar la información del usuario",
            variant: "destructive",
          });
          navigate("/dashboard/usuarios/ver-usuarios");
        }
      } catch (error) {
        toast({
          title: "Error",
          description: "No se pudieron cargar los datos necesarios",
          variant: "destructive",
        });
        navigate("/dashboard/usuarios/ver-usuarios");
      } finally {
        setLoadingCatalogos(false);
        setCargandoUsuario(false);
      }
    };

    if (id) {
      cargarDatos();
    }
  }, [id, navigate, toast]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const datosUsuario: any = {
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

        // Estado
        id_estado: idEstado ? parseInt(idEstado) : 1,

        // Roles
        roles: rolesSeleccionados.map((r) => parseInt(r)),
      };

      // Solo incluir password si se proporcionó uno nuevo
      if (password && password.trim() !== "") {
        datosUsuario.password = password;
      }

      const response = await fetch(`http://localhost:4000/api/usuarios/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(datosUsuario),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Error al actualizar el usuario");
      }

      toast({
        title: "Usuario actualizado",
        description: `Usuario ${data.usuario.nombre} ${data.usuario.apellido} actualizado exitosamente`,
      });

      // Redirigir a ver usuarios
      navigate("/dashboard/usuarios/ver-usuarios");
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Error al actualizar el usuario",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleRolChange = (idRol: string, checked: boolean) => {
    if (checked) {
      setRolesSeleccionados([...rolesSeleccionados, idRol]);
    } else {
      setRolesSeleccionados(rolesSeleccionados.filter((r) => r !== idRol));
    }
  };

  if (loadingCatalogos || cargandoUsuario) {
    return (
      <PageContainer>
        <PageTitle title="Editar Usuario" />
        <div className="text-center py-8">Cargando datos del usuario...</div>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <PageTitle title="Editar Usuario" />
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
                  {catalogos?.estadosCiviles.map((estado) => (
                    <SelectItem key={estado.id_estado_civil} value={estado.id_estado_civil.toString()}>
                      {estado.nombre}
                    </SelectItem>
                  ))}
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
                  {catalogos?.tiposIdentificacion.map((tipo) => (
                    <SelectItem key={tipo.id_tipo_identificacion} value={tipo.id_tipo_identificacion.toString()}>
                      {tipo.nombre}
                    </SelectItem>
                  ))}
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
              <Label htmlFor="password">Nueva Contraseña (dejar vacío para no cambiar)</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Ingrese nueva contraseña (opcional)"
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
                  {catalogos?.tiposContrato.map((tipo) => (
                    <SelectItem key={tipo.id_tipo_contrato} value={tipo.id_tipo_contrato.toString()}>
                      {tipo.nombre}
                    </SelectItem>
                  ))}
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
                  {catalogos?.epss.map((eps) => (
                    <SelectItem key={eps.id_eps} value={eps.id_eps.toString()}>
                      {eps.nombre}
                    </SelectItem>
                  ))}
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
                  {catalogos?.arls.map((arl) => (
                    <SelectItem key={arl.id_arl} value={arl.id_arl.toString()}>
                      {arl.nombre}
                    </SelectItem>
                  ))}
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
                  {catalogos?.fondosPensiones.map((fondo) => (
                    <SelectItem key={fondo.id_fondo_pensiones} value={fondo.id_fondo_pensiones.toString()}>
                      {fondo.nombre}
                    </SelectItem>
                  ))}
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
                  {catalogos?.cajasCompensacion.map((caja) => (
                    <SelectItem key={caja.id_caja_compensacion} value={caja.id_caja_compensacion.toString()}>
                      {caja.nombre}
                    </SelectItem>
                  ))}
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

        {/* Estado */}
        <FormCard title="Estado">
          <div className="space-y-2">
            <Label htmlFor="estado">Estado del Usuario</Label>
            <Select value={idEstado} onValueChange={setIdEstado}>
              <SelectTrigger id="estado">
                <SelectValue placeholder="Seleccione un estado" />
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
        </FormCard>

        {/* Botones de acción */}
        <div className="flex justify-end gap-4">
          <Button 
            type="button" 
            variant="outline" 
            onClick={() => navigate("/dashboard/usuarios/ver-usuarios")}
            disabled={loading}
          >
            Cancelar
          </Button>
          <Button type="submit" disabled={loading}>
            {loading ? "Actualizando Usuario..." : "Actualizar Usuario"}
          </Button>
        </div>
      </form>
    </PageContainer>
  );
};

export default EditarUsuarios;

