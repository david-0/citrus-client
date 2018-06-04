import {Injectable} from "@angular/core";

@Injectable()
export class RestUrlPrefixService {

  public getApiRestPrefix(): string {
    return this.getPublicRestPrefix() + "/api";
  }

  public getPublicRestPrefix(): string {
    return "http://localhost:3001";
  }
}
