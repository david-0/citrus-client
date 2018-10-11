import {Component, OnInit} from "@angular/core";

@Component({
  selector: "app-article-checkout-overview",
  templateUrl: "./article-checkout-overview.component.html",
  styleUrls: ["./article-checkout-overview.component.scss"]
})
export class ArticleCheckoutOverviewComponent implements OnInit {
  public displayedColumns = ["articleStock", "quantity", "date", "comment", "user"];

  constructor() {
  }

  ngOnInit() {
  }

}
