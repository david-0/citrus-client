import {Injectable} from '@angular/core';
import {FruitTO} from '../../TransferObjects/FruitTO';
import {IFruit} from '../../entities/IFruit';
import {RestBackendDatabase} from '../../table-support/rest-backend-database';
import {GenericRestService} from '../../table-support/generic-rest.service';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class FruitDatabaseService extends RestBackendDatabase<IFruit> {

  constructor(http: HttpClient) {
    super(new GenericRestService(http, 'http://localhost:3001/api/fruit'));
  }

  public static getFruits(): IFruit[] {
    const f1 = FruitTO.createFruitWithId(1, 'Orangen');
    const f2 = FruitTO.createFruitWithId(2, 'Grapefruit rot');
    const f3 = FruitTO.createFruitWithId(3, 'Grapefruit gelb');
    const f4 = FruitTO.createFruitWithId(4, 'Zitronen');
    const f5 = FruitTO.createFruitWithId(5, 'Mandarinen');
    const f6 = FruitTO.createFruitWithId(6, 'Avokado');
    return [f1, f2, f3, f4, f5, f6];
  }
}
