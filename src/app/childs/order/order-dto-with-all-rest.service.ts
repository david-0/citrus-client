import {HttpClient} from "@angular/common/http";
import {Inject, Injectable} from "@angular/core";
import {OrderDto} from "citrus-common/lib/dto/order-dto";
import {GenericRestService} from "../../table-support/generic-rest.service";

@Injectable({
  providedIn: "root"
})
export class OrderDtoWithAllRestService extends GenericRestService<OrderDto> {
  constructor(http: HttpClient, @Inject("baseUrl") baseUrl: string) {
    super(http, baseUrl + "/order/withAll");
  }
}
