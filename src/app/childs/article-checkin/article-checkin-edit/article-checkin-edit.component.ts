import {HttpErrorResponse} from "@angular/common/http";
import {Component, OnInit} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {ArticleCheckInDto, ArticleStockDto, UserDto} from "citrus-common";
import {BehaviorSubject, combineLatest, Observable} from "rxjs";
import {ArticleStockWithDtoAllRestService} from "../../article-stock/article-stock-with-dto-all-rest.service";
import {UserDtoRestService} from "../../user/user-dto-rest.service";
import {ArticleCheckInWithAllDtoRestService} from "../article-check-in-with-all-dto-rest.service";

@Component({
  selector: "app-article-checkin-edit",
  templateUrl: "./article-checkin-edit.component.html",
  styleUrls: ["./article-checkin-edit.component.scss"]
})
export class ArticleCheckinEditComponent implements OnInit {
  public articleCheckIn: ArticleCheckInDto = ArticleCheckInDto.createEmpty();
  public articleCheckInId: number;

  public articleStockSubject: BehaviorSubject<ArticleStockDto[]> = new BehaviorSubject([]);
  public userSubject: BehaviorSubject<UserDto[]> = new BehaviorSubject([]);

  constructor(private route: ActivatedRoute,
              private router: Router,
              private articleCheckInRest: ArticleCheckInWithAllDtoRestService,
              public articleStockRest: ArticleStockWithDtoAllRestService,
              public userRest: UserDtoRestService) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      if (params["id"] == null) {
        this.articleCheckInId = this.articleCheckIn.id;
        const articleStockObservable: Observable<ArticleStockDto[]> = this.articleStockRest.getAll();
        const userObservable: Observable<UserDto[]> = this.userRest.getAll();
        combineLatest(articleStockObservable, userObservable).subscribe(result => {
          this.articleStockSubject.next(result[0]);
          this.userSubject.next(result[1]);
        }, (err: HttpErrorResponse) =>
          console.log(`Could not get artickeStocks and users. Error: ${err.message}`));
      } else {
        const articleStockObservable: Observable<ArticleStockDto[]> = this.articleStockRest.getAll();
        const userObservable: Observable<UserDto[]> = this.userRest.getAll();
        const articleCheckInObservable = this.articleCheckInRest.get(+params["id"]);
        combineLatest(articleCheckInObservable, articleStockObservable, userObservable).subscribe(result => {
            this.articleCheckIn = this.ensureUserInArticleCheckIn(result[0], result[1]);
            this.articleCheckIn = this.ensureArticleInArticleStock(this.articleCheckIn, result[2]);
            this.articleCheckInId = this.articleCheckIn.id;
          },
          (err: HttpErrorResponse) => {
            console.log(`Could not get article with id ${params["id"]} with error: ${err.message}`);
          });
      }
    });
  }

  private ensureUserInArticleCheckIn(articleCheckIn: ArticleCheckInDto, articleStocks: ArticleStockDto[]): ArticleCheckInDto {
    this.articleStockSubject.next(articleStocks);
    for (const articleStock of articleStocks) {
      if (this.isArticleStockWithSameId(articleCheckIn, articleStock)) {
        articleCheckIn.articleStock = articleStock;
      }
    }
    return articleCheckIn;
  }

  private ensureArticleInArticleStock(articleCheckIn: ArticleCheckInDto, users: UserDto[]): ArticleCheckInDto {
    this.userSubject.next(users);
    for (const user of users) {
      if (this.isUserWithSameId(articleCheckIn, user)) {
        articleCheckIn.user = user;
      }
    }
    return articleCheckIn;
  }

  private isArticleStockWithSameId(articleCheckIn: ArticleCheckInDto, articleStock: ArticleStockDto): boolean {
    return articleCheckIn.articleStock != null && articleCheckIn.articleStock.id === articleStock.id;
  }

  private isUserWithSameId(articleCheckIn: ArticleCheckInDto, user: UserDto): boolean {
    return articleCheckIn.user != null && articleCheckIn.user.id === user.id;
  }

  public submit() {
    if (this.articleCheckInId == null) {
      this.articleCheckInRest.add(new ArticleCheckInDto(this.articleCheckIn))
        .subscribe(
          (result) => this.router.navigate([".."], {relativeTo: this.route}),
          (err: HttpErrorResponse) => console.error(`could not save articleStock: ${this.articleCheckIn.id} with Error: ${err.message}`)
        );
    } else {
      this.articleCheckInRest.update(ArticleCheckInDto.createWithId(this.articleCheckInId, this.articleCheckIn))
        .subscribe(
          (result) => this.router.navigate([".."], {relativeTo: this.route}),
          (err: HttpErrorResponse) => console.error(`could not update articleStock: ${this.articleCheckIn.id} with Error: ${err.message}`));
    }
  }
}
