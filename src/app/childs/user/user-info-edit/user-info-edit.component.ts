import {Component, OnInit} from "@angular/core";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {UserInfoDto} from "citrus-common";
import {RoleDto} from "citrus-common/lib/dto/role-dto";
import "rxjs/add/operator/zip";
import {Observable} from "rxjs/Rx";
import {RoleDtoRestService} from "../role-dto-rest.service";
import {UserInfoWithRolesDtoRestService} from "../user-info-with-roles-dto-rest.service";

@Component({
  selector: "app-user-info-edit",
  templateUrl: "./user-info-edit.component.html",
  styleUrls: ["./user-info-edit.component.scss"]
})
export class UserInfoEditComponent implements OnInit {

  public userInfo: UserInfoDto = UserInfoDto.createEmpty();
  private _roles: {role: RoleDto, checked: boolean}[] = [];
  public userInfoId: number;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private rest: UserInfoWithRolesDtoRestService,
              private roleRest: RoleDtoRestService) {
  }

  public get rolePairs(): {role: RoleDto, checked: boolean}[] {
    return this._roles;
  }

  ngOnInit() {
    const roles$ = this.roleRest.getAll();
    Observable.zip(roles$, this.route.params, (roles: RoleDto[], params: Params) => ({
      params,
      roles
    })).subscribe((result) => {
      if (result.params["id"] == null) {
        this._roles = this.createRolePairs(result.roles, []);
        this.userInfo = UserInfoDto.createEmpty();
        this.userInfoId = this.userInfo.id;
      } else {
        this.rest.get(+result.params["id"]).subscribe(
          t => {
            this.userInfo = UserInfoDto.createWithId(t.id, t);
            this.userInfoId = this.userInfo.id;
            this._roles = this.createRolePairs(result.roles, t.roles);
          },
          err => {
            console.log(`Could not get address with id ${result.params["id"]} with error: ${err}`);
          });
      }
    });
  }

  private createRolePairs(rolesAvailable: RoleDto[], userRoles: RoleDto[]): {role: RoleDto, checked: boolean}[] {
    return rolesAvailable.map(r => ({role: r, checked: this.containsRole(userRoles, r)}));
  }

  private containsRole(roles: RoleDto[], roleToFind: RoleDto): boolean {
    return roles.findIndex(role => role.id === roleToFind.id) >= 0;
  }

  private getSelectedRoles(rolePairs: {role: RoleDto, checked: boolean}[]): RoleDto[] {
    return rolePairs.filter(rp => rp.checked).map(rp => rp.role);
  }

  public submit() {
    this.userInfo.roles = this.getSelectedRoles(this.rolePairs);
    if (this.userInfoId == null) {
      this.rest.add(new UserInfoDto(this.userInfo))
        .subscribe(
          (result) => this.router.navigate([".."], {relativeTo: this.route}),
          (err) => console.error(`could not save userInfo: ${this.userInfo.id} with Error: ${err}`)
        );
    } else {
      this.rest.update(UserInfoDto.createWithId(this.userInfoId, this.userInfo))
        .subscribe(
          (result) => this.router.navigate([".."], {relativeTo: this.route}),
          (err) => console.error(`could not update userInfo: ${this.userInfo.id} with Error: ${err.error}`));
    }
  }
}
