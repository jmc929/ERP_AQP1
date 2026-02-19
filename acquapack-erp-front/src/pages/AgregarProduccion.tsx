import { useState, useEffect } from "react";
import PageContainer from "@/components/PageContainer";
import PageTitle from "@/components/PageTitle";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import NumericKeyboard from "@/components/NumericKeyboard";
import ConfirmDialog from "@/components/ConfirmDialog";
import { ChevronLeft, Factory } from "lucide-react";
import { API_BASE_URL } from "@/config/api";

interface TipoMaquina {
  id_tipo_maquina: number;
  nombre: string;
  descripcion: string;
}

interface Maquina {
  id_maquina: number;
  id_tipo_maquina: number;
  nombre: string;
  tipo_maquina_nombre: string;
}

interface Producto {
  id_producto: number;
  codigo: string;
  nombre: string;
  medida_nombre: string;
}

interface Usuario {
  id_usuarios: number;
  nombre: string;
  apellido: string;
  documento: string;
}

interface Turno {
  id_turno: number;
  nombre: string;
  horario: string;
}

interface Medida {
  id_medida: number;
  nombre: string;
}

interface MedidaProduccion {
  id_medida: number;
  cantidad: string;
}

type Step = 1 | 2 | 3 | 4 | 5;

const AgregarProduccion = () => {
  const { toast } = useToast();
  const [step, setStep] = useState<Step>(1);
  const [loading, setLoading] = useState(false);
  const [showKeyboard, setShowKeyboard] = useState(false);
  const [activeInput, setActiveInput] = useState<string | null>(null);

  // Catálogos
  const [tiposMaquina, setTiposMaquina] = useState<TipoMaquina[]>([]);
  const [maquinas, setMaquinas] = useState<Maquina[]>([]);
  const [productos, setProductos] = useState<Producto[]>([]);
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [turnos, setTurnos] = useState<Turno[]>([]);
  const [medidas, setMedidas] = useState<Medida[]>([]);

  // Formulario
  const [idTipoMaquina, setIdTipoMaquina] = useState<number | null>(null);
  const [nombreTipoMaquina, setNombreTipoMaquina] = useState<string>("");
  const [idMaquina, setIdMaquina] = useState<number | null>(null);
  const [idProducto, setIdProducto] = useState<number | null>(null);
  const [idUsuario, setIdUsuario] = useState<number | null>(null);
  const [idTurno, setIdTurno] = useState<number | null>(null);
  const [turnoActual, setTurnoActual] = useState<Turno | null>(null);
  const [medidasProduccion, setMedidasProduccion] = useState<MedidaProduccion[]>([]);

  // Estado para confirmación
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [itemPendiente, setItemPendiente] = useState<{
    tipo: "maquina" | "producto" | "usuario";
    id: number;
    nombre: string;
  } | null>(null);

  // Mapeo de tipos de máquina a grupos de productos
  const getGrupoProductoPorTipoMaquina = (nombreTipo: string): number | null => {
    const nombreLower = nombreTipo.toLowerCase();
    if (nombreLower.includes("peletizadora")) return 20;
    if (nombreLower.includes("aglutinadora")) return 21;
    if (nombreLower.includes("extrusora")) return 15;
    return null;
  };

  // Manejar selección de máquina
  const handleSeleccionarMaquina = (maquina: Maquina) => {
    setItemPendiente({
      tipo: "maquina",
      id: maquina.id_maquina,
      nombre: maquina.nombre,
    });
    setShowConfirmDialog(true);
  };

  // Manejar selección de producto
  const handleSeleccionarProducto = (producto: Producto) => {
    setItemPendiente({
      tipo: "producto",
      id: producto.id_producto,
      nombre: producto.nombre,
    });
    setShowConfirmDialog(true);
  };

  // Manejar selección de usuario
  const handleSeleccionarUsuario = (usuario: Usuario) => {
    setItemPendiente({
      tipo: "usuario",
      id: usuario.id_usuarios,
      nombre: `${usuario.nombre} ${usuario.apellido}`,
    });
    setShowConfirmDialog(true);
  };

  // Confirmar selección y avanzar al siguiente paso
  const handleConfirmarSeleccion = () => {
    if (!itemPendiente) return;

    switch (itemPendiente.tipo) {
      case "maquina":
        setIdMaquina(itemPendiente.id);
        // Avanzar al siguiente paso (usuario)
        if (step === 2) {
          setStep(3);
        }
        break;
      case "usuario":
        setIdUsuario(itemPendiente.id);
        // Avanzar al siguiente paso (producto)
        if (step === 3) {
          setStep(4);
        }
        break;
      case "producto":
        setIdProducto(itemPendiente.id);
        // Avanzar al siguiente paso (medidas)
        if (step === 4) {
          setStep(5);
        }
        break;
    }

    setItemPendiente(null);
    setShowConfirmDialog(false);
  };

  // Cargar catálogos
  useEffect(() => {
    cargarCatalogos();
  }, []);

  // Cargar máquinas cuando se selecciona un tipo de máquina
  useEffect(() => {
    if (idTipoMaquina) {
      cargarMaquinas(idTipoMaquina);
    } else {
      setMaquinas([]);
      setIdMaquina(null);
    }
  }, [idTipoMaquina]);

  // Cargar productos cuando se selecciona un tipo de máquina
  useEffect(() => {
    if (nombreTipoMaquina) {
      cargarProductosPorTipoMaquina(nombreTipoMaquina);
    } else {
      setProductos([]);
      setIdProducto(null);
    }
  }, [nombreTipoMaquina]);

  // Inicializar medidas cuando se llega al paso 5
  useEffect(() => {
    if (step === 5 && nombreTipoMaquina) {
      const medidasRequeridas = obtenerMedidasPorTipoMaquina();
      const medidasActuales = medidasProduccion.map((m) => m.id_medida);
      
      // Agregar medidas faltantes
      const nuevasMedidas = medidasRequeridas
        .filter((idMedida) => !medidasActuales.includes(idMedida))
        .map((idMedida) => ({ id_medida: idMedida, cantidad: "" }));
      
      if (nuevasMedidas.length > 0) {
        setMedidasProduccion([...medidasProduccion, ...nuevasMedidas]);
      }
      
      // Eliminar medidas que no corresponden al tipo de máquina
      const medidasFiltradas = medidasProduccion.filter((m) =>
        medidasRequeridas.includes(m.id_medida)
      );
      
      if (medidasFiltradas.length !== medidasProduccion.length) {
        setMedidasProduccion(medidasFiltradas);
      }
    }
  }, [step, nombreTipoMaquina]);

  const cargarCatalogos = async () => {
    try {
      setLoading(true);
      const [tiposMaquinaRes, catalogosRes] = await Promise.all([
        fetch(`${API_BASE_URL}/api/configuracion-produccion/tipo-maquina"),
        fetch(`${API_BASE_URL}/api/produccion/catalogos"),
      ]);

      const tiposMaquinaData = await tiposMaquinaRes.json();
      const catalogosData = await catalogosRes.json();

      if (tiposMaquinaData.success) {
        setTiposMaquina(tiposMaquinaData.tiposMaquina || []);
      }

      if (catalogosData.success) {
        setUsuarios(catalogosData.catalogos.usuarios || []);
        setTurnos(catalogosData.catalogos.turnos || []);
        setMedidas(catalogosData.catalogos.medidas || []);
        
        // Establecer turno actual automáticamente
        if (catalogosData.catalogos.turnoActual) {
          setTurnoActual(catalogosData.catalogos.turnoActual);
          setIdTurno(catalogosData.catalogos.turnoActual.id_turno);
        }
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "No se pudieron cargar los catálogos",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const cargarMaquinas = async (idTipo: number) => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/api/produccion/maquinas?id_tipo_maquina=${idTipo}`
      );
      const data = await response.json();
      if (data.success) {
        setMaquinas(data.maquinas || []);
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "No se pudieron cargar las máquinas",
        variant: "destructive",
      });
    }
  };

  const handleTipoMaquinaSelect = (idTipo: number, nombreTipo: string) => {
    setIdTipoMaquina(idTipo);
    setNombreTipoMaquina(nombreTipo);
    setStep(2);
  };

  const cargarProductosPorTipoMaquina = async (nombreTipo: string) => {
    try {
      const idGrupo = getGrupoProductoPorTipoMaquina(nombreTipo);
      if (!idGrupo) {
        setProductos([]);
        return;
      }

      const response = await fetch(
        `${API_BASE_URL}/api/produccion/productos?id_grupo_producto=${idGrupo}`
      );
      const data = await response.json();
      if (data.success) {
        setProductos(data.productos || []);
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "No se pudieron cargar los productos",
        variant: "destructive",
      });
    }
  };

  const handlePrev = () => {
    if (step > 1) {
      setStep((prev) => (prev - 1) as Step);
    }
  };

  const handleKeyboardInput = (value: string) => {
    if (activeInput) {
      const medidaIndex = medidasProduccion.findIndex(
        (m) => m.id_medida.toString() === activeInput
      );
      if (medidaIndex >= 0) {
        const nuevasMedidas = [...medidasProduccion];
        nuevasMedidas[medidaIndex].cantidad = nuevasMedidas[medidaIndex].cantidad + value;
        setMedidasProduccion(nuevasMedidas);
      }
    }
  };

  const handleKeyboardBackspace = () => {
    if (activeInput) {
      const medidaIndex = medidasProduccion.findIndex(
        (m) => m.id_medida.toString() === activeInput
      );
      if (medidaIndex >= 0) {
        const nuevasMedidas = [...medidasProduccion];
        nuevasMedidas[medidaIndex].cantidad = nuevasMedidas[medidaIndex].cantidad.slice(0, -1);
        setMedidasProduccion(nuevasMedidas);
      }
    }
  };

  const handleKeyboardClear = () => {
    if (activeInput) {
      const medidaIndex = medidasProduccion.findIndex(
        (m) => m.id_medida.toString() === activeInput
      );
      if (medidaIndex >= 0) {
        const nuevasMedidas = [...medidasProduccion];
        nuevasMedidas[medidaIndex].cantidad = "";
        setMedidasProduccion(nuevasMedidas);
      }
    }
  };

  // Obtener medidas según el tipo de máquina
  const obtenerMedidasPorTipoMaquina = (): number[] => {
    const nombreLower = nombreTipoMaquina.toLowerCase();
    if (nombreLower.includes("extrusora")) {
      // Extrusora: kilos (5) y metros (2)
      return [5, 2];
    } else if (nombreLower.includes("peletizadora") || nombreLower.includes("aglutinadora")) {
      // Peletizadora o Aglutinadora: solo kilos (5)
      return [5];
    }
    return [];
  };

  // Inicializar medidas cuando se llega al paso 5
  useEffect(() => {
    if (step === 5 && nombreTipoMaquina) {
      const medidasRequeridas = obtenerMedidasPorTipoMaquina();
      const medidasActuales = medidasProduccion.map((m) => m.id_medida);
      
      // Agregar medidas faltantes
      const nuevasMedidas = medidasRequeridas
        .filter((idMedida) => !medidasActuales.includes(idMedida))
        .map((idMedida) => ({ id_medida: idMedida, cantidad: "" }));
      
      if (nuevasMedidas.length > 0) {
        setMedidasProduccion([...medidasProduccion, ...nuevasMedidas]);
      }
      
      // Eliminar medidas que no corresponden al tipo de máquina
      const medidasFiltradas = medidasProduccion.filter((m) =>
        medidasRequeridas.includes(m.id_medida)
      );
      
      if (medidasFiltradas.length !== medidasProduccion.length) {
        setMedidasProduccion(medidasFiltradas);
      }
    }
  }, [step, nombreTipoMaquina]);

  const handleSubmit = async () => {
    if (!idMaquina || !idProducto || !idUsuario || !idTurno) {
      toast({
        title: "Error",
        description: "Por favor complete todos los campos requeridos",
        variant: "destructive",
      });
      return;
    }

    try {
      setLoading(true);
      const medidasData = medidasProduccion
        .filter((m) => m.cantidad && parseFloat(m.cantidad) > 0)
        .map((m) => ({
          id_medida: m.id_medida,
          cantidad: parseFloat(m.cantidad),
        }));

      const response = await fetch(`${API_BASE_URL}/api/produccion", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id_producto: idProducto,
          id_maquina: idMaquina,
          id_usuario: idUsuario,
          id_turno: idTurno,
          fecha_hora: new Date().toISOString(),
          medidas: medidasData,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || data.error || `Error ${response.status}: ${response.statusText}`);
      }

      if (data.success) {
        toast({
          title: "Éxito",
          description: "Producción registrada correctamente",
        });
        // Resetear formulario
        setIdTipoMaquina(null);
        setNombreTipoMaquina("");
        setIdMaquina(null);
        setIdProducto(null);
        setIdUsuario(null);
        setMedidasProduccion([]);
        setStep(1);
      } else {
        throw new Error(data.message || data.error || "Error al registrar producción");
      }
    } catch (error: any) {
      console.error("Error al registrar producción:", error);
      toast({
        title: "Error",
        description: error.message || "No se pudo registrar la producción",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <Card className="w-full max-w-4xl mx-auto">
            <CardHeader>
              <CardTitle className="text-2xl text-center">Seleccione el Tipo de Máquina</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                {tiposMaquina.map((tipo) => (
                  <Button
                    key={tipo.id_tipo_maquina}
                    variant="outline"
                    size="lg"
                    className="h-32 text-lg font-semibold flex flex-col items-center justify-center gap-2 hover:bg-primary hover:text-primary-foreground transition-colors"
                    onClick={() => handleTipoMaquinaSelect(tipo.id_tipo_maquina, tipo.nombre)}
                  >
                    <Factory className="h-8 w-8" />
                    {tipo.nombre}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        );

      case 2:
        return (
          <Card className="w-full max-w-4xl mx-auto">
            <CardHeader>
              <CardTitle className="text-xl text-center">Seleccione la Máquina</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
                {maquinas.map((maquina) => (
                  <Button
                    key={maquina.id_maquina}
                    variant={idMaquina === maquina.id_maquina ? "default" : "outline"}
                    size="lg"
                    className="h-24 text-base font-semibold flex flex-col items-center justify-center gap-2 hover:bg-primary hover:text-primary-foreground transition-colors"
                    onClick={() => handleSeleccionarMaquina(maquina)}
                  >
                    <Factory className="h-6 w-6" />
                    {maquina.nombre}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        );

      case 3:
        return (
          <Card className="w-full max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle className="text-xl text-center">Seleccione el Usuario</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {usuarios.map((usuario) => (
                  <Button
                    key={usuario.id_usuarios}
                    variant={idUsuario === usuario.id_usuarios ? "default" : "outline"}
                    size="lg"
                    className="h-20 text-base font-semibold justify-start px-4 hover:bg-primary hover:text-primary-foreground transition-colors"
                    onClick={() => handleSeleccionarUsuario(usuario)}
                  >
                    <div className="text-left">
                      <div className="font-semibold">
                        {usuario.nombre} {usuario.apellido}
                      </div>
                      <div className="text-sm opacity-80">Doc: {usuario.documento}</div>
                    </div>
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        );

      case 4:
        return (
          <Card className="w-full max-w-4xl mx-auto">
            <CardHeader>
              <CardTitle className="text-xl text-center">Seleccione el Producto</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4">
                {productos.map((producto) => (
                  <Button
                    key={producto.id_producto}
                    variant={idProducto === producto.id_producto ? "default" : "outline"}
                    size="lg"
                    className="h-20 text-base font-semibold justify-start px-4 hover:bg-primary hover:text-primary-foreground transition-colors"
                    onClick={() => handleSeleccionarProducto(producto)}
                  >
                    <div className="text-left">
                      <div className="font-semibold">{producto.nombre}</div>
                      {producto.codigo && (
                        <div className="text-sm opacity-80">Código: {producto.codigo}</div>
                      )}
                    </div>
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        );

      case 5:
        // Obtener medidas según el tipo de máquina
        const medidasRequeridas = obtenerMedidasPorTipoMaquina();
        const medidasOrdenadas = medidasRequeridas
          .map((idMedida) => {
            const medidaProd = medidasProduccion.find((m) => m.id_medida === idMedida);
            const medida = medidas.find((m) => m.id_medida === idMedida);
            return {
              id_medida: idMedida,
              cantidad: medidaProd?.cantidad || "",
              nombre: medida?.nombre || `Medida ${idMedida}`,
            };
          })
          .filter((m) => m.id_medida); // Filtrar solo las medidas válidas

        return (
          <Card className="w-full max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle className="text-xl text-center">Medidas de Producción</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {medidasOrdenadas.map((medidaProd) => (
                <div key={medidaProd.id_medida} className="space-y-2">
                  <Label className="text-lg font-semibold">{medidaProd.nombre}</Label>
                  <Input
                    type="text"
                    value={medidaProd.cantidad}
                    readOnly
                    className="h-16 text-xl text-center"
                    onClick={() => {
                      setActiveInput(medidaProd.id_medida.toString());
                      setShowKeyboard(true);
                    }}
                    placeholder="0"
                  />
                </div>
              ))}
              {medidasOrdenadas.length === 0 && (
                <div className="text-center text-muted-foreground py-8">
                  No hay medidas disponibles para este tipo de máquina
                </div>
              )}
            </CardContent>
          </Card>
        );

      default:
        return null;
    }
  };

  return (
    <PageContainer>
      <PageTitle title="Agregar Producción" />
      <div className="space-y-6 pb-32">
        {/* Indicador de pasos */}
        <div className="flex justify-center gap-2">
          {[1, 2, 3, 4, 5].map((s) => (
            <div
              key={s}
              className={`h-2 w-12 rounded-full ${
                s === step
                  ? "bg-primary"
                  : s < step
                    ? "bg-primary/50"
                    : "bg-muted"
              }`}
            />
          ))}
        </div>
        
        {/* Información del turno actual */}
        {turnoActual && step > 1 && (
          <div className="text-center text-sm text-muted-foreground">
            Turno: {turnoActual.nombre} ({turnoActual.horario})
          </div>
        )}

        {/* Contenido del paso */}
        {loading && step === 1 ? (
          <div className="text-center py-12">Cargando...</div>
        ) : (
          renderStep()
        )}

        {/* Navegación */}
        <div className="flex justify-between max-w-2xl mx-auto">
          <Button
            variant="outline"
            size="lg"
            onClick={handlePrev}
            disabled={step === 1}
            className="h-12 px-6"
          >
            <ChevronLeft className="h-5 w-5 mr-2" />
            Anterior
          </Button>
          {step === 5 && (
            <Button
              variant="default"
              size="lg"
              onClick={handleSubmit}
              disabled={loading || !idMaquina || !idProducto || !idUsuario || !idTurno}
              className="h-12 px-6"
            >
              {loading ? "Guardando..." : "Guardar Producción"}
            </Button>
          )}
        </div>
      </div>

      {/* Teclado numérico */}
      {showKeyboard && (
        <NumericKeyboard
          onInput={handleKeyboardInput}
          onClose={() => {
            setShowKeyboard(false);
            setActiveInput(null);
          }}
          onBackspace={handleKeyboardBackspace}
          onClear={handleKeyboardClear}
        />
      )}

      {/* Diálogo de confirmación */}
      <ConfirmDialog
        open={showConfirmDialog}
        onOpenChange={setShowConfirmDialog}
        title="Confirmar Selección"
        description={
          itemPendiente
            ? `¿Estás seguro de que es ${itemPendiente.nombre}?`
            : "¿Estás seguro de esta selección?"
        }
        confirmText="Sí, confirmar"
        cancelText="Cancelar"
        onConfirm={handleConfirmarSeleccion}
        variant="default"
      />
    </PageContainer>
  );
};

export default AgregarProduccion;
