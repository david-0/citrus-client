import {Component, OnInit} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {ArticleDto, OrderDto} from "citrus-common";
import {OrderItemDto} from "citrus-common/lib/dto/order-item-dto";
import {BehaviorSubject} from "rxjs";
import {OrderWithItemsAndArticleDtoRestService} from "../../customer-order/order-with-items-and-article-dto-rest.service";
import {OrderItemDtoRestService} from "../order-item-dto-rest.service";

@Component({
  selector: "app-customer-order-item-edit",
  templateUrl: "./customer-order-item-edit.component.html",
  styleUrls: ["./customer-order-item-edit.component.scss"]
})
export class CustomerOrderItemEditComponent implements OnInit {

  private _orderItem: OrderItemDto = OrderItemDto.createEmpty();
  public _customerOrderItemId: number;
  public _articleSubject = new BehaviorSubject<ArticleDto[]>([]);

  constructor(private route: ActivatedRoute,
              private router: Router,
              private orderRest: OrderWithItemsAndArticleDtoRestService,
              private orderItemRest: OrderItemDtoRestService) {
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
    promise.subscribe((customerOrder) => {
      this.updateCustomerOrderItem(customerOrder);
    });
  }

  private updateCustomerOrderItem(customerOrder: OrderDto) {
//     this.route.params.subscribe(customerOrderItemParams => {
//       if (customerOrderItemParams["id"] == null) {
//         this._orderItem = OrderItemDto.createEmpty();
//       } else {
//         this._orderItem = customerOrder. customerOrderItems.filter(o => o.id === +customerOrderItemParams["id"])[0];
//       }
//       this._customerOrderItemId = this._orderItem.id;
// //      this.updateAllArticles();
//     });
  }

  // private updateAllArticles() {
  //   this.userRest.getAll().subscribe(articles => {
  //     this.ensureArticleInCustomerOrderItem(this._orderItem, articles);
  //     this._articleSubject.next(articles);
  //   });
  // }
  //
  // private ensureArticleInCustomerOrderItem(orderItem: CustomerOrderItemDto, articles: ArticleDto[]): void {
  //   for (const article of articles) {
  //     if (this.isArticleWithSameId(orderItem, article)) {
  //       orderItem.article = article;
  //     }
  //   }
  // }
  //
  // private isArticleWithSameId(orderItem: CustomerOrderItemDto, article: ArticleDto): boolean {
  //   return orderItem.article != null && orderItem.article.id === article.id;
  // }
  //
  // public submit() {
  //   this.orderItem.articleId = this.orderItem.article.id;
  //   this.orderItem.copiedPrice = this.orderItem.article.price;
  //   const copiedItem = CustomerOrderItemDto.createWithId(this._customerOrderItemId, this.orderItem);
  //   if (this._customerOrderItemId == null) {
  //     this.createNewItem(copiedItem);
  //   } else {
  //     this.updateItem(copiedItem);
  //   }
  // }
  //
  // private createNewItem(copy) {
  //   this.customerOrderItemRest.add(new CustomerOrderItemDto(copy)).subscribe(
  //     (result) => {
  //       this._customerOrder.customerOrderItems.push(copy);
  //       this.router.navigate([".."], {relativeTo: this.route});
  //     },
  //     (err) => console.error(`could not save orderItem: ${copy.id} with Error: ${err}`)
  //   );
  // }
  //
  // private updateItem(copy) {
  //   this.customerOrderItemRest.update(copy).subscribe(
  //     (result) => {
  //       const position = this._customerOrder.customerOrderItems.findIndex(o => o.id === this._customerOrderItemId);
  //       this._customerOrder.customerOrderItems[position] = copy;
  //       this.router.navigate([".."], {relativeTo: this.route});
  //     },
  //     (err) => console.error(`could not update orderItem: ${copy.id} with Error: ${err}`));
  // }
}
