import { NoopScrollStrategy } from '@angular/cdk/overlay';
import { Component, ElementRef, Input, NgZone, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatStepper } from '@angular/material/stepper';
import { Title } from '@angular/platform-browser';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from 'src/app/modules/user';
import { AppUtilsService } from 'src/app/services/app-utils.service';
import { AuthService } from 'src/app/services/auth.service';
import { ConstantValuesService } from 'src/app/services/constant-values.service';
import { DataProviderService } from 'src/app/services/data-provider.service';
import { DbaseUpdateService } from 'src/app/services/dbase-update.service';
import { GetHostnameService } from 'src/app/services/get-hostname.service';
import { LoginUpdateService } from 'src/app/services/login-update.service';
import { CustomersApiCallsService } from 'src/app/services/network-calls/customers-api-calls.service';
import { OrderApiCallsService } from 'src/app/services/network-calls/order-api-calls.service';
import { ProductsApiCallsService } from 'src/app/services/network-calls/products-api-calls.service';
import { SharedDataApiCallsService } from 'src/app/services/network-calls/shared-data-api-calls.service';
import { ShopApiCallsService } from 'src/app/services/network-calls/shop-api-calls.service';
import { NotificationsService } from 'src/app/services/notifications.service';
import { DeliveryOptions, DeliveryModeEnum, CurrencyEnums, CountryEnum, CheckoutSourceEnums, PaymentMethods, PromoCodeRateTypeEnum, ResponseCodesEnum } from 'src/app/utils/enums';
import { ConfirmOrderPaymentDialogComponent } from '../../commons/confirm-order-payment-dialog/confirm-order-payment-dialog.component';
import { ConfirmPhoneNumberComponent } from '../../commons/confirm-phone-number/confirm-phone-number.component';
import { LoginMainComponent } from '../../commons/login-main/login-main.component';
import { OrderCompletedDialogComponent } from '../../commons/order-completed-dialog/order-completed-dialog.component';
import AOS from 'aos';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { SearchCountryField, CountryISO, PhoneNumberFormat } from 'ngx-intl-tel-input';

declare const custom: any;
declare const $;
@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})



export class CheckoutComponent implements OnInit {
  separateDialCode = false;
	SearchCountryField = SearchCountryField;
	CountryISO = CountryISO;
  PhoneNumberFormat = PhoneNumberFormat;
	preferredCountries: CountryISO[] = [CountryISO.Ghana, CountryISO.Nigeria];
	phoneForm = new FormGroup({
		phone: new FormControl(undefined, [Validators.required])
	});

