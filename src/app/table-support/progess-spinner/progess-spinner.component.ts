import {Component, Input, OnDestroy, OnInit} from "@angular/core";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {Observable} from "rxjs/Observable";
import {Subscription} from "rxjs/Subscription";

@Component({
  selector: "app-progess-spinner",
  templateUrl: "./progess-spinner.component.html",
  styleUrls: ["./progess-spinner.component.scss"]
})
export class ProgessSpinnerComponent implements OnInit, OnDestroy {
  @Input() public loading: BehaviorSubject<boolean>;
  @Input() public delayInMs: number;
  @Input() public minShowInMs: number;
  public showSpinner: Observable<boolean>;
  private delaySubject = new BehaviorSubject<boolean>(false);
  private minShowSubject = new BehaviorSubject<boolean>(false);
  private delayTimeout: any;
  private minShowTimeout: any;
  private subscription: Subscription;

  constructor() {
  }

  ngOnInit() {
    this.subscription = this.loading.subscribe(value => {
      if (value) {
        this.clearState();
        this.delayTimeout = setTimeout(() => {
          this.delaySubject.next(true);
          this.minShowSubject.next(true);
          this.minShowTimeout = setTimeout(() => {
            this.minShowSubject.next(false);
          }, this.minShowInMs);
        }, this.delayInMs);
      } else {
        if (!this.delaySubject.getValue()) {
          clearTimeout(this.delayTimeout);
        }
        this.delaySubject.next(false);
      }
    });
    this.showSpinner = Observable.merge(this.delaySubject, this.minShowSubject).mergeMap(() => {
      return Observable.create(observer => {
        const value = this.delaySubject.getValue() || this.minShowSubject.getValue();
        observer.next(value);
      });
    });
  }

  private clearState() {
    clearTimeout(this.delayTimeout);
    clearTimeout(this.minShowTimeout);
    if (this.delaySubject.getValue()) {
      this.delaySubject.next(false);
    }
    if (this.minShowSubject.getValue()) {
      this.minShowSubject.next(false);
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
