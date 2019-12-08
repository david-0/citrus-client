import {Component, OnInit} from "@angular/core";
import {CartDto, CartItemDto} from "citrus-common";
import {CartStateService} from "../cart-state.service";
import {CartService} from "../cart.service";

@Component({
  selector: "app-shopping-cart-detail",
  templateUrl: "./shopping-cart-detail.component.html",
  styleUrls: ["./shopping-cart-detail.component.scss"]
})
export class ShoppingCartDetailComponent implements OnInit {

  constructor(public cartService: CartService, public cartStateService: CartStateService) {
  }

  ngOnInit() {
  }

  public increase(cart: CartDto, cartItem: CartItemDto) {
    this.cartService.addArticle(cart.location, cartItem.article, 1 * cartItem.article.saleUnit);
  }

  public decrease(cart: CartDto, cartItem: CartItemDto) {
    this.cartService.addArticle(cart.location, cartItem.article, -1 * cartItem.article.saleUnit);
  }

  public remove(cart: CartDto, cartItem: CartItemDto) {
    this.cartService.removeArticle(cart.location, cartItem.article);
  }
}
