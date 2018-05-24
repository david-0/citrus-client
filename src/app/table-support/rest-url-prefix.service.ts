import {Injectable} from "@angular/core";

@Injectable()
export class RestUrlPrefixService {

  public getRestPrefix(): string {
    return "http://localhost:3001/api";
  }
}
