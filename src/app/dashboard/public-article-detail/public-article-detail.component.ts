import {Component, OnInit} from "@angular/core";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {ArticleCheckInDto, ArticleDto} from "citrus-common";
import {BehaviorSubject} from "rxjs";
import {CartService} from "../../cart/cart.service";
import {ArticleWithAllDtoRestService} from "../../childs/article/article-with-all-dto-rest.service";
import {ArticleStockWrapper} from "../ArticleStockWrapper";
import {ArticleWrapper} from "../ArticleWrapper";

@Component({
  selector: "app-public-article-detail",
  templateUrl: "./public-article-detail.component.html",
  styleUrls: ["./public-article-detail.component.scss"]
})
export class PublicArticleDetailComponent implements OnInit {

  public selectedArticleWrapper = new BehaviorSubject<ArticleWrapper>(null);
  public selectedArticleStockLocation = new BehaviorSubject<ArticleStockWrapper>(null);
  public numberToAdd = 1;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private cartService: CartService,
              private rest: ArticleWithAllDtoRestService) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => this.loadArticle(params));
  }

  private loadArticle(params: Params) {
    this.rest.get(+params["articleId"]).subscribe(article => {
      const articleWrapper = this.createArticleWrapper(article);
      this.selectedArticleWrapper.next(articleWrapper);
      this.updateSelectedStockArticle(articleWrapper, +params["locationId"]);
    });
  }

  public onLocationIdChange(locationId: number) {
    this.updateSelectedStockArticle(this.selectedArticleWrapper.getValue(), +locationId);
  }

  public getNotDoneArticleCheckIns(): ArticleCheckInDto[] {
    return this.selectedArticleStockLocation.getValue().articleStock.checkIns.filter(ci => ci.done);
  }

  public increase() {
    this.numberToAdd++;
  }

  public decrease() {
    if (this.numberToAdd > 1) {
      this.numberToAdd--;
    }
  }

  private updateSelectedStockArticle(articleWrapper: ArticleWrapper, locationId: number): void {
    for (const wrapperStock of articleWrapper.articleStockWrappers) {
      if (locationId === wrapperStock.articleStock.location.id) {
        this.selectedArticleStockLocation.next(wrapperStock);
      }
    }
  }

  private createArticleWrapper(article: ArticleDto): ArticleWrapper {
    const wrapper = new ArticleWrapper(article);
    wrapper.articleStockWrappers.forEach(s => {
      const cartItem = this.cartService.getOrderItem(s.articleStock.location.id, s.articleStock.article.id);
      if (cartItem) {
        s.cartItem = cartItem;
      }
    });
    return wrapper;
  }

  addToCart(articleStockWrapper: ArticleStockWrapper) {
    this.cartService.addArticle(articleStockWrapper.articleStock.location, articleStockWrapper.articleStock.article,
      this.numberToAdd);
    articleStockWrapper.cartItem = this.cartService.getOrderItem(
      articleStockWrapper.articleStock.location.id, articleStockWrapper.articleStock.article.id);
  }
}
