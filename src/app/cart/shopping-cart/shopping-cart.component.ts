import {Component, OnInit} from "@angular/core";
import {CartDto, CartItemDto} from "citrus-common";
import {CartService} from "../cart.service";

@Component({
  selector: "app-shopping-cart",
  templateUrl: "./shopping-cart.component.html",
  styleUrls: ["./shopping-cart.component.scss"]
})
export class ShoppingCartComponent implements OnInit {

  constructor(public cartService: CartService) {
  }

  ngOnInit() {
  }

  public increase(cart: CartDto, cartItem: CartItemDto) {
    this.cartService.addArticle(cart.location, cartItem.article, 1);
  }

  public decrease(cart: CartDto, cartItem: CartItemDto) {
    this.cartService.addArticle(cart.location, cartItem.article, -1);
  }

  public remove(cart: CartDto, cartItem: CartItemDto) {
    this.cartService.removeArticle(cart.location, cartItem.article);
  }
}
