import {Injectable} from "@angular/core";
import {ArticleDto, ArticleStockDto} from "citrus-common";
import {BehaviorSubject, Observable} from "rxjs";
import {CartEntry} from "./cart-entry";

@Injectable({
  providedIn: "root"
})
export class CartService {

  private cart: BehaviorSubject<CartEntry[]>;

  constructor() {
    this.cart = new BehaviorSubject<CartEntry[]>(this.getSavedCart());
  }

  private getSavedCart(): CartEntry[] {
    const item = localStorage.getItem("cart");
    if (item) {
      return JSON.parse(item);
    }
    return [];
  }

  private saveCart() {
    localStorage.setItem("cart", JSON.stringify(this.cart.getValue()));
  }

  public getCart(): Observable<CartEntry[]> {
    return this.cart;
  }

  public clear() {
    this.cart.next([]);
    this.saveCart();
  }

  public addArticleStock(articleStock: ArticleStockDto, count: number) {
    this.updateCart(articleStock, count);
    this.saveCart();
  }

  public removeArticleStock(articleStock: ArticleStockDto) {
    const entries = this.cart.getValue();
    const entriesWithoutArticle = entries.filter(e => e.articleStock.id !== articleStock.id);
    this.cart.next(entriesWithoutArticle);
    this.saveCart();
  }

  private updateCart(articleStock: ArticleStockDto, count: number) {
    const entries = this.cart.getValue();
    const articleAlreadyInCart = entries.filter(e => e.articleStock.id === articleStock.id);
    if (articleAlreadyInCart.length > 0) {
      const newCount = articleAlreadyInCart[0].count + count;
      if (newCount <= 0) {
        this.cart.next(entries.filter(e => e.articleStock.id !== articleStock.id));
      } else {
        const newPrice = articleStock.article.price;
        articleAlreadyInCart[0].price = newPrice;
        articleAlreadyInCart[0].count = newCount;
        this.cart.next(entries);
      }
    } else {
      if (count > 0) {
        const entry: CartEntry = {articleStock, price: articleStock.article.price, count};
        entries.push(entry);
        this.cart.next(entries);
      }
    }
  }
}
