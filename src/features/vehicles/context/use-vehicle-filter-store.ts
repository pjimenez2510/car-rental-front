import { create } from "zustand";
import { VehicleFilterParams } from "../interfaces/vehicle-filter-params.interface";

interface VehicleFilterStore {
  filterParams: VehicleFilterParams;
  setBrand: (brand: string) => void;
  setModel: (model: string) => void;
  setYear: (year: string) => void;
  setVehicleType: (checked: boolean, vehicleType: string) => void;
}

export const useVehicleFilterStore = create<VehicleFilterStore>((set) => ({
  filterParams: {},
  setBrand: (brand: string) =>
    set((state) => ({ filterParams: { ...state.filterParams, brand } })),
  setModel: (model: string) =>
    set((state) => ({ filterParams: { ...state.filterParams, model } })),
  setYear: (year: string) =>
    set((state) => ({ filterParams: { ...state.filterParams, year } })),
  setVehicleType: (checked: boolean, vehicleType: string) => {
    if (checked) {
      set((state) => ({
        filterParams: {
          ...state.filterParams,
          vehicleType: [...(state.filterParams.vehicleType ?? []), vehicleType],
        },
      }));
    } else {
      set((state) => ({
        filterParams: {
          ...state.filterParams,
          vehicleType: (state.filterParams.vehicleType ?? []).filter(
            (v: string) => v !== vehicleType
          ),
        },
      }));
    }
  },
}));
