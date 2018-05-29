import {Component, OnDestroy, OnInit} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {ArticleDto} from "citrus-common";
import {PricedArticleDto} from "citrus-common/lib/dto/priced-article-dto";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {Observable} from "rxjs/Observable";
import {Subscription} from "rxjs/Subscription";
import {ArticleDtoWithPriceRestService} from "../article-dto-with-price-rest.service";

@Component({
  selector: "app-article-details",
  templateUrl: "./article-details.component.html",
  styleUrls: ["./article-details.component.scss"]
})
export class ArticleDetailsComponent implements OnInit, OnDestroy {
  private _article: ArticleDto = ArticleDto.createEmpty();
  private subscription: Subscription;
  public displayedColumns = ["price", "validFrom", "validTo"];
  public _observable = new BehaviorSubject<PricedArticleDto[]>([]);

  constructor(private route: ActivatedRoute, private rest: ArticleDtoWithPriceRestService) {
  }

  public get article(): ArticleDto {
    return this._article;
  }

  public get observable(): Observable<PricedArticleDto[]> {
    return this._observable;
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const addressPromise = this.rest.get(+params["id"]);
      this.subscription = addressPromise.subscribe((address) => {
        this._article = address;
        this._observable.next(address.pricedArticles);
      });
    });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}
