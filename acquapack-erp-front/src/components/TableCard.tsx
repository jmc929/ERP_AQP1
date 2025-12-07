import { ReactNode } from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import EmptyTableMessage from "./EmptyTableMessage";

interface TableCardProps {
  headers: string[];
  children: ReactNode;
  emptyMessage?: string;
  colSpan?: number;
}

const TableCard = ({ headers, children, emptyMessage, colSpan }: TableCardProps) => {
  return (
    <Card>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow>
              {headers.map((header, index) => (
                <TableHead
                  key={index}
                  className={index < headers.length - 1 ? "border-r border-border" : ""}
                >
                  {header}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {emptyMessage ? (
              <EmptyTableMessage colSpan={colSpan || headers.length} message={emptyMessage} />
            ) : (
              children
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default TableCard;

