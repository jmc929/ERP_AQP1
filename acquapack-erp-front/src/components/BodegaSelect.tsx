import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface Bodega {
  id_bodega: number;
  nombre: string;
  id_estado?: number;
  total_productos?: number;
}

interface BodegaSelectProps {
  bodegas: Bodega[];
  value?: string;
  onValueChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
}

export function BodegaSelect({
  bodegas,
  value,
  onValueChange,
  placeholder = "Seleccione una bodega...",
  disabled = false,
  className,
}: BodegaSelectProps) {
  const [open, setOpen] = React.useState(false);

  const bodegaSeleccionada = bodegas.find(
    (bod) => bod.id_bodega.toString() === value
  );

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn(
            "w-full justify-between",
            !value && "text-muted-foreground",
            className
          )}
          disabled={disabled}
        >
          <span className="flex-1 text-left">
            {value
              ? bodegaSeleccionada?.nombre || placeholder
              : placeholder}
            {value && bodegaSeleccionada?.total_productos !== undefined && (
              <span className="text-xs text-muted-foreground ml-2">
                ({bodegaSeleccionada.total_productos} productos)
              </span>
            )}
          </span>
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[var(--radix-popover-trigger-width)] max-w-none p-0" align="start">
        <Command>
          <CommandInput placeholder="Buscar bodega..." />
          <CommandList>
            <CommandEmpty>No se encontraron bodegas.</CommandEmpty>
            <CommandGroup>
              {bodegas.map((bodega) => (
                <CommandItem
                  key={bodega.id_bodega}
                  value={`${bodega.id_bodega} ${bodega.nombre}`}
                  onSelect={() => {
                    onValueChange(
                      value === bodega.id_bodega.toString()
                        ? ""
                        : bodega.id_bodega.toString()
                    );
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === bodega.id_bodega.toString()
                        ? "opacity-100"
                        : "opacity-0"
                    )}
                  />
                  <span className="flex-1">{bodega.nombre}</span>
                  {bodega.total_productos !== undefined && (
                    <span className="text-xs text-muted-foreground ml-2">
                      ({bodega.total_productos} productos)
                    </span>
                  )}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

