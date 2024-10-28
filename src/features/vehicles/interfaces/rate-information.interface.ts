export interface RateInformation {
  totalAmount: string;
  dailyRate: string;
  appliedRateType: string;
  seasonName: string;
  durationDays: number;
  effectiveFrom: Date;
  effectiveTo: Date;
  breakdown: Breakdown;
}

export interface Breakdown {
  months: Days;
  weeks: Days;
  days: Days;
}

export interface Days {
  quantity: number;
  rate: string;
  subtotal: string;
}
