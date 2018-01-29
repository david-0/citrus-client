import {Injectable} from "@angular/core";
import {Observable} from "rxjs/Observable";
import {ReplaySubject} from "rxjs/ReplaySubject";
import {CacheService} from "./cache/cache-service";
import {AbstractProjector} from "./projector/abstract-projector";
import {ProjectorService} from "./projector/projector.service";
import {Request} from "./request/request";
import {Session} from "./session/session";
import {Sessions} from "./session/sessions";
import {RequestService} from "./websocket/request.service";

@Injectable()
export class InMemoryDatabaseService {

  private activeSessions = new Sessions();

  constructor(private cacheService: CacheService,
              private projectorService: ProjectorService,
              private requestService: RequestService) {
  }

  private getMatchesFromSession(session: Session, cRequest: Request): Observable<any[]> {
    return session.subject.map(items => items.filter(item => cRequest.matchId(item.id)));
  }

  private getItemsFromRequestService(cRequest: Request): Observable<any[]> {
    return this.requestService.get(cRequest).map(rangeResult => {
      const projector: AbstractProjector = this.projectorService.get(cRequest.typeName);
      return projector.projectManyAndUpdateCache(rangeResult.rows);
    });
  }

  private createNewActiveSession(cRequest: Request, observable: Observable<any[]>): Observable<any[]> {
    const replaySubject = ReplaySubject.create(new ReplaySubject(), observable);
    this.activeSessions.add(new Session(cRequest, replaySubject));
    return replaySubject.asObservable();
  }

  public get(cRequest: Request): Observable<any[]> {
    if (!this.activeSessions.has(cRequest)) {
      const sessions = this.activeSessions.getSessionOfType(cRequest);
      return sessions.first(session => true,
        session => this.getMatchesFromSession(session, cRequest),
        this.createNewActiveSession(cRequest, this.getItemsFromRequestService(cRequest))
      ).flatMap(result => result);
    }
    return this.activeSessions.get(cRequest).subject.asObservable();
  }
}
