import {Component, OnInit} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {RoleWithUsersDtoRestService} from "../role-with-users-dto-rest.service";

@Component({
  selector: "app-role-delete",
  templateUrl: "./role-delete.component.html",
  styleUrls: ["./role-delete.component.scss"]
})
export class RoleDeleteComponent implements OnInit {

  public dtoName = "Role";
  public message: string;

  constructor(private route: ActivatedRoute,
              public rest: RoleWithUsersDtoRestService) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.rest.get(+params["id"]).subscribe(role => {
        if (role.users.length > 0) {
          this.message = `Die Role wurde nicht gelöscht, da sie noch verwendet wird.`;
        } else {
          this.rest.del(+params["id"]).subscribe(t => {
              this.message = `Die ${this.dtoName} wurde gelöscht!`;
            },
            err => {
              this.message = `Die ${this.dtoName} konnte nicht gelöscht werden (Error: ${err.error}).`;
            });
        }
      }, error => {
        this.message = `Die ${this.dtoName} konnte nicht gelöscht werden (Error: ${err.error}).`;
      });
    });
  }
}

