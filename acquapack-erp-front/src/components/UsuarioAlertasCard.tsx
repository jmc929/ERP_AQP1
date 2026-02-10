import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle, CheckCircle2, Clock, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface Pendiente {
  tipo: string;
  mensaje: string;
  prioridad: 'alta' | 'media' | 'baja';
}

interface AlertaUsuario {
  id_usuarios: number;
  documento: string;
  nombre: string;
  apellido: string;
  nombre_completo: string;
  pendientes: Pendiente[];
  total_pendientes: number;
}

interface UsuarioAlertasCardProps {
  alertas: AlertaUsuario[];
}

const UsuarioAlertasCard = ({ alertas }: UsuarioAlertasCardProps) => {
  const [alertasOcultas, setAlertasOcultas] = useState<Set<number>>(new Set());

  if (!alertas || alertas.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle2 className="h-5 w-5 text-green-500" />
            Alertas de Usuarios
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-center py-4">
            ¡Excelente! Todos los usuarios tienen sus documentos al día.
          </p>
        </CardContent>
      </Card>
    );
  }

  const ocultarAlerta = (idUsuario: number) => {
    setAlertasOcultas(prev => new Set(prev).add(idUsuario));
  };

  // Filtrar alertas ocultas
  const alertasVisibles = alertas.filter(a => !alertasOcultas.has(a.id_usuarios));

  // Agrupar por prioridad (solo las visibles)
  const alertasAlta = alertasVisibles.filter(a => 
    a.pendientes.some(p => p.prioridad === 'alta')
  );
  const alertasMedia = alertasVisibles.filter(a => 
    a.pendientes.some(p => p.prioridad === 'media' && !a.pendientes.some(p2 => p2.prioridad === 'alta'))
  );

  const getPrioridadColor = (prioridad: string) => {
    switch (prioridad) {
      case 'alta':
        return 'bg-red-100 text-red-800 border-red-300';
      case 'media':
        return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      default:
        return 'bg-blue-100 text-blue-800 border-blue-300';
    }
  };

  const getPrioridadIcon = (prioridad: string) => {
    switch (prioridad) {
      case 'alta':
        return <AlertTriangle className="h-4 w-4" />;
      case 'media':
        return <Clock className="h-4 w-4" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-4">
      {/* Resumen */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-orange-500" />
            Alertas de Usuarios
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-red-50 rounded-lg border border-red-200">
              <div className="text-2xl font-bold text-red-600">{alertasAlta.length}</div>
              <div className="text-sm text-red-700 mt-1">Usuarios con alertas altas</div>
            </div>
            <div className="text-center p-4 bg-yellow-50 rounded-lg border border-yellow-200">
              <div className="text-2xl font-bold text-yellow-600">{alertasMedia.length}</div>
              <div className="text-sm text-yellow-700 mt-1">Usuarios con alertas medias</div>
            </div>
            <div className="text-center p-4 bg-blue-50 rounded-lg border border-blue-200">
              <div className="text-2xl font-bold text-blue-600">{alertas.length}</div>
              <div className="text-sm text-blue-700 mt-1">Total usuarios con pendientes</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Alertas de prioridad alta */}
      {alertasAlta.length > 0 && (
        <Card className="border-red-300">
          <CardHeader className="bg-red-50">
            <CardTitle className="flex items-center gap-2 text-red-700">
              <AlertTriangle className="h-5 w-5" />
              Prioridad Alta ({alertasAlta.length})
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="space-y-3">
              {alertasAlta.map((alerta) => (
                <Card key={alerta.id_usuarios} className="border-l-4 border-l-red-500 relative">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => ocultarAlerta(alerta.id_usuarios)}
                    className="absolute top-2 right-2 h-6 w-6 p-0 hover:bg-red-200"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                  <CardContent className="pt-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1 pr-8">
                        <h4 className="font-semibold text-sm">
                          {alerta.nombre_completo}
                        </h4>
                        <p className="text-xs text-muted-foreground mt-1">
                          Documento: {alerta.documento}
                        </p>
                        <div className="mt-2 space-y-1">
                          {alerta.pendientes
                            .filter(p => p.prioridad === 'alta')
                            .map((pendiente, idx) => (
                              <div key={idx} className="flex items-center gap-2">
                                <Badge 
                                  variant="outline" 
                                  className={getPrioridadColor(pendiente.prioridad)}
                                >
                                  {getPrioridadIcon(pendiente.prioridad)}
                                  <span className="ml-1">{pendiente.mensaje}</span>
                                </Badge>
                              </div>
                            ))}
                        </div>
                      </div>
                      <Badge variant="destructive" className="ml-2">
                        {alerta.total_pendientes} pendiente{alerta.total_pendientes > 1 ? 's' : ''}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Alertas de prioridad media */}
      {alertasMedia.length > 0 && (
        <Card className="border-yellow-300">
          <CardHeader className="bg-yellow-50">
            <CardTitle className="flex items-center gap-2 text-yellow-700">
              <Clock className="h-5 w-5" />
              Prioridad Media ({alertasMedia.length})
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="space-y-3">
              {alertasMedia.map((alerta) => (
                <Card key={alerta.id_usuarios} className="border-l-4 border-l-yellow-500 relative">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => ocultarAlerta(alerta.id_usuarios)}
                    className="absolute top-2 right-2 h-6 w-6 p-0 hover:bg-yellow-200"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                  <CardContent className="pt-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1 pr-8">
                        <h4 className="font-semibold text-sm">
                          {alerta.nombre_completo}
                        </h4>
                        <p className="text-xs text-muted-foreground mt-1">
                          Documento: {alerta.documento}
                        </p>
                        <div className="mt-2 space-y-1">
                          {alerta.pendientes
                            .filter(p => p.prioridad === 'media')
                            .map((pendiente, idx) => (
                              <div key={idx} className="flex items-center gap-2">
                                <Badge 
                                  variant="outline" 
                                  className={getPrioridadColor(pendiente.prioridad)}
                                >
                                  {getPrioridadIcon(pendiente.prioridad)}
                                  <span className="ml-1">{pendiente.mensaje}</span>
                                </Badge>
                              </div>
                            ))}
                        </div>
                      </div>
                      <Badge variant="outline" className="ml-2 border-yellow-500 text-yellow-700">
                        {alerta.total_pendientes} pendiente{alerta.total_pendientes > 1 ? 's' : ''}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default UsuarioAlertasCard;

