import {ArticleStockDto} from "citrus-common";
import {CartEntry} from "../cart/cart-entry";

export class ArticleStockWrapper {
  public cartEntry: CartEntry;

  constructor(public articleStock: ArticleStockDto) {
  }
}
