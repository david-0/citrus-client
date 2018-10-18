import {Component, OnInit} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {OrderItemDto} from "citrus-common/lib/dto/order-item-dto";
import {DeleteExecutor} from "../../../base/delete-executor";
import {OrderItemDtoRestService} from "../order-item-dto-rest.service";

@Component({
  selector: "app-customer-order-item-delete",
  templateUrl: "./customer-order-item-delete.component.html",
  styleUrls: ["./customer-order-item-delete.component.scss"]
})
export class CustomerOrderItemDeleteComponent implements OnInit {

  public deleteExecutor: DeleteExecutor<OrderItemDto>;

  constructor(private route: ActivatedRoute,
              private rest: OrderItemDtoRestService) {
  }

  ngOnInit() {
    this.deleteExecutor = new DeleteExecutor<OrderItemDto>(this.route, this.rest, "Der bestellte Artikel");
    this.deleteExecutor.initDelete();
  }
}
