import {Component, OnInit} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {CustomerOrderItemDto} from "citrus-common/lib/dto/customer-order-item-dto";
import {BehaviorSubject} from "rxjs/Rx";
import {CustomerOrderWithItemsAndArticleDtoRestService} from "../../customer-order/customer-order-with-items-and-article-dto-rest.service";

@Component({
  selector: "app-customer-order-item-overview",
  templateUrl: "./customer-order-item-overview.component.html",
  styleUrls: ["./customer-order-item-overview.component.scss"]
})
export class CustomerOrderItemOverviewComponent implements OnInit {

  public id: number;

  dataObservable = new BehaviorSubject<CustomerOrderItemDto[]>([]);

  constructor(private route: ActivatedRoute,
              private router: Router,
              private rest: CustomerOrderWithItemsAndArticleDtoRestService) {
  }

  ngOnInit() {
    this.route.parent.params.subscribe(params => {
      if (params["id"] !== null) {
        this.id = +params["id"];
        this.rest.get(+params["id"]).subscribe(customerOrder => {
          this.dataObservable.next(customerOrder.customerOrderItems);
        });
      }
    });

  }


}
