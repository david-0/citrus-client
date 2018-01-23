import {IRequest} from "citrus-common";
import {Observable} from "rxjs/Observable";
import {ReplaySubject} from "rxjs/ReplaySubject";
import {CModel} from "../model/c/c-model";

export class Session {
  private lastValues: any[] = undefined;
  private lastValuesIdIndex: Set<number> = new Set<number>();
  public readonly subject = new ReplaySubject<any[]>();

  constructor(public readonly request: IRequest, private inputSubject: ReplaySubject<any[]>) {
    this.inputSubject.subscribe(values => {
        this.lastValues = values;
        this.lastValuesIdIndex = new Set<number>(values.map(v => v.id));
        this.subject.next(values);
      },
      err => this.subject.error(err),
      () => this.subject.complete());
  }

  /**
   * Has the request the same type as this sessions request?
   * @param {Request<T extends CModel>} request
   * @returns {boolean}
   */
  public hasSameType(request: IRequest): boolean {
    return this.request.typeName === request.typeName;
  }

  /**
   * Is this session currently loaded
   * @returns {boolean}
   */
  public isLoaded(): boolean {
    return this.lastValues !== undefined;
  }

  private waitLoaded(): Observable<boolean> {
    let loaded = false;
    let observerCompleted = false;
    return Observable.create(observer => {
      const subscrition = this.subject.subscribe(items => {
          loaded = true;
          observer.next(true);
          observer.complete();
          observerCompleted = true;
          if (subscrition) {
            subscrition.unsubscribe();
          }
        },
        err => {
          observer.error(err);
          observerCompleted = true;
          if (subscrition) {
            subscrition.unsubscribe();
          }
        },
        () => {
          if (!loaded) {
            observer.next(false);
          }
          observer.complete();
          observerCompleted = true;
          if (subscrition) {
            subscrition.unsubscribe();
          }
        });
      if (observerCompleted) {
        subscrition.unsubscribe();
      }
    });
  }

  /**
   * This methode returns an observable, with one value (true) if this session
   * has all items of the request-type loaded.
   * Otherwise, with the value false. Then the observer is completed.
   * @returns {Observable<boolean>}
   */
  public areAllLoaded(): Observable<boolean> {
    if (this.request.condition) {
      return Observable.create(observer => {
        observer.next(false);
        observer.complete();
      });
    }
    return this.waitLoaded();
  }
}
