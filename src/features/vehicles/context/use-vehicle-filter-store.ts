import { create } from "zustand";
import { VehicleFilterParams } from "../interfaces/vehicle-filter-params.interface";

interface VehicleFilterStore {
  filterParams: VehicleFilterParams;
  setBrand: (brand: string) => void;
  setModel: (model: string) => void;
  setYear: (year: string) => void;
  setVehicleType: (checked: boolean, vehicleType: string) => void;
  setDateRange: (startDate?: Date, endDate?: Date) => void;
}

export const useVehicleFilterStore = create<VehicleFilterStore>((set) => ({
  filterParams: {
    dateRange: {
      startDate: new Date(new Date().setDate(new Date().getDate() + 1)),
      endDate: new Date(new Date().setDate(new Date().getDate() + 3)),
    },
  },
  setDateRange: (startDate?: Date, endDate?: Date) =>
    set((state) => ({
      filterParams: {
        ...state.filterParams,
        dateRange: {
          startDate,
          endDate,
        },
      },
    })),
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
