import { HttpClient } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { OrderArchiveDto } from "citrus-common";
import { GenericRestService } from "../../table-support/generic-rest.service";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class OrderArchiveDtoRestService extends GenericRestService<OrderArchiveDto> {
  constructor(http: HttpClient, @Inject("baseUrl") baseUrl: string) {
    super(http, baseUrl + "/orderArchive");
  }

  public getMyOrders(): Observable<OrderArchiveDto[]> {
    const url = `${this.restUrl}/myOrders`;
    return this.http.get<OrderArchiveDto[]>(url, { headers: this.headers });
  }


  public getByUser(userId: number): Observable<OrderArchiveDto[]> {
    const url = `${this.restUrl}/byUser/${userId}`;
    return this.http.get<OrderArchiveDto[]>(url, { headers: this.headers });
  }
}
