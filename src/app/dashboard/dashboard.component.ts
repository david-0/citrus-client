import {Component, OnInit} from "@angular/core";
import {CartService} from "../cart/cart.service";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"]
})
export class DashboardComponent implements OnInit {

  events: string[] = [];
  opened = true;

  constructor(public cartService: CartService) {
  }

  ngOnInit() {
  }

  clearCart() {
    this.cartService.clear();
  }
}
