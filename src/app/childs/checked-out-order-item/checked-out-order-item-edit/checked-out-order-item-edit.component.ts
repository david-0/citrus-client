import {Component, OnInit} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {ArticleDto, CheckedOutOrderItemDto, LocationDto, OrderDto} from "citrus-common";
import {OrderItemDto} from "citrus-common/lib/dto/order-item-dto";
import {BehaviorSubject} from "rxjs";
import {ArticleStockWithDtoAllRestService} from "../../article-stock/article-stock-with-dto-all-rest.service";
import {OrderDtoWithAllRestService} from "../../order/order-dto-with-all-rest.service";
import {CheckedOutOrderItemDtoRestService} from "../checked-out-order-item-dto-rest.service";

@Component({
  selector: "app-checked-out-order-item-edit",
  templateUrl: "./checked-out-order-item-edit.component.html",
  styleUrls: ["./checked-out-order-item-edit.component.scss"]
})
export class CheckedOutOrderItemEditComponent implements OnInit {

  private _checkedOutOrderItem: CheckedOutOrderItemDto = CheckedOutOrderItemDto.createEmpty();
  public _checkedOutOrderItemId: number;
  public _articleSubject = new BehaviorSubject<ArticleDto[]>([]);

  constructor(private route: ActivatedRoute,
              private router: Router,
              private orderRest: OrderDtoWithAllRestService,
              private checkedOutOrderItemRest: CheckedOutOrderItemDtoRestService,
              private articleStockRest: ArticleStockWithDtoAllRestService) {
  }

  public get checkedOutOrderItem(): CheckedOutOrderItemDto {
    return this._checkedOutOrderItem;
  }

  ngOnInit() {
    this.route.parent.params.subscribe(orderParams => {
      this.updateOrder(orderParams);
    });
  }

  private updateOrder(orderParams) {
    const promise = this.orderRest.get(+orderParams["id"]);
    promise.subscribe((order) => {
      this.updateOrderItem(order);
    });
  }

  private updateOrderItem(order: OrderDto) {
    this.route.params.subscribe(checkedOutOrderItemParams => {
      if (checkedOutOrderItemParams["id"] == null) {
        this._checkedOutOrderItem = CheckedOutOrderItemDto.createEmpty();
        this._checkedOutOrderItem.order = order;
      } else {
        this._checkedOutOrderItem = order.checkedOutOrderItems.filter(o => o.id === +checkedOutOrderItemParams["id"])[0];
      }
      this._checkedOutOrderItemId = this._checkedOutOrderItem.id;
      this.updateAllArticlesOfLocation(order.location);
    });
  }

  private updateAllArticlesOfLocation(location: LocationDto) {
    this.articleStockRest.getAll().subscribe(articleStocks => {
      this._articleSubject.next(articleStocks
        .filter(a => a.location.id === location.id)
        .map(a => a.article));
      this.ensureArticleInOrderItem(this._checkedOutOrderItem, this._articleSubject.getValue());
    });
  }

  private ensureArticleInOrderItem(orderItem: OrderItemDto, articles: ArticleDto[]): void {
    for (const article of articles) {
      if (this.isArticleWithSameId(orderItem, article)) {
        orderItem.article = article;
      }
    }
  }

  private isArticleWithSameId(orderItem: OrderItemDto, article: ArticleDto): boolean {
    return orderItem.article != null && orderItem.article.id === article.id;
  }

  public submit() {
      this.checkedOutOrderItem.article = this.checkedOutOrderItem.article;
      this.checkedOutOrderItem.copiedPrice = this.checkedOutOrderItem.article.price;
      const copiedItem = CheckedOutOrderItemDto.createWithId(this._checkedOutOrderItemId, this.checkedOutOrderItem);
      if (this._checkedOutOrderItemId == null) {
        this.createNewItem(copiedItem);
      } else {
        this.updateItem(copiedItem);
      }
  }


  private createNewItem(copy) {
    this.checkedOutOrderItemRest.add(new CheckedOutOrderItemDto(copy)).subscribe(
      (result) => {
//        this._orderItem.orderItems.push(copy);
        this.router.navigate([".."], {relativeTo: this.route});
      },
      (err) => console.error(`could not save checkedOutOrderItem: ${copy.id} with Error: ${err}`)
    );
  }

  private updateItem(copy) {
    this.checkedOutOrderItemRest.update(copy).subscribe(
      (result) => {
        // const position = this._orderItem.orderItems.findIndex(o => o.id === this._orderItemId);
        // this._orderItem.orderItems[position] = copy;
        this.router.navigate([".."], {relativeTo: this.route});
      },
      (err) => console.error(`could not update checkedOutOrderItem: ${copy.id} with Error: ${err}`));
  }
}
