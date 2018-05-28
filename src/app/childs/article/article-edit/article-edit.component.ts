import {Component, OnInit} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {ArticleDto, UnitOfMeasurementDto} from "citrus-common";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {Observable} from "rxjs/Observable";
import {UnitOfMeasurementDtoRestService} from "../../unit-of-measurement/unit-of-measurement-dto-rest.service";
import {ArticleDtoRestService} from "../article-dto-rest.service";

@Component({
  selector: "app-article-edit",
  templateUrl: "./article-edit.component.html",
  styleUrls: ["./article-edit.component.scss"]
})
export class ArticleEditComponent implements OnInit {
  public article: ArticleDto = ArticleDto.createEmpty();
  public articleID: number;

  public unitSubject: BehaviorSubject<UnitOfMeasurementDto[]> = new BehaviorSubject([]);

  constructor(private route: ActivatedRoute,
              private router: Router,
              private rest: ArticleDtoRestService,
              public unitRest: UnitOfMeasurementDtoRestService) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      if (params["id"] == null) {
        this.articleID = this.article.id;
        const unitObservable: Observable<UnitOfMeasurementDto[]> = this.unitRest.getAll();
        unitObservable.subscribe(units => {
          this.unitSubject.next(units);
        });
      } else {
        const unitObservable: Observable<UnitOfMeasurementDto[]> = this.unitRest.getAll();
        const articleObservable = this.rest.get(+params["id"]);
        Observable.combineLatest(articleObservable, unitObservable, (a, units) => {
          const article = ArticleDto.createWithId(a.id, a);
          this.unitSubject.next(units);
          for (const unit of units) {
            if ((article.unitOfMeasurement != null && article.unitOfMeasurement.id === unit.id) ||
              (article.unitOfMeasurementId === unit.id)) {
              article.unitOfMeasurement = unit;
            }
          }
          return article;
        }).subscribe(
          t => {
            this.article = t;
            this.articleID = this.article.id;
          },
          err => {
            console.log(`Could not get article with id ${params["id"]} with error: ${err}`);
          });
      }
    });
  }

  public submit() {
    this.article.unitOfMeasurementId = this.article.unitOfMeasurement.id;
    if (this.articleID == null) {
      this.rest.add(new ArticleDto(this.article))
        .subscribe(
          (result) => this.router.navigate([".."], {relativeTo: this.route}),
          (err) => console.error(`could not save article: ${this.article.id} with Error: ${err}`)
        );
    } else {
      this.rest.update(ArticleDto.createWithId(this.articleID, this.article))
        .subscribe(
          (result) => this.router.navigate([".."], {relativeTo: this.route}),
          (err) => console.error(`could not update address: ${this.article.id} with Error: ${err}`));
    }
  }

}
