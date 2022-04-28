import { ConstantValuesService } from 'src/app/services/constant-values.service';
import { Injectable } from '@angular/core';
import { ProductVariantsEnum } from '../utils/enums';

@Injectable({
  providedIn: 'root'
})
export class AppUtilsService {

  constructor(private constantValues: ConstantValuesService) { }
  get getProductSizes(): any[] {
    return [
      {size: ProductVariantsEnum.XTRA_SMALL, caption: 'XS' },
      {size: ProductVariantsEnum.SMALL, caption: 'S'},
      {size: ProductVariantsEnum.MEDIUM, caption: 'M'},
      {size: ProductVariantsEnum.LARGE, caption: 'L'},
      {size: ProductVariantsEnum.XTRA_LARGE, caption: 'XL'},
      {size: ProductVariantsEnum.XTRA_XTRA_LARGE, caption: 'XXL'}
    ];
  }
  /**
   * Get full storefrontmall onlinee address
   * @param storefontName storefrontmall name
   */
  getStoreFrontMallOnlineAddress(storfrontMallOnlineAddressName: any) {
    // tslint:disable-next-line: max-line-length
    return this.constantValues.STOREFRONT_MALL_URL_PROTOCOL + storfrontMallOnlineAddressName + '.' + this.constantValues.STOREFRONT_MALL_URL;
  }
  /**
   * Remove brace bracket(s) from text
   * @param text text to trim
   */
  removeBraceBrackets(text: string) {
    if (text !== undefined && text !== null && text !== '') { return text.replace(/{/g, '').replace(/}/g, ''); }
    return '';
  }
  getSizesFromDescription(description: string) {
    const sizes: any[] = [];
    const desc = (description !== null && description !== undefined) ? description : '';
    var resultString = desc.match(/\b[^\s]*\/[^\s]*\b/g);
    const res = (resultString !== null && resultString !== undefined) ? resultString : [];
    res.forEach(result => {
      const allSize = result.split('/');
      allSize.forEach(size => {
        const currentSize = this.getProductSizes.find(data => data.caption === size);
        if (currentSize !== null && currentSize !== undefined) {
          sizes.push(currentSize);
        }

      })
    });
    return (sizes.length > 0 ) ? sizes : [];
  }
}
