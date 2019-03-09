import {Component, OnInit} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {CheckedOutOrderItemDto, OrderDto} from "citrus-common";
import {OrderDtoWithAllRestService} from "../../childs/order/order-dto-with-all-rest.service";
import {SaleLocationService} from "../sale-location.service";

@Component({
  selector: "app-sale-order",
  templateUrl: "./sale-order.component.html",
  styleUrls: ["./sale-order.component.scss"]
})
export class SaleOrderComponent implements OnInit {

  private _order: OrderDto;
  public saleLocationOk = true;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private rest: OrderDtoWithAllRestService,
              public saleLocationService: SaleLocationService) {
  }

  public get order(): OrderDto {
    return this._order;
  }

  ngOnInit() {
    this.saleLocationOk = true;
    this.route.params.subscribe(params => {
      this.rest.get(+params["id"]).subscribe((order) => {
        this._order = order;
        this.checkSaleLocation();
      });
    });
    this.saleLocationService.getSaleLocation().subscribe(() => {
      this.checkSaleLocation();
    });
  }

  private checkSaleLocation() {
    const saleLocation = this.saleLocationService.getSaleLocation().getValue();
    if (saleLocation && this._order && saleLocation.id !== this._order.location.id) {
      this.saleLocationOk = false;
    } else {
      this.saleLocationOk = true;
    }
  }

  public checkout() {
    this._order.checkedOut = true;
    this._order.orderItems.forEach(item => {
      const checkedOutItem = CheckedOutOrderItemDto.createEmpty();
      checkedOutItem.article = item.article;
      checkedOutItem.copiedPrice = item.copiedPrice;
      checkedOutItem.quantity = item.quantity;
      checkedOutItem.order = undefined;
      this._order.checkedOutOrderItems.push(checkedOutItem);
    });
    this.rest.update(this._order)
      .subscribe(
        (result) => this.router.navigate([".."], {relativeTo: this.route}),
        (err) => console.error(`could not update order: ${this.order.id} with Error: ${err}`));
  }
}
