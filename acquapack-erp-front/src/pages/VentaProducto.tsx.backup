import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
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
import { Trash2, Plus, Search, Save } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Interfaces desde la BD
interface Producto {
  id_producto: number;
  codigo: string;
  nombre: string;
}

interface Bodega {
  id_bodega: number;
  nombre: string;
}

interface Proveedor {
  id_proveedor: number;
  razon_social: string;
  nombre_comercial?: string;
}

interface Iva {
  id_iva: number;
  nombre: string;
  valor: number;
}

interface Retencion {
  id_retefuente: number;
  nombre: string;
  valor: number;
}

interface FilaFactura {
  id: number;
  productoCodigo: string;
  productoNombre: string;
  idProducto?: number; // Guardar el ID del producto para evitar búsquedas
  bodega: string;
  cantidad: string;
  valorUnitario: string;
  descuento: string;
  idIva: string;
  idRetencion: string;
  valorTotal: number;
  ivaMonto?: number;
  retencionMonto?: number;
  montoDescuento?: number;
  porcentajeIva?: number;
  porcentajeRetencion?: number;
}

const IngresarFactura = () => {
  const { toast } = useToast();
  const [facturaId, setFacturaId] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [guardando, setGuardando] = useState(false);
  const [fecha, setFecha] = useState(new Date().toISOString().split("T")[0]);
  const [proveedor, setProveedor] = useState("");
  const [numeroFacturaLetras, setNumeroFacturaLetras] = useState("");
  const [numeroFacturaNumeros, setNumeroFacturaNumeros] = useState("");
  const [descuentoEnPorcentaje, setDescuentoEnPorcentaje] = useState(false);
  
  // Obtener usuario logueado
  const [usuarioLogueado, setUsuarioLogueado] = useState<{ id_usuarios: number } | null>(null);
  
  // Datos desde la BD
  const [proveedores, setProveedores] = useState<Proveedor[]>([]);
  const [productos, setProductos] = useState<Producto[]>([]);
  const [bodegas, setBodegas] = useState<Bodega[]>([]);
  const [ivas, setIvas] = useState<Iva[]>([]);
  const [retenciones, setRetenciones] = useState<Retencion[]>([]);
  
  // Estados para búsqueda y paginación de productos
  const [busquedaProductos, setBusquedaProductos] = useState<Map<number, string>>(new Map());
  const [productosCargados, setProductosCargados] = useState<Producto[]>([]);
  const [paginacionProductos, setPaginacionProductos] = useState({
    paginaActual: 1,
    totalPaginas: 1,
    hayMas: false,
    cargando: false
  });
  const [timeoutBusqueda, setTimeoutBusqueda] = useState<NodeJS.Timeout | null>(null);
  
  const [filas, setFilas] = useState<FilaFactura[]>([
    {
      id: 1,
      productoCodigo: "",
      productoNombre: "",
      idProducto: undefined,
      bodega: "",
      cantidad: "",
      valorUnitario: "",
      descuento: "",
      idIva: "0",
      idRetencion: "0",
      valorTotal: 0,
      ivaMonto: 0,
      retencionMonto: 0,
      montoDescuento: 0,
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

  // Cargar datos iniciales
  useEffect(() => {
    const cargarDatos = async () => {
      try {
        setLoading(true);
        const [facturaRes, proveedoresRes, productosRes, bodegasRes, ivasRes, retencionesRes] = await Promise.all([
          fetch("http://localhost:4000/api/compras/siguiente-id-factura"),
          fetch("http://localhost:4000/api/compras/proveedores"),
          fetch("http://localhost:4000/api/compras/productos?page=1&limit=50"),
          fetch("http://localhost:4000/api/compras/bodegas"),
          fetch("http://localhost:4000/api/compras/ivas"),
          fetch("http://localhost:4000/api/compras/retenciones")
        ]);

        const facturaData = await facturaRes.json();
        const proveedoresData = await proveedoresRes.json();
        const productosData = await productosRes.json();
        const bodegasData = await bodegasRes.json();
        const ivasData = await ivasRes.json();
        const retencionesData = await retencionesRes.json();

        if (facturaData.success) {
          setFacturaId(facturaData.siguienteId);
        }
        if (proveedoresData.success) {
          setProveedores(proveedoresData.proveedores);
        }
        if (productosData.success) {
          setProductosCargados(productosData.productos || []);
          setPaginacionProductos({
            paginaActual: productosData.paginacion?.paginaActual || 1,
            totalPaginas: productosData.paginacion?.totalPaginas || 1,
            hayMas: productosData.paginacion?.hayMas || false,
            cargando: false
          });
        }
        if (bodegasData.success) {
          setBodegas(bodegasData.bodegas);
        }
        if (ivasData.success) {
          setIvas(ivasData.ivas);
        }
        if (retencionesData.success) {
          setRetenciones(retencionesData.retenciones);
        }
      } catch (error) {
        console.error("Error al cargar datos:", error);
      } finally {
        setLoading(false);
      }
    };

    cargarDatos();

    // Limpiar timeout al desmontar
    return () => {
      if (timeoutBusqueda) {
        clearTimeout(timeoutBusqueda);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Función para cargar más productos (scroll infinito)
  const cargarMasProductos = async (filaId: number, busqueda: string = "") => {
    if (paginacionProductos.cargando || !paginacionProductos.hayMas) return;

    try {
      setPaginacionProductos(prev => ({ ...prev, cargando: true }));
      const siguientePagina = paginacionProductos.paginaActual + 1;
      const url = `http://localhost:4000/api/compras/productos?page=${siguientePagina}&limit=50${busqueda ? `&busqueda=${encodeURIComponent(busqueda)}` : ""}`;
      
      const response = await fetch(url);
      const data = await response.json();

      if (data.success) {
        setProductosCargados(prev => [...prev, ...(data.productos || [])]);
        setPaginacionProductos({
          paginaActual: data.paginacion?.paginaActual || siguientePagina,
          totalPaginas: data.paginacion?.totalPaginas || 1,
          hayMas: data.paginacion?.hayMas || false,
          cargando: false
        });
      }
    } catch (error) {
      console.error("Error al cargar más productos:", error);
      setPaginacionProductos(prev => ({ ...prev, cargando: false }));
    }
  };

  // Función para buscar productos con debounce
  const buscarProductos = async (filaId: number, busqueda: string) => {
    // Limpiar timeout anterior
    if (timeoutBusqueda) {
      clearTimeout(timeoutBusqueda);
    }

    // Crear nuevo timeout para debounce (500ms)
    const nuevoTimeout = setTimeout(async () => {
      try {
        setPaginacionProductos(prev => ({ ...prev, cargando: true }));
        const url = `http://localhost:4000/api/compras/productos?page=1&limit=50${busqueda ? `&busqueda=${encodeURIComponent(busqueda)}` : ""}`;
        
        const response = await fetch(url);
        const data = await response.json();

        if (data.success) {
          setProductosCargados(data.productos || []);
          setPaginacionProductos({
            paginaActual: data.paginacion?.paginaActual || 1,
            totalPaginas: data.paginacion?.totalPaginas || 1,
            hayMas: data.paginacion?.hayMas || false,
            cargando: false
          });
        }
      } catch (error) {
        console.error("Error al buscar productos:", error);
        setPaginacionProductos(prev => ({ ...prev, cargando: false }));
      }
    }, 500);

    setTimeoutBusqueda(nuevoTimeout);
  };

  // Calcular valor total de una fila y obtener desglose
  const calcularValorTotal = async (fila: FilaFactura): Promise<{ valorTotal: number; ivaMonto: number; retencionMonto: number; montoDescuento: number; porcentajeIva: number; porcentajeRetencion: number }> => {
    try {
      const response = await fetch("http://localhost:4000/api/compras/calcular-valor-total", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          cantidad: parseFloat(fila.cantidad) || 0,
          valorUnitario: parseFloat(fila.valorUnitario) || 0,
          descuento: parseFloat(fila.descuento) || 0,
          descuentoEnPorcentaje: descuentoEnPorcentaje,
        idIva: fila.idIva && fila.idIva !== "0" ? fila.idIva : null,
        idRetencion: fila.idRetencion && fila.idRetencion !== "0" ? fila.idRetencion : null,
        }),
      });

      if (!response.ok) {
        throw new Error("Error al calcular valor total");
      }

      const data = await response.json();
      return {
        valorTotal: data.valorTotal,
        ivaMonto: data.desglose?.ivaMonto || 0,
        retencionMonto: data.desglose?.retencionMonto || 0,
        montoDescuento: data.desglose?.montoDescuento || 0,
        porcentajeIva: data.desglose?.porcentajeIva || 0,
        porcentajeRetencion: data.desglose?.porcentajeRetencion || 0,
      };
    } catch (error) {
      console.error("Error al calcular valor total:", error);
      // Fallback al cálculo local si el backend no está disponible
      return calcularValorTotalLocal(fila);
    }
  };

  // Cálculo local como fallback
  const calcularValorTotalLocal = (fila: FilaFactura): { valorTotal: number; ivaMonto: number; retencionMonto: number; montoDescuento: number; porcentajeIva: number; porcentajeRetencion: number } => {
    const cantidad = parseFloat(fila.cantidad) || 0;
    const valorUnitario = parseFloat(fila.valorUnitario) || 0;
    const descuento = parseFloat(fila.descuento) || 0;

    let subtotal = cantidad * valorUnitario;
    
    let montoDescuento = 0;
    if (descuentoEnPorcentaje) {
      montoDescuento = (subtotal * descuento) / 100;
    } else {
      montoDescuento = descuento;
    }
    subtotal = subtotal - montoDescuento;

    // Guardar el subtotal después del descuento para calcular impuestos
    const subtotalDespuesDescuento = subtotal;

    let ivaMonto = 0;
    let porcentajeIva = 0;
    if (fila.idIva && fila.idIva !== "0") {
      const ivaSeleccionado = ivas.find(i => i.id_iva.toString() === fila.idIva);
      if (ivaSeleccionado) {
        porcentajeIva = parseFloat(ivaSeleccionado.valor.toString()) || 0;
        ivaMonto = (subtotalDespuesDescuento * porcentajeIva) / 100;
        subtotal = subtotal + ivaMonto;
      }
    }

    let retencionMonto = 0;
    let porcentajeRetencion = 0;
    if (fila.idRetencion && fila.idRetencion !== "0") {
      const retencionSeleccionada = retenciones.find(r => r.id_retefuente.toString() === fila.idRetencion);
      if (retencionSeleccionada) {
        porcentajeRetencion = parseFloat(retencionSeleccionada.valor.toString()) || 0;
        retencionMonto = (subtotalDespuesDescuento * porcentajeRetencion) / 100;
        subtotal = subtotal - retencionMonto;
      }
    }

    return {
      valorTotal: Math.round(subtotal * 100) / 100,
      ivaMonto: Math.round(ivaMonto * 100) / 100,
      retencionMonto: Math.round(retencionMonto * 100) / 100,
      montoDescuento: Math.round(montoDescuento * 100) / 100,
      porcentajeIva,
      porcentajeRetencion,
    };
  };


  const handleAgregarFila = () => {
    const nuevoId = Math.max(...filas.map((f) => f.id), 0) + 1;
    setFilas([
      ...filas,
      {
        id: nuevoId,
        productoCodigo: "",
        productoNombre: "",
        idProducto: undefined,
        bodega: "",
        cantidad: "",
        valorUnitario: "",
        descuento: "",
        idIva: "0",
        idRetencion: "0",
        valorTotal: 0,
      },
    ]);
    // Limpiar búsqueda para la nueva fila
    const nuevo = new Map(busquedaProductos);
    nuevo.delete(nuevoId);
    setBusquedaProductos(nuevo);
  };

  const handleEliminarFila = (id: number) => {
    if (filas.length > 1) {
      setFilas(filas.filter((fila) => fila.id !== id));
      // Limpiar búsqueda de la fila eliminada
      const nuevo = new Map(busquedaProductos);
      nuevo.delete(id);
      setBusquedaProductos(nuevo);
    }
  };

  const handleCambioProducto = async (id: number, codigo: string) => {
    // Buscar el producto en productosCargados primero
    let producto = productosCargados.find((p) => p.codigo === codigo);
    
    // Si no está en productosCargados, buscarlo en la BD
    if (!producto) {
      try {
        const response = await fetch(`http://localhost:4000/api/compras/productos?page=1&limit=1&busqueda=${encodeURIComponent(codigo)}`);
        const data = await response.json();
        if (data.success && data.productos && data.productos.length > 0) {
          producto = data.productos.find((p: Producto) => p.codigo === codigo);
        }
      } catch (error) {
        console.error("Error al buscar producto:", error);
      }
    }
    
    const nuevaFila = {
      ...filas.find((f) => f.id === id)!,
      productoCodigo: codigo,
      productoNombre: producto ? producto.nombre : "",
      idProducto: producto ? producto.id_producto : undefined,
    };
    const calculo = await calcularValorTotal(nuevaFila);
    
    setFilas(
      filas.map((fila) => {
        if (fila.id === id) {
          return {
            ...nuevaFila,
            valorTotal: calculo.valorTotal,
            ivaMonto: calculo.ivaMonto,
            retencionMonto: calculo.retencionMonto,
            montoDescuento: calculo.montoDescuento,
            porcentajeIva: calculo.porcentajeIva,
            porcentajeRetencion: calculo.porcentajeRetencion,
          };
        }
        return fila;
      })
    );
    
    // Limpiar búsqueda al seleccionar producto
    const nuevo = new Map(busquedaProductos);
    nuevo.delete(id);
    setBusquedaProductos(nuevo);
  };

  const handleCambioCampo = async (
    id: number,
    campo: keyof FilaFactura,
    valor: string | boolean
  ) => {
    const nuevaFila = { ...filas.find((f) => f.id === id)!, [campo]: valor };
    const calculo = await calcularValorTotal(nuevaFila);
    
    setFilas(
      filas.map((fila) => {
        if (fila.id === id) {
            return {
              ...nuevaFila,
              valorTotal: calculo.valorTotal,
              ivaMonto: calculo.ivaMonto,
              retencionMonto: calculo.retencionMonto,
              montoDescuento: calculo.montoDescuento,
              porcentajeIva: calculo.porcentajeIva,
              porcentajeRetencion: calculo.porcentajeRetencion,
            };
        }
        return fila;
      })
    );
  };

  // Recalcular todas las filas cuando cambie el tipo de descuento (porcentaje o fijo)
  useEffect(() => {
    const recalcularTodasLasFilas = async () => {
      const filasActualizadas = await Promise.all(
        filas.map(async (fila) => {
          // Solo recalcular si la fila tiene datos suficientes
          if (fila.cantidad && fila.valorUnitario) {
            const calculo = await calcularValorTotal(fila);
            return {
              ...fila,
              valorTotal: calculo.valorTotal,
              ivaMonto: calculo.ivaMonto,
              retencionMonto: calculo.retencionMonto,
              montoDescuento: calculo.montoDescuento,
              porcentajeIva: calculo.porcentajeIva,
              porcentajeRetencion: calculo.porcentajeRetencion,
            };
          }
          return fila;
        })
      );
      setFilas(filasActualizadas);
    };

    // Solo recalcular si hay filas con datos
    if (filas.some(f => f.cantidad && f.valorUnitario)) {
      recalcularTodasLasFilas();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [descuentoEnPorcentaje]);

  // Función para guardar la factura
  const handleGuardarFactura = async () => {
    // Validaciones
    if (!usuarioLogueado?.id_usuarios) {
      toast({
        title: "Error",
        description: "No se encontró el usuario logueado. Por favor, inicie sesión nuevamente.",
        variant: "destructive",
      });
      return;
    }

    if (!fecha) {
      toast({
        title: "Error",
        description: "La fecha es obligatoria",
        variant: "destructive",
      });
      return;
    }

    if (!proveedor) {
      toast({
        title: "Error",
        description: "Debe seleccionar un proveedor",
        variant: "destructive",
      });
      return;
    }

    // Validar que todas las filas tengan producto, bodega, cantidad y valor unitario
    const filasInvalidas = filas.filter(
      (f) =>
        !f.productoCodigo ||
        !f.bodega ||
        !f.cantidad ||
        parseFloat(f.cantidad) <= 0 ||
        !f.valorUnitario ||
        parseFloat(f.valorUnitario) <= 0
    );

    if (filasInvalidas.length > 0) {
      toast({
        title: "Error",
        description: "Todas las filas deben tener producto, bodega, cantidad y valor unitario válidos",
        variant: "destructive",
      });
      return;
    }

    try {
      setGuardando(true);

      // Preparar detalles - buscar productos que no tengan idProducto guardado
      const detalles = await Promise.all(
        filas.map(async (fila) => {
          let idProducto = fila.idProducto;
          
          // Si no tiene idProducto, buscarlo
          if (!idProducto) {
            let producto = productosCargados.find((p) => p.codigo === fila.productoCodigo);
            
            // Si no está en productosCargados, buscarlo en la BD
            if (!producto) {
              try {
                const response = await fetch(`http://localhost:4000/api/compras/productos?page=1&limit=1&busqueda=${encodeURIComponent(fila.productoCodigo)}`);
                const data = await response.json();
                if (data.success && data.productos && data.productos.length > 0) {
                  producto = data.productos.find((p: Producto) => p.codigo === fila.productoCodigo);
                }
              } catch (error) {
                console.error("Error al buscar producto:", error);
              }
            }
            
            if (!producto) {
              throw new Error(`Producto no encontrado para el código: ${fila.productoCodigo}`);
            }
            
            idProducto = producto.id_producto;
          }

          const cantidad = parseFloat(fila.cantidad) || 0;
          const valorUnitario = parseFloat(fila.valorUnitario) || 0;
          const subtotalInicial = cantidad * valorUnitario;
          const descuento = parseFloat(fila.descuento) || 0;
          const montoDescuento = fila.montoDescuento || 0;
          const subtotal = subtotalInicial - montoDescuento;

          return {
            id_producto: idProducto,
            id_bodega: parseInt(fila.bodega),
            cantidad: cantidad,
            precio_unitario: valorUnitario,
            descuento: montoDescuento, // Enviar el monto calculado del descuento
            subtotal: subtotal,
            id_iva: fila.idIva && fila.idIva !== "0" ? parseInt(fila.idIva) : null,
            iva_valor: fila.ivaMonto || 0,
            id_retefuente: fila.idRetencion && fila.idRetencion !== "0" ? parseInt(fila.idRetencion) : null,
            retefuente_valor: fila.retencionMonto || 0,
            valor_total: fila.valorTotal || 0,
          };
        })
      );

      const response = await fetch("http://localhost:4000/api/compras/facturas", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id_usuarios: usuarioLogueado.id_usuarios,
          fecha_creacion: fecha,
          id_proveedor: parseInt(proveedor),
          numeroFacturaLetras: numeroFacturaLetras,
          numeroFacturaNumeros: numeroFacturaNumeros,
          descuentoEnPorcentaje: descuentoEnPorcentaje,
          detalles: detalles,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Error al guardar la factura");
      }

      toast({
        title: "Éxito",
        description: "Factura guardada exitosamente",
      });

      // Recargar el siguiente ID de factura
      const facturaRes = await fetch("http://localhost:4000/api/compras/siguiente-id-factura");
      const facturaData = await facturaRes.json();
      if (facturaData.success) {
        setFacturaId(facturaData.siguienteId);
      }

      // Limpiar formulario
      setFecha(new Date().toISOString().split("T")[0]);
      setProveedor("");
      setNumeroFacturaLetras("");
      setNumeroFacturaNumeros("");
      setFilas([
        {
          id: 1,
          productoCodigo: "",
          productoNombre: "",
          idProducto: undefined,
          bodega: "",
          cantidad: "",
          valorUnitario: "",
          descuento: "",
          idIva: "0",
          idRetencion: "0",
          valorTotal: 0,
          ivaMonto: 0,
          retencionMonto: 0,
          montoDescuento: 0,
        },
      ]);
      setBusquedaProductos(new Map());
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Error al guardar la factura",
        variant: "destructive",
      });
    } finally {
      setGuardando(false);
    }
  };

  return (
    <PageContainer>
      <PageTitle title="Ingresar Factura" />

      {/* Formulario principal */}
      <FormCard title="Datos de la Factura">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="space-y-2">
              <Label htmlFor="fecha">Fecha</Label>
              <Input
                id="fecha"
                type="date"
                value={fecha}
                onChange={(e) => setFecha(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="proveedor">Proveedor</Label>
              <Select value={proveedor} onValueChange={setProveedor} disabled={loading}>
                <SelectTrigger id="proveedor">
                  <SelectValue placeholder={loading ? "Cargando..." : "Seleccione proveedor"} />
                </SelectTrigger>
                <SelectContent>
                  {proveedores.map((prov) => (
                    <SelectItem key={prov.id_proveedor} value={prov.id_proveedor.toString()}>
                      {prov.razon_social || prov.nombre_comercial}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="facturaId">ID Factura</Label>
              <Input
                id="facturaId"
                type="text"
                value={facturaId ?? "Cargando..."}
                disabled
                className="bg-muted"
              />
            </div>

            <div className="space-y-2">
              <Label>Número Factura Proveedor</Label>
              <div className="flex gap-2">
                <Input
                  placeholder="Letras"
                  value={numeroFacturaLetras}
                  onChange={(e) => setNumeroFacturaLetras(e.target.value)}
                  className="flex-1"
                />
                <Input
                  placeholder="Números"
                  type="text"
                  value={numeroFacturaNumeros}
                  onChange={(e) => setNumeroFacturaNumeros(e.target.value)}
                  className="flex-1"
                />
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Checkbox
              id="descuentoPorcentaje"
              checked={descuentoEnPorcentaje}
              onCheckedChange={(checked) => setDescuentoEnPorcentaje(checked as boolean)}
            />
            <Label htmlFor="descuentoPorcentaje" className="cursor-pointer">
              Descuento en porcentaje
            </Label>
          </div>
      </FormCard>

      {/* Tabla de productos */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Productos</CardTitle>
          <div className="flex gap-2">
            <Button onClick={handleAgregarFila} size="sm" className="flex items-center gap-2" variant="outline">
              <Plus className="h-4 w-4" />
              Agregar Fila
            </Button>
            <Button 
              onClick={handleGuardarFactura} 
              size="sm" 
              className="flex items-center gap-2"
              disabled={guardando || !usuarioLogueado}
            >
              <Save className="h-4 w-4" />
              {guardando ? "Guardando..." : "Guardar Factura"}
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="border-r border-border w-12">#</TableHead>
                  <TableHead className="border-r border-border w-[300px] min-w-[250px]">Producto</TableHead>
                  <TableHead className="border-r border-border w-[150px]">Bodega</TableHead>
                  <TableHead className="border-r border-border">Cantidad</TableHead>
                  <TableHead className="border-r border-border">Valor Unitario</TableHead>
                  <TableHead className="border-r border-border">Descuento</TableHead>
                  <TableHead className="border-r border-border">Subtotal</TableHead>
                  <TableHead className="border-r border-border">IVA</TableHead>
                  <TableHead className="border-r border-border">Retención</TableHead>
                  <TableHead className="border-r border-border">Valor Total</TableHead>
                  <TableHead className="w-16">Acción</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filas.map((fila, index) => (
                  <TableRow key={fila.id}>
                    <TableCell className="border-r border-border text-center font-medium">
                      {index + 1}
                    </TableCell>
                    <TableCell className="border-r border-border p-2 w-[300px] min-w-[250px]">
                      <Select
                        value={fila.productoCodigo}
                        onValueChange={(value) => handleCambioProducto(fila.id, value)}
                        disabled={loading}
                      >
                        <SelectTrigger className="h-9 w-full">
                          <SelectValue placeholder={loading ? "Cargando..." : "Seleccione producto"}>
                            {fila.productoCodigo && (
                              <div className="flex flex-col items-start text-left">
                                <span className="font-bold text-sm truncate max-w-[280px]">{fila.productoNombre}</span>
                                <span className="text-xs text-muted-foreground">{fila.productoCodigo}</span>
                              </div>
                            )}
                          </SelectValue>
                        </SelectTrigger>
                        <SelectContent>
                          <div className="p-2 border-b">
                            <div className="relative">
                              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                              <Input
                                placeholder="Buscar por código o nombre..."
                                value={busquedaProductos.get(fila.id) || ""}
                                onChange={(e) => {
                                  const busqueda = e.target.value;
                                  const nuevo = new Map(busquedaProductos);
                                  nuevo.set(fila.id, busqueda);
                                  setBusquedaProductos(nuevo);
                                  buscarProductos(fila.id, busqueda);
                                }}
                                className="pl-8 h-9"
                                onClick={(e) => e.stopPropagation()}
                                onKeyDown={(e) => e.stopPropagation()}
                              />
                            </div>
                          </div>
                          <div 
                            className="max-h-[200px] overflow-y-auto"
                            onScroll={(e) => {
                              const target = e.target as HTMLElement;
                              // Cargar más cuando se acerca al final (80% del scroll)
                              if (
                                target.scrollTop + target.clientHeight >= target.scrollHeight * 0.8 &&
                                paginacionProductos.hayMas &&
                                !paginacionProductos.cargando
                              ) {
                                const busqueda = busquedaProductos.get(fila.id) || "";
                                cargarMasProductos(fila.id, busqueda);
                              }
                            }}
                          >
                            {productosCargados.map((prod) => (
                              <SelectItem key={prod.codigo} value={prod.codigo}>
                                <div className="flex flex-col">
                                  <span className="font-bold text-sm">{prod.nombre}</span>
                                  <span className="text-xs text-muted-foreground">{prod.codigo}</span>
                                </div>
                              </SelectItem>
                            ))}
                            {paginacionProductos.cargando && (
                              <div className="p-2 text-center text-sm text-muted-foreground">
                                Cargando más productos...
                              </div>
                            )}
                            {!paginacionProductos.hayMas && productosCargados.length > 0 && (
                              <div className="p-2 text-center text-xs text-muted-foreground">
                                No hay más productos
                              </div>
                            )}
                          </div>
                        </SelectContent>
                      </Select>
                    </TableCell>
                    <TableCell className="border-r border-border p-2 w-[150px]">
                      <Select
                        value={fila.bodega}
                        onValueChange={(value) =>
                          handleCambioCampo(fila.id, "bodega", value)
                        }
                        disabled={loading}
                      >
                        <SelectTrigger className="h-9 w-full">
                          <SelectValue placeholder={loading ? "Cargando..." : "Bodega"} />
                        </SelectTrigger>
                        <SelectContent>
                          {bodegas.map((bod) => (
                            <SelectItem key={bod.id_bodega} value={bod.id_bodega.toString()}>
                              {bod.nombre}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </TableCell>
                    <TableCell className="border-r border-border p-2">
                      <Input
                        type="number"
                        value={fila.cantidad}
                        onChange={(e) =>
                          handleCambioCampo(fila.id, "cantidad", e.target.value)
                        }
                        className="h-9"
                        placeholder="0"
                      />
                    </TableCell>
                    <TableCell className="border-r border-border p-2">
                      <Input
                        type="number"
                        value={fila.valorUnitario}
                        onChange={(e) =>
                          handleCambioCampo(fila.id, "valorUnitario", e.target.value)
                        }
                        className="h-9"
                        placeholder="0"
                      />
                    </TableCell>
                    <TableCell className="border-r border-border p-2">
                      <Input
                        type="number"
                        value={fila.descuento}
                        onChange={(e) =>
                          handleCambioCampo(fila.id, "descuento", e.target.value)
                        }
                        className="h-9"
                        placeholder={descuentoEnPorcentaje ? "0%" : "0"}
                      />
                    </TableCell>
                    <TableCell className="border-r border-border font-medium text-center">
                      ${(() => {
                        const cantidad = parseFloat(fila.cantidad) || 0;
                        const valorUnitario = parseFloat(fila.valorUnitario) || 0;
                        const subtotal = (cantidad * valorUnitario) - (fila.montoDescuento || 0);
                        return subtotal.toLocaleString("es-CO", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
                      })()}
                    </TableCell>
                    <TableCell className="border-r border-border p-2">
                      <Select
                        value={fila.idIva}
                        onValueChange={(value) =>
                          handleCambioCampo(fila.id, "idIva", value)
                        }
                        disabled={loading}
                      >
                        <SelectTrigger className="h-9">
                          <SelectValue placeholder={loading ? "Cargando..." : "IVA"} />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="0">Sin IVA</SelectItem>
                          {ivas.map((iva) => (
                            <SelectItem key={iva.id_iva} value={iva.id_iva.toString()}>
                              {iva.nombre} ({iva.valor}%)
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {fila.idIva && fila.idIva !== "0" && fila.ivaMonto && fila.ivaMonto > 0 && (
                        <div className="text-xs text-muted-foreground mt-1 text-center">
                          ${fila.ivaMonto.toLocaleString("es-CO", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </div>
                      )}
                    </TableCell>
                    <TableCell className="border-r border-border p-2">
                      <Select
                        value={fila.idRetencion}
                        onValueChange={(value) =>
                          handleCambioCampo(fila.id, "idRetencion", value)
                        }
                        disabled={loading}
                      >
                        <SelectTrigger className="h-9">
                          <SelectValue placeholder={loading ? "Cargando..." : "Retención"} />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="0">Sin Retención</SelectItem>
                          {retenciones.map((retencion) => (
                            <SelectItem key={retencion.id_retefuente} value={retencion.id_retefuente.toString()}>
                              {retencion.nombre} ({retencion.valor}%)
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {fila.idRetencion && fila.idRetencion !== "0" && fila.retencionMonto && fila.retencionMonto > 0 && (
                        <div className="text-xs text-muted-foreground mt-1 text-center">
                          ${fila.retencionMonto.toLocaleString("es-CO", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </div>
                      )}
                    </TableCell>
                    <TableCell className="border-r border-border font-medium">
                      ${fila.valorTotal.toLocaleString("es-CO", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </TableCell>
                    <TableCell className="text-center">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEliminarFila(fila.id)}
                        disabled={filas.length === 1}
                        className="h-8 w-8 p-0"
                      >
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
                {/* Fila de totales */}
                <TableRow className="bg-muted/50 font-bold">
                  <TableCell colSpan={4} className="border-r border-border text-right pr-4">
                    TOTAL
                  </TableCell>
                  <TableCell className="border-r border-border font-bold text-center">
                    ${filas.reduce((sum, fila) => {
                      const cantidad = parseFloat(fila.cantidad) || 0;
                      const valorUnitario = parseFloat(fila.valorUnitario) || 0;
                      return sum + (cantidad * valorUnitario);
                    }, 0).toLocaleString("es-CO", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </TableCell>
                  <TableCell className="border-r border-border font-bold text-center">
                    ${filas.reduce((sum, fila) => sum + (fila.montoDescuento || 0), 0).toLocaleString("es-CO", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </TableCell>
                  <TableCell className="border-r border-border font-bold text-center">
                    ${filas.reduce((sum, fila) => {
                      const cantidad = parseFloat(fila.cantidad) || 0;
                      const valorUnitario = parseFloat(fila.valorUnitario) || 0;
                      const subtotal = (cantidad * valorUnitario) - (fila.montoDescuento || 0);
                      return sum + subtotal;
                    }, 0).toLocaleString("es-CO", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </TableCell>
                  <TableCell className="border-r border-border font-bold text-center">
                    ${filas.reduce((sum, fila) => sum + (fila.ivaMonto || 0), 0).toLocaleString("es-CO", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </TableCell>
                  <TableCell className="border-r border-border font-bold text-center">
                    ${filas.reduce((sum, fila) => sum + (fila.retencionMonto || 0), 0).toLocaleString("es-CO", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </TableCell>
                  <TableCell className="border-r border-border font-bold text-lg text-center">
                    ${filas.reduce((sum, fila) => sum + fila.valorTotal, 0).toLocaleString("es-CO", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </PageContainer>
  );
};

export default IngresarFactura;

