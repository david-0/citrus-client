import {Component, OnInit} from "@angular/core";
import {CustomerOrderDto} from "citrus-common/lib/dto/customer-order-dto";
import {BehaviorSubject} from "rxjs";
import {CustomerOrderDtoRestService} from "../customer-order-dto-rest.service";

@Component({
  selector: "app-customer-order-overview",
  templateUrl: "./customer-order-overview.component.html",
  styleUrls: ["./customer-order-overview.component.scss"]
})
export class CustomerOrderOverviewComponent implements OnInit {

  public displayedColumns = ["id", "date", "totalPrice", "pickupLocation", "user"];
  public dataObservable = new BehaviorSubject<CustomerOrderDto[]>([]);

  constructor(private rest: CustomerOrderDtoRestService) {
  }

  ngOnInit() {
    const subscription = this.rest.getAll().subscribe(data => {
      this.dataObservable.next(data);
    });
  }
}
