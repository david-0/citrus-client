import {Component, Input, OnInit} from "@angular/core";
import {CustomerOrderItemDto} from "citrus-common/lib/dto/customer-order-item-dto";
import {BehaviorSubject} from "rxjs/Rx";
import {BaseTableComponent} from "../../../base/base-table.component";

@Component({
  selector: "app-customer-order-item-table",
  templateUrl: "./customer-order-item-table.component.html",
  styleUrls: ["./customer-order-item-table.component.scss"]
})
export class CustomerOrderItemTableComponent extends BaseTableComponent<CustomerOrderItemDto> implements OnInit {

  @Input() dataObservable: BehaviorSubject<CustomerOrderItemDto[]>;
  public displayedColumns = ["article", "quantity", "copiedPrice"];

  constructor() {
    super(null, null);
  }

  ngOnInit() {
    this.dataObservable.subscribe(data => {
      this.datasource.data = data;
    });
  }
}
