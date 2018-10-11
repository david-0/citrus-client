import {Component, OnInit} from "@angular/core";

@Component({
  selector: "app-article-checkin-overview",
  templateUrl: "./article-checkin-overview.component.html",
  styleUrls: ["./article-checkin-overview.component.scss"]
})
export class ArticleCheckinOverviewComponent implements OnInit {
  public displayedColumns = ["articleStock", "quantity", "date", "comment", "user"];

  constructor() {
  }

  ngOnInit() {
  }

}
