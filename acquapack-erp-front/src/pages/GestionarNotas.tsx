import { useState, useEffect, useMemo } from "react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { API_BASE_URL } from "@/config/api";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Plus, Edit, Trash2, Search, ArrowLeft } from "lucide-react";
import PageContainer from "@/components/PageContainer";
import PageTitle from "@/components/PageTitle";
import UsuarioNotasCard from "@/components/UsuarioNotasCard";

interface Nota {
  id_notas: number;
  titulo: string;
  nota: string;
  id_usuario: number;
  fecha_creacion: string;
  fecha_actualizacion: string;
  nombre_usuario?: string;
  id_usuario_creador?: number;
  nombre_usuario_creador?: string;
}

interface Usuario {
  id: number;
  nombre: string;
  notas: Nota[];
}

const GestionarNotas = () => {
  const { toast } = useToast();
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState<Usuario | null>(null);
  const [mostrarDialogoUsuario, setMostrarDialogoUsuario] = useState(false);
  const [mostrarDialogoNota, setMostrarDialogoNota] = useState(false);
  const [mostrarDialogoVerNota, setMostrarDialogoVerNota] = useState(false);
  const [notaSeleccionada, setNotaSeleccionada] = useState<Nota | null>(null);
  const [notaParaVer, setNotaParaVer] = useState<Nota | null>(null);
  const [loading, setLoading] = useState(true);
  const [busqueda, setBusqueda] = useState("");
  const [formData, setFormData] = useState({
    titulo: "",
    nota: "",
    id_usuario: 1,
  });

  // Cargar usuarios y notas
  useEffect(() => {
    cargarDatos();
  }, []);

  const cargarDatos = async () => {
    try {
      setLoading(true);
      
      // Cargar usuarios
      let usuariosData;
      try {
        const usuariosRes = await fetch(`${API_BASE_URL}/api/usuarios");
        usuariosData = await usuariosRes.json();
        
        if (!usuariosRes.ok) {
          throw new Error(usuariosData.message || "Error al cargar usuarios");
        }
      } catch (error) {
        console.error("Error al cargar usuarios:", error);
        toast({
          title: "Error",
          description: "No se pudieron cargar los usuarios",
          variant: "destructive",
        });
        setUsuarios([]);
        return;
      }

      // Cargar todas las notas
      let notas: Nota[] = [];
      try {
        const notasRes = await fetch(`${API_BASE_URL}/api/notas");
        if (notasRes.ok) {
          const notasData = await notasRes.json();
          if (notasData.success && Array.isArray(notasData.notas)) {
            notas = notasData.notas;
          }
        }
      } catch (error) {
        console.warn("Error al cargar notas:", error);
      }

      // Validar datos de usuarios
      if (!usuariosData.success || !Array.isArray(usuariosData.usuarios)) {
        setUsuarios([]);
        return;
      }

      // Mapear usuarios con sus notas
      const usuariosConNotas: Usuario[] = usuariosData.usuarios
        .filter((usuario: any) => usuario && usuario.id_usuarios)
        .map((usuario: any) => {
          const notasUsuario = notas
            .filter((nota: Nota) => nota && nota.id_usuario === usuario.id_usuarios)
            .map((nota: Nota) => ({
              ...nota,
              nombre_usuario: `${usuario.nombre || ""} ${usuario.apellido || ""}`.trim(),
              nombre_usuario_creador: nota.nombre_usuario_creador || null,
            }));

          return {
            id: usuario.id_usuarios,
            nombre: `${usuario.nombre || ""} ${usuario.apellido || ""}`.trim() || `Usuario ${usuario.id_usuarios}`,
            notas: notasUsuario || []
          };
        })
        .filter((usuario: Usuario) => usuario && usuario.id);

      setUsuarios(usuariosConNotas);
    } catch (error) {
      console.error("Error al cargar datos:", error);
      toast({
        title: "Error",
        description: "No se pudieron cargar los datos",
        variant: "destructive",
      });
      setUsuarios([]);
    } finally {
      setLoading(false);
    }
  };

  // Filtrar usuarios
  const usuariosFiltrados = useMemo(() => {
    if (!busqueda.trim()) {
      return usuarios;
    }
    
    const terminoBusqueda = busqueda.toLowerCase().trim();
    return usuarios.filter((usuario) =>
      usuario.nombre.toLowerCase().includes(terminoBusqueda)
    );
  }, [usuarios, busqueda]);

  // Seleccionar usuario
  const handleSeleccionarUsuario = (usuario: Usuario) => {
    setUsuarioSeleccionado(usuario);
    setMostrarDialogoUsuario(true);
  };

  // Cerrar diálogo de usuario
  const handleCerrarDialogoUsuario = () => {
    setMostrarDialogoUsuario(false);
    setUsuarioSeleccionado(null);
  };

  // Abrir diálogo para crear/editar nota
  const abrirDialogoNota = (nota?: Nota) => {
    if (nota) {
      setNotaSeleccionada(nota);
      setFormData({
        titulo: nota.titulo,
        nota: nota.nota,
        id_usuario: nota.id_usuario,
      });
    } else {
      setNotaSeleccionada(null);
      setFormData({
        titulo: "",
        nota: "",
        id_usuario: usuarioSeleccionado?.id || 1,
      });
    }
    setMostrarDialogoNota(true);
  };

  // Guardar nota
  const handleGuardar = async () => {
    try {
      if (!formData.titulo.trim() || !formData.nota.trim()) {
        toast({
          title: "Error",
          description: "El título y la nota son obligatorios",
          variant: "destructive",
        });
        return;
      }

      const url = notaSeleccionada
        ? `${API_BASE_URL}/api/notas/${notaSeleccionada.id_notas}`
        : `${API_BASE_URL}/api/notas";

      const method = notaSeleccionada ? "PUT" : "POST";

      // Obtener el usuario logueado desde localStorage (solo para crear, no para editar)
      const headers: HeadersInit = {
        "Content-Type": "application/json",
      };

      let idUsuarioCreador = null;
      if (method === "POST") {
        const usuarioLogueado = localStorage.getItem("usuario");
        if (usuarioLogueado) {
          try {
            const usuario = JSON.parse(usuarioLogueado);
            if (usuario.id_usuarios) {
              idUsuarioCreador = usuario.id_usuarios;
              headers["x-user-id"] = idUsuarioCreador.toString();
            }
          } catch (error) {
            console.error("Error al parsear usuario:", error);
          }
        }
      }

      // Agregar id_usuario_creador al body si estamos creando una nota
      const bodyData = method === "POST" && idUsuarioCreador
        ? {
            ...formData,
            id_usuario_creador: idUsuarioCreador
          }
        : formData;

      const response = await fetch(url, {
        method,
        headers,
        body: JSON.stringify(bodyData),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        toast({
          title: "Éxito",
          description: notaSeleccionada
            ? "Nota actualizada exitosamente"
            : "Nota creada exitosamente",
        });
        setMostrarDialogoNota(false);
        
        // Actualizar inmediatamente en el estado local
        if (usuarioSeleccionado) {
          if (notaSeleccionada) {
            // Actualizar nota existente
            const notasActualizadas = usuarioSeleccionado.notas.map((nota) =>
              nota.id_notas === notaSeleccionada.id_notas
                ? {
                    ...nota,
                    titulo: formData.titulo,
                    nota: formData.nota,
                    fecha_actualizacion: new Date().toISOString(),
                  }
                : nota
            );
            const usuarioActualizado = {
              ...usuarioSeleccionado,
              notas: notasActualizadas,
            };
            setUsuarioSeleccionado(usuarioActualizado);
            
            // Actualizar también en la lista de usuarios
            setUsuarios((prevUsuarios) =>
              prevUsuarios.map((u) =>
                u.id === usuarioSeleccionado.id ? usuarioActualizado : u
              )
            );
          } else {
            // Crear nueva nota
            const nuevaNota: Nota = {
              id_notas: data.nota.id_notas,
              titulo: formData.titulo,
              nota: formData.nota,
              id_usuario: formData.id_usuario,
              fecha_creacion: new Date().toISOString(),
              fecha_actualizacion: new Date().toISOString(),
              nombre_usuario: usuarioSeleccionado.nombre,
            };
            const usuarioActualizado = {
              ...usuarioSeleccionado,
              notas: [...usuarioSeleccionado.notas, nuevaNota],
            };
            setUsuarioSeleccionado(usuarioActualizado);
            
            // Actualizar también en la lista de usuarios
            setUsuarios((prevUsuarios) =>
              prevUsuarios.map((u) =>
                u.id === usuarioSeleccionado.id ? usuarioActualizado : u
              )
            );
          }
        }
      } else {
        throw new Error(data.message || "Error al guardar nota");
      }
    } catch (error) {
      console.error("Error al guardar nota:", error);
      toast({
        title: "Error",
        description: "No se pudo guardar la nota",
        variant: "destructive",
      });
    }
  };

  // Abrir diálogo para ver nota completa
  const abrirDialogoVerNota = (nota: Nota) => {
    setNotaParaVer(nota);
    setMostrarDialogoVerNota(true);
  };

  // Eliminar nota
  const handleEliminar = async (id: number) => {
    if (!confirm("¿Estás seguro de eliminar esta nota?")) return;

    try {
      const response = await fetch(`${API_BASE_URL}/api/notas/${id}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (response.ok && data.success) {
        toast({
          title: "Éxito",
          description: "Nota eliminada exitosamente",
        });
        
        // Actualizar inmediatamente en el estado local
        if (usuarioSeleccionado) {
          const notasActualizadas = usuarioSeleccionado.notas.filter(
            (nota) => nota.id_notas !== id
          );
          const usuarioActualizado = {
            ...usuarioSeleccionado,
            notas: notasActualizadas,
          };
          setUsuarioSeleccionado(usuarioActualizado);
          
          // Actualizar también en la lista de usuarios
          setUsuarios((prevUsuarios) =>
            prevUsuarios.map((u) =>
              u.id === usuarioSeleccionado.id ? usuarioActualizado : u
            )
          );
        }
      } else {
        throw new Error(data.message || "Error al eliminar nota");
      }
    } catch (error) {
      console.error("Error al eliminar nota:", error);
      toast({
        title: "Error",
        description: "No se pudo eliminar la nota",
        variant: "destructive",
      });
    }
  };

  return (
    <PageContainer>
      <PageTitle title="Gestión de Notas" />
      <p className="text-muted-foreground mb-6">
        Selecciona un usuario para ver y gestionar sus notas
      </p>

      {/* Barra de búsqueda */}
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Buscar usuario por nombre..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            className="pl-10"
          />
        </div>
        {busqueda.trim() && (
          <p className="text-sm text-muted-foreground mt-2">
            {usuariosFiltrados.length === 0
              ? "No se encontraron usuarios"
              : `${usuariosFiltrados.length} usuario(s) encontrado(s)`}
          </p>
        )}
      </div>

      {/* Grid de tarjetas de usuarios */}
      {loading ? (
        <div className="text-center py-8">Cargando usuarios y notas...</div>
      ) : usuarios.length === 0 ? (
        <div className="text-center py-8 text-muted-foreground">
          No hay usuarios registrados
        </div>
      ) : usuariosFiltrados.length === 0 ? (
        <div className="text-center py-8 text-muted-foreground">
          No se encontraron usuarios que coincidan con la búsqueda
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {usuariosFiltrados.map((usuario) => (
            <UsuarioNotasCard
              key={usuario.id}
              nombre={usuario.nombre}
              notasTotales={usuario.notas.length}
              onClick={() => handleSeleccionarUsuario(usuario)}
            />
          ))}
        </div>
      )}

      {/* Dialog para mostrar las notas del usuario */}
      {mostrarDialogoUsuario && usuarioSeleccionado && (
        <Dialog open={mostrarDialogoUsuario} onOpenChange={setMostrarDialogoUsuario}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <ArrowLeft
                  className="h-5 w-5 cursor-pointer hover:text-primary transition-colors"
                  onClick={handleCerrarDialogoUsuario}
                />
                Notas de {usuarioSeleccionado.nombre}
              </DialogTitle>
              <DialogDescription>
                {usuarioSeleccionado.notas.length} {usuarioSeleccionado.notas.length === 1 ? "nota" : "notas"}
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4">
              <Button
                onClick={() => abrirDialogoNota()}
                className="w-full"
              >
                <Plus className="mr-2 h-4 w-4" />
                Nueva Nota
              </Button>

              {usuarioSeleccionado.notas.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  No hay notas para este usuario
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {usuarioSeleccionado.notas.map((nota) => (
                    <Card 
                      key={nota.id_notas} 
                      className="hover:shadow-lg transition-shadow cursor-pointer"
                      onClick={() => abrirDialogoVerNota(nota)}
                    >
                      <CardHeader>
                        <div className="flex justify-end gap-2" onClick={(e) => e.stopPropagation()}>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => abrirDialogoNota(nota)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleEliminar(nota.id_notas)}
                          >
                            <Trash2 className="h-4 w-4 text-destructive" />
                          </Button>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        {/* Primero el título */}
                        <h3 className="text-base font-semibold text-foreground">
                          {nota.titulo}
                        </h3>
                        
                        {/* Luego el texto de la nota */}
                        <div>
                          <p className="text-sm text-foreground line-clamp-4">
                            {nota.nota}
                          </p>
                          {nota.nota.length > 150 && (
                            <p className="text-xs text-primary mt-2 font-medium">
                              Haz clic para ver la nota completa
                            </p>
                          )}
                        </div>
                        
                        {/* Abajo: fecha, hora y creado por en pequeño y gris */}
                        <div className="text-xs text-muted-foreground space-y-1 pt-2 border-t border-border/50">
                          <p>
                            {new Date(nota.fecha_actualizacion).toLocaleDateString(
                              "es-CO",
                              {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                                hour: "2-digit",
                                minute: "2-digit",
                              }
                            )}
                          </p>
                          {nota.nombre_usuario_creador && (
                            <p>
                              Creado por: {nota.nombre_usuario_creador}
                            </p>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          </DialogContent>
        </Dialog>
      )}

      {/* Diálogo para ver nota completa */}
      {notaParaVer && (
        <Dialog open={mostrarDialogoVerNota} onOpenChange={setMostrarDialogoVerNota}>
          <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-2xl">{notaParaVer.titulo}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              {/* Primero el título (ya está en DialogTitle, pero lo mostramos también aquí para consistencia visual) */}
              <h2 className="text-xl font-semibold text-foreground">
                {notaParaVer.titulo}
              </h2>
              
              {/* Luego el texto de la nota */}
              <div className="bg-muted/50 rounded-lg p-4">
                <p className="text-base whitespace-pre-wrap leading-relaxed">
                  {notaParaVer.nota}
                </p>
              </div>
              
              {/* Abajo: fecha, hora y creado por en pequeño y gris */}
              <div className="text-xs text-muted-foreground space-y-1 pt-2 border-t border-border/50">
                <p>
                  {new Date(notaParaVer.fecha_actualizacion).toLocaleDateString(
                    "es-CO",
                    {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    }
                  )}
                </p>
                {notaParaVer.nombre_usuario_creador && (
                  <p>
                    Creado por: {notaParaVer.nombre_usuario_creador}
                  </p>
                )}
              </div>
            </div>
            <DialogFooter>
              <Button 
                variant="outline" 
                onClick={() => {
                  setMostrarDialogoVerNota(false);
                  setNotaParaVer(null);
                }}
              >
                Cerrar
              </Button>
              <Button 
                onClick={() => {
                  setMostrarDialogoVerNota(false);
                  abrirDialogoNota(notaParaVer);
                }}
              >
                <Edit className="mr-2 h-4 w-4" />
                Editar
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {/* Diálogo para crear/editar nota */}
      <Dialog open={mostrarDialogoNota} onOpenChange={setMostrarDialogoNota}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              {notaSeleccionada ? "Editar Nota" : "Nueva Nota"}
            </DialogTitle>
            <DialogDescription>
              {notaSeleccionada
                ? "Modifica los datos de la nota"
                : "Completa los datos para crear una nueva nota"}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium">Título</label>
              <Input
                value={formData.titulo}
                onChange={(e) =>
                  setFormData({ ...formData, titulo: e.target.value })
                }
                placeholder="Título de la nota"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Nota</label>
              <Textarea
                value={formData.nota}
                onChange={(e) =>
                  setFormData({ ...formData, nota: e.target.value })
                }
                placeholder="Escribe tu nota aquí..."
                rows={10}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setMostrarDialogoNota(false)}>
              Cancelar
            </Button>
            <Button onClick={handleGuardar}>
              {notaSeleccionada ? "Actualizar" : "Crear"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </PageContainer>
  );
};

export default GestionarNotas;
