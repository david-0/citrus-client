import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from "@angular/core";
import {fromEvent} from "rxjs";
import {debounceTime, distinctUntilChanged} from "rxjs/operators";
import {SettingsServiceInterface} from "../settings-service-interface";

@Component({
  selector: "app-table-filter",
  templateUrl: "./table-filter.component.html",
  styleUrls: ["./table-filter.component.scss"]
})
export class TableFilterComponent implements OnInit {

  @ViewChild("filter") filter: ElementRef;
  @Input() settings: SettingsServiceInterface;
  @Input() placeholder: string;
  @Output() onChange = new EventEmitter<string>();

  constructor() {
  }

  ngOnInit() {
    fromEvent(this.filter.nativeElement, "keyup").pipe(
      debounceTime(150),
      distinctUntilChanged()
    ).subscribe(() => {
      this.onChange.emit(this.filter.nativeElement.value);
    });
    const filter = this.settings != null ? this.settings.filterValue : "";
    this.filter.nativeElement.value = filter;
    this.onChange.emit(filter);
  }
}
