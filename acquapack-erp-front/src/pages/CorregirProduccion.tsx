import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Factory, Loader2, Filter, X, Search, Pencil } from "lucide-react";
import PageContainer from "@/components/PageContainer";
import PageTitle from "@/components/PageTitle";
import TableCard from "@/components/TableCard";
import Pagination from "@/components/Pagination";
import { useToast } from "@/hooks/use-toast";
import { API_BASE_URL } from "@/config/api";

interface TipoMaquina {
  id_tipo_maquina: number;
  nombre: string;
  descripcion?: string;
}

interface Turno {
  id_turno: number;
  nombre: string;
  horario?: string;
}

interface Usuario {
  id_usuarios: number;
  nombre: string;
  apellido: string;
  documento: string;
}

interface Producto {
  id_producto: number;
  codigo?: string;
  nombre: string;
  id_grupos_producto?: number;
}

interface MedidaProduccion {
  id_medida: number;
  medida_nombre: string;
  cantidad: number;
}

interface MedidaProduccionDetalle {
  id_produccion_medida: number;
  id_medida: number;
  medida_nombre: string;
  cantidad: number;
}

interface Produccion {
  id_produccion: number;
  id_producto: number;
  id_maquina: number;
  id_usuario: number;
  id_turno: number;
  fecha_hora: string;
  producto_nombre: string;
  producto_codigo?: string;
  maquina_nombre: string;
  tipo_maquina_nombre: string;
  usuario_nombre: string;
  usuario_documento: string;
  turno_nombre: string;
  turno_horario?: string;
  medidas?: MedidaProduccion[];
}

interface ProduccionDetalle extends Omit<Produccion, "medidas"> {
  medidas?: MedidaProduccionDetalle[];
}

interface MedidaEdit {
  id_produccion_medida: number;
  cantidad: string;
}

