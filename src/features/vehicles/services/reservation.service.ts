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
    const { data } = await this.http.get<CalculateCostResponse>(
      `${this.baseUrl}/calculate_cost`,
      { params: request }
    );
    return data.data;
  }

  async cancel(id: number) {
    await this.http.delete(`${this.baseUrl}/${id}/cancel`);
  }

  async checkout(id: number, initialOdometer: number) {
    await this.http.post(`${this.baseUrl}/${id}/check_out`, {
      initialOdometer,
    });
  }

  async checkin(id: number, finalOdometer: number) {
    await this.http.post(`${this.baseUrl}/${id}/check_in`, { finalOdometer });
  }

  async confirmPayment(id: number) {
    await this.http.post(`${this.baseUrl}/${id}/payments/process_payment`);
  }
}
