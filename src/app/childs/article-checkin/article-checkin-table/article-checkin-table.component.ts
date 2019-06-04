import {Component, Input, ViewChild} from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import {ArticleCheckInDto} from "citrus-common";
import {BaseTableComponent} from "../../../base/base-table.component";
import {ArticleCheckInWithAllDtoRestService} from "../article-check-in-with-all-dto-rest.service";
import {ArticleCheckinSettingsService} from "../article-checkin-settings.service";

@Component({
  selector: "app-article-checkin-table",
  templateUrl: "./article-checkin-table.component.html",
  styleUrls: ["./article-checkin-table.component.scss"]
})
export class ArticleCheckinTableComponent extends BaseTableComponent<ArticleCheckInDto> {

  @Input() displayedColumns: string[];

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(rest: ArticleCheckInWithAllDtoRestService, settings: ArticleCheckinSettingsService) {
    super(rest, settings);
  }

}
