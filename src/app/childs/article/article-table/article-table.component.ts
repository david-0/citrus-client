import {Component, Input, OnInit, ViewChild} from "@angular/core";
import {MatPaginator, MatSort, MatTableDataSource} from "@angular/material";
import {ArticleDto} from "citrus-common";
import {ArticleDtoRestService} from "../article-dto-rest.service";
import {ArticleSettingsService} from "../article-settings.service";

@Component({
  selector: "app-article-table",
  templateUrl: "./article-table.component.html",
  styleUrls: ["./article-table.component.scss"]
})
export class ArticleTableComponent implements OnInit {

  datasource = new MatTableDataSource<ArticleDto>();
  @Input() displayedColumns: string[];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private rest: ArticleDtoRestService, public settings: ArticleSettingsService) {
  }

  ngOnInit() {
    const subscription = this.rest.getAll().subscribe(data => {
      this.datasource.data = data;
    });
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.datasource.filter = filterValue;
  }
}
