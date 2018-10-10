import {Component, OnDestroy, OnInit} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {
  ArticleCheckInDto,
  ArticleDto,
  ArticleStockDto,
  LocationDto,
  UnitOfMeasurementDto,
  UserDto
} from "citrus-common";
import {Subscription} from "rxjs";
import {ArticleCheckInWithAllDtoRestService} from "../article-check-in-with-all-dto-rest.service";

@Component({
  selector: "app-article-checkin-detail",
  templateUrl: "./article-checkin-detail.component.html",
  styleUrls: ["./article-checkin-detail.component.scss"]
})
export class ArticleCheckinDetailComponent implements OnInit, OnDestroy {

  private _user: UserDto = UserDto.createEmpty();
  private _article: ArticleDto = ArticleDto.createEmpty();
  private _location: LocationDto = LocationDto.createEmpty();
  private _articleStock: ArticleStockDto = ArticleStockDto.createEmpty(this._article, this._location);
  private _articleCheckIn: ArticleCheckInDto = ArticleCheckInDto.createEmpty(this._articleStock, this._user);
  private subscription: Subscription;

  constructor(private route: ActivatedRoute, private rest: ArticleCheckInWithAllDtoRestService) {
  }

  public get articleCheckIn(): ArticleCheckInDto {
    return this._articleCheckIn;
  }

  ngOnInit() {
    this._article.unitOfMeasurement = UnitOfMeasurementDto.createEmpty();
    this.route.params.subscribe(params => {
      const articleCheckInPromise = this.rest.get(+params["id"]);
      this.subscription = articleCheckInPromise.subscribe((articleCheckIn) => {
        this._articleCheckIn = articleCheckIn;
      });
    });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
