import {Component, OnDestroy, OnInit} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {ArticleDto} from "citrus-common";
import {Subscription} from "rxjs";
import {ArticleDtoRestService} from "../article-dto-rest.service";

@Component({
  selector: "app-article-details",
  templateUrl: "./article-details.component.html",
  styleUrls: ["./article-details.component.scss"]
})
export class ArticleDetailsComponent implements OnInit, OnDestroy {
  private _article: ArticleDto = ArticleDto.createEmpty();
  private subscription: Subscription;

  constructor(private route: ActivatedRoute, private rest: ArticleDtoRestService) {
  }

  public get article(): ArticleDto {
    return this._article;
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const addressPromise = this.rest.get(+params["id"]);
      this.subscription = addressPromise.subscribe((address) => {
        this._article = address;
      });
    });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
