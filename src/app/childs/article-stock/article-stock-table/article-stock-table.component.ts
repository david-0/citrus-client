import {AfterViewInit, Component, Input, OnInit, ViewChild} from "@angular/core";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {ArticleStockDto} from "citrus-common";
import {BaseTableComponent} from "../../../base/base-table.component";
import {ArticleStockSettingsService} from "../article-stock-settings.service";
import {ArticleStockWithDtoAllRestService} from "../article-stock-with-dto-all-rest.service";

@Component({
  selector: "app-article-stock-table",
  templateUrl: "./article-stock-table.component.html",
  styleUrls: ["./article-stock-table.component.scss"]
})
export class ArticleStockTableComponent extends BaseTableComponent<ArticleStockDto> implements OnInit, AfterViewInit {

  @Input() displayedColumns: string[];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(rest: ArticleStockWithDtoAllRestService,
              settings: ArticleStockSettingsService) {
    super(rest, settings);
  }

  ngOnInit() {
    const subscription = this.rest.getAll().subscribe((data: ArticleStockDto[]) => {
      this.dataSource.data = data;
      this.dataSource.filterPredicate = this.filterPredicate;
    });
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  private filterPredicate(data: ArticleStockDto, filter: string): boolean {
    return (data.article.description.toLowerCase()
      + data.location.description.toLowerCase()
      + data.quantity
      + data.reservedQuantity
      + (data.quantity - data.reservedQuantity)
    ).indexOf(filter.toLowerCase()) > -1;
  }
}
