import {Component, Input, OnInit} from "@angular/core";
import {OrderItemDto} from "citrus-common/lib/dto/order-item-dto";
import {BehaviorSubject} from "rxjs";
import {BaseTableComponent} from "../../../base/base-table.component";

@Component({
  selector: "app-customer-order-item-table",
  templateUrl: "./customer-order-item-table.component.html",
  styleUrls: ["./customer-order-item-table.component.scss"]
})
export class CustomerOrderItemTableComponent extends BaseTableComponent<OrderItemDto> implements OnInit {

  @Input() dataObservable: BehaviorSubject<OrderItemDto[]>;
  public displayedColumns = ["article", "quantity", "copiedPrice", "totalPrice"];

  constructor() {
    super(null, null);
  }

  ngOnInit() {
    this.dataObservable.subscribe(data => {
      this.datasource.data = data;
    });
  }
}
