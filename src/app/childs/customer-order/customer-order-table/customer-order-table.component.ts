import {Component, Input, OnInit, ViewChild} from "@angular/core";
import {MatPaginator, MatSort} from "@angular/material";
import {OrderDto} from "citrus-common/lib/dto/order-dto";
import {Observable} from "rxjs";
import {BaseTableComponent} from "../../../base/base-table.component";
import {OrderDtoRestService} from "../order-dto-rest.service";
import {OrderSettingsService} from "../order-settings.service";

@Component({
  selector: "app-customer-order-table",
  templateUrl: "./customer-order-table.component.html",
  styleUrls: ["./customer-order-table.component.scss"]
})
export class CustomerOrderTableComponent extends BaseTableComponent<OrderDto> implements OnInit {

  @Input() displayedColumns: string[];
  @Input() dataObservable: Observable<OrderDto[]>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(rest: OrderDtoRestService, settings: OrderSettingsService) {
    super(rest, settings);
  }

  ngOnInit() {
    this.dataObservable.subscribe(data => {
      this.datasource.data = data;
    });
  }

}
