import { Component, Input, OnInit } from '@angular/core';
import { OrderDto } from 'citrus-common';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss']
})
export class OrderDetailsComponent implements OnInit {

  @Input() order: OrderDto;

  constructor() {
  }

  ngOnInit() {
  }
}
