import {Component, OnInit} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";

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

  constructor(private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit() {
  }

  public enter(digit: string) {
    this.bestellnummer = this.bestellnummer + digit;
  }

  public search() {
    this.router.navigate([this.bestellnummer], {relativeTo: this.route});
  }

  public clear() {
    this.bestellnummer = "";
  }
}
