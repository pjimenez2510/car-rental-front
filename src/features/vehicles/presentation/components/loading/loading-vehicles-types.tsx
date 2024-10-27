import { Skeleton } from "@/components/ui/skeleton";

const LoadingVehiclesTypes = () => {
  const arrayVehiclesLoading = Array(9).fill(0);
  return arrayVehiclesLoading.map((_, index) => (
    <div key={index} className="w-full flex gap-2">
      <Skeleton className="w-4 h-4" />
      <Skeleton className="w-full h-4" />
    </div>
  ));
};

export default LoadingVehiclesTypes;
