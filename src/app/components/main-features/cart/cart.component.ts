import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
//import Jquery
import * as $ from 'jquery';
import { AppUtilsService } from 'src/app/services/app-utils.service';
import { ConstantValuesService } from 'src/app/services/constant-values.service';
import { DbaseUpdateService } from 'src/app/services/dbase-update.service';
import { ProductsApiCallsService } from 'src/app/services/network-calls/products-api-calls.service';
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

  constructor(
    private productsApiCalls: ProductsApiCallsService,
    private notificationsService: NotificationsService,
    private dbaseUpdate: DbaseUpdateService,
    private appUtils: AppUtilsService,
    private title: Title,
    private constantValues: ConstantValuesService
  ) { }


  cartItems = [];
  recentlyViewedItems = [];
  isProcessing = false;
  currency = '';
  subTotal = 0;
  totalSellingPrice = 0;
  formGroup: FormGroup;
  countriesEnum = CountryEnum;
  country = '';

   //Call JavaScript functions onload
   onload(){
    custom();
    main();
    parallaxie();
  }

  async ngOnInit(): Promise<void> {

    this.title.setTitle(this.constantValues.APP_NAME + ' | Cart');

    await this.getCartItems();

    $('#flip').on("click",function(){
      $("#panel").slideToggle("slow");
    });

    $('.search_btn').on("click",function(){
      $("#search_body_collapse").slideToggle("slow");
    });
    this.onload();
  }



  async getCartItems() {
    await this.productsApiCalls.getCartItems((error, result) => {
      if (result !== null) {
        this.cartItems = result;
        console.log("Cart-->"+ JSON.stringify(this.cartItems,null,2));
        if (this.cartItems.length > 0) {
          this.currency = this.cartItems[0].item.currency;
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
    if (this.country === this.countriesEnum.GH || this.country === this.countriesEnum.NG || this.country === undefined || this.country === '') {
      this.subTotal = this.cartItems.reduce((acc, value) => acc + parseFloat(value.total_amount), 0);
      this.totalSellingPrice = this.cartItems.reduce((acc, value) => acc + parseFloat(value.item.selling_price), 0);
    } else {
      this.currency = '$';
      this.subTotal = this.cartItems.reduce((acc, value) => acc + parseFloat(value.total_amount_usd), 0);
      this.totalSellingPrice = this.cartItems.reduce((acc, value) => acc + parseFloat(value.item.selling_price_usd), 0);
    }
  }
  onQuantityChanged(data, id) {
    const subTotal = +data.item.selling_price * +data.quantity;
    const subUsdTotal = +data.item.selling_price_usd * +data.quantity;
    const cartItem = {
      item: data.item,
      quantity: data.quantity,
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
  // if (stockQty <= 0) {
  //   this.notificationsService.snackBarErrorMessage(
  //     product.item.name + ' Cannot further reduced'
  //   );
    //return;
  //}
  // tslint:disable-next-line: variable-name
  const selling_price = +product.item.selling_price;
  const selling_price_usd = +product.item.selling_price_usd;
  // tslint:disable-next-line: variable-name
  const total_amount = selling_price * 1;
  const total_amount_usd = selling_price_usd * 1;
  // tslint:disable-next-line: max-line-length
  const data = {
    item: product.item,
    quantity: product.quantity,
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
      const newSubtotal = +exists.total_amount + +data.total_amount;
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
    // this.notificationsService.snackBarErrorMessage(
    //   product.item.name + ' Cannot further be reduced'
    // );
    return;
  }
  // tslint:disable-next-line: variable-name
  const selling_price = +product.item.selling_price;
  const selling_price_usd = +product.item.selling_price_usd;
  // tslint:disable-next-line: variable-name
  const total_amount = selling_price * 1;
  const total_amount_usd = selling_price_usd * 1;
  // tslint:disable-next-line: max-line-length
  const data = {
    item: product.item,
    quantity: product.quantity,
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
      const newSubtotal = +exists.total_amount - +data.total_amount;
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

}
