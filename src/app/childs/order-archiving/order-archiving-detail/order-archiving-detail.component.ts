import {Component, OnInit} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {OrderDto} from "citrus-common/lib/dto/order-dto";
import {OrderDtoWithAllRestService} from "../../order/order-dto-with-all-rest.service";

@Component({
  selector: "app-order-archiving-detail",
  templateUrl: "./order-archiving-detail.component.html",
  styleUrls: ["./order-archiving-detail.component.scss"]
})
export class OrderArchivingDetailComponent implements OnInit {
  private _order: OrderDto = OrderDto.createEmpty();

  constructor(private route: ActivatedRoute, private rest: OrderDtoWithAllRestService) {
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

