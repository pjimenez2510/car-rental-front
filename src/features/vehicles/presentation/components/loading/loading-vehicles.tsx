import { Skeleton } from "@/components/ui/skeleton";

const LoadingVehicles = () => {
  const arrayVehiclesLoading = Array(9).fill(0);
  return arrayVehiclesLoading.map((_, index) => (
    <Skeleton key={index} className="w-full h-[210px]" />
  ));
};

export default LoadingVehicles;
