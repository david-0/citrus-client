import {HttpErrorResponse} from "@angular/common/http";
import {Component, OnInit} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {ArticleDto, ArticleStockDto, LocationDto} from "citrus-common";
import {BehaviorSubject, combineLatest, Observable} from "rxjs";
import {ArticleDtoRestService} from "../../article/article-dto-rest.service";
import {LocationDtoRestService} from "../../location/location-dto-rest.service";
import {ArticleStockWithDtoAllRestService} from "../article-stock-with-dto-all-rest.service";

@Component({
  selector: "app-article-stock-edit",
  templateUrl: "./article-stock-edit.component.html",
  styleUrls: ["./article-stock-edit.component.scss"]
})
export class ArticleStockEditComponent implements OnInit {
  public articleStock: ArticleStockDto = ArticleStockDto.createEmpty();
  public articleStockID: number;

  public locationSubject: BehaviorSubject<LocationDto[]> = new BehaviorSubject([]);
  public articleSubject: BehaviorSubject<ArticleDto[]> = new BehaviorSubject([]);

  constructor(private route: ActivatedRoute,
              private router: Router,
              private rest: ArticleStockWithDtoAllRestService,
              public locationRest: LocationDtoRestService,
              public articleRest: ArticleDtoRestService) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      if (params["id"] == null) {
        this.articleStockID = this.articleStock.id;
        const locationObservable: Observable<LocationDto[]> = this.locationRest.getAll();
        const articleObservable: Observable<ArticleDto[]> = this.articleRest.getAll();
        combineLatest(locationObservable, articleObservable).subscribe(result => {
          this.locationSubject.next(result[0]);
          this.articleSubject.next(result[1]);
        }, (err: HttpErrorResponse) =>
          console.log(`Could not get locations and article. Error: ${err.message}`));
      } else {
        const locationObservable: Observable<LocationDto[]> = this.locationRest.getAll();
        const articleObservable: Observable<ArticleDto[]> = this.articleRest.getAll();
        const articleStockObservable = this.rest.get(+params["id"]);
        combineLatest(articleStockObservable, locationObservable, articleObservable).subscribe(result => {
            this.articleStock = this.ensureLocationInArticleStock(result[0], result[1]);
            this.articleStock = this.ensureArticleInArticleStock(this.articleStock, result[2]);
            this.articleStockID = this.articleStock.id;
          },
          (err: HttpErrorResponse) => {
            console.log(`Could not get article with id ${params["id"]} with error: ${err.message}`);
          });
      }
    });
  }

  private ensureLocationInArticleStock(articleStock: ArticleStockDto, locations: LocationDto[]): ArticleStockDto {
    this.locationSubject.next(locations);
    for (const location of locations) {
      if (this.isLocationWithSameId(articleStock, location)) {
        articleStock.location = location;
      }
    }
    return articleStock;
  }

  private ensureArticleInArticleStock(articleStock: ArticleStockDto, articles: ArticleDto[]): ArticleStockDto {
    this.articleSubject.next(articles);
    for (const article of articles) {
      if (this.isArticleWithSameId(articleStock, article)) {
        articleStock.article = article;
      }
    }
    return articleStock;
  }

  private isLocationWithSameId(articleStock: ArticleStockDto, location: LocationDto): boolean {
    return articleStock.location != null && articleStock.location.id === location.id;
  }

  private isArticleWithSameId(articleStock: ArticleStockDto, article: ArticleDto): boolean {
    return articleStock.article != null && articleStock.article.id === article.id;
  }

  public submit() {
    if (this.articleStockID == null) {
      this.rest.add(new ArticleStockDto(this.articleStock))
        .subscribe(
          (result) => this.router.navigate([".."], {relativeTo: this.route}),
          (err: HttpErrorResponse) => console.error(`could not save articleStock: ${this.articleStock.id} with Error: ${err.message}`)
        );
    } else {
      this.rest.update(ArticleStockDto.createWithId(this.articleStockID, this.articleStock))
        .subscribe(
          (result) => this.router.navigate([".."], {relativeTo: this.route}),
          (err: HttpErrorResponse) => console.error(`could not update articleStock: ${this.articleStock.id} with Error: ${err.message}`));
    }
  }
}
