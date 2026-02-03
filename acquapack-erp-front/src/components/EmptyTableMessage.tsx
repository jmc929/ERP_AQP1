import { TableCell, TableRow } from "@/components/ui/table";

interface EmptyTableMessageProps {
  colSpan: number;
  message: string;
}

const EmptyTableMessage = ({ colSpan, message }: EmptyTableMessageProps) => {
  return (
    <TableRow>
      <TableCell colSpan={colSpan} className="text-center text-muted-foreground py-8 md:py-12 px-4">
        <p className="text-sm md:text-base">{message}</p>
      </TableCell>
    </TableRow>
  );
};

export default EmptyTableMessage;

