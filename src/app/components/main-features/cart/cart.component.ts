import { isNgTemplate } from '@angular/compiler';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
//import Jquery
import * as $ from 'jquery';
import { AppUtilsService } from 'src/app/services/app-utils.service';
import { ConstantValuesService } from 'src/app/services/constant-values.service';
import { DbaseUpdateService } from 'src/app/services/dbase-update.service';
import { ProductsApiCallsService } from 'src/app/services/network-calls/products-api-calls.service';
import { ShopApiCallsService } from 'src/app/services/network-calls/shop-api-calls.service';
import { NotificationsService } from 'src/app/services/notifications.service';
import { CountryEnum } from 'src/app/utils/enums';
import { owlCustomOptions } from 'src/app/utils/owl-config';

//JavaScript Functions
declare const custom:any;
declare const main:any;
declare const parallaxie: any;

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  isProcessingFeaturedShops: boolean;

  shopInfo: any;
  exchangeRate: number;
  selectedCategory: any;
  ProductsTitle="Popular Products";
  selectedPriceSorting: any;
  searchQuery: any;
  tag: any;
  isSearching: boolean;
  //target:any;


  constructor(
    private productsApiCalls: ProductsApiCallsService,
    private notificationsService: NotificationsService,
    private dbaseUpdate: DbaseUpdateService,
    private appUtils: AppUtilsService,
    private title: Title,
    private constantValues: ConstantValuesService,
    private formBuilder: FormBuilder,
    private shopsApiCalls: ShopApiCallsService,
  ) { }

  productGroups = [];
  featuredShops = [];
  industries = [];
  @Output() htmlTarget = new EventEmitter();
  cartItems = [];
  recentlyViewedItems = [];
  isProcessing = false;
  currency = '';
  subTotal = 0;
  totalSellingPrice = 0;
  formGroup: FormGroup;
  countriesEnum = CountryEnum;
  country = '';
  qty:number;


   //Call JavaScript functions onload
   onload(){
    custom();
    // main();
    // parallaxie();
  }
  loader=true
  async ngOnInit(): Promise<void> {
    //Loader variable set false after page load
    setTimeout(()=>{
      this.loader = false;
    }, 1000);
    this.getIndustries()
    this.getFeaturedShops({});
    this.formGroup=this.formBuilder.group({
      qty: ['',Validators.required],
    });

    this.title.setTitle(this.constantValues.APP_NAME + ' | Cart');

    await this.getCartItems();

    // $('#flip').on("click",function(){
    //   $("#panel").slideToggle("slow");
    // });

    // $('.search_btn').on("click",function(){
    //   $("#search_body_collapse").slideToggle("slow");
    // });
    this.onload();
  }

 



  async getCartItems() {
    await this.productsApiCalls.getCartItems((error, result) => {
      if (result !== null) {
        this.cartItems = result;
        this.cartItems = result.sort(this.compare);
        //console.log("Cart-->"+ JSON.stringify(this.cartItems,null,2));
        if (this.cartItems.length > 0) {
          this.currency = this.cartItems[0].currency;
          this.country = this.cartItems[0].country;
        }
        this.getSubTotal();
      }
    });
  }
  /**
   * Remove item from cart
   * @param id item id
   */
  async removeItemFromCart(id) {
    await this.productsApiCalls.removeCartItem(id, (error, result) => {
      if (result !== null) {
        this.notificationsService.success(this.constantValues.APP_NAME, 'Item successfuly removed from cart');
        this.dbaseUpdate.dbaseUpdated(true);
        this.getCartItems();
      }
    });
  }
  getSubTotal() {
    if (this.country === this.countriesEnum.GH) {
      this.subTotal = this.cartItems.reduce((acc, value) => acc + parseFloat(value.total_amount), 0);
      this.totalSellingPrice = this.cartItems.reduce((acc, value) => acc + parseFloat(value.item.selling_price), 0);
    } 
    else if (this.country === this.countriesEnum.NG) {
      this.subTotal = this.cartItems.reduce((acc, value) => acc + parseFloat(value.total_amount_ngn), 0);
      this.totalSellingPrice = this.cartItems.reduce((acc, value) => acc + parseFloat(value.item.selling_price_ngn), 0);
    } else {
      this.subTotal = this.cartItems.reduce((acc, value) => acc + parseFloat(value.total_amount_usd), 0);
      this.totalSellingPrice = this.cartItems.reduce((acc, value) => acc + parseFloat(value.item.selling_price_usd), 0);
    }
  }

  onQuantityChanged(data, id) {
    this.formGroup.get("qty").valueChanges.subscribe(selectedValue => {
    
      this.qty=selectedValue;

    });
    const subTotal = +data.item.selling_price * +data.quantity;
    const subUsdTotal = +data.item.selling_price_usd * +data.quantity;
    const cartItem = {
      item: data.item,
      quantity: this.qty,
      country: this.country,
      total_amount: subTotal,
      total_amount_usd: subUsdTotal,
      date_added: data.date_added
    };
    this.productsApiCalls.removeAndAddProductToCart(cartItem, async (err, res) => {
      if (res !== null) {
        this.dbaseUpdate.dbaseUpdated(true);
        await this.getCartItems();
      }
    });
  }
  getCompleteOnlineAddress(onlineAddress) {
    return this.appUtils.getStoreFrontMallOnlineAddress(onlineAddress);
  }
  get stagesFormArray() { return this.formGroup.get('data') as FormArray;
 }
 
 async addQty(product: any) {
  const stockQty = +product.item.new_quantity;
  if (stockQty <= 0) {
    this.notificationsService.error(this.constantValues.APP_NAME, product.item.name + ' Cannot further reduced');
    return;
  }
  // tslint:disable-next-line: variable-name
  const selling_price = +product.item.selling_price;
  const selling_price_usd = +product.item?.selling_price_usd;
  const selling_price_ngn = +product.item?.selling_price_ngn;
  // tslint:disable-next-line: variable-name
  const total_amount = +product.total_amount;
  const total_amount_ngn = +product.total_amount_ngn;
  const total_amount_usd = +product.total_amount_usd;
  const quantity= +product.quantity;
  // tslint:disable-next-line: max-line-length
  const data = {
    item: product.item,
    quantity: quantity,
    total_amount: total_amount,
    total_amount_ngn: total_amount_ngn,
    total_amount_usd: total_amount_usd,
    date_added: product.date_added,
    country: this.country,
    currency:this.currency,
  };
  if(this.country ===this.countriesEnum.GH){
    data.total_amount =total_amount;
  }
  else if(this.country ===this.countriesEnum.NG){
    data.total_amount =total_amount_ngn;
  }else{
    data.total_amount =total_amount_usd;
  }
    const exists = this.cartItems.find(
      (element: any) => element.item.id ===data.item.id
      );
    if (exists !== null && exists !== undefined && exists !== '') {
      //console.log(this.cartItems[0].item.id);
      const newQuantity = +exists.quantity + 1;
      const newSubtotal = +exists.total_amount + +selling_price;
      const newSubtotal_ngn = +exists.total_amount_ngn + +selling_price_ngn;
      const newSubtotal_usd = +exists.total_amount_usd + +selling_price_usd;
      data.total_amount = newSubtotal;
      data.total_amount_ngn = newSubtotal_ngn;
      data.total_amount_usd = newSubtotal_usd;
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
  const selling_price_ngn = +product.item?.selling_price_ngn;
  const selling_price_usd = +product.item.selling_price_usd;
  // tslint:disable-next-line: variable-name
  const total_amount = selling_price * 1;
  const total_amount_ngn = selling_price_ngn *1;
  const total_amount_usd =selling_price_usd * 1;
  const quantity= +product.quantity;
  // tslint:disable-next-line: max-line-length
  const data = {
    item: product.item,
    quantity: quantity,
    total_amount: total_amount,
    total_amount_ngn: total_amount_ngn,
    total_amount_usd: total_amount_usd,
    date_added: product.date_added,
    country: this.country,
    currency:this.currency,
  };
  if(this.country ===this.countriesEnum.GH){
    data.total_amount =total_amount;
  }
  else if(this.country ===this.countriesEnum.NG){
    data.total_amount =total_amount_ngn;
  }else{
    data.total_amount =total_amount_usd;
  }
    const exists = this.cartItems.find(
      (element: any) => element.item.id ===data.item.id
      );
    if (exists !== null && exists !== undefined && exists !== '') {
      const newQuantity = +exists.quantity - 1;
      const newSubtotal = +exists.total_amount - data.total_amount;
      const newSubtotal_ngn = +exists.total_amount_ngn - data.total_amount_ngn;
      const newSubtotal_usd = +exists.total_amount_usd - data.total_amount_usd;
      data.total_amount = newSubtotal;
      data.total_amount_ngn = newSubtotal_ngn;
      data.total_amount_usd = newSubtotal_usd;
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

getShopInfo() {
  // const suddomain = (this.getHostname.subDomain === 'localhost') ? environment.pluto : this.getHostname.subDomain;
  this.shopsApiCalls.getShopByOnlineAddress(this.subdomain, (error, result) => {
    if (result !== null && result.response_code === '100') {
      this.shopInfo = result.results;
      this.exchangeRate = (result.results.exchange_rate !== '' && result.results.exchange_rate !== null && result.results.exchange_rate !== undefined) ? +result.results.exchange_rate : 0;

    }
    //console.log("this.shopInfo " +this.shopInfo);
  });
}
  subdomain(subdomain: any, arg1: (error: any, result: any) => void) {
    throw new Error('Method not implemented.');
  }

filterCategory(category,el: HTMLElement) {
  this.selectedCategory = category;
  this.ProductsTitle=category +" Products";

  this.getProducts({ sorting: this.selectedPriceSorting, industry: this.selectedCategory, search_text: this.searchQuery, tag: this.tag });

      el.scrollIntoView({behavior: 'smooth'});
  }
  getProducts(arg0: { sorting: any; industry: any; search_text: any; tag: any; }) {
    throw new Error('Method not implemented.');
  }

filterByCategory(category,el: HTMLElement) {
    this.isSearching=true;
    this.ProductsTitle=category +" Products";
    this.selectedCategory = category;

    this.getProducts({ sorting: this.selectedPriceSorting, industry: this.selectedCategory, search_text: this.searchQuery, tag: this.tag });
    el.scrollIntoView({behavior: 'smooth'});
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

get Qty(){
  return this.formGroup.get('qty');
}

}
