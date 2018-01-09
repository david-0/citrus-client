import {Injectable} from "@angular/core";
import {Observable} from "rxjs/Observable";
import {ReplaySubject} from "rxjs/ReplaySubject";
import {Caches} from "./cache/caches";
import {TypeCache} from "./cache/type-cache";
import {CAddress} from "./model/c/c-address";
import {CModel} from "./model/c/c-model";
import {CUser} from "./model/c/c-user";
import {TModel} from "./model/t/t-id";
import {AbstractProjector} from "./projector/abstract-projector";
import {AddressProjector} from "./projector/address-projector";
import {Projectors} from "./projector/projectors";
import {UserProjector} from "./projector/user-projector";
import {Request} from "./request/request";
import {RangeResult} from "./rest/range-result";
import {Session} from "./session/session";
import {Sessions} from "./session/sessions";
import {RequestService} from "./websocket/request.service";

@Injectable()
export class InMemoryDatabaseService {

  private caches = new Caches();
  private activeSessions = new Sessions();
  private projectors = new Projectors();

  constructor(private requestService: RequestService) {
    this.caches.addCache(CAddress, new TypeCache());
    this.caches.addCache(CUser, new TypeCache());
    this.projectors.add(CAddress, new AddressProjector(this.caches, this.projectors));
    this.projectors.add(CUser, new UserProjector(this.caches, this.projectors));
  }

  public get<C extends CModel, T extends TModel>(cRequest: Request<C>): Observable<C[]> {
    if (!this.activeSessions.has(cRequest)) {
      const subject = new ReplaySubject<C[]>();
      const parentSession = this.activeSessions.getParentSession(cRequest);
      if (parentSession) {
        parentSession.subject.subscribe(cItems => {
          subject.next(cItems.filter(cItem => cRequest.matchId(cItem.id)));
        });
      } else {
        this.requestService.get(cRequest).subscribe((rangeResult: RangeResult<T>) => {
          const projector: AbstractProjector<C, T> = this.projectors.get(cRequest.type);
          subject.next(projector.projectManyAndUpdateCache(rangeResult.rows));
        });
      }
      this.activeSessions.add(new Session(cRequest, subject));
      return subject.asObservable();
    }
    return this.activeSessions.get(cRequest).subject.asObservable();
  }
}
