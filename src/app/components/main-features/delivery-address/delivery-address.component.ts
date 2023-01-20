import { Component, ElementRef, Input, NgZone, OnInit, ViewChild } from '@angular/core';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatStepper } from '@angular/material/stepper';
import { Title } from '@angular/platform-browser';
import { Router, ActivatedRoute } from '@angular/router';

import { User } from 'src/app/modules/user';
import { AppUtilsService } from 'src/app/services/app-utils.service';
import { AuthService } from 'src/app/services/auth.service';
import { ConstantValuesService } from 'src/app/services/constant-values.service';
import { DbaseUpdateService } from 'src/app/services/dbase-update.service';
import { GetHostnameService } from 'src/app/services/get-hostname.service';
import { OrderApiCallsService } from 'src/app/services/network-calls/order-api-calls.service';
import { ProductsApiCallsService } from 'src/app/services/network-calls/products-api-calls.service';
import { SharedDataApiCallsService } from 'src/app/services/network-calls/shared-data-api-calls.service';
import { ShopApiCallsService } from 'src/app/services/network-calls/shop-api-calls.service';
import { NotificationsService } from 'src/app/services/notifications.service';
import { DeliveryOptions, DeliveryModeEnum, CurrencyEnums, CountryEnum, CheckoutSourceEnums, ResponseCodesEnum, PaymentMethods, PromoCodeRateTypeEnum } from 'src/app/utils/enums';

import { LoginUpdateService } from 'src/app/services/login-update.service';
import { CustomersApiCallsService } from 'src/app/services/network-calls/customers-api-calls.service';
import { NoopScrollStrategy } from '@angular/cdk/overlay';


import AOS from 'aos';
import { LoginMainComponent } from '../../commons/login-main/login-main.component';
import { DataProviderService } from 'src/app/services/data-provider.service';
import { ConfirmPhoneNumberComponent } from '../../commons/confirm-phone-number/confirm-phone-number.component';
import { OrderCompletedDialogComponent } from '../../commons/order-completed-dialog/order-completed-dialog.component';

//import Jquery
//import * as $ from 'jquery';
//JavaScript Functions
declare const custom: any;
// declare const main:any;
// declare const parallaxie: any;
declare const $;

@Component({
  selector: 'app-delivery-address',
  templateUrl: './delivery-address.component.html',
  styleUrls: ['./delivery-address.component.scss']
})
export class DeliveryAddressComponent implements OnInit {
  panelOpenState = false;
  selectedDelivery: string;
  selectedPayment: string;
  delivery: string[] = ['Pick up', 'Bolt', 'DHL', 'Uber Delivery', 'Bike Delivery'];
  payments: string[] = ['Momo', 'Vodafone', 'AirtelTiGo', 'Card']
  isLinear = false;

  isGiftDelivery = false;
  deliveryOptions = DeliveryOptions;
  deliveryModes = DeliveryModeEnum;
  currencies = CurrencyEnums;
  promoCodeFormGroup: FormGroup;
  deliveryOptionsFormCtrl = new FormControl('', [Validators.required]);
  locationFormCtrl = new FormControl('', [Validators.required]);
  //promoCodeFormCtrl = new FormControl('', [Validators.required]);
  deliveryMethod: FormGroup;
  addressFormGroup: FormGroup;
  deliveryAddressFormGroup: FormGroup;
  giftRecipientAddressFormGroup: FormGroup;
  paymentFormGroup: FormGroup;
  latitude: number;
  longitude: number;
  zoom: number;
  countryCode = '';
  paymentMethod = '';
  paymentNetwork = '';
  networkName = '';
  redirectUrl = '';
  isProcessing: boolean;
  address: string;
  charges;
  serviceCharge = 0;
  transactionFee = 0;
  deliveryChargeAmount = 0;
  private geoCoder;
  //currentUser: User;
  cartItems = [];
  currency = '';
  subTotal = 0;
  totalSellingPrice = 0;
  countriesEnum = CountryEnum;
  country = '';
  @Input() checkoutSoure: CheckoutSourceEnums;
  subdomain = '';

  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;

  @ViewChild('location')
  public searchElementRef: ElementRef;

