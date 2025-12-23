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
import { User, ShoppingCart, TrendingUp, Package, DollarSign, Settings, LogOut, Home, Search, Box, Users, CheckSquare, BookOpen, Edit, Cog, Tag, Archive } from "lucide-react";
import ModuleCard from "@/components/ModuleCard";
import { Input } from "@/components/ui/input";

type Module = "productos" | "compras" | "ventas" | "inventario" | "costos" | "gestion-tareas" | "usuarios" | null;

interface ModuleOption {
  title: string;
  icon: React.ComponentType<{ className?: string }>;
}

interface SearchResult {
  type: "module" | "option";
  moduleId: Module;
  optionIndex?: number;
  title: string;
  icon: React.ComponentType<{ className?: string }>;
}

const Dashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedModule, setSelectedModule] = useState<Module>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const searchRef = useRef<HTMLDivElement>(null);

  // Mapeo de rutas a módulos y opciones
  const routeToModuleAndOption = (pathname: string): { module: Module; option: string | null } => {
    if (pathname.includes("/productos/catalogo-general")) {
      return { module: "productos", option: "Catálogo General" };
    }
    if (pathname.includes("/productos/crear-editar")) {
      return { module: "productos", option: "Crear / Editar Productos" };
    }
    if (pathname.includes("/productos/archivados")) {
      return { module: "productos", option: "Ver Productos Archivados" };
    }
    if (pathname.includes("/productos/configuracion")) {
      return { module: "productos", option: "Configuración de Productos" };
    }
    if (pathname.includes("/productos/etiqueta-codigos")) {
      return { module: "productos", option: "Etiqueta y Códigos" };
    }
    if (pathname.includes("/productos/productos-x-proveedor") || pathname.includes("/compras/productos-x-proveedor")) {
      return { module: "productos", option: "Productos x Proveedor" };
    }
    if (pathname.includes("/productos")) {
      return { module: "productos", option: null };
    }
    if (pathname.includes("/compras/ingresar-factura")) {
      return { module: "compras", option: "Ingresar Factura" };
    }
    if (pathname.includes("/compras/ver-factura")) {
      return { module: "compras", option: "Ver Factura" };
    }
    if (pathname.includes("/compras/gestionar-proveedores")) {
      return { module: "compras", option: "Gestionar Proveedores" };
    }
    if (pathname.includes("/compras/configuracion-proveedores")) {
      return { module: "compras", option: "Configuración de Proveedores" };
    }
    if (pathname.includes("/compras/productos-x-proveedor")) {
      return { module: "compras", option: "Productos x Proveedor" };
    }
    if (pathname.includes("/compras")) {
      return { module: "compras", option: null };
    }
    if (pathname.includes("/ventas/venta-producto")) {
      return { module: "ventas", option: "Venta de Producto" };
    }
    if (pathname.includes("/ventas/ver-ventas")) {
      return { module: "ventas", option: "Ver Ventas" };
    }
    if (pathname.includes("/ventas/gestionar-clientes")) {
      return { module: "ventas", option: "Gestionar Clientes" };
    }
    if (pathname.includes("/ventas/configuracion-clientes")) {
      return { module: "ventas", option: "Configuración de Clientes" };
    }
    if (pathname.includes("/ventas")) {
      return { module: "ventas", option: null };
    }
    if (pathname.includes("/usuarios/crear-usuarios")) {
      return { module: "usuarios", option: "Crear Usuarios" };
    }
    if (pathname.includes("/usuarios/ver-usuarios")) {
      return { module: "usuarios", option: "Ver Usuarios" };
    }
    if (pathname.includes("/usuarios/configuracion")) {
      return { module: "usuarios", option: "Configuración de Usuarios" };
    }
    if (pathname.includes("/usuarios")) {
      return { module: "usuarios", option: null };
    }
    if (pathname.includes("/gestion-tareas")) {
      return { module: "gestion-tareas", option: null };
    }
    if (pathname.includes("/inventario/gestionar-bodegas")) {
      return { module: "inventario", option: "Gestionar Bodegas" };
    }
    if (pathname.includes("/inventario/traslados-bodegas")) {
      return { module: "inventario", option: "Traslados entre Bodegas" };
    }
    if (pathname.includes("/inventario/ver-inventario")) {
      return { module: "inventario", option: "Ver Inventario (Bodegas)" };
    }
    if (pathname.includes("/inventario")) {
      return { module: "inventario", option: null };
    }
    if (pathname.includes("/costos/ver-costos")) {
      return { module: "costos", option: "Ver Costos por Productos" };
    }
    if (pathname.includes("/costos")) {
      return { module: "costos", option: null };
    }
    // Agregar más rutas aquí cuando se creen más páginas
    return { module: null, option: null };
  };

  // Detectar si estamos en una página de módulo para mantener el módulo seleccionado
  useEffect(() => {
    const { module } = routeToModuleAndOption(location.pathname);
    if (module) {
      setSelectedModule(module);
    } else if (location.pathname === "/dashboard") {
      // Si estamos en /dashboard sin ruta anidada, no cambiar el módulo
    }
  }, [location.pathname]);

  const handleLogout = () => {
    navigate("/login");
  };

  const modules = [
    { id: "productos" as Module, name: "Productos", icon: Box },
    { id: "compras" as Module, name: "Compras", icon: ShoppingCart },
    { id: "ventas" as Module, name: "Ventas", icon: TrendingUp },
    { id: "inventario" as Module, name: "Inventario", icon: Package },
    { id: "costos" as Module, name: "Costos", icon: DollarSign },
    { id: "gestion-tareas" as Module, name: "Gestión de Tareas", icon: CheckSquare },
    { id: "usuarios" as Module, name: "Usuarios", icon: Users },
  ];

  const moduleOptions: Record<Exclude<Module, null>, ModuleOption[]> = {
    productos: [
      { title: "Catálogo General", icon: BookOpen },
      { title: "Crear / Editar Productos", icon: Edit },
      { title: "Ver Productos Archivados", icon: Archive },
      { title: "Configuración de Productos", icon: Cog },
      { title: "Etiqueta y Códigos", icon: Tag },
      { title: "Productos x Proveedor", icon: Package },
    ],
    compras: [
      { title: "Ingresar Factura", icon: ShoppingCart },
      { title: "Ver Factura", icon: ShoppingCart },
      { title: "Gestionar Proveedores", icon: User },
      { title: "Configuración de Proveedores", icon: Cog },
      { title: "Productos x Proveedor", icon: Package },
    ],
    ventas: [
      { title: "Venta de Producto", icon: TrendingUp },
      { title: "Ver Ventas", icon: TrendingUp },
      { title: "Gestionar Clientes", icon: User },
      { title: "Configuración de Clientes", icon: Cog },
    ],
    inventario: [
      { title: "Ver Inventario (Bodegas)", icon: Package },
      { title: "Traslados entre Bodegas", icon: Package },
      { title: "Gestionar Bodegas", icon: Package },
    ],
    costos: [
      { title: "Ver Costos por Productos", icon: DollarSign },
    ],
    "gestion-tareas": [],
    usuarios: [
      { title: "Crear Usuarios", icon: Users },
      { title: "Ver Usuarios", icon: Users },
      { title: "Configuración de Usuarios", icon: Cog },
    ],
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
    // Si el módulo es "gestion-tareas" y no tiene opciones, navegar directamente
    if (moduleId === "gestion-tareas" && moduleOptions[moduleId].length === 0) {
      navigate("/dashboard/gestion-tareas");
    } else if (location.pathname !== "/dashboard") {
      // Si estamos en una opción y cambiamos de módulo, volver al dashboard para ver las opciones
      navigate("/dashboard");
    }
  };

  const searchResults = (): SearchResult[] => {
    if (!searchQuery.trim()) return [];

    const query = searchQuery.toLowerCase().trim();
    const results: SearchResult[] = [];

    // Buscar en módulos
    modules.forEach((module) => {
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
      options.forEach((option, index) => {
        if (option.title.toLowerCase().includes(query)) {
          const module = modules.find((m) => m.id === moduleId);
          if (module) {
            results.push({
              type: "option",
              moduleId: moduleId as Module,
              optionIndex: index,
              title: option.title,
              icon: option.icon,
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
      // Si es una opción, seleccionar el módulo
      setSelectedModule(result.moduleId);
      // Navegar a la opción específica
      if (result.moduleId === "productos" && result.title === "Catálogo General") {
        navigate("/dashboard/productos/catalogo-general");
      } else if (result.moduleId === "productos" && result.title === "Crear / Editar Productos") {
        navigate("/dashboard/productos/crear-editar");
      } else if (result.moduleId === "productos" && result.title === "Ver Productos Archivados") {
        navigate("/dashboard/productos/archivados");
      } else if (result.moduleId === "productos" && result.title === "Configuración de Productos") {
        navigate("/dashboard/productos/configuracion");
      } else if (result.moduleId === "productos" && result.title === "Etiqueta y Códigos") {
        navigate("/dashboard/productos/etiqueta-codigos");
      } else if (result.moduleId === "productos" && result.title === "Productos x Proveedor") {
        navigate("/dashboard/compras/productos-x-proveedor");
      } else if (result.moduleId === "compras" && result.title === "Ingresar Factura") {
        navigate("/dashboard/compras/ingresar-factura");
      } else if (result.moduleId === "compras" && result.title === "Ver Factura") {
        navigate("/dashboard/compras/ver-factura");
      } else if (result.moduleId === "compras" && result.title === "Gestionar Proveedores") {
        navigate("/dashboard/compras/gestionar-proveedores");
      } else if (result.moduleId === "compras" && result.title === "Configuración de Proveedores") {
        navigate("/dashboard/compras/configuracion-proveedores");
      } else if (result.moduleId === "compras" && result.title === "Productos x Proveedor") {
        navigate("/dashboard/compras/productos-x-proveedor");
      } else if (result.moduleId === "ventas" && result.title === "Venta de Producto") {
        navigate("/dashboard/ventas/venta-producto");
      } else if (result.moduleId === "ventas" && result.title === "Ver Ventas") {
        navigate("/dashboard/ventas/ver-ventas");
      } else if (result.moduleId === "ventas" && result.title === "Gestionar Clientes") {
        navigate("/dashboard/ventas/gestionar-clientes");
      } else if (result.moduleId === "ventas" && result.title === "Configuración de Clientes") {
        navigate("/dashboard/ventas/configuracion-clientes");
      } else if (result.moduleId === "usuarios" && result.title === "Crear Usuarios") {
        navigate("/dashboard/usuarios/crear-usuarios");
      } else if (result.moduleId === "usuarios" && result.title === "Ver Usuarios") {
        navigate("/dashboard/usuarios/ver-usuarios");
      } else if (result.moduleId === "usuarios" && result.title === "Configuración de Usuarios") {
        navigate("/dashboard/usuarios/configuracion");
      } else if (result.moduleId === "inventario" && result.title === "Gestionar Bodegas") {
        navigate("/dashboard/inventario/gestionar-bodegas");
      } else if (result.moduleId === "inventario" && result.title === "Traslados entre Bodegas") {
        navigate("/dashboard/inventario/traslados-bodegas");
      } else if (result.moduleId === "inventario" && result.title === "Ver Inventario (Bodegas)") {
        navigate("/dashboard/inventario/ver-inventario");
      } else if (result.moduleId === "costos" && result.title === "Ver Costos por Productos") {
        navigate("/dashboard/costos/ver-costos");
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
        // No cerrar si hay texto en la búsqueda, solo si se hace clic fuera
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

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Header */}
      <header className="h-16 bg-card border-b border-border flex items-center justify-between px-6 shadow-sm gap-4">
        <h1 className="text-2xl font-bold text-foreground">{getDisplayTitle()}</h1>
        
        {/* Barra de búsqueda */}
        <div className="flex-1 max-w-md mx-4">
          <div className="relative" ref={searchRef}>
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Buscar en toda la ERP..."
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              className="pl-10 w-full"
            />
            
            {/* Resultados de búsqueda */}
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
                            {result.type === "module" ? "Módulo" : "Opción"}
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
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Avatar className="h-10 w-10 cursor-pointer hover:ring-2 hover:ring-primary transition-all">
              <AvatarFallback className="bg-primary text-primary-foreground">
                <User className="h-5 w-5" />
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
              <span>Cerrar Sesión</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </header>

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar - Módulos */}
        <aside className="w-64 bg-sidebar-bg border-r border-border overflow-y-auto">
          <div className="p-4 space-y-2">
            {/* Opción Inicio */}
            <button
              onClick={() => {
                setSelectedModule(null);
                navigate("/dashboard");
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
            
            {modules.map((module) => {
              return (
                <button
                  key={module.id}
                  onClick={() => selectModule(module.id)}
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
            })}
          </div>
        </aside>

        {/* Content Area */}
        <main className="flex-1 overflow-y-auto p-8">
          {/* Si hay una ruta anidada, mostrar el Outlet, sino mostrar el contenido del Dashboard */}
          {location.pathname !== "/dashboard" ? (
            <Outlet />
          ) : !selectedModule ? (
            <div className="h-full flex items-center justify-center">
              <p className="text-2xl text-muted-foreground font-light">
                Seleccione módulo para ver más información
              </p>
            </div>
          ) : moduleOptions[selectedModule].length === 0 ? (
            selectedModule === "gestion-tareas" ? (
              <Outlet />
            ) : (
              <div className="h-full flex items-center justify-center">
                <p className="text-2xl text-muted-foreground font-light">
                  Este módulo aún no tiene opciones disponibles
                </p>
              </div>
            )
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {moduleOptions[selectedModule].map((option, index) => {
                const handleClick = () => {
                  if (selectedModule === "productos" && option.title === "Catálogo General") {
                    navigate("/dashboard/productos/catalogo-general");
                  } else if (selectedModule === "productos" && option.title === "Crear / Editar Productos") {
                    navigate("/dashboard/productos/crear-editar");
                  } else if (selectedModule === "productos" && option.title === "Ver Productos Archivados") {
                    navigate("/dashboard/productos/archivados");
                  } else if (selectedModule === "productos" && option.title === "Configuración de Productos") {
                    navigate("/dashboard/productos/configuracion");
                  } else if (selectedModule === "productos" && option.title === "Etiqueta y Códigos") {
                    navigate("/dashboard/productos/etiqueta-codigos");
                  } else if (selectedModule === "productos" && option.title === "Productos x Proveedor") {
                    navigate("/dashboard/compras/productos-x-proveedor");
                  } else if (selectedModule === "compras" && option.title === "Ingresar Factura") {
                    navigate("/dashboard/compras/ingresar-factura");
                  } else if (selectedModule === "compras" && option.title === "Ver Factura") {
                    navigate("/dashboard/compras/ver-factura");
                  } else if (selectedModule === "compras" && option.title === "Gestionar Proveedores") {
                    navigate("/dashboard/compras/gestionar-proveedores");
                  } else if (selectedModule === "compras" && option.title === "Configuración de Proveedores") {
                    navigate("/dashboard/compras/configuracion-proveedores");
                  } else if (selectedModule === "compras" && option.title === "Productos x Proveedor") {
                    navigate("/dashboard/compras/productos-x-proveedor");
                  } else if (selectedModule === "ventas" && option.title === "Venta de Producto") {
                    navigate("/dashboard/ventas/venta-producto");
                  } else if (selectedModule === "ventas" && option.title === "Ver Ventas") {
                    navigate("/dashboard/ventas/ver-ventas");
                  } else if (selectedModule === "ventas" && option.title === "Gestionar Clientes") {
                    navigate("/dashboard/ventas/gestionar-clientes");
                  } else if (selectedModule === "ventas" && option.title === "Configuración de Clientes") {
                    navigate("/dashboard/ventas/configuracion-clientes");
                  } else if (selectedModule === "usuarios" && option.title === "Crear Usuarios") {
                    navigate("/dashboard/usuarios/crear-usuarios");
                  } else if (selectedModule === "usuarios" && option.title === "Ver Usuarios") {
                    navigate("/dashboard/usuarios/ver-usuarios");
                  } else if (selectedModule === "usuarios" && option.title === "Configuración de Usuarios") {
                    navigate("/dashboard/usuarios/configuracion");
                  } else if (selectedModule === "inventario" && option.title === "Gestionar Bodegas") {
                    navigate("/dashboard/inventario/gestionar-bodegas");
                  } else if (selectedModule === "inventario" && option.title === "Traslados entre Bodegas") {
                    navigate("/dashboard/inventario/traslados-bodegas");
                  } else if (selectedModule === "inventario" && option.title === "Ver Inventario (Bodegas)") {
                    navigate("/dashboard/inventario/ver-inventario");
                  } else if (selectedModule === "costos" && option.title === "Ver Costos por Productos") {
                    navigate("/dashboard/costos/ver-costos");
                  } else {
                    console.log(`Navegando a: ${option.title}`);
                  }
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
