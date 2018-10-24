import {HttpErrorResponse} from "@angular/common/http";
import {Component, OnInit} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {ArticleCheckInDto, ArticleCheckOutDto, ArticleStockDto} from "citrus-common";
import {ArticleCheckInWithAllDtoRestService} from "../../childs/article-checkin/article-check-in-with-all-dto-rest.service";
import {ArticleCheckoutWithAllDtoRestService} from "../../childs/article-checkout/article-checkout-with-all-dto-rest.service";
import {ArticleStockWithDtoAllRestService} from "../../childs/article-stock/article-stock-with-dto-all-rest.service";

@Component({
  selector: "app-store-estimate",
  templateUrl: "./store-estimate.component.html",
  styleUrls: ["./store-estimate.component.scss"]
})
export class StoreEstimateComponent implements OnInit {
  public articleStocks: ArticleStockDto[] = [];
  public choosenArticleStock: ArticleStockDto = null;
  public choosenQuantity: number;
  public choosenComment = "";

  constructor(private route: ActivatedRoute,
              private router: Router,
              private articleCheckOutRest: ArticleCheckoutWithAllDtoRestService,
              private articleCheckInRest: ArticleCheckInWithAllDtoRestService,
              public articleStockRest: ArticleStockWithDtoAllRestService) {
  }

  ngOnInit() {
    this.articleStockRest.getAll().subscribe(articles => {
      this.articleStocks = articles;
    });
  }

  public submit() {
    if (this.choosenArticleStock.quantity < +this.choosenQuantity) {
      const articleCheckIn = ArticleCheckInDto.createEmpty();
      articleCheckIn.done = true;
      articleCheckIn.articleStock = this.choosenArticleStock;
      articleCheckIn.quantity = +this.choosenQuantity - this.choosenArticleStock.quantity;
      articleCheckIn.comment = this.choosenComment;
      this.articleCheckInRest.add(articleCheckIn)
        .subscribe(
          (result) => this.router.navigate(["../.."], {relativeTo: this.route}),
          (err: HttpErrorResponse) => console.error(`could not save articleCheckIn: ${articleCheckIn.id} with Error: ${err.message}`)
        );
    }
    if (this.choosenArticleStock.quantity > +this.choosenQuantity) {
      const articleCheckOut = ArticleCheckOutDto.createEmpty();
      articleCheckOut.done = true;
      articleCheckOut.articleStock = this.choosenArticleStock;
      articleCheckOut.quantity = this.choosenArticleStock.quantity - +this.choosenQuantity;
      articleCheckOut.comment = this.choosenComment;
      this.articleCheckOutRest.add(articleCheckOut)
        .subscribe(
          (result) => this.router.navigate(["../.."], {relativeTo: this.route}),
          (err: HttpErrorResponse) => console.error(`could not save articleCheckOut: ${articleCheckOut.id} with Error: ${err.message}`)
        );
    }
  }
}
