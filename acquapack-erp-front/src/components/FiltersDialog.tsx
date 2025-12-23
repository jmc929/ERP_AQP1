import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Filter } from "lucide-react";

interface FilterOption {
  id: number;
  nombre: string;
}

interface FiltersDialogProps {
  familias: FilterOption[];
  grupos: FilterOption[];
  estados: FilterOption[];
  filtros: {
    id_familia?: string;
    id_grupos_producto?: string;
    id_estado?: string;
  };
  onFilterChange: (filtros: {
    id_familia?: string;
    id_grupos_producto?: string;
    id_estado?: string;
  }) => void;
  onClearFilters: () => void;
}

const FiltersDialog = ({
  familias,
  grupos,
  estados,
  filtros,
  onFilterChange,
  onClearFilters,
}: FiltersDialogProps) => {
  const handleFilterChange = (key: string, value: string) => {
    onFilterChange({
      ...filtros,
      [key]: value === "all" ? undefined : value,
    });
  };

  const hasActiveFilters = filtros.id_familia || filtros.id_grupos_producto || filtros.id_estado;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2">
          <Filter className="h-4 w-4" />
          Filtros
          {hasActiveFilters && (
            <span className="ml-1 px-2 py-0.5 text-xs bg-primary text-primary-foreground rounded-full">
              {[filtros.id_familia, filtros.id_grupos_producto, filtros.id_estado].filter(Boolean).length}
            </span>
          )}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Filtros</DialogTitle>
          <DialogDescription>
            Selecciona los filtros para buscar productos
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="familia">Familia</Label>
            <Select
              value={filtros.id_familia || "all"}
              onValueChange={(value) => handleFilterChange("id_familia", value)}
            >
              <SelectTrigger id="familia">
                <SelectValue placeholder="Todas las familias" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas las familias</SelectItem>
                {familias.map((familia) => (
                  <SelectItem key={familia.id} value={familia.id.toString()}>
                    {familia.nombre}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="grupo">Grupo</Label>
            <Select
              value={filtros.id_grupos_producto || "all"}
              onValueChange={(value) => handleFilterChange("id_grupos_producto", value)}
            >
              <SelectTrigger id="grupo">
                <SelectValue placeholder="Todos los grupos" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos los grupos</SelectItem>
                {grupos.map((grupo) => (
                  <SelectItem key={grupo.id} value={grupo.id.toString()}>
                    {grupo.nombre}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="estado">Estado</Label>
            <Select
              value={filtros.id_estado || "all"}
              onValueChange={(value) => handleFilterChange("id_estado", value)}
            >
              <SelectTrigger id="estado">
                <SelectValue placeholder="Todos los estados" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos los estados</SelectItem>
                {estados.map((estado) => (
                  <SelectItem key={estado.id} value={estado.id.toString()}>
                    {estado.nombre}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {hasActiveFilters && (
            <Button
              variant="outline"
              onClick={onClearFilters}
              className="w-full"
            >
              Limpiar Filtros
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default FiltersDialog;

