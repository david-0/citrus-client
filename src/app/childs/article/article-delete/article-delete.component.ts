import {Component, OnInit} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {ArticleDto} from "citrus-common";
import {DeleteExecutor} from "../../../base/delete-executor";
import {ArticleWithAllDtoRestService} from "../article-with-all-dto-rest.service";

@Component({
  selector: "app-article-delete",
  templateUrl: "./article-delete.component.html",
  styleUrls: ["./article-delete.component.scss"]
})
export class ArticleDeleteComponent implements OnInit {

  public deleteExecutor: DeleteExecutor<ArticleDto>;

  constructor(private route: ActivatedRoute,
              private rest: ArticleWithAllDtoRestService) {
  }

  ngOnInit() {
    this.deleteExecutor = new DeleteExecutor<ArticleDto>(this.route, this.rest, "Der Artikel");
    this.deleteExecutor.registerCheck(article => this.getCustomerOrderIds(article).length > 0,
      article => `weil er noch in ${this.getVendorOrderIds(article).length} Bestellung(en) verwendet wird`);
    this.deleteExecutor.initDelete();
  }

  private getCustomerOrderIds(article: ArticleDto): number[] {
    return this.uniq(article.customerOrderItems.map(item => item.customerOrderId));
  }

  private getVendorOrderIds(article: ArticleDto): number[] {
    return this.uniq(article.customerOrderItems.map(item => item.customerOrderId));
  }

  private uniq(a: number[]): number[] {
    return a.sort().filter(function (item, pos, ary) {
      return !pos || item !== ary[pos - 1];
    });
  }
}
