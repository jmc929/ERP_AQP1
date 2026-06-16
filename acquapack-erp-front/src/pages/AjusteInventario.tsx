import React, { useState, useEffect } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Check, ChevronsUpDown, Loader2, ArrowUpCircle, ArrowDownCircle } from "lucide-react";
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
import { cn } from "@/lib/utils";
import PageContainer from "@/components/PageContainer";
import PageTitle from "@/components/PageTitle";
import FormCard from "@/components/FormCard";
import { BodegaSelect } from "@/components/BodegaSelect";
import { useToast } from "@/hooks/use-toast";
import { API_BASE_URL } from "@/config/api";

interface Bodega {
  id_bodega: number;
  nombre: string;
  id_estado?: number;
  total_productos?: number;
}

interface ProductoAgrupado {
  id_producto: number;
  producto_codigo: string;
  producto_nombre: string;
  unidad_medida: string;
  cantidad_entrada: number;
  cantidad_salida: number;
  saldo_cantidad: number;
}

type TipoAjuste = "aumento" | "salida";

const AjusteInventario = () => {
  const { toast } = useToast();
  const [bodegas, setBodegas] = useState<Bodega[]>([]);
  const [bodegaId, setBodegaId] = useState<string>("");
  const [productos, setProductos] = useState<ProductoAgrupado[]>([]);
  const [productoOpen, setProductoOpen] = useState(false);
  const [tipo, setTipo] = useState<TipoAjuste>("aumento");
  const [idProducto, setIdProducto] = useState<string>("");
  const [cantidad, setCantidad] = useState<string>("");
  const [valorUnitario, setValorUnitario] = useState<string>("");
  const [loadingBodegas, setLoadingBodegas] = useState(true);
  const [loadingProductos, setLoadingProductos] = useState(false);
  const [enviando, setEnviando] = useState(false);

  useEffect(() => {
    const cargarBodegas = async () => {
      try {
        setLoadingBodegas(true);
        const response = await fetch(`${API_BASE_URL}/api/compras/bodegas`);
        if (!response.ok) throw new Error(`Error ${response.status}`);
        const data = await response.json();
        if (data.success && data.bodegas?.length) {
          setBodegas(data.bodegas);
          if (!bodegaId) setBodegaId(data.bodegas[0].id_bodega.toString());
        }
      } catch (error) {
        toast({
          title: "Error",
          description: "No se pudieron cargar las bodegas.",
          variant: "destructive",
        });
      } finally {
        setLoadingBodegas(false);
      }
    };
    cargarBodegas();
  }, [toast]);

  useEffect(() => {
    if (!bodegaId) {
      setProductos([]);
      setIdProducto("");
      return;
    }
    const cargarProductos = async () => {
      try {
        setLoadingProductos(true);
        const response = await fetch(
          `${API_BASE_URL}/api/bodegas/${bodegaId}/productos?agrupado=true`
        );
        if (!response.ok) throw new Error(`Error ${response.status}`);
        const data = await response.json();
        if (data.success) {
          setProductos(data.productos || []);
          setIdProducto("");
        } else {
          setProductos([]);
        }
      } catch (error) {
        toast({
          title: "Error",
          description: "No se pudieron cargar los productos de la bodega.",
          variant: "destructive",
        });
        setProductos([]);
      } finally {
        setLoadingProductos(false);
      }
    };
    cargarProductos();
  }, [bodegaId, toast]);

  const productoSeleccionado = productos.find(
    (p) => p.id_producto.toString() === idProducto
  );
  const saldoDisponible = productoSeleccionado?.saldo_cantidad ?? 0;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const cant = parseFloat(cantidad.replace(",", "."));
    if (!bodegaId || !idProducto || !cantidad || isNaN(cant) || cant <= 0) {
      toast({
        title: "Datos incompletos",
        description: "Seleccione bodega, producto e ingrese una cantidad válida.",
        variant: "destructive",
      });
      return;
    }
    if (tipo === "aumento") {
      const valor = parseFloat(valorUnitario.replace(",", "."));
      if (isNaN(valor) || valor < 0) {
        toast({
          title: "Valor inválido",
          description: "En ajuste por aumento debe ingresar un costo unitario.",
          variant: "destructive",
        });
        return;
      }
    }
    if (tipo === "salida" && cant > saldoDisponible) {
      toast({
        title: "Stock insuficiente",
        description: `El saldo disponible es ${saldoDisponible.toLocaleString("es-CO", { minimumFractionDigits: 2 })}.`,
        variant: "destructive",
      });
      return;
    }

    setEnviando(true);
    try {
      const body: Record<string, unknown> = {
        tipo,
        id_bodega: parseInt(bodegaId, 10),
        id_producto: parseInt(idProducto, 10),
        cantidad: cant,
      };
      if (tipo === "aumento") {
        body.valor_unitario = parseFloat(valorUnitario.replace(",", "."));
      }
      const response = await fetch(`${API_BASE_URL}/api/inventario/ajuste`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = await response.json().catch(() => ({}));
      if (response.ok && data.success) {
        toast({
          title: "Ajuste registrado",
          description: data.message || "El ajuste se guardó correctamente.",
        });
        setCantidad("");
        setValorUnitario("");
        setIdProducto("");
        // Recargar productos para actualizar saldos
        const res = await fetch(
          `${API_BASE_URL}/api/bodegas/${bodegaId}/productos?agrupado=true`
        );
        const resData = await res.json();
        if (resData.success) setProductos(resData.productos || []);
      } else {
        toast({
          title: "Error",
          description:
            data.message ||
            (response.status === 404
              ? "El backend de ajustes aún no está disponible."
              : "No se pudo registrar el ajuste."),
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "No se pudo conectar con el servidor.",
        variant: "destructive",
      });
    } finally {
      setEnviando(false);
    }
  };

  return (
    <PageContainer>
      <PageTitle title="Ajuste de inventario" />
      <FormCard title="Registrar ajuste">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label>Tipo de ajuste</Label>
              <div className="flex flex-wrap gap-4 pt-2">
                <label className="flex cursor-pointer items-center gap-2">
                  <input
                    type="radio"
                    name="tipo"
                    checked={tipo === "aumento"}
                    onChange={() => setTipo("aumento")}
                    className="h-4 w-4"
                  />
                  <ArrowUpCircle className="h-5 w-5 text-green-600" />
                  <span>Aumento (entrada)</span>
                </label>
                <label className="flex cursor-pointer items-center gap-2">
                  <input
                    type="radio"
                    name="tipo"
                    checked={tipo === "salida"}
                    onChange={() => setTipo("salida")}
                    className="h-4 w-4"
                  />
                  <ArrowDownCircle className="h-5 w-5 text-red-600" />
                  <span>Salida (disminución)</span>
                </label>
              </div>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label>Bodega</Label>
              <BodegaSelect
                bodegas={bodegas}
                value={bodegaId}
                onValueChange={setBodegaId}
                placeholder="Seleccione bodega..."
                disabled={loadingBodegas}
              />
            </div>
            <div className="space-y-2">
              <Label>Producto</Label>
              <Popover open={productoOpen} onOpenChange={setProductoOpen}>
                <PopoverTrigger asChild>
                  <Button
                    type="button"
                    variant="outline"
                    role="combobox"
                    aria-expanded={productoOpen}
                    className="w-full justify-between"
                    disabled={!bodegaId || loadingProductos}
                  >
                    <span className="truncate">
                      {idProducto
                        ? productoSeleccionado
                          ? `${productoSeleccionado.producto_codigo} - ${productoSeleccionado.producto_nombre}`
                          : "Seleccione..."
                        : "Seleccione producto..."}
                    </span>
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent
                  className="w-[var(--radix-popover-trigger-width)] max-w-none p-0"
                  align="start"
                >
                  <Command>
                    <CommandInput placeholder="Buscar por código o nombre..." />
                    <CommandList>
                      <CommandEmpty>No hay productos en esta bodega.</CommandEmpty>
                      <CommandGroup>
                        {productos.map((p) => (
                          <CommandItem
                            key={p.id_producto}
                            value={`${p.producto_codigo} ${p.producto_nombre}`}
                            onSelect={() => {
                              setIdProducto(
                                idProducto === p.id_producto.toString()
                                  ? ""
                                  : p.id_producto.toString()
                              );
                              setProductoOpen(false);
                            }}
                          >
                            <Check
                              className={cn(
                                "mr-2 h-4 w-4",
                                idProducto === p.id_producto.toString()
                                  ? "opacity-100"
                                  : "opacity-0"
                              )}
                            />
                            <span className="flex-1 truncate">
                              {p.producto_codigo} - {p.producto_nombre}
                            </span>
                            <span className="text-xs text-muted-foreground ml-2">
                              Saldo: {p.saldo_cantidad.toLocaleString("es-CO", { minimumFractionDigits: 2 })}
                            </span>
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="cantidad">Cantidad</Label>
              <Input
                id="cantidad"
                type="text"
                inputMode="decimal"
                placeholder="0.00"
                value={cantidad}
                onChange={(e) => setCantidad(e.target.value)}
              />
              {tipo === "salida" && productoSeleccionado && (
                <p className="text-xs text-muted-foreground">
                  Saldo disponible: {saldoDisponible.toLocaleString("es-CO", { minimumFractionDigits: 2 })} {productoSeleccionado.unidad_medida}
                </p>
              )}
            </div>
            {tipo === "aumento" && (
              <div className="space-y-2">
                <Label htmlFor="valor">Costo unitario (valor de entrada)</Label>
                <Input
                  id="valor"
                  type="text"
                  inputMode="decimal"
                  placeholder="0.00"
                  value={valorUnitario}
                  onChange={(e) => setValorUnitario(e.target.value)}
                />
              </div>
            )}
          </div>

          <div className="flex justify-end">
            <Button type="submit" disabled={enviando}>
              {enviando ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Guardando...
                </>
              ) : (
                "Registrar ajuste"
              )}
            </Button>
          </div>
        </form>
      </FormCard>
    </PageContainer>
  );
};

export default AjusteInventario;
