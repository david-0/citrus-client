import {Component, OnInit} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {OrderDto} from "citrus-common";
import {OrderDtoRestService} from "../../childs/order/order-dto-rest.service";

@Component({
  selector: "app-sale-order",
  templateUrl: "./sale-order.component.html",
  styleUrls: ["./sale-order.component.scss"]
})
export class SaleOrderComponent implements OnInit {

  private _order: OrderDto = OrderDto.createEmpty();

  constructor(private route: ActivatedRoute, private rest: OrderDtoRestService) {
  }

  public get order(): OrderDto {
    return this._order;
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.rest.get(+params["id"]).subscribe((order) => {
        this._order = order;
      });
    });
  }
}
