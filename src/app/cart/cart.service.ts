import {Injectable} from "@angular/core";
import {ArticleDto} from "citrus-common";
import {BehaviorSubject, Observable} from "rxjs/Rx";
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

  private saveCart(cartEntries: CartEntry[]) {
    localStorage.setItem("cart", JSON.stringify(cartEntries));
  }

  public getCart(): Observable<CartEntry[]> {
    return this.cart;
  }

  public clear() {
    this.cart.next([]);
    this.saveCart(this.cart.getValue());
  }

  public addArticle(article: ArticleDto, count: number) {
    this.updateCart(article, count);
    this.saveCart(this.cart.getValue());
  }

  private updateCart(article: ArticleDto, count: number) {
    const entries = this.cart.getValue();
    const articleAlreadyInCart = entries.filter(e => e.article.id === article.id);
    if (articleAlreadyInCart.length > 0) {
      const newCount = articleAlreadyInCart[0].count + count;
      if (newCount <= 0) {
        this.cart.next(entries.filter(e => e.article.id !== article.id));
      } else {
        const newPrice = article.price * newCount;
        articleAlreadyInCart[0].price = newPrice;
        articleAlreadyInCart[0].count = newCount;
        this.cart.next(entries);
      }
    } else {
      const entry: CartEntry = {article: article, price: article.price * count, count};
      entries.push(entry);
      this.cart.next(entries);
    }
  }
}
