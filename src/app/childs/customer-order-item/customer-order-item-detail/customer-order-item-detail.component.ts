import {Component, OnInit} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {CustomerOrderDto} from "citrus-common/lib/dto/customer-order-dto";
import {CustomerOrderItemDto} from "citrus-common/lib/dto/customer-order-item-dto";
import {CustomerOrderWithItemsAndArticleDtoRestService} from "../../customer-order/customer-order-with-items-and-article-dto-rest.service";

@Component({
  selector: "app-customer-order-item-detail",
  templateUrl: "./customer-order-item-detail.component.html",
  styleUrls: ["./customer-order-item-detail.component.scss"]
})
export class CustomerOrderItemDetailComponent implements OnInit{
  private _customerOrder: CustomerOrderDto = CustomerOrderDto.createEmpty();
  private _customerOrderItem: CustomerOrderItemDto = CustomerOrderItemDto.createEmpty(this._customerOrder);

  constructor(private route: ActivatedRoute, private rest: CustomerOrderWithItemsAndArticleDtoRestService) {
  }

  public get customerOrderItem(): CustomerOrderItemDto {
    return this._customerOrderItem;
  }

  ngOnInit() {
    this.route.parent.params.subscribe(customerOrderParams => {
      const promise = this.rest.get(+customerOrderParams["id"]);
      promise.subscribe((customerOrder) => {
        this._customerOrder = customerOrder;
        this.route.params.subscribe(customerOrderItemParams => {
          this._customerOrderItem = this._customerOrder.customerOrderItems.filter(o => o.id === +customerOrderItemParams["id"])[0];
        });
      });
    });
  }
}
