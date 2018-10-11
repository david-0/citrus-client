import {Component, OnDestroy, OnInit} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {ArticleCheckInDto, ArticleCheckOutDto} from "citrus-common";
import {Subscription} from "rxjs";
import {ArticleCheckoutWithAllDtoRestService} from "../article-checkout-with-all-dto-rest.service";

@Component({
  selector: "app-article-checkout-detail",
  templateUrl: "./article-checkout-detail.component.html",
  styleUrls: ["./article-checkout-detail.component.scss"]
})
export class ArticleCheckoutDetailComponent implements OnInit, OnDestroy {

  private _articleCheckOut: ArticleCheckOutDto = ArticleCheckOutDto.createEmpty();
  private subscription: Subscription;

  constructor(private route: ActivatedRoute, private rest: ArticleCheckoutWithAllDtoRestService) {
  }

  public get articleCheckOut(): ArticleCheckInDto {
    return this._articleCheckOut;
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const articleCheckOutPromise = this.rest.get(+params["id"]);
      this.subscription = articleCheckOutPromise.subscribe((articleCheckIn) => {
        this._articleCheckOut = articleCheckIn;
      });
    });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
