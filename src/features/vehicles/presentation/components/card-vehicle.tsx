import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  CarIcon,
  DiscIcon as LicenseIcon,
  CheckCircleIcon,
  DollarSignIcon,
} from "lucide-react";
import { Vehicle } from "../../interfaces/vehicle.interface";
import Image from "next/image";
import Link from "next/link";
import { vehicleStatusSpanish } from "../../constants/status-vehicle-spanish";
import { cn } from "@/lib/utils";

interface VehicleCardProps {
  vehicle: Vehicle;
}

export default function CardVehicle({ vehicle }: VehicleCardProps) {
  return (
    <Link href={`/vehicles/${vehicle.id}`}>
      <Card className="w-full h-full overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
        <div className="relative aspect-video">
          <Image
            src={vehicle.url || "/images/not-image-vehicle.png"}
            alt={`${vehicle.brand} ${vehicle.model}`}
            layout="fill"
            objectFit="cover"
            className="transition-transform duration-300 hover:scale-105"
          />
          {}
          <Badge
            className={cn(
              "absolute top-2 left-2 bg-primary text-primary-foreground",
              vehicleStatusSpanish[vehicle.status].color
            )}
            variant="secondary"
          >
            {vehicleStatusSpanish[vehicle.status].label}
          </Badge>
          {vehicle.dailyRate && (
            <div className="absolute bottom-0 right-0 bg-primary text-primary-foreground p-1 rounded-tl-md">
              <div className="flex items-center space-x-1">
                <DollarSignIcon className="w-4 h-4" />
                <span className="text-lg font-bold">{vehicle.dailyRate}</span>
                <span className="text-xs">/día</span>
              </div>
            </div>
          )}
        </div>
        <CardHeader className="pb-2">
          <CardTitle className="text-2xl font-bold flex justify-between items-center">
            <span>
              {vehicle.brand} {vehicle.model}
            </span>
            <Badge variant="outline" className="text-sm font-normal">
              {vehicle.year}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="pb-2">
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div className="flex items-center space-x-2 text-muted-foreground">
              <CarIcon className="w-4 h-4" />
              <span>Tipo {vehicle.vehicleType.name}</span>
            </div>
            <div className="flex items-center space-x-2 text-muted-foreground">
              <LicenseIcon className="w-4 h-4" />
              <span>{vehicle.licensePlate}</span>
            </div>
            {vehicle.lastCheckupDate && (
              <div className="flex items-center space-x-2 text-muted-foreground col-span-2">
                <CheckCircleIcon className="w-4 h-4" />
                <span>
                  Último chequeo:{" "}
                  {new Date(vehicle.lastCheckupDate).toLocaleDateString()}
                </span>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
