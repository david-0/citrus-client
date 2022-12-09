import {Component, OnInit} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {OrderItemDto} from "citrus-common/lib/dto/order-item-dto";
import {BehaviorSubject} from "rxjs";
import {OrderDtoWithAllRestService} from "../../order/order-dto-with-all-rest.service";

@Component({
  selector: "app-order-item-overview",
  templateUrl: "./order-item-overview.component.html",
  styleUrls: ["./order-item-overview.component.scss"]
})
export class OrderItemOverviewComponent implements OnInit {

  public id: number;

  dataObservable = new BehaviorSubject<OrderItemDto[]>([]);

  constructor(private route: ActivatedRoute,
              private rest: OrderDtoWithAllRestService) {
  }

  ngOnInit() {
    this.route.parent.params.subscribe(params => {
      if (params["id"] !== null) {
        this.id = +params["id"];
        this.rest.get(+params["id"]).subscribe(order => {
          this.dataObservable.next(order.orderItems);
        });
      }
    });
  }
}
