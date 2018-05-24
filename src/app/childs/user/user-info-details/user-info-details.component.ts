import {Component, OnInit} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {UserInfoDto} from "citrus-common";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {Observable} from "rxjs/Observable";
import {UserInfoDtoRestService} from "../user-info-dto-rest.service";

@Component({
  selector: "app-user-info-details",
  templateUrl: "./user-info-details.component.html",
  styleUrls: ["./user-info-details.component.scss"]
})
export class UserInfoDetailsComponent implements OnInit {
  private _userInfo: Observable<UserInfoDto> = new BehaviorSubject<UserInfoDto>(UserInfoDto.createEmpty());
  public displayedColumns = ["description", "name", "prename", "street", "number", "addition", "zipcode", "city"];
//  public whereDefinition = {columnName: undefined, id: undefined};

  constructor(private route: ActivatedRoute, private rest: UserInfoDtoRestService) {
  }

  public get userInfo() {
    return this._userInfo;
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this._userInfo = this.rest.get(+params["id"]);
//      this.whereDefinition = {columnName: "userId", id: +params["id"].toString()};
    });
  }

}
