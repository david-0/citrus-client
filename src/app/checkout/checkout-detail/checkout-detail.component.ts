import {Component, Input, OnInit} from "@angular/core";
import {CartDto} from "citrus-common";

@Component({
  selector: "app-checkout-detail",
  templateUrl: "./checkout-detail.component.html",
  styleUrls: ["./checkout-detail.component.scss"]
})
export class CheckoutDetailComponent implements OnInit {

  @Input() cart: CartDto;

  constructor() {
  }

  ngOnInit() {
  }
}
