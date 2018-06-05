import {Component, OnInit} from "@angular/core";
import {MatTableDataSource} from "@angular/material";
import {ArticleDto} from "citrus-common";
import {CartService} from "../../cart/cart.service";
import {PublicArticleDtoRestService} from "../public-article-dto-rest.service";

@Component({
  selector: "app-public-article-list",
  templateUrl: "./public-article-list.component.html",
  styleUrls: ["./public-article-list.component.scss"]
})
export class PublicArticleListComponent implements OnInit {

  datasource = new MatTableDataSource<ArticleDto>();
  public displayedColumns = ["number", "description", "price", "stock", "status", "cart"];

  constructor(private rest: PublicArticleDtoRestService, private cartService: CartService) {
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

  addToCart(article: ArticleDto) {
    this.cartService.addArticle(article, 1);
  }
}
