import { customOptionsHome,customOptions,customOptions1, slides1, OwlLandingPageOtion, sectionOptions } from 'src/app/utils/constants';

import { Component, Renderer2, OnInit, ElementRef, ViewChild, AfterViewInit, Inject  } from '@angular/core';

import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ViewProductComponent } from 'src/app/components/commons/view-product/view-product.component';
//import { OrderApiCallsService } from './../../../../../../services/network-calls/order-api-calls.service';

import { ActivatedRoute, Router } from '@angular/router';

//import { PromoDialogComponent } from 'src/app/components/common/dialogs/promo-dialog/promo-dialog.component';


//import Jquery
import * as $ from 'jquery';
import { servicesCarouselConfig } from 'src/app/utils/owl-config';
import { CountryEnum, PriceSortingEnums, PromoCodeRateTypeEnum } from 'src/app/utils/enums';
import { FormControl } from '@angular/forms';
import { ShopApiCallsService } from 'src/app/services/network-calls/shop-api-calls.service';
import { AuthService } from 'src/app/services/auth.service';
import { ConstantValuesService } from 'src/app/services/constant-values.service';
import { DbaseUpdateService } from 'src/app/services/dbase-update.service';
import { GetHostnameService } from 'src/app/services/get-hostname.service';
import { ProductsApiCallsService } from 'src/app/services/network-calls/products-api-calls.service';
import { NotificationsService } from 'src/app/services/notifications.service';
import { ProductsFilterParams } from 'src/app/interfaces/products-filter-params';
import { WINDOW } from 'src/app/utils/window.provider';
import { Subscription } from 'rxjs';
import AOS from 'aos';
import { CartPopUpComponent } from '../../commons/cart-pop-up/cart-pop-up.component';
import { OrderApiCallsService } from 'src/app/services/network-calls/order-api-calls.service';

export interface DialogData {
  animal: 'panda' | 'unicorn' | 'lion';
}

//JavaScript Functions
declare const custom:any;
declare const main:any;
//declare const parallaxie: any;
@Component({
  selector: 'app-shop-details',
  templateUrl: './shop-details.component.html',
  styleUrls: ['./shop-details.component.scss']
})
export class ShopDetailsComponent implements OnInit {
  @ViewChild('mainImg', { static: false }) mainImg?: ElementRef;
  @ViewChild('thum', { static: false }) thum: ElementRef | undefined;
  ProductsTitle= 'Products';
  currency: string;



  constructor(
    public dialog: MatDialog,
    private el: ElementRef,
    private renderer:Renderer2,
    private route: ActivatedRoute,
    private productsService: ProductsApiCallsService,
    private productsApiCalls: ProductsApiCallsService,
    private shopsApiCalls: ShopApiCallsService,
    private dbaseUpdate: DbaseUpdateService,
    private constantValues: ConstantValuesService,
    private getHostname: GetHostnameService,
    private notificationsService: NotificationsService,
    @Inject(WINDOW) private window: Window,
    private authService: AuthService,
    private orderService: OrderApiCallsService,
    private shopApiCalls: ShopApiCallsService

    ) { }
    subscription: Subscription;
    intervalId: number;


    banners=[
      {image:'../../assets/images/attractive-stylish-modern-young-african-woman-2021-08-26-17-26-19-utc.jpg'},
      {image:'../../assets/images/happy-young-black-couple-with-presents-jumping-up-2022-02-22-15-54-29-utc.jpg'},
      {image:'../../assets/images/black-millennial-couple-with-gift-box-on-pink-back-2022-02-22-15-52-54-utc.jpg'},
    ];
  sectionOptions=sectionOptions;
  OwlLandingPageOtion=OwlLandingPageOtion;
    customOptions=customOptions;
    customOptions1=customOptions1;
    slides1=slides1;
    customOptionsHome=customOptionsHome;
    products = [];
    filterParams = {};
    country = '';
    productSearchFormControl = new FormControl();
    featuredShops = [];
    isProcessing = false;
    isProcessingShopInfo = false;
    hasTopTrendingProducts = false;
    isProcessingFeaturedShops: boolean;
    protocol = '';
    url = '';
    totalAmount = '';
    totalPage = 0;
    nextPage = '';
    prevPage = '';
    product_groups = [];
    pGroups=[];
    industries = [];
    shopInfo;
    tag = '';
    sliders = [];
    servicesSliderConfig = servicesCarouselConfig;
    selectedCategoryId = '';
    selectedCategory = '';
    priceSorting = PriceSortingEnums;
    selectedPriceSorting = '';
    searchQuery = '';
    productListTitle: string;
    isSearching: boolean;
    subdomain = '';
    gtpSubdomain = '';
    woodinSubdomain = '';
    shopHasActivePromo = false;
    promoCodes = [];
    exchangeRate = 0;
    storefrontmall_name='';
    store_name='';
    selectedValueCtrl= new FormControl();
    promoCodeFormCtrl=new FormControl();
    subTotal = 0;
    discountCode = '';
    discountAmount = 0;
    discountRateValue = 0;
    discountRateType = '';
    countriesEnum = CountryEnum;
    cartItems = [];
    prices = [
      {value: 'All-Prices', viewValue: 'All Prices'},
      {value: 'From-Lowest-to-Highest', viewValue: 'From Lowest to Highest'},
      {value: 'From-Highest-to-Lowest', viewValue: 'From Highest to Lowest'},
    ];


