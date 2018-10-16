import {ArticleDto} from "citrus-common";
import {ArticleStockWrapper} from "./ArticleStockWrapper";

export class ArticleWrapper {
  public articleStockWrappers: ArticleStockWrapper[];
  constructor(public article: ArticleDto) {
    this.articleStockWrappers = this.article.articleStocks.map(s => new ArticleStockWrapper(s));
  }
}
