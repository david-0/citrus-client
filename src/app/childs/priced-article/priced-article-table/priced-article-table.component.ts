import {Component, Input, OnInit, ViewChild} from "@angular/core";
import {MatPaginator, MatSort, MatTableDataSource} from "@angular/material";
import {PricedArticleDto} from "citrus-common/lib/dto/priced-article-dto";
import {Observable} from "rxjs/Observable";
import {ArticleSettingsService} from "../../article/article-settings.service";

@Component({
  selector: "app-priced-article-table",
  templateUrl: "./priced-article-table.component.html",
  styleUrls: ["./priced-article-table.component.scss"]
})
export class PricedArticleTableComponent implements OnInit {

  @Input() observable: Observable<PricedArticleDto[]>;
  @Input() displayedColumns: string[];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  datasource = new MatTableDataSource<PricedArticleDto>();

  constructor(public settings: ArticleSettingsService) {
  }

  ngOnInit() {
    const subscription = this.observable.subscribe(data => {
      this.datasource.data = data;
    });
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.datasource.filter = filterValue;
  }
}