  @ViewChild('stepper')
  fathersDay = false;
  public stepper: MatStepper;
  grandTotal: number;
  orderCode: any;
  discountCode = '';
  discountAmount = 0;
  discountRateValue = 0;
  discountRateType = '';
  shopHasActivePromo = false;
  cediEquivalent = 0;
  delviveryChargeUSDEquivalent = 0;
  exchangeRate = 1;
  featuredShops = [];
  industries = [];
  isProcessingFeaturedShops: boolean;
  windowLoaded = false;
  formGroup: FormGroup;
  isLoggedIn = false;
  currentUser: User;
  isGuest = false;
  btnText = 'SIGN IN';
  heading = 'Sign In';
  proceed = false;
  promos: any = [];
  rate: number = 0;
  constructor(

    private dataproviderService: DataProviderService,
    private formBuilder: FormBuilder,
    private sharedDataApiCallsService: SharedDataApiCallsService,
    // private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    private orderService: OrderApiCallsService,
    private authService: AuthService,
    private shopApiCalls: ShopApiCallsService,
    private title: Title,
    private dialog: MatDialog,
    private productsApiCalls: ProductsApiCallsService,
    private router: Router,
    private route: ActivatedRoute,
    private dbaseUpateService: DbaseUpdateService,
    private notificationsService: NotificationsService,
    private appUtils: AppUtilsService,
    private getHostname: GetHostnameService,
    private shopsApiCalls: ShopApiCallsService,
    private constantValues: ConstantValuesService,
    private _formBuilder: FormBuilder,
    private dbaseUpdate: DbaseUpdateService,
    //@Inject(WINDOW) public window: Window,
    private customersApiCalls: CustomersApiCallsService,

    //private dialogRef: MatDialogRef<LoginComponent>,
    private loginUpdate: LoginUpdateService,
    //@Inject(MAT_DIALOG_DATA) public data: any,

  ) {
  }

  isEditable = false;
  loader = true;

  //Call JavaScript functions onload
  onload() {
    custom();
    //main();
    //parallaxie();
  }


  async ngOnInit(): Promise<void> {

    this.getCountry();
    this.selectPaymentMethod();
    this.getCartItems();
  
    AOS.init();

    //Loader variable set false after page load
    setTimeout(() => {
      this.loader = false;
    }, 1000);
    this.isLoggedIn = this.authService.isLogedIn;
    this.currentUser = this.authService.currentUser;

    this.addressFormGroup = this.formBuilder.group({
      address: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      location: ['', Validators.required],
      delivery_option: [this.selectedDelivery],
      delivery_mode: [DeliveryModeEnum.INSTANT],
      latitude: [''],
      postal_code:[''],
      country:[''],
      full_name: [''],
      longitude: [''],
      order_items: [[this.order_items]],
      shops: [[]],
      order_note: [''],
    });

    this.giftRecipientAddressFormGroup = this.formBuilder.group({
      gift_recipient_name: ['', Validators.required],
      gift_recipient_email: ['', [Validators.required, Validators.email]],
      gift_recipient_phone_number: ['', Validators.required],
      gift_recipient_address: ['', Validators.required],
      order_note: [''],
      gift_recipient_latitude: [''],
      gift_recipient_longitude: ['']
    });

    this.deliveryMethod = this.formBuilder.group({
      bolt_delivery: [''],
      delivery_method: new FormControl(this.selectedDelivery, [Validators.required]),
      isLogedIn: new FormControl(this.isLoggedIn, [Validators.required, Validators.requiredTrue]),
    });
    this.paymentFormGroup = this.formBuilder.group({
      payment_method: [''],
      payment_option: [''],
      checkout_origin: [this.checkoutSoure],
      delivery_option: [''],
      payment_network: [''],
      discount: [''],
      payment_voucher_code: [''],
      sender_wallet_number: [''],
      total_amount: [''],
      delivery_fee: [''],
      promo_code: [''],
      order_items: [[]]
    });

  

    // console.log("Currency=>" + this.currency);
    // console.log("Country=>" + this.country);

    this.onload();

  }
  //OnInit End===================================================================


  /**
   * When payment method is selected
   * @param paymentMethod payment method
   * @param paymentNetwork payment network when method is MOMO
   * @param networkFullName payment network full name
   */
  selectPaymentMethod() {
    const user_choice = JSON.parse(localStorage.getItem('user_choice'));
    //console.log("Payment_option=>"+user_choice.payment_option);
    this.paymentMethod = '';
    this.paymentNetwork = '';
    this.networkName = '';
    this.paymentMethod = user_choice.payment_option;
    this.selectedDelivery = user_choice.delivery_option;

  }
  

