export const calculateCostDay = (
  totalCost: number,
  startDate: Date,
  endDate: Date
): string => {
  const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return (totalCost / diffDays).toFixed(2);
};
