import {Component, OnInit} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {IUserInfo} from "citrus-common";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {Observable} from "rxjs/Observable";
import {UserInfoTO} from "../../../TransferObjects/UserInfoTO";
import {UserInfoRestDatabaseService} from "../user-info-rest-database.service";

@Component({
  selector: "app-user-info-details",
  templateUrl: "./user-info-details.component.html",
  styleUrls: ["./user-info-details.component.scss"]
})
export class UserInfoDetailsComponent implements OnInit {
  private _userInfo: Observable<IUserInfo> = new BehaviorSubject<IUserInfo>(UserInfoTO.createEmpty());

  constructor(private route: ActivatedRoute, private database: UserInfoRestDatabaseService) {
  }

  public get userInfo() {
    return this._userInfo;
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this._userInfo = this.database.get(+params["id"]);
    });
  }

}
