import {IRequest} from "citrus-common";
import "rxjs/add/operator/reduce";
import {Observable} from "rxjs/Observable";
import {FromObservable} from "rxjs/observable/FromObservable";
import {CModel} from "../model/c/c-model";
import {Session} from "./session";

export class Sessions {
  private sessions = new Map<string, Session>();

  /**
   * Is this request already in the sessions available?
   * @param {Request<T extends CModel>} request
   * @returns {boolean}
   */
  public has(request: IRequest): boolean {
    return this.sessions.has(request.toString());
  }

  /**
   * Get the session with these request
   * @param {Request<C extends CModel>} request
   * @returns {Session<C extends CModel>}
   */
  public get<C extends CModel>(request: IRequest): Session {
    return this.sessions.get(request.toString());
  }

  /**anonymous
   * Returns all Sessions of the requested type
   * @param {typeof CModel} type
   * @returns {Session<C extends CModel>[]}
   */
  getSessionsOfType(typeName: string): Session[] {
    return Array.from(this.sessions.values())
      .filter(s => s.request.typeName === typeName)
      .sort(s => s.isLoaded() ? 0 : 1);
  }

  /**
   * Returns the first "parent" session or undefined if no such session is available
   * TODO: Merge the requests together
   * @param {Request<C extends CModel>} request
   * @returns {Session<C extends CModel> | undefined}
   */
  public getParentSession(request: IRequest): Session | undefined {
    const parentSessions = Array.from(this.sessions.values())
      .filter(session => session.request.isSubRequest(request));
    if (parentSessions.length > 0) {
      return parentSessions[0];
    }
    return undefined;
  }

  /**
   * Call next(true) of the returned observable, when all items of this type are loaded,
   * if not all items are loaded, the next value is false.
   * @param {typeof CModel} type
   * @returns {Observable<boolean>}
   */
  public areRequestedItemsLoaded(request: IRequest): Observable<boolean> {
    const type = request.typeName;
    const sessions = this.getSessionsOfType(type);
    return FromObservable.create<Session, Session>(sessions)
      .flatMap(s => s.areAllLoaded())
      .reduce((b1, b2) => b1 || b2, false);
  }

  public add<T extends CModel>(session: Session): void {
    this.sessions.set(session.request.toString(), session);
  }
}
