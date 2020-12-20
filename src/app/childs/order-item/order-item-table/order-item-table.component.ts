import {AfterViewInit, Component, Input, OnInit, ViewChild} from "@angular/core";
import {OrderItemDto} from "citrus-common/lib/dto/order-item-dto";
import {BehaviorSubject} from "rxjs";
import {BaseTableComponent} from "../../../base/base-table.component";
import {MatSort} from "@angular/material/sort";

@Component({
  selector: "app-order-item-table",
  templateUrl: "./order-item-table.component.html",
  styleUrls: ["./order-item-table.component.scss"]
})
export class OrderItemTableComponent extends BaseTableComponent<OrderItemDto> implements OnInit, AfterViewInit {

  @Input() dataObservable: BehaviorSubject<OrderItemDto[]>;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  public displayedColumns = ["article", "quantity", "copiedPrice", "totalPrice"];

  constructor() {
    super(null, null);
  }

  ngOnInit() {
    this.dataObservable.subscribe(data => {
      this.dataSource.data = data;
    });
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }
}
