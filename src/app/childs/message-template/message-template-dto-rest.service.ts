import { HttpClient } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { MessageTemplateDto } from "citrus-common";
import { GenericRestService } from "../../table-support/generic-rest.service";

@Injectable()
export class MessageTemplateDtoRestService extends GenericRestService<MessageTemplateDto> {
  constructor(http: HttpClient, @Inject("baseUrl") baseUrl: string) {
    super(http, baseUrl + "/messageTemplate");
  }
}
