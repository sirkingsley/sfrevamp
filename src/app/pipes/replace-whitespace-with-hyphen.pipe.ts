import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'replaceWhitespaceWithHyphen'
})
export class ReplaceWhitespaceWithHyphenPipe implements PipeTransform {

  transform(text: any, ...args: any[]): any {
    if (text !== undefined && text !== null && text !== '') { return text.replace(/\s+/g, '-').toLowerCase(); }
    return '';
  }

}
