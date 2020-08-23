import {Component, Input, OnInit} from "@angular/core";
import {OrderItemDto} from "citrus-common/lib/dto/order-item-dto";
import {BehaviorSubject} from "rxjs";
import {BaseTableComponent} from "../../../base/base-table.component";

@Component({
  selector: "app-order-item-table",
  templateUrl: "./order-item-table.component.html",
  styleUrls: ["./order-item-table.component.scss"]
})
export class OrderItemTableComponent extends BaseTableComponent<OrderItemDto> implements OnInit {

  @Input() dataObservable: BehaviorSubject<OrderItemDto[]>;
  public displayedColumns = ["article", "quantity", "copiedPrice", "totalPrice"];

  constructor() {
    super(null, null);
  }

  ngOnInit() {
    this.dataObservable.subscribe(data => {
      this.dataSource.data = data;
    });
  }
}
