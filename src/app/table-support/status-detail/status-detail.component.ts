import {Component, Input, OnInit} from "@angular/core";
import {EArticleStatus} from "citrus-common/lib/entity/e-article-status";

@Component({
  selector: "app-status-detail",
  templateUrl: "./status-detail.component.html",
  styleUrls: ["./status-detail.component.scss"]
})
export class StatusDetailComponent implements OnInit {

  @Input() status: EArticleStatus;

  constructor() {
  }

  ngOnInit() {
  }

}
