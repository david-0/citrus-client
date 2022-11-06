import { Component, Inject, OnInit } from "@angular/core";
import { ArticleDto } from "citrus-common";
import { ArticleInSaleDtoRestService } from "../article-in-sale--dto-rest.service";

@Component({
  selector: "app-public-article-stock-grid",
  templateUrl: "./public-article-stock-grid.component.html",
  styleUrls: ["./public-article-stock-grid.component.scss"]
})
export class PublicArticleStockGridComponent implements OnInit {

  private _articles: ArticleDto[];
  public _loading: boolean;

  constructor(private rest: ArticleInSaleDtoRestService,
    @Inject("baseUrl") public baseUrl: string) {
    this._loading = true;
  }

  public get articles(): ArticleDto[] {
    return this._articles;
  }

  public get hasArticles(): boolean {
    return this._articles && this._articles.length > 0;
  }

  public get isLoading(): boolean {
    return this._loading;
  }

  ngOnInit() {
    this._loading = true;
    this.rest.getAll().subscribe((articles) => {
      this._loading = false;
      this._articles = articles
        .sort((a, b) => a.description.localeCompare(b.description))
        .map(a => {
          a.articleStocks = a.articleStocks
            .filter(stock => stock.visible);
          return a;
        })
        .filter(a => a.articleStocks.length > 0);
      this._articles.forEach(a => {
        a.articleStocks = a.articleStocks.sort((a, b) => a.location.description.localeCompare(b.location.description));
      });
    });
  }
}
