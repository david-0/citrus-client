import {HttpClient, HttpHeaders} from "@angular/common/http";
import {AfterViewInit, Component, Inject, Input, OnInit, ViewChild} from "@angular/core";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {OrderDto} from "citrus-common/lib/dto/order-dto";
import {Observable} from "rxjs";
import {BaseTableComponent} from "../../../base/base-table.component";
import {OrderDtoWithAllRestService} from "../../order/order-dto-with-all-rest.service";
import {OrderArchiveDtoRestService} from "../../order-archive/order-archive-dto-rest.service";
import {OrderArchiveSettingsService} from "../../order-archive/order-archive-settings.service";
import {OrderArchivingSettingsService} from "../order-archiving-settings.service";

@Component({
  selector: "app-order-archiving-table",
  templateUrl: "./order-archiving-table.component.html",
  styleUrls: ["./order-archiving-table.component.scss"]
})
export class OrderArchivingTableComponent extends BaseTableComponent<OrderDto> implements OnInit, AfterViewInit {
  private headers = new HttpHeaders({"Content-Type": "application/json"});

  @Input() displayedColumns: string[];
  @Input() dataObservable: Observable<OrderDto[]>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  private lastData: OrderDto[];

  constructor(restOrder: OrderDtoWithAllRestService,
              settings: OrderArchivingSettingsService,
              private http: HttpClient,
              @Inject("baseUrl") private baseUrl: string) {
    super(restOrder, settings);
  }

  ngOnInit() {
    this.dataObservable.subscribe(data => {
      this.lastData = data;
      this.dataSource.data = data;
    });
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  public async archiving(id: number) {
    this.http.get<number>(this.baseUrl + "/orderArchive/archiving/" + id, {headers: this.headers}).subscribe(orderId => {
      this.lastData = this.lastData.filter(d => d.id !== orderId);
      this.dataSource.data = this.lastData;
    });
  }
}
