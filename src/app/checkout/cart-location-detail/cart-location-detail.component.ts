import {Component, Input, OnInit} from "@angular/core";
import {CartLocationDto} from "citrus-common/lib/dto/cart-location-dto";

@Component({
  selector: "app-cart-location-detail",
  templateUrl: "./cart-location-detail.component.html",
  styleUrls: ["./cart-location-detail.component.scss"]
})
export class CartLocationDetailComponent implements OnInit {


  @Input() cartLocation: CartLocationDto;

  constructor() {
  }

  ngOnInit() {
  }

}
