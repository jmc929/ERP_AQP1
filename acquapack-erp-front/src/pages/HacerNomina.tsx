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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import PageContainer from "@/components/PageContainer";
import PageTitle from "@/components/PageTitle";
import FormCard from "@/components/FormCard";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Trash2, Plus, Save, Search } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { API_BASE_URL } from "@/config/api";

// Interfaces
interface Trabajador {
  id_usuarios: number;
  documento: string;
  nombre: string;
  apellido: string;
  nombre_completo: string;
}

interface EstadoNomina {
  id_estado: number;
  nombre: string;
  color: string;
}

interface TipoHora {
  id_tipo_hora: number;
  nombre: string;
  horario: string | null;
  recargo: string | null;
  valor_hora: number;
}

interface TipoDeduccion {
  id_tipo_deduccion: number;
  nombre: string;
  descripcion: string | null;
}

interface FilaHora {
  id: number;
  id_tipo_hora: string;
  tipo_hora_nombre: string;
  recargo: string;
  valor_hora: string;
  cantidad_horas: string;
  total: number;
}

interface FilaDeduccion {
  id: number;
  id_tipo_deduccion: string;
  tipo_deduccion_nombre: string;
  valor_deduccion: string;
  observaciones: string;
}

const HacerNomina = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [guardando, setGuardando] = useState(false);
  
  // Usuario logueado
  const [usuarioLogueado, setUsuarioLogueado] = useState<{ id_usuarios: number } | null>(null);
  
  // Datos desde la BD
  const [trabajadores, setTrabajadores] = useState<Trabajador[]>([]);
  const [estadosNomina, setEstadosNomina] = useState<EstadoNomina[]>([]);
  const [tiposHora, setTiposHora] = useState<TipoHora[]>([]);
  const [tiposDeduccion, setTiposDeduccion] = useState<TipoDeduccion[]>([]);
  
  // Formulario
  const [idTrabajador, setIdTrabajador] = useState<string>("");
  const [periodoInicio, setPeriodoInicio] = useState("");
  const [periodoFin, setPeriodoFin] = useState("");
  const [fechaNomina, setFechaNomina] = useState(new Date().toISOString().split("T")[0]);
  const [idEstado, setIdEstado] = useState<string>("");
  const [valorAuxilioTransporte, setValorAuxilioTransporte] = useState("249095");
  const [observaciones, setObservaciones] = useState("");
  
  // Búsqueda de trabajadores
  const [busquedaTrabajador, setBusquedaTrabajador] = useState("");
  
  // Tablas
  const [filasHoras, setFilasHoras] = useState<FilaHora[]>([
    {
      id: 1,
      id_tipo_hora: "",
      tipo_hora_nombre: "",
      recargo: "",
      valor_hora: "",
      cantidad_horas: "",
      total: 0,
    },
  ]);
  
  const [filasDeducciones, setFilasDeducciones] = useState<FilaDeduccion[]>([
    {
      id: 1,
      id_tipo_deduccion: "",
      tipo_deduccion_nombre: "",
      valor_deduccion: "",
      observaciones: "",
    },
  ]);

  // Obtener usuario logueado
  useEffect(() => {
    const usuario = localStorage.getItem("usuario");
    if (usuario) {
      try {
        const usuarioObj = JSON.parse(usuario);
        setUsuarioLogueado(usuarioObj);
      } catch (error) {
        console.error("Error al parsear usuario:", error);
      }
    }
  }, []);

  // Función para calcular período automático según la fecha actual
  const calcularPeriodoAutomatico = () => {
    const hoy = new Date();
    const dia = hoy.getDate();
    const año = hoy.getFullYear();
    const mes = hoy.getMonth(); // 0-11
    
    let inicio: Date;
    let fin: Date;
    
    if (dia >= 1 && dia <= 15) {
      // Primera quincena: del 1 al 15
      inicio = new Date(año, mes, 1);
      fin = new Date(año, mes, 15);
    } else {
      // Segunda quincena: del 16 al último día del mes
      inicio = new Date(año, mes, 16);
      // Último día del mes
      fin = new Date(año, mes + 1, 0);
    }
    
    return {
      inicio: inicio.toISOString().split('T')[0],
      fin: fin.toISOString().split('T')[0]
    };
  };

  // Filtrar trabajadores por búsqueda
  const trabajadoresFiltrados = trabajadores.filter((trabajador) => {
    if (!busquedaTrabajador.trim()) return true;
    const busqueda = busquedaTrabajador.toLowerCase();
    return (
      trabajador.nombre_completo.toLowerCase().includes(busqueda) ||
      trabajador.documento.includes(busqueda) ||
      trabajador.nombre.toLowerCase().includes(busqueda) ||
      trabajador.apellido.toLowerCase().includes(busqueda)
    );
  });

  // Cargar datos iniciales
  useEffect(() => {
    cargarDatos();
    // Calcular período automático
    const periodo = calcularPeriodoAutomatico();
    setPeriodoInicio(periodo.inicio);
    setPeriodoFin(periodo.fin);
  }, []);

  const cargarDatos = async () => {
    try {
      setLoading(true);
      
      const [trabajadoresRes, estadosRes, tiposHoraRes, tiposDeduccionRes] = await Promise.all([
        fetch(`${API_BASE_URL}/api/nomina/trabajadores"),
        fetch(`${API_BASE_URL}/api/nomina/estados"),
        fetch(`${API_BASE_URL}/api/nomina/tipos-hora"),
        fetch(`${API_BASE_URL}/api/nomina/tipos-deduccion"),
      ]);

      const trabajadoresData = await trabajadoresRes.json();
      const estadosData = await estadosRes.json();
      const tiposHoraData = await tiposHoraRes.json();
      const tiposDeduccionData = await tiposDeduccionRes.json();

      if (trabajadoresData.success) {
        setTrabajadores(trabajadoresData.trabajadores);
      }
      if (estadosData.success) {
        setEstadosNomina(estadosData.estados);
      }
      if (tiposHoraData.success) {
        setTiposHora(tiposHoraData.tiposHora);
      }
      if (tiposDeduccionData.success) {
        setTiposDeduccion(tiposDeduccionData.tiposDeduccion);
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "No se pudieron cargar los datos",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  // Manejar cambio de tipo de hora
  const handleTipoHoraChange = (filaId: number, tipoHoraId: string) => {
    const tipoHora = tiposHora.find((th) => th.id_tipo_hora.toString() === tipoHoraId);
    
    setFilasHoras((prev) =>
      prev.map((fila) =>
        fila.id === filaId
          ? {
              ...fila,
              id_tipo_hora: tipoHoraId,
              tipo_hora_nombre: tipoHora?.nombre || "",
              recargo: tipoHora?.recargo || "",
              valor_hora: tipoHora?.valor_hora.toString() || "",
              total: 0,
            }
          : fila
      )
    );
  };

  // Manejar cambio de cantidad de horas
  const handleCantidadHorasChange = (filaId: number, cantidad: string) => {
    setFilasHoras((prev) =>
      prev.map((fila) => {
        if (fila.id === filaId) {
          const cantidadHoras = parseFloat(cantidad) || 0;
          const valorHora = parseFloat(fila.valor_hora) || 0;
          const total = cantidadHoras * valorHora;
          return { ...fila, cantidad_horas: cantidad, total };
        }
        return fila;
      })
    );
  };

  // Manejar cambio de tipo de deducción
  const handleTipoDeduccionChange = (filaId: number, tipoDeduccionId: string) => {
    const tipoDeduccion = tiposDeduccion.find(
      (td) => td.id_tipo_deduccion.toString() === tipoDeduccionId
    );
    
    setFilasDeducciones((prev) =>
      prev.map((fila) =>
        fila.id === filaId
          ? {
              ...fila,
              id_tipo_deduccion: tipoDeduccionId,
              tipo_deduccion_nombre: tipoDeduccion?.nombre || "",
            }
          : fila
      )
    );
  };

  // Agregar fila de hora
  const agregarFilaHora = () => {
    const nuevoId = Math.max(...filasHoras.map((f) => f.id), 0) + 1;
    setFilasHoras([
      ...filasHoras,
      {
        id: nuevoId,
        id_tipo_hora: "",
        tipo_hora_nombre: "",
        recargo: "",
        valor_hora: "",
        cantidad_horas: "",
        total: 0,
      },
    ]);
  };

  // Eliminar fila de hora
  const eliminarFilaHora = (id: number) => {
    if (filasHoras.length > 1) {
      setFilasHoras(filasHoras.filter((f) => f.id !== id));
    }
  };

  // Agregar fila de deducción
  const agregarFilaDeduccion = () => {
    const nuevoId = Math.max(...filasDeducciones.map((f) => f.id), 0) + 1;
    setFilasDeducciones([
      ...filasDeducciones,
      {
        id: nuevoId,
        id_tipo_deduccion: "",
        tipo_deduccion_nombre: "",
        valor_deduccion: "",
        observaciones: "",
      },
    ]);
  };

  // Eliminar fila de deducción
  const eliminarFilaDeduccion = (id: number) => {
    if (filasDeducciones.length > 1) {
      setFilasDeducciones(filasDeducciones.filter((f) => f.id !== id));
    }
  };

  // Calcular totales
  const calcularTotalBrutoNomina = () => {
    return filasHoras.reduce((sum, fila) => sum + fila.total, 0);
  };

  const calcularTotalDeducciones = () => {
    return filasDeducciones.reduce(
      (sum, fila) => sum + (parseFloat(fila.valor_deduccion) || 0),
      0
    );
  };

  const calcularTotalPagar = () => {
    const totalBruto = calcularTotalBrutoNomina();
    const totalDeducciones = calcularTotalDeducciones();
    const auxilioTransporte = parseFloat(valorAuxilioTransporte) || 0;
    return totalBruto - totalDeducciones + auxilioTransporte;
  };

  // Actualizar deducciones automáticas (Fondo de Salud y Fondo de Pensión) cuando cambie el total bruto
  useEffect(() => {
    const totalBruto = calcularTotalBrutoNomina();
    
    if (tiposDeduccion.length > 0) {
      const salud = totalBruto * 0.04; // 4%
      const pension = totalBruto * 0.04; // 4%
      
      // Buscar tipos de deducción por nombre exacto
      const tipoSalud = tiposDeduccion.find(t => 
        t.nombre.toLowerCase() === 'fondo de salud' ||
        t.nombre.toLowerCase().includes('fondo de salud')
      );
      const tipoPension = tiposDeduccion.find(t => 
        t.nombre.toLowerCase() === 'fondo de pensión' ||
        t.nombre.toLowerCase() === 'fondo de pension' ||
        t.nombre.toLowerCase().includes('fondo de pensión') ||
        t.nombre.toLowerCase().includes('fondo de pension')
      );
      
      if (tipoSalud || tipoPension) {
        setFilasDeducciones(prev => {
          // Filtrar las deducciones automáticas existentes para actualizarlas
          const otrasDeducciones = prev.filter(f => {
            if (!f.tipo_deduccion_nombre) return true;
            const nombre = f.tipo_deduccion_nombre.toLowerCase();
            return !nombre.includes('salud') && 
                   !nombre.includes('pensión') && 
                   !nombre.includes('pension');
          });
          
          const nuevasDeducciones: FilaDeduccion[] = [];
          
          // Fondo de Salud
          if (tipoSalud) {
            const saludExistente = prev.find(f => 
              f.id_tipo_deduccion === tipoSalud.id_tipo_deduccion.toString()
            );
            nuevasDeducciones.push({
              id: saludExistente?.id || Date.now(),
              id_tipo_deduccion: tipoSalud.id_tipo_deduccion.toString(),
              tipo_deduccion_nombre: tipoSalud.nombre,
              valor_deduccion: salud.toFixed(2),
              observaciones: saludExistente?.observaciones || ''
            });
          }
          
          // Fondo de Pensión
          if (tipoPension) {
            const pensionExistente = prev.find(f => 
              f.id_tipo_deduccion === tipoPension.id_tipo_deduccion.toString()
            );
            nuevasDeducciones.push({
              id: pensionExistente?.id || Date.now() + 1,
              id_tipo_deduccion: tipoPension.id_tipo_deduccion.toString(),
              tipo_deduccion_nombre: tipoPension.nombre,
              valor_deduccion: pension.toFixed(2),
              observaciones: pensionExistente?.observaciones || ''
            });
          }
          
          // Si no hay otras deducciones y no hay automáticas, mantener al menos una fila vacía
          if (otrasDeducciones.length === 0 && nuevasDeducciones.length === 0) {
            return prev.length > 0 ? prev : [{
              id: 1,
              id_tipo_deduccion: "",
              tipo_deduccion_nombre: "",
              valor_deduccion: "",
              observaciones: "",
            }];
          }
          
          return [...nuevasDeducciones, ...otrasDeducciones];
        });
      }
    }
  }, [filasHoras, tiposDeduccion]); // Se actualiza cuando cambian las horas o los tipos de deducción

  // Guardar nómina
  const handleGuardar = async () => {
    // Validaciones
    if (!idTrabajador) {
      toast({
        title: "Error",
        description: "Debe seleccionar un trabajador",
        variant: "destructive",
      });
      return;
    }

    if (!periodoInicio || !periodoFin) {
      toast({
        title: "Error",
        description: "Debe ingresar el período (inicio y fin)",
        variant: "destructive",
      });
      return;
    }

    if (!fechaNomina) {
      toast({
        title: "Error",
        description: "Debe ingresar la fecha de nómina",
        variant: "destructive",
      });
      return;
    }

    if (!idEstado) {
      toast({
        title: "Error",
        description: "Debe seleccionar un estado",
        variant: "destructive",
      });
      return;
    }

    // Validar que haya al menos una fila de horas con datos
    const filasHorasValidas = filasHoras.filter(
      (f) => f.id_tipo_hora && f.cantidad_horas && parseFloat(f.cantidad_horas) > 0
    );

    if (filasHorasValidas.length === 0) {
      toast({
        title: "Error",
        description: "Debe agregar al menos una hora con tipo y cantidad",
        variant: "destructive",
      });
      return;
    }

    try {
      setGuardando(true);

      const detallesHoras = filasHorasValidas.map((fila) => ({
        id_tipo_hora: parseInt(fila.id_tipo_hora),
        valor_hora: parseFloat(fila.valor_hora),
        cantidad_horas: parseFloat(fila.cantidad_horas),
      }));

      const detallesDeducciones = filasDeducciones
        .filter((f) => f.id_tipo_deduccion && f.valor_deduccion && parseFloat(f.valor_deduccion) > 0)
        .map((fila) => ({
          id_tipo_deduccion: parseInt(fila.id_tipo_deduccion),
          valor_deduccion: parseFloat(fila.valor_deduccion),
          observaciones: fila.observaciones || null,
        }));

      const headers: HeadersInit = { "Content-Type": "application/json" };
      if (usuarioLogueado?.id_usuarios) {
        headers["x-user-id"] = usuarioLogueado.id_usuarios.toString();
      }

      const response = await fetch(`${API_BASE_URL}/api/nomina/crear", {
        method: "POST",
        headers,
        body: JSON.stringify({
          id_usuario_trabajador: parseInt(idTrabajador),
          periodo_inicio: periodoInicio,
          periodo_fin: periodoFin,
          fecha_nomina: fechaNomina,
          id_estado: parseInt(idEstado),
          id_usuario_creador: usuarioLogueado?.id_usuarios || null,
          detalles_horas: detallesHoras,
          detalles_deducciones: detallesDeducciones,
          valor_auxilio_transporte: parseFloat(valorAuxilioTransporte) || 249095,
          observaciones: observaciones || null,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Error al crear la nómina");
      }

      toast({
        title: "Éxito",
        description: "Nómina creada exitosamente",
      });

      // Limpiar formulario
      setIdTrabajador("");
      setPeriodoInicio("");
      setPeriodoFin("");
      setFechaNomina(new Date().toISOString().split("T")[0]);
      setIdEstado("");
      setValorAuxilioTransporte("249095");
      setObservaciones("");
      setFilasHoras([
        {
          id: 1,
          id_tipo_hora: "",
          tipo_hora_nombre: "",
          recargo: "",
          valor_hora: "",
          cantidad_horas: "",
          total: 0,
        },
      ]);
      setFilasDeducciones([
        {
          id: 1,
          id_tipo_deduccion: "",
          tipo_deduccion_nombre: "",
          valor_deduccion: "",
          observaciones: "",
        },
      ]);
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Error al crear la nómina",
        variant: "destructive",
      });
    } finally {
      setGuardando(false);
    }
  };

  if (loading) {
    return (
      <PageContainer>
        <PageTitle title="Hacer Nómina" />
        <p className="text-muted-foreground">Cargando...</p>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <PageTitle title="Hacer Nómina" />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Columna izquierda: Datos del trabajador y período */}
        <div className="space-y-4">
          <FormCard title="Datos del Trabajador y Período">
            <div className="space-y-4">
              <div>
                <Label htmlFor="trabajador">Trabajador *</Label>
                <Select value={idTrabajador} onValueChange={setIdTrabajador}>
                  <SelectTrigger id="trabajador">
                    <SelectValue placeholder="Seleccione un trabajador" />
                  </SelectTrigger>
                  <SelectContent>
                    <div className="p-2 border-b">
                      <div className="relative">
                        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                          placeholder="Buscar trabajador..."
                          value={busquedaTrabajador}
                          onChange={(e) => setBusquedaTrabajador(e.target.value)}
                          className="pl-8"
                          onClick={(e) => e.stopPropagation()}
                          onKeyDown={(e) => e.stopPropagation()}
                        />
                      </div>
                    </div>
                    {trabajadoresFiltrados.length > 0 ? (
                      trabajadoresFiltrados.map((trabajador) => (
                        <SelectItem
                          key={trabajador.id_usuarios}
                          value={trabajador.id_usuarios.toString()}
                        >
                          {trabajador.nombre_completo} - {trabajador.documento}
                        </SelectItem>
                      ))
                    ) : (
                      <div className="px-2 py-6 text-center text-sm text-muted-foreground">
                        No se encontraron trabajadores
                      </div>
                    )}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="periodo-inicio">Período Inicio *</Label>
                  <Input
                    id="periodo-inicio"
                    type="date"
                    value={periodoInicio}
                    onChange={(e) => setPeriodoInicio(e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="periodo-fin">Período Fin *</Label>
                  <Input
                    id="periodo-fin"
                    type="date"
                    value={periodoFin}
                    onChange={(e) => setPeriodoFin(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="fecha-nomina">Fecha Nómina *</Label>
                <Input
                  id="fecha-nomina"
                  type="date"
                  value={fechaNomina}
                  onChange={(e) => setFechaNomina(e.target.value)}
                />
              </div>

              <div>
                <Label htmlFor="estado">Estado *</Label>
                <Select value={idEstado} onValueChange={setIdEstado}>
                  <SelectTrigger id="estado">
                    <SelectValue placeholder="Seleccione un estado" />
                  </SelectTrigger>
                  <SelectContent>
                    {estadosNomina.map((estado) => (
                      <SelectItem
                        key={estado.id_estado}
                        value={estado.id_estado.toString()}
                      >
                        {estado.nombre}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="auxilio-transporte">Auxilio de Transporte</Label>
                <Input
                  id="auxilio-transporte"
                  type="number"
                  value={valorAuxilioTransporte}
                  onChange={(e) => setValorAuxilioTransporte(e.target.value)}
                  placeholder="249095"
                />
              </div>

              <div>
                <Label htmlFor="observaciones">Observaciones</Label>
                <Textarea
                  id="observaciones"
                  value={observaciones}
                  onChange={(e) => setObservaciones(e.target.value)}
                  placeholder="Observaciones adicionales..."
                  rows={3}
                />
              </div>
            </div>
          </FormCard>
        </div>

        {/* Columna derecha: Totales */}
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Totales</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex justify-between">
                <span className="font-medium">Total Bruto Nómina:</span>
                <span className="font-bold">
                  ${calcularTotalBrutoNomina().toLocaleString("es-CO", {
                    minimumFractionDigits: 2,
                  })}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Total Deducciones:</span>
                <span className="font-bold text-red-600">
                  ${calcularTotalDeducciones().toLocaleString("es-CO", {
                    minimumFractionDigits: 2,
                  })}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Auxilio Transporte:</span>
                <span className="font-bold">
                  ${(parseFloat(valorAuxilioTransporte) || 0).toLocaleString("es-CO", {
                    minimumFractionDigits: 2,
                  })}
                </span>
              </div>
              <div className="flex justify-between border-t pt-2 mt-2">
                <span className="font-bold text-lg">Total a Pagar:</span>
                <span className="font-bold text-lg text-green-600">
                  ${calcularTotalPagar().toLocaleString("es-CO", {
                    minimumFractionDigits: 2,
                  })}
                </span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Tabla de Horas */}
      <Card className="mt-6">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Horas</CardTitle>
          <Button onClick={agregarFilaHora} variant="outline" size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Agregar Fila
          </Button>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Tipo Hora</TableHead>
                <TableHead>Recargo</TableHead>
                <TableHead>Valor Hora</TableHead>
                <TableHead>Cantidad Horas</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filasHoras.map((fila) => (
                <TableRow key={fila.id}>
                  <TableCell>
                    <Select
                      value={fila.id_tipo_hora}
                      onValueChange={(value) => handleTipoHoraChange(fila.id, value)}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Seleccione tipo" />
                      </SelectTrigger>
                      <SelectContent>
                        {tiposHora.map((tipo) => (
                          <SelectItem
                            key={tipo.id_tipo_hora}
                            value={tipo.id_tipo_hora.toString()}
                          >
                            {tipo.nombre}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell>{fila.recargo || "-"}</TableCell>
                  <TableCell>
                    {fila.valor_hora
                      ? `$${parseFloat(fila.valor_hora).toLocaleString("es-CO", {
                          minimumFractionDigits: 2,
                        })}`
                      : "-"}
                  </TableCell>
                  <TableCell>
                    <Input
                      type="number"
                      step="0.01"
                      value={fila.cantidad_horas}
                      onChange={(e) => handleCantidadHorasChange(fila.id, e.target.value)}
                      placeholder="0.00"
                      className="w-24"
                    />
                  </TableCell>
                  <TableCell>
                    ${fila.total.toLocaleString("es-CO", { minimumFractionDigits: 2 })}
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => eliminarFilaHora(fila.id)}
                      disabled={filasHoras.length === 1}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
              <TableRow className="font-bold bg-muted">
                <TableCell colSpan={4} className="text-right">
                  Total Bruto Nómina:
                </TableCell>
                <TableCell>
                  ${calcularTotalBrutoNomina().toLocaleString("es-CO", {
                    minimumFractionDigits: 2,
                  })}
                </TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Tabla de Deducciones */}
      <Card className="mt-6">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Deducciones</CardTitle>
          <Button onClick={agregarFilaDeduccion} variant="outline" size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Agregar Fila
          </Button>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Tipo Deducción</TableHead>
                <TableHead>Valor</TableHead>
                <TableHead>Observaciones</TableHead>
                <TableHead>Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filasDeducciones.map((fila) => (
                <TableRow key={fila.id}>
                  <TableCell>
                    <Select
                      value={fila.id_tipo_deduccion}
                      onValueChange={(value) => handleTipoDeduccionChange(fila.id, value)}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Seleccione tipo" />
                      </SelectTrigger>
                      <SelectContent>
                        {tiposDeduccion.map((tipo) => (
                          <SelectItem
                            key={tipo.id_tipo_deduccion}
                            value={tipo.id_tipo_deduccion.toString()}
                          >
                            {tipo.nombre}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell>
                    <Input
                      type="number"
                      step="0.01"
                      value={fila.valor_deduccion}
                      onChange={(e) =>
                        setFilasDeducciones((prev) =>
                          prev.map((f) =>
                            f.id === fila.id
                              ? { ...f, valor_deduccion: e.target.value }
                              : f
                          )
                        )
                      }
                      placeholder="0.00"
                      className="w-32"
                    />
                  </TableCell>
                  <TableCell>
                    <Input
                      value={fila.observaciones}
                      onChange={(e) =>
                        setFilasDeducciones((prev) =>
                          prev.map((f) =>
                            f.id === fila.id
                              ? { ...f, observaciones: e.target.value }
                              : f
                          )
                        )
                      }
                      placeholder="Observaciones..."
                      className="w-full"
                    />
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => eliminarFilaDeduccion(fila.id)}
                      disabled={filasDeducciones.length === 1}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
              <TableRow className="font-bold bg-muted">
                <TableCell colSpan={1} className="text-right">
                  Total Deducciones:
                </TableCell>
                <TableCell>
                  ${calcularTotalDeducciones().toLocaleString("es-CO", {
                    minimumFractionDigits: 2,
                  })}
                </TableCell>
                <TableCell colSpan={2}></TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Botón Guardar */}
      <div className="mt-6 flex justify-end">
        <Button onClick={handleGuardar} disabled={guardando} size="lg">
          <Save className="h-4 w-4 mr-2" />
          {guardando ? "Guardando..." : "Guardar Nómina"}
        </Button>
      </div>
    </PageContainer>
  );
};

export default HacerNomina;
