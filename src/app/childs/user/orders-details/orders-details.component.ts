import { Component, Input, OnInit } from '@angular/core';
import { OrderArchiveDto, OrderDto } from 'citrus-common';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-orders-details',
  templateUrl: './orders-details.component.html',
  styleUrls: ['./orders-details.component.scss']
})
export class OrdersDetailsComponent implements OnInit {

  @Input() orderObservable = new BehaviorSubject<OrderDto[]>([]);
  @Input() orderArchiveObservable = new BehaviorSubject<OrderArchiveDto[]>([]);

  constructor() { }

  ngOnInit() {
  }

}
