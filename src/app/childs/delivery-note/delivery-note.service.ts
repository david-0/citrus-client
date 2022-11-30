import {Inject, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {saveAs} from 'file-saver';
import {Observable} from "rxjs";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class DeliveryNoteService {

  constructor(private http: HttpClient, @Inject("baseUrl") private baseUrl: string) {
  }

  public downloadDeliveryNotes(orderIds: number[]): Observable<number[]> {
    let mediaType = 'application/pdf';

    return this.http.post(this.baseUrl + "/deliveryNote", orderIds, {
      observe: 'response',
      responseType: 'blob'
    }).pipe(map((response) => {
      let filename = response.headers.get("Content-Disposition") //
        .split('filename=')[1] // all after filename=
        .split(';')[0] // split multiple filenames
        .split("\"")[1] // remove double quots;
      const blob = new Blob([response.body], {type: mediaType});
      saveAs(blob, filename);
      return orderIds;
    }));
  }
}
