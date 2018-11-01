import {Component, OnInit} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {ArticleDto, OrderDto} from "citrus-common";
import {OrderItemDto} from "citrus-common/lib/dto/order-item-dto";
import {BehaviorSubject} from "rxjs";
import {ArticleWithAllDtoRestService} from "../../article/article-with-all-dto-rest.service";
import {OrderDtoRestService} from "../../customer-order/order-dto-rest.service";
import {OrderItemDtoRestService} from "../order-item-dto-rest.service";

@Component({
  selector: "app-customer-order-item-edit",
  templateUrl: "./customer-order-item-edit.component.html",
  styleUrls: ["./customer-order-item-edit.component.scss"]
})
export class CustomerOrderItemEditComponent implements OnInit {

  private _orderItem: OrderItemDto = OrderItemDto.createEmpty();
  public _orderItemId: number;
  public _articleSubject = new BehaviorSubject<ArticleDto[]>([]);

  constructor(private route: ActivatedRoute,
              private router: Router,
              private orderRest: OrderDtoRestService,
              private orderItemRest: OrderItemDtoRestService,
              private articleRest: ArticleWithAllDtoRestService) {
  }

  public get orderItem(): OrderItemDto {
    return this._orderItem;
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

  private updateOrderItem(customerOrder: OrderDto) {
    this.route.params.subscribe(orderItemParams => {
      if (orderItemParams["id"] == null) {
        this._orderItem = OrderItemDto.createEmpty();
      } else {
        this._orderItem = customerOrder.orderItems.filter(o => o.id === +orderItemParams["id"])[0];
      }
      this._orderItemId = this._orderItem.id;
      this.updateAllArticles();
    });
  }

  private updateAllArticles() {
    this.articleRest.getAll().subscribe(articles => {
      this.ensureArticleInCustomerOrderItem(this._orderItem, articles);
      this._articleSubject.next(articles);
    });
  }

  private ensureArticleInCustomerOrderItem(orderItem: OrderItemDto, articles: ArticleDto[]): void {
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
      this.orderItem.article = this.orderItem.article;
      this.orderItem.copiedPrice = this.orderItem.article.price;
      const copiedItem = OrderItemDto.createWithId(this._orderItemId, this.orderItem);
      if (this._orderItemId == null) {
        this.createNewItem(copiedItem);
      } else {
        this.updateItem(copiedItem);
      }
  }


  private createNewItem(copy) {
    this.orderItemRest.add(new OrderItemDto(copy)).subscribe(
      (result) => {
//        this._customerOrder.customerOrderItems.push(copy);
        this.router.navigate([".."], {relativeTo: this.route});
      },
      (err) => console.error(`could not save orderItem: ${copy.id} with Error: ${err}`)
    );
  }

  private updateItem(copy) {
    this.orderItemRest.update(copy).subscribe(
      (result) => {
        // const position = this._customerOrder.customerOrderItems.findIndex(o => o.id === this._orderItemId);
        // this._customerOrder.customerOrderItems[position] = copy;
        this.router.navigate([".."], {relativeTo: this.route});
      },
      (err) => console.error(`could not update orderItem: ${copy.id} with Error: ${err}`));
  }
}
