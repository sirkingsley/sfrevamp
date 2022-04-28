import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'arrayFill'
})
export class ArrayFillPipe implements PipeTransform {

  transform(val: any): any[] {
    const value = (val !== null && val !== '' && val !== undefined) ? +val : 0;

    if (value > 0) {
      return (new Array(value)).fill(1);
    }
    return [];
  }

}
