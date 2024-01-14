import { AfterViewInit, Component, Input, OnInit, ViewChild } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { ArticleStockDto } from "citrus-common";
import { ArticleStockSettingsService } from "../article-stock-settings.service";
import { ArticleStockWithDtoAllRestService } from "../article-stock-with-dto-all-rest.service";
import { BaseTableComponent } from "../../../base/base-table.component";

@Component({
  selector: "app-article-stock-table",
  templateUrl: "./article-stock-table.component.html",
  styleUrls: ["./article-stock-table.component.scss"]
})
export class ArticleStockTableComponent extends BaseTableComponent<ArticleStockDto> implements OnInit, AfterViewInit {

  @Input() displayedColumns: string[];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(rest: ArticleStockWithDtoAllRestService,
    settings: ArticleStockSettingsService) {
    super(rest, settings);
  }

  dataSource = new MatTableDataSource<ArticleStockDto>();

  ngOnInit() {
    const subscription = this.rest.getAll().subscribe((data: ArticleStockDto[]) => {
      this.dataSource.data = data;
      this.dataSource.filterPredicate = this.filterPredicate;
    });
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    this.dataSource.filter = filterValue;
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  private filterPredicate(data: ArticleStockDto, filter: string): boolean {
    return (data.article.description
      + data.location.description
      + data.quantity
      + data.reservedQuantity
      + (data.quantity - data.reservedQuantity)
    ).indexOf(filter) > -1;
  }

  public async toggleSoldOut(id: number) {
    this.dataSource.data = await Promise.all(this.dataSource.data
      .map(async (stock) => {
        if (stock.id == id) {
          stock.soldOut = stock.soldOut ? false : true;
          await this.rest.update(stock).toPromise();
          stock.soldOut = stock.soldOut ? false : true;
        }
        return stock;
      }));
  }

  public async toggleVisible(id: number) {
    this.dataSource.data = await Promise.all(this.dataSource.data
      .map(async (stock) => {
        if (stock.id == id) {
          stock.visible = stock.visible ? false : true;
          await this.rest.update(stock).toPromise();
          stock.visible = stock.visible ? false : true;
        }
        return stock;
      }));
  }
}
