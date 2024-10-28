export interface VehicleFilterParams {
  brand?: string;
  model?: string;
  year?: string;
  vehicleType?: string[];
  dateRange?: DateRange;
}

export interface DateRange {
  startDate?: Date;
  endDate?: Date;
}
