import {Injectable} from "@angular/core";
import {ArticleStockDto} from "citrus-common";

@Injectable({
  providedIn: "root"
})
export class ArticleStockComputationService {

  constructor() {
  }

  public summarizeAllQuantities(articleStocks: ArticleStockDto[]): ArticleStockDto[] {
    for (const articleStock of articleStocks) {
      this.summarizeQuantities(articleStock);
    }
    return articleStocks;
  }

  public summarizeQuantities(articleStock: ArticleStockDto): ArticleStockDto {
    const currentDateInMs = new Date().getTime();
    let quantity = 0;
    let reservedQuantity = 0;
    for (const checkIn of articleStock.checkIns) {
      const date: number = new Date(checkIn.date).getTime();
      if (date <= currentDateInMs) {
        quantity += checkIn.quantity;
      }
    }
    for (const checkOut of articleStock.checkOuts) {
      const date: number = new Date(checkOut.date).getTime();
      if (date <= currentDateInMs) {
        quantity -= checkOut.quantity;
      }
    }
    for (const item of articleStock.customerOrderItems) {
      if (!!item.checkedOut) {
        quantity -= item.quantity;
      } else {
        reservedQuantity += item.quantity;
      }
    }
    articleStock.quantity = quantity;
    articleStock.reservedQuantity = reservedQuantity;
    return articleStock;
  }
}
