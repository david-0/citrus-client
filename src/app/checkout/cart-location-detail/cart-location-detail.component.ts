import {Component, Input, OnInit} from "@angular/core";
import {CartDto} from "citrus-common";

@Component({
  selector: "app-cart-location-detail",
  templateUrl: "./cart-location-detail.component.html",
  styleUrls: ["./cart-location-detail.component.scss"]
})
export class CartLocationDetailComponent implements OnInit {

  @Input() cart: CartDto;

  constructor() {
  }

  ngOnInit() {
  }

}
