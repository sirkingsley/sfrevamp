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


}
