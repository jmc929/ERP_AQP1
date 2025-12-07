import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import GestionProductos from "./pages/GestionProductos";
import CategoriasFamilia from "./pages/CategoriasFamilia";
import Atributos from "./pages/Atributos";
import IngresarFactura from "./pages/IngresarFactura";
import VerFactura from "./pages/VerFactura";
import GestionarProveedores from "./pages/GestionarProveedores";
import VentaProducto from "./pages/VentaProducto";
import VerVentas from "./pages/VerVentas";
import GestionarClientes from "./pages/GestionarClientes";
import CrearUsuarios from "./pages/CrearUsuarios";
import VerUsuarios from "./pages/VerUsuarios";
import GestionTareas from "./pages/GestionTareas";
import GestionarBodegas from "./pages/GestionarBodegas";
import TrasladosBodegas from "./pages/TrasladosBodegas";
import VerInventarioBodegas from "./pages/VerInventarioBodegas";
import VerCostosProductos from "./pages/VerCostosProductos";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />}>
            <Route path="productos/gestion" element={<GestionProductos />} />
            <Route path="productos/categorias-familia" element={<CategoriasFamilia />} />
            <Route path="productos/atributos" element={<Atributos />} />
            <Route path="compras/ingresar-factura" element={<IngresarFactura />} />
            <Route path="compras/ver-factura" element={<VerFactura />} />
            <Route path="compras/gestionar-proveedores" element={<GestionarProveedores />} />
            <Route path="ventas/venta-producto" element={<VentaProducto />} />
            <Route path="ventas/ver-ventas" element={<VerVentas />} />
            <Route path="ventas/gestionar-clientes" element={<GestionarClientes />} />
            <Route path="usuarios/crear-usuarios" element={<CrearUsuarios />} />
            <Route path="usuarios/ver-usuarios" element={<VerUsuarios />} />
            <Route path="gestion-tareas" element={<GestionTareas />} />
            <Route path="inventario/gestionar-bodegas" element={<GestionarBodegas />} />
            <Route path="inventario/traslados-bodegas" element={<TrasladosBodegas />} />
            <Route path="inventario/ver-inventario" element={<VerInventarioBodegas />} />
            <Route path="costos/ver-costos" element={<VerCostosProductos />} />
          </Route>
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
