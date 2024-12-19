export const calculateCostDay = (
  totalCost: number,
  startDate: Date,
  endDate: Date
): { days: number; costPerDay: string } => {
  console.log("totalCost", totalCost);
  const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return { days: diffDays, costPerDay: (totalCost / diffDays).toFixed(2) };
};
