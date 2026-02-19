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
import { BodegaSelect } from "@/components/BodegaSelect";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Trash2, Plus, Search, Save } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { API_BASE_URL } from "@/config/api";

// Interfaces desde la BD
interface Producto {
  id_producto: number;
  codigo: string;
  nombre: string;
  stock_disponible?: number;
}

interface Bodega {
  id_bodega: number;
  nombre: string;
}

interface Cliente {
  id_cliente: number;
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

interface FilaVenta {
  id: number;
  productoCodigo: string;
  productoNombre: string;
  idProducto?: number;
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

const VentaProducto = () => {
  const { toast } = useToast();
  const [salidaId, setSalidaId] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [guardando, setGuardando] = useState(false);
  const [fechaElaboracion, setFechaElaboracion] = useState(new Date().toISOString().split("T")[0]);
  const [cliente, setCliente] = useState("");
  const [observaciones, setObservaciones] = useState("");
  const [descuentoEnPorcentaje, setDescuentoEnPorcentaje] = useState(false);
  
  // Obtener usuario logueado
  const [usuarioLogueado, setUsuarioLogueado] = useState<{ id_usuarios: number } | null>(null);
  
  // Datos desde la BD
  const [bodegas, setBodegas] = useState<Bodega[]>([]);
  const [ivas, setIvas] = useState<Iva[]>([]);
  const [retenciones, setRetenciones] = useState<Retencion[]>([]);
  
  // Estados para búsqueda y paginación de productos por fila
  const [busquedaProductos, setBusquedaProductos] = useState<Map<number, string>>(new Map());
  const [productosPorFila, setProductosPorFila] = useState<Map<number, Producto[]>>(new Map());
  const [paginacionPorFila, setPaginacionPorFila] = useState<Map<number, {
    paginaActual: number;
    totalPaginas: number;
    hayMas: boolean;
    cargando: boolean;
  }>>(new Map());
  const [timeoutBusqueda, setTimeoutBusqueda] = useState<Map<number, NodeJS.Timeout>>(new Map());
  
  // Estados para búsqueda y paginación de clientes
  const [busquedaCliente, setBusquedaCliente] = useState("");
  const [clientesCargados, setClientesCargados] = useState<Cliente[]>([]);
  const [paginacionClientes, setPaginacionClientes] = useState({
    paginaActual: 1,
    totalPaginas: 1,
    hayMas: false,
    cargando: false
  });
  const [timeoutBusquedaCliente, setTimeoutBusquedaCliente] = useState<NodeJS.Timeout | null>(null);
  
  const [defaultIvaId, setDefaultIvaId] = useState("0");
  const [defaultRetencionId, setDefaultRetencionId] = useState("0");
  const [filas, setFilas] = useState<FilaVenta[]>([
    {
      id: 1,
      productoCodigo: "",
      productoNombre: "",
      idProducto: undefined,
      bodega: "",
      cantidad: "",
      valorUnitario: "",
      descuento: "",
      idIva: "",
      idRetencion: "",
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
        const [salidaRes, bodegasRes, ivasRes, retencionesRes, clientesPaginadosRes] = await Promise.all([
          fetch(`${API_BASE_URL}/api/ventas/siguiente-id-salida`),
          fetch(`${API_BASE_URL}/api/ventas/bodegas`),
          fetch(`${API_BASE_URL}/api/ventas/ivas`),
          fetch(`${API_BASE_URL}/api/ventas/retenciones`),
          fetch(`${API_BASE_URL}/api/ventas/clientes/buscar?page=1&limit=50`) // Carga inicial de clientes paginados
        ]);

        const salidaData = await salidaRes.json();
        const bodegasData = await bodegasRes.json();
        const ivasData = await ivasRes.json();
        const retencionesData = await retencionesRes.json();
        const clientesPaginadosData = await clientesPaginadosRes.json();

        if (salidaData.success) {
          setSalidaId(salidaData.siguienteId);
        }
        // Cargar clientes paginados inicialmente
        if (clientesPaginadosData.success) {
          setClientesCargados(clientesPaginadosData.clientes || []);
          setPaginacionClientes({
            paginaActual: clientesPaginadosData.paginacion?.paginaActual || 1,
            totalPaginas: clientesPaginadosData.paginacion?.totalPaginas || 1,
            hayMas: clientesPaginadosData.paginacion?.hayMas || false,
            cargando: false
          });
        }
        if (bodegasData.success) {
          setBodegas(bodegasData.bodegas);
        }
        if (ivasData.success) {
          setIvas(ivasData.ivas);
          const ivaExento = ivasData.ivas.find((i: Iva) => i.valor === 0 || i.nombre.toLowerCase().includes("exento"));
          if (ivaExento) {
            setDefaultIvaId(ivaExento.id_iva.toString());
            // Actualizar la fila inicial con el IVA por defecto
            setFilas(prev => prev.map(f => f.id === 1 ? { ...f, idIva: ivaExento.id_iva.toString() } : f));
          }
        }
        if (retencionesData.success) {
          setRetenciones(retencionesData.retenciones);
          const retencionNoAplica = retencionesData.retenciones.find((r: Retencion) => r.valor === 0 || r.nombre.toLowerCase().includes("no aplica"));
          if (retencionNoAplica) {
            setDefaultRetencionId(retencionNoAplica.id_retefuente.toString());
            // Actualizar la fila inicial con la Retención por defecto
            setFilas(prev => prev.map(f => f.id === 1 ? { ...f, idRetencion: retencionNoAplica.id_retefuente.toString() } : f));
          }
        }
      } catch (error) {
        console.error("Error al cargar datos:", error);
        toast({
          title: "Error",
          description: "Error al cargar los datos iniciales",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    cargarDatos();

    return () => {
      // Limpiar todos los timeouts
      timeoutBusqueda.forEach((timeout) => clearTimeout(timeout));
      if (timeoutBusquedaCliente) {
        clearTimeout(timeoutBusquedaCliente);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Función para buscar clientes
  const buscarClientes = async (busqueda: string) => {
    // Limpiar timeout anterior
    if (timeoutBusquedaCliente) {
      clearTimeout(timeoutBusquedaCliente);
    }

    // Crear nuevo timeout para debounce (500ms)
    const nuevoTimeout = setTimeout(async () => {
      try {
        setPaginacionClientes(prev => ({ ...prev, cargando: true }));
        const url = `${API_BASE_URL}/api/ventas/clientes/buscar?page=1&limit=50${busqueda ? `&busqueda=${encodeURIComponent(busqueda)}` : ""}`;
        
        const response = await fetch(url);
        const data = await response.json();

        if (data.success) {
          setClientesCargados(data.clientes || []);
          setPaginacionClientes({
            paginaActual: data.paginacion?.paginaActual || 1,
            totalPaginas: data.paginacion?.totalPaginas || 1,
            hayMas: data.paginacion?.hayMas || false,
            cargando: false
          });
        }
      } catch (error) {
        console.error("Error al buscar clientes:", error);
        setPaginacionClientes(prev => ({ ...prev, cargando: false }));
      }
    }, 500);

    setTimeoutBusquedaCliente(nuevoTimeout);
  };

  // Función para cargar más clientes
  const cargarMasClientes = async (busqueda: string) => {
    if (paginacionClientes.cargando || !paginacionClientes.hayMas) return;

    try {
      setPaginacionClientes(prev => ({ ...prev, cargando: true }));
      const siguientePagina = paginacionClientes.paginaActual + 1;
      const url = `${API_BASE_URL}/api/ventas/clientes/buscar?page=${siguientePagina}&limit=50${busqueda ? `&busqueda=${encodeURIComponent(busqueda)}` : ""}`;
      
      const response = await fetch(url);
      const data = await response.json();

      if (data.success) {
        setClientesCargados(prev => [...prev, ...(data.clientes || [])]);
        setPaginacionClientes({
          paginaActual: data.paginacion?.paginaActual || siguientePagina,
          totalPaginas: data.paginacion?.totalPaginas || 1,
          hayMas: data.paginacion?.hayMas || false,
          cargando: false
        });
      }
    } catch (error) {
      console.error("Error al cargar más clientes:", error);
      setPaginacionClientes(prev => ({ ...prev, cargando: false }));
    }
  };

  // Función para cargar productos de una bodega específica para una fila
  const cargarProductosPorFila = async (filaId: number, idBodega: string, busqueda: string = "") => {
    if (!idBodega) {
      const nuevo = new Map(productosPorFila);
      nuevo.delete(filaId);
      setProductosPorFila(nuevo);
      return;
    }

    try {
      const nuevoPaginacion = new Map(paginacionPorFila);
      nuevoPaginacion.set(filaId, {
        paginaActual: 1,
        totalPaginas: 1,
        hayMas: false,
        cargando: true
      });
      setPaginacionPorFila(nuevoPaginacion);

      const url = `${API_BASE_URL}/api/ventas/productos?id_bodega=${idBodega}&page=1&limit=50${busqueda ? `&busqueda=${encodeURIComponent(busqueda)}` : ""}`;
      const response = await fetch(url);
      const data = await response.json();

      if (data.success) {
        const nuevo = new Map(productosPorFila);
        nuevo.set(filaId, data.productos || []);
        setProductosPorFila(nuevo);

        nuevoPaginacion.set(filaId, {
          paginaActual: data.paginacion?.page || 1,
          totalPaginas: data.paginacion?.totalPages || 1,
          hayMas: (data.paginacion?.page || 1) < (data.paginacion?.totalPages || 1),
          cargando: false
        });
        setPaginacionPorFila(nuevoPaginacion);
      }
    } catch (error) {
      console.error("Error al cargar productos:", error);
      const nuevoPaginacion = new Map(paginacionPorFila);
      nuevoPaginacion.set(filaId, {
        paginaActual: 1,
        totalPaginas: 1,
        hayMas: false,
        cargando: false
      });
      setPaginacionPorFila(nuevoPaginacion);
    }
  };

  // Función para buscar productos con debounce por fila
  const buscarProductos = async (filaId: number, busqueda: string) => {
    const fila = filas.find(f => f.id === filaId);
    if (!fila || !fila.bodega) return;

    // Limpiar timeout anterior de esta fila
    const timeoutAnterior = timeoutBusqueda.get(filaId);
    if (timeoutAnterior) {
      clearTimeout(timeoutAnterior);
    }

    // Crear nuevo timeout para debounce (500ms)
    const nuevoTimeout = setTimeout(async () => {
      await cargarProductosPorFila(filaId, fila.bodega, busqueda);
    }, 500);

    const nuevo = new Map(timeoutBusqueda);
    nuevo.set(filaId, nuevoTimeout);
    setTimeoutBusqueda(nuevo);
  };

  // Calcular valor total de una fila y obtener desglose
  const calcularValorTotal = async (fila: FilaVenta): Promise<{ valorTotal: number; ivaMonto: number; retencionMonto: number; montoDescuento: number; porcentajeIva: number; porcentajeRetencion: number }> => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/ventas/calcular-valor-total`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          cantidad: parseFloat(fila.cantidad) || 0,
          valorUnitario: parseFloat(fila.valorUnitario) || 0,
          descuento: parseFloat(fila.descuento) || 0,
          descuentoEnPorcentaje: descuentoEnPorcentaje,
          idIva: fila.idIva ? parseInt(fila.idIva) : null,
          idRetencion: fila.idRetencion ? parseInt(fila.idRetencion) : null,
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
  const calcularValorTotalLocal = (fila: FilaVenta): { valorTotal: number; ivaMonto: number; retencionMonto: number; montoDescuento: number; porcentajeIva: number; porcentajeRetencion: number } => {        
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
    if (fila.idIva) {
      const ivaSeleccionado = ivas.find(i => i.id_iva.toString() === fila.idIva);
      if (ivaSeleccionado) {
        porcentajeIva = parseFloat(ivaSeleccionado.valor.toString()) || 0;
        ivaMonto = (subtotalDespuesDescuento * porcentajeIva) / 100;
        subtotal = subtotal + ivaMonto;
      }
    }

    let retencionMonto = 0;
    let porcentajeRetencion = 0;
    if (fila.idRetencion) {
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
        idIva: defaultIvaId,
        idRetencion: defaultRetencionId,
        valorTotal: 0,
      },
    ]);
  };

  const handleEliminarFila = (id: number) => {
    if (filas.length > 1) {
      setFilas(filas.filter((fila) => fila.id !== id));
    }
  };

  const handleCambioProducto = async (id: number, codigo: string) => {
    const fila = filas.find((f) => f.id === id);
    if (!fila || !fila.bodega) {
      toast({
        title: "Advertencia",
        description: "Debe seleccionar una bodega primero",
        variant: "destructive",
      });
      return;
    }

    const productosFila = productosPorFila.get(id) || [];
    let producto = productosFila.find((p) => p.codigo === codigo);
    
    if (!producto) {
      try {
        const response = await fetch(`${API_BASE_URL}/api/ventas/productos?id_bodega=${fila.bodega}&page=1&limit=1&busqueda=${encodeURIComponent(codigo)}`);
        const data = await response.json();
        if (data.success && data.productos && data.productos.length > 0) {
          producto = data.productos.find((p: Producto) => p.codigo === codigo);
        }
      } catch (error) {
        console.error("Error al buscar producto:", error);
      }
    }
    
    const nuevaFila = {
      ...fila,
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

  // Función para formatear número con puntos (solo visual) - formato colombiano
  const formatearNumeroVisual = (valor: string): string => {
    if (!valor || valor === "") return "";
    // Remover todo excepto números, punto y coma
    const soloNumeros = valor.replace(/[^\d.,]/g, "");
    // Si está vacío, retornar vacío
    if (soloNumeros === "" || soloNumeros === "." || soloNumeros === ",") return soloNumeros;
    
    // Normalizar: convertir coma a punto para procesamiento
    const normalizado = soloNumeros.replace(/,/g, ".");
    // Separar parte entera y decimal
    const partes = normalizado.split(".");
    let parteEntera = partes[0] || "";
    const parteDecimal = partes[1] !== undefined ? "," + partes[1].slice(0, 2) : "";
    
    // Agregar puntos cada 3 dígitos en la parte entera
    parteEntera = parteEntera.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    
    return parteEntera + parteDecimal;
  };

  // Función para desformatear número (quitar puntos para guardar) - convertir a formato estándar
  const desformatearNumero = (valor: string): string => {
    if (!valor || valor === "") return "";
    // Remover puntos de miles, convertir coma decimal a punto
    return valor.replace(/\./g, "").replace(/,/g, ".");
  };

  const handleCambioCampo = async (
    id: number,
    campo: keyof FilaVenta,
    valor: string | boolean
  ) => {
    // Si es valorUnitario o descuento, desformatear para guardar (quitar puntos)
    let valorParaGuardar: string | boolean = valor;
    if ((campo === "valorUnitario" || campo === "descuento") && typeof valor === "string") {
      // Desformatear para guardar (quitar puntos)
      valorParaGuardar = desformatearNumero(valor);
    }
    
    // Actualizar el valor inmediatamente usando la forma funcional de setState
    setFilas((filasAnteriores) => {
      const filaActual = filasAnteriores.find((f) => f.id === id);
      if (!filaActual) return filasAnteriores;
      
      const nuevaFila = { ...filaActual, [campo]: valorParaGuardar };
      
      // Si cambió la bodega, cargar productos de esa bodega y limpiar producto seleccionado
      if (campo === "bodega" && typeof valor === "string") {
        nuevaFila.productoCodigo = "";
        nuevaFila.productoNombre = "";
        nuevaFila.idProducto = undefined;
        cargarProductosPorFila(id, valor);
      }
      
      // Si es cantidad, valorUnitario, descuento, idIva o idRetencion, calcular de forma asíncrona después
      if (campo === "cantidad" || campo === "valorUnitario" || campo === "descuento" || campo === "idIva" || campo === "idRetencion") {
        // Calcular de forma asíncrona sin bloquear la actualización del input
        calcularValorTotal(nuevaFila).then((calculo) => {
          setFilas((filasActuales) =>
            filasActuales.map((fila) => {
              if (fila.id === id) {
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
        }).catch((error) => {
          console.error("Error al calcular valor total:", error);
        });
      }
      
      // Retornar la fila actualizada inmediatamente (sin esperar el cálculo)
      return filasAnteriores.map((fila) => {
        if (fila.id === id) {
          return nuevaFila;
        }
        return fila;
      });
    });
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

  // Función para guardar la salida
  const handleGuardarSalida = async () => {
    // Validaciones
    if (!usuarioLogueado?.id_usuarios) {
      toast({
        title: "Error",
        description: "No se encontró el usuario logueado. Por favor, inicie sesión nuevamente.",
        variant: "destructive",
      });
      return;
    }

    if (!fechaElaboracion) {
      toast({
        title: "Error",
        description: "La fecha es obligatoria",
        variant: "destructive",
      });
      return;
    }

    if (!cliente) {
      toast({
        title: "Error",
        description: "Debe seleccionar un cliente",
        variant: "destructive",
      });
      return;
    }

    // Validar que todas las filas tengan bodega, producto, cantidad y valor unitario
    const filasInvalidas = filas.filter(
      (f) =>
        !f.bodega ||
        !f.productoCodigo ||
        !f.cantidad ||
        parseFloat(f.cantidad) <= 0 ||
        !f.valorUnitario ||
        parseFloat(f.valorUnitario) <= 0
    );

    if (filasInvalidas.length > 0) {
      toast({
        title: "Error",
        description: "Todas las filas deben tener bodega, producto, cantidad y valor unitario válidos",
        variant: "destructive",
      });
      return;
    }

    try {
      setGuardando(true);

      // Preparar detalles
      const detalles = await Promise.all(
        filas.map(async (fila) => {
          let idProducto = fila.idProducto;
          
          if (!idProducto) {
            const productosFila = productosPorFila.get(fila.id) || [];
            let producto = productosFila.find((p) => p.codigo === fila.productoCodigo);
            
            if (!producto && fila.bodega) {
              try {
                const response = await fetch(`${API_BASE_URL}/api/ventas/productos?id_bodega=${fila.bodega}&page=1&limit=1&busqueda=${encodeURIComponent(fila.productoCodigo)}`);
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
          const montoDescuento = fila.montoDescuento || 0;
          const subtotal = subtotalInicial - montoDescuento;

          return {
            id_producto: idProducto,
            id_bodega: parseInt(fila.bodega),
            cantidad: cantidad,
            precio_unitario: valorUnitario,
            descuento: montoDescuento,
            subtotal: subtotal,
            id_iva: fila.idIva ? parseInt(fila.idIva) : null,
            iva_valor: fila.ivaMonto || 0,
            id_retefuente: fila.idRetencion ? parseInt(fila.idRetencion) : null,
            retefuente_valor: fila.retencionMonto || 0,
            valor_total: fila.valorTotal || 0,
          };
        })
      );

      const response = await fetch(`${API_BASE_URL}/api/ventas/salidas`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id_usuario: usuarioLogueado.id_usuarios,
          fecha_creacion: fechaElaboracion,
          id_cliente: parseInt(cliente),
          observaciones: observaciones || null,
          detalles: detalles,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Error al guardar la salida");
      }

      toast({
        title: "Éxito",
        description: "Venta guardada exitosamente",
      });

      // Recargar el siguiente ID de salida
      const salidaRes = await fetch(`${API_BASE_URL}/api/ventas/siguiente-id-salida`);
      const salidaData = await salidaRes.json();
      if (salidaData.success) {
        setSalidaId(salidaData.siguienteId);
      }

      // Limpiar formulario
      setFechaElaboracion(new Date().toISOString().split("T")[0]);
      setCliente("");
      setObservaciones("");
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
          idIva: defaultIvaId,
          idRetencion: defaultRetencionId,
          valorTotal: 0,
        },
      ]);
      setBusquedaProductos(new Map());
      setProductosPorFila(new Map());
      setPaginacionPorFila(new Map());
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Error al guardar la venta",
        variant: "destructive",
      });
    } finally {
      setGuardando(false);
    }
  };

  return (
    <PageContainer>
      <PageTitle title="Venta de Producto" />

      {/* Formulario principal */}
      <FormCard title="Datos de la Venta">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="space-y-2">
            <Label htmlFor="fechaElaboracion">Fecha de Elaboración</Label>
            <Input
              id="fechaElaboracion"
              type="date"
              value={fechaElaboracion}
              onChange={(e) => setFechaElaboracion(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="cliente">Cliente</Label>
            <Select value={cliente} onValueChange={setCliente} disabled={loading}>
              <SelectTrigger id="cliente">
                <SelectValue placeholder={loading ? "Cargando..." : "Seleccione cliente"} />
              </SelectTrigger>
              <SelectContent>
                <div className="p-2 border-b">
                  <div className="relative">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Buscar cliente..."
                      value={busquedaCliente}
                      onChange={(e) => {
                        const valor = e.target.value;
                        setBusquedaCliente(valor);
                        buscarClientes(valor);
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
                    if (
                      target.scrollTop + target.clientHeight >= target.scrollHeight * 0.8 &&
                      paginacionClientes.hayMas &&
                      !paginacionClientes.cargando
                    ) {
                      cargarMasClientes(busquedaCliente);
                    }
                  }}
                >
                  {clientesCargados.length === 0 && !paginacionClientes.cargando ? (
                    <div className="p-4 text-center text-sm text-muted-foreground">
                      No se encontraron clientes
                    </div>
                  ) : (
                    <>
                      {clientesCargados.map((cli) => (
                        <SelectItem key={cli.id_cliente} value={cli.id_cliente.toString()}>
                          {cli.razon_social || cli.nombre_comercial}
                        </SelectItem>
                      ))}
                      {paginacionClientes.cargando && (
                        <div className="p-2 text-center text-sm text-muted-foreground">
                          Cargando...
                        </div>
                      )}
                    </>
                  )}
                </div>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="salidaId">ID Salida</Label>
            <Input
              id="salidaId"
              type="text"
              value={salidaId ?? "Cargando..."}
              disabled
              className="bg-muted"
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="observaciones">Observaciones</Label>
          <Input
            id="observaciones"
            type="text"
            value={observaciones}
            onChange={(e) => setObservaciones(e.target.value)}
            placeholder="Ingrese observaciones adicionales (opcional)"
          />
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
              onClick={handleGuardarSalida} 
              size="sm" 
              className="flex items-center gap-2"
              disabled={guardando || !usuarioLogueado}
            >
              <Save className="h-4 w-4" />
              {guardando ? "Guardando..." : "Guardar Venta"}
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="border-r border-border w-12">#</TableHead>
                  <TableHead className="border-r border-border w-[150px]">Bodega</TableHead>
                  <TableHead className="border-r border-border w-[300px] min-w-[250px]">Producto</TableHead>
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
                    <TableCell className="border-r border-border p-2 w-[150px]">
                      <BodegaSelect
                        bodegas={bodegas}
                        value={fila.bodega}
                        onValueChange={(value) => handleCambioCampo(fila.id, "bodega", value)}
                        placeholder={loading ? "Cargando..." : "Bodega"}
                        disabled={loading}
                        className="h-9"
                      />
                    </TableCell>
                    <TableCell className="border-r border-border p-2 w-[300px] min-w-[250px]">
                      <Select
                        value={fila.productoCodigo}
                        onValueChange={(value) => handleCambioProducto(fila.id, value)}
                        disabled={loading || !fila.bodega}
                      >
                        <SelectTrigger className="h-9 w-full">
                          <SelectValue placeholder={loading ? "Cargando..." : !fila.bodega ? "Seleccione bodega primero" : "Seleccione producto"}>
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
                          <div className="max-h-[200px] overflow-y-auto">
                            {(productosPorFila.get(fila.id) || []).map((prod) => (
                              <SelectItem key={prod.codigo} value={prod.codigo}>
                                <div className="flex flex-col">
                                  <span className="font-bold text-sm">{prod.nombre}</span>
                                  <span className="text-xs text-muted-foreground">{prod.codigo} - Stock: {prod.stock_disponible || 0}</span>
                                </div>
                              </SelectItem>
                            ))}
                            {paginacionPorFila.get(fila.id)?.cargando && (
                              <div className="p-2 text-center text-sm text-muted-foreground">
                                Cargando productos...
                              </div>
                            )}
                            {!fila.bodega && (
                              <div className="p-2 text-center text-sm text-muted-foreground">
                                Seleccione una bodega primero
                              </div>
                            )}
                            {fila.bodega && (productosPorFila.get(fila.id) || []).length === 0 && !paginacionPorFila.get(fila.id)?.cargando && (
                              <div className="p-2 text-center text-sm text-muted-foreground">
                                No hay productos disponibles
                              </div>
                            )}
                          </div>
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
                        type="text"
                        value={formatearNumeroVisual(fila.valorUnitario)}
                        onChange={(e) =>
                          handleCambioCampo(fila.id, "valorUnitario", e.target.value)
                        }
                        className="h-9"
                        placeholder="0"
                        inputMode="decimal"
                      />
                    </TableCell>
                    <TableCell className="border-r border-border p-2">
                      <Input
                        type="text"
                        value={formatearNumeroVisual(fila.descuento)}
                        onChange={(e) =>
                          handleCambioCampo(fila.id, "descuento", e.target.value)
                        }
                        className="h-9"
                        placeholder={descuentoEnPorcentaje ? "0%" : "0"}
                        inputMode="decimal"
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
                          {ivas.map((iva) => (
                            <SelectItem key={iva.id_iva} value={iva.id_iva.toString()}>
                              {iva.nombre} ({iva.valor}%)
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {fila.idIva && fila.ivaMonto && fila.ivaMonto > 0 && (
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
                          {retenciones.map((retencion) => (
                            <SelectItem key={retencion.id_retefuente} value={retencion.id_retefuente.toString()}>
                              {retencion.nombre} ({retencion.valor}%)
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {fila.idRetencion && fila.retencionMonto && fila.retencionMonto > 0 && (
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

export default VentaProducto;

