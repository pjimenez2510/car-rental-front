import { Separator } from "@/components/ui/separator";
import { useVehicleFilterStore } from "../../../context/use-vehicle-filter-store";
import TypeVehicle from "./type-vehicle-filter";
import InputFilter from "./input-filter";
import YearFilter from "./year-filter";

const FiltersVehicle = () => {
  const { setModel, setBrand } = useVehicleFilterStore();

  return (
    <>
      <TypeVehicle />
      <Separator />

      <InputFilter
        label="Marca"
        id="brand"
        placeholder="Selecciona una marca"
        onChange={(value) => setBrand(value)}
      />
      <Separator />

      <InputFilter
        label="Modelo"
        id="model"
        placeholder="Selecciona un modelo"
        onChange={(value) => setModel(value)}
      />

      <Separator />

      <YearFilter />
    </>
  );
};

export default FiltersVehicle;
