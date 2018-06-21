import {Component, OnDestroy, OnInit} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {CustomerOrderDto} from "citrus-common/lib/dto/customer-order-dto";
import {Subscription} from "rxjs/Subscription";
import {CustomerOrderWithItemsAndArticleDtoRestService} from "../customer-order-with-items-and-article-dto-rest.service";

@Component({
  selector: "app-customer-order-detail",
  templateUrl: "./customer-order-detail.component.html",
  styleUrls: ["./customer-order-detail.component.scss"]
})
export class CustomerOrderDetailComponent implements OnInit , OnDestroy {
  private _customerOrder: CustomerOrderDto = CustomerOrderDto.createEmpty();
  private subscription: Subscription;

  constructor(private route: ActivatedRoute, private rest: CustomerOrderWithItemsAndArticleDtoRestService) {
  }

  public get customerOrder(): CustomerOrderDto {
    return this._customerOrder;
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const promise = this.rest.get(+params["id"]);
      this.subscription = promise.subscribe((customerOrder) => {
        this._customerOrder = customerOrder;
      });
    });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
