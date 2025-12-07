import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import PageContainer from "@/components/PageContainer";
import PageTitle from "@/components/PageTitle";
import FormCard from "@/components/FormCard";

const roles = [
  { value: "administrador", label: "Administrador" },
  { value: "usuario", label: "Usuario" },
  { value: "vendedor", label: "Vendedor" },
  { value: "contador", label: "Contador" },
  { value: "supervisor", label: "Supervisor" },
];

const CrearUsuarios = () => {
  const [nombre, setNombre] = useState("");
  const [contraseña, setContraseña] = useState("");
  const [rol, setRol] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aquí iría la lógica para crear el usuario
    console.log({ nombre, contraseña, rol });
    // Limpiar formulario después de crear
    setNombre("");
    setContraseña("");
    setRol("");
  };

  return (
    <PageContainer>
      <PageTitle title="Crear Usuarios" />
      <FormCard title="Datos del Usuario">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="nombre">Nombre</Label>
            <Input
              id="nombre"
              type="text"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              placeholder="Ingrese el nombre del usuario"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="contraseña">Contraseña</Label>
            <Input
              id="contraseña"
              type="password"
              value={contraseña}
              onChange={(e) => setContraseña(e.target.value)}
              placeholder="Ingrese la contraseña"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="rol">Rol</Label>
            <Select value={rol} onValueChange={setRol} required>
              <SelectTrigger id="rol">
                <SelectValue placeholder="Seleccione un rol" />
              </SelectTrigger>
              <SelectContent>
                {roles.map((rolOption) => (
                  <SelectItem key={rolOption.value} value={rolOption.value}>
                    {rolOption.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button type="button" variant="outline" onClick={() => {
              setNombre("");
              setContraseña("");
              setRol("");
            }}>
              Limpiar
            </Button>
            <Button type="submit">Crear Usuario</Button>
          </div>
        </form>
      </FormCard>
    </PageContainer>
  );
};

export default CrearUsuarios;

