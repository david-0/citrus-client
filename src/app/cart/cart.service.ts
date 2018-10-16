import {Injectable} from "@angular/core";
import {ArticleStockDto} from "citrus-common";
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
    this.cart.getValue().forEach(e => e.count = 0);
    this.cart.next([]);
    this.saveCart();
  }

  public getArticleStock(articleStockId: number): CartEntry {
    const entries = this.cart.getValue().filter(e => e.articleStock.id === articleStockId);
    if (entries && entries.length > 0) {
      return entries[0];
    }
  }

  public addArticleStock(articleStock: ArticleStockDto, count: number) {
    this.updateCart(articleStock, count);
    this.saveCart();
  }

  public removeArticleStock(articleStock: ArticleStockDto) {
    const entries = this.cart.getValue();
    const entriesArticle = entries.filter(e => e.articleStock.id === articleStock.id);
    entriesArticle.forEach(e => e.count = 0);

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
        this.removeArticleStock(articleStock);
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
