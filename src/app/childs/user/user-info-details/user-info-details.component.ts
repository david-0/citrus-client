import {Component, OnInit} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {UserInfoDto} from "citrus-common";
import {Subscription} from "rxjs/Subscription";
import {isUndefined} from "util";
import {UserInfoWithRolesDtoRestService} from "../user-info--with-roles-dto-rest.service";

@Component({
  selector: "app-user-info-details",
  templateUrl: "./user-info-details.component.html",
  styleUrls: ["./user-info-details.component.scss"]
})
export class UserInfoDetailsComponent implements OnInit {
  public displayedColumns = ["description", "name", "prename", "street", "number", "addition", "zipcode", "city"];

  private _userInfo: UserInfoDto = UserInfoDto.createEmpty();
  private subscription: Subscription;


  constructor(private route: ActivatedRoute, private rest: UserInfoWithRolesDtoRestService) {
  }

  public get userInfo(): UserInfoDto {
    return this._userInfo;
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const userInfoPromise = this.rest.get(+params["id"]);
      this.subscription = userInfoPromise.subscribe((userInfo) => {
        this._userInfo = userInfo;
      });
    });
  }

  public getRoles(): string {
    if (!!this._userInfo.roles && this._userInfo.roles.length > 0) {
      return this._userInfo.roles
        .map((u) => u.name)
        .reduce((u1, u2) => u1 + ", " + u2);
    }
    return "";
  }

}