  /**
   * Update customer's delivery address on server
   * @param data request payload
   */
  updateDeliveryAddress(data) {
    if (!this.authService.isLogedIn) {
      this.notificationsService.info(this.constantValues.APP_NAME, 'Please login to continue');
      return;
    }
    if (this.cartItems.length <= 0) {
      this.notificationsService.info(this.constantValues.APP_NAME, 'Please add item to cart to continue');
      return;
    }
    this.isProcessing = true;
    this.getDeliveryCharge(data);
    //console.log("Items in Cart");
    this.orderService.updateDeliveryAddress(data, (error, result) => {
      //console.log("orderService.updateDeliveryAddress---");
      if (result !== null) {
        //console.log("orderService.updateDeliveryAddress not null");
        this.authService.saveUser(result.results);
        
        this.proceed = true;
        //this.placeOrder(this.paymentFormGroup.value);
        //this.notificationsService.success("", "Address confirmed. Scroll down to make payment");
        this.placeOrder(this.paymentFormGroup.value);
      }
    });
  }

  /**
   * Get delivery charge basd on the location provided
   * @param data request payload
   */
  getDeliveryCharge(data) {
    const shops = [];
    this.cartItems.forEach(el => {
      shops.push(el.item.myshop.storefrontmall_name);
    });
    this.isProcessing = true;
    data.delivery_option = this.selectedDelivery;
    data.shops = shops.join(',');
    data.order_items = this.getOrderItems;
    this.orderService.getDeliveryCharge(data, (error, result) => {
      this.isProcessing = false;
      if (result !== null) {
        this.charges = result;
        // tslint:disable-next-line: max-line-length
        let deliveryCharge = (this.charges !== null && this.charges !== '' && this.charges !== undefined) ? +this.charges.delivery_fee : 0;
        let serviceCharge = (this.charges !== null && this.charges !== '' && this.charges !== undefined) ? +this.charges.service_charge : 0;
        let transactionFee = (this.charges !== null && this.charges !== '' && this.charges !== undefined) ? +this.charges.transaction_fee : 0;
        if (this.constantValues.YOUNG_TEMPLATE_SUBDOMAIN.includes(this.subdomain)) {
          deliveryCharge = deliveryCharge / this.exchangeRate;
          serviceCharge = serviceCharge / this.exchangeRate;
          transactionFee = transactionFee / this.exchangeRate;
        }
        this.deliveryChargeAmount = +this.charges.delivery_fee;
        this.serviceCharge = +this.charges.service_charge;
        this.transactionFee = +this.charges.transaction_fee;
        this.grandTotal = +this.subTotal;
        //console.log("this.charges" + JSON.stringify(this.charges, null, 2));
      }
    });
  }
  /**
   * Compute sub total of items in cart
   */
  getSubTotal() {
    if (this.country === this.countriesEnum.GH) {
      this.subTotal = this.cartItems.reduce((acc, value) => acc + parseFloat(value.total_amount), 0);
      this.totalSellingPrice = this.cartItems.reduce((acc, value) => acc + parseFloat(value.item.selling_price), 0);
    }
    if (this.country === this.countriesEnum.NG) {
      this.subTotal = this.cartItems.reduce((acc, value) => acc + parseFloat(value.total_amount_ngn), 0);
      this.totalSellingPrice = this.cartItems.reduce((acc, value) => acc + parseFloat(value.item.selling_price_ngn), 0);
    } else {
      this.currency = '$';
      this.subTotal = this.cartItems.reduce((acc, value) => acc + parseFloat(value.total_amount_usd), 0);
      this.totalSellingPrice = this.cartItems.reduce((acc, value) => acc + parseFloat(value.item.selling_price_usd), 0);
    }

    if (this.discountRateType === PromoCodeRateTypeEnum.FLAT) {
      this.discountAmount = this.discountRateValue;
    } else if (this.discountRateType === PromoCodeRateTypeEnum.PERCENTAGE) {
      const percentage = this.discountRateValue;
      this.discountAmount = (percentage / 100) * this.subTotal;
    }
    this.grandTotal = this.subTotal;
  }
  /**
   * Get Items in cart
   */
  async getCartItems() {
    await this.productsApiCalls.getCartItems((error, result) => {
      if (result !== null) {
        this.cartItems = result;
        //console.log("cart-->"+JSON.stringify(this.cartItems,null,2));
        if (this.cartItems.length > 0) {
          this.currency = this.cartItems[0].item.currency;
          this.country = this.cartItems[0].country;
          this.cartItems = this.cartItems.sort(this.compare);
          // tslint:disable-next-line: max-line-length
          const deliveryCharge = this.deliveryChargeAmount;
          const serviceCharge = this.serviceCharge;
          const transactionCharge = this.transactionFee;
          this.grandTotal = this.subTotal + deliveryCharge + serviceCharge + transactionCharge;
        }
        this.getSubTotal();

      }
    });
  }
  /**
   * Submit order for an authenticated user
   * @param data request payload
   */
  placeOrder(data) {

    // if (!this.isLoggedIn) {
    //   this.notificationsService.info(this.constantValues.APP_NAME, 'Please login to continue');
    //   return;
    // }
    if (this.selectedDelivery === '' || this.selectedDelivery === undefined || this.selectedDelivery === null) {
      this.notificationsService.info(this.constantValues.APP_NAME, 'Please select delivery option to continue');
      return;
    }


    if (this.cartItems.length <= 0) {
      this.notificationsService.info(this.constantValues.APP_NAME, 'Please add item to cart to continue');
      return;
    }

    if (this.paymentMethod === '' || this.paymentMethod === undefined || this.paymentMethod === null) {
      this.notificationsService.info(this.constantValues.APP_NAME, 'Please select a payment method to continue');
      return;
    }
   
    else {
      this.processOrder(data);
    }

  }
  private processOrder(data: any) {
    this.isProcessing = true;
    // tslint:disable-next-line: max-line-length
    data.delivery_fee = (this.selectedDelivery !== this.deliveryOptions.PICKUP && this.selectedDelivery !== this.deliveryOptions.GIFT) ? +this.deliveryChargeAmount : 0;
    data.service_charge = (this.selectedDelivery !== this.deliveryOptions.PICKUP && this.selectedDelivery !== this.deliveryOptions.GIFT) ? +this.serviceCharge : 0;
    data.transaction_fee = (this.selectedDelivery !== this.deliveryOptions.PICKUP && this.selectedDelivery !== this.deliveryOptions.GIFT) ? +this.transactionFee : 0;
    data.payment_method = this.paymentMethod;
    data.payment_option = this.paymentMethod;
    data.payment_network = this.paymentNetwork;
    data.browser_token = this.authService.getNotificationToken;
    // tslint:disable-next-line: max-line-length
    if (this.shopHasActivePromo && this.promoCodeFormCtrl.value !== null && this.promoCodeFormCtrl.value !== '' && this.promoCodeFormCtrl.value !== undefined) {
      data.promo_code = this.promoCodeFormCtrl.value;
      data.discount = this.discountAmount;
    }
    
    data.total_amount = (this.grandTotal - this.discountAmount);
  
    data.checkout_origin = this.checkoutSoure;
    data.delivery_option = this.selectedDelivery;
    data.currency = this.cartItems[0].item.currency;
    if (this.selectedDelivery === this.deliveryOptions.GIFT) {
      // tslint:disable-next-line: max-line-length
      data = JSON.parse('{' + this.appUtils.removeBraceBrackets(JSON.stringify(data) + ',' + JSON.stringify(this.giftRecipientAddressFormGroup.value)) + '}');
    }
    data.order_items = this.getOrderItems;
    data.checkout_type = '';
    data.product_variants = '';
    // if (this.constantValues.YOUNG_TEMPLATE_SUBDOMAIN.includes(this.subdomain)) {
    //   data.checkout_type = 'USD_ONLY';
    //   data.product_variants = this.getProductVariants;
    // }
    //console.log(JSON.stringify(data,null,2))

    this.orderService.placeOrder(data, (error, result) => {
      this.isProcessing = false;
      if (result !== null && result.transaction_id !== '' && result.transaction_id !== undefined) {
        //console.log("Results=>"+JSON.stringify(result,null,2));
        this.orderCode = result.order_code;
        // this.productsApiCalls.clearCartItem((clearCartError, clearCartResult) => {
        //   if (clearCartResult !== null) {
        //     this.getCartItems();
        //     //this.currency = '';
        //     this.grandTotal = 0;
        //     this.charges = 0;
        //     this.deliveryChargeAmount = 0;
        //     this.serviceCharge = 0;
        //     this.transactionFee = 0;
        //     this.dbaseUpateService.dbaseUpdated(true);
        //   }
        // });
        // if (this.paymentMethod === PaymentMethods.CARD) {

        //this.notificationsService.success(this.constantValues.APP_NAME, 'Order successfully placed. Kindly proceed to make Payment');
        this.redirectUrl = result.redirect_url;



        //console.log("result.redirect_url==>" + result.redirect_url);
        window.open(`${result.redirect_url}`, `_blank`);
        //window.location.href = `${result.redirect_url}`;

        // setTimeout(() => {
        //   this.router.navigate(['/profile-view/orders']);
        // }, 5000);

      }
    });
  }

