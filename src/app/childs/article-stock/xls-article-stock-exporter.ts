import { Injectable } from '@angular/core';
import { ArticleStockDto } from 'citrus-common';
import { saveAs } from 'file-saver';
import { DateTime } from 'luxon';
import { utils, WorkBook, WorkSheet, write } from 'xlsx';
import { Column } from '../../base/column';

const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';

@Injectable({
  providedIn: "root"
})
export class XlsArticleStockExporter {

  private readonly constColumns: Column<ArticleStockDto>[] = [];

  constructor() {
    this.constColumns.push(new Column('Id', (p: ArticleStockDto) => "" + p.id));
    this.constColumns.push(new Column('Artikel', (p: ArticleStockDto) => p.article.description));
    this.constColumns.push(new Column('Standort', (p: ArticleStockDto) => p.location.description));
    this.constColumns.push(new Column('Ausverkauft', (p: ArticleStockDto) => p.soldOut ? "ja" : "nein"));
    this.constColumns.push(new Column('Sichtbar', (p: ArticleStockDto) => p.visible ? "ja" : "nein"));
    this.constColumns.push(new Column('Menge an Lager', (p: ArticleStockDto) => "" + p.quantity));
    this.constColumns.push(new Column('Menge reserviert', (p: ArticleStockDto) => "" + p.reservedQuantity));
    this.constColumns.push(new Column('Menge verfügbar', (p: ArticleStockDto) => "" + (p.quantity - p.reservedQuantity)));
  }

  private convertField(articleStock: ArticleStockDto, columns: Column<ArticleStockDto>[]): any {
    const result = {};
    columns.forEach(f => result[f.label] = f.valueProvider(articleStock));
    return result;
  }

  private convertData(articleStock: ArticleStockDto[], columns: Column<ArticleStockDto>[]): any[] {
    return articleStock.map(p => this.convertField(p, columns));
  }

  public async exportAsExcelFile(articleStocks: ArticleStockDto[], excelFileName: string): Promise<void> {
    const sheetname = "Lagerbestände";
    const data = this.convertData(articleStocks, this.constColumns);
    const worksheet: WorkSheet = utils.json_to_sheet(data);
    const workbook: WorkBook = { Sheets: {}, SheetNames: [] };
    workbook.Sheets[sheetname] = worksheet;
    workbook.SheetNames.push(sheetname);
    const excelBuffer: any = write(workbook, { bookType: 'xlsx', type: 'array' });
    return this.saveAsExcelFile(excelBuffer, excelFileName);
  }

  private saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], { type: EXCEL_TYPE });
    const date = DateTime.now().toFormat('yyyy-MM-dd HHmmss');
    saveAs(data, fileName + '_' + date + EXCEL_EXTENSION);
  }
}
