import { Component, Inject, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { ArticleDto, ArticleStockDto, CartDto, CartItemDto } from "citrus-common";
import * as moment from "moment";
import { Subscription } from "rxjs";
import { CartService } from "../../cart/cart.service";
import { ArticleWithAllDtoRestService } from "../../childs/article/article-with-all-dto-rest.service";

@Component({
  selector: "app-public-article-detail",
  templateUrl: "./public-article-detail.component.html",
  styleUrls: ["./public-article-detail.component.scss"]
})
export class PublicArticleDetailComponent implements OnInit, OnDestroy {

  public selectedArticle: ArticleDto;
  public selectedArticleStock: ArticleStockDto;
  public selectedCartItem: CartItemDto = null;
  private cartSubscription: Subscription = null;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private cartService: CartService,
    private rest: ArticleWithAllDtoRestService,
    @Inject("baseUrl") public baseUrl: string) {
  }

  private static compareDates(a: Date, b: Date): number {
    if (a === null || a === undefined) {
      if (b === null || b === undefined) {
        return 0;
      }
      return -1;
    }
    if (b === null || b === undefined) {
      return 1;
    }
    if (a < b) {
      return -1;
    }
    if (a > b) {
      return 1;
    }
    return 0;
  }


  ngOnInit() {
    this.route.params.subscribe(params => this.loadArticle(params));
    this.cartSubscription = this.cartService.getCarts().subscribe(carts => {
      this.updateCartItem(carts);
    });
  }

  ngOnDestroy() {
    this.cartSubscription.unsubscribe();
  }

  private updateCartItem(carts: CartDto[]) {
    if (this.selectedArticleStock) {
      let cartItemFound: CartItemDto = null;
      carts.forEach(cart => {
        if (cart.location.id === this.selectedArticleStock.location.id) {
          cart.cartItems.forEach(cartItem => {
            if (cartItem.article.id === this.selectedArticleStock.article.id) {
              cartItemFound = cartItem;
            }
          });
        }
      });
      if (cartItemFound !== this.selectedCartItem) {
        this.selectedCartItem = cartItemFound;
      }
    }
  }

  private loadArticle(params: Params) {
    this.rest.get(+params["articleId"]).subscribe(article => {
      this.selectedArticle = article;
      article.articleStocks = article.articleStocks
        .sort((a, b) => a.location.description.localeCompare(b.location.description)) 
        .filter(stock => stock.visible);
      this.updateSelectedStockArticle(article, +params["locationId"]);
    });
  }

  public onLocationIdChange(locationId: number) {
    this.updateSelectedStockArticle(this.selectedArticle, +locationId);
  }

  public increase(inc: number) {
    this.cartService.addArticle(this.selectedArticleStock.location,
      this.selectedArticleStock.article, +inc * this.selectedArticle.saleUnit);
  }

  public decrease(dec: number) {
    const d = +dec * this.selectedArticle.saleUnit;
    if (this.selectedCartItem) {
      if (this.selectedCartItem.quantity > d) {
        this.cartService.addArticle(this.selectedArticleStock.location,
          this.selectedArticleStock.article, -d);
      } else {
        this.cartService.removeArticle(this.selectedArticleStock.location,
          this.selectedArticleStock.article);
      }
    }
  }

  private updateSelectedStockArticle(article: ArticleDto, locationId: number): void {
    for (const stock of article.articleStocks) {
      if (locationId === stock.location.id) {
        this.selectedArticleStock = stock;
        this.updateCartItem(this.cartService.getCarts().getValue());
      }
    }
  }
}
