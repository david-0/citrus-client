import {Component, OnInit} from "@angular/core";
import {OrderDto} from "citrus-common/lib/dto/order-dto";
import {BehaviorSubject} from "rxjs";
import { XlsOrderExporter } from "../xls-order-exporter";
import {OrderDtoWithAllRestService} from "../order-dto-with-all-rest.service";

@Component({
  selector: "app-order-overview",
  templateUrl: "./order-overview.component.html",
  styleUrls: ["./order-overview.component.scss"]
})
export class OrderOverviewComponent implements OnInit {

  public displayedColumns = ["id", "date", "user", "location", "totalPrice", "comment", "plannedCheckout"];
  public dataObservable = new BehaviorSubject<OrderDto[]>([]);

  constructor(private rest: OrderDtoWithAllRestService, private exporter: XlsOrderExporter) {
  }

  ngOnInit() {
    const subscription = this.rest.getAll().subscribe(data => {
      this.dataObservable.next(data);
    });
  }

  public saveFile() {
    this.exporter.exportAsExcelFile(this.dataObservable.getValue(), "bestellungen");
  }
}
