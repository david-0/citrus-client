import {Component, Input, OnInit, ViewChild} from "@angular/core";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {ArticleCheckOutDto} from "citrus-common";
import {BaseTableComponent} from "../../../base/base-table.component";
import {ArticleCheckoutSettingsService} from "../article-checkout-settings.service";
import {ArticleCheckoutWithAllDtoRestService} from "../article-checkout-with-all-dto-rest.service";

@Component({
  selector: "app-article-checkout-table",
  templateUrl: "./article-checkout-table.component.html",
  styleUrls: ["./article-checkout-table.component.scss"]
})
export class ArticleCheckoutTableComponent extends BaseTableComponent<ArticleCheckOutDto> implements OnInit {

  @Input() displayedColumns: string[];

  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(rest: ArticleCheckoutWithAllDtoRestService, settings: ArticleCheckoutSettingsService) {
    super(rest, settings);
  }

  ngOnInit() {
    const subscription = this.rest.getAll().subscribe((data: ArticleCheckOutDto[]) => {
      this.datasource.data = data;
      this.datasource.filterPredicate = this.filterPredicate;
    });
  }

  private filterPredicate(data: ArticleCheckOutDto, filter: string): boolean {
    return (data.articleStock.article.number
      + data.articleStock.article.description.toLowerCase()
      + data.articleStock.location.description.toLowerCase()
      + data.quantity
      + data.comment
    ).indexOf(filter.toLowerCase()) > -1;
  }
}
