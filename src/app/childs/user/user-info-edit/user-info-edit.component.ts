import {Component, OnInit} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {IUser} from "citrus-common";
import {UserInfoDatabaseService} from "../user-info-database.service";

@Component({
  selector: "app-user-info-edit",
  templateUrl: "./user-info-edit.component.html",
  styleUrls: ["./user-info-edit.component.scss"]
})
export class UserInfoEditComponent implements OnInit {

  public userInfo: UserInfoDto = UserInfoTO.createEmpty();
  public userInfoId: number;

  constructor(private route: ActivatedRoute,
              private router: Router,
              public userInfoDatabase: UserInfoDatabaseService) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      if (params["id"] == null) {
        this.userInfo = UserInfoDto.createEmpty();
        this.userInfoId = this.userInfo.id;
      } else {
        this.userInfoDatabase.get(+params["id"])
          .subscribe(
            t => {
              this.userInfo = UserInfoTO.createUserInfoWithId(t.id, t);
              this.userInfoId = this.userInfo.id;
            },
            err => {
              console.log(`Could not get address with id ${params["id"]} with error: ${err}`);
            });
      }
    });
  }

  public submit() {
    if (this.userInfoId == null) {
      this.userInfoDatabase.add(new UserInfoDto(this.userInfo))
        .subscribe(
          (result) => this.router.navigate([".."], {relativeTo: this.route}),
          (err) => console.error(`could not save userInfo: ${this.userInfo.id} with Error: ${err}`)
        );
    } else {
      this.userInfoDatabase.update(UserInfoDto.createUserInfoWithId(this.userInfoId, this.userInfo))
        .subscribe(
          (result) => this.router.navigate([".."], {relativeTo: this.route}),
          (err) => console.error(`could not update userInfo: ${this.userInfo.id} with Error: ${err}`));
    }
  }
}
