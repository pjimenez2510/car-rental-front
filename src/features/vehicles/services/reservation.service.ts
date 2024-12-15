import { BaseHttpService } from "@/core/services/base-http.service";
import {
  Reservation,
  ReservationCreate,
  ReservationRequest,
  ReservationUpdate,
} from "../interfaces/reservation.interface";
import {
  CalculateCostRequest,
  CalculateCostResponse,
} from "../interfaces/calculate-cost.interface";

export class ReservationService extends BaseHttpService<
  Reservation,
  ReservationRequest<ReservationCreate>,
  ReservationRequest<ReservationUpdate>
> {
  protected baseUrl: string = "api/v1/reservations";
  protected singleResponseKey: string = "reservation";
  protected pluralResponseKey: string = "reservations";

  async calculateCost(
    request: CalculateCostRequest
  ): Promise<CalculateCostResponse> {
    const { data } = await this.http.post<CalculateCostResponse>(
      `${this.baseUrl}/calculate_cost`,
      request
    );
    return data.data;
  }

  async cancel(id: number) {
    await this.http.put(`${this.baseUrl}/${id}/cancel`);
  }

  async checkout(id: number, initialOdometer: number) {
    await this.http.put(`${this.baseUrl}/${id}/checkout`, { initialOdometer });
  }

  async checkin(id: number, finalOdometer: number) {
    await this.http.put(`${this.baseUrl}/${id}/checkin`, { finalOdometer });
  }

  async confirmPayment(id: number) {
    await this.http.put(`${this.baseUrl}/${id}/payments/process_payment`);
  }
}
