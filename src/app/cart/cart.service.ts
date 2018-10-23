import {Injectable} from "@angular/core";
import {ArticleDto, CartDto, CartItemDto, LocationDto} from "citrus-common";
import {BehaviorSubject, Observable} from "rxjs";

@Injectable({
  providedIn: "root"
})
export class CartService {

  private cart: BehaviorSubject<CartDto[]>;

  constructor() {
    this.cart = new BehaviorSubject<CartDto[]>(this.getSavedCarts());
  }

  private getSavedCarts(): CartDto[] {
    const item = localStorage.getItem("cart-v2");
    if (item) {
      return JSON.parse(item);
    }
    return [];
  }

  private saveCarts() {
    localStorage.setItem("cart-v2", JSON.stringify(this.cart.getValue()));
  }

  public getCarts(): Observable<CartDto[]> {
    return this.cart;
  }

  public clear() {
    this.cart.getValue().forEach(cart => cart.cartItems.forEach(i => i.quantity = 0));
    this.cart.next([]);
    this.saveCarts();
  }

  public getOrderItem(locationId: number, articleId: number): CartItemDto {
    if (this.hasCart(locationId)) {
      const cart = this.getCart(locationId);
      if (this.hasCartItem(cart, articleId)) {
        return this.getCartItem(cart, articleId);
      }
    }
  }

  public addArticle(location: LocationDto, article: ArticleDto, quantity: number) {
    if (!this.hasCart(location.id)) {
      this.addCart(location);
    }
    const cart = this.getCart(location.id);
    if (this.hasCartItem(cart, article.id)) {
      const item = this.getCartItem(cart, article.id);
      item.quantity += +quantity;
    } else {
      this.addCartItem(cart, article, quantity);
    }
    this.updateTotalPrice(cart);
    this.cart.next(this.cart.getValue());
    this.saveCarts();
  }

  public removeArticle(location: LocationDto, article: ArticleDto) {
    if (this.hasCart(location.id)) {
      const cart = this.getCart(location.id);
      if (this.hasCartItem(cart, article.id)) {
        this.removeCartItem(cart, article.id);
        if (cart.cartItems.length > 0) {
          this.updateTotalPrice(cart);
        } else {
          this.removeCart(location.id);
        }
        this.cart.next(this.cart.getValue());
        this.saveCarts();
      }
    }
  }

  private updateTotalPrice(cart: CartDto) {
    let totalPrice = 0;
    cart.cartItems.forEach(i => totalPrice += +i.price * +i.quantity);
    cart.totalPrice = totalPrice;
  }

  private hasCart(locationId: number): boolean {
    const carts = this.cart.getValue();
    return carts.filter(c => c.location.id === locationId).length > 0;
  }

  private getCart(locationId: number): CartDto {
    const carts = this.cart.getValue();
    return carts.filter(c => c.location.id === locationId)[0];
  }

  private addCart(location: LocationDto) {
    const cart = new CartDto(location, 0);
    const carts = this.cart.getValue();
    carts.push(cart);
    this.cart.next(carts);
  }

  private removeCart(locationId: number) {
    const carts = this.cart.getValue();
    this.cart.next(carts.filter(c => c.location.id !== locationId));
  }

  private hasCartItem(cart: CartDto, articleId: number): boolean {
    return cart.cartItems.filter(i => i.article.id === articleId).length > 0;
  }

  private getCartItem(cart: CartDto, articleId: number): CartItemDto {
    return cart.cartItems.filter(i => i.article.id === articleId)[0];
  }

  private addCartItem(cart: CartDto, article: ArticleDto, quantity: number) {
    const newItem = new CartItemDto(article, quantity, article.price);
    cart.cartItems.push(newItem);
  }

  private removeCartItem(cart: CartDto, articleId: number) {
    cart.cartItems.filter(i => i.article.id === articleId)[0].quantity = 0;
    cart.cartItems = cart.cartItems.filter(i => i.article.id !== articleId);
  }
}
