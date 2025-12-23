import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import CatalogoGeneral from "./pages/CatalogoGeneral";
import CrearEditarProductos from "./pages/CrearEditarProductos";
import ProductosArchivados from "./pages/ProductosArchivados";
import ConfiguracionProductos from "./pages/ConfiguracionProductos";
import EtiquetaCodigos from "./pages/EtiquetaCodigos";
import IngresarFactura from "./pages/IngresarFactura";
import VerFactura from "./pages/VerFactura";
import GestionarProveedores from "./pages/GestionarProveedores";
import VentaProducto from "./pages/VentaProducto";
import VerVentas from "./pages/VerVentas";
import GestionarClientes from "./pages/GestionarClientes";
import CrearUsuarios from "./pages/CrearUsuarios";
import VerUsuarios from "./pages/VerUsuarios";
import EditarUsuarios from "./pages/EditarUsuarios";
import ConfiguracionUsuarios from "./pages/ConfiguracionUsuarios";
import ConfiguracionProveedores from "./pages/ConfiguracionProveedores";
import ConfiguracionClientes from "./pages/ConfiguracionClientes";
import GestionTareas from "./pages/GestionTareas";
import GestionarBodegas from "./pages/GestionarBodegas";
import TrasladosBodegas from "./pages/TrasladosBodegas";
import VerInventarioBodegas from "./pages/VerInventarioBodegas";
import VerCostosProductos from "./pages/VerCostosProductos";
import ProductosXProveedor from "./pages/ProductosXProveedor";
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
            <Route path="productos/catalogo-general" element={<CatalogoGeneral />} />
            <Route path="productos/crear-editar" element={<CrearEditarProductos />} />
            <Route path="productos/archivados" element={<ProductosArchivados />} />
            <Route path="productos/configuracion" element={<ConfiguracionProductos />} />
            <Route path="productos/etiqueta-codigos" element={<EtiquetaCodigos />} />
            <Route path="compras/ingresar-factura" element={<IngresarFactura />} />
            <Route path="compras/ver-factura" element={<VerFactura />} />
            <Route path="compras/gestionar-proveedores" element={<GestionarProveedores />} />
            <Route path="compras/configuracion-proveedores" element={<ConfiguracionProveedores />} />
            <Route path="compras/productos-x-proveedor" element={<ProductosXProveedor />} />
            <Route path="ventas/venta-producto" element={<VentaProducto />} />
            <Route path="ventas/ver-ventas" element={<VerVentas />} />
            <Route path="ventas/gestionar-clientes" element={<GestionarClientes />} />
            <Route path="ventas/configuracion-clientes" element={<ConfiguracionClientes />} />
            <Route path="usuarios/crear-usuarios" element={<CrearUsuarios />} />
            <Route path="usuarios/ver-usuarios" element={<VerUsuarios />} />
            <Route path="usuarios/editar-usuarios/:id" element={<EditarUsuarios />} />
            <Route path="usuarios/configuracion" element={<ConfiguracionUsuarios />} />
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
