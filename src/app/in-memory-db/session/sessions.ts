import {Observable} from "rxjs/Observable";
import {CModel} from "../model/c/c-model";
import {IRequest} from "../request/i-request";
import {Session} from "./session";

export class Sessions {
  private sessions = new Map<string, Session<any>>();

  /**
   * Is this request already in the sessions available?
   * @param {Request<T extends CModel>} request
   * @returns {boolean}
   */
  public has<T extends CModel>(request: IRequest<T>): boolean {
    return this.sessions.has(request.toString());
  }

  /**
   * Get the session with these request
   * @param {Request<C extends CModel>} request
   * @returns {Session<C extends CModel>}
   */
  public get<C extends CModel>(request: IRequest<C>): Session<C> {
    return this.sessions.get(request.toString());
  }

  /**
   * Returns all Sessions of the requested type
   * @param {typeof CModel} type
   * @returns {Session<C extends CModel>[]}
   */
  private getSessionsOfType<C extends CModel>(type: typeof CModel): Session<C>[] {
    return Array.from(this.sessions.values())
      .filter(s => s.request.type === type)
      .sort(s => s.isLoaded() ? 1 : 0);
  }

  /**
   * Returns the first "parent" session or undefined if no such session is available
   * TODO: Merge the requests together
   * @param {Request<C extends CModel>} request
   * @returns {Session<C extends CModel> | undefined}
   */
  public getParentSession<C extends CModel>(request: IRequest<C>): Session<C> | undefined {
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
  public areRequestedItemsLoaded<C extends CModel>(request: IRequest<C>): Observable<boolean> {
    const type = request.type;
    const sessions = this.getSessionsOfType(type);
    return Observable.from(sessions)
      .flatMap(s => s.areAllLoaded())
      .reduce((acc, curr) => acc || curr, false);
  }

  public add<T extends CModel>(session: Session<T>): void {
    this.sessions.set(session.request.toString(), session);
  }
}
