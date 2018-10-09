import {Component, OnDestroy, OnInit} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {ArticleDto, ArticleStockDto, LocationDto, UnitOfMeasurementDto} from "citrus-common";
import {Subscription} from "rxjs";
import {ArticleStockWithDtoAllRestService} from "../article-stock-with-dto-all-rest.service";

@Component({
  selector: "app-article-stock-detail",
  templateUrl: "./article-stock-detail.component.html",
  styleUrls: ["./article-stock-detail.component.scss"]
})
export class ArticleStockDetailComponent implements OnInit, OnDestroy {

  private _article: ArticleDto = ArticleDto.createEmpty();
  private _location: LocationDto = LocationDto.createEmpty();
  private _articleStock: ArticleStockDto = ArticleStockDto.createEmpty(this._article, this._location);
  private subscription: Subscription;

  constructor(private route: ActivatedRoute, private rest: ArticleStockWithDtoAllRestService) {
  }

  public get articleStock(): ArticleStockDto {
    return this._articleStock;
  }

  ngOnInit() {
    this._article.unitOfMeasurement = UnitOfMeasurementDto.createEmpty();
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
