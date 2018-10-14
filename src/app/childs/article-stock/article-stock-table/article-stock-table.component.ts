import {Component, Input, OnInit, ViewChild} from "@angular/core";
import {MatPaginator, MatSort} from "@angular/material";
import {ArticleStockDto} from "citrus-common";
import {BaseTableComponent} from "../../../base/base-table.component";
import {ArticleStockSettingsService} from "../article-stock-settings.service";
import {ArticleStockWithDtoAllRestService} from "../article-stock-with-dto-all-rest.service";

@Component({
  selector: "app-article-stock-table",
  templateUrl: "./article-stock-table.component.html",
  styleUrls: ["./article-stock-table.component.scss"]
})
export class ArticleStockTableComponent extends BaseTableComponent<ArticleStockDto> implements OnInit {

  @Input() displayedColumns: string[];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(rest: ArticleStockWithDtoAllRestService,
              settings: ArticleStockSettingsService ) {
    super(rest, settings);
  }

  ngOnInit() {
    const subscription = this.rest.getAll().subscribe((data: ArticleStockDto[]) => {
      this.datasource.data = data;
    });
  }
}
