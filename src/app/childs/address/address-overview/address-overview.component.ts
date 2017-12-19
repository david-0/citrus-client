import {Component, OnInit} from "@angular/core";

@Component({
  selector: "app-address-overview",
  templateUrl: "./address-overview.component.html",
  styleUrls: ["./address-overview.component.scss"]
})
export class AddressOverviewComponent implements OnInit {
  public displayedColumns = ["user", "description", "name", "prename", "street", "number", "addition", "zipcode", "city"];

  constructor() {
  }

  ngOnInit() {
  }
}
