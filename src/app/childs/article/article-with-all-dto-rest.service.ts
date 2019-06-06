import {HttpClient} from "@angular/common/http";
import {Inject, Injectable} from "@angular/core";
import {ArticleDto} from "citrus-common";
import {GenericRestService} from "../../table-support/generic-rest.service";

@Injectable({
  providedIn: "root"
})
export class ArticleWithAllDtoRestService extends GenericRestService<ArticleDto> {
  constructor(http: HttpClient, @Inject("baseUrl") baseUrl: string) {
    super(http, baseUrl + "/article/withAll");
  }
}
