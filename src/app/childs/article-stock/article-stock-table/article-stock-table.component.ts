import { AfterViewInit, Component, Input, OnInit, ViewChild } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { NotifierService } from "../../../base/notifier.service";
import { ArticleStockSettingsService } from "../article-stock-settings.service";
import { ArticleStockWithDtoAllRestService } from "../article-stock-with-dto-all-rest.service";
import { ArticleStockWrapper } from "./ArticleStockWrapper";
import { ArticleStockDto } from "citrus-common";

@Component({
  selector: "app-article-stock-table",
  templateUrl: "./article-stock-table.component.html",
  styleUrls: ["./article-stock-table.component.scss"]
})
export class ArticleStockTableComponent implements OnInit, AfterViewInit {

  @Input() displayedColumns: string[];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private rest: ArticleStockWithDtoAllRestService,
    protected settings: ArticleStockSettingsService,
    private notificationService: NotifierService) {
  }

  dataSource = new MatTableDataSource<ArticleStockWrapper>();

  ngOnInit() {
    this.reload();
  }

  private reload() {
    const subscription = this.rest.getAll().subscribe(data => {
      const mapped = data.map(dto => new ArticleStockWrapper(dto));
      this.dataSource.data = mapped;
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

  private filterPredicate(data: ArticleStockWrapper, filter: string): boolean {
    return (data.dto.article.description
      + data.dto.location.description
      + data.dto.quantity
      + data.dto.reservedQuantity
      + (data.dto.quantity - data.dto.reservedQuantity)
    ).indexOf(filter) > -1;
  }

  public async toggleSoldOut(id: number) {
    this.dataSource.data = await Promise.all(this.dataSource.data
      .map(async (wrapper) => {
        const stock = wrapper.dto;
        if (stock.id == id) {
          stock.soldOut = stock.soldOut ? false : true;
          await this.rest.update(stock).toPromise();
          stock.soldOut = stock.soldOut ? false : true;
        }
        return wrapper;
      }));
  }

  public async toggleVisible(id: number) {
    this.dataSource.data = await Promise.all(this.dataSource.data
      .map(async (wrapper) => {
        const stock = wrapper.dto;
        if (stock.id == id) {
          stock.visible = stock.visible ? false : true;
          await this.rest.update(stock).toPromise();
          stock.visible = stock.visible ? false : true;
        }
        return wrapper;
      }));
  }


  public async saveAll() {
    let modificationCount = 0;

    for (let index = 0; index < this.dataSource.data.length; index++) {
      const row = this.dataSource.data[index];
      if (await this.update(row)) {
        modificationCount++;
      }
    };
    if (modificationCount > 0) {
      if (modificationCount === 1) {
        this.notificationService.showNotification("1 neuer Lagerbeständ speichert", "schliessen", "success");
      } else {
        this.notificationService.showNotification(modificationCount + " neue Lagerbestände speichert", "schliessen", "success");
      }
      this.reload();
    }
  }

  private async update(row: ArticleStockWrapper): Promise<boolean> {
    if (row.newQuantity !== undefined && row.newQuantity !== null && row.newQuantity !== row.dto.quantity) {
      let dto = row.dto;
      dto.quantity = row.newQuantity;
      await this.rest.update(dto).toPromise();
      row.newQuantity = undefined;
      return true;
    }
    return false;
  }

}
