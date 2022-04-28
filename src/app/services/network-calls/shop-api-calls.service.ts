import { Injectable } from '@angular/core';
import { ConstantValuesService } from '../constant-values.service';
import { DataProviderService } from '../data-provider.service';
import { NotificationsService } from '../notifications.service';
import { ICallback } from 'src/app/classes/callback-method';

@Injectable({
  providedIn: 'root'
})
export class ShopApiCallsService {

  constructor(
    private constantValues: ConstantValuesService,
    private dataProvider: DataProviderService,
    private notificationService: NotificationsService
  ) { }
  /**
   * Get featured shops
   * @param payload payload
   * @param callback ICallback function that returns an error or result
   */
  getFeaturedShops(payload: any, callback: ICallback) {
    this.dataProvider.createNoToken(this.constantValues.FEATURED_SHOPS_ENDPOINT, payload).subscribe(result => {
      callback(null, result);
    }, error => {
      callback(error, null);
      // this.notificationService.error(this.constantValues.APP_NAME, error.detail);
    });
  }
  /**
   * Get featured shops
   * @param onlineAddress online address
   * @param callback ICallback function that returns an error or result
   */
  getShopByOnlineAddress(onlineAddress: any, callback: ICallback) {
    this.dataProvider.createNoToken(this.constantValues.SHOPS_PROFILE_ENDPOINT, {storefrontmall_name: onlineAddress}).subscribe(result => {
      callback(null, result);
    }, error => {
      callback(error, null);
      // this.notificationService.error(this.constantValues.APP_NAME, error.detail);
    });
  }
  /**
   * Get  Shop Sliders online Address
   * @param onlineAddress online address
   * @param callback ICallback function that returns an error or result
   */
  getShopSliders(onlineAddress: any, callback: ICallback) {
    this.dataProvider.createNoToken(this.constantValues.GET_BANNER_ENDPOINT, {storefrontmall_name: onlineAddress}).subscribe(result => {
      callback(null, result);
    }, error => {
      callback(error, null);
      // this.notificationService.error(this.constantValues.APP_NAME, error.detail);
    });
  }
  /**
   * Get  Shop Sliders online Address
   * @param callback ICallback function that returns an error or result
   */
  getMarketplaceSliders(callback: ICallback) {
    this.dataProvider.httpGetAllNoToken(this.constantValues.GET_MARKET_PLACE_BANNER_ENDPOINT).subscribe(result => {
      callback(null, result);
    }, error => {
      callback(error, null);
      // this.notificationService.error(this.constantValues.APP_NAME, error.detail);
    });
  }
  /**
   * Check the existence of an active promo on a shop
   * @param onlineAddress online address
   * @param callback ICallback function that returns an error or result
   */
  checkActivePromo(onlineAddress: any, callback: ICallback) {
    this.dataProvider.createNoToken(this.constantValues.CHECK_ACTIVE_PROMO_ENDPOINT, {storefrontmall_name: onlineAddress})
    .subscribe(result => {
      callback(null, result);
    }, error => {
      callback(error, null);
      // this.notificationService.error(this.constantValues.APP_NAME, error.detail);
    });
  }
 /**
  * Update Payment Request submitted for a shop
  * @param callback ICallback function that returns an error or result
  */
  getIndustries(callback: ICallback) {
    const industries = [
      { name: 'Books & Stationary', icon: 'assets/img/icons/stationery.svg' },
      { name: 'Beauty & Cosmetics', icon: 'assets/img/icons/beauty_cosmetics.svg' },
      { name: 'Beverages & Liquor', icon: 'assets/img/icons/beverage_liqour.svg' },
      { name: 'Building Materials', icon: 'assets/img/icons/building_materials.svg' },
      { name: 'Electronics & Hardware', icon: 'assets/img/icons/electronics_hardware.svg' },
      { name: 'Cafe, Bars & Restaurants', icon: 'assets/img/icons/bar_restaurant.svg' },
      { name: 'Provision Store', icon: 'assets/img/icons/provisions.svg' },
      { name: 'Fashion & Clothing', icon: 'assets/img/icons/clothing_shoes.svg' },
      { name: 'Supermarket', icon: 'assets/img/icons/supermarket.svg' },
      { name: 'Travel & Holiday', icon: 'assets/img/icons/travel.svg' },
      { name: 'Furniture & Accessories', icon: 'assets/img/icons/furniture.svg' },
      { name: 'Frozen Foods', icon: 'assets/img/icons/food_and_drinks.svg' },
      { name: 'Media & Printing', icon: 'assets/img/icons/print_media.svg' },
      { name: 'Other', icon: 'assets/img/icons/others.svg' }
    ];
    callback(null, industries);
  }
}
