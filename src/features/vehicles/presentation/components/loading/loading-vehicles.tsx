import { Skeleton } from "@/components/ui/skeleton";

const LoadingVehicles = () => {
  const arrayVehiclesLoading = Array(6).fill(0);
  return arrayVehiclesLoading.map((_, index) => (
    <Skeleton key={index} className="w-full h-[339px]" />
  ));
};

export default LoadingVehicles;
