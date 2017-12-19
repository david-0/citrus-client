import {Component, OnInit} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {IUser} from "citrus-common";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {Observable} from "rxjs/Observable";
import {UserInfoTO} from "../../../TransferObjects/UserInfoTO";
import {UserInfoDatabaseService} from "../user-info-database.service";

@Component({
  selector: "app-user-info-details",
  templateUrl: "./user-info-details.component.html",
  styleUrls: ["./user-info-details.component.scss"]
})
export class UserInfoDetailsComponent implements OnInit {
  private _userInfo: Observable<IUser> = new BehaviorSubject<IUser>(UserInfoTO.createEmpty());
  public displayedColumns = ["description", "name", "prename", "street", "number", "addition", "zipcode", "city"];
  public whereDefinition = {columnName: undefined, id: undefined};

  constructor(private route: ActivatedRoute, private database: UserInfoDatabaseService) {
  }

  public get userInfo() {
    return this._userInfo;
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this._userInfo = this.database.get(+params["id"]);
      this.whereDefinition = {columnName: "userId", id: +params["id"].toString()};
    });
  }

}
