import {Pipe, PipeTransform} from "@angular/core";
import {IFruit} from "../../../entities/IFruit";
import {IFruitVolume} from "../../../entities/IFruitVolume";

@Pipe({
  name: "convertToFruitVolume"
})
export class ConvertToFruitVolumePipe implements PipeTransform {

  transform(value: IFruit, fruitVolumes?: IFruitVolume[]): IFruitVolume {
    const existingFruitVolume = fruitVolumes.filter(fruitVolume => fruitVolume.fruit.id === value.id);
    return (existingFruitVolume.length === 1) ? existingFruitVolume[0] : null;
  }
}
