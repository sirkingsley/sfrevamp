import { Pipe, PipeTransform } from '@angular/core';
import { ConstantValuesService } from '../services/constant-values.service';

@Pipe({
  name: 'youngTemplateValidator'
})
export class YoungTemplateValidatorPipe implements PipeTransform {

  constructor(private constValues: ConstantValuesService){}
  transform(value: string): boolean {

    let state = false;
    const domains = this.constValues.YOUNG_TEMPLATE_SUBDOMAIN.split(',');

    if (domains.length > 0) {
      domains.forEach(domain => {
        if (value === domain) {
          state = true;
        }
      });
    }
    return state;
  }

}
