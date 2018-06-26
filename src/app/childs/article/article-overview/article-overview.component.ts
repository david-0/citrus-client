import {Component, OnInit} from "@angular/core";

@Component({
  selector: "app-article-overview",
  templateUrl: "./article-overview.component.html",
  styleUrls: ["./article-overview.component.scss"]
})
export class ArticleOverviewComponent implements OnInit {
  public displayedColumns = ["number", "description", "price", "stock", "reservedInOpenOrders", "available", "status"];

  constructor() {
  }

  ngOnInit() {
  }
}

