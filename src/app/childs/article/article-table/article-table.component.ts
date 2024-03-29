import {AfterViewInit, Component, Input, ViewChild} from "@angular/core";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {ArticleDto} from "citrus-common";
import {BaseTableComponent} from "../../../base/base-table.component";
import {ArticleDtoRestService} from "../article-dto-rest.service";
import {ArticleSettingsService} from "../article-settings.service";

@Component({
  selector: "app-article-table",
  templateUrl: "./article-table.component.html",
  styleUrls: ["./article-table.component.scss"]
})
export class ArticleTableComponent extends BaseTableComponent<ArticleDto> implements AfterViewInit{

  @Input() displayedColumns: string[];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(rest: ArticleDtoRestService, settings: ArticleSettingsService) {
    super(rest, settings);
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  public async toggleSoldOut(id: number) {
    this.dataSource.data = await Promise.all(this.dataSource.data
      .map(async (article) => {
        if (article.id == id) {
          article.inSale = article.inSale ? false : true;
          await this.rest.update(article).toPromise();
          article.inSale = article.inSale ? false : true;
        }
        return article;
      }));
  }
}
