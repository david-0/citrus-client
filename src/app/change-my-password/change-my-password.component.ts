import {Component, OnInit} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthenticationService} from "../authentication/authentication.service";

@Component({
  selector: "app-change-my-password",
  templateUrl: "./change-my-password.component.html",
  styleUrls: ["./change-my-password.component.scss"]
})
export class ChangeMyPasswordComponent implements OnInit {

  url: string;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private authService: AuthenticationService) {
  }

  ngOnInit() {
    /*    this.route.params.subscribe(params => {
          if (params["id"] == null) {
            console.error(`Internal server error, no id param`);
          } else {
            this.userInfoId = +params["id"];
          }
        });*/
  }

  changeMyPassword(event: any) {
    this.authService.changeMyPassword(event.currentPassword, event.newPassword).subscribe(successfully => {
      if (successfully) {
        this.router.navigate([`/administration`]);
      } else {
        console.error("Password change failed");
      }
    });
  }

}
