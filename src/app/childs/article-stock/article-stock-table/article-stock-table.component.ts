import { AfterViewInit, Component, Input, OnInit, ViewChild } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { ArticleInventoryTransferDto } from "citrus-common";
import { NotifierService } from "../../../base/notifier.service";
import { ArticleInventoryTransferService } from "../article-inventory-transfer.service";
import { ArticleStockSettingsService } from "../article-stock-settings.service";
import { ArticleStockWithDtoAllRestService } from "../article-stock-with-dto-all-rest.service";
import { ArticleStockWrapper } from "./ArtiicleStockWrapper";

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
    private transferService: ArticleInventoryTransferService,
    protected settings: ArticleStockSettingsService,
    private notificationService: NotifierService) {
  }

  dataSource = new MatTableDataSource<ArticleStockWrapper>();

  ngOnInit() {
    this.reload();
  }

  private reload() {
    const subscription = this.rest.getAll().subscribe(data => {
      const mapped = data.map(dto => new ArticleStockWrapper(dto,
        data.filter(stock => stock.article.id == dto.article.id)
          .filter(stock => stock.location.id != dto.location.id)));
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

  public async transfer(id: number) {
    const row = this.dataSource.data.filter(wrapper => wrapper.id == id)[0];
    if (row.receiverArticleStockId === undefined || row.receiverArticleStockId === null) {
      this.notificationService.showNotification("Der Empfänger für die Umbuchung fehlt", "schliessen", "error");
    } else if (isNaN(row.transferQuantity)) {
      this.notificationService.showNotification("Die Menge für die Umbuchung fehlt", "schliessen", "error");
    }
    else {
      const dto = new ArticleInventoryTransferDto(row.id, row.receiverArticleStockId, row.transferQuantity);
      this.transferService.transfer(dto) //
        .subscribe({
          next: (result) => {
            this.reload();
            this.notificationService.showNotification("Umbuchung erledigt", "schliessen", "success");
          },
          error: (err) => {
            this.notificationService.showNotification("Umbuchung hat nicht funktioniert. " + err.error.message, "schliessen", "error");
          }
        });
    }
  }
}
