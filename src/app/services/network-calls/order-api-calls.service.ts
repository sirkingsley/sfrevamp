import { AuthService } from 'src/app/services/auth.service';
import { Injectable } from '@angular/core';
import { ConstantValuesService } from '../constant-values.service';
import { DataProviderService } from '../data-provider.service';
import { NotificationsService } from '../notifications.service';
import { ICallback } from 'src/app/classes/callback-method';
import { interval } from 'rxjs';
import { startWith, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class OrderApiCallsService {

  constructor(
    private constantValues: ConstantValuesService,
    private dataProvider: DataProviderService,
    private notificationService: NotificationsService,
    private authService: AuthService
  ) { }
  /**
   * Update delivery address
   * @param payload payload
   * @param callback ICallback function that returns an error or result
   */
  updateDeliveryAddress(payload: any, callback: ICallback) {
    this.dataProvider.create(this.constantValues.UPDATE_DELIVERY_ADDRESS_ENDPOINT, payload).subscribe(result => {
      callback(null, result);
    }, error => {
      callback(error, null);
      this.notificationService.error(this.constantValues.APP_NAME, error.detail);
    });
  }
  /**
   * Get Delivery Charge
   * @param payload payload
   * @param callback ICallback function that returns an error or result
   */
  getDeliveryCharge(payload: any, callback: ICallback) {
    this.dataProvider.create(this.constantValues.GET_DELIVERY_FEE_ENDPOINT, payload).subscribe(result => {
      callback(null, result);
    }, error => {
      callback(error, null);
      this.notificationService.error(this.constantValues.APP_NAME, error.detail);
    });
  }
  /**
   * Get Delivery Charge as guest
   * @param payload payload
   * @param callback ICallback function that returns an error or result
   */
  getDeliveryChargeAsGuest(payload: any, callback: ICallback) {
    this.dataProvider.createNoToken(this.constantValues.GET_DELIVERY_FEE_ENDPOINT, payload).subscribe(result => {
      callback(null, result);
    }, error => {
      callback(error, null);
      this.notificationService.error(this.constantValues.APP_NAME, error.detail);
    });
  }
  /**
   * Place order
   * @param payload payload
   * @param callback ICallback function that returns an error or result
   */
  placeOrder(payload: any, callback: ICallback) {
    this.dataProvider.create(this.constantValues.PLACE_ORDER_ENDPOINT, payload).subscribe(result => {
      callback(null, result);
    }, error => {
      callback(error, null);
      this.notificationService.error(this.constantValues.APP_NAME, error.detail);
    });
  }
  /**
   * Place order as guest
   * @param payload payload
   * @param callback ICallback function that returns an error or result
   */
  placeOrderAsGuest(payload: any, callback: ICallback) {
    this.dataProvider.createNoToken(this.constantValues.PLACE_ORDER_ENDPOINT, payload).subscribe(result => {
      callback(null, result);
    }, error => {
      callback(error, null);
      this.notificationService.error(this.constantValues.APP_NAME, error.detail);
    });
  }
  pollOrderPaymentTransactionStatus(payload: any, callback: ICallback) {
    interval(5000)
    .pipe(
      startWith(0),
      switchMap(() => this.dataProvider.create(this.constantValues.CHECK_MOMO_STATUS_ENDPOINT, payload))
    ).subscribe(result => {
      callback(null, result);
    }, error => {
      callback(error, null);
      this.notificationService.error(this.constantValues.APP_NAME, error.detail);
    });
  }
  /**
   * Get order
   * @param payload payload
   * @param callback ICallback function that returns an error or result
   */
  getCustomerOrders(callback: ICallback) {
    this.dataProvider.httpGetAll(this.constantValues.CUSTOMER_MALL_ORDERS_ENDPOINT).subscribe(result => {
      callback(null, result);
    }, error => {
      callback(error, null);
      this.notificationService.error(this.constantValues.APP_NAME, error.detail);
    });
  }
  /**
   * Get order detail by order id
   * @param orderId Orer Id
   * @param callback ICallback function that returns an error or result
   */
  getCustomerOrderByOrderId(orderId: any, callback: ICallback) {
    this.dataProvider.getAll(this.constantValues.CUSTOMER_MALL_ORDER_BY_ID_ENDPOINT, {order_id: orderId}).subscribe(result => {
      callback(null, result);
    }, error => {
      callback(error, null);
      this.notificationService.error(this.constantValues.APP_NAME, error.detail);
    });
  }
  /**
   * Get activities of order item (statuses of the order item)
   * @param orderItemId Order Item ID
   * @param callback ICallback function that returns an error or result
   */
  getCustomerOrderItemActivity(orderItemId: any, callback: ICallback) {
    this.dataProvider.getAll(this.constantValues.CUSTOMER_MALL_ORDER_ITEM_ACTIVITY_BY_ID_ENDPOINT, {order_item_id: orderItemId})
    .subscribe(result => {
      callback(null, result);
    }, error => {
      callback(error, null);
      this.notificationService.error(this.constantValues.APP_NAME, error.detail);
    });
  }
  /**
   * Get promo code value
   * @param promoCode promo code
   * @param callback ICallback function that returns an error or result
   */
  getPromoCodeValue(promoCode: any, isFirstLoad = false, callback: ICallback) {
    this.dataProvider.getAll(this.constantValues.GET_PROMO_CODE_VALUE_ENDPOINT, { code: promoCode }).subscribe(result => {
      callback(null, result);
    }, error => {
      callback(error, null);
      if (!isFirstLoad){
        this.notificationService.error(this.constantValues.APP_NAME, error.detail);
      }
    });
  }

  /**
   * Add item to cart
   * @param data data to submit to server
   * @param callback ICallback function that returns an error or result
   */
   retryOderPayment(data: any, callback: ICallback) {
    this.dataProvider.create(this.constantValues.RETRY_ORDER_PAYMENT_ENDPOINT, data).subscribe(result => {
      callback(null, result);
    }, error => {
      callback(error, null);
      this.notificationService.error(this.constantValues.APP_NAME, error.detail);
    });
  }

  /**
   * Validate momo phone numbver
   * @param phoneNumber Phone Number to submit to server for validation
   * @param callback ICallback function that returns an error or result
   */
   validateMOMOPhoneNumber(phoneNumber: any, callback: ICallback) {
    this.dataProvider.create(this.constantValues.VALIDATE_PHONE_ENDPOINT, {phone_number: phoneNumber}).subscribe(result => {
      callback(null, result);
    }, error => {
      callback(error, null);
      this.notificationService.error(this.constantValues.APP_NAME, error.detail);
    });
  }
  /**
   * Validate momo phone numbver
   * @param phoneNumber Phone Number to submit to server for validation
   * @param callback ICallback function that returns an error or result
   */
   confirmMOMOPhoneNumber(phoneNumber: any, uniqueCode: any, callback: ICallback) {
    this.dataProvider.create(this.constantValues.CONFIRM_PHONE_NUMBER_ENDPOINT, {phone_number: phoneNumber, unique_code: uniqueCode}).subscribe(result => {
      callback(null, result);
    }, error => {
      callback(error, null);
      this.notificationService.error(this.constantValues.APP_NAME, error.detail);
    });
  }

}
