import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { User, ShoppingCart, TrendingUp, Package, DollarSign, Settings, LogOut, Home, ChevronRight, Search } from "lucide-react";
import ModuleCard from "@/components/ModuleCard";
import { Input } from "@/components/ui/input";

type Module = "compras" | "ventas" | "inventario" | "costos" | null;

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
  const [selectedModule, setSelectedModule] = useState<Module>(null);
  const [expandedModules, setExpandedModules] = useState<Set<Module>>(new Set());
  const [searchQuery, setSearchQuery] = useState("");
  const searchRef = useRef<HTMLDivElement>(null);

  const handleLogout = () => {
    navigate("/login");
  };

  const modules = [
    { id: "compras" as Module, name: "Compras", icon: ShoppingCart },
    { id: "ventas" as Module, name: "Ventas", icon: TrendingUp },
    { id: "inventario" as Module, name: "Inventario", icon: Package },
    { id: "costos" as Module, name: "Costos", icon: DollarSign },
  ];

  const moduleOptions: Record<Exclude<Module, null>, ModuleOption[]> = {
    compras: [
      { title: "Ingresar Factura", icon: ShoppingCart },
      { title: "Ver Factura", icon: ShoppingCart },
      { title: "Gestionar Proveedores", icon: User },
    ],
    ventas: [
      { title: "Venta de Producto", icon: TrendingUp },
      { title: "Ver Ventas", icon: TrendingUp },
      { title: "Gestionar Clientes", icon: User },
    ],
    inventario: [
      { title: "Ver Inventario (Bodegas)", icon: Package },
      { title: "Traslados entre Bodegas", icon: Package },
      { title: "Gestionar Bodegas", icon: Package },
    ],
    costos: [
      { title: "Ver Costos por Productos", icon: DollarSign },
    ],
  };

  const getDisplayTitle = () => {
    if (!selectedModule) return "ERP_ACQUAPACK";
    const module = modules.find(m => m.id === selectedModule);
    return module?.name.toUpperCase() || "ERP_ACQUAPACK";
  };

  const toggleModule = (moduleId: Module) => {
    if (!moduleId) return;
    setExpandedModules((prev) => {
      // Si el módulo ya está expandido, lo colapsamos
      if (prev.has(moduleId)) {
        return new Set();
      }
      // Si no está expandido, lo expandimos y colapsamos todos los demás
      return new Set([moduleId]);
    });
    setSelectedModule(moduleId);
  };

  const isExpanded = (moduleId: Module) => {
    return moduleId ? expandedModules.has(moduleId) : false;
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
      // Expandir el módulo y colapsar los demás
      setExpandedModules(new Set([result.moduleId]));
    } else {
      // Si es una opción, seleccionar el módulo y expandirlo (colapsando los demás)
      setSelectedModule(result.moduleId);
      setExpandedModules(new Set([result.moduleId]));
      // Aquí puedes navegar a la opción específica
      console.log(`Navegando a: ${result.title}`);
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
              onClick={() => setSelectedModule(null)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                selectedModule === null
                  ? "bg-sidebar-active text-white shadow-md"
                  : "text-sidebar-text hover:bg-sidebar-hover"
              }`}
            >
              <Home className="h-5 w-5" />
              <span className="font-medium">Inicio</span>
            </button>
            
            {modules.map((module) => {
              const expanded = isExpanded(module.id);
              return (
                <div key={module.id}>
                  <button
                    onClick={() => toggleModule(module.id)}
                    className={`w-full flex items-center gap-2 px-4 py-3 rounded-lg transition-all duration-200 ${
                      selectedModule === module.id
                        ? "bg-sidebar-active text-white shadow-md"
                        : "text-sidebar-text hover:bg-sidebar-hover"
                    }`}
                  >
                    <ChevronRight
                      className={`h-4 w-4 transition-transform duration-200 ${
                        expanded ? "rotate-90" : ""
                      }`}
                    />
                    <module.icon className="h-5 w-5" />
                    <span className="font-medium flex-1 text-left">{module.name}</span>
                  </button>
                  
                  {/* Opciones del módulo cuando está expandido */}
                  {expanded && (
                    <div className="ml-6 mt-1 space-y-1">
                      {moduleOptions[module.id].map((option, index) => (
                        <button
                          key={index}
                          onClick={() => console.log(`Navegando a: ${option.title}`)}
                          className="w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200 text-sidebar-text hover:bg-sidebar-hover text-left"
                        >
                          <option.icon className="h-4 w-4 flex-shrink-0" />
                          <span className="text-sm font-medium">{option.title}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </aside>

        {/* Content Area */}
        <main className="flex-1 overflow-y-auto p-8">
          {!selectedModule ? (
            <div className="h-full flex items-center justify-center">
              <p className="text-2xl text-muted-foreground font-light">
                Seleccione módulo para ver más información
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {moduleOptions[selectedModule].map((option, index) => (
                <ModuleCard
                  key={index}
                  title={option.title}
                  icon={option.icon}
                  onClick={() => console.log(`Navegando a: ${option.title}`)}
                />
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
