import {Component, OnInit} from "@angular/core";
import {CartStateService} from "../cart-state.service";
import {CartService} from "../cart.service";

@Component({
  selector: "app-shopping-cart-view",
  templateUrl: "./shopping-cart-view.component.html",
  styleUrls: ["./shopping-cart-view.component.scss"]
})
export class ShoppingCartViewComponent implements OnInit {

  constructor(public cartService: CartService, public cartStateService: CartStateService) {
  }

  ngOnInit() {
  }

}
