import {HttpErrorResponse} from "@angular/common/http";
import {Component, OnInit} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {ArticleCheckOutDto, ArticleStockDto, UserDto} from "citrus-common";
import {BehaviorSubject, combineLatest, Observable} from "rxjs";
import {ArticleStockWithDtoAllRestService} from "../../article-stock/article-stock-with-dto-all-rest.service";
import {UserDtoRestService} from "../../user/user-dto-rest.service";
import {ArticleCheckoutWithAllDtoRestService} from "../article-checkout-with-all-dto-rest.service";

@Component({
  selector: "app-article-checkout-edit",
  templateUrl: "./article-checkout-edit.component.html",
  styleUrls: ["./article-checkout-edit.component.scss"]
})
export class ArticleCheckoutEditComponent implements OnInit {
  public articleCheckOut: ArticleCheckOutDto = ArticleCheckOutDto.createEmpty();
  public articleCheckOutId: number;

  public articleStockSubject: BehaviorSubject<ArticleStockDto[]> = new BehaviorSubject([]);
  public userSubject: BehaviorSubject<UserDto[]> = new BehaviorSubject([]);

  constructor(private route: ActivatedRoute,
              private router: Router,
              private articleCheckOutRest: ArticleCheckoutWithAllDtoRestService,
              public articleStockRest: ArticleStockWithDtoAllRestService,
              public userRest: UserDtoRestService) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      if (params["id"] == null) {
        this.articleCheckOutId = this.articleCheckOut.id;
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
        const articleCheckOutObservable = this.articleCheckOutRest.get(+params["id"]);
        combineLatest(articleCheckOutObservable, articleStockObservable, userObservable).subscribe(result => {
            this.articleCheckOut = this.ensureUserInArticleCheckOut(result[0], result[1]);
            this.articleCheckOut = this.ensureArticleInArticleStock(this.articleCheckOut, result[2]);
            this.articleCheckOutId = this.articleCheckOut.id;
          },
          (err: HttpErrorResponse) => {
            console.log(`Could not get article with id ${params["id"]} with error: ${err.message}`);
          });
      }
    });
  }

  private ensureUserInArticleCheckOut(articleCheckOut: ArticleCheckOutDto, articleStocks: ArticleStockDto[]): ArticleCheckOutDto {
    this.articleStockSubject.next(articleStocks);
    for (const articleStock of articleStocks) {
      if (this.isArticleStockWithSameId(articleCheckOut, articleStock)) {
        articleCheckOut.articleStock = articleStock;
      }
    }
    return articleCheckOut;
  }

  private ensureArticleInArticleStock(articleCheckOut: ArticleCheckOutDto, users: UserDto[]): ArticleCheckOutDto {
    this.userSubject.next(users);
    for (const user of users) {
      if (this.isUserWithSameId(articleCheckOut, user)) {
        articleCheckOut.user = user;
      }
    }
    return articleCheckOut;
  }

  private isArticleStockWithSameId(articleCheckOut: ArticleCheckOutDto, articleStock: ArticleStockDto): boolean {
    return articleCheckOut.articleStock != null && articleCheckOut.articleStock.id === articleStock.id;
  }

  private isUserWithSameId(articleCheckOut: ArticleCheckOutDto, user: UserDto): boolean {
    return articleCheckOut.user != null && articleCheckOut.user.id === user.id;
  }

  public submit() {
    if (this.articleCheckOutId == null) {
      this.articleCheckOutRest.add(new ArticleCheckOutDto(this.articleCheckOut))
        .subscribe(
          (result) => this.router.navigate([".."], {relativeTo: this.route}),
          (err: HttpErrorResponse) => console.error(`could not save articleStock: ${this.articleCheckOut.id} with Error: ${err.message}`)
        );
    } else {
      this.articleCheckOutRest.update(ArticleCheckOutDto.createWithId(this.articleCheckOutId, this.articleCheckOut))
        .subscribe(
          (result) => this.router.navigate([".."], {relativeTo: this.route}),
          (err: HttpErrorResponse) => console.error(`could not update articleStock: ${this.articleCheckOut.id} with Error: ${err.message}`));
    }
  }
}
