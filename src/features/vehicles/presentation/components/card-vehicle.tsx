import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Vehicle } from "../../interfaces/vehicle.interface";
import Image from "next/image";
import Link from "next/link";

const CardVehicle = ({ vehicle }: { vehicle: Vehicle }) => {
  return (
    <Link href={`/vehicles/${vehicle.id}`}>
      <Card className="w-full ">
        <CardHeader>
          <CardTitle className="text-lg font-bold">
            {vehicle.brand} {vehicle.model}
          </CardTitle>
        </CardHeader>
        <CardContent className="flex gap-2">
          <div className="flex flex-col w-full gap-2">
            <p>Año {vehicle.year}</p>
            <p>Tipo {vehicle.vehicleType.name}</p>
          </div>
          <div className="flex flex-col w-fit gap-2">
            <Image
              src="/images/example-car.png"
              alt="Car"
              width={150}
              height={150}
            />
          </div>
        </CardContent>
        <CardFooter className="flex justify-end gap-2">
          <span className="text-lg">
            20 $ <span className="text-base text-muted-foreground">/día</span>
          </span>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default CardVehicle;
