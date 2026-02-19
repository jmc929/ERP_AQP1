import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
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
import { Loader2, Wallet } from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { API_BASE_URL } from "@/config/api";

interface Caja {
  id_caja: number;
  nombre: string;
  saldo_actual: number;
  id_estado: number;
  estado_nombre?: string;
}

interface TipoMovimiento {
  id_tipo_movimiento: number;
  nombre: string;
}

const HacerMovimientosCaja = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [guardando, setGuardando] = useState(false);
  const [cajas, setCajas] = useState<Caja[]>([]);
  const [tiposMovimiento, setTiposMovimiento] = useState<TipoMovimiento[]>([]);
  const [usuarioLogueado, setUsuarioLogueado] = useState<any>(null);
  
  // Estados del formulario
  const [cajaSeleccionada, setCajaSeleccionada] = useState<string>("");
  const [idTipoMovimiento, setIdTipoMovimiento] = useState<string>("");
  const [monto, setMonto] = useState("");
  const [montoSinFormato, setMontoSinFormato] = useState(""); // Valor sin formato para cálculos
  const [descripcion, setDescripcion] = useState("");
  const [observaciones, setObservaciones] = useState("");
  const [openCaja, setOpenCaja] = useState(false);

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

  // Cargar datos iniciales
  useEffect(() => {
    const cargarDatos = async () => {
      try {
        setLoading(true);
        
        // Cargar cajas
        const cajasRes = await fetch(`${API_BASE_URL}/api/cajas`);
        const cajasData = await cajasRes.json();
        
        if (cajasData.success) {
          // Filtrar solo cajas activas (no archivadas)
          const cajasActivas = cajasData.cajas.filter(
            (caja: Caja) => {
              const estadoNombre = caja.estado_nombre?.toLowerCase() || "";
              return !estadoNombre.includes("eliminado") && 
                     !estadoNombre.includes("archivado");
            }
          );
          setCajas(cajasActivas);
        }

        // Cargar tipos de movimiento
        const tiposRes = await fetch(`${API_BASE_URL}/api/cajas/tipos-movimiento`);
        const tiposData = await tiposRes.json();
        
        if (tiposData.success) {
          setTiposMovimiento(tiposData.tiposMovimiento || []);
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

    cargarDatos();
  }, [toast]);

  // Función para desformatear número (quitar puntos para guardar) - convertir a formato estándar
  const desformatearNumero = (valor: string): string => {
    if (!valor || valor === "") return "";
    // Remover puntos de miles, convertir coma decimal a punto
    return valor.replace(/\./g, "").replace(/,/g, ".");
  };

  // Función para formatear número con puntos (solo visual) - formato colombiano
  const formatearNumeroVisual = (valor: string): string => {
    if (!valor || valor === "") return "";
    
    // Remover todo excepto números y coma
    let valorLimpio = valor.replace(/[^\d,]/g, "");
    
    // Si está vacío, retornar vacío
    if (!valorLimpio) return "";
    
    // Separar parte entera y decimal por coma
    const partes = valorLimpio.split(",");
    let parteEntera = partes[0] || "";
    const parteDecimal = partes.length > 1 ? partes[1].slice(0, 2) : "";
    
    // Agregar puntos cada 3 dígitos en la parte entera (de derecha a izquierda)
    parteEntera = parteEntera.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    
    // Retornar con coma decimal si hay decimales o si el usuario está escribiendo decimales
    if (parteDecimal) {
      return `${parteEntera},${parteDecimal}`;
    } else if (valorLimpio.includes(",") && partes.length === 2 && partes[1] === "") {
      // El usuario acaba de escribir la coma, mantenerla
      return `${parteEntera},`;
    }
    return parteEntera;
  };

  const handleMontoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const valorInput = e.target.value;
    
    // Permitir solo números y coma
    const valorLimpio = valorInput.replace(/[^\d,]/g, "");
    
    // Guardar valor sin formato para cálculos (convertir coma a punto)
    const valorSinFormato = valorLimpio.replace(/,/g, ".");
    setMontoSinFormato(valorSinFormato);
    
    // Formatear para mostrar
    const formateado = formatearNumeroVisual(valorLimpio);
    setMonto(formateado);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!cajaSeleccionada) {
      toast({
        title: "Error",
        description: "Debe seleccionar una caja",
        variant: "destructive",
      });
      return;
    }

    if (!idTipoMovimiento) {
      toast({
        title: "Error",
        description: "Debe seleccionar un tipo de movimiento",
        variant: "destructive",
      });
      return;
    }

    // Usar el valor sin formato para validar
    const montoNumerico = parseFloat(montoSinFormato);

    if (!montoSinFormato || isNaN(montoNumerico) || montoNumerico <= 0) {
      toast({
        title: "Error",
        description: "El monto debe ser mayor a cero",
        variant: "destructive",
      });
      return;
    }

    if (!usuarioLogueado?.id_usuarios) {
      toast({
        title: "Error",
        description: "No se pudo obtener la información del usuario",
        variant: "destructive",
      });
      return;
    }

    try {
      setGuardando(true);
      const response = await fetch(`${API_BASE_URL}/api/cajas/movimientos`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id_caja: parseInt(cajaSeleccionada),
          id_tipo_movimiento: parseInt(idTipoMovimiento),
          monto: montoNumerico,
          descripcion: descripcion.trim() || null,
          observaciones: observaciones.trim() || null,
          id_usuario: usuarioLogueado.id_usuarios,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Error al crear el movimiento");
      }

      toast({
        title: "Éxito",
        description: "Movimiento de caja creado exitosamente",
      });

      // Limpiar formulario
      setCajaSeleccionada("");
      setIdTipoMovimiento("");
      setMonto("");
      setMontoSinFormato("");
      setDescripcion("");
      setObservaciones("");

      // Recargar cajas para actualizar saldos
      const cajasRes = await fetch(`${API_BASE_URL}/api/cajas`);
      const cajasData = await cajasRes.json();
      if (cajasData.success) {
        const cajasActivas = cajasData.cajas.filter(
          (caja: Caja) => {
            const estadoNombre = caja.estado_nombre?.toLowerCase() || "";
            return !estadoNombre.includes("eliminado") && 
                   !estadoNombre.includes("archivado");
          }
        );
        setCajas(cajasActivas);
      }
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Error al crear el movimiento",
        variant: "destructive",
      });
    } finally {
      setGuardando(false);
    }
  };

  const cajaSeleccionadaObj = cajas.find(
    (c) => c.id_caja.toString() === cajaSeleccionada
  );

  return (
    <PageContainer>
      <PageTitle>Hacer Movimientos de Caja</PageTitle>

      <FormCard title="Registrar Movimiento">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Selector de Caja */}
            <div className="space-y-2">
              <Label htmlFor="caja">Caja *</Label>
              <Popover open={openCaja} onOpenChange={setOpenCaja}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={openCaja}
                    className="w-full justify-between"
                    disabled={loading}
                  >
                    <span className="flex-1 text-left">
                      {cajaSeleccionada
                        ? cajaSeleccionadaObj?.nombre || "Seleccione una caja"
                        : "Seleccione una caja"}
                      {cajaSeleccionadaObj && (
                        <span className="text-xs text-muted-foreground ml-2">
                          (Saldo: ${new Intl.NumberFormat("es-CO", {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          }).format(cajaSeleccionadaObj.saldo_actual)})
                        </span>
                      )}
                    </span>
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0" align="start">
                  <Command>
                    <CommandInput placeholder="Buscar caja..." />
                    <CommandList>
                      <CommandEmpty>No se encontraron cajas.</CommandEmpty>
                      <CommandGroup>
                        {cajas.map((caja) => (
                          <CommandItem
                            key={caja.id_caja}
                            value={`${caja.id_caja} ${caja.nombre}`}
                            onSelect={() => {
                              setCajaSeleccionada(
                                cajaSeleccionada === caja.id_caja.toString()
                                  ? ""
                                  : caja.id_caja.toString()
                              );
                              setOpenCaja(false);
                            }}
                          >
                            <Check
                              className={cn(
                                "mr-2 h-4 w-4",
                                cajaSeleccionada === caja.id_caja.toString()
                                  ? "opacity-100"
                                  : "opacity-0"
                              )}
                            />
                            <span className="flex-1">{caja.nombre}</span>
                            <span className="text-xs text-muted-foreground ml-2">
                              ${new Intl.NumberFormat("es-CO", {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2,
                              }).format(caja.saldo_actual)}
                            </span>
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
            </div>

            {/* Tipo de Movimiento */}
            <div className="space-y-2">
              <Label htmlFor="tipo-movimiento">Tipo de Movimiento *</Label>
              <Select
                value={idTipoMovimiento}
                onValueChange={setIdTipoMovimiento}
                disabled={loading}
              >
                <SelectTrigger id="tipo-movimiento">
                  <SelectValue placeholder="Seleccione un tipo" />
                </SelectTrigger>
                <SelectContent>
                  {tiposMovimiento.map((tipo) => (
                    <SelectItem
                      key={tipo.id_tipo_movimiento}
                      value={tipo.id_tipo_movimiento.toString()}
                    >
                      {tipo.nombre}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Monto */}
            <div className="space-y-2">
              <Label htmlFor="monto">Monto *</Label>
              <Input
                id="monto"
                type="text"
                value={monto}
                onChange={handleMontoChange}
                placeholder="0,00"
                required
                inputMode="decimal"
              />
            </div>

            {/* Descripción */}
            <div className="space-y-2">
              <Label htmlFor="descripcion">Descripción</Label>
              <Input
                id="descripcion"
                value={descripcion}
                onChange={(e) => setDescripcion(e.target.value)}
                placeholder="Ej: Pago a proveedor, Venta, etc."
              />
            </div>
          </div>

          {/* Observaciones */}
          <div className="space-y-2">
            <Label htmlFor="observaciones">Observaciones</Label>
            <Textarea
              id="observaciones"
              value={observaciones}
              onChange={(e) => setObservaciones(e.target.value)}
              placeholder="Observaciones adicionales sobre el movimiento..."
              rows={3}
            />
          </div>

          <div className="flex justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                setCajaSeleccionada("");
                setIdTipoMovimiento("");
                setMonto("");
                setMontoSinFormato("");
                setDescripcion("");
                setObservaciones("");
              }}
              disabled={guardando}
            >
              Limpiar
            </Button>
            <Button type="submit" disabled={guardando || loading}>
              {guardando ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Guardando...
                </>
              ) : (
                <>
                  <Wallet className="h-4 w-4 mr-2" />
                  Registrar Movimiento
                </>
              )}
            </Button>
          </div>
        </form>
      </FormCard>
    </PageContainer>
  );
};

export default HacerMovimientosCaja;

