import {Component, OnInit} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {OrderDto} from "citrus-common/lib/dto/order-dto";
import {OrderDtoRestService} from "../order-dto-rest.service";

@Component({
  selector: "app-order-detail",
  templateUrl: "./order-detail.component.html",
  styleUrls: ["./order-detail.component.scss"]
})
export class OrderDetailComponent implements OnInit {
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
