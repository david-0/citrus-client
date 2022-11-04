import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MessageTemplateDto } from 'citrus-common';
import { DeleteExecutor } from '../../../base/delete-executor';
import { MessageTemplateDtoRestService } from '../message-template-dto-rest.service';

@Component({
  selector: 'app-message-template-delete',
  templateUrl: './message-template-delete.component.html',
  styleUrls: ['./message-template-delete.component.scss']
})
export class MessageTemplateDeleteComponent implements  OnInit{

  public deleteExecutor: DeleteExecutor<MessageTemplateDto>;

  constructor(private route: ActivatedRoute,
              private rest: MessageTemplateDtoRestService) {
  }

  ngOnInit() {
    this.deleteExecutor = new DeleteExecutor<MessageTemplateDto>(this.route, this.rest, "Die Email Vorlage");
    this.deleteExecutor.initDelete();
  }
}

