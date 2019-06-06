import {HttpClient} from "@angular/common/http";
import {Inject, Injectable} from "@angular/core";
import {ArticleCheckOutDto} from "citrus-common";
import {GenericRestService} from "../../table-support/generic-rest.service";

@Injectable({
  providedIn: "root"
})
export class ArticleCheckoutWithAllDtoRestService extends GenericRestService<ArticleCheckOutDto> {
  constructor(http: HttpClient, @Inject("baseUrl") baseUrl: string) {
    super(http, baseUrl + "/articleCheckOut/withAll");
  }
}
