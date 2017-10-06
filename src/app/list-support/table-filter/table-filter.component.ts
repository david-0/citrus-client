import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {SettingsServiceInterface} from '../settings-service-interface';

@Component({
  selector: 'app-table-filter',
  templateUrl: './table-filter.component.html',
  styleUrls: ['./table-filter.component.scss']
})
export class TableFilterComponent implements OnInit {

  @ViewChild('filter') filter: ElementRef;
  @Input() settings: SettingsServiceInterface;
  @Output() onChange = new EventEmitter<string>();

  constructor() {
  }

  ngOnInit() {
    Observable.fromEvent(this.filter.nativeElement, 'keyup')
      .debounceTime(150)
      .distinctUntilChanged()
      .subscribe(() => {
        this.onChange.emit(this.filter.nativeElement.value);
      });
    const filter = this.settings != null ? this.settings.filterValue : '';
    this.filter.nativeElement.value = filter;
    this.onChange.emit(filter);
  }
}
