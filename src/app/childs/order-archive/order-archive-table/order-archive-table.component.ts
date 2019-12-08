import {HttpClient} from "@angular/common/http";
import {Component, Inject, Input, OnInit, ViewChild} from "@angular/core";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {OrderArchiveDto} from "citrus-common";
import {Observable} from "rxjs";
import {BaseTableComponent} from "../../../base/base-table.component";
import {OrderArchiveDtoRestService} from "../order-archive-dto-rest.service";
import {OrderArchiveSettingsService} from "../order-archive-settings.service";

@Component({
  selector: "app-order-archive-table",
  templateUrl: "./order-archive-table.component.html",
  styleUrls: ["./order-archive-table.component.scss"]
})
export class OrderArchiveTableComponent extends BaseTableComponent<OrderArchiveDto> implements OnInit {

  @Input() displayedColumns: string[];
  @Input() dataObservable: Observable<OrderArchiveDto[]>;

  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(restOrderArchive: OrderArchiveDtoRestService,
              settings: OrderArchiveSettingsService,
              private http: HttpClient,
              @Inject("baseUrl") private baseUrl: string) {
    super(restOrderArchive, settings);
  }

  ngOnInit() {
    this.dataObservable.subscribe(data => {
      this.datasource.data = data;
      this.datasource.filterPredicate = this.filterPredicate;
    });
  }

  private filterPredicate(data: OrderArchiveDto, filter: string): boolean {
    return (data.order.user.name.toLowerCase()
      + data.order.user.prename.toLowerCase()
    ).indexOf(filter.toLowerCase()) > -1;
  }
}
