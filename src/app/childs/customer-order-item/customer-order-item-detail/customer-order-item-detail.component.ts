import {Component, OnInit} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {OrderItemDto} from "citrus-common/lib/dto/order-item-dto";
import {OrderWithItemsAndArticleDtoRestService} from "../../customer-order/order-with-items-and-article-dto-rest.service";

@Component({
  selector: "app-customer-order-item-detail",
  templateUrl: "./customer-order-item-detail.component.html",
  styleUrls: ["./customer-order-item-detail.component.scss"]
})
export class CustomerOrderItemDetailComponent implements OnInit{
  private _orderItem: OrderItemDto = OrderItemDto.createEmpty();

  constructor(private route: ActivatedRoute, private rest: OrderWithItemsAndArticleDtoRestService) {
  }

  public get orderItem(): OrderItemDto {
    return this._orderItem;
  }

  ngOnInit() {
    this.route.parent.params.subscribe(orderParams => {
      // const promise = this.rest.get(+orderParams["id"]);
      // promise.subscribe((order) => {
      //   this.route.params.subscribe(orderItemParams => {
      //     this._orderItem = order.orderItems.filter(o => o.id === +orderItemParams["id"])[0];
      //   });
      // });
    });
  }
}
