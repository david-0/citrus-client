import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {IAddress} from "citrus-common";
import {GenericRestService} from "../../table-support/generic-rest.service";
import {RestBackendDatabase} from "../../table-support/rest-backend-database";

@Injectable()
export class AddressRestDatabaseService extends RestBackendDatabase<IAddress> {

  constructor(http: HttpClient) {
    super(new GenericRestService(http, "http://localhost:3001/api/address",
      ["description", "name", "prename", "street", "number", "zipcode", "city", "addition"],
      ["User"], ["User"]));
  }
}
