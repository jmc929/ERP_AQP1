import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { User, ShoppingCart, TrendingUp, Package, DollarSign, Settings, LogOut } from "lucide-react";
import ModuleCard from "@/components/ModuleCard";

type Module = "compras" | "ventas" | "inventario" | "costos" | null;

interface ModuleOption {
  title: string;
  icon: React.ComponentType<{ className?: string }>;
}

const Dashboard = () => {
  const navigate = useNavigate();
  const [selectedModule, setSelectedModule] = useState<Module>(null);

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

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Header */}
      <header className="h-16 bg-card border-b border-border flex items-center justify-between px-6 shadow-sm">
        <h1 className="text-2xl font-bold text-foreground">{getDisplayTitle()}</h1>
        
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
            {modules.map((module) => (
              <button
                key={module.id}
                onClick={() => setSelectedModule(module.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                  selectedModule === module.id
                    ? "bg-sidebar-active text-white shadow-md"
                    : "text-sidebar-text hover:bg-sidebar-hover"
                }`}
              >
                <module.icon className="h-5 w-5" />
                <span className="font-medium">{module.name}</span>
              </button>
            ))}
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
