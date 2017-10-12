import {Injectable} from '@angular/core';
import {ITransport} from '../../entities/ITransport';
import {HttpClient} from '@angular/common/http';
import {GenericRestService} from '../../table-support/generic-rest.service';
import {RestBackendDatabase} from '../../table-support/rest-backend-database';

@Injectable()
export class TransportDatabaseService extends RestBackendDatabase<ITransport> {

  constructor(http: HttpClient) {
    super(new GenericRestService(http, 'http://localhost:3001/api/transport'));
  }
}
