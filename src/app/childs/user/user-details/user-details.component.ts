import {Component, OnInit} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {OrderDto, RoleDto, UserDto} from "citrus-common";
import {BehaviorSubject, Subscription} from "rxjs";
import {UserWithRolesDtoRestService} from "../user-with-roles-dto-rest.service";

@Component({
  selector: "app-user-details",
  templateUrl: "./user-details.component.html",
  styleUrls: ["./user-details.component.scss"]
})
export class UserInfoDetailsComponent implements OnInit {
  public displayedColumns = ["description", "name", "prename", "street", "number", "addition", "zipcode", "city"];

  public user = new BehaviorSubject<UserDto>(UserDto.createEmpty());
  public roles = new BehaviorSubject<string>("");

  constructor(private route: ActivatedRoute, private rest: UserWithRolesDtoRestService) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const userPromise = this.rest.get(+params["id"]);
      userPromise.subscribe((user) => {
        this.user.next(user);      
        this.roles.next(this.extractRoleNames(user));
      });
    });
  }

  private extractRoleNames(user: UserDto): string {
    if (!!user.roles && user.roles.length > 0) {
      return user.roles
        .map((u) => u.name)
        .reduce((u1, u2) => u1 + ", " + u2);
    }
    return "";
  }

}
