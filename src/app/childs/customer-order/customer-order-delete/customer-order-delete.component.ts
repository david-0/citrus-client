import {Component, OnInit} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {CustomerOrderDto} from "citrus-common/lib/dto/customer-order-dto";
import {DeleteExecutor} from "../../../base/delete-executor";
import {CustomerOrderDtoRestService} from "../customer-order-dto-rest.service";

@Component({
  selector: "app-customer-order-delete",
  templateUrl: "./customer-order-delete.component.html",
  styleUrls: ["./customer-order-delete.component.scss"]
})
export class CustomerOrderDeleteComponent implements OnInit {

  public deleteExecutor: DeleteExecutor<CustomerOrderDto>;

  constructor(private route: ActivatedRoute,
              private rest: CustomerOrderDtoRestService) {
  }

  ngOnInit() {
    this.deleteExecutor = new DeleteExecutor<CustomerOrderDto>(this.route, this.rest, "Die Kundenbestellung");
    this.deleteExecutor.initDelete();
  }
}
