import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const LoadingTableVehicle = () => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Marca</TableHead>
          <TableHead>Modelo</TableHead>
          <TableHead>Placa</TableHead>
          <TableHead>Tipo</TableHead>
          <TableHead>Estado</TableHead>
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
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default LoadingTableVehicle;
