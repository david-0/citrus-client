import {Pipe, PipeTransform} from "@angular/core";
import {IFruitVolume} from "../../../entities/IFruitVolume";

@Pipe({
  name: "sortByFruitName"
})
export class SortByFruitNamePipe implements PipeTransform {

  transform(value: IFruitVolume[]): IFruitVolume[] {
    return value.sort((a, b) => a.fruit.name.localeCompare(b.fruit.name));
  }

}
