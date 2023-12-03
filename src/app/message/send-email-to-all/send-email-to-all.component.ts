import {Component, OnInit} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {MessageDto, MessageTemplateDto, UserDto} from "citrus-common";
import { BehaviorSubject, last } from "rxjs";
import { MessageTemplateDtoRestService } from "../../childs/message-template/message-template-dto-rest.service";
import {UserWithAllDtoRestService} from "../../childs/user/user-with-all-dto-rest.service";
import {MessageRestService} from "../message-rest.service";

@Component({
  selector: "app-send-email-to-all",
  templateUrl: "./send-email-to-all.component.html",
  styleUrls: ["./send-email-to-all.component.scss"]
})
export class SendEmailToAllComponent implements OnInit {
  private _userPairs: Array<{ user: UserDto, checked: boolean }> = [];
  private templates: BehaviorSubject<MessageTemplateDto[]> = new BehaviorSubject([]);
  public messageDto: MessageDto = new MessageDto("", "", []);
  public selectedTemplate = MessageTemplateDto.createEmpty();
  public sendResult = "";

  constructor(private route: ActivatedRoute,
              private router: Router,
              private rest: UserWithAllDtoRestService,
              private messageTemplateRest: MessageTemplateDtoRestService,
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
    this.messageTemplateRest.getAll().subscribe(templaes => {
      this.templates.next(templaes);
    })
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

  public selectGroup(numberOfGroups: number, currentGroup: number) {
    const roundedGroupSize = Math.round(this._userPairs.length / numberOfGroups);
    const firstOfGroup = roundedGroupSize * currentGroup;
    let lastOfGroup;
    if (currentGroup < numberOfGroups -1) {
      lastOfGroup = firstOfGroup + roundedGroupSize;
    } else {
      lastOfGroup = this._userPairs.length;
    }
    this._userPairs.slice(firstOfGroup, lastOfGroup).map(p => p.checked = true);
  }

  public selectGroup1() {
    const firstOfGroup = 0;
    this._userPairs.length / 5;
    this._userPairs.map(p => p.checked = false);
  }


  public getTemplates(): BehaviorSubject<MessageTemplateDto[]> {
    return this.templates;
  }

  public selectionChanged() {
    this.messageDto.subject = this.selectedTemplate.subject;
    this.messageDto.content = this.selectedTemplate.content;
    this.selectedTemplate = MessageTemplateDto.createEmpty();
  }
}
