import {Component, Input, OnInit} from "@angular/core";
import {OrderDto} from "citrus-common/lib/dto/order-dto";

@Component({
  selector: "app-order-detail-only",
  templateUrl: "./order-detail-only.component.html",
  styleUrls: ["./order-detail-only.component.scss"]
})
export class OrderDetailOnlyComponent implements OnInit {

  @Input() order: OrderDto;

  constructor() {
  }

  ngOnInit() {
  }
}
