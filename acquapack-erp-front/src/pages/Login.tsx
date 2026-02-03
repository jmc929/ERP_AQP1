import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Building2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Login = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [documento, setDocumento] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // Si ya está autenticado, redirigir al dashboard
  useEffect(() => {
    const usuario = localStorage.getItem("usuario");
    if (usuario) {
      navigate("/dashboard", { replace: true });
    }
  }, [navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!documento || !password) {
      toast({
        title: "Campos requeridos",
        description: "Por favor ingrese su documento y contraseña",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("http://localhost:4000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          documento,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || data.error || "Error al iniciar sesión");
      }

      // Guardar información del usuario en localStorage
      if (data.usuario) {
        localStorage.setItem("usuario", JSON.stringify(data.usuario));
      }

      toast({
        title: "Login exitoso",
        description: `Bienvenido, ${data.usuario?.nombre || documento}`,
      });

      // Redirigir al dashboard
      navigate("/dashboard");
    } catch (error) {
      toast({
        title: "Error al iniciar sesión",
        description: error instanceof Error ? error.message : "Error desconocido",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/10 via-background to-accent/10 p-4">
      <Card className="w-full max-w-md shadow-2xl border-border/50">
        <CardHeader className="space-y-3 text-center pb-4 md:pb-6">
          <div className="mx-auto w-14 h-14 md:w-16 md:h-16 bg-primary rounded-xl flex items-center justify-center shadow-lg">
            <Building2 className="w-8 h-8 md:w-10 md:h-10 text-primary-foreground" />
          </div>
          <CardTitle className="text-2xl md:text-3xl font-bold">ERP ACQUAPACK</CardTitle>
          <CardDescription className="text-sm md:text-base">
            Ingrese sus credenciales para continuar
          </CardDescription>
        </CardHeader>
        <CardContent className="px-4 md:px-6 pb-6 md:pb-8">
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="documento" className="text-sm md:text-base">Documento</Label>
              <Input
                id="documento"
                type="text"
                placeholder="Ingrese su documento"
                value={documento}
                onChange={(e) => setDocumento(e.target.value)}
                className="h-10 md:h-11 text-sm md:text-base"
                disabled={loading}
                autoComplete="username"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm md:text-base">Contraseña</Label>
              <Input
                id="password"
                type="password"
                placeholder="Ingrese su contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="h-10 md:h-11 text-sm md:text-base"
                disabled={loading}
                autoComplete="current-password"
              />
            </div>
            <Button 
              type="submit" 
              className="w-full h-10 md:h-11 text-sm md:text-base font-medium"
              disabled={loading}
            >
              {loading ? "Iniciando sesión..." : "Entrar"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
