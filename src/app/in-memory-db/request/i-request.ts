import {IOrderDefinition, IRequestCondition, IRequestField} from "citrus-common";
import {CModel} from "../model/c/c-model";

export interface IRequest<T> {
  type: typeof CModel;
  includedFields?: IRequestField[];
  conditions?: IRequestCondition<T>[];
  order?: IOrderDefinition[];
  limit?: number;
  offset?: number;

  hasCondition(): boolean;
  isSubRequest(subRequest: IRequest<T>): boolean;
}
