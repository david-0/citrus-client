import {Component, OnInit} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {CustomerOrderItemDto} from "citrus-common/lib/dto/customer-order-item-dto";
import {DeleteExecutor} from "../../../base/delete-executor";
import {CustomerOrderItemDtoRestService} from "../customer-order-item-dto-rest.service";

@Component({
  selector: "app-customer-order-item-delete",
  templateUrl: "./customer-order-item-delete.component.html",
  styleUrls: ["./customer-order-item-delete.component.scss"]
})
export class CustomerOrderItemDeleteComponent implements OnInit {

  public deleteExecutor: DeleteExecutor<CustomerOrderItemDto>;

  constructor(private route: ActivatedRoute,
              private rest: CustomerOrderItemDtoRestService) {
  }

  ngOnInit() {
    this.deleteExecutor = new DeleteExecutor<CustomerOrderItemDto>(this.route, this.rest, "Der bestellte Artikel");
    this.deleteExecutor.initDelete();
  }
}
