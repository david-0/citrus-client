import {Component, OnInit} from "@angular/core";
import {OrderDto} from "citrus-common/lib/dto/order-dto";
import {BehaviorSubject} from "rxjs";
import {OrderDtoWithAllRestService} from "../../order/order-dto-with-all-rest.service";

@Component({
  selector: "app-order-archiving-overview",
  templateUrl: "./order-archiving-overview.component.html",
  styleUrls: ["./order-archiving-overview.component.scss"]
})
export class OrderArchivingOverviewComponent implements OnInit {

  public displayedColumns = ["id", "date", "user", "location", "totalPrice", "comment", "plannedCheckout", "archiving"];
  public dataObservable = new BehaviorSubject<OrderDto[]>([]);

  constructor(private rest: OrderDtoWithAllRestService) {
  }

  ngOnInit() {
    const subscription = this.rest.getAll().subscribe(data => {
      this.dataObservable.next(data);
    });
  }
}
