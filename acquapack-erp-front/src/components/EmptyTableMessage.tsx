import { TableCell, TableRow } from "@/components/ui/table";

interface EmptyTableMessageProps {
  colSpan: number;
  message: string;
}

const EmptyTableMessage = ({ colSpan, message }: EmptyTableMessageProps) => {
  return (
    <TableRow>
      <TableCell colSpan={colSpan} className="text-center text-muted-foreground py-8">
        {message}
      </TableCell>
    </TableRow>
  );
};

export default EmptyTableMessage;

