import {ArticleStockDto, CartItemDto} from "citrus-common";

export class ArticleStockWrapper {
  public cartItem: CartItemDto;

  constructor(public articleStock: ArticleStockDto) {
  }
}
