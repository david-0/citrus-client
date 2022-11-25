import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Inject, Injectable} from "@angular/core";
import {ArticleInventoryTransferDto, ArticleStockDto} from "citrus-common";
import { Observable } from "rxjs";
import {GenericRestService} from "../../table-support/generic-rest.service";

@Injectable({
  providedIn: "root"
})
export class ArticleInventoryTransferService  {
  private restUrl: string;
  protected headers = new HttpHeaders({"Content-Type": "application/json"});

  constructor(private http: HttpClient, @Inject("baseUrl") baseUrl: string) {
    this.restUrl = baseUrl  + "/articleInventoryTransfer/transfer";
  }

  public transfer(item: ArticleInventoryTransferDto): Observable<void> {
    return this.http.post<void>(this.restUrl, JSON.stringify(item), {headers: this.headers});
  }
}