  /**
   * Get order items in cart, this will added place_order payload as order_items
   */
  get getOrderItems() {
    const orderItems = [];
    this.cartItems.forEach(item => {
      orderItems.push({
        product_id: item.item.id,
        quantity: item.quantity,
        subtotal: item.total_amount
      });
    });
    return orderItems;
  }
  get getProductVariants() {
    let orderItems = [];
    orderItems = this.cartItems.map(item => item.item.id + ':' + item.variant);
    return orderItems.join(',');
  }
 



  compare(a: any, b: any) {
    if (a.item.name < b.item.name) {
      return -1;
    }
    if (a.item.name > b.item.name) {
      return 1;
    }
    return 0;
  }

  /**
   * Get the Country User is located
   */
  getCountry() {
    this.isProcessing = true;
    this.productsApiCalls.getCountryInfo((error, result) => {
      this.isProcessing = false;
      if (result !== null) {
        this.country = result.country;
        this.currency = (result.currency === CurrencyEnums.GHS || result.currency === CurrencyEnums.NGN) ? result.currency : CurrencyEnums.USD;
        // console.log("result.country=>" + result.country);
        // console.log("result.currency=>" + result.currency);
      }
    });

  }





  get phone_number() { return this.formGroup.get('phone_number'); }
  get password() { return this.formGroup.get('password'); }
  get customer_name() { return this.formGroup.get('customer_name'); }
  get email() { return this.formGroup.get('email'); }
  get promoCodeFormCtrl() { return this.promoCodeFormGroup.get('promoCode') }

