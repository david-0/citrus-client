import {Component, Input, OnInit} from "@angular/core";
import {CheckedOutOrderItemDto} from "citrus-common";
import {BehaviorSubject} from "rxjs";
import {BaseTableComponent} from "../../../base/base-table.component";

@Component({
  selector: "app-checked-out-order-item-table",
  templateUrl: "./checked-out-order-item-table.component.html",
  styleUrls: ["./checked-out-order-item-table.component.scss"]
})
export class CheckedOutOrderItemTableComponent extends BaseTableComponent<CheckedOutOrderItemDto> implements OnInit {

  @Input() dataObservable: BehaviorSubject<CheckedOutOrderItemDto[]>;
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
