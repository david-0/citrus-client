import {Component, OnInit} from "@angular/core";

@Component({
  selector: "app-article-stock-overview",
  templateUrl: "./article-stock-overview.component.html",
  styleUrls: ["./article-stock-overview.component.scss"]
})
export class ArticleStockOverviewComponent implements OnInit {
  public displayedColumns = ["article", "location", "soldOut", "visible", "quantity", "reservedQuantity", "available", "newQuantity"];

  constructor() {
  }

  ngOnInit() {
  }

}
