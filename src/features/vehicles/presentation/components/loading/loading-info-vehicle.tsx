import { Car } from "lucide-react";

const LoadingInfoVehicle = () => {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="animate-pulse flex flex-col items-center gap-4">
        <Car className="h-12 w-12 text-primary animate-bounce" />
        <p className="text-lg font-medium">Cargando información ...</p>
      </div>
    </div>
  );
};

export default LoadingInfoVehicle;
