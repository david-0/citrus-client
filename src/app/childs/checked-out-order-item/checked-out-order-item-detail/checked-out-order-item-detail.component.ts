import {Component, OnInit} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {CheckedOutOrderItemDto} from "citrus-common";
import {OrderItemDto} from "citrus-common/lib/dto/order-item-dto";
import {OrderDtoWithAllRestService} from "../../order/order-dto-with-all-rest.service";

@Component({
  selector: "app-checked-out-order-item-detail",
  templateUrl: "./checked-out-order-item-detail.component.html",
  styleUrls: ["./checked-out-order-item-detail.component.scss"]
})
export class CheckedOutOrderItemDetailComponent implements OnInit{
  private _checkedOutOrderItem: OrderItemDto = CheckedOutOrderItemDto.createEmpty();

  constructor(private route: ActivatedRoute, private rest: OrderDtoWithAllRestService) {
  }

  public get checkedOutOrderItem(): CheckedOutOrderItemDto {
    return this._checkedOutOrderItem;
  }

  ngOnInit() {
    this.route.parent.params.subscribe(orderParams => {
      const promise = this.rest.get(+orderParams["id"]);
      promise.subscribe((order) => {
        this.route.params.subscribe(checkedOutOrderItemParams => {
          this._checkedOutOrderItem = order.checkedOutOrderItems.filter(o => o.id === +checkedOutOrderItemParams["id"])[0];
        });
      });
    });
  }
}
