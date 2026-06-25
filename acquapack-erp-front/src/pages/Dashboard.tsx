import { useState, useEffect, useRef } from "react";
import { useNavigate, Outlet, useLocation } from "react-router-dom";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { User, ShoppingCart, TrendingUp, Package, DollarSign, Settings, LogOut, Home, Search, Box, Users, CheckSquare, BookOpen, Edit, Cog, Tag, Archive, FileText, StickyNote, Menu, Receipt, Factory, Plus, Wallet } from "lucide-react";
import ModuleCard from "@/components/ModuleCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";

type Module = "productos" | "compras" | "ventas" | "clientes" | "inventario" | "costos" | "cajas" | "nomina" | "produccion" | "gestion-tareas" | "usuarios" | "documentos" | "notas" | null;

interface ModuleOption {
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  path: string;
}

interface SearchResult {
  type: "module" | "option";
  moduleId: Module;
  optionIndex?: number;
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  path?: string;
}

const modules = [
  { id: "productos" as Module, name: "Productos", icon: Box },
  { id: "compras" as Module, name: "Compras", icon: ShoppingCart },
  { id: "ventas" as Module, name: "Ventas", icon: TrendingUp },
  { id: "clientes" as Module, name: "Clientes", icon: User },
  { id: "inventario" as Module, name: "Inventario", icon: Package },
  { id: "costos" as Module, name: "Costos", icon: DollarSign },
  { id: "cajas" as Module, name: "Cajas", icon: Wallet },
  { id: "nomina" as Module, name: "Nómina", icon: Receipt },
  { id: "produccion" as Module, name: "Producción", icon: Factory },
  { id: "gestion-tareas" as Module, name: "Gestión de Tareas", icon: CheckSquare },
  { id: "usuarios" as Module, name: "Usuarios", icon: Users },
  { id: "documentos" as Module, name: "Documentos", icon: FileText },
  { id: "notas" as Module, name: "Notas", icon: StickyNote },
];

