import {IRequest} from "citrus-common";
import {Observable} from "rxjs/Observable";
import {ReplaySubject} from "rxjs/ReplaySubject";
import {CModel} from "../model/c/c-model";

export class Session {
  private lastValues: any[] = undefined;
  private lastValuesIdIndex: Set<number> = new Set<number>();
  private _subject = new ReplaySubject<any[]>();

  constructor(private _request: IRequest, private inputSubject: ReplaySubject<any[]>) {
    this.inputSubject.subscribe(values => {
        this.lastValues = values;
        this.lastValuesIdIndex = new Set<number>(values.map(v => v.id));
        this._subject.next(values);
      },
      err => this._subject.error(err),
      () => this._subject.complete());
  }

  /**
   * Returns the Request of this session.
   * @returns {Request<T extends CModel>}
   */
  public get request(): IRequest {
    return this._request;
  }

  /**
   * Returns the subject with the last result, the subject may not already have a value.
   * @returns {ReplaySubject<T[]>}
   */
  public get subject(): ReplaySubject<any[]> {
    return this._subject;
  }

  /**
   * Has the request the same type as this sessions request?
   * @param {Request<T extends CModel>} request
   * @returns {boolean}
   */
  public hasSameType(request: IRequest): boolean {
    return this._request.typeName === request.typeName;
  }

  /**
   * Is this session currently loaded
   * @returns {boolean}
   */
  public isLoaded(): boolean {
    return this.lastValues !== undefined;
  }

  public waitLoaded(): Observable<boolean> {
    return Observable.create(observer => {
      const subscrition = this._subject.subscribe(items => {
          observer.next(true);
          observer.complete();
          subscrition.unsubscribe();
        },
        err => {
          observer.error(err);
          subscrition.unsubscribe();
        },
        () => {
          observer.complete();
          subscrition.unsubscribe();
        });
    });
  }

  /**
   * This methode returns an observable, with one value (true) if this session has all items of the request-type loaded.
   * Otherwise, with the value false. Then the observer is completed.
   * @returns {Observable<boolean>}
   */
  public areAllLoaded(): Observable<boolean> {
    if (!this._request.hasCondition()) {
      return this.waitLoaded();
    }
    return Observable.create(observer =>
      observer.next(false));
  }
}
