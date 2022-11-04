import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageTemplateDto } from 'citrus-common';
import { MessageTemplateDtoRestService } from '../message-template-dto-rest.service';

@Component({
  selector: 'app-message-template-edit',
  templateUrl: './message-template-edit.component.html',
  styleUrls: ['./message-template-edit.component.scss']
})
export class MessageTemplateEditComponent implements OnInit {

  public messageTemplateDto: MessageTemplateDto = MessageTemplateDto.createEmpty();
  public messageTemplateDtoId: number;

  constructor(private route: ActivatedRoute,
              private router: Router,
              public rest: MessageTemplateDtoRestService) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      if (params["id"] == null) {
        this.messageTemplateDto = MessageTemplateDto.createEmpty();
        this.messageTemplateDtoId = this.messageTemplateDto.id;
      } else {
        this.rest.get(+params["id"])
          .subscribe(
            t => {
              this.messageTemplateDto = MessageTemplateDto.createWithId(t.id, t);
              this.messageTemplateDtoId = this.messageTemplateDto.id;
            },
            err => {
              console.log(`Could not get messageTemplate with id ${params["id"]} with error: ${err}`);
            });
      }
    });
  }

  public submit() {
    if (this.messageTemplateDtoId == null) {
      this.rest.add(new MessageTemplateDto(this.messageTemplateDto))
        .subscribe(
          (result) => this.router.navigate([".."], {relativeTo: this.route}),
          (err) => console.error(`could not save messageTemplate: ${this.messageTemplateDto.id} with Error: ${err}`)
        );
    } else {
      this.rest.update(MessageTemplateDto.createWithId(this.messageTemplateDtoId, this.messageTemplateDto))
        .subscribe(
          (result) => this.router.navigate([".."], {relativeTo: this.route}),
          (err) => console.error(`could not update messageTemplate: ${this.messageTemplateDto.id} with Error: ${err}`));
    }
  }
}
