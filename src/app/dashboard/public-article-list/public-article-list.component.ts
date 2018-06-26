import {Component} from "@angular/core";
import {ArticleDto} from "citrus-common";
import {BaseTableComponent} from "../../base/base-table.component";
import {CartService} from "../../cart/cart.service";
import {PublicArticleDtoRestService} from "../public-article-dto-rest.service";

@Component({
  selector: "app-public-article-list",
  templateUrl: "./public-article-list.component.html",
  styleUrls: ["./public-article-list.component.scss"]
})
export class PublicArticleListComponent extends BaseTableComponent<ArticleDto> {

  public displayedColumns = ["number", "description", "price", "available", "status", "cart"];

  constructor(rest: PublicArticleDtoRestService, private cartService: CartService) {
    super(rest, null);
  }

  addToCart(article: ArticleDto) {
    this.cartService.addArticle(article, 1);
  }
}
