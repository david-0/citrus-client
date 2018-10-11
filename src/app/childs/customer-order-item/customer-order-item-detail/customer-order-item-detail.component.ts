import {Component, OnInit} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {CustomerOrderItemDto} from "citrus-common/lib/dto/customer-order-item-dto";
import {CustomerOrderWithItemsAndArticleDtoRestService} from "../../customer-order/customer-order-with-items-and-article-dto-rest.service";

@Component({
  selector: "app-customer-order-item-detail",
  templateUrl: "./customer-order-item-detail.component.html",
  styleUrls: ["./customer-order-item-detail.component.scss"]
})
export class CustomerOrderItemDetailComponent implements OnInit{
  private _customerOrderItem: CustomerOrderItemDto = CustomerOrderItemDto.createEmpty();

  constructor(private route: ActivatedRoute, private rest: CustomerOrderWithItemsAndArticleDtoRestService) {
  }

  public get customerOrderItem(): CustomerOrderItemDto {
    return this._customerOrderItem;
  }

  ngOnInit() {
    this.route.parent.params.subscribe(customerOrderParams => {
      const promise = this.rest.get(+customerOrderParams["id"]);
      promise.subscribe((customerOrder) => {
        this.route.params.subscribe(customerOrderItemParams => {
          this._customerOrderItem = customerOrder.customerOrderItems.filter(o => o.id === +customerOrderItemParams["id"])[0];
        });
      });
    });
  }
}