  get location() { return this.addressFormGroup.get('location'); }
  get latitude_ctrl() { return this.addressFormGroup.get('latitude'); }
  get longitude_ctrl() { return this.addressFormGroup.get('longitude'); }
  get address_ctrl() { return this.addressFormGroup.get('address'); }
  get state_ctrl() { return this.addressFormGroup.get('state'); }
  get city_ctrl() { return this.addressFormGroup.get('city'); }
  get delivery_mode() { return this.addressFormGroup.get('delivery_mode'); }
  get order_notes_ctrl() { return this.addressFormGroup.get('order_notes'); }


  get address_ctr() { return this.deliveryAddressFormGroup.get('address'); }
  get state() { return this.deliveryAddressFormGroup.get('state'); }
  get city() { return this.deliveryAddressFormGroup.get('city'); }
  get order_notes() { return this.deliveryAddressFormGroup.get('order_notes'); }
  get order_items() { return this.cartItems; }

  get gift_recipient_name() { return this.giftRecipientAddressFormGroup.get('gift_recipient_name'); }
  get gift_recipient_email() { return this.giftRecipientAddressFormGroup.get('gift_recipient_email'); }
  get gift_recipient_phone_number() { return this.giftRecipientAddressFormGroup.get('gift_recipient_phone_number'); }
  get gift_recipient_address() { return this.giftRecipientAddressFormGroup.get('gift_recipient_address'); }
  get order_note() { return this.giftRecipientAddressFormGroup.get('order_note'); }
  get gift_recipient_latitude() { return this.giftRecipientAddressFormGroup.get('gift_recipient_latitude'); }
  get gift_recipient_longitude() { return this.giftRecipientAddressFormGroup.get('gift_recipient_longitude'); }



}
