import {Component, OnInit} from "@angular/core";
import {ArticleDto, ArticleStockDto} from "citrus-common";
import {CartService} from "../../cart/cart.service";
import {ArticleInSaleDtoRestService} from "../article-in-sale--dto-rest.service";
import {ArticleStockWrapper} from "../ArticleStockWrapper";
import {ArticleWrapper} from "../ArticleWrapper";

@Component({
  selector: "app-public-article-stock-grid",
  templateUrl: "./public-article-stock-grid.component.html",
  styleUrls: ["./public-article-stock-grid.component.scss"]
})
export class PublicArticleStockGridComponent implements OnInit {

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
          const cartEntry = this.cartService.getArticleStock(s.articleStock.id);
          if (cartEntry) {
            s.cartEntry = cartEntry;
          }
        });
      });
    });
  }

  addToCart(articleStockWrapper: ArticleStockWrapper) {
    this.cartService.addArticleStock(articleStockWrapper.articleStock, 1);
    articleStockWrapper.cartEntry = this.cartService.getArticleStock(articleStockWrapper.articleStock.id);
  }
}