const moduleOptions: Record<Exclude<Module, null>, ModuleOption[]> = {
  productos: [
    { title: "Catálogo General", icon: BookOpen, path: "/dashboard/productos/catalogo-general" },
    { title: "Crear / Editar Productos", icon: Edit, path: "/dashboard/productos/crear-editar" },
    { title: "Ver Productos Archivados", icon: Archive, path: "/dashboard/productos/archivados" },
    { title: "Configuración de Productos", icon: Cog, path: "/dashboard/productos/configuracion" },
    { title: "Etiqueta y Códigos", icon: Tag, path: "/dashboard/productos/etiqueta-codigos" },
    { title: "Productos x Proveedor", icon: Package, path: "/dashboard/compras/productos-x-proveedor" },
  ],
  compras: [
    { title: "Ingresar Factura", icon: ShoppingCart, path: "/dashboard/compras/ingresar-factura" },
    { title: "Ver Factura", icon: ShoppingCart, path: "/dashboard/compras/ver-factura" },
    { title: "Gestionar Proveedores", icon: User, path: "/dashboard/compras/gestionar-proveedores" },
    { title: "Configuración de Proveedores", icon: Cog, path: "/dashboard/compras/configuracion-proveedores" },
    { title: "Productos x Proveedor", icon: Package, path: "/dashboard/compras/productos-x-proveedor" },
  ],
  ventas: [
    { title: "Venta de Producto", icon: TrendingUp, path: "/dashboard/ventas/venta-producto" },
    { title: "Ver Ventas", icon: TrendingUp, path: "/dashboard/ventas/ver-ventas" },
  ],
  clientes: [
    { title: "Gestionar Clientes", icon: User, path: "/dashboard/clientes/gestionar-clientes" },
    { title: "Configuración de Clientes", icon: Cog, path: "/dashboard/clientes/configuracion-clientes" },
  ],
  inventario: [
    { title: "Ver Inventario (Bodegas)", icon: Package, path: "/dashboard/inventario/ver-inventario" },
    { title: "Traslados entre Bodegas", icon: Package, path: "/dashboard/inventario/traslados-bodegas" },
    { title: "Gestionar Bodegas", icon: Package, path: "/dashboard/inventario/gestionar-bodegas" },
  ],
  costos: [
    { title: "Ver Costos por Productos", icon: DollarSign, path: "/dashboard/costos/ver-costos" },
  ],
  cajas: [
    { title: "Ver Cajas", icon: Wallet, path: "/dashboard/cajas/ver-cajas" },
    { title: "Hacer Movimientos", icon: Plus, path: "/dashboard/cajas/hacer-movimientos" },
    { title: "Configuración de Cajas", icon: Cog, path: "/dashboard/cajas/configuracion" },
  ],
  nomina: [
    { title: "Hacer Nómina", icon: Receipt, path: "/dashboard/nomina/hacer-nomina" },
    { title: "Ver Nóminas", icon: Receipt, path: "/dashboard/nomina/ver-nominas" },
    { title: "Configuración de Nómina", icon: Cog, path: "/dashboard/nomina/configuracion" },
  ],
  produccion: [
    { title: "Agregar Producción", icon: Plus, path: "/dashboard/produccion/agregar" },
    { title: "Ver Producción", icon: Factory, path: "/dashboard/produccion/ver" },
    { title: "Corregir Producción", icon: Factory, path: "/dashboard/produccion/corregir" },
    { title: "Configuración de Producción", icon: Cog, path: "/dashboard/produccion/configuracion" },
  ],
  "gestion-tareas": [],
  usuarios: [
    { title: "Crear Usuarios", icon: Users, path: "/dashboard/usuarios/crear-usuarios" },
    { title: "Ver Usuarios", icon: Users, path: "/dashboard/usuarios/ver-usuarios" },
    { title: "Configuración de Usuarios", icon: Cog, path: "/dashboard/usuarios/configuracion" },
  ],
  documentos: [
    { title: "Trabajadores", icon: Users, path: "/dashboard/documentos/gestionar?carpeta=trabajadores" },
    { title: "Gestión Humana", icon: Users, path: "/dashboard/documentos/gestionar?carpeta=gestion-humana" },
    { title: "SST", icon: Users, path: "/dashboard/documentos/gestionar?carpeta=sst" },
    { title: "Facturas", icon: FileText, path: "/dashboard/documentos/gestionar?carpeta=facturas" },
    { title: "Contratos", icon: FileText, path: "/dashboard/documentos/gestionar?carpeta=contratos" },
    { title: "Certificados", icon: FileText, path: "/dashboard/documentos/gestionar?carpeta=certificados" },
    { title: "Manuales", icon: FileText, path: "/dashboard/documentos/gestionar?carpeta=manuales" },
    { title: "Otros", icon: FileText, path: "/dashboard/documentos/gestionar?carpeta=otros" },
    { title: "Todos los Documentos", icon: FileText, path: "/dashboard/documentos/gestionar" },
  ],
  notas: [],
};

const Dashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedModule, setSelectedModule] = useState<Module>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  const [userRoles, setUserRoles] = useState<number[]>([]);

  useEffect(() => {
    const usuarioStr = localStorage.getItem("usuario");
    if (usuarioStr) {
      try {
        const usuario = JSON.parse(usuarioStr);
        if (usuario.roles) {
          setUserRoles(usuario.roles.map((r: any) => r.id_rol));
        }
      } catch (e) {
        console.error("Error parsing user from localStorage", e);
      }
    }
  }, []);

  const isSpecialProductionRole = userRoles.some(rolId => [8, 9, 10, 11].includes(rolId));

  // Redirigir si intenta acceder a rutas no permitidas en rol de produccion especial
  useEffect(() => {
    if (isSpecialProductionRole && location.pathname !== "/dashboard" && location.pathname !== "/dashboard/produccion/agregar") {
      navigate("/dashboard", { replace: true });
    }
  }, [isSpecialProductionRole, location.pathname, navigate]);

  // Autoseleccionar modulo de produccion si tiene rol especial
  useEffect(() => {
    if (isSpecialProductionRole && location.pathname === "/dashboard" && selectedModule !== "produccion") {
      setSelectedModule("produccion");
    }
  }, [isSpecialProductionRole, location.pathname, selectedModule]);

  // Mapeo de rutas a m?dulos y opciones
  const routeToModuleAndOption = (pathname: string): { module: Module; option: string | null } => {
    const fullPath = pathname + location.search;
    for (const [moduleId, options] of Object.entries(moduleOptions)) {
      for (const option of options) {
        if (fullPath === option.path) {
          return { module: moduleId as Module, option: option.title };
        }
      }
    }
    // Si no coincide exactamente con una opción, buscar el módulo base por la url
    for (const mod of modules) {
      if (pathname.includes(`/${mod.id}`)) {
        return { module: mod.id, option: null };
      }
    }
    return { module: null, option: null };
  };

  // Detectar si estamos en una p?gina de m?dulo para mantener el m?dulo seleccionado
  useEffect(() => {
    const { module } = routeToModuleAndOption(location.pathname);
    if (module) {
      setSelectedModule(module);
    } else if (location.pathname === "/dashboard") {
      // Si estamos en /dashboard sin ruta anidada, no cambiar el m?dulo
    }
  }, [location.pathname]);

  const handleLogout = () => {
    // Limpiar la sesi?n del usuario
    localStorage.removeItem("usuario");
    // Redirigir al login
    navigate("/login", { replace: true });
  };




  const getDisplayTitle = () => {
    if (location.pathname === "/dashboard" && !selectedModule) {
      return "ERP_ACQUAPACK";
    }
    
    const { module, option } = routeToModuleAndOption(location.pathname);
    
    if (module && option) {
      const moduleName = modules.find(m => m.id === module)?.name || "";
      return `${moduleName.toUpperCase()} / ${option.toUpperCase()}`;
    }
    
    if (selectedModule) {
      const module = modules.find(m => m.id === selectedModule);
      return module?.name.toUpperCase() || "ERP_ACQUAPACK";
    }
    
    return "ERP_ACQUAPACK";
  };

  const selectModule = (moduleId: Module) => {
    if (!moduleId) return;
    setSelectedModule(moduleId);
    // Si el m?dulo no tiene opciones, navegar directamente
    if (moduleId === "gestion-tareas" && moduleOptions[moduleId].length === 0) {
      navigate("/dashboard/gestion-tareas");
    } else if (moduleId === "notas" && moduleOptions[moduleId].length === 0) {
      navigate("/dashboard/notas");
    } else if (moduleId === "documentos" && moduleOptions[moduleId].length === 0) {
      navigate("/dashboard/documentos/gestionar");
    } else if (location.pathname !== "/dashboard") {
      // Si estamos en una opci?n y cambiamos de m?dulo, volver al dashboard para ver las opciones
      navigate("/dashboard");
    }
  };

  const searchResults = (): SearchResult[] => {
    if (!searchQuery.trim()) return [];

    const query = searchQuery.toLowerCase().trim();
    const results: SearchResult[] = [];

    // Buscar en m?dulos
    const filteredSearchModules = isSpecialProductionRole
      ? modules.filter((m) => m.id === "produccion")
      : modules;

    filteredSearchModules.forEach((module) => {
      if (module.name.toLowerCase().includes(query)) {
        results.push({
          type: "module",
          moduleId: module.id,
          title: module.name,
          icon: module.icon,
        });
      }
    });

    // Buscar en opciones de módulos
    Object.entries(moduleOptions).forEach(([moduleId, options]) => {
      if (isSpecialProductionRole && moduleId !== "produccion") return;

      const filteredOptions = (moduleId === "produccion" && isSpecialProductionRole)
        ? options.filter((o) => o.title.toLowerCase().includes("agregar"))
        : options;

      filteredOptions.forEach((option, index) => {
        if (option.title.toLowerCase().includes(query)) {
          const module = modules.find((m) => m.id === moduleId);
          if (module) {
            results.push({
              type: "option",
              moduleId: moduleId as Module,
              optionIndex: index,
              title: option.title,
              icon: option.icon,
              path: option.path,
            });
          }
        }
      });
    });

    return results;
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleResultClick = (result: SearchResult) => {
    if (result.type === "module") {
      setSelectedModule(result.moduleId);
    } else {
      setSelectedModule(result.moduleId);
      if (result.path) {
        navigate(result.path);
      } else {
        console.log(`Navegando a: ${result.title}`);
      }
    }
    setSearchQuery("");
  };

  const results = searchResults();

  // Cerrar resultados al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        // No cerrar si hay texto en la b?squeda, solo si se hace clic fuera
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setSearchQuery("");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  const SidebarContent = () => (
    <div className="p-4 space-y-2 h-full">
      {/* Opci?n Inicio (ocultar si es rol especial) */}
      {!isSpecialProductionRole && (
        <button
          onClick={() => {
            setSelectedModule(null);
            navigate("/dashboard");
            if (isMobile) setSidebarOpen(false);
          }}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
            selectedModule === null && location.pathname === "/dashboard"
              ? "bg-sidebar-active text-white shadow-md"
              : "text-sidebar-text hover:bg-sidebar-hover"
          }`}
        >
          <Home className="h-5 w-5" />
          <span className="font-medium">Inicio</span>
        </button>
      )}
      
      {(() => {
        const allowedModules = isSpecialProductionRole
          ? modules.filter((m) => m.id === "produccion")
          : modules;
        return allowedModules.map((module) => {
          return (
            <button
              key={module.id}
              onClick={() => {
                selectModule(module.id);
                if (isMobile) setSidebarOpen(false);
              }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                selectedModule === module.id
                  ? "bg-sidebar-active text-white shadow-md"
                  : "text-sidebar-text hover:bg-sidebar-hover"
              }`}
            >
              <module.icon className="h-5 w-5" />
              <span className="font-medium flex-1 text-left">{module.name}</span>
            </button>
          );
        });
      })()}
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Header */}
      <header className="h-14 md:h-16 bg-card border-b border-border flex items-center justify-between px-3 md:px-6 shadow-sm gap-2 md:gap-4">
        {/* Bot?n men? m?vil y t?tulo */}
        <div className="flex items-center gap-2 md:gap-4 min-w-0">
          {isMobile && (
            <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="h-9 w-9 flex-shrink-0">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-64 p-0 bg-sidebar-bg border-r border-border">
                <SidebarContent />
              </SheetContent>
            </Sheet>
          )}
          <h1 className="text-lg md:text-2xl font-bold text-foreground truncate">{getDisplayTitle()}</h1>
        </div>
        
        {/* Barra de b?squeda - Desktop */}
        {!isMobile ? (
          <div className="flex-1 max-w-md mx-4 min-w-0">
            <div className="relative" ref={searchRef}>
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Buscar en toda la ERP..."
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                className="pl-10 w-full"
              />
              
              {/* Resultados de b?squeda */}
              {searchQuery.trim() && results.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-card border border-border rounded-md shadow-lg z-50 max-h-96 overflow-y-auto">
                  <div className="p-2">
                    {results.map((result, index) => {
                      const IconComponent = result.icon;
                      return (
                        <button
                          key={index}
                          onClick={() => handleResultClick(result)}
                          className="w-full flex items-center gap-3 px-3 py-2 rounded-md hover:bg-accent transition-colors text-left"
                        >
                          <IconComponent className="h-4 w-4 flex-shrink-0 text-muted-foreground" />
                          <div className="flex-1 min-w-0">
                            <div className="text-sm font-medium text-foreground">{result.title}</div>
                            <div className="text-xs text-muted-foreground">
                              {result.type === "module" ? "M?dulo" : "Opci?n"}
                            </div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
              
              {searchQuery.trim() && results.length === 0 && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-card border border-border rounded-md shadow-lg z-50 p-4">
                  <p className="text-sm text-muted-foreground text-center">
                    No se encontraron resultados
                  </p>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="relative" ref={searchRef}>
            <Button
              variant="ghost"
              size="icon"
              className="h-9 w-9 flex-shrink-0"
              onClick={() => {
                const input = document.getElementById("mobile-search");
                if (input) {
                  input.focus();
                }
              }}
            >
              <Search className="h-5 w-5" />
            </Button>
            {searchQuery.trim() && (
              <div className="absolute top-full right-0 mt-2 w-80 bg-card border border-border rounded-md shadow-lg z-50 max-h-96 overflow-y-auto">
                <div className="p-2">
                  {results.length > 0 ? (
                    results.map((result, index) => {
                      const IconComponent = result.icon;
                      return (
                        <button
                          key={index}
                          onClick={() => {
                            handleResultClick(result);
                            setSidebarOpen(false);
                          }}
                          className="w-full flex items-center gap-3 px-3 py-2 rounded-md hover:bg-accent transition-colors text-left"
                        >
                          <IconComponent className="h-4 w-4 flex-shrink-0 text-muted-foreground" />
                          <div className="flex-1 min-w-0">
                            <div className="text-sm font-medium text-foreground">{result.title}</div>
                            <div className="text-xs text-muted-foreground">
                              {result.type === "module" ? "M?dulo" : "Opci?n"}
                            </div>
                          </div>
                        </button>
                      );
                    })
                  ) : (
                    <p className="text-sm text-muted-foreground text-center p-4">
                      No se encontraron resultados
                    </p>
                  )}
                </div>
              </div>
            )}
            <Input
              id="mobile-search"
              type="text"
              placeholder="Buscar..."
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              className="absolute top-0 left-0 w-0 h-0 opacity-0 pointer-events-none"
            />
          </div>
        )}
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Avatar className="h-9 w-9 md:h-10 md:w-10 cursor-pointer hover:ring-2 hover:ring-primary transition-all flex-shrink-0">
              <AvatarFallback className="bg-primary text-primary-foreground">
                <User className="h-4 w-4 md:h-5 md:w-5" />
              </AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuItem className="cursor-pointer">
              <Settings className="mr-2 h-4 w-4" />
              <span>Configuraciones</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer text-destructive focus:text-destructive" onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" />
              <span>Cerrar Sesi?n</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </header>

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar - M?dulos - Solo visible en desktop */}
        {!isMobile && (
          <aside className="w-64 bg-sidebar-bg border-r border-border overflow-y-auto">
            <SidebarContent />
          </aside>
        )}

        {/* Content Area */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
          {/* Si hay una ruta anidada, mostrar el Outlet, sino mostrar el contenido del Dashboard */}
          {location.pathname !== "/dashboard" ? (
            <Outlet />
          ) : !selectedModule ? (
            <div className="h-full flex items-center justify-center py-12 md:py-0">
              <p className="text-lg md:text-2xl text-muted-foreground font-light text-center px-4">
                Seleccione m?dulo para ver m?s informaci?n
              </p>
            </div>
          ) : moduleOptions[selectedModule].length === 0 ? (
            (selectedModule === "gestion-tareas" || selectedModule === "notas" || selectedModule === "documentos") ? (
              <Outlet />
            ) : (
              <div className="h-full flex items-center justify-center py-12 md:py-0">
                <p className="text-lg md:text-2xl text-muted-foreground font-light text-center px-4">
                  Este m?dulo a?n no tiene opciones disponibles
                </p>
              </div>
            )
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {(selectedModule === "produccion" && isSpecialProductionRole
                ? moduleOptions[selectedModule].filter((o) => o.title.toLowerCase().includes("agregar"))
                : moduleOptions[selectedModule]
              ).map((option, index) => {
                const handleClick = () => {
                  navigate(option.path);
                };
                return (
                  <ModuleCard
                    key={index}
                    title={option.title}
                    icon={option.icon}
                    onClick={handleClick}
                  />
                );
              })}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
