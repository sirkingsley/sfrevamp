import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'replaceUnderscoreWithSpace'
})
export class ReplaceUnderscoreWithSpacePipe implements PipeTransform {


  transform(text: string, ...args: any[]): any {
    if (text !== undefined && text !== null && text !== '') { return text.replace(/_/g, ' ').replace(/_/g, ' '); }
    return '';
  }
}
