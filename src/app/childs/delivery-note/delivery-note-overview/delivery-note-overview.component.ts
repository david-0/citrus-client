import {Component, OnInit} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {OrderDto} from "citrus-common/lib/dto/order-dto";
import {OrderDtoWithAllRestService} from "../../order/order-dto-with-all-rest.service";
import {DeliveryNoteService} from "../delivery-note.service";

@Component({
  selector: 'app-delivery-note-overview',
  templateUrl: './delivery-note-overview.component.html',
  styleUrls: ['./delivery-note-overview.component.scss']
})
export class DeliveryNoteOverviewComponent implements OnInit {


  public displayedColumns = ["id", "date", "user", "location", "totalPrice", "deliveryNoteCreated", "comment", "plannedCheckout", "deliveryNote"];
  public dataObservable = new BehaviorSubject<OrderDto[]>([]);

  constructor(private rest: OrderDtoWithAllRestService, private deliveryNoteService: DeliveryNoteService) {
  }

  ngOnInit() {
    const subscription = this.rest.getAll().subscribe(data => {
      this.dataObservable.next(data);
    });
  }

  public downloadNotCreatedDeliveryNotes() {
    const orderIds = this.dataObservable.getValue()
      .filter(o => !o.deliveryNoteCreated)
      .map(o => o.id);
    if (orderIds.length != 0) {
      this.deliveryNoteService.downloadDeliveryNotes(orderIds).subscribe(
        orderIds => this.rest.getAll().subscribe(data => {
          this.dataObservable.next(data);
        })
      )
    }
  }

  public downloadAllDeliveryNotes() {
    const orderIds = this.dataObservable.getValue()
      .map(o => o.id);
    if (orderIds.length != 0) {
      this.deliveryNoteService.downloadDeliveryNotes(orderIds).subscribe(
        orderIds => this.rest.getAll().subscribe(data => {
          this.dataObservable.next(data);
        })
      )
    }
  }
}