	changePreferredCountries() {
		this.preferredCountries = [CountryISO.Ghana, CountryISO.Nigeria];
	}
  modalRef?: BsModalRef;
  selected ="";
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
  delieryCharge;
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
    private modalService: BsModalService,
  ) {

  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template,{
      class: 'modal-dialog-centered', 
    });
  }
  //  firstFormGroup = this._formBuilder.group({
  //   firstCtrl: ['', Validators.required],
  // });
  // secondFormGroup = this._formBuilder.group({
  //   secondCtrl: ['', Validators.required],
  // });
  isEditable = false;
  //Call JavaScript functions onload
  onload() {
    custom();
    //main();
    //parallaxie();
  }
  loader = true;

  async ngOnInit(): Promise<void> {
    this.getCountry();

    //this.getActivePromo("gtpstore");
    AOS.init();
    //Loader variable set false after page load
    setTimeout(() => {
      this.loader = false;
    }, 1000);
    this.isLoggedIn = this.authService.isLogedIn;
    this.currentUser = this.authService.currentUser;


    
    //console.log(this.currentUser);
    // this.window.addEventListener('load',()=>{
    //   this.windowLoaded=true;
    //   //alert("hi");
    // })
   
    this.getCartItems();
    this.getIndustries()
    this.getFeaturedShops({});
    //this.setCurrentLocation();
    this.title.setTitle(this.constantValues.APP_NAME + ' Checkout Payment');
    this.subdomain = this.getHostname.subDomain;
    this.currentUser = this.authService.currentUser;

    this.promoCodeFormGroup = this.formBuilder.group({
      promoCode: ['', Validators.required]
    })

    //Check if user is not login and alert user
    if (!this.isLoggedIn) {
      this.dialog.open(LoginMainComponent,{
        panelClass: 'custom-dialog-container',
        data: {},
        disableClose: false,
        scrollStrategy: new NoopScrollStrategy(),
      })
        .afterClosed().subscribe((isSuccess: boolean) => {
          if (isSuccess) {
            if (this.checkoutSoure === CheckoutSourceEnums.SF_MARKET_PLACE) {
              this.router.navigate(['/checkout2']);
            } else if (this.checkoutSoure === CheckoutSourceEnums.SHOP_MALL) {

              this.router.navigate(['/checkout2']);
            }
          }
        });
    } //Login popup end

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
      isLogedIn: new FormControl(this.isLoggedIn, [Validators.required,Validators.requiredTrue]),
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

    this.formGroup = new FormGroup({
      phone_number: new FormControl('', [Validators.required]),
      password: new FormControl(''),
      email: new FormControl('', [Validators.email]),
      customer_name: new FormControl('')
    });


    // if (!this.authService.isLogedIn) {
    //   this.dialog.open(GuestUserComponent).afterClosed().subscribe(async (isSuccess: boolean) => {
    //     if (isSuccess) {
    //       this.address_ctrl.setValue(this.authService.currentUser.address);
    //       this.city_ctrl.setValue(this.authService.currentUser.city);
    //       this.state_ctrl.setValue(this.authService.currentUser.brief);
    //       await this.getCartItems();
    //       // this.getPromoCodeValue('', true);
    //     }
    //   });
    // } else {
    //   this.address_ctrl.setValue(this.authService.currentUser.address);
    //   this.city_ctrl.setValue(this.authService.currentUser.city);
    //   this.state_ctrl.setValue(this.authService.currentUser.brief);
    //   await this.getCartItems();
    //   // this.getPromoCodeValue('', true);
    // }
    if (this.getHostname.isShopMall) {
      this.getActivePromo(this.getHostname.subDomain);
    }
    this.getShopPromos();
    // this.getActivePromo('lgenterprise');
    this.route.queryParams.subscribe(param => {
      const promoCode = param['promoCode'];
      if (promoCode !== null && promoCode !== undefined && promoCode !== '') {
        this.authService.setPromoCode(promoCode);
        if (this.getHostname.isShopMall) {
          this.getActivePromo(this.getHostname.subDomain);
        }
        // this.getActivePromo('lgenterprise');
      }
    });
    if (this.constantValues.YOUNG_TEMPLATE_SUBDOMAIN.includes(this.getHostname.subDomain)) {
      this.getShopInfo();
    }

    // console.log("Currency=>"+this.currency);
    // console.log("Country=>"+this.country);
  


    // $('#flip').on("click",function(){
    //   $("#panel").slideToggle("slow");
    // });

    // $('.search_btn').on("click",function(){
    //   $("#search_body_collapse").slideToggle("slow");
    // });
    this.onload()
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required],
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required],
    });

   
 
  }

 /**
   * Country code selected
   * @param countryInfo country info
   */
  onCountry(countryInfo) {
    if (countryInfo !== undefined && countryInfo !== null) {
      this.countryCode = '+' + (countryInfo.callingCodes[0] as string);
    }
  }
  
  getFeaturedShops({ }) {
    this.isProcessingFeaturedShops = true;
    this.shopsApiCalls.getFeaturedShops({}, (error, result) => {
      this.isProcessingFeaturedShops = false;
      if (result !== null) {
        this.featuredShops = result.results;
        //console.log("this.featuredShops-->"+ JSON.stringify(this.featuredShops));
      }
    });
  }

  getIndustries() {
    this.shopsApiCalls.getIndustries((error, result) => {
      this.industries = result;
      //console.log("this.industries "+ JSON.stringify(this.industries) );
    });
  }
  getDeliveryOption() {
    console.log(this.deliveryOptionsFormCtrl.value);
  }
  // ngAfterViewInit() {
  //   this.setCurrentLocation();
  //   this.mapsAPILoader.load().then(() => {
  //     this.setCurrentLocation();
  //     // tslint:disable-next-line: new-parens
  //     this.geoCoder = new google.maps.Geocoder();

  //     const autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement);

  //     autocomplete.addListener('place_changed', () => {
  //       this.ngZone.run(() => {
  //         // get the place result
  //         const place: google.maps.places.PlaceResult = autocomplete.getPlace();

  //         // verify result
  //         if (place.geometry === undefined || place.geometry === null) {
  //           return;
  //         }
  //         this.gift_recipient_address.setValue(this.searchElementRef.nativeElement.value);
  //         this.location.setValue(this.searchElementRef.nativeElement.value);
  //         // set latitude, longitude and zoom
  //         this.latitude = place.geometry.location.lat();
  //         this.longitude = place.geometry.location.lng();
  //         this.zoom = 12;
  //         this.address = this.searchElementRef.nativeElement.value;
  //         this.locationFormCtrl.setValue(this.address);
  //         this.location.setValue(this.address);
  //         this.latitude_ctrl.setValue(this.latitude);
  //         this.longitude_ctrl.setValue(this.longitude);

  //         this.gift_recipient_address.setValue(this.address);
  //         this.gift_recipient_latitude.setValue(this.latitude);
  //         this.gift_recipient_longitude.setValue(this.longitude);
  //       });
  //     });
  //   });
  // }
  /**
   * Set current locaiton on map. This only happens when user allows location access in browser
   */
  private setCurrentLocation() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.zoom = 15;

        console.log("LAT,LOG: " + this.latitude + " " + this.longitude);
        //this.getAddress(position.coords.latitude, position.coords.longitude);
      });
    }
  }
  /**
   * On Map Marker dragged
   * @param $event marker drag end event data
   */
  markerDragEnd($event) {
    this.latitude = $event.coords.lat;
    this.longitude = $event.coords.lng;
    this.getAddress(this.latitude, this.longitude);
  }

  /**
   * When payment method is selected
   * @param paymentMethod payment method
   * @param paymentNetwork payment network when method is MOMO
   * @param networkFullName payment network full name
   */
  selectPaymentMethod(paymentMethod, paymentNetwork, networkFullName) {
    this.paymentMethod = '';
    this.paymentNetwork = '';
    this.networkName = '';
    this.paymentMethod = paymentMethod;
    this.paymentNetwork = paymentNetwork;
    this.networkName = networkFullName;
  
    if (paymentMethod === PaymentMethods.MOMO && this.constantValues.YOUNG_TEMPLATE_SUBDOMAIN.includes(this.getHostname.subDomain)) {
      this.getShopInfo();
    }

    // console.log('pm--'+this.paymentMethod);
    // console.log('pn--'+this.paymentNetwork);
    // console.log('networkName--'+this.networkName);
  }
  // showPaymentPrompt() {
  //   if (this.paymentMethod === PaymentMethods.CARD) {
  //     this.redirectUrl = '';
  //     this.isProcessing = true;

  //   } else {

  //   }
  // }
  /**
   * Get road name (address) of a location by latitude and longitude
   * @param latitude latitude
   * @param longitude longitude
   */
  getAddress(latitude, longitude) {
    this.geoCoder.geocod({ location: { lat: latitude, lng: longitude } }, (results, status) => {
      if (status === 'OK') {
        console.log("LAT,LOG: " + this.latitude + " " + this.longitude);
        if (results[0]) {
          this.zoom = 12;
          this.address = results[0].formatted_address;
          this.locationFormCtrl.setValue(this.address);
          this.location.setValue(this.address);
          this.latitude_ctrl.setValue(this.latitude);
          this.longitude_ctrl.setValue(this.longitude);

          this.gift_recipient_address.setValue(this.address);
          this.gift_recipient_latitude.setValue(this.latitude);
          this.gift_recipient_longitude.setValue(this.longitude);
        } else {
          this.location.setValue('Unnamed Road');
          this.latitude_ctrl.setValue(this.latitude);
          this.longitude_ctrl.setValue(this.longitude);

          this.locationFormCtrl.setValue(this.address);
          this.gift_recipient_address.setValue(this.address);
          this.gift_recipient_latitude.setValue(this.latitude);
          this.gift_recipient_longitude.setValue(this.longitude);
        }
      } else {
        this.location.setValue('Unnamed Road');
        this.latitude_ctrl.setValue(this.latitude);
        this.longitude_ctrl.setValue(this.longitude);

        this.locationFormCtrl.setValue(this.address);
        this.gift_recipient_address.setValue(this.address);
        this.gift_recipient_latitude.setValue(this.latitude);
        this.gift_recipient_longitude.setValue(this.longitude);
      }

    });
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
    // if (!this.authService.isLogedIn) {
    //   this.dialog.open(GuestUserComponent).afterClosed().subscribe(async (isSuccess: boolean) => {
    //     if (isSuccess) {
    //       this.address_ctrl.setValue(this.authService.currentUser.address);
    //       this.city_ctrl.setValue(this.authService.currentUser.city);
    //       this.state_ctrl.setValue(this.authService.currentUser.brief);
    //       await this.getCartItems();
    //       return;
    //       // this.getPromoCodeValue('', true);
    //     }
    //   });
    //   return;
    // }
    //console.log("updateDeliveryAddress");
    if (this.cartItems.length <= 0) {

      this.notificationsService.info(this.constantValues.APP_NAME, 'Please add item to cart to continue');
      return;
    }
    this.isProcessing = true;
    //console.log("Items in Cart");
    this.orderService.updateDeliveryAddress(data, (error, result) => {
      //console.log("orderService.updateDeliveryAddress---");
      if (result !== null) {
        //console.log("orderService.updateDeliveryAddress not null");
        this.authService.saveUser(result.results);
        this.getDeliveryCharge(data);
        this.proceed = true;
        this.notificationsService.success("", "Address confirmed. Scroll down to make payment");
      }
    });
  }
  
  back() {
    this.router.navigate(['/cart'])
  }
  Guest() {
    this.isGuest = !this.isGuest;
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
        this.delieryCharge = result;
        // console.log("D-->"+JSON.stringify(this.delieryCharge,null,2) )
        //console.log("Selec-->"+this.selectedDelivery )
        // tslint:disable-next-line: max-line-length
        let deliveryCharge = (this.delieryCharge !== null && this.delieryCharge !== '' && this.delieryCharge !== undefined) ? +this.delieryCharge.delivery_fee : 0;
        let serviceCharge = (this.delieryCharge !== null && this.delieryCharge !== '' && this.delieryCharge !== undefined) ? +this.delieryCharge.service_charge : 0;
        let transactionFee = (this.delieryCharge !== null && this.delieryCharge !== '' && this.delieryCharge !== undefined) ? +this.delieryCharge.transaction_fee : 0;
        if (this.constantValues.YOUNG_TEMPLATE_SUBDOMAIN.includes(this.subdomain)) {
          deliveryCharge = deliveryCharge / this.exchangeRate;
          serviceCharge = serviceCharge / this.exchangeRate;
          transactionFee = transactionFee / this.exchangeRate;
        }
        this.deliveryChargeAmount = +deliveryCharge.toFixed(2);
        this.serviceCharge = +serviceCharge.toFixed(2);
        this.transactionFee = +transactionFee.toFixed(2);
        this.grandTotal = +this.subTotal + this.deliveryChargeAmount + this.serviceCharge + this.transactionFee;
        //console.log("this.delieryCharge"+JSON.stringify(this.delieryCharge,null,2));
        //this.stepper.next();
      }
    });
  }
  /**
   * Compute sub total of items in cart
   */
  getSubTotal() {

    if (this.country === this.countriesEnum.GH || this.country === this.countriesEnum.NG || this.country === undefined || this.country === '') {
      this.subTotal = this.cartItems.reduce((acc, value) => acc + parseFloat(value.total_amount), 0);
      this.totalSellingPrice = this.cartItems.reduce((acc, value) => acc + parseFloat(value.item.selling_price), 0);
    } else {
      this.currency = '$';
      this.subTotal = this.cartItems.reduce((acc, value) => acc + parseFloat(value.total_amount_usd), 0);
      this.totalSellingPrice = this.cartItems.reduce((acc, value) => acc + parseFloat(value.item.selling_price_usd), 0);
    }
    this.grandTotal = this.subTotal;
    if (this.discountRateType === PromoCodeRateTypeEnum.FLAT) {
      this.discountAmount = this.discountRateValue;
    } else if (this.discountRateType === PromoCodeRateTypeEnum.PERCENTAGE) {
      const percentage = this.discountRateValue;
      this.discountAmount = (percentage / 100) * this.subTotal;
    }
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
          this.cartItems=this.cartItems.sort(this.compare);
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

    if (this.selectedDelivery !== this.deliveryOptions.PICKUP && this.addressFormGroup.invalid) {
      this.notificationsService.info(this.constantValues.APP_NAME, 'Please provide delivery address to continue');
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
    // if (this.paymentMethod === PaymentMethods.MOMO && data.sender_wallet_number === '') {
    //   this.notificationsService.info(this.constantValues.APP_NAME, 'Please enter MoMo number to continue');
    //   return;
    // }
    // if (this.paymentMethod === PaymentMethods.MOMO && data.sender_wallet_number !== '') {
    //   //data.delivery_option = this.selectedDelivery;
    //   //console.log(JSON.stringify(data,null,2))
    //   // this.updateDeliveryAddress(this.addressFormGroup.value);
    //   this.validatePhoneNumber(data.sender_wallet_number, data);
    // }
     else {
      //console.log(JSON.stringify(data,null,2));
      // this.updateDeliveryAddress(this.addressFormGroup.value);
      this.processOrder(data);
    }

  }
  private processOrder(data: any) {
    this.isProcessing = true;
    data.total_amount = this.subTotal;
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
      data.total_amount = (this.subTotal - this.discountAmount);
      data.promo_code = this.promoCodeFormCtrl.value;
      data.discount = this.discountAmount;
    }

    data.checkout_origin = this.checkoutSoure;
    data.delivery_option = this.selectedDelivery;
    data.currency=this.cartItems[0].item.currency;
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
    console.log(JSON.stringify(data,null,2))
   
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
        //     this.delieryCharge = 0;
        //     this.deliveryChargeAmount = 0;
        //     this.serviceCharge = 0;
        //     this.transactionFee = 0;
        //     this.dbaseUpateService.dbaseUpdated(true);
        //   }
        // });
        // if (this.paymentMethod === PaymentMethods.CARD) {
       
          this.notificationsService.success(this.constantValues.APP_NAME, 'Order successfully placed. Kindly proceed to make Payment');
          this.redirectUrl = result.redirect_url;
          
          
          //window.location.href = `${result.redirect_url}`;
          //console.log("result.redirect_url==>"+result.redirect_url);
          window.open(`${result.redirect_url}`, `_blank`);
          //console.log("result.redirect_url==>"+result.redirect_url);
          // setTimeout(() => {
          //   this.router.navigate(['/profile-view/orders']);
          //   // if (this.checkoutSoure === CheckoutSourceEnums.SF_MARKET_PLACE) {
          //   //   this.router.navigate(['/profile-view/orders']);
          //   // } else  if (this.checkoutSoure === CheckoutSourceEnums.SHOP_MALL) {
          //   //   this.router.navigate(['/profile-view/orders']);
          //   // }
          // }, 5000);
      
        //  else if (this.paymentMethod === PaymentMethods.MOMO) {
        //   this.dialog.open(ConfirmOrderPaymentDialogComponent,
        //     // tslint:disable-next-line: max-line-length
        //     {
        //       data: { payment_method: this.paymentMethod, payment_network: this.paymentNetwork, network_name: this.networkName, transaction_id: result.transaction_id },
        //       disableClose: true,
        //       scrollStrategy: new NoopScrollStrategy(),
        //     },
        //   )
        //     .afterClosed().subscribe((isCompleted: boolean) => {
        //       // tslint:disable-next-line: max-line-length
        //       this.router.navigate(["/checkout3"]);
        //       this.dialog.open(OrderCompletedDialogComponent, {
        //         data: { order_code: result.order_code, transactionSuccessful: isCompleted },
        //         disableClose: true,
        //         scrollStrategy: new NoopScrollStrategy(),
        //       })
        //         .afterClosed().subscribe((isSuccess: boolean) => {
        //           if (this.checkoutSoure === CheckoutSourceEnums.SF_MARKET_PLACE) {

        //             this.router.navigate(['/profile-view/orders']);
        //           } else if (this.checkoutSoure === CheckoutSourceEnums.SHOP_MALL) {

        //             this.router.navigate(['/profile-view/orders']);
        //           }
        //         });
        //     });
        // }
        //  else if (this.paymentMethod === PaymentMethods.CASH) {
        //   this.dialog.open(OrderCompletedDialogComponent, {
        //     data: { order_code: result.order_code },
        //     disableClose: true,
        //     scrollStrategy: new NoopScrollStrategy(),
        //   })
        //     .afterClosed().subscribe((isSuccess: boolean) => {
        //       if (isSuccess) {
        //         if (this.checkoutSoure === CheckoutSourceEnums.SF_MARKET_PLACE) {
        //           this.router.navigate(['/profile-view/orders']);
        //         } else if (this.checkoutSoure === CheckoutSourceEnums.SHOP_MALL) {

        //           this.router.navigate(['/profile-view/orders']);
        //         }
        //       }
        //     });
        // }
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
  removeItemFromCart(id) {
    this.productsApiCalls.removeCartItem(id, (error, result) => {
      if (result !== null) {
        this.dbaseUpateService.dbaseUpdated(true);
        this.getCartItems();
        this.notificationsService.success(this.constantValues.APP_NAME, 'Item successfully removed from cart');
      }
    });
  }
  shopNow() {
    if (this.checkoutSoure === CheckoutSourceEnums.SF_MARKET_PLACE) {
      this.router.navigate(['/']);
    } else if (this.checkoutSoure === CheckoutSourceEnums.SHOP_MALL) {
      this.router.navigate(['/mall']);
    }
  }
  getActivePromo(onlineAddress) {
    this.shopApiCalls.checkActivePromo(onlineAddress, (error, result) => {
      //console.log("shopHas->"+result)
      if (result !== null && result.response_code === '100') {
        this.shopHasActivePromo = result.results;
        if (this.shopHasActivePromo) {
          const promoCode = this.authService.getPromoCode;
          if (promoCode !== null && promoCode !== undefined && promoCode !== '') {
            this.promoCodeFormCtrl.setValue(promoCode);
            this.getPromoCodeValue(promoCode);
          }
        }
      }
    });
  }
  getPromoCodeValue(promoCode, isFirstLoad = false) {
    //console.log(promoCode);
    this.isProcessing = true;
    //this.discountAmount = (10 / 100) * this.subTotal;
    this.orderService.getPromoCodeValue(promoCode, isFirstLoad, (error, result) => {
      this.isProcessing = false;
      if (result !== null) {
        this.discountRateType = result.rate_type;
        this.discountRateValue = +result.rate_value;
        if (result.rate_type === PromoCodeRateTypeEnum.FLAT) {
          this.discountAmount = +result.rate_value;
        } else if (result.rate_type === PromoCodeRateTypeEnum.PERCENTAGE) {
          const percentage = +result.rate_value;
          this.discountAmount = (percentage / 100) * this.subTotal;
        }
      }
    });
  }
  getShopInfo() {
    // const suddomain = (this.getHostname.subDomain === 'localhost') ? environment.pluto : this.getHostname.subDomain;
    this.shopsApiCalls.getShopByOnlineAddress(this.getHostname.subDomain, (error, result) => {
      if (result !== null && result.response_code === '100') {
        this.exchangeRate = (result.results.exchange_rate !== '' && result.results.exchange_rate !== null && result.results.exchange_rate !== undefined) ? +result.results.exchange_rate : 0;
        this.cediEquivalent = this.exchangeRate * (this.grandTotal - this.discountAmount);
      }
    });
  }

  validatePhoneNumber(phoneNunber, data) {
    //console.log('V--'+JSON.stringify(data,null,2))
    this.isProcessing = true;
    this.orderService.validateMOMOPhoneNumber(phoneNunber, (error, result) => {
      this.isProcessing = false;
      if (result !== null && result.response_code === '100') {
        this.dialog.open(ConfirmPhoneNumberComponent,
          {
            data: { phone_number: phoneNunber },
            scrollStrategy: new NoopScrollStrategy(),
          }).afterClosed().subscribe((isSuccess: boolean) => {
            if (isSuccess) {
              this.processOrder(data);
            }
          });
      }
    });
  }

  openD() {
    this.dialog.open(OrderCompletedDialogComponent, {
      scrollStrategy: new NoopScrollStrategy(),
    });
  }

  getDaddress() {
    console.log(this.addressFormGroup.value);
  }

  onSubmit(data) {
    if (this.formGroup.valid) {
      this.isProcessing = true;
      this.customersApiCalls.signIn(data, (error, result) => {
        this.isProcessing = false;
        this.loginUpdate.isUpdated(true);
        if (result !== null) {
          if (!this.isGuest) {
            this.notificationsService.success(this.constantValues.APP_NAME, 'Login successful');
            this.authService.increaseLoggedInCount();
            this.authService.removeUserAndToken();
            this.authService.saveUser(result);
            this.authService.saveToken(result.auth_token);
            this.loginUpdate.isUpdated(true);
            this.isLoggedIn = true;
            this.currentUser = this.authService.currentUser;
            window.location.reload();
            //console.log("Data-->"+JSON.stringify(data,null,2));
            //this.router.navigate(['/supermarket']);

          } else {
            this.notificationsService.success(this.constantValues.APP_NAME, 'Sign Up successful');
            this.authService.increaseLoggedInCount();
            this.authService.removeUserAndToken();
            this.authService.saveUser(result.results);
            this.authService.saveToken(result.results.auth_token);
            this.loginUpdate.isUpdated(true);
            window.location.reload();
            //this.router.navigate(['/supermarket']);


          }
          if (this.authService.isLogedIn) {
            this.productsApiCalls.getCartItems((error, result) => {
              const items: any[] = result.map(data => "" + data.item.id + ":" + data.quantity + ":" + data.total_amount);
              if (items.length > 0) {
                this.productsApiCalls.syncCartItems({ items: items.join(',') }, (er, res) => {

                });
              }
            });
          }
          //this.dialogRef.close(true);
        }
      }, this.isGuest);
    }
  }

  getShopPromos() {
    let i = 0;
    // const payload2 = {
    //           promo: "5588",
    //           storefrontmall_name: "shop.storefrontmall_name",
    //         };
    //         this.promos.push(payload2);
    this.featuredShops.forEach((shop: any) => {


      this.shopApiCalls.checkActivePromo(shop?.storefrontmall_name, (error, result) => {
        if (
          result !== null &&
          result.response_code === ResponseCodesEnum.CODE_100
        ) {
          i += i;
          const payload2 = {
            promo: result.codes[i],
            storefrontmall_name: shop.storefrontmall_name,
          };
          this.promos.push(payload2);
        }
      });
    });

    // console.log("promos->"+this.promos)
  }

  // checkPromoUsage(payload:any) {
  //   this.isProcessing = true;
  //   this.shopApiCallService.CheckPromoUsage(payload,(error, result) => {
  //     if (
  //       result !== null &&
  //       result.response_code === ResponseCodesEnum.CODE_100
  //     ) {
  //       console.log(JSON.stringify(result, null, ' '));
  //       this.isProcessing = false;
  //     }
  //   });
  // }

  async applyCoupon() {
    // console.log("Conde entered: "+this.promoCodeFormCtrl.value)
    // console.log("promos=>"+JSON.stringify(this.promos,null,2))
    const found = this.promos.find(
      (element: any) => element.promo.code === this.promoCodeFormCtrl.value
    );

    if (found !== null && found !== undefined && found !== '') {
      this.getPromoCodeValue(found?.promo);
      // const rate = found.promo.rate_value;
      // this.cartItems.forEach(async (element: any) => {
      //   if (element.item.myshop.id === found.shopId && element.promo === 0) {
      //     const discount=(element.total_amount * rate) / 100;
      //     element.price_before=element.total_amount;
      //     element.total_amount =element.total_amount -discount;
      //     element.promo = rate;
      //     element.promo_code=this.promoCodeFormCtrl.value;

      //     this.rate = parseInt(element.promo);

      //     this.productsApiCalls.removeAndAddProductToCart(
      //       element,
      //       async (error: any, result: any) => {
      //         if (result !== null) {
      //           this.dbaseUpdate.dbaseUpdated(true);
      //           await this.getCartItems();
      //           this.cartItems=this.cartItems.sort(this.compare);
      //           await this.getSubTotal();
      //         }
      //       }
      //     );

      //     this.notificationsService.success('',
      //       'Promo Successfuly applied'
      //     );
      //     //this.promos=[];
      //   } else {
      //     this.notificationsService.info('',
      //       'No promo for selected product(s)'
      //     );
      //   }
      // });
      this.notificationsService.success('',
        'Promo Successfuly applied'
      );
    } else {
      console.log("Not Found")
      this.notificationsService.info('', 'Invalid Promo Code');
    }
  }

  loginPrompt(){
    if (!this.isLoggedIn) {
      this.dialog.open(LoginMainComponent, {
        data: {},
        disableClose: false,
        scrollStrategy: new NoopScrollStrategy(),
      })
        .afterClosed().subscribe((isSuccess: boolean) => {
          if (isSuccess) {
            if (this.checkoutSoure === CheckoutSourceEnums.SF_MARKET_PLACE) {
              this.router.navigate(['/checkout2']);
            } else if (this.checkoutSoure === CheckoutSourceEnums.SHOP_MALL) {

              this.router.navigate(['/checkout2']);
            }
          }
        });
    } //Login popup end
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
  getCountry(){
    this.isProcessing = true;
      this.productsApiCalls.getCountryInfo((error, result) => {
        this.isProcessing = false;
        if (result !== null) {
          this.country = result.country;
          this.currency = (result.currency === CurrencyEnums.GHS || result.currency === CurrencyEnums.NGN) ? result.currency : CurrencyEnums.USD;
          // console.log("result.country=>"+ result.country);
          // console.log("result.currency=>"+ result.currency);
        }
      });
      
  }

  async addQty(product: any) {
    const stockQty = +product.item.new_quantity;
    if (stockQty <= 0) {
      this.notificationsService.error(this.constantValues.APP_NAME, product.item.name + ' Cannot further reduced');
      return;
    }
    // tslint:disable-next-line: variable-name
    const selling_price = +product.item.selling_price;
    const selling_price_usd = +product.item.selling_price_usd;
    // tslint:disable-next-line: variable-name
    const total_amount = +product.total_amount;
    const total_amount_usd = +product.total_amount_usd;
    const quantity= +product.quantity;
    // tslint:disable-next-line: max-line-length
    const data = {
      item: product.item,
      quantity: quantity,
      country: this.country,
      total_amount: total_amount,
      total_amount_usd: total_amount_usd,
      date_added: product.date_added
    };
      const exists = this.cartItems.find(
        (element: any) => element.item.id ===data.item.id
        );
      if (exists !== null && exists !== undefined && exists !== '') {
        //console.log(this.cartItems[0].item.id);
        const newQuantity = +exists.quantity + 1;
        const newSubtotal = +exists.total_amount + +selling_price;
        data.total_amount = newSubtotal;
        data.quantity = newQuantity;
        this.productsApiCalls.removeAndAddProductToCart(
          data,
          async (error: any, result: any) => {
            if (result !== null) {
              this.dbaseUpdate.dbaseUpdated(true);
              await this.getCartItems();
              await this.getSubTotal();
            }
          }
        );
      }
  
  }
  
  async reduceQty(product: any) {
    const stockQty = +product.quantity;
    if (stockQty <= 1) {
      this.notificationsService.error( "",
        product.item.name + ' Cannot further be reduced'
      );
      return;
    }
    // tslint:disable-next-line: variable-name
    const selling_price = +product.item.selling_price;
    const selling_price_usd = +product.item.selling_price_usd;
    // tslint:disable-next-line: variable-name
    const total_amount = selling_price * 1;
    const total_amount_usd =selling_price_usd * 1;
    const quantity= +product.quantity;
    // tslint:disable-next-line: max-line-length
    const data = {
      item: product.item,
      quantity: quantity,
      country: this.country,
      total_amount: total_amount,
      total_amount_usd: total_amount_usd,
      date_added: product.date_added
    };
      const exists = this.cartItems.find(
        (element: any) => element.item.id ===data.item.id
        );
      if (exists !== null && exists !== undefined && exists !== '') {
        const newQuantity = +exists.quantity - 1;
        const newSubtotal = +exists.total_amount - data.total_amount;
        data.total_amount = newSubtotal;
        data.quantity = newQuantity;
        this.productsApiCalls.removeAndAddProductToCart(
          data,
          async (error: any, result: any) => {
            if (result !== null) {
              this.dbaseUpdate.dbaseUpdated(true);
              await this.getCartItems();
              await this.getSubTotal();
            }
          }
        );
      }
  
  }
  
  saveUserChoice(){
    if (this.paymentMethod ==='' || this.paymentMethod===null || this.paymentMethod===undefined){
      this.notificationsService.info("","Please choose payment option");
      return;
    }
    if (this.selectedDelivery ==='' || this.selectedDelivery===null || this.selectedDelivery===undefined){
      this.notificationsService.info("","Please choose a delivery option");
      return;
    }
    else{
      const user_choice={
        payment_option: this.paymentMethod,
        delivery_option: this.selectedDelivery
      }
      localStorage.setItem('user_choice',JSON.stringify(user_choice));
      this.router.navigate(['/delivery-info']);
    }
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
