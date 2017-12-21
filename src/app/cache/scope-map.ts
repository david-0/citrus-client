import {IWhereDefinition} from "citrus-common/lib/interfaces/IWhereDefinition";
import {CacheScope} from "./cache-scope";

export class ScopeMap {
  private scopes = new Map<string, CacheScope>();

  public get(scopeCondition: IWhereDefinition): CacheScope {
    return this.scopes.get(this.convertToKey(scopeCondition));
  }

  public has(scopeCondition: IWhereDefinition): boolean {
    return this.scopes.has(this.convertToKey(scopeCondition));
  }

  public set(scopeCondition: IWhereDefinition, scope: CacheScope) {
    this.scopes.set(this.convertToKey(scopeCondition), scope);
  }

  private convertToKey(scopeCondition: IWhereDefinition): string {
    return `columnName:${scopeCondition.columnName},id:${scopeCondition.id}`;
  }
}
