import {Component, OnInit} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {UserInfoRestDatabaseService} from "../user-info-rest-database.service";

@Component({
  selector: "app-user-info-delete",
  templateUrl: "./user-info-delete.component.html",
  styleUrls: ["./user-info-delete.component.scss"]
})
export class UserInfoDeleteComponent implements OnInit {

  public id: string;
  public message: string;

  constructor(private route: ActivatedRoute,
              public userDetailsDatabase: UserInfoRestDatabaseService) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.userDetailsDatabase.remove(+params["id"])
        .subscribe(
          t => {
            this.message = `Der Benuzter wurde gelöscht!`;
          },
          err => {
            this.message = `Der Bneutzer konnte nicht gelöscht werden (Error: ${err}).`;
          });
    });
  }
}
