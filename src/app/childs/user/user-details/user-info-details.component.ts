import {Component, OnInit} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {UserDto} from "citrus-common";
import {Subscription} from "rxjs";
import {UserWithRolesDtoRestService} from "../user-with-roles-dto-rest.service";

@Component({
  selector: "app-user-details",
  templateUrl: "./user-details.component.html",
  styleUrls: ["./user-details.component.scss"]
})
export class UserInfoDetailsComponent implements OnInit {
  public displayedColumns = ["description", "name", "prename", "street", "number", "addition", "zipcode", "city"];

  private _user: UserDto = UserDto.createEmpty();
  private subscription: Subscription;


  constructor(private route: ActivatedRoute, private rest: UserWithRolesDtoRestService) {
  }

  public get user(): UserDto {
    return this._user;
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const userPromise = this.rest.get(+params["id"]);
      this.subscription = userPromise.subscribe((user) => {
        this._user = user;
      });
    });
  }

  public getRoles(): string {
    if (!!this._user.roles && this._user.roles.length > 0) {
      return this._user.roles
        .map((u) => u.name)
        .reduce((u1, u2) => u1 + ", " + u2);
    }
    return "";
  }

}
