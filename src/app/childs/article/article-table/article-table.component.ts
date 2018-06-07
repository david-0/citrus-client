import {Component, Input, ViewChild} from "@angular/core";
import {MatPaginator, MatSort} from "@angular/material";
import {ArticleDto} from "citrus-common";
import {BaseTableComponent} from "../../../base/base-table.component";
import {ArticleDtoRestService} from "../article-dto-rest.service";
import {ArticleSettingsService} from "../article-settings.service";

@Component({
  selector: "app-article-table",
  templateUrl: "./article-table.component.html",
  styleUrls: ["./article-table.component.scss"]
})
export class ArticleTableComponent extends BaseTableComponent<ArticleDto> {

  @Input() displayedColumns: string[];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(rest: ArticleDtoRestService, settings: ArticleSettingsService) {
    super(rest, settings);
  }
}
