import {Component, OnInit} from "@angular/core";
import {MatTableDataSource} from "@angular/material";
import {ArticleDto} from "citrus-common";
import {PublicArticleDtoRestService} from "./public-article-dto-rest.service";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"]
})
export class DashboardComponent implements OnInit {

  datasource = new MatTableDataSource<ArticleDto>();
  public displayedColumns = ["number", "description", "price", "stock", "status", "unitOfMeasurement","Warenkorb"];

  constructor(private rest: PublicArticleDtoRestService) {
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
