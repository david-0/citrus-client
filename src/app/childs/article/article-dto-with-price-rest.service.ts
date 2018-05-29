import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {ArticleDto} from "citrus-common";
import {GenericRestService} from "../../table-support/generic-rest.service";
import {RestUrlPrefixService} from "../../table-support/rest-url-prefix.service";

@Injectable()
export class ArticleDtoWithPriceRestService extends GenericRestService<ArticleDto> {
  constructor(http: HttpClient, private restUrlPrefix: RestUrlPrefixService) {
    super(http, restUrlPrefix.getRestPrefix() + "/articleWithPrices");
  }
}
