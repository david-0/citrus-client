import {Component, OnInit} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {ArticleStockDto} from "citrus-common";
import {DeleteExecutor} from "../../../base/delete-executor";
import {ArticleStockWithDtoAllRestService} from "../article-stock-with-dto-all-rest.service";

@Component({
  selector: "app-article-stock-delete",
  templateUrl: "./article-stock-delete.component.html",
  styleUrls: ["./article-stock-delete.component.scss"]
})
export class ArticleStockDeleteComponent implements OnInit {


  public deleteExecutor: DeleteExecutor<ArticleStockDto>;

  constructor(private route: ActivatedRoute,
              private rest: ArticleStockWithDtoAllRestService) {
  }

  ngOnInit() {
    this.deleteExecutor = new DeleteExecutor<ArticleStockDto>(this.route, this.rest, "Der Lagerbestand");
    this.deleteExecutor.registerCheck(articleStock => this.getCheckIns(articleStock).length > 0,
      article => `weil er noch in ${this.getCheckIns(article).length} Einbuchung(en) verwendet wird`);
    this.deleteExecutor.registerCheck(articleStock => this.getCheckOuts(articleStock).length > 0,
      article => `weil er noch in ${this.getCheckOuts(article).length} Ausbuchung(en) verwendet wird`);
    this.deleteExecutor.initDelete();
  }

  private getCheckIns(articleStock: ArticleStockDto): number[] {
    return this.uniq(articleStock.checkIns.map(item => item.id));
  }

  private getCheckOuts(articleStock: ArticleStockDto): number[] {
    return this.uniq(articleStock.checkOuts.map(item => item.id));
  }

  private uniq(a: number[]): number[] {
    return a.sort().filter(function (item, pos, ary) {
      return !pos || item !== ary[pos - 1];
    });
  }
}
