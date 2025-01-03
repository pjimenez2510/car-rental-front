export interface Rental {
  id: number;
  actualStartDate: string;
  expectedReturnDate: string;
  initialOdometer: number;
  finalOdometer: number | null;
  status: string;
}

export enum RentalStatus {
  Active = "active",
  Completed = "completed",
}
