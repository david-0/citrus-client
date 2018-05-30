/* tslint:disable:component-selector */
import {Component, Injectable, Input} from "@angular/core";
import {NgForm} from "@angular/forms";
import {NavigationExtras} from "@angular/router/src/router";
import {UnitOfMeasurementDto} from "citrus-common";
import {Observable} from "rxjs/Observable";

@Component({
  selector: "app-table-header",
  template: "",
})
export class MockTableHeaderComponent {
  @Input() titleText: string;
  @Input() backLink: string;
  @Input() showBack: boolean;
  @Input() showCreate: boolean;
  @Input() showEdit: boolean;
  @Input() showDelete: boolean;
  @Input() showCancelAndSave: boolean;
  @Input() showPasswordChange: boolean;
  @Input() label: string;
  @Input() form: NgForm;
}

@Injectable()
export class RouterSpy {
  public navigate(commands: any[], extras?: NavigationExtras): Promise<boolean> {
    return null;
  }
}

@Injectable()
export class UnitOfMeasurementDtoRestServiceSpy {
  add(item: UnitOfMeasurementDto): Observable<UnitOfMeasurementDto> {
    return Observable.create(observer => {
      observer.next({
        id: item.id,
        shortcut: item.shortcut,
        description: item.description,
        articleIds: item.articleIds,
      });
    });
  }

  update(item: UnitOfMeasurementDto): Observable<boolean> {
    return Observable.create(observer => {
      observer.next(true);
    });
  }

  del(id: number): Observable<boolean> {
    return Observable.create(observer => {
      observer.next(true);
    });
  }

  getAll(): Observable<UnitOfMeasurementDto[]> {
    return Observable.create(observer => {
      observer.next([
        {
          id: 1,
          shortcut: "kg",
          description: "Kilogramm",
          articleIds: [],
        },
        {
          id: 2,
          shortcut: "g",
          description: "Gramm",
          articleIds: [],
        }]);
    });
  }

  get(id: number): Observable<UnitOfMeasurementDto> {
    return Observable.create(observer => {
      observer.next({
        id: id,
        shortcut: "kg",
        description: "Kilogramm",
        articleIds: [],
      });
    });
  }

}


