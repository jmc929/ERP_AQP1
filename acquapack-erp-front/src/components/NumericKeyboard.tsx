import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { X } from "lucide-react";

interface NumericKeyboardProps {
  onInput: (value: string) => void;
  onClose: () => void;
  onBackspace?: () => void;
  onClear?: () => void;
  onEnter?: () => void;
}

const NumericKeyboard = ({ onInput, onClose, onBackspace, onClear, onEnter }: NumericKeyboardProps) => {
  const handleNumberClick = (num: string) => {
    onInput(num);
  };

  return (
    <Card className="fixed bottom-0 left-0 right-0 z-50 border-t-2 rounded-t-2xl shadow-2xl bg-background">
      <div className="p-4">
        {/* Header con botón cerrar */}
        <div className="flex justify-end mb-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="h-8 w-8"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* Teclado numérico */}
        <div className="grid grid-cols-3 gap-3 max-w-md mx-auto">
          {/* Primera fila: 1, 2, 3 */}
          <Button
            variant="outline"
            size="lg"
            className="h-16 text-2xl font-semibold"
            onClick={() => handleNumberClick("1")}
          >
            1
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="h-16 text-2xl font-semibold"
            onClick={() => handleNumberClick("2")}
          >
            2
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="h-16 text-2xl font-semibold"
            onClick={() => handleNumberClick("3")}
          >
            3
          </Button>

          {/* Segunda fila: 4, 5, 6 */}
          <Button
            variant="outline"
            size="lg"
            className="h-16 text-2xl font-semibold"
            onClick={() => handleNumberClick("4")}
          >
            4
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="h-16 text-2xl font-semibold"
            onClick={() => handleNumberClick("5")}
          >
            5
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="h-16 text-2xl font-semibold"
            onClick={() => handleNumberClick("6")}
          >
            6
          </Button>

          {/* Tercera fila: 7, 8, 9 */}
          <Button
            variant="outline"
            size="lg"
            className="h-16 text-2xl font-semibold"
            onClick={() => handleNumberClick("7")}
          >
            7
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="h-16 text-2xl font-semibold"
            onClick={() => handleNumberClick("8")}
          >
            8
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="h-16 text-2xl font-semibold"
            onClick={() => handleNumberClick("9")}
          >
            9
          </Button>

          {/* Cuarta fila: punto, 0, backspace */}
          <Button
            variant="outline"
            size="lg"
            className="h-16 text-2xl font-semibold"
            onClick={() => handleNumberClick(".")}
          >
            .
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="h-16 text-2xl font-semibold"
            onClick={() => handleNumberClick("0")}
          >
            0
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="h-16 text-lg font-semibold"
            onClick={onBackspace}
          >
            ⌫
          </Button>
        </div>

        {/* Botones de acción */}
        <div className="flex gap-3 mt-4 max-w-md mx-auto">
          {onClear && (
            <Button
              variant="secondary"
              size="lg"
              className="flex-1 h-12"
              onClick={onClear}
            >
              Limpiar
            </Button>
          )}
          {onEnter && (
            <Button
              variant="default"
              size="lg"
              className="flex-1 h-12"
              onClick={onEnter}
            >
              Aceptar
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
};

export default NumericKeyboard;

