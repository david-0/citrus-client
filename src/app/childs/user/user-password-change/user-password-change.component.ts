import {Component, OnInit} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthenticationService} from "../../../authentication/authentication.service";

@Component({
  selector: "app-user-password-change",
  templateUrl: "./user-password-change.component.html",
  styleUrls: ["./user-password-change.component.scss"]
})
export class UserPasswordChangeComponent implements OnInit {

  userInfoId: number;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private authService: AuthenticationService) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      if (params["id"] == null) {
        console.error(`Internal server error, no id param`);
      } else {
        this.userInfoId = +params["id"];
      }
    });
  }

  passwordChange(password: string) {
    this.authService.changePassword(this.userInfoId, password).subscribe(successfully => {
      if (successfully) {
        this.router.navigate([`/administration/user/${this.userInfoId}`]);
      } else {
        console.error("Passwort change failed");
      }
    });
  }
}
