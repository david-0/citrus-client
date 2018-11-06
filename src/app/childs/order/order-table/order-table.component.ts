import {Component, Input, OnInit, ViewChild} from "@angular/core";
import {MatPaginator, MatSort} from "@angular/material";
import {OrderDto} from "citrus-common/lib/dto/order-dto";
import {Observable} from "rxjs";
import {BaseTableComponent} from "../../../base/base-table.component";
import {OrderDtoWithAllRestService} from "../order-dto-with-all-rest.service";
import {OrderSettingsService} from "../order-settings.service";

@Component({
  selector: "app-order-table",
  templateUrl: "./order-table.component.html",
  styleUrls: ["./order-table.component.scss"]
})
export class OrderTableComponent extends BaseTableComponent<OrderDto> implements OnInit {

  @Input() displayedColumns: string[];
  @Input() dataObservable: Observable<OrderDto[]>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(rest: OrderDtoWithAllRestService, settings: OrderSettingsService) {
    super(rest, settings);
  }

  ngOnInit() {
    this.dataObservable.subscribe(data => {
      this.datasource.data = data;
    });
  }

}