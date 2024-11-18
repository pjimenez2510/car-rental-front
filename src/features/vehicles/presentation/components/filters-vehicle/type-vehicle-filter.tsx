import { Checkbox } from "@/components/ui/checkbox";
import { useVehicleFilterStore } from "@/features/vehicles/context/use-vehicle-filter-store";
import { useVehicleTypeQuery } from "@/features/vehicles/hooks/use-vehicle-type-query";
import LoadingVehiclesTypes from "../loading/loading-vehicles-types";
import { Label } from "@/components/ui/label";

const TypeVehicle = () => {
  const { data: vehicleTypes, isFetching } = useVehicleTypeQuery();
  const { setVehicleType, filterParams } = useVehicleFilterStore();
  return (
    <div className="flex flex-col gap-4">
      <label htmlFor="vehicleType" className="text-sm font-medium">
        Tipo de vehículo
      </label>
      {isFetching ? (
        <LoadingVehiclesTypes />
      ) : (
        vehicleTypes?.map((type) => (
          <div key={type.id} className="flex mr-4 mb-2">
            <Checkbox
              key={type.id}
              id={type.id.toString()}
              checked={filterParams?.vehicleType?.includes(type.name) ?? false}
              onCheckedChange={(checked) => {
                setVehicleType(!!checked, type.name);
              }}
              className="mr-2"
            />
            <Label
              className="hover:cursor-pointer"
              htmlFor={type.id.toString()}
            >
              {type.name}
            </Label>
          </div>
        ))
      )}
    </div>
  );
};

export default TypeVehicle;
