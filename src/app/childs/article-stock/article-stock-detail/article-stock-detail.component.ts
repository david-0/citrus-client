import {Component, OnDestroy, OnInit} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {ArticleStockDto} from "citrus-common";
import {Subscription} from "rxjs";
import {ArticleStockWithDtoAllRestService} from "../article-stock-with-dto-all-rest.service";

@Component({
  selector: "app-article-stock-detail",
  templateUrl: "./article-stock-detail.component.html",
  styleUrls: ["./article-stock-detail.component.scss"]
})
export class ArticleStockDetailComponent implements OnInit, OnDestroy {

  private _articleStock: ArticleStockDto = ArticleStockDto.createEmpty();
  private subscription: Subscription;

  constructor(private route: ActivatedRoute,
              private rest: ArticleStockWithDtoAllRestService) {
  }

  public get articleStock(): ArticleStockDto {
    return this._articleStock;
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const articleStockPromise = this.rest.get(+params["id"]);
      this.subscription = articleStockPromise.subscribe((articleStock) => {
        this._articleStock = articleStock;
      });
    });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
