import {Component, Input, OnInit} from "@angular/core";
import {CartEntry} from "../../cart/cart-entry";

@Component({
  selector: "app-checkout-detail",
  templateUrl: "./checkout-detail.component.html",
  styleUrls: ["./checkout-detail.component.scss"]
})
export class CheckoutDetailComponent implements OnInit {

  @Input() cartEntries: CartEntry[];
  total: number = 0;

  constructor() {
  }

  ngOnInit() {
    this.cartEntries.forEach(entry => { this.total = this.total + entry.price; } );
  }
}
