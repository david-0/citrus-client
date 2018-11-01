import {Component, OnDestroy, OnInit} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {OrderDto} from "citrus-common/lib/dto/order-dto";
import {Subscription} from "rxjs";
import {OrderDtoRestService} from "../order-dto-rest.service";

@Component({
  selector: "app-order-detail",
  templateUrl: "./order-detail.component.html",
  styleUrls: ["./order-detail.component.scss"]
})
export class OrderDetailComponent implements OnInit , OnDestroy {
  private _order: OrderDto = OrderDto.createEmpty();
  private subscription: Subscription;

  constructor(private route: ActivatedRoute, private rest: OrderDtoRestService) {
  }

  public get order(): OrderDto {
    return this._order;
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const promise = this.rest.get(+params["id"]);
      this.subscription = promise.subscribe((order) => {
        this._order = order;
      });
    });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
