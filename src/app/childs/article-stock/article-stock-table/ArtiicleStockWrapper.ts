import { ArticleStockDto } from "citrus-common";
import { IDtoId } from "citrus-common/lib/dto/i-dto-id";

export class ArticleStockWrapper implements IDtoId {
    public id?: number;
    public dto: ArticleStockDto;

    public receiverArticleStockId?: number;
    public transferQuantity?: number;

    constructor(dto: ArticleStockDto, public possibleReceivers: ArticleStockDto[]) {
        this.id = dto.id;
        this.dto = dto;
        if (possibleReceivers.length > 0) {
            this.receiverArticleStockId = possibleReceivers[0].id;
        }
    }
}