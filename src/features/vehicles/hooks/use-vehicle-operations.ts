import { toast } from "sonner";
import {
  Vehicle,
  VehicleCreate,
  VehicleUpdate,
} from "../interfaces/vehicle.interface";
import { VehicleService } from "../services/vehicle.service";
import { useRouter } from "next/navigation";
import { invalidateQuery } from "@/lib/invalidate-query";
import { QUERY_KEYS } from "@/shared/api/query-key";

const useVehicleOperations = () => {
  const vehicleService = VehicleService.getInstance();
  const router = useRouter();

  const createVehicle = async (vehicle: VehicleCreate) => {
    try {
      vehicleService.create({ vehicle });
      toast.success("Vehículo creado correctamente");
      router.push("/management/vehicles/list");
      invalidateQuery([QUERY_KEYS.VEHICLES]);
    } catch (error) {
      console.error(error);
    }
  };

  const updateVehicle = async (
    id: number,
    newData: VehicleUpdate,
    originalVehicle: Vehicle
  ) => {
    try {
      const changedFields = getChangedFields(originalVehicle, newData);

      if (Object.keys(changedFields).length === 0) {
        toast.info("No se detectaron cambios");
        return;
      }

      await vehicleService.update(id, { vehicle: changedFields });
      toast.success("Vehículo actualizado correctamente");
      router.push("/management/vehicles/list");
      invalidateQuery([QUERY_KEYS.VEHICLES]);
    } catch (error) {
      console.error(error);
    }
  };

  const getChangedFields = (
    originalVehicle: Vehicle,
    newData: VehicleUpdate
  ): Partial<VehicleUpdate> => {
    return Object.keys(newData).reduce((changes, key) => {
      const currentKey = key as keyof VehicleUpdate;
      const newValue = newData[currentKey];
      const originalValue =
        currentKey === "vehicleTypeId"
          ? originalVehicle.vehicleType.id
          : originalVehicle[currentKey as keyof Vehicle];

      return newValue !== originalValue
        ? { ...changes, [currentKey]: newValue }
        : changes;
    }, {});
  };

  const deleteVehicle = async (id: number) => {
    try {
      await vehicleService.delete(id);
      toast.success("Vehículo eliminado correctamente");
      invalidateQuery([QUERY_KEYS.VEHICLES]);
    } catch (error) {
      console.error(error);
    }
  };

  return {
    createVehicle,
    updateVehicle,
    deleteVehicle,
  };
};

export default useVehicleOperations;
