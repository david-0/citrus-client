import {Component, Inject, Input, OnInit, ViewChild} from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {OrderDto} from "citrus-common/lib/dto/order-dto";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {OrderDtoWithAllRestService} from "../../order/order-dto-with-all-rest.service";
import {OrderArchivingSettingsService} from "../../order-archiving/order-archiving-settings.service";
import {HttpClient} from "@angular/common/http";
import {DeliveryNoteSettingsService} from "../delivery-note-settings.service";
import {BaseTableComponent} from "../../../base/base-table.component";
import {DeliveryNoteService} from "../delivery-note.service";

@Component({
  selector: 'app-delivery-note-table',
  templateUrl: './delivery-note-table.component.html',
  styleUrls: ['./delivery-note-table.component.scss']
})
export class DeliveryNoteTableComponent extends BaseTableComponent<OrderDto> implements OnInit {

  @Input() displayedColumns: string[];
  @Input() dataObservable: BehaviorSubject<OrderDto[]>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(restOrder: OrderDtoWithAllRestService,
              settings: DeliveryNoteSettingsService,
              private deliveryNoteService: DeliveryNoteService,
              private http: HttpClient,
              @Inject("baseUrl") private baseUrl: string) {
    super(restOrder, settings);
  }

  ngOnInit() {
    this.dataObservable.subscribe(data => {
      this.dataSource.data = data;
    });
  }

  public downloadDeliveryNote(orderId: number) {
    this.deliveryNoteService.downloadDeliveryNotes([orderId]).subscribe(
      orderIds => this.rest.getAll().subscribe(data => {
        this.dataObservable.next(data);
      })
    )
  }
}
