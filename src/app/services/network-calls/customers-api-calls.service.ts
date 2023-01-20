import { Injectable } from '@angular/core';
import { ConstantValuesService } from '../constant-values.service';
import { DataProviderService } from '../data-provider.service';
import { NotificationsService } from '../notifications.service';
import { ICallback } from 'src/app/classes/callback-method';

@Injectable({
  providedIn: 'root'
})
export class CustomersApiCallsService {

  constructor(
    private constantValues: ConstantValuesService,
    private dataProvider: DataProviderService,
    private notificationService: NotificationsService
  ) { }
  /**
   * Create a new customer
   * @param payload payload to submit to server
   * @param callback ICallback function that returns an error or result
   */
  create(payload: any, callback: ICallback) {
    this.dataProvider.createNoToken(this.constantValues.CUSTOMER_SIGNUP_ENDPOINT, payload).subscribe(result => {
      callback(null, result);
    }, error => {
      callback(error, null);
      this.notificationService.error(this.constantValues.APP_NAME, error.detail);
    });
  }
   /**
   * Create a new customer
   * @param payload payload to submit to server
   * @param callback ICallback function that returns an error or result
   */
   signup(payload: any, callback: ICallback) {
    this.dataProvider.createNoToken2(this.constantValues.SIGNUP_ENDPOINT, payload).subscribe(result => {
      callback(null, result);
    }, error => {
      callback(error, null);
      this.notificationService.error(this.constantValues.APP_NAME, error.detail);
    });
  }
   /**
   * Create a new customer
   * @param payload payload to submit to server
   * @param callback ICallback function that returns an error or result
   */
   verifyEmail(payload: any, callback: ICallback) {
    this.dataProvider.createNoToken2(this.constantValues.VERIFY_EMAIL_ENDPOINT, payload).subscribe(result => {
      callback(null, result);
    }, error => {
      callback(error, null);
      this.notificationService.error(this.constantValues.APP_NAME, error.detail);
    });
  }
  /**
   * Sign In a customer into StoreFront Mall
   * @param payload payload of credential to sign in
   * @param callback ICallback function that returns an error or result
   */
  signIn(payload: any, callback: ICallback, isGuest: boolean = false) {
    let endpoint = this.constantValues.CUSTOMER_SIGNIN_ENDPOINT;
    if (isGuest) {
      endpoint = this.constantValues.GUEST_CUSTOMER_SIGNIN_ENDPOINT;
    }
    this.dataProvider.createNoToken(endpoint, payload).subscribe(result => {
      callback(null, result);
    }, error => {
      callback(error, null);
      this.notificationService.error(this.constantValues.APP_NAME, error.detail);
    });
  }

  /**
   * Sign In a customer into StoreFront Mall
   * @param payload payload of credential to sign in
   * @param callback ICallback function that returns an error or result
   */
  signInKokorko(payload: any, callback: ICallback, isGuest: boolean = false) {
   
    this.dataProvider.createNoToken2(this.constantValues.LOGIN_ENDPOINT, payload).subscribe(result => {
      callback(null, result);
    }, error => {
      callback(error, null);
      this.notificationService.error(this.constantValues.APP_NAME, error.detail);
    });
  }
   /**
   * Sign In a customer into StoreFront Mall
   * @param payload payload of credential to sign in
   * @param callback ICallback function that returns an error or result
   */
   getLoginCodeKokorko(payload: any, callback: ICallback, isGuest: boolean = false) {
    let endpoint = this.constantValues.LOGIN_CODE_ENPOINT;
    if (isGuest) {
      endpoint = this.constantValues.LOGIN_CODE_ENPOINT;
    }
    this.dataProvider.createNoToken2(endpoint, payload).subscribe(result => {
      callback(null, result);
    }, error => {
      callback(error, null);
      this.notificationService.error(this.constantValues.APP_NAME, error.detail);
    });
  }

  subscribeNews(payload:any,callback:ICallback){
    this.dataProvider.createNoTokenNews(this.constantValues.SUBSCRIBE_NEWS_LETTER_ENDPOINT,payload).subscribe(
      {
        next: (response) => {
          callback(response);
        },error: (error) => {
          //console.log(error)
          //console.log(JSON.stringify(error,null,2))
          this.notificationService.error(this.constantValues.APP_NAME,"Failed to subscribe");
         
        }
      },
    
      );
  }

  /**
   * 
   * @param payload - Referal Code (eg. YY125)
   */
  getReferalCodeDetails(payload:any,callback: any){
    this.dataProvider.httpGetAllNoTokenReferal(this.constantValues.REFERAL_CODE_DETAILS_ENDPOINT,payload).subscribe(
      {
        next: (response) => {
          callback(response);
        },
        complete: () => {
          //console.log('complete fetch categories');
        },
        error: (error) => {
          //this.notificationService.alertError("Error fetching categories");
          //console.log(error);
        }
      }
      );
  }
}
