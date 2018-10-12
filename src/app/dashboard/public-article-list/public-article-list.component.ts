import {Component} from "@angular/core";
import {ArticleDto} from "citrus-common";
import {BaseTableComponent} from "../../base/base-table.component";
import {CartService} from "../../cart/cart.service";
import {ArticleInSaleDtoRestService} from "../article-in-sale--dto-rest.service";

@Component({
  selector: "app-public-article-list",
  templateUrl: "./public-article-list.component.html",
  styleUrls: ["./public-article-list.component.scss"]
})
export class PublicArticleListComponent extends BaseTableComponent<ArticleDto> {

  public displayedColumns = ["number", "description", "price", "available", "cart"];

  constructor(rest: ArticleInSaleDtoRestService, private cartService: CartService) {
    super(rest, null);
  }

  addToCart(article: ArticleDto) {
    this.cartService.addArticleStock(article, 1);
  }
}
