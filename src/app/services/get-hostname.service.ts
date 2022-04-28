import { ConstantValuesService } from 'src/app/services/constant-values.service';
import { Injectable, Inject } from '@angular/core';
import { WINDOW } from '../utils/window.provider';

@Injectable({
  providedIn: 'root'
})
export class GetHostnameService {

  constructor(@Inject(WINDOW) private window: Window, private constValues: ConstantValuesService) {
  }

  get hostname(): string {
      return this.window.location.hostname;
  }
  get subDomain(): string {
    let subDomain = this.window.location.hostname.split('.')[0];
    if (this.hostname.includes("buygtp.com")) {
      subDomain= 'gtpstore';
    } else if (this.hostname.includes("buywoodinfashion.com")) {
      subDomain= 'woodin';
    } else if (this.hostname.includes("atlfabrics.com")) {
      subDomain= 'atlfabrics';
    } else if (this.hostname.includes("bquirkygh.com")) {
      subDomain= 'bquirky';
    }
    return subDomain;
    // return this.constValues.YOUNG_TEMPLATE_SUBDOMAIN;
}
get url(): string {
  return this.window.location.href;
}
get isShopMall(): boolean {
  // tslint:disable-next-line: max-line-length
  if (this.subDomain !== 'www' && this.subDomain !== this.constValues.STOREFRONT_MALL_URL.split('.')[0] && this.subDomain !== 'localhost') {
    return true;
   }
  return false;
}
}
