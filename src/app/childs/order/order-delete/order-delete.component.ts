import {Component, OnInit} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {OrderDto} from "citrus-common/lib/dto/order-dto";
import {DeleteExecutor} from "../../../base/delete-executor";
import {OrderDtoWithAllRestService} from "../order-dto-with-all-rest.service";

@Component({
  selector: "app-order-delete",
  templateUrl: "./order-delete.component.html",
  styleUrls: ["./order-delete.component.scss"]
})
export class OrderDeleteComponent implements OnInit {

  public deleteExecutor: DeleteExecutor<OrderDto>;

  constructor(private route: ActivatedRoute,
              private rest: OrderDtoWithAllRestService) {
  }

  ngOnInit() {
    this.deleteExecutor = new DeleteExecutor<OrderDto>(this.route, this.rest, "Die Kundenbestellung");
    this.deleteExecutor.initDelete();
  }
}
