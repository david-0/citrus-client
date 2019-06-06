import {HttpClient} from "@angular/common/http";
import {Inject, Injectable} from "@angular/core";
import {OrderDto} from "citrus-common/lib/dto/order-dto";
import {Observable} from "rxjs";
import {GenericRestService} from "../../table-support/generic-rest.service";

@Injectable({
  providedIn: "root"
})
export class OrderDtoRestService extends GenericRestService<OrderDto> {
  constructor(http: HttpClient, @Inject("baseUrl") baseUrl: string) {
    super(http, baseUrl + "/order");
  }

  getOpenByLocation(locationId: number): Observable<OrderDto[]> {
    const url = `${this.restUrl}/openByLocation/${locationId}`;
    return this.http.get<OrderDto[]>(url, {headers: this.headers});
  }
}
