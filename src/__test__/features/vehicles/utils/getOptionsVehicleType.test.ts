import { VehicleType } from "@/features/vehicles/interfaces/vehicle-type.interface";
import { getOptionsVehicleType } from "@/features/vehicles/utils/getOptionsVehicleType";

describe("getOptionsVehicleType", () => {
  test("converts vehicle types to options format", () => {
    const mockVehicleTypes: VehicleType[] = [
      { id: 1, name: "Sedan" },
      { id: 2, name: "SUV" },
    ];

    const options = getOptionsVehicleType(mockVehicleTypes);

    expect(options).toEqual([
      { value: "1", label: "Sedan" },
      { value: "2", label: "SUV" },
    ]);
  });

  test("returns empty array for empty input", () => {
    const options = getOptionsVehicleType([]);
    expect(options).toEqual([]);
  });

  test("handles single vehicle type", () => {
    const mockVehicleTypes: VehicleType[] = [{ id: 1, name: "Sedan" }];

    const options = getOptionsVehicleType(mockVehicleTypes);
    expect(options).toEqual([{ value: "1", label: "Sedan" }]);
  });
});
