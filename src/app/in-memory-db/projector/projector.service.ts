import {Injectable} from "@angular/core";
import {CacheService} from "../cache/cache-service";
import {AbstractProjector} from "./abstract-projector";
import {AddressProjector} from "./address-projector";
import {UserProjector} from "./user-projector";

@Injectable()
export class ProjectorService {
  private projectors = new Map<string, AbstractProjector>();

  constructor(private cacheService: CacheService) {
    this.add("Address", new AddressProjector(this.cacheService, this));
    this.add("User", new UserProjector(this.cacheService, this));
  }

  public get(typeName: string): AbstractProjector {
    return this.projectors.get(typeName);
  }

  public add(typeName: string, projector: AbstractProjector): void {
    this.projectors.set(typeName, projector);
  }
}
