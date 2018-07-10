import {Component} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {CustomerOrderDto} from "citrus-common/lib/dto/customer-order-dto";
import {BaseDeleteComponent} from "../../../base/base-delete.component";
import {CustomerOrderDtoRestService} from "../customer-order-dto-rest.service";

@Component({
  selector: "app-customer-order-delete",
  templateUrl: "./customer-order-delete.component.html",
  styleUrls: ["./customer-order-delete.component.scss"]
})
export class CustomerOrderDeleteComponent extends BaseDeleteComponent<CustomerOrderDto> {

  constructor(route: ActivatedRoute,
              rest: CustomerOrderDtoRestService) {
    super(route, rest, "Die Kundenbestellung");
  }

}
