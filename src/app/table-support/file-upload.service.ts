import {HttpClient, HttpErrorResponse, HttpEvent, HttpEventType} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Observable, throwError} from "rxjs";
import {catchError, map} from "rxjs/operators";
import {RestUrlPrefixService} from "./rest-url-prefix.service";

@Injectable({
  providedIn: "root"
})
export class FileUploadService {

  constructor(private http: HttpClient, private urlPrefixService: RestUrlPrefixService) {
  }

  public upload(formData: FormData): Observable<number> {
    return this.http.post<number>(`${this.urlPrefixService.getApiRestPrefix()}/image`, formData
      // , {
      //   reportProgress: true,
      //   observe: "events"
      // }
    ).pipe(
//      map(event => this.getEventMessage(event, formData)),
      catchError(this.handleError)
    );
  }

  private getEventMessage(event: HttpEvent<any>, formData) {

    switch (event.type) {

      case HttpEventType.UploadProgress:
        return this.fileUploadProgress(event);

      case HttpEventType.Response:
        return this.apiResponse(event);

      default:

        return `File "${JSON.stringify(formData)}" surprising upload event: ${JSON.stringify(event)}.`;
    }
  }

  private fileUploadProgress(event) {
    const percentDone = Math.round(100 * event.loaded / event.total);
    return {status: "progress", message: percentDone};
  }

  private apiResponse(event) {
    return event.body;
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error("An error occurred:", error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(`Backend returned code ${error.status}, ` + `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError("Something bad happened. Please try again later.");
  }

}
