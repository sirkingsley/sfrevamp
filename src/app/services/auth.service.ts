import { User } from './../modules/user';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
//import { uuid4 } from '@sentry/utils';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private user = new User();
  private logedInCount = 'logedInCount';
  constructor(
    private router: Router,
  ) { }
  /**
   * Verify if a user is logged in
   * @returns True if logged in else false
   */
  get isLogedIn(): boolean {
    const token = localStorage.getItem('token');
    if (token) {
      return true;
    }
    return false;
  }
  /**
   * Verify if a user is logged in for the first time
   * @returns True if logged in else false
   */
  get isFirstLogedIn(): boolean {
    const status = localStorage.getItem(this.logedInCount);
    if (status !== undefined && status !== '' && status === '1') {
      return true;
    }
    return false;
  }
  /**
   * Upate first logged in status
   * @param status logged in status
   */
  increaseLoggedInCount() {
    let count: number = this.getLogedInCount;
    if (count !== undefined && !Number.isNaN(count) && count !== null) {
      count += 1;
      localStorage.setItem(this.logedInCount, count.toString());
    }
  }
  /**
   * Get user's logged in count
   * @returns Number
   */
  get getLogedInCount(): number {
    const status = localStorage.getItem(this.logedInCount);
    let count = 0;
    if (status !== undefined && status !== '' && status !== null) {
      // tslint:disable-next-line:radix
      count = Number.parseInt(status);
    }
    return count;
  }
  /**
   * Get information about current user logged in from localStorage
   * @returns User object
   */
  get currentUser() {
    this.user = (JSON.parse(localStorage.getItem('user')) as User);
    if (!this.user) {
      return null;
    }
    return this.user;
  }
  /**
   * Save user's information locally in localStorage
   * @param user User data in JSON format
   */
  saveUser(user) {
    localStorage.setItem('user', JSON.stringify(user));
  }
  /**
   * Save user's token to localStorage
   * @param token User's auth_token from server
   */
  saveToken(token) {
     localStorage.setItem('token', token);
  }

  removeUserAndToken() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    // localStorage.removeItem('browser_token');
  }
  /**
   * Locally update user information in localStorage
   * @param key Key to update
   * @param value Value to update to
   */
  updateUser(key: string, value: any) {
    const user = JSON.parse(localStorage.getItem('user')) as User;
    if (this.user) {
      user[key] = value;
      localStorage.setItem('user', JSON.stringify(user));
    }
  }
  /**
   * Get logged in user's auth_token
   * @returns Returns string of auth token, but null if not exist
   */
  get token() {
    return (localStorage.getItem('token') !== undefined && localStorage.getItem('token') !== null) ? localStorage.getItem('token') : null;
  }
  /**
   * Get noifcation token
   */
  get getNotificationToken() {
    const uuId = localStorage.getItem('uuid');
    let token = '';
    if (uuId !== undefined && uuId !== null && uuId !== '') {
      token = uuId;
    } else {
      //token = uuid4();
      token = "";
      localStorage.setItem('uuid', token);
    }
    return token;
  }
  /**
   * Get notification token
   * @returns notication token
   */
  get notifictionToken() {
    const token = localStorage.getItem('browser_token');
    if (!token) {
      return null;
    }
    return token;
  }
  /**
   * Get promo code
   */
  get getPromoCode() {
    return (localStorage.getItem('promo_code') !== undefined && localStorage.getItem('promo_code') !== null) ? localStorage.getItem('promo_code') : '';
  }
  /**
   * Set promo code
   */
  setPromoCode(promoCode) {
    if (promoCode !== undefined && promoCode !== null && promoCode !== '') {
      localStorage.setItem('promo_code', promoCode);
    }
  }
  get hasShowedPromoDialog() {
    return (localStorage.getItem('CURRENT_PROMO') !== undefined && localStorage.getItem('CURRENT_PROMO') !== null) ? true : false;
  }
    /**
   * Set promo code
   */
     setPromo(promoCode) {
      if (promoCode !== undefined && promoCode !== null && promoCode !== '') {
        localStorage.setItem('CURRENT_PROMO', promoCode);
      }
    }

    get getExchangeRate() {
      return (localStorage.getItem('ERate') !== undefined && localStorage.getItem('ERate') !== null) ? +localStorage.getItem('ERate') : 0;
    }
      /**
     * Set exchange rate
     */
       setExchangeRate(exchangeRate) {
        if (exchangeRate !== undefined && exchangeRate !== null && exchangeRate !== '') {
          localStorage.setItem('ERate', exchangeRate);
        }
      }


  /**
   * Logout user from system
   */
  logOut() {
    const count = this.getLogedInCount;
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('prefix');
    this.removeUserAndToken();
    localStorage.clear();
    localStorage.setItem(this.logedInCount, count.toString());
  }
}
