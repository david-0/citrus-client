import { Component, Input, OnInit } from '@angular/core';
import { OrderDto } from 'citrus-common';

@Component({
  selector: 'app-my-order-details',
  templateUrl: './my-order-details.component.html',
  styleUrls: ['./my-order-details.component.scss']
})
export class MyOrdersDetailsComponent implements OnInit {

  @Input() order: OrderDto;

  constructor() {
  }

  ngOnInit() {
  }
}
