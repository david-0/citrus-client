import {Component, OnInit} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {MessageDto, UserDto} from "citrus-common";
import {UserWithAllDtoRestService} from "../../childs/user/user-with-all-dto-rest.service";
import {MessageRestService} from "../message-rest.service";

@Component({
  selector: "app-send-email-to-all",
  templateUrl: "./send-email-to-all.component.html",
  styleUrls: ["./send-email-to-all.component.scss"]
})
export class SendEmailToAllComponent implements OnInit {
  public messageDto: MessageDto = new MessageDto("", "", []);
  private _userPairs: Array<{ user: UserDto, checked: boolean }> = [];
  public sendResult = "";

  constructor(private route: ActivatedRoute,
              private router: Router,
              private rest: UserWithAllDtoRestService,
              private messageService: MessageRestService) {
    this.reset();
  }

  public reset() {
    this.messageDto = new MessageDto("", "", []);
    this._userPairs = this._userPairs.map(p => ({user: p.user, checked: false}));
    this.sendResult = "";
  }

  ngOnInit() {
    this.rest.getAll().subscribe(users => {
      this._userPairs = users.map(u => ({user: u, checked: false})).sort((a, b) =>
        (a.user.name + a.user.prename + a.user.email).localeCompare(b.user.name + b.user.prename + b.user.email));
      ;
    });
  }

  public get userPairs(): { user: UserDto, checked: boolean }[] {
    return this._userPairs;
  }

  public async submit() {
    this.messageDto.receivers = this._userPairs.filter(p => p.checked).map(p => p.user);
    this.messageService.add(this.messageDto).subscribe(message => {
      this.sendResult = message.responses;
    });
  }

  public selectAll() {
    this._userPairs.map(p => p.checked = true);
  }

  public selectNone() {
    this._userPairs.map(p => p.checked = false);
  }
}
