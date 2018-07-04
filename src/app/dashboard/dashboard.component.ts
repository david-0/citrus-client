import {Component, OnInit} from "@angular/core";
import {CartEntry} from "../cart/cart-entry";
import {CartService} from "../cart/cart.service";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"]
})
export class DashboardComponent implements OnInit {

  events: string[] = [];
  opened = true;
  private _totalPrice = 0;

  constructor(public cartService: CartService) {
  }

  get totalPrice(): number {
    return this._totalPrice;
  }

  ngOnInit() {
    this.cartService.getCart().subscribe(cartEntries => {
      this._totalPrice = this.computeTotalPrice(cartEntries);
    });
  }

  clearCart() {
    this.cartService.clear();
  }

  private computeTotalPrice(cartEntries: CartEntry[]): number {
    return cartEntries
      .map(entry => +entry.count * +entry.price)
      .reduce((a, b) => a + b, 0);
  }
}