    getAttribute(){
      this.renderer.setProperty(this.mainImg?.nativeElement,'src',`${this.thum?.nativeElement.src}`);
      //console.log(this.thum?.nativeElement.src);
    }


  //Call JavaScript functions onload
  onload(){
  custom();
  //main();
  //parallaxie();
}
loader=true;
  ngOnInit(): void {
    setTimeout(()=>{
      this.loader = false;
  }, 1000);
    AOS.init();
    this.protocol = this.constantValues.STOREFRONT_MALL_URL_PROTOCOL;
    this.url = this.constantValues.STOREFRONT_MALL_URL;
    this.subdomain = this.getHostname.subDomain;
    //this.subdomain = "gtpstore";
    //console.log('subDomain-->'+this.subdomain);
    this.gtpSubdomain = this.constantValues.GTP_SUBDOMAIN;
    this.woodinSubdomain = this.constantValues.WOODIN_SUBDOMAIN;
    //this.getProducts({ tag: this.tag, storefrontmall_name: 'bquirky' });
    //this.getProducts({ tag: this.tag, storefrontmall_name: this.subdomain });
    let domain = this.window.location.hostname.split('.')[0];
    // this.getProducts({ tag: this.tag, storefrontmall_name: 'clauneizeenterprise' });
    //this.getProducts({});
    this.getShopInfo();
    this.getShopSliders();
    this.getIndustries();


    this.route.params.subscribe(param => {
      const mall=param['shop'];
      this.store_name=param['store_name'];
      this.storefrontmall_name=param['storefrontmall_name'];
      //console.log('Mall-->'+JSON.stringify(mall.shop,null,2));
      this.getProducts({ tag: this.tag, storefrontmall_name: this.storefrontmall_name })
      this.getActivePromo(this.storefrontmall_name );
      //console.log()
    });


    // console.log("SubDomain->"+this.subdomain);
    // console.log("domin->"+domain);
    this.route.queryParams.subscribe(param => {
      const category = param['category'];
      const cid = param['cid'];
      this.selectedCategory = (category !== null && category !== '' && category !== undefined) ? category : '';
      this.selectedCategoryId = (cid !== null && cid !== '' && cid !== undefined) ? cid : '';
      this.searchQuery = (param['q'] !== null && param['q'] !== '' && param['q'] !== undefined) ? param['q'] : '';

      this.productListTitle = 'POPULAR PRODUCTS';
      if (this.searchQuery !== '') {
        this.productListTitle = 'SEARCH RESULTS';
        this.isSearching = true;
        if (this.searchQuery === '') {
          this.productListTitle = 'POPULAR PRODUCTS';
          this.isSearching = false;
        }
      }
      this.selectedCategoryId = cid;
      // tslint:disable-next-line: max-line-length
     // this.getProducts({ sorting: this.selectedPriceSorting, product_group_id: this.selectedCategoryId, search_text: this.searchQuery, tag: this.tag, storefrontmall_name: this.subdomain });
    });

      // tslint:disable-next-line: max-line-length
      //this.getProducts({ sorting: this.selectedPriceSorting, product_group_id: this.selectedCategoryId, search_text: this.searchQuery, tag: this.tag, storefrontmall_name: this.subdomain });

      //this.getActivePromo(this.getHostname.subDomain);

    // $('#flip').on("click",function(){
    //   $("#panel").slideToggle("slow");
    // });
    // $('.search_btn').on("click",function(){
    //   $("#search_body_collapse").slideToggle("slow");
    // });
    this.onload();
  }
  openDialog(item: any) {
    this.dialog.open(ViewProductComponent, {

      data: {
        item: item,
      },
    });
  }
filterByShop(storefrontmall_name){
  this.getProducts({ tag: this.tag, storefrontmall_name: storefrontmall_name })
}
filterByCategory(category) {
  this.isSearching=true;
  this.ProductsTitle=category +" Products";
  this.selectedCategory = category;

  this.getProducts({ sorting: this.selectedPriceSorting, industry: this.selectedCategory, search_text: this.searchQuery, tag: this.tag,storefrontmall_name: this.storefrontmall_name });
  // el.scrollIntoView({behavior: 'smooth'});
}

// scrollTo(target:HTMLElement){
//   target.scrollIntoView({behavior: 'smooth'});




/**
 * Get products by filter parameters
 * @param filterParams filter parameters
 */
getProducts(filterParams: ProductsFilterParams) {
  this.isProcessing = true;
  // this.products = [];
  this.filterParams = filterParams;
  this.productsService.getProducts(filterParams, (error, result) => {
    this.isProcessing = false;
    if (result !== null && result.response_code === '100') {
      this.country = result.country;
      this.products = result.results;
      this.prevPage = result.previous;
      this.nextPage = result.next;
      this.totalPage = result.count;
      this.pGroups = result.product_groups;
      this.constantValues.COUNTRY = this.country;
      //console.log("Pro-->"+this.products);
    }
    //console.log("Pro-->"+this.products);
  });
}

async addProductToCart(product) {
  const stockQty = +product.new_quantity;
  if (stockQty <= 0) {
    this.notificationsService.info(this.constantValues.APP_NAME, product.name + ' has run out of stock');
    return;
  }
  const selling_price = +product.selling_price;
  const selling_price_usd = +product.selling_price_usd;
  // tslint:disable-next-line: variable-name
  const total_amount = selling_price * 1;
  const total_amount_usd = selling_price_usd * 1;
  // tslint:disable-next-line: max-line-length
  const data = { item: product, quantity: 1, total_amount, total_amount_usd, date_added: new Date(), country: this.country };
  await this.productsService.addProductToCart(data, (error, result) => {
    if (result !== null) {
      this.dbaseUpdate.dbaseUpdated(true);
      this.notificationsService.success(this.constantValues.APP_NAME, product.name + ' has been successfully added to cart');
      this.dialog.open(CartPopUpComponent,{panelClass: ['animate__animated','animate__slideInRight']} );
    }
  });
}
getIndustries() {
  this.shopsApiCalls.getIndustries((error, result) => {
    this.industries = result;
  });
}
getShopInfo() {
  // const suddomain = (this.getHostname.subDomain === 'localhost') ? environment.pluto : this.getHostname.subDomain;
  this.shopsApiCalls.getShopByOnlineAddress(this.subdomain, (error, result) => {
    if (result !== null && result.response_code === '100') {
      this.shopInfo = result.results;
      this.exchangeRate = (result.results.exchange_rate !== '' && result.results.exchange_rate !== null && result.results.exchange_rate !== undefined) ? +result.results.exchange_rate : 0;
    }
  });
}
getShopSliders() {
  this.isProcessingShopInfo = true;
  // const suddomain = (this.getHostname.subDomain === 'localhost') ? environment.pluto : this.getHostname.subDomain;
  this.shopsApiCalls.getShopSliders(this.subdomain, (error, result) => {
    this.isProcessingShopInfo = false;
    if (result !== null && result.response_code === '100') {
      this.sliders = result.results;
    }
  });
}
onSearch(searchTerm) {
  // TODO:
  this.getProducts({ search_text: searchTerm, storefrontmall_name: this.subdomain });
}
/**
 * On page changed
 * @param result result after page changed
 */
onPageChanged(result) {
  this.products = result.results;
  this.prevPage = result.previous;
  this.nextPage = result.next;
  this.totalPage = result.count;
}
filterByPrice(priceSort) {
  this.selectedPriceSorting = priceSort;
  // tslint:disable-next-line: max-line-length
  this.getProducts({sorting: this.selectedPriceSorting, tag: this.tag,search_text: this.searchQuery, storefrontmall_name: this.storefrontmall_name });
  //this.getProducts({ sorting: this.selectedPriceSorting, product_group_id: this.selectedCategory, search_text: this.searchQuery, tag: this.tag, storefrontmall_name: this.subdomain });
  //console.log("Price-->"+this.selectedValueCtrl);
  //alert('price sorted to '+this.selectedValueCtrl);
}

getActivePromo(onlineAddress) {
  this.shopsApiCalls.checkActivePromo(onlineAddress, (error, result) => {
    console.log("shopHas->"+result)
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
getSubTotal() {
  if (this.country === this.countriesEnum.GH || this.country === this.countriesEnum.NG || this.country === undefined || this.country === '') {
    this.subTotal = this.cartItems.reduce((acc, value) => acc + parseFloat(value.total_amount), 0);
  } else {
    this.currency = '$';
    this.subTotal = this.cartItems.reduce((acc, value) => acc + parseFloat(value.total_amount_usd), 0);
  }
}
async getCartItems() {
  await this.productsApiCalls.getCartItems((error, result) => {
    if (result !== null) {
      this.cartItems = result;
      this.cartItems = result.sort(this.compare);
      //console.log("Cart length-->"+this.cartItems.length);
      //console.log("Cart-->"+ JSON.stringify(this.cartItems,null,2));
      if (this.cartItems.length > 0) {
        this.currency = this.cartItems[0].item.currency;
        this.country = this.cartItems[0].country;
      }
      this.getSubTotal();
    }
  });
}
getPromoCodeValue(promoCode, isFirstLoad = false) {
  console.log(promoCode);
  this.isProcessing = true;
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
filterCategory(category,el: HTMLElement) {
  this.selectedCategory = category;
  this.ProductsTitle=category +" Products";

  this.getProducts({ sorting: this.selectedPriceSorting, industry: this.selectedCategory, search_text: this.searchQuery, tag: this.tag });

      el.scrollIntoView({behavior: 'smooth'});
  }


  openCartDialog(): void {
    this.dialog.open(CartPopUpComponent,{panelClass: ['animate__animated','animate__slideInRight']}

   );
  }
     //sort cart items

     compare( a:any, b:any ) {
      if ( a.item.name < b.item.name ){
        return -1;
      }
      if ( a.item.name > b.item.name ){
        return 1;
      }
      return 0;
    }

}
