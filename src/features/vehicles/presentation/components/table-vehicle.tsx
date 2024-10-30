"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useVehiclesQuery } from "../../hooks/use-vehicle-query";
import LoadingTableVehicle from "./loading/loading-table-vehicle";
import { Badge } from "@/components/ui/badge";
import { vehicleStatusSpanish } from "../../constants/status-vehicle-spanish";
import { cn } from "@/lib/utils";

const TableVehicle = () => {
  const { data: vehicles, isFetching } = useVehiclesQuery();
  return isFetching ? (
    <LoadingTableVehicle />
  ) : (
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
        {vehicles?.map((vehicle) => (
          <TableRow key={vehicle.id}>
            <TableCell>{vehicle.brand}</TableCell>
            <TableCell>{vehicle.model}</TableCell>
            <TableCell>{vehicle.licensePlate}</TableCell>
            <TableCell>{vehicle.vehicleType.name}</TableCell>
            <TableCell>
              <Badge
                className={cn([vehicleStatusSpanish[vehicle.status].color])}
              >
                {vehicleStatusSpanish[vehicle.status].label}
              </Badge>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default TableVehicle;
