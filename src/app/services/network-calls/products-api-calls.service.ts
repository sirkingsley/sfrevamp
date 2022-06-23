import { localStoreNames } from './../../utils/data-warehouse/localStoreNames';
import { LocalStorageDataProviderService } from './../local-storage-data-provider.service';
import { ProductsFilterParams } from './../../interfaces/products-filter-params';
import { Injectable } from '@angular/core';
import { ICallback } from 'src/app/classes/callback-method';
import { ConstantValuesService } from '../constant-values.service';
import { DataProviderService } from '../data-provider.service';
import { NotificationsService } from '../notifications.service';

@Injectable({
  providedIn: 'root'
})

export class ProductsApiCallsService {

  constructor(
    private constantValues: ConstantValuesService,
    private dataProvider: DataProviderService,
    private notificationService: NotificationsService,
    private localStorageDataProvider: LocalStorageDataProviderService
  ) { }
  /**
   * Get products based on filter params
   * @param filterParams filter parameters to filter by
   * @param callback ICallback function that returns an error or result
   */
  getProducts(filterParams: ProductsFilterParams, callback: ICallback) {
    this.dataProvider.createNoToken(this.constantValues.GET_ALL_PRODUCTS_ENDPOINT, filterParams).subscribe(result => {
      callback(null, result);
    }, error => {
      callback(error, null);
      this.notificationService.error(this.constantValues.APP_NAME, error.detail);
    });
  }
  /**
   * Get a product by slug
   * @param productSlug product slug
   * @param callback ICallback function that returns an error or result
   */
  getProductBySlug(productSlug, callback: ICallback) {
    this.dataProvider.createNoToken(this.constantValues.GET_PRODUCT_DETAIL_ENDPOINT, {slug: productSlug}).subscribe(result => {
      callback(null, result);
    }, error => {
      callback(error, null);
      this.notificationService.error(this.constantValues.APP_NAME, error.detail);
    });
  }
  /**
   * Get related products by slug and storefront name
   * @param productSlug product slug
   * @param callback ICallback function that returns an error or result
   */
  getRelatedProducts(productSlug, storefrontName, callback: ICallback) {
    // tslint:disable-next-line: max-line-length
    this.dataProvider.createNoToken(this.constantValues.RELATED_PRODUCTS_ENDPOINT, {slug: productSlug, storefrontmall_name: storefrontName})
    .subscribe(result => {
      callback(null, result);
    }, error => {
      callback(error, null);
      this.notificationService.error(this.constantValues.APP_NAME, error.detail);
    });
  }
  /**
   * Add product to cart in local storage
   * @param data product data
   * @param callback ICallback function that returns an error or result
   */
  async addProductToCart(data, callback: ICallback) {
    console.log('service add to cart starting');
    await this.getCartItems(async (error, result) => {
      if (result !== null) {
        console.log('service get cart worked');
        const itm: any[] = result;
        const exists = itm.find(el => el.item.id === data.item.id);
        if (exists !== null && exists !== undefined && exists !== '') {
          const newQuantity = +exists.quantity + +data.quantity;
          const newSubtotal = +exists.total_amount + +data.total_amount;
          data.total_amount = newSubtotal;
          data.quantity = newQuantity;
          if (newQuantity > data.item.new_quantity) {
            // tslint:disable-next-line: max-line-length
            this.notificationService.info(this.constantValues.APP_NAME, 'Cannot purchase ' + data.item.name + ' more than ' + data.item.new_quantity);
            return;
          }
          await this.removeCartItem(exists.id, async (_error, _result) => {
            if (_result !== null) {
              console.log("service  item removed and adding..");
              await this._addProductToCart(data, callback);
            }
          });
        } else {
          console.log('service calling private add to cart method');
          await this._addProductToCart(data, callback);
        }
      }

    });
  }
  /**
   * Add product to cart in local storage
   * @param data product data
   * @param callback ICallback function that returns an error or result
   */
  async removeAndAddProductToCart(data, callback: ICallback) {
    if (+data.quantity > +data.item.new_quantity) {
      // tslint:disable-next-line: max-line-length
      this.notificationService.info(this.constantValues.APP_NAME, 'Cannot purchase ' + data.item.name + ' more than ' + data.item.new_quantity);
      return;
    }
    await this.getCartItems(async (error, result) => {
      if (result !== null) {
        const itm: any[] = result;
        const exists = itm.find(el => el.item.id === data.item.id);
        if (exists !== null && exists !== undefined && exists !== '') {
          await this.removeCartItem(exists.id, async (_error, _result) => {
            if (_result !== null) {
              await this._addProductToCart(data, callback);
            }
          });
        }
      }

    });
  }
  private async _addProductToCart(data, callback: ICallback) {
    await this.localStorageDataProvider.create(localStoreNames.order, data).subscribe(id => {
      console.log('service added to local storage');
      callback(null, id);
      console.log('service id--'+JSON.stringify(id,null,2));
    // tslint:disable-next-line: variable-name
    }, _error => {
      callback(_error, null);
    });
  }
  /**
   * Upate existing item in cart in local storage
   * @param data product data
   * @param callback ICallback function that returns an error or result
   */
  private async _updateCartItems(id, data, callback: ICallback) {
    await this.localStorageDataProvider.update(localStoreNames.order, id, data).subscribe(resultId => {
      callback(null, resultId);
    }, error => {
      callback(error, null);
    });
  }
  /**
   * Add product to cart in local storage
   * @param data product data
   * @param callback ICallback function that returns an error or result
   */
  async getCartItems(callback: ICallback) {
    await this.localStorageDataProvider.getAll(localStoreNames.order).subscribe(items => {
      callback(null, items);
    }, error => {
      callback(error, null);
    });
  }

