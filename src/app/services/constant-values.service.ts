import { LocalStorageActionsEnum } from 'src/app/utils/enums';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class ConstantValuesService {
  primaryKey;
  constructor() { }
  get PAGINATION_OPTIONS() { return [10, 25, 100, 150]; }
  get STOREFRONT_MALL_URL_PROTOCOL() { return environment.PROTOCOL; }
  get STOREFRONT_MALL_URL() { return environment.STOREFRONTMALL_URL; }
  get GTP_SUBDOMAIN() { return 'gtpstore,woodin'; }
  // get YOUNG_TEMPLATE_SUBDOMAIN() { return 'kanewu'; }
  get YOUNG_TEMPLATE_SUBDOMAIN() { return 'bquirky'; }
  get WOODIN_SUBDOMAIN() { return 'woodin'; }
  get GTP() { return 'gtpstore'; }
  get LOCAL_STORAGE_ERROR_MESSAGE() { return 'Error loading data'; }
  get SUCCESS_REPSONSE_CODE() { return '100'; }
  get LOCAL_STORAGE_SAVE_ERROR_MESSAGE() { return 'Error saving data'; }
  get DATE_FORMAT() { return 'DD-MM-YYYY'; }
  get DATE_TIME_FORMAT() { return 'DD/MM/YYYY, hh:mm:ss A'; }
  get COUNTRY() { return localStorage.getItem(LocalStorageActionsEnum.COUNTRY); }
  get APP_NAME() { return 'Kokorko'; }
  get BASE_URL() { return environment.BASE_URL; }
  get BASE_URL_KOKORKO(){return environment.BASE_URL_KOKORKO;}
  get ADMIN_BASE_URL() { return environment.ADMIN_BASE_URL; }
  get NEWS_LETTER_URL(){ return environment.NEWS_LETTER_URL;}
  get REFERAL_CODE_URL(){return environment.REFERAL_CODE_URL;}
  get GET_COUNTRY_INFO_URL() {return 'https://ipapi.co/json/'; }
  get USER_PROFILE_ENDPOINT() { return 'users/me/'; }
  get CUSTOMER_SIGNUP_ENDPOINT() { return 'customer_signup/'; }
  get CUSTOMER_SIGNIN_ENDPOINT() { return 'customer_login/'; }
  get GUEST_CUSTOMER_SIGNIN_ENDPOINT() { return 'guest_signup/'; }
  get GET_CURRENT_LOCATION() { return 'http://api.ipstack.com/154.160.19.136?access_key=' + environment.STACK_KEY; }
  get GET_ALL_PRODUCTS_ENDPOINT() { return 'get_mall_products/'; }
  get GET_PRODUCT_DETAIL_ENDPOINT() { return 'product_detail/'; }
  get FEATURED_SHOPS_ENDPOINT() { return 'featured_shops/'; }
  get SHOPS_PROFILE_ENDPOINT() { return 'get_shop/'; }
  get RELATED_PRODUCTS_ENDPOINT() { return 'related_products/'; }
  get UPDATE_DELIVERY_ADDRESS_ENDPOINT() { return 'update_delivery_address/'; }
  get GET_DELIVERY_FEE_ENDPOINT() { return 'get_new_delivery_charge/'; }
  get OLD_DELIVERY_FEE_ENDPOINT() { return 'get_delivery_charge/'; }
  get PLACE_ORDER_ENDPOINT() { return 'place_order/'; }
  get CHECK_MOMO_STATUS_ENDPOINT() { return 'check_momo_status/'; }
  get CUSTOMER_MALL_ORDERS_ENDPOINT() { return 'customer_mall_orders/'; }
  get CUSTOMER_MALL_ORDER_BY_ID_ENDPOINT() { return 'get_mall_order_detail/'; }
  get CUSTOMER_MALL_ORDER_ITEM_ACTIVITY_BY_ID_ENDPOINT() { return 'get_mall_order_item_activities/'; }
  get GET_BANNER_ENDPOINT() { return 'get_sliders/'; }
  get GET_MARKET_PLACE_BANNER_ENDPOINT() { return 'banner_images/'; }
  get CHECK_ACTIVE_PROMO_ENDPOINT() { return 'check_active_promo/'; }
  get GET_PROMO_CODE_VALUE_ENDPOINT() { return 'get_promo_code_value/'; }
  get ADD_ITEM_TO_CART_ENDPOINT() { return 'add_to_cart/'; }
  get GET_CART_ITEMS_ENDPOINT() { return 'get_cart/'; }
  get RETRY_ORDER_PAYMENT_ENDPOINT() { return 'retry_mallorder_payment/'; }
  get VALIDATE_PHONE_ENDPOINT() { return 'validate_phone_number_sms/'; }
  get CONFIRM_PHONE_NUMBER_ENDPOINT() { return 'validate_phone_number/'; }
  get SUBSCRIBE_NEWS_LETTER_ENDPOINT(){return 'subscribe'}
  


  // tslint:disable-next-line: adjacent-overload-signatures
  set COUNTRY(v: string) {
    localStorage.setItem(LocalStorageActionsEnum.COUNTRY, v);
  }

  /**
   * New Endpoint of sign up and login
   */
    get SIGNUP_ENDPOINT(){return 'kokorko/signup/'}
    get CONFIRN_SIGNUP_CODE_ENDPOINT(){return 'kokorko/email_verification/'}

    get LOGIN_CODE_ENPOINT(){return 'kokorko/code/get/'}
    get LOGIN_ENDPOINT(){return 'kokorko/code/login/'}
    get VERIFY_EMAIL_ENDPOINT(){return 'kokorko/email_verification/'}

    get GET_RESET_PASWORD_ENDPOINT(){return 'kokorko/reset_password/get_code/'}
    get CONFIRM_RESET_PASSWORD_CODE_ENDPOINT(){return 'kokorko/reset_password/confirm_code/'}
    get CONFIRM_PASSWORD_ENDPINT(){return 'kokorko/reset_password/confirm_reset/'}


    /**
     * REFER & EARN ENDPOINTS
     */

    get REFERAL_CODE_DETAILS_ENDPOINT(){return 'referral/details'}
}
