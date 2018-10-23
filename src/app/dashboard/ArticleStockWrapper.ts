import {ArticleStockDto, CartItemDto} from "citrus-common";
import {CartEntry} from "../cart/cart-entry";

export class ArticleStockWrapper {
  public cartItem: CartItemDto;

  constructor(public articleStock: ArticleStockDto) {
  }
}
