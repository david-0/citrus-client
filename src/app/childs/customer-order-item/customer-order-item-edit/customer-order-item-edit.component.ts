import {Component, OnInit} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {ArticleDto} from "citrus-common";
import {CustomerOrderDto} from "citrus-common/lib/dto/customer-order-dto";
import {CustomerOrderItemDto} from "citrus-common/lib/dto/customer-order-item-dto";
import {OpeningHourDto} from "citrus-common/lib/dto/opening-hour-dto";
import {BehaviorSubject} from "rxjs/Rx";
import {ArticleDtoRestService} from "../../article/article-dto-rest.service";
import {CustomerOrderWithItemsAndArticleDtoRestService} from "../../customer-order/customer-order-with-items-and-article-dto-rest.service";
import {CustomerOrderItemDtoRestService} from "../customer-order-item-dto-rest.service";

@Component({
  selector: "app-customer-order-item-edit",
  templateUrl: "./customer-order-item-edit.component.html",
  styleUrls: ["./customer-order-item-edit.component.scss"]
})
export class CustomerOrderItemEditComponent implements OnInit {

  private _customerOrder: CustomerOrderDto = CustomerOrderDto.createEmpty();
  private _customerOrderItem: CustomerOrderItemDto = CustomerOrderItemDto.createEmpty(this._customerOrder);
  public _customerOrderItemId: number;
  public _articleSubeject = new BehaviorSubject<ArticleDto[]>([]);

  constructor(private route: ActivatedRoute,
              private router: Router,
              private customerOrderRest: CustomerOrderWithItemsAndArticleDtoRestService,
              private customerOrderItemRest: CustomerOrderItemDtoRestService,
              private articleRest: ArticleDtoRestService) {
  }

  public get customerOrderItem(): CustomerOrderItemDto {
    return this._customerOrderItem;
  }

  ngOnInit() {
    this.route.parent.params.subscribe(customerOrderParams => {
      const promise = this.customerOrderRest.get(+customerOrderParams["id"]);
      promise.subscribe((customerOrder) => {
        this._customerOrder = customerOrder;
        this.route.params.subscribe(customerOrderItemParams => {
          if (customerOrderItemParams["id"] == null) {
            this._customerOrderItem = CustomerOrderItemDto.createEmpty(this._customerOrder);
          } else {
            this._customerOrderItem = this._customerOrder.customerOrderItems.filter(o => o.id === +customerOrderItemParams["id"])[0];
          }
          this._customerOrderItemId = this._customerOrderItem.id;
          this.articleRest.getAll().subscribe(articles => {
            this.ensureArticleInCustomerOrderItem(this._customerOrderItem, articles);
            this._articleSubeject.next(articles);
          });
        });
      });
    });
  }

  private ensureArticleInCustomerOrderItem(customerOrderItem: CustomerOrderItemDto, articles: ArticleDto[]): void {
    for (const article of articles) {
      if (this.isArticleWithSameId(customerOrderItem, article)) {
        customerOrderItem.article = article;
      }
    }
  }

  private isArticleWithSameId(customerOrderItem: CustomerOrderItemDto, article: ArticleDto): boolean {
    return (customerOrderItem.articleId === article.id) ||
      (customerOrderItem.article != null && customerOrderItem.article.id === article.id);
  }

  public submit() {
    this.customerOrderItem.articleId = this.customerOrderItem.article.id;
    this.customerOrderItem.copiedPrice = this.customerOrderItem.article.price * this.customerOrderItem.quantity;
    const copy = CustomerOrderItemDto.createWithId(this._customerOrderItemId, this.customerOrderItem);
    if (this._customerOrderItemId == null) {
      this.customerOrderItemRest.add(new CustomerOrderItemDto(copy)).subscribe(
        (result) => {
          this._customerOrder.customerOrderItems.push(copy);
          this.router.navigate([".."], {relativeTo: this.route});
        },
        (err) => console.error(`could not save customerOrderItem: ${copy.id} with Error: ${err}`)
      );
    } else {
      this.customerOrderItemRest.update(copy).subscribe(
        (result) => {
          const position = this._customerOrder.customerOrderItems.findIndex(o => o.id === this._customerOrderItemId);
          this._customerOrder.customerOrderItems[position] = copy;
          this.router.navigate([".."], {relativeTo: this.route});
        },
        (err) => console.error(`could not update customerOrderItem: ${copy.id} with Error: ${err}`));
    }
  }
}
