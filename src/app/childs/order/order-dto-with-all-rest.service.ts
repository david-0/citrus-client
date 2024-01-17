import {HttpClient} from "@angular/common/http";
import {Inject, Injectable} from "@angular/core";
import {OrderDto} from "citrus-common/lib/dto/order-dto";
import {GenericRestService} from "../../table-support/generic-rest.service";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class OrderDtoWithAllRestService extends GenericRestService<OrderDto> {
  constructor(http: HttpClient, @Inject("baseUrl") baseUrl: string) {
    super(http, baseUrl + "/order/withAll");
  }


  public getMyOrders(): Observable<OrderDto[]> {
    const url = `${this.restUrl}/myOrders`;
    return this.http.get<OrderDto[]>(url, { headers: this.headers });
  }

  public getByUser(userId: number): Observable<OrderDto[]> {
    const url = `${this.restUrl}/byUser/${userId}`;
    return this.http.get<OrderDto[]>(url, { headers: this.headers });
  }
}
