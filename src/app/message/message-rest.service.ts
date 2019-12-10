import {HttpClient} from "@angular/common/http";
import {Inject, Injectable} from "@angular/core";
import {MessageDto} from "citrus-common";
import {GenericAddWithDifferentReturnService} from "../table-support/generic-add-with-different-return.service";

@Injectable({
  providedIn: "root"
})
export class MessageRestService extends GenericAddWithDifferentReturnService<MessageDto, MessageDto> {
  constructor(http: HttpClient, @Inject("baseUrl") baseUrl: string) {
    super(http, baseUrl + "/message");
  }
}

