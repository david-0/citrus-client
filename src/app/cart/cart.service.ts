import {Injectable} from "@angular/core";
import {ArticleDto, UnitOfMeasurementDto} from "citrus-common";
import {Observable} from "rxjs/Rx";
import {CartEntry} from "./cart-entry";

@Injectable({
  providedIn: "root"
})
export class CartService {

  constructor() {
  }

  public getCart(): Observable<CartEntry[]> {
    const article = ArticleDto.createEmpty();
    article.description = "Orangen";
    article.unitOfMeasurement = UnitOfMeasurementDto.createEmpty();
    article.unitOfMeasurement.shortcut = "kg";
    const article1 = ArticleDto.createEmpty();
    article1.description = "Zitrone";
    article1.unitOfMeasurement = UnitOfMeasurementDto.createEmpty();
    article1.unitOfMeasurement.shortcut = "Stk";
    return new Observable<CartEntry[]>((s) => {
      s.next([{article, count: 5, price: 5.75},
        {article: article1, count: 3, price: 7.80}]);
    });
  }
}
