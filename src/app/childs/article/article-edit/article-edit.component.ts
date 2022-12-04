import {Component, Inject, OnInit} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {ArticleDto, UnitOfMeasurementDto} from "citrus-common";
import {BehaviorSubject, combineLatest, Observable} from "rxjs";
import {FileUploadService} from "../../../table-support/file-upload.service";
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
  private image: File;

  public unitSubject: BehaviorSubject<UnitOfMeasurementDto[]> = new BehaviorSubject([]);

  constructor(private route: ActivatedRoute,
              private router: Router,
              private rest: ArticleDtoRestService,
              public unitRest: UnitOfMeasurementDtoRestService,
              public fileUploadService: FileUploadService,
              @Inject("baseUrl") public baseUrl: string) {
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
        combineLatest(articleObservable, unitObservable).subscribe(result => {
            this.article = this.ensureUnitInArtile(result[0], result[1]);
            this.articleID = this.article.id;
          },
          err => {
            console.log(`Could not get article with id ${params["id"]} with error: ${err}`);
          });
      }
    });
  }

  private ensureUnitInArtile(article, units): ArticleDto {
    this.unitSubject.next(units);
    for (const unit of units) {
      if (this.isUnitWithSameId(article, unit)) {
        article.unitOfMeasurement = unit;
      }
    }
    return article;
  }

  public changeFiles(files: File[]) {
    if (files && files.length > 0) {
      this.image = files[0];
    } else {
      this.image = undefined;
    }
  }

  private isUnitWithSameId(article: ArticleDto, unit: UnitOfMeasurementDto): boolean {
    return article.unitOfMeasurement != null && article.unitOfMeasurement.id === unit.id;
  }

  public async submit() {
    if (this.articleID == null) {
      const a = await this.rest.add(new ArticleDto(this.article)).toPromise();
      await this.uploadImage(a);
      this.router.navigate([".."], {relativeTo: this.route});
    } else {
      const articleDto = ArticleDto.createWithId(this.articleID, this.article);
      await this.rest.update(ArticleDto.createWithId(this.articleID, this.article)).toPromise();
      await this.uploadImage(articleDto);
      this.router.navigate([".."], {relativeTo: this.route});
    }
  }

  private async uploadImage(article: ArticleDto): Promise<ArticleDto> {
    const formData = new FormData();
    if (this.image) {
      formData.append("fileKey", this.image, this.image.name);
      return new Promise<ArticleDto>((resolve, reject) => {
        this.fileUploadService.upload(formData).subscribe(id => {
          if (id) {
            article.imageId = "" + id;
          }
          this.rest.update(article).subscribe(ok => {
            resolve(article);
          }, error => {
            reject(error);
          });
        });
      });
    }
    return new Promise<ArticleDto>((resolve, reject) => {
      this.rest.update(article).subscribe(ok => {
        resolve(article);
      }, error => {
        reject(error);
      });
    });
  }
}
