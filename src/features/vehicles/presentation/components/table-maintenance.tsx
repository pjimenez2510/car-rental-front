import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import { useMaintenancesQuery } from "../../hooks/use-maintenance-query";
import { maintenanceStatusSpanish } from "../../constants/status-maintenance-spanish";
import { MaintenanceStatus } from "../../interfaces/maintenace.interface";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MaintenaceService } from "../../services/maintenance.service";
import { invalidateQuery } from "@/lib/invalidate-query";
import { QUERY_KEYS } from "@/shared/api/query-key";

const TableMaintenace = () => {
  const { data: maintanance } = useMaintenancesQuery();

  // Estados para los filtros
  const [filterLicensePlate, setFilterLicensePlate] = useState<string>("");
  const [filterStatus, setFilterStatus] = useState<string>("all");

  const filteredMaintenance = maintanance?.filter((maintenance) => {
    const licensePlateMatch = maintenance.vehicle.licensePlate
      .toLowerCase()
      .includes(filterLicensePlate.toLowerCase());

    const statusMatch =
      filterStatus === "all" || maintenance.status === filterStatus;

    return licensePlateMatch && statusMatch;
  });

  return (
    <>
      <div className="mb-4 flex flex-col md:flex-row gap-4">
        <Input
          type="text"
          placeholder="Buscar por placa"
          value={filterLicensePlate}
          onChange={(e) => setFilterLicensePlate(e.target.value)}
          className="md:w-1/3 w-full"
        />
        <div className="md:w-1/3">
          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger>
              <SelectValue placeholder="Seleccionar estado" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos los estados</SelectItem>
              {Object.entries(maintenanceStatusSpanish).map(([key, value]) => (
                <SelectItem key={key} value={key}>
                  {value.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Tabla */}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Descripción</TableHead>
            <TableHead>Estado</TableHead>
            <TableHead>Costo</TableHead>
            <TableHead>Vehículo</TableHead>
            <TableHead>Placa</TableHead>
            <TableHead>Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredMaintenance?.map((maintenance) => (
            <TableRow key={maintenance.id}>
              <TableCell>{maintenance.description}</TableCell>
              <TableCell>
                <Badge
                  className={cn([
                    maintenanceStatusSpanish[maintenance.status].color,
                  ])}
                >
                  {maintenanceStatusSpanish[maintenance.status].label}
                </Badge>
              </TableCell>
              <TableCell>{maintenance.cost}</TableCell>
              <TableCell>
                {maintenance.vehicle.brand} {maintenance.vehicle?.model}{" "}
              </TableCell>
              <TableCell>{maintenance.vehicle.licensePlate}</TableCell>
              <TableCell>
                {maintenance.status !== MaintenanceStatus.Completed && (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Acciones</DropdownMenuLabel>

                      <DropdownMenuItem
                        onClick={async () => {
                          try {
                            await MaintenaceService.getInstance().update(
                              maintenance.id,
                              {
                                maintenance: {
                                  status: MaintenanceStatus.Completed,
                                },
                              }
                            );
                            invalidateQuery([QUERY_KEYS.MAINTENANCE]);
                            invalidateQuery([QUERY_KEYS.RESERVATION]);
                            invalidateQuery([QUERY_KEYS.VEHICLES]);
                          } catch (error) {
                            console.error(error);
                          }
                        }}
                      >
                        Completar
                      </DropdownMenuItem>

                      {maintenance.status === MaintenanceStatus.Scheduled && (
                        <DropdownMenuItem
                          onClick={async () => {
                            try {
                              await MaintenaceService.getInstance().update(
                                maintenance.id,
                                {
                                  maintenance: {
                                    status: MaintenanceStatus.InProgress,
                                  },
                                }
                              );
                              invalidateQuery([QUERY_KEYS.MAINTENANCE]);
                              invalidateQuery([QUERY_KEYS.RESERVATION]);
                              invalidateQuery([QUERY_KEYS.VEHICLES]);
                            } catch (error) {
                              console.error(error);
                            }
                          }}
                        >
                          En progreso
                        </DropdownMenuItem>
                      )}
                    </DropdownMenuContent>
                  </DropdownMenu>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};

export default TableMaintenace;
