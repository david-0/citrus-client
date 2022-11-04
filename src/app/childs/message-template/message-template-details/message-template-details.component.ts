import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MessageTemplateDto } from 'citrus-common';
import { Subscription } from 'rxjs';
import { MessageTemplateDtoRestService } from '../message-template-dto-rest.service';

@Component({
  selector: 'app-message-template-details',
  templateUrl: './message-template-details.component.html',
  styleUrls: ['./message-template-details.component.scss']
})
export class MessageTemplateDetailsComponent implements OnInit {
  private _messageTemplate: MessageTemplateDto = MessageTemplateDto.createEmpty();
  private subscription: Subscription;


  constructor(private route: ActivatedRoute, private rest: MessageTemplateDtoRestService) {
  }

  public get messageTemplate(): MessageTemplateDto {
    return this._messageTemplate;
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const messageTemplatePromise = this.rest.get(+params["id"]);
      this.subscription = messageTemplatePromise.subscribe((messageTemplate) => {
        this._messageTemplate = messageTemplate;
      });
    });
  }
}

