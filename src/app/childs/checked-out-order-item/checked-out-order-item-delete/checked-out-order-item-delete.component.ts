import {Component, OnInit} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {CheckedOutOrderItemDto} from "citrus-common";
import {OrderItemDto} from "citrus-common/lib/dto/order-item-dto";
import {DeleteExecutor} from "../../../base/delete-executor";
import {CheckedOutOrderItemDtoRestService} from "../checked-out-order-item-dto-rest.service";

@Component({
  selector: "app-checked-out-order-item-delete",
  templateUrl: "./checked-out-order-item-delete.component.html",
  styleUrls: ["./checked-out-order-item-delete.component.scss"]
})
export class CheckedOutOrderItemDeleteComponent implements OnInit {

  public deleteExecutor: DeleteExecutor<CheckedOutOrderItemDto>;

  constructor(private route: ActivatedRoute,
              private rest: CheckedOutOrderItemDtoRestService) {
  }

  ngOnInit() {
    this.deleteExecutor = new DeleteExecutor<OrderItemDto>(this.route, this.rest, "Der abgeholte Artikel");
    this.deleteExecutor.initDelete();
  }
}
