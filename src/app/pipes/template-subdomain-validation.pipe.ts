import { ConstantValuesService } from './../services/constant-values.service';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'templateSubdomainValidation'
})
export class TemplateSubdomainValidationPipe implements PipeTransform {
constructor(private constValues: ConstantValuesService){}
  transform(value: string): boolean {

    let state = false;
    const domains = this.constValues.GTP_SUBDOMAIN.split(',');

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
