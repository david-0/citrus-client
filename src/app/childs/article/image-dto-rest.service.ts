import {HttpClient} from "@angular/common/http";
import {Inject, Injectable} from "@angular/core";
import {ImageDto} from "citrus-common/lib/dto/image-dto";
import {GenericRestService} from "../../table-support/generic-rest.service";

@Injectable()
export class ImageDtoRestService extends GenericRestService<ImageDto> {
  constructor(http: HttpClient, @Inject("baseUrl") baseUrl: string) {
    super(http, baseUrl + "/image");
  }
}
