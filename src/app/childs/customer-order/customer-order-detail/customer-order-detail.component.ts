import {Component, OnDestroy, OnInit} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {OrderDto} from "citrus-common/lib/dto/order-dto";
import {Subscription} from "rxjs";
import {OrderWithItemsAndArticleDtoRestService} from "../order-with-items-and-article-dto-rest.service";

@Component({
  selector: "app-customer-order-detail",
  templateUrl: "./customer-order-detail.component.html",
  styleUrls: ["./customer-order-detail.component.scss"]
})
export class CustomerOrderDetailComponent implements OnInit , OnDestroy {
  private _order: OrderDto = OrderDto.createEmpty();
  private subscription: Subscription;

  constructor(private route: ActivatedRoute, private rest: OrderWithItemsAndArticleDtoRestService) {
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
