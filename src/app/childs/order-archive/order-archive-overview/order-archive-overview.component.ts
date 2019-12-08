import {Component, OnInit} from "@angular/core";
import {OrderArchiveDto} from "citrus-common";
import {BehaviorSubject} from "rxjs";
import {OrderArchiveDtoRestService} from "../order-archive-dto-rest.service";

@Component({
  selector: "app-order-archive-overview",
  templateUrl: "./order-archive-overview.component.html",
  styleUrls: ["./order-archive-overview.component.scss"]
})
export class OrderArchiveOverviewComponent implements OnInit {

  public displayedColumns = ["archiveDate", "archiveUser", "id", "date", "user", "location", "totalPrice", "comment", "plannedCheckout", "checkedOut"];
  public dataObservable = new BehaviorSubject<OrderArchiveDto[]>([]);

  constructor(private rest: OrderArchiveDtoRestService) {
  }

  ngOnInit() {
    const subscription = this.rest.getAll().subscribe(data => {
      this.dataObservable.next(data);
    });
  }
}
