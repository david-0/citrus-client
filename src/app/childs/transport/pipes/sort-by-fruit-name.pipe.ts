import { Pipe, PipeTransform } from '@angular/core';
import {IFruitVolume} from '../../../entities/IFruitVolume';
import {IFruit} from '../../../entities/IFruit';

@Pipe({
  name: 'sortByFruitName'
})
export class SortByFruitNamePipe implements PipeTransform {

  transform(value: IFruit[]): IFruit[] {
    return value.sort((a, b) => a.name.localeCompare(b.name));
  }

}
