import { BaseHttpService } from "@/core/services/base-http.service";
import {
  Customer,
  CustomerCreate,
  CustomerRequest,
  CustomerUpdate,
} from "../interfaces/client.interface";
import { Reservation } from "@/features/vehicles/interfaces/reservation.interface";

export class CustomerService extends BaseHttpService<
  Customer,
  CustomerRequest<CustomerCreate>,
  CustomerRequest<CustomerUpdate>
> {
  protected baseUrl: string = "api/v1/customers";
  protected singleResponseKey: string = "customer";
  protected pluralResponseKey: string = "customers";

  async getReservationsByCustomerLogget() {
    const { data } = await this.http.get<{ reservations: Reservation[] }>(
      `${this.baseUrl}/reservations`
    );

    return data.data.reservations;
  }
}
