import {Component, Input, OnInit} from "@angular/core";
import {CustomerOrderDto} from "citrus-common/lib/dto/customer-order-dto";

@Component({
  selector: "app-customer-order-detail-only",
  templateUrl: "./customer-order-detail-only.component.html",
  styleUrls: ["./customer-order-detail-only.component.scss"]
})
export class CustomerOrderDetailOnlyComponent implements OnInit {

  @Input() customerOrder: CustomerOrderDto;

  constructor() {
  }

  ngOnInit() {
  }
}
