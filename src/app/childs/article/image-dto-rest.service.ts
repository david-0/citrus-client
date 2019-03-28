import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {ArticleDto} from "citrus-common";
import {ImageDto} from "citrus-common/lib/dto/image-dto";
import {GenericRestService} from "../../table-support/generic-rest.service";
import {RestUrlPrefixService} from "../../table-support/rest-url-prefix.service";

@Injectable()
export class ImageDtoRestService extends GenericRestService<ImageDto> {
  constructor(http: HttpClient, private restUrlPrefix: RestUrlPrefixService) {
    super(http, restUrlPrefix.getApiRestPrefix() + "/image");
  }
}
