import {HttpErrorResponse} from "@angular/common/http";
import {Component, OnInit} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {ArticleCheckInDto, ArticleStockDto} from "citrus-common";
import {ArticleCheckInWithAllDtoRestService} from "../../childs/article-checkin/article-check-in-with-all-dto-rest.service";
import {ArticleStockWithDtoAllRestService} from "../../childs/article-stock/article-stock-with-dto-all-rest.service";

@Component({
  selector: "app-store-check-in",
  templateUrl: "./store-check-in.component.html",
  styleUrls: ["./store-check-in.component.scss"]
})
export class StoreCheckInComponent implements OnInit {

  public articleCheckIn: ArticleCheckInDto = ArticleCheckInDto.createEmpty();
  public articleStocks: ArticleStockDto[] = [];

  constructor(private route: ActivatedRoute,
              private router: Router,
              private articleCheckInRest: ArticleCheckInWithAllDtoRestService,
              public articleStockRest: ArticleStockWithDtoAllRestService) {
  }

  ngOnInit() {
    this.articleStockRest.getAll().subscribe(articles => {
      this.articleStocks = articles;
    });
  }

  public submit() {
    this.articleCheckIn.done = true;
    this.articleCheckInRest.add(this.articleCheckIn)
      .subscribe(
        (result) => this.router.navigate(["../.."], {relativeTo: this.route}),
        (err: HttpErrorResponse) => console.error(`could not save articleStock: ${this.articleCheckIn.id} with Error: ${err.message}`)
      );
  }
}
