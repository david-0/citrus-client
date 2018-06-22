import {Component} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {CustomerOrderItemDto} from "citrus-common/lib/dto/customer-order-item-dto";
import {BaseDeleteComponent} from "../../../base/base-delete.component";
import {CustomerOrderItemDtoRestService} from "../customer-order-item-dto-rest.service";

@Component({
  selector: "app-customer-order-item-delete",
  templateUrl: "./customer-order-item-delete.component.html",
  styleUrls: ["./customer-order-item-delete.component.scss"]
})
export class CustomerOrderItemDeleteComponent extends BaseDeleteComponent<CustomerOrderItemDto> {

  constructor(route: ActivatedRoute,
              rest: CustomerOrderItemDtoRestService) {
    super(route, rest, "bestellte Artikel");
  }

}
