import {Component, Input, OnInit, ViewChild} from "@angular/core";
import {MatPaginator, MatSort} from "@angular/material";
import {CustomerOrderDto} from "citrus-common/lib/dto/customer-order-dto";
import {Observable} from "rxjs";
import {BaseTableComponent} from "../../../base/base-table.component";
import {CustomerOrderDtoRestService} from "../customer-order-dto-rest.service";
import {CustomerOrderSettingsService} from "../customer-order-settings.service";

@Component({
  selector: "app-customer-order-table",
  templateUrl: "./customer-order-table.component.html",
  styleUrls: ["./customer-order-table.component.scss"]
})
export class CustomerOrderTableComponent extends BaseTableComponent<CustomerOrderDto> implements OnInit {

  @Input() displayedColumns: string[];
  @Input() dataObservable: Observable<CustomerOrderDto[]>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(rest: CustomerOrderDtoRestService, settings: CustomerOrderSettingsService) {
    super(rest, settings);
  }

  ngOnInit() {
    this.dataObservable.subscribe(data => {
      this.datasource.data = data;
    });
  }

}
