import { Combobox } from "@/components/ui/combobox";
import { Label } from "@/components/ui/label";
import { useVehicleFilterStore } from "@/features/vehicles/context/use-vehicle-filter-store";
import { generateYearOptions } from "@/features/vehicles/utils/generate-year-options";

const YearFilter = () => {
  const { setYear } = useVehicleFilterStore();
  const years = generateYearOptions(2012);
  return (
    <div className="flex flex-col gap-4 w-full">
      <Label htmlFor="year" className="text-sm font-medium">
        Año
      </Label>
      <Combobox
        width="w-full"
        options={years}
        placeholder="Selecciona un año"
        searchPlaceholder="Busca un año"
        onSelect={(value) => setYear(value)}
      />
    </div>
  );
};

export default YearFilter;
