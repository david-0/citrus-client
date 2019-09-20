import {Component, OnInit} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {LocationDto, OrderDto} from "citrus-common";
import {BehaviorSubject} from "rxjs";
import {OrderDtoRestService} from "../../childs/order/order-dto-rest.service";
import {SaleLocationService} from "../sale-location.service";

export interface Tile {
  color: string;
  cols: number;
  rows: number;
  text: string;
}

@Component({
  selector: "app-sale-overview",
  templateUrl: "./sale-overview.component.html",
  styleUrls: ["./sale-overview.component.scss"]
})
export class SaleOverviewComponent implements OnInit {
  public bestellnummer = "";
  public numberValid = false;
  public selectedLocation: LocationDto;
  public orderCount = 0;
  public displayedColumns = ["id", "date", "user", "totalPrice", "plannedCheckout", "checkedOut"];
  public orderSubject = new BehaviorSubject<OrderDto[]>([]);


  constructor(private route: ActivatedRoute,
              private router: Router,
              private rest: OrderDtoRestService,
              private saleLocationService: SaleLocationService) {
  }

  ngOnInit() {
    this.saleLocationService.getSaleLocation().subscribe(location => {
      this.selectedLocation = location;
      if (location) {
        this.rest.getOpenByLocation(location.id).subscribe(orders => {
          this.orderSubject.next(orders);
          this.orderCount = orders.length;
          this.validateBestellnummer();
        });
      } else {
        this.orderCount = 0;
      }
    });
  }

  public enter(digit: string) {
    this.bestellnummer = this.bestellnummer + digit;
    this.validateBestellnummer();
  }

  public validateBestellnummer() {
    if (this.orderSubject.getValue().filter(o => o.id === +this.bestellnummer).length > 0) {
      this.numberValid = true;
    } else {
      this.numberValid = false;
    }
  }

  public search() {
    this.router.navigate([this.bestellnummer], {relativeTo: this.route});
  }

  public clear() {
    this.bestellnummer = "";
    this.numberValid = false;
  }
}
