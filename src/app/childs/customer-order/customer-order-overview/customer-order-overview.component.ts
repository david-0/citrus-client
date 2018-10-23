import {Component, OnInit} from "@angular/core";
import {OrderDto} from "citrus-common/lib/dto/order-dto";
import {BehaviorSubject} from "rxjs";
import {OrderDtoRestService} from "../order-dto-rest.service";

@Component({
  selector: "app-customer-order-overview",
  templateUrl: "./customer-order-overview.component.html",
  styleUrls: ["./customer-order-overview.component.scss"]
})
export class CustomerOrderOverviewComponent implements OnInit {

  public displayedColumns = ["id", "date", "user", "location", "totalPrice", "plannedCheckout", "checkedOut"];
  public dataObservable = new BehaviorSubject<OrderDto[]>([]);

  constructor(private rest: OrderDtoRestService) {
  }

  ngOnInit() {
    const subscription = this.rest.getAll().subscribe(data => {
      this.dataObservable.next(data);
    });
  }
}
