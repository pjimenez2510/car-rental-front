import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const LoadingTable = () => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Cargando...</TableHead>
          <TableHead>Cargando...</TableHead>
          <TableHead>Cargando...</TableHead>
          <TableHead>Cargando...</TableHead>
          <TableHead>Cargando...</TableHead>
          <TableHead>Cargando...</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {[...Array(20)].map((_, index) => (
          <TableRow key={index}>
            <TableCell>
              <Skeleton className="h-4 " />
            </TableCell>
            <TableCell>
              <Skeleton className="h-4 " />
            </TableCell>
            <TableCell>
              <Skeleton className="h-4 " />
            </TableCell>
            <TableCell>
              <Skeleton className="h-4 " />
            </TableCell>
            <TableCell>
              <Skeleton className="h-4 " />
            </TableCell>
            <TableCell>
              <Skeleton className="h-4 " />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default LoadingTable;
