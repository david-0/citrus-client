import {Inject, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {saveAs} from 'file-saver';

@Injectable({
  providedIn: 'root'
})
export class DeliveryNoteService {

  constructor(private http: HttpClient, @Inject("baseUrl") private baseUrl: string) {
  }

  public downloadDeliveryNote(orderIds: number[]): any {
    let mediaType = 'application/pdf';

    this.http.post(this.baseUrl + "/deliveryNote", orderIds, {
      observe: 'response',
      responseType: 'blob'
    }).subscribe(
      (response) => {
        let filename = response.headers.get("Content-Disposition") //
          .split('filename=')[1] // all after filename=
          .split(';')[0] // split multiple filenames
          .split("\"")[1] // remove double quots;
        const blob = new Blob([response.body], {type: mediaType});
        saveAs(blob, filename);
      },
      e => {
//        throwError(e);
      }
    );
  }
}
