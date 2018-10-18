import {Component, OnInit} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {OrderDto} from "citrus-common/lib/dto/order-dto";
import {DeleteExecutor} from "../../../base/delete-executor";
import {OrderDtoRestService} from "../order-dto-rest.service";

@Component({
  selector: "app-customer-order-delete",
  templateUrl: "./customer-order-delete.component.html",
  styleUrls: ["./customer-order-delete.component.scss"]
})
export class CustomerOrderDeleteComponent implements OnInit {

  public deleteExecutor: DeleteExecutor<OrderDto>;

  constructor(private route: ActivatedRoute,
              private rest: OrderDtoRestService) {
  }

  ngOnInit() {
    this.deleteExecutor = new DeleteExecutor<OrderDto>(this.route, this.rest, "Die Kundenbestellung");
    this.deleteExecutor.initDelete();
  }
}
