import { Component, Input, OnInit } from '@angular/core';
import { OrderArchiveDto, OrderDto, UserDto } from 'citrus-common';
import { BehaviorSubject, Observable } from 'rxjs';
import { OrderDtoWithAllRestService } from '../../order/order-dto-with-all-rest.service';
import { OrderArchiveDtoRestService } from '../../order-archive/order-archive-dto-rest.service';

@Component({
  selector: 'app-orders-by-user',
  templateUrl: './orders-by-user.component.html',
  styleUrls: ['./orders-by-user.component.scss']
})
export class OrdersByUserComponent implements OnInit {

  @Input() user: Observable<UserDto> = new BehaviorSubject<UserDto>(UserDto.createEmpty());

  public orderObservable = new BehaviorSubject<OrderDto[]>([]);
  public orderArchiveObservable = new BehaviorSubject<OrderArchiveDto[]>([]);

  constructor(private rest: OrderDtoWithAllRestService, private archive: OrderArchiveDtoRestService) { }

  ngOnInit() {
    this.user.subscribe(u => {
      if (u.id !== undefined) {
        this.rest.getByUser(u.id).subscribe(data => {
          this.orderObservable.next(data);
        });
        this.archive.getByUser(u.id).subscribe(data => {
          this.orderArchiveObservable.next(data);
        });
      }
    });
  }
}
