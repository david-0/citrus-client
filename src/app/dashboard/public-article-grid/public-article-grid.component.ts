import {Component, OnInit} from "@angular/core";
import {ArticleDto} from "citrus-common";
import {CartService} from "../../cart/cart.service";
import {PublicArticleDtoRestService} from "../public-article-dto-rest.service";

@Component({
  selector: "app-public-article-grid",
  templateUrl: "./public-article-grid.component.html",
  styleUrls: ["./public-article-grid.component.scss"]
})
export class PublicArticleGridComponent implements OnInit {

  private _articles: ArticleDto[];

  constructor(private rest: PublicArticleDtoRestService, private cartService: CartService) {
  }

  public get articles(): ArticleDto[] {
    return this._articles;
  }

  ngOnInit() {
    this.rest.getAll().subscribe((articles) => {
      this._articles = articles.sort((a, b) => a.description.localeCompare(b.description));
    });
  }

  addToCart(article: ArticleDto) {
    this.cartService.addArticle(article, 1);
  }
}
