import {Component, OnInit} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {OrderItemDto} from "citrus-common";
import {BehaviorSubject} from "rxjs";
import {OrderDtoWithAllRestService} from "../../order/order-dto-with-all-rest.service";

@Component({
  selector: "app-checked-out-order-item-overview",
  templateUrl: "./checked-out-order-item-overview.component.html",
  styleUrls: ["./checked-out-order-item-overview.component.scss"]
})
export class CheckedOutOrderItemOverviewComponent implements OnInit {


  public id: number;

  dataObservable = new BehaviorSubject<OrderItemDto[]>([]);

  constructor(private route: ActivatedRoute,
              private router: Router,
              private rest: OrderDtoWithAllRestService) {
  }

  ngOnInit() {
    this.route.parent.params.subscribe(params => {
      if (params["id"] !== null) {
        this.id = +params["id"];
        this.rest.get(+params["id"]).subscribe(order => {
          this.dataObservable.next(order.checkedOutOrderItems);
        });
      }
    });
  }
}
