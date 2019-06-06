import {Component, Inject, OnInit} from "@angular/core";
import {ArticleDto} from "citrus-common";
import {ArticleInSaleDtoRestService} from "../article-in-sale--dto-rest.service";

@Component({
  selector: "app-public-article-stock-grid",
  templateUrl: "./public-article-stock-grid.component.html",
  styleUrls: ["./public-article-stock-grid.component.scss"]
})
export class PublicArticleStockGridComponent implements OnInit {

  private _articles: ArticleDto[];

  constructor(private rest: ArticleInSaleDtoRestService,
              @Inject("baseUrl") public baseUrl: string) {
  }

  public get articles(): ArticleDto[] {
    return this._articles;
  }

  ngOnInit() {
    this.rest.getAll().subscribe((articles) => {
      this._articles = articles
        .sort((a, b) => a.description.localeCompare(b.description))
        .filter(a => a.articleStocks.length > 0);
      this._articles.forEach(a => {
        a.articleStocks = a.articleStocks.sort((a, b) => a.location.description.localeCompare(b.location.description));
      });
    });
  }
}
