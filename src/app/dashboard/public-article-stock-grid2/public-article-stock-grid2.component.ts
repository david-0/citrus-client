import {Component, OnInit} from "@angular/core";
import {CartService} from "../../cart/cart.service";
import {ArticleInSaleDtoRestService} from "../article-in-sale--dto-rest.service";
import {ArticleStockWrapper} from "../ArticleStockWrapper";
import {ArticleWrapper} from "../ArticleWrapper";

@Component({
  selector: "app-public-article-stock-grid2",
  templateUrl: "./public-article-stock-grid2.component.html",
  styleUrls: ["./public-article-stock-grid2.component.scss"]
})
export class PublicArticleStockGrid2Component implements OnInit {

  private _articlesWrappers: ArticleWrapper[];

  constructor(private rest: ArticleInSaleDtoRestService, private cartService: CartService) {
  }

  public get articlesWrappers(): ArticleWrapper[] {
    return this._articlesWrappers;
  }

  ngOnInit() {
    this.rest.getAll().subscribe((articles) => {
      this._articlesWrappers = articles
        .sort((a, b) => a.description.localeCompare(b.description))
        .filter(a => a.articleStocks.length > 0)
        .map(a => new ArticleWrapper(a));
      this._articlesWrappers.forEach(a => {
        a.articleStockWrappers.forEach(s => {
          const cartItem = this.cartService.getOrderItem(s.articleStock.location.id, s.articleStock.article.id);
          if (cartItem) {
            s.cartItem = cartItem;
          }
        });
      });
    });
  }

  addToCart(articleStockWrapper: ArticleStockWrapper) {
    this.cartService.addArticle(articleStockWrapper.articleStock.location, articleStockWrapper.articleStock.article, 1);
    articleStockWrapper.cartItem = this.cartService.getOrderItem(
      articleStockWrapper.articleStock.location.id, articleStockWrapper.articleStock.article.id);
  }
}
