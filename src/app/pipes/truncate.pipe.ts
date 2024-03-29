import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncate'
})
export class TruncatePipe implements PipeTransform {

  // transform(value: unknown, ...args: unknown[]): unknown {
  //   return null;
  // }
  transform(value: string, limit: number, trail: String = '…'): string {
    let result = value || '';
        if (value) {
    const words = value.split(/\s+/);
    if (words.length > Math.abs(limit)) {
        if (limit < 0) {
        limit *= -1;
        result = trail + words.slice(words.length - limit, words.length).join(' ');
        } else {
        result = words.slice(0, limit).join(' ') + trail;
        }
    }
    }
    return result;
}

}
