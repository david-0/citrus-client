import {Component, OnInit} from "@angular/core";

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

  constructor() {
  }

  ngOnInit() {
  }

  public enter(digit: string) {
    this.bestellnummer = this.bestellnummer + digit;
  }

  public search() {

  }

  public clear() {
    this.bestellnummer = "";
  }
}
