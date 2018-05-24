import {Component, OnInit} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {UserInfoDto} from "citrus-common";
import {UserInfoDtoRestService} from "../user-info-dto-rest.service";

@Component({
  selector: "app-user-info-edit",
  templateUrl: "./user-info-edit.component.html",
  styleUrls: ["./user-info-edit.component.scss"]
})
export class UserInfoEditComponent implements OnInit {

  public userInfo: UserInfoDto = UserInfoDto.createEmpty();
  public userInfoId: number;

  constructor(private route: ActivatedRoute,
              private router: Router,
              public rest: UserInfoDtoRestService) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      if (params["id"] == null) {
        this.userInfo = UserInfoDto.createEmpty();
        this.userInfoId = this.userInfo.id;
      } else {
        this.rest.get(+params["id"])
          .subscribe(
            t => {
              this.userInfo = UserInfoDto.createUserInfoWithId(t.id, t);
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
      this.rest.add(new UserInfoDto(this.userInfo))
        .subscribe(
          (result) => this.router.navigate([".."], {relativeTo: this.route}),
          (err) => console.error(`could not save userInfo: ${this.userInfo.id} with Error: ${err}`)
        );
    } else {
      this.rest.update(UserInfoDto.createUserInfoWithId(this.userInfoId, this.userInfo))
        .subscribe(
          (result) => this.router.navigate([".."], {relativeTo: this.route}),
          (err) => console.error(`could not update userInfo: ${this.userInfo.id} with Error: ${err}`));
    }
  }
}
