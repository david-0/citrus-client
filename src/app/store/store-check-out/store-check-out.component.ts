import {HttpErrorResponse} from "@angular/common/http";
import {Component, OnInit} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {ArticleCheckOutDto, ArticleStockDto} from "citrus-common";
import {ArticleCheckoutWithAllDtoRestService} from "../../childs/article-checkout/article-checkout-with-all-dto-rest.service";
import {ArticleStockWithDtoAllRestService} from "../../childs/article-stock/article-stock-with-dto-all-rest.service";

@Component({
  selector: "app-store-check-out",
  templateUrl: "./store-check-out.component.html",
  styleUrls: ["./store-check-out.component.scss"]
})
export class StoreCheckOutComponent implements OnInit {

  public articleCheckOut: ArticleCheckOutDto = ArticleCheckOutDto.createEmpty();
  public articleStocks: ArticleStockDto[] = [];

  constructor(private route: ActivatedRoute,
              private router: Router,
              private articleCheckOutRest: ArticleCheckoutWithAllDtoRestService,
              public articleStockRest: ArticleStockWithDtoAllRestService) {
  }

  ngOnInit() {
    this.articleStockRest.getAll().subscribe(articles => {
      this.articleStocks = articles;
    });
  }

  public submit() {
    this.articleCheckOut.done = true;
    this.articleCheckOutRest.add(this.articleCheckOut)
      .subscribe(
        (result) => this.router.navigate(["../.."], {relativeTo: this.route}),
        (err: HttpErrorResponse) => console.error(`could not save articleStock: ${this.articleCheckOut.id} with Error: ${err.message}`)
      );
  }
}