  /**
   * Rec product to cart in local storage
   * @param data product data
   * @param callback ICallback function that returns an error or result
   */
  async removeCartItem(id, callback: ICallback) {
    await this.localStorageDataProvider.delete(localStoreNames.order, id).subscribe(_id => {
      callback(null, _id);
    }, error => {
      callback(error, null);
    });
  }
  /**
   * Clear cart in local storage
   * @param data product data
   * @param callback ICallback function that returns an error or result
   */
  async clearCartItem(callback: ICallback) {
    await this.localStorageDataProvider.clear(localStoreNames.order).subscribe(id => {
      callback(null, id);
    }, error => {
      callback(error, null);
    });
  }
  /**
   * Add recently product to cart in local storage
   * @param data product data
   * @param callback ICallback function that returns an error or result
   */
  async addRecentlyViewedItmes(data, callback: ICallback) {
    await this.localStorageDataProvider.create(localStoreNames.recently_viewed, data).subscribe(id => {
      callback(null, id);
    }, error => {
      callback(error, null);
    });
  }
  /**
   * Get recently viewed items in local storage
   * @param data product data
   * @param callback ICallback function that returns an error or result
   */
  async getRecentlyViewedItems(callback: ICallback) {
    await this.localStorageDataProvider.getAll(localStoreNames.order).subscribe(id => {
      callback(null, id);
    }, error => {
      callback(error, null);
    });
  }


  /**
   * Add item to cart
   * @param data data to submit to server
   * @param callback ICallback function that returns an error or result
   */
   syncCartItems(data, callback: ICallback) {
    this.dataProvider.create(this.constantValues.ADD_ITEM_TO_CART_ENDPOINT, data).subscribe(result => {
      callback(null, result);

    }, error => {
      callback(error, null);
      this.notificationService.error(this.constantValues.APP_NAME, error.detail);
    });
  }
  /**
   * Get cart items
   * @param callback ICallback function that returns an error or result
   */
   getServerCartItems(callback: ICallback) {
    this.dataProvider.getAll(this.constantValues.GET_CART_ITEMS_ENDPOINT)
    .subscribe(result => {
      callback(null, result);
    }, error => {
      callback(error, null);
      this.notificationService.error(this.constantValues.APP_NAME, error.detail);
    });
  }
}
