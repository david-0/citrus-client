import {Component, OnInit} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {OrderDto} from "citrus-common";
import {OrderDtoWithAllRestService} from "../../childs/order/order-dto-with-all-rest.service";
import {SaleLocationService} from "../sale-location.service";

@Component({
  selector: "app-sale-order",
  templateUrl: "./sale-order.component.html",
  styleUrls: ["./sale-order.component.scss"]
})
export class SaleOrderComponent implements OnInit {

  private _order: OrderDto = OrderDto.createEmpty();
  public saleLocationOk = true;

  constructor(private route: ActivatedRoute,
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
    if (this.saleLocationService.getSaleLocation().getValue() &&
      this.saleLocationService.getSaleLocation().getValue().id !== this._order.location.id) {
      this.saleLocationOk = false;
    } else {
      this.saleLocationOk = true;
    }
  }
}
