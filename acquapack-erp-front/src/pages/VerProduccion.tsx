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
import { Factory, Loader2, Filter, X, Search } from "lucide-react";
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

const VerProduccion = () => {
  const { toast } = useToast();
  const [tiposMaquina, setTiposMaquina] = useState<TipoMaquina[]>([]);
  const [turnos, setTurnos] = useState<Turno[]>([]);
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [productos, setProductos] = useState<Producto[]>([]);
  const [productosFiltrados, setProductosFiltrados] = useState<Producto[]>([]);
  const [busquedaProducto, setBusquedaProducto] = useState("");
  const [producciones, setProducciones] = useState<Produccion[]>([]);
  
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
        
        // Cargar tipos de máquina
        const tiposResponse = await fetch(`${API_BASE_URL}/api/configuracion-produccion/tipo-maquina");
        const tiposData = await tiposResponse.json();
        if (tiposData.success) {
          setTiposMaquina(tiposData.tiposMaquina || []);
        }

        // Cargar turnos
        const turnosResponse = await fetch(`${API_BASE_URL}/api/produccion/turnos");
        const turnosData = await turnosResponse.json();
        if (turnosData.success) {
          setTurnos(turnosData.turnos || []);
        }

        // Cargar usuarios
        const usuariosResponse = await fetch(`${API_BASE_URL}/api/produccion/usuarios");
        const usuariosData = await usuariosResponse.json();
        if (usuariosData.success) {
          setUsuarios(usuariosData.usuarios || []);
        }
      } catch (error) {
        console.error("Error al cargar catálogos:", error);
        toast({
          title: "Error",
          description: "No se pudieron cargar los catálogos",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    cargarCatalogos();
  }, [toast]);

  // Mapeo de tipos de máquina a grupos de productos (igual que en AgregarProduccion)
  const getGrupoProductoPorTipoMaquina = (nombreTipo: string): number | null => {
    const nombreLower = nombreTipo.toLowerCase();
    if (nombreLower.includes("peletizadora")) {
      return 20; // Grupo para Peletizadora
    } else if (nombreLower.includes("aglutinadora")) {
      return 21; // Grupo para Aglutinadora
    } else if (nombreLower.includes("extrusora")) {
      return 15; // Grupo para Extrusora
    }
    return null;
  };

  // Cargar productos cuando se selecciona un tipo de máquina (igual que en AgregarProduccion)
  useEffect(() => {
    const cargarProductos = async () => {
      if (!tipoMaquinaSeleccionado) {
        setProductos([]);
        setProductosFiltrados([]);
        return;
      }

      try {
        // Determinar el grupo de producto según el tipo de máquina
        const tipoSeleccionado = tiposMaquina.find(t => t.id_tipo_maquina === tipoMaquinaSeleccionado);
        const nombreTipo = tipoSeleccionado?.nombre || "";
        
        const idGrupoProducto = getGrupoProductoPorTipoMaquina(nombreTipo);
        
        if (!idGrupoProducto) {
          setProductos([]);
          setProductosFiltrados([]);
          return;
        }

        const response = await fetch(
          `${API_BASE_URL}/api/produccion/productos?id_grupo_producto=${idGrupoProducto}`
        );
        const data = await response.json();
        
        if (data.success) {
          setProductos(data.productos || []);
          setProductosFiltrados(data.productos || []);
        }
      } catch (error) {
        console.error("Error al cargar productos:", error);
        toast({
          title: "Error",
          description: "No se pudieron cargar los productos",
          variant: "destructive",
        });
      }
    };

    cargarProductos();
  }, [tipoMaquinaSeleccionado, tiposMaquina, toast]);

  // Función para aplicar filtros (resetea a página 1)
  const aplicarFiltros = async (paginaActual: number = 1) => {
    if (!tipoMaquinaSeleccionado) {
      toast({
        title: "Error",
        description: "Por favor seleccione un tipo de máquina",
        variant: "destructive",
      });
      return;
    }

    try {
      setLoadingProducciones(true);
      setPagina(paginaActual);
      
      const params = new URLSearchParams();
      params.append("id_tipo_maquina", tipoMaquinaSeleccionado.toString());
      params.append("pagina", paginaActual.toString());
      params.append("limite", "50");
      
      // Solo agregar filtros que tengan valores válidos (no vacíos, no "none")
      if (filtroFechaDesde && filtroFechaDesde.trim() !== "") {
        params.append("fecha_desde", filtroFechaDesde);
      }
      if (filtroFechaHasta && filtroFechaHasta.trim() !== "") {
        params.append("fecha_hasta", filtroFechaHasta);
      }
      if (filtroTurno && filtroTurno.trim() !== "" && filtroTurno !== "none") {
        params.append("id_turno", filtroTurno);
      }
      if (filtroUsuario && filtroUsuario.trim() !== "" && filtroUsuario !== "none") {
        params.append("id_usuario", filtroUsuario);
      }
      if (filtroProducto && filtroProducto.trim() !== "" && filtroProducto !== "none") {
        params.append("id_producto", filtroProducto);
      }

      const url = `${API_BASE_URL}/api/produccion/filtradas?${params.toString()}`;
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();

      if (data.success) {
        setProducciones(data.producciones || []);
        if (data.paginacion) {
          setPaginacion(data.paginacion);
        }
        toast({
          title: "Éxito",
          description: `Se encontraron ${data.paginacion?.totalRegistros || 0} registros de producción`,
        });
      } else {
        throw new Error(data.message || "Error al obtener producciones");
      }
    } catch (error) {
      console.error("Error al aplicar filtros:", error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "No se pudieron obtener las producciones",
        variant: "destructive",
      });
      setProducciones([]);
      setPaginacion({
        paginaActual: 1,
        totalPaginas: 1,
        totalRegistros: 0,
        limite: 50,
        hasNextPage: false,
        hasPrevPage: false
      });
    } finally {
      setLoadingProducciones(false);
    }
  };

  // Handler para cambiar de página
  const handlePageChange = (nuevaPagina: number) => {
    aplicarFiltros(nuevaPagina);
  };

  // Limpiar filtros
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

  // Formatear fecha para mostrar
  const formatearFecha = (fecha: string) => {
    try {
      const date = new Date(fecha);
      return date.toLocaleString("es-CO", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch {
      return fecha;
    }
  };

  // Determinar si es extrusora basándose en el tipo de máquina seleccionado
  const esExtrusora = () => {
    if (!tipoMaquinaSeleccionado) return false;
    const tipoSeleccionado = tiposMaquina.find(t => t.id_tipo_maquina === tipoMaquinaSeleccionado);
    return tipoSeleccionado?.nombre.toLowerCase().includes("extrusora") || false;
  };

  // Obtener el valor de una medida específica
  const obtenerValorMedida = (produccion: Produccion, idMedida: number): number => {
    if (!produccion.medidas || produccion.medidas.length === 0) return 0;
    const medida = produccion.medidas.find(m => m.id_medida === idMedida);
    return medida ? parseFloat(medida.cantidad.toString()) : 0;
  };

  // Calcular totales
  const calcularTotales = () => {
    const totalKilos = producciones.reduce((sum, p) => sum + obtenerValorMedida(p, 5), 0);
    const totalMetros = esExtrusora() 
      ? producciones.reduce((sum, p) => sum + obtenerValorMedida(p, 2), 0)
      : 0;
    return { totalKilos, totalMetros };
  };

  const totales = calcularTotales();

  // Obtener headers dinámicos según el tipo de máquina
  const obtenerHeaders = () => {
    const headersBase = [
      "ID",
      "Fecha y Hora",
      "Producto",
      "Máquina",
      "Usuario",
      "Turno",
    ];
    
    if (esExtrusora()) {
      return [...headersBase, "Kilos", "Metros", "Acciones"];
    } else {
      return [...headersBase, "Kilos", "Acciones"];
    }
  };

  return (
    <PageContainer>
      <PageTitle title="Ver Producción" />

      {/* Selector de Tipo de Máquina */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-lg">Seleccione el Tipo de Máquina</CardTitle>
          <CardDescription>
            Primero seleccione el tipo de máquina para ver la producción
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
                  setProducciones([]); // Limpiar resultados al cambiar tipo
                  setPagina(1); // Resetear a página 1
                  setPaginacion({
                    paginaActual: 1,
                    totalPaginas: 1,
                    totalRegistros: 0,
                    limite: 50,
                    hasNextPage: false,
                    hasPrevPage: false
                  });
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

      {/* Filtros */}
      {tipoMaquinaSeleccionado && (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Filter className="h-5 w-5" />
              Filtros de Búsqueda
            </CardTitle>
            <CardDescription>
              Aplique filtros para buscar registros de producción específicos
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              {/* Fecha Desde */}
              <div className="space-y-2">
                <Label htmlFor="fecha-desde">Fecha Desde</Label>
                <Input
                  id="fecha-desde"
                  type="date"
                  value={filtroFechaDesde}
                  onChange={(e) => setFiltroFechaDesde(e.target.value)}
                />
              </div>

              {/* Fecha Hasta */}
              <div className="space-y-2">
                <Label htmlFor="fecha-hasta">Fecha Hasta</Label>
                <Input
                  id="fecha-hasta"
                  type="date"
                  value={filtroFechaHasta}
                  onChange={(e) => setFiltroFechaHasta(e.target.value)}
                />
              </div>

              {/* Turno */}
              <div className="space-y-2">
                <Label htmlFor="turno">Turno</Label>
                <Select value={filtroTurno || "none"} onValueChange={(value) => setFiltroTurno(value === "none" ? "" : value)}>
                  <SelectTrigger id="turno">
                    <SelectValue placeholder="Todos los turnos" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">Todos los turnos</SelectItem>
                    {turnos.map((turno) => (
                      <SelectItem key={turno.id_turno} value={turno.id_turno.toString()}>
                        {turno.nombre}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Usuario */}
              <div className="space-y-2">
                <Label htmlFor="usuario">Usuario</Label>
                <Select value={filtroUsuario || "none"} onValueChange={(value) => setFiltroUsuario(value === "none" ? "" : value)}>
                  <SelectTrigger id="usuario">
                    <SelectValue placeholder="Todos los usuarios" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">Todos los usuarios</SelectItem>
                    {usuarios.map((usuario) => (
                      <SelectItem key={usuario.id_usuarios} value={usuario.id_usuarios.toString()}>
                        {usuario.nombre} {usuario.apellido}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Producto */}
              <div className="space-y-2">
                <Label htmlFor="producto">Producto</Label>
                <Select 
                  value={filtroProducto || "none"} 
                  onValueChange={(value) => {
                    setFiltroProducto(value === "none" ? "" : value);
                    setBusquedaProducto(""); // Limpiar búsqueda al seleccionar
                  }}
                >
                  <SelectTrigger id="producto">
                    <SelectValue placeholder="Todos los productos" />
                  </SelectTrigger>
                  <SelectContent>
                    <div className="p-2 border-b">
                      <div className="relative">
                        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                          placeholder="Buscar por código o nombre..."
                          value={busquedaProducto}
                          onChange={(e) => setBusquedaProducto(e.target.value)}
                          className="pl-8 h-9"
                          onClick={(e) => e.stopPropagation()}
                          onKeyDown={(e) => e.stopPropagation()}
                        />
                      </div>
                    </div>
                    <div className="max-h-[200px] overflow-y-auto">
                      <SelectItem value="none">Todos los productos</SelectItem>
                      {productosFiltrados.map((producto) => (
                        <SelectItem key={producto.id_producto} value={producto.id_producto.toString()}>
                          <div className="flex flex-col">
                            <span>{producto.nombre}</span>
                            {producto.codigo && (
                              <span className="text-xs text-muted-foreground">Código: {producto.codigo}</span>
                            )}
                          </div>
                        </SelectItem>
                      ))}
                      {productosFiltrados.length === 0 && busquedaProducto && (
                        <div className="px-2 py-1.5 text-sm text-muted-foreground text-center">
                          No se encontraron productos
                        </div>
                      )}
                    </div>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Botones de acción */}
            <div className="flex gap-2 mt-4">
              <Button
                onClick={() => aplicarFiltros(1)}
                disabled={loadingProducciones || !tipoMaquinaSeleccionado}
                className="flex-1"
              >
                {loadingProducciones ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Buscando...
                  </>
                ) : (
                  <>
                    <Filter className="h-4 w-4 mr-2" />
                    Aplicar Filtros
                  </>
                )}
              </Button>
              {tieneFiltrosActivos && (
                <Button
                  variant="outline"
                  onClick={limpiarFiltros}
                  disabled={loadingProducciones}
                >
                  <X className="h-4 w-4 mr-2" />
                  Limpiar Filtros
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Tabla de Resultados */}
      {tipoMaquinaSeleccionado && (
        <React.Fragment>
          <TableCard
            headers={obtenerHeaders()}
            emptyMessage={
              loadingProducciones
                ? "Buscando producciones..."
                : producciones.length === 0
                ? "No hay registros de producción. Aplique filtros para buscar."
                : undefined
            }
            colSpan={obtenerHeaders().length}
          >
            {producciones.map((produccion) => (
            <TableRow key={produccion.id_produccion}>
              <TableCell className="font-medium">{produccion.id_produccion}</TableCell>
              <TableCell>{formatearFecha(produccion.fecha_hora)}</TableCell>
              <TableCell>
                <div>
                  <div className="font-medium">{produccion.producto_nombre}</div>
                  {produccion.producto_codigo && (
                    <div className="text-sm text-muted-foreground">
                      Código: {produccion.producto_codigo}
                    </div>
                  )}
                </div>
              </TableCell>
              <TableCell>
                <div>
                  <div className="font-medium">{produccion.maquina_nombre}</div>
                  <div className="text-sm text-muted-foreground">
                    {produccion.tipo_maquina_nombre}
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <div>
                  <div className="font-medium">{produccion.usuario_nombre}</div>
                  <div className="text-sm text-muted-foreground">
                    Doc: {produccion.usuario_documento}
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <div>
                  <div className="font-medium">{produccion.turno_nombre}</div>
                  {produccion.turno_horario && (
                    <div className="text-sm text-muted-foreground">
                      {produccion.turno_horario}
                    </div>
                  )}
                </div>
              </TableCell>
              {/* Columna Kilos */}
              <TableCell className="text-right">
                {obtenerValorMedida(produccion, 5).toLocaleString("es-CO", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </TableCell>
              {/* Columna Metros (solo para extrusora) */}
              {esExtrusora() && (
                <TableCell className="text-right">
                  {obtenerValorMedida(produccion, 2).toLocaleString("es-CO", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </TableCell>
              )}
              <TableCell>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={async () => {
                    try {
                      const response = await fetch(
                        `${API_BASE_URL}/api/produccion/${produccion.id_produccion}`
                      );
                      const data = await response.json();
                      if (data.success) {
                        // Aquí puedes mostrar un diálogo con los detalles completos
                        toast({
                          title: "Detalles de Producción",
                          description: `Producción #${produccion.id_produccion} - ${produccion.producto_nombre}`,
                        });
                      }
                    } catch (error) {
                      console.error("Error al obtener detalles:", error);
                    }
                  }}
                >
                  Ver Detalles
                </Button>
              </TableCell>
            </TableRow>
          ))}
          {/* Fila de Total */}
          {producciones.length > 0 && (
            <TableRow className="bg-muted/50 font-bold border-t-2 border-border">
              <TableCell colSpan={6} className="text-right border-r border-border">
                <span className="text-base">TOTALES:</span>
              </TableCell>
              <TableCell className="text-right border-r border-border font-semibold">
                {totales.totalKilos.toLocaleString("es-CO", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </TableCell>
              {esExtrusora() && (
                <TableCell className="text-right border-r border-border font-semibold">
                  {totales.totalMetros.toLocaleString("es-CO", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </TableCell>
              )}
              <TableCell></TableCell>
            </TableRow>
          )}
        </TableCard>
        
        {/* Paginación */}
        {producciones.length > 0 && (
          <div className="mt-4">
            <Pagination
              paginaActual={paginacion.paginaActual}
              totalPaginas={paginacion.totalPaginas}
              onPageChange={handlePageChange}
            />
            <div className="text-center text-sm text-muted-foreground mt-2">
              Mostrando {producciones.length} de {paginacion.totalRegistros} registros
            </div>
          </div>
        )}
        </React.Fragment>
      )}

      {!tipoMaquinaSeleccionado && (
        <Card>
          <CardContent className="py-8">
            <p className="text-center text-muted-foreground">
              Seleccione un tipo de máquina para comenzar a ver la producción
            </p>
          </CardContent>
        </Card>
      )}
    </PageContainer>
  );
};

export default VerProduccion;
