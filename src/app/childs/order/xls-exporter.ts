import { Injectable } from '@angular/core';
import { OrderDto } from 'citrus-common';
import { saveAs } from 'file-saver';
import { DateTime } from 'luxon';
import { lastValueFrom } from 'rxjs';
import { utils, WorkBook, WorkSheet, write } from 'xlsx';
import { ArticleDtoRestService } from '../article/article-dto-rest.service';
import { Column } from './column';

const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';

@Injectable({
  providedIn: "root"
})
export class XlsExporter {

  private readonly staticColumns: Column[] = [];

  constructor(private articleRestService: ArticleDtoRestService) {
    this.staticColumns.push(new Column('Id', (p: OrderDto) => "" + p.id));
    this.staticColumns.push(new Column('Datum', (p: OrderDto) => DateTime.fromISO("" + p.date).toFormat('yyyy-MM-dd HH:mm:ss')));
    this.staticColumns.push(new Column('Vorname', (p: OrderDto) => p.user.prename));
    this.staticColumns.push(new Column('Name', (p: OrderDto) => p.user.name));
    this.staticColumns.push(new Column('Email', (p: OrderDto) => p.user.email));
    this.staticColumns.push(new Column('Phone', (p: OrderDto) => p.user.phone));
    this.staticColumns.push(new Column('Phone', (p: OrderDto) => p.user.phone));
    this.staticColumns.push(new Column('Abholort Id', (p: OrderDto) => "" + p.location.id));
    this.staticColumns.push(new Column('Abholort Beschreibung', (p: OrderDto) => p.location.description));
    this.staticColumns.push(new Column('Abholort PLZ', (p: OrderDto) => p.location.zipcode));
    this.staticColumns.push(new Column('Abholort Ort', (p: OrderDto) => p.location.city));
    this.staticColumns.push(new Column('Abholort Strasse', (p: OrderDto) => p.location.street));
    this.staticColumns.push(new Column('Abholort Nummer', (p: OrderDto) => p.location.number));
    this.staticColumns.push(new Column('Preis', (p: OrderDto) => "" + p.totalPrice));
    this.staticColumns.push(new Column('geplante Abholung von', (p: OrderDto) => DateTime.fromISO("" + p.plannedCheckout.fromDate).toFormat('yyyy-MM-dd HH:mm:ss')));
    this.staticColumns.push(new Column('geplante Abholung bis', (p: OrderDto) => DateTime.fromISO("" + p.plannedCheckout.toDate).toFormat('yyyy-MM-dd HH:mm:ss')));
    this.staticColumns.push(new Column('Lieferschein erstellt', (p: OrderDto) => p.deliveryNoteCreated ? "ja" : "nein"));
  }

  private convertField(order: OrderDto, columns: Column[]): any {
    const result = {};
    columns.forEach(f => result[f.label] = f.valueProvider(order));
    return result;
  }

  private convertData(orders: OrderDto[], columns: Column[]): any[] {
    return orders.map(p => this.convertField(p, columns));
  }

  public async exportAsExcelFile(orders: OrderDto[], excelFileName: string): Promise<void> {
    const sheetname = "Bestellungen";
    const articleIdsToExport = this.extractArticleIds(orders)
    const columns = await this.appendArticleColumns(articleIdsToExport)
    const data = this.convertData(orders, columns);
    const worksheet: WorkSheet = utils.json_to_sheet(data);
    const workbook: WorkBook = { Sheets: {}, SheetNames: [] };
    workbook.Sheets[sheetname] = worksheet;
    workbook.SheetNames.push(sheetname);
    const excelBuffer: any = write(workbook, { bookType: 'xlsx', type: 'array' });
    return this.saveAsExcelFile(excelBuffer, excelFileName);
  }

  private extractArticleIds(orders: OrderDto[]): number[] {
    return orders.flatMap(o => o.orderItems).map(i => i.article.id);
  }

  private async appendArticleColumns(extractArticleIds: number[]): Promise<Column[]> {
    const columns = [];
    columns.push(...this.staticColumns);
    const articles = await lastValueFrom(this.articleRestService.getAll());
    const filteredArticles = articles.filter(a => extractArticleIds.includes(a.id));
    columns.push(...filteredArticles.map(a => new Column(a.description, (p: OrderDto) => {
      const items = p.orderItems.filter(i => i.article.id == a.id);
      if (items.length > 0) {
        return "" + items[0].quantity;
      }
      return "";
    })));
    return columns;
  }

  private saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], { type: EXCEL_TYPE });
    const date = DateTime.now().toFormat('yyyy-MM-dd HHmmss');
    saveAs(data, fileName + '_' + date + EXCEL_EXTENSION);
  }
}
