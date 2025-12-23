import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  paginaActual: number;
  totalPaginas: number;
  onPageChange: (pagina: number) => void;
}

const Pagination = ({ paginaActual, totalPaginas, onPageChange }: PaginationProps) => {
  const generarNumerosPagina = () => {
    const numeros = [];
    const maxVisible = 5;
    
    if (totalPaginas <= maxVisible) {
      for (let i = 1; i <= totalPaginas; i++) {
        numeros.push(i);
      }
    } else {
      if (paginaActual <= 3) {
        for (let i = 1; i <= 5; i++) {
          numeros.push(i);
        }
      } else if (paginaActual >= totalPaginas - 2) {
        for (let i = totalPaginas - 4; i <= totalPaginas; i++) {
          numeros.push(i);
        }
      } else {
        for (let i = paginaActual - 2; i <= paginaActual + 2; i++) {
          numeros.push(i);
        }
      }
    }
    
    return numeros;
  };

  if (totalPaginas <= 1) return null;

  return (
    <div className="flex items-center justify-center gap-2 mt-4">
      <Button
        variant="outline"
        size="sm"
        onClick={() => onPageChange(paginaActual - 1)}
        disabled={paginaActual === 1}
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>

      {generarNumerosPagina().map((numero) => (
        <Button
          key={numero}
          variant={numero === paginaActual ? "default" : "outline"}
          size="sm"
          onClick={() => onPageChange(numero)}
        >
          {numero}
        </Button>
      ))}

      <Button
        variant="outline"
        size="sm"
        onClick={() => onPageChange(paginaActual + 1)}
        disabled={paginaActual === totalPaginas}
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default Pagination;

