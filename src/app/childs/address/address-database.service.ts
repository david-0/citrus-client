import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {AddressDto} from "citrus-common";
import {AddressCacheAdapterService} from "../../cache/adapter/address-cache-adapter.service";
import {InMemoryDatabaseService} from "../../in-memory-db/in-memory-database.service";
import {GenericDatabaseBackend} from "../../table-support/generic-database-backend";
import {GenericRestService} from "../../table-support/generic-rest.service";

@Injectable()
export class AddressDatabaseService extends GenericDatabaseBackend<AddressDto> {

  constructor(http: HttpClient,
              addressCacheAdapter: AddressCacheAdapterService,
              inMemoryDb: InMemoryDatabaseService) {
    super(new GenericRestService(http, "http://localhost:3001/api/address"),
      addressCacheAdapter, inMemoryDb,
      ["name", "prename", "street", "number", "addition", "zipcode", "city"],
      [], ["User"]);
  }
}
