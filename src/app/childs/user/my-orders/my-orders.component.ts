import { Component, OnInit } from '@angular/core';
import { OrderArchiveDto, OrderDto } from 'citrus-common';
import { BehaviorSubject } from 'rxjs';
import { OrderDtoWithAllRestService } from '../../order/order-dto-with-all-rest.service';
import { OrderArchiveDtoRestService } from '../../order-archive/order-archive-dto-rest.service';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.scss']
})
export class MyOrdersComponent implements OnInit {
  public orderObservable = new BehaviorSubject<OrderDto[]>([]);
  public orderArchiveObservable = new BehaviorSubject<OrderArchiveDto[]>([]);

  constructor(private rest: OrderDtoWithAllRestService, private archive: OrderArchiveDtoRestService) { }

  ngOnInit() {
    this.rest.getMyOrders().subscribe(data => {
      this.orderObservable.next(data);
    });
    this.archive.getMyOrders().subscribe(data => {
      this.orderArchiveObservable.next(data);
    });
  }

}
