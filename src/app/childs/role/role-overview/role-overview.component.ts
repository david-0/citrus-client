import {Component, OnInit} from "@angular/core";

@Component({
  selector: "app-role-overview",
  templateUrl: "./role-overview.component.html",
  styleUrls: ["./role-overview.component.scss"]
})
export class RoleOverviewComponent implements OnInit {

  public displayedColumns = ["name"];

  constructor() {
  }

  ngOnInit() {
  }
}
