import {Component, OnInit} from "@angular/core";
import {MatTableDataSource} from "@angular/material";
import {CartEntry} from "../cart-entry";
import {CartService} from "../cart.service";

@Component({
  selector: "app-shopping-cart",
  templateUrl: "./shopping-cart.component.html",
  styleUrls: ["./shopping-cart.component.scss"]
})
export class ShoppingCartComponent implements OnInit {

  datasource = new MatTableDataSource<CartEntry>();
  public displayedColumns = ["article", "cart"];

  constructor(private cartService: CartService) {
    this.datasource.data = [];
    const subscription = this.cartService.getCart().subscribe(data => {
      this.datasource.data = data;
    });
  }

  ngOnInit() {
  }

  public increase(cartEntry: CartEntry) {
    this.cartService.addArticleStock(cartEntry.articleStock, 1);
  }

  public decrease(cartEntry: CartEntry) {
    this.cartService.addArticleStock(cartEntry.articleStock, -1);
  }

  public remove(cartEntry: CartEntry) {
    this.cartService.removeArticle(cartEntry.articleStock);
  }

}
