import {Component, OnInit} from "@angular/core";
import {ArticleDto, ArticleStockDto} from "citrus-common";
import {CartService} from "../../cart/cart.service";
import {ArticleInSaleDtoRestService} from "../article-in-sale--dto-rest.service";

@Component({
  selector: "app-public-article-stock-grid",
  templateUrl: "./public-article-stock-grid.component.html",
  styleUrls: ["./public-article-stock-grid.component.scss"]
})
export class PublicArticleStockGridComponent implements OnInit {

  private _articles: ArticleDto[];

  constructor(private rest: ArticleInSaleDtoRestService, private cartService: CartService) {
  }

  public get articles(): ArticleDto[] {
    return this._articles;
  }

  ngOnInit() {
    this.rest.getAll().subscribe((articles) => {
      this._articles = articles.sort((a, b) => a.description.localeCompare(b.description));
    });
  }

  addToCart(articleStock: ArticleStockDto) {
    this.cartService.addArticleStock(articleStock, 1);
  }
}
