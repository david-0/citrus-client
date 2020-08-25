import {Component, OnInit} from "@angular/core";

@Component({
  selector: "app-organisation",
  templateUrl: "./organisation.component.html",
  styleUrls: ["./organisation.component.scss"]
})
export class OrganisationComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {
  }

  public createSeasonString() : string {
    let date = new Date();
    if (date.getMonth() < 6) {
      return (date.getFullYear()-1) + " – " + date.getFullYear();
    }
    return date.getFullYear() + " – " + (date.getFullYear()+1);
  }
}
