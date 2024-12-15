export interface CalculateCostRequest {
  startDate: string;
  endDate: string;
  vehicleId: number;
}

export interface CalculateCostResponse {
  totalCost: string;
  days: number;
  costPerDay: string;
}