const CorregirProduccion = () => {
  const { toast } = useToast();
  const [tiposMaquina, setTiposMaquina] = useState<TipoMaquina[]>([]);
  const [turnos, setTurnos] = useState<Turno[]>([]);
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [productos, setProductos] = useState<Producto[]>([]);
  const [productosFiltrados, setProductosFiltrados] = useState<Producto[]>([]);
  const [busquedaProducto, setBusquedaProducto] = useState("");
  const [producciones, setProducciones] = useState<Produccion[]>([]);

  const [dialogOpen, setDialogOpen] = useState(false);
  const [produccionSeleccionada, setProduccionSeleccionada] = useState<ProduccionDetalle | null>(null);
  const [medidasEdit, setMedidasEdit] = useState<MedidaEdit[]>([]);
  const [productoIdEdit, setProductoIdEdit] = useState<number | null>(null);
  const [loadingGuardar, setLoadingGuardar] = useState(false);
  const [loadingDetalle, setLoadingDetalle] = useState(false);

  // Estados de selección y filtros
  const [tipoMaquinaSeleccionado, setTipoMaquinaSeleccionado] = useState<number | null>(null);
  const [filtroFechaDesde, setFiltroFechaDesde] = useState("");
  const [filtroFechaHasta, setFiltroFechaHasta] = useState("");
  const [filtroTurno, setFiltroTurno] = useState("");
  const [filtroUsuario, setFiltroUsuario] = useState("");
  const [filtroProducto, setFiltroProducto] = useState("");

  // Estados de paginación
  const [pagina, setPagina] = useState(1);
  const [paginacion, setPaginacion] = useState({
    paginaActual: 1,
    totalPaginas: 1,
    totalRegistros: 0,
    limite: 50,
    hasNextPage: false,
    hasPrevPage: false
  });

  const [loading, setLoading] = useState(true);
  const [loadingProducciones, setLoadingProducciones] = useState(false);

  // Cargar catálogos iniciales
  useEffect(() => {
    const cargarCatalogos = async () => {
      try {
        setLoading(true);
        const tiposResponse = await fetch(`${API_BASE_URL}/api/configuracion-produccion/tipo-maquina`);
        const tiposData = await tiposResponse.json();
        if (tiposData.success) setTiposMaquina(tiposData.tiposMaquina || []);

        const turnosResponse = await fetch(`${API_BASE_URL}/api/produccion/turnos`);
        const turnosData = await turnosResponse.json();
        if (turnosData.success) setTurnos(turnosData.turnos || []);

        const usuariosResponse = await fetch(`${API_BASE_URL}/api/produccion/usuarios`);
        const usuariosData = await usuariosResponse.json();
        if (usuariosData.success) setUsuarios(usuariosData.usuarios || []);
      } catch (error) {
        console.error("Error al cargar catálogos:", error);
        toast({ title: "Error", description: "No se pudieron cargar los catálogos", variant: "destructive" });
      } finally {
        setLoading(false);
      }
    };
    cargarCatalogos();
  }, [toast]);

  const getGrupoProductoPorTipoMaquina = (nombreTipo: string): number | null => {
    const nombreLower = nombreTipo.toLowerCase();
    if (nombreLower.includes("peletizadora")) return 20;
    if (nombreLower.includes("aglutinadora")) return 21;
    if (nombreLower.includes("extrusora")) return 15;
    return null;
  };

  useEffect(() => {
    const cargarProductos = async () => {
      if (!tipoMaquinaSeleccionado) {
        setProductos([]);
        setProductosFiltrados([]);
        return;
      }
      try {
        const tipoSeleccionado = tiposMaquina.find(t => t.id_tipo_maquina === tipoMaquinaSeleccionado);
        const idGrupoProducto = getGrupoProductoPorTipoMaquina(tipoSeleccionado?.nombre || "");
        if (!idGrupoProducto) {
          setProductos([]);
          setProductosFiltrados([]);
          return;
        }
        const response = await fetch(`${API_BASE_URL}/api/produccion/productos?id_grupo_producto=${idGrupoProducto}`);
        const data = await response.json();
        if (data.success) {
          setProductos(data.productos || []);
          setProductosFiltrados(data.productos || []);
        }
      } catch (error) {
        toast({ title: "Error", description: "No se pudieron cargar los productos", variant: "destructive" });
      }
    };
    cargarProductos();
  }, [tipoMaquinaSeleccionado, tiposMaquina, toast]);

  const aplicarFiltros = async (paginaActual: number = 1) => {
    if (!tipoMaquinaSeleccionado) {
      toast({ title: "Error", description: "Por favor seleccione un tipo de máquina", variant: "destructive" });
      return;
    }
    try {
      setLoadingProducciones(true);
      setPagina(paginaActual);
      const params = new URLSearchParams();
      params.append("id_tipo_maquina", tipoMaquinaSeleccionado.toString());
      params.append("pagina", paginaActual.toString());
      params.append("limite", "50");
      if (filtroFechaDesde?.trim()) params.append("fecha_desde", filtroFechaDesde);
      if (filtroFechaHasta?.trim()) params.append("fecha_hasta", filtroFechaHasta);
      if (filtroTurno && filtroTurno !== "none") params.append("id_turno", filtroTurno);
      if (filtroUsuario && filtroUsuario !== "none") params.append("id_usuario", filtroUsuario);
      if (filtroProducto && filtroProducto !== "none") params.append("id_producto", filtroProducto);

      const response = await fetch(`${API_BASE_URL}/api/produccion/filtradas?${params.toString()}`);
      if (!response.ok) throw new Error(`Error ${response.status}`);
      const data = await response.json();
      if (data.success) {
        setProducciones(data.producciones || []);
        if (data.paginacion) setPaginacion(data.paginacion);
        toast({ title: "Éxito", description: `Se encontraron ${data.paginacion?.totalRegistros || 0} registros` });
      } else throw new Error(data.message || "Error al obtener producciones");
    } catch (error) {
      toast({ title: "Error", description: error instanceof Error ? error.message : "No se pudieron obtener las producciones", variant: "destructive" });
      setProducciones([]);
      setPaginacion({ paginaActual: 1, totalPaginas: 1, totalRegistros: 0, limite: 50, hasNextPage: false, hasPrevPage: false });
    } finally {
      setLoadingProducciones(false);
    }
  };

  const handlePageChange = (nuevaPagina: number) => aplicarFiltros(nuevaPagina);

  const limpiarFiltros = () => {
    setFiltroFechaDesde("");
    setFiltroFechaHasta("");
    setFiltroTurno("");
    setFiltroUsuario("");
    setFiltroProducto("");
    setBusquedaProducto("");
    setProducciones([]);
  };

  const tieneFiltrosActivos = filtroFechaDesde || filtroFechaHasta || filtroTurno || filtroUsuario || filtroProducto;

  const formatearFecha = (fecha: string) => {
    try {
      return new Date(fecha).toLocaleString("es-CO", { year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit" });
    } catch {
      return fecha;
    }
  };

  const esExtrusora = () => {
    if (!tipoMaquinaSeleccionado) return false;
    const tipo = tiposMaquina.find(t => t.id_tipo_maquina === tipoMaquinaSeleccionado);
    return tipo?.nombre.toLowerCase().includes("extrusora") || false;
  };

  const obtenerValorMedida = (produccion: Produccion, idMedida: number): number => {
    if (!produccion.medidas?.length) return 0;
    const medida = produccion.medidas.find(m => m.id_medida === idMedida);
    return medida ? parseFloat(medida.cantidad.toString()) : 0;
  };

  const calcularTotales = () => {
    const totalKilos = producciones.reduce((sum, p) => sum + obtenerValorMedida(p, 5), 0);
    const totalMetros = esExtrusora() ? producciones.reduce((sum, p) => sum + obtenerValorMedida(p, 2), 0) : 0;
    return { totalKilos, totalMetros };
  };

  const totales = calcularTotales();

  const obtenerHeaders = () => {
    const base = ["ID", "Fecha y Hora", "Producto", "Máquina", "Usuario", "Turno"];
    if (esExtrusora()) return [...base, "Kilos", "Metros", "Acciones"];
    return [...base, "Kilos", "Acciones"];
  };

  const abrirCorregir = async (produccion: Produccion) => {
    try {
      setLoadingDetalle(true);
      const response = await fetch(`${API_BASE_URL}/api/produccion/${produccion.id_produccion}`);
      const data = await response.json();
      if (!response.ok || !data.success) throw new Error(data.message || "Error al cargar detalle");
      const prod: ProduccionDetalle = data.produccion;
      setProduccionSeleccionada(prod);
      setProductoIdEdit(prod.id_producto ?? null);
      setMedidasEdit((prod.medidas || []).map((m: MedidaProduccionDetalle) => ({
        id_produccion_medida: m.id_produccion_medida,
        cantidad: String(m.cantidad ?? "")
      })));
      setDialogOpen(true);
    } catch (error) {
      toast({ title: "Error", description: error instanceof Error ? error.message : "No se pudo cargar la producción", variant: "destructive" });
    } finally {
      setLoadingDetalle(false);
    }
  };

  const actualizarMedida = (idProduccionMedida: number, cantidad: string) => {
    setMedidasEdit(prev => prev.map(m => m.id_produccion_medida === idProduccionMedida ? { ...m, cantidad } : m));
  };

  const guardarCorreccion = async () => {
    if (!produccionSeleccionada) return;
    try {
      setLoadingGuardar(true);
      const response = await fetch(`${API_BASE_URL}/api/produccion/${produccionSeleccionada.id_produccion}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id_producto: productoIdEdit ?? produccionSeleccionada.id_producto,
          medidas: medidasEdit.map(m => ({ id_produccion_medida: m.id_produccion_medida, cantidad: parseFloat(m.cantidad) || 0 }))
        })
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Error al guardar");
      toast({ title: "Éxito", description: "Producción actualizada correctamente" });
      setDialogOpen(false);
      setProduccionSeleccionada(null);
      aplicarFiltros(pagina);
    } catch (error) {
      toast({ title: "Error", description: error instanceof Error ? error.message : "Error al guardar", variant: "destructive" });
    } finally {
      setLoadingGuardar(false);
    }
  };

  const getMedidaNombre = (idPm: number) => {
    return produccionSeleccionada?.medidas?.find(m => m.id_produccion_medida === idPm)?.medida_nombre ?? "";
  };

  return (
    <PageContainer>
      <PageTitle title="Corregir Producción" />

      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-lg">Seleccione el Tipo de Máquina</CardTitle>
          <CardDescription>
            Seleccione el tipo de máquina, aplique filtros y use "Corregir" para modificar kilogramos, metros u otras medidas.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {tiposMaquina.map((tipo) => (
              <Button
                key={tipo.id_tipo_maquina}
                variant={tipoMaquinaSeleccionado === tipo.id_tipo_maquina ? "default" : "outline"}
                size="lg"
                className="h-24 text-base font-semibold flex flex-col items-center justify-center gap-2"
                onClick={() => {
                  setTipoMaquinaSeleccionado(tipo.id_tipo_maquina);
                  setProducciones([]);
                  setPagina(1);
                  setPaginacion({ paginaActual: 1, totalPaginas: 1, totalRegistros: 0, limite: 50, hasNextPage: false, hasPrevPage: false });
                }}
                disabled={loading}
              >
                <Factory className="h-6 w-6" />
                {tipo.nombre}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {tipoMaquinaSeleccionado && (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Filter className="h-5 w-5" />
              Filtros de Búsqueda
            </CardTitle>
            <CardDescription>Aplique filtros para buscar registros y corregir datos.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              <div className="space-y-2">
                <Label htmlFor="fecha-desde">Fecha Desde</Label>
                <Input id="fecha-desde" type="date" value={filtroFechaDesde} onChange={(e) => setFiltroFechaDesde(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="fecha-hasta">Fecha Hasta</Label>
                <Input id="fecha-hasta" type="date" value={filtroFechaHasta} onChange={(e) => setFiltroFechaHasta(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="turno">Turno</Label>
                <Select value={filtroTurno || "none"} onValueChange={(v) => setFiltroTurno(v === "none" ? "" : v)}>
                  <SelectTrigger id="turno"><SelectValue placeholder="Todos los turnos" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">Todos los turnos</SelectItem>
                    {turnos.map((t) => <SelectItem key={t.id_turno} value={t.id_turno.toString()}>{t.nombre}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="usuario">Usuario</Label>
                <Select value={filtroUsuario || "none"} onValueChange={(v) => setFiltroUsuario(v === "none" ? "" : v)}>
                  <SelectTrigger id="usuario"><SelectValue placeholder="Todos" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">Todos</SelectItem>
                    {usuarios.map((u) => <SelectItem key={u.id_usuarios} value={u.id_usuarios.toString()}>{u.nombre} {u.apellido}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="producto">Producto</Label>
                <Select value={filtroProducto || "none"} onValueChange={(v) => { setFiltroProducto(v === "none" ? "" : v); setBusquedaProducto(""); }}>
                  <SelectTrigger id="producto"><SelectValue placeholder="Todos" /></SelectTrigger>
                  <SelectContent>
                    <div className="p-2 border-b">
                      <div className="relative">
                        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input placeholder="Buscar..." value={busquedaProducto} onChange={(e) => setBusquedaProducto(e.target.value)} className="pl-8 h-9" onClick={(e) => e.stopPropagation()} onKeyDown={(e) => e.stopPropagation()} />
                      </div>
                    </div>
                    <SelectItem value="none">Todos</SelectItem>
                    {productosFiltrados.map((p) => <SelectItem key={p.id_producto} value={p.id_producto.toString()}>{p.nombre} {p.codigo && `(${p.codigo})`}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex gap-2 mt-4">
              <Button onClick={() => aplicarFiltros(1)} disabled={loadingProducciones || !tipoMaquinaSeleccionado} className="flex-1">
                {loadingProducciones ? <><Loader2 className="h-4 w-4 mr-2 animate-spin" /> Buscando...</> : <><Filter className="h-4 w-4 mr-2" /> Aplicar Filtros</>}
              </Button>
              {tieneFiltrosActivos && <Button variant="outline" onClick={limpiarFiltros} disabled={loadingProducciones}><X className="h-4 w-4 mr-2" /> Limpiar</Button>}
            </div>
          </CardContent>
        </Card>
      )}

      {tipoMaquinaSeleccionado && (
        <React.Fragment>
          <TableCard
            headers={obtenerHeaders()}
            emptyMessage={loadingProducciones ? "Buscando..." : producciones.length === 0 ? "No hay registros. Aplique filtros." : undefined}
            colSpan={obtenerHeaders().length}
          >
            {producciones.map((produccion) => (
              <TableRow key={produccion.id_produccion}>
                <TableCell className="font-medium">{produccion.id_produccion}</TableCell>
                <TableCell>{formatearFecha(produccion.fecha_hora)}</TableCell>
                <TableCell><div className="font-medium">{produccion.producto_nombre}</div>{produccion.producto_codigo && <div className="text-sm text-muted-foreground">Cód: {produccion.producto_codigo}</div>}</TableCell>
                <TableCell><div className="font-medium">{produccion.maquina_nombre}</div><div className="text-sm text-muted-foreground">{produccion.tipo_maquina_nombre}</div></TableCell>
                <TableCell><div className="font-medium">{produccion.usuario_nombre}</div><div className="text-sm text-muted-foreground">Doc: {produccion.usuario_documento}</div></TableCell>
                <TableCell><div className="font-medium">{produccion.turno_nombre}</div>{produccion.turno_horario && <div className="text-sm text-muted-foreground">{produccion.turno_horario}</div>}</TableCell>
                <TableCell className="text-right">{obtenerValorMedida(produccion, 5).toLocaleString("es-CO", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</TableCell>
                {esExtrusora() && <TableCell className="text-right">{obtenerValorMedida(produccion, 2).toLocaleString("es-CO", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</TableCell>}
                <TableCell>
                  <Button variant="outline" size="sm" onClick={() => abrirCorregir(produccion)} disabled={loadingDetalle}>
                    <Pencil className="h-4 w-4 mr-1" /> Corregir
                  </Button>
                </TableCell>
              </TableRow>
            ))}
            {producciones.length > 0 && (
              <TableRow className="bg-muted/50 font-bold border-t-2 border-border">
                <TableCell colSpan={6} className="text-right border-r border-border"><span className="text-base">TOTALES:</span></TableCell>
                <TableCell className="text-right border-r border-border font-semibold">{totales.totalKilos.toLocaleString("es-CO", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</TableCell>
                {esExtrusora() && <TableCell className="text-right border-r border-border font-semibold">{totales.totalMetros.toLocaleString("es-CO", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</TableCell>}
                <TableCell></TableCell>
              </TableRow>
            )}
          </TableCard>
          {producciones.length > 0 && (
            <div className="mt-4">
              <Pagination paginaActual={paginacion.paginaActual} totalPaginas={paginacion.totalPaginas} onPageChange={handlePageChange} />
              <div className="text-center text-sm text-muted-foreground mt-2">Mostrando {producciones.length} de {paginacion.totalRegistros} registros</div>
            </div>
          )}
        </React.Fragment>
      )}

      {!tipoMaquinaSeleccionado && (
        <Card><CardContent className="py-8"><p className="text-center text-muted-foreground">Seleccione un tipo de máquina para corregir producción</p></CardContent></Card>
      )}

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Corregir producción #{produccionSeleccionada?.id_produccion}</DialogTitle>
          </DialogHeader>
          {produccionSeleccionada && (
            <div className="space-y-4">
              <div className="text-sm text-muted-foreground space-y-1">
                <p><span className="font-medium">Fecha:</span> {formatearFecha(produccionSeleccionada.fecha_hora)}</p>
                <p><span className="font-medium">Máquina:</span> {produccionSeleccionada.maquina_nombre}</p>
                <p><span className="font-medium">Usuario:</span> {produccionSeleccionada.usuario_nombre}</p>
                <p><span className="font-medium">Turno:</span> {produccionSeleccionada.turno_nombre}</p>
              </div>
              <div className="space-y-2">
                <Label>Producto</Label>
                <Select
                  value={productoIdEdit != null ? String(productoIdEdit) : ""}
                  onValueChange={(v) => setProductoIdEdit(v ? parseInt(v, 10) : null)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccione producto" />
                  </SelectTrigger>
                  <SelectContent>
                    {(productosFiltrados.length ? productosFiltrados : productos).map((p) => (
                      <SelectItem key={p.id_producto} value={String(p.id_producto)}>
                        {p.nombre} {p.codigo ? `(${p.codigo})` : ""}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-3">
                <p className="font-medium">Modificar medidas (Kilos, Metros, etc.)</p>
                {medidasEdit.map((m) => (
                  <div key={m.id_produccion_medida} className="flex items-center gap-2">
                    <Label className="min-w-[80px]">{getMedidaNombre(m.id_produccion_medida)}</Label>
                    <Input
                      type="number"
                      step="0.01"
                      value={m.cantidad}
                      onChange={(e) => actualizarMedida(m.id_produccion_medida, e.target.value)}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)} disabled={loadingGuardar}>Cancelar</Button>
            <Button onClick={guardarCorreccion} disabled={loadingGuardar}>
              {loadingGuardar ? <><Loader2 className="h-4 w-4 mr-2 animate-spin" /> Guardando...</> : "Guardar"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </PageContainer>
  );
};

export default CorregirProduccion;
