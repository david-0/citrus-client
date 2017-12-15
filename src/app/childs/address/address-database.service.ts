import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {IAddress} from "citrus-common";
import {GenericDatabaseBackend} from "../../table-support/generic-database-backend";
import {GenericRestService} from "../../table-support/generic-rest.service";
import {AddressCacheAdapterService} from "../../cache/adapter/address-cache-adapter.service";

@Injectable()
export class AddressDatabaseService extends GenericDatabaseBackend<IAddress> {

  constructor(http: HttpClient, addressCacheAdapter: AddressCacheAdapterService) {
    super(new GenericRestService(http, "http://localhost:3001/api/address"),
      addressCacheAdapter,
      ["name", "prename", "street", "number", "addition", "zipcode", "city"],
      [], ["User"]);
  }
}
