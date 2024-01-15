import { ArticleStockDto } from "citrus-common";
import { IDtoId } from "citrus-common/lib/dto/i-dto-id";

export class ArticleStockWrapper implements IDtoId {
    public id?: number;
    public dto: ArticleStockDto;
    public newQuantity?: number;

    constructor(dto: ArticleStockDto) {
        this.id = dto.id;
        this.dto = dto;
    }
}