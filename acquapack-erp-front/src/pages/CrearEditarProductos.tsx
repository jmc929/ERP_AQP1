import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import PageContainer from "@/components/PageContainer";
import PageTitle from "@/components/PageTitle";
import FormCard from "@/components/FormCard";
import TableCard from "@/components/TableCard";
import SearchBar from "@/components/SearchBar";
import { useToast } from "@/hooks/use-toast";
import { useDebounce } from "@/hooks/use-debounce";
import { Plus, Edit } from "lucide-react";
import { API_BASE_URL } from "@/config/api";

interface Catalogos {
  familias: Array<{ id_familia_producto: number; nombre: string }>;
  grupos: Array<{ id_grupos_productos: number; nombre: string }>;
  medidas: Array<{ id_medida: number; nombre: string }>;
  estados: Array<{ id_estado: number; nombre: string }>;
}

interface ProductoBusqueda {
  id_producto: number;
  codigo: string;
  nombre: string;
  grupo_nombre: string;
  familia_nombre: string;
  existencia: boolean;
  medida_nombre: string;
  cantidad_total: number;
  cantidad_minima: number;
  cantidad_maxima: number;
  estado_nombre: string;
  estado_color: string;
}

const CrearEditarProductos = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [modo, setModo] = useState<"menu" | "crear" | "editar" | "seleccionar">("menu");
  const [loading, setLoading] = useState(false);
  const [cargandoDatos, setCargandoDatos] = useState(false);
  const [catalogos, setCatalogos] = useState<Catalogos | null>(null);
  const [codigoBarras, setCodigoBarras] = useState("");
  const [productoId, setProductoId] = useState<number | null>(null);
  
  // Estados para búsqueda de productos
  const [productosBusqueda, setProductosBusqueda] = useState<ProductoBusqueda[]>([]);
  const [busquedaProducto, setBusquedaProducto] = useState("");
  const [cargandoProductos, setCargandoProductos] = useState(false);
  const busquedaDebounced = useDebounce(busquedaProducto, 500);

  // Estados del formulario
  const [codigo, setCodigo] = useState("");
  const [nombre, setNombre] = useState("");
  const [idGrupo, setIdGrupo] = useState("");
  const [idFamilia, setIdFamilia] = useState("");
  const [existencia, setExistencia] = useState(true);
  const [idMedida, setIdMedida] = useState("");
  const [cantidadTotal, setCantidadTotal] = useState("");
  const [cantidadMinima, setCantidadMinima] = useState("");
  const [cantidadMaxima, setCantidadMaxima] = useState("");
  const [idEstado, setIdEstado] = useState("");

  // Cargar catálogos al entrar en modo crear o editar
  useEffect(() => {
    if (modo === "crear" || modo === "editar") {
      const cargarCatalogos = async () => {
        try {
          setCargandoDatos(true);
          const catalogosRes = await fetch(`${API_BASE_URL}/api/productos/catalogos");

          if (!catalogosRes.ok) {
            const errorData = await catalogosRes.json().catch(() => ({}));
            throw new Error(`Error al cargar catálogos: ${catalogosRes.status} - ${errorData.message || catalogosRes.statusText}`);
          }

          const catalogosData = await catalogosRes.json();

          if (catalogosData.success) {
            setCatalogos(catalogosData.catalogos);
          }
        } catch (error) {
          console.error("Error al cargar catálogos:", error);
          const errorMessage = error instanceof Error ? error.message : "Error desconocido";
          toast({
            title: "Error",
            description: `No se pudieron cargar los catálogos: ${errorMessage}`,
            variant: "destructive",
          });
        } finally {
          setCargandoDatos(false);
        }
      };

      cargarCatalogos();
    } else {
      // Limpiar datos cuando se sale del modo crear/editar
      setCatalogos(null);
      setCodigoBarras("");
    }
  }, [modo, toast]);

  // Cargar código de barras solo en modo crear
  useEffect(() => {
    if (modo === "crear") {
      const cargarCodigoBarras = async () => {
        try {
          const codigoBarrasRes = await fetch(`${API_BASE_URL}/api/productos/siguiente-codigo-barras");

          if (!codigoBarrasRes.ok) {
            const errorData = await codigoBarrasRes.json().catch(() => ({}));
            throw new Error(`Error al cargar código de barras: ${codigoBarrasRes.status} - ${errorData.message || codigoBarrasRes.statusText}`);
          }

          const codigoBarrasData = await codigoBarrasRes.json();

          if (codigoBarrasData.success) {
            setCodigoBarras(codigoBarrasData.codigo_barras);
          }
        } catch (error) {
          console.error("Error al cargar código de barras:", error);
        }
      };

      cargarCodigoBarras();
    }
  }, [modo]);

  // Buscar productos cuando esté en modo seleccionar
  useEffect(() => {
    if (modo === "seleccionar") {
      const buscarProductos = async () => {
        try {
          setCargandoProductos(true);
          const params = new URLSearchParams({
            pagina: "1",
            limite: "20",
          });

          if (busquedaDebounced) {
            params.append("busqueda", busquedaDebounced);
          }

          const response = await fetch(
            `${API_BASE_URL}/api/productos?${params.toString()}`
          );
          const data = await response.json();

          if (data.success) {
            setProductosBusqueda(data.productos);
          }
        } catch (error) {
          console.error("Error al buscar productos:", error);
          toast({
            title: "Error",
            description: "No se pudieron cargar los productos",
            variant: "destructive",
          });
        } finally {
          setCargandoProductos(false);
        }
      };

      buscarProductos();
    } else {
      setProductosBusqueda([]);
      setBusquedaProducto("");
    }
  }, [modo, busquedaDebounced, toast]);

  // Cargar datos del producto en modo editar
  useEffect(() => {
    if (modo === "editar" && productoId) {
      const cargarProducto = async () => {
        try {
          setCargandoDatos(true);
          const response = await fetch(`${API_BASE_URL}/api/productos/${productoId}`);

          if (!response.ok) {
            throw new Error("No se pudo cargar el producto");
          }

          const data = await response.json();

          if (data.success && data.producto) {
            const producto = data.producto;
            setCodigo(producto.codigo || "");
            setNombre(producto.nombre || "");
            setIdGrupo(producto.id_grupos_producto ? producto.id_grupos_producto.toString() : "");
            setIdFamilia(producto.id_familia ? producto.id_familia.toString() : "");
            setIdMedida(producto.id_medida ? producto.id_medida.toString() : "");
            setCantidadTotal(producto.cantidad_total ? producto.cantidad_total.toString() : "0");
            setCantidadMinima(producto.cantidad_minima ? producto.cantidad_minima.toString() : "");
            setCantidadMaxima(producto.cantidad_maxima ? producto.cantidad_maxima.toString() : "");
            setIdEstado(producto.id_estado ? producto.id_estado.toString() : "");
            setCodigoBarras(producto.codigo_barras || "");
            // Calcular existencia basándose en cantidad_total
            const cantidad = producto.cantidad_total || 0;
            setExistencia(cantidad > 0);
          }
        } catch (error) {
          console.error("Error al cargar producto:", error);
          toast({
            title: "Error",
            description: "No se pudo cargar el producto",
            variant: "destructive",
          });
          setModo("menu");
        } finally {
          setCargandoDatos(false);
        }
      };

      cargarProducto();
    }
  }, [modo, productoId, toast, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Calcular existencia basándose en cantidad_total
      const cantidadTotalValue = cantidadTotal ? parseFloat(cantidadTotal) : 0;
      const existenciaCalculada = cantidadTotalValue > 0;

      const datosProducto = {
        codigo: codigo || null,
        nombre,
        id_grupos_producto: idGrupo ? parseInt(idGrupo) : null,
        id_familia: idFamilia ? parseInt(idFamilia) : null,
        existencia: existenciaCalculada,
        id_medida: idMedida ? parseInt(idMedida) : null,
        cantidad_total: cantidadTotalValue,
        cantidad_minima: cantidadMinima ? parseFloat(cantidadMinima) : 0,
        cantidad_maxima: cantidadMaxima ? parseFloat(cantidadMaxima) : 0,
        id_estado: idEstado ? parseInt(idEstado) : undefined,
      };

      const url = modo === "editar" && productoId
        ? `${API_BASE_URL}/api/productos/${productoId}`
        : `${API_BASE_URL}/api/productos";
      
      const method = modo === "editar" ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(datosProducto),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || `Error al ${modo === "editar" ? "actualizar" : "crear"} el producto`);
      }

      toast({
        title: modo === "editar" ? "Producto actualizado" : "Producto creado",
        description: `Producto "${data.producto.nombre}" ${modo === "editar" ? "actualizado" : "creado"} exitosamente`,
      });

      // Si es edición, volver al menú. Si es creación, limpiar y volver al menú
      if (modo === "editar") {
        setModo("menu");
        setProductoId(null);
      } else {
        limpiarFormulario();
      }
      setModo("menu");
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Error al crear el producto",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const limpiarFormulario = () => {
    setCodigo("");
    setNombre("");
    setIdGrupo("");
    setIdFamilia("");
    setExistencia(true);
    setIdMedida("");
    setCantidadTotal("");
    setCantidadMinima("");
    setCantidadMaxima("");
    setIdEstado("");
    setCodigoBarras("");
    setProductoId(null);
  };

  // Actualizar existencia automáticamente cuando cambie cantidad_total
  useEffect(() => {
    const cantidad = cantidadTotal ? parseFloat(cantidadTotal) : 0;
    setExistencia(cantidad > 0);
  }, [cantidadTotal]);

  const handleSeleccionarProducto = (id: number) => {
    setProductoId(id);
    setModo("editar");
  };

  if (modo === "menu") {
    return (
      <PageContainer>
        <PageTitle title="Crear / Editar Productos" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto mt-8">
          <Button
            onClick={() => setModo("crear")}
            className="h-24 flex flex-col items-center justify-center gap-2"
            size="lg"
          >
            <Plus className="h-8 w-8" />
            <span className="text-lg">Crear Producto</span>
          </Button>
          <Button
            onClick={() => setModo("seleccionar")}
            variant="outline"
            className="h-24 flex flex-col items-center justify-center gap-2"
            size="lg"
          >
            <Edit className="h-8 w-8" />
            <span className="text-lg">Editar Producto</span>
          </Button>
        </div>
      </PageContainer>
    );
  }

  if (modo === "seleccionar") {
    return (
      <PageContainer>
        <PageTitle title="Seleccionar Producto para Editar" />
        <div className="mb-4">
          <SearchBar
            placeholder="Buscar producto por código, nombre..."
            value={busquedaProducto}
            onChange={setBusquedaProducto}
          />
        </div>
        <div className="mb-4">
          <Button
            variant="outline"
            onClick={() => setModo("menu")}
          >
            Volver al menú
          </Button>
        </div>
        <TableCard
          headers={[
            "Código",
            "Nombre",
            "Grupo",
            "Familia",
            "Existencia",
            "Medida",
            "Cantidad Total",
            "Cantidad Mínima",
            "Cantidad Máxima",
            "Estado",
            "Acción",
          ]}
          emptyMessage={
            cargandoProductos
              ? "Buscando productos..."
              : productosBusqueda.length === 0
              ? "No se encontraron productos"
              : undefined
          }
          colSpan={11}
        >
          {productosBusqueda.map((producto) => (
            <TableRow key={producto.id_producto}>
              <TableCell className="border-r border-border font-medium">
                {producto.codigo || "N/A"}
              </TableCell>
              <TableCell className="border-r border-border">
                {producto.nombre || "N/A"}
              </TableCell>
              <TableCell className="border-r border-border">
                {producto.grupo_nombre || "N/A"}
              </TableCell>
              <TableCell className="border-r border-border">
                {producto.familia_nombre || "N/A"}
              </TableCell>
              <TableCell className="border-r border-border text-center">
                {producto.existencia ? (
                  <span className="text-green-600 font-semibold">Sí</span>
                ) : (
                  <span className="text-red-600 font-semibold">No</span>
                )}
              </TableCell>
              <TableCell className="border-r border-border">
                {producto.medida_nombre || "N/A"}
              </TableCell>
              <TableCell className="border-r border-border text-right">
                {producto.cantidad_total?.toLocaleString("es-CO", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                }) || "N/A"}
              </TableCell>
              <TableCell className="border-r border-border text-right">
                {producto.cantidad_minima?.toLocaleString("es-CO", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                }) || "N/A"}
              </TableCell>
              <TableCell className="border-r border-border text-right">
                {producto.cantidad_maxima?.toLocaleString("es-CO", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                }) || "N/A"}
              </TableCell>
              <TableCell>
                <span
                  className="px-2 py-1 rounded text-xs font-medium"
                  style={{
                    backgroundColor: producto.estado_color
                      ? `${producto.estado_color}20`
                      : "#f3f4f6",
                    color: producto.estado_color || "#374151",
                  }}
                >
                  {producto.estado_nombre || "Sin estado"}
                </span>
              </TableCell>
              <TableCell>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleSeleccionarProducto(producto.id_producto)}
                >
                  Seleccionar
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableCard>
      </PageContainer>
    );
  }

  if (modo === "crear" || modo === "editar") {
    if (cargandoDatos) {
      return (
        <PageContainer>
          <PageTitle title={modo === "editar" ? "Editar Producto" : "Crear Producto"} />
          <div className="text-center py-8 text-muted-foreground">
            Cargando datos...
          </div>
        </PageContainer>
      );
    }

    return (
      <PageContainer>
        <PageTitle title={modo === "editar" ? "Editar Producto" : "Crear Producto"} />
        <FormCard title="Datos del Producto">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="codigo">Código</Label>
                <Input
                  id="codigo"
                  value={codigo}
                  onChange={(e) => setCodigo(e.target.value)}
                  placeholder="Ingrese el código (opcional)"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="nombre">Nombre *</Label>
                <Input
                  id="nombre"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  placeholder="Ingrese el nombre del producto"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="grupo">Grupo</Label>
                <Select value={idGrupo} onValueChange={setIdGrupo}>
                  <SelectTrigger id="grupo">
                    <SelectValue placeholder="Seleccione un grupo" />
                  </SelectTrigger>
                  <SelectContent>
                    {catalogos?.grupos && catalogos.grupos.length > 0 ? (
                      catalogos.grupos.map((grupo) => (
                        <SelectItem key={grupo.id_grupos_productos} value={grupo.id_grupos_productos.toString()}>
                          {grupo.nombre}
                        </SelectItem>
                      ))
                    ) : (
                      <SelectItem value="no-data" disabled>No hay grupos disponibles</SelectItem>
                    )}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="familia">Familia</Label>
                <Select value={idFamilia} onValueChange={setIdFamilia}>
                  <SelectTrigger id="familia">
                    <SelectValue placeholder="Seleccione una familia" />
                  </SelectTrigger>
                  <SelectContent>
                    {catalogos?.familias && catalogos.familias.length > 0 ? (
                      catalogos.familias.map((familia) => (
                        <SelectItem key={familia.id_familia_producto} value={familia.id_familia_producto.toString()}>
                          {familia.nombre}
                        </SelectItem>
                      ))
                    ) : (
                      <SelectItem value="no-data" disabled>No hay familias disponibles</SelectItem>
                    )}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="medida">Unidad / Medida</Label>
                <Select value={idMedida} onValueChange={setIdMedida}>
                  <SelectTrigger id="medida">
                    <SelectValue placeholder="Seleccione una medida" />
                  </SelectTrigger>
                  <SelectContent>
                    {catalogos?.medidas && catalogos.medidas.length > 0 ? (
                      catalogos.medidas.map((medida) => (
                        <SelectItem key={medida.id_medida} value={medida.id_medida.toString()}>
                          {medida.nombre}
                        </SelectItem>
                      ))
                    ) : (
                      <SelectItem value="no-data" disabled>No hay medidas disponibles</SelectItem>
                    )}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="codigoBarras">Código de Barras</Label>
                <Input
                  id="codigoBarras"
                  value={codigoBarras}
                  disabled
                  className="bg-muted"
                  placeholder="Se generará automáticamente"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="cantidadTotal">Cantidad Total *</Label>
                <Input
                  id="cantidadTotal"
                  type="number"
                  value={cantidadTotal}
                  onChange={(e) => setCantidadTotal(e.target.value)}
                  placeholder="0"
                  min="0"
                  step="0.01"
                  required
                />
                <p className="text-xs text-muted-foreground">
                  La existencia se calculará automáticamente: {existencia ? "Sí" : "No"}
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="cantidadMinima">Cantidad Mínima</Label>
                <Input
                  id="cantidadMinima"
                  type="number"
                  value={cantidadMinima}
                  onChange={(e) => setCantidadMinima(e.target.value)}
                  placeholder="0"
                  min="0"
                  step="0.01"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="cantidadMaxima">Cantidad Máxima</Label>
                <Input
                  id="cantidadMaxima"
                  type="number"
                  value={cantidadMaxima}
                  onChange={(e) => setCantidadMaxima(e.target.value)}
                  placeholder="0"
                  min="0"
                  step="0.01"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="estado">Estado</Label>
                <Select value={idEstado} onValueChange={setIdEstado}>
                  <SelectTrigger id="estado">
                    <SelectValue placeholder="Seleccione un estado" />
                  </SelectTrigger>
                  <SelectContent>
                    {catalogos?.estados && catalogos.estados.length > 0 ? (
                      catalogos.estados.map((estado) => (
                        <SelectItem key={estado.id_estado} value={estado.id_estado.toString()}>
                          {estado.nombre}
                        </SelectItem>
                      ))
                    ) : (
                      <SelectItem value="no-data" disabled>No hay estados disponibles</SelectItem>
                    )}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex items-center space-x-2 p-4 bg-muted rounded-md">
              <Checkbox
                id="existencia"
                checked={existencia}
                disabled
              />
              <Label htmlFor="existencia" className="cursor-not-allowed">
                ¿Hay existencia? (Calculado automáticamente: {existencia ? "Sí" : "No"})
              </Label>
            </div>

            <div className="flex justify-end gap-4 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  if (modo === "editar") {
                    navigate("/dashboard/productos/catalogo-general");
                  } else {
                    limpiarFormulario();
                    setModo("menu");
                  }
                }}
                disabled={loading}
              >
                Cancelar
              </Button>
              <Button type="submit" disabled={loading}>
                {loading 
                  ? (modo === "editar" ? "Guardando..." : "Creando...") 
                  : (modo === "editar" ? "Guardar Cambios" : "Crear Producto")}
              </Button>
            </div>
          </form>
        </FormCard>
      </PageContainer>
    );
  }

  return null;
};

export default CrearEditarProductos;
