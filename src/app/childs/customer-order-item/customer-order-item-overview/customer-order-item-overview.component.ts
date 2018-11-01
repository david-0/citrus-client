import {Component, OnInit} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {OrderItemDto} from "citrus-common/lib/dto/order-item-dto";
import {BehaviorSubject} from "rxjs";
import {OrderDtoRestService} from "../../customer-order/order-dto-rest.service";

@Component({
  selector: "app-customer-order-item-overview",
  templateUrl: "./customer-order-item-overview.component.html",
  styleUrls: ["./customer-order-item-overview.component.scss"]
})
export class CustomerOrderItemOverviewComponent implements OnInit {

  public id: number;

  dataObservable = new BehaviorSubject<OrderItemDto[]>([]);

  constructor(private route: ActivatedRoute,
              private router: Router,
              private rest: OrderDtoRestService) {
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
