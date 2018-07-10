import {Component, OnInit} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {RoleDto} from "citrus-common/lib/dto/role-dto";
import {Subscription} from "rxjs/Subscription";
import {RoleWithUsersDtoRestService} from "../role-with-users-dto-rest.service";

@Component({
  selector: "app-role-detail",
  templateUrl: "./role-detail.component.html",
  styleUrls: ["./role-detail.component.scss"]
})
export class RoleDetailComponent implements OnInit {
  private _role: RoleDto = RoleDto.createEmpty();
  private subscription: Subscription;


  constructor(private route: ActivatedRoute, private rest: RoleWithUsersDtoRestService) {
  }

  public get role(): RoleDto {
    return this._role;
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const rolePromise = this.rest.get(+params["id"]);
      this.subscription = rolePromise.subscribe((role) => {
        this._role = role;
      });
    });
  }


}
