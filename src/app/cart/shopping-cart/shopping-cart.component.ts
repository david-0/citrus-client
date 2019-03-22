import {Component, OnInit} from "@angular/core";
import {CartStateService} from "../cart-state.service";

@Component({
  selector: "app-shopping-cart",
  templateUrl: "./shopping-cart.component.html",
  styleUrls: ["./shopping-cart.component.scss"]
})
export class ShoppingCartComponent implements OnInit {

  constructor(public cartStateService: CartStateService) {
  }

  ngOnInit() {
  }

}
