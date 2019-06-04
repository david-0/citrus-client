/* tslint:disable:component-selector */
import {Component, Injectable, Input} from "@angular/core";
import {NgForm} from "@angular/forms";
import {NavigationExtras} from "@angular/router";
import {UnitOfMeasurementDto} from "citrus-common";
import {Observable} from "rxjs";
import {OutputMessage} from "../base/output-message";

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

@Component({
  selector: "app-output-message",
  template: "",
})
export class MockOutputMessageComponent {

  @Input() messages: OutputMessage;
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
        articles: item.articles,
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
          articles: [],
        },
        {
          id: 2,
          shortcut: "g",
          description: "Gramm",
          articles: [],
        }]);
    });
  }

  get(id: number): Observable<UnitOfMeasurementDto> {
    return Observable.create(observer => {
      observer.next({
        id: id,
        shortcut: "kg",
        description: "Kilogramm",
        articles: [],
      });
    });
  }

}

@Injectable()
export class UnitOfMeasurementWithArticlesDtoRestServiceSpy {
  add(item: UnitOfMeasurementDto): Observable<UnitOfMeasurementDto> {
    return Observable.create(observer => {
      observer.next({
        id: item.id,
        shortcut: item.shortcut,
        description: item.description,
        articles: item.articles,
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
          articles: [{
            number: 1,
            description: "Orangen",
            pictureId: "picId",
            price: 1.35,
            inSale: true
          }],
        },
        {
          id: 2,
          shortcut: "g",
          description: "Gramm",
          articles: [{
            number: 1,
            description: "Zitronenpulver",
            pictureId: "picId",
            price: 0.10,
            inSale: true
          }],
        }]);
    });
  }

  get(id: number): Observable<UnitOfMeasurementDto> {
    return Observable.create(observer => {
      observer.next({
        id: id,
        shortcut: "kg",
        description: "Kilogramm",
        articles: [{
          number: 1,
          description: "Orangen",
          pictureId: "picId",
          price: 1.35,
          inSale: true
        }],
      });
    });
  }

}


