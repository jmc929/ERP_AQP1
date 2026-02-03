import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  // Verificar si hay un usuario autenticado en localStorage
  const usuario = localStorage.getItem("usuario");

  // Si no hay usuario, redirigir al login
  if (!usuario) {
    return <Navigate to="/login" replace />;
  }

  // Si hay usuario, permitir el acceso
  return <>{children}</>;
};

export default ProtectedRoute;

